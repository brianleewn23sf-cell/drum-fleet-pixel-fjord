import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { gameKey } from "@/lib/league";
import { isSquadPlayer } from "@/lib/players";

export type AppearanceMap = Record<string, string[]>;

export async function loadAppearances(
  sql: Awaited<ReturnType<typeof getSql>>,
): Promise<AppearanceMap> {
  const map: AppearanceMap = {};
  try {
    const rows = await sql<{ game_number: string; opposition: string; player: string }>`
      select game_number, opposition, player from match_appearances
    `;
    for (const row of rows) {
      const key = gameKey(String(row.game_number), String(row.opposition));
      const player = String(row.player || "").trim();
      if (!player) continue;
      if (!map[key]) map[key] = [];
      map[key].push(player);
    }
  } catch {
    // table lands in a later migration
  }
  return map;
}

export const getAppearances = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  return { appearances: await loadAppearances(sql) };
});

export const saveAppearances = createServerFn({ method: "POST" })
  .validator(
    z.object({
      gameNumber: z.string().trim().min(1).max(80),
      opposition: z.string().trim().min(1).max(80),
      players: z.array(z.string().trim().min(1)).max(30),
    }),
  )
  .handler(async ({ data }) => {
    const squad = data.players.filter(isSquadPlayer);
    const sql = await getSql();
    await sql`
      delete from match_appearances
      where game_number = ${data.gameNumber} and opposition = ${data.opposition}
    `;
    for (const player of squad) {
      await sql`
        insert into match_appearances (game_number, opposition, player)
        values (${data.gameNumber}, ${data.opposition}, ${player})
        on conflict do nothing
      `;
    }
    return { success: true as const, appearances: await loadAppearances(sql) };
  });
