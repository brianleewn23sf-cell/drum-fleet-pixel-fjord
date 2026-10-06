import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { isSquadPlayer, PLAYERS } from "@/lib/players";
import { getInitialData } from "@/lib/vote-actions";
import { getTraining } from "@/lib/training-actions";
import { loadFitnessTests } from "@/lib/fitness-actions";
import { loadAppearances } from "@/lib/appearance-actions";
import {
  canAwardMonth,
  upcomingPotmMonth,
  monthWindow,
  monthTitle,
  scorePotm,
  shiftMonth,
  SEPTEMBER_2026_PODIUM,
  septemberPodium,
  type MonthWindow,
  type PotmPodium,
  type PotmRow,
  type PotmWinner,
} from "@/lib/potm";
import { scoreTrainerYear, TRAINER_YEAR_END, TRAINER_YEAR_LABEL, TRAINER_YEAR_START } from "@/lib/trainer-year";
import { localDateStamp } from "@/lib/when";

function asText(value: unknown): string | null {
  const s = String(value ?? "").trim();
  return s.length ? s : null;
}

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return "";
}

async function loadWinner(
  sql: Awaited<ReturnType<typeof getSql>>,
  month: string,
): Promise<PotmWinner | null> {
  try {
    const rows = await sql<{
      month: string;
      player: string;
      parent_pts: unknown;
      training_pts: unknown;
      opp_mom: unknown;
      players_player: unknown;
      total: unknown;
      awarded_on: string;
      second_player?: unknown;
      third_player?: unknown;
    }>`
      select month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on,
             second_player, third_player
      from player_of_month
      where month = ${month}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      month: String(row.month),
      player: String(row.player),
      parentPts: Number(row.parent_pts) || 0,
      trainingPts: Number(row.training_pts) || 0,
      oppMom: Number(row.opp_mom) || 0,
      playersPlayer: Number(row.players_player) || 0,
      total: Number(row.total) || 0,
      awardedOn: String(row.awarded_on || ""),
      second: asText(row.second_player),
      third: asText(row.third_player),
    };
  } catch {
    return null;
  }
}

function podiumFromWinner(row: PotmWinner | null): PotmPodium | null {
  if (!row?.player) return null;
  const locked = row.month === SEPTEMBER_2026_PODIUM.month ? SEPTEMBER_2026_PODIUM : null;
  return {
    month: row.month,
    label: monthTitle(row.month),
    awardedOn: row.awardedOn || locked?.awardedOn || "",
    first: locked?.first || row.player,
    second: row.second || locked?.second || "",
    third: row.third || locked?.third || "",
  };
}

async function ensureSeptemberPodium(sql: Awaited<ReturnType<typeof getSql>>) {
  const p = SEPTEMBER_2026_PODIUM;
  try {
    await sql`alter table player_of_month add column if not exists second_player text`;
    await sql`alter table player_of_month add column if not exists third_player text`;
  } catch {
    // columns
  }
  try {
    await sql`
      insert into player_of_month
        (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on, second_player, third_player)
      values
        (${p.month}, ${p.first}, 0, 0, 0, 0, 0, ${p.awardedOn}, ${p.second}, ${p.third})
      on conflict (month) do update set
        player = excluded.player,
        second_player = excluded.second_player,
        third_player = excluded.third_player,
        awarded_on = excluded.awarded_on
    `;
  } catch {
    try {
      await sql`
        insert into player_of_month
          (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on)
        values
          (${p.month}, ${p.first}, 0, 0, 0, 0, 0, ${p.awardedOn})
        on conflict (month) do update set
          player = excluded.player,
          awarded_on = excluded.awarded_on
      `;
    } catch {
      // table
    }
  }
}

async function computeMonth(month: string): Promise<{
  month: string;
  window: MonthWindow;
  canAward: boolean;
  standings: PotmRow[];
  winner: PotmWinner | null;
  leader: PotmRow | null;
  lastPodium: PotmPodium | null;
}> {
  const window = monthWindow(month);
  const [votes, training] = await Promise.all([getInitialData(), getTraining()]);
  const sql = await getSql();
  await ensureSeptemberPodium(sql);
  const tests = await loadFitnessTests(sql);
  let awards: {
    gameNumber: string;
    opposition: string;
    oppMom: string | null;
    playersPlayer: string | null;
    managerPlayer: string | null;
    updatedAt: string;
  }[] = [];
  try {
    const rows = await sql<{
      game_number: unknown;
      opposition: unknown;
      opp_mom: unknown;
      players_player: unknown;
      manager_player?: unknown;
      updated_at: unknown;
    }>`
      select game_number, opposition, opp_mom, players_player, manager_player, updated_at from match_awards
    `;
    awards = rows.map((row) => ({
      gameNumber: String(row.game_number || "").trim(),
      opposition: String(row.opposition || "").trim(),
      oppMom: asText(row.opp_mom),
      playersPlayer: asText(row.players_player),
      managerPlayer: asText(row.manager_player),
      updatedAt: asIso(row.updated_at),
    }));
  } catch {
    try {
      const rows = await sql<{
        game_number: unknown;
        opposition: unknown;
        opp_mom: unknown;
        players_player: unknown;
        updated_at: unknown;
      }>`
        select game_number, opposition, opp_mom, players_player, updated_at from match_awards
      `;
      awards = rows.map((row) => ({
        gameNumber: String(row.game_number || "").trim(),
        opposition: String(row.opposition || "").trim(),
        oppMom: asText(row.opp_mom),
        playersPlayer: asText(row.players_player),
        managerPlayer: null,
        updatedAt: asIso(row.updated_at),
      }));
    } catch {
      awards = [];
    }
  }
  const appearances = await loadAppearances(sql);
  const standings = scorePotm(
    [...PLAYERS],
    votes.history,
    awards,
    training.sessions,
    window,
    tests,
    appearances,
  );
  let winner = await loadWinner(sql, month);
  const leader = standings[0] && standings[0].total > 0 ? standings[0] : null;
  if (
    month !== SEPTEMBER_2026_PODIUM.month &&
    !winner &&
    canAwardMonth(window) &&
    leader &&
    isSquadPlayer(leader.name)
  ) {
    const awardedOn = localDateStamp();
    try {
      await sql`
        insert into player_of_month
          (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on)
        values
          (${month}, ${leader.name}, ${leader.parentPts}, ${leader.trainingPts}, ${leader.oppMom}, ${leader.playersPlayer}, ${leader.total}, ${awardedOn})
        on conflict (month) do nothing
      `;
      winner = await loadWinner(sql, month);
    } catch {
      winner = null;
    }
  }
  const prev = await loadWinner(sql, shiftMonth(month, -1));
  const lastPodium =
    podiumFromWinner(prev) || podiumFromWinner(winner) || septemberPodium();
  return {
    month,
    window,
    canAward: canAwardMonth(window),
    standings,
    winner,
    leader,
    lastPodium,
  };
}

export const getPotm = createServerFn({ method: "POST" })
  .validator(z.object({ month: z.string().regex(/^\d{4}-\d{2}$/).optional() }).optional())
  .handler(async ({ data }) => {
    try {
      return await computeMonth(data?.month || upcomingPotmMonth());
    } catch {
      const month = data?.month || upcomingPotmMonth();
      const window = monthWindow(month);
      return {
        month,
        window,
        canAward: canAwardMonth(window),
        standings: [] as PotmRow[],
        winner: null,
        leader: null,
        lastPodium: septemberPodium(),
      };
    }
  });

export const getTrainerYear = createServerFn({ method: "POST" }).handler(async () => {
  const [votes, training] = await Promise.all([getInitialData(), getTraining()]);
  const rows = scoreTrainerYear(votes.players.length ? votes.players : [...PLAYERS], training.sessions);
  return {
    label: TRAINER_YEAR_LABEL,
    start: TRAINER_YEAR_START,
    end: TRAINER_YEAR_END,
    rows,
  };
});

export const awardPotm = createServerFn({ method: "POST" })
  .validator(
    z.object({
      month: z.string().regex(/^\d{4}-\d{2}$/),
      player: z.string().trim().min(1),
    }),
  )
  .handler(async ({ data }) => {
    if (!isSquadPlayer(data.player)) {
      return { success: false as const, error: "Pick a squad player." };
    }
    const snapshot = await computeMonth(data.month);
    if (!snapshot.canAward) {
      return {
        success: false as const,
        error: `Awarded on the 3rd Monday (${snapshot.window.awardMonday}).`,
      };
    }
    const row = snapshot.standings.find((s) => s.name === data.player);
    if (!row) {
      return { success: false as const, error: "Player not in this month’s table." };
    }
    const sql = await getSql();
    const awardedOn = localDateStamp();
    await sql`
      insert into player_of_month
        (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on)
      values
        (${data.month}, ${data.player}, ${row.parentPts}, ${row.trainingPts}, ${row.oppMom}, ${row.playersPlayer}, ${row.total}, ${awardedOn})
      on conflict (month) do update set
        player = excluded.player,
        parent_pts = excluded.parent_pts,
        training_pts = excluded.training_pts,
        opp_mom = excluded.opp_mom,
        players_player = excluded.players_player,
        total = excluded.total,
        awarded_on = excluded.awarded_on
    `;
    return { success: true as const, winner: await loadWinner(sql, data.month) };
  });
