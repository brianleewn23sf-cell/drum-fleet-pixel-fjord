"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { PlayerPicker } from "@/components/player-picker";
import { PlayerTestTotals } from "@/components/player-test-totals";
import { PlayerWeekChart } from "@/components/player-week-chart";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { MatchAward } from "@/lib/coach-actions";
import { parsePlayer } from "@/lib/players";
import { scoreFull } from "@/lib/full-score";
import { getScoreExtras } from "@/lib/score-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import { getInitialData, type VoteRow } from "@/lib/vote-actions";
import { sendWhatsApp } from "@/lib/whatsapp";
import { playerWeeks } from "@/lib/weekly";
import { TEAM_NAME } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { playerReportHref } from "@/components/player-week-report";

export function PerformancePick({
  players,
  history,
  awards = [],
  sessions = [],
  tests = [],
  appearances,
  initialPlayer = "",
  lockToPlayer = false,
  onRefresh,
}: {
  players: string[];
  history: VoteRow[];
  awards?: MatchAward[];
  sessions?: TrainingSession[];
  tests?: FitnessTest[];
  appearances?: AppearanceMap;
  initialPlayer?: string;
  lockToPlayer?: boolean;
  onRefresh?: () => void | Promise<void>;
}) {
  const [player, setPlayer] = useState(initialPlayer);
  const [busy, setBusy] = useState(false);
  const [snap, setSnap] = useState<{
    players: string[];
    history: VoteRow[];
    awards: MatchAward[];
    sessions: TrainingSession[];
    tests: FitnessTest[];
    appearances?: AppearanceMap;
  } | null>(null);
  const shown = lockToPlayer ? initialPlayer : player;
  const srcPlayers = snap?.players ?? players;
  const srcHistory = snap?.history ?? history;
  const srcAwards = snap?.awards ?? awards;
  const srcSessions = snap?.sessions ?? sessions;
  const srcTests = snap?.tests ?? tests;
  const srcAppearances = snap?.appearances ?? appearances;
  const table = useMemo(
    () => scoreFull(srcPlayers, srcHistory, srcAwards, srcSessions, srcAppearances, srcTests),
    [srcPlayers, srcHistory, srcAwards, srcSessions, srcAppearances, srcTests],
  );
  const row = table.find((t) => t.name === shown);
  const rank = row ? table.findIndex((t) => t.name === shown) + 1 : 0;
  const weeks = useMemo(
    () => (shown ? playerWeeks(shown, srcHistory, srcAwards, srcSessions, srcTests) : []),
    [shown, srcHistory, srcAwards, srcSessions, srcTests],
  );
  const ordinal =
    rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : rank ? "th" : "";
  const name = shown ? parsePlayer(shown).name : "";

  useEffect(() => {
    setSnap(null);
  }, [history, awards, sessions, tests, appearances, players]);

  async function refreshScores() {
    setBusy(true);
    try {
      if (onRefresh) await onRefresh();
      const [votes, extras] = await Promise.all([getInitialData(), getScoreExtras()]);
      setSnap({
        players: votes.players.length ? votes.players : players,
        history: votes.history.length ? votes.history : history,
        awards: extras.awards.length ? extras.awards : awards,
        sessions: extras.sessions,
        tests: extras.tests ?? [],
        appearances: votes.appearances,
      });
      toast.success(name ? `${name} refreshed.` : "Scores refreshed.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not refresh.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Your child’s marks</h3>
      <p className="mb-3 text-sm text-muted">
        Full marks, graph and PDF for your lad only. Other families only see the top 3 totals.
      </p>
      {lockToPlayer ? null : (
        <>
          <FieldLabel htmlFor="performance-player">Your child</FieldLabel>
          <PlayerPicker
            id="performance-player"
            label="Your child"
            value={player}
            placeholder="Select your child…"
            players={players}
            className="mb-3"
            onChange={setPlayer}
          />
        </>
      )}
      {shown ? (
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="min-w-0 text-sm font-semibold text-fg">
              {name}
              {rank ? ` · ${rank}${ordinal} overall` : ""}
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() => void refreshScores()}
              disabled={busy}
              aria-label={`Refresh ${name}`}
            >
              <RefreshCw className={cn("size-3.5", busy && "animate-spin")} />
              {busy ? "Refreshing" : "Refresh"}
            </Button>
          </div>
          {row ? (
            <div className="mt-3 grid grid-cols-2 gap-2 text-center sm:grid-cols-5">
              <Stat value={row.total} label="Total" />
              <Stat value={row.parentPts} label="Parents" />
              <Stat value={row.oppMomPts + row.playersPlayerPts} label="Awards" />
              <Stat value={row.trainingPts} label="Training" />
              <Stat value={row.testPts} label="Tests" />
            </div>
          ) : null}
          <div className="mt-4">
            <PlayerTestTotals tests={srcTests} player={shown} />
          </div>
          <a href={playerReportHref(shown)} className="mt-4 block">
            <PlayerWeekChart weeks={weeks} height={240} />
            <p className="mt-1 text-center text-xs text-muted">Tap the chart to open this month’s PDF</p>
          </a>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              className="w-full"
              onClick={() => {
                globalThis.location.href = playerReportHref(shown);
              }}
            >
              Print this month’s PDF
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                const url = `${globalThis.location.origin}${playerReportHref(shown)}`;
                void sendWhatsApp(
                  `${parsePlayer(shown).name} · month PDF`,
                  `${TEAM_NAME} month scores for ${parsePlayer(shown).name}`,
                  url,
                );
              }}
            >
              Send graph in WhatsApp
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">Pick your child above to see their full marks.</p>
      )}
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-md border border-border bg-bg px-2 py-2">
      <p className="font-display text-lg font-bold tabular-nums leading-none">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}
