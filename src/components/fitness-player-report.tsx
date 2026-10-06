"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { ASSISTANT_NAME, CLUB_NAME, COACH_NAME, MANAGER_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { TEST_AGE, analyseFitness, disciplineVerdict, fmtDiff, fmtPct, fmtSecs, type FitnessAnalysis } from "@/lib/fitness";
import { playerDrillLines } from "@/lib/test-bonus";
import { getFitnessTests } from "@/lib/fitness-actions";
import { parsePlayer } from "@/lib/players";
import { FitnessProgressChart } from "@/components/fitness-progress-chart";
import { sendWhatsApp } from "@/lib/whatsapp";

export function FitnessPlayerReport({ player }: { player: string }) {
  const [rows, setRows] = useState<FitnessAnalysis[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const loadRef = useRef<() => Promise<void>>(async () => {});

  useEffect(() => {
    let alive = true;
    async function load() {
      setRefreshing(true);
      try {
        const data = await getFitnessTests();
        if (!alive) return;
        const mine = data.tests.filter((t) => t.player === player).map(analyseFitness);
        setRows(mine.sort((a, b) => a.testedOn.localeCompare(b.testedOn)));
      } catch {
        // keep the report already on screen
      } finally {
        if (alive) setRefreshing(false);
      }
    }
    loadRef.current = load;
    void load();
    const timer = window.setInterval(() => void load(), 15000);
    const onVis = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [player]);

  const latest = rows[rows.length - 1];
  const parsed = parsePlayer(player);

  const note = useMemo(() => {
    if (!latest) return "No tests saved yet.";
    return [
      disciplineVerdict(latest.zz50NoBall, latest.zz50Diff, "zz50", latest.zz50Eff),
      disciplineVerdict(latest.sprint30NoBall, latest.sprint30Diff, "s30", latest.sprint30Eff),
    ].join(" ");
  }, [latest]);

  return (
    <main className="report-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body { margin: 0 !important; background: #f3efe6 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .report-sheet { width: 210mm; min-height: 297mm; box-sizing: border-box; padding: 12mm 14mm; }
        }
      `}</style>
      <div className="no-print flex flex-wrap justify-end gap-2 px-4 py-3">
        <button
          type="button"
          className="h-11 rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
          onClick={() =>
            void sendWhatsApp(
              `${parsed.name} · performance`,
              `${TEAM_NAME} age ${TEST_AGE} performance report for ${parsed.name}. Extra = without minus with. Ball efficiency % for age 11.`,
              globalThis.location.href,
            )
          }
        >
          WhatsApp
        </button>
        <button type="button" className="h-11 rounded-md border border-[#0c0c0d] px-4 text-sm font-semibold" onClick={() => globalThis.print()}>
          Print / PDF
        </button>
      </div>
      <div className="report-sheet mx-auto max-w-[210mm] px-8 py-8">
        <header className="flex items-start gap-4 border-b-4 border-[#8b0000] pb-4">
          <img src="/bulls-crest.jpg" alt="" className="size-20 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5c5850]">{CLUB_NAME}</p>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-bold uppercase leading-none">{parsed.name}</h1>
              <button
                type="button"
                className="no-print inline-flex h-9 shrink-0 items-center gap-1 rounded-md border border-[#0c0c0d]/25 bg-white px-2.5 text-xs font-semibold uppercase tracking-wide text-[#0c0c0d] disabled:opacity-60"
                onClick={() => void loadRef.current()}
                disabled={refreshing}
                aria-label={`Refresh ${parsed.name}`}
              >
                <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing" : "Refresh"}
              </button>
            </div>
            <p className="mt-1 text-sm font-semibold">Age {TEST_AGE} · {TEAM_NAME}</p>
            <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#8b0000]">{MOTTO_LATIN}</p>
            <p className="text-xs text-[#5c5850]">{MOTTO_EN}</p>
          </div>
        </header>

        {!latest ? (
          <p className="mt-8 text-sm">No tests saved for this player yet.</p>
        ) : (
          <>
            <section className="mt-5">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Latest test · {latest.testedOn}</h2>
              <table className="mt-3 w-full border-collapse text-left text-[12px]">
                <thead>
                  <tr className="border-b-2 border-[#0c0c0d] text-[10px] font-semibold uppercase tracking-wider text-[#5c5850]">
                    <th className="py-2">Drill</th>
                    <th>Without</th>
                    <th>With</th>
                    <th>Extra (w/o − with)</th>
                    <th>Ball efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#d9d2c4]">
                    <td className="py-2 font-semibold">50m Zig Zag</td>
                    <td className="tabular-nums">{fmtSecs(latest.zz50NoBall)}</td>
                    <td className="tabular-nums">{fmtSecs(latest.zz50Ball)}</td>
                    <td className="tabular-nums">{fmtDiff(latest.zz50Diff)}</td>
                    <td className="tabular-nums">{fmtPct(latest.zz50Eff)}</td>
                  </tr>
                  <tr className="border-b border-[#d9d2c4]">
                    <td className="py-2 font-semibold">Linear 30m</td>
                    <td className="tabular-nums">{fmtSecs(latest.sprint30NoBall)}</td>
                    <td className="tabular-nums">{fmtSecs(latest.sprint30Ball)}</td>
                    <td className="tabular-nums">{fmtDiff(latest.sprint30Diff)}</td>
                    <td className="tabular-nums">{fmtPct(latest.sprint30Eff)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Turns</td>
                    <td className="tabular-nums" colSpan={3}>{fmtSecs(latest.turns3x4)}</td>
                    <td className="tabular-nums font-bold">{fmtPct(latest.ballEff)}</td>
                  </tr>
                  <tr className="border-t border-[#d9d2c4]">
                    <td className="py-2 font-semibold">Shooting</td>
                    <td className="tabular-nums" colSpan={3}>
                      {latest.shootingPts ?? "—"} shots + {latest.shootingPower ?? "—"} power
                    </td>
                    <td className="tabular-nums font-bold">{latest.shootingTotal ?? "—"} pts</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-[11px] leading-5 text-[#5c5850]">
                Extra = without the ball minus with the ball. A minus means the ball slowed him.
                Ball efficiency % = without ÷ with × 100. Age {TEST_AGE} academy guide: 95%+ academy · 88–94% strong · 80–87% developing.
              </p>
              <p className="mt-3 text-[12px] leading-5">{note}</p>
            </section>

            <section className="mt-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Time and score</h2>
              <table className="mt-3 w-full border-collapse text-left text-[12px]">
                <thead>
                  <tr className="border-b-2 border-[#0c0c0d] text-[10px] font-semibold uppercase tracking-wider text-[#5c5850]">
                    <th className="py-2">Drill</th>
                    <th className="text-right">Time</th>
                    <th className="text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {playerDrillLines(rows, player).map((line) => (
                    <tr key={line.kind} className="border-b border-[#d9d2c4]">
                      <td className="py-2 font-semibold">{line.label}</td>
                      <td className="text-right tabular-nums">{line.timeLabel}</td>
                      <td className="text-right tabular-nums font-bold">{line.score == null ? "—" : `${line.score}/20`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="mt-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Progression</h2>
              <p className="mt-1 text-[11px] text-[#5c5850]">Line graph through the season. One test is a start — it grows each time you save.</p>
              <div className="mt-3">
                <FitnessProgressChart rows={rows} print height={200} />
              </div>
            </section>
          </>
        )}

        <footer className="mt-8 border-t border-[#c9c2b4] pt-3 text-[10px] leading-4 text-[#5c5850]">
          <p>Prepared by {MANAGER_NAME}, manager · {COACH_NAME}, head coach · {ASSISTANT_NAME}, assistant.</p>
        </footer>
      </div>
    </main>
  );
}
