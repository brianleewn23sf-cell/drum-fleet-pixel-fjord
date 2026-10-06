import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { BENCH_SLOTS, formationById, remapLineup, SUB_SLOTS } from "@/lib/formations";
import { gameMinute, type LiveClock, type Stint } from "@/lib/minutes";
import { isSquadPlayer } from "@/lib/players";

export type LiveState = {
  opposition: string;
  kickoff: string;
  formation: string;
  lineup: Record<string, string>;
  clock: LiveClock;
  stints: Stint[];
  shapes: { minute: number; formation: string }[];
};

function asLineup(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const next: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value as Record<string, unknown>)) {
    const player = String(raw || "").trim();
    if (player && isSquadPlayer(player)) next[key] = player;
  }
  return next;
}

function asBool(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "t" || value === "true";
}

function asStartedAt(value: unknown): string | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) {
    const t = value.getTime();
    return Number.isFinite(t) ? value.toISOString() : null;
  }
  const t = Date.parse(String(value));
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

function clockFromRow(row: Record<string, unknown> | undefined): LiveClock {
  if (!row) return { startedAt: null, elapsedMs: 0, running: false, ended: false, half: 1, halfMarkMs: 0 };
  return {
    startedAt: asStartedAt(row.started_at),
    elapsedMs: Number(row.elapsed_ms) || 0,
    running: asBool(row.running),
    ended: asBool(row.ended),
    half: Number(row.half) === 2 ? 2 : 1,
    halfMarkMs: Number(row.half_mark_ms) || 0,
  };
}

function stintFromRow(row: Record<string, unknown>): Stint {
  return {
    id: Number(row.id) || 0,
    player: String(row.player || ""),
    slotId: String(row.slot_id || ""),
    onMinute: Number(row.on_minute) || 0,
    offMinute: row.off_minute === null || row.off_minute === undefined ? null : Number(row.off_minute),
    started: Boolean(row.started),
  };
}

async function writeLiveLineup(
  sql: Awaited<ReturnType<typeof getSql>>,
  opposition: string,
  kickoff: string,
  lineup: Record<string, string>,
  extra?: { formation?: string },
) {
  const blob = JSON.stringify(lineup);
  if (extra?.formation) {
    await sql`
      update match_live
      set formation = ${extra.formation}, lineup = ${blob}::jsonb
      where opposition = ${opposition} and kickoff = ${kickoff}
    `;
    return;
  }
  await sql`
    update match_live set lineup = ${blob}::jsonb
    where opposition = ${opposition} and kickoff = ${kickoff}
  `;
}

async function loadLive(
  sql: Awaited<ReturnType<typeof getSql>>,
  opposition: string,
  kickoff: string,
): Promise<LiveState | null> {
  try {
    let rows: Record<string, unknown>[] = [];
    try {
      rows = await sql<Record<string, unknown>>`
        select opposition, kickoff, started_at, elapsed_ms, running, ended, formation, lineup, half, half_mark_ms
        from match_live
        where opposition = ${opposition} and kickoff = ${kickoff}
        limit 1
      `;
    } catch {
      rows = await sql<Record<string, unknown>>`
        select opposition, kickoff, started_at, elapsed_ms, running, ended, formation, lineup
        from match_live
        where opposition = ${opposition} and kickoff = ${kickoff}
        limit 1
      `;
    }
    const row = rows[0];
    if (!row) return null;
    const stintRows = await sql<Record<string, unknown>>`
      select id, player, slot_id, on_minute, off_minute, started
      from match_stints
      where opposition = ${opposition} and kickoff = ${kickoff}
      order by on_minute asc, id asc
    `;
    const shapeRows = await sql<Record<string, unknown>>`
      select minute, formation from match_shape_changes
      where opposition = ${opposition} and kickoff = ${kickoff}
      order by id asc
    `;
    return {
      opposition,
      kickoff,
      formation: String(row.formation || "3-3-2"),
      lineup: asLineup(row.lineup),
      clock: clockFromRow(row),
      stints: stintRows.map(stintFromRow),
      shapes: shapeRows.map((s) => ({
        minute: Number(s.minute) || 0,
        formation: String(s.formation || ""),
      })),
    };
  } catch {
    return null;
  }
}

