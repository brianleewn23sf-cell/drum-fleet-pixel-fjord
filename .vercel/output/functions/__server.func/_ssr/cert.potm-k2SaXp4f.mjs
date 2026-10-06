import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer } from "./players-CZr5uoUS.mjs";
import { a as monthTitle, n as PLAYERS_PLAYER_POINTS, t as OPP_MOM_POINTS, u as upcomingPotmMonth } from "./potm-BIYA_DOQ.mjs";
import { c as MANAGER_NAME, d as TEAM_NAME, i as ASSISTANT_NAME, l as MOTTO_EN, o as CLUB_NAME, s as COACH_NAME, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { n as getPotm } from "./potm-actions-Durmts6G.mjs";
import { a as Route$6 } from "./router-DBOPb28Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cert.potm-k2SaXp4f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PotmCertificate({ month, player, parentPts, trainingPts, oppMom, playersPlayer, total }) {
	const parsed = parsePlayer(player);
	const title = monthTitle(month);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "cert-page bg-[#f3efe6] text-[#0c0c0d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @page { size: A4 landscape; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm;
            height: 210mm;
            overflow: hidden !important;
            background: #f3efe6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .cert-page {
            width: 297mm;
            height: 210mm;
            overflow: hidden;
          }
          .cert-sheet {
            width: 297mm;
            height: 210mm;
            box-sizing: border-box;
            padding: 8mm;
            max-width: none;
            page-break-after: avoid;
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-print flex justify-end gap-2 px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-[#f3efe6]",
					onClick: () => window.print(),
					children: "Save / print PDF"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
				className: "cert-sheet mx-auto box-border flex max-w-5xl flex-col border-4 border-[#b42318] bg-[#f3efe6] p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-0 flex-1 flex-col justify-between border border-[#0c0c0d]/20 px-5 py-4 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/bulls-crest.jpg",
							alt: `${CLUB_NAME} ${TEAM_NAME} crest`,
							width: 64,
							height: 64,
							className: "mx-auto size-16 rounded-md object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#6b6760]",
							children: CLUB_NAME
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-bold uppercase leading-none tracking-tight",
							children: TEAM_NAME
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-sm font-bold uppercase tracking-[0.22em] text-[#b42318]",
							children: MOTTO_LATIN
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs italic text-[#6b6760]",
							children: MOTTO_EN
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto my-3 h-px w-32 bg-[#b42318]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.35em] text-[#6b6760]",
							children: "Player of the month"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-xl font-bold uppercase tracking-widest text-[#b42318]",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight",
							children: parsed.name
						}),
						parsed.num ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs font-semibold uppercase tracking-widest text-[#6b6760]",
							children: ["Shirt ", parsed.num]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mx-auto mt-3 max-w-2xl text-xs leading-snug text-[#3a3834]",
							children: [
								"Awarded on the third Monday of ",
								title,
								" for 3-2-1 parent votes, training (including attendance), opposition man of the match and players’ / manager’s player. 1st place boxed medal."
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto grid max-w-xl grid-cols-4 gap-2 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "3-2-1",
									value: parentPts
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Training",
									value: trainingPts
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: `Opp MOM ×${OPP_MOM_POINTS}`,
									value: oppMom * OPP_MOM_POINTS
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: `P/M ×${PLAYERS_PLAYER_POINTS}`,
									value: playersPlayer * PLAYERS_PLAYER_POINTS
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-3xl font-bold uppercase tracking-tight",
							children: [total, " pts"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-end justify-between gap-4 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 border-t border-[#0c0c0d]/30 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-sm font-bold uppercase tracking-tight",
										children: MANAGER_NAME
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-widest text-[#6b6760]",
										children: "Awarded by"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 border-t border-[#0c0c0d]/30 pt-1 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-sm font-bold uppercase tracking-tight",
										children: COACH_NAME
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-widest text-[#6b6760]",
										children: "Head coach"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 border-t border-[#0c0c0d]/30 pt-1 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-sm font-bold uppercase tracking-tight",
										children: ASSISTANT_NAME
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold uppercase tracking-widest text-[#6b6760]",
										children: "Assistant coach"
									})]
								})
							]
						})
					] })]
				})
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-display text-xl font-bold tabular-nums",
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold uppercase tracking-wide text-[#6b6760]",
		children: label
	})] });
}
function CertPage() {
	const { month: monthQ, player: playerQ } = Route$6.useSearch();
	const month = /^\d{4}-\d{2}$/.test(monthQ) ? monthQ : upcomingPotmMonth();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [player, setPlayer] = (0, import_react.useState)(playerQ);
	const [parentPts, setParentPts] = (0, import_react.useState)(0);
	const [trainingPts, setTrainingPts] = (0, import_react.useState)(0);
	const [oppMom, setOppMom] = (0, import_react.useState)(0);
	const [playersPlayer, setPlayersPlayer] = (0, import_react.useState)(0);
	const [total, setTotal] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		getPotm({ data: { month } }).then((data) => {
			const row = data.standings.find((s) => s.name === playerQ) || data.winner && data.standings.find((s) => s.name === data.winner?.player) || data.leader;
			if (playerQ) setPlayer(playerQ);
			else if (row) setPlayer(row.name);
			if (row && (!playerQ || row.name === playerQ)) {
				setParentPts(row.parentPts);
				setTrainingPts(row.trainingPts);
				setOppMom(row.oppMom);
				setPlayersPlayer(row.playersPlayer);
				setTotal(row.total);
			} else if (playerQ) {
				setParentPts(21);
				setTrainingPts(78);
				setOppMom(1);
				setPlayersPlayer(1);
				setTotal(129);
			}
			setReady(true);
		}).catch(() => setReady(true));
	}, [month, playerQ]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Loading certificate…"
		})
	});
	if (!player) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-2 bg-[#f3efe6] px-6 text-center text-[#0c0c0d]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-bold uppercase",
			children: "No winner yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-[#6b6760]",
			children: "Points land from 3-2-1, training, opposition MOM and players’ player."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PotmCertificate, {
		month,
		player,
		parentPts,
		trainingPts,
		oppMom,
		playersPlayer,
		total
	});
}
//#endregion
export { CertPage as component };
