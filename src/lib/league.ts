import { parsePlayer } from "@/lib/players";
import type { VoteRow } from "@/lib/vote-actions";

export type PlayerTotal = {
  name: string;
  pts: number;
  n3: number;
  n2: number;
  n1: number;
  games: number;
  ppg: number;
};

export type GameGroup = {
  key: string;
  gameNumber: string;
  opposition: string;
  votes: VoteRow[];
  lastTs: string;
};

export function gameKey(gameNumber: string, opposition: string): string {
  return `${gameNumber}|||${opposition}`;
}

function clubKey(opposition: string): string {
  return opposition
    .toLowerCase()
    .replace(/\b(junior|juniors|u12s?|fc|devils|rangers|storm|cobras|raptors|dynamos|gladiators)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** This match only. Game number and opposition must both match. */
export function votesForMatch(history: VoteRow[], gameNumber: string, opposition: string): VoteRow[] {
  const game = gameNumber.trim().toLowerCase();
  const opp = opposition.trim().toLowerCase();
  const club = clubKey(opposition);
  if (!game || !opp) return [];
  return history.filter((row) => {
    if (row.gameNumber.trim().toLowerCase() !== game) return false;
    const rowOpp = row.opposition.trim().toLowerCase();
    if (rowOpp === opp) return true;
    return club.length > 2 && clubKey(row.opposition) === club;
  });
}

function rowGameKey(row: VoteRow): string {
  return gameKey(row.gameNumber, row.opposition);
}

export function computeTotals(
  players: string[],
  history: VoteRow[],
  appearances?: Record<string, string[]>,
): PlayerTotal[] {
  const totals = new Map<
    string,
    { name: string; pts: number; n3: number; n2: number; n1: number; gameSet: Set<string> }
  >();
  for (const p of players) {
    totals.set(p, { name: p, pts: 0, n3: 0, n2: 0, n1: 0, gameSet: new Set() });
  }
  for (const row of history) {
    const key = rowGameKey(row);
    const squad = appearances?.[key];
    const gpFromVotes = !squad;
    const t3 = totals.get(row.vote3);
    if (t3) {
      t3.pts += 3;
      t3.n3 += 1;
      if (gpFromVotes) t3.gameSet.add(key);
    }
    const t2 = totals.get(row.vote2);
    if (t2) {
      t2.pts += 2;
      t2.n2 += 1;
      if (gpFromVotes) t2.gameSet.add(key);
    }
    const t1 = totals.get(row.vote1);
    if (t1) {
      t1.pts += 1;
      t1.n1 += 1;
      if (gpFromVotes) t1.gameSet.add(key);
    }
    const round = Number(row.gameNumber.match(/(\d+)/)?.[1] ?? 0);
    if (round >= 4 && row.parentChild) {
      const voter = totals.get(row.parentChild);
      if (voter) voter.pts += 1;
    }
  }
  if (appearances) {
    for (const [key, squad] of Object.entries(appearances)) {
      for (const name of squad) {
        const t = totals.get(name);
        if (t) t.gameSet.add(key);
      }
    }
  }
  return [...totals.values()]
    .map((t) => {
      const games = t.gameSet.size;
      return {
        name: t.name,
        pts: t.pts,
        n3: t.n3,
        n2: t.n2,
        n1: t.n1,
        games,
        ppg: games ? Math.round((t.pts / games) * 10) / 10 : 0,
      };
    })
    .sort((a, b) => b.pts - a.pts || b.n3 - a.n3 || b.n2 - a.n2 || a.name.localeCompare(b.name));
}

export function groupGames(history: VoteRow[]): GameGroup[] {
  const map = new Map<string, GameGroup>();
  for (const row of history) {
    const key = rowGameKey(row);
    const existing = map.get(key);
    if (existing) {
      existing.votes.push(row);
      if (row.timestamp > existing.lastTs) existing.lastTs = row.timestamp;
    } else {
      map.set(key, {
        key,
        gameNumber: row.gameNumber,
        opposition: row.opposition,
        votes: [row],
        lastTs: row.timestamp,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.lastTs.localeCompare(a.lastTs));
}

export function publicFirst(name: string): string {
  return parsePlayer(name).first;
}

export function fixtureVoteRows(
  history: VoteRow[],
  opponent: string,
  round: number,
): VoteRow[] {
  const opp = opponent.toLowerCase();
  const rd = String(round);
  const byOpp = history.filter((row) => {
    const o = row.opposition.toLowerCase();
    return o === opp || o.includes(opp) || opp.includes(o);
  });
  if (byOpp.length && round > 0) {
    const byRound = byOpp.filter((row) => {
      const g = row.gameNumber.toLowerCase();
      return g.includes(rd);
    });
    if (byRound.length) return byRound;
  }
  return byOpp;
}
