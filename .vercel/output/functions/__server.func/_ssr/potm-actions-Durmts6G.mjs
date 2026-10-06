import { n as createServerFn } from "./ssr.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/potm-actions-Durmts6G.js
var getPotm = createServerFn({ method: "POST" }).validator(object({ month: string().regex(/^\d{4}-\d{2}$/).optional() }).optional()).handler(createSsrRpc("844e1804fec5a41884f5adccb7bd7f63900220b12e730e32b8d0a35ea090f8bc"));
var getTrainerYear = createServerFn({ method: "POST" }).handler(createSsrRpc("73ea935c314b4652f78b467a0209d16bf1153f166e683063dd3361c8b2f0c1fc"));
var awardPotm = createServerFn({ method: "POST" }).validator(object({
	month: string().regex(/^\d{4}-\d{2}$/),
	player: string().trim().min(1)
})).handler(createSsrRpc("8ee3c7014647a593769d2cfde28ee6be24d0eb74816ff32bcccfe3fd23135c1c"));
//#endregion
export { getPotm as n, getTrainerYear as r, awardPotm as t };
