import { O as weekendSnapshotTables, o as PINE_VILLA_OPENER, p as emptyStanding, u as U12_DIVISIONS, w as sortStandings } from "./wdyl-CJ_QwBRn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fa-fulltime-C_avczt_.js
var FA_LEAGUE = "454046382";
var FA_SEASON = "685261564";
var FA_BULLS_TEAM_ID = "996254211";
/** This module only reads WDYL U12 2026/27. Other age groups are never applied. */
var OTHER_AGE_RE = /\bU(?:9|10|11|1[3-8])\b/i;
var U12_COMPASS_RE = /\bU12\s+(North|South|East|West)\b/i;
var SEASON_START_MS = Date.parse("2026-09-01T00:00:00+01:00");
var FA_DIVISION_PAGES = {
	north: {
		division: "983817231",
		group: "1_77366558",
		heading: "U12 North",
		fingerprint: ["Cherrybrook U12 warriors", "Cherrybrook U12 madrid"]
	},
	south: {
		division: "112552333",
		group: "1_400875720",
		heading: "U12 South",
		fingerprint: ["Cherrybrook U12 Bulls", "Cherrybrook U12 cobras"]
	},
	east: {
		division: "739844699",
		group: "1_357400182",
		heading: "U12 East",
		fingerprint: ["Cherrybrook U12 eagles", "Cherrybrook U12 hornets"]
	},
	west: {
		division: "995748455",
		group: "1_621284961",
		heading: "U12 West",
		fingerprint: ["Cherrybrook U12 Knights", "Cherrybrook U12 raiders"],
		forbidden: ["Ladybridge U12 Leopards", "Pine Villa U12 Tangerine"]
	}
};
function faPublicQuery(page) {
	return new URLSearchParams({
		league: FA_LEAGUE,
		selectedSeason: FA_SEASON,
		selectedFixtureGroupAgeGroup: "0",
		selectedDivision: page.division,
		selectedCompetition: "0"
	});
}
function faQuery(page) {
	const params = faPublicQuery(page);
	if (page.group && page.group !== "0") params.set("selectedFixtureGroupKey", page.group);
	return params;
}
function faTableUrl(page) {
	return `https://fulltime.thefa.com/index.html?${faQuery(page).toString()}`;
}
function faDivisionTableUrl(id) {
	return `https://fulltime.thefa.com/index.html?${faPublicQuery(FA_DIVISION_PAGES[id]).toString()}`;
}
function faLeagueHomeUrl() {
	return `https://fulltime.thefa.com/index.html?league=${FA_LEAGUE}&selectedSeason=${FA_SEASON}`;
}
function faResultsUrl(page) {
	return `https://fulltime.thefa.com/results.html?${faQuery(page).toString()}`;
}
function faFixturesUrl(page) {
	return `https://fulltime.thefa.com/fixtures.html?${faQuery(page).toString()}`;
}
function faBullsTeamUrl() {
	return `https://fulltime.thefa.com/displayTeam.html?id=${FA_BULLS_TEAM_ID}`;
}
function stripTags(html) {
	return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&/g, "&").replace(/\s+/g, " ").trim();
}
function toInt(value) {
	const n = Number(String(value).replace(/^\+/, ""));
	return Number.isFinite(n) ? n : 0;
}
function looksLikeTeam(cell) {
	if (cell.length < 4 || cell.length > 90) return false;
	if (/^\d+$/.test(cell)) return false;
	if (/^(pos|team|p|w|d|l|gd|pts|gf|ga|pld|type|home|away|venue)$/i.test(cell)) return false;
	if (/^\d{2}\/\d{2}/.test(cell)) return false;
	return /[a-z]/i.test(cell);
}
function parseFaStandings(html) {
	const rows = [];
	const trs = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
	for (const tr of trs) {
		const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => stripTags(m[1]));
		if (cells.length < 5) continue;
		const teamIdx = cells.findIndex(looksLikeTeam);
		if (teamIdx < 0) continue;
		const nums = cells.slice(teamIdx + 1).filter((c) => /^-?\+?\d+$/.test(c));
		if (nums.length < 3) continue;
		const team = cells[teamIdx];
		const played = toInt(nums[0]);
		const pts = toInt(nums[nums.length - 1]);
		const gd = nums.length >= 2 ? toInt(nums[nums.length - 2]) : 0;
		const won = nums.length >= 6 ? toInt(nums[1]) : 0;
		const drawn = nums.length >= 6 ? toInt(nums[2]) : 0;
		const lost = nums.length >= 6 ? toInt(nums[3]) : 0;
		rows.push({
			team,
			played,
			won,
			drawn,
			lost,
			gf: 0,
			ga: 0,
			gd,
			pts
		});
	}
	const byTeam = /* @__PURE__ */ new Map();
	for (const row of rows) if (!byTeam.has(row.team)) byTeam.set(row.team, row);
	return sortStandings([...byTeam.values()]);
}
var SCORE_CELL = /^(\d+)\s*[-–]\s*(\d+)(?:\s*\(.*\))?$/;
function parseFaResults(html) {
	const out = [];
	const trs = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
	for (const tr of trs) {
		const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
		const scoreIdx = cells.findIndex((c) => SCORE_CELL.test(c));
		if (scoreIdx < 1 || scoreIdx >= cells.length - 1) continue;
		const m = cells[scoreIdx].match(SCORE_CELL);
		if (!m) continue;
		const home = cells[scoreIdx - 1];
		const away = cells[scoreIdx + 1];
		if (!looksLikeTeam(home) || !looksLikeTeam(away)) continue;
		out.push({
			homeTeam: home,
			awayTeam: away,
			homeGoals: toInt(m[1]),
			awayGoals: toInt(m[2])
		});
	}
	const seen = /* @__PURE__ */ new Set();
	return out.filter((row) => {
		const key = `${row.homeTeam}|${row.awayTeam}|${row.homeGoals}-${row.awayGoals}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
var DATE_CELL = /(\d{2})\/(\d{2})\/(\d{2,4})/;
var TIME_CELL = /(\d{1,2}):(\d{2})/;
function parseFaDateTime(text) {
	const d = text.match(DATE_CELL);
	if (!d) return null;
	let year = Number(d[3]);
	if (year < 100) year += 2e3;
	const t = text.match(TIME_CELL);
	const hh = t ? String(t[1]).padStart(2, "0") : "00";
	const mm = t ? t[2] : "00";
	return `${year}-${d[2]}-${d[1]}T${hh}:${mm}`;
}
function looksLikeVenue(cell) {
	if (cell.length < 4 || cell.length > 120) return false;
	if (/^\d+$/.test(cell)) return false;
	if (SCORE_CELL.test(cell) || /^vs$/i.test(cell)) return false;
	if (DATE_CELL.test(cell) && cell.length < 18) return false;
	if (/^(home|away|type|status|venue|competition|division|league|u12 south|u12 north|u12 west|u12 east|postponed|played|void)$/i.test(cell)) return false;
	if (/\bU12\b/i.test(cell) && /cherrybrook|rangers|villa|gladiators|devils|cobras|storm|raptors|dynamos|matthiola|newton|hawkley|hindley|hornets|eagles|knights|raiders|hurricanes/i.test(cell)) return false;
	return /[a-z]/i.test(cell);
}
function parseFaFixtures(html) {
	const out = [];
	const trs = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
	for (const tr of trs) {
		const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
		const blob = cells.join(" ");
		const kickoff = parseFaDateTime(blob);
		if (!kickoff) continue;
		const postponed = /postponed/i.test(blob);
		const scoreIdx = cells.findIndex((c) => SCORE_CELL.test(c));
		let home = "";
		let away = "";
		let homeGoals = null;
		let awayGoals = null;
		if (scoreIdx > 0 && scoreIdx < cells.length - 1) {
			home = cells[scoreIdx - 1];
			away = cells[scoreIdx + 1];
			const m = cells[scoreIdx].match(SCORE_CELL);
			if (m) {
				homeGoals = toInt(m[1]);
				awayGoals = toInt(m[2]);
			}
		} else {
			const vsIdx = cells.findIndex((c) => /^vs$/i.test(c));
			const teams = cells.filter(looksLikeTeam);
			if (vsIdx > 0 && vsIdx < cells.length - 1) {
				home = cells[vsIdx - 1];
				away = cells[vsIdx + 1];
			} else if (teams.length >= 2) {
				home = teams[0];
				away = teams[1];
			}
		}
		if (!looksLikeTeam(home) || !looksLikeTeam(away)) continue;
		if (!isU12Name(home) || !isU12Name(away)) continue;
		const venue = cells.find((c, i) => {
			if (c === home || c === away) return false;
			if (i === scoreIdx) return false;
			return looksLikeVenue(c);
		}) ?? "";
		out.push({
			kickoff,
			homeTeam: home,
			awayTeam: away,
			venue,
			postponed,
			homeGoals,
			awayGoals
		});
	}
	const seen = /* @__PURE__ */ new Set();
	return out.filter((row) => {
		const key = `${row.kickoff}|${row.homeTeam}|${row.awayTeam}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function hasFingerprint(rows, fingerprints) {
	const blob = rows.map((r) => r.team.toLowerCase()).join(" | ");
	return fingerprints.every((fp) => blob.includes(fp.toLowerCase()));
}
function teamKey(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function hasKnownTeams(rows, known, min = 3) {
	if (!known.length) return false;
	let n = 0;
	for (const k of known) {
		const needle = teamKey(k);
		if (rows.some((r) => {
			const have = teamKey(r.team);
			return have === needle || have.includes(needle) || needle.includes(have);
		})) n += 1;
	}
	return n >= Math.min(min, known.length);
}
function parseFaDivisionPages(html) {
	const found = {};
	for (const m of html.matchAll(/<option[^>]*value=["'](\d+)["'][^>]*>\s*U12\s+(North|South|East|West)\b/gi)) {
		const id = m[2].toLowerCase();
		found[id] = {
			division: m[1],
			group: found[id]?.group || "0"
		};
	}
	for (const m of html.matchAll(/U12\s+(North|South|East|West)[\s\S]{0,500}?selectedDivision=(\d+)[^"'<\s]*selectedFixtureGroupKey=(1_\d+)/gi)) {
		const id = m[1].toLowerCase();
		found[id] = {
			division: m[2],
			group: m[3]
		};
	}
	for (const m of html.matchAll(/selectedDivision=(\d+)[^"'<\s]*selectedFixtureGroupKey=(1_\d+)[\s\S]{0,500}?U12\s+(North|South|East|West)/gi)) {
		const id = m[3].toLowerCase();
		if (!found[id] || found[id]?.group === "0") found[id] = {
			division: m[1],
			group: m[2]
		};
	}
	return found;
}
function hasForbidden(rows, forbidden) {
	const blob = rows.map((r) => r.team.toLowerCase()).join(" | ");
	return forbidden.some((name) => blob.includes(name.toLowerCase()));
}
function extractAgeHeading(html) {
	const chunks = [
		...html.match(/<h1[\s\S]*?<\/h1>/gi) ?? [],
		...html.match(/<h2[\s\S]*?<\/h2>/gi) ?? [],
		...html.match(/<title[\s\S]*?<\/title>/gi) ?? [],
		...html.match(/<option[^>]*selected[^>]*>[\s\S]*?<\/option>/gi) ?? []
	];
	for (const chunk of chunks) {
		const text = stripTags(chunk);
		const compass = text.match(U12_COMPASS_RE) ?? text.match(/\bU1[3-8]\s+(North|South|East|West)\b/i);
		if (compass) return compass[0];
		if (text.match(/\bU(?:9|10|11|1[3-8])\b/i) && /division|league|table|north|south|east|west/i.test(text)) return text.slice(0, 80);
	}
	const all = stripTags(html.slice(0, 12e3));
	const fallback = all.match(U12_COMPASS_RE) ?? all.match(/\bU1[3-8]\s+(North|South|East|West)\b/i);
	return fallback ? fallback[0] : null;
}
function tooManyGamesForThisStage(rows) {
	const maxPlayed = Math.max(0, ...rows.map((r) => r.played));
	const weeks = Math.max(0, (Date.now() - SEASON_START_MS) / 6048e5);
	return maxPlayed > Math.max(2, Math.ceil(weeks) + 3);
}
function isU12Name(name) {
	if (OTHER_AGE_RE.test(name)) return false;
	return /\bU12\b/i.test(name) || /under[-\s]?12/i.test(name);
}
function isU12Score(row) {
	return isU12Name(row.homeTeam) && isU12Name(row.awayTeam);
}
/** Null means the page is a live U12 2026/27 table for `id`. Otherwise a skip reason. */
function u12PageReject(html, rows, id) {
	const page = FA_DIVISION_PAGES[id];
	const heading = extractAgeHeading(html);
	if (heading) {
		if (OTHER_AGE_RE.test(heading)) return `${id}: Full-Time was ${heading}, not U12`;
		if (!new RegExp(`U12\\s+${id}`, "i").test(heading)) return `${id}: Full-Time heading was ${heading}, not ${page.heading}`;
	}
	if (rows.some((r) => OTHER_AGE_RE.test(r.team))) return `${id}: table included a non-U12 team`;
	const u12Count = rows.filter((r) => isU12Name(r.team)).length;
	if (rows.length && u12Count < Math.ceil(rows.length * .5)) return `${id}: team names were not U12`;
	if (page.forbidden?.length && hasForbidden(rows, page.forbidden)) return `${id}: Full-Time page was last season`;
	if (tooManyGamesForThisStage(rows)) return `${id}: Full-Time table still looks like last season`;
	if (!hasFingerprint(rows, page.fingerprint)) {
		if (!hasKnownTeams(rows, U12_DIVISIONS.find((d) => d.id === id)?.teams ?? [])) return `${id}: Full-Time page was the wrong U12 division`;
	}
	return null;
}
async function fetchHtml(url) {
	const res = await fetch(url, {
		headers: {
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
			Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
			"Accept-Language": "en-GB,en;q=0.9"
		},
		redirect: "follow",
		signal: AbortSignal.timeout(8e3)
	});
	if (!res.ok) throw new Error(`FA Full-Time returned ${res.status}`);
	const html = await res.text();
	if (/attention required|cloudflare|cf-challenge/i.test(html) && html.length < 2e4) throw new Error("FA Full-Time blocked the request.");
	return html;
}
async function pullFaLeague() {
	const snapshot = weekendSnapshotTables();
	const tables = {
		north: snapshot.north,
		south: snapshot.south,
		west: snapshot.west,
		east: snapshot.east
	};
	const fromFa = [];
	const notes = [];
	const liveScores = [];
	const fixtures = [];
	const pages = {
		north: { ...FA_DIVISION_PAGES.north },
		south: { ...FA_DIVISION_PAGES.south },
		west: { ...FA_DIVISION_PAGES.west },
		east: { ...FA_DIVISION_PAGES.east }
	};
	function applyDiscovered(html) {
		const found = parseFaDivisionPages(html);
		for (const id of Object.keys(found)) {
			const hit = found[id];
			if (!hit) continue;
			if (hit.division && hit.division !== pages[id].division) pages[id] = {
				...pages[id],
				division: hit.division,
				group: hit.group || pages[id].group
			};
			else if (hit.group && hit.group !== "0") pages[id] = {
				...pages[id],
				group: hit.group
			};
		}
	}
	async function readDivision(id) {
		const page = pages[id];
		const html = await fetchHtml(faTableUrl(page));
		applyDiscovered(html);
		const rows = parseFaStandings(html);
		if (!rows.length) {
			notes.push(`${id}: no U12 table on Full-Time`);
			return false;
		}
		const reject = u12PageReject(html, rows, id);
		if (reject) {
			notes.push(reject);
			return false;
		}
		tables[id] = mergeKnownNames(id, rows);
		fromFa.push(id);
		liveScores.push(...parseFaResults(html).filter(isU12Score));
		try {
			const resultsHtml = await fetchHtml(faResultsUrl(page));
			liveScores.push(...parseFaResults(resultsHtml).filter(isU12Score));
		} catch {}
		try {
			const parsed = parseFaFixtures(await fetchHtml(faFixturesUrl(page)));
			fixtures.push(...parsed);
			for (const fx of parsed) if (fx.homeGoals != null && fx.awayGoals != null) liveScores.push({
				homeTeam: fx.homeTeam,
				awayTeam: fx.awayTeam,
				homeGoals: fx.homeGoals,
				awayGoals: fx.awayGoals
			});
		} catch {}
		return true;
	}
	await Promise.all([
		"south",
		"east",
		"north",
		"west"
	].map(async (id) => {
		try {
			if (!await readDivision(id) && (id === "west" || id === "north")) {
				if (pages[id].division !== FA_DIVISION_PAGES[id].division || pages[id].group !== FA_DIVISION_PAGES[id].group) await readDivision(id);
			}
		} catch (err) {
			notes.push(`${id}: ${err instanceof Error ? err.message : String(err)}`);
		}
	}));
	try {
		const teamHtml = await fetchHtml(faBullsTeamUrl());
		liveScores.push(...parseFaResults(teamHtml).filter(isU12Score));
		fixtures.push(...parseFaFixtures(teamHtml));
	} catch (err) {
		notes.push(`bulls: ${err instanceof Error ? err.message : String(err)}`);
	}
	const bullsScores = uniqueScores(liveScores.filter(isBullsScore).filter(isU12Score));
	const allScores = uniqueScores(liveScores.filter(isU12Score));
	if (!bullsScores.length) {
		bullsScores.push({
			homeTeam: PINE_VILLA_OPENER.homeTeam,
			awayTeam: PINE_VILLA_OPENER.awayTeam,
			homeGoals: PINE_VILLA_OPENER.homeGoals,
			awayGoals: PINE_VILLA_OPENER.awayGoals
		});
		notes.push("Bulls score: used the saved Pine Villa 7–6");
	}
	return {
		ok: true,
		source: fromFa.length === 4 ? "fa" : fromFa.length === 0 ? "saved" : "mixed",
		tables,
		fromFa,
		bullsScores,
		fixtures: uniqueFixtures(fixtures),
		allScores,
		notes
	};
}
function uniqueFixtures(rows) {
	const seen = /* @__PURE__ */ new Set();
	return rows.filter((row) => {
		const key = `${row.kickoff}|${row.homeTeam}|${row.awayTeam}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function isBullsScore(row) {
	return isBullsName(row.homeTeam) || isBullsName(row.awayTeam);
}
function isBullsName(name) {
	const n = name.toLowerCase();
	if (OTHER_AGE_RE.test(n)) return false;
	return n.includes("cherrybrook") && n.includes("bulls") && !n.includes("cobra");
}
function uniqueScores(rows) {
	const seen = /* @__PURE__ */ new Set();
	return rows.filter((row) => {
		const key = `${row.homeTeam}|${row.awayTeam}|${row.homeGoals}-${row.awayGoals}`;
		if (seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}
function mergeKnownNames(id, rows) {
	const known = U12_DIVISIONS.find((d) => d.id === id)?.teams ?? [];
	if (!known.length) return rows;
	const mapped = rows.map((row) => {
		const hit = known.find((k) => k.toLowerCase() === row.team.toLowerCase() || row.team.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(row.team.toLowerCase()));
		return hit ? {
			...row,
			team: hit
		} : row;
	});
	const seen = new Set(mapped.map((r) => r.team));
	for (const team of known) if (!seen.has(team)) mapped.push(emptyStanding(team));
	return sortStandings(mapped);
}
//#endregion
export { faLeagueHomeUrl as n, pullFaLeague as r, faDivisionTableUrl as t };
