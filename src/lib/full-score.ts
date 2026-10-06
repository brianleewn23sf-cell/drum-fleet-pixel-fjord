import type { AppearanceMap } from "@/lib/appearance-actions";
import type { AwardScoreRef, FullScore } from "@/lib/scoring";
import { autoScore, autoScoreMonth } from "@/lib/scoring";
import { parsePlayer } from "@/lib/players";
import { stampMonth } from "@/lib/vote-month";
import type { TrainingSession } from "@/lib/training";
import type { VoteRow } from "@/lib/vote-actions";
import type { FitnessTest } from "@/lib/fitness";

export type { FullScore } from "@/lib/scoring";

export function scoreFull(
  players: string[],
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  appearances?: AppearanceMap,
  tests: FitnessTest[] = [],
): FullScore[] {
  return autoScore(players, votes, awards, sessions, appearances, tests);
}

export function scoreFullMonth(
  players: string[],
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  month: string,
  appearances?: AppearanceMap,
  tests: FitnessTest[] = [],
): FullScore[] {
  return autoScoreMonth(players, votes, awards, sessions, month, appearances, tests);
}

export type MonthlyAvgFull = {
  name: string;
  months: number;
  total: number;
  avg: number;
  parentPts: number;
  oppMomPts: number;
  playersPlayerPts: number;
  trainingPts: number;
  testPts: number;
  parentAvg: number;
  oppMomAvg: number;
  playersPlayerAvg: number;
  trainingAvg: number;
  testAvg: number;
};

export function averageMonthlyFull(
  players: string[],
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  appearances?: AppearanceMap,
  tests: FitnessTest[] = [],
): MonthlyAvgFull[] {
  const months = new Set<string>();
  for (const row of votes) {
    const m = stampMonth(row.timestamp);
    if (m) months.add(m);
  }
  for (const s of sessions) {
    const m = stampMonth(s.sessionDate);
    if (m) months.add(m);
  }
  for (const a of awards) {
    const m = stampMonth(a.updatedAt || "");
    if (m) months.add(m);
  }
  for (const t of tests) {
    const m = stampMonth(t.testedOn);
    if (m) months.add(m);
  }
  const list = [...months].sort();
  if (!list.length) return [];
  type Acc = {
    total: number;
    parentPts: number;
    oppMomPts: number;
    playersPlayerPts: number;
    trainingPts: number;
    testPts: number;
  };
  const byPlayer = new Map<string, Acc>();
  for (const p of players) {
    byPlayer.set(p, {
      total: 0,
      parentPts: 0,
      oppMomPts: 0,
      playersPlayerPts: 0,
      trainingPts: 0,
      testPts: 0,
    });
  }
  for (const month of list) {
    const table = autoScoreMonth(players, votes, awards, sessions, month, appearances, tests);
    for (const row of table) {
      const acc = byPlayer.get(row.name);
      if (!acc) continue;
      acc.total += row.total;
      acc.parentPts += row.parentPts;
      acc.oppMomPts += row.oppMomPts;
      acc.playersPlayerPts += row.playersPlayerPts;
      acc.trainingPts += row.trainingPts;
      acc.testPts += row.testPts;
    }
  }
  const n = list.length;
  const avgOf = (v: number) => (n ? v / n : 0);
  return [...byPlayer.entries()]
    .map(([name, acc]) => ({
      name,
      months: n,
      total: acc.total,
      avg: avgOf(acc.total),
      parentPts: acc.parentPts,
      oppMomPts: acc.oppMomPts,
      playersPlayerPts: acc.playersPlayerPts,
      trainingPts: acc.trainingPts,
      testPts: acc.testPts,
      parentAvg: avgOf(acc.parentPts),
      oppMomAvg: avgOf(acc.oppMomPts),
      playersPlayerAvg: avgOf(acc.playersPlayerPts),
      trainingAvg: avgOf(acc.trainingPts),
      testAvg: avgOf(acc.testPts),
    }))
    .sort((a, b) => {
      if (b.avg !== a.avg) return b.avg - a.avg;
      if (b.total !== a.total) return b.total - a.total;
      return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
    });
}

export { SCORE_CATEGORIES, top3Category, topNWithTies, placeAt, type CategoryRow } from "./score-categories";
