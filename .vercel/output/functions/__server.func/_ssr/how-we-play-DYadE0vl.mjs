import { C as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { t as ParentRules } from "./parent-rules-BPzTwJIp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-we-play-DYadE0vl.js
var import_jsx_runtime = require_jsx_runtime();
function HowWePlayPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { boardLink: "vote" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 overflow-y-auto px-4 py-4 pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shape",
				className: "mb-4 inline-flex h-11 items-center rounded-md border border-border bg-surface px-4 text-xs font-semibold uppercase tracking-wide text-fg",
				children: "Team shape pictures"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentRules, {})]
		})]
	});
}
//#endregion
export { HowWePlayPage as component };
