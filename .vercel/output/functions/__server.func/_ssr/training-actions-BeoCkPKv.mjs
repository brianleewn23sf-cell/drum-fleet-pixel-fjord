import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { i as matchSquadPlayer } from "./players-CZr5uoUS.mjs";
import { i as boolean, l as string, o as number, r as array, s as object } from "../_libs/zod.mjs";
import { t as asDayStamp } from "./when-BGtZJU2t.mjs";
import { n as loadActiveSquad } from "./squad-C3dFz7Mc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-actions-BeoCkPKv.js
function toInt(value) {
	if (value === null || value === void 0 || value === "") return null;
	const n = Number(value);
	return Number.isFinite(n) ? n : null;
}
var ten = number().int().min(0).max(10).nullable();
var markInput = object({
	player: string().trim().min(1),
	attended: boolean(),
	score: ten,
	effort: ten,
	attitude: ten,
	achievement: ten
});
function asAttended(value) {
	if (value === true || value === 1 || value === "1") return true;
	if (typeof value === "string" && value.toLowerCase() === "true") return true;
	return Number(value) === 1;
}
function groupRows(rows) {
	const map = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const sessionDate = asDayStamp(row.session_date) || String(row.session_date ?? "").slice(0, 10);
		const player = String(row.player || "").trim();
		if (!player) continue;
		const day = /^\d{4}-\d{2}-\d{2}$/.test(sessionDate) ? sessionDate : asDayStamp(row.session_date);
		if (!day) continue;
		let session = map.get(day);
		if (!session) {
			session = {
				sessionDate: day,
				label: String(row.label || "").trim(),
				marks: []
			};
			map.set(day, session);
		}
		if (!session.label && row.label) session.label = String(row.label).trim();
		const effort = toInt(row.effort) ?? toInt(row.score);
		session.marks.push({
			player,
			attended: asAttended(row.attended),
			score: toInt(row.score),
			effort,
			attitude: toInt(row.attitude),
			achievement: toInt(row.achievement)
		});
	}
	return [...map.values()];
}
async function loadSessions(sql) {
	let sessions = [];
	try {
		sessions = groupRows(await sql`
        select session_date, player, attended, score, effort, attitude, achievement, label
        from training_attendance
        order by session_date desc, player asc
      `);
	} catch {
		try {
			sessions = groupRows(await sql`
          select session_date, player, attended, score, attitude, label
          from training_attendance
          order by session_date desc, player asc
        `);
		} catch {
			sessions = groupRows(await sql`
          select session_date, player, attended, score, label
          from training_attendance
          order by session_date desc, player asc
        `);
		}
	}
	try {
		const squad = await loadActiveSquad(sql);
		for (const session of sessions) session.marks = session.marks.map((m) => ({
			...m,
			player: matchSquadPlayer(squad, m.player) || m.player
		}));
	} catch {}
	return sessions;
}
var getTraining_createServerFn_handler = createServerRpc({
	id: "dc4cb165c1857d75aaaebaf06131863304292d5af5a17820e28b723e1a41ddfa",
	name: "getTraining",
	filename: "src/lib/training-actions.ts"
}, (opts) => getTraining.__executeServer(opts));
var getTraining = createServerFn({ method: "POST" }).handler(getTraining_createServerFn_handler, async () => {
	const sql = await getSql();
	try {
		return { sessions: await loadSessions(sql) };
	} catch {
		return { sessions: [] };
	}
});
var saveTraining_createServerFn_handler = createServerRpc({
	id: "2302f5096ceb089948e4027485616233e37065c570d678f30054253990b417bf",
	name: "saveTraining",
	filename: "src/lib/training-actions.ts"
}, (opts) => saveTraining.__executeServer(opts));
var saveTraining = createServerFn({ method: "POST" }).validator(object({
	sessionDate: string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
	label: string().trim().max(80),
	marks: array(markInput).max(30)
})).handler(saveTraining_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const squad = await loadActiveSquad(sql);
	const marks = data.marks.map((m) => ({
		...m,
		player: matchSquadPlayer(squad, m.player) || m.player
	}));
	if (!marks.length) return {
		success: false,
		error: "No players to save.",
		sessions: await loadSessions(sql)
	};
	await sql`delete from training_attendance where session_date = ${data.sessionDate}`;
	for (const mark of marks) {
		const attended = mark.attended ? 1 : 0;
		const effort = mark.attended ? mark.effort : null;
		const attitude = mark.attended ? mark.attitude : null;
		const achievement = mark.attended ? mark.achievement : null;
		const score = effort;
		try {
			await sql`
          insert into training_attendance
            (session_date, player, attended, score, effort, attitude, achievement, label)
          values
            (${data.sessionDate}, ${mark.player}, ${attended}, ${score}, ${effort}, ${attitude}, ${achievement}, ${data.label})
        `;
		} catch {
			try {
				await sql`
            insert into training_attendance (session_date, player, attended, score, attitude, label)
            values (${data.sessionDate}, ${mark.player}, ${attended}, ${score}, ${attitude}, ${data.label})
          `;
			} catch {
				await sql`
            insert into training_attendance (session_date, player, attended, score, label)
            values (${data.sessionDate}, ${mark.player}, ${attended}, ${score}, ${data.label})
          `;
			}
		}
	}
	return {
		success: true,
		sessions: await loadSessions(sql)
	};
});
//#endregion
export { getTraining_createServerFn_handler, saveTraining_createServerFn_handler };
