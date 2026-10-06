import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-BXpBrast.js
var listAudit_createServerFn_handler = createServerRpc({
	id: "3d4751bcd8d7bb76fa0c54c72440a4b903582be78a162064ff74f11f088914e9",
	name: "listAudit",
	filename: "src/lib/audit.ts"
}, (opts) => listAudit.__executeServer(opts));
var listAudit = createServerFn({ method: "POST" }).validator(object({ coachPin: string().trim().min(4).max(40) })).handler(listAudit_createServerFn_handler, async ({ data }) => {
	const { checkCoachPin, isAdminName } = await import("./coach-users-DQwpwPHR.mjs").then((n) => n.o).then((n) => n.o);
	const who = await checkCoachPin({ data: { pin: data.coachPin } });
	if (!who.ok || who.role !== "admin" && !isAdminName(who.name)) return { rows: [] };
	const sql = await getSql();
	try {
		return { rows: (await sql`
        select id, at, actor, role, action, detail, player
        from audit_log
        order by at desc
        limit 80
      `).map((r) => ({
			id: Number(r.id),
			at: r.at instanceof Date ? r.at.toISOString() : String(r.at || ""),
			actor: String(r.actor || ""),
			role: String(r.role || ""),
			action: String(r.action || ""),
			detail: String(r.detail || ""),
			player: String(r.player || "")
		})) };
	} catch {
		return { rows: [] };
	}
});
//#endregion
export { listAudit_createServerFn_handler };
