"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { PlayerPicker } from "@/components/player-picker";
import { groupGames } from "@/lib/league";
import { shortName } from "@/lib/players";
import { saveCoachVote, type CurrentMatch, type VoteRow } from "@/lib/vote-actions";

export function VoteSheet({
  players,
  history,
  currentMatch,
  onSaved,
}: {
  players: string[];
  history: VoteRow[];
  currentMatch: CurrentMatch | null;
  onSaved: () => Promise<void> | void;
}) {
  const games = useMemo(() => {
    const grouped = groupGames(history);
    if (!currentMatch) return grouped;
    const has = grouped.some(
      (g) =>
        g.gameNumber.toLowerCase() === currentMatch.gameNumber.toLowerCase() &&
        g.opposition.toLowerCase() === currentMatch.opposition.toLowerCase(),
    );
    if (has) return grouped;
    return [
      {
        key: `${currentMatch.gameNumber}|||${currentMatch.opposition}`,
        gameNumber: currentMatch.gameNumber,
        opposition: currentMatch.opposition,
        votes: [],
        lastTs: "",
      },
      ...grouped,
    ];
  }, [history, currentMatch]);

  return (
    <div className="flex flex-col gap-4">
      {games.map((game) => (
        <GameVotes
          key={game.key}
          gameNumber={game.gameNumber}
          opposition={game.opposition}
          votes={game.votes}
          players={players}
          today={
            !!currentMatch &&
            game.gameNumber.toLowerCase() === currentMatch.gameNumber.toLowerCase() &&
            game.opposition.toLowerCase() === currentMatch.opposition.toLowerCase()
          }
          onSaved={onSaved}
        />
      ))}
    </div>
  );
}

function GameVotes({
  gameNumber,
  opposition,
  votes,
  players,
  today,
  onSaved,
}: {
  gameNumber: string;
  opposition: string;
  votes: VoteRow[];
  players: string[];
  today: boolean;
  onSaved: () => Promise<void> | void;
}) {
  const [adding, setAdding] = useState(false);
  const voted = new Set(votes.map((row) => row.parentChild));
  const missing = players.filter((name) => !voted.has(name));

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight">
          {gameNumber} vs {opposition}
        </h3>
        {today ? (
          <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-fg">
            Today
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-muted">
        {votes.length} family vote{votes.length === 1 ? "" : "s"}. Change a line and save. Parents do not see who voted.
      </p>
      {!votes.length ? (
        <p className="mt-3 text-sm text-muted">No votes saved for this game yet.</p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {votes.map((row) => (
            <VoteLine key={row.id} row={row} players={players} onSaved={onSaved} />
          ))}
        </ul>
      )}
      {missing.length ? (
        adding ? (
          <AddVote
            gameNumber={gameNumber}
            opposition={opposition}
            players={missing}
            onDone={() => setAdding(false)}
            onSaved={onSaved}
          />
        ) : (
          <Button variant="outline" className="mt-3 w-full" onClick={() => setAdding(true)}>
            Add a family vote
          </Button>
        )
      ) : null}
    </section>
  );
}

function VoteLine({
  row,
  players,
  onSaved,
}: {
  row: VoteRow;
  players: string[];
  onSaved: () => Promise<void> | void;
}) {
  const [vote3, setVote3] = useState(row.vote3);
  const [vote2, setVote2] = useState(row.vote2);
  const [vote1, setVote1] = useState(row.vote1);
  const [saving, setSaving] = useState(false);
  const dirty = vote3 !== row.vote3 || vote2 !== row.vote2 || vote1 !== row.vote1;

  async function save() {
    setSaving(true);
    try {
      const res = await saveCoachVote({
        data: {
          gameNumber: row.gameNumber,
          opposition: row.opposition,
          parentChild: row.parentChild,
          vote3,
          vote2,
          vote1,
        },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(`${shortName(row.parentChild)} updated.`);
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save that vote.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <li className="rounded-lg border border-border bg-bg px-3 py-2">
      <p className="text-sm font-semibold">{shortName(row.parentChild)}’s family</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <Pick label="3" value={vote3} players={players} exclude={[row.parentChild, vote2, vote1]} onChange={setVote3} />
        <Pick label="2" value={vote2} players={players} exclude={[row.parentChild, vote3, vote1]} onChange={setVote2} />
        <Pick label="1" value={vote1} players={players} exclude={[row.parentChild, vote3, vote2]} onChange={setVote1} />
      </div>
      {dirty ? (
        <Button className="mt-2 h-9 w-full" disabled={saving} onClick={() => void save()}>
          {saving ? "Saving…" : "Save"}
        </Button>
      ) : null}
    </li>
  );
}

function AddVote({
  gameNumber,
  opposition,
  players,
  onDone,
  onSaved,
}: {
  gameNumber: string;
  opposition: string;
  players: string[];
  onDone: () => void;
  onSaved: () => Promise<void> | void;
}) {
  const [parentChild, setParentChild] = useState("");
  const [vote3, setVote3] = useState("");
  const [vote2, setVote2] = useState("");
  const [vote1, setVote1] = useState("");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!parentChild || !vote3 || !vote2 || !vote1) {
      toast.error("Pick the family and all three places.");
      return;
    }
    setSaving(true);
    try {
      const res = await saveCoachVote({
        data: { gameNumber, opposition, parentChild, vote3, vote2, vote1 },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Vote saved.");
      onDone();
      await onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save that vote.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-3 rounded-lg border border-border bg-bg px-3 py-2">
      <FieldLabel>Family</FieldLabel>
      <PlayerPicker label="Family" value={parentChild} players={players} placeholder="Which family" onChange={setParentChild} />
      <div className="mt-2 grid grid-cols-3 gap-2">
        <Pick label="3" value={vote3} players={players} exclude={[parentChild, vote2, vote1]} onChange={setVote3} />
        <Pick label="2" value={vote2} players={players} exclude={[parentChild, vote3, vote1]} onChange={setVote2} />
        <Pick label="1" value={vote1} players={players} exclude={[parentChild, vote3, vote2]} onChange={setVote1} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button disabled={saving} onClick={() => void save()}>
          {saving ? "Saving…" : "Save vote"}
        </Button>
      </div>
    </div>
  );
}

function Pick({
  label,
  value,
  players,
  exclude,
  onChange,
}: {
  label: string;
  value: string;
  players: string[];
  exclude: string[];
  onChange: (next: string) => void;
}) {
  const blocked = new Set(exclude.filter(Boolean));
  return (
    <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted">
      {label}
      <select
        className="mt-1 h-10 w-full rounded-md border border-border bg-surface px-1 text-xs font-semibold text-fg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">—</option>
        {players
          .filter((name) => name === value || !blocked.has(name))
          .map((name) => (
            <option key={name} value={name}>
              {shortName(name)}
            </option>
          ))}
      </select>
    </label>
  );
}
