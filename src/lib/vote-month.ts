import { computeTotals, type PlayerTotal } from "@/lib/league";
import { monthWindow, upcomingPotmMonth, type MonthWindow } from "@/lib/potm";
import { prizeMonthForDay } from "@/lib/prize-window";
import { localDateStamp } from "@/lib/when";
import type { VoteRow } from "@/lib/vote-actions";
import type { AppearanceMap } from "@/lib/appearance-actions";
import { parsePlayer } from "@/lib/players";

export function voteDay(row: VoteRow): string {
  const raw = String(row.timestamp || "").trim();
  if (!raw) return "";
  const d = new Date(raw);
  if (Number.isFinite(d.getTime())) return localDateStamp(d);
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  return "";
}

export function stampMonth(iso: string): string {
  return prizeMonthForDay(iso);
}

export function voteMonthKey(row: VoteRow): string {
  return stampMonth(row.timestamp);
}

export function votesForMonth(history: VoteRow[], month: string): VoteRow[] {
  return history.filter((row) => voteMonthKey(row) === month);
}

export function monthsWithVotes(history: VoteRow[]): string[] {
  const set = new Set<string>();
  for (const row of history) {
    const key = voteMonthKey(row);
    if (key) set.add(key);
  }
  return [...set].sort();
}

export function currentVoteMonth(d = new Date()): string {
  return upcomingPotmMonth(d);
}

export type MonthlyAvg = {
  name: string;
  months: number;
  total: number;
  avg: number;
};

export function averageMonthlyScores(
  players: string[],
  history: VoteRow[],
  appearances?: AppearanceMap,
): MonthlyAvg[] {
  const months = monthsWithVotes(history);
  if (!months.length) return [];
  const byPlayer = new Map<string, { total: number }>();
  for (const p of players) byPlayer.set(p, { total: 0 });
  for (const month of months) {
    const table = computeTotals(players, votesForMonth(history, month), appearances);
    for (const row of table) {
      const slot = byPlayer.get(row.name);
      if (slot) slot.total += row.pts;
    }
  }
  return [...byPlayer.entries()]
    .map(([name, slot]) => ({
      name,
      months: months.length,
      total: slot.total,
      avg: months.length ? slot.total / months.length : 0,
    }))
    .sort((a, b) => {
      if (b.avg !== a.avg) return b.avg - a.avg;
      if (b.total !== a.total) return b.total - a.total;
      return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
    });
}

export function monthLeaderTable(
  players: string[],
  history: VoteRow[],
  appearances?: AppearanceMap,
  month = currentVoteMonth(),
): { month: string; window: MonthWindow; table: PlayerTotal[] } {
  return {
    month,
    window: monthWindow(month),
    table: computeTotals(players, votesForMonth(history, month), appearances),
  };
}
