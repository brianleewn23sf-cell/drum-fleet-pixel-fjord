import type { AppearanceMap } from "@/lib/appearance-actions";
import { matchSquadPlayer, parsePlayer, publicName } from "@/lib/players";
import { ATTENDANCE_POINTS, TRAINING_AWARD_MAX, trainingTotal, type TrainingSession } from "@/lib/training";
import { testBonusEvents } from "@/lib/test-bonus";
import type { FitnessTest } from "@/lib/fitness";
import type { VoteRow } from "@/lib/vote-actions";
import { asDayStamp, localDateStamp } from "@/lib/when";
import { prizeMonthForDay } from "@/lib/prize-window";
import { BULLS_FIXTURES, bullsRoundList, bullsOpponent, shortClub, fixtureKickoff } from "@/lib/wdyl";
import { gameKey } from "@/lib/league";
import { MARKS_FROM, TEST_POINTS_FROM } from "@/lib/score-from";

function toDay(iso: string): string {
  return asDayStamp(iso);
}

export function stampMonth(iso: string): string {
  return prizeMonthForDay(iso);
}

export type AwardScoreRef = {
  gameNumber: string;
  opposition: string;
  oppMom: string | null;
  playersPlayer: string | null;
  managerPlayer?: string | null;
  updatedAt?: string;
};

export const SCORING = {
  parent3: 3,
  parent2: 2,
  parent1: 1,
  /** From Standish (4 Oct 2026, round 4) a family who votes gets 1 point for their own child. */
  voter: 1,
  oppMom: 20,
  playersPlayer: 10,
  played: 5,
  attendance: ATTENDANCE_POINTS,
  effort: 10,
  attitude: 10,
  achievement: 10,
  trainingMax: TRAINING_AWARD_MAX,
  testComplete: 5,
  testGradeMax: 5,
  testGradeMin: 1,
} as const;

export const SCORING_LINES = [
  `Parents 3-2-1: ${SCORING.parent3} / ${SCORING.parent2} / ${SCORING.parent1}. From Standish, the family who votes also gets ${SCORING.voter} for their own child`,
  `Opposition MOM: ${SCORING.oppMom}, or ${SCORING.oppMom / 2} each when it is shared`,
  `Players’ / manager’s player: ${SCORING.playersPlayer}`,
  `Played a game: ${SCORING.played} for every match he was in`,
  `Training award: max ${SCORING.trainingMax} (attendance ${SCORING.attendance} + effort ${SCORING.effort} + attitude ${SCORING.attitude} + achievement ${SCORING.achievement})`,
  `Tests: +5 to complete each drill. Speed /10 vs age 11 (GO to last cones, not clip length). Technique /5. Max 20 per test.`,
] as const;

export function oppMomPlayers(value: string | null | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split("|")
    .map((name) => name.trim())
    .filter(Boolean);
}

export function joinOppMom(names: Array<string | null | undefined>): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const name of names) {
    const clean = name?.trim() ?? "";
    if (!clean || seen.has(clean)) continue;
    seen.add(clean);
    out.push(clean);
  }
  return out.join("|");
}

export function oppMomLabel(value: string | null | undefined): string {
  const names = oppMomPlayers(value).map((name) => publicName(name));
  return names.join(" & ");
}

export function oppMomShare(count: number): number {
  if (count <= 1) return SCORING.oppMom;
  return SCORING.oppMom / count;
}

export type ScoreSource =
  | "parent3"
  | "parent2"
  | "parent1"
  | "voter"
  | "oppMom"
  | "playersPlayer"
  | "played"
  | "training"
  | "tests";

export type ScoreEvent = {
  player: string;
  points: number;
  source: ScoreSource;
  at: string;
};

