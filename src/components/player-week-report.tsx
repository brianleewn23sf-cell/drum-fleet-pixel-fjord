"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { CLUB_NAME, COACH_NAME, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { getInitialData } from "@/lib/vote-actions";
import { getScoreExtras } from "@/lib/score-actions";
import { parsePlayer, publicName } from "@/lib/players";
import { playerWeeks } from "@/lib/weekly";
import { PlayerWeekChart } from "@/components/player-week-chart";
import { sendWhatsApp } from "@/lib/whatsapp";
import { scoreFull, scoreFullMonth } from "@/lib/full-score";
import { currentVoteMonth } from "@/lib/vote-month";
import { monthTitle } from "@/lib/potm";
import { playerDrillLines } from "@/lib/test-bonus";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import type { VoteRow } from "@/lib/vote-actions";

export function playerReportHref(player: string) {
  return `/report/player?name=${encodeURIComponent(player)}`;
}

export function PlayerWeekReport({ player }: { player: string }) {
  const [weeks, setWeeks] = useState<ReturnType<typeof playerWeeks>>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [history, setHistory] = useState<VoteRow[]>([]);
  const [awards, setAwards] = useState<MatchAward[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [tests, setTests] = useState<FitnessTest[]>([]);
  const [appearances, setAppearances] = useState<AppearanceMap | undefined>();
  const [ready, setReady] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const loadRef = useRef<() => Promise<void>>(async () => {});

  useEffect(() => {
    let alive = true;
    async function load() {
      setRefreshing(true);
      try {
        const [votes, extras] = await Promise.all([getInitialData(), getScoreExtras()]);
        if (!alive) return;
        setPlayers(votes.players);
        setHistory(votes.history);
        setAwards(extras.awards);
        setSessions(extras.sessions);
        setTests(extras.tests);
        setAppearances(votes.appearances);
        setWeeks(playerWeeks(player, votes.history, extras.awards, extras.sessions, extras.tests));
        setReady(true);
      } catch {
        if (alive) setReady(true);
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

  const parsed = parsePlayer(player);
  const month = currentVoteMonth();
  const monthLabel = monthTitle(month);
  const season = useMemo(
    () => scoreFull(players, history, awards, sessions, appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const thisMonth = useMemo(
    () => scoreFullMonth(players, history, awards, sessions, month, appearances, tests),
    [players, history, awards, sessions, appearances, tests, month],
  );
  const seasonRow = season.find((r) => r.name === player);
  const monthRow = thisMonth.find((r) => r.name === player);
  const monthRank = monthRow ? thisMonth.filter((r) => r.total > (monthRow.total || 0)).length + 1 : 0;
  const drills = playerDrillLines(tests, player);
  const totals = useMemo(
    () =>
      weeks.reduce(
        (acc, w) => ({
          training: acc.training + w.training,
          match: acc.match + w.match,
          tests: acc.tests + (w.tests ?? 0),
          total: acc.total + w.total,
        }),
        { training: 0, match: 0, tests: 0, total: 0 },
      ),
    [weeks],
  );

  return (
    <div className="report-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm;
            height: 297mm;
            overflow: hidden !important;
            background: #f3efe6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .report-page, .report-sheet {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
          }
          .report-sheet {
            box-sizing: border-box;
            padding: 8mm;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      `}</style>
      <div className="no-print flex flex-col items-end gap-2 px-4 py-3">
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
            onClick={() => {
              void sendWhatsApp(
                `${parsed.name} · ${monthLabel}`,
                `${TEAM_NAME} month scores for ${parsed.name}`,
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
            Print PDF
          </button>
        </div>
      </div>
      <article className="report-sheet mx-auto box-border flex min-h-0 max-w-2xl flex-col border-4 border-[#b42318] bg-[#f3efe6] p-4">
        <header className="flex items-center gap-3 border-b border-[#0c0c0d]/20 pb-3">
          <img src="/bulls-crest.jpg" alt="" width={56} height={56} className="size-14 rounded-md object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
              {CLUB_NAME} · {TEAM_NAME}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
                {publicName(player)}
              </h1>
              <button
                type="button"
                className="no-print inline-flex h-9 shrink-0 items-center gap-1 rounded-md border border-[#0c0c0d]/25 bg-white px-2.5 text-xs font-semibold uppercase tracking-wide text-[#0c0c0d] disabled:opacity-60"
                onClick={() => void loadRef.current()}
                disabled={refreshing}
                aria-label={`Refresh ${publicName(player)}`}
              >
                <RefreshCw className={`size-3.5 ${refreshing ? "animate-spin" : ""}`} />
                {refreshing ? "Refreshing" : "Refresh"}
              </button>
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#b42318]">
              {monthLabel}
              {parsed.num ? ` · #${parsed.num}` : ""}
              {monthRank ? ` · ${ordinal(monthRank)} this month` : ""} · {MOTTO_LATIN}
            </p>
          </div>
        </header>

        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]">This month</p>
        <div className="mt-1 grid grid-cols-6 gap-1 text-center">
          <Mark n={monthRow?.parentPts ?? 0} label="3-2-1" />
          <Mark n={monthRow?.oppMomPts ?? 0} label="MOM" />
          <Mark n={monthRow?.playersPlayerPts ?? 0} label="Mgr" />
          <Mark n={monthRow?.trainingPts ?? 0} label="Train" />
          <Mark n={monthRow?.testPts ?? 0} label="Tests" />
          <Mark n={monthRow?.total ?? 0} label="Total" accent />
        </div>
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]">Season</p>
        <div className="mt-1 grid grid-cols-4 gap-1 text-center">
          <Mark n={seasonRow?.trainingPts ?? totals.training} label="Train" />
          <Mark n={seasonRow ? seasonRow.parentPts + seasonRow.oppMomPts + seasonRow.playersPlayerPts : totals.match} label="Match" />
          <Mark n={seasonRow?.testPts ?? totals.tests} label="Tests" />
          <Mark n={seasonRow?.total ?? totals.total} label="Total" accent />
        </div>

        <div className="mt-2 min-h-0 flex-1">
          {ready ? <PlayerWeekChart weeks={weeks} height={168} print /> : (
            <p className="text-sm">Loading graph…</p>
          )}
        </div>

        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]">Tests · time and score</p>
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]">
              <th className="py-0.5">Drill</th>
              <th className="py-0.5 text-right">Time</th>
              <th className="py-0.5 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {drills.map((line) => (
              <tr key={line.kind} className="border-t border-[#0c0c0d]/15">
                <td className="py-0.5">{line.label}</td>
                <td className="py-0.5 text-right tabular-nums">{line.timeLabel}</td>
                <td className="py-0.5 text-right tabular-nums font-semibold">
                  {line.score == null ? "—" : `${line.score}/20`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="mt-2 w-full text-left text-[11px]">
          <thead>
            <tr className="text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]">
              <th className="py-0.5">Week</th>
              <th className="py-0.5 text-right">Train</th>
              <th className="py-0.5 text-right">Match</th>
              <th className="py-0.5 text-right">Tests</th>
              <th className="py-0.5 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((w) => (
              <tr key={w.key} className="border-t border-[#0c0c0d]/15">
                <td className="py-0.5">{w.label}</td>
                <td className="py-0.5 text-right tabular-nums">{w.training}</td>
                <td className="py-0.5 text-right tabular-nums">{w.match}</td>
                <td className="py-0.5 text-right tabular-nums">{w.tests ?? 0}</td>
                <td className="py-0.5 text-right tabular-nums font-semibold">{w.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-[10px] leading-4 text-[#6b6760]">
          Tests from 12 Sep: +5 complete, speed /10 (GO to last cones), technique /5. {COACH_NAME}.
        </p>
      </article>
    </div>
  );
}

function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  if (n % 10 === 1) return `${n}st`;
  if (n % 10 === 2) return `${n}nd`;
  if (n % 10 === 3) return `${n}rd`;
  return `${n}th`;
}

function Mark({ n, label, accent }: { n: number; label: string; accent?: boolean }) {
  return (
    <div className={accent ? "rounded-md border border-[#b42318] py-1" : "rounded-md border border-[#0c0c0d]/15 py-1"}>
      <p className={`font-display text-lg font-bold tabular-nums leading-none ${accent ? "text-[#b42318]" : ""}`}>{n}</p>
      <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#6b6760]">{label}</p>
    </div>
  );
}
