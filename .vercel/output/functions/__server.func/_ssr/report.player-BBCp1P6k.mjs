import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as PlayerWeekReport } from "./player-week-report-DPVGZH4i.mjs";
import { i as Route$5 } from "./router-DBOPb28Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report.player-BBCp1P6k.js
var import_jsx_runtime = require_jsx_runtime();
function ReportPage() {
	const { name } = Route$5.useSearch();
	if (!name) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Pick a player from Performance."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerWeekReport, { player: name });
}
//#endregion
export { ReportPage as component };
