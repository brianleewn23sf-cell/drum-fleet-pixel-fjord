import { format, getISOWeek, getISOWeekYear, parseISO } from "date-fns";
import { collectScoreEvents, type AwardScoreRef } from "@/lib/scoring";
import type { TrainingSession } from "@/lib/training";
import type { VoteRow } from "@/lib/vote-actions";
import type { FitnessTest } from "@/lib/fitness";

export type WeekPoint = {
  key: string;
  label: string;
  training: number;
  match: number;
  tests: number;
  total: number;
  trend?: number;
};

export function withTrend(weeks: WeekPoint[], window = 3): WeekPoint[] {
  return weeks.map((w, i) => {
    const slice = weeks.slice(Math.max(0, i - window + 1), i + 1);
    const avg = slice.reduce((sum, row) => sum + row.total, 0) / slice.length;
    return { ...w, trend: Math.round(avg * 10) / 10 };
  });
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function weekFromStamp(iso: string): { key: string; label: string; sort: string } | null {
  if (!iso) return null;
  let d: Date;
  if (/^\d{4}-\d{2}-\d{2}/.test(iso)) {
    d = parseISO(`${iso.slice(0, 10)}T12:00:00`);
  } else {
    d = new Date(iso);
  }
  if (Number.isNaN(d.getTime())) return null;
  const y = getISOWeekYear(d);
  const w = getISOWeek(d);
  return {
    key: `${y}-W${pad(w)}`,
    label: format(d, "d MMM"),
    sort: `${y}-${pad(w)}`,
  };
}

export function playerWeeks(
  player: string,
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  tests: FitnessTest[] = [],
): WeekPoint[] {
  const map = new Map<string, WeekPoint & { sort: string }>();
  for (const ev of collectScoreEvents(votes, awards, sessions, tests)) {
    if (ev.player !== player) continue;
    const w = weekFromStamp(ev.at);
    if (!w) continue;
    let row = map.get(w.key);
    if (!row) {
      row = { key: w.key, label: w.label, training: 0, match: 0, tests: 0, total: 0, sort: w.sort };
      map.set(w.key, row);
    }
    if (ev.source === "training") row.training += ev.points;
    else if (ev.source === "tests") row.tests += ev.points;
    else row.match += ev.points;
  }
  return withTrend(
    [...map.values()]
      .map((row) => ({
        key: row.key,
        label: row.label,
        training: row.training,
        match: row.match,
        tests: row.tests,
        total: row.training + row.match + row.tests,
      }))
      .sort((a, b) => a.key.localeCompare(b.key)),
  );
}
