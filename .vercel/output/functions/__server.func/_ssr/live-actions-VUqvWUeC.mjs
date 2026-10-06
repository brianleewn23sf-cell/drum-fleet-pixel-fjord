import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { r as isSquadPlayer } from "./players-CZr5uoUS.mjs";
import { c as record, l as string, s as object } from "../_libs/zod.mjs";
import { l as formationById, s as SUB_SLOTS, t as BENCH_SLOTS, u as remapLineup } from "./formations-pQSTjnGH.mjs";
import { i as gameMinute } from "./minutes-BluTvm9p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-actions-VUqvWUeC.js
function asLineup(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const next = {};
	for (const [key, raw] of Object.entries(value)) {
		const player = String(raw || "").trim();
		if (player && isSquadPlayer(player)) next[key] = player;
	}
	return next;
}
function asBool(value) {
	return value === true || value === 1 || value === "1" || value === "t" || value === "true";
}
function asStartedAt(value) {
	if (value == null || value === "") return null;
	if (value instanceof Date) {
		const t = value.getTime();
		return Number.isFinite(t) ? value.toISOString() : null;
	}
	const t = Date.parse(String(value));
	return Number.isFinite(t) ? new Date(t).toISOString() : null;
}
function clockFromRow(row) {
	if (!row) return {
		startedAt: null,
		elapsedMs: 0,
		running: false,
		ended: false,
		half: 1,
		halfMarkMs: 0
	};
	return {
		startedAt: asStartedAt(row.started_at),
		elapsedMs: Number(row.elapsed_ms) || 0,
		running: asBool(row.running),
		ended: asBool(row.ended),
		half: Number(row.half) === 2 ? 2 : 1,
		halfMarkMs: Number(row.half_mark_ms) || 0
	};
}
function stintFromRow(row) {
	return {
		id: Number(row.id) || 0,
		player: String(row.player || ""),
		slotId: String(row.slot_id || ""),
		onMinute: Number(row.on_minute) || 0,
		offMinute: row.off_minute === null || row.off_minute === void 0 ? null : Number(row.off_minute),
		started: Boolean(row.started)
	};
}
async function writeLiveLineup(sql, opposition, kickoff, lineup, extra) {
	const blob = JSON.stringify(lineup);
	if (extra?.formation) {
		await sql`
      update match_live
      set formation = ${extra.formation}, lineup = ${blob}::jsonb
      where opposition = ${opposition} and kickoff = ${kickoff}
    `;
		return;
	}
	await sql`
    update match_live set lineup = ${blob}::jsonb
    where opposition = ${opposition} and kickoff = ${kickoff}
  `;
}
async function loadLive(sql, opposition, kickoff) {
	try {
		let rows = [];
		try {
			rows = await sql`
        select opposition, kickoff, started_at, elapsed_ms, running, ended, formation, lineup, half, half_mark_ms
        from match_live
        where opposition = ${opposition} and kickoff = ${kickoff}
        limit 1
      `;
		} catch {
			rows = await sql`
        select opposition, kickoff, started_at, elapsed_ms, running, ended, formation, lineup
        from match_live
        where opposition = ${opposition} and kickoff = ${kickoff}
        limit 1
      `;
		}
		const row = rows[0];
		if (!row) return null;
		const stintRows = await sql`
      select id, player, slot_id, on_minute, off_minute, started
      from match_stints
      where opposition = ${opposition} and kickoff = ${kickoff}
      order by on_minute asc, id asc
    `;
		const shapeRows = await sql`
      select minute, formation from match_shape_changes
      where opposition = ${opposition} and kickoff = ${kickoff}
      order by id asc
    `;
		return {
			opposition,
			kickoff,
			formation: String(row.formation || "3-3-2"),
			lineup: asLineup(row.lineup),
			clock: clockFromRow(row),
			stints: stintRows.map(stintFromRow),
			shapes: shapeRows.map((s) => ({
				minute: Number(s.minute) || 0,
				formation: String(s.formation || "")
			}))
		};
	} catch {
		return null;
	}
}
async function currentMinute(sql, opposition, kickoff) {
	const live = await loadLive(sql, opposition, kickoff);
	if (!live) return 0;
	return gameMinute(live.clock);
}
var gameKey = object({
	opposition: string().trim().min(1).max(80),
	kickoff: string().trim().min(1).max(24)
});
var getLiveMatch_createServerFn_handler = createServerRpc({
	id: "10b78cb9f0ac920ea74ec7e5e3d336d9328e4e2952ba4799ee772f05227a9897",
	name: "getLiveMatch",
	filename: "src/lib/live-actions.ts"
}, (opts) => getLiveMatch.__executeServer(opts));
var getLiveMatch = createServerFn({ method: "POST" }).validator(gameKey).handler(getLiveMatch_createServerFn_handler, async ({ data }) => {
	return { live: await loadLive(await getSql(), data.opposition, data.kickoff) };
});
var getAllMinutes_createServerFn_handler = createServerRpc({
	id: "b1a8a7db31b5635ebc3c696a3b05be7101e1ea4bbaa3e42341675d1e43ceac13",
	name: "getAllMinutes",
	filename: "src/lib/live-actions.ts"
}, (opts) => getAllMinutes.__executeServer(opts));
var getAllMinutes = createServerFn({ method: "POST" }).handler(getAllMinutes_createServerFn_handler, async () => {
	const sql = await getSql();
	try {
		const games = await sql`
      select opposition, kickoff, started_at, elapsed_ms, running, ended, formation
      from match_live
      order by kickoff asc
    `;
		const stintRows = await sql`
      select id, opposition, kickoff, player, slot_id, on_minute, off_minute, started
      from match_stints
      order by kickoff asc, on_minute asc
    `;
		return {
			games: games.map((g) => ({
				opposition: String(g.opposition || ""),
				kickoff: String(g.kickoff || ""),
				clock: clockFromRow(g),
				formation: String(g.formation || "")
			})),
			stints: stintRows.map((r) => ({
				...stintFromRow(r),
				opposition: String(r.opposition || ""),
				kickoff: String(r.kickoff || "")
			}))
		};
	} catch {
		return {
			games: [],
			stints: []
		};
	}
});
var startLive_createServerFn_handler = createServerRpc({
	id: "0ba188fd228e666faba702dfebe18f10fdb34eb4733cf42864382931da05ad01",
	name: "startLive",
	filename: "src/lib/live-actions.ts"
}, (opts) => startLive.__executeServer(opts));
var startLive = createServerFn({ method: "POST" }).validator(gameKey.extend({
	formation: string().trim().min(1).max(20),
	lineup: record(string(), string())
})).handler(startLive_createServerFn_handler, async ({ data }) => {
	const lineup = asLineup(data.lineup);
	const sql = await getSql();
	const existing = await loadLive(sql, data.opposition, data.kickoff);
	if (existing?.clock.ended) throw new Error("This game is already finished.");
	const startedAt = (/* @__PURE__ */ new Date()).toISOString();
	if (existing?.clock.running || existing && existing.stints.length) {
		await sql`
        update match_live
        set running = true, started_at = ${startedAt}::timestamptz, ended = false
        where opposition = ${data.opposition} and kickoff = ${data.kickoff}
      `;
		return { live: await loadLive(sql, data.opposition, data.kickoff) };
	}
	await sql`
      insert into match_live (opposition, kickoff, started_at, elapsed_ms, running, ended, formation, lineup, half, half_mark_ms)
      values (${data.opposition}, ${data.kickoff}, ${startedAt}::timestamptz, 0, true, false, ${data.formation}, ${JSON.stringify(lineup)}::jsonb, 1, 0)
      on conflict (opposition, kickoff) do update set
        started_at = ${startedAt}::timestamptz, elapsed_ms = 0, running = true, ended = false,
        formation = excluded.formation, lineup = excluded.lineup, half = 1, half_mark_ms = 0
    `;
	const starters = formationById(data.formation).slots.map((slot) => ({
		slot: slot.id,
		player: lineup[slot.id]
	})).filter((row) => row.player);
	if (starters.length) {
		const values = starters.map((_, i) => {
			const n = i * 2;
			return `($1, $2, $${n + 3}, $${n + 4}, 0, null, true)`;
		}).join(", ");
		const params = [data.opposition, data.kickoff];
		for (const row of starters) params.push(row.player, row.slot);
		await sql.query(`insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started) values ${values}`, params);
	}
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var pauseLive_createServerFn_handler = createServerRpc({
	id: "8379976b0ed6dbb99fef817e4fcaca9106489933897ecff1c36b901b6463ecda",
	name: "pauseLive",
	filename: "src/lib/live-actions.ts"
}, (opts) => pauseLive.__executeServer(opts));
var pauseLive = createServerFn({ method: "POST" }).validator(gameKey).handler(pauseLive_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live?.clock.running) return { live };
	const extra = live.clock.startedAt ? Math.max(0, Date.now() - new Date(live.clock.startedAt).getTime()) : 0;
	await sql`
      update match_live
      set running = false, elapsed_ms = ${live.clock.elapsedMs + extra}, started_at = null
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var resumeLive_createServerFn_handler = createServerRpc({
	id: "e37748175468315031130692acb336a22b18721b8bedd06d5477e92b0f6b896f",
	name: "resumeLive",
	filename: "src/lib/live-actions.ts"
}, (opts) => resumeLive.__executeServer(opts));
var resumeLive = createServerFn({ method: "POST" }).validator(gameKey).handler(resumeLive_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await sql`
      update match_live
      set running = true, started_at = ${(/* @__PURE__ */ new Date()).toISOString()}::timestamptz, ended = false
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var secondHalfLive_createServerFn_handler = createServerRpc({
	id: "ca9b0bdd986da4568b26eb63f498e532c0c0a44524647248a6946e2f399e2824",
	name: "secondHalfLive",
	filename: "src/lib/live-actions.ts"
}, (opts) => secondHalfLive.__executeServer(opts));
var secondHalfLive = createServerFn({ method: "POST" }).validator(gameKey).handler(secondHalfLive_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	const extra = live.clock.running && live.clock.startedAt ? Math.max(0, Date.now() - new Date(live.clock.startedAt).getTime()) : 0;
	const elapsed = live.clock.elapsedMs + extra;
	await sql`
      update match_live
      set half = 2, half_mark_ms = ${elapsed}, running = false, elapsed_ms = ${elapsed}, started_at = null
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var fullTimeLive_createServerFn_handler = createServerRpc({
	id: "c5e8f8e2b93408f7c5fa5a2531e07e5ddf320e13d3100541f5cd8e2b2f4f1a77",
	name: "fullTimeLive",
	filename: "src/lib/live-actions.ts"
}, (opts) => fullTimeLive.__executeServer(opts));
var fullTimeLive = createServerFn({ method: "POST" }).validator(gameKey).handler(fullTimeLive_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	const extra = live.clock.running && live.clock.startedAt ? Math.max(0, Date.now() - new Date(live.clock.startedAt).getTime()) : 0;
	const elapsed = live.clock.elapsedMs + extra;
	const minute = Math.floor(elapsed / 6e4);
	await sql`
      update match_live
      set running = false, ended = true, elapsed_ms = ${elapsed}, started_at = null
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
    `;
	await sql`
      update match_stints
      set off_minute = ${minute}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff} and off_minute is null
    `;
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var liveSub_createServerFn_handler = createServerRpc({
	id: "9e170bc821f5c5805f6607e218b26ebbaf12fb960a2903268133115790076193",
	name: "liveSub",
	filename: "src/lib/live-actions.ts"
}, (opts) => liveSub.__executeServer(opts));
var liveSub = createServerFn({ method: "POST" }).validator(gameKey.extend({
	offPlayer: string().trim().min(1),
	onPlayer: string().trim().min(1)
})).handler(liveSub_createServerFn_handler, async ({ data }) => {
	if (!isSquadPlayer(data.offPlayer) || !isSquadPlayer(data.onPlayer)) throw new Error("Pick squad players.");
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	if (live.clock.ended) throw new Error("Game is finished.");
	const minute = await currentMinute(sql, data.opposition, data.kickoff);
	const lineup = { ...live.lineup };
	const offSlot = Object.entries(lineup).find(([, p]) => p === data.offPlayer)?.[0];
	if (!offSlot || !formationById(live.formation).slots.some((s) => s.id === offSlot)) throw new Error("That lad is not on the pitch.");
	if (new Set(formationById(live.formation).slots.map((s) => lineup[s.id])).has(data.onPlayer)) throw new Error("That lad is already on.");
	const benchSlot = Object.entries(lineup).find(([, p]) => p === data.onPlayer)?.[0];
	lineup[offSlot] = data.onPlayer;
	if (benchSlot) lineup[benchSlot] = data.offPlayer;
	else {
		const empty = SUB_SLOTS.find((id) => !lineup[id]);
		if (empty) lineup[empty] = data.offPlayer;
	}
	await sql`
      update match_stints
      set off_minute = ${minute}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
        and player = ${data.offPlayer} and off_minute is null
    `;
	await sql`
      insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started)
      values (${data.opposition}, ${data.kickoff}, ${data.onPlayer}, ${offSlot}, ${minute}, null, false)
    `;
	await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var liveMove_createServerFn_handler = createServerRpc({
	id: "15f7c17fbc922bbd554522b6761918a42c9610704befc5345b2ed7310558ea2e",
	name: "liveMove",
	filename: "src/lib/live-actions.ts"
}, (opts) => liveMove.__executeServer(opts));
var liveMove = createServerFn({ method: "POST" }).validator(gameKey.extend({
	player: string().trim().min(1),
	toSlot: string().trim().min(1).max(12)
})).handler(liveMove_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	if (live.clock.ended) throw new Error("Game is finished.");
	const slots = formationById(live.formation).slots.map((s) => s.id);
	if (!slots.includes(data.toSlot)) throw new Error("That position is not in this shape.");
	const lineup = { ...live.lineup };
	const fromSlot = Object.entries(lineup).find(([, p]) => p === data.player)?.[0];
	if (!fromSlot || !slots.includes(fromSlot)) throw new Error("That lad is not on the pitch.");
	const other = lineup[data.toSlot] || "";
	lineup[data.toSlot] = data.player;
	if (other) lineup[fromSlot] = other;
	else delete lineup[fromSlot];
	await sql`
      update match_stints set slot_id = ${data.toSlot}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
        and player = ${data.player} and off_minute is null
    `;
	if (other) await sql`
        update match_stints set slot_id = ${fromSlot}
        where opposition = ${data.opposition} and kickoff = ${data.kickoff}
          and player = ${other} and off_minute is null
      `;
	await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var liveOff_createServerFn_handler = createServerRpc({
	id: "eec0cf2ae60ba71cbd665c53b8df485f2330ba42c0ef5451eef61550c3ca30f7",
	name: "liveOff",
	filename: "src/lib/live-actions.ts"
}, (opts) => liveOff.__executeServer(opts));
var liveOff = createServerFn({ method: "POST" }).validator(gameKey.extend({
	player: string().trim().min(1),
	toSlot: string().trim().min(1).max(12)
})).handler(liveOff_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	if (live.clock.ended) throw new Error("Game is finished.");
	const minute = await currentMinute(sql, data.opposition, data.kickoff);
	const lineup = { ...live.lineup };
	const fromSlot = Object.entries(lineup).find(([, p]) => p === data.player)?.[0];
	const pitchIds = formationById(live.formation).slots.map((s) => s.id);
	if (!fromSlot || !pitchIds.includes(fromSlot)) throw new Error("That lad is not on the pitch.");
	const occupant = lineup[data.toSlot];
	delete lineup[fromSlot];
	lineup[data.toSlot] = data.player;
	if (occupant) lineup[fromSlot] = occupant;
	await sql`
      update match_stints
      set off_minute = ${minute}
      where opposition = ${data.opposition} and kickoff = ${data.kickoff}
        and player = ${data.player} and off_minute is null
    `;
	if (occupant) await sql`
        insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started)
        values (${data.opposition}, ${data.kickoff}, ${occupant}, ${fromSlot}, ${minute}, null, false)
      `;
	await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var liveOn_createServerFn_handler = createServerRpc({
	id: "95bad6a1b1748befc8ab5ce8934cd0dcfb25d75765a1ea7f6885809d728c767b",
	name: "liveOn",
	filename: "src/lib/live-actions.ts"
}, (opts) => liveOn.__executeServer(opts));
var liveOn = createServerFn({ method: "POST" }).validator(gameKey.extend({
	player: string().trim().min(1),
	toSlot: string().trim().min(1).max(12)
})).handler(liveOn_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	if (live.clock.ended) throw new Error("Game is finished.");
	const minute = await currentMinute(sql, data.opposition, data.kickoff);
	const lineup = { ...live.lineup };
	const fromSlot = Object.entries(lineup).find(([, p]) => p === data.player)?.[0];
	const occupant = lineup[data.toSlot] || "";
	if (occupant) return liveSub({ data: {
		opposition: data.opposition,
		kickoff: data.kickoff,
		offPlayer: occupant,
		onPlayer: data.player
	} });
	if (fromSlot) delete lineup[fromSlot];
	lineup[data.toSlot] = data.player;
	await sql`
      insert into match_stints (opposition, kickoff, player, slot_id, on_minute, off_minute, started)
      values (${data.opposition}, ${data.kickoff}, ${data.player}, ${data.toSlot}, ${minute}, null, false)
    `;
	await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var liveFormation_createServerFn_handler = createServerRpc({
	id: "a55442593ef95476683289653ec1a5b4b7a0b083dc394f9d8a7217eef34eaa75",
	name: "liveFormation",
	filename: "src/lib/live-actions.ts"
}, (opts) => liveFormation.__executeServer(opts));
var liveFormation = createServerFn({ method: "POST" }).validator(gameKey.extend({ formation: string().trim().min(1).max(20) })).handler(liveFormation_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	if (live.clock.ended) throw new Error("Game is finished.");
	const lineup = remapLineup(live.lineup, data.formation, live.formation);
	const minute = await currentMinute(sql, data.opposition, data.kickoff);
	await writeLiveLineup(sql, data.opposition, data.kickoff, lineup, { formation: data.formation });
	await sql`
      insert into match_shape_changes (opposition, kickoff, minute, formation)
      values (${data.opposition}, ${data.kickoff}, ${minute}, ${data.formation})
    `;
	for (const slot of formationById(data.formation).slots) {
		const player = lineup[slot.id];
		if (!player) continue;
		await sql`
        update match_stints set slot_id = ${slot.id}
        where opposition = ${data.opposition} and kickoff = ${data.kickoff}
          and player = ${player} and off_minute is null
      `;
	}
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
var resetLive_createServerFn_handler = createServerRpc({
	id: "8fbb2c4d124ba06e4e8891ddc152d5b867f9a0a6bfe3324771e5fbaef4bbbf45",
	name: "resetLive",
	filename: "src/lib/live-actions.ts"
}, (opts) => resetLive.__executeServer(opts));
var resetLive = createServerFn({ method: "POST" }).validator(gameKey).handler(resetLive_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await sql`delete from match_stints where opposition = ${data.opposition} and kickoff = ${data.kickoff}`;
	await sql`delete from match_shape_changes where opposition = ${data.opposition} and kickoff = ${data.kickoff}`;
	await sql`delete from match_live where opposition = ${data.opposition} and kickoff = ${data.kickoff}`;
	return { live: null };
});
var liveBench_createServerFn_handler = createServerRpc({
	id: "0194d38fff5bb2278d06f5bc59c37a5a6c8ca91b958431a3a91f3ba5b2b255b7",
	name: "liveBench",
	filename: "src/lib/live-actions.ts"
}, (opts) => liveBench.__executeServer(opts));
var liveBench = createServerFn({ method: "POST" }).validator(gameKey.extend({
	slotId: string().trim().min(1).max(12),
	player: string().trim().max(80)
})).handler(liveBench_createServerFn_handler, async ({ data }) => {
	if (!BENCH_SLOTS.includes(data.slotId)) throw new Error("That is not a bench spot.");
	const sql = await getSql();
	const live = await loadLive(sql, data.opposition, data.kickoff);
	if (!live) throw new Error("Start the clock first.");
	if (live.clock.ended) throw new Error("Game is finished.");
	const lineup = { ...live.lineup };
	const player = data.player.trim();
	if (player && !isSquadPlayer(player)) throw new Error("Pick a squad player.");
	const pitchIds = formationById(live.formation).slots.map((s) => s.id);
	if (player) {
		const from = Object.entries(lineup).find(([, p]) => p === player)?.[0];
		if (from && pitchIds.includes(from)) return liveOff({ data: {
			opposition: data.opposition,
			kickoff: data.kickoff,
			player,
			toSlot: data.slotId
		} });
		if (from) delete lineup[from];
		lineup[data.slotId] = player;
	} else delete lineup[data.slotId];
	await writeLiveLineup(sql, data.opposition, data.kickoff, lineup);
	return { live: await loadLive(sql, data.opposition, data.kickoff) };
});
//#endregion
export { fullTimeLive_createServerFn_handler, getAllMinutes_createServerFn_handler, getLiveMatch_createServerFn_handler, liveBench_createServerFn_handler, liveFormation_createServerFn_handler, liveMove_createServerFn_handler, liveOff_createServerFn_handler, liveOn_createServerFn_handler, liveSub_createServerFn_handler, pauseLive_createServerFn_handler, resetLive_createServerFn_handler, resumeLive_createServerFn_handler, secondHalfLive_createServerFn_handler, startLive_createServerFn_handler };
