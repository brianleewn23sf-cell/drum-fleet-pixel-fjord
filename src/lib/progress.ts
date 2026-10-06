import type { AppearanceMap } from "@/lib/appearance-actions";
import { computeTotals, groupGames } from "@/lib/league";
import { oppMomPlayers } from "@/lib/scoring";
import type { VoteRow } from "@/lib/vote-actions";

export type AwardRef = {
  gameNumber: string;
  opposition: string;
  oppMom: string | null;
  playersPlayer: string | null;
};

export type PlayerRound = {
  key: string;
  gameNumber: string;
  opposition: string;
  pts: number;
  n3: number;
  n2: number;
  n1: number;
  cumulative: number;
  rank: number;
  oppMom: boolean;
  playersPlayer: boolean;
};

export type PlayerSeason = {
  name: string;
  rank: number;
  pts: number;
  games: number;
  ppg: number;
  n3: number;
  n2: number;
  n1: number;
  rounds: PlayerRound[];
  form: number[];
  oppMom: number;
  playersPlayer: number;
};

export function computePlayerSeason(
  player: string,
  players: string[],
  history: VoteRow[],
  awards: AwardRef[] = [],
  appearances: AppearanceMap = {},
): PlayerSeason {
  const games = groupGames(history).slice().sort((a, b) => a.lastTs.localeCompare(b.lastTs));
  const rounds: PlayerRound[] = [];
  let cumulative = 0;
  const running: VoteRow[] = [];

  for (const g of games) {
    running.push(...g.votes);
    const got = computeTotals(players, g.votes, appearances).find((t) => t.name === player);
    cumulative += got?.pts ?? 0;
    const standings = computeTotals(players, running, appearances);
    const rank = standings.findIndex((t) => t.name === player) + 1;
    const award = awards.find(
      (a) =>
        a.gameNumber.toLowerCase() === g.gameNumber.toLowerCase() &&
        a.opposition.toLowerCase() === g.opposition.toLowerCase(),
    );
    rounds.push({
      key: g.key,
      gameNumber: g.gameNumber,
      opposition: g.opposition,
      pts: got?.pts ?? 0,
      n3: got?.n3 ?? 0,
      n2: got?.n2 ?? 0,
      n1: got?.n1 ?? 0,
      cumulative,
      rank: rank || players.length,
      oppMom: oppMomPlayers(award?.oppMom).includes(player),
      playersPlayer: award?.playersPlayer === player,
    });
  }

  const totalsRow = computeTotals(players, history, appearances);
  const totals = totalsRow.find((t) => t.name === player);
  const oppMom = awards.filter((a) => oppMomPlayers(a.oppMom).includes(player)).length;
  const playersPlayer = awards.filter((a) => a.playersPlayer === player).length;

  return {
    name: player,
    rank: totalsRow.findIndex((t) => t.name === player) + 1,
    pts: totals?.pts ?? 0,
    games: totals?.games ?? 0,
    ppg: totals?.ppg ?? 0,
    n3: totals?.n3 ?? 0,
    n2: totals?.n2 ?? 0,
    n1: totals?.n1 ?? 0,
    rounds,
    form: rounds.slice(-5).map((r) => r.pts),
    oppMom,
    playersPlayer,
  };
}

export function computeSquadProgress(
  players: string[],
  history: VoteRow[],
  awards: AwardRef[] = [],
  appearances: AppearanceMap = {},
): PlayerSeason[] {
  const ranked = computeTotals(players, history, appearances);
  return ranked.map((row) => computePlayerSeason(row.name, players, history, awards, appearances));
}
