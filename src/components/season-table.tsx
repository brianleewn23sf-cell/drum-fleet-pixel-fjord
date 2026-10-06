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
import { scoreFull, type FullScore } from "@/lib/full-score";
import { placeAt, topNWithTies } from "@/lib/score-categories";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import type { AppearanceMap } from "@/lib/appearance-actions";
import { parsePlayer, publicName } from "@/lib/players";
import type { VoteRow } from "@/lib/vote-actions";
import { cn } from "@/lib/utils";
import { ChartFrame } from "@/components/chart-frame";

export function SeasonTable({
  players,
  history,
  appearances,
  awards = [],
  sessions = [],
  tests = [],
  loading,
  emptyLabel = "No votes yet.",
  publicOnly = true,
}: {
  players: string[];
  history: VoteRow[];
  appearances?: AppearanceMap;
  awards?: MatchAward[];
  sessions?: TrainingSession[];
  tests?: FitnessTest[];
  loading?: boolean;
  emptyLabel?: string;
  publicOnly?: boolean;
}) {
  const table = useMemo(
    () => scoreFull(players, history, awards, sessions, appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const scored = useMemo(() => topNWithTies(table, (t) => t.total, 3), [table]);
  const maxPts = Math.max(1, ...scored.map((t) => t.total), 1);

  const chartData = useMemo(
    () =>
      scored.map((t) => ({
        label: publicOnly ? publicName(t.name) : parsePlayer(t.name).first,
        pts: t.total,
        parent: t.parentPts,
        mom: t.oppMomPts,
        pp: t.playersPlayerPts,
        train: t.trainingPts,
        games: t.games,
        full: publicOnly ? publicName(t.name) : parsePlayer(t.name).name,
      })),
    [scored, publicOnly],
  );

  if (loading && !players.length) {
    return (
      <div className="rounded-xl border border-border bg-surface px-4 py-8 text-center text-sm text-muted">
        Loading the table…
      </div>
    );
  }

  if (!scored.length) {
    return (
      <div className="rounded-xl border border-border bg-surface px-4 py-10 text-center text-sm text-muted">
        {emptyLabel}
      </div>
    );
  }

  const chartHeight = Math.max(180, scored.length * 32);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {scored.map((item, index) => (
          <PlayerRow
            key={item.name}
            item={item}
            index={placeAt(index, scored.map((r) => r.total)) - 1}
            maxPts={maxPts}
            publicOnly={publicOnly}
          />
        ))}
      </div>
      <section className="rounded-xl border border-border bg-surface p-3 shadow-panel">
        <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted">
          Top 3 · total points
        </h3>
        <ChartFrame height={chartHeight}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 4, right: 12, left: 4, bottom: 0 }}
            >
              <CartesianGrid
                stroke="var(--color-border)"
                strokeDasharray="3 3"
                horizontal={false}
              />
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
                width={68}
                stroke="var(--color-subtle)"
                tick={{ fill: "var(--color-fg)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--color-accent-soft)" }}
                content={<ChartTooltip />}
              />
              <Bar
                dataKey="pts"
                fill="var(--color-accent)"
                radius={[0, 4, 4, 0]}
                barSize={14}
                name="Total"
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>
      </section>
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: {
    payload: {
      full: string;
      pts: number;
      parent: number;
      mom: number;
      pp: number;
      train: number;
      games: number;
    };
  }[];
}) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-elevated px-3 py-2 text-xs shadow-panel">
      <p className="font-semibold text-fg">{d.full}</p>
      <p className="mt-1 tabular-nums text-muted">{d.pts} pts</p>
    </div>
  );
}

function PlayerRow({
  item,
  index,
  maxPts,
  publicOnly,
}: {
  item: FullScore;
  index: number;
  maxPts: number;
  publicOnly: boolean;
}) {
  const p = parsePlayer(item.name);
  const width = Math.max(6, Math.round((item.total / maxPts) * 100));
  return (
    <article className="rounded-lg border border-border bg-surface px-3 py-3">
      <div className="flex items-center gap-3">
        <div className="w-7 text-center text-sm font-semibold tabular-nums text-muted">
          <span className={index === 0 ? "text-accent" : undefined}>{index + 1}</span>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-elevated text-xs font-bold">
          {p.initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{publicOnly ? publicName(item.name) : p.name}</p>
          <p className="mt-0.5 text-xs tabular-nums text-muted">
            {publicOnly ? `${item.total} pts` : `Parents ${item.parentPts} · MOM ${item.oppMomPts} · Players’ ${item.playersPlayerPts} · Train ${item.trainingPts} · Tests ${item.testPts}`}
          </p>
        </div>
        {publicOnly ? (
          <p className="font-display text-lg font-bold tabular-nums text-accent">{item.total}</p>
        ) : null}
      </div>
      {publicOnly ? null : (
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-2.5 text-center sm:grid-cols-4">
          <Stat value={item.total} label="Total" accent />
          <Stat value={item.parentPts} label="Parents" />
          <Stat value={item.oppMomPts + item.playersPlayerPts} label="Awards" />
          <Stat value={item.trainingPts} label="Training" />
        </div>
      )}
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-elevated">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${width}%` }}
        />
      </div>
    </article>
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
