import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as publicName } from "./players-CZr5uoUS.mjs";
import { n as PRIZE_LINE } from "./score-from-j42ACoaw.mjs";
import { n as formatKickoff } from "./when-BGtZJU2t.mjs";
import { c as septemberPodium, n as PLAYERS_PLAYER_POINTS, t as OPP_MOM_POINTS } from "./potm-BIYA_DOQ.mjs";
import { c as MANAGER_NAME, i as ASSISTANT_NAME, m as TRAINING_VENUE, p as TRAINING_NIGHT, s as COACH_NAME } from "./brand-C_wD2nfD.mjs";
import { p as Medal, r as Trophy } from "../_libs/lucide-react.mjs";
import { t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { i as topNWithTies, n as placeAt } from "./score-categories-Bc3Qq1vP.mjs";
import { n as getPotm } from "./potm-actions-Durmts6G.mjs";
import { t as PrizeExamples } from "./prize-examples-BjgZEEvL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/month-CegNyRWJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PLACES = [
	{
		place: "1st",
		title: "Boxed medal",
		blurb: "Player of the month. Boxed medal, certificate, name on the board."
	},
	{
		place: "2nd",
		title: "Medal",
		blurb: "Runner-up medal on the 3rd Monday."
	},
	{
		place: "3rd",
		title: "Medal",
		blurb: "Third-place medal on the 3rd Monday."
	}
];
function PotmGuide() {
	const [standings, setStandings] = (0, import_react.useState)([]);
	const [period, setPeriod] = (0, import_react.useState)(null);
	const [awarded, setAwarded] = (0, import_react.useState)(false);
	const [podium, setPodium] = (0, import_react.useState)(septemberPodium);
	(0, import_react.useEffect)(() => {
		getPotm({ data: {} }).then((data) => {
			setStandings((data.standings || []).filter((row) => row.total > 0));
			setPeriod(data.window);
			setAwarded(Boolean(data.winner));
			setPodium(data.lastPodium ?? septemberPodium());
		}).catch(() => {
			setStandings([]);
		});
	}, []);
	const monday = period ? formatKickoff(`${period.awardMonday}T12:00`, "EEEE d MMMM yyyy") : "";
	const top = topNWithTies(standings, (row) => row.total, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { boardLink: "vote" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 overflow-y-auto px-4 py-4 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: "Cherrybrook FC · Raging Bulls U12s"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl font-bold uppercase tracking-tight",
					children: "Player of the month"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm font-semibold leading-relaxed text-fg",
					children: PRIZE_LINE
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: [
						"Every lad can win it. Zigzag, 30m, turns, ball on the back foot — train at home and the grade goes up. This is the live table. Medals and the certificate wait until the",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-fg",
							children: "3rd Monday"
						}),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted",
					children: "This is the live October table, from the day after 21 September through the 3rd Monday. Both Fridays count. Daisy Hill is in: Jacob Sands opposition MOM +20, Louie Biddiss manager’s player +10. Friday training is in the same total (attendance 10 + effort, attitude and achievement, max 40)."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 overflow-hidden rounded-xl border border-border bg-surface shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold uppercase tracking-tight",
								children: period?.label || "October 2026"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [awarded ? "Locked on the 3rd Monday." : "Top 3. Anyone level with 3rd stays on. Medals wait until the 3rd Monday.", monday ? ` Next medals ${monday}.` : ""]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2 bg-elevated px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1",
									children: "Player"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right",
									children: "3-2-1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-12 text-right",
									children: "Train"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right",
									children: "MOM"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right",
									children: "Mgr"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right",
									children: "Tot"
								})
							]
						}),
						!top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-4 py-4 text-sm text-muted",
							children: "No points in October yet."
						}) : top.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 border-t border-border px-3 py-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-2 text-muted",
										children: placeAt(i, top.map((r) => r.total))
									}), publicName(row.name)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right tabular-nums text-muted",
									children: row.parentPts || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-12 text-right tabular-nums text-muted",
									children: row.trainingPts || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right tabular-nums text-muted",
									children: row.oppMom ? row.oppMom * OPP_MOM_POINTS : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right tabular-nums text-muted",
									children: row.playersPlayer ? row.playersPlayer * PLAYERS_PLAYER_POINTS : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-9 text-right font-semibold tabular-nums",
									children: row.total
								})
							]
						}, row.name))
					]
				}),
				podium ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-xl border border-accent/40 bg-accent-soft p-4 shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-accent",
							children: ["Awarded · ", podium.label]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-xl font-bold uppercase tracking-tight",
							children: "Congratulations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm font-semibold leading-6 text-fg",
							children: [
								"Big congratulations to ",
								publicName(podium.first),
								" for 1st, ",
								publicName(podium.second),
								" 2nd and ",
								publicName(podium.third),
								" 3rd."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "mt-3 space-y-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"1st · ",
									publicName(podium.first),
									" · boxed medal"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"2nd · ",
									publicName(podium.second),
									" · medal"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"3rd · ",
									publicName(podium.third),
									" · medal"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [
								"New month is open. Next medals on the 3rd Monday",
								monday ? ` · ${monday}` : "",
								"."
							]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-xl border border-border bg-surface p-4 shadow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold uppercase tracking-tight",
							children: "The medals"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 mb-4 text-sm text-muted",
							children: [
								"Presented by ",
								MANAGER_NAME,
								", head coach ",
								COACH_NAME,
								" and assistant ",
								ASSISTANT_NAME,
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "flex flex-col gap-3",
							children: PLACES.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: i === 0 ? "flex gap-3 rounded-lg border border-accent bg-accent-soft px-3 py-3" : "flex gap-3 rounded-lg border border-border bg-elevated px-3 py-3",
								children: [i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mt-0.5 size-6 shrink-0 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Medal, { className: "mt-0.5 size-6 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-xl font-bold uppercase tracking-tight",
									children: [
										row.place,
										" · ",
										row.title
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: row.blurb
								})] })]
							}, row.place))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold uppercase tracking-tight",
							children: "How points are picked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: "Add these up from the 1st of the month through the 3rd Monday. Highest total is 1st, then 2nd, then 3rd. Ties are split on parent 3-2-1, then name."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 overflow-hidden rounded-xl border border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1",
										children: "What we count"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pts" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRow, {
									label: "Parent 3-2-1 votes",
									detail: "3, 2 or 1 each ballot. From Standish, the family who votes also gets 1 for their own child.",
									value: "as voted"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRow, {
									label: "Training award",
									detail: `${TRAINING_NIGHT} · ${TRAINING_VENUE} · attendance 10 + effort 10 + attitude 10 + achievement 10. Achievement is a strict perfect mark. Lose marks: not turning up, booting balls when Brian is talking, messing about, swearing.`,
									value: "max 40"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRow, {
									label: "Games played",
									detail: "5 points every time he is in the squad that plays.",
									value: "+5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRow, {
									label: "Opposition MOM",
									detail: "Their manager’s man of the match",
									value: `+${OPP_MOM_POINTS}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRow, {
									label: "Players’ / manager’s player",
									detail: "One game-day pick, same award",
									value: `+${PLAYERS_PLAYER_POINTS}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRow, {
									label: "Performance tests",
									detail: "+5 to complete each drill. Speed /10 vs age 11 from GO to the last cones (not when the camera stops). Technique /5.",
									value: "+5 · /10 · /5"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-xl border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold uppercase tracking-tight",
							children: "When it is awarded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: [
								"Always the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: "3rd Monday of the month"
								}),
								". Next presentation",
								monday ? `: ${monday}` : " is posted on Coach → Month",
								". After that Monday we lock the table and the medals go out. Until then this is only the running order."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted",
							children: [
								"1st also gets the Player of the month certificate — crest, motto, scores — awarded by ",
								MANAGER_NAME,
								", head coach ",
								COACH_NAME,
								", assistant ",
								ASSISTANT_NAME,
								"."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrizeExamples, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center font-display text-sm font-bold uppercase tracking-widest text-accent",
					children: "Venimus, vidimus, vicimus"
				})
			]
		})]
	});
}
function ScoreRow({ label, detail, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-3 border-t border-border px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: detail
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "shrink-0 text-right text-sm font-semibold tabular-nums text-accent",
			children: value
		})]
	});
}
function MonthPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PotmGuide, {});
}
//#endregion
export { MonthPage as component };
