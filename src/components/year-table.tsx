"use client";

import { useMemo } from "react";
import { averageMonthlyFull, scoreFull, scoreFullMonth } from "@/lib/full-score";
import { openPrizeMonth, prizeMonthTitle, shiftPrizeMonth } from "@/lib/prize-window";
import { publicName } from "@/lib/players";
import { StickyScoreTable, type ScoreCol } from "@/components/sticky-score-table";
import { fridayLabel, fridayMark, seasonFridays } from "@/lib/training";
import { playerDrillLines } from "@/lib/test-bonus";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import type { VoteRow } from "@/lib/vote-actions";

function fmt(n: number) {
  if (!Number.isFinite(n) || n === 0) return "0";
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

function monthsSoFar(): string[] {
  const end = openPrizeMonth();
  const list: string[] = [];
  let month = "2026-09";
  for (let i = 0; i < 16 && month <= end; i++) {
    list.push(month);
    month = shiftPrizeMonth(month, 1);
  }
  return list;
}

export function YearTable({
  players,
  history,
  appearances,
  awards = [],
  sessions = [],
  tests = [],
  yearOnly = false,
}: {
  players: string[];
  history: VoteRow[];
  appearances?: AppearanceMap;
  awards?: MatchAward[];
  sessions?: TrainingSession[];
  tests?: FitnessTest[];
  /** Just the season total, for sitting under the coach table. */
  yearOnly?: boolean;
}) {
  const months = monthsSoFar();
  const byMonth = useMemo(
    () =>
      months.map((month) => ({
        month,
        title: prizeMonthTitle(month),
        rows: scoreFullMonth(players, history, awards, sessions, month, appearances, tests).filter(
          (row) => row.total > 0,
        ),
      })),
    [months, players, history, awards, sessions, appearances, tests],
  );
  const year = useMemo(
    () =>
      scoreFull(players, history, awards, sessions, appearances, tests).filter((row) =>
        yearOnly ? true : row.total > 0,
      ),
    [players, history, awards, sessions, appearances, tests, yearOnly],
  );
  const averages = useMemo(
    () => averageMonthlyFull(players, history, awards, sessions, appearances, tests).filter((row) => row.total > 0),
    [players, history, awards, sessions, appearances, tests],
  );
  const avgBy = useMemo(() => new Map(averages.map((row) => [row.name, row.avg])), [averages]);
  const monthsN = averages[0]?.months ?? months.length;
  const yearBy = useMemo(() => new Map(year.map((row) => [row.name, row.total])), [year]);
  const leader = year[0];
  const monthsDesc = [...byMonth].reverse();
  const liveMonth = openPrizeMonth();
  const monthBy = useMemo(() => {
    const hit = byMonth.find((m) => m.month === liveMonth);
    return new Map((hit?.rows ?? []).map((row) => [row.name, row.total]));
  }, [byMonth, liveMonth]);
  const sprintBy = useMemo(() => {
    const map = new Map<string, { time: number; label: string }>();
    for (const row of year) {
      const line = playerDrillLines(tests, row.name).find((l) => l.kind === "s30_no");
      const time = line?.time && line.time > 0 ? line.time : 0;
      map.set(row.name, {
        time,
        label: time ? (line?.timeLabel ?? "—") : "—",
      });
    }
    return map;
  }, [year, tests]);

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          {yearOnly ? "Overall year" : "Player of the year"}
        </h3>
        <p className="mb-3 text-sm text-muted">
          Every Friday from 4 Sep, max 40 a night, then the games: 3-2-1, MOM, manager, and 5 for every game played, plus tests.
          A dash is a Friday that has not been marked, so it is not in the total.
          Overall is those points added up. Month, average and 30m sit after it and are not added again.
        </p>
        {leader ? (
          <p className="mb-3 font-display text-2xl font-bold uppercase tracking-tight">
            1st · {publicName(leader.name)} · {fmt(leader.total)} · avg {fmt(avgBy.get(leader.name) ?? 0)}
          </p>
        ) : null}
        {year.length ? (
          <StickyScoreTable
            rows={year}
            defaultSort="total"
            cols={[
              ...seasonFridays().map((day) => ({
                id: `fri-${day}`,
                label: fridayLabel(day),
                value: (row: { name: string }) => fridayMark(sessions, row.name, day) ?? -1,
                text: (row: { name: string }) => {
                  const pts = fridayMark(sessions, row.name, day);
                  return pts == null ? "—" : String(pts);
                },
              })),
              { id: "training", label: "Train", value: (row) => row.trainingPts },
              { id: "parents", label: "3-2-1", value: (row) => row.parentPts },
              { id: "mom", label: "MOM", value: (row) => row.oppMomPts },
              { id: "manager", label: "Mgr", value: (row) => row.playersPlayerPts },
              { id: "played", label: "Played", value: (row) => row.playedPts },
              { id: "tests", label: "Tests", value: (row) => row.testPts },
              { id: "total", label: "Overall", value: (row) => row.total },
              { id: "month", label: "Month", value: (row) => monthBy.get(row.name) ?? 0 },
              { id: "avg", label: "Avg", value: (row) => avgBy.get(row.name) ?? 0 },
              {
                id: "s30",
                label: "30m",
                value: (row) => sprintBy.get(row.name)?.time ?? 0,
                text: (row) => sprintBy.get(row.name)?.label ?? "—",
                faster: true,
              },
            ]}
          />
        ) : (
          <p className="text-sm text-muted">No season points yet.</p>
        )}
      </section>

      {yearOnly
        ? null
        : monthsDesc.map(({ month, title, rows }) => (
        <section key={month} className="rounded-xl border border-border bg-surface p-4 shadow-panel">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h3>
          <p className="mb-3 text-sm text-muted">
            {month === "2026-09"
              ? "Closed 21 Sep. Friday 25 Sep is in October, so lads who only trained that night show here as 0."
              : "22 Sep to the 3rd Monday. Friday 25 Sep and Friday 2 Oct both count."}
          </p>
          {rows.length ? (
            <ScoreRows rows={rows} overall={yearBy} />
          ) : (
            <p className="text-sm text-muted">No points in this month yet.</p>
          )}
        </section>
      ))}
    </div>
  );
}

function ScoreRows({
  rows,
  overall,
}: {
  rows: { name: string; parentPts: number; trainingPts: number; testPts: number; oppMomPts: number; playersPlayerPts: number; playedPts: number; total: number }[];
  overall?: Map<string, number>;
}) {
  const cols: ScoreCol<(typeof rows)[number]>[] = [
    { id: "parents", label: "3-2-1", value: (row) => row.parentPts },
    { id: "training", label: "Train", value: (row) => row.trainingPts },
    { id: "tests", label: "Tests", value: (row) => row.testPts },
    { id: "mom", label: "MOM", value: (row) => row.oppMomPts },
    { id: "manager", label: "Mgr", value: (row) => row.playersPlayerPts },
    { id: "played", label: "Played", value: (row) => row.playedPts },
    { id: "total", label: overall ? "Month" : "Tot", value: (row) => row.total },
  ];
  if (overall) cols.push({ id: "overall", label: "Overall", value: (row) => overall.get(row.name) ?? 0 });
  return <StickyScoreTable rows={rows} cols={cols} defaultSort="total" />;
}
