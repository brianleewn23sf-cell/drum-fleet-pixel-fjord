"use client";

import { useEffect, useState } from "react";
import { CLUB_NAME, MANAGER_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { getBoardTotals } from "@/lib/score-actions";
import { scoreFullMonth } from "@/lib/full-score";
import { fridayLabel, fridayMark, seasonFridays } from "@/lib/training";
import { playerDrillLines } from "@/lib/test-bonus";
import { parsePlayer, publicName } from "@/lib/players";
import { localDateStamp } from "@/lib/when";
import { sendWhatsApp } from "@/lib/whatsapp";
import type { FullScore } from "@/lib/scoring";

function num(n: number) {
  if (!Number.isFinite(n) || n === 0) return "0";
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function SheetTable({
  rows,
  fridays,
  sessions,
  tests,
  monthBy,
}: {
  rows: FullScore[];
  fridays: string[];
  sessions: Parameters<typeof fridayMark>[0];
  tests: Parameters<typeof playerDrillLines>[0];
  monthBy: Map<string, number>;
}) {
  return (
    <table className="w-full border-collapse text-[11px]">
      <thead>
        <tr className="bg-[#1a1a1c] text-left text-[9px] font-semibold uppercase tracking-wide text-[#f3efe6]">
          <th className="px-1.5 py-1.5">#</th>
          <th className="px-1.5 py-1.5">Player</th>
          {fridays.map((day) => (
            <th key={day} className="px-1 py-1.5 text-right">
              {fridayLabel(day)}
            </th>
          ))}
          <th className="px-1 py-1.5 text-right">Train</th>
          <th className="px-1 py-1.5 text-right">3-2-1</th>
          <th className="px-1 py-1.5 text-right">MOM</th>
          <th className="px-1 py-1.5 text-right">Mgr</th>
          <th className="px-1 py-1.5 text-right">Played</th>
          <th className="px-1 py-1.5 text-right">Tests</th>
          <th className="px-1 py-1.5 text-right">Overall</th>
          <th className="px-1 py-1.5 text-right">Month</th>
          <th className="px-1 py-1.5 text-right">30m</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const who = parsePlayer(row.name);
          const sprint = playerDrillLines(tests, row.name).find((l) => l.kind === "s30_no");
          const time = sprint?.time != null ? `${sprint.time.toFixed(2)}s` : "—";
          const zebra = i % 2 ? "bg-[#f8e4e2]" : "bg-white";
          return (
            <tr key={row.name} className={zebra}>
              <td className="px-1.5 py-1 font-semibold text-[#b42318]">{i + 1}</td>
              <td className="whitespace-nowrap px-1.5 py-1 font-semibold">
                {who.num ? `#${who.num} ` : ""}
                {publicName(row.name)}
              </td>
              {fridays.map((day) => (
                <td key={day} className="px-1 py-1 text-right tabular-nums">
                  {(() => {
                    const pts = fridayMark(sessions, row.name, day);
                    return pts == null ? "—" : String(pts);
                  })()}
                </td>
              ))}
              <td className="px-1 py-1 text-right tabular-nums">{num(row.trainingPts)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{num(row.parentPts)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{num(row.oppMomPts)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{num(row.playersPlayerPts)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{num(row.playedPts)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{num(row.testPts)}</td>
              <td className="px-1 py-1 text-right font-bold tabular-nums">{num(row.total)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{num(monthBy.get(row.name) ?? 0)}</td>
              <td className="px-1 py-1 text-right tabular-nums">{time}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function ScoresSheet() {
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<FullScore[]>([]);
  const [sessions, setSessions] = useState<Parameters<typeof fridayMark>[0]>([]);
  const [tests, setTests] = useState<Parameters<typeof playerDrillLines>[0]>([]);
  const [monthBy, setMonthBy] = useState<Map<string, number>>(new Map());
  const [sept, setSept] = useState<FullScore[]>([]);
  const [oct, setOct] = useState<FullScore[]>([]);
  const fridays = seasonFridays();

  useEffect(() => {
    let alive = true;
    void (async () => {
      const data = await getBoardTotals();
      if (!alive) return;
      const scored = [...data.table].filter((r) => r.total > 0);
      const monthRows = scoreFullMonth(
        data.players,
        data.history,
        data.awards,
        data.sessions,
        "2026-10",
        data.appearances,
        data.tests,
      );
      const septRows = scoreFullMonth(
        data.players,
        data.history,
        data.awards,
        data.sessions,
        "2026-09",
        data.appearances,
        data.tests,
      );
      setRows(scored);
      setSessions(data.sessions);
      setTests(data.tests);
      setMonthBy(new Map(monthRows.map((r) => [r.name, r.total])));
      setSept(septRows.filter((r) => r.total > 0));
      setOct(monthRows.filter((r) => r.total > 0));
      setReady(true);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="report-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 landscape; margin: 8mm; }
        html, body, .report-page {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          html, body { background: #f3efe6 !important; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="no-print flex flex-wrap items-center justify-end gap-2 px-4 py-3">
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
          onClick={() => {
            void sendWhatsApp(
              `${TEAM_NAME} · scores`,
              `${TEAM_NAME} — season scores, 1 Sep 2026 to today.`,
              globalThis.location.href,
            );
          }}
        >
          Send in WhatsApp
        </button>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-white"
          onClick={() => window.print()}
        >
          Colour PDF
        </button>
      </div>

      <article className="mx-auto max-w-[1100px] px-4 pb-8">
        <header className="flex items-center gap-3 border-b-4 border-[#b42318] pb-3">
          <img src="/bulls-crest.jpg" alt="" width={52} height={52} className="size-12 rounded-md object-cover" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b6760]">
              {CLUB_NAME} · {TEAM_NAME} · {localDateStamp()}
            </p>
            <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
              Season scores
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#b42318]">{MOTTO_LATIN}</p>
            <p className="text-[10px] italic text-[#6b6760]">{MOTTO_EN}</p>
          </div>
        </header>

        <p className="mt-2 text-[11px] text-[#3a3834]">
          1 Sep 2026 to 30 Jun 2027. From {MANAGER_NAME}. Overall is Friday training (max 40 a night) plus games:
          parent 3-2-1, opposition MOM (20, or 10 each if shared), manager’s player (10), 5 for every game played, and tests.
          Month is the live prize month and is not added again.
        </p>

        {!ready ? (
          <p className="mt-6 text-sm">Loading the scores…</p>
        ) : (
          <>
            <div className="mt-3 overflow-hidden rounded-md border-2 border-[#b42318]">
              <SheetTable rows={rows} fridays={fridays} sessions={sessions} tests={tests} monthBy={monthBy} />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <MonthBlock title="September" note="Closed 21 Sep. Pine Villa and Newton." rows={sept} />
              <MonthBlock title="October" note="22 Sep to the 3rd Monday. Live now." rows={oct} />
            </div>
          </>
        )}
      </article>
    </div>
  );
}

function MonthBlock({ title, note, rows }: { title: string; note: string; rows: FullScore[] }) {
  return (
    <section>
      <h2 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h2>
      <p className="mb-1 text-[10px] text-[#6b6760]">{note}</p>
      <div className="overflow-hidden rounded-md border-2 border-[#b42318]">
        <table className="w-full border-collapse text-[11px]">
          <thead>
            <tr className="bg-[#1a1a1c] text-left text-[9px] font-semibold uppercase tracking-wide text-[#f3efe6]">
              <th className="px-1.5 py-1">#</th>
              <th className="px-1.5 py-1">Player</th>
              <th className="px-1 py-1 text-right">Train</th>
              <th className="px-1 py-1 text-right">3-2-1</th>
              <th className="px-1 py-1 text-right">MOM</th>
              <th className="px-1 py-1 text-right">Mgr</th>
              <th className="px-1 py-1 text-right">Tests</th>
              <th className="px-1 py-1 text-right">Tot</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.name} className={i % 2 ? "bg-[#f8e4e2]" : "bg-white"}>
                <td className="px-1.5 py-1 font-semibold text-[#b42318]">{i + 1}</td>
                <td className="whitespace-nowrap px-1.5 py-1 font-semibold">{publicName(row.name)}</td>
                <td className="px-1 py-1 text-right tabular-nums">{num(row.trainingPts)}</td>
                <td className="px-1 py-1 text-right tabular-nums">{num(row.parentPts)}</td>
                <td className="px-1 py-1 text-right tabular-nums">{num(row.oppMomPts)}</td>
                <td className="px-1 py-1 text-right tabular-nums">{num(row.playersPlayerPts)}</td>
                <td className="px-1 py-1 text-right tabular-nums">{num(row.testPts)}</td>
                <td className="px-1 py-1 text-right font-bold tabular-nums">{num(row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
