"use client";

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

export type Top3ChartRow = { name: string; pts: number };

export function Top3BarChart({
  title,
  note,
  rows,
  emptyHint = "Bars fill as points go in.",
}: {
  title: string;
  note?: string;
  rows: Top3ChartRow[];
  emptyHint?: string;
}) {
  const live = topNWithTies(rows, (r) => r.pts, 3);
  if (!live.length) {
    return (
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h3>
        {note ? <p className="mt-1 text-xs leading-snug text-muted">{note}</p> : null}
        <p className="mt-3 text-sm text-muted">{emptyHint}</p>
      </section>
    );
  }
  const chartData = live.map((r) => ({
    label: publicName(r.name),
    pts: r.pts,
    full: publicName(r.name),
  }));
  const max = Math.max(3, ...chartData.map((d) => d.pts));

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">{title}</h3>
      {note ? <p className="mt-1 text-xs leading-snug text-muted">{note}</p> : null}
      <ChartFrame height={168}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 16, left: 4, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, max]}
              allowDecimals={false}
              stroke="var(--color-subtle)"
              tick={{ fill: "var(--color-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="label"
              width={88}
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
                    <p className="font-semibold">{d.full}</p>
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
              minPointSize={6}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
      {live.length ? (
        <ol className="mt-1 flex flex-col">
          {live.map((row, i) => (
            <li key={row.name} className="flex items-center justify-between py-0.5 text-sm">
              <span className="min-w-0 truncate">
                <span className="mr-2 font-semibold tabular-nums text-accent">{placeAt(i, live.map((r) => r.pts))}</span>
                {publicName(row.name)}
              </span>
              <span className="ml-2 shrink-0 font-semibold tabular-nums">{row.pts}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-1 text-sm text-muted">{emptyHint}</p>
      )}
    </section>
  );
}
