import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { f as squadExtra, p as squadGone, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/squad-C5g_z0B2.js
function squadLabel(shirt, name) {
	const n = name.trim();
	const s = shirt.trim().replace(/\D/g, "");
	return s ? `${s}) ${n}` : n;
}
async function loadActiveSquad(sql) {
	let removed = /* @__PURE__ */ new Set();
	let added = [];
	const gone = await sql`select player from squad_removed`.catch(() => []);
	const extra = await sql`
    select shirt, name from squad_added order by shirt, name
  `.catch(() => []);
	removed = new Set(gone.map((r) => String(r.player)));
	added = extra.map((r) => squadLabel(String(r.shirt || ""), String(r.name || "")));
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	squadGone.clear();
	squadExtra.clear();
	for (const p of removed) squadGone.add(p);
	for (const p of added) squadExtra.add(p);
	for (const p of [...PLAYERS, ...added]) {
		if (removed.has(p) || seen.has(p)) continue;
		seen.add(p);
		out.push(p);
	}
	return out;
}
var listSquad_createServerFn_handler = createServerRpc({
	id: "fc81d78944a65cc1bc0a5b854770b5a4a3028d049f4b59571519e53cd2994863",
	name: "listSquad",
	filename: "src/lib/squad.ts"
}, (opts) => listSquad.__executeServer(opts));
var listSquad = createServerFn({ method: "POST" }).handler(listSquad_createServerFn_handler, async () => {
	return { players: await loadActiveSquad(await getSql()) };
});
var addSquadPlayer_createServerFn_handler = createServerRpc({
	id: "9b8fbfb797a0dfebbd0b8cb88e87a036d4e457c7b862d3b19d4f48063c764da0",
	name: "addSquadPlayer",
	filename: "src/lib/squad.ts"
}, (opts) => addSquadPlayer.__executeServer(opts));
var addSquadPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40),
	shirt: string().trim().max(4).optional(),
	name: string().trim().min(2).max(60)
})).handler(addSquadPlayer_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.pin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return {
		success: false,
		error: "Only the manager can change the squad."
	};
	const sql = await getSql();
	const shirt = (data.shirt || "").replace(/\D/g, "").slice(0, 3);
	const label = squadLabel(shirt, data.name);
	try {
		await sql`delete from squad_removed where player = ${label}`;
		if ((await loadActiveSquad(sql)).includes(label)) return {
			success: true,
			players: await loadActiveSquad(sql)
		};
		await sql`insert into squad_added (shirt, name) values (${shirt}, ${data.name.trim()})`;
		const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
		await writeAudit({
			actor: who.name,
			role: "admin",
			action: "squad.add",
			player: label
		});
		return {
			success: true,
			players: await loadActiveSquad(sql)
		};
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		if (/unique|duplicate|23505/i.test(message)) return {
			success: false,
			error: "That lad is already on the squad."
		};
		return {
			success: false,
			error: "Could not add player."
		};
	}
});
var removeSquadPlayer_createServerFn_handler = createServerRpc({
	id: "9e41157d51d7e3b4492947337723b8cc83a427db7551069ba4b72c513a9b56b4",
	name: "removeSquadPlayer",
	filename: "src/lib/squad.ts"
}, (opts) => removeSquadPlayer.__executeServer(opts));
var removeSquadPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40),
	player: string().trim().min(1).max(80)
})).handler(removeSquadPlayer_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.pin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return {
		success: false,
		error: "Only the manager can change the squad."
	};
	const sql = await getSql();
	try {
		await sql`insert into squad_removed (player) values (${data.player}) on conflict (player) do nothing`;
		await sql`delete from squad_added where (case when shirt = '' then name else shirt || ') ' || name end) = ${data.player}`;
		const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
		await writeAudit({
			actor: who.name,
			role: "admin",
			action: "squad.remove",
			player: data.player
		});
		return {
			success: true,
			players: await loadActiveSquad(sql)
		};
	} catch {
		return {
			success: false,
			error: "Could not delete player."
		};
	}
});
//#endregion
export { addSquadPlayer_createServerFn_handler, listSquad_createServerFn_handler, removeSquadPlayer_createServerFn_handler };
