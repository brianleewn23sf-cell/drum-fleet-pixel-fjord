import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, o as number, s as object } from "../_libs/zod.mjs";
import { i as seatForName, n as FALLBACK_PIN, t as FALLBACK_NAME } from "./pins-D3aXuxPO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-users-DM6JpU12.js
function isAdminName(name) {
	return name.trim().toLowerCase() === FALLBACK_NAME.toLowerCase();
}
var ONLINE_MS = 45e3;
function isOnline(lastSeenMs, lastSeen) {
	const n = Number(lastSeenMs);
	if (Number.isFinite(n) && n > 0) return Date.now() - n < ONLINE_MS;
	if (lastSeen == null || lastSeen === "") return false;
	const t = lastSeen instanceof Date ? lastSeen.getTime() : Date.parse(String(lastSeen));
	if (!Number.isFinite(t)) return false;
	return Date.now() - t < ONLINE_MS;
}
async function touchPresence(sql, name) {
	const ms = Date.now();
	try {
		await sql`
      insert into coach_presence (name, last_seen, last_seen_ms)
      values (${name}, now(), ${ms})
      on conflict (name) do update set last_seen = now(), last_seen_ms = ${ms}
    `;
	} catch {
		try {
			await sql`
        insert into coach_presence (name, last_seen)
        values (${name}, now())
        on conflict (name) do update set last_seen = now()
      `;
		} catch {}
	}
}
async function seedBrian(sql) {
	try {
		await sql`
      insert into coach_users (name, pin)
      values
        (${FALLBACK_NAME}, ${FALLBACK_PIN}),
        ('Dave Bailey', '123456'),
        ('Gavin Massey', '654321')
      on conflict (pin) do nothing
    `;
		await sql`
      update coach_users set role = 'admin' where pin = ${FALLBACK_PIN} or name = ${FALLBACK_NAME}
    `;
		await sql`
      update coach_users set role = 'coach' where pin <> ${FALLBACK_PIN} and (role is null or role = '')
    `;
	} catch {}
}
async function userForPin(sql, pin) {
	await seedBrian(sql);
	try {
		const rows = await sql`
      select name, role from coach_users where pin = ${pin} limit 1
    `;
		if (rows[0]?.name) {
			const name = String(rows[0].name);
			if (isAdminName(name) || pin === "0803") return {
				name,
				role: "admin"
			};
			return {
				name,
				role: String(rows[0].role || "") === "admin" ? "admin" : "coach"
			};
		}
	} catch {
		try {
			const rows = await sql`
        select name from coach_users where pin = ${pin} limit 1
      `;
			if (rows[0]?.name) {
				const name = String(rows[0].name);
				return {
					name,
					role: name === "Brian Lee" || pin === "0803" ? "admin" : "coach"
				};
			}
		} catch {}
	}
	if (pin === "0803") return {
		name: FALLBACK_NAME,
		role: "admin"
	};
	return null;
}
async function requireAdmin(pin) {
	const sql = await getSql();
	const user = await userForPin(sql, pin);
	if (!user || user.role !== "admin") return {
		sql,
		admin: null
	};
	return {
		sql,
		admin: user
	};
}
var checkCoachPin_createServerFn_handler = createServerRpc({
	id: "4f278575934ce5b88ecb7fa90497f6616067870a2cedb2e85e302c59484d0c8c",
	name: "checkCoachPin",
	filename: "src/lib/coach-users.ts"
}, (opts) => checkCoachPin.__executeServer(opts));
var checkCoachPin = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	seat: string().trim().max(40).optional()
})).handler(checkCoachPin_createServerFn_handler, async ({ data }) => {
	const pin = data.pin.replace(/\D/g, "").trim();
	if (!pin) return {
		ok: false,
		name: "",
		role: "coach"
	};
	if (pin === "0803") {
		const who = (data.seat ? seatForName(data.seat) : null) ?? {
			name: "Brian Lee",
			role: "admin"
		};
		try {
			await touchPresence(await getSql(), who.name);
		} catch {}
		return {
			ok: true,
			name: who.name,
			role: who.role
		};
	}
	const sql = await getSql();
	const user = await userForPin(sql, pin);
	if (!user) return {
		ok: false,
		name: "",
		role: "coach"
	};
	await touchPresence(sql, user.name);
	return {
		ok: true,
		name: user.name,
		role: user.role
	};
});
var listCoachUsers_createServerFn_handler = createServerRpc({
	id: "58a56cd4d8e8ad191b8872589a47a9d2c94c9aef45d1717a16290f019daf255c",
	name: "listCoachUsers",
	filename: "src/lib/coach-users.ts"
}, (opts) => listCoachUsers.__executeServer(opts));
var listCoachUsers = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(listCoachUsers_createServerFn_handler, async ({ data }) => {
	const pin = (data.pin || "").replace(/\D/g, "").trim();
	const empty = {
		ok: false,
		users: []
	};
	if (!pin) return empty;
	const { sql, admin } = await requireAdmin(pin);
	if (!admin) return empty;
	await touchPresence(sql, admin.name);
	try {
		let rows = [];
		try {
			rows = await sql`
          select u.id, u.name, u.role, p.last_seen, p.last_seen_ms
          from coach_users u
          left join coach_presence p on p.name = u.name
          order by case when u.role = 'admin' then 0 else 1 end, u.name
        `;
		} catch {
			rows = await sql`
          select u.id, u.name, u.role, p.last_seen
          from coach_users u
          left join coach_presence p on p.name = u.name
          order by u.name
        `;
		}
		return {
			ok: true,
			users: rows.map((r) => ({
				id: Number(r.id),
				name: String(r.name),
				role: String(r.role || "") === "admin" ? "admin" : "coach",
				online: isOnline(r.last_seen_ms, r.last_seen),
				lastSeen: r.last_seen instanceof Date ? r.last_seen.toISOString() : String(r.last_seen || "")
			}))
		};
	} catch {
		return {
			ok: true,
			users: []
		};
	}
});
var addCoachUser_createServerFn_handler = createServerRpc({
	id: "88c1c86b7c7293c47eb409e7b8a388e5c7a8b7216176c4452289d2c0730d863f",
	name: "addCoachUser",
	filename: "src/lib/coach-users.ts"
}, (opts) => addCoachUser.__executeServer(opts));
var addCoachUser = createServerFn({ method: "POST" }).validator(object({
	adminPin: string().trim().min(4).max(40),
	name: string().trim().min(1).max(60),
	pin: string().trim().min(4).max(8)
})).handler(addCoachUser_createServerFn_handler, async ({ data }) => {
	const { sql, admin } = await requireAdmin(data.adminPin.replace(/\D/g, ""));
	if (!admin) return {
		success: false,
		error: "Only the manager can add users."
	};
	const pin = data.pin.replace(/\D/g, "");
	if (pin === "0803") return {
		success: false,
		error: "That code is reserved."
	};
	try {
		await sql`
        insert into coach_users (name, pin, role)
        values (${data.name.trim()}, ${pin}, 'coach')
      `;
		return { success: true };
	} catch {
		try {
			await sql`
          insert into coach_users (name, pin)
          values (${data.name.trim()}, ${pin})
        `;
			return { success: true };
		} catch (err) {
			const message = err instanceof Error ? err.message : String(err);
			if (/unique|duplicate|23505/i.test(message)) return {
				success: false,
				error: "That code is already in use."
			};
			return {
				success: false,
				error: "Could not add user."
			};
		}
	}
});
var removeCoachUser_createServerFn_handler = createServerRpc({
	id: "969b7a4cf724523ef485f6e1b608bc3d96390ff1002de30f644e7cfa094b33fa",
	name: "removeCoachUser",
	filename: "src/lib/coach-users.ts"
}, (opts) => removeCoachUser.__executeServer(opts));
var removeCoachUser = createServerFn({ method: "POST" }).validator(object({
	adminPin: string().trim().min(4).max(40),
	id: number().int().positive()
})).handler(removeCoachUser_createServerFn_handler, async ({ data }) => {
	const { sql, admin } = await requireAdmin(data.adminPin.replace(/\D/g, ""));
	if (!admin) return {
		success: false,
		error: "Only the manager can remove users."
	};
	try {
		await sql`
        delete from coach_users
        where id = ${data.id} and pin <> ${FALLBACK_PIN} and name <> ${FALLBACK_NAME}
      `;
		return { success: true };
	} catch {
		return {
			success: false,
			error: "Could not remove user."
		};
	}
});
var heartbeatCoach_createServerFn_handler = createServerRpc({
	id: "07c6108479b017c8c0ba182af05f84239efcc885146540ca7fec07947e9060e5",
	name: "heartbeatCoach",
	filename: "src/lib/coach-users.ts"
}, (opts) => heartbeatCoach.__executeServer(opts));
var heartbeatCoach = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	seat: string().trim().max(40).optional()
})).handler(heartbeatCoach_createServerFn_handler, async ({ data }) => {
	const pin = data.pin.replace(/\D/g, "");
	const sql = await getSql();
	const seat = data.seat ? seatForName(data.seat) : null;
	if (pin === "0803" && seat) {
		await touchPresence(sql, seat.name);
		return { ok: true };
	}
	const user = await userForPin(sql, pin);
	if (!user) return { ok: false };
	await touchPresence(sql, user.name);
	return { ok: true };
});
var leaveCoach_createServerFn_handler = createServerRpc({
	id: "4afddbfc838070104451475c9f5db8bef0d510e3c4ad690001a41697828e631f",
	name: "leaveCoach",
	filename: "src/lib/coach-users.ts"
}, (opts) => leaveCoach.__executeServer(opts));
var leaveCoach = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	seat: string().trim().max(40).optional()
})).handler(leaveCoach_createServerFn_handler, async ({ data }) => {
	const pin = data.pin.replace(/\D/g, "");
	const sql = await getSql();
	const seat = data.seat ? seatForName(data.seat) : null;
	const name = pin === "0803" && seat ? seat.name : (await userForPin(sql, pin))?.name;
	if (!name) return { ok: false };
	try {
		await sql`delete from coach_presence where name = ${name}`;
	} catch {}
	return { ok: true };
});
//#endregion
export { addCoachUser_createServerFn_handler, checkCoachPin_createServerFn_handler, heartbeatCoach_createServerFn_handler, leaveCoach_createServerFn_handler, listCoachUsers_createServerFn_handler, removeCoachUser_createServerFn_handler };
