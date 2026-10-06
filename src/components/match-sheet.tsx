"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { PlayerPicker } from "@/components/player-picker";
import { computeTotals, fixtureVoteRows } from "@/lib/league";
import { saveFixtureAwards, saveMatchGoals } from "@/lib/league-actions";
import type { MatchAward } from "@/lib/coach-actions";
import type { VoteRow } from "@/lib/vote-actions";
import { publicName } from "@/lib/players";
import { joinOppMom, oppMomLabel, oppMomPlayers } from "@/lib/scoring";
import {
  bullsOpponent,
  fixtureHasScore,
  fixtureKickoff,
  fixtureRound,
  formatGoalLine,
  shortClub,
  type LeagueFixture,
  type MatchGoal,
} from "@/lib/wdyl";

function awardForFixture(
  awards: MatchAward[],
  fixtures: LeagueFixture[],
  fx: LeagueFixture,
): MatchAward | undefined {
  const round = fixtureRound(fixtures, fx);
  const opp = shortClub(bullsOpponent(fx)).toLowerCase();
  const hits = awards.filter((a) => {
    const o = a.opposition.toLowerCase();
    return o === opp || o.includes(opp) || opp.includes(o);
  });
  if (!hits.length) return undefined;
  const byRound = hits.filter((a) => a.gameNumber.toLowerCase().includes(String(round)));
  return byRound[0] ?? hits[0];
}

