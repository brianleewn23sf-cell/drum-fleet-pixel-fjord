"use client";

import { useEffect, useMemo, useState } from "react";
import { getTrainerYear } from "@/lib/potm-actions";
import { publicName, shortName } from "@/lib/players";
import { scoreTrainerYear, type TrainerYearRow, TRAINER_YEAR_LABEL } from "@/lib/trainer-year";
import type { TrainingSession } from "@/lib/training";

export function TrainerYearPanel({
  topN,
  compact,
  players = [],
  sessions,
}: {
  topN?: number;
  compact?: boolean;
  players?: string[];
  sessions?: TrainingSession[];
}) {
  const [fetched, setFetched] = useState<TrainerYearRow[]>([]);
  const [label, setLabel] = useState(TRAINER_YEAR_LABEL);
  const [range, setRange] = useState("1 Sep 2026 – 30 Jun 2027");

  const localRows = useMemo(
    () => (sessions && sessions.length && players.length ? scoreTrainerYear(players, sessions) : null),
    [players, sessions],
  );
  const rows =
    localRows?.some((r) => r.pts > 0) ? localRows : fetched.some((r) => r.pts > 0) ? fetched : localRows ?? fetched;

  useEffect(() => {
    void getTrainerYear()
      .then((d) => {
        setFetched(d.rows);
        setLabel(d.label);
        setRange(`${d.start.split("-").reverse().join("/")} – ${d.end.split("-").reverse().join("/")}`);
      })
      .catch(() => setFetched([]));
  }, []);

  const publicTop = Boolean(topN);
  const list = publicTop ? rows.filter((r) => r.pts > 0).slice(0, topN) : rows;

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">{label}</h3>
      <p className="mt-1 text-sm leading-7 text-muted">
        Friday training only · {range}. Attendance, effort, attitude, achievement (max 40 a night).
        Match votes, MOM and tests do not count.
      </p>
      {publicTop ? (
        list.some((r) => r.pts > 0) ? (
          <ol className="mt-3 flex flex-col gap-1">
            {list.map((row, i) => (
              <li key={row.name} className="flex items-center justify-between text-sm">
                <span>
                  <span className="mr-2 font-semibold tabular-nums text-accent">{i + 1}</span>
                  {publicName(row.name)}
                </span>
                <span className="font-semibold tabular-nums">{row.pts} pts</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-sm text-muted">No Friday marks in this window yet.</p>
        )
      ) : (
        <>
          {rows.some((r) => r.pts > 0) ? (
            <p className="mt-3 font-display text-xl font-bold uppercase">
              Leader · {shortName(rows.find((r) => r.pts > 0)!.name)} · {rows.find((r) => r.pts > 0)!.pts} pts
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">No Friday marks in this window yet.</p>
          )}
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <div className="flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <span className="min-w-0 flex-1">Player</span>
              <span className="w-10 text-right">Nts</span>
              <span className="w-10 text-right">Avg</span>
              <span className="w-10 text-right">Pts</span>
            </div>
            {rows.map((row, i) => (
              <div key={row.name} className="flex gap-2 border-t border-border px-3 py-2 text-sm">
                <span className="min-w-0 flex-1 truncate">
                  <span className="mr-2 text-muted">{i + 1}</span>
                  {shortName(row.name)}
                </span>
                <span className="w-10 text-right tabular-nums text-muted">{row.attended}</span>
                <span className="w-10 text-right tabular-nums text-muted">{row.avg ?? "—"}</span>
                <span className="w-10 text-right tabular-nums font-semibold">{row.pts}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
