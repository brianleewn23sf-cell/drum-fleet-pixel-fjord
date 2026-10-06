"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { shortName } from "@/lib/players";
import {
  OPP_MOM_POINTS,
  PLAYERS_PLAYER_POINTS,
  upcomingPotmMonth,
  shiftMonth,
  type MonthWindow,
  type PotmRow,
  type PotmWinner,
} from "@/lib/potm";
import { awardPotm, getPotm } from "@/lib/potm-actions";
import { formatKickoff } from "@/lib/when";
import { TrainerYearPanel } from "@/components/trainer-year-panel";
import { cn } from "@/lib/utils";

function mondayLabel(period: MonthWindow) {
  return formatKickoff(`${period.awardMonday}T12:00`, "EEE d MMM yyyy") || period.awardMonday;
}

export function PotmPanel() {
  const [month, setMonth] = useState(() => upcomingPotmMonth());
  const [standings, setStandings] = useState<PotmRow[]>([]);
  const [period, setPeriod] = useState<MonthWindow | null>(null);
  const [canAward, setCanAward] = useState(false);
  const [winner, setWinner] = useState<PotmWinner | null>(null);
  const [leader, setLeader] = useState<PotmRow | null>(null);
  const [saving, setSaving] = useState(false);

  async function load(nextMonth = month) {
    try {
      const data = await getPotm({ data: { month: nextMonth } });
      setMonth(data.month);
      setStandings(data.standings);
      setPeriod(data.window);
      setCanAward(data.canAward);
      setWinner(data.winner);
      setLeader(data.leader);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load player of the month.");
    }
  }

  useEffect(() => {
    void load(month);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  async function onAward(player: string) {
    setSaving(true);
    try {
      const res = await awardPotm({ data: { month, player } });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setWinner(res.winner);
      toast.success("Player of the month awarded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not award.");
    } finally {
      setSaving(false);
    }
  }

  const name = winner?.player || leader?.name || "";

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <div className="mb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-muted"
            onClick={() => setMonth(shiftMonth(month, -1))}
          >
            Prev
          </button>
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">
            {period?.label || month}
          </h3>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-muted"
            onClick={() => setMonth(shiftMonth(month, 1))}
          >
            Next
          </button>
        </div>
        <p className="text-sm leading-7 text-muted">
          What counts this month: parent 3-2-1, plus 1 point for the child when his family votes (from Standish), training award (max 40), opposition MOM ({OPP_MOM_POINTS}),
          players’ / manager’s player ({PLAYERS_PLAYER_POINTS}), and performance-test bonuses.
          Awarded the 3rd Monday{period ? ` · ${mondayLabel(period)}` : ""}.
        </p>
        {winner ? (
          <p className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
            Winner · {shortName(winner.player)}
          </p>
        ) : leader ? (
          <p className="mt-3 text-sm">
            Leader · <span className="font-semibold">{shortName(leader.name)}</span> · {leader.total} pts
          </p>
        ) : (
          <p className="mt-3 text-sm text-muted">No points in this window yet.</p>
        )}
        <div className="mt-4 flex flex-col gap-2">
          <Button
            className="h-12"
            disabled={!canAward || !name}
            onClick={() => {
              if (!canAward) return toast.error("Certificate after the 3rd Monday.");
              if (!name) return toast.error("Need a leader first.");
              globalThis.window.location.href = `/cert/potm?month=${encodeURIComponent(month)}&player=${encodeURIComponent(name)}`;
            }}
          >
            {canAward ? "Certificate PDF" : "Certificate after 3rd Monday"}
          </Button>
          <Button
            variant="outline"
            disabled={saving || !canAward || !name}
            onClick={() => void onAward(winner?.player || leader?.name || "")}
          >
            {saving ? "Saving…" : canAward ? "Award 3rd Monday" : "Locked until 3rd Monday"}
          </Button>
        </div>
      </section>

      <section>
        <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-tight">
          Month table
        </h3>
        <p className="mb-2 text-sm text-muted">
          {month === "2026-09"
            ? "September, closed. Louie opposition MOM and Henry players’ player from Pine Villa are in this table, and on Season running."
            : month === "2026-10"
              ? "October runs 22 Sep to the 3rd Monday, 19 Oct. Both Fridays count: 25 Sep and 2 Oct. Daisy Hill and Standish are in this month. Pine Villa stays in September."
              : "Awarded on the 3rd Monday. Season running keeps every month."}
        </p>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <span className="min-w-0 flex-1">Player</span>
            <span className="w-9 text-right">3-2-1</span>
            <span className="w-9 text-right">Trn</span>
            <span className="w-9 text-right">Tst</span>
            <span className="w-9 text-right">MOM</span>
            <span className="w-9 text-right">P/M</span>
            <span className="w-9 text-right">Pld</span>
            <span className="w-9 text-right">Tot</span>
          </div>
          {standings.map((row, i) => (
            <button
              key={row.name}
              type="button"
              className={cn(
                "flex w-full gap-2 border-t border-border px-3 py-2 text-left text-sm",
                winner?.player === row.name && "bg-accent-soft",
              )}
              onClick={() =>
                (globalThis.window.location.href = `/cert/potm?month=${encodeURIComponent(month)}&player=${encodeURIComponent(row.name)}`)
              }
              disabled={false}
            >
              <span className="min-w-0 flex-1 truncate font-medium">
                <span className="mr-2 text-muted">{i + 1}</span>
                {shortName(row.name)}
              </span>
              <span className="w-9 text-right tabular-nums text-muted">{row.parentPts}</span>
              <span className="w-9 text-right tabular-nums text-muted">{row.trainingPts}</span>
              <span className="w-9 text-right tabular-nums text-muted">{row.testPts || "—"}</span>
              <span className="w-9 text-right tabular-nums text-muted">
                {row.oppMom ? row.oppMom * OPP_MOM_POINTS : "—"}
              </span>
              <span className="w-9 text-right tabular-nums text-muted">
                {row.playersPlayer ? row.playersPlayer * PLAYERS_PLAYER_POINTS : "—"}
              </span>
              <span className="w-9 text-right tabular-nums text-muted">{row.playedPts || "—"}</span>
              <span className="w-9 text-right tabular-nums font-semibold">{row.total}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs leading-6 text-muted">
          Tot = 3-2-1 + training + tests + 5 a game played + MOM 20 + players’ player 10. Trainer of the year is training only.
        </p>
        <Link
          to="/month"
          className="mt-3 inline-flex h-11 items-center text-xs font-semibold uppercase tracking-wide text-accent"
        >
          How it’s picked · medals
        </Link>
      </section>
      <TrainerYearPanel />
    </div>
  );
}