export function MatchSheet({
  fx,
  fixtures,
  goals,
  awards,
  votes,
  players,
  editable,
  onUpdated,
}: {
  fx: LeagueFixture;
  fixtures: LeagueFixture[];
  goals: MatchGoal[];
  awards: MatchAward[];
  votes: VoteRow[];
  players: string[];
  editable: boolean;
  onUpdated?: (data: {
    goalsByFixture?: Record<number, MatchGoal[]>;
    awards?: MatchAward[];
  }) => void;
}) {
  const scored = fixtureHasScore(fx);
  const kickedOff = fixtureKickoff(fx.kickoff).getTime() <= Date.now();
  const round = fixtureRound(fixtures, fx);
  const opponent = shortClub(bullsOpponent(fx));
  const parentVotes = fixtureVoteRows(votes, opponent, round);
  const parentTop = computeTotals(players, parentVotes).find((t) => t.pts > 0);
  const award = awardForFixture(awards, fixtures, fx);
  const sortedGoals = goals.slice().sort((a, b) => a.minute - b.minute || a.id - b.id);

  const [open, setOpen] = useState(false);
  const [minute, setMinute] = useState("");
  const [scorer, setScorer] = useState("");
  const [assist, setAssist] = useState("");
  const savedMoms = oppMomPlayers(award?.oppMom);
  const [oppMom, setOppMom] = useState(savedMoms[0] ?? "");
  const [oppMomJoint, setOppMomJoint] = useState(savedMoms[1] ?? "");
  const [managerPlayer, setManagerPlayer] = useState(award?.managerPlayer ?? "");
  const [saving, setSaving] = useState(false);

  if (!scored && !kickedOff) return null;

  async function addGoal() {
    const min = Number(minute);
    if (!Number.isFinite(min) || min < 0 || min > 90) {
      toast.error("Enter the minute, 0–90.");
      return;
    }
    if (!scorer) {
      toast.error("Pick the scorer.");
      return;
    }
    setSaving(true);
    try {
      const next = [
        ...sortedGoals.map((g) => ({
          minute: g.minute,
          scorer: g.scorer,
          assist: g.assist,
        })),
        { minute: min, scorer, assist: assist || null },
      ];
      const res = await saveMatchGoals({ data: { fixtureId: fx.id, goals: next } });
      onUpdated?.(res);
      setMinute("");
      setScorer("");
      setAssist("");
      toast.success("Goal added.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the goal.");
    } finally {
      setSaving(false);
    }
  }

  async function removeGoal(id: number) {
    setSaving(true);
    try {
      const next = sortedGoals
        .filter((g) => g.id !== id)
        .map((g) => ({ minute: g.minute, scorer: g.scorer, assist: g.assist }));
      const res = await saveMatchGoals({ data: { fixtureId: fx.id, goals: next } });
      onUpdated?.(res);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove the goal.");
    } finally {
      setSaving(false);
    }
  }

  async function saveAwards() {
    setSaving(true);
    try {
      const res = await saveFixtureAwards({
        data: {
          fixtureId: fx.id,
          oppMom: joinOppMom([oppMom, oppMomJoint]),
          managerPlayer,
          playersPlayer: parentTop?.name ?? "",
        },
      });
      if ("success" in res && res.success === false) {
        toast.error(res.error);
        return;
      }
      onUpdated?.(res);
      toast.success("Awards saved.");
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save awards.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-3 border-t border-border pt-3">
      {sortedGoals.length ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            Scorers · assists · time
          </p>
          <ul className="mt-1.5 flex flex-col gap-1">
            {sortedGoals.map((g) => (
              <li key={g.id} className="flex items-start justify-between gap-2 text-sm">
                <span>
                  {formatGoalLine(g, publicName)}
                  {g.assist ? (
                    <span className="text-muted"> assist</span>
                  ) : null}
                </span>
                {editable ? (
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-wide text-accent"
                    onClick={() => void removeGoal(g.id)}
                    disabled={saving}
                  >
                    Remove
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-muted">
          {editable ? "Add each Bulls goal with the minute and assist." : "Scorers will show here."}
        </p>
      )}

      <dl className="mt-3 grid gap-1.5 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Parents’ player</dt>
          <dd className="font-semibold text-right">
            {parentTop ? publicName(parentTop.name) : "Waiting on 3-2-1"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Manager’s player</dt>
          <dd className="font-semibold text-right">
            {award?.managerPlayer ? publicName(award.managerPlayer) : "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Opp MOM</dt>
          <dd className="font-semibold text-right">
            {award?.oppMom ? oppMomLabel(award.oppMom) : "—"}
          </dd>
        </div>
      </dl>

      {editable ? (
        <div className="mt-3">
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-accent"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close sheet" : "Add goals & awards"}
          </button>
          {open ? (
            <div className="mt-3 flex flex-col gap-3 rounded-lg border border-border bg-elevated p-3">
              <div className="grid grid-cols-[5.5rem_1fr] gap-2">
                <div>
                  <FieldLabel>Min</FieldLabel>
                  <FieldInput
                    inputMode="numeric"
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    placeholder="12"
                  />
                </div>
                <div>
                  <FieldLabel>Scorer</FieldLabel>
                  <PlayerPicker
                    label="Scorer"
                    value={scorer}
                    players={players}
                    onChange={setScorer}
                  />
                </div>
              </div>
              <div>
                <FieldLabel>Assist</FieldLabel>
                <PlayerPicker
                  label="Assist"
                  value={assist}
                  players={players}
                  exclude={[scorer]}
                  placeholder="No assist"
                  onChange={setAssist}
                />
              </div>
              <Button variant="outline" onClick={() => void addGoal()} disabled={saving}>
                {saving ? "Saving…" : "Add goal"}
              </Button>
              <div>
                <FieldLabel>Manager’s player</FieldLabel>
                <PlayerPicker
                  label="Manager’s player"
                  value={managerPlayer}
                  players={players}
                  onChange={setManagerPlayer}
                />
              </div>
              <div>
                <FieldLabel>Opp MOM</FieldLabel>
                <PlayerPicker
                  label="Opp MOM"
                  value={oppMom}
                  players={players}
                  onChange={setOppMom}
                />
              </div>
              <div>
                <FieldLabel>Joint opp MOM</FieldLabel>
                <PlayerPicker
                  label="Joint opp MOM"
                  value={oppMomJoint}
                  players={players}
                  exclude={oppMom ? [oppMom] : []}
                  placeholder="No share"
                  onChange={setOppMomJoint}
                />
              </div>
              <Button onClick={() => void saveAwards()} disabled={saving}>
                Save awards
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
