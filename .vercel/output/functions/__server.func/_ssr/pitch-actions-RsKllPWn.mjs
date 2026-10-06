import { n as createServerFn } from "./ssr.mjs";
import { c as record, i as boolean, l as string, n as _enum, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pitch-actions-RsKllPWn.js
var getMatchPlans = createServerFn({ method: "POST" }).handler(createSsrRpc("82f718efc2bf0885613f992fb42ad4fa1cb9145dfb8d43b3c67a6e390b2aea8e"));
var saveMatchPlan = createServerFn({ method: "POST" }).validator(object({
	opposition: string().trim().min(1).max(80),
	kickoff: string().trim().min(1).max(32),
	venue: string().trim().max(120),
	home: boolean(),
	formation: string().trim().min(1).max(20),
	kit: _enum(["home", "away"]),
	lineup: record(string(), string()),
	brief: record(string(), object({
		duty: string().max(800).optional(),
		withBall: string().max(1200).optional(),
		withoutBall: string().max(1200).optional()
	})).optional()
})).handler(createSsrRpc("debe10449e40a1948a18dda26ac1304a2b1c8903a72bce52b286651bae96ac2e"));
//#endregion
export { saveMatchPlan as n, getMatchPlans as t };
