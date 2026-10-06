"use client";

import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { formatKickoff } from "@/lib/when";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { getLeagueData, recordLeagueResult, saveDivisionStanding, addDivisionTeam, syncLeagueFromFa } from "@/lib/league-actions";
import { cn } from "@/lib/utils";
import { MatchSheet } from "@/components/match-sheet";
import type { MatchAward } from "@/lib/coach-actions";
import type { VoteRow } from "@/lib/vote-actions";
import {
  BULLS_TEAM,
  LEAGUE_NAME,
  SEASON_NAME,
  U12_DIVISIONS,
  bullsOpponent,
  fixtureHasScore,
  fixtureKickoff,
  fixturePlayed,
  isBullsHome,
  shortClub,
  southTable,
  weekendSnapshotTables,
  type DivisionId,
  type DivisionResult,
  type LeagueFixture,
  type MatchGoal,
  type Standing,
} from "@/lib/wdyl";
import { faDivisionTableUrl, faLeagueHomeUrl } from "@/lib/fa-fulltime";

function kickoffParts(iso: string) {
  return {
    day: formatKickoff(iso, "EEE d MMM") || "TBC",
    time: formatKickoff(iso, "HH:mm"),
  };
}

function formatLastSync(value: string | null): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function LeaguePanel({ editable = false }: { editable?: boolean }) {
  const [fixtures, setFixtures] = useState<LeagueFixture[]>([]);
  const [tables, setTables] = useState<Record<DivisionId, Standing[]>>(weekendSnapshotTables);
  const [division, setDivision] = useState<DivisionId>("south");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [homeGoals, setHomeGoals] = useState("");
  const [awayGoals, setAwayGoals] = useState("");
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncNote, setSyncNote] = useState<string | null>(null);
  const [goalsByFixture, setGoalsByFixture] = useState<Record<number, MatchGoal[]>>({});
  const [awards, setAwards] = useState<MatchAward[]>([]);
  const [votes, setVotes] = useState<VoteRow[]>([]);
  const [players, setPlayers] = useState<string[]>([]);
  const [divisionResults, setDivisionResults] = useState<Record<DivisionId, DivisionResult[]>>({
    north: [],
    south: [],
    west: [],
    east: [],
  });

  function applyLeague(data: {
    fixtures?: LeagueFixture[];
    tables?: Record<DivisionId, Standing[]>;
    lastSync?: string | null;
    syncNote?: string | null;
    goalsByFixture?: Record<number, MatchGoal[]>;
    awards?: MatchAward[];
    votes?: VoteRow[];
    players?: string[];
    divisionResults?: Record<DivisionId, DivisionResult[]>;
  }) {
    if (data.fixtures) setFixtures(data.fixtures);
    if (data.tables) setTables(data.tables);
    if (data.lastSync !== undefined) setLastSync(data.lastSync);
    if (data.syncNote !== undefined) setSyncNote(data.syncNote);
    if (data.goalsByFixture) setGoalsByFixture(data.goalsByFixture);
    if (data.awards) setAwards(data.awards);
    if (data.votes) setVotes(data.votes);
    if (data.players) setPlayers(data.players);
    if (data.divisionResults) setDivisionResults(data.divisionResults);
  }

  async function load() {
    setLoading(true);
    try {
      const data = await getLeagueData();
      applyLeague(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load the league.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const upcoming = useMemo(() => fixtures.filter((f) => !fixturePlayed(f)), [fixtures]);
  const results = useMemo(
    () => fixtures.filter((f) => fixturePlayed(f)).slice().reverse(),
    [fixtures],
  );
  const standings = useMemo(() => {
    if (division === "south") {
      const faSouth = tables.south ?? [];
      if (faSouth.some((row) => row.played > 0)) return faSouth;
      return southTable(fixtures);
    }
    return tables[division] ?? [];
  }, [division, fixtures, tables]);
  const shownStandings = useMemo(
    () => standings.map((row, i) => ({ row, rank: i + 1 })),
    [standings],
  );

  const lastSyncLabel = formatLastSync(lastSync);

  async function updateFromFa() {
    setSyncing(true);
    try {
      const res = await syncLeagueFromFa();
      applyLeague(res);
      const scoreLine = res.bullsScores?.[0]
        ? `${shortClub(res.bullsScores[0].homeTeam)} ${res.bullsScores[0].homeGoals}–${res.bullsScores[0].awayGoals} ${shortClub(res.bullsScores[0].awayTeam)}`
        : null;
      if (res.source === "fa") {
        toast.success(scoreLine ? `Fixtures and results updated. ${scoreLine}.` : "Fixtures, results and U12 tables updated from Full-Time.");
      } else if (res.fromFa?.length) {
        toast.success(
          `Updated U12 ${res.fromFa.join(", ")} from Full-Time${scoreLine ? `. ${scoreLine}` : ""}.`,
        );
      } else {
        toast.success(scoreLine ? `Tables refreshed. ${scoreLine}.` : "Tables and scores refreshed.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update from Full-Time.");
    } finally {
      setSyncing(false);
    }
  }

  const [newTeam, setNewTeam] = useState("");
  const [editTeam, setEditTeam] = useState<string | null>(null);
  const [editPlayed, setEditPlayed] = useState("");
  const [editGd, setEditGd] = useState("");
  const [editPts, setEditPts] = useState("");

  function startRowEdit(row: Standing) {
    setEditTeam(row.team);
    setEditPlayed(String(row.played));
    setEditGd(String(row.gd));
    setEditPts(String(row.pts));
  }

  async function saveRow() {
    if (!editTeam) return;
    const played = Number(editPlayed);
    const gd = Number(editGd);
    const pts = Number(editPts);
    if (![played, gd, pts].every((n) => Number.isFinite(n))) {
      toast.error("Enter played, GD and points as numbers.");
      return;
    }
    setSaving(true);
    try {
      const res = await saveDivisionStanding({
        data: {
          division,
          team: editTeam,
          played,
          won: 0,
          drawn: 0,
          lost: 0,
          gd,
          pts,
        },
      });
      if (res.tables) setTables(res.tables);
      setEditTeam(null);
      toast.success("Table updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update table.");
    } finally {
      setSaving(false);
    }
  }

  async function addTeam() {
    const name = newTeam.trim();
    if (name.length < 2) {
      toast.error("Enter the FA team name.");
      return;
    }
    setSaving(true);
    try {
      const res = await addDivisionTeam({ data: { division, team: name } });
      if (res.tables) setTables(res.tables);
      setNewTeam("");
      toast.success("Team added.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add team.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(fx: LeagueFixture) {
    setEditingId(fx.id);
    setHomeGoals(fx.homeGoals === null ? "" : String(fx.homeGoals));
    setAwayGoals(fx.awayGoals === null ? "" : String(fx.awayGoals));
  }

  async function saveResult() {
    if (editingId === null) return;
    const hg = Number(homeGoals);
    const ag = Number(awayGoals);
    if (!Number.isInteger(hg) || !Number.isInteger(ag) || hg < 0 || ag < 0) {
      toast.error("Enter both scores as whole numbers.");
      return;
    }
    await persistResult(editingId, hg, ag, "Result saved. Table updated.");
  }

  async function clearResult() {
    if (editingId === null) return;
    await persistResult(editingId, null, null, "Score removed. Table updated.");
  }

  async function persistResult(
    id: number,
    home: number | null,
    away: number | null,
    ok: string,
  ) {
    setSaving(true);
    try {
      const res = await recordLeagueResult({
        data: { id, homeGoals: home, awayGoals: away },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(ok);
      setEditingId(null);
      applyLeague(res);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save result.");
    } finally {
      setSaving(false);
    }
  }

  if (loading && !fixtures.length) {
    return (
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {LEAGUE_NAME}
          </p>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight">
            U12s · {SEASON_NAME}
          </h2>
          <Button
            className="mt-3 w-full"
            onClick={() => void updateFromFa()}
            disabled={syncing}
          >
            <RefreshCw className={cn("size-4", syncing && "animate-spin")} />
            {syncing ? "Refreshing…" : "Refresh tables"}
          </Button>
        </div>
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-lg bg-surface" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {LEAGUE_NAME}
        </p>
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">
          U12s · {SEASON_NAME}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {editable
            ? "Press Refresh for fixture changes, every team’s result, and the four U12 tables. Other age groups are ignored."
            : "Full Wigan U12 tables. Press Refresh to pull the latest from FA Full-Time."}
        </p>
        <div className="mt-2 flex flex-col gap-1">
          <a
            href={faLeagueHomeUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-xs font-semibold uppercase tracking-wide text-accent"
          >
            Wigan & District Youth League on Full-Time
          </a>
          <a
            href={faDivisionTableUrl(division)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-xs font-semibold uppercase tracking-wide text-accent"
          >
            Open U12 {division} table
          </a>
        </div>
        <Button
          className="mt-3 w-full"
          onClick={() => void updateFromFa()}
          disabled={syncing || saving}
        >
          <RefreshCw className={cn("size-4", syncing && "animate-spin")} />
          {syncing ? "Refreshing…" : "Refresh tables"}
        </Button>
        {lastSyncLabel || syncNote ? (
          <p className="mt-2 text-xs text-subtle">
            {lastSyncLabel ? `Last update ${lastSyncLabel}` : null}
            {lastSyncLabel && syncNote ? " · " : null}
            {syncNote}
          </p>
        ) : (
          <p className="mt-2 text-xs text-subtle">Pulls North, South, West and East from Full-Time.</p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-1 rounded-lg border border-border bg-surface p-1">
        {U12_DIVISIONS.map((d) => (
          <button
            key={d.id}
            type="button"
            onClick={() => {
              setDivision(d.id);
              setEditTeam(null);
            }}
            className={cn(
              "min-h-12 rounded-md px-1 py-2 text-center text-xs font-semibold uppercase leading-tight tracking-wide",
              division === d.id ? "bg-accent text-accent-fg" : "text-muted",
            )}
          >
            {d.id}
            <span className="mt-0.5 block text-xs font-medium normal-case tracking-normal opacity-80">
              {d.rank}
            </span>
          </button>
        ))}
      </div>

      <section>
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            {U12_DIVISIONS.find((d) => d.id === division)?.label} table
          </h3>
          <a
            href={faDivisionTableUrl(division)}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold uppercase tracking-wide text-accent"
          >
            Full-Time
          </a>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <div className="grid grid-cols-[2rem_minmax(0,1fr)_2rem_2.25rem_2.25rem] gap-x-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-subtle">
            <span>#</span>
            <span>Team</span>
            <span className="text-right">P</span>
            <span className="text-right">GD</span>
            <span className="text-right">Pts</span>
          </div>
          {!shownStandings.length ? (
            <p className="border-t border-border px-3 py-4 text-sm text-muted">
              No teams in this division yet.
            </p>
          ) : (
            shownStandings.map(({ row, rank }) => {
              const us = row.team === BULLS_TEAM;
              return (
                <div key={row.team}>
                  <button
                    type="button"
                    disabled={!editable || division === "south"}
                    onClick={() => startRowEdit(row)}
                    className={cn(
                      "grid w-full grid-cols-[2rem_minmax(0,1fr)_2rem_2.25rem_2.25rem] items-center gap-x-2 border-t border-border px-3 py-2.5 text-left text-sm",
                      us && "bg-accent-soft",
                    )}
                  >
                    <span className={cn("tabular-nums font-semibold", us ? "text-accent" : "text-muted")}>
                      {rank}
                    </span>
                    <span className={cn("min-w-0 truncate", us && "font-semibold")}>
                      {shortClub(row.team)}
                    </span>
                    <span className="text-right tabular-nums text-muted">{row.played}</span>
                    <span className="text-right tabular-nums text-muted">
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </span>
                    <span className="text-right tabular-nums font-semibold">{row.pts}</span>
                  </button>
                  {editable && editTeam === row.team ? (
                    <div className="grid grid-cols-3 gap-2 border-t border-border bg-elevated px-3 py-3">
                      <div>
                        <FieldLabel>P</FieldLabel>
                        <FieldInput
                          inputMode="numeric"
                          value={editPlayed}
                          onChange={(e) => setEditPlayed(e.target.value)}
                        />
                      </div>
                      <div>
                        <FieldLabel>GD</FieldLabel>
                        <FieldInput
                          inputMode="numeric"
                          value={editGd}
                          onChange={(e) => setEditGd(e.target.value)}
                        />
                      </div>
                      <div>
                        <FieldLabel>Pts</FieldLabel>
                        <FieldInput
                          inputMode="numeric"
                          value={editPts}
                          onChange={(e) => setEditPts(e.target.value)}
                        />
                      </div>
                      <Button className="col-span-2" onClick={() => void saveRow()} disabled={saving}>
                        Save row
                      </Button>
                      <Button variant="outline" onClick={() => setEditTeam(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
        {editable && division !== "south" ? (
          <div className="mt-3 flex gap-2">
            <FieldInput
              placeholder="Add FA team name"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
            />
            <Button variant="outline" onClick={() => void addTeam()} disabled={saving}>
              Add
            </Button>
          </div>
        ) : null}
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          Our fixtures
        </h3>
        <p className="mb-2 text-sm text-muted">Cherrybrook U12 Bulls. Results show the score.</p>
        {!upcoming.length && !results.length ? (
          <p className="text-sm text-muted">No fixtures in yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {results.length ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-subtle">Results</p>
                {results.map((fx) => (
                  <FixtureCard
                    key={fx.id}
                    fx={fx}
                    fixtures={fixtures}
                    goals={goalsByFixture[fx.id] ?? []}
                    awards={awards}
                    votes={votes}
                    players={players}
                    editable={editable}
                    editing={editingId === fx.id}
                    homeGoals={homeGoals}
                    awayGoals={awayGoals}
                    saving={saving}
                    onEdit={() => startEdit(fx)}
                    onCancel={() => setEditingId(null)}
                    onHome={setHomeGoals}
                    onAway={setAwayGoals}
                    onSave={() => void saveResult()}
                    onClear={() => void clearResult()}
                    onSheet={applyLeague}
                  />
                ))}
              </div>
            ) : null}
            {upcoming.length ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-subtle">Upcoming</p>
                {upcoming.map((fx) => (
                  <FixtureCard
                    key={fx.id}
                    fx={fx}
                    fixtures={fixtures}
                    goals={goalsByFixture[fx.id] ?? []}
                    awards={awards}
                    votes={votes}
                    players={players}
                    editable={editable}
                    editing={editingId === fx.id}
                    homeGoals={homeGoals}
                    awayGoals={awayGoals}
                    saving={saving}
                    onEdit={() => startEdit(fx)}
                    onCancel={() => setEditingId(null)}
                    onHome={setHomeGoals}
                    onAway={setAwayGoals}
                    onSave={() => void saveResult()}
                    onClear={() => void clearResult()}
                    onSheet={applyLeague}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </section>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
          {U12_DIVISIONS.find((d) => d.id === division)?.label} fixtures & results
        </h3>
        <p className="mb-2 text-sm text-muted">
          Every U12 team in this division.
        </p>
        {!(divisionResults[division] ?? []).length ? (
          <p className="text-sm text-muted">No other fixtures in yet.</p>
        ) : (
          <DivisionResultsList rows={divisionResults[division] ?? []} />
        )}
      </section>
    </div>
  );
}

function DivisionResultsList({ rows }: { rows: DivisionResult[] }) {
  const upcoming = rows
    .filter((row) => row.homeGoals == null || row.awayGoals == null)
    .slice()
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
  const results = rows
    .filter((row) => row.homeGoals != null && row.awayGoals != null)
    .slice()
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff));
  return (
    <div className="flex flex-col gap-4">
      {upcoming.length ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Upcoming</p>
          {upcoming.map((row) => (
            <DivisionResultCard key={`${row.kickoff}|${row.homeTeam}|${row.awayTeam}`} row={row} />
          ))}
        </div>
      ) : null}
      {results.length ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-subtle">Results</p>
          {results.map((row) => (
            <DivisionResultCard key={`${row.kickoff}|${row.homeTeam}|${row.awayTeam}`} row={row} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DivisionResultCard({ row }: { row: DivisionResult }) {
  const scored = row.homeGoals != null && row.awayGoals != null;
  return (
    <article className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        {kickoffParts(row.kickoff).day} · {kickoffParts(row.kickoff).time}
      </p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <p className="min-w-0 text-sm font-semibold">
          {shortClub(row.homeTeam)} vs {shortClub(row.awayTeam)}
        </p>
        {scored ? (
          <p className="shrink-0 font-display text-lg font-bold tabular-nums leading-none">
            {row.homeGoals}–{row.awayGoals}
          </p>
        ) : null}
      </div>
      {row.venue ? <p className="mt-1 text-xs text-subtle">{row.venue}</p> : null}
      {row.status === "postponed" ? (
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">Postponed</p>
      ) : null}
    </article>
  );
}

function FixtureCard({
  fx,
  fixtures,
  goals,
  awards,
  votes,
  players,
  editable,
  editing,
  homeGoals,
  awayGoals,
  saving,
  onEdit,
  onCancel,
  onHome,
  onAway,
  onSave,
  onClear,
  onSheet,
}: {
  fx: LeagueFixture;
  fixtures: LeagueFixture[];
  goals: MatchGoal[];
  awards: MatchAward[];
  votes: VoteRow[];
  players: string[];
  editable: boolean;
  editing: boolean;
  homeGoals: string;
  awayGoals: string;
  saving: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onHome: (v: string) => void;
  onAway: (v: string) => void;
  onSave: () => void;
  onClear: () => void;
  onSheet: (data: {
    fixtures?: LeagueFixture[];
    goalsByFixture?: Record<number, MatchGoal[]>;
    awards?: MatchAward[];
    votes?: VoteRow[];
    players?: string[];
  }) => void;
}) {
  const { day, time } = kickoffParts(fx.kickoff);
  const home = isBullsHome(fx);
  const played = fixtureHasScore(fx);
  const kickedOff = fixtureKickoff(fx.kickoff).getTime() <= Date.now();
  const opponent = shortClub(bullsOpponent(fx));
  const us = home ? fx.homeGoals : fx.awayGoals;
  const them = home ? fx.awayGoals : fx.homeGoals;

  return (
    <article className="rounded-xl border border-border bg-surface px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {day} · {time}
          </p>
          <p className="mt-1 text-sm font-semibold">
            <span className="mr-2 rounded-sm bg-elevated px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted">
              {home ? "Home" : "Away"}
            </span>
            vs {opponent}
          </p>
          {fx.venue ? <p className="mt-1 text-xs text-subtle">{fx.venue}</p> : null}
          {fx.status === "postponed" ? (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">Postponed</p>
          ) : null}
        </div>
        {played && !editing ? (
          <div className="shrink-0 text-right">
            <p className="font-display text-xl font-bold tabular-nums leading-none">
              {us}–{them}
            </p>
            {fx.homeTeam === "Pine Villa U12 s" &&
            fx.awayTeam === BULLS_TEAM &&
            fx.homeGoals === 7 &&
            fx.awayGoals === 6 ? (
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted">
                HT 2–2
              </p>
            ) : null}
          </div>
        ) : kickedOff && !editing ? (
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">Score not in</p>
        ) : null}
      </div>

      {editable && editing ? (
        <div className="mt-3 border-t border-border pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>{shortClub(fx.homeTeam)}</FieldLabel>
              <FieldInput
                inputMode="numeric"
                value={homeGoals}
                onChange={(e) => onHome(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>{shortClub(fx.awayTeam)}</FieldLabel>
              <FieldInput
                inputMode="numeric"
                value={awayGoals}
                onChange={(e) => onAway(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button className="flex-1" onClick={onSave} disabled={saving}>
              {saving ? "Saving…" : "Save result"}
            </Button>
            <Button variant="outline" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
            {played ? (
              <Button variant="ghost" className="w-full" onClick={onClear} disabled={saving}>
                Remove score
              </Button>
            ) : null}
          </div>
        </div>
      ) : editable ? (
        <button
          type="button"
          className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent"
          onClick={onEdit}
        >
          {played ? "Edit score" : "Enter score"}
        </button>
      ) : null}

      <MatchSheet
        fx={fx}
        fixtures={fixtures}
        goals={goals}
        awards={awards}
        votes={votes}
        players={players}
        editable={editable}
        onUpdated={onSheet}
      />
    </article>
  );
}

