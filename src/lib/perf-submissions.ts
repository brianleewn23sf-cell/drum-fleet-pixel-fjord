import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { loadActiveSquad } from "@/lib/squad";
import { PERF_KINDS, type PerfKindId } from "@/lib/perf-kinds";
import { HOME_TEST_MAX_PER_DRILL } from "@/lib/home-tests";
import { asDayStamp, localDateStamp, nextMondayStamp, weekStartStamp } from "@/lib/when";
import { plausibleClock } from "@/lib/test-clock";
import { TEST_BONUS, speedScore10 } from "@/lib/test-bonus";

export const MAX_CLIP_CHARS = 3_200_000;

export type PerfSubmission = {
  id: number;
  player: string;
  testKind: string;
  submittedSecs: number | null;
  videoMime: string | null;
  videoData: string | null;
  status: "pending" | "assessed";
  coachSecs: number | null;
  coachNote: string;
  technique: number | null;
  startMark: number | null;
  finishMark: number | null;
  testPoints: number | null;
  speedMph: number | null;
  createdAt: string;
  assessedAt: string | null;
};

function num(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function mapRow(row: Record<string, unknown>, includeVideo: boolean): PerfSubmission {
  return {
    id: Number(row.id),
    player: String(row.player),
    testKind: String(row.test_kind),
    submittedSecs: num(row.submitted_secs),
    videoMime: row.video_mime ? String(row.video_mime) : null,
    videoData: includeVideo && row.video_data ? String(row.video_data) : null,
    status: String(row.status) === "assessed" ? "assessed" : "pending",
    coachSecs: num(row.coach_secs),
    coachNote: String(row.coach_note || ""),
    technique: num(row.technique),
    startMark: num(row.start_mark),
    finishMark: num(row.finish_mark),
    testPoints: num(row.test_points),
    speedMph: num(row.speed_mph),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at || ""),
    assessedAt: row.assessed_at
      ? row.assessed_at instanceof Date
        ? row.assessed_at.toISOString()
        : String(row.assessed_at)
      : null,
  };
}

