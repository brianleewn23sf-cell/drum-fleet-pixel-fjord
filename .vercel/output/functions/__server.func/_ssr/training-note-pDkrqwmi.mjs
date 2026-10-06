import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer, i as matchSquadPlayer, u as publicName } from "./players-CZr5uoUS.mjs";
import { t as computeTotals } from "./league-Ch1nTJJB.mjs";
import { o as playerDrillLines } from "./test-bonus-DvKLNi3p.mjs";
import { m as TRAINING_VENUE, p as TRAINING_NIGHT } from "./brand-C_wD2nfD.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as scoreFull, t as averageMonthlyFull } from "./score-actions-DgqUGgog.mjs";
import { i as topNWithTies, n as placeAt, r as top3Category, t as SCORE_CATEGORIES } from "./score-categories-Bc3Qq1vP.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, n as BarChart, p as Legend, u as Bar } from "../_libs/recharts+[...].mjs";
import { t as ChartFrame } from "./player-week-report-DPVGZH4i.mjs";
import { a as TRAINING_MARKS_LOSE, i as TRAINING_MARKS_INTRO } from "./youth-rules-BuIp-_r1.mjs";
import { i as scoreTrainerYear } from "./trainer-year-BiJeg2Qv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-note-pDkrqwmi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashSection({ eyebrow, title, note, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-1",
			children: [
				eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-accent",
					children: eyebrow
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold uppercase leading-none tracking-tight text-fg",
					children: title
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-6 text-muted",
					children: note
				}) : null
			]
		}), children]
	});
}
function DashKpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl font-bold tabular-nums leading-none tracking-tight text-fg",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function RankList({ rows }) {
	const list = rows.filter((r) => r.pts > 0);
	if (!list.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm leading-6 text-muted",
		children: "No points in this table yet."
	});
	const marks = list.map((r) => r.pts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-3 divide-y divide-border",
		children: list.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between gap-3 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("w-6 shrink-0 font-display text-xl font-bold tabular-nums", i === 0 ? "text-accent" : "text-muted"),
					children: placeAt(i, marks)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate font-medium text-fg",
					children: publicName(row.name)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "shrink-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block font-display text-xl font-bold tabular-nums text-fg",
					children: row.pts
				}), row.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] tabular-nums text-muted",
					children: row.detail
				}) : null]
			})]
		}, row.name))
	});
}
function Podium({ title, note, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-5 text-muted",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankList, { rows })
		]
	});
}
function ParentLeaders({ players, history, awards, sessions, tests, appearances }) {
	const seasonTable = (0, import_react.useMemo)(() => scoreFull(players, history, awards, sessions, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const monthly = (0, import_react.useMemo)(() => averageMonthlyFull(players, history, awards, sessions, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const avgRows = (0, import_react.useMemo)(() => topNWithTies(monthly, (r) => r.avg, 3).map((row) => ({
		name: row.name,
		pts: Math.round(row.avg * 10) / 10
	})), [monthly]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Podium, {
			title: "Monthly avg",
			note: "Overall score per prize month. Votes, MOM, manager, training and tests.",
			rows: avgRows
		}), SCORE_CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Podium, {
			title: cat.title,
			note: cat.note,
			rows: cat.id === "tests" ? top3Category(seasonTable, cat.pts).map((row) => {
				const line = playerDrillLines(tests, row.name).find((l) => l.kind === "s30_no");
				return {
					...row,
					detail: line?.timeLabel && line.timeLabel !== "—" ? line.timeLabel : void 0
				};
			}) : top3Category(seasonTable, cat.pts)
		}, `season-${cat.id}`))]
	});
}
function SeasonTable({ players, history, appearances, awards = [], sessions = [], tests = [], loading, emptyLabel = "No votes yet.", publicOnly = true }) {
	const table = (0, import_react.useMemo)(() => scoreFull(players, history, awards, sessions, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const scored = (0, import_react.useMemo)(() => topNWithTies(table, (t) => t.total, 3), [table]);
	const maxPts = Math.max(1, ...scored.map((t) => t.total), 1);
	const chartData = (0, import_react.useMemo)(() => scored.map((t) => ({
		label: publicOnly ? publicName(t.name) : parsePlayer(t.name).first,
		pts: t.total,
		parent: t.parentPts,
		mom: t.oppMomPts,
		pp: t.playersPlayerPts,
		train: t.trainingPts,
		games: t.games,
		full: publicOnly ? publicName(t.name) : parsePlayer(t.name).name
	})), [scored, publicOnly]);
	if (loading && !players.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-surface px-4 py-8 text-center text-sm text-muted",
		children: "Loading the table…"
	});
	if (!scored.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-surface px-4 py-10 text-center text-sm text-muted",
		children: emptyLabel
	});
	const chartHeight = Math.max(180, scored.length * 32);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: scored.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerRow, {
				item,
				index: placeAt(index, scored.map((r) => r.total)) - 1,
				maxPts,
				publicOnly
			}, item.name))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-surface p-3 shadow-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted",
				children: "Top 3 · total points"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				height: chartHeight,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						layout: "vertical",
						margin: {
							top: 4,
							right: 12,
							left: 4,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3",
								horizontal: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								allowDecimals: false,
								stroke: "var(--color-subtle)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "label",
								width: 68,
								stroke: "var(--color-subtle)",
								tick: {
									fill: "var(--color-fg)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-accent-soft)" },
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "pts",
								fill: "var(--color-accent)",
								radius: [
									0,
									4,
									4,
									0
								],
								barSize: 14,
								name: "Total",
								isAnimationActive: false
							})
						]
					})
				})
			})]
		})]
	});
}
function ChartTooltip({ active, payload }) {
	if (!active || !payload?.[0]) return null;
	const d = payload[0].payload;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-elevated px-3 py-2 text-xs shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold text-fg",
			children: d.full
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 tabular-nums text-muted",
			children: [d.pts, " pts"]
		})]
	});
}
function PlayerRow({ item, index, maxPts, publicOnly }) {
	const p = parsePlayer(item.name);
	const width = Math.max(6, Math.round(item.total / maxPts * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-7 text-center text-sm font-semibold tabular-nums text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: index === 0 ? "text-accent" : void 0,
							children: index + 1
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-md bg-elevated text-xs font-bold",
						children: p.initials
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-semibold",
							children: publicOnly ? publicName(item.name) : p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs tabular-nums text-muted",
							children: publicOnly ? `${item.total} pts` : `Parents ${item.parentPts} · MOM ${item.oppMomPts} · Players’ ${item.playersPlayerPts} · Train ${item.trainingPts} · Tests ${item.testPts}`
						})]
					}),
					publicOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-bold tabular-nums text-accent",
						children: item.total
					}) : null
				]
			}),
			publicOnly ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2 border-t border-border pt-2.5 text-center sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: item.total,
						label: "Total",
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: item.parentPts,
						label: "Parents"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: item.oppMomPts + item.playersPlayerPts,
						label: "Awards"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: item.trainingPts,
						label: "Training"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2.5 h-1.5 overflow-hidden rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-accent transition-[width] duration-500",
					style: { width: `${width}%` }
				})
			})
		]
	});
}
function Stat({ value, label, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("font-display text-xl font-bold leading-none tabular-nums", accent ? "text-accent" : "text-fg"),
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs font-semibold uppercase tracking-wider text-subtle",
		children: label
	})] });
}
function RunningBull() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 40 26",
		className: "h-6 w-8 drop-shadow-sm",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6 13c-3-1-5-4-4-6",
				fill: "none",
				stroke: "#1a1a1a",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "15",
				cy: "14",
				rx: "9",
				ry: "5.2",
				fill: "#b42318"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 17v6M13 17.5v6M18 17.5v6M23 17v6",
				stroke: "#111",
				strokeWidth: "1.7",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "27",
				cy: "12",
				rx: "5.2",
				ry: "4",
				fill: "#b42318"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 9c-1-4 2-6 3-3M29 8c2-4 5-3 4 0",
				fill: "none",
				stroke: "#f5c518",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "32.2",
				cy: "13",
				rx: "2.3",
				ry: "1.6",
				fill: "#1a1a1a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "28.5",
				cy: "11",
				r: "0.7",
				fill: "#f5c518"
			})
		]
	});
}
function ParentVoteBars({ title, note, players, votes, everyone = false, embedded = false }) {
	const top = (0, import_react.useMemo)(() => {
		const table = computeTotals(players, votes);
		if (!everyone) return topNWithTies(table, (t) => t.pts, 3);
		return table.filter((row) => row.pts > 0).sort((a, b) => b.pts - a.pts || a.name.localeCompare(b.name));
	}, [
		players,
		votes,
		everyone
	]);
	const max = top[0]?.pts || 1;
	const places = top.map((row) => row.pts);
	const live = /^current round/i.test(title);
	const heading = live ? title.replace(/^current round\s·\s/i, "") : title;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: embedded ? "border-t border-border" : "overflow-hidden rounded-2xl border border-border bg-surface shadow-panel",
		children: [embedded ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-kit-navy px-4 py-3 text-kit-navy-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-kit-gold",
				children: live ? "Current round" : "Parent 3-2-1"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold uppercase leading-tight tracking-tight sm:text-xl",
					children: heading
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "shrink-0 text-right text-[11px] font-semibold uppercase tracking-wider text-white/70",
					children: [
						votes.length,
						" vote",
						votes.length === 1 ? "" : "s",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-kit-gold",
							children: "Live"
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-3",
			children: [
				embedded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-semibold uppercase tracking-[0.18em] text-kit-gold",
						children: "Live bar graph"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wider text-muted",
						children: [
							votes.length,
							" vote",
							votes.length === 1 ? "" : "s"
						]
					})]
				}) : null,
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-snug text-muted",
					children: note
				}) : null,
				top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-semibold uppercase tracking-wider text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 rounded-full bg-[#f5c518]" }), "3 points"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 rounded-full bg-[#2f9bff]" }), "2 points"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "size-2.5 rounded-full bg-[#ff4d3a]" }), "1 point"]
						})
					]
				}) : null,
				!top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No votes for this round yet. The places fill in as families vote."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 flex flex-col gap-2",
					children: top.map((row, i) => {
						const place = placeAt(i, places);
						const pct = Math.max(8, Math.round(row.pts / max * 100));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-xl border border-border bg-bg px-3 py-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: place === 1 ? "flex size-9 shrink-0 items-center justify-center rounded-full bg-kit-gold font-display text-sm font-bold text-kit-navy" : place === 2 ? "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2f9bff] font-display text-sm font-bold text-white" : "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#ff4d3a] font-display text-sm font-bold text-white",
									children: place
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-semibold",
												children: publicName(row.name)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-display text-lg font-bold tabular-nums leading-none",
												children: [row.pts, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-muted",
													children: "pts"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mt-1 h-8",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-3 rounded-full bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bull-fill absolute bottom-0 left-0 h-8",
												style: {
													["--target"]: `${pct}%`,
													animationDelay: `${i * 90}ms`
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "absolute inset-x-0 bottom-0 flex h-3 overflow-hidden rounded-full",
													children: [
														row.n3 > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-[#f5c518]",
															style: { width: `${row.n3 * 3 / row.pts * 100}%` }
														}) : null,
														row.n2 > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-[#2f9bff]",
															style: { width: `${row.n2 * 2 / row.pts * 100}%` }
														}) : null,
														row.n1 > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "h-full bg-[#ff4d3a]",
															style: { width: `${row.n1 / row.pts * 100}%` }
														}) : null
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "bull-gallop pointer-events-none absolute bottom-3 right-0",
													style: { animationDelay: `${i * 90}ms` },
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunningBull, {})
												})]
											}, `${row.pts}-${row.n3}-${row.n2}-${row.n1}`)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-[10px] font-semibold uppercase tracking-wider",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[#f5c518]",
													children: [row.n3, " × 3"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1.5 text-border",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[#2f9bff]",
													children: [row.n2, " × 2"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "px-1.5 text-border",
													children: "·"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[#ff4d3a]",
													children: [row.n1, " × 1"]
												})
											]
										})
									]
								})]
							})
						}, row.name);
					})
				})
			]
		})]
	});
}
function TrainingTop3({ players, sessions }) {
	const top = (0, import_react.useMemo)(() => topNWithTies(scoreTrainerYear(players, sessions), (r) => r.pts, 3), [players, sessions]);
	const nights = sessions.filter((s) => s.marks.some((m) => m.attended)).length;
	const chartData = (0, import_react.useMemo)(() => top.map((t) => ({
		label: publicName(t.name),
		pts: t.pts
	})), [top]);
	const height = Math.max(160, top.length * 44);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold uppercase tracking-tight",
				children: "Top 3 · training"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Friday nights only. Attendance, effort, attitude, achievement (max 40 a night)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs tabular-nums text-subtle",
				children: [
					nights,
					" Friday night",
					nights === 1 ? "" : "s",
					" marked"
				]
			}),
			!top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No Friday marks in yet. Brian logs them on Coach → Train after Friday night."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 flex flex-col",
				children: top.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between py-1.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 font-semibold tabular-nums text-accent",
						children: placeAt(i, top.map((r) => r.pts))
					}), publicName(t.name)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold tabular-nums",
						children: [t.pts, " pts"]
					})]
				}, t.name))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				height,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						layout: "vertical",
						margin: {
							top: 4,
							right: 16,
							left: 4,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3",
								horizontal: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								allowDecimals: false,
								stroke: "var(--color-subtle)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "label",
								width: 96,
								stroke: "var(--color-subtle)",
								tick: {
									fill: "var(--color-fg)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-accent-soft)" },
								content: ({ active, payload }) => {
									if (!active || !payload?.[0]) return null;
									const d = payload[0].payload;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-elevated px-3 py-2 text-xs text-fg shadow-panel",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: d.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "tabular-nums",
											children: [d.pts, " pts"]
										})]
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "pts",
								fill: "var(--color-accent)",
								radius: [
									0,
									4,
									4,
									0
								],
								barSize: 18,
								isAnimationActive: false
							})
						]
					})
				})
			})] })
		]
	});
}
function tallyScorers(goals, players) {
	const map = /* @__PURE__ */ new Map();
	function row(raw) {
		const name = matchSquadPlayer(players, raw) || (players.includes(raw) ? raw : raw.trim());
		if (!name) return null;
		const hit = map.get(name) ?? {
			name,
			goals: 0,
			assists: 0
		};
		map.set(name, hit);
		return hit;
	}
	for (const g of goals) {
		const s = row(g.scorer);
		if (s) s.goals += 1;
		if (g.assist) {
			const a = row(g.assist);
			if (a) a.assists += 1;
		}
	}
	return [...map.values()].sort((a, b) => {
		if (b.goals !== a.goals) return b.goals - a.goals;
		if (b.assists !== a.assists) return b.assists - a.assists;
		return publicName(a.name).localeCompare(publicName(b.name));
	});
}
function BoardList({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-xs font-semibold uppercase tracking-widest text-muted",
		children: title
	}), rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-1 divide-y divide-border",
		children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between py-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 truncate",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-2 font-display text-lg font-bold tabular-nums text-accent",
					children: i + 1
				}), publicName(row.name)]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 shrink-0 font-display text-lg font-bold tabular-nums",
				children: row.n
			})]
		}, row.name))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-muted",
		children: "None logged yet."
	})] });
}
function ScorersAssistsChart({ goals, players }) {
	const tallies = (0, import_react.useMemo)(() => tallyScorers(goals, players), [goals, players]);
	const scorers = tallies.filter((t) => t.goals > 0).map((t) => ({
		name: t.name,
		n: t.goals
	}));
	const assists = tallies.filter((t) => t.assists > 0).slice().sort((a, b) => {
		if (b.assists !== a.assists) return b.assists - a.assists;
		return publicName(a.name).localeCompare(publicName(b.name));
	}).map((t) => ({
		name: t.name,
		n: t.assists
	}));
	const chartData = tallies.filter((t) => t.goals + t.assists > 0).map((t) => ({
		label: publicName(t.name),
		goals: t.goals,
		assists: t.assists
	}));
	const height = Math.max(180, chartData.length * 32);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold uppercase tracking-tight",
				children: "Scorers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Pine Villa: William 2, Isa 2, Kody 1, Jacob Hill 1. Daisy Hill: William 1, assist Louie. Standish: William 2, Isa 1, Kody 1, Louie 1, Jacob Sands 1. Assists Louie and William."
			}),
			scorers.length || assists.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardList, {
					title: "Goals",
					rows: scorers
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardList, {
					title: "Assists",
					rows: assists
				})]
			}), chartData.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
				height,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: chartData,
						layout: "vertical",
						margin: {
							top: 8,
							right: 16,
							left: 4,
							bottom: 8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--color-border)",
								strokeDasharray: "3 3",
								horizontal: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								allowDecimals: false,
								stroke: "var(--color-subtle)",
								tick: {
									fill: "var(--color-muted)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "label",
								width: 96,
								stroke: "var(--color-subtle)",
								tick: {
									fill: "var(--color-fg)",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								cursor: { fill: "var(--color-accent-soft)" },
								content: ({ active, payload }) => {
									if (!active || !payload?.[0]) return null;
									const d = payload[0].payload;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-elevated px-3 py-2 text-xs text-fg shadow-panel",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: d.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "tabular-nums",
											children: [
												d.goals,
												" goals · ",
												d.assists,
												" assists"
											]
										})]
									});
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {
								wrapperStyle: {
									fontSize: 11,
									color: "var(--color-muted)"
								},
								iconSize: 8
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "goals",
								fill: "var(--color-accent)",
								name: "Goals",
								barSize: 10,
								minPointSize: 3,
								radius: [
									0,
									4,
									4,
									0
								],
								isAnimationActive: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "assists",
								fill: "var(--color-kit-gold)",
								name: "Assists",
								barSize: 10,
								minPointSize: 3,
								radius: [
									0,
									4,
									4,
									0
								],
								isAnimationActive: false
							})
						]
					})
				})
			}) : null] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No scorers in yet. They appear when the coach logs each goal."
			})
		]
	});
}
function TrainingNote({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("text-sm text-muted", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-fg",
				children: "Training"
			}), ` · ${TRAINING_NIGHT} · ${TRAINING_VENUE}`] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-fg",
				children: TRAINING_MARKS_INTRO
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 flex flex-col gap-1",
				children: TRAINING_MARKS_LOSE.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
			})
		]
	});
}
//#endregion
export { ScorersAssistsChart as a, TrainingTop3 as c, ParentVoteBars as i, DashSection as n, SeasonTable as o, ParentLeaders as r, TrainingNote as s, DashKpi as t };
