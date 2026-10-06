"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { FitnessAnalysis } from "@/lib/fitness";

export function FitnessProgressChart({
  rows,
  print = false,
  height = 220,
}: {
  rows: FitnessAnalysis[];
  print?: boolean;
  height?: number;
}) {
  const data = [...rows]
    .sort((a, b) => a.testedOn.localeCompare(b.testedOn))
    .map((r) => ({
      label: r.testedOn.slice(5),
      without: r.zz50NoBall,
      withBall: r.zz50Ball,
      extra: r.zz50Diff,
      eff: r.ballEff,
    }));

  if (data.length < 1) {
    return (
      <p className={print ? "text-sm text-[#3a3834]" : "text-sm text-muted"}>
        Save more than one test date and the line graph will grow through the season.
      </p>
    );
  }

  const ink = print ? "#0c0c0d" : "#ffffff";
  const grid = print ? "#d4cfc4" : "var(--color-border)";

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={grid} strokeDasharray="3 3" />
          <XAxis dataKey="label" stroke={ink} tick={{ fill: ink, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis stroke={ink} tick={{ fill: ink, fontSize: 11 }} axisLine={false} tickLine={false} width={32} />
          <Tooltip
            contentStyle={{
              background: print ? "#f3efe6" : "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: ink,
            }}
          />
          <Legend wrapperStyle={{ color: ink, fontSize: 11 }} />
          <Line type="monotone" dataKey="without" name="Without ball" stroke={ink} strokeWidth={2} dot={{ r: 3 }} connectNulls />
          <Line type="monotone" dataKey="withBall" name="With ball" stroke="#b42318" strokeWidth={2} dot={{ r: 3 }} connectNulls />
          <Line type="monotone" dataKey="eff" name="Ball efficiency %" stroke="#c9a227" strokeWidth={2} dot={{ r: 3 }} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