async function currentMinute(
  sql: Awaited<ReturnType<typeof getSql>>,
  opposition: string,
  kickoff: string,
): Promise<number> {
  const live = await loadLive(sql, opposition, kickoff);
  if (!live) return 0;
  return gameMinute(live.clock);
}

const gameKey = z.object({
  opposition: z.string().trim().min(1).max(80),
  kickoff: z.string().trim().min(1).max(24),
});

export const getLiveMatch = createServerFn({ method: "POST" })
  .validator(gameKey)
  .handler(async ({ data }) => {
    const sql = await getSql();
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const getAllMinutes = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  try {
    const games = await sql<Record<string, unknown>>`
      select opposition, kickoff, started_at, elapsed_ms, running, ended, formation
      from match_live
      order by kickoff asc
    `;
    const stintRows = await sql<Record<string, unknown>>`
      select id, opposition, kickoff, player, slot_id, on_minute, off_minute, started
      from match_stints
      order by kickoff asc, on_minute asc
    `;
    return {
      games: games.map((g) => ({
        opposition: String(g.opposition || ""),
        kickoff: String(g.kickoff || ""),
        clock: clockFromRow(g),
        formation: String(g.formation || ""),
      })),
      stints: stintRows.map((r) => ({
        ...stintFromRow(r),
        opposition: String(r.opposition || ""),
        kickoff: String(r.kickoff || ""),
      })),
    };
  } catch {
    return { games: [], stints: [] };
  }
});

