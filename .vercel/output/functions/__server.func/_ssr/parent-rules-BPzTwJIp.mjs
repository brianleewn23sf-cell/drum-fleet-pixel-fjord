import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PRIZE_LINE } from "./score-from-j42ACoaw.mjs";
import { n as Button } from "./app-header-COF4H8CL.mjs";
import { n as HOME_TEST_PARAMS } from "./home-tests-DA9-SOa_.mjs";
import { a as TRAINING_MARKS_LOSE, i as TRAINING_MARKS_INTRO, n as PLAYED_POINTS_RULE, o as VOTING_RULES, r as RULE_ROWS, s as VOTING_RULES_INTRO, t as BULLS_RULES_WAY } from "./youth-rules-BuIp-_r1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/parent-rules-BPzTwJIp.js
var import_jsx_runtime = require_jsx_runtime();
function VotingRules({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-accent bg-accent-soft p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-semibold uppercase tracking-wider text-accent",
				children: "How to vote"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-fg",
				children: VOTING_RULES_INTRO
			}),
			compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1 text-sm text-fg",
				children: VOTING_RULES.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
			})
		]
	});
}
function ParentRules() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold uppercase tracking-tight",
				children: "How we play"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "U12 9v9 · FA 2026/27 · Wigan & District Youth League"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
					className: "w-full text-left text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: RULE_ROWS.map(([label, value], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 ? "bg-elevated" : "bg-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "w-24 px-3 py-2 align-top text-xs font-semibold uppercase tracking-wide text-accent",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-fg",
							children: value
						})]
					}, label)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg border border-accent bg-accent-soft p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold uppercase tracking-wide text-accent",
						children: "The Bulls way"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-fg",
						children: BULLS_RULES_WAY
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-semibold text-fg",
						children: PRIZE_LINE
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg border border-border bg-bg p-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold uppercase tracking-wide text-accent",
					children: "Games played"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-fg",
					children: PLAYED_POINTS_RULE
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg border border-border bg-bg p-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold uppercase tracking-wide text-accent",
						children: "Training marks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-fg",
						children: TRAINING_MARKS_INTRO
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-1 text-fg",
						children: TRAINING_MARKS_LOSE.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-lg border border-border bg-bg p-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold uppercase tracking-wide text-accent",
					children: "Home tests"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-1 text-fg",
					children: HOME_TEST_PARAMS.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [label, ":"]
						}),
						" ",
						value
					] }, label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VotingRules, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				variant: "outline",
				onClick: () => {
					globalThis.location.href = "/report/rules";
				},
				children: "One-page card / PDF"
			})
		]
	});
}
//#endregion
export { ParentRules as t };
