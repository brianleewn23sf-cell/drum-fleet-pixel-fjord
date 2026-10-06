import { i as localDateStamp } from "./when-BGtZJU2t.mjs";
import { c as openPrizeMonth, p as prizeWindow, r as autoScoreMonth, t as SCORING } from "./scoring-B3T9YYfp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/potm-BIYA_DOQ.js
var OPP_MOM_POINTS = SCORING.oppMom;
var PLAYERS_PLAYER_POINTS = SCORING.playersPlayer;
/** Locked 3rd-Monday podium for September 2026. */
var SEPTEMBER_2026_PODIUM = {
	month: "2026-09",
	awardedOn: "2026-09-21",
	first: "30) Isa Ali",
	second: "22) William Brittain",
	third: "14) Henry Bearman"
};
function septemberPodium() {
	return {
		month: SEPTEMBER_2026_PODIUM.month,
		label: monthTitle(SEPTEMBER_2026_PODIUM.month),
		awardedOn: SEPTEMBER_2026_PODIUM.awardedOn,
		first: SEPTEMBER_2026_PODIUM.first,
		second: SEPTEMBER_2026_PODIUM.second,
		third: SEPTEMBER_2026_PODIUM.third
	};
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function shiftMonth(month, delta) {
	const [y, m] = month.split("-").map(Number);
	const d = new Date(y, m - 1 + delta, 1);
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}
function monthTitle(month) {
	const [y, m] = month.split("-").map(Number);
	return new Date(y, m - 1, 1).toLocaleDateString("en-GB", {
		month: "long",
		year: "numeric"
	});
}
function upcomingPotmMonth(d = /* @__PURE__ */ new Date()) {
	return openPrizeMonth(d);
}
function monthWindow(month) {
	return prizeWindow(month);
}
function canAwardMonth(window, today = localDateStamp()) {
	return today >= window.awardMonday;
}
function scorePotm(players, votes, awards, sessions, window, tests = [], appearances) {
	return autoScoreMonth(players, votes, awards, sessions, window.month, appearances, tests).map((row) => ({
		name: row.name,
		parentPts: row.parentPts,
		trainingPts: row.trainingPts,
		testPts: row.testPts,
		oppMom: SCORING.oppMom ? row.oppMomPts / SCORING.oppMom : 0,
		playersPlayer: SCORING.playersPlayer ? row.playersPlayerPts / SCORING.playersPlayer : 0,
		playedPts: row.playedPts,
		total: row.total
	}));
}
//#endregion
export { monthTitle as a, septemberPodium as c, canAwardMonth as i, shiftMonth as l, PLAYERS_PLAYER_POINTS as n, monthWindow as o, SEPTEMBER_2026_PODIUM as r, scorePotm as s, OPP_MOM_POINTS as t, upcomingPotmMonth as u };
