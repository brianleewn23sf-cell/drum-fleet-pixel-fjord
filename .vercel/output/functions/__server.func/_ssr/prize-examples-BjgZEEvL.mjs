import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PRIZE_LINE, t as MARKS_FROM } from "./score-from-j42ACoaw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prize-examples-BjgZEEvL.js
var import_jsx_runtime = require_jsx_runtime();
var EXAMPLES = [
	{
		grade: 5,
		label: "Academy",
		pts: "5 + 5 = 10",
		how: "Fast and the ball barely costs him"
	},
	{
		grade: 4,
		label: "Strong",
		pts: "5 + 4 = 9",
		how: "Good speed, good on the ball"
	},
	{
		grade: 3,
		label: "Decent",
		pts: "5 + 3 = 8",
		how: "In the mix — keep training at home"
	},
	{
		grade: 2,
		label: "Developing",
		pts: "5 + 2 = 7",
		how: "The ball is still slowing him"
	},
	{
		grade: 1,
		label: "Needs work",
		pts: "5 + 1 = 6",
		how: "Complete the test, then practise"
	}
];
function PrizeExamples() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-2xl font-bold uppercase tracking-tight text-fg",
				children: "Points make prizes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm font-semibold leading-7 text-fg",
				children: PRIZE_LINE
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: [
					"Marks start ",
					MARKS_FROM.slice(8),
					"/",
					MARKS_FROM.slice(5, 7),
					"/",
					MARKS_FROM.slice(0, 4),
					". Nothing is given out until the 3rd Monday. More points, better chance of a prize — boxed medal 1st, medals 2nd and 3rd, certificate for 1st."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: "Training at home helps. Zigzag, 30m, turns, receiving on the back foot in an open body. Closer times with the ball lift the grade. Grade 5 is academy for age 11."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-semibold uppercase tracking-wider text-accent",
				children: "Example only — not this month’s prizes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1.5 text-sm",
				children: EXAMPLES.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: ["Grade ", row.grade]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							" · ",
							row.label,
							" · ",
							row.how
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 tabular-nums text-accent",
						children: row.pts
					})]
				}, row.grade))
			})
		]
	});
}
//#endregion
export { PrizeExamples as t };
