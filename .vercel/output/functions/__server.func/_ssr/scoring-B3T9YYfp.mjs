import { a as parsePlayer, i as matchSquadPlayer, u as publicName } from "./players-CZr5uoUS.mjs";
import { r as gameKey } from "./league-Ch1nTJJB.mjs";
import { C as shortClub, d as bullsOpponent, f as bullsRoundList, g as fixtureKickoff, t as BULLS_FIXTURES } from "./wdyl-CJ_QwBRn.mjs";
import { r as TEST_POINTS_FROM, t as MARKS_FROM } from "./score-from-j42ACoaw.mjs";
import { i as localDateStamp, t as asDayStamp } from "./when-BGtZJU2t.mjs";
import { c as testBonusEvents } from "./test-bonus-DvKLNi3p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scoring-B3T9YYfp.js
/** First Friday of the 2026/27 season. Training is every Friday from this night. */
var SEASON_TRAINING_START$1 = "2026-09-04";
function seasonFridays(until = localDateStamp()) {
	const [ys, ms, ds] = SEASON_TRAINING_START$1.split("-").map(Number);
	const [ye, me, de] = until.split("-").map(Number);
	const start = Date.UTC(ys, ms - 1, ds);
	const end = Date.UTC(ye, me - 1, de);
	const out = [];
	for (let t = start; t <= end; t += 6048e5) out.push(new Date(t).toISOString().slice(0, 10));
	return out;
}
function fridayLabel(day) {
	const [y, m, d] = day.split("-").map(Number);
	return new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	}).format(new Date(Date.UTC(y, m - 1, d)));
}
/** Points that Friday, capped at 40. Null when that night has not been marked at all. */
function fridayMark(sessions, player, day) {
	const session = sessions.find((s) => s.sessionDate.slice(0, 10) === day);
	if (!session) return null;
	const mark = session.marks.find((m) => m.player === player);
	if (!mark || !mark.attended) return 0;
	return trainingTotal(mark);
}
function trainingTotal(mark) {
	if (!mark.attended) return null;
	const raw = 10 + (mark.effort ?? 0) + (mark.attitude ?? 0) + (mark.achievement ?? 0);
	return Math.min(40, Math.max(0, raw));
}
function avg(sum, n) {
	return n ? sum / n : null;
}
function summariseTraining(players, sessions) {
	return players.map((player) => {
		let sessionsCount = 0;
		let attended = 0;
		let effortSum = 0;
		let effortN = 0;
		let attSum = 0;
		let attN = 0;
		let achSum = 0;
		let achN = 0;
		let totalSum = 0;
		let totalN = 0;
		for (const session of sessions) {
			const mark = session.marks.find((m) => m.player === player || matchSquadPlayer([player], m.player) === player);
			if (!mark) continue;
			sessionsCount += 1;
			if (!mark.attended) continue;
			attended += 1;
			if (mark.effort !== null) {
				effortSum += mark.effort;
				effortN += 1;
			}
			if (mark.attitude !== null) {
				attSum += mark.attitude;
				attN += 1;
			}
			if (mark.achievement !== null) {
				achSum += mark.achievement;
				achN += 1;
			}
			const tot = trainingTotal(mark);
			if (tot !== null) {
				totalSum += tot;
				totalN += 1;
			}
		}
		return {
			player,
			sessions: sessionsCount,
			attended,
			pct: sessionsCount ? attended / sessionsCount * 100 : 0,
			avgEffort: avg(effortSum, effortN),
			avgAttitude: avg(attSum, attN),
			avgAchievement: avg(achSum, achN),
			avgTotal: avg(totalSum, totalN)
		};
	}).sort((a, b) => {
		const totA = a.avgTotal ?? -1;
		const totB = b.avgTotal ?? -1;
		if (totB !== totA) return totB - totA;
		if (b.pct !== a.pct) return b.pct - a.pct;
		return a.player.localeCompare(b.player);
	});
}
/** Season training runs the whole campaign, not one prize month. */
var SEASON_TRAINING_START = "2026-09-01";
/** Day after September’s 3rd Monday. Runs to October’s 3rd Monday, so both Fridays count. */
var CURRENT_POTM_START = "2026-09-22";
function pad(n) {
	return String(n).padStart(2, "0");
}
function shiftPrizeMonth(month, delta) {
	const [y, m] = month.split("-").map(Number);
	const d = new Date(y, m - 1 + delta, 1);
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}
function prizeMonthTitle(month) {
	const [y, m] = month.split("-").map(Number);
	return new Date(y, m - 1, 1).toLocaleDateString("en-GB", {
		month: "long",
		year: "numeric"
	});
}
function thirdMondayStamp(year, monthIndex) {
	const firstMon = 1 + (1 - new Date(year, monthIndex, 1).getDay() + 7) % 7;
	return localDateStamp(new Date(year, monthIndex, firstMon + 14));
}
function awardDay(month) {
	const [y, m] = month.split("-").map(Number);
	return thirdMondayStamp(y, m - 1);
}
function addDays(stamp, days) {
	const [y, m, d] = stamp.split("-").map(Number);
	return localDateStamp(new Date(y, m - 1, d + days));
}
function pretty(stamp) {
	const [y, m, d] = stamp.split("-").map(Number);
	return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short"
	});
}
function prizeWindow(month) {
	const end = awardDay(month);
	let start = `${month}-01`;
	if (month === "2026-09") start = SEASON_TRAINING_START;
	else if (month === "2026-10") start = CURRENT_POTM_START;
	else start = addDays(awardDay(shiftPrizeMonth(month, -1)), 1);
	return {
		month,
		start,
		awardMonday: end,
		end,
		label: `${prizeMonthTitle(month)} · ${pretty(start)} – ${pretty(end)}`
	};
}
/** Which prize month a day belongs to. Blank if it is in the closed gap. */
function prizeMonthForDay(iso) {
	const day = asDayStamp(iso);
	if (!day) return "";
	if (day >= "2026-09-01" && day <= "2026-09-21") return "2026-09";
	if (day < "2026-09-22") return "";
	let month = "2026-10";
	for (let i = 0; i < 16; i++) {
		const win = prizeWindow(month);
		if (day < win.start) return "";
		if (day <= win.end) return month;
		month = shiftPrizeMonth(month, 1);
	}
	return "";
}
function openPrizeMonth(d = /* @__PURE__ */ new Date()) {
	const day = localDateStamp(d);
	return prizeMonthForDay(day) || (day < "2026-09-22" ? "2026-09" : "2026-10");
}
function toDay(iso) {
	return asDayStamp(iso);
}
function stampMonth(iso) {
	return prizeMonthForDay(iso);
}
var SCORING = {
	parent3: 3,
	parent2: 2,
	parent1: 1,
	/** From Standish (4 Oct 2026, round 4) a family who votes gets 1 point for their own child. */
	voter: 1,
	oppMom: 20,
	playersPlayer: 10,
	played: 5,
	attendance: 10,
	effort: 10,
	attitude: 10,
	achievement: 10,
	trainingMax: 40,
	testComplete: 5,
	testGradeMax: 5,
	testGradeMin: 1
};
`${SCORING.parent3}${SCORING.parent2}${SCORING.parent1}${SCORING.voter}`, `${SCORING.oppMom}`, SCORING.oppMom / 2, `${SCORING.playersPlayer}`, `${SCORING.played}`, `${SCORING.trainingMax}${SCORING.attendance}${SCORING.effort}${SCORING.attitude}${SCORING.achievement}`;
function oppMomPlayers(value) {
	if (!value?.trim()) return [];
	return value.split("|").map((name) => name.trim()).filter(Boolean);
}
function joinOppMom(names) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const name of names) {
		const clean = name?.trim() ?? "";
		if (!clean || seen.has(clean)) continue;
		seen.add(clean);
		out.push(clean);
	}
	return out.join("|");
}
function oppMomLabel(value) {
	return oppMomPlayers(value).map((name) => publicName(name)).join(" & ");
}
function oppMomShare(count) {
	if (count <= 1) return SCORING.oppMom;
	return SCORING.oppMom / count;
}
function awardAt(award, votes) {
	const needle = award.opposition.trim().toLowerCase();
	if (needle) {
		const matches = BULLS_FIXTURES.filter((f) => {
			const opp = shortClub(bullsOpponent(f)).toLowerCase();
			return opp === needle || opp.includes(needle) || needle.includes(opp);
		});
		const today = localDateStamp();
		const pick = matches.filter((f) => asDayStamp(f.kickoff) <= today).at(-1) ?? matches[0];
		if (pick) return pick.kickoff;
	}
	const same = votes.filter((v) => v.timestamp && v.gameNumber.toLowerCase() === award.gameNumber.toLowerCase() && v.opposition.toLowerCase() === award.opposition.toLowerCase());
	if (same.length) return same.map((v) => v.timestamp).sort()[0];
	return "";
}
/** Standish, 4 Oct 2026, is round 4. Earlier games stay as they were. */
var VOTER_POINT_FROM_ROUND = 4;
function roundNo(gameNumber) {
	const m = gameNumber.match(/(\d+)/);
	return m ? Number(m[1]) : 0;
}
function voterPointApplies(row) {
	const round = roundNo(row.gameNumber);
	if (round > 0) return round >= VOTER_POINT_FROM_ROUND;
	const opp = row.opposition.trim().toLowerCase();
	if (!opp) return false;
	const hit = bullsRoundList().find((game) => {
		const name = game.opposition.toLowerCase();
		return name === opp || name.includes(opp) || opp.includes(name);
	});
	return hit ? hit.round >= VOTER_POINT_FROM_ROUND : false;
}
function voteCountsYet(row) {
	const rounds = bullsRoundList();
	const n = Number(row.gameNumber.match(/(\d+)/)?.[1] ?? 0);
	const opp = row.opposition.trim().toLowerCase();
	const round = (n ? rounds.find((item) => item.round === n) : void 0) || rounds.find((item) => {
		const name = item.opposition.toLowerCase();
		return opp === name || name.includes(opp) || opp.includes(name);
	});
	if (!round?.kickoff) return true;
	return fixtureKickoff(round.kickoff).getTime() <= Date.now();
}
function collectScoreEvents(votes, awards, sessions, tests = [], appearances) {
	const events = [];
	for (const row of votes) {
		const live = voteCountsYet(row);
		if (live && row.vote3) events.push({
			player: row.vote3,
			points: SCORING.parent3,
			source: "parent3",
			at: row.timestamp
		});
		if (live && row.vote2) events.push({
			player: row.vote2,
			points: SCORING.parent2,
			source: "parent2",
			at: row.timestamp
		});
		if (live && row.vote1) events.push({
			player: row.vote1,
			points: SCORING.parent1,
			source: "parent1",
			at: row.timestamp
		});
		if (voterPointApplies(row) && row.parentChild) events.push({
			player: row.parentChild,
			points: SCORING.voter,
			source: "voter",
			at: row.timestamp
		});
	}
	for (const a of awards) {
		const at = awardAt(a, votes);
		const moms = oppMomPlayers(a.oppMom);
		const share = oppMomShare(moms.length);
		for (const player of moms) events.push({
			player,
			points: share,
			source: "oppMom",
			at
		});
		const pick = a.playersPlayer || a.managerPlayer;
		if (pick) events.push({
			player: pick,
			points: SCORING.playersPlayer,
			source: "playersPlayer",
			at
		});
	}
	for (const session of sessions) for (const mark of session.marks) {
		if (!mark.attended) continue;
		const pts = trainingTotal(mark);
		if (pts === null) continue;
		events.push({
			player: mark.player,
			points: pts,
			source: "training",
			at: session.sessionDate
		});
	}
	for (const ev of testBonusEvents(tests)) events.push({
		player: ev.player,
		points: ev.points,
		source: "tests",
		at: ev.at
	});
	if (appearances) {
		const rounds = bullsRoundList();
		for (const [key, squad] of Object.entries(appearances)) {
			const [gameNumber = "", opposition = ""] = key.split("|||");
			const at = (rounds.find((r) => r.gameNumber.toLowerCase() === gameNumber.toLowerCase()) || rounds.find((r) => r.opposition.toLowerCase() === opposition.toLowerCase()))?.kickoff || "";
			for (const player of squad) events.push({
				player,
				points: SCORING.played,
				source: "played",
				at
			});
		}
	}
	return events.filter((ev) => {
		const day = toDay(ev.at);
		if (!day) return ev.source !== "tests";
		if (ev.source === "tests") return day >= TEST_POINTS_FROM;
		return day >= MARKS_FROM;
	});
}
function emptyScore(name) {
	return {
		name,
		parentPts: 0,
		oppMomPts: 0,
		playersPlayerPts: 0,
		playedPts: 0,
		trainingPts: 0,
		testPts: 0,
		voterPts: 0,
		total: 0,
		games: 0,
		n3: 0,
		n2: 0,
		n1: 0
	};
}
function foldScores(players, events, votes, appearances) {
	const map = /* @__PURE__ */ new Map();
	for (const p of players) map.set(p, emptyScore(p));
	for (const ev of events) {
		const key = matchSquadPlayer(players, ev.player);
		const row = key ? map.get(key) : void 0;
		if (!row) continue;
		if (ev.source === "parent3") {
			row.parentPts += ev.points;
			row.n3 += 1;
		} else if (ev.source === "parent2") {
			row.parentPts += ev.points;
			row.n2 += 1;
		} else if (ev.source === "parent1") {
			row.parentPts += ev.points;
			row.n1 += 1;
		} else if (ev.source === "voter") row.parentPts += ev.points;
		else if (ev.source === "oppMom") row.oppMomPts += ev.points;
		else if (ev.source === "playersPlayer") row.playersPlayerPts += ev.points;
		else if (ev.source === "played") row.playedPts += ev.points;
		else if (ev.source === "tests") row.testPts += ev.points;
		else row.trainingPts += ev.points;
	}
	const games = /* @__PURE__ */ new Map();
	for (const p of players) games.set(p, /* @__PURE__ */ new Set());
	if (appearances) for (const [key, squad] of Object.entries(appearances)) for (const name of squad) games.get(name)?.add(key);
	else for (const row of votes) {
		const key = gameKey(row.gameNumber, row.opposition);
		games.get(row.vote3)?.add(key);
		games.get(row.vote2)?.add(key);
		games.get(row.vote1)?.add(key);
	}
	return [...map.values()].map((row) => {
		row.games = games.get(row.name)?.size ?? 0;
		row.total = row.parentPts + row.oppMomPts + row.playersPlayerPts + row.playedPts + row.trainingPts + row.testPts;
		return row;
	}).sort((a, b) => {
		if (b.total !== a.total) return b.total - a.total;
		if (b.parentPts !== a.parentPts) return b.parentPts - a.parentPts;
		return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
	});
}
function eventsForMonth(events, month) {
	return events.filter((ev) => stampMonth(ev.at) === month);
}
function autoScore(players, votes, awards, sessions, appearances, tests = []) {
	return foldScores(players, collectScoreEvents(votes, awards, sessions, tests, appearances), votes, appearances);
}
function autoScoreMonth(players, votes, awards, sessions, month, appearances, tests = []) {
	return foldScores(players, eventsForMonth(collectScoreEvents(votes, awards, sessions, tests, appearances), month), votes.filter((v) => stampMonth(v.timestamp) === month), appearances);
}
//#endregion
export { trainingTotal as _, fridayLabel as a, openPrizeMonth as c, prizeMonthForDay as d, prizeMonthTitle as f, summariseTraining as g, shiftPrizeMonth as h, collectScoreEvents as i, oppMomLabel as l, seasonFridays as m, autoScore as n, fridayMark as o, prizeWindow as p, autoScoreMonth as r, joinOppMom as s, SCORING as t, oppMomPlayers as u };