function awardAt(award: AwardScoreRef, votes: VoteRow[]): string {
  const needle = award.opposition.trim().toLowerCase();
  if (needle) {
    const matches = BULLS_FIXTURES.filter((f) => {
      const opp = shortClub(bullsOpponent(f)).toLowerCase();
      return opp === needle || opp.includes(needle) || needle.includes(opp);
    });
    const today = localDateStamp();
    const played = matches.filter((f) => asDayStamp(f.kickoff) <= today);
    const pick = played.at(-1) ?? matches[0];
    if (pick) return pick.kickoff;
  }
  const same = votes.filter(
    (v) =>
      v.timestamp &&
      v.gameNumber.toLowerCase() === award.gameNumber.toLowerCase() &&
      v.opposition.toLowerCase() === award.opposition.toLowerCase(),
  );
  if (same.length) return same.map((v) => v.timestamp).sort()[0];
  return "";
}

/** Standish, 4 Oct 2026, is round 4. Earlier games stay as they were. */
const VOTER_POINT_FROM_ROUND = 4;

function roundNo(gameNumber: string): number {
  const m = gameNumber.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

function voterPointApplies(row: VoteRow): boolean {
  const round = roundNo(row.gameNumber);
  if (round > 0) return round >= VOTER_POINT_FROM_ROUND;
  const opp = row.opposition.trim().toLowerCase();
  if (!opp) return false;
  const hit = bullsRoundList().find((game) => {
    const name = game.opposition.toLowerCase();
    return name === opp || name.includes(opp) || opp.includes(name);
  });
  return hit ? hit.round >= VOTER_POINT_FROM_ROUND : false;
}

function voteCountsYet(row: VoteRow): boolean {
  const rounds = bullsRoundList();
  const n = Number(row.gameNumber.match(/(\d+)/)?.[1] ?? 0);
  const opp = row.opposition.trim().toLowerCase();
  const round =
    (n ? rounds.find((item) => item.round === n) : undefined) ||
    rounds.find((item) => {
      const name = item.opposition.toLowerCase();
      return opp === name || name.includes(opp) || opp.includes(name);
    });
  if (!round?.kickoff) return true;
  return fixtureKickoff(round.kickoff).getTime() <= Date.now();
}

export function collectScoreEvents(
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  tests: FitnessTest[] = [],
  appearances?: AppearanceMap,
): ScoreEvent[] {
  const events: ScoreEvent[] = [];

  for (const row of votes) {
    const live = voteCountsYet(row);
    if (live && row.vote3) {
      events.push({ player: row.vote3, points: SCORING.parent3, source: "parent3", at: row.timestamp });
    }
    if (live && row.vote2) {
      events.push({ player: row.vote2, points: SCORING.parent2, source: "parent2", at: row.timestamp });
    }
    if (live && row.vote1) {
      events.push({ player: row.vote1, points: SCORING.parent1, source: "parent1", at: row.timestamp });
    }
    if (voterPointApplies(row) && row.parentChild) {
      events.push({
        player: row.parentChild,
        points: SCORING.voter,
        source: "voter",
        at: row.timestamp,
      });
    }
  }

  for (const a of awards) {
    const at = awardAt(a, votes);
    const moms = oppMomPlayers(a.oppMom);
    const share = oppMomShare(moms.length);
    for (const player of moms) {
      events.push({ player, points: share, source: "oppMom", at });
    }
    const pick = a.playersPlayer || a.managerPlayer;
    if (pick) {
      events.push({ player: pick, points: SCORING.playersPlayer, source: "playersPlayer", at });
    }
  }

  for (const session of sessions) {
    for (const mark of session.marks) {
      if (!mark.attended) continue;
      const pts = trainingTotal(mark);
      if (pts === null) continue;
      events.push({
        player: mark.player,
        points: pts,
        source: "training",
        at: session.sessionDate,
      });
    }
  }

  for (const ev of testBonusEvents(tests)) {
    events.push({ player: ev.player, points: ev.points, source: "tests", at: ev.at });
  }

  if (appearances) {
    const rounds = bullsRoundList();
    for (const [key, squad] of Object.entries(appearances)) {
      const [gameNumber = "", opposition = ""] = key.split("|||");
      const round =
        rounds.find((r) => r.gameNumber.toLowerCase() === gameNumber.toLowerCase()) ||
        rounds.find((r) => r.opposition.toLowerCase() === opposition.toLowerCase());
      const at = round?.kickoff || "";
      for (const player of squad) {
        events.push({ player, points: SCORING.played, source: "played", at });
      }
    }
  }

  return events.filter((ev) => {
    const day = toDay(ev.at);
    if (!day) return ev.source !== "tests";
    if (ev.source === "tests") return day >= TEST_POINTS_FROM;
    return day >= MARKS_FROM;
  });
}

export type FullScore = {
  name: string;
  parentPts: number;
  oppMomPts: number;
  playersPlayerPts: number;
  playedPts: number;
  trainingPts: number;
  testPts: number;
  voterPts: number;
  total: number;
  games: number;
  n3: number;
  n2: number;
  n1: number;
};

function emptyScore(name: string): FullScore {
  return {
    name,
    parentPts: 0,
    oppMomPts: 0,
    playersPlayerPts: 0,
    playedPts: 0,
    trainingPts: 0,
    testPts: 0,
    voterPts: 0,
    total: 0,
    games: 0,
    n3: 0,
    n2: 0,
    n1: 0,
  };
}

export function foldScores(
  players: string[],
  events: ScoreEvent[],
  votes: VoteRow[],
  appearances?: AppearanceMap,
): FullScore[] {
  const map = new Map<string, FullScore>();
  for (const p of players) map.set(p, emptyScore(p));

  for (const ev of events) {
    const key = matchSquadPlayer(players, ev.player);
    const row = key ? map.get(key) : undefined;
    if (!row) continue;
    if (ev.source === "parent3") {
      row.parentPts += ev.points;
      row.n3 += 1;
    } else if (ev.source === "parent2") {
      row.parentPts += ev.points;
      row.n2 += 1;
    } else if (ev.source === "parent1") {
      row.parentPts += ev.points;
      row.n1 += 1;
    } else if (ev.source === "voter") {
      row.parentPts += ev.points;
    } else if (ev.source === "oppMom") {
      row.oppMomPts += ev.points;
    } else if (ev.source === "playersPlayer") {
      row.playersPlayerPts += ev.points;
    } else if (ev.source === "played") {
      row.playedPts += ev.points;
    } else if (ev.source === "tests") {
      row.testPts += ev.points;
    } else {
      row.trainingPts += ev.points;
    }
  }

  const games = new Map<string, Set<string>>();
  for (const p of players) games.set(p, new Set());
  if (appearances) {
    for (const [key, squad] of Object.entries(appearances)) {
      for (const name of squad) games.get(name)?.add(key);
    }
  } else {
    for (const row of votes) {
      const key = gameKey(row.gameNumber, row.opposition);
      games.get(row.vote3)?.add(key);
      games.get(row.vote2)?.add(key);
      games.get(row.vote1)?.add(key);
    }
  }

  return [...map.values()]
    .map((row) => {
      row.games = games.get(row.name)?.size ?? 0;
      row.total =
        row.parentPts +
        row.oppMomPts +
        row.playersPlayerPts +
        row.playedPts +
        row.trainingPts +
        row.testPts;
      return row;
    })
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      if (b.parentPts !== a.parentPts) return b.parentPts - a.parentPts;
      return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
    });
}

export function eventsForMonth(events: ScoreEvent[], month: string): ScoreEvent[] {
  return events.filter((ev) => stampMonth(ev.at) === month);
}

export function autoScore(
  players: string[],
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  appearances?: AppearanceMap,
  tests: FitnessTest[] = [],
): FullScore[] {
  return foldScores(
    players,
    collectScoreEvents(votes, awards, sessions, tests, appearances),
    votes,
    appearances,
  );
}

export function autoScoreMonth(
  players: string[],
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  month: string,
  appearances?: AppearanceMap,
  tests: FitnessTest[] = [],
): FullScore[] {
  const events = eventsForMonth(
    collectScoreEvents(votes, awards, sessions, tests, appearances),
    month,
  );
  const monthVotes = votes.filter((v) => stampMonth(v.timestamp) === month);
  return foldScores(players, events, monthVotes, appearances);
}