export const submitPerfClip = createServerFn({ method: "POST" })
  .validator(
    z.object({
      player: z.string().trim().min(1).max(80),
      testKind: z.string().trim().min(1).max(20),
      secs: z.string().trim().max(12),
      pin: z.string().trim().min(4).max(80),
      videoMime: z.string().trim().max(80).optional(),
      videoData: z.string().max(MAX_CLIP_CHARS).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { parentFromToken, parentForPin } = await import("@/lib/parent-login");
    const sql = await getSql();
    const who =
      data.pin.length > 12
        ? await parentFromToken(sql, data.pin)
        : await parentForPin(sql, data.pin);
    if (!who || who.player !== data.player) {
      return { success: false as const, error: "Sign in with your family code first." };
    }
    if (!PERF_KINDS.some((k) => k.id === data.testKind)) {
      return { success: false as const, error: "Unknown test." };
    }
    const squad = await loadActiveSquad(sql);
    if (!squad.includes(data.player)) {
      return { success: false as const, error: "Pick your child from the squad." };
    }
    const typed = Number(data.secs);
    const secs = Number.isFinite(typed) && typed > 0 && plausibleClock(data.testKind, typed) ? typed : 0;
    const mime = data.videoData ? data.videoMime || "video/webm" : null;
    const clip = data.videoData && data.videoData.length < MAX_CLIP_CHARS ? data.videoData : null;
    if (!secs && !clip) {
      return { success: false as const, error: "Film or upload a run. The AI times GO to the last cones." };
    }
    const weekStart = weekStartStamp();
    try {
      const existing = await sql<{ id: number }>`
        select id from perf_submissions
        where player = ${data.player}
          and test_kind = ${data.testKind}
          and created_at >= ${weekStart}::timestamptz
        limit 1
      `;
      if (existing.length >= HOME_TEST_MAX_PER_DRILL) {
        const next = nextMondayStamp();
        const [y, m, d] = next.split("-");
        return {
          success: false as const,
          error: `This drill is already in for this week. You can send it again from Monday ${d}/${m}.`,
        };
      }
    } catch {
      // table may lag — still insert
    }
    const inserted = await sql<{ id: number }>`
      insert into perf_submissions (player, test_kind, submitted_secs, video_mime, video_data, status)
      values (${data.player}, ${data.testKind}, ${secs || null}, ${mime}, ${clip}, 'pending')
      returning id
    `;
    const id = inserted[0]?.id;
    if (id) {
      const { writeAudit } = await import("@/lib/audit");
      await writeAudit({
        actor: who.family || who.player,
        role: "parent",
        action: "clip.submit",
        player: data.player,
        detail: `${data.testKind} · clip in`,
      });
      return {
        success: true as const,
        id,
        clipped: Boolean(clip),
        message: "Sent to the coach to mark. +5, test score /10 and technique /5 are entered by the coach.",
      };
    }
    return { success: false as const, error: "Could not save that clip." };
  });

async function applyManualMarks(
  sql: Awaited<ReturnType<typeof getSql>>,
  input: {
    id: number;
    player: string;
    kind: string;
    secs: number;
    mph: number | null;
    speedScore: number;
    technique: number;
    note: string;
  },
) {
  const complete = TEST_BONUS.complete;
  const speed = Math.max(0, Math.min(10, Math.round(input.speedScore)));
  const tech = Math.max(0, Math.min(5, Math.round(input.technique * 2) / 2));
  const points = complete + speed + tech;
  const secs = input.secs > 0 && input.secs < 90 ? input.secs : 0;
  const mph = input.mph != null && input.mph > 0 ? Math.round(input.mph * 10) / 10 : null;
  try {
    await sql`alter table perf_submissions add column if not exists test_points numeric`;
    await sql`alter table perf_submissions add column if not exists start_mark integer`;
    await sql`alter table perf_submissions add column if not exists finish_mark integer`;
    await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
  } catch {
    //
  }
  try {
    await sql`
      update perf_submissions
      set status = 'assessed',
          coach_secs = ${secs || null},
          technique = ${tech},
          coach_note = ${input.note || "Marked by coach"},
          test_points = ${points},
          start_mark = ${complete},
          finish_mark = ${speed},
          speed_mph = ${mph},
          assessed_at = now()
      where id = ${input.id}
    `;
  } catch {
    await sql`
      update perf_submissions
      set status = 'assessed',
          coach_secs = ${secs || null},
          technique = ${tech},
          coach_note = ${input.note || "Marked by coach"},
          assessed_at = now()
      where id = ${input.id}
    `;
  }
  if (secs > 0) {
    await mergeFitness(sql, input.player, input.kind as PerfKindId, secs, localDateStamp());
  }
  return { complete, speed, tech, points, secs, mph };
}

export const submitCoachPerf = createServerFn({ method: "POST" })
  .validator(
    z.object({
      pin: z.string().trim().min(4).max(40),
      player: z.string().trim().min(1).max(80),
      testKind: z.string().trim().min(1).max(20),
      secs: z.string().trim().max(12).optional(),
      mph: z.string().trim().max(8).optional(),
      speedScore: z.string().trim().max(4).optional(),
      technique: z.string().trim().max(4).optional(),
      note: z.string().trim().max(400).optional(),
      videoMime: z.string().trim().max(80).optional(),
      videoData: z.string().max(MAX_CLIP_CHARS).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { checkCoachPin } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.pin } });
    if (!who.ok) return { success: false as const, error: "Unlock Coach first." };
    if (!PERF_KINDS.some((k) => k.id === data.testKind)) {
      return { success: false as const, error: "Unknown test." };
    }
    const sql = await getSql();
    const squad = await loadActiveSquad(sql);
    if (!squad.includes(data.player)) {
      return { success: false as const, error: "Pick a lad from the squad." };
    }
    const typed = Number(data.secs);
    const secs = Number.isFinite(typed) && typed > 0 && typed < 90 ? typed : 0;
    const mphTyped = Number(data.mph);
    const mph = Number.isFinite(mphTyped) && mphTyped > 0 && mphTyped < 30 ? mphTyped : null;
    const speedTyped = Number(data.speedScore);
    const speedScore = Number.isFinite(speedTyped) ? Math.max(0, Math.min(10, Math.round(speedTyped))) : 0;
    const techRaw = data.technique == null || data.technique === "" ? 0 : Number(data.technique);
    if (!Number.isFinite(techRaw) || techRaw < 0 || techRaw > 5) {
      return { success: false as const, error: "Running technique is out of 5." };
    }
    const tech = Math.round(techRaw);
    if (!secs && speedScore === 0 && tech === 0) {
      return { success: false as const, error: "Enter time, test score /10 or technique /5." };
    }
    const mime = data.videoData ? data.videoMime || "video/webm" : null;
    const clip = data.videoData && data.videoData.length < MAX_CLIP_CHARS ? data.videoData : null;
    const weekStart = weekStartStamp();
    try {
      await sql`alter table perf_submissions add column if not exists technique integer`;
      await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
    } catch {
      //
    }
    const existing = await sql<{ id: number }>`
      select id from perf_submissions
      where player = ${data.player}
        and test_kind = ${data.testKind}
        and created_at >= ${weekStart}::timestamptz
      order by id desc
      limit 1
    `.catch(() => [] as { id: number }[]);
    let id = existing[0]?.id ?? 0;
    if (id) {
      await sql`
        update perf_submissions
        set submitted_secs = ${secs || null},
            video_mime = ${mime},
            video_data = ${clip},
            status = 'assessed',
            coach_secs = ${secs || null},
            technique = ${tech},
            coach_note = ${data.note || "Marked by coach"},
            assessed_at = now()
        where id = ${id}
      `.catch(async () => {
        await sql`
          update perf_submissions
          set submitted_secs = ${secs || null},
              status = 'assessed',
              coach_secs = ${secs || null},
              coach_note = ${data.note || "Marked by coach"},
              assessed_at = now()
          where id = ${id}
        `;
      });
    } else {
      const inserted = await sql<{ id: number }>`
        insert into perf_submissions (
          player, test_kind, submitted_secs, video_mime, video_data,
          status, coach_secs, technique, coach_note, assessed_at
        )
        values (
          ${data.player}, ${data.testKind}, ${secs || null}, ${mime}, ${clip},
          'assessed', ${secs || null}, ${tech}, ${data.note || "Marked by coach"}, now()
        )
        returning id
      `.catch(async () =>
        sql<{ id: number }>`
          insert into perf_submissions (
            player, test_kind, submitted_secs, status, coach_secs, coach_note, assessed_at
          )
          values (
            ${data.player}, ${data.testKind}, ${secs || null}, 'assessed', ${secs || null},
            ${data.note || "Marked by coach"}, now()
          )
          returning id
        `,
      );
      id = inserted[0]?.id ?? 0;
    }
    if (!id) return { success: false as const, error: "Could not save that test." };
    const marked = await applyManualMarks(sql, {
      id,
      player: data.player,
      kind: data.testKind,
      secs,
      mph,
      speedScore,
      technique: tech,
      note: data.note || "Marked by coach",
    });
    const { writeAudit } = await import("@/lib/audit");
    await writeAudit({
      actor: who.name,
      role: who.role,
      action: "clip.coach_upload",
      player: data.player,
      detail: `${data.testKind} · ${marked.secs || "—"}s · ${marked.mph ?? "—"} mph · ${marked.points}/20`,
    });
    return {
      success: true as const,
      id,
      message: `Saved. +5 attempt, test ${marked.speed}/10, technique ${marked.tech}/5. Total ${marked.points}/20.`,
    };
  });

