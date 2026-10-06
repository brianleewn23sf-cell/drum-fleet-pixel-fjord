"use client";

import { useMemo } from "react";
import {
  averageMonthlyFull,
  scoreFull,
  SCORE_CATEGORIES,
  top3Category,
  topNWithTies,
  type CategoryRow,
} from "@/lib/full-score";
import { RankList } from "@/components/board-dash";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import type { VoteRow } from "@/lib/vote-actions";
import { playerDrillLines } from "@/lib/test-bonus";

function Podium({
  title,
  note,
  rows,
}: {
  title: string;
  note: string;
  rows: CategoryRow[];
}) {
  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight text-fg">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-muted">{note}</p>
      <RankList rows={rows} />
    </article>
  );
}

export function ParentLeaders({
  players,
  history,
  awards,
  sessions,
  tests,
  appearances,
}: {
  players: string[];
  history: VoteRow[];
  awards: MatchAward[];
  sessions: TrainingSession[];
  tests: FitnessTest[];
  appearances: AppearanceMap;
}) {
  const seasonTable = useMemo(
    () => scoreFull(players, history, awards, sessions, appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const monthly = useMemo(
    () => averageMonthlyFull(players, history, awards, sessions, appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const avgRows = useMemo(
    () =>
      topNWithTies(monthly, (r) => r.avg, 3).map((row) => ({
        name: row.name,
        pts: Math.round(row.avg * 10) / 10,
      })),
    [monthly],
  );

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Podium
        title="Monthly avg"
        note="Overall score per prize month. Votes, MOM, manager, training and tests."
        rows={avgRows}
      />
      {SCORE_CATEGORIES.map((cat) => (
        <Podium
          key={`season-${cat.id}`}
          title={cat.title}
          note={cat.note}
          rows={
            cat.id === "tests"
              ? top3Category(seasonTable, cat.pts).map((row) => {
                  const line = playerDrillLines(tests, row.name).find((l) => l.kind === "s30_no");
                  return {
                    ...row,
                    detail: line?.timeLabel && line.timeLabel !== "—" ? line.timeLabel : undefined,
                  };
                })
              : top3Category(seasonTable, cat.pts)
          }
        />
      ))}
    </div>
  );
}
