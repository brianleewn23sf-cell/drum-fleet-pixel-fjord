import { r as __exportAll } from "../_runtime.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { l as string, o as number, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as FALLBACK_NAME } from "./pins-D3aXuxPO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-users-DQwpwPHR.js
var coach_users_DQwpwPHR_exports = /* @__PURE__ */ __exportAll({
	a: () => checkCoachPin,
	c: () => leaveCoach,
	i: () => canSaveName,
	l: () => listCoachUsers,
	n: () => SAVE_LOCK,
	o: () => coach_users_exports,
	r: () => addCoachUser,
	s: () => isAdminName,
	t: () => ONLINE_MS,
	u: () => removeCoachUser
});
var coach_users_exports = /* @__PURE__ */ __exportAll$1({
	FALLBACK_NAME: () => FALLBACK_NAME,
	FALLBACK_PIN: () => FALLBACK_PIN,
	ONLINE_MS: () => ONLINE_MS,
	SAVE_LOCK: () => SAVE_LOCK,
	addCoachUser: () => addCoachUser,
	canSaveName: () => canSaveName,
	checkCoachPin: () => checkCoachPin,
	isAdminName: () => isAdminName,
	leaveCoach: () => leaveCoach,
	listCoachUsers: () => listCoachUsers,
	removeCoachUser: () => removeCoachUser
});
function isAdminName(name) {
	return name.trim().toLowerCase() === FALLBACK_NAME.toLowerCase();
}
function canSaveName(name) {
	const n = name.trim().toLowerCase();
	return n === "Brian Lee".toLowerCase() || n === "connor lee";
}
var SAVE_LOCK = "Look and move freely — only Brian and Connor can save.";
var ONLINE_MS = 45e3;
var checkCoachPin = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	seat: string().trim().max(40).optional()
})).handler(createSsrRpc("4f278575934ce5b88ecb7fa90497f6616067870a2cedb2e85e302c59484d0c8c"));
var listCoachUsers = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(createSsrRpc("58a56cd4d8e8ad191b8872589a47a9d2c94c9aef45d1717a16290f019daf255c"));
var addCoachUser = createServerFn({ method: "POST" }).validator(object({
	adminPin: string().trim().min(4).max(40),
	name: string().trim().min(1).max(60),
	pin: string().trim().min(4).max(8)
})).handler(createSsrRpc("88c1c86b7c7293c47eb409e7b8a388e5c7a8b7216176c4452289d2c0730d863f"));
var removeCoachUser = createServerFn({ method: "POST" }).validator(object({
	adminPin: string().trim().min(4).max(40),
	id: number().int().positive()
})).handler(createSsrRpc("969b7a4cf724523ef485f6e1b608bc3d96390ff1002de30f644e7cfa094b33fa"));
createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	seat: string().trim().max(40).optional()
})).handler(createSsrRpc("07c6108479b017c8c0ba182af05f84239efcc885146540ca7fec07947e9060e5"));
var leaveCoach = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	seat: string().trim().max(40).optional()
})).handler(createSsrRpc("4afddbfc838070104451475c9f5db8bef0d510e3c4ad690001a41697828e631f"));
//#endregion
export { checkCoachPin as a, leaveCoach as c, canSaveName as i, listCoachUsers as l, SAVE_LOCK as n, coach_users_DQwpwPHR_exports as o, addCoachUser as r, isAdminName as s, ONLINE_MS as t, removeCoachUser as u };
