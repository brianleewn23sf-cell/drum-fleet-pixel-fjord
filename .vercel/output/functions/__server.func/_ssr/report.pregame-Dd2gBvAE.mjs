import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as shortName, o as pitchSurname, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { C as shortClub } from "./wdyl-CJ_QwBRn.mjs";
import { n as formatKickoff } from "./when-BGtZJU2t.mjs";
import { c as MANAGER_NAME, d as TEAM_NAME, l as MOTTO_EN, o as CLUB_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { a as RESERVE_SLOTS, c as UNAVAILABLE_SLOTS, i as INJURED_SLOTS, l as formationById, s as SUB_SLOTS } from "./formations-pQSTjnGH.mjs";
import { D as usualRoles, S as pregameWhatsAppText, T as shapeNote, _ as formationExtras, a as FIRST_BALLS, c as NEGATIVE_NOTE, d as SUB_BRIEF, g as fillLineupBrief, i as COMPACT_EXPAND, l as POSSESSION_RULE, n as BULLS_WAY, o as HOME_PRACTICE, p as benchTalk, r as CARRY_RULE, s as KEEPER_FACTS, t as BRIAN_PROFILE, u as PRESS_RULE, v as injuredNoteFor, w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { t as KitGraphic } from "./kit-graphic-DfF3Ly7S.mjs";
import { r as Route$4 } from "./router-DBOPb28Z.mjs";
import { t as getMatchPlans } from "./pitch-actions-RsKllPWn.mjs";
import { t as gameDetailsFor } from "./game-details-k7DhdgXt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/report.pregame-Dd2gBvAE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PregameReport({ kickoff, opposition }) {
	const [plan, setPlan] = (0, import_react.useState)(null);
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		getMatchPlans().then((data) => {
			setPlans(data.plans);
			const found = data.plans.find((p) => p.kickoff === kickoff && p.opposition === opposition);
			setPlan(found ?? null);
			setReady(true);
		}).catch(() => setReady(true));
	}, [kickoff, opposition]);
	const formation = formationById(plan?.formation ?? "3-3-2");
	const kit = plan?.kit ?? "home";
	const lineup = plan?.lineup ?? {};
	const oppNotes = gameDetailsFor(plan?.opposition ?? opposition);
	const briefs = plan ? Object.values(plan.brief || {}).some((b) => b?.duty) ? plan.brief : fillLineupBrief(plan.formation, lineup, plans) : {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "report-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 portrait; margin: 10mm; }
        html, body, .report-page {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        @media print {
          html, body { background: #f3efe6 !important; }
          .no-print { display: none !important; }
          .break { break-before: page; }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
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
							const url = globalThis.location.href;
							sendWhatsApp(`${TEAM_NAME} pre-game`, pregameWhatsAppText({
								opposition: shortClub(plan?.opposition ?? opposition),
								formation: plan?.formation,
								lineup,
								kickoff: plan?.kickoff ?? kickoff,
								home: plan?.home,
								venue: plan?.venue
							}), url);
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
					children: "Send in WhatsApp shares the colour report with parents. Or Colour PDF → Save as PDF with Background graphics on, then attach that file."
				})]
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-6 py-10 text-sm",
				children: "Loading report…"
			}) : !plan ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-6 py-10 text-sm",
				children: "No plan saved for this fixture yet. Coach → Pitch → Save plan first."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto max-w-3xl px-5 pb-8",
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-3xl font-bold uppercase leading-none tracking-tight",
								children: ["Pre-game · vs ", shortClub(plan.opposition)]
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
							formatKickoff(plan.kickoff, "EEEE d MMMM yyyy"),
							" ·",
							" ",
							formatKickoff(plan.kickoff, "HH:mm"),
							" · ",
							plan.home ? "Home" : "Away",
							" · ",
							plan.venue
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: [
							"Formation ",
							formation.name,
							" · ",
							plan.home ? "Home kit" : "Away kit"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-[#3a3834]",
						children: shapeNote(formation.id)
					}),
					oppNotes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold uppercase tracking-wide",
							children: oppNotes.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 list-disc pl-4",
							children: oppNotes.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold uppercase tracking-wide",
								children: "The way the Bulls play"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 list-disc pl-4",
								children: BULLS_WAY.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
							}),
							formationExtras(formation.id).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2",
								children: line
							}, line)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-semibold uppercase tracking-wide",
								children: "Brian’s way"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: BRIAN_PROFILE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-semibold uppercase tracking-wide",
								children: "With / without the ball"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: COMPACT_EXPAND
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: FIRST_BALLS
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Without."
									}),
									" ",
									PRESS_RULE
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "With."
									}),
									" ",
									POSSESSION_RULE
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: CARRY_RULE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-semibold uppercase tracking-wide",
								children: "Keeper"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 list-disc pl-4",
								children: KEEPER_FACTS.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: fact }, fact))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto mt-4 max-w-sm overflow-hidden rounded-md bg-[#3f8a5a]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 70 105",
							className: "block w-full text-white",
							"aria-hidden": "true",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "2",
									y: "2",
									width: "66",
									height: "101",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "0.7"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "2",
									y1: "52.5",
									x2: "68",
									y2: "52.5",
									stroke: "currentColor",
									strokeWidth: "0.5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "35",
									cy: "52.5",
									r: "8",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "0.5"
								})
							]
						}), formation.slots.map((slot) => {
							const lad = lineup[slot.id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
								style: {
									left: `${slot.x}%`,
									top: `${slot.y}%`
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitGraphic, {
									kit,
									number: lad ? lad.match(/^(\d+)/)?.[1] : void 0,
									className: "w-8"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "max-w-16 truncate text-center font-display text-xs font-bold uppercase leading-tight text-white",
									children: lad ? pitchSurname(lad, PLAYERS) : slot.label
								})]
							}, slot.id);
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Starting XI. "
						}), formation.slots.map((slot) => lineup[slot.id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "Tap the shirts on Pitch, then Save plan."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Subs. "
						}), "Impact players. Every game they mean as much as who starts."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Subs. "
						}), SUB_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => {
							const usual = usualRoles(p, plans);
							return usual ? `${shortName(p)} (${usual})` : shortName(p);
						}).join(" · ") || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Reserves · not match day. "
						}), RESERVE_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Injured. "
						}), INJURED_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Unavailable. "
						}), UNAVAILABLE_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "—"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-[#6b6760]",
						children: [
							"From ",
							MANAGER_NAME,
							". One team. Share this PDF in the parents’ WhatsApp."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "break mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-2xl font-bold uppercase tracking-tight",
								children: ["Jobs · ", formation.name]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-3 text-sm text-[#3a3834]",
								children: "What we do with the ball, and what we do without it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: formation.slots.map((slot) => {
									const lad = lineup[slot.id];
									const job = briefs[slot.id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-[#0c0c0d]/20 pt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-display text-lg font-bold uppercase tracking-tight",
												children: [slot.label, lad ? ` · ${pitchSurname(lad, PLAYERS)}` : ""]
											}),
											job?.duty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm",
												children: job.duty
											}) : null,
											job?.withBall ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "With. "
												}), job.withBall]
											}) : null,
											job?.withoutBall ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: "Without. "
												}), job.withoutBall]
											}) : null
										]
									}, slot.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-bold uppercase tracking-tight",
								children: "Subs · stay involved"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-2 text-sm",
								children: SUB_BRIEF
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: SUB_SLOTS.map((id, i) => {
									const lad = lineup[id];
									if (!lad) return null;
									const job = briefs[id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-[#0c0c0d]/20 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-lg font-bold uppercase tracking-tight",
											children: [
												"Sub ",
												i + 1,
												" · ",
												pitchSurname(lad, PLAYERS)
											]
										}), job?.duty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: job.duty
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: benchTalk("sub", lad, plans, briefs, id)
										})]
									}, id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-bold uppercase tracking-tight",
								children: "Reserves · not match day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-2 text-sm",
								children: HOME_PRACTICE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: RESERVE_SLOTS.map((id, i) => {
									const lad = lineup[id];
									if (!lad) return null;
									const job = briefs[id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-[#0c0c0d]/20 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-lg font-bold uppercase tracking-tight",
											children: [
												"Reserve ",
												i + 1,
												" · ",
												pitchSurname(lad, PLAYERS)
											]
										}), job?.duty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: job.duty
										}) : null]
									}, id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-bold uppercase tracking-tight",
								children: "Injured"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-2 text-sm",
								children: "You cannot train if you are injured."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: INJURED_SLOTS.map((id, i) => {
									const lad = lineup[id];
									if (!lad) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-t border-[#0c0c0d]/20 pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-lg font-bold uppercase tracking-tight",
											children: [
												"Injured ",
												i + 1,
												" · ",
												pitchSurname(lad, PLAYERS)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm",
											children: injuredNoteFor(lad)
										})]
									}, id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-bold uppercase tracking-tight",
								children: "Unavailable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 mb-2 text-sm",
								children: HOME_PRACTICE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-3",
								children: UNAVAILABLE_SLOTS.map((id, i) => {
									const lad = lineup[id];
									if (!lad) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-t border-[#0c0c0d]/20 pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-display text-lg font-bold uppercase tracking-tight",
											children: [
												"Unavailable ",
												i + 1,
												" · ",
												pitchSurname(lad, PLAYERS)
											]
										})
									}, id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold uppercase tracking-wide",
									children: "Standards"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: NEGATIVE_NOTE
								})]
							})
						]
					})
				]
			})
		]
	});
}
function PregamePage() {
	const { kickoff, opp } = Route$4.useSearch();
	if (!kickoff || !opp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Open from Coach → Pitch after you pick a fixture."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PregameReport, {
		kickoff,
		opposition: opp
	});
}
//#endregion
export { PregamePage as component };
