import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer } from "./players-CZr5uoUS.mjs";
import { a as fmtPct, i as fmtDiff, o as fmtSecs, r as disciplineVerdict, t as analyseFitness } from "./fitness-C3S1VXBB.mjs";
import { o as playerDrillLines } from "./test-bonus-DvKLNi3p.mjs";
import { t as getFitnessTests } from "./fitness-actions-B9pE30rV.mjs";
import { c as MANAGER_NAME, d as TEAM_NAME, i as ASSISTANT_NAME, l as MOTTO_EN, o as CLUB_NAME, s as COACH_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { u as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as FitnessProgressChart } from "./fitness-progress-chart-Cn2-y2Kd.mjs";
import { n as Route$1 } from "./router-DBOPb28Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report.test-player-DUcGfpnU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FitnessPlayerReport({ player }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const loadRef = (0, import_react.useRef)(async () => {});
	(0, import_react.useEffect)(() => {
		let alive = true;
		async function load() {
			setRefreshing(true);
			try {
				const data = await getFitnessTests();
				if (!alive) return;
				const mine = data.tests.filter((t) => t.player === player).map(analyseFitness);
				setRows(mine.sort((a, b) => a.testedOn.localeCompare(b.testedOn)));
			} catch {} finally {
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
	const latest = rows[rows.length - 1];
	const parsed = parsePlayer(player);
	const note = (0, import_react.useMemo)(() => {
		if (!latest) return "No tests saved yet.";
		return [disciplineVerdict(latest.zz50NoBall, latest.zz50Diff, "zz50", latest.zz50Eff), disciplineVerdict(latest.sprint30NoBall, latest.sprint30Diff, "s30", latest.sprint30Eff)].join(" ");
	}, [latest]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "report-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body { margin: 0 !important; background: #f3efe6 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .report-sheet { width: 210mm; min-height: 297mm; box-sizing: border-box; padding: 12mm 14mm; }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-print flex flex-wrap justify-end gap-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]",
					onClick: () => void sendWhatsApp(`${parsed.name} · performance`, `${TEAM_NAME} age 11 performance report for ${parsed.name}. Extra = without minus with. Ball efficiency % for age 11.`, globalThis.location.href),
					children: "WhatsApp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 rounded-md border border-[#0c0c0d] px-4 text-sm font-semibold",
					onClick: () => globalThis.print(),
					children: "Print / PDF"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "report-sheet mx-auto max-w-[210mm] px-8 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-start gap-4 border-b-4 border-[#8b0000] pb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bulls-crest.jpg",
							alt: "",
							className: "size-20 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5c5850]",
									children: CLUB_NAME
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl font-bold uppercase leading-none",
										children: parsed.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "no-print inline-flex h-9 shrink-0 items-center gap-1 rounded-md border border-[#0c0c0d]/25 bg-white px-2.5 text-xs font-semibold uppercase tracking-wide text-[#0c0c0d] disabled:opacity-60",
										onClick: () => void loadRef.current(),
										disabled: refreshing,
										"aria-label": `Refresh ${parsed.name}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `size-3.5 ${refreshing ? "animate-spin" : ""}` }), refreshing ? "Refreshing" : "Refresh"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm font-semibold",
									children: [
										"Age ",
										11,
										" · ",
										TEAM_NAME
									]
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
						})]
					}),
					!latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-sm",
						children: "No tests saved for this player yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display text-lg font-bold uppercase tracking-wide",
									children: ["Latest test · ", latest.testedOn]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "mt-3 w-full border-collapse text-left text-[12px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b-2 border-[#0c0c0d] text-[10px] font-semibold uppercase tracking-wider text-[#5c5850]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2",
												children: "Drill"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Without" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "With" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Extra (w/o − with)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Ball efficiency" })
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-[#d9d2c4]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 font-semibold",
													children: "50m Zig Zag"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtSecs(latest.zz50NoBall)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtSecs(latest.zz50Ball)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtDiff(latest.zz50Diff)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtPct(latest.zz50Eff)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-[#d9d2c4]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 font-semibold",
													children: "Linear 30m"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtSecs(latest.sprint30NoBall)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtSecs(latest.sprint30Ball)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtDiff(latest.sprint30Diff)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "tabular-nums",
													children: fmtPct(latest.sprint30Eff)
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-2 font-semibold",
												children: "Turns"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "tabular-nums",
												colSpan: 3,
												children: fmtSecs(latest.turns3x4)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "tabular-nums font-bold",
												children: fmtPct(latest.ballEff)
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-[#d9d2c4]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-2 font-semibold",
													children: "Shooting"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "tabular-nums",
													colSpan: 3,
													children: [
														latest.shootingPts ?? "—",
														" shots + ",
														latest.shootingPower ?? "—",
														" power"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "tabular-nums font-bold",
													children: [latest.shootingTotal ?? "—", " pts"]
												})
											]
										})
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-[11px] leading-5 text-[#5c5850]",
									children: [
										"Extra = without the ball minus with the ball. A minus means the ball slowed him. Ball efficiency % = without ÷ with × 100. Age ",
										11,
										" academy guide: 95%+ academy · 88–94% strong · 80–87% developing."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-[12px] leading-5",
									children: note
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-bold uppercase tracking-wide",
								children: "Time and score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "mt-3 w-full border-collapse text-left text-[12px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b-2 border-[#0c0c0d] text-[10px] font-semibold uppercase tracking-wider text-[#5c5850]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "py-2",
											children: "Drill"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-right",
											children: "Time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "text-right",
											children: "Score"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: playerDrillLines(rows, player).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-[#d9d2c4]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 font-semibold",
											children: line.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "text-right tabular-nums",
											children: line.timeLabel
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "text-right tabular-nums font-bold",
											children: line.score == null ? "—" : `${line.score}/20`
										})
									]
								}, line.kind)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold uppercase tracking-wide",
									children: "Progression"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] text-[#5c5850]",
									children: "Line graph through the season. One test is a start — it grows each time you save."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitnessProgressChart, {
										rows,
										print: true,
										height: 200
									})
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-8 border-t border-[#c9c2b4] pt-3 text-[10px] leading-4 text-[#5c5850]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Prepared by ",
							MANAGER_NAME,
							", manager · ",
							COACH_NAME,
							", head coach · ",
							ASSISTANT_NAME,
							", assistant."
						] })
					})
				]
			})
		]
	});
}
function Page() {
	const { name } = Route$1.useSearch();
	if (!name) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Pick a player from Tests."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitnessPlayerReport, { player: name });
}
//#endregion
export { Page as component };
