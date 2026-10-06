import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as parsePlayer, u as publicName } from "./players-CZr5uoUS.mjs";
import { i as groupGames, t as computeTotals } from "./league-Ch1nTJJB.mjs";
import { i as localDateStamp } from "./when-BGtZJU2t.mjs";
import { a as fmtPct, i as fmtDiff, l as testsToSheetCsv, o as fmtSecs, r as disciplineVerdict, t as analyseFitness } from "./fitness-C3S1VXBB.mjs";
import { r as perfKindLabel, t as PERF_KINDS } from "./perf-kinds-BtI2G2yH.mjs";
import { a as mphToKmh, i as mphFromTime, l as testGrades, o as playerDrillLines, r as fmtMark } from "./test-bonus-DvKLNi3p.mjs";
import { r as saveFitnessTest, t as getFitnessTests } from "./fitness-actions-B9pE30rV.mjs";
import { u as oppMomPlayers } from "./scoring-B3T9YYfp.mjs";
import { a as CHALLENGES_NAME } from "./brand-C_wD2nfD.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./app-header-COF4H8CL.mjs";
import { n as FieldLabel, t as FieldInput } from "./parent-presence-Cn_O1Rtq.mjs";
import { n as placeAt } from "./score-categories-Bc3Qq1vP.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, r as LineChart, s as Line } from "../_libs/recharts+[...].mjs";
import { i as playerReportHref, t as ChartFrame } from "./player-week-report-DPVGZH4i.mjs";
import { a as PlayerPicker } from "./monthly-tables-BlaPSP1H.mjs";
import { n as SAVE_LOCK } from "./coach-users-DQwpwPHR.mjs";
import { a as listPerfInbox, n as FilmTimer, o as submitCoachPerf, r as assessPerf, t as DrillSetupCards } from "./drill-setup-C6u-f0JZ.mjs";
import { t as FitnessProgressChart } from "./fitness-progress-chart-Cn2-y2Kd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/training-store-BSIXYoSB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function storedCoachPin(fallback) {
	if (fallback.trim().length >= 4) return fallback.trim();
	if (typeof window === "undefined") return "";
	return window.sessionStorage.getItem("bulls-coach-pin") || window.localStorage.getItem("bulls-coach-pin") || "";
}
function PerfInbox({ canSave = true, players = [], coachPin = "" }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [secs, setSecs] = (0, import_react.useState)({});
	const [note, setNote] = (0, import_react.useState)({});
	const [tech, setTech] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [player, setPlayer] = (0, import_react.useState)(players[0] ?? "");
	const [kind, setKind] = (0, import_react.useState)("s30_no");
	const [time, setTime] = (0, import_react.useState)("");
	const [mph, setMph] = (0, import_react.useState)("");
	const [speedScore, setSpeedScore] = (0, import_react.useState)("");
	const [uploadTech, setUploadTech] = (0, import_react.useState)("");
	const [uploadNote, setUploadNote] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [speedById, setSpeedById] = (0, import_react.useState)({});
	const [mphById, setMphById] = (0, import_react.useState)({});
	async function load() {
		try {
			const data = await listPerfInbox();
			setRows(data.rows);
			const next = {};
			const nextMph = {};
			const nextSpeed = {};
			const nextTech = {};
			for (const r of data.rows) {
				next[r.id] = r.coachSecs != null ? String(r.coachSecs) : "";
				nextMph[r.id] = r.speedMph != null ? String(r.speedMph) : "";
				nextSpeed[r.id] = r.finishMark != null ? String(r.finishMark) : "";
				nextTech[r.id] = r.technique != null ? String(r.technique) : "";
			}
			setSecs(next);
			setMphById(nextMph);
			setSpeedById(nextSpeed);
			setTech(nextTech);
		} catch {
			setRows([]);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!player && players[0]) setPlayer(players[0]);
	}, [players, player]);
	function fillMphFromTime(secsValue, set) {
		const n = Number(secsValue);
		const guess = Number.isFinite(n) && n > 0 ? mphFromTime(kind, n) : null;
		if (guess != null) set(String(guess));
	}
	async function sendCoach() {
		if (!canSave) return toast.error(SAVE_LOCK);
		if (!player) return toast.error("Pick a lad.");
		if (!time && !speedScore && !uploadTech) return toast.error("Enter time, test score /10 or technique /5.");
		setSending(true);
		try {
			const res = await submitCoachPerf({ data: {
				pin: storedCoachPin(coachPin),
				player,
				testKind: kind,
				secs: time,
				mph,
				speedScore,
				technique: uploadTech,
				note: uploadNote
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(res.message);
			setTime("");
			setMph("");
			setSpeedScore("");
			setUploadTech("");
			setUploadNote("");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save the test.");
		} finally {
			setSending(false);
		}
	}
	async function sendBack(row) {
		if (!canSave) return toast.error(SAVE_LOCK);
		setBusy(row.id);
		try {
			const res = await assessPerf({ data: {
				id: row.id,
				coachSecs: secs[row.id] || "",
				mph: mphById[row.id] || "",
				speedScore: speedById[row.id] || "",
				technique: tech[row.id] || "",
				note: note[row.id] || ""
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(`Sent back to ${parsePlayer(row.player).name}’s parent.`);
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send.");
		} finally {
			setBusy(null);
		}
	}
	const pending = rows.filter((r) => r.status === "pending");
	const done = rows.filter((r) => r.status === "assessed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4",
		children: [
			players.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "Mark a test"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pick the lad." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"Tap the drill — for 30m no ball tap ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-fg",
									children: "Linear speed · without ball"
								}),
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Time in seconds (start on GO, stop at the last cones)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "mph fills in from the time — change it if you want." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Speed 1–10, running style 0–5. +5 for doing the drill is added for you." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Save marks. Total = 5 + speed + style (max 20)." })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
						id: "coach-perf-player",
						label: "Player",
						value: player,
						onChange: setPlayer,
						players
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Drill" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: PERF_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setKind(k.id);
								setTime("");
								setMph("");
							},
							className: cn("flex min-h-11 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm", kind === k.id ? "border-accent bg-accent-soft text-fg" : "border-border bg-bg text-fg"),
							children: k.label
						}) }, k.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Time (seconds)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: time,
								placeholder: "5.3",
								onChange: (e) => {
									const v = e.target.value.replace(/[^0-9.]/g, "").slice(0, 6);
									setTime(v);
									fillMphFromTime(v, setMph);
								}
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Speed (mph)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: mph,
								placeholder: "12.7",
								onChange: (e) => setMph(e.target.value.replace(/[^0-9.]/g, "").slice(0, 6))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Speed 1–10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: speedScore,
								placeholder: "1–10",
								onChange: (e) => setSpeedScore(e.target.value.replace(/\D/g, "").slice(0, 2))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Running style 0–5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: uploadTech,
								placeholder: "0–5",
								onChange: (e) => setUploadTech(e.target.value.replace(/[^0-9.]/g, "").slice(0, 3))
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Board points = 5 (did the test) + speed 1–10 + running style 0–5. Max 20."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Note" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						value: uploadNote,
						placeholder: "Optional note",
						onChange: (e) => setUploadNote(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						disabled: sending,
						onClick: () => void sendCoach(),
						children: sending ? "Saving…" : "Save marks"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "font-display text-base font-bold uppercase tracking-wide text-accent",
				children: "Parent clips"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-7 text-muted",
				children: "Parents send film. You enter time, mph, test score /10 and technique /5."
			})] }),
			!pending.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-7 text-muted",
				children: "No clips waiting."
			}) : pending.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: parsePlayer(row.player).name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [perfKindLabel(row.testKind), row.submittedSecs ? ` · clip ${fmtSecs(row.submittedSecs)}` : ""]
					}),
					row.videoData && row.videoMime ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						controls: true,
						playsInline: true,
						className: "w-full rounded-md bg-black",
						src: `data:${row.videoMime};base64,${row.videoData}`
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No video attached."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Time (seconds)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: secs[row.id] ?? "",
								placeholder: "5.3",
								onChange: (e) => {
									const v = e.target.value.replace(/[^0-9.]/g, "").slice(0, 6);
									setSecs((s) => ({
										...s,
										[row.id]: v
									}));
									const n = Number(v);
									const guess = Number.isFinite(n) ? mphFromTime(row.testKind, n) : null;
									if (guess != null) setMphById((s) => ({
										...s,
										[row.id]: String(guess)
									}));
								}
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Speed (mph)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: mphById[row.id] ?? "",
								placeholder: "12.7",
								onChange: (e) => setMphById((s) => ({
									...s,
									[row.id]: e.target.value.replace(/[^0-9.]/g, "").slice(0, 6)
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Test score /10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: speedById[row.id] ?? "",
								placeholder: "0–10",
								onChange: (e) => setSpeedById((s) => ({
									...s,
									[row.id]: e.target.value.replace(/\D/g, "").slice(0, 2)
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Technique /5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: tech[row.id] ?? "",
								placeholder: "0–5",
								onChange: (e) => setTech((s) => ({
									...s,
									[row.id]: e.target.value.replace(/\D/g, "").slice(0, 1)
								}))
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Note to parent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						value: note[row.id] ?? "",
						placeholder: "Drove through the last cones.",
						onChange: (e) => setNote((s) => ({
							...s,
							[row.id]: e.target.value
						}))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: busy === row.id,
						onClick: () => void sendBack(row),
						children: busy === row.id ? "Saving…" : "Save marks"
					})
				]
			}, row.id)),
			done.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-sm font-bold uppercase tracking-wide",
					children: "Sent back"
				}), done.slice(0, 12).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-bg px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold",
							children: [
								parsePlayer(row.player).name,
								" · ",
								perfKindLabel(row.testKind)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								fmtSecs(row.coachSecs),
								row.speedMph != null ? ` · ${row.speedMph} mph` : "",
								row.testPoints != null ? ` · +5 · test ${row.finishMark ?? "—"}/10 · technique ${row.technique ?? "—"}/5 · ${row.testPoints}/20` : ` · technique ${row.technique ?? "—"}/5`
							]
						}),
						row.coachNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-fg",
							children: row.coachNote
						}) : null
					]
				}, row.id))]
			}) : null
		]
	});
}
var HEADS = [
	{
		id: "s30_no",
		head: "30m no"
	},
	{
		id: "s30_ball",
		head: "30m ball"
	},
	{
		id: "zz50_no",
		head: "ZZ no"
	},
	{
		id: "zz50_ball",
		head: "ZZ ball"
	},
	{
		id: "turns",
		head: "Turns"
	},
	{
		id: "shooting",
		head: "Shoot"
	}
];
function SquadTestTable({ players, tests }) {
	const [sort, setSort] = (0, import_react.useState)("s30_no");
	const [desc, setDesc] = (0, import_react.useState)(true);
	const rows = (0, import_react.useMemo)(() => {
		return players.map((player) => {
			const lines = playerDrillLines(tests, player);
			return {
				player,
				lines: Object.fromEntries(lines.map((l) => [l.kind, l])),
				total: lines.reduce((n, l) => n + (l.score ?? 0), 0)
			};
		});
	}, [players, tests]);
	const ranked = (0, import_react.useMemo)(() => {
		return [...rows].sort((a, b) => {
			if (sort === "name") {
				const d = publicName(a.player).localeCompare(publicName(b.player));
				return desc ? -d : d;
			}
			if (sort === "total") {
				const d = b.total - a.total;
				if (d !== 0) return desc ? d : -d;
			} else {
				const at = a.lines[sort]?.time;
				const bt = b.lines[sort]?.time;
				if (at != null && bt != null) {
					const d = at - bt;
					if (d !== 0) return desc ? d : -d;
				}
				const av = a.lines[sort]?.score ?? -1;
				const d = (b.lines[sort]?.score ?? -1) - av;
				if (d !== 0) return desc ? d : -d;
			}
			return publicName(a.player).localeCompare(publicName(b.player));
		});
	}, [
		rows,
		sort,
		desc
	]);
	function toggle(id) {
		if (sort === id) setDesc((d) => !d);
		else {
			setSort(id);
			setDesc(id !== "name");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold uppercase tracking-tight",
				children: "Times and scores"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "You mark +5 for the drill, 0–10 test score and technique /5. Time and mph are the record."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 w-full max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-max border-separate border-spacing-0 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "bg-bg text-[11px] font-semibold uppercase tracking-wide text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "sticky left-0 z-20 min-w-[9.5rem] border-b border-border bg-bg px-3 py-2.5 text-left shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn(sort === "name" && "text-accent"),
									onClick: () => toggle("name"),
									children: "Player"
								})
							}),
							HEADS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-24 whitespace-nowrap border-b border-border bg-bg px-2 py-2.5 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn(sort === h.id && "text-accent"),
									onClick: () => toggle(h.id),
									children: h.head
								})
							}, h.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "w-16 whitespace-nowrap border-b border-border bg-bg px-2 py-2.5 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn(sort === "total" && "text-accent"),
									onClick: () => toggle("total"),
									children: "Total"
								})
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((row, i) => {
						const p = parsePlayer(row.player);
						const top = i === 0 && row.total > 0;
						const stickyBg = top ? "bg-[color-mix(in_oklab,#b42318_18%,#141416)]" : "bg-surface";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: cn("border-t border-border", top && "bg-accent-soft"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: cn("sticky left-0 z-10 whitespace-nowrap border-t border-border px-3 py-2.5 font-semibold shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]", stickyBg),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: playerReportHref(row.player),
										className: "hover:underline",
										children: [p.num ? `#${p.num} ` : "", publicName(row.player)]
									})
								}),
								HEADS.map((h) => {
									const line = row.lines[h.id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "whitespace-nowrap border-t border-border px-2 py-2.5 text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "tabular-nums text-muted",
											children: line?.time != null ? `${line.time.toFixed(2)}s` : "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "tabular-nums font-semibold",
											children: line?.score == null ? "—" : `${fmtMark(line.score)}/20`
										})]
									}, h.id);
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "whitespace-nowrap border-t border-border px-2 py-2.5 text-right font-display text-base font-bold tabular-nums",
									children: row.total || "—"
								})
							]
						}, row.player);
					}) })]
				})
			})
		]
	});
}
function SprintLeaderboard({ players, tests }) {
	const rows = players.map((player) => {
		const line = playerDrillLines(tests, player).find((l) => l.kind === "s30_no");
		if (!line?.official || line.time == null) return null;
		const mph = line.mph ?? mphFromTime("s30_no", line.time);
		const clip = tests.filter((t) => t.player === player).flatMap((t) => t.clipMarks ?? []).find((c) => c.kind === "s30_no");
		return {
			player,
			time: line.time,
			mph,
			kmh: mph != null ? mphToKmh(mph) : null,
			complete: 5,
			speed: clip?.finish ?? null,
			tech: clip?.styleMark ?? null,
			total: line.score,
			note: clip?.note ?? ""
		};
	}).filter((r) => r != null).sort((a, b) => a.time - b.time || publicName(a.player).localeCompare(publicName(b.player)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-bold uppercase tracking-tight",
				children: "30m sprint · no ball"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Friday 11 Sep · GO to last cones · sorted by time"
			}),
			!rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No 30m times yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 -mx-4 overflow-x-auto px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[46rem] border-collapse text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border text-[10px] font-semibold uppercase tracking-wider text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-2",
								children: "#"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pr-3",
								children: "Player"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-1 text-right",
								children: "30m"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-1 text-right",
								children: "mph"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-1 text-right",
								children: "km/h"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-1 text-right",
								children: "Test"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-1 text-right",
								children: "Speed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 px-1 text-right",
								children: "Tech"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2 pl-2 text-right",
								children: "Total"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, i) => {
						const p = parsePlayer(row.player);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: cn("border-t border-border", i === 0 && "bg-accent-soft"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pr-2 tabular-nums text-muted",
									children: placeAt(i, rows.map((r) => r.time))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-2 pr-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold leading-tight",
										children: publicName(row.player)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] text-muted",
										children: [p.num ? `#${p.num}` : "", row.note ? ` · ${row.note}` : ""]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-1 py-2 text-right tabular-nums",
									children: [row.time.toFixed(2), "s"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1 py-2 text-right tabular-nums font-semibold text-accent",
									children: row.mph != null ? `${row.mph.toFixed(2)}` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1 py-2 text-right tabular-nums text-muted",
									children: row.kmh != null ? row.kmh.toFixed(2) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1 py-2 text-right tabular-nums",
									children: "5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1 py-2 text-right tabular-nums",
									children: fmtMark(row.speed)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-1 py-2 text-right tabular-nums",
									children: fmtMark(row.tech)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 pl-2 text-right font-display text-base font-bold tabular-nums text-accent",
									children: fmtMark(row.total)
								})
							]
						}, row.player);
					}) })]
				})
			})
		]
	});
}
function FitnessPanel({ players, canSave = true, coachPin = "" }) {
	const [analysed, setAnalysed] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [player, setPlayer] = (0, import_react.useState)(players[0] ?? "");
	const [testedOn, setTestedOn] = (0, import_react.useState)(() => localDateStamp());
	const [zz50No, setZz50No] = (0, import_react.useState)("");
	const [zz50Ball, setZz50Ball] = (0, import_react.useState)("");
	const [s30No, setS30No] = (0, import_react.useState)("");
	const [s30Ball, setS30Ball] = (0, import_react.useState)("");
	const [turns, setTurns] = (0, import_react.useState)("");
	const [shootPts, setShootPts] = (0, import_react.useState)("");
	const [shootPower, setShootPower] = (0, import_react.useState)("");
	const [shootClip, setShootClip] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function load() {
		try {
			const data = await getFitnessTests();
			setAnalysed(data.analysed);
			setHistory(data.tests);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load tests.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	function fillFromLatest(name) {
		setPlayer(name);
		const row = analysed.find((t) => t.player === name);
		if (!row) {
			setZz50No("");
			setZz50Ball("");
			setS30No("");
			setS30Ball("");
			setTurns("");
			setShootPts("");
			setShootPower("");
			return;
		}
		setTestedOn(row.testedOn);
		setZz50No(row.zz50NoBall === null ? "" : String(row.zz50NoBall));
		setZz50Ball(row.zz50Ball === null ? "" : String(row.zz50Ball));
		setS30No(row.sprint30NoBall === null ? "" : String(row.sprint30NoBall));
		setS30Ball(row.sprint30Ball === null ? "" : String(row.sprint30Ball));
		setTurns(row.turns3x4 === null ? "" : String(row.turns3x4));
		setShootPts(row.shootingPts === null ? "" : String(row.shootingPts));
		setShootPower(row.shootingPower === null ? "" : String(row.shootingPower));
	}
	async function onSave() {
		if (!player) {
			toast.error("Pick a player.");
			return;
		}
		if (!canSave) {
			toast.error(SAVE_LOCK);
			return;
		}
		setSaving(true);
		try {
			const res = await saveFitnessTest({ data: {
				player,
				testedOn,
				zz50NoBall: zz50No,
				zz50Ball,
				sprint30NoBall: s30No,
				sprint30Ball: s30Ball,
				turns3x4: turns,
				shootingPts: shootPts,
				shootingPower: shootPower
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success("Test saved.");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save test.");
		} finally {
			setSaving(false);
		}
	}
	const zzRank = (0, import_react.useMemo)(() => analysed.filter((t) => t.zz50Diff !== null).sort((a, b) => (b.zz50Diff ?? -99) - (a.zz50Diff ?? -99)), [analysed]);
	const s30Rank = (0, import_react.useMemo)(() => analysed.filter((t) => t.sprint30Diff !== null).sort((a, b) => (b.sprint30Diff ?? -99) - (a.sprint30Diff ?? -99)), [analysed]);
	const turnRank = (0, import_react.useMemo)(() => analysed.filter((t) => t.turns3x4 !== null).sort((a, b) => (a.turns3x4 ?? 99) - (b.turns3x4 ?? 99)), [analysed]);
	const shootRank = (0, import_react.useMemo)(() => analysed.filter((t) => t.shootingTotal !== null).sort((a, b) => (b.shootingTotal ?? -1) - (a.shootingTotal ?? -1)), [analysed]);
	const playerHistory = (0, import_react.useMemo)(() => history.filter((t) => t.player === player).map(analyseFitness), [history, player]);
	function saveToSheets() {
		const rows = history.length ? history.map(analyseFitness) : analysed;
		if (!rows.length) {
			toast.error("Save a test first.");
			return;
		}
		const csv = testsToSheetCsv(rows);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Cherrybrook-Raging-Bulls-tests-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("CSV saved. Open it in Google Sheets (File → Import, or tap Open with Sheets).");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-2xl font-bold uppercase tracking-tight",
					children: "Performance analysis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-7 text-muted",
					children: [
						"Age ",
						11,
						". Extra = without the ball minus with the ball (shows a minus when the ball slows him). Ball efficiency % = without ÷ with × 100. Higher % is better. Times stay on file. Prize points only count tests from 12 Sep 2026 — older demo runs do not count."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfInbox, {
				canSave,
				players,
				coachPin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SprintLeaderboard, {
				players,
				tests: history
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadTestTable, {
				players,
				tests: history
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "How we test"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: CHALLENGES_NAME
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillSetupCards, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-surface px-4 py-5 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "Recording setup"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Put the phone on a stand, side-on to the drill, so the start line and the finish are both in shot. Keep it still. Nobody walk in front of the lens."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Use 0.5–0.6× wide zoom so the full course fits. Film in the app, or upload a clip from the phone. One run per clip. The clip length is the time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "MP4 or MOV · H.264 · 1080p or 720p · 30 fps · no slow-mo · no HDR · under 3 minutes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-sm font-bold uppercase tracking-wide",
						children: "Phone camera"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Rear camera. Ultra-wide 0.5×. Video 1080p at 30 fps. Turn off HDR, cinematic, night mode and slow-mo. Lock AE/AF if the phone has it so the picture does not hunt. Grid on to line up start and finish."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-sm font-bold uppercase tracking-wide",
						children: "Where it is stored"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Video stays on the phone (Photos or Files). Times and the analysis are saved in this app when you tap Save test. Print the professional PDF from Dribble deficit report."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "Record a player"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "fit-player",
						children: "Player"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
						id: "fit-player",
						label: "Player",
						value: player,
						players,
						onChange: fillFromLatest
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "fit-date",
						children: "Test date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "fit-date",
						type: "date",
						value: testedOn,
						onChange: (e) => setTestedOn(e.target.value)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-base font-bold uppercase tracking-wide",
					children: "50m Zig Zag test with and without the ball"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-7 text-muted",
					children: "50m Zig Zag test with and without the ball · GO to the finish"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Without ball" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: zz50No,
								onChange: (e) => setZz50No(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
								kind: "zigzag",
								label: "50m Zig Zag, no ball",
								value: zz50No,
								onChange: setZz50No
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "With ball" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: zz50Ball,
								onChange: (e) => setZz50Ball(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
								kind: "zigzag",
								label: "50m Zig Zag, with ball",
								value: zz50Ball,
								onChange: setZz50Ball
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-display text-base font-bold uppercase tracking-wide",
					children: "Linear speed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-7 text-muted",
					children: "30m · pass from 20m allowed · stop when the ball crosses 30m"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Without ball" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: s30No,
								onChange: (e) => setS30No(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
								kind: "sprint",
								label: "30m, no ball",
								value: s30No,
								onChange: setS30No
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "With ball" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "decimal",
								value: s30Ball,
								onChange: (e) => setS30Ball(e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
								kind: "sprint",
								label: "30m, with ball",
								value: s30Ball,
								onChange: setS30Ball
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide",
						children: "Turning with the ball"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-7 text-muted",
						children: "3m square · three turns · foot on the ball at the start line"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "fit-turns",
						children: "Time (seconds)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "fit-turns",
						inputMode: "decimal",
						value: turns,
						onChange: (e) => setTurns(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
						kind: "turns",
						label: "turns",
						value: turns,
						onChange: setTurns
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide",
						children: "Path2Pro shooting"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-7 text-muted",
						children: "Film all 6 shots. Score 3 / 2 / 1 / 0 per shot. +1 power each time the ball reaches the 10m line behind the goal."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
						kind: "shooting",
						label: "Path2Pro shooting · 6 shots",
						value: shootClip,
						onChange: setShootClip
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "fit-shoot-pts",
							children: "Shot points (0–18)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							id: "fit-shoot-pts",
							inputMode: "numeric",
							value: shootPts,
							onChange: (e) => setShootPts(e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
							htmlFor: "fit-shoot-power",
							children: "Power 10m (+1 each, 0–6)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							id: "fit-shoot-power",
							inputMode: "numeric",
							value: shootPower,
							onChange: (e) => setShootPower(e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: [
							"Total ",
							(Number(shootPts) || 0) + (Number(shootPower) || 0),
							" pts"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					canSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => void onSave(),
						disabled: saving,
						children: saving ? "Saving…" : "Save test"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: SAVE_LOCK
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full",
						onClick: () => {
							globalThis.window.location.href = "/report/tests";
						},
						children: "Run squad report"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full",
						disabled: !player,
						onClick: () => {
							if (!player) return;
							globalThis.window.location.href = `/report/test-player?name=${encodeURIComponent(player)}`;
						},
						children: "Run this player's report"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full",
						onClick: saveToSheets,
						children: "Save all tests to Google Sheets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/performance-analysis-protocol.pdf",
						download: "Cherrybrook-Raging-Bulls-Performance-Analysis-Protocol.pdf",
						className: "inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-semibold text-fg",
						children: "Protocol PDF"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: ["Progression · ", player ? parsePlayer(player).name : "pick a player"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Line graph of without-ball, with-ball and ball efficiency through the season."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitnessProgressChart, { rows: playerHistory })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "Rankings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBlock, {
						title: "50m Zig Zag test with and without the ball",
						rows: zzRank,
						kind: "zz50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBlock, {
						title: "Linear speed · 30m",
						rows: s30Rank,
						kind: "s30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBlock, {
						title: "Turning with the ball",
						rows: turnRank,
						kind: "turns"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RankBlock, {
						title: "Path2Pro shooting",
						rows: shootRank,
						kind: "shooting"
					})
				]
			})
		]
	});
}
function RankBlock({ title, rows, kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-3 font-display text-sm font-bold uppercase tracking-wide",
		children: title
	}), !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No times yet."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-xl border border-border bg-surface",
		children: rows.map((row, i) => {
			const noBall = kind === "zz50" ? row.zz50NoBall : kind === "s30" ? row.sprint30NoBall : null;
			const withBall = kind === "zz50" ? row.zz50Ball : kind === "s30" ? row.sprint30Ball : null;
			const extra = kind === "zz50" ? row.zz50Diff : kind === "s30" ? row.sprint30Diff : null;
			const eff = kind === "zz50" ? row.zz50Eff : kind === "s30" ? row.sprint30Eff : null;
			const grades = testGrades(row);
			const grade = kind === "zz50" ? grades.zz : kind === "s30" ? grades.sprint : kind === "turns" ? grades.turns : grades.shooting;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("border-t border-border px-3 py-3 first:border-t-0", i === 0 && "bg-accent-soft"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "min-w-0 truncate font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 tabular-nums text-muted",
								children: i + 1
							}), parsePlayer(row.player).name]
						}), kind === "turns" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "tabular-nums text-sm",
							children: fmtSecs(row.turns3x4)
						}) : kind === "shooting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "tabular-nums text-sm font-bold text-accent",
							children: [row.shootingTotal ?? "—", " pts"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "shrink-0 text-sm font-bold tabular-nums text-accent",
							children: fmtDiff(extra)
						})]
					}),
					kind === "shooting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs leading-6 text-muted",
						children: [
							"Shots ",
							row.shootingPts ?? "—",
							" · Power ",
							row.shootingPower ?? "—",
							" · grade ",
							grade ?? "—",
							"/5"
						]
					}) : kind !== "turns" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs leading-6 text-muted",
						children: [
							"Without ",
							fmtSecs(noBall),
							" − With ",
							fmtSecs(withBall),
							" = ",
							fmtDiff(extra),
							" · Eff ",
							fmtPct(eff),
							" · grade ",
							grade ?? "—",
							"/5"
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-xs font-semibold uppercase tracking-wide text-accent",
						onClick: () => {
							globalThis.window.location.href = `/report/test-player?name=${encodeURIComponent(row.player)}`;
						},
						children: "Player report"
					})
				]
			}, row.player);
		})
	})] });
}
function FitnessSnapshot({ test }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 border-t border-border pt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted",
				children: ["Latest performance · ", test.testedOn]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-2 grid grid-cols-1 gap-1 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "50m Zig Zag"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums",
							children: [
								fmtSecs(test.zz50NoBall),
								" − ",
								fmtSecs(test.zz50Ball),
								" = ",
								fmtDiff(test.zz50Diff),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-subtle",
									children: fmtPct(test.zz50Eff)
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Linear speed 30m"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums",
							children: [
								fmtSecs(test.sprint30NoBall),
								" − ",
								fmtSecs(test.sprint30Ball),
								" = ",
								fmtDiff(test.sprint30Diff),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-subtle",
									children: fmtPct(test.sprint30Eff)
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Turning with the ball"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "tabular-nums",
							children: fmtSecs(test.turns3x4)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Shooting"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
							className: "tabular-nums",
							children: [
								test.shootingTotal ?? "—",
								" pts",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-xs text-subtle",
									children: [
										"(",
										test.shootingPts ?? 0,
										" + ",
										test.shootingPower ?? 0,
										" power)"
									]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs leading-snug text-muted",
				children: ["Zigzag: ", disciplineVerdict(test.zz50NoBall, test.zz50Diff, "zz50", test.zz50Eff)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs leading-snug text-muted",
				children: ["30m: ", disciplineVerdict(test.sprint30NoBall, test.sprint30Diff, "s30", test.sprint30Eff)]
			})
		]
	});
}
function PlayerProgressCard({ season, note, showAwards = false, fitness, onRefresh }) {
	const p = parsePlayer(season.name);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const chartData = (0, import_react.useMemo)(() => season.rounds.map((r, i) => ({
		label: String(i + 1),
		pts: r.cumulative,
		round: r.pts,
		game: r.opposition || r.gameNumber
	})), [season.rounds]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-elevated text-sm font-bold",
						children: p.initials
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-xl font-bold uppercase tracking-tight",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [p.num ? `#${p.num}` : null, season.rank ? ` · ${ordinal(season.rank)} in the 3-2-1` : null]
						})]
					})]
				}), onRefresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "shrink-0",
					disabled: busy,
					"aria-label": `Refresh ${p.name}`,
					onClick: () => {
						setBusy(true);
						Promise.resolve(onRefresh()).finally(() => setBusy(false));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", busy && "animate-spin") }), busy ? "Refreshing" : "Refresh"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: season.pts,
						label: "Pts",
						accent: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: season.games,
						label: "GP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						value: season.games ? season.ppg.toFixed(1) : "—",
						label: "Avg"
					})
				]
			}),
			showAwards ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-2 gap-2 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					value: season.oppMom,
					label: "Opp MOM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					value: season.playersPlayer,
					label: "Players’"
				})]
			}) : null,
			season.form.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs text-muted",
				children: [
					"Last ",
					season.form.length,
					":",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-fg",
						children: [season.form.map((n) => n).join(" · "), " pts"]
					})
				]
			}) : null,
			chartData.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartFrame, {
					height: 160,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: chartData,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									stroke: "var(--color-subtle)",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									width: 28,
									stroke: "var(--color-subtle)",
									tick: {
										fill: "var(--color-muted)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									cursor: { stroke: "var(--color-border)" },
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressTooltip, {})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "pts",
									stroke: "var(--color-accent)",
									strokeWidth: 2,
									dot: {
										r: 3,
										fill: "var(--color-accent)"
									},
									name: "Cumulative",
									isAnimationActive: false
								})
							]
						})
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "No games on the board yet."
			}),
			season.rounds.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-1.5",
				children: season.rounds.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 truncate text-muted",
						children: [r.gameNumber, r.opposition ? ` vs ${r.opposition}` : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 tabular-nums font-semibold",
						children: [r.pts, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 text-xs font-medium text-subtle",
							children: "pts"
						})]
					})]
				}, r.key))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-xs tabular-nums text-muted",
				children: [
					season.n3,
					"×3 · ",
					season.n2,
					"×2 · ",
					season.n1,
					"×1"
				]
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-border pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Coach note"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-fg",
					children: note
				})]
			}) : null,
			fitness ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitnessSnapshot, { test: fitness }) : null
		]
	});
}
function ProgressTooltip({ active, payload }) {
	if (!active || !payload?.[0]) return null;
	const d = payload[0].payload;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-elevated px-3 py-2 text-xs shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-semibold text-fg",
			children: d.game
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 tabular-nums text-muted",
			children: [
				d.round,
				" this game · ",
				d.pts,
				" total"
			]
		})]
	});
}
function Stat({ value, label, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("font-display text-xl font-bold leading-none tabular-nums", accent ? "text-accent" : "text-fg"),
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-xs font-semibold uppercase tracking-wider text-subtle",
		children: label
	})] });
}
function ordinal(n) {
	const v = n % 100;
	const s = [
		"th",
		"st",
		"nd",
		"rd"
	];
	return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}
