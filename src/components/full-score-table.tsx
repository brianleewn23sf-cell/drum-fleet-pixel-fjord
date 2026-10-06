"use client";

import { Fragment, useMemo, useState } from "react";
import { averageMonthlyFull, scoreFull, scoreFullMonth, SCORE_CATEGORIES } from "@/lib/full-score";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import { fridayLabel, fridayMark, seasonFridays, TRAINING_AWARD_MAX } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import type { VoteRow } from "@/lib/vote-actions";
import { parsePlayer, publicName, shortName } from "@/lib/players";
import { cn } from "@/lib/utils";
import { PlayerTestTotals } from "@/components/player-test-totals";
import { playerReportHref } from "@/components/player-week-report";
import { SquadTestTable } from "@/components/squad-test-table";
import { playerDrillLines } from "@/lib/test-bonus";
import { openPrizeMonth } from "@/lib/prize-window";

type SortId = (typeof SCORE_CATEGORIES)[number]["id"] | "avg" | "s30" | "month";

const COLS: { id: SortId; head: string }[] = [
  { id: "training", head: "Train" },
  { id: "parents", head: "3-2-1" },
  { id: "mom", head: "MOM" },
  { id: "manager", head: "Mgr" },
  { id: "played", head: "Played" },
  { id: "tests", head: "Tests" },
  { id: "total", head: "Overall" },
  { id: "month", head: "Month" },
  { id: "avg", head: "Avg" },
  { id: "s30", head: "30m" },
];

const SORTS: { id: SortId; title: string; note: string }[] = [
  {
    id: "s30",
    title: "30m time",
    note: "Linear speed no ball. Clock is GO to the last cones. Fastest at the top.",
  },
  ...SCORE_CATEGORIES.map((c) => ({ id: c.id, title: c.title, note: c.note })),
  {
    id: "avg",
    title: "Monthly avg",
    note: "Average points per prize month. Same marks as the total, split by month.",
  },
];

function formatAvg(n: number) {
  if (!n) return "0";
  return n % 1 === 0 ? String(n) : n.toFixed(1);
}

