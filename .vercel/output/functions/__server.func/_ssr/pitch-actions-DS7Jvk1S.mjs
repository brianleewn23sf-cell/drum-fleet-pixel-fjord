import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { c as record, i as boolean, l as string, n as _enum, s as object } from "../_libs/zod.mjs";
import "./formations-pQSTjnGH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pitch-actions-DS7Jvk1S.js
function asLineup(value) {
	let raw = value;
	if (typeof raw === "string") try {
		raw = JSON.parse(raw);
	} catch {
		return {};
	}
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
	const next = {};
	for (const [key, item] of Object.entries(raw)) {
		const player = String(item || "").trim();
		if (player) next[key] = player;
	}
	return next;
}
function asBrief(value) {
	let raw = value;
	if (typeof raw === "string") try {
		raw = JSON.parse(raw);
	} catch {
		return {};
	}
	if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
	const next = {};
	for (const [key, item] of Object.entries(raw)) {
		if (!item || typeof item !== "object" || Array.isArray(item)) continue;
		const row = item;
		next[key] = {
			duty: String(row.duty || ""),
			withBall: String(row.withBall || ""),
			withoutBall: String(row.withoutBall || "")
		};
	}
	return next;
}
function asKit(value) {
	return value === "away" ? "away" : "home";
}
function rowToPlan(row) {
	return {
		opposition: String(row.opposition || ""),
		kickoff: String(row.kickoff || ""),
		venue: String(row.venue || ""),
		home: Number(row.home) === 1 || row.home === true,
		formation: String(row.formation || "3-3-2"),
		kit: asKit(row.kit),
		lineup: asLineup(row.lineup_json ?? row.lineup),
		brief: asBrief(row.brief_json ?? row.brief)
	};
}
async function seedPhoneLineup(sql) {
	const opposition = "Pine Villa U12 s";
	const kickoff = "2026-09-06T11:00";
	const existing = await sql.query(`select count(*)::int as n from plan_saves where opposition = $1 and kickoff = $2`, [opposition, kickoff]);
	if (Number(existing[0]?.n) > 0) return;
	await sql.query(`insert into plan_saves (opposition, kickoff, venue, home, formation, kit, lineup_json)
     values ($1,$2,$3,$4,$5,$6,$7)
     on conflict (opposition, kickoff) do nothing`, [
		opposition,
		kickoff,
		"Albany Academy",
		0,
		"3-2-3",
		"away",
		JSON.stringify({
			GK: "13) Zachary Read (GK)",
			LB: "16) Jacob Hill",
			CB: "5) Kody Cox",
			RB: "10) Ben Owen",
			LCM: "4) Louie Biddiss",
			RCM: "9) Jacob Sands",
			LW: "30) Isa Ali",
			ST: "22) William Brittain",
			RW: "14) Henry Bearman",
			SUB1: "3) Ruben Biddiss",
			SUB2: "8) Caleb Connelly",
			SUB3: "6) Logan Massey",
			SUB4: "20) Archie Almond",
			RES1: "23) Hayden Plumbley",
			INJ1: "1) Harry Parr",
			OUT1: "7) Cullen Atkinson-Lee"
		})
	]);
}
async function ensurePlanTable(sql) {
	await sql.query(`
    create table if not exists plan_saves (
      opposition   text not null,
      kickoff      text not null,
      venue        text,
      home         integer not null default 1,
      formation    text not null default '3-3-2',
      kit          text not null default 'home',
      lineup_json  text not null default '{}',
      primary key (opposition, kickoff)
    )
  `);
	try {
		await sql.query(`alter table plan_saves add column brief_json text not null default '{}'`);
	} catch {}
	try {
		await seedPhoneLineup(sql);
	} catch {}
}
var getMatchPlans_createServerFn_handler = createServerRpc({
	id: "82f718efc2bf0885613f992fb42ad4fa1cb9145dfb8d43b3c67a6e390b2aea8e",
	name: "getMatchPlans",
	filename: "src/lib/pitch-actions.ts"
}, (opts) => getMatchPlans.__executeServer(opts));
var getMatchPlans = createServerFn({ method: "POST" }).handler(getMatchPlans_createServerFn_handler, async () => {
	const sql = await getSql();
	try {
		await ensurePlanTable(sql);
		let rows = [];
		try {
			rows = await sql.query(`select opposition, kickoff, venue, home, formation, kit, lineup_json, brief_json from plan_saves order by kickoff asc`);
		} catch {
			rows = await sql.query(`select opposition, kickoff, venue, home, formation, kit, lineup_json from plan_saves order by kickoff asc`);
		}
		const plans = rows.map(rowToPlan);
		try {
			const liveRows = await sql.query(`select opposition, kickoff, formation, lineup from match_live`);
			for (const live of liveRows) {
				const found = plans.find((p) => p.opposition === String(live.opposition || "") && p.kickoff === String(live.kickoff || ""));
				const extra = asLineup(live.lineup);
				if (found) found.lineup = {
					...extra,
					...found.lineup
				};
			}
		} catch {}
		try {
			const oldRows = await sql.query(`select opposition, kickoff, formation, kit, lineup from match_plans`);
			for (const old of oldRows) {
				const found = plans.find((p) => p.opposition === String(old.opposition || "") && p.kickoff === String(old.kickoff || ""));
				const extra = asLineup(old.lineup);
				if (found) {
					for (const [k, v] of Object.entries(extra)) if (v && !found.lineup[k]) found.lineup[k] = v;
				} else if (Object.keys(extra).length) plans.push({
					opposition: String(old.opposition || ""),
					kickoff: String(old.kickoff || ""),
					venue: "",
					home: true,
					formation: String(old.formation || "3-3-2"),
					kit: asKit(old.kit),
					lineup: extra,
					brief: {}
				});
			}
		} catch {}
		return { plans };
	} catch (err) {
		console.error("getMatchPlans", err);
		return { plans: [] };
	}
});
var saveMatchPlan_createServerFn_handler = createServerRpc({
	id: "debe10449e40a1948a18dda26ac1304a2b1c8903a72bce52b286651bae96ac2e",
	name: "saveMatchPlan",
	filename: "src/lib/pitch-actions.ts"
}, (opts) => saveMatchPlan.__executeServer(opts));
var saveMatchPlan = createServerFn({ method: "POST" }).validator(object({
	opposition: string().trim().min(1).max(80),
	kickoff: string().trim().min(1).max(32),
	venue: string().trim().max(120),
	home: boolean(),
	formation: string().trim().min(1).max(20),
	kit: _enum(["home", "away"]),
	lineup: record(string(), string()),
	brief: record(string(), object({
		duty: string().max(800).optional(),
		withBall: string().max(1200).optional(),
		withoutBall: string().max(1200).optional()
	})).optional()
})).handler(saveMatchPlan_createServerFn_handler, async ({ data }) => {
	const lineup = asLineup(data.lineup);
	const brief = asBrief(data.brief ?? {});
	const sql = await getSql();
	await ensurePlanTable(sql);
	await sql.query(`insert into plan_saves (opposition, kickoff, venue, home, formation, kit, lineup_json, brief_json)
       values ($1,$2,$3,$4,$5,$6,$7,$8)
       on conflict (opposition, kickoff) do update set
         venue = excluded.venue,
         home = excluded.home,
         formation = excluded.formation,
         kit = excluded.kit,
         lineup_json = excluded.lineup_json,
         brief_json = excluded.brief_json`, [
		data.opposition,
		data.kickoff,
		data.venue || "",
		data.home ? 1 : 0,
		data.formation,
		data.kit,
		JSON.stringify(lineup),
		JSON.stringify(brief)
	]);
	return { success: true };
});
//#endregion
export { getMatchPlans_createServerFn_handler, saveMatchPlan_createServerFn_handler };
