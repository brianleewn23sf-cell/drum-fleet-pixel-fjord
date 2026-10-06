import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, p as Legend, r as LineChart, s as Line } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fitness-progress-chart-Cn2-y2Kd.js
var import_jsx_runtime = require_jsx_runtime();
function FitnessProgressChart({ rows, print = false, height = 220 }) {
	const data = [...rows].sort((a, b) => a.testedOn.localeCompare(b.testedOn)).map((r) => ({
		label: r.testedOn.slice(5),
		without: r.zz50NoBall,
		withBall: r.zz50Ball,
		extra: r.zz50Diff,
		eff: r.ballEff
	}));
	if (data.length < 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: print ? "text-sm text-[#3a3834]" : "text-sm text-muted",
		children: "Save more than one test date and the line graph will grow through the season."
	});
	const ink = print ? "#0c0c0d" : "#ffffff";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			width: "100%",
			height
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: print ? "#d4cfc4" : "var(--color-border)",
						strokeDasharray: "3 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						stroke: ink,
						tick: {
							fill: ink,
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						stroke: ink,
						tick: {
							fill: ink,
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						width: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: print ? "#f3efe6" : "var(--color-surface)",
						border: "1px solid var(--color-border)",
						color: ink
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						color: ink,
						fontSize: 11
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "without",
						name: "Without ball",
						stroke: ink,
						strokeWidth: 2,
						dot: { r: 3 },
						connectNulls: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "withBall",
						name: "With ball",
						stroke: "#b42318",
						strokeWidth: 2,
						dot: { r: 3 },
						connectNulls: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "eff",
						name: "Ball efficiency %",
						stroke: "#c9a227",
						strokeWidth: 2,
						dot: { r: 3 },
						connectNulls: true
					})
				]
			})
		})
	});
}
//#endregion
export { FitnessProgressChart as t };
