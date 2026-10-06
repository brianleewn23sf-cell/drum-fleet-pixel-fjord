import { matchSquadPlayer } from "@/lib/players";
import { localDateStamp } from "@/lib/when";

export const ATTENDANCE_POINTS = 10;
export const TRAINING_MARK_MAX = 10;
export const TRAINING_AWARD_MAX = ATTENDANCE_POINTS + TRAINING_MARK_MAX * 3;
/** First Friday of the 2026/27 season. Training is every Friday from this night. */
export const SEASON_TRAINING_START = "2026-09-04";

export function seasonFridays(until = localDateStamp()): string[] {
  const [ys, ms, ds] = SEASON_TRAINING_START.split("-").map(Number);
  const [ye, me, de] = until.split("-").map(Number);
  const start = Date.UTC(ys, ms - 1, ds);
  const end = Date.UTC(ye, me - 1, de);
  const out: string[] = [];
  for (let t = start; t <= end; t += 7 * 86400000) {
    out.push(new Date(t).toISOString().slice(0, 10));
  }
  return out;
}

export function fridayLabel(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}

/** Points that Friday, capped at 40. Null when that night has not been marked at all. */
export function fridayMark(sessions: TrainingSession[], player: string, day: string): number | null {
  const session = sessions.find((s) => s.sessionDate.slice(0, 10) === day);
  if (!session) return null;
  const mark = session.marks.find((m) => m.player === player);
  if (!mark || !mark.attended) return 0;
  return trainingTotal(mark);
}

export type TrainingMark = {
  player: string;
  attended: boolean;
  score: number | null;
  effort: number | null;
  attitude: number | null;
  achievement: number | null;
};

export type TrainingSession = {
  sessionDate: string;
  label: string;
  marks: TrainingMark[];
};

export type TrainingSummary = {
  player: string;
  sessions: number;
  attended: number;
  pct: number;
  avgEffort: number | null;
  avgAttitude: number | null;
  avgAchievement: number | null;
  avgTotal: number | null;
};

export function trainingTotal(
  mark: Pick<TrainingMark, "attended" | "effort" | "attitude" | "achievement">,
): number | null {
  if (!mark.attended) return null;
  const raw = ATTENDANCE_POINTS + (mark.effort ?? 0) + (mark.attitude ?? 0) + (mark.achievement ?? 0);
  return Math.min(TRAINING_AWARD_MAX, Math.max(0, raw));
}

function avg(sum: number, n: number): number | null {
  return n ? sum / n : null;
}

export function summariseTraining(
  players: string[],
  sessions: TrainingSession[],
): TrainingSummary[] {
  return players
    .map((player) => {
      let sessionsCount = 0;
      let attended = 0;
      let effortSum = 0;
      let effortN = 0;
      let attSum = 0;
      let attN = 0;
      let achSum = 0;
      let achN = 0;
      let totalSum = 0;
      let totalN = 0;
      for (const session of sessions) {
        const mark = session.marks.find(
          (m) => m.player === player || matchSquadPlayer([player], m.player) === player,
        );
        if (!mark) continue;
        sessionsCount += 1;
        if (!mark.attended) continue;
        attended += 1;
        if (mark.effort !== null) {
          effortSum += mark.effort;
          effortN += 1;
        }
        if (mark.attitude !== null) {
          attSum += mark.attitude;
          attN += 1;
        }
        if (mark.achievement !== null) {
          achSum += mark.achievement;
          achN += 1;
        }
        const tot = trainingTotal(mark);
        if (tot !== null) {
          totalSum += tot;
          totalN += 1;
        }
      }
      return {
        player,
        sessions: sessionsCount,
        attended,
        pct: sessionsCount ? (attended / sessionsCount) * 100 : 0,
        avgEffort: avg(effortSum, effortN),
        avgAttitude: avg(attSum, attN),
        avgAchievement: avg(achSum, achN),
        avgTotal: avg(totalSum, totalN),
      };
    })
    .sort((a, b) => {
      const totA = a.avgTotal ?? -1;
      const totB = b.avgTotal ?? -1;
      if (totB !== totA) return totB - totA;
      if (b.pct !== a.pct) return b.pct - a.pct;
      return a.player.localeCompare(b.player);
    });
}
