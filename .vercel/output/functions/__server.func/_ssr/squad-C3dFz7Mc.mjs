import { n as createServerFn } from "./ssr.mjs";
import { f as squadExtra, p as squadGone, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/squad-C3dFz7Mc.js
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
createServerFn({ method: "POST" }).handler(createSsrRpc("fc81d78944a65cc1bc0a5b854770b5a4a3028d049f4b59571519e53cd2994863"));
var addSquadPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40),
	shirt: string().trim().max(4).optional(),
	name: string().trim().min(2).max(60)
})).handler(createSsrRpc("9b8fbfb797a0dfebbd0b8cb88e87a036d4e457c7b862d3b19d4f48063c764da0"));
var removeSquadPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40),
	player: string().trim().min(1).max(80)
})).handler(createSsrRpc("9e41157d51d7e3b4492947337723b8cc83a427db7551069ba4b72c513a9b56b4"));
//#endregion
export { loadActiveSquad as n, removeSquadPlayer as r, addSquadPlayer as t };
