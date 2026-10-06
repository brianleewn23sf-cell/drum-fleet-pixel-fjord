import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, o as number, s as object } from "../_libs/zod.mjs";
import { a as nextMondayStamp, i as localDateStamp, o as weekStartStamp } from "./when-BGtZJU2t.mjs";
import { c as plausibleClock } from "./fitness-C3S1VXBB.mjs";
import { t as PERF_KINDS } from "./perf-kinds-BtI2G2yH.mjs";
import { s as speedScore10, t as TEST_BONUS } from "./test-bonus-DvKLNi3p.mjs";
import { n as loadActiveSquad } from "./squad-C3dFz7Mc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perf-submissions-0ZTtD31u.js
var MAX_CLIP_CHARS = 32e5;
function num(v) {
	if (v === null || v === void 0 || v === "") return null;
	const n = Number(v);
	return Number.isFinite(n) ? n : null;
}
function mapRow(row, includeVideo) {
	return {
		id: Number(row.id),
		player: String(row.player),
		testKind: String(row.test_kind),
		submittedSecs: num(row.submitted_secs),
		videoMime: row.video_mime ? String(row.video_mime) : null,
		videoData: includeVideo && row.video_data ? String(row.video_data) : null,
		status: String(row.status) === "assessed" ? "assessed" : "pending",
		coachSecs: num(row.coach_secs),
		coachNote: String(row.coach_note || ""),
		technique: num(row.technique),
		startMark: num(row.start_mark),
		finishMark: num(row.finish_mark),
		testPoints: num(row.test_points),
		speedMph: num(row.speed_mph),
		createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at || ""),
		assessedAt: row.assessed_at ? row.assessed_at instanceof Date ? row.assessed_at.toISOString() : String(row.assessed_at) : null
	};
}
var submitPerfClip_createServerFn_handler = createServerRpc({
	id: "ad82ab7b2cba2f19afac765687e790259561a06d6c68fc013d35b10847ee61bc",
	name: "submitPerfClip",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => submitPerfClip.__executeServer(opts));
var submitPerfClip = createServerFn({ method: "POST" }).validator(object({
	player: string().trim().min(1).max(80),
	testKind: string().trim().min(1).max(20),
	secs: string().trim().max(12),
	pin: string().trim().min(4).max(80),
	videoMime: string().trim().max(80).optional(),
	videoData: string().max(MAX_CLIP_CHARS).optional()
})).handler(submitPerfClip_createServerFn_handler, async ({ data }) => {
	const { parentFromToken, parentForPin } = await import("./parent-login-a0219ktd.mjs").then((n) => n.s).then((n) => n.s);
	const sql = await getSql();
	const who = data.pin.length > 12 ? await parentFromToken(sql, data.pin) : await parentForPin(sql, data.pin);
	if (!who || who.player !== data.player) return {
		success: false,
		error: "Sign in with your family code first."
	};
	if (!PERF_KINDS.some((k) => k.id === data.testKind)) return {
		success: false,
		error: "Unknown test."
	};
	if (!(await loadActiveSquad(sql)).includes(data.player)) return {
		success: false,
		error: "Pick your child from the squad."
	};
	const typed = Number(data.secs);
	const secs = Number.isFinite(typed) && typed > 0 && plausibleClock(data.testKind, typed) ? typed : 0;
	const mime = data.videoData ? data.videoMime || "video/webm" : null;
	const clip = data.videoData && data.videoData.length < MAX_CLIP_CHARS ? data.videoData : null;
	if (!secs && !clip) return {
		success: false,
		error: "Film or upload a run. The AI times GO to the last cones."
	};
	const weekStart = weekStartStamp();
	try {
		if ((await sql`
        select id from perf_submissions
        where player = ${data.player}
          and test_kind = ${data.testKind}
          and created_at >= ${weekStart}::timestamptz
        limit 1
      `).length >= 1) {
			const [y, m, d] = nextMondayStamp().split("-");
			return {
				success: false,
				error: `This drill is already in for this week. You can send it again from Monday ${d}/${m}.`
			};
		}
	} catch {}
	const id = (await sql`
      insert into perf_submissions (player, test_kind, submitted_secs, video_mime, video_data, status)
      values (${data.player}, ${data.testKind}, ${secs || null}, ${mime}, ${clip}, 'pending')
      returning id
    `)[0]?.id;
	if (id) {
		const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
		await writeAudit({
			actor: who.family || who.player,
			role: "parent",
			action: "clip.submit",
			player: data.player,
			detail: `${data.testKind} · clip in`
		});
		return {
			success: true,
			id,
			clipped: Boolean(clip),
			message: "Sent to the coach to mark. +5, test score /10 and technique /5 are entered by the coach."
		};
	}
	return {
		success: false,
		error: "Could not save that clip."
	};
});
async function applyManualMarks(sql, input) {
	const complete = TEST_BONUS.complete;
	const speed = Math.max(0, Math.min(10, Math.round(input.speedScore)));
	const tech = Math.max(0, Math.min(5, Math.round(input.technique * 2) / 2));
	const points = complete + speed + tech;
	const secs = input.secs > 0 && input.secs < 90 ? input.secs : 0;
	const mph = input.mph != null && input.mph > 0 ? Math.round(input.mph * 10) / 10 : null;
	try {
		await sql`alter table perf_submissions add column if not exists test_points numeric`;
		await sql`alter table perf_submissions add column if not exists start_mark integer`;
		await sql`alter table perf_submissions add column if not exists finish_mark integer`;
		await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
	} catch {}
	try {
		await sql`
      update perf_submissions
      set status = 'assessed',
          coach_secs = ${secs || null},
          technique = ${tech},
          coach_note = ${input.note || "Marked by coach"},
          test_points = ${points},
          start_mark = ${complete},
          finish_mark = ${speed},
          speed_mph = ${mph},
          assessed_at = now()
      where id = ${input.id}
    `;
	} catch {
		await sql`
      update perf_submissions
      set status = 'assessed',
          coach_secs = ${secs || null},
          technique = ${tech},
          coach_note = ${input.note || "Marked by coach"},
          assessed_at = now()
      where id = ${input.id}
    `;
	}
	if (secs > 0) await mergeFitness(sql, input.player, input.kind, secs, localDateStamp());
	return {
		complete,
		speed,
		tech,
		points,
		secs,
		mph
	};
}
var submitCoachPerf_createServerFn_handler = createServerRpc({
	id: "03a33c10fa0a944c9af60832b446c3df3e71a18d1b4d79073d7c6a3d1f2968b5",
	name: "submitCoachPerf",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => submitCoachPerf.__executeServer(opts));
var submitCoachPerf = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(4).max(40),
	player: string().trim().min(1).max(80),
	testKind: string().trim().min(1).max(20),
	secs: string().trim().max(12).optional(),
	mph: string().trim().max(8).optional(),
	speedScore: string().trim().max(4).optional(),
	technique: string().trim().max(4).optional(),
	note: string().trim().max(400).optional(),
	videoMime: string().trim().max(80).optional(),
	videoData: string().max(MAX_CLIP_CHARS).optional()
})).handler(submitCoachPerf_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.pin } });
	if (!who.ok) return {
		success: false,
		error: "Unlock Coach first."
	};
	if (!PERF_KINDS.some((k) => k.id === data.testKind)) return {
		success: false,
		error: "Unknown test."
	};
	const sql = await getSql();
	if (!(await loadActiveSquad(sql)).includes(data.player)) return {
		success: false,
		error: "Pick a lad from the squad."
	};
	const typed = Number(data.secs);
	const secs = Number.isFinite(typed) && typed > 0 && typed < 90 ? typed : 0;
	const mphTyped = Number(data.mph);
	const mph = Number.isFinite(mphTyped) && mphTyped > 0 && mphTyped < 30 ? mphTyped : null;
	const speedTyped = Number(data.speedScore);
	const speedScore = Number.isFinite(speedTyped) ? Math.max(0, Math.min(10, Math.round(speedTyped))) : 0;
	const techRaw = data.technique == null || data.technique === "" ? 0 : Number(data.technique);
	if (!Number.isFinite(techRaw) || techRaw < 0 || techRaw > 5) return {
		success: false,
		error: "Running technique is out of 5."
	};
	const tech = Math.round(techRaw);
	if (!secs && speedScore === 0 && tech === 0) return {
		success: false,
		error: "Enter time, test score /10 or technique /5."
	};
	const mime = data.videoData ? data.videoMime || "video/webm" : null;
	const clip = data.videoData && data.videoData.length < MAX_CLIP_CHARS ? data.videoData : null;
	const weekStart = weekStartStamp();
	try {
		await sql`alter table perf_submissions add column if not exists technique integer`;
		await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
	} catch {}
	let id = (await sql`
      select id from perf_submissions
      where player = ${data.player}
        and test_kind = ${data.testKind}
        and created_at >= ${weekStart}::timestamptz
      order by id desc
      limit 1
    `.catch(() => []))[0]?.id ?? 0;
	if (id) await sql`
        update perf_submissions
        set submitted_secs = ${secs || null},
            video_mime = ${mime},
            video_data = ${clip},
            status = 'assessed',
            coach_secs = ${secs || null},
            technique = ${tech},
            coach_note = ${data.note || "Marked by coach"},
            assessed_at = now()
        where id = ${id}
      `.catch(async () => {
		await sql`
          update perf_submissions
          set submitted_secs = ${secs || null},
              status = 'assessed',
              coach_secs = ${secs || null},
              coach_note = ${data.note || "Marked by coach"},
              assessed_at = now()
          where id = ${id}
        `;
	});
	else id = (await sql`
        insert into perf_submissions (
          player, test_kind, submitted_secs, video_mime, video_data,
          status, coach_secs, technique, coach_note, assessed_at
        )
        values (
          ${data.player}, ${data.testKind}, ${secs || null}, ${mime}, ${clip},
          'assessed', ${secs || null}, ${tech}, ${data.note || "Marked by coach"}, now()
        )
        returning id
      `.catch(async () => sql`
          insert into perf_submissions (
            player, test_kind, submitted_secs, status, coach_secs, coach_note, assessed_at
          )
          values (
            ${data.player}, ${data.testKind}, ${secs || null}, 'assessed', ${secs || null},
            ${data.note || "Marked by coach"}, now()
          )
          returning id
        `))[0]?.id ?? 0;
	if (!id) return {
		success: false,
		error: "Could not save that test."
	};
	const marked = await applyManualMarks(sql, {
		id,
		player: data.player,
		kind: data.testKind,
		secs,
		mph,
		speedScore,
		technique: tech,
		note: data.note || "Marked by coach"
	});
	const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
	await writeAudit({
		actor: who.name,
		role: who.role,
		action: "clip.coach_upload",
		player: data.player,
		detail: `${data.testKind} · ${marked.secs || "—"}s · ${marked.mph ?? "—"} mph · ${marked.points}/20`
	});
	return {
		success: true,
		id,
		message: `Saved. +5 attempt, test ${marked.speed}/10, technique ${marked.tech}/5. Total ${marked.points}/20.`
	};
});
var peekPerfFrames_createServerFn_handler = createServerRpc({
	id: "79e321ffc4d1cf01345c8d4c512d8e418559231e40df16b8a0e6d69742dea5e2",
	name: "peekPerfFrames",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => peekPerfFrames.__executeServer(opts));
var peekPerfFrames = createServerFn({ method: "POST" }).validator(object({
	id: number(),
	pin: string().trim().min(4).max(80)
})).handler(peekPerfFrames_createServerFn_handler, async ({ data }) => {
	const clip = await (await getSql())`
      select video_data, video_mime, player, test_kind from perf_submissions where id = ${data.id}
    `.catch(() => []);
	if (!clip[0]?.video_data) return {
		count: 0,
		duration: 0,
		stamps: [],
		kind: ""
	};
	const { extractClipFramesCached } = await import("./clip-frames-DvxCQOjr.mjs");
	const extracted = await extractClipFramesCached(`perf-${data.id}`, String(clip[0].video_data), clip[0].video_mime ? String(clip[0].video_mime) : "video/webm", 12);
	return {
		count: extracted.frames.length,
		duration: Math.round(extracted.duration * 10) / 10,
		stamps: extracted.frames.map((f) => f.t),
		kind: String(clip[0].test_kind || "")
	};
});
var scanPerfClip_createServerFn_handler = createServerRpc({
	id: "38abcdaa98ca897ef46b5b7abafd6cfff00ad75a1f783602478fed3ccb9f4a9f",
	name: "scanPerfClip",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => scanPerfClip.__executeServer(opts));
var scanPerfClip = createServerFn({ method: "POST" }).validator(object({
	id: number(),
	pin: string().trim().min(4).max(80)
})).handler(scanPerfClip_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const row = await sql`
      select player, test_kind, submitted_secs, technique from perf_submissions where id = ${data.id}
    `.catch(() => []);
	if (!row[0]) return {
		success: false,
		error: "Clip not found."
	};
	const secs = Number(row[0].submitted_secs) || 0;
	const scored = await autoMarkSubmission(sql, {
		id: data.id,
		player: String(row[0].player),
		kind: String(row[0].test_kind),
		secs,
		technique: row[0].technique == null ? null : Number(row[0].technique)
	});
	return {
		success: true,
		officialSecs: scored.officialSecs,
		technique: scored.technique,
		speed: scored.speed,
		points: scored.points,
		ageLabel: scored.ageLabel,
		feedback: scored.feedback,
		style: scored.style
	};
});
var wipeYesterdayTests_createServerFn_handler = createServerRpc({
	id: "cc1c2b895defc5eea7c618795cfba3826a9a1b13e573d1f5c0a6a985df2e3932",
	name: "wipeYesterdayTests",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => wipeYesterdayTests.__executeServer(opts));
var wipeYesterdayTests = createServerFn({ method: "POST" }).handler(wipeYesterdayTests_createServerFn_handler, async () => {
	const sql = await getSql();
	let clips = 0;
	let sheets = 0;
	try {
		const n = await sql`select count(*)::int as n from perf_submissions`;
		clips = Number(n[0]?.n ?? 0);
		await sql`delete from perf_submissions`;
	} catch {}
	try {
		const n = await sql`select count(*)::int as n from fitness_tests`;
		sheets = Number(n[0]?.n ?? 0);
		await sql`delete from fitness_tests`;
	} catch {}
	return {
		ok: true,
		clips,
		sheets
	};
});
var recordLouieSprint_createServerFn_handler = createServerRpc({
	id: "1bd11a6ba494e5a2e03fcef8e2bc9008846c948191d61e96a1da4fff35146259",
	name: "recordLouieSprint",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => recordLouieSprint.__executeServer(opts));
var recordLouieSprint = createServerFn({ method: "POST" }).handler(recordLouieSprint_createServerFn_handler, async () => {
	const sql = await getSql();
	const player = "4) Louie Biddiss";
	const kind = "s30_no";
	const official = 5.3;
	const tech = 4;
	const speed = speedScore10(kind, official);
	const points = TEST_BONUS.complete + speed + tech;
	const day = localDateStamp();
	const note = "Well done Louie — strong for age 11. Linear speed no ball 5.3s GO to last cones (not the 21.8s camera). Attempt +5. Speed 8/10. Running style 4/5. Total 17/20. Tall hips, arms pumping, drove through the green cones. Superb.";
	try {
		await sql`alter table perf_submissions add column if not exists test_points numeric`;
		await sql`alter table perf_submissions add column if not exists start_mark integer`;
		await sql`alter table perf_submissions add column if not exists finish_mark integer`;
	} catch {}
	await sql`
    delete from perf_submissions
    where player = ${player} and test_kind = ${kind}
      and created_at >= ${day}::timestamptz
  `.catch(() => void 0);
	await sql`
    insert into perf_submissions (
      player, test_kind, submitted_secs, status, coach_secs, technique,
      coach_note, test_points, start_mark, finish_mark, assessed_at
    )
    values (
      ${player}, ${kind}, ${official}, 'assessed', ${official}, ${tech},
      ${note}, ${points}, ${TEST_BONUS.complete}, ${speed}, now()
    )
  `;
	await mergeFitness(sql, player, kind, official, day);
	return {
		ok: true,
		player,
		official,
		speed,
		tech,
		points,
		day
	};
});
var listParentPerf_createServerFn_handler = createServerRpc({
	id: "09c945e6ab180cef49e746f64c48524d86f1bae92c3ef403e9973a79d417d339",
	name: "listParentPerf",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => listParentPerf.__executeServer(opts));
var listParentPerf = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().min(4).max(80) })).handler(listParentPerf_createServerFn_handler, async ({ data }) => {
	const { parentFromToken, parentForPin } = await import("./parent-login-a0219ktd.mjs").then((n) => n.s).then((n) => n.s);
	const sql = await getSql();
	const who = data.pin.length > 12 ? await parentFromToken(sql, data.pin) : await parentForPin(sql, data.pin);
	if (!who) return {
		rows: [],
		usedThisWeek: []
	};
	const weekStart = weekStartStamp();
	let rows = [];
	try {
		rows = await sql`
        select id, player, test_kind, submitted_secs, video_mime, null as video_data,
               status, coach_secs, coach_note, technique, start_mark, finish_mark, test_points, speed_mph,
               created_at, assessed_at
        from perf_submissions
        where player = ${who.player}
        order by created_at desc
        limit 40
      `;
	} catch {
		rows = await sql`
        select id, player, test_kind, submitted_secs, video_mime, null as video_data,
               status, coach_secs, coach_note, technique, created_at, assessed_at
        from perf_submissions
        where player = ${who.player}
        order by created_at desc
        limit 40
      `.catch(() => []);
	}
	const used = await sql`
      select test_kind from perf_submissions
      where player = ${who.player} and created_at >= ${weekStart}::timestamptz
    `.catch(() => []);
	return {
		rows: rows.map((r) => mapRow(r, false)),
		usedThisWeek: used.map((r) => String(r.test_kind))
	};
});
var listPerfInbox_createServerFn_handler = createServerRpc({
	id: "354981b15578da426efa7ab3772bdeafa2df47aa22ecc1cad6c494592ef49e4d",
	name: "listPerfInbox",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => listPerfInbox.__executeServer(opts));
var listPerfInbox = createServerFn({ method: "POST" }).handler(listPerfInbox_createServerFn_handler, async () => {
	const sql = await getSql();
	let rows = [];
	try {
		rows = await sql`
      select id, player, test_kind, submitted_secs, video_mime,
             case when status = 'pending' then video_data else null end as video_data,
             status, coach_secs, coach_note, technique, start_mark, finish_mark, test_points, speed_mph,
             created_at, assessed_at
      from perf_submissions
      order by created_at desc
      limit 40
    `;
	} catch {
		rows = await sql`
      select id, player, test_kind, submitted_secs, video_mime,
             case when status = 'pending' then video_data else null end as video_data,
             status, coach_secs, coach_note, technique, created_at, assessed_at
      from perf_submissions
      order by created_at desc
      limit 40
    `.catch(() => []);
	}
	return { rows: rows.map((r) => mapRow(r, true)) };
});
var assessPerf_createServerFn_handler = createServerRpc({
	id: "b2af2800dced0e6db20c7eb1ce0f6341127f0b21dfb68c2cdb0e113654f576d4",
	name: "assessPerf",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => assessPerf.__executeServer(opts));
var assessPerf = createServerFn({ method: "POST" }).validator(object({
	id: number().int().positive(),
	coachSecs: string().trim().max(12),
	mph: string().trim().max(8).optional(),
	speedScore: string().trim().max(4).optional(),
	technique: string().trim().max(4).optional(),
	note: string().trim().max(400).optional()
})).handler(assessPerf_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const secs = Number(data.coachSecs);
	const clock = Number.isFinite(secs) && secs > 0 && secs < 90 ? secs : 0;
	const mphTyped = Number(data.mph);
	const mph = Number.isFinite(mphTyped) && mphTyped > 0 ? mphTyped : null;
	const speedTyped = Number(data.speedScore);
	const speedScore = Number.isFinite(speedTyped) ? Math.max(0, Math.min(10, Math.round(speedTyped))) : 0;
	const techRaw = data.technique == null || data.technique === "" ? 0 : Number(data.technique);
	const tech = Number.isFinite(techRaw) ? Math.max(0, Math.min(5, Math.round(techRaw))) : 0;
	if (!clock && speedScore === 0 && tech === 0) return {
		success: false,
		error: "Enter time, test score /10 or technique /5."
	};
	const row = (await sql`
      select player, test_kind from perf_submissions where id = ${data.id}
    `.catch(() => []))[0];
	if (!row) return {
		success: false,
		error: "Could not find that clip."
	};
	return {
		success: true,
		message: `Saved. Total ${(await applyManualMarks(sql, {
			id: data.id,
			player: row.player,
			kind: String(row.test_kind),
			secs: clock,
			mph,
			speedScore,
			technique: tech,
			note: data.note || ""
		})).points}/20.`
	};
});
var scoreOpenPerf_createServerFn_handler = createServerRpc({
	id: "342b9fd2ea4833f79d71c86b985a0cb5b9540c0ac49773ada0675fbafb989e73",
	name: "scoreOpenPerf",
	filename: "src/lib/perf-submissions.ts"
}, (opts) => scoreOpenPerf.__executeServer(opts));
var scoreOpenPerf = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().min(4).max(40) })).handler(scoreOpenPerf_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	if (!(await checkCoachPin({ data: { pin: data.pin } })).ok) return { scored: 0 };
	return { scored: 0 };
});
async function autoMarkSubmission(sql, input) {
	let id = input.id;
	if (!id) id = (await sql`
      select id from perf_submissions
      where player = ${input.player} and test_kind = ${input.kind}
      order by id desc
      limit 1
    `.catch(() => []))[0]?.id;
	let videoB64 = null;
	let videoMime = null;
	if (id) {
		const clip = await sql`
      select video_data, video_mime from perf_submissions where id = ${id}
    `.catch(() => []);
		if (clip[0]?.video_data) {
			videoB64 = String(clip[0].video_data);
			videoMime = clip[0].video_mime ? String(clip[0].video_mime) : "video/webm";
		}
	}
	const { grokPerfScore } = await import("./perf-coach-Dlrbx2a8.mjs");
	const scored = await grokPerfScore({
		player: input.player,
		kind: input.kind,
		secs: input.secs,
		videoB64,
		videoMime,
		cacheKey: id ? `perf-${id}` : void 0
	});
	const clock = scored.officialSecs > 0 ? scored.officialSecs : input.secs;
	const official = input.kind === "shooting" || plausibleClock(input.kind, clock) ? clock : 0;
	const rawTech = input.technique != null && Number.isFinite(input.technique) ? Math.round(input.technique) : scored.technique;
	const tech = Math.max(0, Math.min(5, rawTech > 5 ? Math.round(rawTech / 2) : rawTech));
	const speed = official > 0 ? scored.speed : 0;
	const points = TEST_BONUS.complete + speed + tech;
	const prior = String(input.note || "").trim();
	const note = !prior || /^uploaded by coach$/i.test(prior) || /linear speed|zig-zag|turning test|shooting clip|Total \d+\/20/i.test(prior) ? scored.feedback : prior;
	if (id) {
		try {
			await sql`alter table perf_submissions add column if not exists test_points numeric`;
			await sql`alter table perf_submissions add column if not exists start_mark integer`;
			await sql`alter table perf_submissions add column if not exists finish_mark integer`;
		} catch {}
		try {
			await sql`
        update perf_submissions
        set status = 'assessed',
            coach_secs = ${official || null},
            technique = ${tech},
            coach_note = ${note},
            test_points = ${points},
            start_mark = ${TEST_BONUS.complete},
            finish_mark = ${speed},
            assessed_at = now()
        where id = ${id}
      `;
		} catch {
			await sql`
        update perf_submissions
        set status = 'assessed',
            coach_secs = ${official || null},
            technique = ${tech},
            coach_note = ${note},
            assessed_at = now()
        where id = ${id}
      `;
		}
	}
	if (official > 0) await mergeFitness(sql, input.player, input.kind, official, localDateStamp());
	return {
		...scored,
		officialSecs: official,
		technique: tech,
		speed,
		points,
		start: TEST_BONUS.complete,
		feedback: note
	};
}
async function mergeFitness(sql, player, kind, secs, day) {
	if (kind !== "shooting" && !plausibleClock(kind, secs)) return;
	try {
		await sql`
      insert into fitness_tests (player, tested_on)
      values (${player}, ${day}::date)
      on conflict (player, tested_on) do nothing
    `;
		if (kind === "zz50_no") await sql`update fitness_tests set zz50_no_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
		else if (kind === "zz50_ball") await sql`update fitness_tests set zz50_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
		else if (kind === "s30_no") await sql`update fitness_tests set sprint30_no_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
		else if (kind === "s30_ball") await sql`update fitness_tests set sprint30_ball = ${secs} where player = ${player} and tested_on = ${day}::date`;
		else if (kind === "turns") await sql`update fitness_tests set turns_3x4 = ${secs} where player = ${player} and tested_on = ${day}::date`;
	} catch {}
}
//#endregion
export { assessPerf_createServerFn_handler, listParentPerf_createServerFn_handler, listPerfInbox_createServerFn_handler, peekPerfFrames_createServerFn_handler, recordLouieSprint_createServerFn_handler, scanPerfClip_createServerFn_handler, scoreOpenPerf_createServerFn_handler, submitCoachPerf_createServerFn_handler, submitPerfClip_createServerFn_handler, wipeYesterdayTests_createServerFn_handler };
