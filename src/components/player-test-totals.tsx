"use client";

import type { FitnessTest } from "@/lib/fitness";
import { playerDrillLines } from "@/lib/test-bonus";

export function PlayerTestTotals({
  tests,
  player,
  compact = false,
}: {
  tests: FitnessTest[];
  player: string;
  compact?: boolean;
}) {
  const lines = playerDrillLines(tests, player);
  const any = lines.some((l) => l.score != null || l.time != null);
  const total = lines.reduce((n, l) => n + (l.score ?? 0), 0);
  if (!any) {
    return <p className="text-sm text-muted">No tests in yet for this lad.</p>;
  }
  return (
    <div className={compact ? "" : "rounded-xl border border-border bg-bg p-3"}>
      {compact ? null : (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Tests · time and score
        </p>
      )}
      <div className="grid grid-cols-[1fr_4.5rem_3.2rem] gap-x-2 border-b border-border pb-1 text-[10px] font-semibold uppercase tracking-wider text-subtle">
        <span>Drill</span>
        <span className="text-right">Time</span>
        <span className="text-right">Score</span>
      </div>
      {lines.map((line) => (
        <div
          key={line.kind}
          className="grid grid-cols-[1fr_4.5rem_3.2rem] items-baseline gap-x-2 border-t border-border py-1.5 text-sm"
        >
          <span className={line.score == null ? "text-muted" : "text-fg"}>{line.label}</span>
          <span className="text-right tabular-nums text-muted">{line.timeLabel}</span>
          <span className="text-right tabular-nums font-semibold">
            {line.score == null ? "—" : `${line.score}/20`}
          </span>
        </div>
      ))}
      <div className="mt-1 flex justify-between border-t border-border pt-2 text-sm font-semibold">
        <span>Latest tests</span>
        <span className="tabular-nums">{total}</span>
      </div>
    </div>
  );
}
