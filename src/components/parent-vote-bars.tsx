"use client";

import { useMemo } from "react";
import { computeTotals } from "@/lib/league";
import { publicName } from "@/lib/players";
import { placeAt, topNWithTies } from "@/lib/score-categories";
import type { VoteRow } from "@/lib/vote-actions";

function RunningBull() {
  return (
    <svg viewBox="0 0 40 26" className="h-6 w-8 drop-shadow-sm" aria-hidden="true">
      <path d="M6 13c-3-1-5-4-4-6" fill="none" stroke="#1a1a1a" strokeWidth="1.4" strokeLinecap="round" />
      <ellipse cx="15" cy="14" rx="9" ry="5.2" fill="#b42318" />
      <path d="M8 17v6M13 17.5v6M18 17.5v6M23 17v6" stroke="#111" strokeWidth="1.7" strokeLinecap="round" />
      <ellipse cx="27" cy="12" rx="5.2" ry="4" fill="#b42318" />
      <path d="M24 9c-1-4 2-6 3-3M29 8c2-4 5-3 4 0" fill="none" stroke="#f5c518" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="32.2" cy="13" rx="2.3" ry="1.6" fill="#1a1a1a" />
      <circle cx="28.5" cy="11" r="0.7" fill="#f5c518" />
    </svg>
  );
}

export function ParentVoteBars({
  title,
  note,
  players,
  votes,
  everyone = false,
  embedded = false,
}: {
  title: string;
  note?: string;
  players: string[];
  votes: VoteRow[];
  everyone?: boolean;
  embedded?: boolean;
}) {
  const top = useMemo(() => {
    const table = computeTotals(players, votes);
    if (!everyone) return topNWithTies(table, (t) => t.pts, 3);
    return table
      .filter((row) => row.pts > 0)
      .sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name));
  }, [players, votes, everyone]);
  const max = top[0]?.pts || 1;
  const places = top.map((row) => row.pts);
  const live = /^current round/i.test(title);
  const heading = live ? title.replace(/^current round\s·\s/i, "") : title;

  return (
    <section className={embedded ? "border-t border-border" : "overflow-hidden rounded-2xl border border-border bg-surface shadow-panel"}>
      {embedded ? null : (
      <div className="bg-kit-navy px-4 py-3 text-kit-navy-fg">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-kit-gold">
          {live ? "Current round" : "Parent 3-2-1"}
        </p>
        <div className="mt-1 flex items-end justify-between gap-3">
          <h2 className="font-display text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl">
            {heading}
          </h2>
          <p className="shrink-0 text-right text-[11px] font-semibold uppercase tracking-wider text-white/70">
            {votes.length} vote{votes.length === 1 ? "" : "s"}
            <span className="mt-0.5 block text-kit-gold">Live</span>
          </p>
        </div>
      </div>
      )}
      <div className="px-4 py-3">
        {embedded ? (
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-kit-gold">Live bar graph</p>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              {votes.length} vote{votes.length === 1 ? "" : "s"}
            </p>
          </div>
        ) : null}
        {note ? <p className="text-xs leading-snug text-muted">{note}</p> : null}
        {top.length ? (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
            <span className="inline-flex items-center gap-1.5">
              <i className="size-2.5 rounded-full bg-[#f5c518]" />
              3 points
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="size-2.5 rounded-full bg-[#2f9bff]" />
              2 points
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="size-2.5 rounded-full bg-[#ff4d3a]" />
              1 point
            </span>
          </div>
        ) : null}
        {!top.length ? (
          <p className="mt-3 text-sm text-muted">
            No votes for this round yet. The places fill in as families vote.
          </p>
        ) : (
          <ol className="mt-3 flex flex-col gap-2">
            {top.map((row, i) => {
              const place = placeAt(i, places);
              const pct = Math.max(8, Math.round((row.pts / max) * 100));
              return (
                <li key={row.name} className="rounded-xl border border-border bg-bg px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        place === 1
                          ? "flex size-9 shrink-0 items-center justify-center rounded-full bg-kit-gold font-display text-sm font-bold text-kit-navy"
                          : place === 2
                            ? "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2f9bff] font-display text-sm font-bold text-white"
                            : "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ff4d3a] font-display text-sm font-bold text-white"
                      }
                    >
                      {place}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="truncate text-sm font-semibold">{publicName(row.name)}</p>
                        <p className="font-display text-lg font-bold tabular-nums leading-none">
                          {row.pts}
                          <span className="ml-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-muted">pts</span>
                        </p>
                      </div>
                      <div className="relative mt-1 h-8">
                        <div className="absolute inset-x-0 bottom-0 h-3 rounded-full bg-border" />
                        <div
                          key={`${row.pts}-${row.n3}-${row.n2}-${row.n1}`}
                          className="bull-fill absolute bottom-0 left-0 h-8"
                          style={{ ["--target" as string]: `${pct}%`, animationDelay: `${i * 90}ms` }}
                        >
                          <div className="absolute inset-x-0 bottom-0 flex h-3 overflow-hidden rounded-full">
                            {row.n3 > 0 ? (
                              <div className="h-full bg-[#f5c518]" style={{ width: `${(row.n3 * 3 / row.pts) * 100}%` }} />
                            ) : null}
                            {row.n2 > 0 ? (
                              <div className="h-full bg-[#2f9bff]" style={{ width: `${(row.n2 * 2 / row.pts) * 100}%` }} />
                            ) : null}
                            {row.n1 > 0 ? (
                              <div className="h-full bg-[#ff4d3a]" style={{ width: `${(row.n1 / row.pts) * 100}%` }} />
                            ) : null}
                          </div>
                          <span className="bull-gallop pointer-events-none absolute bottom-3 right-0" style={{ animationDelay: `${i * 90}ms` }}>
                            <RunningBull />
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider">
                        <span className="text-[#f5c518]">{row.n3} × 3</span>
                        <span className="px-1.5 text-border">·</span>
                        <span className="text-[#2f9bff]">{row.n2} × 2</span>
                        <span className="px-1.5 text-border">·</span>
                        <span className="text-[#ff4d3a]">{row.n1} × 1</span>
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
