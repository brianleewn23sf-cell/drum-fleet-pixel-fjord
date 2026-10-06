import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import type { MatchAward } from "@/lib/coach-actions";
import { loadSessions } from "@/lib/training-actions";
import { loadFitnessTests } from "@/lib/fitness-actions";
import type { FitnessTest } from "@/lib/fitness";
import { getInitialData } from "@/lib/vote-actions";
import { restorePineVillaDay } from "@/lib/restore-pine-villa";
import { PLAYERS } from "@/lib/players";
import { autoScore } from "@/lib/scoring";
import { scoreTrainerYear } from "@/lib/trainer-year";

function asText(value: unknown): string | null {
  const s = String(value ?? "").trim();
  return s.length ? s : null;
}

export const getScoreExtras = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  await restorePineVillaDay(sql);
  let awards: MatchAward[] = [];
  try {
    const rows = await sql<Record<string, unknown>>`
      select id, game_number, opposition, opp_mom, players_player, manager_player, updated_at
      from match_awards
      order by id asc
    `;
    awards = rows.map((row) => ({
      id: Number(row.id) || 0,
      gameNumber: String(row.game_number || "").trim(),
      opposition: String(row.opposition || "").trim(),
      oppMom: asText(row.opp_mom),
      playersPlayer: asText(row.players_player),
      managerPlayer: asText(row.manager_player),
      updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || ""),
    }));
  } catch {
    awards = [];
  }
  let sessions = [] as Awaited<ReturnType<typeof loadSessions>>;
  try {
    sessions = await loadSessions(sql);
  } catch {
    sessions = [];
  }
  let tests: FitnessTest[] = [];
  try {
    tests = await loadFitnessTests(sql);
  } catch {
    tests = [];
  }
  return { awards, sessions, tests };
});

export const getBoardTotals = createServerFn({ method: "POST" }).handler(async () => {
  const votes = await getInitialData();
  const extras = await getScoreExtras();
  const players = votes.players.length ? votes.players : [...PLAYERS];
  const table = autoScore(
    players,
    votes.history,
    extras.awards,
    extras.sessions,
    votes.appearances,
    extras.tests,
  );
  const trainers = scoreTrainerYear(players, extras.sessions);
  const ladsIn = extras.sessions.reduce(
    (n, s) => n + s.marks.filter((m) => m.attended).length,
    0,
  );
  return {
    players,
    history: votes.history,
    currentMatch: votes.currentMatch,
    notes: votes.notes ?? {},
    appearances: votes.appearances ?? {},
    awards: extras.awards,
    sessions: extras.sessions,
    tests: extras.tests,
    table,
    trainers,
    voteCount: votes.history.length,
    fridayNights: extras.sessions.length,
    ladsIn,
  };
});
