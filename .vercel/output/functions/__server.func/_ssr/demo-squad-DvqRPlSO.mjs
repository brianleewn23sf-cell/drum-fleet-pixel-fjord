import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, s as object, t as number } from "../_libs/zod.mjs";
import { i as demoForPin, o as isDemoName, r as DEMO_USER } from "./demo-CR2KY2Ob.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/demo-squad-DvqRPlSO.js
function label(shirt, name) {
	const n = name.trim();
	const s = shirt.trim().replace(/\D/g, "");
	return s ? `${s}) ${n}` : n;
}
async function ownerForPin(pin) {
	const sql = await getSql();
	try {
		const rows = await sql`
      select name, role from coach_users where pin = ${pin} limit 1
    `;
		if (!rows[0]?.name) {
			if (pin === "0803") return {
				name: "Brian Lee",
				admin: true
			};
			const demo = demoForPin(pin);
			if (demo) return {
				name: demo.name,
				admin: false
			};
			return null;
		}
		const name = String(rows[0].name);
		return {
			name,
			admin: String(rows[0].role) === "admin" || name.toLowerCase() === "brian lee"
		};
	} catch {
		if (pin === "0803") return {
			name: "Brian Lee",
			admin: true
		};
		const demo = demoForPin(pin);
		if (demo) return {
			name: demo.name,
			admin: false
		};
		return null;
	}
}
var listDemoPlayers_createServerFn_handler = createServerRpc({
	id: "db99e0cdc34400b501293cb0e994e428d3db716171ef6ec080667a3d3076d58d",
	name: "listDemoPlayers",
	filename: "src/lib/demo-squad.ts"
}, (opts) => listDemoPlayers.__executeServer(opts));
var listDemoPlayers = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40).optional(),
	owner: string().trim().max(60).optional()
})).handler(listDemoPlayers_createServerFn_handler, async ({ data }) => {
	const pin = (data.pin || "").trim();
	if (!pin) return {
		ok: false,
		owner: "",
		players: []
	};
	const who = await ownerForPin(pin);
	if (!who) return {
		ok: false,
		owner: "",
		players: []
	};
	const owner = who.admin && data.owner ? data.owner : isDemoName(who.name) ? who.name : who.admin ? DEMO_USER : who.name;
	const sql = await getSql();
	try {
		return {
			ok: true,
			owner,
			players: (await sql`
        select id, shirt, name from demo_players
        where owner = ${owner}
        order by shirt, name
      `).map((r) => ({
				id: Number(r.id),
				label: label(String(r.shirt || ""), String(r.name || ""))
			}))
		};
	} catch {
		return {
			ok: true,
			owner,
			players: []
		};
	}
});
var addDemoPlayer_createServerFn_handler = createServerRpc({
	id: "616b8ca9702025addd2c2dcdc3b0f4ed6beaef07f218b4ed6812b9d2eb970dbe",
	name: "addDemoPlayer",
	filename: "src/lib/demo-squad.ts"
}, (opts) => addDemoPlayer.__executeServer(opts));
var addDemoPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	shirt: string().trim().max(4).optional(),
	name: string().trim().min(2).max(60),
	owner: string().trim().max(60).optional()
})).handler(addDemoPlayer_createServerFn_handler, async ({ data }) => {
	const who = await ownerForPin(data.pin);
	if (!who) return {
		success: false,
		error: "Wrong code."
	};
	if (!who.admin && !isDemoName(who.name)) return {
		success: false,
		error: "Demo squad is for the demo login."
	};
	const owner = isDemoName(who.name) ? who.name : who.admin && data.owner ? data.owner : DEMO_USER;
	const shirt = (data.shirt || "").replace(/\D/g, "").slice(0, 3);
	const sql = await getSql();
	try {
		await sql`
        insert into demo_players (owner, shirt, name)
        values (${owner}, ${shirt}, ${data.name})
      `;
		return { success: true };
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		if (/unique|duplicate|23505/i.test(message)) return {
			success: false,
			error: "That player is already on the demo squad."
		};
		return {
			success: false,
			error: "Could not add player."
		};
	}
});
var removeDemoPlayer_createServerFn_handler = createServerRpc({
	id: "3a20262ca48dcc0b7beb4ffa8312427b4fee7822c125b70eec410dc538903d58",
	name: "removeDemoPlayer",
	filename: "src/lib/demo-squad.ts"
}, (opts) => removeDemoPlayer.__executeServer(opts));
var removeDemoPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40).optional(),
	id: number().int()
})).handler(removeDemoPlayer_createServerFn_handler, async ({ data }) => {
	const pin = (data.pin || "").trim();
	if (!pin) return {
		success: false,
		error: "Unlock again with your code, then delete."
	};
	const who = await ownerForPin(pin);
	if (!who) return {
		success: false,
		error: "Wrong code."
	};
	const sql = await getSql();
	try {
		const rows = await sql`
        select owner from demo_players where id = ${data.id} limit 1
      `;
		if (!rows[0]) return {
			success: false,
			error: "Not found."
		};
		if (!who.admin && rows[0].owner !== who.name) return {
			success: false,
			error: "That is not your lad."
		};
		await sql`delete from demo_players where id = ${data.id}`;
		return { success: true };
	} catch {
		return {
			success: false,
			error: "Could not remove player."
		};
	}
});
//#endregion
export { addDemoPlayer_createServerFn_handler, listDemoPlayers_createServerFn_handler, removeDemoPlayer_createServerFn_handler };
