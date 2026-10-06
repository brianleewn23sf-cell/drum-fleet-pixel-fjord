import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { r as isSquadPlayer, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { l as string, n as _enum, o as number, r as array, s as object } from "../_libs/zod.mjs";
import { C as shortClub, E as teamsMatch, O as weekendSnapshotTables, T as southTable, a as NEWTON_RANGERS_RESULT, c as SOUTH_DIVISION_FIXTURES, d as bullsOpponent, l as SOUTH_OTHER_RESULTS, n as BULLS_TEAM, o as PINE_VILLA_OPENER, r as DAISY_HILL_RESULT, t as BULLS_FIXTURES, u as U12_DIVISIONS, v as fixtureRound, w as sortStandings } from "./wdyl-CJ_QwBRn.mjs";
import { t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { n as SAVED_STANDISH_GOALS, t as SAVED_PINE_VILLA_GOALS } from "./restore-pine-villa-CU4kvcRX.mjs";
import { s as joinOppMom, u as oppMomPlayers } from "./scoring-B3T9YYfp.mjs";
import { r as pullFaLeague } from "./fa-fulltime-C_avczt_.mjs";
import { n as loadActiveSquad } from "./squad-C3dFz7Mc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/league-actions-Cekh6alg.js
function toIntOrNull(value) {
	if (value === null || value === void 0) return null;
	const n = Number(value);
	if (!Number.isFinite(n)) return null;
	return n;
}
function toInt(value) {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
}
function mapFixture(row) {
	return {
		id: Number(row.id),
		kickoff: String(row.kickoff),
		homeTeam: String(row.home_team).trim(),
		awayTeam: String(row.away_team).trim(),
		venue: String(row.venue || ""),
		homeGoals: toIntOrNull(row.home_goals),
		awayGoals: toIntOrNull(row.away_goals),
		status: String(row.status || "").trim()
	};
}
async function selectFixtureRows(sql) {
	try {
		return await sql`
      select id, kickoff, home_team, away_team, venue, home_goals, away_goals, status
      from league_fixtures
      order by kickoff asc, id asc
    `;
	} catch {
		return await sql`
      select id, kickoff, home_team, away_team, venue, home_goals, away_goals
      from league_fixtures
      order by kickoff asc, id asc
    `;
	}
}
async function loadDivisionTables(sql, southFromFixtures) {
	const snap = weekendSnapshotTables();
	const tables = {
		north: [],
		south: [],
		west: [],
		east: []
	};
	try {
		await writeTables(sql, snap);
		const rows = await sql`
      select division, team, played, won, drawn, lost, gd, pts
      from division_standings
    `;
		for (const row of rows) {
			const id = String(row.division);
			if (!tables[id]) continue;
			tables[id].push({
				team: String(row.team),
				played: toInt(row.played),
				won: toInt(row.won),
				drawn: toInt(row.drawn),
				lost: toInt(row.lost),
				gf: 0,
				ga: 0,
				gd: toInt(row.gd),
				pts: toInt(row.pts)
			});
		}
	} catch {}
	for (const id of [
		"north",
		"south",
		"west",
		"east"
	]) {
		if (!tables[id].some((r) => r.played > 0)) tables[id] = id === "south" && southFromFixtures.some((r) => r.played > 0) ? southFromFixtures : snap[id];
		tables[id] = sortStandings(tables[id]);
	}
	return tables;
}
function asAwardText(value) {
	const s = String(value ?? "").trim();
	return s.length ? s : null;
}
function goalKey(scorer, assist) {
	return `${scorer.trim().toLowerCase()}|${(assist || "").trim().toLowerCase()}`;
}
function pineVillaGoalsOk(rows) {
	if (rows.length !== SAVED_PINE_VILLA_GOALS.length) return false;
	const have = rows.map((r) => goalKey(r.scorer, r.assist)).sort();
	const want = SAVED_PINE_VILLA_GOALS.map((g) => goalKey(g.scorer, g.assist)).sort();
	return have.every((k, i) => k === want[i]);
}
var pineVillaSheetLock = Promise.resolve();
var sheetReady = false;
async function restoreKnownSheet(sql) {
	if (sheetReady) return;
	const run = async () => {
		try {
			await sql`
        insert into current_match (id, game_number, opposition, updated_at)
        values (1, ${"Rd 1"}, ${"Pine Villa"}, now())
        on conflict (id) do nothing
      `;
			await sql`
        update current_match
        set game_number = ${"Rd 1"}, opposition = ${"Pine Villa"}, updated_at = now()
        where id = 1
          and (btrim(game_number) = '' or btrim(opposition) = '')
      `;
		} catch {}
		try {
			const id = (await sql`
        select id from league_fixtures
        where home_team = ${PINE_VILLA_OPENER.homeTeam}
          and away_team = ${BULLS_TEAM}
        limit 1
      `)[0]?.id;
			if (id) {
				if (!pineVillaGoalsOk((await sql`
        select scorer, assist from match_goals where fixture_id = ${id}
      `).map((r) => ({
					scorer: String(r.scorer || ""),
					assist: r.assist == null || String(r.assist).trim() === "" ? null : String(r.assist)
				})))) {
					await sql`delete from match_goals where fixture_id = ${id}`;
					let order = 0;
					for (const g of SAVED_PINE_VILLA_GOALS) {
						await sql`
          insert into match_goals (fixture_id, minute, scorer, assist, sort_order)
          values (${id}, ${g.minute}, ${g.scorer}, ${g.assist}, ${order})
        `;
						order += 1;
					}
				}
			}
		} catch {}
		try {
			const daisyId = (await sql`
        select id from league_fixtures
        where home_team = ${BULLS_TEAM}
          and away_team = ${"Daisy Hill Junior U12 Devils"}
          and kickoff like ${"2026-09-27%"}
        limit 1
      `)[0]?.id;
			if (daisyId) {
				const scorer = "22) William Brittain";
				const assist = "4) Louie Biddiss";
				if (!(await sql`
        select id from match_goals
        where fixture_id = ${daisyId}
          and scorer = ${scorer}
          and assist = ${assist}
        limit 1
      `)[0]) await sql`
        insert into match_goals (fixture_id, minute, scorer, assist, sort_order)
        values (${daisyId}, ${0}, ${scorer}, ${assist}, ${0})
      `;
			}
		} catch {}
		try {
			const standishId = (await sql`
        select id from league_fixtures
        where kickoff like ${"2026-10-04T11:15%"}
          and (home_team ilike ${"%Standish Panthers%Storm%"} or away_team ilike ${"%Standish Panthers%Storm%"})
        limit 1
      `)[0]?.id;
			if (standishId) {
				const have = (await sql`
          select scorer, assist from match_goals where fixture_id = ${standishId}
        `).map((r) => ({
					scorer: String(r.scorer || ""),
					assist: r.assist == null || String(r.assist).trim() === "" ? null : String(r.assist)
				})).map((r) => goalKey(r.scorer, r.assist)).sort();
				const want = SAVED_STANDISH_GOALS.map((g) => goalKey(g.scorer, g.assist)).sort();
				if (!(have.length === want.length && have.every((k, i) => k === want[i]))) {
					await sql`delete from match_goals where fixture_id = ${standishId}`;
					let order = 0;
					for (const g of SAVED_STANDISH_GOALS) {
						await sql`
              insert into match_goals (fixture_id, minute, scorer, assist, sort_order)
              values (${standishId}, ${g.minute}, ${g.scorer}, ${g.assist}, ${order})
            `;
						order += 1;
					}
				}
			}
		} catch {}
		sheetReady = true;
	};
	pineVillaSheetLock = pineVillaSheetLock.then(run, run);
	await pineVillaSheetLock;
}
async function loadSheets(sql) {
	const goalsByFixture = {};
	try {
		const goalRows = await sql`
      select id, fixture_id, minute, scorer, assist
      from match_goals
      order by minute asc, sort_order asc, id asc
    `;
		for (const row of goalRows) {
			const fixtureId = Number(row.fixture_id);
			const list = goalsByFixture[fixtureId] ?? [];
			list.push({
				id: Number(row.id),
				fixtureId,
				minute: toInt(row.minute),
				scorer: String(row.scorer || "").trim(),
				assist: asAwardText(row.assist)
			});
			goalsByFixture[fixtureId] = list;
		}
	} catch {}
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
			oppMom: asAwardText(row.opp_mom),
			playersPlayer: asAwardText(row.players_player),
			managerPlayer: asAwardText(row.manager_player),
			updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || "")
		}));
	} catch {
		awards = [];
	}
	let votes = [];
	let players = [...PLAYERS];
	try {
		const initial = await getInitialData();
		votes = initial.history;
		players = initial.players.length ? initial.players : [...PLAYERS];
	} catch {
		try {
			players = await loadActiveSquad(sql);
		} catch {
			players = [...PLAYERS];
		}
	}
	const divisionResults = {
		north: [],
		south: [],
		west: [],
		east: []
	};
	try {
		try {
			for (const r of SOUTH_DIVISION_FIXTURES) await sql`
          insert into division_results (division, kickoff, home_team, away_team, home_goals, away_goals, venue, status)
          values ('south', ${r.kickoff}, ${r.homeTeam}, ${r.awayTeam}, ${r.homeGoals}, ${r.awayGoals}, ${r.venue}, ${r.status})
          on conflict do nothing
        `;
		} catch {
			for (const r of SOUTH_OTHER_RESULTS) await sql`
          insert into division_results (division, kickoff, home_team, away_team, home_goals, away_goals)
          values ('south', ${r.kickoff}, ${r.homeTeam}, ${r.awayTeam}, ${r.homeGoals}, ${r.awayGoals})
          on conflict do nothing
        `;
			await sql`
        insert into division_results (division, kickoff, home_team, away_team, home_goals, away_goals, venue)
        values ('south', ${"2026-09-06T11:00"}, ${PINE_VILLA_OPENER.homeTeam}, ${BULLS_TEAM}, ${PINE_VILLA_OPENER.homeGoals}, ${PINE_VILLA_OPENER.awayGoals}, ${"Albany Academy"})
        on conflict do nothing
      `;
		}
		const rows = await sql`
      select division, kickoff, home_team, away_team, home_goals, away_goals, venue, status
      from division_results
      order by kickoff desc
    `;
		for (const row of rows) {
			const id = String(row.division);
			if (!divisionResults[id]) continue;
			divisionResults[id].push({
				division: id,
				kickoff: String(row.kickoff),
				homeTeam: String(row.home_team),
				awayTeam: String(row.away_team),
				homeGoals: toIntOrNull(row.home_goals),
				awayGoals: toIntOrNull(row.away_goals),
				venue: String(row.venue || ""),
				status: String(row.status || "")
			});
		}
	} catch {
		divisionResults.south = SOUTH_OTHER_RESULTS.map((r) => ({
			division: "south",
			kickoff: r.kickoff,
			homeTeam: r.homeTeam,
			awayTeam: r.awayTeam,
			homeGoals: r.homeGoals,
			awayGoals: r.awayGoals,
			venue: "",
			status: ""
		}));
	}
	return {
		goalsByFixture,
		awards,
		votes,
		players,
		divisionResults
	};
}
async function loadLeague() {
	const sql = await getSql();
	await sql`
    update league_fixtures
    set home_goals = null, away_goals = null
    where kickoff > ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 16)}
      and (home_goals is not null or away_goals is not null)
  `;
	let rows = await selectFixtureRows(sql);
	if (!rows.length) {
		for (const fx of BULLS_FIXTURES) await sql`
        insert into league_fixtures (kickoff, home_team, away_team, venue)
        values (${fx.kickoff}, ${fx.homeTeam}, ${fx.awayTeam}, ${fx.venue})
      `;
		rows = await selectFixtureRows(sql);
	}
	await sql`
    update league_fixtures
    set home_goals = ${PINE_VILLA_OPENER.homeGoals},
        away_goals = ${PINE_VILLA_OPENER.awayGoals}
    where home_team = ${PINE_VILLA_OPENER.homeTeam}
      and away_team = ${BULLS_TEAM}
      and home_goals is null
      and away_goals is null
  `;
	await sql`
    update league_fixtures
    set home_goals = ${NEWTON_RANGERS_RESULT.homeGoals},
        away_goals = ${NEWTON_RANGERS_RESULT.awayGoals}
    where home_team = ${NEWTON_RANGERS_RESULT.homeTeam}
      and away_team = ${BULLS_TEAM}
  `;
	await sql`
    update league_fixtures
    set home_goals = ${DAISY_HILL_RESULT.homeGoals},
        away_goals = ${DAISY_HILL_RESULT.awayGoals}
    where home_team = ${BULLS_TEAM}
      and away_team = ${DAISY_HILL_RESULT.awayTeam}
      and kickoff like ${"2026-09-27%"}
  `;
	try {
		await sql`
      update division_results
      set home_goals = ${DAISY_HILL_RESULT.homeGoals},
          away_goals = ${DAISY_HILL_RESULT.awayGoals}
      where home_team = ${BULLS_TEAM}
        and away_team = ${DAISY_HILL_RESULT.awayTeam}
        and kickoff like ${"2026-09-27%"}
    `;
	} catch {}
	await sql`
    update league_fixtures
    set kickoff = ${"2027-02-07T12:15"},
        venue = ${"William Fosters Pitch 1 (3) 9v9"}
    where away_team = ${BULLS_TEAM}
      and home_team = ${"Golborne Sports Junior U12 Gladiators"}
      and kickoff = ${"2027-02-07T11:30"}
  `;
	rows = await selectFixtureRows(sql);
	await restoreKnownSheet(sql);
	const fixtures = rows.map(mapFixture);
	const standings = southTable(fixtures);
	const tables = await loadDivisionTables(sql, standings);
	const sheet = await loadSheets(sql);
	let lastSync = null;
	let syncNote = null;
	try {
		const sync = await sql`
      select last_ok, last_error from fa_sync where id = 1
    `;
		if (sync[0]?.last_ok != null) lastSync = String(sync[0].last_ok);
		if (sync[0]?.last_error) syncNote = String(sync[0].last_error);
	} catch {}
	return {
		fixtures,
		standings,
		tables,
		lastSync,
		syncNote,
		...sheet
	};
}
var getLeagueData_createServerFn_handler = createServerRpc({
	id: "adcc72a5007caca85969249dec50ae13d05bd8f7b9627dcb1da7fe3b4ca64904",
	name: "getLeagueData",
	filename: "src/lib/league-actions.ts"
}, (opts) => getLeagueData.__executeServer(opts));
var getLeagueData = createServerFn({ method: "POST" }).handler(getLeagueData_createServerFn_handler, async () => {
	return loadLeague();
});
var recordLeagueResult_createServerFn_handler = createServerRpc({
	id: "33fde8af0734bb7690828be1130bb03bf6e15b02599012871d4c34cb33a26be4",
	name: "recordLeagueResult",
	filename: "src/lib/league-actions.ts"
}, (opts) => recordLeagueResult.__executeServer(opts));
var recordLeagueResult = createServerFn({ method: "POST" }).validator(object({
	id: number().int().positive(),
	homeGoals: number().int().min(0).max(99).nullable(),
	awayGoals: number().int().min(0).max(99).nullable()
})).handler(recordLeagueResult_createServerFn_handler, async ({ data }) => {
	if (data.homeGoals === null !== (data.awayGoals === null)) return {
		success: false,
		error: "Enter both scores, or clear both."
	};
	if (!(await (await getSql())`
      update league_fixtures
      set home_goals = ${data.homeGoals}, away_goals = ${data.awayGoals}
      where id = ${data.id}
      returning id
    `)[0]) return {
		success: false,
		error: "Fixture not found."
	};
	return {
		success: true,
		...await loadLeague()
	};
});
var saveDivisionStanding_createServerFn_handler = createServerRpc({
	id: "5b803ffc5de4d2734b06e88f10b5669348dae3417a5f48fe7ccc28b23fd28c7a",
	name: "saveDivisionStanding",
	filename: "src/lib/league-actions.ts"
}, (opts) => saveDivisionStanding.__executeServer(opts));
var saveDivisionStanding = createServerFn({ method: "POST" }).validator(object({
	division: _enum([
		"north",
		"south",
		"west",
		"east"
	]),
	team: string().trim().min(1).max(120),
	played: number().int().min(0).max(40),
	won: number().int().min(0).max(40),
	drawn: number().int().min(0).max(40),
	lost: number().int().min(0).max(40),
	gd: number().int().min(-200).max(200),
	pts: number().int().min(0).max(120)
})).handler(saveDivisionStanding_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into division_standings (division, team, played, won, drawn, lost, gd, pts)
      values (
        ${data.division}, ${data.team}, ${data.played}, ${data.won},
        ${data.drawn}, ${data.lost}, ${data.gd}, ${data.pts}
      )
      on conflict (division, team) do update set
        played = excluded.played,
        won = excluded.won,
        drawn = excluded.drawn,
        lost = excluded.lost,
        gd = excluded.gd,
        pts = excluded.pts
    `;
	return {
		success: true,
		...await loadLeague()
	};
});
var addDivisionTeam_createServerFn_handler = createServerRpc({
	id: "47fa8d0d5a6b7f5a387b91048ff090dcd6a9b0fb8b6761111904f63f25d9147f",
	name: "addDivisionTeam",
	filename: "src/lib/league-actions.ts"
}, (opts) => addDivisionTeam.__executeServer(opts));
var addDivisionTeam = createServerFn({ method: "POST" }).validator(object({
	division: _enum([
		"north",
		"south",
		"west",
		"east"
	]),
	team: string().trim().min(2).max(120)
})).handler(addDivisionTeam_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into division_standings (division, team)
      values (${data.division}, ${data.team})
      on conflict (division, team) do nothing
    `;
	return {
		success: true,
		...await loadLeague()
	};
});
function sameTeam(a, b) {
	return teamsMatch(a, b);
}
function knownTeamName(team) {
	for (const d of U12_DIVISIONS) {
		const hit = d.teams.find((t) => teamsMatch(t, team));
		if (hit) return hit;
	}
	return team.trim();
}
async function writeTables(sql, tables) {
	for (const id of Object.keys(tables)) for (const row of tables[id]) await sql`
        insert into division_standings (division, team, played, won, drawn, lost, gd, pts)
        values (
          ${id}, ${row.team}, ${row.played}, ${row.won},
          ${row.drawn}, ${row.lost}, ${row.gd}, ${row.pts}
        )
        on conflict (division, team) do update set
          played = excluded.played,
          won = excluded.won,
          drawn = excluded.drawn,
          lost = excluded.lost,
          gd = excluded.gd,
          pts = excluded.pts
      `;
}
async function writeBullsScores(sql, scores) {
	const now = /* @__PURE__ */ new Date();
	const fixtures = await sql`
    select id, kickoff, home_team, away_team
    from league_fixtures
  `;
	let applied = 0;
	for (const score of scores) {
		const matches = fixtures.filter((fx) => {
			const direct = sameTeam(fx.home_team, score.homeTeam) && sameTeam(fx.away_team, score.awayTeam);
			const swapped = sameTeam(fx.home_team, score.awayTeam) && sameTeam(fx.away_team, score.homeTeam);
			return direct || swapped;
		});
		const played = matches.filter((fx) => {
			const raw = fx.kickoff.length === 16 ? `${fx.kickoff}:00` : fx.kickoff;
			const d = new Date(raw);
			return Number.isFinite(d.getTime()) && d <= now;
		}).sort((a, b) => a.kickoff.localeCompare(b.kickoff));
		const target = played[played.length - 1] ?? matches[0];
		if (!target) continue;
		const direct = sameTeam(target.home_team, score.homeTeam);
		await sql`
      update league_fixtures
      set home_goals = ${direct ? score.homeGoals : score.awayGoals},
          away_goals = ${direct ? score.awayGoals : score.homeGoals}
      where id = ${target.id}
    `;
		applied += 1;
	}
	return applied;
}
async function writeFixtureTimes(sql, fixtures) {
	const rows = await sql`
    select id, home_team, away_team from league_fixtures
  `;
	let applied = 0;
	for (const fx of fixtures) {
		if (!(teamsMatch(fx.homeTeam, "Cherrybrook U12 Bulls") || teamsMatch(fx.awayTeam, "Cherrybrook U12 Bulls"))) continue;
		const home = knownTeamName(fx.homeTeam);
		const away = knownTeamName(fx.awayTeam);
		const target = rows.find((row) => teamsMatch(row.home_team, fx.homeTeam) && teamsMatch(row.away_team, fx.awayTeam) || teamsMatch(row.home_team, fx.awayTeam) && teamsMatch(row.away_team, fx.homeTeam));
		const status = fx.postponed ? "postponed" : "";
		if (!target) {
			try {
				const inserted = await sql`
          insert into league_fixtures (kickoff, home_team, away_team, venue, status)
          values (${fx.kickoff}, ${home}, ${away}, ${fx.venue || ""}, ${status})
          returning id
        `;
				if (inserted[0]) rows.push({
					id: inserted[0].id,
					home_team: home,
					away_team: away
				});
			} catch {
				const inserted = await sql`
          insert into league_fixtures (kickoff, home_team, away_team, venue)
          values (${fx.kickoff}, ${home}, ${away}, ${fx.venue || ""})
          returning id
        `;
				if (inserted[0]) rows.push({
					id: inserted[0].id,
					home_team: home,
					away_team: away
				});
			}
			applied += 1;
			continue;
		}
		try {
			await sql`
        update league_fixtures
        set kickoff = ${fx.kickoff},
            venue = ${fx.venue || ""},
            status = ${status}
        where id = ${target.id}
      `;
		} catch {
			await sql`
        update league_fixtures
        set kickoff = ${fx.kickoff},
            venue = ${fx.venue || ""}
        where id = ${target.id}
      `;
		}
		if (fx.homeGoals != null && fx.awayGoals != null) {
			const direct = teamsMatch(target.home_team, fx.homeTeam);
			await sql`
        update league_fixtures
        set home_goals = ${direct ? fx.homeGoals : fx.awayGoals},
            away_goals = ${direct ? fx.awayGoals : fx.homeGoals}
        where id = ${target.id}
      `;
		}
		applied += 1;
	}
	return applied;
}
function divisionOfTeam(team) {
	for (const d of U12_DIVISIONS) if (d.teams.some((t) => teamsMatch(t, team))) return d.id;
	return null;
}
async function upsertDivisionResult(sql, row) {
	const home = knownTeamName(row.homeTeam);
	const away = knownTeamName(row.awayTeam);
	const found = await sql`
    select kickoff, venue from division_results
    where division = ${row.division}
      and home_team = ${home}
      and away_team = ${away}
    limit 1
  `;
	const kickoff = row.kickoff || found[0]?.kickoff || "2026-09-06T00:00";
	const venue = row.venue || found[0]?.venue || "";
	const status = row.status || "";
	if (found[0]) {
		await sql`
      update division_results
      set kickoff = ${kickoff},
          venue = ${venue},
          status = case when ${status} = '' then status else ${status} end,
          home_goals = coalesce(${row.homeGoals}, home_goals),
          away_goals = coalesce(${row.awayGoals}, away_goals)
      where division = ${row.division}
        and home_team = ${home}
        and away_team = ${away}
    `;
		return;
	}
	await sql`
    insert into division_results (division, kickoff, home_team, away_team, home_goals, away_goals, venue, status)
    values (${row.division}, ${kickoff}, ${home}, ${away}, ${row.homeGoals}, ${row.awayGoals}, ${venue}, ${status})
  `;
}
async function writeDivisionResults(sql, scores, fixtures) {
	let applied = 0;
	for (const fx of fixtures) {
		const division = divisionOfTeam(fx.homeTeam) ?? divisionOfTeam(fx.awayTeam);
		if (!division) continue;
		await upsertDivisionResult(sql, {
			division,
			kickoff: fx.kickoff,
			homeTeam: fx.homeTeam,
			awayTeam: fx.awayTeam,
			homeGoals: fx.homeGoals ?? null,
			awayGoals: fx.awayGoals ?? null,
			venue: fx.venue || "",
			status: fx.postponed ? "postponed" : ""
		});
		applied += 1;
	}
	for (const score of scores) {
		const division = divisionOfTeam(score.homeTeam) ?? divisionOfTeam(score.awayTeam);
		if (!division) continue;
		const match = fixtures.find((fx) => teamsMatch(fx.homeTeam, score.homeTeam) && teamsMatch(fx.awayTeam, score.awayTeam) || teamsMatch(fx.homeTeam, score.awayTeam) && teamsMatch(fx.awayTeam, score.homeTeam));
		const direct = !match || teamsMatch(match.homeTeam, score.homeTeam);
		await upsertDivisionResult(sql, {
			division,
			kickoff: match?.kickoff || "",
			homeTeam: direct ? score.homeTeam : score.awayTeam,
			awayTeam: direct ? score.awayTeam : score.homeTeam,
			homeGoals: direct ? score.homeGoals : score.awayGoals,
			awayGoals: direct ? score.awayGoals : score.homeGoals,
			venue: match?.venue || "",
			status: match?.postponed ? "postponed" : ""
		});
		applied += 1;
	}
	return applied;
}
function awardKeysForFixture(fixtures, fx) {
	const round = fixtureRound(fixtures, fx);
	return {
		gameNumber: round ? `Rd ${round}` : shortClub(bullsOpponent(fx)),
		opposition: shortClub(bullsOpponent(fx))
	};
}
var saveMatchGoals_createServerFn_handler = createServerRpc({
	id: "b6de995d66f5557a9e6ecdda5b6ef57b0799befef65f669ca7ab0134d9e9cb47",
	name: "saveMatchGoals",
	filename: "src/lib/league-actions.ts"
}, (opts) => saveMatchGoals.__executeServer(opts));
var saveMatchGoals = createServerFn({ method: "POST" }).validator(object({
	fixtureId: number().int().positive(),
	goals: array(object({
		minute: number().int().min(0).max(90),
		scorer: string().trim().min(1).max(80),
		assist: string().trim().max(80).nullable()
	})).max(20)
})).handler(saveMatchGoals_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const goals = data.goals.filter((g) => isSquadPlayer(g.scorer));
	await sql`delete from match_goals where fixture_id = ${data.fixtureId}`;
	let order = 0;
	for (const g of goals) {
		const assist = g.assist && isSquadPlayer(g.assist) ? g.assist : null;
		await sql`
        insert into match_goals (fixture_id, minute, scorer, assist, sort_order)
        values (${data.fixtureId}, ${g.minute}, ${g.scorer}, ${assist}, ${order})
      `;
		order += 1;
	}
	return {
		success: true,
		...await loadLeague()
	};
});
var saveFixtureAwards_createServerFn_handler = createServerRpc({
	id: "52ed33b9b98e66396f02128e4d957fc32dad60cf3d5f7788b585f9080161c6c7",
	name: "saveFixtureAwards",
	filename: "src/lib/league-actions.ts"
}, (opts) => saveFixtureAwards.__executeServer(opts));
var saveFixtureAwards = createServerFn({ method: "POST" }).validator(object({
	fixtureId: number().int().positive(),
	oppMom: string().trim().max(160),
	managerPlayer: string().trim().max(80),
	playersPlayer: string().trim().max(80)
})).handler(saveFixtureAwards_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const league = await loadLeague();
	const fx = league.fixtures.find((row) => row.id === data.fixtureId);
	if (!fx) return {
		success: false,
		error: "Fixture not found."
	};
	const keys = awardKeysForFixture(league.fixtures, fx);
	const names = oppMomPlayers(data.oppMom);
	const oppMom = names.length ? names.every((name) => isSquadPlayer(name)) ? joinOppMom(names) : null : null;
	const managerPlayer = data.managerPlayer && isSquadPlayer(data.managerPlayer) ? data.managerPlayer : null;
	const playersPlayer = data.playersPlayer && isSquadPlayer(data.playersPlayer) ? data.playersPlayer : null;
	try {
		await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
        values (${keys.gameNumber}, ${keys.opposition}, ${oppMom}, ${playersPlayer}, ${managerPlayer}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          manager_player = excluded.manager_player,
          updated_at = now()
      `;
	} catch {
		await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, updated_at)
        values (${keys.gameNumber}, ${keys.opposition}, ${oppMom}, ${playersPlayer}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          updated_at = now()
      `;
	}
	return {
		success: true,
		...await loadLeague()
	};
});
var syncLeagueFromFa_createServerFn_handler = createServerRpc({
	id: "ea192e479e51fe740b3ed93bed63c7c9c59a48b21e867b51e75bb00a7887ed69",
	name: "syncLeagueFromFa",
	filename: "src/lib/league-actions.ts"
}, (opts) => syncLeagueFromFa.__executeServer(opts));
var syncLeagueFromFa = createServerFn({ method: "POST" }).handler(syncLeagueFromFa_createServerFn_handler, async () => {
	const pulled = await pullFaLeague();
	const sql = await getSql();
	await writeTables(sql, pulled.tables);
	const bullsApplied = await writeBullsScores(sql, pulled.bullsScores);
	let fixturesApplied = 0;
	let resultsApplied = 0;
	try {
		fixturesApplied = await writeFixtureTimes(sql, pulled.fixtures);
		resultsApplied = await writeDivisionResults(sql, pulled.allScores.length ? pulled.allScores : uniqueScoresForDiv(pulled), pulled.fixtures);
	} catch {}
	const note = pulled.source === "fa" ? null : pulled.fromFa.length ? `U12 Full-Time: ${pulled.fromFa.join(", ")}. Others used the last saved U12 table.` : "Full-Time could not be reached. Loaded the last saved U12 tables, fixtures and scores.";
	try {
		await sql`
      update fa_sync
      set last_ok = now(), last_error = ${note}
      where id = 1
    `;
	} catch {}
	const league = await loadLeague();
	return {
		success: true,
		source: pulled.source,
		fromFa: pulled.fromFa,
		bullsApplied,
		fixturesApplied,
		resultsApplied,
		bullsScores: pulled.bullsScores,
		notes: pulled.notes,
		...league
	};
});
function uniqueScoresForDiv(pulled) {
	const fromFixtures = pulled.fixtures.filter((fx) => fx.homeGoals != null && fx.awayGoals != null).map((fx) => ({
		homeTeam: fx.homeTeam,
		awayTeam: fx.awayTeam,
		homeGoals: fx.homeGoals,
		awayGoals: fx.awayGoals
	}));
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const row of [...pulled.bullsScores, ...fromFixtures]) {
		const key = `${row.homeTeam}|${row.awayTeam}|${row.homeGoals}-${row.awayGoals}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(row);
	}
	return out;
}
//#endregion
export { addDivisionTeam_createServerFn_handler, getLeagueData_createServerFn_handler, recordLeagueResult_createServerFn_handler, saveDivisionStanding_createServerFn_handler, saveFixtureAwards_createServerFn_handler, saveMatchGoals_createServerFn_handler, syncLeagueFromFa_createServerFn_handler };
