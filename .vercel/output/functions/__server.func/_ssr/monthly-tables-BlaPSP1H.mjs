import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, n as require_react_dom } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { a as parsePlayer, d as shortName, o as pitchSurname, t as PLAYERS, u as publicName } from "./players-CZr5uoUS.mjs";
import { n as fixtureVoteRows, t as computeTotals } from "./league-Ch1nTJJB.mjs";
import { l as string, n as _enum, o as number, r as array, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { C as shortClub, O as weekendSnapshotTables, T as southTable, _ as fixturePlayed, b as isBullsHome, d as bullsOpponent, g as fixtureKickoff, i as LEAGUE_NAME, m as fixtureHasScore, n as BULLS_TEAM, s as SEASON_NAME, u as U12_DIVISIONS, v as fixtureRound, y as formatGoalLine } from "./wdyl-CJ_QwBRn.mjs";
import { t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { n as formatKickoff } from "./when-BGtZJU2t.mjs";
import { o as playerDrillLines } from "./test-bonus-DvKLNi3p.mjs";
import { l as oppMomLabel, s as joinOppMom, u as oppMomPlayers } from "./scoring-B3T9YYfp.mjs";
import { o as monthWindow } from "./potm-BIYA_DOQ.mjs";
import { d as TEAM_NAME } from "./brand-C_wD2nfD.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { _ as ChevronDown, u as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./app-header-COF4H8CL.mjs";
import { n as FieldLabel, t as FieldInput } from "./parent-presence-Cn_O1Rtq.mjs";
import { n as faLeagueHomeUrl, t as faDivisionTableUrl } from "./fa-fulltime-C_avczt_.mjs";
import { t as KitGraphic } from "./kit-graphic-DfF3Ly7S.mjs";
import { a as scoreFull, i as getScoreExtras, o as scoreFullMonth, t as averageMonthlyFull } from "./score-actions-DgqUGgog.mjs";
import { i as topNWithTies, n as placeAt } from "./score-categories-Bc3Qq1vP.mjs";
import { a as playerWeeks, i as playerReportHref, n as PlayerWeekChart } from "./player-week-report-DPVGZH4i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monthly-tables-BlaPSP1H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var getLeagueData = createServerFn({ method: "POST" }).handler(createSsrRpc("adcc72a5007caca85969249dec50ae13d05bd8f7b9627dcb1da7fe3b4ca64904"));
var recordLeagueResult = createServerFn({ method: "POST" }).validator(object({
	id: number().int().positive(),
	homeGoals: number().int().min(0).max(99).nullable(),
	awayGoals: number().int().min(0).max(99).nullable()
})).handler(createSsrRpc("33fde8af0734bb7690828be1130bb03bf6e15b02599012871d4c34cb33a26be4"));
var saveDivisionStanding = createServerFn({ method: "POST" }).validator(object({
	division: _enum([
		"north",
		"south",
		"west",
		"east"
	]),
	team: string().trim().min(1).max(120),
	played: number().int().min(0).max(40),
	won: number().int().min(0).max(40),
	drawn: number().int().min(0).max(40),
	lost: number().int().min(0).max(40),
	gd: number().int().min(-200).max(200),
	pts: number().int().min(0).max(120)
})).handler(createSsrRpc("5b803ffc5de4d2734b06e88f10b5669348dae3417a5f48fe7ccc28b23fd28c7a"));
var addDivisionTeam = createServerFn({ method: "POST" }).validator(object({
	division: _enum([
		"north",
		"south",
		"west",
		"east"
	]),
	team: string().trim().min(2).max(120)
})).handler(createSsrRpc("47fa8d0d5a6b7f5a387b91048ff090dcd6a9b0fb8b6761111904f63f25d9147f"));
var saveMatchGoals = createServerFn({ method: "POST" }).validator(object({
	fixtureId: number().int().positive(),
	goals: array(object({
		minute: number().int().min(0).max(90),
		scorer: string().trim().min(1).max(80),
		assist: string().trim().max(80).nullable()
	})).max(20)
})).handler(createSsrRpc("b6de995d66f5557a9e6ecdda5b6ef57b0799befef65f669ca7ab0134d9e9cb47"));
var saveFixtureAwards = createServerFn({ method: "POST" }).validator(object({
	fixtureId: number().int().positive(),
	oppMom: string().trim().max(160),
	managerPlayer: string().trim().max(80),
	playersPlayer: string().trim().max(80)
})).handler(createSsrRpc("52ed33b9b98e66396f02128e4d957fc32dad60cf3d5f7788b585f9080161c6c7"));
var syncLeagueFromFa = createServerFn({ method: "POST" }).handler(createSsrRpc("ea192e479e51fe740b3ed93bed63c7c9c59a48b21e867b51e75bb00a7887ed69"));
function PlayerPicker({ id, label, value, onChange, players, exclude, placeholder = "Select player…", emptyHint = "No players to pick.", className, compact = false, kit, hideTrigger = false, open, onOpenChange }) {
	const squad = players.length ? players : [...PLAYERS];
	const skip = new Set((exclude || []).filter(Boolean));
	const list = squad.filter((p) => !skip.has(p));
	const [innerOpen, setInnerOpen] = (0, import_react.useState)(false);
	const openedAt = (0, import_react.useRef)(0);
	const isOpen = open ?? innerOpen;
	function setIsOpen(next) {
		if (next) openedAt.current = Date.now();
		if (open === void 0) setInnerOpen(next);
		onOpenChange?.(next);
	}
	function closeSheet() {
		if (Date.now() - openedAt.current < 500) return;
		setIsOpen(false);
	}
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [isOpen]);
	const shown = value ? compact ? parsePlayer(value).num ? `#${parsePlayer(value).num}` : parsePlayer(value).initials : shortName(value) : placeholder;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [hideTrigger ? null : kit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		id,
		type: "button",
		onClick: () => setIsOpen(true),
		className: cn("flex w-14 flex-col items-center gap-0.5 bg-transparent p-0", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitGraphic, {
			kit,
			number: value ? parsePlayer(value).num : void 0
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "max-w-[4.6rem] text-center font-display text-[10px] font-bold uppercase leading-tight tracking-wide text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]",
			children: value ? pitchSurname(value, squad) : placeholder
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		id,
		type: "button",
		onClick: () => setIsOpen(true),
		className: cn("flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg text-left outline-none transition-colors duration-150 focus:border-border-strong focus:ring-2 focus:ring-accent/50", compact ? "h-10 min-w-14 max-w-20 px-1.5 text-xs font-semibold" : "h-11 px-3 text-sm", value ? "text-fg" : "text-subtle", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "min-w-0 truncate",
			children: shown
		}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted" })]
	}), isOpen && typeof document !== "undefined" && document.body ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col justify-end bg-bg/80",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "min-h-16 flex-1",
			"aria-label": "Close",
			onClick: closeSheet
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[80dvh] overflow-y-auto rounded-t-xl border border-border bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] shadow-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 flex items-center justify-between border-b border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-bold uppercase tracking-tight",
					children: label || placeholder
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-semibold uppercase tracking-wide text-muted",
					onClick: closeSheet,
					children: "Close"
				})]
			}), !list.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-4 py-8 text-center text-sm text-muted",
				children: emptyHint
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex h-12 w-full items-center px-4 text-left text-sm text-muted",
				onClick: () => {
					onChange("");
					setIsOpen(false);
				},
				children: placeholder
			}) }), list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: cn("flex h-12 w-full items-center border-t border-border px-4 text-left text-sm", value === p ? "bg-accent-soft font-semibold text-fg" : "text-fg"),
				onClick: () => {
					onChange(p);
					setIsOpen(false);
				},
				children: shortName(p)
			}) }, p))] })]
		})]
	}), document.body) : null] });
}
function awardForFixture(awards, fixtures, fx) {
	const round = fixtureRound(fixtures, fx);
	const opp = shortClub(bullsOpponent(fx)).toLowerCase();
	const hits = awards.filter((a) => {
		const o = a.opposition.toLowerCase();
		return o === opp || o.includes(opp) || opp.includes(o);
	});
	if (!hits.length) return void 0;
	return hits.filter((a) => a.gameNumber.toLowerCase().includes(String(round)))[0] ?? hits[0];
}
function MatchSheet({ fx, fixtures, goals, awards, votes, players, editable, onUpdated }) {
	const scored = fixtureHasScore(fx);
	const kickedOff = fixtureKickoff(fx.kickoff).getTime() <= Date.now();
	const round = fixtureRound(fixtures, fx);
	const opponent = shortClub(bullsOpponent(fx));
	const parentVotes = fixtureVoteRows(votes, opponent, round);
	const parentTop = computeTotals(players, parentVotes).find((t) => t.pts > 0);
	const award = awardForFixture(awards, fixtures, fx);
	const sortedGoals = goals.slice().sort((a, b) => a.minute - b.minute || a.id - b.id);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [minute, setMinute] = (0, import_react.useState)("");
	const [scorer, setScorer] = (0, import_react.useState)("");
	const [assist, setAssist] = (0, import_react.useState)("");
	const savedMoms = oppMomPlayers(award?.oppMom);
	const [oppMom, setOppMom] = (0, import_react.useState)(savedMoms[0] ?? "");
	const [oppMomJoint, setOppMomJoint] = (0, import_react.useState)(savedMoms[1] ?? "");
	const [managerPlayer, setManagerPlayer] = (0, import_react.useState)(award?.managerPlayer ?? "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	if (!scored && !kickedOff) return null;
	async function addGoal() {
		const min = Number(minute);
		if (!Number.isFinite(min) || min < 0 || min > 90) {
			toast.error("Enter the minute, 0–90.");
			return;
		}
		if (!scorer) {
			toast.error("Pick the scorer.");
			return;
		}
		setSaving(true);
		try {
			const next = [...sortedGoals.map((g) => ({
				minute: g.minute,
				scorer: g.scorer,
				assist: g.assist
			})), {
				minute: min,
				scorer,
				assist: assist || null
			}];
			const res = await saveMatchGoals({ data: {
				fixtureId: fx.id,
				goals: next
			} });
			onUpdated?.(res);
			setMinute("");
			setScorer("");
			setAssist("");
			toast.success("Goal added.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save the goal.");
		} finally {
			setSaving(false);
		}
	}
	async function removeGoal(id) {
		setSaving(true);
		try {
			const next = sortedGoals.filter((g) => g.id !== id).map((g) => ({
				minute: g.minute,
				scorer: g.scorer,
				assist: g.assist
			}));
			const res = await saveMatchGoals({ data: {
				fixtureId: fx.id,
				goals: next
			} });
			onUpdated?.(res);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not remove the goal.");
		} finally {
			setSaving(false);
		}
	}
	async function saveAwards() {
		setSaving(true);
		try {
			const res = await saveFixtureAwards({ data: {
				fixtureId: fx.id,
				oppMom: joinOppMom([oppMom, oppMomJoint]),
				managerPlayer,
				playersPlayer: parentTop?.name ?? ""
			} });
			if ("success" in res && res.success === false) {
				toast.error(res.error);
				return;
			}
			onUpdated?.(res);
			toast.success("Awards saved.");
			setOpen(false);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save awards.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 border-t border-border pt-3",
		children: [
			sortedGoals.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted",
				children: "Scorers · assists · time"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1.5 flex flex-col gap-1",
				children: sortedGoals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatGoalLine(g, publicName), g.assist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: " assist"
					}) : null] }), editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs font-semibold uppercase tracking-wide text-accent",
						onClick: () => void removeGoal(g.id),
						disabled: saving,
						children: "Remove"
					}) : null]
				}, g.id))
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: editable ? "Add each Bulls goal with the minute and assist." : "Scorers will show here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-3 grid gap-1.5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Parents’ player"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold text-right",
							children: parentTop ? publicName(parentTop.name) : "Waiting on 3-2-1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Manager’s player"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold text-right",
							children: award?.managerPlayer ? publicName(award.managerPlayer) : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: "Opp MOM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold text-right",
							children: award?.oppMom ? oppMomLabel(award.oppMom) : "—"
						})]
					})
				]
			}),
			editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-semibold uppercase tracking-wide text-accent",
					onClick: () => setOpen((v) => !v),
					children: open ? "Close sheet" : "Add goals & awards"
				}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-3 rounded-lg border border-border bg-elevated p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[5.5rem_1fr] gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Min" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: minute,
								onChange: (e) => setMinute(e.target.value),
								placeholder: "12"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Scorer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
								label: "Scorer",
								value: scorer,
								players,
								onChange: setScorer
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Assist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
							label: "Assist",
							value: assist,
							players,
							exclude: [scorer],
							placeholder: "No assist",
							onChange: setAssist
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => void addGoal(),
							disabled: saving,
							children: saving ? "Saving…" : "Add goal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Manager’s player" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
							label: "Manager’s player",
							value: managerPlayer,
							players,
							onChange: setManagerPlayer
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Opp MOM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
							label: "Opp MOM",
							value: oppMom,
							players,
							onChange: setOppMom
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Joint opp MOM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
							label: "Joint opp MOM",
							value: oppMomJoint,
							players,
							exclude: oppMom ? [oppMom] : [],
							placeholder: "No share",
							onChange: setOppMomJoint
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void saveAwards(),
							disabled: saving,
							children: "Save awards"
						})
					]
				}) : null]
			}) : null
		]
	});
}
function kickoffParts(iso) {
	return {
		day: formatKickoff(iso, "EEE d MMM") || "TBC",
		time: formatKickoff(iso, "HH:mm")
	};
}
function formatLastSync(value) {
	if (!value) return null;
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return null;
	return d.toLocaleString("en-GB", {
		weekday: "short",
		day: "numeric",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function LeaguePanel({ editable = false }) {
	const [fixtures, setFixtures] = (0, import_react.useState)([]);
	const [tables, setTables] = (0, import_react.useState)(weekendSnapshotTables);
	const [division, setDivision] = (0, import_react.useState)("south");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [homeGoals, setHomeGoals] = (0, import_react.useState)("");
	const [awayGoals, setAwayGoals] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const [lastSync, setLastSync] = (0, import_react.useState)(null);
	const [syncNote, setSyncNote] = (0, import_react.useState)(null);
	const [goalsByFixture, setGoalsByFixture] = (0, import_react.useState)({});
	const [awards, setAwards] = (0, import_react.useState)([]);
	const [votes, setVotes] = (0, import_react.useState)([]);
	const [players, setPlayers] = (0, import_react.useState)([]);
	const [divisionResults, setDivisionResults] = (0, import_react.useState)({
		north: [],
		south: [],
		west: [],
		east: []
	});
	function applyLeague(data) {
		if (data.fixtures) setFixtures(data.fixtures);
		if (data.tables) setTables(data.tables);
		if (data.lastSync !== void 0) setLastSync(data.lastSync);
		if (data.syncNote !== void 0) setSyncNote(data.syncNote);
		if (data.goalsByFixture) setGoalsByFixture(data.goalsByFixture);
		if (data.awards) setAwards(data.awards);
		if (data.votes) setVotes(data.votes);
		if (data.players) setPlayers(data.players);
		if (data.divisionResults) setDivisionResults(data.divisionResults);
	}
	async function load() {
		setLoading(true);
		try {
			applyLeague(await getLeagueData());
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load the league.");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const upcoming = (0, import_react.useMemo)(() => fixtures.filter((f) => !fixturePlayed(f)), [fixtures]);
	const results = (0, import_react.useMemo)(() => fixtures.filter((f) => fixturePlayed(f)).slice().reverse(), [fixtures]);
	const standings = (0, import_react.useMemo)(() => {
		if (division === "south") {
			const faSouth = tables.south ?? [];
			if (faSouth.some((row) => row.played > 0)) return faSouth;
			return southTable(fixtures);
		}
		return tables[division] ?? [];
	}, [
		division,
		fixtures,
		tables
	]);
	const shownStandings = (0, import_react.useMemo)(() => standings.map((row, i) => ({
		row,
		rank: i + 1
	})), [standings]);
	const lastSyncLabel = formatLastSync(lastSync);
	async function updateFromFa() {
		setSyncing(true);
		try {
			const res = await syncLeagueFromFa();
			applyLeague(res);
			const scoreLine = res.bullsScores?.[0] ? `${shortClub(res.bullsScores[0].homeTeam)} ${res.bullsScores[0].homeGoals}–${res.bullsScores[0].awayGoals} ${shortClub(res.bullsScores[0].awayTeam)}` : null;
			if (res.source === "fa") toast.success(scoreLine ? `Fixtures and results updated. ${scoreLine}.` : "Fixtures, results and U12 tables updated from Full-Time.");
			else if (res.fromFa?.length) toast.success(`Updated U12 ${res.fromFa.join(", ")} from Full-Time${scoreLine ? `. ${scoreLine}` : ""}.`);
			else toast.success(scoreLine ? `Tables refreshed. ${scoreLine}.` : "Tables and scores refreshed.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not update from Full-Time.");
		} finally {
			setSyncing(false);
		}
	}
	const [newTeam, setNewTeam] = (0, import_react.useState)("");
	const [editTeam, setEditTeam] = (0, import_react.useState)(null);
	const [editPlayed, setEditPlayed] = (0, import_react.useState)("");
	const [editGd, setEditGd] = (0, import_react.useState)("");
	const [editPts, setEditPts] = (0, import_react.useState)("");
	function startRowEdit(row) {
		setEditTeam(row.team);
		setEditPlayed(String(row.played));
		setEditGd(String(row.gd));
		setEditPts(String(row.pts));
	}
	async function saveRow() {
		if (!editTeam) return;
		const played = Number(editPlayed);
		const gd = Number(editGd);
		const pts = Number(editPts);
		if (![
			played,
			gd,
			pts
		].every((n) => Number.isFinite(n))) {
			toast.error("Enter played, GD and points as numbers.");
			return;
		}
		setSaving(true);
		try {
			const res = await saveDivisionStanding({ data: {
				division,
				team: editTeam,
				played,
				won: 0,
				drawn: 0,
				lost: 0,
				gd,
				pts
			} });
			if (res.tables) setTables(res.tables);
			setEditTeam(null);
			toast.success("Table updated.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not update table.");
		} finally {
			setSaving(false);
		}
	}
	async function addTeam() {
		const name = newTeam.trim();
		if (name.length < 2) {
			toast.error("Enter the FA team name.");
			return;
		}
		setSaving(true);
		try {
			const res = await addDivisionTeam({ data: {
				division,
				team: name
			} });
			if (res.tables) setTables(res.tables);
			setNewTeam("");
			toast.success("Team added.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not add team.");
		} finally {
			setSaving(false);
		}
	}
	function startEdit(fx) {
		setEditingId(fx.id);
		setHomeGoals(fx.homeGoals === null ? "" : String(fx.homeGoals));
		setAwayGoals(fx.awayGoals === null ? "" : String(fx.awayGoals));
	}
	async function saveResult() {
		if (editingId === null) return;
		const hg = Number(homeGoals);
		const ag = Number(awayGoals);
		if (!Number.isInteger(hg) || !Number.isInteger(ag) || hg < 0 || ag < 0) {
			toast.error("Enter both scores as whole numbers.");
			return;
		}
		await persistResult(editingId, hg, ag, "Result saved. Table updated.");
	}
	async function clearResult() {
		if (editingId === null) return;
		await persistResult(editingId, null, null, "Score removed. Table updated.");
	}
	async function persistResult(id, home, away, ok) {
		setSaving(true);
		try {
			const res = await recordLeagueResult({ data: {
				id,
				homeGoals: home,
				awayGoals: away
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(ok);
			setEditingId(null);
			applyLeague(res);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save result.");
		} finally {
			setSaving(false);
		}
	}
	if (loading && !fixtures.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-accent",
				children: LEAGUE_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-xl font-bold uppercase tracking-tight",
				children: ["U12s · ", SEASON_NAME]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-3 w-full",
				onClick: () => void updateFromFa(),
				disabled: syncing,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", syncing && "animate-spin") }), syncing ? "Refreshing…" : "Refresh tables"]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 animate-pulse rounded-lg bg-surface" }, i))
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-accent",
					children: LEAGUE_NAME
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-xl font-bold uppercase tracking-tight",
					children: ["U12s · ", SEASON_NAME]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: editable ? "Press Refresh for fixture changes, every team’s result, and the four U12 tables. Other age groups are ignored." : "Full Wigan U12 tables. Press Refresh to pull the latest from FA Full-Time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: faLeagueHomeUrl(),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex text-xs font-semibold uppercase tracking-wide text-accent",
						children: "Wigan & District Youth League on Full-Time"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: faDivisionTableUrl(division),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex text-xs font-semibold uppercase tracking-wide text-accent",
						children: [
							"Open U12 ",
							division,
							" table"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-3 w-full",
					onClick: () => void updateFromFa(),
					disabled: syncing || saving,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", syncing && "animate-spin") }), syncing ? "Refreshing…" : "Refresh tables"]
				}),
				lastSyncLabel || syncNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-subtle",
					children: [
						lastSyncLabel ? `Last update ${lastSyncLabel}` : null,
						lastSyncLabel && syncNote ? " · " : null,
						syncNote
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-subtle",
					children: "Pulls North, South, West and East from Full-Time."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1 rounded-lg border border-border bg-surface p-1",
				children: U12_DIVISIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setDivision(d.id);
						setEditTeam(null);
					},
					className: cn("min-h-12 rounded-md px-1 py-2 text-center text-xs font-semibold uppercase leading-tight tracking-wide", division === d.id ? "bg-accent text-accent-fg" : "text-muted"),
					children: [d.id, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs font-medium normal-case tracking-normal opacity-80",
						children: d.rank
					})]
				}, d.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted",
						children: [U12_DIVISIONS.find((d) => d.id === division)?.label, " table"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: faDivisionTableUrl(division),
						target: "_blank",
						rel: "noreferrer",
						className: "text-xs font-semibold uppercase tracking-wide text-accent",
						children: "Full-Time"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border bg-surface",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[2rem_minmax(0,1fr)_2rem_2.25rem_2.25rem] gap-x-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "#" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Team" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "P"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "GD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-right",
								children: "Pts"
							})
						]
					}), !shownStandings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-t border-border px-3 py-4 text-sm text-muted",
						children: "No teams in this division yet."
					}) : shownStandings.map(({ row, rank }) => {
						const us = row.team === BULLS_TEAM;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !editable || division === "south",
							onClick: () => startRowEdit(row),
							className: cn("grid w-full grid-cols-[2rem_minmax(0,1fr)_2rem_2.25rem_2.25rem] items-center gap-x-2 border-t border-border px-3 py-2.5 text-left text-sm", us && "bg-accent-soft"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("tabular-nums font-semibold", us ? "text-accent" : "text-muted"),
									children: rank
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("min-w-0 truncate", us && "font-semibold"),
									children: shortClub(row.team)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right tabular-nums text-muted",
									children: row.played
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right tabular-nums text-muted",
									children: row.gd > 0 ? `+${row.gd}` : row.gd
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right tabular-nums font-semibold",
									children: row.pts
								})
							]
						}), editable && editTeam === row.team ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2 border-t border-border bg-elevated px-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "P" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
									inputMode: "numeric",
									value: editPlayed,
									onChange: (e) => setEditPlayed(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "GD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
									inputMode: "numeric",
									value: editGd,
									onChange: (e) => setEditGd(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Pts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
									inputMode: "numeric",
									value: editPts,
									onChange: (e) => setEditPts(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "col-span-2",
									onClick: () => void saveRow(),
									disabled: saving,
									children: "Save row"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setEditTeam(null),
									children: "Cancel"
								})
							]
						}) : null] }, row.team);
					})]
				}),
				editable && division !== "south" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						placeholder: "Add FA team name",
						value: newTeam,
						onChange: (e) => setNewTeam(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => void addTeam(),
						disabled: saving,
						children: "Add"
					})]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Our fixtures"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: "Cherrybrook U12 Bulls. Results show the score."
				}),
				!upcoming.length && !results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No fixtures in yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-subtle",
							children: "Results"
						}), results.map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixtureCard, {
							fx,
							fixtures,
							goals: goalsByFixture[fx.id] ?? [],
							awards,
							votes,
							players,
							editable,
							editing: editingId === fx.id,
							homeGoals,
							awayGoals,
							saving,
							onEdit: () => startEdit(fx),
							onCancel: () => setEditingId(null),
							onHome: setHomeGoals,
							onAway: setAwayGoals,
							onSave: () => void saveResult(),
							onClear: () => void clearResult(),
							onSheet: applyLeague
						}, fx.id))]
					}) : null, upcoming.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-subtle",
							children: "Upcoming"
						}), upcoming.map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixtureCard, {
							fx,
							fixtures,
							goals: goalsByFixture[fx.id] ?? [],
							awards,
							votes,
							players,
							editable,
							editing: editingId === fx.id,
							homeGoals,
							awayGoals,
							saving,
							onEdit: () => startEdit(fx),
							onCancel: () => setEditingId(null),
							onHome: setHomeGoals,
							onAway: setAwayGoals,
							onSave: () => void saveResult(),
							onClear: () => void clearResult(),
							onSheet: applyLeague
						}, fx.id))]
					}) : null]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted",
					children: [U12_DIVISIONS.find((d) => d.id === division)?.label, " fixtures & results"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: "Every U12 team in this division."
				}),
				!(divisionResults[division] ?? []).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No other fixtures in yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DivisionResultsList, { rows: divisionResults[division] ?? [] })
			] })
		]
	});
}
function DivisionResultsList({ rows }) {
	const upcoming = rows.filter((row) => row.homeGoals == null || row.awayGoals == null).slice().sort((a, b) => a.kickoff.localeCompare(b.kickoff));
	const results = rows.filter((row) => row.homeGoals != null && row.awayGoals != null).slice().sort((a, b) => b.kickoff.localeCompare(a.kickoff));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [upcoming.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-subtle",
				children: "Upcoming"
			}), upcoming.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DivisionResultCard, { row }, `${row.kickoff}|${row.homeTeam}|${row.awayTeam}`))]
		}) : null, results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-subtle",
				children: "Results"
			}), results.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DivisionResultCard, { row }, `${row.kickoff}|${row.homeTeam}|${row.awayTeam}`))]
		}) : null]
	});
}
function DivisionResultCard({ row }) {
	const scored = row.homeGoals != null && row.awayGoals != null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-wide text-muted",
				children: [
					kickoffParts(row.kickoff).day,
					" · ",
					kickoffParts(row.kickoff).time
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-0 text-sm font-semibold",
					children: [
						shortClub(row.homeTeam),
						" vs ",
						shortClub(row.awayTeam)
					]
				}), scored ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "shrink-0 font-display text-lg font-bold tabular-nums leading-none",
					children: [
						row.homeGoals,
						"–",
						row.awayGoals
					]
				}) : null]
			}),
			row.venue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: row.venue
			}) : null,
			row.status === "postponed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs font-semibold uppercase tracking-wide text-accent",
				children: "Postponed"
			}) : null
		]
	});
}
function FixtureCard({ fx, fixtures, goals, awards, votes, players, editable, editing, homeGoals, awayGoals, saving, onEdit, onCancel, onHome, onAway, onSave, onClear, onSheet }) {
	const { day, time } = kickoffParts(fx.kickoff);
	const home = isBullsHome(fx);
	const played = fixtureHasScore(fx);
	const kickedOff = fixtureKickoff(fx.kickoff).getTime() <= Date.now();
	const opponent = shortClub(bullsOpponent(fx));
	const us = home ? fx.homeGoals : fx.awayGoals;
	const them = home ? fx.awayGoals : fx.homeGoals;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface px-4 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-wide text-muted",
							children: [
								day,
								" · ",
								time
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-2 rounded-sm bg-elevated px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted",
									children: home ? "Home" : "Away"
								}),
								"vs ",
								opponent
							]
						}),
						fx.venue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-subtle",
							children: fx.venue
						}) : null,
						fx.status === "postponed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-semibold uppercase tracking-wide text-accent",
							children: "Postponed"
						}) : null
					]
				}), played && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl font-bold tabular-nums leading-none",
						children: [
							us,
							"–",
							them
						]
					}), fx.homeTeam === "Pine Villa U12 s" && fx.awayTeam === "Cherrybrook U12 Bulls" && fx.homeGoals === 7 && fx.awayGoals === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] font-semibold uppercase tracking-wide text-muted",
						children: "HT 2–2"
					}) : null]
				}) : kickedOff && !editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 text-xs font-semibold uppercase tracking-wide text-muted",
					children: "Score not in"
				}) : null]
			}),
			editable && editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 border-t border-border pt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: shortClub(fx.homeTeam) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						inputMode: "numeric",
						value: homeGoals,
						onChange: (e) => onHome(e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: shortClub(fx.awayTeam) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						inputMode: "numeric",
						value: awayGoals,
						onChange: (e) => onAway(e.target.value)
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1",
							onClick: onSave,
							disabled: saving,
							children: saving ? "Saving…" : "Save result"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: onCancel,
							disabled: saving,
							children: "Cancel"
						}),
						played ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "w-full",
							onClick: onClear,
							disabled: saving,
							children: "Remove score"
						}) : null
					]
				})]
			}) : editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 text-xs font-semibold uppercase tracking-wide text-accent",
				onClick: onEdit,
				children: played ? "Edit score" : "Enter score"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchSheet, {
				fx,
				fixtures,
				goals,
				awards,
				votes,
				players,
				editable,
				onUpdated: onSheet
			})
		]
	});
}
function PlayerTestTotals({ tests, player, compact = false }) {
	const lines = playerDrillLines(tests, player);
	const any = lines.some((l) => l.score != null || l.time != null);
	const total = lines.reduce((n, l) => n + (l.score ?? 0), 0);
	if (!any) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "No tests in yet for this lad."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "" : "rounded-xl border border-border bg-bg p-3",
		children: [
			compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted",
				children: "Tests · time and score"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_4.5rem_3.2rem] gap-x-2 border-b border-border pb-1 text-[10px] font-semibold uppercase tracking-wider text-subtle",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Drill" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right",
						children: "Time"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right",
						children: "Score"
					})
				]
			}),
			lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_4.5rem_3.2rem] items-baseline gap-x-2 border-t border-border py-1.5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: line.score == null ? "text-muted" : "text-fg",
						children: line.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right tabular-nums text-muted",
						children: line.timeLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-right tabular-nums font-semibold",
						children: line.score == null ? "—" : `${line.score}/20`
					})
				]
			}, line.kind)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex justify-between border-t border-border pt-2 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Latest tests" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: total
				})]
			})
		]
	});
}
function PerformancePick({ players, history, awards = [], sessions = [], tests = [], appearances, initialPlayer = "", lockToPlayer = false, onRefresh }) {
	const [player, setPlayer] = (0, import_react.useState)(initialPlayer);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [snap, setSnap] = (0, import_react.useState)(null);
	const shown = lockToPlayer ? initialPlayer : player;
	const srcPlayers = snap?.players ?? players;
	const srcHistory = snap?.history ?? history;
	const srcAwards = snap?.awards ?? awards;
	const srcSessions = snap?.sessions ?? sessions;
	const srcTests = snap?.tests ?? tests;
	const srcAppearances = snap?.appearances ?? appearances;
	const table = (0, import_react.useMemo)(() => scoreFull(srcPlayers, srcHistory, srcAwards, srcSessions, srcAppearances, srcTests), [
		srcPlayers,
		srcHistory,
		srcAwards,
		srcSessions,
		srcAppearances,
		srcTests
	]);
	const row = table.find((t) => t.name === shown);
	const rank = row ? table.findIndex((t) => t.name === shown) + 1 : 0;
	const weeks = (0, import_react.useMemo)(() => shown ? playerWeeks(shown, srcHistory, srcAwards, srcSessions, srcTests) : [], [
		shown,
		srcHistory,
		srcAwards,
		srcSessions,
		srcTests
	]);
	const ordinal = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : rank ? "th" : "";
	const name = shown ? parsePlayer(shown).name : "";
	(0, import_react.useEffect)(() => {
		setSnap(null);
	}, [
		history,
		awards,
		sessions,
		tests,
		appearances,
		players
	]);
	async function refreshScores() {
		setBusy(true);
		try {
			if (onRefresh) await onRefresh();
			const [votes, extras] = await Promise.all([getInitialData(), getScoreExtras()]);
			setSnap({
				players: votes.players.length ? votes.players : players,
				history: votes.history.length ? votes.history : history,
				awards: extras.awards.length ? extras.awards : awards,
				sessions: extras.sessions,
				tests: extras.tests ?? [],
				appearances: votes.appearances
			});
			toast.success(name ? `${name} refreshed.` : "Scores refreshed.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not refresh.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Your child’s marks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Full marks, graph and PDF for your lad only. Other families only see the top 3 totals."
			}),
			lockToPlayer ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "performance-player",
				children: "Your child"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
				id: "performance-player",
				label: "Your child",
				value: player,
				placeholder: "Select your child…",
				players,
				className: "mb-3",
				onChange: setPlayer
			})] }),
			shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "min-w-0 text-sm font-semibold text-fg",
						children: [name, rank ? ` · ${rank}${ordinal} overall` : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "shrink-0",
						onClick: () => void refreshScores(),
						disabled: busy,
						"aria-label": `Refresh ${name}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", busy && "animate-spin") }), busy ? "Refreshing" : "Refresh"]
					})]
				}),
				row ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2 text-center sm:grid-cols-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							value: row.total,
							label: "Total"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							value: row.parentPts,
							label: "Parents"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							value: row.oppMomPts + row.playersPlayerPts,
							label: "Awards"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							value: row.trainingPts,
							label: "Training"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							value: row.testPts,
							label: "Tests"
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerTestTotals, {
						tests: srcTests,
						player: shown
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: playerReportHref(shown),
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerWeekChart, {
						weeks,
						height: 240
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-center text-xs text-muted",
						children: "Tap the chart to open this month’s PDF"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => {
							globalThis.location.href = playerReportHref(shown);
						},
						children: "Print this month’s PDF"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "w-full",
						onClick: () => {
							const url = `${globalThis.location.origin}${playerReportHref(shown)}`;
							sendWhatsApp(`${parsePlayer(shown).name} · month PDF`, `${TEAM_NAME} month scores for ${parsePlayer(shown).name}`, url);
						},
						children: "Send graph in WhatsApp"
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Pick your child above to see their full marks."
			})
		]
	});
}
function Stat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-bg px-2 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg font-bold tabular-nums leading-none",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted",
			children: label
		})]
	});
}
function fmt(n) {
	if (!Number.isFinite(n) || n === 0) return "0";
	return n % 1 === 0 ? String(n) : n.toFixed(1);
}
function StickyScoreTable({ rows, cols, defaultSort }) {
	const [sort, setSort] = (0, import_react.useState)(defaultSort);
	const [desc, setDesc] = (0, import_react.useState)(true);
	const col = cols.find((c) => c.id === sort) ?? cols[cols.length - 1];
	const ordered = (0, import_react.useMemo)(() => {
		if (!col) return rows;
		return [...rows].sort((a, b) => {
			const av = col.value(a);
			const bv = col.value(b);
			const aMissing = !Number.isFinite(av) || av === 0;
			const bMissing = !Number.isFinite(bv) || bv === 0;
			if (col.faster) {
				if (aMissing && bMissing) return publicName(a.name).localeCompare(publicName(b.name));
				if (aMissing) return 1;
				if (bMissing) return -1;
				const d = av - bv;
				if (d !== 0) return desc ? d : -d;
				return publicName(a.name).localeCompare(publicName(b.name));
			}
			const d = bv - av;
			if (d !== 0) return desc ? d : -d;
			return publicName(a.name).localeCompare(publicName(b.name));
		});
	}, [
		rows,
		col,
		desc
	]);
	const marks = ordered.map((row) => col ? col.value(row) : 0);
	function toggle(id) {
		if (sort === id) setDesc((d) => !d);
		else {
			setSort(id);
			setDesc(true);
		}
	}
	if (!rows.length || !col) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-base text-muted",
		children: "No points in this table yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "-mx-4 w-[calc(100%+2rem)] max-w-[100vw] overflow-x-auto overscroll-x-contain px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-max min-w-full border-separate border-spacing-0 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-xs font-semibold uppercase tracking-wide text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "sticky left-0 z-20 min-w-[9.5rem] border-b border-border bg-elevated px-3 py-3 text-left shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]",
					children: "Name"
				}), cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "min-w-[4.75rem] whitespace-nowrap border-b border-border bg-elevated px-2 py-1 text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggle(c.id),
						className: cn("inline-flex h-11 min-w-[4.25rem] items-center justify-end gap-1 px-1 text-xs font-semibold uppercase tracking-wide", sort === c.id ? "text-accent" : "text-subtle"),
						children: [c.label, sort === c.id ? desc ? " ↓" : " ↑" : ""]
					})
				}, c.id))]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ordered.map((row, i) => {
				const place = placeAt(i, marks);
				const lead = place === 1 && (marks[i] ?? 0) > 0;
				const bg = lead ? "bg-[#2a1614]" : "bg-surface";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: cn("sticky left-0 z-10 whitespace-nowrap border-t border-border px-3 py-3 shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]", bg),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: playerReportHref(row.name),
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("w-6 shrink-0 font-display text-2xl font-bold tabular-nums", lead ? "text-accent" : "text-muted"),
								children: place
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whitespace-nowrap text-base font-semibold text-fg",
								children: publicName(row.name)
							})]
						})
					}), cols.map((c) => {
						const active = sort === c.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: cn("whitespace-nowrap border-t border-border px-2 py-3 text-right font-display text-2xl font-bold tabular-nums", active ? "text-accent" : "text-fg", lead && bg),
							children: c.text ? c.text(row) : fmt(c.value(row))
						}, c.id);
					})]
				}, row.name);
			}) })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-muted",
		children: "Names stay put. Swipe for the numbers. Tap a heading to sort."
	})] });
}
var MONTH_COLS = [
	{
		id: "parents",
		label: "3-2-1",
		value: (row) => row.parentPts
	},
	{
		id: "training",
		label: "Train",
		value: (row) => row.trainingPts
	},
	{
		id: "tests",
		label: "Tests",
		value: (row) => row.testPts
	},
	{
		id: "mom",
		label: "MOM",
		value: (row) => row.oppMomPts
	},
	{
		id: "manager",
		label: "Mgr",
		value: (row) => row.playersPlayerPts
	},
	{
		id: "played",
		label: "Played",
		value: (row) => row.playedPts
	},
	{
		id: "total",
		label: "Tot",
		value: (row) => row.total
	}
];
function MonthlyTables({ players, history, appearances, awards = [], sessions = [], tests = [], full = false }) {
	const allAvg = averageMonthlyFull(players, history, awards, sessions, appearances, tests);
	const averages = full ? allAvg.filter((r) => r.avg > 0) : topNWithTies(allAvg, (r) => r.avg, 3);
	const monthsN = allAvg[0]?.months ?? 0;
	const septAll = scoreFullMonth(players, history, awards, sessions, "2026-09", appearances, tests).filter((row) => row.total > 0);
	const octAll = scoreFullMonth(players, history, awards, sessions, "2026-10", appearances, tests).filter((row) => row.total > 0);
	const sept = full ? septAll : topNWithTies(septAll, (row) => row.total, 3);
	const oct = full ? octAll : topNWithTies(octAll, (row) => row.total, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "Average monthly overall scores"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-sm text-muted",
						children: [
							"Overall = parent 3-2-1 + opp MOM + manager’s player + 5 a game played + Friday training + tests, averaged across ",
							monthsN || "each",
							" prize month",
							monthsN === 1 ? "" : "s",
							".",
							full ? " Whole squad." : " Top 3 — tied scores all stay."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyScoreTable, {
						rows: averages,
						cols: [
							{
								id: "avg",
								label: "Overall",
								value: (row) => row.avg
							},
							{
								id: "parents",
								label: "3-2-1",
								value: (row) => row.parentAvg
							},
							{
								id: "training",
								label: "Train",
								value: (row) => row.trainingAvg
							},
							{
								id: "tests",
								label: "Tests",
								value: (row) => row.testAvg
							},
							{
								id: "mom",
								label: "MOM",
								value: (row) => row.oppMomAvg
							},
							{
								id: "manager",
								label: "Mgr",
								value: (row) => row.playersPlayerAvg
							}
						],
						defaultSort: "avg"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "September winners"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-sm text-muted",
						children: [
							"Closed 21 Sep. Pine Villa and Newton. Medals that Monday: Isa Ali 1st, William Brittain 2nd, Henry Bearman 3rd.",
							full ? " Everyone with points is on here." : " Top 3 on points. Anyone level with 3rd stays on.",
							" Friday 25 Sep is in October."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyScoreTable, {
						rows: sept,
						cols: MONTH_COLS,
						defaultSort: "total"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "October leaders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-sm text-muted",
						children: [
							monthWindow("2026-10").label,
							". Live now. Daisy Hill, Standish and both Fridays. From Standish, each family who votes gets 1 point for their own lad, added on the 3-2-1.",
							full ? " Everyone with points is on here." : " Top 3. Anyone level with 3rd stays on."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyScoreTable, {
						rows: oct,
						cols: MONTH_COLS,
						defaultSort: "total"
					})
				]
			})
		]
	});
}
//#endregion
export { PlayerPicker as a, getLeagueData as c, PerformancePick as i, syncLeagueFromFa as l, MatchSheet as n, PlayerTestTotals as o, MonthlyTables as r, StickyScoreTable as s, LeaguePanel as t };
