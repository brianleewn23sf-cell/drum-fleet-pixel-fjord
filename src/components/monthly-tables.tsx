"use client";

import type { MatchAward } from "@/lib/coach-actions";
import { averageMonthlyFull, scoreFullMonth } from "@/lib/full-score";
import { topNWithTies } from "@/lib/score-categories";
import { monthWindow } from "@/lib/potm";
import { StickyScoreTable, type ScoreCol } from "@/components/sticky-score-table";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import type { VoteRow } from "@/lib/vote-actions";

type MonthRow = {
  name: string;
  parentPts: number;
  trainingPts: number;
  testPts: number;
  oppMomPts: number;
  playersPlayerPts: number;
  playedPts: number;
  total: number;
};

const MONTH_COLS: ScoreCol<MonthRow>[] = [
  { id: "parents", label: "3-2-1", value: (row) => row.parentPts },
  { id: "training", label: "Train", value: (row) => row.trainingPts },
  { id: "tests", label: "Tests", value: (row) => row.testPts },
  { id: "mom", label: "MOM", value: (row) => row.oppMomPts },
  { id: "manager", label: "Mgr", value: (row) => row.playersPlayerPts },
  { id: "played", label: "Played", value: (row) => row.playedPts },
  { id: "total", label: "Tot", value: (row) => row.total },
];

export function MonthlyTables({
  players,
  history,
  appearances,
  awards = [],
  sessions = [],
  tests = [],
  full = false,
}: {
  players: string[];
  history: VoteRow[];
  appearances?: AppearanceMap;
  awards?: MatchAward[];
  sessions?: TrainingSession[];
  tests?: FitnessTest[];
  /** Coach sees the whole squad. Parents see top 3, ties kept. */
  full?: boolean;
}) {
  const allAvg = averageMonthlyFull(players, history, awards, sessions, appearances, tests);
  const averages = full ? allAvg.filter((r) => r.avg > 0) : topNWithTies(allAvg, (r) => r.avg, 3);
  const monthsN = allAvg[0]?.months ?? 0;
  const septAll = scoreFullMonth(players, history, awards, sessions, "2026-09", appearances, tests).filter(
    (row) => row.total > 0,
  );
  const octAll = scoreFullMonth(players, history, awards, sessions, "2026-10", appearances, tests).filter(
    (row) => row.total > 0,
  );
  const sept = full ? septAll : topNWithTies(septAll, (row) => row.total, 3);
  const oct = full ? octAll : topNWithTies(octAll, (row) => row.total, 3);

  const avgCols: ScoreCol<(typeof averages)[number]>[] = [
    { id: "avg", label: "Overall", value: (row) => row.avg },
    { id: "parents", label: "3-2-1", value: (row) => row.parentAvg },
    { id: "training", label: "Train", value: (row) => row.trainingAvg },
    { id: "tests", label: "Tests", value: (row) => row.testAvg },
    { id: "mom", label: "MOM", value: (row) => row.oppMomAvg },
    { id: "manager", label: "Mgr", value: (row) => row.playersPlayerAvg },
  ];

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          Average monthly overall scores
        </h3>
        <p className="mb-3 text-sm text-muted">
          Overall = parent 3-2-1 + opp MOM + manager’s player + 5 a game played + Friday training + tests, averaged
          across {monthsN || "each"} prize month{monthsN === 1 ? "" : "s"}.
          {full ? " Whole squad." : " Top 3 — tied scores all stay."}
        </p>
        <StickyScoreTable rows={averages} cols={avgCols} defaultSort="avg" />
      </section>

      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          September winners
        </h3>
        <p className="mb-3 text-sm text-muted">
          Closed 21 Sep. Pine Villa and Newton. Medals that Monday: Isa Ali 1st, William Brittain 2nd, Henry Bearman 3rd.
          {full ? " Everyone with points is on here." : " Top 3 on points. Anyone level with 3rd stays on."} Friday 25 Sep is in October.
        </p>
        <StickyScoreTable rows={sept} cols={MONTH_COLS} defaultSort="total" />
      </section>

      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          October leaders
        </h3>
        <p className="mb-3 text-sm text-muted">
          {monthWindow("2026-10").label}. Live now. Daisy Hill, Standish and both Fridays. From Standish, each family who votes gets 1 point for their own lad, added on the 3-2-1.
          {full ? " Everyone with points is on here." : " Top 3. Anyone level with 3rd stays on."}
        </p>
        <StickyScoreTable rows={oct} cols={MONTH_COLS} defaultSort="total" />
      </section>
    </div>
  );
}
