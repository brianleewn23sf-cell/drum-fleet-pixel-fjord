import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer } from "./players-CZr5uoUS.mjs";
import { a as fmtPct, i as fmtDiff, o as fmtSecs, r as disciplineVerdict } from "./fitness-C3S1VXBB.mjs";
import { t as getFitnessTests } from "./fitness-actions-B9pE30rV.mjs";
import { c as MANAGER_NAME, d as TEAM_NAME, i as ASSISTANT_NAME, l as MOTTO_EN, o as CLUB_NAME, s as COACH_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report.tests-C5rx_1e_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FitnessDiffReport({ rows }) {
	const ready = [...rows].sort((a, b) => {
		return (a.zz50Index ?? 99) + (a.sprint30Index ?? 99) - ((b.zz50Index ?? 99) + (b.sprint30Index ?? 99));
	});
	const dated = ready[0]?.testedOn ?? "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "report-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #f3efe6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .report-sheet {
            width: 210mm;
            min-height: 297mm;
            box-sizing: border-box;
            padding: 12mm 14mm;
          }
        }
      ` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "report-sheet mx-auto max-w-[210mm] px-8 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex items-start gap-4 border-b-4 border-[#8b0000] pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bulls-crest.jpg",
							alt: "",
							className: "size-20 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5c5850]",
									children: CLUB_NAME
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl font-bold uppercase leading-none",
									children: TEAM_NAME
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#8b0000]",
									children: MOTTO_LATIN
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#5c5850]",
									children: MOTTO_EN
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right text-[11px] leading-5 text-[#5c5850]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold uppercase tracking-wider text-[#0c0c0d]",
									children: "Performance analysis"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ball manipulation report" }),
								dated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: dated }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confidential · coaches" })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold uppercase tracking-wide",
						children: "Method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid gap-3 text-[12px] leading-5 text-[#3f3c38]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "50m Zig Zag test with and without the ball."
							}), " GO or whistle. Stop through the end cones. With and without the ball."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Linear speed · 30m."
							}), " GO or whistle. Without the ball first. With the ball a pass from 20m is allowed. Clock stops when the ball crosses 30m."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Turning with the ball · 3m square."
							}), " Three turns, sprint back, foot on the ball on the start line."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Path2Pro shooting · 6 shots."
							}), " Full-size open goal. Push left with the left, shoot into the far right corner. Push right with the right, shoot into the far left corner. Must not enter the box. 3 far corner · 2 near · 1 just outside · 0 miss. +1 power if the ball reaches the 10m line behind the goal."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Extra = without the ball minus with the ball (a minus means the ball slowed him). Ball efficiency % = without ÷ with × 100, scored at age ",
								11,
								". Academy 95%+ · Strong 88–94% · Developing 80–87%."
							] })
						]
					})]
				}),
				!ready.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm",
					children: "No paired times yet. Save tests from the coach desk, then print this report."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold uppercase tracking-wide",
							children: "Squad times"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "mt-3 w-full border-collapse text-left text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b-2 border-[#0c0c0d] text-[10px] font-semibold uppercase tracking-wider text-[#5c5850]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-2",
										children: "Player"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "COD w/o"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "COD with"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "COD extra"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "COD eff"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "30m w/o"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "30m with"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "30m extra"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "30m eff"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2",
										children: "Turns"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ready.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-[#d9d2c4]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-2 font-semibold",
										children: parsePlayer(row.player).name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtSecs(row.zz50NoBall)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtSecs(row.zz50Ball)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtDiff(row.zz50Diff)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtPct(row.zz50Eff)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtSecs(row.sprint30NoBall)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtSecs(row.sprint30Ball)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtDiff(row.sprint30Diff)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtPct(row.sprint30Eff)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "tabular-nums",
										children: fmtSecs(row.turns3x4)
									})
								]
							}, row.player)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[10px] text-[#5c5850]",
							children: [
								"Times in seconds. Extra = without − with. Eff % is ball efficiency at age ",
								11,
								"."
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold uppercase tracking-wide",
						children: "Coach notes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-col gap-3",
						children: ready.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "break-inside-avoid border-t border-[#d9d2c4] pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold uppercase",
									children: parsePlayer(row.player).name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[12px] leading-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "COD. "
									}), disciplineVerdict(row.zz50NoBall, row.zz50Diff, "zz50", row.zz50Eff)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[12px] leading-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Linear speed. "
									}), disciplineVerdict(row.sprint30NoBall, row.sprint30Diff, "s30", row.sprint30Eff)]
								})
							]
						}, `n-${row.player}`))
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "mt-8 border-t border-[#c9c2b4] pt-3 text-[10px] leading-4 text-[#5c5850]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Prepared by ",
						MANAGER_NAME,
						", manager · ",
						COACH_NAME,
						", head coach · ",
						ASSISTANT_NAME,
						", assistant."
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Video stays on the coach’s phone (Photos / Files). Times and this analysis are stored in the Raging Bulls app. Print to PDF on one or two A4 pages."
					})]
				})
			]
		})]
	});
}
function FitnessDiffReportPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		getFitnessTests().then((d) => setRows(d.analysed)).catch(() => setRows([]));
	}, []);
	const url = typeof window === "undefined" ? "/report/tests" : window.location.href;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#f3efe6]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mx-auto flex max-w-[210mm] gap-2 px-8 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md bg-[#8b0000] px-4 text-sm font-semibold text-white",
					onClick: () => window.print(),
					children: "Print / PDF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/performance-analysis-protocol.pdf",
					download: "Cherrybrook-Raging-Bulls-Performance-Analysis-Protocol.pdf",
					className: "inline-flex h-11 items-center rounded-md border border-[#0c0c0d] px-4 text-sm font-semibold",
					children: "Protocol PDF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]",
					onClick: () => void sendWhatsApp(`${TEAM_NAME} performance analysis`, `${TEAM_NAME} ball manipulation report. Extra time = with the ball minus without. Smaller extra is better.`, url),
					children: "WhatsApp"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitnessDiffReport, { rows })]
	});
}
var SplitComponent = FitnessDiffReportPage;
//#endregion
export { SplitComponent as component };
