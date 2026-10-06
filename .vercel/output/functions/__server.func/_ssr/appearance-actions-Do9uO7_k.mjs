import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { r as isSquadPlayer } from "./players-CZr5uoUS.mjs";
import { r as gameKey } from "./league-Ch1nTJJB.mjs";
import { l as string, r as array, s as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/appearance-actions-Do9uO7_k.js
async function loadAppearances(sql) {
	const map = {};
	try {
		const rows = await sql`
      select game_number, opposition, player from match_appearances
    `;
		for (const row of rows) {
			const key = gameKey(String(row.game_number), String(row.opposition));
			const player = String(row.player || "").trim();
			if (!player) continue;
			if (!map[key]) map[key] = [];
			map[key].push(player);
		}
	} catch {}
	return map;
}
var getAppearances_createServerFn_handler = createServerRpc({
	id: "bd8c8b00f342f85301ac376aebabd2610281634b84c8e500df640845a3bbeee2",
	name: "getAppearances",
	filename: "src/lib/appearance-actions.ts"
}, (opts) => getAppearances.__executeServer(opts));
var getAppearances = createServerFn({ method: "POST" }).handler(getAppearances_createServerFn_handler, async () => {
	return { appearances: await loadAppearances(await getSql()) };
});
var saveAppearances_createServerFn_handler = createServerRpc({
	id: "ee6c5a33a6a73f9dde7deaa121d8260734dd5cef659fb5460d1f4357ccd02388",
	name: "saveAppearances",
	filename: "src/lib/appearance-actions.ts"
}, (opts) => saveAppearances.__executeServer(opts));
var saveAppearances = createServerFn({ method: "POST" }).validator(object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	players: array(string().trim().min(1)).max(30)
})).handler(saveAppearances_createServerFn_handler, async ({ data }) => {
	const squad = data.players.filter(isSquadPlayer);
	const sql = await getSql();
	await sql`
      delete from match_appearances
      where game_number = ${data.gameNumber} and opposition = ${data.opposition}
    `;
	for (const player of squad) await sql`
        insert into match_appearances (game_number, opposition, player)
        values (${data.gameNumber}, ${data.opposition}, ${player})
        on conflict do nothing
      `;
	return {
		success: true,
		appearances: await loadAppearances(sql)
	};
});
//#endregion
export { getAppearances_createServerFn_handler, saveAppearances_createServerFn_handler };
