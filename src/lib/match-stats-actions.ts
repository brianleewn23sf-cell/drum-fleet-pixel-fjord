import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { isSquadPlayer } from "@/lib/players";
import {
  MATCH_STAT_FIELDS,
  emptyStats,
  type MatchResult,
  type PlayerMatchStats,
  type StatKey,
} from "@/lib/match-stats";

const statShape = Object.fromEntries(
  MATCH_STAT_FIELDS.map((f) => [f.key, z.number().int().min(0).max(30)]),
) as Record<StatKey, z.ZodNumber>;

const playerStatInput = z.object({
  player: z.string().trim().min(1),
  ...statShape,
});

function asInt(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

function rowToStats(row: Record<string, unknown>): PlayerMatchStats {
  const player = String(row.player || "").trim();
  const next = emptyStats(player);
  next.goals = asInt(row.goals);
  next.assists = asInt(row.assists);
  next.preAssists = asInt(row.pre_assists);
  next.shots = asInt(row.shots);
  next.tackles = asInt(row.tackles);
  next.interceptions = asInt(row.interceptions);
  next.blocks = asInt(row.blocks);
  next.recoveries = asInt(row.recoveries);
  next.saves = asInt(row.saves);
  next.catches = asInt(row.catches);
  next.crosses = asInt(row.crosses);
  next.dribbles = asInt(row.dribbles);
  next.fouls = asInt(row.fouls);
  return next;
}

async function loadAll(sql: Awaited<ReturnType<typeof getSql>>): Promise<MatchResult[]> {
  try {
    const results = await sql<{
      game_number: string;
      opposition: string;
      goals_for: unknown;
      goals_against: unknown;
      notes: unknown;
    }>`
      select game_number, opposition, goals_for, goals_against, notes
      from match_results
      order by updated_at desc
    `;
    const statsRows = await sql<Record<string, unknown>>`
      select * from match_player_stats
    `;
    const byGame = new Map<string, PlayerMatchStats[]>();
    for (const row of statsRows) {
      const key = `${String(row.game_number)}|${String(row.opposition)}`;
      const list = byGame.get(key) ?? [];
      list.push(rowToStats(row));
      byGame.set(key, list);
    }
    return results.map((r) => ({
      gameNumber: String(r.game_number),
      opposition: String(r.opposition),
      goalsFor: asInt(r.goals_for),
      goalsAgainst: asInt(r.goals_against),
      notes: String(r.notes || "").trim(),
      stats: byGame.get(`${String(r.game_number)}|${String(r.opposition)}`) ?? [],
    }));
  } catch {
    return [];
  }
}

export const getMatchStats = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  return { results: await loadAll(sql) };
});

export const saveMatchStats = createServerFn({ method: "POST" })
  .validator(
    z.object({
      gameNumber: z.string().trim().min(1).max(80),
      opposition: z.string().trim().min(1).max(80),
      goalsFor: z.number().int().min(0).max(30),
      goalsAgainst: z.number().int().min(0).max(30),
      notes: z.string().trim().max(400),
      stats: z.array(playerStatInput).max(30),
    }),
  )
  .handler(async ({ data }) => {
    const stats = data.stats.filter((s) => isSquadPlayer(s.player));
    const sql = await getSql();
    await sql`
      insert into match_results (game_number, opposition, goals_for, goals_against, notes, updated_at)
      values (${data.gameNumber}, ${data.opposition}, ${data.goalsFor}, ${data.goalsAgainst}, ${data.notes || null}, now())
      on conflict (game_number, opposition) do update set
        goals_for = excluded.goals_for,
        goals_against = excluded.goals_against,
        notes = excluded.notes,
        updated_at = now()
    `;
    await sql`
      delete from match_player_stats
      where game_number = ${data.gameNumber} and opposition = ${data.opposition}
    `;
    for (const s of stats) {
      await sql`
        insert into match_player_stats (
          game_number, opposition, player,
          goals, assists, pre_assists, shots, tackles, interceptions, blocks,
          recoveries, saves, catches, crosses, dribbles, fouls, updated_at
        )
        values (
          ${data.gameNumber}, ${data.opposition}, ${s.player},
          ${s.goals}, ${s.assists}, ${s.preAssists}, ${s.shots}, ${s.tackles},
          ${s.interceptions}, ${s.blocks}, ${s.recoveries}, ${s.saves}, ${s.catches},
          ${s.crosses}, ${s.dribbles}, ${s.fouls}, now()
        )
      `;
    }
    return { success: true as const };
  });
