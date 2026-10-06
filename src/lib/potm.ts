import { localDateStamp } from "@/lib/when";
import { openPrizeMonth, prizeWindow } from "@/lib/prize-window";
import type { TrainingSession } from "@/lib/training";
import type { VoteRow } from "@/lib/vote-actions";
import type { FitnessTest } from "@/lib/fitness";
import { autoScoreMonth, SCORING, type AwardScoreRef } from "@/lib/scoring";
import type { AppearanceMap } from "@/lib/appearance-actions";

export const OPP_MOM_POINTS = SCORING.oppMom;
export const PLAYERS_PLAYER_POINTS = SCORING.playersPlayer;

export type PotmRow = {
  name: string;
  parentPts: number;
  trainingPts: number;
  testPts: number;
  oppMom: number;
  playersPlayer: number;
  playedPts: number;
  total: number;
};

export type PotmWinner = {
  month: string;
  player: string;
  parentPts: number;
  trainingPts: number;
  oppMom: number;
  playersPlayer: number;
  total: number;
  awardedOn: string;
  second?: string | null;
  third?: string | null;
};

export type PotmPodium = {
  month: string;
  label: string;
  awardedOn: string;
  first: string;
  second: string;
  third: string;
};

/** Locked 3rd-Monday podium for September 2026. */
export const SEPTEMBER_2026_PODIUM = {
  month: "2026-09",
  awardedOn: "2026-09-21",
  first: "30) Isa Ali",
  second: "22) William Brittain",
  third: "14) Henry Bearman",
} as const;

export function septemberPodium(): PotmPodium {
  return {
    month: SEPTEMBER_2026_PODIUM.month,
    label: monthTitle(SEPTEMBER_2026_PODIUM.month),
    awardedOn: SEPTEMBER_2026_PODIUM.awardedOn,
    first: SEPTEMBER_2026_PODIUM.first,
    second: SEPTEMBER_2026_PODIUM.second,
    third: SEPTEMBER_2026_PODIUM.third,
  };
}

export type MonthWindow = {
  month: string;
  start: string;
  awardMonday: string;
  end: string;
  label: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function currentMonthKey(d = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

export function monthTitle(month: string): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function upcomingPotmMonth(d = new Date()): string {
  return openPrizeMonth(d);
}

export function thirdMonday(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const firstMon = 1 + ((1 - first.getDay() + 7) % 7);
  return new Date(year, monthIndex, firstMon + 14);
}

export function monthWindow(month: string): MonthWindow {
  return prizeWindow(month);
}

export function canAwardMonth(window: MonthWindow, today = localDateStamp()): boolean {
  return today >= window.awardMonday;
}

export function scorePotm(
  players: string[],
  votes: VoteRow[],
  awards: AwardScoreRef[],
  sessions: TrainingSession[],
  window: MonthWindow,
  tests: FitnessTest[] = [],
  appearances?: AppearanceMap,
): PotmRow[] {
  const table = autoScoreMonth(players, votes, awards, sessions, window.month, appearances, tests);
  return table.map((row) => ({
    name: row.name,
    parentPts: row.parentPts,
    trainingPts: row.trainingPts,
    testPts: row.testPts,
    oppMom: SCORING.oppMom ? row.oppMomPts / SCORING.oppMom : 0,
    playersPlayer: SCORING.playersPlayer ? row.playersPlayerPts / SCORING.playersPlayer : 0,
    playedPts: row.playedPts,
    total: row.total,
  }));
}
