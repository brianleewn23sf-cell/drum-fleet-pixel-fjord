"use client";

import { useMemo, useState } from "react";
import type { FitnessTest } from "@/lib/fitness";
import { parsePlayer, publicName } from "@/lib/players";
import { playerReportHref } from "@/components/player-week-report";
import { fmtMark, playerDrillLines } from "@/lib/test-bonus";
import { cn } from "@/lib/utils";

const HEADS = [
  { id: "s30_no", head: "30m no" },
  { id: "s30_ball", head: "30m ball" },
  { id: "zz50_no", head: "ZZ no" },
  { id: "zz50_ball", head: "ZZ ball" },
  { id: "turns", head: "Turns" },
  { id: "shooting", head: "Shoot" },
] as const;

type SortKey = (typeof HEADS)[number]["id"] | "name" | "total";

export function SquadTestTable({ players, tests }: { players: string[]; tests: FitnessTest[] }) {
  const [sort, setSort] = useState<SortKey>("s30_no");
  const [desc, setDesc] = useState(true);

  const rows = useMemo(() => {
    return players.map((player) => {
      const lines = playerDrillLines(tests, player);
      const byKind = Object.fromEntries(lines.map((l) => [l.kind, l]));
      const total = lines.reduce((n, l) => n + (l.score ?? 0), 0);
      return { player, lines: byKind, total };
    });
  }, [players, tests]);

  const ranked = useMemo(() => {
    return [...rows].sort((a, b) => {
      if (sort === "name") {
        const d = publicName(a.player).localeCompare(publicName(b.player));
        return desc ? -d : d;
      }
      if (sort === "total") {
        const d = b.total - a.total;
        if (d !== 0) return desc ? d : -d;
      } else {
        const at = a.lines[sort]?.time;
        const bt = b.lines[sort]?.time;
        if (at != null && bt != null) {
          const d = at - bt;
          if (d !== 0) return desc ? d : -d;
        }
        const av = a.lines[sort]?.score ?? -1;
        const bv = b.lines[sort]?.score ?? -1;
        const d = bv - av;
        if (d !== 0) return desc ? d : -d;
      }
      return publicName(a.player).localeCompare(publicName(b.player));
    });
  }, [rows, sort, desc]);

  function toggle(id: SortKey) {
    if (sort === id) setDesc((d) => !d);
    else {
      setSort(id);
      setDesc(id !== "name");
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight">Times and scores</h2>
      <p className="mt-1 text-sm text-muted">
        You mark +5 for the drill, 0–10 test score and technique /5. Time and mph are the record.
      </p>
      <div className="mt-4 w-full max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-border">
        <table className="w-max border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-bg text-[11px] font-semibold uppercase tracking-wide text-subtle">
              <th className="sticky left-0 z-20 min-w-[9.5rem] border-b border-border bg-bg px-3 py-2.5 text-left shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]">
                <button type="button" className={cn(sort === "name" && "text-accent")} onClick={() => toggle("name")}>
                  Player
                </button>
              </th>
              {HEADS.map((h) => (
                <th key={h.id} className="w-24 whitespace-nowrap border-b border-border bg-bg px-2 py-2.5 text-right">
                  <button type="button" className={cn(sort === h.id && "text-accent")} onClick={() => toggle(h.id)}>
                    {h.head}
                  </button>
                </th>
              ))}
              <th className="w-16 whitespace-nowrap border-b border-border bg-bg px-2 py-2.5 text-right">
                <button type="button" className={cn(sort === "total" && "text-accent")} onClick={() => toggle("total")}>
                  Total
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((row, i) => {
              const p = parsePlayer(row.player);
              const top = i === 0 && row.total > 0;
              const stickyBg = top ? "bg-[color-mix(in_oklab,#b42318_18%,#141416)]" : "bg-surface";
              return (
                <tr key={row.player} className={cn("border-t border-border", top && "bg-accent-soft")}>
                  <td className={cn("sticky left-0 z-10 whitespace-nowrap border-t border-border px-3 py-2.5 font-semibold shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]", stickyBg)}>
                    <a href={playerReportHref(row.player)} className="hover:underline">
                      {p.num ? `#${p.num} ` : ""}
                      {publicName(row.player)}
                    </a>
                  </td>
                  {HEADS.map((h) => {
                    const line = row.lines[h.id];
                    return (
                      <td key={h.id} className="whitespace-nowrap border-t border-border px-2 py-2.5 text-right">
                        <p className="tabular-nums text-muted">{line?.time != null ? `${line.time.toFixed(2)}s` : "—"}</p>
                        <p className="tabular-nums font-semibold">{line?.score == null ? "—" : `${fmtMark(line.score)}/20`}</p>
                      </td>
                    );
                  })}
                  <td className="whitespace-nowrap border-t border-border px-2 py-2.5 text-right font-display text-base font-bold tabular-nums">{row.total || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
