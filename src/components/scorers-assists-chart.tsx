"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFrame } from "@/components/chart-frame";
import { matchSquadPlayer, publicName } from "@/lib/players";
import type { MatchGoal } from "@/lib/wdyl";

export type GoalTally = { name: string; goals: number; assists: number };

export function tallyScorers(goals: MatchGoal[], players: string[]): GoalTally[] {
  const map = new Map<string, GoalTally>();
  function row(raw: string): GoalTally | null {
    const name = matchSquadPlayer(players, raw) || (players.includes(raw) ? raw : raw.trim());
    if (!name) return null;
    const hit = map.get(name) ?? { name, goals: 0, assists: 0 };
    map.set(name, hit);
    return hit;
  }
  for (const g of goals) {
    const s = row(g.scorer);
    if (s) s.goals += 1;
    if (g.assist) {
      const a = row(g.assist);
      if (a) a.assists += 1;
    }
  }
  return [...map.values()].sort((a, b) => {
    if (b.goals !== a.goals) return b.goals - a.goals;
    if (b.assists !== a.assists) return b.assists - a.assists;
    return publicName(a.name).localeCompare(publicName(b.name));
  });
}

function BoardList({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; n: number }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">{title}</h3>
      {rows.length ? (
        <ol className="mt-1 divide-y divide-border">
          {rows.map((row, i) => (
            <li key={row.name} className="flex items-center justify-between py-2 text-sm">
              <span className="min-w-0 truncate">
                <span className="mr-2 font-display text-lg font-bold tabular-nums text-accent">{i + 1}</span>
                {publicName(row.name)}
              </span>
              <span className="ml-2 shrink-0 font-display text-lg font-bold tabular-nums">{row.n}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-sm text-muted">None logged yet.</p>
      )}
    </div>
  );
}

export function ScorersAssistsChart({
  goals,
  players,
}: {
  goals: MatchGoal[];
  players: string[];
}) {
  const tallies = useMemo(() => tallyScorers(goals, players), [goals, players]);
  const scorers = tallies.filter((t) => t.goals > 0).map((t) => ({ name: t.name, n: t.goals }));
  const assists = tallies
    .filter((t) => t.assists > 0)
    .slice()
    .sort((a, b) => {
      if (b.assists !== a.assists) return b.assists - a.assists;
      return publicName(a.name).localeCompare(publicName(b.name));
    })
    .map((t) => ({ name: t.name, n: t.assists }));
  const chartData = tallies
    .filter((t) => t.goals + t.assists > 0)
    .map((t) => ({
      label: publicName(t.name),
      goals: t.goals,
      assists: t.assists,
    }));
  const height = Math.max(180, chartData.length * 32);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight">Scorers</h2>
      <p className="mt-1 text-xs text-muted">Pine Villa: William 2, Isa 2, Kody 1, Jacob Hill 1. Daisy Hill: William 1, assist Louie. Standish: William 2, Isa 1, Kody 1, Louie 1, Jacob Sands 1. Assists Louie and William.</p>
      {scorers.length || assists.length ? (
        <>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <BoardList title="Goals" rows={scorers} />
            <BoardList title="Assists" rows={assists} />
          </div>
          {chartData.length ? (
            <ChartFrame height={height}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 16, left: 4, bottom: 8 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    stroke="var(--color-subtle)"
                    tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    width={96}
                    stroke="var(--color-subtle)"
                    tick={{ fill: "var(--color-fg)", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-accent-soft)" }}
                    content={({ active, payload }) => {
                      if (!active || !payload?.[0]) return null;
                      const d = payload[0].payload as (typeof chartData)[0];
                      return (
                        <div className="rounded-md border border-border bg-elevated px-3 py-2 text-xs text-fg shadow-panel">
                          <p className="font-semibold">{d.label}</p>
                          <p className="tabular-nums">{d.goals} goals · {d.assists} assists</p>
                        </div>
                      );
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, color: "var(--color-muted)" }} iconSize={8} />
                  <Bar dataKey="goals" fill="var(--color-accent)" name="Goals" barSize={10} minPointSize={3} radius={[0, 4, 4, 0]} isAnimationActive={false} />
                  <Bar dataKey="assists" fill="var(--color-kit-gold)" name="Assists" barSize={10} minPointSize={3} radius={[0, 4, 4, 0]} isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-sm text-muted">No scorers in yet. They appear when the coach logs each goal.</p>
      )}
    </section>
  );
}
