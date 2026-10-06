import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer, u as publicName } from "./players-CZr5uoUS.mjs";
import { i as getISOWeekYear, n as format, r as getISOWeek, t as parseISO } from "../_libs/date-fns.mjs";
import { t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { o as playerDrillLines } from "./test-bonus-DvKLNi3p.mjs";
import { i as collectScoreEvents } from "./scoring-B3T9YYfp.mjs";
import { a as monthTitle } from "./potm-BIYA_DOQ.mjs";
import { d as TEAM_NAME, o as CLUB_NAME, s as COACH_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { u as RefreshCw } from "../_libs/lucide-react.mjs";
import { a as scoreFull, i as getScoreExtras, n as currentVoteMonth, o as scoreFullMonth } from "./score-actions-DgqUGgog.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as ReferenceLine, o as Area, p as Legend, s as Line, t as ComposedChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/player-week-report-DPVGZH4i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Sized box for Recharts. Always mounts children so scores never wait on a 0-width iframe. */
function ChartFrame({ height, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative w-full min-w-0",
		style: {
			height,
			minHeight: height,
			width: "100%"
		},
		children
	});
}
function PlayerWeekChart({ weeks, height = 180, print = false }) {
	if (!weeks.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: print ? "text-sm text-[#3a3834]" : "text-sm text-muted",
		children: "The weekly graph appears once training or 3-2-1 scores are in."
	});
	const ink = print ? "#0c0c0d" : "#ffffff";
	const grid = print ? "#d4cfc4" : "var(--color-border)";
	const bull = "#b42318";
	const mean = weeks.reduce((s, w) => s + w.total, 0) / weeks.length;
	const last = weeks[weeks.length - 1]?.key;
	const gid = print ? "weekFillPrint" : "weekFill";
	const hasTests = weeks.some((w) => (w.tests ?? 0) > 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
		height,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data: weeks,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: gid,
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: bull,
							stopOpacity: print ? .28 : .45
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: bull,
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: grid,
						strokeDasharray: "3 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						stroke: ink,
						tick: {
							fill: ink,
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						allowDecimals: false,
						width: 28,
						stroke: ink,
						tick: {
							fill: ink,
							fontSize: 12
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekTooltip, { print }),
						cursor: { stroke: grid }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						color: ink,
						fontSize: 12
					} }),
					weeks.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						y: Math.round(mean),
						stroke: ink,
						strokeDasharray: "4 4",
						strokeOpacity: .45
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "total",
						fill: `url(#${gid})`,
						stroke: "none",
						legendType: "none",
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "training",
						stroke: ink,
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: ink
						},
						name: "Training",
						isAnimationActive: false
					}),
					hasTests ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "tests",
						stroke: "#e8b923",
						strokeWidth: 2,
						dot: {
							r: 3,
							fill: "#e8b923"
						},
						name: "Tests",
						isAnimationActive: false
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "total",
						stroke: bull,
						strokeWidth: 2.5,
						dot: (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LastDot, {
							...props,
							last,
							color: bull
						}),
						name: "Total",
						isAnimationActive: false
					}),
					weeks.length > 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "trend",
						stroke: ink,
						strokeWidth: 2,
						strokeDasharray: "6 4",
						dot: false,
						name: "3-week trend",
						isAnimationActive: false
					}) : null
				]
			})
		})
	});
}
function LastDot({ cx, cy, payload, last, color }) {
	if (cx == null || cy == null) return null;
	const r = payload?.key === last ? 5 : 3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx,
		cy,
		r,
		fill: color
	});
}
function WeekTooltip({ active, payload, print }) {
	if (!active || !payload?.[0]) return null;
	const d = payload[0].payload;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border px-3 py-2 text-xs shadow-panel",
		style: {
			background: print ? "#f3efe6" : "#141416",
			borderColor: print ? "#d4cfc4" : "var(--color-border)",
			color: print ? "#0c0c0d" : "#ffffff"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold",
				children: d.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 tabular-nums",
				children: ["Training ", d.training]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular-nums",
				children: ["Match ", d.match]
			}),
			d.tests ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular-nums",
				children: ["Tests ", d.tests]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-semibold tabular-nums",
				style: { color: "#b42318" },
				children: ["Total ", d.total]
			}),
			d.trend != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "tabular-nums text-[#6b6760]",
				children: ["Trend ", d.trend]
			}) : null
		]
	});
}
function withTrend(weeks, window = 3) {
	return weeks.map((w, i) => {
		const slice = weeks.slice(Math.max(0, i - window + 1), i + 1);
		const avg = slice.reduce((sum, row) => sum + row.total, 0) / slice.length;
		return {
			...w,
			trend: Math.round(avg * 10) / 10
		};
	});
}
function pad(n) {
	return String(n).padStart(2, "0");
}
function weekFromStamp(iso) {
	if (!iso) return null;
	let d;
	if (/^\d{4}-\d{2}-\d{2}/.test(iso)) d = parseISO(`${iso.slice(0, 10)}T12:00:00`);
	else d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	const y = getISOWeekYear(d);
	const w = getISOWeek(d);
	return {
		key: `${y}-W${pad(w)}`,
		label: format(d, "d MMM"),
		sort: `${y}-${pad(w)}`
	};
}
function playerWeeks(player, votes, awards, sessions, tests = []) {
	const map = /* @__PURE__ */ new Map();
	for (const ev of collectScoreEvents(votes, awards, sessions, tests)) {
		if (ev.player !== player) continue;
		const w = weekFromStamp(ev.at);
		if (!w) continue;
		let row = map.get(w.key);
		if (!row) {
			row = {
				key: w.key,
				label: w.label,
				training: 0,
				match: 0,
				tests: 0,
				total: 0,
				sort: w.sort
			};
			map.set(w.key, row);
		}
		if (ev.source === "training") row.training += ev.points;
		else if (ev.source === "tests") row.tests += ev.points;
		else row.match += ev.points;
	}
	return withTrend([...map.values()].map((row) => ({
		key: row.key,
		label: row.label,
		training: row.training,
		match: row.match,
		tests: row.tests,
		total: row.training + row.match + row.tests
	})).sort((a, b) => a.key.localeCompare(b.key)));
}
function playerReportHref(player) {
	return `/report/player?name=${encodeURIComponent(player)}`;
}
function PlayerWeekReport({ player }) {
	const [weeks, setWeeks] = (0, import_react.useState)([]);
	const [players, setPlayers] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [awards, setAwards] = (0, import_react.useState)([]);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [tests, setTests] = (0, import_react.useState)([]);
	const [appearances, setAppearances] = (0, import_react.useState)();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const loadRef = (0, import_react.useRef)(async () => {});
	(0, import_react.useEffect)(() => {
		let alive = true;
		async function load() {
			setRefreshing(true);
			try {
				const [votes, extras] = await Promise.all([getInitialData(), getScoreExtras()]);
				if (!alive) return;
				setPlayers(votes.players);
				setHistory(votes.history);
				setAwards(extras.awards);
				setSessions(extras.sessions);
				setTests(extras.tests);
				setAppearances(votes.appearances);
				setWeeks(playerWeeks(player, votes.history, extras.awards, extras.sessions, extras.tests));
				setReady(true);
			} catch {
				if (alive) setReady(true);
			} finally {
				if (alive) setRefreshing(false);
			}
		}
		loadRef.current = load;
		load();
		const timer = window.setInterval(() => void load(), 15e3);
		const onVis = () => {
			if (document.visibilityState === "visible") load();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			alive = false;
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [player]);
	const parsed = parsePlayer(player);
	const month = currentVoteMonth();
	const monthLabel = monthTitle(month);
	const season = (0, import_react.useMemo)(() => scoreFull(players, history, awards, sessions, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const thisMonth = (0, import_react.useMemo)(() => scoreFullMonth(players, history, awards, sessions, month, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests,
		month
	]);
	const seasonRow = season.find((r) => r.name === player);
	const monthRow = thisMonth.find((r) => r.name === player);
	const monthRank = monthRow ? thisMonth.filter((r) => r.total > (monthRow.total || 0)).length + 1 : 0;
	const drills = playerDrillLines(tests, player);
	const totals = (0, import_react.useMemo)(() => weeks.reduce((acc, w) => ({
		training: acc.training + w.training,
		match: acc.match + w.match,
		tests: acc.tests + (w.tests ?? 0),
		total: acc.total + w.total
	}), {
		training: 0,
		match: 0,
		tests: 0,
		total: 0
	}), [weeks]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "report-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm;
            height: 297mm;
            overflow: hidden !important;
            background: #f3efe6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .report-page, .report-sheet {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
          }
          .report-sheet {
            box-sizing: border-box;
            padding: 8mm;
            page-break-after: avoid;
            page-break-inside: avoid;
          }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print flex flex-col items-end gap-2 px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]",
						onClick: () => {
							sendWhatsApp(`${parsed.name} · ${monthLabel}`, `${TEAM_NAME} month scores for ${parsed.name}`, globalThis.location.href);
						},
						children: "Send in WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-white",
						onClick: () => window.print(),
						children: "Print PDF"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "report-sheet mx-auto box-border flex min-h-0 max-w-2xl flex-col border-4 border-[#b42318] bg-[#f3efe6] p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-3 border-b border-[#0c0c0d]/20 pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bulls-crest.jpg",
							alt: "",
							width: 56,
							height: 56,
							className: "size-14 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold uppercase tracking-widest text-[#6b6760]",
									children: [
										CLUB_NAME,
										" · ",
										TEAM_NAME
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl font-bold uppercase leading-none tracking-tight",
										children: publicName(player)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "no-print inline-flex h-9 shrink-0 items-center gap-1 rounded-md border border-[#0c0c0d]/25 bg-white px-2.5 text-xs font-semibold uppercase tracking-wide text-[#0c0c0d] disabled:opacity-60",
										onClick: () => void loadRef.current(),
										disabled: refreshing,
										"aria-label": `Refresh ${publicName(player)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${refreshing ? "animate-spin" : ""}` }), refreshing ? "Refreshing" : "Refresh"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-semibold uppercase tracking-widest text-[#b42318]",
									children: [
										monthLabel,
										parsed.num ? ` · #${parsed.num}` : "",
										monthRank ? ` · ${ordinal(monthRank)} this month` : "",
										" · ",
										MOTTO_LATIN
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]",
						children: "This month"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 grid grid-cols-6 gap-1 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: monthRow?.parentPts ?? 0,
								label: "3-2-1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: monthRow?.oppMomPts ?? 0,
								label: "MOM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: monthRow?.playersPlayerPts ?? 0,
								label: "Mgr"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: monthRow?.trainingPts ?? 0,
								label: "Train"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: monthRow?.testPts ?? 0,
								label: "Tests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: monthRow?.total ?? 0,
								label: "Total",
								accent: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]",
						children: "Season"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 grid grid-cols-4 gap-1 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: seasonRow?.trainingPts ?? totals.training,
								label: "Train"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: seasonRow ? seasonRow.parentPts + seasonRow.oppMomPts + seasonRow.playersPlayerPts : totals.match,
								label: "Match"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: seasonRow?.testPts ?? totals.tests,
								label: "Tests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								n: seasonRow?.total ?? totals.total,
								label: "Total",
								accent: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 min-h-0 flex-1",
						children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerWeekChart, {
							weeks,
							height: 168,
							print: true
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: "Loading graph…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]",
						children: "Tests · time and score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5",
									children: "Drill"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5 text-right",
									children: "Time"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5 text-right",
									children: "Score"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: drills.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-[#0c0c0d]/15",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5",
									children: line.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5 text-right tabular-nums",
									children: line.timeLabel
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5 text-right tabular-nums font-semibold",
									children: line.score == null ? "—" : `${line.score}/20`
								})
							]
						}, line.kind)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "mt-2 w-full text-left text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-[10px] font-semibold uppercase tracking-wider text-[#6b6760]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5",
									children: "Week"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5 text-right",
									children: "Train"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5 text-right",
									children: "Match"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5 text-right",
									children: "Tests"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-0.5 text-right",
									children: "Total"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: weeks.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-[#0c0c0d]/15",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5",
									children: w.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5 text-right tabular-nums",
									children: w.training
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5 text-right tabular-nums",
									children: w.match
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5 text-right tabular-nums",
									children: w.tests ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-0.5 text-right tabular-nums font-semibold",
									children: w.total
								})
							]
						}, w.key)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[10px] leading-4 text-[#6b6760]",
						children: [
							"Tests from 12 Sep: +5 complete, speed /10 (GO to last cones), technique /5. ",
							COACH_NAME,
							"."
						]
					})
				]
			})
		]
	});
}
function ordinal(n) {
	const v = n % 100;
	if (v >= 11 && v <= 13) return `${n}th`;
	if (n % 10 === 1) return `${n}st`;
	if (n % 10 === 2) return `${n}nd`;
	if (n % 10 === 3) return `${n}rd`;
	return `${n}th`;
}
function Mark({ n, label, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: accent ? "rounded-md border border-[#b42318] py-1" : "rounded-md border border-[#0c0c0d]/15 py-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `font-display text-lg font-bold tabular-nums leading-none ${accent ? "text-[#b42318]" : ""}`,
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#6b6760]",
			children: label
		})]
	});
}
//#endregion
export { playerWeeks as a, playerReportHref as i, PlayerWeekChart as n, PlayerWeekReport as r, ChartFrame as t };