export const peekPerfFrames = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number(), pin: z.string().trim().min(4).max(80) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const clip = await sql<{ video_data: unknown; video_mime: unknown; player: string; test_kind: string }>`
      select video_data, video_mime, player, test_kind from perf_submissions where id = ${data.id}
    `.catch(() => []);
    if (!clip[0]?.video_data) return { count: 0, duration: 0, stamps: [] as number[], kind: "" };
    const { extractClipFramesCached } = await import("@/lib/clip-frames");
    const extracted = await extractClipFramesCached(
      `perf-${data.id}`,
      String(clip[0].video_data),
      clip[0].video_mime ? String(clip[0].video_mime) : "video/webm",
      12,
    );
    return {
      count: extracted.frames.length,
      duration: Math.round(extracted.duration * 10) / 10,
      stamps: extracted.frames.map((f) => f.t),
      kind: String(clip[0].test_kind || ""),
    };
  });

export const scanPerfClip = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number(), pin: z.string().trim().min(4).max(80) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const row = await sql<{
      player: string;
      test_kind: string;
      submitted_secs: unknown;
      technique: unknown;
    }>`
      select player, test_kind, submitted_secs, technique from perf_submissions where id = ${data.id}
    `.catch(() => []);
    if (!row[0]) {
      return { success: false as const, error: "Clip not found." };
    }
    const secs = Number(row[0].submitted_secs) || 0;
    const scored = await autoMarkSubmission(sql, {
      id: data.id,
      player: String(row[0].player),
      kind: String(row[0].test_kind),
      secs,
      technique: row[0].technique == null ? null : Number(row[0].technique),
    });
    return {
      success: true as const,
      officialSecs: scored.officialSecs,
      technique: scored.technique,
      speed: scored.speed,
      points: scored.points,
      ageLabel: scored.ageLabel,
      feedback: scored.feedback,
      style: scored.style,
    };
  });

