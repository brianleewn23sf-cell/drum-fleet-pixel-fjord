import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { r as isSquadPlayer } from "./players-CZr5uoUS.mjs";
import { l as string, o as number, r as array, s as object } from "../_libs/zod.mjs";
import { n as emptyStats, t as MATCH_STAT_FIELDS } from "./match-stats-AGxNbR3c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-stats-actions-DMFbVFV5.js
var statShape = Object.fromEntries(MATCH_STAT_FIELDS.map((f) => [f.key, number().int().min(0).max(30)]));
var playerStatInput = object({
	player: string().trim().min(1),
	...statShape
});
function asInt(value) {
	const n = Number(value);
	return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}
function rowToStats(row) {
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
async function loadAll(sql) {
	try {
		const results = await sql`
      select game_number, opposition, goals_for, goals_against, notes
      from match_results
      order by updated_at desc
    `;
		const statsRows = await sql`
      select * from match_player_stats
    `;
		const byGame = /* @__PURE__ */ new Map();
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
			stats: byGame.get(`${String(r.game_number)}|${String(r.opposition)}`) ?? []
		}));
	} catch {
		return [];
	}
}
var getMatchStats_createServerFn_handler = createServerRpc({
	id: "2cf931b3d4692a47ff956fc1f5589fe4baae4c9d91be90a6e493cb9f87708d76",
	name: "getMatchStats",
	filename: "src/lib/match-stats-actions.ts"
}, (opts) => getMatchStats.__executeServer(opts));
var getMatchStats = createServerFn({ method: "POST" }).handler(getMatchStats_createServerFn_handler, async () => {
	return { results: await loadAll(await getSql()) };
});
var saveMatchStats_createServerFn_handler = createServerRpc({
	id: "796819d44e97fec3676e493cff23c67b44b2bb0e899aa97813e81bf746c0e768",
	name: "saveMatchStats",
	filename: "src/lib/match-stats-actions.ts"
}, (opts) => saveMatchStats.__executeServer(opts));
var saveMatchStats = createServerFn({ method: "POST" }).validator(object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	goalsFor: number().int().min(0).max(30),
	goalsAgainst: number().int().min(0).max(30),
	notes: string().trim().max(400),
	stats: array(playerStatInput).max(30)
})).handler(saveMatchStats_createServerFn_handler, async ({ data }) => {
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
	for (const s of stats) await sql`
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
	return { success: true };
});
//#endregion
export { getMatchStats_createServerFn_handler, saveMatchStats_createServerFn_handler };
