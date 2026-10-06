import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, n as require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { l as string, o as number, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { a as CHALLENGES_NAME } from "./brand-C_wD2nfD.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./app-header-COF4H8CL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drill-setup-C6u-f0JZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var MAX_CLIP_CHARS = 32e5;
var submitPerfClip = createServerFn({ method: "POST" }).validator(object({
	player: string().trim().min(1).max(80),
	testKind: string().trim().min(1).max(20),
	secs: string().trim().max(12),
	pin: string().trim().min(4).max(80),
	videoMime: string().trim().max(80).optional(),
	videoData: string().max(MAX_CLIP_CHARS).optional()
})).handler(createSsrRpc("ad82ab7b2cba2f19afac765687e790259561a06d6c68fc013d35b10847ee61bc"));
var submitCoachPerf = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(4).max(40),
	player: string().trim().min(1).max(80),
	testKind: string().trim().min(1).max(20),
	secs: string().trim().max(12).optional(),
	mph: string().trim().max(8).optional(),
	speedScore: string().trim().max(4).optional(),
	technique: string().trim().max(4).optional(),
	note: string().trim().max(400).optional(),
	videoMime: string().trim().max(80).optional(),
	videoData: string().max(MAX_CLIP_CHARS).optional()
})).handler(createSsrRpc("03a33c10fa0a944c9af60832b446c3df3e71a18d1b4d79073d7c6a3d1f2968b5"));
createServerFn({ method: "POST" }).validator(object({
	id: number(),
	pin: string().trim().min(4).max(80)
})).handler(createSsrRpc("79e321ffc4d1cf01345c8d4c512d8e418559231e40df16b8a0e6d69742dea5e2"));
createServerFn({ method: "POST" }).validator(object({
	id: number(),
	pin: string().trim().min(4).max(80)
})).handler(createSsrRpc("38abcdaa98ca897ef46b5b7abafd6cfff00ad75a1f783602478fed3ccb9f4a9f"));
createServerFn({ method: "POST" }).handler(createSsrRpc("cc1c2b895defc5eea7c618795cfba3826a9a1b13e573d1f5c0a6a985df2e3932"));
createServerFn({ method: "POST" }).handler(createSsrRpc("1bd11a6ba494e5a2e03fcef8e2bc9008846c948191d61e96a1da4fff35146259"));
var listParentPerf = createServerFn({ method: "POST" }).validator(object({ pin: string().trim().min(4).max(80) })).handler(createSsrRpc("09c945e6ab180cef49e746f64c48524d86f1bae92c3ef403e9973a79d417d339"));
var listPerfInbox = createServerFn({ method: "POST" }).handler(createSsrRpc("354981b15578da426efa7ab3772bdeafa2df47aa22ecc1cad6c494592ef49e4d"));
var assessPerf = createServerFn({ method: "POST" }).validator(object({
	id: number().int().positive(),
	coachSecs: string().trim().max(12),
	mph: string().trim().max(8).optional(),
	speedScore: string().trim().max(4).optional(),
	technique: string().trim().max(4).optional(),
	note: string().trim().max(400).optional()
})).handler(createSsrRpc("b2af2800dced0e6db20c7eb1ce0f6341127f0b21dfb68c2cdb0e113654f576d4"));
createServerFn({ method: "POST" }).validator(object({ pin: string().trim().min(4).max(40) })).handler(createSsrRpc("342b9fd2ea4833f79d71c86b985a0cb5b9540c0ac49773ada0675fbafb989e73"));
async function openWideCam() {
	const first = await navigator.mediaDevices.getUserMedia({
		video: {
			facingMode: { ideal: "environment" },
			width: { ideal: 1920 },
			height: { ideal: 1080 }
		},
		audio: false
	});
	let stream = first;
	try {
		const wide = (await navigator.mediaDevices.enumerateDevices()).find((d) => d.kind === "videoinput" && /ultra|wide|0\.5|0,5/i.test(d.label) && !/front|user|selfie/i.test(d.label));
		if (wide?.deviceId) {
			const next = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: { exact: wide.deviceId },
					width: { ideal: 1920 },
					height: { ideal: 1080 }
				},
				audio: false
			});
			first.getTracks().forEach((t) => t.stop());
			stream = next;
		}
	} catch {}
	const track = stream.getVideoTracks()[0];
	const caps = track.getCapabilities?.();
	if (caps?.zoom) {
		const min = caps.zoom.min;
		const zoom = min <= .5 ? .5 : min <= .6 ? .6 : min;
		try {
			await track.applyConstraints({ advanced: [{ zoom }] });
		} catch {
			try {
				await track.applyConstraints({ zoom });
			} catch {}
		}
	}
	return stream;
}
function pickMime() {
	if (typeof MediaRecorder === "undefined") return "";
	for (const t of [
		"video/webm;codecs=vp8",
		"video/webm",
		"video/mp4"
	]) if (MediaRecorder.isTypeSupported(t)) return t;
	return "";
}
var CUE = {
	zigzag: {
		start: "Clock starts on GO. Through the 2m start gate.",
		stop: "Clock stops when they go through the last cones. Same for with and without the ball."
	},
	sprint: {
		start: "Clock starts on GO. Through the two start cones.",
		stop: "Without ball: stop when the PLAYER passes the 30m cones. With ball: they may pass from 20m — stop when the BALL goes through the 30m cones."
	},
	turns: {
		start: "Clock starts on GO. Ball on the start line of the 3m square.",
		stop: "There, turn, back, turn, out, last turn, sprint back. Clock stops when the foot is on the ball on the start line. Speed and technique both count."
	},
	shooting: {
		start: "GO. Film all six shots. Left: push left with left, far right corner. Right: push right with right, far left corner. Technique is marked as well as the result.",
		stop: "Stop after the sixth shot. Into the box = 0. Far corner 3, near 2, just wide 1. +1 power if the ball reaches the 10m line. Technique: plant, head, follow through."
	}
};
function FilmTimer({ label, value, onChange, onRecorded, kind }) {
	const videoRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const uploadRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const chunks = (0, import_react.useRef)([]);
	const started = (0, import_react.useRef)(0);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [ms, setMs] = (0, import_react.useState)(0);
	const [clip, setClip] = (0, import_react.useState)("");
	const cue = CUE[kind];
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const t = setInterval(() => setMs(Date.now() - started.current), 50);
		return () => clearInterval(t);
	}, [recording]);
	(0, import_react.useEffect)(() => {
		return () => stopCam();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const attach = () => {
			const el = videoRef.current;
			const stream = streamRef.current;
			if (!el || !stream) return;
			el.srcObject = stream;
			el.play().catch(() => void 0);
		};
		attach();
		const t = requestAnimationFrame(attach);
		return () => {
			cancelAnimationFrame(t);
			document.body.style.overflow = prev;
		};
	}, [open]);
	function stopCam() {
		recRef.current?.stop();
		recRef.current = null;
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		setRecording(false);
	}
	async function openCam() {
		try {
			const stream = await openWideCam();
			streamRef.current = stream;
			setMs(0);
			setOpen(true);
		} catch {
			toast.error("Allow the camera, or film from the phone camera.");
		}
	}
	function startRec() {
		const stream = streamRef.current;
		if (!stream) {
			fileRef.current?.click();
			return;
		}
		const mime = pickMime();
		chunks.current = [];
		const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
		rec.ondataavailable = (e) => {
			if (e.data.size) chunks.current.push(e.data);
		};
		rec.onstop = () => {
			const blob = new Blob(chunks.current, { type: rec.mimeType || "video/webm" });
			if (clip) URL.revokeObjectURL(clip);
			setClip(URL.createObjectURL(blob));
			toast.message("Clip in. AI times GO to the last cones — not how long the camera was on.");
			onRecorded?.(blob, "");
		};
		rec.start();
		recRef.current = rec;
		started.current = Date.now();
		setMs(0);
		setRecording(true);
	}
	function stopRec() {
		recRef.current?.stop();
		recRef.current = null;
		setRecording(false);
	}
	function close() {
		stopCam();
		setOpen(false);
	}
	function fromFile(file) {
		const url = URL.createObjectURL(file);
		if (clip) URL.revokeObjectURL(clip);
		setClip(url);
		onRecorded?.(file, value);
		toast.success("Clip in. Type the time from GO to the last cones — not how long the video is.");
	}
	const secs = (ms / 1e3).toFixed(1);
	const overlay = open && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[200] bg-black text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				playsInline: true,
				muted: true,
				autoPlay: true,
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-center text-xs font-semibold uppercase tracking-wider",
						children: [label, " · 0.5–0.6× wide"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center font-display text-6xl font-bold tabular-nums leading-none",
						children: recording ? secs : value || "0.0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-center text-sm",
						children: [
							cue.start,
							". ",
							cue.stop
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-center text-xs font-semibold uppercase tracking-wide text-amber-300",
						children: "Phone on a stand. Keep it still. Nobody walk in shot."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-8",
				children: [recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-16 rounded-full bg-accent text-lg font-bold uppercase tracking-wide text-accent-fg",
					onClick: stopRec,
					children: kind === "turns" ? "Finish · foot on the ball" : "Finish · last cones"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-16 rounded-full bg-accent text-lg font-bold uppercase tracking-wide text-accent-fg",
					onClick: startRec,
					children: "GO / whistle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-12 rounded-full border border-white/40 text-sm font-semibold uppercase tracking-wide",
					onClick: close,
					children: "Done"
				})]
			})
		]
	}), document.body) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: fileRef,
				type: "file",
				accept: "video/*",
				capture: "environment",
				className: "sr-only",
				onChange: (e) => {
					const file = e.target.files?.[0];
					e.target.value = "";
					if (file) fromFile(file);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: uploadRef,
				type: "file",
				accept: "video/*",
				className: "sr-only",
				onChange: (e) => {
					const file = e.target.files?.[0];
					e.target.value = "";
					if (file) fromFile(file);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "w-full",
					onClick: () => void openCam(),
					children: "Film"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "w-full",
					onClick: () => uploadRef.current?.click(),
					children: "Upload"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-5 text-muted",
				children: "Official time is GO to the last cones. Upload the clip — the AI times it and marks technique. Type a time only if you want a check."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-1 flex items-center gap-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-muted",
						children: "Time"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value,
						placeholder: "0.0",
						className: "h-11 w-full rounded-md border border-border bg-bg px-3 font-display text-lg font-bold tabular-nums",
						onChange: (e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-muted",
						children: "s"
					})
				]
			}),
			overlay,
			clip && !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				src: clip,
				controls: true,
				playsInline: true,
				className: "mt-2 w-full rounded-md bg-black"
			}) : null
		]
	});
}
function Cone({ x, y, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
		points: `${x},${y - 9} ${x - 6},${y + 5} ${x + 6},${y + 5}`,
		fill: "#e11d2e",
		stroke: "#fff",
		strokeWidth: "1"
	}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x,
		y: y + 16,
		textAnchor: "middle",
		fill: "#f4f4f5",
		fontSize: "8",
		fontWeight: "700",
		children: label
	}) : null] });
}
function ZigzagDiagram() {
	const m = 8;
	const lx = 56;
	const rx = 136;
	const yb = 318;
	const Y = (metres) => yb - metres * m;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 260 360",
		className: "h-auto w-full max-w-md",
		"aria-label": "50m Zig Zag test with and without the ball",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "6",
				width: "244",
				height: "348",
				rx: "14",
				fill: "#15703a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "130",
				y: "24",
				textAnchor: "middle",
				fill: "#bbf7d0",
				fontSize: "10",
				fontWeight: "700",
				children: "50m Zig Zag test"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "130",
				y: "38",
				textAnchor: "middle",
				fill: "#86efac",
				fontSize: "8",
				children: "with and without the ball"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: lx,
				y1: Y(0),
				x2: lx,
				y2: Y(25),
				stroke: "#bbf7d0",
				strokeWidth: "1.5",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: rx,
				y1: Y(0),
				x2: rx,
				y2: Y(22),
				stroke: "#bbf7d0",
				strokeWidth: "1.5",
				strokeDasharray: "4 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: rx,
				y: Y(0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: rx,
				y: Y(2)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 146,
				y1: Y(0),
				x2: 146,
				y2: Y(2),
				stroke: "#facc15",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 152,
				y: Y(1) + 3,
				fill: "#facc15",
				fontSize: "9",
				fontWeight: "700",
				children: "2m START"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: rx,
				y: Y(12)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 150,
				y: Y(12) + 4,
				fill: "#f4f4f5",
				fontSize: "9",
				fontWeight: "700",
				children: "X"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 150,
				y: Y(7),
				fill: "#bbf7d0",
				fontSize: "8",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: rx,
				y: Y(22)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 150,
				y: Y(17),
				fill: "#bbf7d0",
				fontSize: "8",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: lx,
				y: Y(0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "130",
				y: Y(0) + 18,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: lx,
				y: Y(5)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 28,
				y: Y(2.5) + 3,
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "5m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: lx,
				y: Y(15)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 28,
				y: Y(10),
				fill: "#bbf7d0",
				fontSize: "8",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: lx,
				y: Y(25)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 28,
				y: Y(20),
				fill: "#bbf7d0",
				fontSize: "8",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: lx,
				y: Y(25) - 14,
				textAnchor: "middle",
				fill: "#f4f4f5",
				fontSize: "9",
				fontWeight: "700",
				children: "FINISH"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: lx,
				y1: Y(22),
				x2: rx,
				y2: Y(22),
				stroke: "#facc15",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "130",
				y: Y(22) - 6,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: lx,
				y1: Y(12),
				x2: rx,
				y2: Y(12),
				stroke: "#86efac",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "130",
				y: Y(12) - 6,
				textAnchor: "middle",
				fill: "#86efac",
				fontSize: "8",
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${rx} ${Y(1)} L ${lx} ${Y(5)} L ${rx} ${Y(12)} L ${lx} ${Y(15)} L ${rx} ${Y(22)} L ${lx} ${Y(25)}`,
				fill: "none",
				stroke: "#facc15",
				strokeWidth: "2.5",
				strokeDasharray: "6 4"
			})
		]
	});
}
function SprintDiagram() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 280 160",
		className: "h-auto w-full",
		"aria-label": "30m sprint cone layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "8",
				width: "264",
				height: "144",
				rx: "12",
				fill: "#166534"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "140",
				y: "24",
				textAnchor: "middle",
				fill: "#bbf7d0",
				fontSize: "9",
				fontWeight: "700",
				children: "Path2Pro UK · Speed / running with the ball"
			}),
			[
				0,
				1,
				2,
				3
			].map((i) => {
				const x = 36 + i * 70;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
						x,
						y: 48
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
						x,
						y: 118
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: x,
						y1: 48,
						x2: x,
						y2: 118,
						stroke: "#f4f4f5",
						strokeWidth: "1.5",
						strokeDasharray: "3 3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x,
						y: 140,
						textAnchor: "middle",
						fill: "#f4f4f5",
						fontSize: "8",
						fontWeight: "700",
						children: i === 0 ? "START" : i === 3 ? "30m FINISH" : `${i * 10}m`
					})
				] }, i);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "36",
				y1: "83",
				x2: "246",
				y2: "83",
				stroke: "#facc15",
				strokeWidth: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "176",
				y: "78",
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "PASS from 20m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "246",
				y: "38",
				textAnchor: "middle",
				fill: "#f4f4f5",
				fontSize: "8",
				fontWeight: "700",
				children: "30m"
			})
		]
	});
}
function TurnsDiagram() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 200 200",
		className: "h-auto w-full max-w-[220px]",
		"aria-label": "3m turn box layout",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "8",
				width: "184",
				height: "184",
				rx: "12",
				fill: "#166534"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "100",
				y: "26",
				textAnchor: "middle",
				fill: "#bbf7d0",
				fontSize: "9",
				fontWeight: "700",
				children: "3m × 3m · Path2Pro UK turning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "50",
				y: "50",
				width: "100",
				height: "100",
				fill: "none",
				stroke: "#f4f4f5",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: 50,
				y: 150
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: 150,
				y: 150
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: 50,
				y: 50
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: 150,
				y: 50
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "50",
				y1: "150",
				x2: "150",
				y2: "150",
				stroke: "#facc15",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "100",
				y: "172",
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "START / FINISH line"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M100 145 L100 60 L88 72 M100 60 L112 72",
				fill: "none",
				stroke: "#facc15",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "118",
				y: "110",
				fill: "#f4f4f5",
				fontSize: "8",
				children: "there"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "58",
				y: "110",
				fill: "#f4f4f5",
				fontSize: "8",
				children: "back"
			})
		]
	});
}
function ShootingDiagram() {
	const m = 7;
	const cx = 180;
	const top = 48;
	const Y = (metres) => top + metres * m;
	const X = (fromCentre) => cx + fromCentre * m;
	const goalHalf = 7.32 / 2;
	const postL = X(-3.66);
	const postR = X(goalHalf);
	const outL = X(-6.66);
	const outR = X(6.66);
	const boxHalf = 40.32 / 2;
	const sixHalf = 18.32 / 2;
	const boxY = Y(26.5);
	const goalY = Y(10);
	const powerY = Y(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 360 430",
		className: "h-auto w-full",
		"aria-label": "Full-size open-goal shooting set-up to scale",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "6",
				width: "344",
				height: "418",
				rx: "14",
				fill: "#15703a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "24",
				textAnchor: "middle",
				fill: "#bbf7d0",
				fontSize: "10",
				fontWeight: "700",
				children: "Full-size goal · to scale"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "38",
				textAnchor: "middle",
				fill: "#86efac",
				fontSize: "8",
				children: "Power line 10m behind the posts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: X(-14),
				y1: powerY,
				x2: X(14),
				y2: powerY,
				stroke: "#facc15",
				strokeWidth: "3"
			}),
			[
				-12,
				-6,
				0,
				6,
				12
			].map((dx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: X(dx),
				y: powerY
			}, dx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: powerY - 10,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "10m POWER LINE · +1 if the ball reaches here"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "42",
				y1: powerY,
				x2: "42",
				y2: goalY,
				stroke: "#facc15",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "34",
				y: (powerY + goalY) / 2,
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				transform: `rotate(-90 34 ${(powerY + goalY) / 2})`,
				children: "10m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: postL,
				y: powerY + 8,
				width: postR - postL,
				height: goalY - powerY - 8,
				fill: "none",
				stroke: "#e5e7eb",
				strokeWidth: "1",
				strokeDasharray: "3 3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: Y(5),
				textAnchor: "middle",
				fill: "#e5e7eb",
				fontSize: "8",
				children: "behind the goal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: X(-22),
				y1: goalY,
				x2: X(22),
				y2: goalY,
				stroke: "#f4f4f5",
				strokeWidth: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: postL,
				y: goalY - 18,
				width: postR - postL,
				height: "18",
				fill: "none",
				stroke: "#f4f4f5",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: postL,
				y1: goalY - 18,
				x2: postR,
				y2: goalY - 18,
				stroke: "#f4f4f5",
				strokeWidth: "4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: goalY - 22,
				textAnchor: "middle",
				fill: "#f4f4f5",
				fontSize: "8",
				fontWeight: "700",
				children: "7.32m OPEN GOAL"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: postL + 2,
				y: goalY - 16,
				width: 14,
				height: "14",
				fill: "#b42318"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: postL + 9,
				y: goalY - 6,
				textAnchor: "middle",
				fill: "#fff",
				fontSize: "8",
				fontWeight: "700",
				children: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: postR - 16,
				y: goalY - 16,
				width: 14,
				height: "14",
				fill: "#b42318"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: postR - 9,
				y: goalY - 6,
				textAnchor: "middle",
				fill: "#fff",
				fontSize: "8",
				fontWeight: "700",
				children: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: postL + 18,
				y: goalY - 16,
				width: postR - postL - 36,
				height: "14",
				fill: "#14532d",
				stroke: "#86efac",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: goalY - 6,
				textAnchor: "middle",
				fill: "#bbf7d0",
				fontSize: "8",
				fontWeight: "700",
				children: "2 near"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: postL,
				y: goalY
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: postR,
				y: goalY
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: outL,
				y: goalY
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cone, {
				x: outR,
				y: goalY
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: outL,
				y: goalY + 18,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "7",
				fontWeight: "700",
				children: "1pt · 3m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: outR,
				y: goalY + 18,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "7",
				fontWeight: "700",
				children: "1pt · 3m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: X(-20.16),
				y: goalY,
				width: boxHalf * 2 * m,
				height: 16.5 * m,
				fill: "none",
				stroke: "#e5e7eb",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: X(-9.16),
				y: goalY,
				width: sixHalf * 2 * m,
				height: 5.5 * m,
				fill: "none",
				stroke: "#e5e7eb",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: Y(20),
				textAnchor: "middle",
				fill: "#e5e7eb",
				fontSize: "8",
				children: "Penalty box 16.5m — do not enter"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "318",
				y1: goalY,
				x2: "318",
				y2: boxY,
				stroke: "#86efac",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "328",
				y: (goalY + boxY) / 2,
				fill: "#86efac",
				fontSize: "8",
				fontWeight: "700",
				transform: `rotate(90 328 ${(goalY + boxY) / 2})`,
				children: "16.5m"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: X(-16),
				cy: boxY + 32,
				r: "7",
				fill: "#f4f4f5",
				stroke: "#e11d2e",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: X(-16),
				y: boxY + 54,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "LEFT · left foot ×3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${X(-16) - 6} ${boxY + 32} L ${X(-22)} ${boxY + 10}`,
				fill: "none",
				stroke: "#86efac",
				strokeWidth: "2.2",
				markerEnd: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: X(-28),
				y: boxY + 24,
				fill: "#86efac",
				fontSize: "7",
				fontWeight: "700",
				children: "push left"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${X(-22)} ${boxY + 10} L ${postR - 6} ${goalY - 6}`,
				fill: "none",
				stroke: "#facc15",
				strokeWidth: "2",
				strokeDasharray: "6 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: postR - 4,
				y: goalY - 24,
				fill: "#facc15",
				fontSize: "7",
				fontWeight: "700",
				children: "far right"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: X(16),
				cy: boxY + 32,
				r: "7",
				fill: "#f4f4f5",
				stroke: "#e11d2e",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: X(16),
				y: boxY + 54,
				textAnchor: "middle",
				fill: "#facc15",
				fontSize: "8",
				fontWeight: "700",
				children: "RIGHT · right foot ×3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${X(16) + 6} ${boxY + 32} L ${X(22)} ${boxY + 10}`,
				fill: "none",
				stroke: "#86efac",
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: X(26),
				y: boxY + 24,
				fill: "#86efac",
				fontSize: "7",
				fontWeight: "700",
				children: "push right"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M ${X(22)} ${boxY + 10} L ${postL + 6} ${goalY - 6}`,
				fill: "none",
				stroke: "#facc15",
				strokeWidth: "2",
				strokeDasharray: "6 4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: postL + 4,
				y: goalY - 24,
				fill: "#facc15",
				fontSize: "7",
				fontWeight: "700",
				children: "far left"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "408",
				textAnchor: "middle",
				fill: "#f4f4f5",
				fontSize: "8",
				fontWeight: "700",
				children: "Push out with that foot · shoot across · never enter the box"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "180",
				y: "422",
				textAnchor: "middle",
				fill: "#bbf7d0",
				fontSize: "7",
				children: "Left→far right corner · Right→far left corner · 3 far · 2 near · 1 just wide · +1 power"
			})
		]
	});
}
function CullenTrial() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-accent bg-accent-soft p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-bold uppercase tracking-wide",
				children: "Cullen’s trial"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-7 text-fg",
				children: [
					"Cullen Atkinson-Lee on the ",
					CHALLENGES_NAME,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto mt-3 w-full max-w-[280px] overflow-hidden rounded-lg bg-black",
				style: { aspectRatio: "9 / 16" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					className: "absolute inset-0 h-full w-full",
					src: "https://www.youtube-nocookie.com/embed/9_xEC-DHeFU",
					title: `${CHALLENGES_NAME} trial`,
					allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
					allowFullScreen: true,
					referrerPolicy: "strict-origin-when-cross-origin"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "font-semibold text-accent underline",
					href: "https://youtube.com/shorts/9_xEC-DHeFU",
					target: "_blank",
					rel: "noreferrer",
					children: "Open on YouTube"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/drills/cullen-zigzag.jpg",
						alt: "Cullen Atkinson-Lee sprinting the zigzag",
						className: "w-full rounded-lg object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-1 text-xs font-semibold uppercase tracking-wider text-muted",
						children: "50m Zig Zag test"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/drills/cullen-turning.jpg",
						alt: "Cullen Atkinson-Lee turning with the ball",
						className: "w-full rounded-lg object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-1 text-xs font-semibold uppercase tracking-wider text-muted",
						children: "Cullen turning"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/drills/cullen-shooting.jpg",
						alt: "Cullen Atkinson-Lee shooting",
						className: "w-full rounded-lg object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-1 text-xs font-semibold uppercase tracking-wider text-muted",
						children: "Cullen shooting"
					})] })
				]
			})
		]
	});
}
function DrillSetupCards({ showClip = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-bold uppercase tracking-tight text-accent",
				children: CHALLENGES_NAME
			}),
			showClip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CullenTrial, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold uppercase tracking-wide",
						children: "1. 50m Zig Zag test with and without the ball"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-wider text-muted",
						children: "Path2Pro UK · 2m start gate · zig to the line, not around the cone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/drills/cullen-zigzag.jpg",
						alt: "50m Zig Zag test with and without the ball",
						className: "mt-3 w-full rounded-lg object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZigzagDiagram, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Start (bottom right):"
							}), " two cones, 2m apart. That is the start gate."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"From the start, walk ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "10m left"
								}),
								" and drop a cone."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Up the left line: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "5m"
								}),
								", cone. Then ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "10m"
								}),
								", cone. Then ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "10m"
								}),
								" — that last cone is ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "FINISH"
								}),
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Up the right line from the start gate: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "10m"
								}),
								" to cone ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "X"
								}),
								". Then another ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "10m"
								}),
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Width is ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "10m"
								}),
								". Zig to the opposite cone — to the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "line"
								}),
								", not around it — until the finish."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-7 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Run:"
						}), " zigzag to the first cone on the opposite side. Do not go around the cone — the body must reach the line by the cone. Keep going until the last gate."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Clock (with ball):"
						}), " starts when he first pushes the ball. Stops when the foot is on the ball in the end gate."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Clock (without ball):"
						}), " same course, same lines. Starts on the first push out. Stops through the end gate."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Tip: push out with knees bent. Do not slow down at the end."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold uppercase tracking-wide",
						children: "2. Linear speed · 30m"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-wider text-muted",
						children: "Path2Pro UK · Speed and running with the ball"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SprintDiagram, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Four cones in a line, 10m apart: 0m, 10m, 20m, 30m." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Second line of four cones, 15m wide, so the lane is 15m across." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-7 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Without ball:"
						}), " clock starts when he pushes out. Stops when he reaches 30m."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "With ball:"
						}), " clock starts when he first pushes the ball. At 20m he must pass through the end cones at 30m. Clock stops when the ball crosses the 30m line."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold uppercase tracking-wide",
						children: "3. Turns · 3m box"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-wider text-muted",
						children: "Path2Pro UK · Turning · foot on the ball to finish"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/drills/cullen-turning.jpg",
						alt: "Cullen Atkinson-Lee turning with the ball",
						className: "mt-3 w-full rounded-lg object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnsDiagram, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Mark a 3m square (four cones)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Start on the line, ball at feet." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "There (3m) — turn. Back (3m) — turn. There (3m) — last turn. Sprint back." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Stop with the foot on the ball on the start line." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-muted",
						children: "Head over the ball. Knees bent. Don’t slow down into the turn."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold uppercase tracking-wide",
						children: "4. Shooting · Path2Pro UK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-wider text-muted",
						children: "Full-size open goal · push out, then shoot across to the far corner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/drills/cullen-shooting.jpg",
						alt: "Shooting challenge",
						className: "mt-3 w-full rounded-lg object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShootingDiagram, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Full-size open goal. Two cones on the goal line, in line with each post — those are the bottom-corner boxes." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Two more cones 3m outside each post — the “just wide” zone. A line of cones 10m behind the goal — power line." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Start outside the penalty box. Push the ball out to the side with that foot, then shoot. You must not enter the box — if you do, that shot is ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "0 points"
								}),
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Six shots:",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: " 3 from the left — push left with the left foot, shoot left foot into the far right corner"
								}),
								". Then",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: " 3 from the right — push right with the right foot, shoot right foot into the far left corner"
								}),
								"."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 overflow-hidden rounded-lg border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted",
							children: "Points per shot"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "divide-y divide-border text-sm leading-7 text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bottom far corner (left foot → right corner, right foot → left corner)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "3"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Goal, but near side" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "2"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Just outside the post (inside the 3m cone)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "1"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Power: ball reaches the 10m line behind the goal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "+1 each"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Miss, or shot from inside the box" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "0"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-7 text-muted",
						children: "More scoring detail to come. Heading will be added next."
					})
				]
			})
		]
	});
}
//#endregion
export { listPerfInbox as a, listParentPerf as i, FilmTimer as n, submitCoachPerf as o, assessPerf as r, submitPerfClip as s, DrillSetupCards as t };
