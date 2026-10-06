"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import type { AppearanceMap } from "@/lib/appearance-actions";
import { gameKey } from "@/lib/league";
import {
  MATCH_STAT_FIELDS,
  emptyStats,
  hasAnyStat,
  seasonTally,
  type MatchResult,
  type PlayerMatchStats,
  type StatKey,
} from "@/lib/match-stats";
import { getMatchStats, saveMatchStats } from "@/lib/match-stats-actions";
import { SAVE_LOCK } from "@/lib/coach-users";
import { parsePlayer, shortName } from "@/lib/players";
import type { CurrentMatch } from "@/lib/vote-actions";

function named(stats: PlayerMatchStats[], key: StatKey) {
  return stats
    .filter((s) => s[key] > 0)
    .sort((a, b) => b[key] - a[key])
    .map((s) => {
      const n = s[key];
      const name = parsePlayer(s.player).name;
      return n > 1 ? `${name} ${n}` : name;
    })
    .join(", ");
}

export function MatchStatsPanel({
  players,
  currentMatch,
  appearances,
  fixtureOpposition,
  canSave = true,
}: {
  players: string[];
  currentMatch: CurrentMatch | null;
  appearances: AppearanceMap;
  fixtureOpposition?: string;
  canSave?: boolean;
}) {
  const [gameNumber, setGameNumber] = useState(currentMatch?.gameNumber ?? "");
  const [opposition, setOpposition] = useState(
    currentMatch?.opposition ?? fixtureOpposition ?? "",
  );
  const [goalsFor, setGoalsFor] = useState(0);
  const [goalsAgainst, setGoalsAgainst] = useState(0);
  const [notes, setNotes] = useState("");
  const [rows, setRows] = useState<PlayerMatchStats[]>([]);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [openPlayer, setOpenPlayer] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const played = appearances[gameKey(gameNumber.trim(), opposition.trim())] ?? [];
  const squad = played.length ? played : players;

  async function load() {
    try {
      const data = await getMatchStats();
      setResults(data.results);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load match stats.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (fixtureOpposition) setOpposition(fixtureOpposition);
  }, [fixtureOpposition]);

  useEffect(() => {
    const existing = results.find(
      (r) =>
        r.gameNumber.toLowerCase() === gameNumber.trim().toLowerCase() &&
        r.opposition.toLowerCase() === opposition.trim().toLowerCase(),
    );
    if (existing) {
      setGoalsFor(existing.goalsFor);
      setGoalsAgainst(existing.goalsAgainst);
      setNotes(existing.notes);
      setRows(squad.map((p) => existing.stats.find((s) => s.player === p) ?? emptyStats(p)));
      return;
    }
    setGoalsFor(0);
    setGoalsAgainst(0);
    setNotes("");
    setRows(squad.map((p) => emptyStats(p)));
  }, [gameNumber, opposition, results, squad.join("|")]);

  function patch(player: string, key: StatKey, value: number) {
    setRows((cur) =>
      cur.map((row) => (row.player === player ? { ...row, [key]: Math.max(0, value) } : row)),
    );
  }

  async function onSave() {
    if (!canSave) {
      toast.error(SAVE_LOCK);
      return;
    }
    if (!gameNumber.trim() || !opposition.trim()) {
      toast.error("Enter the round and opposition first.");
      return;
    }
    setSaving(true);
    try {
      await saveMatchStats({
        data: {
          gameNumber: gameNumber.trim(),
          opposition: opposition.trim(),
          goalsFor,
          goalsAgainst,
          notes,
          stats: rows.filter(hasAnyStat),
        },
      });
      toast.success("Match stats saved.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save match stats.");
    } finally {
      setSaving(false);
    }
  }

  const tally = useMemo(() => seasonTally(players, results), [players, results]);
  const gfFromPlayers = rows.reduce((n, r) => n + r.goals, 0);

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          This match
        </h3>
        <p className="mb-3 text-sm text-muted">
          Result, scorers, assists, tackles, saves. Same screen as the pitch. Coach only.
        </p>
        <div className="mb-4 rounded-lg border border-border bg-bg px-3 py-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent">
            What the letters mean
          </p>
          <dl className="flex flex-col gap-2">
            {MATCH_STAT_FIELDS.map((f) => (
              <div key={f.key} className="flex gap-3 text-sm">
                <dt className="w-10 shrink-0 font-display text-base font-bold uppercase text-fg">
                  {f.short}
                </dt>
                <dd className="min-w-0">
                  <span className="font-semibold">{f.label}.</span>{" "}
                  <span className="text-muted">{f.meaning}</span>
                </dd>
              </div>
            ))}
            <div className="flex gap-3 text-sm">
              <dt className="w-10 shrink-0 font-display text-base font-bold uppercase text-fg">
                G A T S
              </dt>
              <dd className="min-w-0 text-muted">
                On each name: Goals · Assists · Tackles · Saves — tap the name for the rest.
              </dd>
            </div>
          </dl>
        </div>
        <FieldLabel htmlFor="stats-round">Round / game</FieldLabel>
        <FieldInput
          id="stats-round"
          value={gameNumber}
          onChange={(e) => setGameNumber(e.target.value)}
          className="mb-3"
        />
        <FieldLabel htmlFor="stats-opp">Opposition</FieldLabel>
        <FieldInput
          id="stats-opp"
          value={opposition}
          onChange={(e) => setOpposition(e.target.value)}
          className="mb-3"
        />
        {currentMatch ? (
          <button
            type="button"
            className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent"
            onClick={() => {
              setGameNumber(currentMatch.gameNumber);
              setOpposition(currentMatch.opposition);
            }}
          >
            Use posted match
          </button>
        ) : null}

        <div className="mb-3 grid grid-cols-2 gap-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Bulls
            </span>
            <FieldInput
              inputMode="numeric"
              value={String(goalsFor)}
              onChange={(e) => setGoalsFor(Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Them
            </span>
            <FieldInput
              inputMode="numeric"
              value={String(goalsAgainst)}
              onChange={(e) => setGoalsAgainst(Math.max(0, Number(e.target.value) || 0))}
            />
          </label>
        </div>
        <p className="mb-3 font-display text-3xl font-bold uppercase tracking-tight">
          {goalsFor}–{goalsAgainst}
        </p>
        {gfFromPlayers !== goalsFor && gfFromPlayers > 0 ? (
          <p className="mb-3 text-xs text-accent">
            Player goals add up to {gfFromPlayers}. Scoreline is {goalsFor}.
          </p>
        ) : null}

        <FieldLabel htmlFor="stats-notes">Match note</FieldLabel>
        <FieldInput
          id="stats-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mb-4"
        />

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Player stats
        </p>
        <div className="flex flex-col gap-2">
          {rows.map((row) => {
            const open = openPlayer === row.player;
            return (
              <div key={row.player} className="rounded-lg border border-border bg-bg">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
                  onClick={() => setOpenPlayer(open ? null : row.player)}
                >
                  <span className="truncate text-sm font-semibold">{shortName(row.player)}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted">
                    {row.goals} G · {row.assists} A · {row.tackles} T · {row.saves} S
                  </span>
                </button>
                {open ? (
                  <div className="grid grid-cols-3 gap-2 border-t border-border px-3 py-3">
                    {MATCH_STAT_FIELDS.map((f) => (
                      <StatStep
                        key={f.key}
                        label={f.short}
                        hint={f.label}
                        value={row[f.key]}
                        onChange={(v) => patch(row.player, f.key, v)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
        {canSave ? (
          <Button className="mt-4 w-full" onClick={() => void onSave()} disabled={saving}>
            {saving ? "Saving…" : "Save match stats"}
          </Button>
        ) : (
          <p className="mt-4 text-sm text-muted">{SAVE_LOCK}</p>
        )}
      </section>

      <section className="rounded-xl border border-border bg-surface p-4">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          Results log
        </h3>
        {!results.length ? (
          <p className="mt-2 text-sm text-muted">Save a match to start the log.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {results.map((r) => (
              <li key={`${r.gameNumber}|${r.opposition}`}>
                <button
                  type="button"
                  className="w-full rounded-lg border border-border bg-bg px-3 py-3 text-left"
                  onClick={() => {
                    setGameNumber(r.gameNumber);
                    setOpposition(r.opposition);
                  }}
                >
                  <p className="font-semibold">
                    {r.gameNumber}{" "}
                    <span className="text-muted">vs {r.opposition}</span>
                    <span className="ml-2 font-display text-lg font-bold">
                      {r.goalsFor}–{r.goalsAgainst}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Scorers: {named(r.stats, "goals") || "—"}
                  </p>
                  <p className="text-xs text-muted">
                    Assists: {named(r.stats, "assists") || "—"}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-tight">
          Season tally
        </h3>
        {!tally.length ? (
          <p className="text-sm text-muted">Totals appear after you save a match.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border">
            <div className="w-max min-w-full">
              <div className="flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
                <span className="min-w-28 flex-1">Player</span>
                {MATCH_STAT_FIELDS.map((f) => (
                  <span key={f.key} className="w-8 text-right">
                    {f.short}
                  </span>
                ))}
              </div>
              {tally.map((row) => (
                <div
                  key={row.player}
                  className="flex gap-2 border-t border-border px-3 py-2 text-sm"
                >
                  <span className="min-w-28 flex-1 truncate">{parsePlayer(row.player).name}</span>
                  {MATCH_STAT_FIELDS.map((f) => (
                    <span key={f.key} className="w-8 text-right tabular-nums text-muted">
                      {row[f.key] || "—"}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function StatStep({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-center text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <div className="flex h-11 items-center overflow-hidden rounded-md border border-border">
        <button
          type="button"
          className="flex h-11 w-9 items-center justify-center text-lg text-muted"
          onClick={() => onChange(value - 1)}
        >
          −
        </button>
        <span className="flex-1 text-center font-display text-lg font-bold tabular-nums">
          {value}
        </span>
        <button
          type="button"
          className="flex h-11 w-9 items-center justify-center text-lg text-muted"
          onClick={() => onChange(value + 1)}
        >
          +
        </button>
      </div>
      <p className="mt-1 text-center text-xs text-muted">{hint}</p>
    </div>
  );
}
