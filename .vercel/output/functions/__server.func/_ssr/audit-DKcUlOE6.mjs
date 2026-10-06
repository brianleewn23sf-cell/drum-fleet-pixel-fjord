import { n as createServerFn } from "./ssr.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-DKcUlOE6.js
var audit_exports = /* @__PURE__ */ __exportAll({
	listAudit: () => listAudit,
	writeAudit: () => writeAudit
});
async function writeAudit(input) {
	queueMicrotask(() => {
		(async () => {
			try {
				await (await getSql())`
          insert into audit_log (actor, role, action, detail, player)
          values (
            ${input.actor.slice(0, 80)},
            ${(input.role || "").slice(0, 20)},
            ${input.action.slice(0, 60)},
            ${(input.detail || "").slice(0, 240)},
            ${input.player ? input.player.slice(0, 80) : null}
          )
        `;
			} catch {}
		})();
	});
}
var listAudit = createServerFn({ method: "POST" }).validator(object({ coachPin: string().trim().min(4).max(40) })).handler(createSsrRpc("3d4751bcd8d7bb76fa0c54c72440a4b903582be78a162064ff74f11f088914e9"));
//#endregion
export { listAudit as n, audit_exports as t };
