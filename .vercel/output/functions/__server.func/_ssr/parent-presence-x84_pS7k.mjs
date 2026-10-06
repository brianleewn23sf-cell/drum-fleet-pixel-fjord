import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { a as parsePlayer, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as ONLINE_MS } from "./coach-users-DQwpwPHR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent-presence-x84_pS7k.js
var schemaReady = false;
async function ensurePresence(sql) {
	if (schemaReady) return;
	try {
		await sql`
      create table if not exists parent_presence (
        id text primary key,
        child text not null default '',
        page text not null default '',
        last_seen_ms bigint not null
      )
    `;
		schemaReady = true;
	} catch {}
}
var heartbeatParent_createServerFn_handler = createServerRpc({
	id: "1acde48274c6653ba71bf6d988118e7fdc3b34d0330a9d1a3952675051c0bbda",
	name: "heartbeatParent",
	filename: "src/lib/parent-presence.ts"
}, (opts) => heartbeatParent.__executeServer(opts));
var heartbeatParent = createServerFn({ method: "POST" }).validator(object({
	sid: string().trim().min(1).max(40),
	child: string().trim().max(80).optional(),
	page: string().trim().max(24).optional()
})).handler(heartbeatParent_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensurePresence(sql);
	const child = PLAYERS.includes(data.child || "") ? data.child || "" : "";
	const id = child ? `c:${child}` : data.sid;
	const ms = Date.now();
	try {
		await sql`
        insert into parent_presence (id, child, page, last_seen_ms)
        values (${id}, ${child}, ${data.page || ""}, ${ms})
        on conflict (id) do update set
          child = excluded.child,
          page = excluded.page,
          last_seen_ms = excluded.last_seen_ms
      `;
		return { ok: true };
	} catch {
		return { ok: false };
	}
});
var listParentPresence_createServerFn_handler = createServerRpc({
	id: "aa9864e59c8f80674896532e4b787441db45b7b42e35845f5dc4c6ce3810baf4",
	name: "listParentPresence",
	filename: "src/lib/parent-presence.ts"
}, (opts) => listParentPresence.__executeServer(opts));
var listParentPresence = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(listParentPresence_createServerFn_handler, async ({ data }) => {
	const pin = (data.pin || "").trim();
	if (!pin) return {
		ok: false,
		parents: [],
		guests: 0
	};
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return {
		ok: false,
		parents: [],
		guests: 0
	};
	const sql = await getSql();
	await ensurePresence(sql);
	const cutoff = Date.now() - ONLINE_MS;
	try {
		const rows = await sql`
        select id, child, page, last_seen_ms
        from parent_presence
        where last_seen_ms > ${cutoff}
        order by child asc, id asc
      `;
		const parents = [];
		let guests = 0;
		for (const r of rows) {
			const child = String(r.child || "");
			const id = String(r.id || "");
			if (child) parents.push({
				id,
				child,
				label: parsePlayer(child).name,
				page: String(r.page || ""),
				guest: false
			});
			else guests += 1;
		}
		return {
			ok: true,
			parents,
			guests
		};
	} catch {
		return {
			ok: true,
			parents: [],
			guests: 0
		};
	}
});
var listPerfUsers_createServerFn_handler = createServerRpc({
	id: "cce59645373fa4d040955c50ba69e3abcc3934cf3846a004bc4e22edd28b27d7",
	name: "listPerfUsers",
	filename: "src/lib/parent-presence.ts"
}, (opts) => listPerfUsers.__executeServer(opts));
var listPerfUsers = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(listPerfUsers_createServerFn_handler, async ({ data }) => {
	const pin = (data.pin || "").trim();
	const empty = {
		ok: false,
		live: [],
		signedIn: [],
		clips: []
	};
	if (!pin) return empty;
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return empty;
	const sql = await getSql();
	await ensurePresence(sql);
	const cutoff = Date.now() - ONLINE_MS;
	const live = [];
	try {
		const rows = await sql`
        select id, child, page from parent_presence
        where last_seen_ms > ${cutoff} and page = 'perf'
        order by child asc
      `;
		for (const r of rows) {
			const child = String(r.child || "");
			live.push({
				id: String(r.id),
				child,
				label: child ? parsePlayer(child).name : "Guest",
				page: "perf",
				guest: !child
			});
		}
	} catch {}
	let signedIn = [];
	try {
		signedIn = (await sql`
        select distinct player from parent_sessions
        where expires > now()
        order by player
      `).map((r) => String(r.player));
	} catch {
		signedIn = [];
	}
	let clips = [];
	try {
		clips = (await sql`
        select player, max(created_at) as created_at
        from perf_submissions
        group by player
        order by max(created_at) desc
        limit 20
      `).map((r) => ({
			player: String(r.player),
			at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at || "")
		}));
	} catch {
		clips = [];
	}
	return {
		ok: true,
		live,
		signedIn,
		clips
	};
});
//#endregion
export { heartbeatParent_createServerFn_handler, listParentPresence_createServerFn_handler, listPerfUsers_createServerFn_handler };
