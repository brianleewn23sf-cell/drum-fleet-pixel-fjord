import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { s as restorePineVillaDay } from "./restore-pine-villa-CU4kvcRX.mjs";
import { n as loadFitnessTests } from "./fitness-actions-B9pE30rV.mjs";
import { n as autoScore } from "./scoring-B3T9YYfp.mjs";
import { i as scoreTrainerYear } from "./trainer-year-BiJeg2Qv.mjs";
import { n as loadSessions } from "./training-actions-BntQL2yx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-actions-DiyMFyfW.js
function asText(value) {
	const s = String(value ?? "").trim();
	return s.length ? s : null;
}
var getScoreExtras_createServerFn_handler = createServerRpc({
	id: "1ea964ccb4a3d8aa8f913eb7ea55ce31e234f8bc2224bdc53e452424e223ca65",
	name: "getScoreExtras",
	filename: "src/lib/score-actions.ts"
}, (opts) => getScoreExtras.__executeServer(opts));
var getScoreExtras = createServerFn({ method: "POST" }).handler(getScoreExtras_createServerFn_handler, async () => {
	const sql = await getSql();
	await restorePineVillaDay(sql);
	let awards = [];
	try {
		awards = (await sql`
      select id, game_number, opposition, opp_mom, players_player, manager_player, updated_at
      from match_awards
      order by id asc
    `).map((row) => ({
			id: Number(row.id) || 0,
			gameNumber: String(row.game_number || "").trim(),
			opposition: String(row.opposition || "").trim(),
			oppMom: asText(row.opp_mom),
			playersPlayer: asText(row.players_player),
			managerPlayer: asText(row.manager_player),
			updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || "")
		}));
	} catch {
		awards = [];
	}
	let sessions = [];
	try {
		sessions = await loadSessions(sql);
	} catch {
		sessions = [];
	}
	let tests = [];
	try {
		tests = await loadFitnessTests(sql);
	} catch {
		tests = [];
	}
	return {
		awards,
		sessions,
		tests
	};
});
var getBoardTotals_createServerFn_handler = createServerRpc({
	id: "94b5abcd60c9206addb8efcb7ddd7379e0b0c311d94a70cb951e9b2c3963510e",
	name: "getBoardTotals",
	filename: "src/lib/score-actions.ts"
}, (opts) => getBoardTotals.__executeServer(opts));
var getBoardTotals = createServerFn({ method: "POST" }).handler(getBoardTotals_createServerFn_handler, async () => {
	const votes = await getInitialData();
	const extras = await getScoreExtras();
	const players = votes.players.length ? votes.players : [...PLAYERS];
	const table = autoScore(players, votes.history, extras.awards, extras.sessions, votes.appearances, extras.tests);
	const trainers = scoreTrainerYear(players, extras.sessions);
	const ladsIn = extras.sessions.reduce((n, s) => n + s.marks.filter((m) => m.attended).length, 0);
	return {
		players,
		history: votes.history,
		currentMatch: votes.currentMatch,
		notes: votes.notes ?? {},
		appearances: votes.appearances ?? {},
		awards: extras.awards,
		sessions: extras.sessions,
		tests: extras.tests,
		table,
		trainers,
		voteCount: votes.history.length,
		fridayNights: extras.sessions.length,
		ladsIn
	};
});
//#endregion
export { getBoardTotals_createServerFn_handler, getScoreExtras_createServerFn_handler };
