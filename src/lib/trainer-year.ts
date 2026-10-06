import { matchSquadPlayer, parsePlayer } from "@/lib/players";
import { trainingTotal, type TrainingSession } from "@/lib/training";
import { asDayStamp } from "@/lib/when";

export const TRAINER_YEAR_START = "2026-09-01";
export const TRAINER_YEAR_END = "2027-06-30";
export const TRAINER_YEAR_LABEL = "Trainer of the year 2026/27";

export type TrainerYearRow = {
  name: string;
  sessions: number;
  attended: number;
  pts: number;
  avg: number | null;
};

export function inTrainerYear(day: string): boolean {
  const d = asDayStamp(day);
  return d >= TRAINER_YEAR_START && d <= TRAINER_YEAR_END;
}

export function scoreTrainerYear(players: string[], sessions: TrainingSession[]): TrainerYearRow[] {
  const map = new Map<string, TrainerYearRow>();
  for (const p of players) {
    map.set(p, { name: p, sessions: 0, attended: 0, pts: 0, avg: null });
  }
  for (const session of sessions) {
    if (!inTrainerYear(session.sessionDate)) continue;
    for (const mark of session.marks) {
      const key = matchSquadPlayer(players, mark.player);
      const row = key ? map.get(key) : undefined;
      if (!row) continue;
      row.sessions += 1;
      if (!mark.attended) continue;
      row.attended += 1;
      row.pts += trainingTotal(mark) ?? 0;
    }
  }
  return [...map.values()]
    .map((row) => ({
      ...row,
      avg: row.attended ? Math.round((row.pts / row.attended) * 10) / 10 : null,
    }))
    .sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      if (b.attended !== a.attended) return b.attended - a.attended;
      return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
    });
}
