"use client";

import { useMemo, useState } from "react";
import { placeAt } from "@/lib/score-categories";
import { publicName } from "@/lib/players";
import { playerReportHref } from "@/components/player-week-report";
import { cn } from "@/lib/utils";

export type ScoreCol<T> = {
  id: string;
  label: string;
  value: (row: T) => number;
  text?: (row: T) => string;
  /** Lower number ranks first. Used for times. */
  faster?: boolean;
};

function fmt(n: number) {
  if (!Number.isFinite(n) || n === 0) return "0";
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

export function StickyScoreTable<T extends { name: string }>({
  rows,
  cols,
  defaultSort,
}: {
  rows: T[];
  cols: ScoreCol<T>[];
  defaultSort: string;
}) {
  const [sort, setSort] = useState(defaultSort);
  const [desc, setDesc] = useState(true);
  const col = cols.find((c) => c.id === sort) ?? cols[cols.length - 1];

  const ordered = useMemo(() => {
    if (!col) return rows;
    return [...rows].sort((a, b) => {
      const av = col.value(a);
      const bv = col.value(b);
      const aMissing = !Number.isFinite(av) || av === 0;
      const bMissing = !Number.isFinite(bv) || bv === 0;
      if (col.faster) {
        if (aMissing && bMissing) return publicName(a.name).localeCompare(publicName(b.name));
        if (aMissing) return 1;
        if (bMissing) return -1;
        const d = av - bv;
        if (d !== 0) return desc ? d : -d;
        return publicName(a.name).localeCompare(publicName(b.name));
      }
      const d = bv - av;
      if (d !== 0) return desc ? d : -d;
      return publicName(a.name).localeCompare(publicName(b.name));
    });
  }, [rows, col, desc]);

  const marks = ordered.map((row) => (col ? col.value(row) : 0));

  function toggle(id: string) {
    if (sort === id) setDesc((d) => !d);
    else {
      setSort(id);
      setDesc(true);
    }
  }

  if (!rows.length || !col) return <p className="text-base text-muted">No points in this table yet.</p>;

  return (
    <div>
      <div className="-mx-4 w-[calc(100%+2rem)] max-w-[100vw] overflow-x-auto overscroll-x-contain px-4">
        <table className="w-max min-w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr className="text-xs font-semibold uppercase tracking-wide text-subtle">
              <th className="sticky left-0 z-20 min-w-[9.5rem] border-b border-border bg-elevated px-3 py-3 text-left shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]">
                Name
              </th>
              {cols.map((c) => (
                <th key={c.id} className="min-w-[4.75rem] whitespace-nowrap border-b border-border bg-elevated px-2 py-1 text-right">
                  <button
                    type="button"
                    onClick={() => toggle(c.id)}
                    className={cn(
                      "inline-flex h-11 min-w-[4.25rem] items-center justify-end gap-1 px-1 text-xs font-semibold uppercase tracking-wide",
                      sort === c.id ? "text-accent" : "text-subtle",
                    )}
                  >
                    {c.label}
                    {sort === c.id ? (desc ? " ↓" : " ↑") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordered.map((row, i) => {
              const place = placeAt(i, marks);
              const lead = place === 1 && (marks[i] ?? 0) > 0;
              const bg = lead ? "bg-[#2a1614]" : "bg-surface";
              return (
                <tr key={row.name} className="border-t border-border">
                  <td className={cn("sticky left-0 z-10 whitespace-nowrap border-t border-border px-3 py-3 shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]", bg)}>
                    <a href={playerReportHref(row.name)} className="flex items-center gap-3">
                      <span className={cn("w-6 shrink-0 font-display text-2xl font-bold tabular-nums", lead ? "text-accent" : "text-muted")}>
                        {place}
                      </span>
                      <span className="whitespace-nowrap text-base font-semibold text-fg">{publicName(row.name)}</span>
                    </a>
                  </td>
                  {cols.map((c) => {
                    const active = sort === c.id;
                    return (
                      <td
                        key={c.id}
                        className={cn(
                          "whitespace-nowrap border-t border-border px-2 py-3 text-right font-display text-2xl font-bold tabular-nums",
                          active ? "text-accent" : "text-fg",
                          lead && bg,
                        )}
                      >
                        {c.text ? c.text(row) : fmt(c.value(row))}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">Names stay put. Swipe for the numbers. Tap a heading to sort.</p>
    </div>
  );
}
