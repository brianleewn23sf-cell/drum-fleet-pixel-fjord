"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { WeekPoint } from "@/lib/weekly";
import { ChartFrame } from "@/components/chart-frame";

export function PlayerWeekChart({
  weeks,
  height = 180,
  print = false,
}: {
  weeks: WeekPoint[];
  height?: number;
  print?: boolean;
}) {
  if (!weeks.length) {
    return (
      <p className={print ? "text-sm text-[#3a3834]" : "text-sm text-muted"}>
        The weekly graph appears once training or 3-2-1 scores are in.
      </p>
    );
  }

  const ink = print ? "#0c0c0d" : "#ffffff";
  const grid = print ? "#d4cfc4" : "var(--color-border)";
  const match = print ? "#6b6760" : "#c8c8cc";
  const bull = "#b42318";
  const mean = weeks.reduce((s, w) => s + w.total, 0) / weeks.length;
  const last = weeks[weeks.length - 1]?.key;
  const gid = print ? "weekFillPrint" : "weekFill";
  const hasTests = weeks.some((w) => (w.tests ?? 0) > 0);

  return (
    <ChartFrame height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={weeks} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={bull} stopOpacity={print ? 0.28 : 0.45} />
              <stop offset="100%" stopColor={bull} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            stroke={ink}
            tick={{ fill: ink, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            width={28}
            stroke={ink}
            tick={{ fill: ink, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<WeekTooltip print={print} />} cursor={{ stroke: grid }} />
          <Legend wrapperStyle={{ color: ink, fontSize: 12 }} />
          {weeks.length > 1 ? (
            <ReferenceLine
              y={Math.round(mean)}
              stroke={ink}
              strokeDasharray="4 4"
              strokeOpacity={0.45}
            />
          ) : null}
          <Area
            type="monotone"
            dataKey="total"
            fill={`url(#${gid})`}
            stroke="none"
            legendType="none"
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="training"
            stroke={ink}
            strokeWidth={2}
            dot={{ r: 3, fill: ink }}
            name="Training"
            isAnimationActive={false}
          />
          {hasTests ? (
            <Line
              type="monotone"
              dataKey="tests"
              stroke="#e8b923"
              strokeWidth={2}
              dot={{ r: 3, fill: "#e8b923" }}
              name="Tests"
              isAnimationActive={false}
            />
          ) : null}
          <Line
            type="monotone"
            dataKey="total"
            stroke={bull}
            strokeWidth={2.5}
            dot={(props) => <LastDot {...props} last={last} color={bull} />}
            name="Total"
            isAnimationActive={false}
          />
          {weeks.length > 2 ? (
            <Line
              type="monotone"
              dataKey="trend"
              stroke={ink}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              name="3-week trend"
              isAnimationActive={false}
            />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

function LastDot({
  cx,
  cy,
  payload,
  last,
  color,
}: {
  cx?: number;
  cy?: number;
  payload?: WeekPoint;
  last?: string;
  color: string;
}) {
  if (cx == null || cy == null) return null;
  const r = payload?.key === last ? 5 : 3;
  return <circle cx={cx} cy={cy} r={r} fill={color} />;
}

function WeekTooltip({
  active,
  payload,
  print,
}: {
  active?: boolean;
  payload?: { payload: WeekPoint }[];
  print?: boolean;
}) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div
      className="rounded-md border px-3 py-2 text-xs shadow-panel"
      style={{
        background: print ? "#f3efe6" : "#141416",
        borderColor: print ? "#d4cfc4" : "var(--color-border)",
        color: print ? "#0c0c0d" : "#ffffff",
      }}
    >
      <p className="font-semibold">{d.label}</p>
      <p className="mt-1 tabular-nums">Training {d.training}</p>
      <p className="tabular-nums">Match {d.match}</p>
      {d.tests ? <p className="tabular-nums">Tests {d.tests}</p> : null}
      <p className="font-semibold tabular-nums" style={{ color: "#b42318" }}>
        Total {d.total}
      </p>
      {d.trend != null ? <p className="tabular-nums text-[#6b6760]">Trend {d.trend}</p> : null}
    </div>
  );
}
