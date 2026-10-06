import { a as parsePlayer, i as matchSquadPlayer } from "./players-CZr5uoUS.mjs";
import { t as asDayStamp } from "./when-BGtZJU2t.mjs";
import { _ as trainingTotal } from "./scoring-B3T9YYfp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trainer-year-BiJeg2Qv.js
var TRAINER_YEAR_START = "2026-09-01";
var TRAINER_YEAR_END = "2027-06-30";
var TRAINER_YEAR_LABEL = "Trainer of the year 2026/27";
function inTrainerYear(day) {
	const d = asDayStamp(day);
	return d >= "2026-09-01" && d <= "2027-06-30";
}
function scoreTrainerYear(players, sessions) {
	const map = /* @__PURE__ */ new Map();
	for (const p of players) map.set(p, {
		name: p,
		sessions: 0,
		attended: 0,
		pts: 0,
		avg: null
	});
	for (const session of sessions) {
		if (!inTrainerYear(session.sessionDate)) continue;
		for (const mark of session.marks) {
			const key = matchSquadPlayer(players, mark.player);
			const row = key ? map.get(key) : void 0;
			if (!row) continue;
			row.sessions += 1;
			if (!mark.attended) continue;
			row.attended += 1;
			row.pts += trainingTotal(mark) ?? 0;
		}
	}
	return [...map.values()].map((row) => ({
		...row,
		avg: row.attended ? Math.round(row.pts / row.attended * 10) / 10 : null
	})).sort((a, b) => {
		if (b.pts !== a.pts) return b.pts - a.pts;
		if (b.attended !== a.attended) return b.attended - a.attended;
		return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
	});
}
//#endregion
export { scoreTrainerYear as i, TRAINER_YEAR_LABEL as n, TRAINER_YEAR_START as r, TRAINER_YEAR_END as t };
