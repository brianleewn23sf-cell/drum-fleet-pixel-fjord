import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer, u as publicName } from "./players-CZr5uoUS.mjs";
import { i as localDateStamp } from "./when-BGtZJU2t.mjs";
import { o as playerDrillLines } from "./test-bonus-DvKLNi3p.mjs";
import { a as fridayLabel, m as seasonFridays, o as fridayMark } from "./scoring-B3T9YYfp.mjs";
import { c as MANAGER_NAME, d as TEAM_NAME, l as MOTTO_EN, o as CLUB_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { o as scoreFullMonth, r as getBoardTotals } from "./score-actions-DgqUGgog.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report.scores-BVlSeipk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function num(n) {
	if (!Number.isFinite(n) || n === 0) return "0";
	return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
function SheetTable({ rows, fridays, sessions, tests, monthBy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full border-collapse text-[11px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "bg-[#1a1a1c] text-left text-[9px] font-semibold uppercase tracking-wide text-[#f3efe6]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1.5 py-1.5",
					children: "#"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1.5 py-1.5",
					children: "Player"
				}),
				fridays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: fridayLabel(day)
				}, day)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "Train"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "3-2-1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "MOM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "Mgr"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "Played"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "Tests"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "Overall"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "Month"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-1 py-1.5 text-right",
					children: "30m"
				})
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, i) => {
			const who = parsePlayer(row.name);
			const sprint = playerDrillLines(tests, row.name).find((l) => l.kind === "s30_no");
			const time = sprint?.time != null ? `${sprint.time.toFixed(2)}s` : "—";
			const zebra = i % 2 ? "bg-[#f8e4e2]" : "bg-white";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: zebra,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1.5 py-1 font-semibold text-[#b42318]",
						children: i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "whitespace-nowrap px-1.5 py-1 font-semibold",
						children: [who.num ? `#${who.num} ` : "", publicName(row.name)]
					}),
					fridays.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: (() => {
							const pts = fridayMark(sessions, row.name, day);
							return pts == null ? "—" : String(pts);
						})()
					}, day)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(row.trainingPts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(row.parentPts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(row.oppMomPts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(row.playersPlayerPts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(row.playedPts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(row.testPts)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right font-bold tabular-nums",
						children: num(row.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: num(monthBy.get(row.name) ?? 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "px-1 py-1 text-right tabular-nums",
						children: time
					})
				]
			}, row.name);
		}) })]
	});
}
function ScoresSheet() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [tests, setTests] = (0, import_react.useState)([]);
	const [monthBy, setMonthBy] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [sept, setSept] = (0, import_react.useState)([]);
	const [oct, setOct] = (0, import_react.useState)([]);
	const fridays = seasonFridays();
	(0, import_react.useEffect)(() => {
		let alive = true;
		(async () => {
			const data = await getBoardTotals();
			if (!alive) return;
			const scored = [...data.table].filter((r) => r.total > 0);
			const monthRows = scoreFullMonth(data.players, data.history, data.awards, data.sessions, "2026-10", data.appearances, data.tests);
			const septRows = scoreFullMonth(data.players, data.history, data.awards, data.sessions, "2026-09", data.appearances, data.tests);
			setRows(scored);
			setSessions(data.sessions);
			setTests(data.tests);
			setMonthBy(new Map(monthRows.map((r) => [r.name, r.total])));
			setSept(septRows.filter((r) => r.total > 0));
			setOct(monthRows.filter((r) => r.total > 0));
			setReady(true);
		})();
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "report-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 landscape; margin: 8mm; }
        html, body, .report-page {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          html, body { background: #f3efe6 !important; }
          .no-print { display: none !important; }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap items-center justify-end gap-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]",
					onClick: () => {
						sendWhatsApp(`${TEAM_NAME} · scores`, `${TEAM_NAME} — season scores, 1 Sep 2026 to today.`, globalThis.location.href);
					},
					children: "Send in WhatsApp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-white",
					onClick: () => window.print(),
					children: "Colour PDF"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto max-w-[1100px] px-4 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-3 border-b-4 border-[#b42318] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bulls-crest.jpg",
							alt: "",
							width: 52,
							height: 52,
							className: "size-12 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-semibold uppercase tracking-widest text-[#6b6760]",
								children: [
									CLUB_NAME,
									" · ",
									TEAM_NAME,
									" · ",
									localDateStamp()
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-bold uppercase leading-none tracking-tight",
								children: "Season scores"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-semibold uppercase tracking-widest text-[#b42318]",
								children: MOTTO_LATIN
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] italic text-[#6b6760]",
								children: MOTTO_EN
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[11px] text-[#3a3834]",
						children: [
							"1 Sep 2026 to 30 Jun 2027. From ",
							MANAGER_NAME,
							". Overall is Friday training (max 40 a night) plus games: parent 3-2-1, opposition MOM (20, or 10 each if shared), manager’s player (10), 5 for every game played, and tests. Month is the live prize month and is not added again."
						]
					}),
					!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm",
						children: "Loading the scores…"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 overflow-hidden rounded-md border-2 border-[#b42318]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTable, {
							rows,
							fridays,
							sessions,
							tests,
							monthBy
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-3 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthBlock, {
							title: "September",
							note: "Closed 21 Sep. Pine Villa and Newton.",
							rows: sept
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthBlock, {
							title: "October",
							note: "22 Sep to the 3rd Monday. Live now.",
							rows: oct
						})]
					})] })
				]
			})
		]
	});
}
function MonthBlock({ title, note, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-bold uppercase tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-[10px] text-[#6b6760]",
			children: note
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-md border-2 border-[#b42318]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full border-collapse text-[11px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "bg-[#1a1a1c] text-left text-[9px] font-semibold uppercase tracking-wide text-[#f3efe6]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1.5 py-1",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1.5 py-1",
							children: "Player"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-1 text-right",
							children: "Train"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-1 text-right",
							children: "3-2-1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-1 text-right",
							children: "MOM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-1 text-right",
							children: "Mgr"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-1 text-right",
							children: "Tests"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-1 py-1 text-right",
							children: "Tot"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: i % 2 ? "bg-[#f8e4e2]" : "bg-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1.5 py-1 font-semibold text-[#b42318]",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "whitespace-nowrap px-1.5 py-1 font-semibold",
							children: publicName(row.name)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-right tabular-nums",
							children: num(row.trainingPts)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-right tabular-nums",
							children: num(row.parentPts)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-right tabular-nums",
							children: num(row.oppMomPts)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-right tabular-nums",
							children: num(row.playersPlayerPts)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-right tabular-nums",
							children: num(row.testPts)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-1 py-1 text-right font-bold tabular-nums",
							children: num(row.total)
						})
					]
				}, row.name)) })]
			})
		})
	] });
}
function ScoresPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoresSheet, {});
}
//#endregion
export { ScoresPage as component };
