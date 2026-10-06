import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as shortName } from "./players-CZr5uoUS.mjs";
import { n as PRIZE_LINE } from "./score-from-j42ACoaw.mjs";
import { i as isViewAllPlayer } from "./parent-login-a0219ktd.mjs";
import { o as fmtSecs } from "./fitness-C3S1VXBB.mjs";
import { n as perfKindFilm, r as perfKindLabel, t as PERF_KINDS } from "./perf-kinds-BtI2G2yH.mjs";
import { a as CHALLENGES_NAME } from "./brand-C_wD2nfD.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button, t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { n as FieldLabel } from "./parent-presence-Cn_O1Rtq.mjs";
import { a as homeWeekLabel, i as HOME_TEST_WEEK, n as HOME_TEST_PARAMS, o as isDrillDoneThisWeek, r as HOME_TEST_STEPS, s as remainingHomeDrills, t as HOME_TEST_FILM } from "./home-tests-DA9-SOa_.mjs";
import { i as listParentPerf, n as FilmTimer, s as submitPerfClip, t as DrillSetupCards } from "./drill-setup-C6u-f0JZ.mjs";
import { n as useParentPresence, t as ParentGate } from "./use-parent-presence-DBSdqa6N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perf-CTZPe9Sr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var U12_ACADEMY = {
	age: 11,
	label: "Age 11 · Under 12",
	note: "Scores are age-related for 11-year-olds, in line with how pro academies look at speed and ball efficiency at U12. They are a guide, not a pass or fail.",
	s30: [
		{
			band: "Academy pace",
			time: "under 5.2s"
		},
		{
			band: "Strong",
			time: "5.2–5.8s"
		},
		{
			band: "Developing",
			time: "over 5.8s"
		}
	],
	zz50: [
		{
			band: "Academy COD",
			time: "under 16s"
		},
		{
			band: "Strong",
			time: "16–20s"
		},
		{
			band: "Developing",
			time: "over 20s"
		}
	],
	turns: [
		{
			band: "Sharp with the ball",
			time: "under 7s"
		},
		{
			band: "Strong",
			time: "7–9s"
		},
		{
			band: "Developing",
			time: "over 9s"
		}
	],
	efficiency: [
		{
			band: "Academy",
			time: "95%+"
		},
		{
			band: "Strong",
			time: "88–94%"
		},
		{
			band: "Developing",
			time: "80–87%"
		},
		{
			band: "Needs work",
			time: "under 80%"
		}
	]
};
function ParentDrillGuide() {
	const week = homeWeekLabel();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "Home tests · parameters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-bold uppercase tracking-tight text-fg",
						children: "Points make prizes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold leading-7 text-fg",
						children: PRIZE_LINE
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-lg border border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
							className: "w-full text-left text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: HOME_TEST_PARAMS.map(([label, value], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: i % 2 ? "bg-elevated" : "bg-bg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-20 px-3 py-2 align-top text-xs font-semibold uppercase tracking-wide text-accent",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-fg",
									children: value
								})]
							}, label)) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs tabular-nums text-muted",
						children: [
							"This week ",
							HOME_TEST_WEEK,
							" · started ",
							week.start,
							" · next unlock ",
							week.unlock
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "How to do it at home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-1 text-sm leading-7 text-fg",
						children: HOME_TEST_STEPS.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							i + 1,
							". ",
							line
						] }, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-1 text-sm leading-7 text-muted",
						children: HOME_TEST_FILM.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: U12_ACADEMY.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-bold uppercase tracking-wide text-accent",
						children: "Set up the tests"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-muted",
						children: [CHALLENGES_NAME, ". Tick any drill or all six. The same drill only once this week."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DrillSetupCards, { showClip: true }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted",
						children: "U12 academy bands (without ball)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-muted",
						children: ["50m Zig Zag: ", U12_ACADEMY.zz50.map((b) => `${b.band} ${b.time}`).join(" · ")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-muted",
						children: ["30m: ", U12_ACADEMY.s30.map((b) => `${b.band} ${b.time}`).join(" · ")]
					})
				]
			})
		]
	});
}
async function blobToBase64(blob) {
	const buf = await blob.arrayBuffer();
	const bytes = new Uint8Array(buf);
	let binary = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(binary);
}
function ParentPerfForm({ session }) {
	const [kind, setKind] = (0, import_react.useState)(PERF_KINDS[0].id);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const [secs, setSecs] = (0, import_react.useState)("");
	const [blob, setBlob] = (0, import_react.useState)(null);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [usedThisWeek, setUsedThisWeek] = (0, import_react.useState)([]);
	const [sending, setSending] = (0, import_react.useState)(false);
	useParentPresence(session.player, "perf");
	const alreadyThisWeek = isDrillDoneThisWeek(usedThisWeek, kind);
	const viewAll = isViewAllPlayer(session.player);
	const leftover = (0, import_react.useMemo)(() => remainingHomeDrills(usedThisWeek), [usedThisWeek]);
	const week = homeWeekLabel();
	function focusDrill(id) {
		setKind(id);
		setSecs("");
		setBlob(null);
	}
	function toggleDrill(id) {
		if (isDrillDoneThisWeek(usedThisWeek, id)) {
			toast.error(`That drill is already in this week. Back ${week.unlock}.`);
			return;
		}
		setPicked((prev) => {
			const on = prev.includes(id);
			const next = on ? prev.filter((x) => x !== id) : [...prev, id];
			if (!on) focusDrill(id);
			else if (kind === id) {
				const rest = next.filter((x) => leftover.includes(x));
				if (rest[0]) focusDrill(rest[0]);
			}
			return next;
		});
	}
	function pickAllRemaining() {
		setPicked(leftover);
		if (leftover[0]) focusDrill(leftover[0]);
		else toast.message(`All six are in this week. Back ${week.unlock}.`);
	}
	async function loadRows() {
		try {
			const next = await listParentPerf({ data: { pin: session.token } });
			setRows(next.rows);
			setUsedThisWeek(next.usedThisWeek ?? []);
		} catch {
			setRows([]);
			setUsedThisWeek([]);
		}
	}
	(0, import_react.useEffect)(() => {
		loadRows();
	}, [session.token]);
	async function send() {
		if (alreadyThisWeek) {
			toast.error("This drill is already in for this week. Try another, or wait until Monday.");
			return;
		}
		if (!secs && !blob) return toast.error("Film or upload the run.");
		setSending(true);
		try {
			let videoData;
			let videoMime;
			if (blob) {
				if (blob.size * 1.4 > 32e5) toast.message("Clip is large — sending without the video. Keep it on your phone.");
				else {
					videoData = await blobToBase64(blob);
					videoMime = blob.type || "video/webm";
				}
			}
			const res = await submitPerfClip({ data: {
				player: session.player,
				pin: session.token,
				testKind: kind,
				secs,
				videoMime,
				videoData
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(res.message);
			setSecs("");
			setBlob(null);
			const sent = kind;
			setPicked((prev) => prev.filter((x) => x !== sent));
			await loadRows();
			const nextOpen = remainingHomeDrills([...usedThisWeek, sent]).find((x) => picked.includes(x) && x !== sent);
			if (nextOpen) focusDrill(nextOpen);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not send.");
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [viewAll ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "This week’s drills" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm leading-7 text-muted",
				children: [
					"Tick any, or all remaining. Same drill once this week. Unlocks ",
					week.unlock,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: pickAllRemaining,
					children: [
						"All remaining (",
						leftover.length,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					className: "flex-1",
					onClick: () => setPicked([]),
					children: "Clear"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: PERF_KINDS.map((k) => {
					const done = isDrillDoneThisWeek(usedThisWeek, k.id);
					const on = picked.includes(k.id) || kind === k.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: done,
						onClick: () => toggleDrill(k.id),
						className: cn("flex min-h-11 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm", done ? "cursor-not-allowed border-border bg-elevated text-muted" : on ? "border-accent bg-accent-soft text-fg" : "border-border bg-bg text-fg"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 pr-2",
							children: k.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs font-semibold uppercase tracking-wide text-muted",
							children: done ? `Done · ${week.unlock}` : on ? "Selected" : "Tap"
						})]
					}) }, k.id);
				})
			}),
			alreadyThisWeek ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-md border border-accent bg-accent-soft px-3 py-2 text-sm font-semibold text-fg",
				children: [
					"This drill is already in for this week. Pick another, or send it again from ",
					week.unlock,
					"."
				]
			}) : leftover.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-md border border-border bg-bg px-3 py-2 text-sm text-muted",
				children: [
					"All six drills are in this week. Back ",
					week.unlock,
					"."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Filming: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-fg",
					children: perfKindLabel(kind)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilmTimer, {
				kind: perfKindFilm(kind),
				label: perfKindLabel(kind),
				value: secs,
				onChange: setSecs,
				onRecorded: (file) => {
					setBlob(file);
					setSecs("");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-7 text-muted",
				children: "Send the clip. The coach marks +5 for the drill, test score /10 and technique /5."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				disabled: sending || alreadyThisWeek,
				onClick: () => void send(),
				children: sending ? "Sending…" : alreadyThisWeek ? "Already sent this week" : "Send to coach"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-base font-bold uppercase tracking-wide text-accent",
			children: "Results from the coach"
		}), !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-7 text-muted",
			children: "Nothing sent yet."
		}) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [isViewAllPlayer(session.player) ? `${shortName(row.player)} · ` : "", perfKindLabel(row.testKind)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: row.createdAt.slice(0, 10)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: ["Your clip: ", fmtSecs(row.submittedSecs)]
				}),
				row.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-accent",
					children: "Waiting for the coach."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 text-sm leading-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Time: "
						}), fmtSecs(row.coachSecs)] }),
						row.testPoints != null || row.startMark != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 grid grid-cols-2 gap-x-3 gap-y-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Complete: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["+", row.startMark ?? 5]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Speed (GO → cones): ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [row.finishMark ?? "—", "/10"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Running style: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [row.technique ?? "—", "/5"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: [row.testPoints ?? "—", "/20"]
								})] })
							]
						}) : row.technique != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "Technique: "
							}),
							row.technique,
							"/5"
						] }) : null,
						row.coachNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 rounded-md border border-border bg-bg px-3 py-2",
							children: row.coachNote
						}) : null
					]
				})
			]
		}, row.id))]
	})] });
}
function ParentPerf() {
	const [session, setSession] = (0, import_react.useState)(null);
	useParentPresence(session?.player || "", "perf");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { boardLink: "board" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold uppercase tracking-tight",
						children: "Performance analysis"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-7 text-muted",
						children: "Tick any drill or all six. Same drill once a week (Monday–Sunday). Film at home, send it in. The coach marks +5 for the drill, test score /10 and technique /5."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentDrillGuide, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentGate, {
					onSession: setSession,
					children: (s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [s.viewAll || isViewAllPlayer(s.player) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-accent bg-accent-soft px-4 py-3 text-sm font-semibold",
						children: "Manager view — every lad’s clips. Families only see their own."
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentPerfForm, { session: s })] })
				})
			]
		})]
	});
}
var SplitComponent = ParentPerf;
//#endregion
export { SplitComponent as component };