function computePlayerSeason(player, players, history, awards = [], appearances = {}) {
	const games = groupGames(history).slice().sort((a, b) => a.lastTs.localeCompare(b.lastTs));
	const rounds = [];
	let cumulative = 0;
	const running = [];
	for (const g of games) {
		running.push(...g.votes);
		const got = computeTotals(players, g.votes, appearances).find((t) => t.name === player);
		cumulative += got?.pts ?? 0;
		const rank = computeTotals(players, running, appearances).findIndex((t) => t.name === player) + 1;
		const award = awards.find((a) => a.gameNumber.toLowerCase() === g.gameNumber.toLowerCase() && a.opposition.toLowerCase() === g.opposition.toLowerCase());
		rounds.push({
			key: g.key,
			gameNumber: g.gameNumber,
			opposition: g.opposition,
			pts: got?.pts ?? 0,
			n3: got?.n3 ?? 0,
			n2: got?.n2 ?? 0,
			n1: got?.n1 ?? 0,
			cumulative,
			rank: rank || players.length,
			oppMom: oppMomPlayers(award?.oppMom).includes(player),
			playersPlayer: award?.playersPlayer === player
		});
	}
	const totalsRow = computeTotals(players, history, appearances);
	const totals = totalsRow.find((t) => t.name === player);
	const oppMom = awards.filter((a) => oppMomPlayers(a.oppMom).includes(player)).length;
	const playersPlayer = awards.filter((a) => a.playersPlayer === player).length;
	return {
		name: player,
		rank: totalsRow.findIndex((t) => t.name === player) + 1,
		pts: totals?.pts ?? 0,
		games: totals?.games ?? 0,
		ppg: totals?.ppg ?? 0,
		n3: totals?.n3 ?? 0,
		n2: totals?.n2 ?? 0,
		n1: totals?.n1 ?? 0,
		rounds,
		form: rounds.slice(-5).map((r) => r.pts),
		oppMom,
		playersPlayer
	};
}
var KEY = "bulls-training-sessions-v1";
function valid(row) {
	if (!row || typeof row !== "object") return false;
	const s = row;
	return typeof s.sessionDate === "string" && Array.isArray(s.marks);
}
function readLocalTraining() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(valid);
	} catch {
		return [];
	}
}
function writeLocalTraining(sessions) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(KEY, JSON.stringify(sessions));
	} catch {}
}
function mergeTraining(server, local = readLocalTraining()) {
	const map = /* @__PURE__ */ new Map();
	const here = (s) => s.marks.filter((m) => m.attended).length;
	for (const s of [...local, ...server]) {
		if (!s?.sessionDate) continue;
		const prev = map.get(s.sessionDate);
		if (!prev || here(s) >= here(prev)) map.set(s.sessionDate, s);
	}
	const out = [...map.values()].sort((a, b) => b.sessionDate.localeCompare(a.sessionDate));
	if (out.some((s) => here(s) > 0)) writeLocalTraining(out);
	return out;
}
//#endregion
export { mergeTraining as a, computePlayerSeason as i, PlayerProgressCard as n, writeLocalTraining as o, SquadTestTable as r, FitnessPanel as t };
