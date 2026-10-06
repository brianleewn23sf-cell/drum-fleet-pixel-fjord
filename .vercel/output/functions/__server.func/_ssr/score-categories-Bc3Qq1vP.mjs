import { a as parsePlayer } from "./players-CZr5uoUS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-categories-Bc3Qq1vP.js
var SCORE_CATEGORIES = [
	{
		id: "total",
		title: "Overall",
		note: "Since 1 September. Votes, training, tests, games played, opposition MOM and manager’s player.",
		pts: (row) => row.total
	},
	{
		id: "training",
		title: "Training",
		note: "Friday nights. Attendance, effort, attitude, achievement.",
		pts: (row) => row.trainingPts
	},
	{
		id: "parents",
		title: "Parent votes",
		note: "3-2-1 from families only.",
		pts: (row) => row.parentPts
	},
	{
		id: "mom",
		title: "Opp MOM",
		note: "20 points each time the opposition pick him.",
		pts: (row) => row.oppMomPts
	},
	{
		id: "manager",
		title: "Manager’s player",
		note: "10 points each time Brian or Connor pick him.",
		pts: (row) => row.playersPlayerPts
	},
	{
		id: "played",
		title: "Games played",
		note: "5 points for every game he played in.",
		pts: (row) => row.playedPts ?? 0
	},
	{
		id: "tests",
		title: "Tests",
		note: "Friday 30m no ball is on the board. +5 for the drill, speed /10, technique /5.",
		pts: (row) => row.testPts
	}
];
/** Keep everyone tied with 3rd. Two or three on the same score all stay on the podium. */
function topNWithTies(rows, pts, n = 3) {
	const scored = rows.filter((row) => pts(row) > 0).slice();
	scored.sort((a, b) => pts(b) - pts(a));
	if (scored.length <= n) return scored;
	const cutoff = pts(scored[n - 1]);
	return scored.filter((row) => pts(row) >= cutoff);
}
function placeAt(index, pts) {
	if (index <= 0) return 1;
	if (pts[index] === pts[index - 1]) return placeAt(index - 1, pts);
	return index + 1;
}
function top3Category(table, pts) {
	return topNWithTies(table, pts, 3).map((row) => ({
		name: row.name,
		pts: pts(row)
	})).sort((a, b) => {
		if (b.pts !== a.pts) return b.pts - a.pts;
		return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
	});
}
//#endregion
export { topNWithTies as i, placeAt as n, top3Category as r, SCORE_CATEGORIES as t };