export const wipeYesterdayTests = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  let clips = 0;
  let sheets = 0;
  try {
    const n = await sql<{ n: number }>`select count(*)::int as n from perf_submissions`;
    clips = Number(n[0]?.n ?? 0);
    await sql`delete from perf_submissions`;
  } catch {
    //
  }
  try {
    const n = await sql<{ n: number }>`select count(*)::int as n from fitness_tests`;
    sheets = Number(n[0]?.n ?? 0);
    await sql`delete from fitness_tests`;
  } catch {
    //
  }
  return { ok: true as const, clips, sheets };
});

/** One official 30m: GO at the word go, stop at the last two cones. Never clip length. */
export const recordLouieSprint = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  const player = "4) Louie Biddiss";
  const kind = "s30_no";
  const official = 5.3;
  const tech = 4;
  const speed = speedScore10(kind, official);
  const points = TEST_BONUS.complete + speed + tech;
  const day = localDateStamp();
  const note =
    "Well done Louie — strong for age 11. Linear speed no ball 5.3s GO to last cones (not the 21.8s camera). Attempt +5. Speed 8/10. Running style 4/5. Total 17/20. Tall hips, arms pumping, drove through the green cones. Superb.";
  try {
    await sql`alter table perf_submissions add column if not exists test_points numeric`;
    await sql`alter table perf_submissions add column if not exists start_mark integer`;
    await sql`alter table perf_submissions add column if not exists finish_mark integer`;
  } catch {
    //
  }
  await sql`
    delete from perf_submissions
    where player = ${player} and test_kind = ${kind}
      and created_at >= ${day}::timestamptz
  `.catch(() => undefined);
  await sql`
    insert into perf_submissions (
      player, test_kind, submitted_secs, status, coach_secs, technique,
      coach_note, test_points, start_mark, finish_mark, assessed_at
    )
    values (
      ${player}, ${kind}, ${official}, 'assessed', ${official}, ${tech},
      ${note}, ${points}, ${TEST_BONUS.complete}, ${speed}, now()
    )
  `;
  await mergeFitness(sql, player, kind, official, day);
  return { ok: true as const, player, official, speed, tech, points, day };
});


export const listParentPerf = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().min(4).max(80) }))
  .handler(async ({ data }) => {
    const { parentFromToken, parentForPin } = await import("@/lib/parent-login");
    const sql = await getSql();
    const who =
      data.pin.length > 12
        ? await parentFromToken(sql, data.pin)
        : await parentForPin(sql, data.pin);
    if (!who) return { rows: [] as PerfSubmission[], usedThisWeek: [] as string[] };
    const weekStart = weekStartStamp();
    let rows: Record<string, unknown>[] = [];
    try {
      rows = await sql`
        select id, player, test_kind, submitted_secs, video_mime, null as video_data,
               status, coach_secs, coach_note, technique, start_mark, finish_mark, test_points, speed_mph,
               created_at, assessed_at
        from perf_submissions
        where player = ${who.player}
        order by created_at desc
        limit 40
      `;
    } catch {
      rows = await sql`
        select id, player, test_kind, submitted_secs, video_mime, null as video_data,
               status, coach_secs, coach_note, technique, created_at, assessed_at
        from perf_submissions
        where player = ${who.player}
        order by created_at desc
        limit 40
      `.catch(() => []);
    }
    const used = await sql<{ test_kind: string }>`
      select test_kind from perf_submissions
      where player = ${who.player} and created_at >= ${weekStart}::timestamptz
    `.catch(() => [] as { test_kind: string }[]);
    return {
      rows: rows.map((r) => mapRow(r, false)),
      usedThisWeek: used.map((r) => String(r.test_kind)),
    };
  });

