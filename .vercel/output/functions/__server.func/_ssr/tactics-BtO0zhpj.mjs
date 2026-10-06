import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as pitchSurname, t as PLAYERS, u as publicName } from "./players-CZr5uoUS.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { l as formationById, r as FORMATIONS } from "./formations-pQSTjnGH.mjs";
import { d as Play, f as Pause, l as RotateCcw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tactics-BtO0zhpj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function clamp(spot) {
	return {
		x: Math.min(90, Math.max(10, spot.x)),
		y: Math.min(90, Math.max(10, spot.y))
	};
}
function split(slots) {
	const gk = slots.find((slot) => slot.id === "GK") ?? slots[0];
	const out = slots.filter((slot) => slot !== gk);
	let backs = out.filter((slot) => slot.y >= 64).sort((a, b) => a.x - b.x);
	let forwards = out.filter((slot) => slot.y <= 36).sort((a, b) => a.x - b.x);
	let mids = out.filter((slot) => slot.y > 36 && slot.y < 64).sort((a, b) => a.x - b.x);
	if (!forwards.length) {
		forwards = [...out].sort((a, b) => a.y - b.y).slice(0, 2);
		const ids = new Set(forwards.map((slot) => slot.id));
		backs = backs.filter((slot) => !ids.has(slot.id));
		mids = mids.filter((slot) => !ids.has(slot.id));
	}
	if (!mids.length && backs.length > 2) mids = [backs.pop()].sort((a, b) => a.x - b.x);
	return {
		gk,
		backs,
		mids,
		forwards
	};
}
function homeOf(slots) {
	return Object.fromEntries(slots.map((slot) => [slot.id, {
		x: slot.x,
		y: slot.y
	}]));
}
function nudge(home, shifts) {
	const next = { ...home };
	for (const [slot, dx, dy] of shifts) {
		if (!slot) continue;
		const from = home[slot.id];
		if (!from) continue;
		next[slot.id] = clamp({
			x: from.x + dx,
			y: from.y + dy
		});
	}
	return next;
}
function at(slot, dx = 0, dy = 0) {
	if (!slot) return {
		x: 50,
		y: 50
	};
	return clamp({
		x: slot.x + dx,
		y: slot.y + dy
	});
}
function left(line) {
	return line[0];
}
function right(line) {
	return line[line.length - 1];
}
function middle(line) {
	if (!line.length) return void 0;
	return line[Math.floor((line.length - 1) / 2)];
}
function step(t, ball, doing, expect, spots) {
	return {
		t,
		ball,
		doing,
		expect,
		spots
	};
}
function moves(formationId, name, slots) {
	const { gk, backs, mids, forwards } = split(slots);
	const home = homeOf(slots);
	const bL = left(backs);
	const bR = right(backs);
	const bM = middle(backs);
	const mL = left(mids);
	const mR = right(mids);
	const mM = middle(mids);
	const fL = left(forwards);
	const fR = right(forwards);
	const fM = middle(forwards);
	const pivot = mM ?? bM ?? fM;
	const make = (family, title, kind, frames) => ({
		id: `${formationId}-${family}`,
		title,
		formation: formationId,
		kind,
		family,
		frames
	});
	return [
		make("shape", "Our shape", "tactic", [step(0, at(pivot), `This is ${name}. Nine players, one picture.`, "Stay in your shirt. If you leave it, someone fills it.", home), step(6, at(pivot, 0, -4), "Look again. This is where we start when we have the ball.", "Head up before it arrives. First touch away from pressure.", home)]),
		make("build", "Play out", "tactic", [
			step(0, at(gk, 0, -2), "Keeper has it. We do not boot it.", "Back line splits. One midfielder shows for the ball.", nudge(home, [
				[
					bL,
					-8,
					2
				],
				[
					bR,
					8,
					2
				],
				[
					pivot,
					0,
					8
				]
			])),
			step(3, at(bL, 2, 0), "Open body. Simple pass into the spare player.", "If they press you, play the way you are facing.", nudge(home, [
				[
					bL,
					-6,
					0
				],
				[
					mL,
					-4,
					6
				],
				[
					pivot,
					-6,
					4
				]
			])),
			step(6, at(pivot, 0, 2), "We are facing their goal. Now we can play.", "Scan before it arrives. Forward if it is on.", nudge(home, [
				[
					pivot,
					0,
					2
				],
				[
					mL,
					-2,
					-4
				],
				[
					fL,
					0,
					-4
				]
			]))
		]),
		make("third", "Third man", "tactic", [
			step(0, at(mL ?? fL), "Short pass. The third player is already moving.", "Do not stand and watch the pass.", home),
			step(3, at(pivot), "Bounce it. The runner goes the other side of the defender.", "One touch if you can. Then look for the runner.", nudge(home, [[
				fL,
				6,
				4
			], [
				pivot,
				-4,
				0
			]])),
			step(6, at(fL, 8, 2), "Third man gets it in space.", "First touch forward. That is the point of the move.", nudge(home, [
				[
					fL,
					10,
					-2
				],
				[
					fR ?? fM,
					-4,
					-4
				],
				[
					pivot,
					4,
					-4
				]
			]))
		]),
		make("switch", "Switch it", "tactic", [
			step(0, at(mR ?? fR), "They have all come to this side. The other side is empty.", "Do not force it into the crowd.", nudge(home, [[
				mR,
				4,
				0
			], [
				fR,
				4,
				0
			]])),
			step(3.5, at(pivot), "One pass inside. Now look across.", "The switch is one pass, not five.", home),
			step(7, at(mL ?? fL, -2, -4), "Far side is free. Attack that space.", "Stay wide until the ball is on its way. Then go.", nudge(home, [
				[
					mL,
					-4,
					-6
				],
				[
					fL,
					-4,
					-6
				],
				[
					pivot,
					-8,
					-2
				]
			]))
		]),
		make("press", "Press trigger", "tactic", [
			step(0, {
				x: 82,
				y: 28
			}, "Bad touch on their right. That is the trigger.", "Nearest player goes. Nobody else dives in.", home),
			step(3, {
				x: 78,
				y: 30
			}, "We jump. The rest slide so they cannot play through us.", "Bend the run. Show them the line.", nudge(home, [
				[
					mR ?? fR,
					8,
					-6
				],
				[
					fR,
					6,
					-4
				],
				[
					pivot,
					8,
					-2
				],
				[
					mL,
					10,
					0
				],
				[
					bL,
					8,
					0
				],
				[
					bR,
					6,
					0
				]
			])),
			step(6, {
				x: 74,
				y: 32
			}, "We win it. The press is finished.", "First pass forward, then back in shape.", nudge(home, [[
				mR ?? fR,
				4,
				-4
			], [
				pivot,
				4,
				-2
			]]))
		]),
		make("counter", "Counter", "tactic", [
			step(0, at(bM ?? gk), "We win it at the back. Go now.", "One pass forward. Do not turn back.", home),
			step(3, at(fM ?? fL, 0, 6), "Strikers run in behind. One midfielder joins.", "If you are not in the attack, hold your shirt.", nudge(home, [
				[
					fL,
					-4,
					-8
				],
				[
					fR,
					4,
					-8
				],
				[
					fM,
					0,
					-8
				],
				[
					pivot,
					0,
					-10
				]
			])),
			step(6, at(fR ?? fM, 0, -6), "Finish, or set the player who is free.", "Then we are a team again. Get back in the picture.", nudge(home, [
				[
					fR ?? fM,
					2,
					-8
				],
				[
					fL,
					-2,
					-4
				],
				[
					pivot,
					4,
					-6
				]
			]))
		]),
		make("rondo", "Rondo", "training", [
			step(0, {
				x: 38,
				y: 46
			}, "Training. Four players, one in the middle. Keep the ball.", "Two touches. Move it before they get close.", nudge(home, [
				[
					mL ?? fL,
					0,
					8
				],
				[
					mR ?? fR,
					0,
					8
				],
				[
					pivot,
					0,
					6
				],
				[
					fM ?? fL,
					0,
					16
				]
			])),
			step(3, {
				x: 62,
				y: 46
			}, "Play around the jockey. Talk.", "Play to the man they are not facing.", nudge(home, [[
				pivot,
				4,
				4
			]])),
			step(6, {
				x: 50,
				y: 58
			}, "Same rondo. Stay sharp.", "If you give it away, you go in the middle.", home)
		]),
		make("wave", "Finishing wave", "training", [
			step(0, at(mL ?? bL), "Wave. Ball starts wide. Strikers start the run now.", "Do not wait for the cross. Arrive as it arrives.", home),
			step(3, at(fL, -2, 2), "Wide player. Look at the box before you cross.", "Near post and far post. Not two on the same spot.", nudge(home, [
				[
					fL,
					-4,
					-2
				],
				[
					fM,
					-6,
					-6
				],
				[
					fR,
					4,
					-4
				],
				[
					pivot,
					-8,
					-8
				]
			])),
			step(6, at(fR ?? fM, 0, -6), "Finish. Then the next wave sets up.", "Hit the target. Then jog back in shape.", nudge(home, [
				[
					fR ?? fM,
					0,
					-8
				],
				[
					fL,
					4,
					-4
				],
				[
					pivot,
					0,
					-6
				]
			]))
		]),
		make("recover", "Win it back", "training", [
			step(0, {
				x: 70,
				y: 24
			}, "We just lost it. Five seconds to recover.", "Nearest player delays. The rest sprint.", home),
			step(3, {
				x: 66,
				y: 36
			}, "Two stay up. Everyone else gets goal side.", "Run back, do not walk. Protect the middle.", nudge(home, [
				[
					fL,
					0,
					8
				],
				[
					fM,
					0,
					6
				],
				[
					mL,
					6,
					8
				],
				[
					mR,
					-4,
					6
				],
				[
					pivot,
					0,
					8
				],
				[
					fR,
					-6,
					4
				]
			])),
			step(6, at(bM ?? gk, 0, -4), "Shape is back. Now we can win it and play.", "This is the training habit for every game.", home)
		])
	];
}
var TACTIC_DRILLS = FORMATIONS.flatMap((formation) => moves(formation.id, formation.name, formation.slots));
function drillsFor(formationId) {
	return TACTIC_DRILLS.filter((drill) => drill.formation === formationId);
}
function drillDuration(drill) {
	return drill.frames[drill.frames.length - 1]?.t ?? 0;
}
function mix(a, b, k) {
	return a + (b - a) * k;
}
function sampleDrill(drill, time) {
	const frames = drill.frames;
	const t = Math.max(0, Math.min(time, drillDuration(drill)));
	let i = 0;
	while (i < frames.length - 1 && frames[i + 1].t < t) i += 1;
	const a = frames[i];
	const b = frames[Math.min(i + 1, frames.length - 1)];
	const span = b.t - a.t;
	const k = span <= 0 ? 0 : Math.min(1, Math.max(0, (t - a.t) / span));
	const spots = {};
	for (const id of Object.keys(a.spots)) {
		const from = a.spots[id];
		const to = b.spots[id] ?? from;
		spots[id] = {
			x: mix(from.x, to.x, k),
			y: mix(from.y, to.y, k)
		};
	}
	return {
		t,
		ball: {
			x: mix(a.ball.x, b.ball.x, k),
			y: mix(a.ball.y, b.ball.y, k)
		},
		spots,
		doing: k < .45 ? a.doing : b.doing,
		expect: k < .45 ? a.expect : b.expect
	};
}
var STORE = "bulls-tactic-v1";
var STARTING = {
	GK: "13) Zachary Read (GK)",
	LCB: "3) Ruben Biddiss",
	RCB: "66) Max Shaw",
	CDM: "4) Louie Biddiss",
	LM: "20) Archie Almond",
	CM: "14) Henry Bearman",
	RM: "5) Kody Cox",
	LS: "22) William Brittain",
	RS: "30) Isa Ali"
};
var ORDER = [
	"GK",
	"LCB",
	"RCB",
	"CDM",
	"LM",
	"CM",
	"RM",
	"LS",
	"RS"
];
var OPP_SHAPE = [
	{
		x: 50,
		y: 8
	},
	{
		x: 22,
		y: 16
	},
	{
		x: 50,
		y: 14
	},
	{
		x: 78,
		y: 16
	},
	{
		x: 18,
		y: 26
	},
	{
		x: 50,
		y: 28
	},
	{
		x: 82,
		y: 26
	},
	{
		x: 36,
		y: 38
	},
	{
		x: 64,
		y: 38
	}
];
function fitUs(spot) {
	const y = 50 + (Math.min(94, Math.max(8, spot.y)) - 8) / 86 * 42;
	return {
		x: spot.x,
		y
	};
}
function defaultName(slot, index) {
	return STARTING[slot.id] ?? STARTING[ORDER[index] ?? ""] ?? PLAYERS[index] ?? "Player";
}
function layoutOpp() {
	return OPP_SHAPE.map((spot, index) => ({
		id: `opp-${index + 1}`,
		team: "opp",
		...spot
	}));
}
function layoutUs(slots, names) {
	return slots.map((slot, index) => ({
		id: names[index] || defaultName(slot, index),
		team: "us",
		...fitUs(slot)
	}));
}
function spotFor(slot, index, live, fallback) {
	if (!live) return {
		x: fallback.x,
		y: fallback.y
	};
	return live[slot.id] ?? live[ORDER[index] ?? ""] ?? {
		x: fallback.x,
		y: fallback.y
	};
}
function along(lines, t) {
	const count = Math.max(1, lines.length);
	const scaled = Math.min(.999, Math.max(0, t)) * count;
	const index = Math.min(count - 1, Math.floor(scaled));
	const step = scaled - index;
	const line = lines[index];
	return {
		x: line.x1 + (line.x2 - line.x1) * step,
		y: line.y1 + (line.y2 - line.y1) * step
	};
}
function isGear(mark) {
	return mark.kind !== "text" && mark.kind !== "pass" && mark.kind !== "run" && mark.kind !== "dribble";
}
function isPath(mark) {
	return mark.kind === "run" || mark.kind === "dribble";
}
function shirtNo(id) {
	if (id.startsWith("opp-")) return id.slice(4);
	return id.match(/^(\d+)/)?.[1] ?? "";
}
var TOOLS = [
	{
		id: "move",
		label: "Move"
	},
	{
		id: "highlight",
		label: "Highlight"
	},
	{
		id: "cone",
		label: "Cone"
	},
	{
		id: "ball",
		label: "Ball"
	},
	{
		id: "bib",
		label: "Bib"
	},
	{
		id: "goal",
		label: "Goal"
	},
	{
		id: "mannequin",
		label: "Mannequin"
	},
	{
		id: "pole",
		label: "Pole"
	},
	{
		id: "hurdle",
		label: "Hurdle"
	},
	{
		id: "ladder",
		label: "Ladder"
	},
	{
		id: "hoop",
		label: "Hoop"
	},
	{
		id: "zone",
		label: "Zone"
	},
	{
		id: "pass",
		label: "Pass"
	},
	{
		id: "run",
		label: "Run line"
	},
	{
		id: "dribble",
		label: "Dribble"
	},
	{
		id: "text",
		label: "Text"
	},
	{
		id: "rub",
		label: "Rub out"
	}
];
function loadSaved() {
	try {
		const raw = localStorage.getItem(STORE);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed.lineup && !parsed.pieces) return null;
		return {
			formation: parsed.formation || "2-1-3-2",
			lineup: parsed.lineup ?? {},
			marks: Array.isArray(parsed.marks) ? parsed.marks : [],
			pieces: Array.isArray(parsed.pieces) ? parsed.pieces : void 0,
			ball: parsed.ball
		};
	} catch {
		return null;
	}
}
function TacticBoard() {
	const pitchRef = (0, import_react.useRef)(null);
	const stageRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)(null);
	const skipSave = (0, import_react.useRef)(true);
	const [formationId, setFormationId] = (0, import_react.useState)("2-1-3-2");
	const [pieces, setPieces] = (0, import_react.useState)(() => {
		const shape = formationById("2-1-3-2");
		return [...layoutUs(shape.slots, shape.slots.map(defaultName)), ...layoutOpp()];
	});
	const [ball, setBall] = (0, import_react.useState)({
		x: 50,
		y: 72
	});
	const [drillId, setDrillId] = (0, import_react.useState)("2-1-3-2-shape");
	const [time, setTime] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [drawTime, setDrawTime] = (0, import_react.useState)(0);
	const [drawPlaying, setDrawPlaying] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [drag, setDrag] = (0, import_react.useState)(null);
	const [tool, setTool] = (0, import_react.useState)("move");
	const [bibColor, setBibColor] = (0, import_react.useState)("red");
	const [marks, setMarks] = (0, import_react.useState)([]);
	const [ink, setInk] = (0, import_react.useState)(null);
	const [inkColor, setInkColor] = (0, import_react.useState)("white");
	const [pitchView, setPitchView] = (0, import_react.useState)("full");
	const [highlights, setHighlights] = (0, import_react.useState)([]);
	const [frames, setFrames] = (0, import_react.useState)([]);
	const [frameIndex, setFrameIndex] = (0, import_react.useState)(0);
	const [frameTime, setFrameTime] = (0, import_react.useState)(0);
	const [framePlaying, setFramePlaying] = (0, import_react.useState)(false);
	const [speed, setSpeed] = (0, import_react.useState)(1);
	const [labelAt, setLabelAt] = (0, import_react.useState)(null);
	const [labelText, setLabelText] = (0, import_react.useState)("");
	const [full, setFull] = (0, import_react.useState)(false);
	const [session, setSession] = (0, import_react.useState)("match");
	const [showBall, setShowBall] = (0, import_react.useState)(true);
	const formation = formationById(formationId);
	const drill = TACTIC_DRILLS.find((item) => item.id === drillId) ?? drillsFor(formationId)[0] ?? TACTIC_DRILLS[0];
	const tactics = drillsFor(formationId).filter((item) => item.kind === "tactic");
	const training = drillsFor(formationId).filter((item) => item.kind === "training");
	const duration = drillDuration(drill);
	const live = (0, import_react.useMemo)(() => sampleDrill(drill, time), [drill, time]);
	const followDrill = drill.formation === formationId;
	const usOn = pieces.filter((piece) => piece.team === "us");
	const bench = PLAYERS.filter((player) => !pieces.some((piece) => piece.id === player));
	const oppOff = Array.from({ length: 9 }, (_, index) => `opp-${index + 1}`).filter((id) => !pieces.some((piece) => piece.id === id));
	const runLines = marks.filter((mark) => isPath(mark) && Boolean(mark.runner));
	const passLines = marks.filter((mark) => mark.kind === "pass");
	const hasDraw = runLines.length + passLines.length > 0;
	const marksRef = (0, import_react.useRef)(marks);
	marksRef.current = marks;
	(0, import_react.useEffect)(() => {
		const saved = loadSaved();
		if (saved) {
			setFormationId(saved.formation);
			setMarks(saved.marks);
			if (saved.ball) setBall(saved.ball);
			if (Array.isArray(saved.pieces)) {
				const stillHere = new Set(PLAYERS);
				const kept = saved.pieces.filter((piece) => piece.team === "opp" || stillHere.has(piece.id));
				setPieces(kept);
				if (!kept.length) {
					setSession("training");
					setShowBall(false);
				}
			} else {
				const shape = formationById(saved.formation);
				const names = shape.slots.map((slot, index) => saved.lineup[slot.id] || defaultName(slot, index));
				setPieces([...layoutUs(shape.slots, names), ...layoutOpp()]);
			}
			setDrillId(drillsFor(saved.formation)[0]?.id ?? "2-1-3-2-shape");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (skipSave.current) {
			skipSave.current = false;
			return;
		}
		localStorage.setItem(STORE, JSON.stringify({
			formation: formationId,
			pieces,
			marks,
			ball
		}));
	}, [
		formationId,
		pieces,
		marks,
		ball
	]);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		let frame = 0;
		let last = performance.now();
		const step = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			setTime((current) => {
				const next = current + dt;
				if (next >= duration) {
					setPlaying(false);
					return duration;
				}
				return next;
			});
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [playing, duration]);
	(0, import_react.useEffect)(() => {
		if (!drawPlaying) return;
		let frame = 0;
		let last = performance.now();
		const step = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			setDrawTime((current) => {
				const next = current + dt / 6;
				if (next >= 1) {
					setDrawPlaying(false);
					const drawn = marksRef.current;
					setPieces((list) => list.map((piece) => {
						const mine = drawn.filter((mark) => isPath(mark) && mark.runner === piece.id);
						const end = mine[mine.length - 1];
						return end ? {
							...piece,
							x: end.x2,
							y: end.y2
						} : piece;
					}));
					const passes = drawn.filter((mark) => mark.kind === "pass");
					const endPass = passes[passes.length - 1];
					if (endPass) setBall({
						x: endPass.x2,
						y: endPass.y2
					});
					return 0;
				}
				return next;
			});
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [drawPlaying]);
	(0, import_react.useEffect)(() => {
		if (!frames.length || framePlaying) return;
		setFrames((current) => {
			const snap = current[frameIndex];
			if (!snap) return current;
			const gear = marks.filter(isGear);
			if (JSON.stringify(snap.pieces) === JSON.stringify(pieces) && JSON.stringify(snap.ball) === JSON.stringify(ball) && JSON.stringify(snap.gear) === JSON.stringify(gear)) return current;
			return current.map((item, index) => index === frameIndex ? {
				pieces,
				ball,
				gear
			} : item);
		});
	}, [
		pieces,
		ball,
		marks,
		frameIndex,
		framePlaying,
		frames.length
	]);
	(0, import_react.useEffect)(() => {
		if (!framePlaying) return;
		let frame = 0;
		let last = performance.now();
		const total = Math.max(1, frames.length - 1) * (2.4 / speed);
		const step = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			setFrameTime((current) => {
				const next = current + dt / total;
				if (next >= 1) {
					setFramePlaying(false);
					const lastSnap = frames[frames.length - 1];
					if (lastSnap) {
						setFrameIndex(frames.length - 1);
						setPieces(lastSnap.pieces);
						setBall(lastSnap.ball);
						setMarks((list) => [...list.filter((mark) => !isGear(mark)), ...lastSnap.gear]);
					}
					return 0;
				}
				return next;
			});
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [
		framePlaying,
		frames,
		speed
	]);
	function chooseFormation(id) {
		if (id === formationId) return;
		const next = formationById(id);
		const family = drill.family;
		const same = drillsFor(id).find((item) => item.family === family) ?? drillsFor(id)[0];
		setPlaying(false);
		setDrawPlaying(false);
		setDrawTime(0);
		setTime(0);
		if (session !== "training") setPieces((current) => {
			const names = current.filter((piece) => piece.team === "us").map((piece) => piece.id);
			const opp = current.filter((piece) => piece.team === "opp");
			return [...layoutUs(next.slots, names), ...opp.length ? opp : layoutOpp()];
		});
		setFormationId(id);
		if (same) setDrillId(same.id);
	}
	function goFull() {
		setFull(true);
	}
	function exitFull() {
		setFull(false);
	}
	function chooseDrill(next) {
		if (session !== "training" && next.formation !== formationId) {
			const shape = formationById(next.formation);
			setPieces((current) => {
				const names = current.filter((piece) => piece.team === "us").map((piece) => piece.id);
				const opp = current.filter((piece) => piece.team === "opp");
				return [...layoutUs(shape.slots, names), ...opp.length ? opp : layoutOpp()];
			});
			setFormationId(next.formation);
		}
		setDrillId(next.id);
		setTime(0);
		setPlaying(false);
		setDrawPlaying(false);
		setDrawTime(0);
	}
	function nearestRunner(x, y) {
		let best;
		let bestDist = 14;
		for (const piece of pieces) {
			const dist = Math.hypot(piece.x - x, piece.y - y);
			if (dist < bestDist) {
				best = piece.id;
				bestDist = dist;
			}
		}
		if (Math.hypot(ball.x - x, ball.y - y) < bestDist) return "ball";
		return best;
	}
	function frameBlend() {
		const span = Math.max(1, frames.length - 1);
		const scaled = Math.min(.999, Math.max(0, frameTime)) * span;
		const index = Math.min(span - 1, Math.floor(scaled));
		return {
			index,
			step: scaled - index
		};
	}
	const framing = frames.length > 1 && (framePlaying || frameTime > 0);
	function framedSpot(id, fallback, read) {
		if (!framing) return fallback;
		const { index, step } = frameBlend();
		const from = read(frames[index]);
		const to = read(frames[index + 1] ?? frames[index]);
		if (!from || !to) return fallback;
		return {
			x: from.x + (to.x - from.x) * step,
			y: from.y + (to.y - from.y) * step
		};
	}
	function shown(piece) {
		const mine = marks.filter((mark) => isPath(mark) && mark.runner === piece.id);
		if (mine.length && (drawPlaying || drawTime > 0)) return along(mine, drawTime);
		if (piece.team === "us" && followDrill && (playing || time > 0) && !drawPlaying) {
			const index = usOn.indexOf(piece);
			const slot = formation.slots[index];
			if (slot) return fitUs(spotFor(slot, index, live.spots, slot));
		}
		return piece;
	}
	const ballShown = framedSpot("ball", (() => {
		if (passLines.length && (drawPlaying || drawTime > 0)) return along(passLines, drawTime);
		if (followDrill && (playing || time > 0) && !drawPlaying && !framing) return fitUs(live.ball);
		return ball;
	})(), (snap) => snap.ball);
	function beginDrag(event, player, from, team) {
		if (tool === "highlight") {
			event.preventDefault();
			event.stopPropagation();
			setHighlights((list) => list.includes(player) ? list.filter((id) => id !== player) : [...list, player]);
			return;
		}
		if (tool !== "move" || event.button !== 0) return;
		event.preventDefault();
		event.stopPropagation();
		const next = {
			player,
			from,
			team,
			x: event.clientX,
			y: event.clientY,
			moved: false
		};
		dragRef.current = next;
		setDrag(next);
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function beginGear(event, id) {
		if (tool === "rub") {
			event.stopPropagation();
			setMarks((list) => list.filter((mark) => mark.id !== id));
			return;
		}
		if (tool !== "move" || event.button !== 0) return;
		event.preventDefault();
		event.stopPropagation();
		const next = {
			player: id,
			from: "gear",
			team: "us",
			x: event.clientX,
			y: event.clientY,
			moved: false
		};
		dragRef.current = next;
		setDrag(next);
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function moveDrag(event) {
		const current = dragRef.current;
		if (!current) return;
		const moved = current.moved || Math.hypot(event.clientX - current.x, event.clientY - current.y) > 6;
		const point = pitchPoint(event);
		const next = {
			...current,
			x: event.clientX,
			y: event.clientY,
			moved
		};
		dragRef.current = next;
		setDrag(next);
		if (!moved || !current.from) return;
		if (current.from === "gear") {
			setMarks((list) => list.map((mark) => mark.id === current.player && mark.kind !== "pass" && mark.kind !== "run" ? {
				...mark,
				...point
			} : mark));
			return;
		}
		if (current.player === "ball") {
			setBall(point);
			return;
		}
		setPieces((list) => list.map((piece) => piece.id === current.player ? {
			...piece,
			...point
		} : piece));
	}
	function endDrag(event) {
		const current = dragRef.current;
		dragRef.current = null;
		setDrag(null);
		if (!current) return;
		if (!current.moved) {
			if (current.from === "gear" || current.player === "ball") return;
			setPicked((name) => name === current.player ? null : current.player);
			return;
		}
		const hit = document.elementFromPoint(event.clientX, event.clientY);
		const inside = Boolean(pitchRef.current?.contains(hit));
		if (current.from === "gear") {
			if (!inside) setMarks((list) => list.filter((mark) => mark.id !== current.player));
			return;
		}
		if (current.player === "ball") return;
		if (current.from) {
			if (!inside) setPieces((list) => list.filter((piece) => piece.id !== current.player));
			return;
		}
		if (!inside) return;
		const point = pitchPoint(event);
		setPieces((list) => [...list.filter((piece) => piece.id !== current.player), {
			id: current.player,
			team: current.team,
			...point
		}]);
		setPicked(null);
	}
	function pitchPoint(event) {
		const box = pitchRef.current?.getBoundingClientRect();
		if (!box || box.width === 0) return {
			x: 50,
			y: 50
		};
		return {
			x: Math.min(98, Math.max(2, (event.clientX - box.left) / box.width * 100)),
			y: Math.min(98, Math.max(2, (event.clientY - box.top) / box.height * 100))
		};
	}
	function rubAt(point) {
		setMarks((current) => {
			let best = -1;
			let bestDist = 8;
			current.forEach((mark, index) => {
				const spot = isGear(mark) ? mark : null;
				const dist = spot ? Math.hypot(spot.x - point.x, spot.y - point.y) : mark.kind === "pass" || mark.kind === "run" || mark.kind === "dribble" ? Math.hypot((mark.x1 + mark.x2) / 2 - point.x, (mark.y1 + mark.y2) / 2 - point.y) : 99;
				if (dist < bestDist) {
					best = index;
					bestDist = dist;
				}
			});
			if (best < 0) return current;
			return current.filter((_, index) => index !== best);
		});
	}
	function onPitchDown(event) {
		if (Boolean(event.target.closest("button")) && tool !== "run" && tool !== "pass" && tool !== "dribble") return;
		if (tool === "move") {
			if (picked) {
				const point = pitchPoint(event);
				const team = picked.startsWith("opp-") ? "opp" : "us";
				setPieces((list) => [...list.filter((piece) => piece.id !== picked), {
					id: picked,
					team,
					...point
				}]);
				setPicked(null);
			}
			return;
		}
		const point = pitchPoint(event);
		if (tool === "cone" || tool === "ball" || tool === "goal" || tool === "mannequin" || tool === "pole" || tool === "hurdle" || tool === "ladder" || tool === "hoop" || tool === "zone") {
			setMarks((current) => [...current, {
				id: crypto.randomUUID(),
				kind: tool,
				...point
			}]);
			return;
		}
		if (tool === "bib") {
			const color = bibColor;
			setMarks((current) => [...current, {
				id: crypto.randomUUID(),
				kind: "bib",
				color,
				...point
			}]);
			setBibColor(color === "red" ? "yellow" : color === "yellow" ? "blue" : "red");
			return;
		}
		if (tool === "text") {
			setLabelAt(point);
			setLabelText("");
			return;
		}
		if (tool === "rub") {
			rubAt(point);
			return;
		}
		if (tool !== "pass" && tool !== "run" && tool !== "dribble") return;
		setInk({
			id: "ink",
			kind: tool,
			x1: point.x,
			y1: point.y,
			x2: point.x,
			y2: point.y,
			color: inkColor
		});
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function onPitchMove(event) {
		if (!ink) return;
		const point = pitchPoint(event);
		setInk({
			...ink,
			x2: point.x,
			y2: point.y
		});
	}
	function onPitchUp() {
		if (!ink) return;
		const drawn = ink;
		setInk(null);
		if (Math.hypot(drawn.x2 - drawn.x1, drawn.y2 - drawn.y1) < 4) return;
		const runner = drawn.kind === "run" || drawn.kind === "dribble" ? nearestRunner(drawn.x1, drawn.y1) : void 0;
		setMarks((current) => [...current, {
			...drawn,
			id: crypto.randomUUID(),
			runner,
			color: inkColor
		}]);
	}
	function showFrame(index) {
		const snap = frames[index];
		if (!snap) return;
		setFramePlaying(false);
		setFrameTime(0);
		setFrameIndex(index);
		setPieces(snap.pieces);
		setBall(snap.ball);
		setMarks((current) => [...current.filter((mark) => !isGear(mark)), ...snap.gear]);
	}
	function addFrame() {
		setPlaying(false);
		setDrawPlaying(false);
		setFramePlaying(false);
		setFrameTime(0);
		const gear = marks.filter(isGear);
		const now = {
			pieces,
			ball,
			gear
		};
		setFrames((current) => {
			const next = current.length ? [...current, structuredClone(now)] : [structuredClone(now), structuredClone(now)];
			setFrameIndex(next.length - 1);
			return next;
		});
	}
	function removeFrame() {
		setFramePlaying(false);
		setFrameTime(0);
		setFrames((current) => {
			if (current.length < 2) return [];
			const next = current.filter((_, index) => index !== frameIndex);
			const index = Math.max(0, Math.min(frameIndex, next.length - 1) - (frameIndex > 0 ? 1 : 0));
			const snap = next[index];
			setFrameIndex(index);
			if (snap) {
				setPieces(snap.pieces);
				setBall(snap.ball);
				setMarks((list) => [...list.filter((mark) => !isGear(mark)), ...snap.gear]);
			}
			return next;
		});
	}
	function gearOnPitch() {
		if (!framing) return marks.filter(isGear);
		const { index, step } = frameBlend();
		return [...new Set(frames.flatMap((snap) => snap.gear.map((item) => item.id)))].flatMap((id) => {
			const from = frames[index]?.gear.find((item) => item.id === id);
			const to = (frames[index + 1] ?? frames[index])?.gear.find((item) => item.id === id) ?? from;
			if (!from || !to) return [];
			return [{
				...from,
				x: from.x + (to.x - from.x) * step,
				y: from.y + (to.y - from.y) * step
			}];
		});
	}
	function startTraining() {
		setSession("training");
		setPlaying(false);
		setDrawPlaying(false);
		setFramePlaying(false);
		setTime(0);
		setDrawTime(0);
		setFrameTime(0);
		setPieces([]);
		setMarks([]);
		setFrames([]);
		setFrameIndex(0);
		setInk(null);
		setHighlights([]);
		setShowBall(false);
		setTool("move");
	}
	function backToMatch() {
		const shape = formationById(formationId);
		setSession("match");
		setShowBall(true);
		setPlaying(false);
		setDrawPlaying(false);
		setFramePlaying(false);
		setTime(0);
		setDrawTime(0);
		setFrameTime(0);
		setMarks([]);
		setFrames([]);
		setFrameIndex(0);
		setPieces([...layoutUs(shape.slots, shape.slots.map(defaultName)), ...layoutOpp()]);
	}
	function commitLabel() {
		const text = labelText.trim().slice(0, 32);
		if (labelAt && text) setMarks((current) => [...current, {
			id: crypto.randomUUID(),
			kind: "text",
			x: labelAt.x,
			y: labelAt.y,
			text
		}]);
		setLabelAt(null);
		setLabelText("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: stageRef,
		className: cn("flex flex-col gap-3", full && "fixed inset-0 z-50 overflow-y-auto bg-bg p-3 [&>*]:shrink-0"),
		children: [
			full ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-30 flex items-center justify-between gap-3 bg-bg py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wide",
					children: drill.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: exitFull,
					className: "h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide",
					children: "Exit"
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-widest text-accent",
						children: session === "training" ? "Training session" : "Before training"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-bold uppercase leading-none tracking-tight",
						children: session === "training" ? "Blank pitch" : drill.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-base leading-snug text-fg",
						children: session === "training" ? "This is not a game. The pitch starts empty. Drag players on only if the drill needs them." : playing || time > 0 ? live.doing : drill.frames[0].doing
					}),
					session === "match" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm leading-snug text-muted",
						children: ["What I expect: ", playing || time > 0 ? live.expect : drill.frames[0].expect]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: "Tactics"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: tactics.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => chooseDrill(item),
					className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", item.id === drill.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg"),
					children: item.title
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-muted",
				children: "Training"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: startTraining,
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", session === "training" ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg"),
						children: "Start training"
					}),
					session === "training" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: backToMatch,
						className: "h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide",
						children: "Back to match"
					}) : null,
					training.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => chooseDrill(item),
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", item.id === drill.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg"),
						children: item.title
					}, item.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: FORMATIONS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => chooseFormation(item.id),
					className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", item.id === formationId ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg"),
					children: item.name
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [
					TOOLS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTool(item.id),
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", tool === item.id ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg"),
						children: [item.label, item.id === "bib" && tool === "bib" ? ` · ${bibColor}` : ""]
					}, item.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMarks([]),
						className: "h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide text-muted",
						children: "Clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setTool("cone");
							goFull();
						},
						className: "h-11 shrink-0 rounded-md bg-accent px-3 text-sm font-semibold uppercase tracking-wide text-accent-fg",
						children: "Training screen"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [[
					"full",
					"blank",
					"half"
				].map((view) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPitchView(view),
					className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", pitchView === view ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg"),
					children: view === "full" ? "Full pitch" : view === "blank" ? "Blank" : "Half pitch"
				}, view)), [
					"white",
					"gold",
					"red"
				].map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `${color} line`,
					onClick: () => setInkColor(color),
					className: cn("size-11 shrink-0 rounded-md border-2", color === "white" && "bg-fg", color === "gold" && "bg-kit-gold", color === "red" && "bg-kit-red", inkColor === color ? "border-accent" : "border-border")
				}, color))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: pitchRef,
				onPointerDown: onPitchDown,
				onPointerMove: onPitchMove,
				onPointerUp: onPitchUp,
				className: cn("relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl bg-pitch shadow-panel"),
				style: { touchAction: "none" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0",
						children: pitchView === "blank" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-3 border-2 border-pitch-line/40" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-1/2 bg-pitch-deep/35" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-3 border-2 border-pitch-line" }),
							pitchView === "half" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-3 top-[12%] h-0.5 bg-pitch-line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-[22%] bottom-3 h-[16%] border-2 border-b-0 border-pitch-line" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-3 top-1/2 h-0.5 -translate-y-1/2 bg-pitch-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pitch-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-[22%] top-3 h-[16%] border-2 border-t-0 border-pitch-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-[22%] bottom-3 h-[16%] border-2 border-b-0 border-pitch-line" })
							] })
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardInk, { marks: ink ? [...marks, ink] : marks }),
					gearOnPitch().map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": mark.kind,
						onPointerDown: (event) => beginGear(event, mark.id),
						onPointerMove: moveDrag,
						onPointerUp: endDrag,
						onPointerCancel: endDrag,
						className: "absolute z-10 -translate-x-1/2 -translate-y-1/2",
						style: {
							left: `${mark.x}%`,
							top: `${mark.y}%`
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearIcon, { mark })
					}, mark.id)),
					marks.filter((mark) => mark.kind === "text").map((mark) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pointer-events-none absolute z-20 max-w-28 -translate-x-1/2 rounded-sm bg-bg/90 px-1.5 py-0.5 text-xs font-bold uppercase text-fg",
						style: {
							left: `${mark.x}%`,
							top: `${mark.y}%`
						},
						children: mark.text
					}, mark.id)),
					labelAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: labelText,
						"aria-label": "Pitch note",
						onChange: (event) => setLabelText(event.target.value),
						onBlur: commitLabel,
						onKeyDown: (event) => {
							if (event.key === "Enter") event.currentTarget.blur();
						},
						onPointerDown: (event) => event.stopPropagation(),
						className: "absolute z-40 h-11 w-28 -translate-x-1/2 rounded-md border border-border bg-bg px-2 text-sm text-fg",
						style: {
							left: `${labelAt.x}%`,
							top: `${labelAt.y}%`
						}
					}) : null,
					pieces.map((piece) => {
						const spot = framedSpot(piece.id, shown(piece), (snap) => snap.pieces.find((item) => item.id === piece.id));
						const active = picked === piece.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute z-10",
							style: {
								left: `${spot.x}%`,
								top: `${spot.y}%`,
								transform: "translate(-50%, -50%)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onPointerDown: (event) => beginDrag(event, piece.id, piece.id, piece.team),
								onPointerMove: moveDrag,
								onPointerUp: endDrag,
								onPointerCancel: endDrag,
								className: cn("flex min-h-11 min-w-11 flex-col items-center", drag?.player === piece.id && drag.moved && "opacity-40"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex size-11 items-center justify-center rounded-full border-2 font-display text-lg font-bold leading-none", piece.team === "us" ? "border-kit-black bg-kit-red text-kit-black" : "border-kit-black bg-opp text-kit-black", active && "ring-2 ring-fg", highlights.includes(piece.id) && "ring-4 ring-fg"),
									children: shirtNo(piece.id)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 max-w-20 truncate rounded-sm bg-bg/80 px-1 text-xs font-semibold uppercase text-fg",
									children: piece.team === "us" ? pitchSurname(piece.id, PLAYERS) : "Opp"
								})]
							})
						}, piece.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Ball",
						onPointerDown: (event) => beginDrag(event, "ball", "ball", "us"),
						onPointerMove: moveDrag,
						onPointerUp: endDrag,
						onPointerCancel: endDrag,
						className: cn("absolute z-20 size-5 rounded-full border-2 border-kit-black bg-fg", !showBall && "hidden"),
						style: {
							left: `${ballShown.x}%`,
							top: `${ballShown.y}%`,
							transform: "translate(-50%, -50%)"
						}
					}),
					full ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onPointerDown: (event) => event.stopPropagation(),
						onClick: goFull,
						className: "absolute right-2 top-2 z-30 h-11 rounded-md bg-bg px-3 text-xs font-semibold uppercase tracking-wide text-fg",
						children: "Full screen"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": playing || drawPlaying || framePlaying ? "Pause" : "Play",
						onClick: () => {
							if (frames.length > 1) {
								setPlaying(false);
								setDrawPlaying(false);
								if (frameTime >= 1) setFrameTime(0);
								setFramePlaying((on) => !on);
								return;
							}
							if (hasDraw) {
								if (drawTime >= 1) setDrawTime(0);
								setPlaying(false);
								setDrawPlaying((on) => !on);
								return;
							}
							if (time >= duration) setTime(0);
							setDrawPlaying(false);
							setPlaying((on) => !on);
						},
						className: "flex size-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg",
						children: playing || drawPlaying || framePlaying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Restart",
						onClick: () => {
							setPlaying(false);
							setDrawPlaying(false);
							setFramePlaying(false);
							setTime(0);
							setDrawTime(0);
							setFrameTime(0);
							if (frames[0]) showFrame(0);
						},
						className: "flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-label": "Drill time",
						type: "range",
						min: 0,
						max: frames.length > 1 || hasDraw ? 1 : duration,
						step: .01,
						value: frames.length > 1 ? frameTime : hasDraw ? drawTime : time,
						onChange: (event) => {
							const next = Number(event.target.value);
							setPlaying(false);
							setDrawPlaying(false);
							setFramePlaying(false);
							if (frames.length > 1) setFrameTime(next);
							else if (hasDraw) setDrawTime(next);
							else setTime(next);
						},
						className: "h-11 w-full accent-accent",
						suppressHydrationWarning: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [
					frames.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => showFrame(index),
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", index === frameIndex ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg"),
						children: ["Frame ", index + 1]
					}, index)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: addFrame,
						className: "h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide",
						children: "+ Frame"
					}),
					frames.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: removeFrame,
						className: "h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide text-muted",
						children: "Remove"
					}) : null,
					[
						["Slow", .6],
						["Normal", 1],
						["Fast", 1.6]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSpeed(value),
						className: cn("h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide", speed === value ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg"),
						children: label
					}, label))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Add a frame, move the players, then press play. Lines can be straight, a run, or a dribble."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"data-bench": true,
				className: "rounded-xl border border-border bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-widest text-muted",
						children: session === "training" ? "Players are optional. Drag a name on, or leave the pitch blank." : "Squad in red. Drag a name anywhere on the pitch."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [bench.map((player) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onPointerDown: (event) => beginDrag(event, player, null, "us"),
							onPointerMove: moveDrag,
							onPointerUp: endDrag,
							onPointerCancel: endDrag,
							className: cn("h-11 rounded-md border border-kit-black bg-kit-red px-3 text-sm font-semibold text-kit-black", picked === player && "ring-2 ring-fg"),
							children: publicName(player)
						}, player)), !bench.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Everyone is on the pitch."
						}) : null]
					}),
					session === "match" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 mt-3 text-xs font-semibold uppercase tracking-widest text-muted",
						children: "Opposition in yellow"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [oppOff.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onPointerDown: (event) => beginDrag(event, id, null, "opp"),
							onPointerMove: moveDrag,
							onPointerUp: endDrag,
							onPointerCancel: endDrag,
							className: "h-11 rounded-md border border-kit-black bg-opp px-3 text-sm font-semibold text-kit-black",
							children: ["Opp ", shirtNo(id)]
						}, id)), !oppOff.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "All nine are on the pitch. Drag one off to take them out."
						}) : null]
					})] }) : null
				]
			}),
			drag?.moved && !drag.from ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed z-50 flex flex-col items-center",
				style: {
					left: drag.x,
					top: drag.y,
					transform: "translate(-50%, -50%)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-11 items-center justify-center rounded-full border-2 border-kit-black font-display text-lg font-bold text-kit-black", drag.team === "opp" ? "bg-opp" : "bg-kit-red"),
					children: shirtNo(drag.player)
				})
			}) : null
		]
	});
}
function inkStroke(color) {
	if (color === "gold") return "var(--color-kit-gold)";
	if (color === "red") return "var(--color-kit-red)";
	return "var(--color-fg)";
}
function wave(x1, y1, x2, y2) {
	const steps = 8;
	const dx = x2 - x1;
	const dy = y2 - y1;
	const len = Math.hypot(dx, dy) || 1;
	const nx = -dy / len;
	const ny = dx / len;
	let path = "";
	for (let index = 0; index <= steps; index += 1) {
		const t = index / steps;
		const wobble = Math.sin(t * Math.PI * 4) * 1.5;
		const x = x1 + dx * t + nx * wobble;
		const y = y1 + dy * t + ny * wobble;
		path += `${index === 0 ? "M" : "L"}${x} ${y} `;
	}
	return path;
}
function arrowHead(x1, y1, x2, y2) {
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const size = 2.4;
	const left = angle + 2.6;
	const right = angle - 2.6;
	return `${x2},${y2} ${x2 + Math.cos(left) * size},${y2 + Math.sin(left) * size} ${x2 + Math.cos(right) * size},${y2 + Math.sin(right) * size}`;
}
function BoardInk({ marks }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 100 100",
		preserveAspectRatio: "none",
		className: "pointer-events-none absolute inset-0 z-20 h-full w-full",
		children: marks.map((mark) => mark.kind === "pass" || mark.kind === "run" || mark.kind === "dribble" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [mark.kind === "dribble" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: wave(mark.x1, mark.y1, mark.x2, mark.y2),
			fill: "none",
			stroke: inkStroke(mark.color),
			strokeWidth: .8,
			strokeLinecap: "round"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: mark.x1,
			y1: mark.y1,
			x2: mark.x2,
			y2: mark.y2,
			stroke: inkStroke(mark.color ?? (mark.kind === "run" ? "gold" : "white")),
			strokeWidth: mark.kind === "run" ? .7 : .9,
			strokeDasharray: mark.kind === "run" ? "2.2 1.4" : void 0,
			strokeLinecap: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: arrowHead(mark.x1, mark.y1, mark.x2, mark.y2),
			fill: inkStroke(mark.color ?? (mark.kind === "run" ? "gold" : "white"))
		})] }, mark.id) : null)
	}) });
}
function GearIcon({ mark }) {
	if (mark.kind === "ball") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-5 rounded-full border-2 border-kit-black bg-fg" });
	if (mark.kind === "bib") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-8 w-6 rounded-sm border-2 border-kit-black", mark.color === "red" && "bg-kit-red", mark.color === "yellow" && "bg-opp", mark.color === "blue" && "bg-kit-navy") });
	if (mark.kind === "goal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-7 w-14 border-x-4 border-t-4 border-fg" });
	if (mark.kind === "mannequin") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 h-5 w-3 rounded-sm bg-fg" })]
	});
	if (mark.kind === "pole") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-10 w-1.5 rounded-full bg-kit-gold" });
	if (mark.kind === "hurdle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-6 w-12 border-x-4 border-t-4 border-kit-gold" });
	if (mark.kind === "ladder") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex h-4 w-16 items-center justify-between border-x-2 border-fg px-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-full w-0.5 bg-fg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-full w-0.5 bg-fg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-full w-0.5 bg-fg" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-full w-0.5 bg-fg" })
		]
	});
	if (mark.kind === "hoop") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-8 rounded-full border-4 border-kit-gold" });
	if (mark.kind === "zone") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-16 w-20 rounded-md border-2 border-fg bg-fg/20" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block size-4 rounded-full border-2 border-bg bg-kit-gold" });
}
function TacticsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-20 border-b border-border bg-bg/95 px-4 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-muted",
					children: "Cherrybrook · 9v9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-bold uppercase leading-none tracking-tight",
					children: "Tactics and training"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/coach",
					className: "inline-flex h-11 items-center rounded-md border border-border bg-surface px-3 text-xs font-semibold uppercase tracking-wide",
					children: "Coach"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 px-4 py-4 pb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/raging-bull.jpg",
				alt: "Raging Bulls",
				className: "mb-4 h-52 w-full rounded-xl object-cover object-center shadow-panel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TacticBoard, {})]
		})]
	});
}
//#endregion
export { TacticsPage as component };