export const startLive = createServerFn({ method: "POST" })
  .validator(
    gameKey.extend({
      formation: z.string().trim().min(1).max(20),
      lineup: z.record(z.string(), z.string()),
    }),
  )
  .handler(async ({ data }) => {
    const lineup = asLineup(data.lineup);
    const sql = await getSql();
    const existing = await loadLive(sql, data.opposition, data.kickoff);
    if (existing?.clock.ended) throw new Error("This game is already finished.");
    const startedAt = new Date().toISOString();
    if (existing?.clock.running || (existing && existing.stints.length)) {
      await sql`
        update match_live
        set running = true, started_at = ${startedAt}::timestamptz, ended = false
        where opposition = ${data.opposition} and kickoff = ${data.kickoff}
      `;
      return { live: await loadLive(sql, data.opposition, data.kickoff) };
    }
    await sql`
      insert into match_live (opposition, kickoff, started_at, elapsed_ms, running, ended, formation, lineup, half, half_mark_ms)
      values (${data.opposition}, ${data.kickoff}, ${startedAt}::timestamptz, 0, true, false, ${data.formation}, ${JSON.stringify(lineup)}::jsonb, 1, 0)
      on conflict (opposition, kickoff) do update set
        started_at = ${startedAt}::timestamptz, elapsed_ms = 0, running = true, ended = false,
        formation = excluded.formation, lineup = excluded.lineup, half = 1, half_mark_ms = 0
    `;
    const starters = formationById(data.formation)
      .slots.map((slot) => ({ slot: slot.id, player: lineup[slot.id] }))
      .filter((row) => row.player);
    if (starters.length) {
      const values = starters
        .map((_, i) => {
          const n = i * 2;
          return `($1, $2, $${n + 3}, $${n + 4}, 0, null, true)`;
        })
        .join(", ");
      const params: unknown[] = [data.opposition, data.kickoff];
      for (const row of starters) params.push(row.player, row.slot);
      await sql.query(
        `insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started) values ${values}`,
        params,
      );
    }
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const pauseLive = createServerFn({ method: "POST" })
  .validator(gameKey)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live?.clock.running) return { live };
    const extra = live.clock.startedAt
      ? Math.max(0, Date.now() - new Date(live.clock.startedAt).getTime())
      : 0;
    const elapsed = live.clock.elapsedMs + extra;
    await sql`
      update match_live
      set running = false, elapsed_ms = ${elapsed}, started_at = null
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const resumeLive = createServerFn({ method: "POST" })
  .validator(gameKey)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      update match_live
      set running = true, started_at = ${new Date().toISOString()}::timestamptz, ended = false
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const secondHalfLive = createServerFn({ method: "POST" })
  .validator(gameKey)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    const extra =
      live.clock.running && live.clock.startedAt
        ? Math.max(0, Date.now() - new Date(live.clock.startedAt).getTime())
        : 0;
    const elapsed = live.clock.elapsedMs + extra;
    await sql`
      update match_live
      set half = 2, half_mark_ms = ${elapsed}, running = false, elapsed_ms = ${elapsed}, started_at = null
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const fullTimeLive = createServerFn({ method: "POST" })
  .validator(gameKey)
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    const extra =
      live.clock.running && live.clock.startedAt
        ? Math.max(0, Date.now() - new Date(live.clock.startedAt).getTime())
        : 0;
    const elapsed = live.clock.elapsedMs + extra;
    const minute = Math.floor(elapsed / 60000);
    await sql`
      update match_live
      set running = false, ended = true, elapsed_ms = ${elapsed}, started_at = null
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
    await sql`
      update match_stints
      set off_minute = ${minute}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff} and off_minute is null
    `;
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const liveSub = createServerFn({ method: "POST" })
  .validator(
    gameKey.extend({
      offPlayer: z.string().trim().min(1),
      onPlayer: z.string().trim().min(1),
    }),
  )
  .handler(async ({ data }) => {
    if (!isSquadPlayer(data.offPlayer) || !isSquadPlayer(data.onPlayer)) {
      throw new Error("Pick squad players.");
    }
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    if (live.clock.ended) throw new Error("Game is finished.");
    const minute = await currentMinute(sql, data.opposition, data.kickoff);
    const lineup = { ...live.lineup };
    const offSlot = Object.entries(lineup).find(([, p]) => p === data.offPlayer)?.[0];
    if (!offSlot || !formationById(live.formation).slots.some((s) => s.id === offSlot)) {
      throw new Error("That lad is not on the pitch.");
    }
    const onPitch = new Set(formationById(live.formation).slots.map((s) => lineup[s.id]));
    if (onPitch.has(data.onPlayer)) throw new Error("That lad is already on.");
    const benchSlot = Object.entries(lineup).find(([, p]) => p === data.onPlayer)?.[0];
    lineup[offSlot] = data.onPlayer;
    if (benchSlot) lineup[benchSlot] = data.offPlayer;
    else {
      const empty = SUB_SLOTS.find((id) => !lineup[id]);
      if (empty) lineup[empty] = data.offPlayer;
    }
    await sql`
      update match_stints
      set off_minute = ${minute}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
        and player = ${data.offPlayer} and off_minute is null
    `;
    await sql`
      insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started)
      values (${data.opposition}, ${data.kickoff}, ${data.onPlayer}, ${offSlot}, ${minute}, null, false)
    `;
    await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const liveMove = createServerFn({ method: "POST" })
  .validator(
    gameKey.extend({
      player: z.string().trim().min(1),
      toSlot: z.string().trim().min(1).max(12),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    if (live.clock.ended) throw new Error("Game is finished.");
    const slots = formationById(live.formation).slots.map((s) => s.id);
    if (!slots.includes(data.toSlot)) throw new Error("That position is not in this shape.");
    const lineup = { ...live.lineup };
    const fromSlot = Object.entries(lineup).find(([, p]) => p === data.player)?.[0];
    if (!fromSlot || !slots.includes(fromSlot)) throw new Error("That lad is not on the pitch.");
    const other = lineup[data.toSlot] || "";
    lineup[data.toSlot] = data.player;
    if (other) lineup[fromSlot] = other;
    else delete lineup[fromSlot];
    await sql`
      update match_stints set slot_id = ${data.toSlot}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
        and player = ${data.player} and off_minute is null
    `;
    if (other) {
      await sql`
        update match_stints set slot_id = ${fromSlot}
        where opposition = ${data.opposition} and kickoff = ${data.kickoff}
          and player = ${other} and off_minute is null
      `;
    }
    await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const liveOff = createServerFn({ method: "POST" })
  .validator(
    gameKey.extend({
      player: z.string().trim().min(1),
      toSlot: z.string().trim().min(1).max(12),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    if (live.clock.ended) throw new Error("Game is finished.");
    const minute = await currentMinute(sql, data.opposition, data.kickoff);
    const lineup = { ...live.lineup };
    const fromSlot = Object.entries(lineup).find(([, p]) => p === data.player)?.[0];
    const pitchIds = formationById(live.formation).slots.map((s) => s.id);
    if (!fromSlot || !pitchIds.includes(fromSlot)) throw new Error("That lad is not on the pitch.");
    const occupant = lineup[data.toSlot];
    delete lineup[fromSlot];
    lineup[data.toSlot] = data.player;
    if (occupant) lineup[fromSlot] = occupant;
    await sql`
      update match_stints
      set off_minute = ${minute}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
        and player = ${data.player} and off_minute is null
    `;
    if (occupant) {
      await sql`
        insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started)
        values (${data.opposition}, ${data.kickoff}, ${occupant}, ${fromSlot}, ${minute}, null, false)
      `;
    }
    await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const liveOn = createServerFn({ method: "POST" })
  .validator(
    gameKey.extend({
      player: z.string().trim().min(1),
      toSlot: z.string().trim().min(1).max(12),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    if (live.clock.ended) throw new Error("Game is finished.");
    const minute = await currentMinute(sql, data.opposition, data.kickoff);
    const lineup = { ...live.lineup };
    const fromSlot = Object.entries(lineup).find(([, p]) => p === data.player)?.[0];
    const occupant = lineup[data.toSlot] || "";
    if (occupant) {
      return liveSub({
        data: {
          opposition: data.opposition,
          kickoff: data.kickoff,
          offPlayer: occupant,
          onPlayer: data.player,
        },
      });
    }
    if (fromSlot) delete lineup[fromSlot];
    lineup[data.toSlot] = data.player;
    await sql`
      insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started)
      values (${data.opposition}, ${data.kickoff}, ${data.player}, ${data.toSlot}, ${minute}, null, false)
    `;
    await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const liveFormation = createServerFn({ method: "POST" })
  .validator(gameKey.extend({ formation: z.string().trim().min(1).max(20) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    if (live.clock.ended) throw new Error("Game is finished.");
    const lineup = remapLineup(live.lineup, data.formation, live.formation);
    const minute = await currentMinute(sql, data.opposition, data.kickoff);
    await writeLiveLineup(sql, data.opposition, data.kickoff, lineup, { formation: data.formation });
    await sql`
      insert into match_shape_changes (opposition, kickoff, minute, formation)
      values (${data.opposition}, ${data.kickoff}, ${minute}, ${data.formation})
    `;
    for (const slot of formationById(data.formation).slots) {
      const player = lineup[slot.id];
      if (!player) continue;
      await sql`
        update match_stints set slot_id = ${slot.id}
        where opposition = ${data.opposition} and kickoff = ${data.kickoff}
          and player = ${player} and off_minute is null
      `;
    }
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

export const resetLive = createServerFn({ method: "POST" })
  .validator(gameKey)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`delete from match_stints where opposition = ${data.opposition} and kickoff = ${data.kickoff}`;
    await sql`delete from match_shape_changes where opposition = ${data.opposition} and kickoff = ${data.kickoff}`;
    await sql`delete from match_live where opposition = ${data.opposition} and kickoff = ${data.kickoff}`;
    return { live: null as LiveState | null };
  });

export const liveBench = createServerFn({ method: "POST" })
  .validator(
    gameKey.extend({
      slotId: z.string().trim().min(1).max(12),
      player: z.string().trim().max(80),
    }),
  )
  .handler(async ({ data }) => {
    if (!(BENCH_SLOTS as readonly string[]).includes(data.slotId)) {
      throw new Error("That is not a bench spot.");
    }
    const sql = await getSql();
    const live = await loadLive(sql, data.opposition, data.kickoff);
    if (!live) throw new Error("Start the clock first.");
    if (live.clock.ended) throw new Error("Game is finished.");
    const lineup = { ...live.lineup };
    const player = data.player.trim();
    if (player && !isSquadPlayer(player)) throw new Error("Pick a squad player.");
    const pitchIds = formationById(live.formation).slots.map((s) => s.id);
    if (player) {
      const from = Object.entries(lineup).find(([, p]) => p === player)?.[0];
      if (from && pitchIds.includes(from)) {
        return liveOff({
          data: { opposition: data.opposition, kickoff: data.kickoff, player, toSlot: data.slotId },
        });
      }
      if (from) delete lineup[from];
      lineup[data.slotId] = player;
    } else {
      delete lineup[data.slotId];
    }
    await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
    return { live: await loadLive(sql, data.opposition, data.kickoff) };
  });

