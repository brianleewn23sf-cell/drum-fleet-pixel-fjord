import { n as createServerFn } from "./ssr.mjs";
import { a as parsePlayer } from "./players-CZr5uoUS.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { d as prizeMonthForDay, n as autoScore, r as autoScoreMonth } from "./scoring-B3T9YYfp.mjs";
import { u as upcomingPotmMonth } from "./potm-BIYA_DOQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-actions-DgqUGgog.js
function stampMonth(iso) {
	return prizeMonthForDay(iso);
}
function voteMonthKey(row) {
	return stampMonth(row.timestamp);
}
function votesForMonth(history, month) {
	return history.filter((row) => voteMonthKey(row) === month);
}
function currentVoteMonth(d = /* @__PURE__ */ new Date()) {
	return upcomingPotmMonth(d);
}
function scoreFull(players, votes, awards, sessions, appearances, tests = []) {
	return autoScore(players, votes, awards, sessions, appearances, tests);
}
function scoreFullMonth(players, votes, awards, sessions, month, appearances, tests = []) {
	return autoScoreMonth(players, votes, awards, sessions, month, appearances, tests);
}
function averageMonthlyFull(players, votes, awards, sessions, appearances, tests = []) {
	const months = /* @__PURE__ */ new Set();
	for (const row of votes) {
		const m = stampMonth(row.timestamp);
		if (m) months.add(m);
	}
	for (const s of sessions) {
		const m = stampMonth(s.sessionDate);
		if (m) months.add(m);
	}
	for (const a of awards) {
		const m = stampMonth(a.updatedAt || "");
		if (m) months.add(m);
	}
	for (const t of tests) {
		const m = stampMonth(t.testedOn);
		if (m) months.add(m);
	}
	const list = [...months].sort();
	if (!list.length) return [];
	const byPlayer = /* @__PURE__ */ new Map();
	for (const p of players) byPlayer.set(p, {
		total: 0,
		parentPts: 0,
		oppMomPts: 0,
		playersPlayerPts: 0,
		trainingPts: 0,
		testPts: 0
	});
	for (const month of list) {
		const table = autoScoreMonth(players, votes, awards, sessions, month, appearances, tests);
		for (const row of table) {
			const acc = byPlayer.get(row.name);
			if (!acc) continue;
			acc.total += row.total;
			acc.parentPts += row.parentPts;
			acc.oppMomPts += row.oppMomPts;
			acc.playersPlayerPts += row.playersPlayerPts;
			acc.trainingPts += row.trainingPts;
			acc.testPts += row.testPts;
		}
	}
	const n = list.length;
	const avgOf = (v) => n ? v / n : 0;
	return [...byPlayer.entries()].map(([name, acc]) => ({
		name,
		months: n,
		total: acc.total,
		avg: avgOf(acc.total),
		parentPts: acc.parentPts,
		oppMomPts: acc.oppMomPts,
		playersPlayerPts: acc.playersPlayerPts,
		trainingPts: acc.trainingPts,
		testPts: acc.testPts,
		parentAvg: avgOf(acc.parentPts),
		oppMomAvg: avgOf(acc.oppMomPts),
		playersPlayerAvg: avgOf(acc.playersPlayerPts),
		trainingAvg: avgOf(acc.trainingPts),
		testAvg: avgOf(acc.testPts)
	})).sort((a, b) => {
		if (b.avg !== a.avg) return b.avg - a.avg;
		if (b.total !== a.total) return b.total - a.total;
		return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
	});
}
var getScoreExtras = createServerFn({ method: "POST" }).handler(createSsrRpc("1ea964ccb4a3d8aa8f913eb7ea55ce31e234f8bc2224bdc53e452424e223ca65"));
var getBoardTotals = createServerFn({ method: "POST" }).handler(createSsrRpc("94b5abcd60c9206addb8efcb7ddd7379e0b0c311d94a70cb951e9b2c3963510e"));
//#endregion
export { scoreFull as a, getScoreExtras as i, currentVoteMonth as n, scoreFullMonth as o, getBoardTotals as r, votesForMonth as s, averageMonthlyFull as t };
