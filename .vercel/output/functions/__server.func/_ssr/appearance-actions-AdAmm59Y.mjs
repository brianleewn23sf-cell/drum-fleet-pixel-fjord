import { n as createServerFn } from "./ssr.mjs";
import { r as gameKey } from "./league-Ch1nTJJB.mjs";
import { l as string, r as array, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/appearance-actions-AdAmm59Y.js
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
createServerFn({ method: "POST" }).handler(createSsrRpc("bd8c8b00f342f85301ac376aebabd2610281634b84c8e500df640845a3bbeee2"));
var saveAppearances = createServerFn({ method: "POST" }).validator(object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	players: array(string().trim().min(1)).max(30)
})).handler(createSsrRpc("ee6c5a33a6a73f9dde7deaa121d8260734dd5cef659fb5460d1f4357ccd02388"));
//#endregion
export { saveAppearances as n, loadAppearances as t };