export function FullScoreTable({
  players,
  history,
  appearances,
  awards = [],
  sessions = [],
  tests = [],
}: {
  players: string[];
  history: VoteRow[];
  appearances?: AppearanceMap;
  awards?: MatchAward[];
  sessions?: TrainingSession[];
  tests?: FitnessTest[];
}) {
  const [sort, setSort] = useState<string>("total");
  const [desc, setDesc] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const table = useMemo(
    () => scoreFull(players, history, awards, sessions, appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const monthTable = useMemo(
    () => scoreFullMonth(players, history, awards, sessions, openPrizeMonth(), appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const monthBy = useMemo(() => new Map(monthTable.map((r) => [r.name, r.total])), [monthTable]);
  const monthly = useMemo(
    () => averageMonthlyFull(players, history, awards, sessions, appearances, tests),
    [players, history, awards, sessions, appearances, tests],
  );
  const avgBy = useMemo(() => new Map(monthly.map((r) => [r.name, r])), [monthly]);
  const monthsN = monthly[0]?.months ?? 0;
  const cat = sort.startsWith("fri:")
    ? {
        id: sort,
        title: fridayLabel(sort.slice(4)),
        note: `That Friday only. Max ${TRAINING_AWARD_MAX}. A dash means the night has not been marked.`,
      }
    : sort === "month"
      ? { id: "month" as const, title: "This month", note: "Overall points in the live prize month." }
      : (SORTS.find((c) => c.id === sort) ?? SORTS[0]);

  const fridays = useMemo(() => seasonFridays(), []);
  const markedNights = fridays.filter((day) => sessions.some((s) => s.sessionDate.slice(0, 10) === day));
  const blankNights = fridays.filter((day) => !markedNights.includes(day));
  const sprintBy = useMemo(() => {
    const map = new Map<string, { time: number | null; label: string; score: number | null }>();
    for (const name of players) {
      const line = playerDrillLines(tests, name).find((l) => l.kind === "s30_no");
      map.set(name, {
        time: line?.time ?? null,
        label: line?.timeLabel ?? "—",
        score: line?.score ?? null,
      });
    }
    return map;
  }, [players, tests]);

  function valueOf(name: string, id: string): number {
    if (id.startsWith("fri:")) {
      const pts = fridayMark(sessions, name, id.slice(4));
      return pts ?? -1;
    }
    if (id === "avg") return avgBy.get(name)?.avg ?? 0;
    if (id === "month") return monthBy.get(name) ?? 0;
    if (id === "s30") return sprintBy.get(name)?.time ?? 0;
    const row = table.find((r) => r.name === name);
    if (!row) return 0;
    const catRow = SCORE_CATEGORIES.find((c) => c.id === id);
    return catRow ? catRow.pts(row) : 0;
  }

  const ranked = useMemo(() => {
    return [...table].sort((a, b) => {
      if (sort === "s30") {
        const at = sprintBy.get(a.name)?.time;
        const bt = sprintBy.get(b.name)?.time;
        if (at == null && bt == null) {
          return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
        }
        if (at == null) return 1;
        if (bt == null) return -1;
        const d = at - bt;
        if (d !== 0) return desc ? d : -d;
        return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
      }
      const d = valueOf(b.name, sort) - valueOf(a.name, sort);
      if (d !== 0) return desc ? d : -d;
      return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
    });
  }, [table, sort, desc, avgBy, monthBy, sprintBy, sessions]);
  const leader = ranked[0];

  function toggle(id: string) {
    if (sort === id) setDesc((d) => !d);
    else {
      setSort(id);
      setDesc(true);
    }
  }

  function cell(name: string, id: string) {
    if (id.startsWith("fri:")) {
      const pts = fridayMark(sessions, name, id.slice(4));
      return pts == null ? "—" : String(pts);
    }
    if (id === "s30") {
      const label = sprintBy.get(name)?.label ?? "—";
      const time = label.split("·")[0]?.trim();
      return time || "—";
    }
    const n = valueOf(name, id);
    return id === "avg" ? formatAvg(n) : String(n);
  }

  return (
    <div className="flex flex-col gap-4">
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Season running</h2>
        <a
          href="/report/scores"
          className="inline-flex h-11 items-center rounded-md bg-accent px-3 text-xs font-semibold uppercase tracking-wide text-accent-fg"
        >
          Summary sheet
        </a>
      </div>
      <p className="mt-1 text-sm text-muted">
        Every Friday from 4 Sep, max {TRAINING_AWARD_MAX} a night. Then the games: parent 3-2-1, opposition MOM, manager’s player, and 5 for every game he played. Tests are added too.
        Overall is those added up. Month and the average are not added again.
        {blankNights.length
          ? ` Not marked yet: ${blankNights.map(fridayLabel).join(", ")}.`
          : ""}
        {monthsN ? ` Average is across ${monthsN} prize month${monthsN === 1 ? "" : "s"}.` : ""}
      </p>
      {leader ? (
        <p className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-fg">
          1st · {shortName(leader.name)} · {cell(leader.name, sort)} {cat.title}
        </p>
      ) : null}
      <p className="mt-1 text-xs text-muted">{cat.note}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {SORTS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => toggle(c.id)}
            className={cn(
              "h-11 rounded-md px-3 text-xs font-semibold uppercase tracking-wide",
              sort === c.id ? "bg-accent text-accent-fg" : "border border-border bg-bg text-fg",
            )}
          >
            {c.title}
            {sort === c.id ? (desc ? " ↓" : " ↑") : ""}
          </button>
        ))}
      </div>

      <div className="mt-4 w-full max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-border">
        <table className="w-max border-separate border-spacing-0 text-base">
          <thead>
            <tr className="bg-bg text-xs font-semibold uppercase tracking-wide text-subtle">
              <th className="sticky left-0 z-20 min-w-[9.5rem] border-b border-border bg-bg px-3 py-3 text-left shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]">
                Player
              </th>
              {fridays.map((day) => {
                const id = `fri:${day}`;
                return (
                  <th key={id} className="min-w-[4.25rem] whitespace-nowrap border-b border-border bg-bg px-2 py-1 text-right">
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className={cn(
                        "inline-flex h-11 w-full items-center justify-end text-xs font-semibold uppercase",
                        sort === id ? "text-accent" : "text-subtle",
                      )}
                    >
                      {fridayLabel(day)}
                      {sort === id ? (desc ? " ↓" : " ↑") : ""}
                    </button>
                  </th>
                );
              })}
              {COLS.map((col) => (
                <th key={col.id} className="min-w-[4.25rem] whitespace-nowrap border-b border-border bg-bg px-2 py-1 text-right">
                  <button
                    type="button"
                    onClick={() => toggle(col.id)}
                    className={cn("inline-flex h-11 w-full items-center justify-end text-xs font-semibold uppercase", sort === col.id ? "text-accent" : "text-subtle")}
                  >
                    {col.head}
                    {sort === col.id ? (desc ? " ↓" : " ↑") : ""}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.map((row, i) => {
              const top = i === 0 && valueOf(row.name, sort) > 0;
              const shown = open === row.name;
              const who = parsePlayer(row.name);
              const stickyBg = top ? "bg-[color-mix(in_oklab,#b42318_18%,#141416)]" : "bg-surface";
              return (
                <Fragment key={row.name}>
                  <tr
                    className={cn("border-t border-border", top && "bg-accent-soft")}
                    onClick={() => setOpen(shown ? null : row.name)}
                  >
                    <td className={cn("sticky left-0 z-10 whitespace-nowrap border-t border-border px-3 py-3 text-base font-semibold shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]", stickyBg)}>
                      <a
                        href={playerReportHref(row.name)}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 underline-offset-2 hover:underline"
                      >
                        <span className={cn("w-6 font-display text-xl font-bold tabular-nums", top ? "text-accent" : "text-muted")}>
                          {i + 1}
                        </span>
                        <span>
                          {who.num ? `#${who.num} ` : ""}
                          {publicName(row.name)}
                        </span>
                      </a>
                    </td>
                    {fridays.map((day) => {
                      const id = `fri:${day}`;
                      const active = sort === id;
                      return (
                        <td
                          key={id}
                          className={cn(
                            "whitespace-nowrap border-t border-border px-2 py-3 text-right font-display text-xl font-bold tabular-nums",
                            active ? "text-accent" : "text-fg",
                          )}
                        >
                          {cell(row.name, id)}
                        </td>
                      );
                    })}
                    {COLS.map((col) => {
                      const active = sort === col.id;
                      return (
                        <td
                          key={col.id}
                          className={cn(
                            "whitespace-nowrap border-t border-border px-2 py-3 text-right font-display text-xl font-bold tabular-nums",
                            col.id === "total" || active ? "text-accent" : "text-fg",
                          )}
                        >
                          {cell(row.name, col.id)}
                        </td>
                      );
                    })}
                  </tr>
                  {shown ? (
                    <tr className="border-t border-border bg-bg">
                      <td colSpan={fridays.length + COLS.length + 1} className="border-t border-border px-3 py-3">
                        <PlayerTestTotals tests={tests} player={row.name} compact />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
      <SquadTestTable players={players} tests={tests} />
    </div>
  );
}
