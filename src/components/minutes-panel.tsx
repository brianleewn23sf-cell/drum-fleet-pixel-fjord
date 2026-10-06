"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FieldLabel, FieldSelect } from "@/components/ui/field";
import { StintTally } from "@/components/stint-tally";
import { getAllMinutes } from "@/lib/live-actions";
import { gameMinute, playerMinutes, type Stint } from "@/lib/minutes";
import { PLAYERS, shortName } from "@/lib/players";
import { formatKickoff } from "@/lib/when";
import { shortClub } from "@/lib/wdyl";

type GameRow = {
  opposition: string;
  kickoff: string;
  clock: { startedAt: string | null; elapsedMs: number; running: boolean; ended: boolean; half?: 1 | 2; halfMarkMs?: number };
};

type StintRow = Stint & { opposition: string; kickoff: string };

export function MinutesPanel() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [stints, setStints] = useState<StintRow[]>([]);
  const [pick, setPick] = useState("");

  useEffect(() => {
    void getAllMinutes()
      .then((data) => {
        setGames(data.games);
        setStints(data.stints as StintRow[]);
        if (data.games.length) {
          const last = data.games[data.games.length - 1];
          setPick(`${last.kickoff}|${last.opposition}`);
        }
      })
      .catch((err) => toast.error(err instanceof Error ? err.message : "Could not load minutes."));
  }, []);

  const game = games.find((g) => `${g.kickoff}|${g.opposition}` === pick);
  const weekStints = stints.filter(
    (s) => game && s.kickoff === game.kickoff && s.opposition === game.opposition,
  );
  const weekMinute = game ? gameMinute(game.clock) : 0;
  const week = useMemo(
    () => (game ? playerMinutes(weekStints, weekMinute, game.clock.ended) : {}),
    [game, weekStints, weekMinute],
  );

  const season = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const g of games) {
      const rows = stints.filter((s) => s.kickoff === g.kickoff && s.opposition === g.opposition);
      const mins = playerMinutes(rows, gameMinute(g.clock), g.clock.ended);
      for (const [player, row] of Object.entries(mins)) {
        totals[player] = (totals[player] || 0) + row.minutes;
      }
    }
    return totals;
  }, [games, stints]);

  const weekData = PLAYERS.map((p) => ({
    name: shortName(p).replace(/^#\d+\s/, ""),
    minutes: week[p]?.minutes ?? 0,
  })).filter((d) => d.minutes > 0);

  const seasonData = PLAYERS.map((p) => ({
    name: shortName(p).replace(/^#\d+\s/, ""),
    minutes: season[p] ?? 0,
  })).filter((d) => d.minutes > 0);

  const byWeek = games.map((g) => {
    const rows = stints.filter((s) => s.kickoff === g.kickoff && s.opposition === g.opposition);
    const mins = playerMinutes(rows, gameMinute(g.clock), g.clock.ended);
    const total = Object.values(mins).reduce((n, r) => n + r.minutes, 0);
    return {
      name: `${formatKickoff(g.kickoff, "d MMM")} ${shortClub(g.opposition)}`.trim(),
      minutes: total,
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          Minutes this game
        </h3>
        <FieldLabel htmlFor="mins-game">Game</FieldLabel>
        <FieldSelect id="mins-game" value={pick} onChange={(e) => setPick(e.target.value)} className="mb-3">
          {!games.length ? <option value="">No games timed yet</option> : null}
          {games.map((g) => (
            <option key={`${g.kickoff}|${g.opposition}`} value={`${g.kickoff}|${g.opposition}`}>
              {formatKickoff(g.kickoff, "EEE d MMM")} · {shortClub(g.opposition)}
            </option>
          ))}
        </FieldSelect>
        {weekData.length ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekData} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 10 }} interval={0} angle={-35} textAnchor="end" height={48} />
                <YAxis tick={{ fill: "#ffffff", fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="minutes" fill="var(--color-accent)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted">Start the match-day clock on Pitch to log minutes.</p>
        )}
        {game ? (
          <div className="mt-4">
            <h4 className="mb-2 font-display text-sm font-bold uppercase tracking-tight">
              Who · where · when
            </h4>
            <StintTally stints={weekStints} minute={weekMinute} ended={game.clock.ended} />
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          Season minutes
        </h3>
        {seasonData.length ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonData} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 10 }} interval={0} angle={-35} textAnchor="end" height={48} />
                <YAxis tick={{ fill: "#ffffff", fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="minutes" fill="var(--color-ok)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted">Totals build as you time games.</p>
        )}
      </section>

      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          Each week
        </h3>
        {byWeek.length ? (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byWeek} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "#ffffff", fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={48} />
                <YAxis tick={{ fill: "#ffffff", fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="minutes" fill="var(--color-fg)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-muted">One bar per game, once clocks are used.</p>
        )}
      </section>
    </div>
  );
}