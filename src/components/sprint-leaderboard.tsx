"use client";

import type { FitnessTest } from "@/lib/fitness";
import { parsePlayer, publicName } from "@/lib/players";
import { fmtMark, mphFromTime, mphToKmh, playerDrillLines } from "@/lib/test-bonus";
import { placeAt } from "@/lib/score-categories";
import { cn } from "@/lib/utils";

export function SprintLeaderboard({ players, tests }: { players: string[]; tests: FitnessTest[] }) {
  const rows = players
    .map((player) => {
      const line = playerDrillLines(tests, player).find((l) => l.kind === "s30_no");
      if (!line?.official || line.time == null) return null;
      const mph = line.mph ?? mphFromTime("s30_no", line.time);
      const clip = tests
        .filter((t) => t.player === player)
        .flatMap((t) => t.clipMarks ?? [])
        .find((c) => c.kind === "s30_no");
      return {
        player,
        time: line.time,
        mph,
        kmh: mph != null ? mphToKmh(mph) : null,
        complete: 5,
        speed: clip?.finish ?? null,
        tech: clip?.styleMark ?? null,
        total: line.score,
        note: clip?.note ?? "",
      };
    })
    .filter((r): r is NonNullable<typeof r> => r != null)
    .sort((a, b) => a.time - b.time || publicName(a.player).localeCompare(publicName(b.player)));

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight">30m sprint · no ball</h2>
      <p className="mt-1 text-sm text-muted">Friday 11 Sep · GO to last cones · sorted by time</p>
      {!rows.length ? (
        <p className="mt-3 text-sm text-muted">No 30m times yet.</p>
      ) : (
        <div className="mt-4 -mx-4 overflow-x-auto px-4">
          <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wider text-subtle">
                <th className="py-2 pr-2">#</th>
                <th className="py-2 pr-3">Player</th>
                <th className="py-2 px-1 text-right">30m</th>
                <th className="py-2 px-1 text-right">mph</th>
                <th className="py-2 px-1 text-right">km/h</th>
                <th className="py-2 px-1 text-right">Test</th>
                <th className="py-2 px-1 text-right">Speed</th>
                <th className="py-2 px-1 text-right">Tech</th>
                <th className="py-2 pl-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const p = parsePlayer(row.player);
                return (
                  <tr key={row.player} className={cn("border-t border-border", i === 0 && "bg-accent-soft")}>
                    <td className="py-2 pr-2 tabular-nums text-muted">{placeAt(i, rows.map((r) => r.time))}</td>
                    <td className="py-2 pr-3">
                      <p className="font-semibold leading-tight">{publicName(row.player)}</p>
                      <p className="text-[11px] text-muted">
                        {p.num ? `#${p.num}` : ""}
                        {row.note ? ` · ${row.note}` : ""}
                      </p>
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">{row.time.toFixed(2)}s</td>
                    <td className="px-1 py-2 text-right tabular-nums font-semibold text-accent">
                      {row.mph != null ? `${row.mph.toFixed(2)}` : "—"}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums text-muted">
                      {row.kmh != null ? row.kmh.toFixed(2) : "—"}
                    </td>
                    <td className="px-1 py-2 text-right tabular-nums">5</td>
                    <td className="px-1 py-2 text-right tabular-nums">{fmtMark(row.speed)}</td>
                    <td className="px-1 py-2 text-right tabular-nums">{fmtMark(row.tech)}</td>
                    <td className="py-2 pl-2 text-right font-display text-base font-bold tabular-nums text-accent">
                      {fmtMark(row.total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
