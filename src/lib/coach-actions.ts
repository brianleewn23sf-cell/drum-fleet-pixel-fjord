import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { getInitialData, type CurrentMatch, type VoteRow } from "@/lib/vote-actions";
import { loadActiveSquad } from "@/lib/squad";
import { joinOppMom, oppMomPlayers } from "@/lib/scoring";

export type MatchAward = {
  id: number;
  gameNumber: string;
  opposition: string;
  oppMom: string | null;
  playersPlayer: string | null;
  managerPlayer: string | null;
  updatedAt: string;
};

export type AwardTally = {
  name: string;
  oppMom: number;
  playersPlayer: number;
  managerPlayer: number;
};

export function tallyAwards(players: string[], awards: MatchAward[]): AwardTally[] {
  const map = new Map<string, AwardTally>();
  for (const p of players) {
    map.set(p, { name: p, oppMom: 0, playersPlayer: 0, managerPlayer: 0 });
  }
  for (const a of awards) {
    for (const name of oppMomPlayers(a.oppMom)) {
      const row = map.get(name);
      if (row) row.oppMom += 1;
    }
    if (a.playersPlayer) {
      const row = map.get(a.playersPlayer);
      if (row) row.playersPlayer += 1;
    }
    if (a.managerPlayer && a.managerPlayer !== a.playersPlayer) {
      const row = map.get(a.managerPlayer);
      if (row) row.managerPlayer += 1;
    }
  }
  return [...map.values()].sort((a, b) => {
    const ta = a.oppMom + a.playersPlayer;
    const tb = b.oppMom + b.playersPlayer;
    if (tb !== ta) return tb - ta;
    if (b.oppMom !== a.oppMom) return b.oppMom - a.oppMom;
    return a.name.localeCompare(b.name);
  });
}

function asText(value: unknown): string | null {
  const s = String(value ?? "").trim();
  return s.length ? s : null;
}

async function loadAwards(sql: Awaited<ReturnType<typeof getSql>>): Promise<MatchAward[]> {
  try {
    const rows = await sql<Record<string, unknown>>`
      select id, game_number, opposition, opp_mom, players_player, manager_player, updated_at
      from match_awards
      order by id asc
    `;
    return rows.map((row) => ({
      id: Number(row.id) || 0,
      gameNumber: String(row.game_number || "").trim(),
      opposition: String(row.opposition || "").trim(),
      oppMom: asText(row.opp_mom),
      playersPlayer: asText(row.players_player),
      managerPlayer: asText(row.manager_player),
      updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || ""),
    }));
  } catch {
    const rows = await sql<Record<string, unknown>>`
      select id, game_number, opposition, opp_mom, players_player, updated_at
      from match_awards
      order by id asc
    `;
    return rows.map((row) => ({
      id: Number(row.id) || 0,
      gameNumber: String(row.game_number || "").trim(),
      opposition: String(row.opposition || "").trim(),
      oppMom: asText(row.opp_mom),
      playersPlayer: asText(row.players_player),
      managerPlayer: null,
      updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || ""),
    }));
  }
}

function squadMom(value: string, squad: string[]): string | null {
  const names = oppMomPlayers(value);
  if (!names.length) return null;
  if (names.some((name) => !squad.includes(name))) return null;
  return joinOppMom(names);
}

export const getCoachData = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  const base = await getInitialData();
  const awards = await loadAwards(sql);
  return {
    players: base.players,
    history: base.history as VoteRow[],
    currentMatch: base.currentMatch as CurrentMatch | null,
    awards,
    notes: (base.notes ?? {}) as Record<string, string>,
    appearances: base.appearances ?? {},
  };
});

export const saveMatchAwards = createServerFn({ method: "POST" })
  .validator(
    z.object({
      gameNumber: z.string().trim().min(1).max(80),
      opposition: z.string().trim().min(1).max(80),
      oppMom: z.string().trim().max(160),
      playersPlayer: z.string().trim().max(80),
      managerPlayer: z.string().trim().max(80),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const squad = await loadActiveSquad(sql);
    const oppMom = data.oppMom ? squadMom(data.oppMom, squad) : null;
    const playersPlayer =
      data.playersPlayer && squad.includes(data.playersPlayer) ? data.playersPlayer : null;
    const managerPlayer =
      data.managerPlayer && squad.includes(data.managerPlayer) ? data.managerPlayer : null;
    if (data.oppMom && !oppMom) {
      return { success: false as const, error: "Opposition MOM must be a squad player." };
    }
    if (data.playersPlayer && !playersPlayer) {
      return { success: false as const, error: "Players’ player must be a squad player." };
    }
    if (data.managerPlayer && !managerPlayer) {
      return { success: false as const, error: "Manager’s player must be a squad player." };
    }

    try {
      await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
        values (${data.gameNumber}, ${data.opposition}, ${oppMom}, ${playersPlayer}, ${managerPlayer}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          manager_player = excluded.manager_player,
          updated_at = now()
      `;
    } catch {
      await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, updated_at)
        values (${data.gameNumber}, ${data.opposition}, ${oppMom}, ${playersPlayer}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          updated_at = now()
      `;
    }
    return { success: true as const };
  });

export const resetParentVotes = createServerFn({ method: "POST" })
  .validator(z.object({ confirm: z.string().trim() }))
  .handler(async ({ data }) => {
    if (data.confirm !== "RESET VOTES") {
      return { success: false as const, error: "Type RESET VOTES to confirm." };
    }
    const sql = await getSql();
    await sql`delete from votes`;
    return { success: true as const };
  });

export const savePlayerNote = createServerFn({ method: "POST" })
  .validator(
    z.object({
      player: z.string().trim().min(1).max(80),
      note: z.string().trim().max(500),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const squad = await loadActiveSquad(sql);
    if (!squad.includes(data.player)) {
      return { success: false as const, error: "Pick a squad player." };
    }
    if (!data.note) {
      await sql`delete from player_notes where player = ${data.player}`;
      return { success: true as const };
    }
    await sql`
      insert into player_notes (player, note, updated_at)
      values (${data.player}, ${data.note}, now())
      on conflict (player) do update set
        note = excluded.note,
        updated_at = now()
    `;
    return { success: true as const };
  });
