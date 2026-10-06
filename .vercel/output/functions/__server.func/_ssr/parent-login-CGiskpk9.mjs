import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { r as LOCAL_UNLOCKS } from "./pins-D3aXuxPO.mjs";
import { n as loadActiveSquad } from "./squad-C3dFz7Mc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent-login-CGiskpk9.js
var VIEW_ALL_PLAYER = "__manager__";
var VIEW_ALL_FAMILY = "Brian Lee · view all";
function isViewAllPlayer(player) {
	return player.trim() === VIEW_ALL_PLAYER;
}
var BLOCKED = /* @__PURE__ */ new Set([
	"0803",
	"123456",
	"654321",
	"0000",
	"1111",
	"1234",
	"9999"
]);
var MAX_FAILS_CODE = 5;
var LOCK_MS = 9e5;
var SESSION_MS = 15552e6;
function normalizeCode(raw) {
	const pin = raw.replace(/\D/g, "").slice(0, 8);
	if (!/^\d{4,8}$/.test(pin)) return null;
	if (BLOCKED.has(pin)) return null;
	return pin;
}
async function sha(value) {
	const data = new TextEncoder().encode(value);
	const buf = await crypto.subtle.digest("SHA-256", data);
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function safeEqual(a, b) {
	const left = a.padEnd(8, "\0");
	const right = b.padEnd(8, "\0");
	let diff = left.length ^ right.length;
	const n = Math.max(left.length, right.length);
	for (let i = 0; i < n; i++) diff |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
	return diff === 0;
}
function randInt(min, max) {
	const span = max - min;
	const buf = /* @__PURE__ */ new Uint32Array(1);
	crypto.getRandomValues(buf);
	return min + buf[0] % span;
}
function randomToken() {
	const bytes = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function sixDigit(used) {
	for (let i = 0; i < 120; i++) {
		const n = String(randInt(1e5, 1e6));
		if (BLOCKED.has(n) || used.has(n)) continue;
		used.add(n);
		return n;
	}
	return String(randInt(1e5, 1e6));
}
/** Memorable family codes for new lads when that PIN is still free. */
var PREFERRED_FAMILY_CODE = {
	"6) Logan Massey": "040715",
	"66) Max Shaw": "661166"
};
async function fillMissingParentCodes(sql, squad) {
	const existing = await sql`select pin, player from parent_logins`.catch(() => []);
	const used = new Set(existing.map((r) => r.pin));
	const have = new Set(existing.map((r) => r.player));
	const wanted = [...squad];
	if (!have.has(VIEW_ALL_PLAYER)) wanted.push(VIEW_ALL_PLAYER);
	for (const player of wanted) {
		if (have.has(player)) continue;
		const preferred = PREFERRED_FAMILY_CODE[player];
		const pin = preferred && !used.has(preferred) && !BLOCKED.has(preferred) ? preferred : sixDigit(used);
		used.add(pin);
		have.add(player);
		await sql`
      insert into parent_logins (player, pin, family)
      values (${player}, ${pin}, ${player === VIEW_ALL_PLAYER ? VIEW_ALL_FAMILY : player})
      on conflict (player) do nothing
    `;
	}
	for (const [player, preferred] of Object.entries(PREFERRED_FAMILY_CODE)) {
		if (BLOCKED.has(preferred)) continue;
		const owner = existing.find((r) => r.pin === preferred);
		if (owner && owner.player !== player) continue;
		if (existing.find((r) => r.player === player)?.pin === preferred) continue;
		try {
			await sql`update parent_logins set pin = ${preferred} where player = ${player}`;
		} catch {}
	}
}
async function locked(sql, id) {
	try {
		const until = (await sql`
      select locked_until from parent_attempts where id = ${id} limit 1
    `)[0]?.locked_until;
		if (!until) return false;
		const t = until instanceof Date ? until.getTime() : Date.parse(String(until));
		return Number.isFinite(t) && t > Date.now();
	} catch {
		return false;
	}
}
async function bumpFail(sql, id, max) {
	try {
		const rows = await sql`
      insert into parent_attempts (id, fails, last_at)
      values (${id}, 1, now())
      on conflict (id) do update set
        fails = parent_attempts.fails + 1,
        last_at = now()
      returning fails
    `;
		if (Number(rows[0]?.fails || 1) >= max) await sql`update parent_attempts set locked_until = ${new Date(Date.now() + LOCK_MS).toISOString()}::timestamptz where id = ${id}`;
	} catch {}
}
async function clearFails(sql, id) {
	try {
		await sql`delete from parent_attempts where id = ${id}`;
	} catch {}
}
var schemaReady = false;
async function ensureParentSchema(sql) {
	if (schemaReady) return;
	try {
		await sql`
      create table if not exists parent_logins (
        player      text primary key,
        pin         text not null unique,
        family      text not null default '',
        created_at  timestamptz not null default now()
      )
    `;
		await sql`
      create table if not exists parent_attempts (
        id            text primary key,
        fails         integer not null default 0,
        locked_until  timestamptz,
        last_at       timestamptz not null default now()
      )
    `;
		await sql`
      create table if not exists parent_sessions (
        token_hash  text primary key,
        player      text not null,
        family      text not null default '',
        expires     timestamptz not null
      )
    `;
		schemaReady = true;
	} catch {}
}
async function parentFromToken(sql, token) {
	if (!token || token.length < 20) return null;
	await ensureParentSchema(sql);
	try {
		const hash = await sha(token);
		const row = (await sql`
      select s.player, coalesce(l.pin, '') as pin, s.family, s.expires
      from parent_sessions s
      left join parent_logins l on l.player = s.player
      where s.token_hash = ${hash}
      limit 1
    `)[0];
		if (!row) return null;
		const exp = row.expires instanceof Date ? row.expires.getTime() : Date.parse(String(row.expires));
		if (!Number.isFinite(exp) || exp < Date.now()) return null;
		await sql`
      update parent_sessions
      set expires = ${new Date(Date.now() + SESSION_MS).toISOString()}::timestamptz
      where token_hash = ${hash}
    `.catch(() => void 0);
		return {
			player: row.player,
			pin: row.pin,
			family: row.family
		};
	} catch {
		return null;
	}
}
async function parentForPin(sql, pin) {
	const entered = normalizeCode(pin);
	if (!entered) return null;
	await ensureParentSchema(sql);
	try {
		const rows = await sql`select player, pin, family from parent_logins`;
		let match = null;
		for (const row of rows) if (safeEqual(row.pin, entered)) match = row;
		return match;
	} catch {
		return null;
	}
}
var checkParentPin_createServerFn_handler = createServerRpc({
	id: "e7ea66d472e42b5d760f5bdd12481bb239cc1bbeaf590736b948d1f54a434ea9",
	name: "checkParentPin",
	filename: "src/lib/parent-login.ts"
}, (opts) => checkParentPin.__executeServer(opts));
var checkParentPin = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().min(4).max(8) })).handler(checkParentPin_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	await ensureParentSchema(sql);
	const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
	const fail = async (error, detail) => {
		await writeAudit({
			actor: "parent",
			role: "parent",
			action: "login.fail",
			detail
		});
		return {
			ok: false,
			error
		};
	};
	if (await locked(sql, "global")) try {
		await sql`delete from parent_attempts`;
	} catch {
		return fail("Too many tries. Wait 15 minutes.", "locked global");
	}
	const raw = data.pin.replace(/\D/g, "");
	if (LOCAL_UNLOCKS[raw] || raw === "0803") return {
		ok: false,
		coach: true,
		error: "That’s the coach code. Open Coach in the menu."
	};
	const entered = normalizeCode(data.pin);
	if (!entered) return fail("Wrong family code. Use the 6-digit code Brian sent, not the coach PIN.", "bad format");
	try {
		const { PLAYERS } = await import("./players-CZr5uoUS.mjs").then((n) => n.l).then((n) => n.l);
		const squad = await loadActiveSquad(sql).catch(() => [...PLAYERS]);
		await fillMissingParentCodes(sql, squad.length ? squad : [...PLAYERS]);
	} catch {}
	const codeKey = await sha(`code:${entered}`);
	if (await locked(sql, codeKey)) return fail("Too many tries. Wait 15 minutes.", "locked code");
	const row = await parentForPin(sql, entered);
	if (!row) {
		try {
			const n = await sql`select count(*)::int as n from parent_logins`;
			if (!Number(n[0]?.n || 0)) return fail("Family codes are not ready yet. Ask Brian on WhatsApp.", "no codes");
		} catch {}
		await bumpFail(sql, codeKey, MAX_FAILS_CODE);
		return fail("Wrong family code.", "no match");
	}
	await clearFails(sql, codeKey);
	const token = randomToken();
	try {
		await sql`
        insert into parent_sessions (token_hash, player, family, expires)
        values (${await sha(token)}, ${row.player}, ${row.family || row.player}, ${new Date(Date.now() + SESSION_MS).toISOString()}::timestamptz)
      `;
	} catch {}
	await writeAudit({
		actor: row.family || row.player,
		role: isViewAllPlayer(row.player) ? "coach" : "parent",
		action: "login.ok",
		player: isViewAllPlayer(row.player) ? "" : row.player,
		detail: isViewAllPlayer(row.player) ? "Manager view all" : "Performance analysis"
	});
	return {
		ok: true,
		player: row.player,
		family: row.family || row.player,
		token,
		viewAll: isViewAllPlayer(row.player)
	};
});
var resumeParentSession_createServerFn_handler = createServerRpc({
	id: "c757eea51e19890ce927dc4e379ff68e00e026f9621f9425f06e3287ba77eb3e",
	name: "resumeParentSession",
	filename: "src/lib/parent-login.ts"
}, (opts) => resumeParentSession.__executeServer(opts));
var resumeParentSession = createServerFn({ method: "POST" }).validator(object({ token: string().min(20).max(200) })).handler(resumeParentSession_createServerFn_handler, async ({ data }) => {
	const row = await parentFromToken(await getSql(), data.token);
	if (!row) return { ok: false };
	return {
		ok: true,
		player: row.player,
		family: row.family,
		viewAll: isViewAllPlayer(row.player)
	};
});
var listParentLogins_createServerFn_handler = createServerRpc({
	id: "08f281f06fcd8d9da4722aa20767ab8d04d97b929e65863785860554fbd70f17",
	name: "listParentLogins",
	filename: "src/lib/parent-login.ts"
}, (opts) => listParentLogins.__executeServer(opts));
var listParentLogins = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(listParentLogins_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.pin || "" } });
	const empty = {
		rows: [],
		manager: {
			player: VIEW_ALL_PLAYER,
			pin: "",
			family: VIEW_ALL_FAMILY
		}
	};
	if (!who.ok) return empty;
	const sql = await getSql();
	await ensureParentSchema(sql);
	const squad = await loadActiveSquad(sql);
	await fillMissingParentCodes(sql, squad);
	try {
		const rows = await sql`
        select player, pin, family from parent_logins order by player
      `;
		const map = new Map(rows.map((r) => [r.player, r]));
		return {
			rows: squad.map((player) => map.get(player) ?? {
				player,
				pin: "",
				family: ""
			}),
			manager: map.get(VIEW_ALL_PLAYER) ?? {
				player: VIEW_ALL_PLAYER,
				pin: "",
				family: VIEW_ALL_FAMILY
			}
		};
	} catch {
		return {
			rows: squad.map((player) => ({
				player,
				pin: "",
				family: ""
			})),
			manager: {
				player: VIEW_ALL_PLAYER,
				pin: "",
				family: VIEW_ALL_FAMILY
			}
		};
	}
});
var issueParentLogins_createServerFn_handler = createServerRpc({
	id: "1712fb73c022ed9adc12b43eb469a73e703f010e2e72ffad3315dbec75495c3e",
	name: "issueParentLogins",
	filename: "src/lib/parent-login.ts"
}, (opts) => issueParentLogins.__executeServer(opts));
var issueParentLogins = createServerFn({ method: "POST" }).validator(object({ coachPin: string().trim().min(4).max(40) })).handler(issueParentLogins_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.coachPin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return {
		success: false,
		error: "Only the manager can issue parent logins."
	};
	const sql = await getSql();
	await ensureParentSchema(sql);
	await fillMissingParentCodes(sql, await loadActiveSquad(sql));
	const all = await sql`select player, pin, family from parent_logins order by player`;
	const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
	await writeAudit({
		actor: who.name,
		role: "admin",
		action: "parent.codes.issue",
		detail: `${all.length} family codes`
	});
	return {
		success: true,
		rows: all.filter((r) => !isViewAllPlayer(r.player)),
		manager: all.find((r) => isViewAllPlayer(r.player)) ?? null
	};
});
var setParentLogin_createServerFn_handler = createServerRpc({
	id: "1e55fe45d0b811f24d2f388b93278d3185f13b4d8e5c0f3f4a59613c39e7a8c2",
	name: "setParentLogin",
	filename: "src/lib/parent-login.ts"
}, (opts) => setParentLogin.__executeServer(opts));
var setParentLogin = createServerFn({ method: "POST" }).validator(object({
	coachPin: string().trim().min(4).max(40),
	player: string().trim().min(1).max(80),
	pin: string().trim().min(4).max(8),
	family: string().trim().max(60).optional()
})).handler(setParentLogin_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.coachPin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return {
		success: false,
		error: "Only the manager can change parent logins."
	};
	const pin = normalizeCode(data.pin);
	if (!pin) return {
		success: false,
		error: "Code must be 4–8 numbers and not a coach code."
	};
	const sql = await getSql();
	await ensureParentSchema(sql);
	try {
		await sql`
        insert into parent_logins (player, pin, family)
        values (${data.player}, ${pin}, ${data.family || data.player})
        on conflict (player) do update set pin = excluded.pin, family = excluded.family
      `;
		await sql`delete from parent_sessions where player = ${data.player}`;
		const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
		await writeAudit({
			actor: who.name,
			role: "admin",
			action: "parent.code.set",
			player: data.player,
			detail: "Family code updated"
		});
		return { success: true };
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		if (/unique|duplicate|23505/i.test(message)) return {
			success: false,
			error: "That code is already in use."
		};
		return {
			success: false,
			error: "Could not save parent login."
		};
	}
});
//#endregion
export { checkParentPin_createServerFn_handler, issueParentLogins_createServerFn_handler, listParentLogins_createServerFn_handler, resumeParentSession_createServerFn_handler, setParentLogin_createServerFn_handler };
