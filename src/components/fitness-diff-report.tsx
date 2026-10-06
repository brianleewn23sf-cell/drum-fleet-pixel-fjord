"use client";

import { ASSISTANT_NAME, CLUB_NAME, COACH_NAME, MANAGER_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import {
  TEST_AGE,
  disciplineVerdict,
  fmtDiff,
  fmtPct,
  fmtSecs,
  type FitnessAnalysis,
} from "@/lib/fitness";
import { parsePlayer } from "@/lib/players";

export function FitnessDiffReport({ rows }: { rows: FitnessAnalysis[] }) {
  const ready = [...rows].sort((a, b) => {
    const ia = (a.zz50Index ?? 99) + (a.sprint30Index ?? 99);
    const ib = (b.zz50Index ?? 99) + (b.sprint30Index ?? 99);
    return ia - ib;
  });
  const dated = ready[0]?.testedOn ?? "";

  return (
    <main className="report-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #f3efe6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .report-sheet {
            width: 210mm;
            min-height: 297mm;
            box-sizing: border-box;
            padding: 12mm 14mm;
          }
        }
      `}</style>
      <div className="report-sheet mx-auto max-w-[210mm] px-8 py-8">
        <header className="flex items-start gap-4 border-b-4 border-[#8b0000] pb-4">
          <img src="/bulls-crest.jpg" alt="" className="size-20 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5c5850]">{CLUB_NAME}</p>
            <h1 className="font-display text-3xl font-bold uppercase leading-none">{TEAM_NAME}</h1>
            <p className="mt-2 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#8b0000]">{MOTTO_LATIN}</p>
            <p className="text-xs text-[#5c5850]">{MOTTO_EN}</p>
          </div>
          <div className="text-right text-[11px] leading-5 text-[#5c5850]">
            <p className="font-semibold uppercase tracking-wider text-[#0c0c0d]">Performance analysis</p>
            <p>Ball manipulation report</p>
            {dated ? <p>{dated}</p> : null}
            <p>Confidential · coaches</p>
          </div>
        </header>

        <section className="mt-5">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide">Method</h2>
          <div className="mt-2 grid gap-3 text-[12px] leading-5 text-[#3f3c38]">
            <p>
              <span className="font-semibold">50m Zig Zag test with and without the ball.</span> GO or whistle.
              Stop through the end cones. With and without the ball.
            </p>
            <p>
              <span className="font-semibold">Linear speed · 30m.</span> GO or whistle. Without the ball first.
              With the ball a pass from 20m is allowed. Clock stops when the ball crosses 30m.
            </p>
            <p>
              <span className="font-semibold">Turning with the ball · 3m square.</span> Three turns,
              sprint back, foot on the ball on the start line.
            </p>
            <p>
              <span className="font-semibold">Path2Pro shooting · 6 shots.</span> Full-size open goal.
              Push left with the left, shoot into the far right corner. Push right with the right, shoot into the far left corner. Must not enter the box.
              3 far corner · 2 near · 1 just outside · 0 miss. +1 power if the ball reaches the 10m line behind the goal.
            </p>
            <p>
              Extra = without the ball minus with the ball (a minus means the ball slowed him).
              Ball efficiency % = without ÷ with × 100, scored at age {TEST_AGE}.
              Academy 95%+ · Strong 88–94% · Developing 80–87%.
            </p>
          </div>
        </section>

        {!ready.length ? (
          <p className="mt-8 text-sm">No paired times yet. Save tests from the coach desk, then print this report.</p>
        ) : (
          <>
            <section className="mt-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Squad times</h2>
              <table className="mt-3 w-full border-collapse text-left text-[11px]">
                <thead>
                  <tr className="border-b-2 border-[#0c0c0d] text-[10px] font-semibold uppercase tracking-wider text-[#5c5850]">
                    <th className="py-2 pr-2">Player</th>
                    <th className="py-2">COD w/o</th>
                    <th className="py-2">COD with</th>
                    <th className="py-2">COD extra</th>
                    <th className="py-2">COD eff</th>
                    <th className="py-2">30m w/o</th>
                    <th className="py-2">30m with</th>
                    <th className="py-2">30m extra</th>
                    <th className="py-2">30m eff</th>
                    <th className="py-2">Turns</th>
                  </tr>
                </thead>
                <tbody>
                  {ready.map((row) => (
                    <tr key={row.player} className="border-b border-[#d9d2c4]">
                      <td className="py-2 pr-2 font-semibold">{parsePlayer(row.player).name}</td>
                      <td className="tabular-nums">{fmtSecs(row.zz50NoBall)}</td>
                      <td className="tabular-nums">{fmtSecs(row.zz50Ball)}</td>
                      <td className="tabular-nums">{fmtDiff(row.zz50Diff)}</td>
                      <td className="tabular-nums">{fmtPct(row.zz50Eff)}</td>
                      <td className="tabular-nums">{fmtSecs(row.sprint30NoBall)}</td>
                      <td className="tabular-nums">{fmtSecs(row.sprint30Ball)}</td>
                      <td className="tabular-nums">{fmtDiff(row.sprint30Diff)}</td>
                      <td className="tabular-nums">{fmtPct(row.sprint30Eff)}</td>
                      <td className="tabular-nums">{fmtSecs(row.turns3x4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[10px] text-[#5c5850]">
                Times in seconds. Extra = without − with. Eff % is ball efficiency at age {TEST_AGE}.
              </p>
            </section>

            <section className="mt-6">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide">Coach notes</h2>
              <div className="mt-2 flex flex-col gap-3">
                {ready.map((row) => (
                  <article key={`n-${row.player}`} className="break-inside-avoid border-t border-[#d9d2c4] pt-2">
                    <p className="text-sm font-bold uppercase">{parsePlayer(row.player).name}</p>
                    <p className="mt-1 text-[12px] leading-5">
                      <span className="font-semibold">COD. </span>
                      {disciplineVerdict(row.zz50NoBall, row.zz50Diff, "zz50", row.zz50Eff)}
                    </p>
                    <p className="text-[12px] leading-5">
                      <span className="font-semibold">Linear speed. </span>
                      {disciplineVerdict(row.sprint30NoBall, row.sprint30Diff, "s30", row.sprint30Eff)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}

        <footer className="mt-8 border-t border-[#c9c2b4] pt-3 text-[10px] leading-4 text-[#5c5850]">
          <p>
            Prepared by {MANAGER_NAME}, manager · {COACH_NAME}, head coach · {ASSISTANT_NAME}, assistant.
          </p>
          <p className="mt-1">
            Video stays on the coach’s phone (Photos / Files). Times and this analysis are stored in the Raging Bulls app.
            Print to PDF on one or two A4 pages.
          </p>
        </footer>
      </div>
    </main>
  );
}
