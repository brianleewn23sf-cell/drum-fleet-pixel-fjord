"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFrame } from "@/components/chart-frame";
import { publicName } from "@/lib/players";
import { placeAt, topNWithTies } from "@/lib/score-categories";
import { scoreTrainerYear } from "@/lib/trainer-year";
import type { TrainingSession } from "@/lib/training";

export function TrainingTop3({
  players,
  sessions,
}: {
  players: string[];
  sessions: TrainingSession[];
}) {
  const top = useMemo(
    () => topNWithTies(scoreTrainerYear(players, sessions), (r) => r.pts, 3),
    [players, sessions],
  );
  const nights = sessions.filter((s) => s.marks.some((m) => m.attended)).length;
  const chartData = useMemo(
    () =>
      top.map((t) => ({
        label: publicName(t.name),
        pts: t.pts,
      })),
    [top],
  );
  const height = Math.max(160, top.length * 44);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h2 className="font-display text-xl font-bold uppercase tracking-tight">Top 3 · training</h2>
      <p className="mt-1 text-xs text-muted">
        Friday nights only. Attendance, effort, attitude, achievement (max 40 a night).
      </p>
      <p className="mt-1 text-xs tabular-nums text-subtle">
        {nights} Friday night{nights === 1 ? "" : "s"} marked
      </p>
      {!top.length ? (
        <p className="mt-3 text-sm text-muted">
          No Friday marks in yet. Brian logs them on Coach → Train after Friday night.
        </p>
      ) : (
        <>
          <ol className="mt-3 flex flex-col">
            {top.map((t, i) => (
              <li key={t.name} className="flex items-center justify-between py-1.5 text-sm">
                <span>
                  <span className="mr-2 font-semibold tabular-nums text-accent">{placeAt(i, top.map((r) => r.pts))}</span>
                  {publicName(t.name)}
                </span>
                <span className="font-semibold tabular-nums">{t.pts} pts</span>
              </li>
            ))}
          </ol>
          <ChartFrame height={height}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
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
                        <p className="tabular-nums">{d.pts} pts</p>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="pts"
                  fill="var(--color-accent)"
                  radius={[0, 4, 4, 0]}
                  barSize={18}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        </>
      )}
    </section>
  );
}