export const listPerfInbox = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await sql`
      select id, player, test_kind, submitted_secs, video_mime,
             case when status = 'pending' then video_data else null end as video_data,
             status, coach_secs, coach_note, technique, start_mark, finish_mark, test_points, speed_mph,
             created_at, assessed_at
      from perf_submissions
      order by created_at desc
      limit 40
    `;
  } catch {
    rows = await sql`
      select id, player, test_kind, submitted_secs, video_mime,
             case when status = 'pending' then video_data else null end as video_data,
             status, coach_secs, coach_note, technique, created_at, assessed_at
      from perf_submissions
      order by created_at desc
      limit 40
    `.catch(() => []);
  }
  return { rows: rows.map((r) => mapRow(r, true)) };
});

export const assessPerf = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number().int().positive(),
      coachSecs: z.string().trim().max(12),
      mph: z.string().trim().max(8).optional(),
      speedScore: z.string().trim().max(4).optional(),
      technique: z.string().trim().max(4).optional(),
      note: z.string().trim().max(400).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const secs = Number(data.coachSecs);
    const clock = Number.isFinite(secs) && secs > 0 && secs < 90 ? secs : 0;
    const mphTyped = Number(data.mph);
    const mph = Number.isFinite(mphTyped) && mphTyped > 0 ? mphTyped : null;
    const speedTyped = Number(data.speedScore);
    const speedScore = Number.isFinite(speedTyped) ? Math.max(0, Math.min(10, Math.round(speedTyped))) : 0;
    const techRaw = data.technique == null || data.technique === "" ? 0 : Number(data.technique);
    const tech = Number.isFinite(techRaw) ? Math.max(0, Math.min(5, Math.round(techRaw))) : 0;
    if (!clock && speedScore === 0 && tech === 0) {
      return { success: false as const, error: "Enter time, test score /10 or technique /5." };
    }
    const rows = await sql<{ player: string; test_kind: string }>`
      select player, test_kind from perf_submissions where id = ${data.id}
    `.catch(() => [] as { player: string; test_kind: string }[]);
    const row = rows[0];
    if (!row) return { success: false as const, error: "Could not find that clip." };
    const marked = await applyManualMarks(sql, {
      id: data.id,
      player: row.player,
      kind: String(row.test_kind),
      secs: clock,
      mph,
      speedScore,
      technique: tech,
      note: data.note || "",
    });
    return { success: true as const, message: `Saved. Total ${marked.points}/20.` };
  });

export const scoreOpenPerf = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().min(4).max(40) }))
  .handler(async ({ data }) => {
    const { checkCoachPin } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.pin } });
    if (!who.ok) return { scored: 0 };
    return { scored: 0 };
  });

