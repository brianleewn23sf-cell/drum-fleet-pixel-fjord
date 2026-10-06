import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent-presence-Cn_O1Rtq.js
var import_jsx_runtime = require_jsx_runtime();
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted", className),
		...props
	});
}
var controlClass = "h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg outline-none transition-colors duration-150 placeholder:text-subtle focus:border-border-strong focus:ring-2 focus:ring-accent/50";
function FieldInput({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn(controlClass, className),
		...props
	});
}
function FieldSelect({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		className: cn(controlClass, "appearance-none pr-8", className),
		...props,
		children
	});
}
function guestId() {
	if (typeof window === "undefined") return "";
	const key = "bulls-parent-sid";
	let id = window.sessionStorage.getItem(key);
	if (!id) {
		id = `g-${Math.random().toString(36).slice(2, 10)}`;
		window.sessionStorage.setItem(key, id);
	}
	return id;
}
var heartbeatParent = createServerFn({ method: "POST" }).validator(object({
	sid: string().trim().min(1).max(40),
	child: string().trim().max(80).optional(),
	page: string().trim().max(24).optional()
})).handler(createSsrRpc("1acde48274c6653ba71bf6d988118e7fdc3b34d0330a9d1a3952675051c0bbda"));
var listParentPresence = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(createSsrRpc("aa9864e59c8f80674896532e4b787441db45b7b42e35845f5dc4c6ce3810baf4"));
var listPerfUsers = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().max(40).optional() })).handler(createSsrRpc("cce59645373fa4d040955c50ba69e3abcc3934cf3846a004bc4e22edd28b27d7"));
function parentSessionId() {
	return guestId();
}
//#endregion
export { listParentPresence as a, heartbeatParent as i, FieldLabel as n, listPerfUsers as o, FieldSelect as r, parentSessionId as s, FieldInput as t };
