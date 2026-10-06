import { n as createServerFn } from "./ssr.mjs";
import { i as matchSquadPlayer, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { r as TEST_POINTS_FROM } from "./score-from-j42ACoaw.mjs";
import { t as asDayStamp } from "./when-BGtZJU2t.mjs";
import { c as plausibleClock, n as applyClipTimes, s as looksLikeClipLength } from "./fitness-C3S1VXBB.mjs";
import { t as TEST_BONUS } from "./test-bonus-DvKLNi3p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fitness-actions-B9pE30rV.js
function toNum(value) {
	if (value === null || value === void 0 || value === "") return null;
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
}
function officialNum(value, kind) {
	const n = toNum(value);
	if (n == null) return null;
	if (!plausibleClock(kind, n) && kind !== "shooting") return null;
	return n;
}
function mapTest(row) {
	return {
		player: String(row.player),
		testedOn: asDayStamp(row.tested_on) || String(row.tested_on).slice(0, 10),
		zz50NoBall: officialNum(row.zz50_no_ball, "zz50_no"),
		zz50Ball: officialNum(row.zz50_ball, "zz50_ball"),
		sprint30NoBall: officialNum(row.sprint30_no_ball, "s30_no"),
		sprint30Ball: officialNum(row.sprint30_ball, "s30_ball"),
		turns3x4: officialNum(row.turns_3x4, "turns"),
		shootingPts: toNum(row.shooting_pts),
		shootingPower: toNum(row.shooting_power)
	};
}
var optionalTime = string().optional();
var ghostsWiped = false;
var sprintBoardSeeded = false;
var SPRINT_11_SEP = [
	{
		name: "Isa Ali",
		secs: 4.7,
		mph: 14.28,
		speed: 10,
		tech: 5,
		note: "Elite Cat 1/2 Academy Standard (< 4.75s)"
	},
	{
		name: "Kody Cox",
		secs: 4.8,
		mph: 13.98,
		speed: 9,
		tech: 4.5,
		note: "Category 1/2 Academy Standard (< 4.85s)"
	},
	{
		name: "Henry Bearman",
		secs: 4.8,
		mph: 13.98,
		speed: 9,
		tech: 4.5,
		note: "Category 1/2 Academy Standard (< 4.85s)"
	},
	{
		name: "Archie Almond",
		secs: 4.8,
		mph: 13.98,
		speed: 9,
		tech: 4.5,
		note: "Category 1/2 Academy Standard (< 4.85s)"
	},
	{
		name: "Hayden Plumbley",
		secs: 4.8,
		mph: 13.98,
		speed: 9,
		tech: 4.5,
		note: "Category 1/2 Academy Standard (< 4.85s)"
	},
	{
		name: "Jacob Hill",
		secs: 4.9,
		mph: 13.7,
		speed: 8,
		tech: 4.5,
		note: "Academy Development Level (carrying knee injury)"
	},
	{
		name: "William Brittain",
		secs: 4.9,
		mph: 13.7,
		speed: 8,
		tech: 4.5,
		note: "Academy Development Level (< 4.95s)"
	},
	{
		name: "Ruben Biddiss",
		secs: 5.03,
		mph: 13.34,
		speed: 7,
		tech: 4,
		note: "Above National Avg / Academy Pathway Candidate"
	},
	{
		name: "Louie Biddiss",
		secs: 5.1,
		mph: 13.16,
		speed: 7,
		tech: 4.5,
		note: "Above National Avg / Academy Development Candidate"
	},
	{
		name: "Caleb Connelly",
		secs: 5.15,
		mph: 13.03,
		speed: 6,
		tech: 4,
		note: "Above National Avg / Pathway Candidate"
	},
	{
		name: "Jacob Sands",
		secs: 5.2,
		mph: 12.91,
		speed: 6,
		tech: 4,
		note: "Grassroots Upper National Average"
	}
];
async function wipeCameraLengthTests(sql) {
	if (ghostsWiped) return;
	ghostsWiped = true;
	try {
		await sql`
      delete from perf_submissions
      where test_kind in ('s30_no', 's30_ball')
        and coalesce(coach_secs, submitted_secs, 0) > 9
    `;
	} catch {}
}
async function seedFridaySprintBoard(sql) {
	const day = "2026-09-11";
	const stamped = `${day} 18:00:00+01`;
	try {
		await sql`alter table perf_submissions add column if not exists test_points numeric`;
		await sql`alter table perf_submissions add column if not exists start_mark integer`;
		await sql`alter table perf_submissions add column if not exists finish_mark integer`;
		await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
		await sql`alter table perf_submissions alter column technique type numeric using technique::numeric`;
		await sql`alter table perf_submissions alter column test_points type numeric using test_points::numeric`;
	} catch {}
	const have = await sql`
    select player from perf_submissions where test_kind = 's30_no'
  `.catch(() => []);
	const haveSet = new Set(have.map((r) => matchSquadPlayer([...PLAYERS], r.player) || r.player));
	if (sprintBoardSeeded && SPRINT_11_SEP.every((row) => {
		const who = matchSquadPlayer([...PLAYERS], row.name);
		return who ? haveSet.has(who) : true;
	})) return;
	sprintBoardSeeded = true;
	for (const row of SPRINT_11_SEP) {
		const player = matchSquadPlayer([...PLAYERS], row.name);
		if (!player) continue;
		const points = TEST_BONUS.complete + row.speed + row.tech;
		try {
			await sql`
        delete from perf_submissions
        where player = ${player} and test_kind = 's30_no'
      `;
			await sql`
        insert into perf_submissions (
          player, test_kind, submitted_secs, status, coach_secs, technique, coach_note,
          test_points, start_mark, finish_mark, speed_mph, created_at, assessed_at
        )
        values (
          ${player}, 's30_no', ${row.secs}, 'assessed', ${row.secs}, ${row.tech}, ${row.note},
          ${points}, ${TEST_BONUS.complete}, ${row.speed}, ${row.mph},
          ${stamped}::timestamptz, ${stamped}::timestamptz
        )
      `;
			await sql`
        insert into fitness_tests (player, tested_on)
        values (${player}, ${day}::date)
        on conflict (player, tested_on) do nothing
      `;
			await sql`
        update fitness_tests
        set sprint30_no_ball = ${row.secs}
        where player = ${player} and tested_on = ${day}::date
      `;
		} catch {
			sprintBoardSeeded = false;
		}
	}
}
async function loadFitnessTests(sql) {
	await wipeCameraLengthTests(sql);
	await seedFridaySprintBoard(sql);
	try {
		return attachClipMarks(sql, (await sql`
      select player, tested_on, zz50_no_ball, zz50_ball,
             sprint30_no_ball, sprint30_ball, turns_3x4,
             shooting_pts, shooting_power
      from fitness_tests
      order by tested_on asc, player asc
    `).map(mapTest));
	} catch {
		try {
			return attachClipMarks(sql, (await sql`
        select player, tested_on, zz50_no_ball, zz50_ball,
               sprint30_no_ball, sprint30_ball, turns_3x4
        from fitness_tests
        order by tested_on asc, player asc
      `).map((row) => mapTest({
				...row,
				shooting_pts: null,
				shooting_power: null
			})));
		} catch {
			return [];
		}
	}
}
async function attachClipMarks(sql, tests) {
	try {
		try {
			await sql`alter table perf_submissions add column if not exists test_points numeric`;
			await sql`alter table perf_submissions add column if not exists start_mark integer`;
			await sql`alter table perf_submissions add column if not exists finish_mark integer`;
		} catch {}
		let clips = [];
		try {
			await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
		} catch {}
		try {
			clips = await sql`
        select player, test_kind, submitted_secs, coach_secs, test_points, start_mark, finish_mark,
               technique, speed_mph, coach_note, created_at, assessed_at
        from perf_submissions
        where created_at >= ${TEST_POINTS_FROM}::timestamptz
           or coalesce(coach_secs, submitted_secs, test_points) is not null
      `;
		} catch {
			clips = await sql`
        select player, test_kind, submitted_secs, coach_secs, test_points, start_mark, finish_mark,
               technique, created_at, assessed_at
        from perf_submissions
        where created_at >= ${TEST_POINTS_FROM}::timestamptz
           or coalesce(coach_secs, submitted_secs, test_points) is not null
      `;
		}
		const byKey = /* @__PURE__ */ new Map();
		for (const c of clips) {
			const rawSecs = Number(c.coach_secs ?? c.submitted_secs);
			const kind = String(c.test_kind);
			const day = asDayStamp(c.assessed_at) || asDayStamp(c.created_at);
			if (!day || day < "2026-09-11") continue;
			const clock = Number.isFinite(rawSecs) && rawSecs > 0 && rawSecs < 90 ? rawSecs : 0;
			if (clock > 0 && looksLikeClipLength(kind, clock)) continue;
			const techRaw = c.technique == null ? null : Number(c.technique);
			const tech = techRaw != null && Number.isFinite(techRaw) ? Math.max(0, Math.min(5, Math.round(techRaw * 2) / 2)) : 0;
			const speedRaw = Number(c.finish_mark);
			const speed = Number.isFinite(speedRaw) ? Math.max(0, Math.min(10, Math.round(speedRaw))) : 0;
			const storedPts = Number(c.test_points) || 0;
			if (!(storedPts > 0 || tech > 0 || speed > 0 || clock > 0)) continue;
			const points = storedPts > 0 ? storedPts : TEST_BONUS.complete + speed + tech;
			const mphRaw = Number(c.speed_mph);
			const mph = Number.isFinite(mphRaw) && mphRaw > 0 ? mphRaw : null;
			const key = `${matchSquadPlayer([...PLAYERS], String(c.player)) || String(c.player)}|${day}`;
			const list = byKey.get(key) ?? [];
			list.push({
				kind,
				points,
				secs: clock > 0 ? clock : null,
				mph,
				start: TEST_BONUS.complete,
				finish: speed,
				timeGrade: null,
				styleMark: tech,
				note: c.coach_note ? String(c.coach_note) : null
			});
			byKey.set(key, list);
		}
		const squadTests = tests.map((t) => ({
			...t,
			player: matchSquadPlayer([...PLAYERS], t.player) || t.player,
			testedOn: asDayStamp(t.testedOn) || t.testedOn.slice(0, 10)
		}));
		const have = new Set(squadTests.map((t) => `${t.player}|${t.testedOn.slice(0, 10)}`));
		const extra = [];
		for (const [key, marks] of byKey) {
			if (have.has(key)) continue;
			const [player, day] = key.split("|");
			extra.push(applyClipTimes({
				player,
				testedOn: day,
				zz50NoBall: null,
				zz50Ball: null,
				sprint30NoBall: null,
				sprint30Ball: null,
				turns3x4: null,
				shootingPts: null,
				shootingPower: null,
				clipMarks: marks
			}));
		}
		return [...squadTests.map((t) => applyClipTimes({
			...t,
			clipMarks: byKey.get(`${t.player}|${t.testedOn.slice(0, 10)}`) ?? t.clipMarks ?? []
		})), ...extra];
	} catch {
		return tests;
	}
}
var getFitnessTests = createServerFn({ method: "POST" }).handler(createSsrRpc("ff0056a50752d590da573405e2c50951e8b3970abe0d1dcbd5507e74410bb517"));
var saveFitnessTest = createServerFn({ method: "POST" }).validator(object({
	player: string().trim().min(1),
	testedOn: string().trim().min(8).max(10),
	zz50NoBall: optionalTime,
	zz50Ball: optionalTime,
	sprint30NoBall: optionalTime,
	sprint30Ball: optionalTime,
	turns3x4: optionalTime,
	shootingPts: optionalTime,
	shootingPower: optionalTime
})).handler(createSsrRpc("a1480c73af2acc62f891480d8db979082ae2c5ab01a4fc2a676277d57c6d5f56"));
//#endregion
export { loadFitnessTests as n, saveFitnessTest as r, getFitnessTests as t };
