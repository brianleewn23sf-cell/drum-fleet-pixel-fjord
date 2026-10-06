import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as TEAM_NAME, l as MOTTO_EN, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { a as FIRST_BALLS, i as COMPACT_EXPAND } from "./whatsapp-BM3bb8QP.mjs";
import { t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { t as gameDetailsFor } from "./game-details-k7DhdgXt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shape-DI36l1pi.js
var import_jsx_runtime = require_jsx_runtime();
function Pitch({ kids, arrows = [] }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 100 150",
		className: "w-full overflow-visible rounded-xl",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "grass",
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#2f7a4a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "50%",
							stopColor: "#24633c"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#1e5534"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
					id: "arr",
					viewBox: "0 0 10 10",
					refX: "8",
					refY: "5",
					markerWidth: "7",
					markerHeight: "7",
					orient: "auto-start-reverse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 0 0 L 10 5 L 0 10 z",
						fill: "#f5e27a"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("marker", {
					id: "arrDash",
					viewBox: "0 0 10 10",
					refX: "8",
					refY: "5",
					markerWidth: "7",
					markerHeight: "7",
					orient: "auto-start-reverse",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 0 0 L 10 5 L 0 10 z",
						fill: "#ffffff"
					})
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "100",
				height: "150",
				rx: "8",
				fill: "url(#grass)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "4",
				width: "92",
				height: "142",
				fill: "none",
				stroke: "rgba(255,255,255,0.85)",
				strokeWidth: "1.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "75",
				x2: "96",
				y2: "75",
				stroke: "rgba(255,255,255,0.7)",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "75",
				r: "12",
				fill: "none",
				stroke: "rgba(255,255,255,0.7)",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "75",
				r: "1.1",
				fill: "white"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "22",
				y: "4",
				width: "56",
				height: "18",
				fill: "none",
				stroke: "rgba(255,255,255,0.75)",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "4",
				width: "32",
				height: "8",
				fill: "none",
				stroke: "rgba(255,255,255,0.75)",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "22",
				y: "128",
				width: "56",
				height: "18",
				fill: "none",
				stroke: "rgba(255,255,255,0.75)",
				strokeWidth: "0.8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "34",
				y: "138",
				width: "32",
				height: "8",
				fill: "none",
				stroke: "rgba(255,255,255,0.75)",
				strokeWidth: "0.8"
			}),
			arrows.map((a, i) => {
				const mx = (a.x1 + a.x2) / 2 + (a.curve ?? 0);
				const my = (a.y1 + a.y2) / 2;
				const d = `M ${a.x1} ${a.y1} Q ${mx} ${my} ${a.x2} ${a.y2}`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d,
					fill: "none",
					stroke: a.dashed ? "#ffffff" : "#f5e27a",
					strokeWidth: "1.8",
					strokeDasharray: a.dashed ? "4 3" : void 0,
					markerEnd: a.dashed ? "url(#arrDash)" : "url(#arr)"
				}, `a-${i}`);
			}),
			kids.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: `translate(${p.x} ${p.y})`,
				children: [p.kind === "them" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					r: "4.2",
					fill: "none",
					stroke: "#f4f1ea",
					strokeWidth: "1.6"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						r: "5.1",
						fill: "#111"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						r: "4.4",
						fill: p.kind === "gk" ? "#1d4ed8" : "#b42318"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M -4.2 -1.2 H 4.2",
						stroke: "#111",
						strokeWidth: "1.6"
					})
				] }), p.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					y: "9.5",
					textAnchor: "middle",
					fill: "white",
					fontSize: "3.6",
					fontWeight: "700",
					style: {
						paintOrder: "stroke",
						stroke: "#111",
						strokeWidth: .6
					},
					children: p.label
				}) : null]
			}, `${p.x}-${p.y}-${i}`))
		]
	});
}
function Card({ title, kicker, children, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-accent",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl font-bold uppercase tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 flex gap-3 text-[11px] uppercase tracking-wide text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-0.5 w-4 bg-[#f5e27a]" }), " Move"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-0.5 w-4 border-t border-dashed border-white/80" }), " Pass"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-1.5 text-sm leading-6 text-fg",
				children: note.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
			})
		]
	});
}
var SPREAD = [
	{
		x: 14,
		y: 22,
		label: "LW"
	},
	{
		x: 50,
		y: 16,
		label: "ST"
	},
	{
		x: 86,
		y: 22,
		label: "RW"
	},
	{
		x: 32,
		y: 58,
		label: "CM"
	},
	{
		x: 68,
		y: 58,
		label: "CM"
	},
	{
		x: 14,
		y: 96,
		label: "LWB"
	},
	{
		x: 50,
		y: 102,
		label: "CB"
	},
	{
		x: 86,
		y: 96,
		label: "RWB"
	},
	{
		x: 50,
		y: 136,
		label: "GK",
		kind: "gk"
	}
];
var COMPACT = [
	{
		x: 30,
		y: 52,
		label: "LW"
	},
	{
		x: 50,
		y: 48,
		label: "ST"
	},
	{
		x: 70,
		y: 52,
		label: "RW"
	},
	{
		x: 38,
		y: 72,
		label: "CM"
	},
	{
		x: 62,
		y: 72,
		label: "CM"
	},
	{
		x: 30,
		y: 94,
		label: "LB"
	},
	{
		x: 50,
		y: 98,
		label: "CB"
	},
	{
		x: 70,
		y: 94,
		label: "RB"
	},
	{
		x: 50,
		y: 136,
		label: "GK",
		kind: "gk"
	}
];
var PRESS = [
	{
		x: 22,
		y: 10,
		kind: "them"
	},
	{
		x: 50,
		y: 8,
		kind: "them",
		label: "GK"
	},
	{
		x: 78,
		y: 10,
		kind: "them"
	},
	{
		x: 22,
		y: 28,
		label: "LW"
	},
	{
		x: 50,
		y: 26,
		label: "ST"
	},
	{
		x: 78,
		y: 28,
		label: "RW"
	},
	{
		x: 38,
		y: 62,
		label: "CM"
	},
	{
		x: 62,
		y: 62,
		label: "CM"
	},
	{
		x: 28,
		y: 98,
		label: "LB"
	},
	{
		x: 50,
		y: 104,
		label: "CB"
	},
	{
		x: 78,
		y: 92,
		label: "RB"
	},
	{
		x: 50,
		y: 136,
		label: "GK",
		kind: "gk"
	}
];
var PRESS_ARROWS = [
	{
		x1: 22,
		y1: 34,
		x2: 22,
		y2: 16
	},
	{
		x1: 50,
		y1: 32,
		x2: 50,
		y2: 14
	},
	{
		x1: 78,
		y1: 34,
		x2: 78,
		y2: 16
	}
];
var OVERLAP = [
	{
		x: 22,
		y: 28,
		label: "LW"
	},
	{
		x: 50,
		y: 22,
		label: "ST"
	},
	{
		x: 78,
		y: 28,
		label: "RW"
	},
	{
		x: 38,
		y: 62,
		label: "CM"
	},
	{
		x: 62,
		y: 62,
		label: "CM"
	},
	{
		x: 18,
		y: 100,
		label: "LWB"
	},
	{
		x: 50,
		y: 104,
		label: "CB"
	},
	{
		x: 82,
		y: 100,
		label: "RWB"
	},
	{
		x: 50,
		y: 136,
		label: "GK",
		kind: "gk"
	}
];
var OVERLAP_ARROWS = [
	{
		x1: 18,
		y1: 96,
		x2: 14,
		y2: 22,
		curve: -18
	},
	{
		x1: 82,
		y1: 96,
		x2: 86,
		y2: 22,
		curve: 18
	},
	{
		x1: 22,
		y1: 32,
		x2: 28,
		y2: 58,
		dashed: true,
		curve: 8
	},
	{
		x1: 78,
		y1: 32,
		x2: 72,
		y2: 58,
		dashed: true,
		curve: -8
	}
];
var OPTION2 = [
	{
		x: 50,
		y: 10,
		kind: "them",
		label: "GK"
	},
	{
		x: 18,
		y: 36,
		label: "LW"
	},
	{
		x: 38,
		y: 32,
		label: "ST"
	},
	{
		x: 62,
		y: 32,
		label: "CM"
	},
	{
		x: 82,
		y: 36,
		label: "RW"
	},
	{
		x: 38,
		y: 62,
		label: "CM"
	},
	{
		x: 18,
		y: 100,
		label: "LWB"
	},
	{
		x: 50,
		y: 88,
		label: "CB"
	},
	{
		x: 82,
		y: 100,
		label: "RWB"
	},
	{
		x: 50,
		y: 136,
		label: "GK",
		kind: "gk"
	}
];
var OPTION2_ARROWS = [
	{
		x1: 18,
		y1: 42,
		x2: 18,
		y2: 18
	},
	{
		x1: 38,
		y1: 38,
		x2: 38,
		y2: 16
	},
	{
		x1: 50,
		y1: 84,
		x2: 50,
		y2: 40
	},
	{
		x1: 62,
		y1: 38,
		x2: 62,
		y2: 16
	},
	{
		x1: 82,
		y1: 42,
		x2: 82,
		y2: 18
	},
	{
		x1: 18,
		y1: 100,
		x2: 34,
		y2: 100
	},
	{
		x1: 82,
		y1: 100,
		x2: 66,
		y2: 100
	}
];
var pine = gameDetailsFor("Pine Villa");
function TeamShape() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: "How we shape up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-bold uppercase tracking-tight",
					children: TEAM_NAME
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-sm font-bold uppercase tracking-widest text-accent",
					children: MOTTO_LATIN
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: MOTTO_EN
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-7 text-fg",
					children: [
						COMPACT_EXPAND,
						" ",
						FIRST_BALLS,
						" Front three press their goal kicks. Wide forwards drop when the wing-backs overlap."
					]
				})
			] }),
			pine ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-accent bg-accent-soft p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: pine.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc pl-4 text-sm",
					children: pine.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				kicker: "With the ball",
				title: "Team shape · spread out",
				note: [
					"In possession we expand and push forward.",
					"Width from the wing-backs and wide forwards. Centre-forward stays high on their last man so we are not compressed.",
					"Move the ball within 3 seconds — feet, space, or the net. If a winger or mid has space, sprint with it."
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pitch, { kids: SPREAD })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				kicker: "Without the ball",
				title: "Team shape · compact",
				note: [
					"Without the ball we drop and squeeze together.",
					"Stay compact. Win the first ball. If that fails, win the second ball.",
					"Five-second press is a team job, not one lad chasing on his own."
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pitch, { kids: COMPACT })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				kicker: "Their goal kick",
				title: "The press",
				note: [
					"Wide forwards and the centre-forward press their goal kick.",
					"Watch the keeper’s eyes and body language to gauge where it is going.",
					"If he has it in his hands and it is going long, drop back straight away and win first and second balls."
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pitch, {
					kids: PRESS,
					arrows: PRESS_ARROWS
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				kicker: "In game · option 1",
				title: "The overlap",
				note: [
					"Solid arrow = the wing-back overlaps down the line.",
					"Dotted arrow = the wide forward drops in and shows for the pass, then lets the overlap go.",
					"Two must stay at the back. The centre-back can step in only if it is safe."
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pitch, {
					kids: OVERLAP,
					arrows: OVERLAP_ARROWS
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				kicker: "In game · option 2",
				title: "Step up together",
				note: [
					"When we can, the front and middle step toward their box as one.",
					"Wing-backs tuck in to cover. Nobody gets left 1 v 1 in behind.",
					"Stay compact behind the press. First ball, then second ball."
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pitch, {
					kids: OPTION2,
					arrows: OPTION2_ARROWS
				})
			})
		]
	});
}
function ShapePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { boardLink: "vote" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "flex-1 overflow-y-auto px-4 py-4 pb-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamShape, {})
		})]
	});
}
//#endregion
export { ShapePage as component };
