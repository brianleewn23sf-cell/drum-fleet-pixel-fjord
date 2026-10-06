"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { parsePlayer } from "@/lib/players";
import type { PlayerSeason } from "@/lib/progress";
import { FitnessSnapshot } from "@/components/fitness-panel";
import type { FitnessAnalysis } from "@/lib/fitness";
import { cn } from "@/lib/utils";
import { ChartFrame } from "@/components/chart-frame";
import { Button } from "@/components/ui/button";

export function PlayerProgressCard({
  season,
  note,
  showAwards = false,
  fitness,
  onRefresh,
}: {
  season: PlayerSeason;
  note?: string;
  showAwards?: boolean;
  fitness?: FitnessAnalysis;
  onRefresh?: () => void | Promise<void>;
}) {
  const p = parsePlayer(season.name);
  const [busy, setBusy] = useState(false);
  const chartData = useMemo(
    () =>
      season.rounds.map((r, i) => ({
        label: String(i + 1),
        pts: r.cumulative,
        round: r.pts,
        game: r.opposition || r.gameNumber,
      })),
    [season.rounds],
  );

  return (
    <article className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-elevated text-sm font-bold">
            {p.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-bold uppercase tracking-tight">
              {p.name}
            </p>
            <p className="text-xs text-muted">
              {p.num ? `#${p.num}` : null}
              {season.rank ? ` · ${ordinal(season.rank)} in the 3-2-1` : null}
            </p>
          </div>
        </div>
        {onRefresh ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            disabled={busy}
            aria-label={`Refresh ${p.name}`}
            onClick={() => {
              setBusy(true);
              void Promise.resolve(onRefresh()).finally(() => setBusy(false));
            }}
          >
            <RefreshCw className={cn("size-3.5", busy && "animate-spin")} />
            {busy ? "Refreshing" : "Refresh"}
          </Button>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Stat value={season.pts} label="Pts" accent />
        <Stat value={season.games} label="GP" />
        <Stat value={season.games ? season.ppg.toFixed(1) : "—"} label="Avg" />
      </div>

      {showAwards ? (
        <div className="mt-3 grid grid-cols-2 gap-2 text-center">
          <Stat value={season.oppMom} label="Opp MOM" />
          <Stat value={season.playersPlayer} label="Players’" />
        </div>
      ) : null}

      {season.form.length ? (
        <p className="mt-3 text-xs text-muted">
          Last {season.form.length}:{" "}
          <span className="tabular-nums text-fg">
            {season.form.map((n) => n).join(" · ")} pts
          </span>
        </p>
      ) : null}

      {chartData.length > 0 ? (
        <div className="mt-4">
          <ChartFrame height={160}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="label"
                  stroke="var(--color-subtle)"
                  tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  width={28}
                  stroke="var(--color-subtle)"
                  tick={{ fill: "var(--color-muted)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ stroke: "var(--color-border)" }}
                  content={<ProgressTooltip />}
                />
                <Line
                  type="monotone"
                  dataKey="pts"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "var(--color-accent)" }}
                  name="Cumulative"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartFrame>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">No games on the board yet.</p>
      )}

      {season.rounds.length ? (
        <ul className="mt-3 flex flex-col gap-1.5">
          {season.rounds.map((r) => (
            <li
              key={r.key}
              className="flex items-baseline justify-between gap-3 text-sm"
            >
              <span className="min-w-0 truncate text-muted">
                {r.gameNumber}
                {r.opposition ? ` vs ${r.opposition}` : ""}
              </span>
              <span className="shrink-0 tabular-nums font-semibold">
                {r.pts}
                <span className="ml-1 text-xs font-medium text-subtle">pts</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-3 text-xs tabular-nums text-muted">
        {season.n3}×3 · {season.n2}×2 · {season.n1}×1
      </p>

      {note ? (
        <div className="mt-4 border-t border-border pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Coach note
          </p>
          <p className="mt-1 text-sm text-fg">{note}</p>
        </div>
      ) : null}
      {fitness ? <FitnessSnapshot test={fitness} /> : null}
    </article>
  );
}

function ProgressTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: { game: string; pts: number; round: number } }[];
}) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-elevated px-3 py-2 text-xs shadow-panel">
      <p className="font-semibold text-fg">{d.game}</p>
      <p className="mt-1 tabular-nums text-muted">
        {d.round} this game · {d.pts} total
      </p>
    </div>
  );
}

function Stat({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p
        className={cn(
          "font-display text-xl font-bold leading-none tabular-nums",
          accent ? "text-accent" : "text-fg",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-subtle">{label}</p>
    </div>
  );
}

function ordinal(n: number): string {
  const v = n % 100;
  const s = ["th", "st", "nd", "rd"];
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}