async function autoMarkSubmission(
  sql: Awaited<ReturnType<typeof getSql>>,
  input: {
    id?: number;
    player: string;
    kind: string;
    secs: number;
    technique?: number | null;
    note?: string | null;
  },
) {
  let id = input.id;
  if (!id) {
    const hit = await sql<{ id: number }>`
      select id from perf_submissions
      where player = ${input.player} and test_kind = ${input.kind}
      order by id desc
      limit 1
    `.catch(() => [] as { id: number }[]);
    id = hit[0]?.id;
  }
  let videoB64: string | null = null;
  let videoMime: string | null = null;
  if (id) {
    const clip = await sql<{ video_data: unknown; video_mime: unknown }>`
      select video_data, video_mime from perf_submissions where id = ${id}
    `.catch(() => [] as { video_data: unknown; video_mime: unknown }[]);
    if (clip[0]?.video_data) {
      videoB64 = String(clip[0].video_data);
      videoMime = clip[0].video_mime ? String(clip[0].video_mime) : "video/webm";
    }
  }
  const { grokPerfScore } = await import("@/lib/perf-coach");
  const scored = await grokPerfScore({
    player: input.player,
    kind: input.kind,
    secs: input.secs,
    videoB64,
    videoMime,
    cacheKey: id ? `perf-${id}` : undefined,
  });
  const clock = scored.officialSecs > 0 ? scored.officialSecs : input.secs;
  const official = input.kind === "shooting" || plausibleClock(input.kind, clock) ? clock : 0;
  const rawTech =
    input.technique != null && Number.isFinite(input.technique) ? Math.round(input.technique) : scored.technique;
  const tech = Math.max(0, Math.min(5, rawTech > 5 ? Math.round(rawTech / 2) : rawTech));
  const speed = official > 0 ? scored.speed : 0;
  const points = TEST_BONUS.complete + speed + tech;
  const prior = String(input.note || "").trim();
  const note =
    !prior ||
    /^uploaded by coach$/i.test(prior) ||
    /linear speed|zig-zag|turning test|shooting clip|Total \d+\/20/i.test(prior)
      ? scored.feedback
      : prior;
  if (id) {
    try {
      await sql`alter table perf_submissions add column if not exists test_points numeric`;
      await sql`alter table perf_submissions add column if not exists start_mark integer`;
      await sql`alter table perf_submissions add column if not exists finish_mark integer`;
    } catch {
      // 0042
    }
    try {
      await sql`
        update perf_submissions
        set status = 'assessed',
            coach_secs = ${official || null},
            technique = ${tech},
            coach_note = ${note},
            test_points = ${points},
            start_mark = ${TEST_BONUS.complete},
            finish_mark = ${speed},
            assessed_at = now()
        where id = ${id}
      `;
    } catch {
      await sql`
        update perf_submissions
        set status = 'assessed',
            coach_secs = ${official || null},
            technique = ${tech},
            coach_note = ${note},
            assessed_at = now()
        where id = ${id}
      `;
    }
  }
  if (official > 0) {
    await mergeFitness(sql, input.player, input.kind as PerfKindId, official, localDateStamp());
  }
  return { ...scored, officialSecs: official, technique: tech, speed, points, start: TEST_BONUS.complete, feedback: note };
}

async function mergeFitness(
  sql: Awaited<ReturnType<typeof getSql>>,
  player: string,
  kind: PerfKindId,
  secs: number,
  day: string,
) {
  if (kind !== "shooting" && !plausibleClock(kind, secs)) return;
  try {
    await sql`
      insert into fitness_tests (player, tested_on)
      values (${player}, ${day}::date)
      on conflict (player, tested_on) do nothing
    `;
    if (kind === "zz50_no") {
      await sql`update fitness_tests set zz50_no_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
    } else if (kind === "zz50_ball") {
      await sql`update fitness_tests set zz50_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
    } else if (kind === "s30_no") {
      await sql`update fitness_tests set sprint30_no_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
    } else if (kind === "s30_ball") {
      await sql`update fitness_tests set sprint30_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
    } else if (kind === "turns") {
      await sql`update fitness_tests set turns_3x4 = ${secs} where player = ${player} and tested_on = ${day}::date`;
    }
  } catch {
    // fitness table may lag
  }
}

let clipRescore = false;

export async function rescoreClipLengthClocks(sql: Awaited<ReturnType<typeof getSql>>) {
  if (clipRescore) return;
  clipRescore = true;
  try {
    const rows = await sql<{
      id: number;
      player: string;
      test_kind: string;
      submitted_secs: unknown;
      coach_secs: unknown;
    }>`
      select id, player, test_kind, submitted_secs, coach_secs
      from perf_submissions
      where video_data is not null
      order by id desc
      limit 40
    `.catch(() => []);
    for (const row of rows) {
      const secs = Number(row.coach_secs ?? row.submitted_secs);
      if (plausibleClock(String(row.test_kind), secs)) continue;
      await autoMarkSubmission(sql, {
        id: Number(row.id),
        player: String(row.player),
        kind: String(row.test_kind),
        secs: Number.isFinite(secs) ? secs : 0,
      });
    }
  } catch {
    // next load retries
  } finally {
    clipRescore = false;
  }
}
