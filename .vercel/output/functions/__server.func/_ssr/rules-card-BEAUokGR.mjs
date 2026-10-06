import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as MANAGER_NAME, d as TEAM_NAME, l as MOTTO_EN, o as CLUB_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { a as TRAINING_MARKS_LOSE, i as TRAINING_MARKS_INTRO, n as PLAYED_POINTS_RULE, o as VOTING_RULES, r as RULE_ROWS, s as VOTING_RULES_INTRO, t as BULLS_RULES_WAY } from "./youth-rules-BuIp-_r1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rules-card-BEAUokGR.js
var import_jsx_runtime = require_jsx_runtime();
function RulesCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "report-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 portrait; margin: 10mm; }
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
				className: "no-print flex flex-col items-end gap-2 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]",
						onClick: () => {
							sendWhatsApp(`${TEAM_NAME} · U12 9v9 rules`, `${TEAM_NAME} — how we play 9v9 this season\n${MOTTO_LATIN} — ${MOTTO_EN}`, globalThis.location.href);
						},
						children: "Send in WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-white",
						onClick: () => window.print(),
						children: "Colour PDF"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-right text-xs text-[#6b6760]",
					children: "One page. Save as PDF with Background graphics on, or send the colour link."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto max-w-3xl px-5 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "flex items-center gap-3 border-b-4 border-[#b42318] pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bulls-crest.jpg",
							alt: "",
							width: 56,
							height: 56,
							className: "size-14 rounded-md object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-[#6b6760]",
								children: [
									CLUB_NAME,
									" · ",
									TEAM_NAME
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl font-bold uppercase leading-none tracking-tight",
								children: "How we play · U12 9v9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-[#b42318]",
								children: MOTTO_LATIN
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs italic text-[#6b6760]",
								children: MOTTO_EN
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"FA youth football 2026/27. Wigan & District Youth League. From ",
							MANAGER_NAME,
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 overflow-hidden rounded-md border-2 border-[#b42318]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
							className: "w-full text-left text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: RULE_ROWS.map(([label, value], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: i % 2 ? "bg-[#f8e4e2]" : "bg-[#f3efe6]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-28 px-3 py-2 align-top font-semibold uppercase tracking-wide text-[#b42318]",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: value
								})]
							}, label)) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold uppercase tracking-wide",
							children: "The Bulls way"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: BULLS_RULES_WAY
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold uppercase tracking-wide",
							children: "Games played"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: PLAYED_POINTS_RULE
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold uppercase tracking-wide",
								children: "Training marks"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: TRAINING_MARKS_INTRO
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1",
								children: TRAINING_MARKS_LOSE.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold uppercase tracking-wide",
								children: "How to vote"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: VOTING_RULES_INTRO
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1",
								children: VOTING_RULES.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-[#6b6760]",
						children: "FA rolling subs. Written so every family knows how we look after the lads."
					})
				]
			})
		]
	});
}
//#endregion
export { RulesCard as t };
