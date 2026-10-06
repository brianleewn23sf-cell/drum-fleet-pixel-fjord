import { r as __exportAll } from "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent-login-a0219ktd.js
var parent_login_a0219ktd_exports = /* @__PURE__ */ __exportAll({
	a: () => issueParentLogins,
	c: () => resumeParentSession,
	i: () => isViewAllPlayer,
	l: () => setParentLogin,
	n: () => VIEW_ALL_PLAYER,
	o: () => listParentLogins,
	r: () => checkParentPin,
	s: () => parent_login_exports,
	t: () => VIEW_ALL_FAMILY
});
var parent_login_exports = /* @__PURE__ */ __exportAll$1({
	VIEW_ALL_FAMILY: () => VIEW_ALL_FAMILY,
	VIEW_ALL_PLAYER: () => VIEW_ALL_PLAYER,
	checkParentPin: () => checkParentPin,
	isViewAllPlayer: () => isViewAllPlayer,
	issueParentLogins: () => issueParentLogins,
	listParentLogins: () => listParentLogins,
	normalizeCode: () => normalizeCode,
	parentForPin: () => parentForPin,
	parentFromToken: () => parentFromToken,
	resumeParentSession: () => resumeParentSession,
	setParentLogin: () => setParentLogin
});
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
/** Memorable family codes for new lads when that PIN is still free. */
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
var checkParentPin = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().min(4).max(8) })).handler(createSsrRpc("e7ea66d472e42b5d760f5bdd12481bb239cc1bbeaf590736b948d1f54a434ea9"));
var resumeParentSession = createServerFn({ method: "POST" }).validator(object({ token: string().min(20).max(200) })).handler(createSsrRpc("c757eea51e19890ce927dc4e379ff68e00e026f9621f9425f06e3287ba77eb3e"));
var listParentLogins = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(createSsrRpc("08f281f06fcd8d9da4722aa20767ab8d04d97b929e65863785860554fbd70f17"));
var issueParentLogins = createServerFn({ method: "POST" }).validator(object({ coachPin: string().trim().min(4).max(40) })).handler(createSsrRpc("1712fb73c022ed9adc12b43eb469a73e703f010e2e72ffad3315dbec75495c3e"));
var setParentLogin = createServerFn({ method: "POST" }).validator(object({
	coachPin: string().trim().min(4).max(40),
	player: string().trim().min(1).max(80),
	pin: string().trim().min(4).max(8),
	family: string().trim().max(60).optional()
})).handler(createSsrRpc("1e55fe45d0b811f24d2f388b93278d3185f13b4d8e5c0f3f4a59613c39e7a8c2"));
//#endregion
export { issueParentLogins as a, resumeParentSession as c, isViewAllPlayer as i, setParentLogin as l, VIEW_ALL_PLAYER as n, listParentLogins as o, checkParentPin as r, parent_login_a0219ktd_exports as s, VIEW_ALL_FAMILY as t };
