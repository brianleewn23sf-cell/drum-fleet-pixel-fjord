import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, n as require_react_dom, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerFn } from "./ssr.mjs";
import { a as parsePlayer, c as playerDob, d as shortName, i as matchSquadPlayer, n as formatDob, o as pitchSurname, s as playerAgeYears, t as PLAYERS, u as publicName } from "./players-CZr5uoUS.mjs";
import { i as groupGames, r as gameKey$1 } from "./league-Ch1nTJJB.mjs";
import { c as record, l as string, o as number$1, r as array, s as object, t as number } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { n as listAudit } from "./audit-DKcUlOE6.mjs";
import { C as shortClub, b as isBullsHome, d as bullsOpponent, f as bullsRoundList, h as fixtureKey, n as BULLS_TEAM, t as BULLS_FIXTURES, x as planFixture } from "./wdyl-CJ_QwBRn.mjs";
import { r as saveCoachVote } from "./vote-actions-CvyU8sOo.mjs";
import { a as issueParentLogins, l as setParentLogin, n as VIEW_ALL_PLAYER, o as listParentLogins, t as VIEW_ALL_FAMILY } from "./parent-login-a0219ktd.mjs";
import { n as formatKickoff, r as lastFridayStamp } from "./when-BGtZJU2t.mjs";
import { o as playerDrillLines } from "./test-bonus-DvKLNi3p.mjs";
import { _ as trainingTotal, a as fridayLabel, c as openPrizeMonth, f as prizeMonthTitle, g as summariseTraining, h as shiftPrizeMonth, m as seasonFridays, o as fridayMark, s as joinOppMom, u as oppMomPlayers } from "./scoring-B3T9YYfp.mjs";
import { l as shiftMonth, n as PLAYERS_PLAYER_POINTS, t as OPP_MOM_POINTS, u as upcomingPotmMonth } from "./potm-BIYA_DOQ.mjs";
import { d as TEAM_NAME, f as TRAINING_LABEL } from "./brand-C_wD2nfD.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as RESERVE_SLOTS, c as UNAVAILABLE_SLOTS, i as INJURED_SLOTS, l as formationById, n as DEFAULT_FORMATION, o as SLOT_NAMES, r as FORMATIONS, s as SUB_SLOTS, u as remapLineup } from "./formations-pQSTjnGH.mjs";
import { C as roleBriefForPlayer, E as trainingWhatsAppText, S as pregameWhatsAppText, _ as formationExtras, a as FIRST_BALLS, b as newTalkSalt, f as benchKind, g as fillLineupBrief, h as fillBrief, i as COMPACT_EXPAND, l as POSSESSION_RULE, n as BULLS_WAY, r as CARRY_RULE, s as KEEPER_FACTS, u as PRESS_RULE, w as sendWhatsApp, x as personaliseBrief, y as isKeeper } from "./whatsapp-BM3bb8QP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button, t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { a as listParentPresence, n as FieldLabel, o as listPerfUsers, r as FieldSelect, t as FieldInput } from "./parent-presence-Cn_O1Rtq.mjs";
import { t as KitGraphic } from "./kit-graphic-DfF3Ly7S.mjs";
import { a as scoreFull, i as getScoreExtras, o as scoreFullMonth, t as averageMonthlyFull } from "./score-actions-DgqUGgog.mjs";
import { t as SCORE_CATEGORIES } from "./score-categories-Bc3Qq1vP.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, n as BarChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { i as playerReportHref } from "./player-week-report-DPVGZH4i.mjs";
import { a as PlayerPicker, c as getLeagueData, i as PerformancePick, o as PlayerTestTotals, r as MonthlyTables, s as StickyScoreTable, t as LeaguePanel } from "./monthly-tables-BlaPSP1H.mjs";
import { a as TRAINING_MARKS_LOSE, i as TRAINING_MARKS_INTRO } from "./youth-rules-BuIp-_r1.mjs";
import { i as scoreTrainerYear, n as TRAINER_YEAR_LABEL } from "./trainer-year-BiJeg2Qv.mjs";
import { n as FALLBACK_PIN, r as LOCAL_UNLOCKS, t as FALLBACK_NAME } from "./pins-D3aXuxPO.mjs";
import { a as checkCoachPin, c as leaveCoach, i as canSaveName, l as listCoachUsers, n as SAVE_LOCK, r as addCoachUser, s as isAdminName, u as removeCoachUser } from "./coach-users-DQwpwPHR.mjs";
import { a as mergeTraining, i as computePlayerSeason, n as PlayerProgressCard, o as writeLocalTraining, r as SquadTestTable, t as FitnessPanel } from "./training-store-BSIXYoSB.mjs";
import { n as getPotm, r as getTrainerYear, t as awardPotm } from "./potm-actions-Durmts6G.mjs";
import { r as removeSquadPlayer, t as addSquadPlayer } from "./squad-C3dFz7Mc.mjs";
import { a as demoWhatsAppText, n as DEMO_STEPS, o as isDemoName, t as DEMO_LOGINS } from "./demo-CR2KY2Ob.mjs";
import { a as matchFace, i as gameMinute, n as formatClock, o as playerMinutes, r as formatInjury, s as stintMinutes, t as clockElapsedMs } from "./minutes-BluTvm9p.mjs";
import { i as seasonTally, n as emptyStats, r as hasAnyStat, t as MATCH_STAT_FIELDS } from "./match-stats-AGxNbR3c.mjs";
import { r as saveTraining, t as getTraining } from "./training-actions-BntQL2yx.mjs";
import { n as saveAppearances } from "./appearance-actions-AdAmm59Y.mjs";
import { n as SafePanel, t as PlayedPicker } from "./safe-panel-Br5rwLBq.mjs";
import { n as saveMatchPlan, t as getMatchPlans } from "./pitch-actions-RsKllPWn.mjs";
import { t as gameDetailsFor } from "./game-details-k7DhdgXt.mjs";
import { t as RulesCard } from "./rules-card-BEAUokGR.mjs";
import { t as PrizeExamples } from "./prize-examples-BjgZEEvL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-CLZeTJBq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function tallyAwards(players, awards) {
	const map = /* @__PURE__ */ new Map();
	for (const p of players) map.set(p, {
		name: p,
		oppMom: 0,
		playersPlayer: 0,
		managerPlayer: 0
	});
	for (const a of awards) {
		for (const name of oppMomPlayers(a.oppMom)) {
			const row = map.get(name);
			if (row) row.oppMom += 1;
		}
		if (a.playersPlayer) {
			const row = map.get(a.playersPlayer);
			if (row) row.playersPlayer += 1;
		}
		if (a.managerPlayer && a.managerPlayer !== a.playersPlayer) {
			const row = map.get(a.managerPlayer);
			if (row) row.managerPlayer += 1;
		}
	}
	return [...map.values()].sort((a, b) => {
		const ta = a.oppMom + a.playersPlayer;
		const tb = b.oppMom + b.playersPlayer;
		if (tb !== ta) return tb - ta;
		if (b.oppMom !== a.oppMom) return b.oppMom - a.oppMom;
		return a.name.localeCompare(b.name);
	});
}
var getCoachData = createServerFn({ method: "POST" }).handler(createSsrRpc("14dcf70485d0c456f529716cf82af6035e26c08fe421be797ffb18af39e98d29"));
var saveMatchAwards = createServerFn({ method: "POST" }).validator(object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	oppMom: string().trim().max(160),
	playersPlayer: string().trim().max(80),
	managerPlayer: string().trim().max(80)
})).handler(createSsrRpc("3f95b3c12979029f010c4396e0e9fb7965c47d2c91d0635a0df63cae02c3b5ab"));
var resetParentVotes = createServerFn({ method: "POST" }).validator(object({ confirm: string().trim() })).handler(createSsrRpc("1572017c3e3cd9a1b0d41d2653a6e81a8b205086f220260bec287b5fa4c16853"));
var savePlayerNote = createServerFn({ method: "POST" }).validator(object({
	player: string().trim().min(1).max(80),
	note: string().trim().max(500)
})).handler(createSsrRpc("b112f4d26fad8119e48cdc22332ecb1f927560a194d7547731cff7c8983443b2"));
var EMAIL_KEY$1 = "bulls-super-admin-email";
var EXACT_EMAILS = {
	"brian.lee@gmail.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"brianlee@gmail.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"brian.lee@googlemail.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"brian.lee@outlook.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"brian.lee@hotmail.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"brian.lee@icloud.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"brian@cherrybrookfc.com": {
		name: "Brian Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"connor.lee@gmail.com": {
		name: "Connor Lee",
		role: "admin",
		pin: FALLBACK_PIN
	},
	"connorlee@gmail.com": {
		name: "Connor Lee",
		role: "admin",
		pin: FALLBACK_PIN
	}
};
function compactLocal(email) {
	return (email.split("@")[0] ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");
}
function normalizeEmail(raw) {
	return raw.trim().toLowerCase();
}
function isLikelyEmail(raw) {
	const e = normalizeEmail(raw);
	return /^[^\s@]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(e);
}
function seatForAdminEmail(raw) {
	const email = normalizeEmail(raw);
	if (!isLikelyEmail(email)) return null;
	if (email === "dev@example.com") return null;
	if (EXACT_EMAILS[email]) return EXACT_EMAILS[email];
	const local = compactLocal(email);
	if (local.includes("brian") && local.includes("lee")) return {
		name: FALLBACK_NAME,
		role: "admin",
		pin: FALLBACK_PIN
	};
	if (local.includes("connor") && local.includes("lee")) return {
		name: "Connor Lee",
		role: "admin",
		pin: FALLBACK_PIN
	};
	const remembered = readRememberedAdminEmail();
	if (remembered && remembered === email) return {
		name: FALLBACK_NAME,
		role: "admin",
		pin: FALLBACK_PIN
	};
	return null;
}
function readRememberedAdminEmail() {
	if (typeof window === "undefined") return "";
	try {
		return window.localStorage.getItem(EMAIL_KEY$1) || "";
	} catch {
		return "";
	}
}
function rememberAdminEmail(email) {
	try {
		window.localStorage.setItem(EMAIL_KEY$1, normalizeEmail(email));
	} catch {}
}
function forgetAdminEmail() {
	try {
		window.localStorage.removeItem(EMAIL_KEY$1);
	} catch {}
}
var CRED_KEY = "bulls-coach-bio";
function b64url(buf) {
	const bytes = new Uint8Array(buf);
	let bin = "";
	for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
	return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function readCoachBio() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(CRED_KEY);
		if (!raw) return null;
		const row = JSON.parse(raw);
		if (!row?.id || !row.name) return null;
		return row;
	} catch {
		return null;
	}
}
async function bioAvailable() {
	if (typeof window === "undefined") return false;
	if (!window.PublicKeyCredential) return false;
	try {
		if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === "function") return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
	} catch {
		return false;
	}
	return true;
}
async function registerCoachBio(name, role, pin) {
	if (!await bioAvailable()) return false;
	const userId = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16));
	const challenge = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(32));
	try {
		const cred = await navigator.credentials.create({ publicKey: {
			challenge,
			rp: {
				name: "Raging Bulls Coach",
				id: window.location.hostname
			},
			user: {
				id: userId,
				name: name.replace(/\s+/g, ".").toLowerCase() || "coach",
				displayName: name || "Coach"
			},
			pubKeyCredParams: [{
				type: "public-key",
				alg: -7
			}, {
				type: "public-key",
				alg: -257
			}],
			authenticatorSelection: {
				authenticatorAttachment: "platform",
				userVerification: "required",
				residentKey: "preferred"
			},
			timeout: 6e4
		} });
		if (!cred?.rawId) return false;
		const row = {
			id: b64url(cred.rawId),
			name,
			role,
			pin: pin || "0803"
		};
		window.localStorage.setItem(CRED_KEY, JSON.stringify(row));
		return true;
	} catch {
		return false;
	}
}
var PIN_KEY = "bulls-coach-ok";
var SEAT_KEY = "bulls-coach-seat";
var EMAIL_KEY = "bulls-super-admin-email";
var listeners = /* @__PURE__ */ new Set();
var memoryOn = false;
function emit() {
	for (const fn of listeners) fn();
}
function subscribeCoachSession(fn) {
	listeners.add(fn);
	window.addEventListener("storage", fn);
	return () => {
		listeners.delete(fn);
		window.removeEventListener("storage", fn);
	};
}
function isCoachUnlocked() {
	if (memoryOn) return true;
	if (typeof window === "undefined") return false;
	try {
		if (window.localStorage.getItem(PIN_KEY) === "1") {
			memoryOn = true;
			return true;
		}
		if (window.localStorage.getItem(EMAIL_KEY)) {
			memoryOn = true;
			return true;
		}
		return false;
	} catch {
		return false;
	}
}
function writeCoachSession(name, role, pin) {
	memoryOn = true;
	try {
		window.sessionStorage.removeItem("bulls-coach-locked");
		window.localStorage.setItem(PIN_KEY, "1");
		if (name) {
			window.localStorage.setItem("bulls-coach-name", name);
			window.localStorage.setItem(SEAT_KEY, name);
		}
		window.sessionStorage.setItem("bulls-coach-role", role);
		window.localStorage.setItem("bulls-coach-role", role);
		window.sessionStorage.setItem("bulls-coach-pin", pin);
		window.localStorage.setItem("bulls-coach-pin", pin);
	} catch {}
	emit();
}
function clearCoachSession() {
	memoryOn = false;
	try {
		window.localStorage.removeItem(PIN_KEY);
		window.localStorage.removeItem(SEAT_KEY);
		window.localStorage.removeItem("bulls-coach-name");
		window.localStorage.removeItem("bulls-coach-role");
		window.sessionStorage.removeItem("bulls-coach-role");
		window.sessionStorage.removeItem("bulls-coach-pin");
		window.localStorage.removeItem("bulls-coach-pin");
		window.sessionStorage.removeItem("bulls-coach-locked");
	} catch {}
	emit();
}
var listDemoPlayers = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40).optional(),
	owner: string().trim().max(60).optional()
})).handler(createSsrRpc("db99e0cdc34400b501293cb0e994e428d3db716171ef6ec080667a3d3076d58d"));
var addDemoPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().min(1).max(40),
	shirt: string().trim().max(4).optional(),
	name: string().trim().min(2).max(60),
	owner: string().trim().max(60).optional()
})).handler(createSsrRpc("616b8ca9702025addd2c2dcdc3b0f4ed6beaef07f218b4ed6812b9d2eb970dbe"));
var removeDemoPlayer = createServerFn({ method: "POST" }).validator(object({
	pin: string().trim().max(40).optional(),
	id: number().int()
})).handler(createSsrRpc("3a20262ca48dcc0b7beb4ffa8312427b4fee7822c125b70eec410dc538903d58"));
function ParentsOnline({ pin }) {
	const [parents, setParents] = (0, import_react.useState)([]);
	const [guests, setGuests] = (0, import_react.useState)(0);
	const ready = pin.trim().length > 0;
	async function load() {
		if (!pin.trim()) return;
		try {
			const res = await listParentPresence({ data: { pin: pin.trim() } });
			if (!res.ok) return;
			setParents(res.parents);
			setGuests(res.guests);
		} catch {}
	}
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		load();
		const t = setInterval(() => void load(), 8e3);
		return () => clearInterval(t);
	}, [pin]);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-display text-lg font-bold uppercase tracking-tight",
			children: "Parents online"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Enter your admin code to see who is on the parent app."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Parents online"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Families who have the app open now. Named when they pick their lad."
			}),
			parents.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: parents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2.5 rounded-full bg-emerald-400" }),
							p.label,
							"’s parent"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-wide text-muted",
						children: p.page || "app"
					})]
				}, p.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No named parents on the app right now."
			}),
			guests > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-fg",
				children: [guests, " more on the app who have not picked a child yet."]
			}) : null
		]
	});
}
function deskUrl() {
	if (typeof window === "undefined") return "/coach";
	return `${window.location.origin}/coach`;
}
function CoachUsersPanel({ adminPin, onAdminPin }) {
	const [users, setUsers] = (0, import_react.useState)([]);
	const [name, setName] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [gatePin, setGatePin] = (0, import_react.useState)(adminPin);
	const [inviteCode, setInviteCode] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const link = deskUrl();
	async function load() {
		const p = (adminPin || gatePin).trim();
		if (!p) return;
		try {
			const res = await listCoachUsers({ data: { pin: p } });
			if (!res.ok) {
				toast.error("Only the admin can see users.");
				setUsers([]);
				return;
			}
			setUsers(res.users);
		} catch {
			toast.error("Could not load users.");
		}
	}
	(0, import_react.useEffect)(() => {
		if (adminPin) {
			setGatePin(adminPin);
			load();
		}
		const t = setInterval(() => {
			if (adminPin || gatePin) load();
		}, 8e3);
		return () => clearInterval(t);
	}, [adminPin]);
	async function onAdd() {
		if (!name.trim()) return toast.error("Add their name.");
		if (!/^\d{4,6}$/.test(code.trim())) return toast.error("Code must be 4 to 6 digits.");
		setSaving(true);
		try {
			const res = await addCoachUser({ data: {
				adminPin: adminPin || gatePin,
				name: name.trim(),
				pin: code.trim()
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(`${name.trim()} can play with the desk. They will not see other users.`);
			setInviteCode(code.trim());
			setName("");
			setCode("");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not add user.");
		} finally {
			setSaving(false);
		}
	}
	function shareWithCode() {
		const pin = code.trim() || inviteCode.trim();
		if (!pin) return toast.error("Add the code to share.");
		sendWhatsApp(`${TEAM_NAME} coach desk`, `${TEAM_NAME} coach desk.\nOpen this link, then unlock with code ${pin}`, link);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Admin users"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Brian — full access. You see every user. Coaches cannot see this list."
			}),
			!adminPin && !users.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "admin-gate",
						children: "Your admin code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "admin-gate",
						type: "password",
						inputMode: "numeric",
						value: gatePin,
						onChange: (e) => setGatePin(e.target.value.replace(/\D/g, "").slice(0, 6)),
						className: "mb-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => {
							onAdminPin?.(gatePin);
							load();
						},
						children: "Show all users"
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-4 flex flex-col gap-2",
				children: users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2 font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: u.online ? "inline-block size-2.5 rounded-full bg-emerald-400" : "inline-block size-2.5 rounded-full bg-muted" }),
							u.name,
							u.role === "admin" ? " · admin" : "",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: u.online ? "text-xs font-semibold uppercase tracking-wide text-emerald-400" : "text-xs uppercase tracking-wide text-muted",
								children: u.online ? "online" : "offline"
							})
						]
					}), u.role !== "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs font-semibold uppercase tracking-wide text-muted",
						onClick: () => {
							removeCoachUser({ data: {
								adminPin: adminPin || gatePin,
								id: u.id
							} }).then((res) => {
								if (!res.success) toast.error(res.error);
								else load();
							});
						},
						children: "Remove"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "You"
					})]
				}, u.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mb-4 w-full",
				variant: "outline",
				onClick: shareWithCode,
				children: "WhatsApp share · with code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentsOnline, { pin: adminPin || gatePin })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "coach-user-name",
				children: "Name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
				id: "coach-user-name",
				value: name,
				placeholder: "Connor Lee",
				onChange: (e) => setName(e.target.value),
				className: "mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "coach-user-code",
				children: "Their code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
				id: "coach-user-code",
				inputMode: "numeric",
				autoComplete: "off",
				value: code,
				placeholder: "4 to 6 digits",
				onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)),
				className: "mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: () => void onAdd(),
				disabled: saving,
				children: saving ? "Saving…" : "Add user"
			})
		]
	});
}
function DemoPanel({ coachName, isAdmin, pin, onOpenTab, onPlayers, onViewDemo }) {
	const self = isDemoName(coachName);
	const link = typeof window === "undefined" ? "/coach" : `${window.location.origin}/coach`;
	const [owner, setOwner] = (0, import_react.useState)(self ? coachName : DEMO_LOGINS[0].name);
	const [squad, setSquad] = (0, import_react.useState)([]);
	const [shirt, setShirt] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [removing, setRemoving] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function onDelete(id, label) {
		if (!pin.trim()) {
			toast.error("Unlock again, then delete.");
			return;
		}
		setRemoving(id);
		try {
			const res = await removeDemoPlayer({ data: {
				pin: pin.trim(),
				id
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(`${label} deleted.`);
			await loadSquad();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not delete.");
		} finally {
			setRemoving(null);
		}
	}
	async function loadSquad(nextOwner = owner) {
		if (!pin.trim()) return;
		try {
			const res = await listDemoPlayers({ data: {
				pin,
				owner: nextOwner
			} });
			if (!res.ok) return;
			setSquad(res.players);
			onPlayers?.(res.players.map((p) => p.label));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load demo squad.");
		}
	}
	(0, import_react.useEffect)(() => {
		loadSquad(owner);
	}, [pin, owner]);
	async function onAdd() {
		if (!name.trim()) return toast.error("Add the lad’s name.");
		setSaving(true);
		try {
			const res = await addDemoPlayer({ data: {
				pin,
				shirt: shirt.trim(),
				name: name.trim(),
				owner
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setShirt("");
			setName("");
			toast.success("Added to the demo squad.");
			await loadSquad();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not add player.");
		} finally {
			setSaving(false);
		}
	}
	function share(user) {
		sendWhatsApp(`${TEAM_NAME} demo`, demoWhatsAppText(user), link);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Demo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-7 text-muted",
				children: "Look only. Their squad never overwrites the Bulls."
			}),
			isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-4",
				children: DEMO_LOGINS.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-bg p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: user.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-fg",
							children: ["Code: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-bold tracking-widest",
								children: user.pin
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-2 whitespace-pre-wrap rounded-md border border-border p-2 text-xs text-fg",
							children: demoWhatsAppText(user)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-2 w-full",
							variant: "outline",
							onClick: () => share(user),
							children: ["WhatsApp ", user.name.split(" ")[0]]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-2 w-full",
							onClick: () => {
								setOwner(user.name);
								listDemoPlayers({ data: {
									pin,
									owner: user.name
								} }).then((res) => {
									if (res.ok) onViewDemo?.(user.name, res.players.map((p) => p.label));
								});
							},
							children: [
								"View ",
								user.name.split(" ")[0],
								"’s demo"
							]
						})
					]
				}, user.pin))
			}) : self ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-3 whitespace-pre-wrap rounded-lg border border-border bg-bg p-3 text-sm text-fg",
				children: demoWhatsAppText(DEMO_LOGINS.find((d) => d.name === coachName) || DEMO_LOGINS[0])
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg border border-border bg-bg p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-display text-base font-bold uppercase tracking-tight",
						children: self ? "Your squad" : `${owner}’s squad`
					}),
					isAdmin && !self ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "mt-2 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg",
						value: owner,
						onChange: (e) => setOwner(e.target.value),
						children: DEMO_LOGINS.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: u.name,
							children: u.name
						}, u.pin))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-2",
						children: squad.length ? squad.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-2 rounded-md border border-border p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: p.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "w-full",
								disabled: removing === p.id,
								onClick: () => void onDelete(p.id, p.label),
								children: removing === p.id ? "Deleting…" : "Delete lad"
							})]
						}, p.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "No lads yet. Add a number and a name."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "demo-shirt",
						className: "mt-3",
						children: "Shirt"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "demo-shirt",
						inputMode: "numeric",
						value: shirt,
						placeholder: "9",
						onChange: (e) => setShirt(e.target.value.replace(/\D/g, "").slice(0, 3)),
						className: "mb-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "demo-name",
						children: "Name"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "demo-name",
						value: name,
						placeholder: "Tom Smith",
						onChange: (e) => setName(e.target.value),
						className: "mb-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: () => void onAdd(),
						disabled: saving || !pin,
						children: saving ? "Adding…" : "Add player"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 flex flex-col gap-3",
				children: DEMO_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-bg p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-accent",
							children: [
								i + 1,
								". ",
								step.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-fg",
							children: step.try
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "mt-2 text-xs font-semibold uppercase tracking-wide text-accent",
							onClick: () => onOpenTab(step.tab),
							children: ["Open ", step.title]
						})
					]
				}, step.id))
			})
		]
	});
}
function SquadPanel({ players, pin, onPlayers }) {
	const [shirt, setShirt] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	async function onAdd() {
		if (!name.trim()) return toast.error("Add the lad’s name.");
		if (!pin.trim()) return toast.error("Unlock again with your coach PIN.");
		setBusy("add");
		try {
			const res = await addSquadPlayer({ data: {
				pin: pin.trim(),
				shirt: shirt.trim(),
				name: name.trim()
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			onPlayers(res.players);
			setShirt("");
			setName("");
			toast.success("Added to the squad.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not add.");
		} finally {
			setBusy(null);
		}
	}
	async function onDelete(player) {
		if (!pin.trim()) return toast.error("Unlock again with your coach PIN.");
		setBusy(player);
		try {
			const res = await removeSquadPlayer({ data: {
				pin: pin.trim(),
				player
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			onPlayers(res.players);
			toast.success(`${shortName(player)} removed from the squad.`);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not delete.");
		} finally {
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Squad"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Manager only. Delete a lad if they leave. Add a shirt number and name for a new one. Old votes stay in the history."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-4 flex flex-col gap-2",
				children: players.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 rounded-md border border-border p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: shortName(p)
						}),
						playerDob(p) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: [
								"DOB ",
								formatDob(playerDob(p)),
								playerAgeYears(p) != null ? ` · age ${playerAgeYears(p)}` : ""
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "w-full",
							disabled: busy === p,
							onClick: () => void onDelete(p),
							children: busy === p ? "Deleting…" : "Delete from squad"
						})
					]
				}, p))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "squad-shirt",
				children: "Shirt"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
				id: "squad-shirt",
				inputMode: "numeric",
				value: shirt,
				placeholder: "9",
				onChange: (e) => setShirt(e.target.value.replace(/\D/g, "").slice(0, 3)),
				className: "mb-2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
				htmlFor: "squad-name",
				children: "Name"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
				id: "squad-name",
				value: name,
				placeholder: "Tom Smith",
				onChange: (e) => setName(e.target.value),
				className: "mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: () => void onAdd(),
				disabled: busy === "add",
				children: busy === "add" ? "Adding…" : "Add player"
			})
		]
	});
}
var ACTION = {
	"login.ok": "Parent signed in",
	"login.fail": "Wrong family code",
	"clip.submit": "Clip sent to coach",
	"clip.assess": "Result sent to parent",
	"parent.codes.issue": "Family codes issued",
	"parent.code.set": "Family code changed",
	"vote.submit": "Votes submitted",
	"squad.add": "Player added",
	"squad.remove": "Player removed",
	"test.save": "Test saved"
};
function AuditLog({ coachPin }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!coachPin) return;
		listAudit({ data: { coachPin } }).then((d) => setRows(d.rows)).catch(() => setRows([]));
	}, [coachPin]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Audit log"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 mt-1 text-sm leading-7 text-muted",
				children: "Manager only. Who signed in, who sent a clip, who assessed it. Family codes are never stored here."
			}),
			!rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-7 text-muted",
				children: "Nothing logged yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-t border-border pt-3 text-sm leading-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: ACTION[row.action] || row.action
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: [
								row.at.replace("T", " ").slice(0, 16),
								row.actor ? ` · ${shortName(row.actor)}` : "",
								row.player ? ` · ${shortName(row.player)}` : ""
							]
						}),
						row.detail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted",
							children: row.detail
						}) : null
					]
				}, row.id))
			})
		]
	});
}
function storedCoachPin(fallback) {
	if (fallback.trim().length >= 4) return fallback.trim();
	if (typeof window === "undefined") return FALLBACK_PIN;
	return window.sessionStorage.getItem("bulls-coach-pin") || window.localStorage.getItem("bulls-coach-pin") || "0803";
}
function ParentLoginsPanel({ coachPin }) {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [manager, setManager] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function load() {
		try {
			const data = await listParentLogins({ data: { pin: coachPin } });
			setRows(data.rows);
			setManager(data.manager ?? null);
		} catch {
			setRows([]);
			setManager(null);
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [coachPin]);
	async function issue() {
		const pin = storedCoachPin(coachPin);
		setBusy(true);
		try {
			const res = await issueParentLogins({ data: { coachPin: pin } });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setRows(res.rows);
			setManager(res.manager ?? null);
			toast.success("Codes generated. Your view-all code is at the top.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not issue logins.");
		} finally {
			setBusy(false);
		}
	}
	async function save(row) {
		const pin = storedCoachPin(coachPin);
		const res = await setParentLogin({ data: {
			coachPin: pin,
			player: row.player,
			pin: row.pin,
			family: row.family
		} });
		if (!res.success) toast.error(res.error);
		else toast.success(`Saved ${shortName(row.player)}.`);
	}
	function share(row) {
		const origin = typeof window === "undefined" ? "" : window.location.origin;
		sendWhatsApp(`${TEAM_NAME} training`, trainingWhatsAppText(row.pin, shortName(row.player)), `${origin}/perf`);
	}
	function shareGroup() {
		const origin = typeof window === "undefined" ? "" : window.location.origin;
		sendWhatsApp(`${TEAM_NAME} training`, trainingWhatsAppText(), `${origin}/perf`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Parent logins"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 mt-1 text-sm leading-7 text-muted",
				children: "POINTS MAKE PRIZES. Generate a code, then Send training link. Parents open it, enter the code, train at home and get their points up."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mb-2 w-full",
				disabled: busy,
				onClick: () => void issue(),
				children: busy ? "Generating…" : "Generate family codes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mb-4 w-full",
				variant: "outline",
				onClick: shareGroup,
				children: "Send training link to the group"
			}),
			manager?.pin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border-2 border-accent bg-accent-soft p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wider text-accent",
						children: "Your view-all code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold",
						children: VIEW_ALL_FAMILY
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-4xl font-bold tracking-widest",
						children: manager.pin
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Enter this on Parent board or Performance to see every lad’s full marks. Keep it private."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => void save({
								...manager,
								player: VIEW_ALL_PLAYER,
								family: VIEW_ALL_FAMILY
							}),
							children: "Save"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								const origin = window.location.origin;
								sendWhatsApp(`${TEAM_NAME} manager view-all`, `Your view-all family code (Brian only).\nCode: ${manager.pin}\nOpen Parent board, enter this, pick any lad to see full marks.`, `${origin}/board`);
							},
							children: "Send to myself"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Generate codes to get your view-all PIN."
			}),
			rows.some((r) => r.pin) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 rounded-md border border-border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: shortName(row.player)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl font-bold tracking-widest",
							children: row.pin || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
							inputMode: "numeric",
							value: row.pin,
							placeholder: "4–8 numbers",
							onChange: (e) => {
								const pin = e.target.value.replace(/\D/g, "").slice(0, 8);
								setRows((list) => list.map((r) => r.player === row.player ? {
									...r,
									pin
								} : r));
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => void save(row),
								children: "Save"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: !row.pin,
								onClick: () => share(row),
								children: "Send training + code"
							})]
						})
					]
				}, row.player))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-7 text-muted",
				children: "No codes yet. Press Generate."
			})
		]
	});
}
function blankMarks(players) {
	return players.map((player) => ({
		player,
		attended: false,
		score: null,
		effort: null,
		attitude: null,
		achievement: null
	}));
}
function readTen(raw) {
	const t = raw.trim();
	if (t === "") return null;
	const n = Number(t);
	if (!Number.isFinite(n)) return null;
	return Math.min(10, Math.max(0, Math.round(n)));
}
function sessionLabel(date, label) {
	const day = formatKickoff(`${date}T12:00`, "EEE d MMM yyyy") || date;
	return label ? `${day} · ${label}` : day;
}
function TrainingPanel({ players, canSave = true }) {
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [sessionDate, setSessionDate] = (0, import_react.useState)(() => lastFridayStamp());
	const [label, setLabel] = (0, import_react.useState)(TRAINING_LABEL);
	const [marks, setMarks] = (0, import_react.useState)(() => blankMarks(players));
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function load() {
		try {
			const data = await getTraining();
			setSessions(mergeTraining(data.sessions));
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load training.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	(0, import_react.useEffect)(() => {
		const existing = sessions.find((s) => s.sessionDate === sessionDate);
		if (existing) {
			setLabel(existing.label);
			const byPlayer = /* @__PURE__ */ new Map();
			for (const m of existing.marks) byPlayer.set(matchSquadPlayer(players, m.player) || m.player, m);
			setMarks(players.map((player) => byPlayer.get(player) ?? {
				player,
				attended: false,
				score: null,
				effort: null,
				attitude: null,
				achievement: null
			}));
			return;
		}
		setLabel(TRAINING_LABEL);
		setMarks(blankMarks(players));
	}, [
		sessionDate,
		sessions,
		players
	]);
	const summary = (0, import_react.useMemo)(() => {
		const inSeason = sessions.filter((s) => s.sessionDate >= "2026-09-01" && s.sessionDate <= "2027-06-30");
		return summariseTraining(players, inSeason);
	}, [players, sessions]);
	const hereCount = marks.filter((m) => m.attended).length;
	function patch(player, next) {
		setMarks((rows) => rows.map((m) => m.player === player ? {
			...m,
			...next
		} : m));
	}
	async function onSave() {
		if (!canSave) {
			toast.error(SAVE_LOCK);
			return;
		}
		setSaving(true);
		try {
			const res = await saveTraining({ data: {
				sessionDate,
				label: label.trim(),
				marks: marks.map((m) => ({
					player: m.player,
					attended: m.attended,
					score: m.attended ? m.effort : null,
					effort: m.attended ? m.effort : null,
					attitude: m.attended ? m.attitude : null,
					achievement: m.attended ? m.achievement : null
				}))
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setSessions(res.sessions);
			writeLocalTraining(res.sessions);
			toast.success("Training saved. Parent board will pick it up on reload.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save training.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "This session"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-sm text-muted",
						children: [
							"Fridays at Laithwaite Park. ",
							TRAINING_MARKS_INTRO,
							" Each Friday is saved; pick the next date for the following week. Season tally stays in the log."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mb-3 flex flex-col gap-1 text-sm text-fg",
						children: TRAINING_MARKS_LOSE.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• ", line] }, line))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mb-4 w-full",
						variant: "outline",
						onClick: () => {
							const origin = window.location.origin;
							sendWhatsApp(`${TEAM_NAME} training`, trainingWhatsAppText(), `${origin}/perf`);
						},
						children: "Send training link on WhatsApp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "train-date",
						children: "Date of training"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "train-date",
						type: "date",
						className: "mb-3",
						value: sessionDate,
						onChange: (e) => setSessionDate(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm font-semibold text-fg",
						children: sessionLabel(sessionDate, label)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "train-label",
						children: "Label (optional)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "train-label",
						className: "mb-3",
						placeholder: TRAINING_LABEL,
						value: label,
						onChange: (e) => setLabel(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted",
							children: [
								hereCount,
								"/",
								players.length,
								" in"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs font-semibold uppercase tracking-wide text-accent",
								onClick: () => setMarks((rows) => rows.map((m) => ({
									...m,
									attended: true
								}))),
								children: "All in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs font-semibold uppercase tracking-wide text-muted",
								onClick: () => setMarks((rows) => rows.map((m) => ({
									...m,
									attended: false,
									score: null,
									effort: null,
									attitude: null,
									achievement: null
								}))),
								children: "None"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: marks.map((m) => {
							const total = m.attended ? trainingTotal(m) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-elevated p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => patch(m.player, {
											attended: !m.attended,
											effort: !m.attended ? m.effort : null,
											attitude: !m.attended ? m.attitude : null,
											achievement: !m.attended ? m.achievement : null,
											score: !m.attended ? m.effort : null
										}),
										className: cn("flex h-11 w-full items-center justify-between rounded-md border px-3 text-left text-sm", m.attended ? "border-accent bg-accent-soft font-semibold text-fg" : "border-border bg-bg text-muted"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shortName(m.player) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-wide",
											children: m.attended ? "In" : "Out"
										})]
									}),
									m.attended ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 grid grid-cols-2 gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
												children: "Attendance · /10"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "flex h-11 items-center justify-center rounded-md border border-border bg-bg font-display text-lg font-bold tabular-nums",
												children: 10
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TenField, {
												label: "Effort",
												value: m.effort,
												onChange: (v) => patch(m.player, {
													effort: v,
													score: v
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TenField, {
												label: "Attitude",
												value: m.attitude,
												onChange: (v) => patch(m.player, { attitude: v })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TenField, {
												label: "Achievement",
												value: m.achievement,
												onChange: (v) => patch(m.player, { achievement: v })
											})
										]
									}) : null,
									m.attended ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 flex h-11 items-center justify-between rounded-md border border-border bg-bg px-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted",
											children: "Total · attendance + marks"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-lg font-bold tabular-nums",
											children: total === null ? "—" : `${total} / 40`
										})]
									}) : null
								]
							}, m.player);
						})
					}),
					canSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						onClick: () => void onSave(),
						disabled: saving,
						children: saving ? "Saving…" : "Save training"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: SAVE_LOCK
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 font-display text-lg font-bold uppercase tracking-tight",
				children: "Logged sessions"
			}), !sessions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "No sessions logged yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-4 space-y-1",
				children: sessions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: cn("flex h-11 w-full items-center justify-between rounded-md border px-3 text-left text-sm", s.sessionDate === sessionDate ? "border-accent bg-accent-soft font-semibold" : "border-border bg-surface"),
					onClick: () => setSessionDate(s.sessionDate),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sessionLabel(s.sessionDate, s.label) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted",
						children: [s.marks.filter((m) => m.attended).length, " in"]
					})]
				}) }, s.sessionDate))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1 font-display text-lg font-bold uppercase tracking-tight",
					children: "Season training · overall"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: "Whole season, 1 Sep 2026 to 30 Jun 2027. Averages of every Friday so far. This does not reset today. The new player-of-the-month table is separate and runs from 22 Sep to the 3rd Monday."
				}),
				!sessions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Averages appear after you save a session."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1",
								children: "Player"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "In"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Eff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Att"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Ach"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Tot"
							})
						]
					}), summary.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 border-t border-border px-3 py-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate font-medium",
								children: shortName(row.player)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: [
									row.attended,
									"/",
									row.sessions || "–"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.avgEffort === null ? "—" : row.avgEffort.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.avgAttitude === null ? "—" : row.avgAttitude.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.avgAchievement === null ? "—" : row.avgAchievement.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums font-semibold",
								children: row.avgTotal === null ? "—" : row.avgTotal.toFixed(1)
							})
						]
					}, row.player))]
				})
			] })
		]
	});
}
function TenField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
			children: [label, " · /10"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
			inputMode: "numeric",
			min: 0,
			max: 10,
			placeholder: "—",
			value: value === null ? "" : String(value),
			onChange: (e) => onChange(readTen(e.target.value))
		})]
	});
}
function EqualTime({ formation, lineup, mins, minute }) {
	const pitchSlots = formationById(formation).slots.filter((s) => s.id !== "GK").length;
	const names = /* @__PURE__ */ new Set();
	for (const slot of formationById(formation).slots) if (lineup[slot.id]) names.add(lineup[slot.id]);
	for (const id of SUB_SLOTS) if (lineup[id]) names.add(lineup[id]);
	for (const player of Object.keys(mins)) names.add(player);
	const keepers = [...names].filter((p) => isKeeper(p));
	const outfield = [...names].filter((p) => !isKeeper(p));
	const target = outfield.length && minute > 0 ? Math.round(pitchSlots * minute / outfield.length) : 0;
	const ranked = outfield.map((player) => {
		const row = mins[player] ?? {
			minutes: 0,
			started: false,
			on: false
		};
		return {
			player,
			...row,
			gap: row.minutes - target
		};
	}).sort((a, b) => a.minutes - b.minutes || a.player.localeCompare(b.player));
	const takeOff = ranked.filter((r) => r.on && r.gap >= 3).sort((a, b) => b.gap - a.gap)[0];
	const bringOn = ranked.filter((r) => !r.on && r.gap <= -3).sort((a, b) => a.gap - b.gap)[0];
	const maxMin = Math.max(target, ...ranked.map((r) => r.minutes), 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-ok bg-elevated p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Fair game time"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 text-xs text-muted",
				children: ["At least half a game each, where possible. Keepers play the full game. A good attitude helps us share minutes fairly.", target > 0 ? ` Target now ${target}′.` : " Starts when the clock runs."]
			}),
			keepers.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mb-3",
				children: keepers.map((player) => {
					const row = mins[player];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-md bg-bg px-2 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [shortName(player), " · keeper"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-bold uppercase tracking-wide text-ok",
							children: ["Full game", row?.minutes ? ` · ${row.minutes}′` : ""]
						})]
					}, player);
				})
			}) : null,
			takeOff || bringOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 rounded-md border border-accent px-2 py-2 text-sm font-semibold",
				children: [bringOn ? `Bring on ${shortName(bringOn.player)}` : "Hold", takeOff ? ` · take off ${shortName(takeOff.player)}` : ""]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-muted",
				children: "Times look even."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: ranked.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-0.5 flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [shortName(row.player), row.on ? " · on" : " · off"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold",
						children: [
							row.minutes,
							"′",
							target ? ` / ${target}′` : ""
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-bg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("h-full rounded-full", row.gap >= 3 ? "bg-accent" : row.gap <= -3 ? "bg-ok" : "bg-fg"),
						style: { width: `${Math.min(100, row.minutes / maxMin * 100)}%` }
					})
				})] }, row.player))
			})
		]
	});
}
var FluentPitch = (0, import_react.memo)(function FluentPitch({ formation, lineup, kit, players, onFormation, onDrop, onPlace, disabled = false, minutes }) {
	const squad = players.length ? players : [...PLAYERS];
	const shape = formationById(formation);
	const taken = Object.values(lineup).filter(Boolean);
	const drag = (0, import_react.useRef)(null);
	const [ghost, setGhost] = (0, import_react.useState)(null);
	const [over, setOver] = (0, import_react.useState)(null);
	const [pickSlot, setPickSlot] = (0, import_react.useState)(null);
	const subs = SUB_SLOTS.map((id, i) => ({
		id,
		label: `Sub ${i + 1}`
	}));
	const reserves = RESERVE_SLOTS.map((id, i) => ({
		id,
		label: `Res ${i + 1}`
	}));
	const injured = INJURED_SLOTS.map((id, i) => ({
		id,
		label: `Inj ${i + 1}`
	}));
	const unavailable = UNAVAILABLE_SLOTS.map((id, i) => ({
		id,
		label: `Out ${i + 1}`
	}));
	function slotAt(x, y) {
		return (document.elementFromPoint(x, y)?.closest?.("[data-pitch-slot]"))?.dataset.pitchSlot || null;
	}
	function onPointerDown(e, slotId) {
		if (disabled) return;
		if (e.button !== 0) return;
		e.currentTarget.setPointerCapture(e.pointerId);
		drag.current = {
			from: slotId,
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			active: false
		};
	}
	function onPointerMove(e) {
		const d = drag.current;
		if (!d || d.pointerId !== e.pointerId) return;
		const player = lineup[d.from];
		if (!player) return;
		const dx = e.clientX - d.startX;
		const dy = e.clientY - d.startY;
		if (!d.active && dx * dx + dy * dy < 64) return;
		d.active = true;
		e.preventDefault();
		setGhost({
			player,
			x: e.clientX,
			y: e.clientY,
			from: d.from
		});
		const next = slotAt(e.clientX, e.clientY);
		setOver(next && next !== d.from ? next : null);
	}
	function onPointerUp(e) {
		const d = drag.current;
		if (!d || d.pointerId !== e.pointerId) return;
		drag.current = null;
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {}
		if (d.active) {
			const to = slotAt(e.clientX, e.clientY);
			if (to && to !== d.from) onDrop(d.from, to);
			setGhost(null);
			setOver(null);
			return;
		}
		setGhost(null);
		setOver(null);
		setPickSlot(d.from);
	}
	function shirt(slotId, label) {
		const lad = lineup[slotId] ?? "";
		const dragging = ghost?.from === slotId;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-pitch-slot": slotId,
			onPointerDown: (e) => onPointerDown(e, slotId),
			onPointerMove,
			onPointerUp,
			onPointerCancel: onPointerUp,
			className: cn("flex min-h-16 min-w-14 touch-none select-none flex-col items-center justify-center", over === slotId ? "rounded-lg ring-2 ring-yellow-300" : "", dragging ? "opacity-40" : "", disabled ? "pointer-events-none opacity-60" : "cursor-grab"),
			children: lad ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitGraphic, {
					kit,
					number: parsePlayer(lad).num || void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "max-w-[4.6rem] text-center font-display text-[10px] font-bold uppercase leading-tight tracking-wide text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]",
					children: pitchSurname(lad, squad)
				}),
				minutes?.[lad] !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-white [text-shadow:_0_1px_2px_#000]",
					children: [minutes[lad], "′"]
				}) : null
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-md border border-white/50 bg-black/25 px-1.5 py-1 text-center text-[10px] font-bold uppercase tracking-wide text-white",
				children: label
			})
		});
	}
	function benchRow(title, slots) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-widest text-fg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
				children: slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex min-h-24 flex-col items-center justify-center rounded-lg border-2 bg-elevated px-1 py-2", over === slot.id ? "border-yellow-300" : "border-border"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs font-semibold uppercase tracking-wide text-muted",
						children: slot.label
					}), shirt(slot.id, slot.label)]
				}, slot.id))
			})]
		});
	}
	const pickLad = pickSlot ? lineup[pickSlot] ?? "" : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: FORMATIONS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled,
					onClick: () => onFormation(f.id),
					className: cn("h-10 shrink-0 rounded-md px-3 text-xs font-semibold uppercase tracking-wide", f.id === formation ? "bg-[#b42318] text-white" : "border border-border bg-bg text-muted"),
					children: f.name
				}, f.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-visible rounded-xl border-2 border-white/25 bg-ok",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchGrass, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-[5%] top-[8%] bottom-0",
					children: shape.slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
						style: {
							left: `${slot.x}%`,
							top: `${slot.y}%`
						},
						children: shirt(slot.id, slot.label)
					}, slot.id))
				})]
			}),
			benchRow("Subs", subs),
			benchRow("Reserves", reserves),
			benchRow("Injured", injured),
			benchRow("Unavailable", unavailable),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Slide a shirt to swap. Tap a shirt to pick a player."
			}),
			pickSlot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
				hideTrigger: true,
				open: true,
				kit,
				label: pickSlot,
				value: pickLad,
				onChange: (next) => {
					onPlace?.(pickSlot, next);
					setPickSlot(null);
				},
				onOpenChange: (next) => {
					if (!next) setPickSlot(null);
				},
				players: squad,
				exclude: taken.filter((p) => p !== pickLad),
				placeholder: "Select player…"
			}) : null,
			ghost && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed z-[80] -translate-x-1/2 -translate-y-1/2",
				style: {
					left: ghost.x,
					top: ghost.y
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center drop-shadow-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitGraphic, {
						kit,
						number: parsePlayer(ghost.player).num || void 0
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[10px] font-bold uppercase text-white [text-shadow:_-1px_-1px_0_#000,_1px_1px_0_#000]",
						children: pitchSurname(ghost.player, squad)
					})]
				})
			}), document.body) : null
		]
	});
});
function PitchGrass() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 70 105",
		className: "block w-full text-fg",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "0",
				y: "0",
				width: "70",
				height: "105",
				className: "fill-ok"
			}),
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "35",
				cy: "52.5",
				r: "0.7",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "2",
				width: "34",
				height: "14",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "18",
				y: "89",
				width: "34",
				height: "14",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "0.5"
			})
		]
	});
}
function StintTally({ stints, minute, ended }) {
	if (!stints.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Who, where and when appears once the clock is running."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-72 text-left text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "text-xs uppercase tracking-wider text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2",
						children: "Lad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2",
						children: "Where"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2",
						children: "On"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 pr-2",
						children: "Off"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2",
						children: "Mins"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: stints.map((stint) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-2 font-semibold",
						children: shortName(stint.player)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-2",
						children: SLOT_NAMES[stint.slotId] || stint.slotId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-2 pr-2",
						children: [stint.onMinute, "′"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 pr-2",
						children: stint.offMinute === null ? ended ? `${minute}′` : "on" : `${stint.offMinute}′`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-2 font-semibold",
						children: [stintMinutes(stint, minute, ended), "′"]
					})
				]
			}, stint.id)) })]
		})
	});
}
var gameKey = object({
	opposition: string().trim().min(1).max(80),
	kickoff: string().trim().min(1).max(24)
});
var getLiveMatch = createServerFn({ method: "POST" }).validator(gameKey).handler(createSsrRpc("10b78cb9f0ac920ea74ec7e5e3d336d9328e4e2952ba4799ee772f05227a9897"));
var getAllMinutes = createServerFn({ method: "POST" }).handler(createSsrRpc("b1a8a7db31b5635ebc3c696a3b05be7101e1ea4bbaa3e42341675d1e43ceac13"));
var startLive = createServerFn({ method: "POST" }).validator(gameKey.extend({
	formation: string().trim().min(1).max(20),
	lineup: record(string(), string())
})).handler(createSsrRpc("0ba188fd228e666faba702dfebe18f10fdb34eb4733cf42864382931da05ad01"));
var pauseLive = createServerFn({ method: "POST" }).validator(gameKey).handler(createSsrRpc("8379976b0ed6dbb99fef817e4fcaca9106489933897ecff1c36b901b6463ecda"));
var resumeLive = createServerFn({ method: "POST" }).validator(gameKey).handler(createSsrRpc("e37748175468315031130692acb336a22b18721b8bedd06d5477e92b0f6b896f"));
var secondHalfLive = createServerFn({ method: "POST" }).validator(gameKey).handler(createSsrRpc("ca9b0bdd986da4568b26eb63f498e532c0c0a44524647248a6946e2f399e2824"));
var fullTimeLive = createServerFn({ method: "POST" }).validator(gameKey).handler(createSsrRpc("c5e8f8e2b93408f7c5fa5a2531e07e5ddf320e13d3100541f5cd8e2b2f4f1a77"));
var liveSub = createServerFn({ method: "POST" }).validator(gameKey.extend({
	offPlayer: string().trim().min(1),
	onPlayer: string().trim().min(1)
})).handler(createSsrRpc("9e170bc821f5c5805f6607e218b26ebbaf12fb960a2903268133115790076193"));
var liveMove = createServerFn({ method: "POST" }).validator(gameKey.extend({
	player: string().trim().min(1),
	toSlot: string().trim().min(1).max(12)
})).handler(createSsrRpc("15f7c17fbc922bbd554522b6761918a42c9610704befc5345b2ed7310558ea2e"));
var liveOff = createServerFn({ method: "POST" }).validator(gameKey.extend({
	player: string().trim().min(1),
	toSlot: string().trim().min(1).max(12)
})).handler(createSsrRpc("eec0cf2ae60ba71cbd665c53b8df485f2330ba42c0ef5451eef61550c3ca30f7"));
var liveOn = createServerFn({ method: "POST" }).validator(gameKey.extend({
	player: string().trim().min(1),
	toSlot: string().trim().min(1).max(12)
})).handler(createSsrRpc("95bad6a1b1748befc8ab5ce8934cd0dcfb25d75765a1ea7f6885809d728c767b"));
var liveFormation = createServerFn({ method: "POST" }).validator(gameKey.extend({ formation: string().trim().min(1).max(20) })).handler(createSsrRpc("a55442593ef95476683289653ec1a5b4b7a0b083dc394f9d8a7217eef34eaa75"));
var resetLive = createServerFn({ method: "POST" }).validator(gameKey).handler(createSsrRpc("8fbb2c4d124ba06e4e8891ddc152d5b867f9a0a6bfe3324771e5fbaef4bbbf45"));
var liveBench = createServerFn({ method: "POST" }).validator(gameKey.extend({
	slotId: string().trim().min(1).max(12),
	player: string().trim().max(80)
})).handler(createSsrRpc("0194d38fff5bb2278d06f5bc59c37a5a6c8ca91b958431a3a91f3ba5b2b255b7"));
function LiveMatch({ players, opposition, kickoff, formation, lineup, kit, onPlanFormation, onPlanDrop, onPlanPlace, canSave = true }) {
	const [live, setLive] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [busy, setBusy] = (0, import_react.useState)(false);
	const key = `${opposition}|${kickoff}`;
	async function load() {
		try {
			const data = await getLiveMatch({ data: {
				opposition,
				kickoff
			} });
			setLive(data.live);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load live game.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, [key]);
	(0, import_react.useEffect)(() => {
		if (!live?.clock.running) return;
		const t = setInterval(() => setNow(Date.now()), 1e3);
		return () => clearInterval(t);
	}, [live?.clock.running, live?.clock.startedAt]);
	const clock = live?.clock ?? {
		startedAt: null,
		elapsedMs: 0,
		running: false,
		ended: false,
		half: 1,
		halfMarkMs: 0
	};
	const elapsed = clockElapsedMs(clock, now);
	const minute = gameMinute(clock, now);
	const half = clock.half === 2 ? 2 : 1;
	const shape = formationById(live?.formation ?? formation);
	const onPitchLineup = live?.lineup ?? lineup;
	const mins = (0, import_react.useMemo)(() => playerMinutes(live?.stints ?? [], minute, clock.ended), [
		live?.stints,
		minute,
		clock.ended
	]);
	const minuteMap = (0, import_react.useMemo)(() => Object.fromEntries(Object.entries(mins).map(([p, row]) => [p, row.minutes])), [mins]);
	const game = {
		opposition,
		kickoff
	};
	async function run(fn) {
		if (!canSave) return;
		setBusy(true);
		try {
			const data = await fn();
			setLive((prev) => {
				const next = data.live;
				if (!next) return next;
				if (next.clock.running && !next.clock.startedAt && prev?.clock.startedAt) return {
					...next,
					clock: {
						...next.clock,
						startedAt: prev.clock.startedAt
					}
				};
				return next;
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not update the game.");
		} finally {
			setBusy(false);
		}
	}
	function startClock() {
		const startedAt = (/* @__PURE__ */ new Date()).toISOString();
		setNow(Date.now());
		setLive((cur) => ({
			opposition,
			kickoff,
			formation: cur?.formation ?? formation,
			lineup: cur?.lineup ?? lineup,
			clock: {
				startedAt,
				elapsedMs: cur?.clock.elapsedMs ?? 0,
				running: true,
				ended: false,
				half: cur?.clock.half ?? 1,
				halfMarkMs: cur?.clock.halfMarkMs ?? 0
			},
			stints: cur?.stints ?? [],
			shapes: cur?.shapes ?? []
		}));
		run(() => startLive({ data: {
			...game,
			formation,
			lineup
		} }));
	}
	function pauseClock() {
		setLive((cur) => cur ? {
			...cur,
			clock: {
				...cur.clock,
				running: false,
				elapsedMs: clockElapsedMs(cur.clock, Date.now()),
				startedAt: null
			}
		} : cur);
		run(() => pauseLive({ data: game }));
	}
	function resumeClock() {
		const startedAt = (/* @__PURE__ */ new Date()).toISOString();
		setNow(Date.now());
		setLive((cur) => cur ? {
			...cur,
			clock: {
				...cur.clock,
				running: true,
				startedAt,
				ended: false
			}
		} : cur);
		run(() => resumeLive({ data: game }));
	}
	function secondHalf() {
		setLive((cur) => cur ? {
			...cur,
			clock: {
				...cur.clock,
				running: false,
				elapsedMs: clockElapsedMs(cur.clock, Date.now()),
				startedAt: null,
				half: 2,
				halfMarkMs: clockElapsedMs(cur.clock, Date.now())
			}
		} : cur);
		run(() => secondHalfLive({ data: game }));
	}
	const pitchIds = new Set(shape.slots.map((s) => s.id));
	function onDrop(from, to) {
		const a = onPitchLineup[from];
		const b = onPitchLineup[to];
		if (!a) return;
		if (!canSave) {
			onPlanDrop(from, to);
			setLive((cur) => {
				if (!cur) return cur;
				const next = { ...cur.lineup };
				if (b) next[from] = b;
				else delete next[from];
				next[to] = a;
				return {
					...cur,
					lineup: next
				};
			});
			return;
		}
		const fromPitch = pitchIds.has(from);
		const toPitch = pitchIds.has(to);
		if (fromPitch && toPitch) {
			run(() => liveMove({ data: {
				...game,
				player: a,
				toSlot: to
			} }));
			return;
		}
		if (fromPitch && !toPitch) {
			if (b) run(() => liveSub({ data: {
				...game,
				offPlayer: a,
				onPlayer: b
			} }));
			else run(() => liveOff({ data: {
				...game,
				player: a,
				toSlot: to
			} }));
			return;
		}
		if (!fromPitch && toPitch) {
			if (b) run(() => liveSub({ data: {
				...game,
				offPlayer: b,
				onPlayer: a
			} }));
			else run(() => liveOn({ data: {
				...game,
				player: a,
				toSlot: to
			} }));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Match day"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted",
				children: "Slide a shirt onto another shirt or a sub box. Tap a shirt to pick. Tap a shape chip to change formation."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border-2 border-accent bg-black px-4 py-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchClock, { clock }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap justify-center gap-2",
						children: [
							!clock.running && !clock.ended && elapsed === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: busy,
								onClick: startClock,
								children: "Start"
							}) : null,
							clock.running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: busy,
								variant: "outline",
								onClick: pauseClock,
								children: "Pause"
							}) : null,
							live && !clock.running && !clock.ended && elapsed > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: busy,
								onClick: resumeClock,
								children: "Resume"
							}) : null,
							live && !clock.ended && half === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: busy,
								variant: "outline",
								onClick: secondHalf,
								children: "2nd half"
							}) : null,
							live && !clock.ended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: busy,
								variant: "outline",
								onClick: () => void run(() => fullTimeLive({ data: game })),
								children: "Full time"
							}) : null,
							live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								disabled: busy,
								variant: "ghost",
								onClick: () => {
									if (!globalThis.confirm("Reset this game clock and minutes?")) return;
									run(() => resetLive({ data: game }));
								},
								children: "Reset"
							}) : null
						]
					}),
					clock.ended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-semibold",
						children: "Full time."
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FluentPitch, {
				formation: live?.formation ?? formation,
				lineup: live?.lineup ?? lineup,
				kit,
				players,
				disabled: busy || clock.ended,
				minutes: minuteMap,
				onFormation: (id) => {
					if (!canSave) {
						onPlanFormation(id);
						setLive((cur) => cur ? {
							...cur,
							formation: id
						} : cur);
						return;
					}
					if (live) run(() => liveFormation({ data: {
						...game,
						formation: id
					} }));
					else onPlanFormation(id);
				},
				onPlace: (slotId, player) => {
					onPlanPlace(slotId, player);
					if (!canSave || !live) {
						if (!canSave) setLive((cur) => cur ? {
							...cur,
							lineup: player ? {
								...cur.lineup,
								[slotId]: player
							} : Object.fromEntries(Object.entries(cur.lineup).filter(([k]) => k !== slotId))
						} : cur);
						return;
					}
					if (pitchIds.has(slotId)) {
						const occupant = onPitchLineup[slotId];
						if (occupant && player && occupant !== player) {
							run(() => liveSub({ data: {
								...game,
								offPlayer: occupant,
								onPlayer: player
							} }));
							return;
						}
						if (player && !occupant) {
							run(() => liveOn({ data: {
								...game,
								player,
								toSlot: slotId
							} }));
							return;
						}
						if (occupant && !player) {
							const emptyBench = [...SUB_SLOTS].find((id) => !onPitchLineup[id]) ?? "SUB1";
							run(() => liveOff({ data: {
								...game,
								player: occupant,
								toSlot: emptyBench
							} }));
							return;
						}
						return;
					}
					run(() => liveBench({ data: {
						...game,
						slotId,
						player
					} }));
				},
				onDrop: (from, to) => {
					onPlanDrop(from, to);
					if (live) onDrop(from, to);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EqualTime, {
					formation: live?.formation ?? formation,
					lineup: live?.lineup ?? lineup,
					mins,
					minute
				})
			}),
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mt-5 font-display text-lg font-bold uppercase tracking-tight",
					children: "Who · where · when"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs text-muted",
					children: "Every spell on the pitch this game."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StintTally, {
					stints: live.stints,
					minute,
					ended: clock.ended
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mt-5 font-display text-lg font-bold uppercase tracking-tight",
					children: "Minutes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-border",
					children: Object.entries(mins).sort((a, b) => b[1].minutes - a[1].minutes).map(([player, row]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							shortName(player),
							row.on ? " · on" : "",
							row.started ? " · started" : ""
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold",
							children: [row.minutes, " min"]
						})]
					}, player))
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Subs from the plan show on the bench above. Hit Start, then slide them on and off."
			})
		]
	});
}
function MatchClock({ clock }) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!clock.running) return;
		const t = setInterval(() => setNow(Date.now()), 250);
		return () => clearInterval(t);
	}, [clock.running, clock.startedAt]);
	const elapsed = clockElapsedMs(clock, now);
	const minute = gameMinute(clock, now);
	const half = clock.half === 2 ? 2 : 1;
	const face = matchFace(elapsed, half, clock.halfMarkMs);
	const shown = formatClock(face.displayMs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-widest text-fg",
			children: half === 1 ? "1st half · 0 to 30" : "2nd half · 30 to 60"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 font-display text-7xl font-bold leading-none tracking-tight text-white tabular-nums",
			children: [
				shown.slice(0, 2),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: clock.running ? "text-accent animate-pulse" : "text-accent",
					children: ":"
				}),
				shown.slice(3)
			]
		}),
		face.inExtra ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 font-display text-4xl font-bold tabular-nums text-accent",
			children: [
				face.extraLabel,
				" ",
				formatInjury(face.extraMs)
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm font-semibold text-fg",
			children: [
				"Minute ",
				minute,
				" · 60 min plus extra"
			]
		}),
		face.inExtra && !clock.ended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm font-bold text-accent",
			children: half === 1 ? "Injury time — then 2nd half" : "Overtime — then full time"
		}) : null
	] });
}
var statShape = Object.fromEntries(MATCH_STAT_FIELDS.map((f) => [f.key, number$1().int().min(0).max(30)]));
var playerStatInput = object({
	player: string().trim().min(1),
	...statShape
});
var getMatchStats = createServerFn({ method: "POST" }).handler(createSsrRpc("2cf931b3d4692a47ff956fc1f5589fe4baae4c9d91be90a6e493cb9f87708d76"));
var saveMatchStats = createServerFn({ method: "POST" }).validator(object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	goalsFor: number$1().int().min(0).max(30),
	goalsAgainst: number$1().int().min(0).max(30),
	notes: string().trim().max(400),
	stats: array(playerStatInput).max(30)
})).handler(createSsrRpc("796819d44e97fec3676e493cff23c67b44b2bb0e899aa97813e81bf746c0e768"));
function named(stats, key) {
	return stats.filter((s) => s[key] > 0).sort((a, b) => b[key] - a[key]).map((s) => {
		const n = s[key];
		const name = parsePlayer(s.player).name;
		return n > 1 ? `${name} ${n}` : name;
	}).join(", ");
}
function MatchStatsPanel({ players, currentMatch, appearances, fixtureOpposition, canSave = true }) {
	const [gameNumber, setGameNumber] = (0, import_react.useState)(currentMatch?.gameNumber ?? "");
	const [opposition, setOpposition] = (0, import_react.useState)(currentMatch?.opposition ?? fixtureOpposition ?? "");
	const [goalsFor, setGoalsFor] = (0, import_react.useState)(0);
	const [goalsAgainst, setGoalsAgainst] = (0, import_react.useState)(0);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [rows, setRows] = (0, import_react.useState)([]);
	const [results, setResults] = (0, import_react.useState)([]);
	const [openPlayer, setOpenPlayer] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const played = appearances[gameKey$1(gameNumber.trim(), opposition.trim())] ?? [];
	const squad = played.length ? played : players;
	async function load() {
		try {
			const data = await getMatchStats();
			setResults(data.results);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load match stats.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	(0, import_react.useEffect)(() => {
		if (fixtureOpposition) setOpposition(fixtureOpposition);
	}, [fixtureOpposition]);
	(0, import_react.useEffect)(() => {
		const existing = results.find((r) => r.gameNumber.toLowerCase() === gameNumber.trim().toLowerCase() && r.opposition.toLowerCase() === opposition.trim().toLowerCase());
		if (existing) {
			setGoalsFor(existing.goalsFor);
			setGoalsAgainst(existing.goalsAgainst);
			setNotes(existing.notes);
			setRows(squad.map((p) => existing.stats.find((s) => s.player === p) ?? emptyStats(p)));
			return;
		}
		setGoalsFor(0);
		setGoalsAgainst(0);
		setNotes("");
		setRows(squad.map((p) => emptyStats(p)));
	}, [
		gameNumber,
		opposition,
		results,
		squad.join("|")
	]);
	function patch(player, key, value) {
		setRows((cur) => cur.map((row) => row.player === player ? {
			...row,
			[key]: Math.max(0, value)
		} : row));
	}
	async function onSave() {
		if (!canSave) {
			toast.error(SAVE_LOCK);
			return;
		}
		if (!gameNumber.trim() || !opposition.trim()) {
			toast.error("Enter the round and opposition first.");
			return;
		}
		setSaving(true);
		try {
			await saveMatchStats({ data: {
				gameNumber: gameNumber.trim(),
				opposition: opposition.trim(),
				goalsFor,
				goalsAgainst,
				notes,
				stats: rows.filter(hasAnyStat)
			} });
			toast.success("Match stats saved.");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save match stats.");
		} finally {
			setSaving(false);
		}
	}
	const tally = (0, import_react.useMemo)(() => seasonTally(players, results), [players, results]);
	const gfFromPlayers = rows.reduce((n, r) => n + r.goals, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "This match"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Result, scorers, assists, tackles, saves. Same screen as the pitch. Coach only."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 rounded-lg border border-border bg-bg px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-semibold uppercase tracking-wider text-accent",
							children: "What the letters mean"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "flex flex-col gap-2",
							children: [MATCH_STAT_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-10 shrink-0 font-display text-base font-bold uppercase text-fg",
									children: f.short
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [f.label, "."]
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: f.meaning
										})
									]
								})]
							}, f.key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "w-10 shrink-0 font-display text-base font-bold uppercase text-fg",
									children: "G A T S"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "min-w-0 text-muted",
									children: "On each name: Goals · Assists · Tackles · Saves — tap the name for the rest."
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "stats-round",
						children: "Round / game"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "stats-round",
						value: gameNumber,
						onChange: (e) => setGameNumber(e.target.value),
						className: "mb-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "stats-opp",
						children: "Opposition"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "stats-opp",
						value: opposition,
						onChange: (e) => setOpposition(e.target.value),
						className: "mb-3"
					}),
					currentMatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mb-3 text-xs font-semibold uppercase tracking-wide text-accent",
						onClick: () => {
							setGameNumber(currentMatch.gameNumber);
							setOpposition(currentMatch.opposition);
						},
						children: "Use posted match"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
								children: "Bulls"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: String(goalsFor),
								onChange: (e) => setGoalsFor(Math.max(0, Number(e.target.value) || 0))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
								children: "Them"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
								inputMode: "numeric",
								value: String(goalsAgainst),
								onChange: (e) => setGoalsAgainst(Math.max(0, Number(e.target.value) || 0))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 font-display text-3xl font-bold uppercase tracking-tight",
						children: [
							goalsFor,
							"–",
							goalsAgainst
						]
					}),
					gfFromPlayers !== goalsFor && gfFromPlayers > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-xs text-accent",
						children: [
							"Player goals add up to ",
							gfFromPlayers,
							". Scoreline is ",
							goalsFor,
							"."
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "stats-notes",
						children: "Match note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
						id: "stats-notes",
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						className: "mb-4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted",
						children: "Player stats"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: rows.map((row) => {
							const open = openPlayer === row.player;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-bg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex w-full items-center justify-between gap-2 px-3 py-3 text-left",
									onClick: () => setOpenPlayer(open ? null : row.player),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-sm font-semibold",
										children: shortName(row.player)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "shrink-0 text-xs tabular-nums text-muted",
										children: [
											row.goals,
											" G · ",
											row.assists,
											" A · ",
											row.tackles,
											" T · ",
											row.saves,
											" S"
										]
									})]
								}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2 border-t border-border px-3 py-3",
									children: MATCH_STAT_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatStep, {
										label: f.short,
										hint: f.label,
										value: row[f.key],
										onChange: (v) => patch(row.player, f.key, v)
									}, f.key))
								}) : null]
							}, row.player);
						})
					}),
					canSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						onClick: () => void onSave(),
						disabled: saving,
						children: saving ? "Saving…" : "Save match stats"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: SAVE_LOCK
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold uppercase tracking-tight",
					children: "Results log"
				}), !results.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Save a match to start the log."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-col gap-2",
					children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "w-full rounded-lg border border-border bg-bg px-3 py-3 text-left",
						onClick: () => {
							setGameNumber(r.gameNumber);
							setOpposition(r.opposition);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold",
								children: [
									r.gameNumber,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: ["vs ", r.opposition]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 font-display text-lg font-bold",
										children: [
											r.goalsFor,
											"–",
											r.goalsAgainst
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted",
								children: ["Scorers: ", named(r.stats, "goals") || "—"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: ["Assists: ", named(r.stats, "assists") || "—"]
							})
						]
					}) }, `${r.gameNumber}|${r.opposition}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 font-display text-lg font-bold uppercase tracking-tight",
				children: "Season tally"
			}), !tally.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Totals appear after you save a match."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-max min-w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-28 flex-1",
							children: "Player"
						}), MATCH_STAT_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 text-right",
							children: f.short
						}, f.key))]
					}), tally.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 border-t border-border px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-28 flex-1 truncate",
							children: parsePlayer(row.player).name
						}), MATCH_STAT_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-8 text-right tabular-nums text-muted",
							children: row[f.key] || "—"
						}, f.key))]
					}, row.player))]
				})
			})] })
		]
	});
}
function StatStep({ label, hint, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1 text-center text-xs font-semibold uppercase tracking-wider text-muted",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-11 items-center overflow-hidden rounded-md border border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex h-11 w-9 items-center justify-center text-lg text-muted",
					onClick: () => onChange(value - 1),
					children: "−"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex-1 text-center font-display text-lg font-bold tabular-nums",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "flex h-11 w-9 items-center justify-center text-lg text-muted",
					onClick: () => onChange(value + 1),
					children: "+"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-center text-xs text-muted",
			children: hint
		})
	] });
}
function emptyPlan(fx) {
	return {
		opposition: bullsOpponent(fx),
		kickoff: fx.kickoff,
		venue: fx.venue,
		home: isBullsHome(fx),
		formation: DEFAULT_FORMATION,
		kit: "home",
		lineup: {},
		brief: fillLineupBrief(DEFAULT_FORMATION, {})
	};
}
function PitchBoard({ players, currentMatch, appearances, canSave = true }) {
	const fixtures = BULLS_FIXTURES;
	const nextPlan = planFixture(fixtures) ?? fixtures[0];
	const [key, setKey] = (0, import_react.useState)(fixtureKey(nextPlan));
	const [plans, setPlans] = (0, import_react.useState)([]);
	const [draft, setDraft] = (0, import_react.useState)(emptyPlan(nextPlan));
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [openJob, setOpenJob] = (0, import_react.useState)(null);
	const fx = (0, import_react.useMemo)(() => fixtures.find((f) => fixtureKey(f) === key) ?? fixtures[0], [fixtures, key]);
	const formation = formationById(draft.formation);
	Object.values(draft.lineup).filter(Boolean);
	async function load() {
		try {
			const data = await getMatchPlans();
			setPlans(data.plans);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load plans.");
		}
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	(0, import_react.useEffect)(() => {
		const found = plans.find((p) => p.kickoff === fx.kickoff && p.opposition === bullsOpponent(fx));
		setDraft(found ?? emptyPlan(fx));
		setOpenJob(null);
	}, [fx, plans]);
	function patch(next) {
		setDraft((cur) => ({
			...cur,
			...next
		}));
	}
	function setFormation(id) {
		const lineup = remapLineup(draft.lineup, id, draft.formation);
		patch({
			formation: id,
			lineup,
			brief: fillLineupBrief(id, lineup, [...plans, { lineup }])
		});
	}
	function historyPlans() {
		return [...plans, draft];
	}
	function setSlot(slotId, player) {
		const lineup = { ...draft.lineup };
		const brief = { ...draft.brief };
		if (player) {
			for (const [key, name] of Object.entries(lineup)) if (name === player && key !== slotId) {
				delete lineup[key];
				delete brief[key];
			}
			lineup[slotId] = player;
		} else {
			delete lineup[slotId];
			delete brief[slotId];
		}
		const kind = benchKind(slotId);
		if (kind && player) brief[slotId] = roleBriefForPlayer(kind, player, draft.formation, [...plans, { lineup }]);
		else if (player) {
			const role = fillBrief(draft.formation)[slotId] ?? {
				duty: "",
				withBall: "",
				withoutBall: ""
			};
			brief[slotId] = personaliseBrief(player, slotId, role);
		}
		patch({
			lineup,
			brief
		});
	}
	function setJob(slotId, field, value) {
		patch({ brief: {
			...draft.brief,
			[slotId]: {
				duty: draft.brief[slotId]?.duty ?? "",
				withBall: draft.brief[slotId]?.withBall ?? "",
				withoutBall: draft.brief[slotId]?.withoutBall ?? "",
				[field]: value
			}
		} });
	}
	function fillJobs() {
		patch({ brief: fillLineupBrief(draft.formation, draft.lineup, historyPlans(), `${draft.formation}|${fx.kickoff}`) });
		toast.success("Jobs filled. You can still edit any of them.");
	}
	function rewriteJobs() {
		patch({ brief: fillLineupBrief(draft.formation, draft.lineup, historyPlans(), newTalkSalt()) });
		const first = formation.slots.find((s) => draft.lineup[s.id])?.id ?? formation.slots[0]?.id ?? null;
		setOpenJob(first);
		toast.success("AI rewrote the talks. Edit any box, then Save plan.");
	}
	async function onSave() {
		if (!canSave) {
			toast.error(SAVE_LOCK);
			return;
		}
		setSaving(true);
		try {
			await saveMatchPlan({ data: {
				opposition: bullsOpponent(fx),
				kickoff: fx.kickoff,
				venue: fx.venue,
				home: isBullsHome(fx),
				formation: draft.formation,
				kit: draft.kit,
				lineup: { ...draft.lineup },
				brief: draft.brief
			} });
			toast.success(`Plan vs ${shortClub(bullsOpponent(fx))} saved.`);
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save plan.");
		} finally {
			setSaving(false);
		}
	}
	const reportUrl = `/report/pregame?kickoff=${encodeURIComponent(fx.kickoff)}&opp=${encodeURIComponent(bullsOpponent(fx))}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/tactics",
				className: "flex h-12 items-center justify-center rounded-md bg-accent text-sm font-semibold uppercase tracking-wide text-accent-fg",
				children: "Open Raging Bulls Tactic"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "Pre-game plan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: "Opens on the next match after each game so you can set the starting 9, jobs and kit. You can still pick an earlier fixture from the list."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "opp",
						children: "Opposition"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
						id: "opp",
						value: key,
						onChange: (e) => setKey(e.target.value),
						className: "mb-3",
						children: fixtures.map((f) => {
							const planned = fixtureKey(f) === fixtureKey(nextPlan);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: fixtureKey(f),
								children: [
									planned ? "Next · " : "",
									formatKickoff(f.kickoff, "EEE d MMM"),
									" · ",
									shortClub(bullsOpponent(f)),
									" ",
									isBullsHome(f) ? "(H)" : "(A)",
									" · ",
									formatKickoff(f.kickoff, "HH:mm")
								]
							}, fixtureKey(f));
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-xs text-muted",
						children: [
							fixtureKey(fx) === fixtureKey(nextPlan) ? "Planning next match · " : "",
							isBullsHome(fx) ? "Home" : "Away",
							" · ",
							fx.venue,
							" · ",
							BULLS_TEAM
						]
					}),
					gameDetailsFor(bullsOpponent(fx)) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 rounded-lg border border-accent bg-accent-soft p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-accent",
							children: gameDetailsFor(bullsOpponent(fx)).title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 list-disc pl-4 text-fg",
							children: gameDetailsFor(bullsOpponent(fx)).lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted",
						children: "Kit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitChoice, {
							kit: "home",
							label: "Red / black",
							active: draft.kit === "home",
							onClick: () => patch({ kit: "home" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitChoice, {
							kit: "away",
							label: "Navy / white",
							active: draft.kit === "away",
							onClick: () => patch({ kit: "away" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveMatch, {
						players,
						opposition: bullsOpponent(fx),
						kickoff: fx.kickoff,
						formation: draft.formation,
						lineup: draft.lineup,
						kit: draft.kit,
						canSave,
						onPlanFormation: setFormation,
						onPlanPlace: (slotId, player) => setSlot(slotId, player),
						onPlanDrop: (from, to) => {
							const lineup = { ...draft.lineup };
							const a = lineup[from];
							const b = lineup[to];
							if (a) lineup[to] = a;
							else delete lineup[to];
							if (b) lineup[from] = b;
							else delete lineup[from];
							patch({ lineup });
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border border-accent bg-accent-soft p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-bold uppercase tracking-wide",
								children: "The way the Bulls play"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 flex flex-col gap-1.5 text-sm",
								children: BULLS_WAY.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
							}),
							formationExtras(draft.formation).map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm",
								children: line
							}, line)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-sm font-bold uppercase tracking-wide",
								children: "Outfield"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: COMPACT_EXPAND
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: FIRST_BALLS
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: PRESS_RULE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: POSSESSION_RULE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: CARRY_RULE
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-sm font-bold uppercase tracking-wide",
								children: "Keeper"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1 flex flex-col gap-1.5 text-sm",
								children: KEEPER_FACTS.map((fact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: fact }, fact))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-display text-lg font-bold uppercase tracking-tight",
									children: "Jobs by position"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex shrink-0 flex-col gap-2 sm:flex-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: rewriteJobs,
										children: "AI rewrite talks"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										type: "button",
										onClick: fillJobs,
										children: "Fill from Brian’s rules"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs text-muted",
								children: "AI rewrite mixes the words for this week — same jobs, fresh talk. Then tap Edit on any position and change the words. Save plan keeps your edits on the report."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-2",
								children: formation.slots.map((slot) => {
									const job = draft.brief[slot.id];
									const open = openJob === slot.id;
									const lad = draft.lineup[slot.id];
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-bg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "flex w-full items-center justify-between gap-2 px-3 py-3 text-left",
											onClick: () => setOpenJob(open ? null : slot.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-semibold",
												children: [slot.label, lad ? ` · ${pitchSurname(lad, players)}` : ""]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs uppercase tracking-wide text-muted",
												children: open ? "Hide" : "Edit"
											})]
										}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-2 border-t border-border px-3 py-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "block",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
														children: "Responsibility"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														value: job?.duty ?? "",
														onChange: (e) => setJob(slot.id, "duty", e.target.value),
														rows: 2,
														className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "block",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
														children: "With the ball"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														value: job?.withBall ?? "",
														onChange: (e) => setJob(slot.id, "withBall", e.target.value),
														rows: 3,
														className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "block",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
														children: "Without the ball"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														value: job?.withoutBall ?? "",
														onChange: (e) => setJob(slot.id, "withoutBall", e.target.value),
														rows: 3,
														className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
													})]
												})
											]
										}) : null]
									}, slot.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-5 font-display text-lg font-bold uppercase tracking-tight",
								children: "Subs · stay involved"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs text-muted",
								children: "Brief: front, middle, back. Study the starters. Everyone plays their part."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-2",
								children: SUB_SLOTS.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchJob, {
									id,
									label: `Sub ${i + 1}`,
									lad: draft.lineup[id],
									job: draft.brief[id],
									open: openJob === id,
									players,
									onToggle: () => setOpenJob(openJob === id ? null : id),
									onChange: (field, value) => setJob(id, field, value)
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-5 font-display text-lg font-bold uppercase tracking-tight",
								children: "Reserves · not match day"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-col gap-2",
								children: RESERVE_SLOTS.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchJob, {
									id,
									label: `Reserve ${i + 1}`,
									lad: draft.lineup[id],
									job: draft.brief[id],
									open: openJob === id,
									players,
									onToggle: () => setOpenJob(openJob === id ? null : id),
									onChange: (field, value) => setJob(id, field, value)
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-5 font-display text-lg font-bold uppercase tracking-tight",
								children: "Injured"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-col gap-2",
								children: INJURED_SLOTS.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchJob, {
									id,
									label: `Injured ${i + 1}`,
									lad: draft.lineup[id],
									job: draft.brief[id],
									open: openJob === id,
									players,
									onToggle: () => setOpenJob(openJob === id ? null : id),
									onChange: (field, value) => setJob(id, field, value)
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-5 font-display text-lg font-bold uppercase tracking-tight",
								children: "Unavailable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-col gap-2",
								children: UNAVAILABLE_SLOTS.map((id, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BenchJob, {
									id,
									label: `Unavailable ${i + 1}`,
									lad: draft.lineup[id],
									job: draft.brief[id],
									open: openJob === id,
									players,
									onToggle: () => setOpenJob(openJob === id ? null : id),
									onChange: (field, value) => setJob(id, field, value)
								}, id))
							})
						]
					}),
					canSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						onClick: () => void onSave(),
						disabled: saving,
						children: saving ? "Saving…" : "Save plan"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-muted",
						children: [SAVE_LOCK, " Move lads and change shape — it will not write."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2 w-full bg-[#25d366] text-[#052e16] hover:bg-[#1ebe5d]",
						disabled: saving,
						onClick: () => {
							if (!canSave) {
								toast.error(SAVE_LOCK);
								return;
							}
							(async () => {
								setSaving(true);
								try {
									await saveMatchPlan({ data: {
										opposition: bullsOpponent(fx),
										kickoff: fx.kickoff,
										venue: fx.venue,
										home: isBullsHome(fx),
										formation: draft.formation,
										kit: draft.kit,
										lineup: { ...draft.lineup },
										brief: draft.brief
									} });
									const url = `${globalThis.location.origin}${reportUrl}`;
									await sendWhatsApp(`${TEAM_NAME} pre-game`, pregameWhatsAppText({
										opposition: shortClub(bullsOpponent(fx)),
										formation: draft.formation,
										lineup: draft.lineup,
										kickoff: fx.kickoff,
										home: isBullsHome(fx),
										venue: fx.venue
									}), url);
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "Could not send.");
								} finally {
									setSaving(false);
								}
							})();
						},
						children: "Send in WhatsApp"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "mt-2 w-full",
						disabled: saving,
						onClick: () => {
							if (!canSave) {
								globalThis.window.location.href = reportUrl;
								return;
							}
							(async () => {
								setSaving(true);
								try {
									await saveMatchPlan({ data: {
										opposition: bullsOpponent(fx),
										kickoff: fx.kickoff,
										venue: fx.venue,
										home: isBullsHome(fx),
										formation: draft.formation,
										kit: draft.kit,
										lineup: { ...draft.lineup },
										brief: draft.brief
									} });
									globalThis.window.location.href = reportUrl;
								} catch (err) {
									toast.error(err instanceof Error ? err.message : "Could not save plan.");
									setSaving(false);
								}
							})();
						},
						children: "Colour PDF"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchStatsPanel, {
				players,
				currentMatch,
				appearances,
				fixtureOpposition: bullsOpponent(fx),
				canSave
			})
		]
	});
}
function BenchJob({ label, lad, job, open, players, onToggle, onChange }) {
	if (!lad) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-center justify-between gap-2 px-3 py-3 text-left",
			onClick: onToggle,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm font-semibold",
				children: [
					label,
					" · ",
					pitchSurname(lad, players)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-wide text-muted",
				children: open ? "Hide" : "Edit"
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 border-t border-border px-3 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
						children: "Positions / talk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: job?.duty ?? "",
						onChange: (e) => onChange("duty", e.target.value),
						rows: 3,
						className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
						children: "With the ball"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: job?.withBall ?? "",
						onChange: (e) => onChange("withBall", e.target.value),
						rows: 3,
						className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-1 block text-xs font-semibold uppercase tracking-wider text-muted",
						children: "Without the ball"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: job?.withoutBall ?? "",
						onChange: (e) => onChange("withoutBall", e.target.value),
						rows: 3,
						className: "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
					})]
				})
			]
		}) : job?.duty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "border-t border-border px-3 py-2 text-xs text-muted",
			children: job.duty
		}) : null]
	});
}
function KitChoice({ kit, label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex h-14 items-center gap-2 rounded-md border px-3", active ? "border-accent bg-accent-soft" : "border-border bg-bg"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitGraphic, {
			kit,
			number: "9"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-left text-xs font-semibold uppercase tracking-wide",
			children: label
		})]
	});
}
function TrainerYearPanel({ topN, compact, players = [], sessions }) {
	const [fetched, setFetched] = (0, import_react.useState)([]);
	const [label, setLabel] = (0, import_react.useState)(TRAINER_YEAR_LABEL);
	const [range, setRange] = (0, import_react.useState)("1 Sep 2026 – 30 Jun 2027");
	const localRows = (0, import_react.useMemo)(() => sessions && sessions.length && players.length ? scoreTrainerYear(players, sessions) : null, [players, sessions]);
	const rows = localRows?.some((r) => r.pts > 0) ? localRows : fetched.some((r) => r.pts > 0) ? fetched : localRows ?? fetched;
	(0, import_react.useEffect)(() => {
		getTrainerYear().then((d) => {
			setFetched(d.rows);
			setLabel(d.label);
			setRange(`${d.start.split("-").reverse().join("/")} – ${d.end.split("-").reverse().join("/")}`);
		}).catch(() => setFetched([]));
	}, []);
	const publicTop = Boolean(topN);
	const list = publicTop ? rows.filter((r) => r.pts > 0).slice(0, topN) : rows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm leading-7 text-muted",
				children: [
					"Friday training only · ",
					range,
					". Attendance, effort, attitude, achievement (max 40 a night). Match votes, MOM and tests do not count."
				]
			}),
			publicTop ? list.some((r) => r.pts > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3 flex flex-col gap-1",
				children: list.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 font-semibold tabular-nums text-accent",
						children: i + 1
					}), publicName(row.name)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold tabular-nums",
						children: [row.pts, " pts"]
					})]
				}, row.name))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No Friday marks in this window yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [rows.some((r) => r.pts > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-display text-xl font-bold uppercase",
				children: [
					"Leader · ",
					shortName(rows.find((r) => r.pts > 0).name),
					" · ",
					rows.find((r) => r.pts > 0).pts,
					" pts"
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No Friday marks in this window yet."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 overflow-hidden rounded-xl border border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 flex-1",
							children: "Player"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-right",
							children: "Nts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-right",
							children: "Avg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-right",
							children: "Pts"
						})
					]
				}), rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 border-t border-border px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1 truncate",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 text-muted",
								children: i + 1
							}), shortName(row.name)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-right tabular-nums text-muted",
							children: row.attended
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-right tabular-nums text-muted",
							children: row.avg ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-10 text-right tabular-nums font-semibold",
							children: row.pts
						})
					]
				}, row.name))]
			})] })
		]
	});
}
function mondayLabel(period) {
	return formatKickoff(`${period.awardMonday}T12:00`, "EEE d MMM yyyy") || period.awardMonday;
}
function PotmPanel() {
	const [month, setMonth] = (0, import_react.useState)(() => upcomingPotmMonth());
	const [standings, setStandings] = (0, import_react.useState)([]);
	const [period, setPeriod] = (0, import_react.useState)(null);
	const [canAward, setCanAward] = (0, import_react.useState)(false);
	const [winner, setWinner] = (0, import_react.useState)(null);
	const [leader, setLeader] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function load(nextMonth = month) {
		try {
			const data = await getPotm({ data: { month: nextMonth } });
			setMonth(data.month);
			setStandings(data.standings);
			setPeriod(data.window);
			setCanAward(data.canAward);
			setWinner(data.winner);
			setLeader(data.leader);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load player of the month.");
		}
	}
	(0, import_react.useEffect)(() => {
		load(month);
	}, [month]);
	async function onAward(player) {
		setSaving(true);
		try {
			const res = await awardPotm({ data: {
				month,
				player
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setWinner(res.winner);
			toast.success("Player of the month awarded.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not award.");
		} finally {
			setSaving(false);
		}
	}
	const name = winner?.player || leader?.name || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs font-semibold uppercase tracking-wide text-muted",
								onClick: () => setMonth(shiftMonth(month, -1)),
								children: "Prev"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-lg font-bold uppercase tracking-tight",
								children: period?.label || month
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-xs font-semibold uppercase tracking-wide text-muted",
								onClick: () => setMonth(shiftMonth(month, 1)),
								children: "Next"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm leading-7 text-muted",
						children: [
							"What counts this month: parent 3-2-1, plus 1 point for the child when his family votes (from Standish), training award (max 40), opposition MOM (",
							OPP_MOM_POINTS,
							"), players’ / manager’s player (",
							PLAYERS_PLAYER_POINTS,
							"), and performance-test bonuses. Awarded the 3rd Monday",
							period ? ` · ${mondayLabel(period)}` : "",
							"."
						]
					}),
					winner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-display text-2xl font-bold uppercase tracking-tight",
						children: ["Winner · ", shortName(winner.player)]
					}) : leader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							"Leader · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: shortName(leader.name)
							}),
							" · ",
							leader.total,
							" pts"
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No points in this window yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "h-12",
							disabled: !canAward || !name,
							onClick: () => {
								if (!canAward) return toast.error("Certificate after the 3rd Monday.");
								if (!name) return toast.error("Need a leader first.");
								globalThis.window.location.href = `/cert/potm?month=${encodeURIComponent(month)}&player=${encodeURIComponent(name)}`;
							},
							children: canAward ? "Certificate PDF" : "Certificate after 3rd Monday"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							disabled: saving || !canAward || !name,
							onClick: () => void onAward(winner?.player || leader?.name || ""),
							children: saving ? "Saving…" : canAward ? "Award 3rd Monday" : "Locked until 3rd Monday"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-1 font-display text-lg font-bold uppercase tracking-tight",
					children: "Month table"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-sm text-muted",
					children: month === "2026-09" ? "September, closed. Louie opposition MOM and Henry players’ player from Pine Villa are in this table, and on Season running." : month === "2026-10" ? "October runs 22 Sep to the 3rd Monday, 19 Oct. Both Fridays count: 25 Sep and 2 Oct. Daisy Hill and Standish are in this month. Pine Villa stays in September." : "Awarded on the 3rd Monday. Season running keeps every month."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1",
								children: "Player"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "3-2-1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Trn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Tst"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "MOM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "P/M"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Pld"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right",
								children: "Tot"
							})
						]
					}), standings.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: cn("flex w-full gap-2 border-t border-border px-3 py-2 text-left text-sm", winner?.player === row.name && "bg-accent-soft"),
						onClick: () => globalThis.window.location.href = `/cert/potm?month=${encodeURIComponent(month)}&player=${encodeURIComponent(row.name)}`,
						disabled: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1 truncate font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-2 text-muted",
									children: i + 1
								}), shortName(row.name)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.parentPts
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.trainingPts
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.testPts || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.oppMom ? row.oppMom * OPP_MOM_POINTS : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.playersPlayer ? row.playersPlayer * PLAYERS_PLAYER_POINTS : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums text-muted",
								children: row.playedPts || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 text-right tabular-nums font-semibold",
								children: row.total
							})
						]
					}, row.name))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs leading-6 text-muted",
					children: "Tot = 3-2-1 + training + tests + 5 a game played + MOM 20 + players’ player 10. Trainer of the year is training only."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/month",
					className: "mt-3 inline-flex h-11 items-center text-xs font-semibold uppercase tracking-wide text-accent",
					children: "How it’s picked · medals"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainerYearPanel, {})
		]
	});
}
function VoteSheet({ players, history, currentMatch, onSaved }) {
	const games = (0, import_react.useMemo)(() => {
		const grouped = groupGames(history);
		if (!currentMatch) return grouped;
		if (grouped.some((g) => g.gameNumber.toLowerCase() === currentMatch.gameNumber.toLowerCase() && g.opposition.toLowerCase() === currentMatch.opposition.toLowerCase())) return grouped;
		return [{
			key: `${currentMatch.gameNumber}|||${currentMatch.opposition}`,
			gameNumber: currentMatch.gameNumber,
			opposition: currentMatch.opposition,
			votes: [],
			lastTs: ""
		}, ...grouped];
	}, [history, currentMatch]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-4",
		children: games.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameVotes, {
			gameNumber: game.gameNumber,
			opposition: game.opposition,
			votes: game.votes,
			players,
			today: !!currentMatch && game.gameNumber.toLowerCase() === currentMatch.gameNumber.toLowerCase() && game.opposition.toLowerCase() === currentMatch.opposition.toLowerCase(),
			onSaved
		}, game.key))
	});
}
function GameVotes({ gameNumber, opposition, votes, players, today, onSaved }) {
	const [adding, setAdding] = (0, import_react.useState)(false);
	const voted = new Set(votes.map((row) => row.parentChild));
	const missing = players.filter((name) => !voted.has(name));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-display text-lg font-bold uppercase leading-tight tracking-tight",
					children: [
						gameNumber,
						" vs ",
						opposition
					]
				}), today ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-fg",
					children: "Today"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted",
				children: [
					votes.length,
					" family vote",
					votes.length === 1 ? "" : "s",
					". Change a line and save. Parents do not see who voted."
				]
			}),
			!votes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No votes saved for this game yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-3",
				children: votes.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteLine, {
					row,
					players,
					onSaved
				}, row.id))
			}),
			missing.length ? adding ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddVote, {
				gameNumber,
				opposition,
				players: missing,
				onDone: () => setAdding(false),
				onSaved
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-3 w-full",
				onClick: () => setAdding(true),
				children: "Add a family vote"
			}) : null
		]
	});
}
function VoteLine({ row, players, onSaved }) {
	const [vote3, setVote3] = (0, import_react.useState)(row.vote3);
	const [vote2, setVote2] = (0, import_react.useState)(row.vote2);
	const [vote1, setVote1] = (0, import_react.useState)(row.vote1);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const dirty = vote3 !== row.vote3 || vote2 !== row.vote2 || vote1 !== row.vote1;
	async function save() {
		setSaving(true);
		try {
			const res = await saveCoachVote({ data: {
				gameNumber: row.gameNumber,
				opposition: row.opposition,
				parentChild: row.parentChild,
				vote3,
				vote2,
				vote1
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success(`${shortName(row.parentChild)} updated.`);
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save that vote.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-lg border border-border bg-bg px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-semibold",
				children: [shortName(row.parentChild), "’s family"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
						label: "3",
						value: vote3,
						players,
						exclude: [
							row.parentChild,
							vote2,
							vote1
						],
						onChange: setVote3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
						label: "2",
						value: vote2,
						players,
						exclude: [
							row.parentChild,
							vote3,
							vote1
						],
						onChange: setVote2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
						label: "1",
						value: vote1,
						players,
						exclude: [
							row.parentChild,
							vote3,
							vote2
						],
						onChange: setVote1
					})
				]
			}),
			dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-2 h-9 w-full",
				disabled: saving,
				onClick: () => void save(),
				children: saving ? "Saving…" : "Save"
			}) : null
		]
	});
}
function AddVote({ gameNumber, opposition, players, onDone, onSaved }) {
	const [parentChild, setParentChild] = (0, import_react.useState)("");
	const [vote3, setVote3] = (0, import_react.useState)("");
	const [vote2, setVote2] = (0, import_react.useState)("");
	const [vote1, setVote1] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function save() {
		if (!parentChild || !vote3 || !vote2 || !vote1) {
			toast.error("Pick the family and all three places.");
			return;
		}
		setSaving(true);
		try {
			const res = await saveCoachVote({ data: {
				gameNumber,
				opposition,
				parentChild,
				vote3,
				vote2,
				vote1
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success("Vote saved.");
			onDone();
			await onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save that vote.");
		} finally {
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 rounded-lg border border-border bg-bg px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Family" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
				label: "Family",
				value: parentChild,
				players,
				placeholder: "Which family",
				onChange: setParentChild
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
						label: "3",
						value: vote3,
						players,
						exclude: [
							parentChild,
							vote2,
							vote1
						],
						onChange: setVote3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
						label: "2",
						value: vote2,
						players,
						exclude: [
							parentChild,
							vote3,
							vote1
						],
						onChange: setVote2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pick, {
						label: "1",
						value: vote1,
						players,
						exclude: [
							parentChild,
							vote3,
							vote2
						],
						onChange: setVote1
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onDone,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: saving,
					onClick: () => void save(),
					children: saving ? "Saving…" : "Save vote"
				})]
			})
		]
	});
}
function Pick({ label, value, players, exclude, onChange }) {
	const blocked = new Set(exclude.filter(Boolean));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-[10px] font-semibold uppercase tracking-wider text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
			className: "mt-1 h-10 w-full rounded-md border border-border bg-surface px-1 text-xs font-semibold text-fg",
			value,
			onChange: (e) => onChange(e.target.value),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: "",
				children: "—"
			}), players.filter((name) => name === value || !blocked.has(name)).map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: name,
				children: shortName(name)
			}, name))]
		})]
	});
}
function MinutesPanel() {
	const [games, setGames] = (0, import_react.useState)([]);
	const [stints, setStints] = (0, import_react.useState)([]);
	const [pick, setPick] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		getAllMinutes().then((data) => {
			setGames(data.games);
			setStints(data.stints);
			if (data.games.length) {
				const last = data.games[data.games.length - 1];
				setPick(`${last.kickoff}|${last.opposition}`);
			}
		}).catch((err) => toast.error(err instanceof Error ? err.message : "Could not load minutes."));
	}, []);
	const game = games.find((g) => `${g.kickoff}|${g.opposition}` === pick);
	const weekStints = stints.filter((s) => game && s.kickoff === game.kickoff && s.opposition === game.opposition);
	const weekMinute = game ? gameMinute(game.clock) : 0;
	const week = (0, import_react.useMemo)(() => game ? playerMinutes(weekStints, weekMinute, game.clock.ended) : {}, [
		game,
		weekStints,
		weekMinute
	]);
	const season = (0, import_react.useMemo)(() => {
		const totals = {};
		for (const g of games) {
			const rows = stints.filter((s) => s.kickoff === g.kickoff && s.opposition === g.opposition);
			const mins = playerMinutes(rows, gameMinute(g.clock), g.clock.ended);
			for (const [player, row] of Object.entries(mins)) totals[player] = (totals[player] || 0) + row.minutes;
		}
		return totals;
	}, [games, stints]);
	const weekData = PLAYERS.map((p) => ({
		name: shortName(p).replace(/^#\d+\s/, ""),
		minutes: week[p]?.minutes ?? 0
	})).filter((d) => d.minutes > 0);
	const seasonData = PLAYERS.map((p) => ({
		name: shortName(p).replace(/^#\d+\s/, ""),
		minutes: season[p] ?? 0
	})).filter((d) => d.minutes > 0);
	const byWeek = games.map((g) => {
		const rows = stints.filter((s) => s.kickoff === g.kickoff && s.opposition === g.opposition);
		const mins = playerMinutes(rows, gameMinute(g.clock), g.clock.ended);
		const total = Object.values(mins).reduce((n, r) => n + r.minutes, 0);
		return {
			name: `${formatKickoff(g.kickoff, "d MMM")} ${shortClub(g.opposition)}`.trim(),
			minutes: total
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold uppercase tracking-tight",
						children: "Minutes this game"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "mins-game",
						children: "Game"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldSelect, {
						id: "mins-game",
						value: pick,
						onChange: (e) => setPick(e.target.value),
						className: "mb-3",
						children: [!games.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "No games timed yet"
						}) : null, games.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: `${g.kickoff}|${g.opposition}`,
							children: [
								formatKickoff(g.kickoff, "EEE d MMM"),
								" · ",
								shortClub(g.opposition)
							]
						}, `${g.kickoff}|${g.opposition}`))]
					}),
					weekData.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: weekData,
								margin: {
									top: 8,
									right: 8,
									left: 0,
									bottom: 24
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeDasharray: "3 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "name",
										tick: {
											fill: "#ffffff",
											fontSize: 10
										},
										interval: 0,
										angle: -35,
										textAnchor: "end",
										height: 48
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
										fill: "#ffffff",
										fontSize: 11
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "minutes",
										fill: "var(--color-accent)",
										radius: 4
									})
								]
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Start the match-day clock on Pitch to log minutes."
					}),
					game ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-2 font-display text-sm font-bold uppercase tracking-tight",
							children: "Who · where · when"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StintTally, {
							stints: weekStints,
							minute: weekMinute,
							ended: game.clock.ended
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold uppercase tracking-tight",
					children: "Season minutes"
				}), seasonData.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: seasonData,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 24
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "#ffffff",
										fontSize: 10
									},
									interval: 0,
									angle: -35,
									textAnchor: "end",
									height: 48
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
									fill: "#ffffff",
									fontSize: 11
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "minutes",
									fill: "var(--color-ok)",
									radius: 4
								})
							]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Totals build as you time games."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold uppercase tracking-tight",
					children: "Each week"
				}), byWeek.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: byWeek,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 24
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "#ffffff",
										fontSize: 10
									},
									interval: 0,
									angle: -25,
									textAnchor: "end",
									height: 48
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
									fill: "#ffffff",
									fontSize: 11
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "minutes",
									fill: "var(--color-fg)",
									radius: 4
								})
							]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "One bar per game, once clocks are used."
				})]
			})
		]
	});
}
function pinNow(given) {
	const p = given.trim();
	if (p.length >= 4) return p;
	if (typeof window === "undefined") return FALLBACK_PIN;
	return window.sessionStorage.getItem("bulls-coach-pin") || window.localStorage.getItem("bulls-coach-pin") || "0803";
}
function WhoOnline({ pin }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [coaches, setCoaches] = (0, import_react.useState)([]);
	const [parents, setParents] = (0, import_react.useState)([]);
	const [perfLive, setPerfLive] = (0, import_react.useState)([]);
	const [perfSigned, setPerfSigned] = (0, import_react.useState)([]);
	const [perfClips, setPerfClips] = (0, import_react.useState)([]);
	const [guests, setGuests] = (0, import_react.useState)(0);
	async function load() {
		const p = pinNow(pin);
		try {
			const users = await listCoachUsers({ data: { pin: p } });
			if (users.ok) setCoaches(users.users);
		} catch {}
		try {
			const res = await listParentPresence({ data: { pin: p } });
			if (res.ok) {
				setParents(res.parents.filter((x) => x.page !== "perf"));
				setGuests(res.guests);
			}
		} catch {}
		try {
			const perf = await listPerfUsers({ data: { pin: p } });
			if (perf.ok) {
				setPerfLive(perf.live);
				setPerfSigned(perf.signedIn);
				setPerfClips(perf.clips);
			}
		} catch {}
	}
	(0, import_react.useEffect)(() => {
		load();
		const t = setInterval(() => void load(), 5e3);
		return () => clearInterval(t);
	}, [pin]);
	const onlineCoaches = coaches.filter((c) => c.online);
	const liveCount = onlineCoaches.length + parents.length + guests + perfLive.length;
	const names = [...onlineCoaches.map((c) => c.name), ...parents.map((p) => `${parsePlayer(p.label).first}’s parent`)].filter(Boolean).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 rounded-xl border border-accent bg-accent-soft p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-start justify-between gap-3 text-left",
			onClick: () => setOpen((v) => !v),
			"aria-expanded": open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-bold uppercase tracking-tight",
					children: "Who’s on"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 text-sm text-fg",
					children: [
						liveCount ? `${liveCount} on the app now` : "Nobody else on right now",
						names.length ? ` · ${names.join(" · ")}` : "",
						parents.length ? ` · ${parents.length} parent${parents.length === 1 ? "" : "s"}` : ""
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "shrink-0 pt-1 text-xs font-semibold uppercase tracking-wide text-accent",
				children: open ? "Hide" : "Show"
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 border-t border-accent/30 pt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Coaches / demo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 flex flex-col gap-1.5",
					children: coaches.length ? coaches.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: u.online ? "inline-block size-2.5 rounded-full bg-emerald-400" : "inline-block size-2.5 rounded-full bg-muted" }), u.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs uppercase tracking-wide text-muted",
							children: [u.online ? "online" : "offline", isDemoName(u.name) ? " · demo" : u.role === "admin" ? " · admin" : ""]
						})]
					}, u.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm text-muted",
						children: "Unlock with your coach PIN to see users."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Performance analysis"
				}),
				perfLive.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 flex flex-col gap-1.5",
					children: perfLive.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2.5 rounded-full bg-emerald-400" }), p.guest ? "On Performance (not signed in)" : `${p.label}’s parent`]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wide text-muted",
							children: "now"
						})]
					}, p.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Nobody on Performance right now."
				}),
				perfSigned.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg",
					children: ["Signed in with a family code: ", perfSigned.map((n) => parsePlayer(n).name).join(", ")]
				}) : null,
				perfClips.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-col gap-1 text-sm",
					children: perfClips.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [parsePlayer(c.player).name, " sent a clip"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: c.at.slice(0, 10)
						})]
					}, c.player))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "No clips sent yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Parents (vote / board)"
				}),
				parents.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 flex flex-col gap-1.5",
					children: parents.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2.5 rounded-full bg-emerald-400" }),
								p.label,
								"’s parent"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wide text-muted",
							children: p.page || "app"
						})]
					}, p.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "No named parents on vote / board right now."
				}),
				guests > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm font-semibold text-fg",
					children: [guests, " more on the parent app (not picked a child yet)"]
				}) : null
			]
		}) : null]
	});
}
var COLS = [
	{
		id: "training",
		head: "Train"
	},
	{
		id: "parents",
		head: "3-2-1"
	},
	{
		id: "mom",
		head: "MOM"
	},
	{
		id: "manager",
		head: "Mgr"
	},
	{
		id: "played",
		head: "Played"
	},
	{
		id: "tests",
		head: "Tests"
	},
	{
		id: "total",
		head: "Overall"
	},
	{
		id: "month",
		head: "Month"
	},
	{
		id: "avg",
		head: "Avg"
	},
	{
		id: "s30",
		head: "30m"
	}
];
var SORTS = [
	{
		id: "s30",
		title: "30m time",
		note: "Linear speed no ball. Clock is GO to the last cones. Fastest at the top."
	},
	...SCORE_CATEGORIES.map((c) => ({
		id: c.id,
		title: c.title,
		note: c.note
	})),
	{
		id: "avg",
		title: "Monthly avg",
		note: "Average points per prize month. Same marks as the total, split by month."
	}
];
function formatAvg(n) {
	if (!n) return "0";
	return n % 1 === 0 ? String(n) : n.toFixed(1);
}
function FullScoreTable({ players, history, appearances, awards = [], sessions = [], tests = [] }) {
	const [sort, setSort] = (0, import_react.useState)("total");
	const [desc, setDesc] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(null);
	const table = (0, import_react.useMemo)(() => scoreFull(players, history, awards, sessions, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const monthTable = (0, import_react.useMemo)(() => scoreFullMonth(players, history, awards, sessions, openPrizeMonth(), appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const monthBy = (0, import_react.useMemo)(() => new Map(monthTable.map((r) => [r.name, r.total])), [monthTable]);
	const monthly = (0, import_react.useMemo)(() => averageMonthlyFull(players, history, awards, sessions, appearances, tests), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const avgBy = (0, import_react.useMemo)(() => new Map(monthly.map((r) => [r.name, r])), [monthly]);
	const monthsN = monthly[0]?.months ?? 0;
	const cat = sort.startsWith("fri:") ? {
		id: sort,
		title: fridayLabel(sort.slice(4)),
		note: `That Friday only. Max 40. A dash means the night has not been marked.`
	} : sort === "month" ? {
		id: "month",
		title: "This month",
		note: "Overall points in the live prize month."
	} : SORTS.find((c) => c.id === sort) ?? SORTS[0];
	const fridays = (0, import_react.useMemo)(() => seasonFridays(), []);
	const markedNights = fridays.filter((day) => sessions.some((s) => s.sessionDate.slice(0, 10) === day));
	const blankNights = fridays.filter((day) => !markedNights.includes(day));
	const sprintBy = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const name of players) {
			const line = playerDrillLines(tests, name).find((l) => l.kind === "s30_no");
			map.set(name, {
				time: line?.time ?? null,
				label: line?.timeLabel ?? "—",
				score: line?.score ?? null
			});
		}
		return map;
	}, [players, tests]);
	function valueOf(name, id) {
		if (id.startsWith("fri:")) return fridayMark(sessions, name, id.slice(4)) ?? -1;
		if (id === "avg") return avgBy.get(name)?.avg ?? 0;
		if (id === "month") return monthBy.get(name) ?? 0;
		if (id === "s30") return sprintBy.get(name)?.time ?? 0;
		const row = table.find((r) => r.name === name);
		if (!row) return 0;
		const catRow = SCORE_CATEGORIES.find((c) => c.id === id);
		return catRow ? catRow.pts(row) : 0;
	}
	const ranked = (0, import_react.useMemo)(() => {
		return [...table].sort((a, b) => {
			if (sort === "s30") {
				const at = sprintBy.get(a.name)?.time;
				const bt = sprintBy.get(b.name)?.time;
				if (at == null && bt == null) return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
				if (at == null) return 1;
				if (bt == null) return -1;
				const d = at - bt;
				if (d !== 0) return desc ? d : -d;
				return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
			}
			const d = valueOf(b.name, sort) - valueOf(a.name, sort);
			if (d !== 0) return desc ? d : -d;
			return parsePlayer(a.name).name.localeCompare(parsePlayer(b.name).name);
		});
	}, [
		table,
		sort,
		desc,
		avgBy,
		monthBy,
		sprintBy,
		sessions
	]);
	const leader = ranked[0];
	function toggle(id) {
		if (sort === id) setDesc((d) => !d);
		else {
			setSort(id);
			setDesc(true);
		}
	}
	function cell(name, id) {
		if (id.startsWith("fri:")) {
			const pts = fridayMark(sessions, name, id.slice(4));
			return pts == null ? "—" : String(pts);
		}
		if (id === "s30") return (sprintBy.get(name)?.label ?? "—").split("·")[0]?.trim() || "—";
		const n = valueOf(name, id);
		return id === "avg" ? formatAvg(n) : String(n);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold uppercase tracking-tight",
						children: "Season running"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/report/scores",
						className: "inline-flex h-11 items-center rounded-md bg-accent px-3 text-xs font-semibold uppercase tracking-wide text-accent-fg",
						children: "Summary sheet"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Every Friday from 4 Sep, max ",
						40,
						" a night. Then the games: parent 3-2-1, opposition MOM, manager’s player, and 5 for every game he played. Tests are added too. Overall is those added up. Month and the average are not added again.",
						blankNights.length ? ` Not marked yet: ${blankNights.map(fridayLabel).join(", ")}.` : "",
						monthsN ? ` Average is across ${monthsN} prize month${monthsN === 1 ? "" : "s"}.` : ""
					]
				}),
				leader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-display text-2xl font-bold uppercase tracking-tight text-fg",
					children: [
						"1st · ",
						shortName(leader.name),
						" · ",
						cell(leader.name, sort),
						" ",
						cat.title
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: cat.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: SORTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggle(c.id),
						className: cn("h-11 rounded-md px-3 text-xs font-semibold uppercase tracking-wide", sort === c.id ? "bg-accent text-accent-fg" : "border border-border bg-bg text-fg"),
						children: [c.title, sort === c.id ? desc ? " ↓" : " ↑" : ""]
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 w-full max-w-full overflow-x-auto overscroll-x-contain rounded-lg border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-max border-separate border-spacing-0 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-bg text-xs font-semibold uppercase tracking-wide text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "sticky left-0 z-20 min-w-[9.5rem] border-b border-border bg-bg px-3 py-3 text-left shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]",
									children: "Player"
								}),
								fridays.map((day) => {
									const id = `fri:${day}`;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "min-w-[4.25rem] whitespace-nowrap border-b border-border bg-bg px-2 py-1 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => toggle(id),
											className: cn("inline-flex h-11 w-full items-center justify-end text-xs font-semibold uppercase", sort === id ? "text-accent" : "text-subtle"),
											children: [fridayLabel(day), sort === id ? desc ? " ↓" : " ↑" : ""]
										})
									}, id);
								}),
								COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "min-w-[4.25rem] whitespace-nowrap border-b border-border bg-bg px-2 py-1 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggle(col.id),
										className: cn("inline-flex h-11 w-full items-center justify-end text-xs font-semibold uppercase", sort === col.id ? "text-accent" : "text-subtle"),
										children: [col.head, sort === col.id ? desc ? " ↓" : " ↑" : ""]
									})
								}, col.id))
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ranked.map((row, i) => {
							const top = i === 0 && valueOf(row.name, sort) > 0;
							const shown = open === row.name;
							const who = parsePlayer(row.name);
							const stickyBg = top ? "bg-[color-mix(in_oklab,#b42318_18%,#141416)]" : "bg-surface";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: cn("border-t border-border", top && "bg-accent-soft"),
								onClick: () => setOpen(shown ? null : row.name),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: cn("sticky left-0 z-10 whitespace-nowrap border-t border-border px-3 py-3 text-base font-semibold shadow-[8px_0_12px_-8px_rgba(0,0,0,0.85)]", stickyBg),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: playerReportHref(row.name),
											onClick: (e) => e.stopPropagation(),
											className: "flex items-center gap-2 underline-offset-2 hover:underline",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("w-6 font-display text-xl font-bold tabular-nums", top ? "text-accent" : "text-muted"),
												children: i + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [who.num ? `#${who.num} ` : "", publicName(row.name)] })]
										})
									}),
									fridays.map((day) => {
										const id = `fri:${day}`;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("whitespace-nowrap border-t border-border px-2 py-3 text-right font-display text-xl font-bold tabular-nums", sort === id ? "text-accent" : "text-fg"),
											children: cell(row.name, id)
										}, id);
									}),
									COLS.map((col) => {
										const active = sort === col.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: cn("whitespace-nowrap border-t border-border px-2 py-3 text-right font-display text-xl font-bold tabular-nums", col.id === "total" || active ? "text-accent" : "text-fg"),
											children: cell(row.name, col.id)
										}, col.id);
									})
								]
							}), shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-t border-border bg-bg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: fridays.length + COLS.length + 1,
									className: "border-t border-border px-3 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerTestTotals, {
										tests,
										player: row.name,
										compact: true
									})
								})
							}) : null] }, row.name);
						}) })]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadTestTable, {
			players,
			tests
		})]
	});
}
function fmt(n) {
	if (!Number.isFinite(n) || n === 0) return "0";
	return n % 1 === 0 ? String(n) : n.toFixed(1);
}
function monthsSoFar() {
	const end = openPrizeMonth();
	const list = [];
	let month = "2026-09";
	for (let i = 0; i < 16 && month <= end; i++) {
		list.push(month);
		month = shiftPrizeMonth(month, 1);
	}
	return list;
}
function YearTable({ players, history, appearances, awards = [], sessions = [], tests = [], yearOnly = false }) {
	const months = monthsSoFar();
	const byMonth = (0, import_react.useMemo)(() => months.map((month) => ({
		month,
		title: prizeMonthTitle(month),
		rows: scoreFullMonth(players, history, awards, sessions, month, appearances, tests).filter((row) => row.total > 0)
	})), [
		months,
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const year = (0, import_react.useMemo)(() => scoreFull(players, history, awards, sessions, appearances, tests).filter((row) => yearOnly ? true : row.total > 0), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests,
		yearOnly
	]);
	const averages = (0, import_react.useMemo)(() => averageMonthlyFull(players, history, awards, sessions, appearances, tests).filter((row) => row.total > 0), [
		players,
		history,
		awards,
		sessions,
		appearances,
		tests
	]);
	const avgBy = (0, import_react.useMemo)(() => new Map(averages.map((row) => [row.name, row.avg])), [averages]);
	averages[0]?.months ?? months.length;
	const yearBy = (0, import_react.useMemo)(() => new Map(year.map((row) => [row.name, row.total])), [year]);
	const leader = year[0];
	const monthsDesc = [...byMonth].reverse();
	const liveMonth = openPrizeMonth();
	const monthBy = (0, import_react.useMemo)(() => {
		const hit = byMonth.find((m) => m.month === liveMonth);
		return new Map((hit?.rows ?? []).map((row) => [row.name, row.total]));
	}, [byMonth, liveMonth]);
	const sprintBy = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const row of year) {
			const line = playerDrillLines(tests, row.name).find((l) => l.kind === "s30_no");
			const time = line?.time && line.time > 0 ? line.time : 0;
			map.set(row.name, {
				time,
				label: time ? line?.timeLabel ?? "—" : "—"
			});
		}
		return map;
	}, [year, tests]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold uppercase tracking-tight",
					children: yearOnly ? "Overall year" : "Player of the year"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: "Every Friday from 4 Sep, max 40 a night, then the games: 3-2-1, MOM, manager, and 5 for every game played, plus tests. A dash is a Friday that has not been marked, so it is not in the total. Overall is those points added up. Month, average and 30m sit after it and are not added again."
				}),
				leader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-3 font-display text-2xl font-bold uppercase tracking-tight",
					children: [
						"1st · ",
						publicName(leader.name),
						" · ",
						fmt(leader.total),
						" · avg ",
						fmt(avgBy.get(leader.name) ?? 0)
					]
				}) : null,
				year.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyScoreTable, {
					rows: year,
					defaultSort: "total",
					cols: [
						...seasonFridays().map((day) => ({
							id: `fri-${day}`,
							label: fridayLabel(day),
							value: (row) => fridayMark(sessions, row.name, day) ?? -1,
							text: (row) => {
								const pts = fridayMark(sessions, row.name, day);
								return pts == null ? "—" : String(pts);
							}
						})),
						{
							id: "training",
							label: "Train",
							value: (row) => row.trainingPts
						},
						{
							id: "parents",
							label: "3-2-1",
							value: (row) => row.parentPts
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
							id: "tests",
							label: "Tests",
							value: (row) => row.testPts
						},
						{
							id: "total",
							label: "Overall",
							value: (row) => row.total
						},
						{
							id: "month",
							label: "Month",
							value: (row) => monthBy.get(row.name) ?? 0
						},
						{
							id: "avg",
							label: "Avg",
							value: (row) => avgBy.get(row.name) ?? 0
						},
						{
							id: "s30",
							label: "30m",
							value: (row) => sprintBy.get(row.name)?.time ?? 0,
							text: (row) => sprintBy.get(row.name)?.label ?? "—",
							faster: true
						}
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No season points yet."
				})
			]
		}), yearOnly ? null : monthsDesc.map(({ month, title, rows }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg font-bold uppercase tracking-tight",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-sm text-muted",
					children: month === "2026-09" ? "Closed 21 Sep. Friday 25 Sep is in October, so lads who only trained that night show here as 0." : "22 Sep to the 3rd Monday. Friday 25 Sep and Friday 2 Oct both count."
				}),
				rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreRows, {
					rows,
					overall: yearBy
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No points in this month yet."
				})
			]
		}, month))]
	});
}
function ScoreRows({ rows, overall }) {
	const cols = [
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
			label: overall ? "Month" : "Tot",
			value: (row) => row.total
		}
	];
	if (overall) cols.push({
		id: "overall",
		label: "Overall",
		value: (row) => overall.get(row.name) ?? 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StickyScoreTable, {
		rows,
		cols,
		defaultSort: "total"
	});
}
var TABS = [
	{
		id: "awards",
		label: "Awards"
	},
	{
		id: "table",
		label: "Table"
	},
	{
		id: "pitch",
		label: "Pitch"
	},
	{
		id: "mins",
		label: "Mins"
	},
	{
		id: "ballots",
		label: "Votes"
	},
	{
		id: "parents",
		label: "Parents"
	},
	{
		id: "progress",
		label: "Progress"
	},
	{
		id: "train",
		label: "Train"
	},
	{
		id: "month",
		label: "Month"
	},
	{
		id: "year",
		label: "Year"
	},
	{
		id: "tests",
		label: "Tests"
	},
	{
		id: "rules",
		label: "Rules"
	},
	{
		id: "users",
		label: "Users"
	}
];
function CoachDesk() {
	const [coachName, setCoachName] = (0, import_react.useState)("");
	const [coachRole, setCoachRole] = (0, import_react.useState)("coach");
	const [adminPin, setAdminPin] = (0, import_react.useState)("");
	const [sessionPin, setSessionPin] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("awards");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [players, setPlayers] = (0, import_react.useState)([...PLAYERS]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [awards, setAwards] = (0, import_react.useState)([]);
	const [notes, setNotes] = (0, import_react.useState)({});
	const [currentMatch, setCurrentMatch] = (0, import_react.useState)(null);
	const [gameNumber, setGameNumber] = (0, import_react.useState)("");
	const [opposition, setOpposition] = (0, import_react.useState)("");
	const [oppMom, setOppMom] = (0, import_react.useState)("");
	const [oppMomJoint, setOppMomJoint] = (0, import_react.useState)("");
	const [playersPlayer, setPlayersPlayer] = (0, import_react.useState)("");
	const [openPlayer, setOpenPlayer] = (0, import_react.useState)(null);
	const [draftNote, setDraftNote] = (0, import_react.useState)("");
	const [savingNote, setSavingNote] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [resetting, setResetting] = (0, import_react.useState)(false);
	const [resetConfirm, setResetConfirm] = (0, import_react.useState)("");
	const [appearances, setAppearances] = (0, import_react.useState)({});
	const [played, setPlayed] = (0, import_react.useState)([]);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [tests, setTests] = (0, import_react.useState)([]);
	const [leagueFixtures, setLeagueFixtures] = (0, import_react.useState)([]);
	const [viewingDemo, setViewingDemo] = (0, import_react.useState)(false);
	const [viewingDemoName, setViewingDemoName] = (0, import_react.useState)("");
	const [bullsPlayers, setBullsPlayers] = (0, import_react.useState)([]);
	const [liveOn, setLiveOn] = (0, import_react.useState)(false);
	const canSave = canSaveName(coachName) && !viewingDemo;
	async function load() {
		setLoading(true);
		try {
			const data = await getCoachData();
			setHistory(data.history);
			setAwards(data.awards);
			setNotes(data.notes ?? {});
			setCurrentMatch(data.currentMatch);
			setAppearances(data.appearances ?? {});
			const nameNow = coachName || (typeof window !== "undefined" ? window.localStorage.getItem("bulls-coach-name") || "" : "");
			const pinNow = sessionPin || (typeof window !== "undefined" ? window.sessionStorage.getItem("bulls-coach-pin") || "" : "");
			if (isDemoName(nameNow) && pinNow) try {
				const demo = await listDemoPlayers({ data: { pin: pinNow } });
				if (demo.players?.length) {
					setBullsPlayers(data.players);
					setPlayers(demo.players.map((p) => p.label));
				} else setPlayers(data.players);
			} catch {
				setPlayers(data.players);
			}
			else if (!viewingDemo) {
				setPlayers(data.players);
				setBullsPlayers(data.players);
			}
			if (data.currentMatch) {
				setGameNumber(data.currentMatch.gameNumber);
				setOpposition(data.currentMatch.opposition);
				const existing = data.awards.find((a) => a.gameNumber.toLowerCase() === data.currentMatch.gameNumber.toLowerCase() && a.opposition.toLowerCase() === data.currentMatch.opposition.toLowerCase());
				if (existing) {
					const moms = oppMomPlayers(existing.oppMom);
					setOppMom(moms[0] ?? "");
					setOppMomJoint(moms[1] ?? "");
					setPlayersPlayer(existing.playersPlayer || existing.managerPlayer || "");
				}
			}
			try {
				const extras = await getScoreExtras();
				setSessions(extras.sessions);
				setTests(extras.tests ?? []);
			} catch {
				setSessions([]);
				setTests([]);
			}
			try {
				const league = await getLeagueData();
				setLeagueFixtures(league.fixtures ?? []);
			} catch {
				setLeagueFixtures([]);
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not load coach data.");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		try {
			const name = window.localStorage.getItem("bulls-coach-name") || "Brian Lee";
			const role = window.localStorage.getItem("bulls-coach-role") === "admin" || isAdminName(name) ? "admin" : "coach";
			setCoachName(name);
			setCoachRole(role);
			setAdminPin(role === "admin" ? window.localStorage.getItem("bulls-coach-pin") || "0803" : "");
			setSessionPin(window.sessionStorage.getItem("bulls-coach-pin") || window.localStorage.getItem("bulls-coach-pin") || "");
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		const fetchData = window.setTimeout(() => {
			load();
		}, 400);
		return () => window.clearTimeout(fetchData);
	}, []);
	function lock() {
		const pinNow = sessionPin;
		const seat = coachName;
		forgetAdminEmail();
		clearCoachSession();
		setCoachName("");
		setCoachRole("coach");
		setAdminPin("");
		setSessionPin("");
		if (pinNow) leaveCoach({ data: {
			pin: pinNow,
			seat
		} }).catch(() => void 0);
	}
	function fillFromMatch(game, opp) {
		setGameNumber(game);
		setOpposition(opp);
		const existing = awards.find((a) => a.gameNumber.toLowerCase() === game.toLowerCase() && a.opposition.toLowerCase() === opp.toLowerCase());
		const moms = oppMomPlayers(existing?.oppMom);
		setOppMom(moms[0] ?? "");
		setOppMomJoint(moms[1] ?? "");
		setPlayersPlayer(existing?.playersPlayer || existing?.managerPlayer || "");
		setTab("awards");
	}
	(0, import_react.useEffect)(() => {
		if (!gameNumber.trim() || !opposition.trim() || !players.length) return;
		const saved = appearances[gameKey$1(gameNumber.trim(), opposition.trim())];
		setPlayed(saved ?? []);
	}, [
		gameNumber,
		opposition,
		appearances,
		players
	]);
	async function onSavePlayed() {
		if (!canSave) return toast.error(SAVE_LOCK);
		if (!gameNumber.trim() || !opposition.trim()) {
			toast.error("Pick a round first.");
			return;
		}
		setSaving(true);
		try {
			const res = await saveAppearances({ data: {
				gameNumber: gameNumber.trim(),
				opposition: opposition.trim(),
				players: played
			} });
			if (res.success) setAppearances(res.appearances);
			toast.success("Playing squad saved.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save who played.");
		} finally {
			setSaving(false);
		}
	}
	async function onSaveAwards() {
		if (!canSave) return toast.error(SAVE_LOCK);
		if (!gameNumber.trim() || !opposition.trim()) {
			toast.error("Pick a round first.");
			return;
		}
		setSaving(true);
		try {
			const res = await saveMatchAwards({ data: {
				gameNumber: gameNumber.trim(),
				opposition: opposition.trim(),
				oppMom: joinOppMom([oppMom, oppMomJoint]),
				playersPlayer,
				managerPlayer: playersPlayer
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			toast.success("Weekly awards saved.");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save awards.");
		} finally {
			setSaving(false);
		}
	}
	async function onResetVotes() {
		if (!canSave) return toast.error(SAVE_LOCK);
		if (resetConfirm !== "RESET VOTES") {
			toast.error("Type RESET VOTES in the box first.");
			return;
		}
		setResetting(true);
		try {
			const res = await resetParentVotes({ data: { confirm: resetConfirm } });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setResetConfirm("");
			toast.success("Parent 3-2-1 cleared. Training, awards and graphs are untouched.");
			await load();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not reset votes.");
		} finally {
			setResetting(false);
		}
	}
	async function onSaveNote(player) {
		if (!canSave) return toast.error(SAVE_LOCK);
		setSavingNote(true);
		try {
			const res = await savePlayerNote({ data: {
				player,
				note: draftNote
			} });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setNotes((prev) => ({
				...prev,
				[player]: draftNote.trim()
			}));
			toast.success(draftNote.trim() ? "Note saved." : "Note deleted.");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save note.");
		} finally {
			setSavingNote(false);
		}
	}
	const rounds = (0, import_react.useMemo)(() => bullsRoundList(leagueFixtures.length ? leagueFixtures : BULLS_FIXTURES), [leagueFixtures]);
	const selectedRound = (0, import_react.useMemo)(() => {
		const g = gameNumber.trim().toLowerCase();
		const o = opposition.trim().toLowerCase();
		return rounds.find((r) => r.gameNumber.toLowerCase() === g && r.opposition.toLowerCase() === o) ?? rounds.find((r) => r.opposition.toLowerCase() === o) ?? null;
	}, [
		rounds,
		gameNumber,
		opposition
	]);
	function pickRound(key) {
		const row = rounds.find((r) => r.key === key);
		if (!row) return;
		fillFromMatch(row.gameNumber, row.opposition);
	}
	const awardTotals = (0, import_react.useMemo)(() => tallyAwards(players, awards), [players, awards]);
	const isAdmin = coachRole === "admin" || isAdminName(coachName);
	const showDemo = isAdmin || isDemoName(coachName);
	const visibleTabs = TABS.filter((t) => t.id !== "users" || isAdmin);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
			onRefresh: () => void load(),
			refreshing: loading,
			boardLink: "vote"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 pb-[max(2rem,env(safe-area-inset-bottom))]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-accent",
							children: "Coach desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-bold uppercase tracking-tight",
							children: coachName || "Coach"
						}),
						readRememberedAdminEmail() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["Super admin · ", readRememberedAdminEmail()]
						}) : viewingDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: ["Viewing demo · ", viewingDemoName]
						}) : null
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs font-semibold uppercase tracking-wide text-accent",
							onClick: lock,
							children: "Lock"
						}), !readCoachBio() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs font-semibold uppercase tracking-wide text-muted",
							onClick: () => {
								(async () => {
									const ok = await registerCoachBio(coachName || "Coach", coachRole, sessionPin || "0803");
									toast.success(ok ? "Fingerprint saved on this phone." : "Could not save fingerprint here. Try Chrome or Safari on the phone.");
								})();
							},
							children: "Save fingerprint"
						}) : null]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2",
					children: visibleTabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(t.id),
						className: cn("h-11 rounded-md px-1 text-xs font-semibold uppercase tracking-wide", tab === t.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg"),
						children: t.label
					}, t.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: liveOn && sessionPin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhoOnline, { pin: sessionPin || adminPin }) : null
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SafePanel, {
						label: tab,
						children: [
							tab === "awards" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-bold uppercase tracking-tight",
										children: "Match awards"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-3 text-sm text-muted",
										children: "Opp MOM 20, or 10 each if shared · players’ / manager’s player 10."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "award-round",
										children: "Round"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldSelect, {
										id: "award-round",
										className: "mb-2",
										value: selectedRound?.key ?? "",
										onChange: (e) => pickRound(e.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "Pick a fixture…"
										}), rounds.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: r.key,
											children: [
												r.gameNumber,
												" · ",
												r.opposition,
												" (",
												r.home ? "H" : "A",
												")",
												r.us != null && r.them != null ? ` · ${r.us}–${r.them}` : ""
											]
										}, r.key))]
									}),
									selectedRound ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mb-3 text-sm text-muted",
										children: [
											formatKickoff(selectedRound.kickoff, "EEE d MMM · HH:mm"),
											selectedRound.home ? " · Home" : " · Away",
											selectedRound.venue ? ` · ${selectedRound.venue}` : "",
											selectedRound.us != null && selectedRound.them != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-semibold text-fg",
												children: [
													" ",
													"· ",
													selectedRound.us,
													"–",
													selectedRound.them
												]
											}) : " · no result yet"
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-3 text-sm text-muted",
										children: "Linked to our Wigan fixtures and results."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "award-mom",
										children: "Opposition MOM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
										id: "award-mom",
										label: "Opposition MOM",
										value: oppMom,
										players,
										className: "mb-3",
										onChange: setOppMom
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "award-mom-joint",
										children: "Joint opposition MOM"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
										id: "award-mom-joint",
										label: "Joint opposition MOM",
										value: oppMomJoint,
										players,
										exclude: oppMom ? [oppMom] : [],
										placeholder: "No share",
										className: "mb-3",
										onChange: setOppMomJoint
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "award-pp",
										children: "Players’ / manager’s player"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
										id: "award-pp",
										label: "Players’ player",
										value: playersPlayer,
										players,
										className: "mb-3",
										onChange: setPlayersPlayer
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted",
										children: "Who played"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayedPicker, {
										players,
										selected: played,
										onChange: setPlayed
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											disabled: saving,
											onClick: () => void onSavePlayed(),
											children: "Save squad"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											disabled: saving,
											onClick: () => void onSaveAwards(),
											children: saving ? "Saving…" : "Save awards"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 flex flex-col gap-1 text-sm",
										children: awardTotals.filter((r) => r.oppMom + r.playersPlayer > 0).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shortName(r.name) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "tabular-nums text-muted",
												children: [
													"MOM ",
													r.oppMom,
													" · PP ",
													r.playersPlayer
												]
											})]
										}, r.name))
									})
								]
							}) : null,
							tab === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullScoreTable, {
								players,
								history,
								appearances,
								awards,
								sessions,
								tests
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearTable, {
									players,
									history,
									appearances,
									awards,
									sessions,
									tests,
									yearOnly: true
								})
							})] }) : null,
							tab === "pitch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PitchBoard, {
								players,
								currentMatch,
								appearances,
								canSave
							}) : null,
							tab === "mins" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinutesPanel, {}) : null,
							tab === "ballots" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoteSheet, {
								players,
								history,
								currentMatch,
								onSaved: () => load()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mt-4 rounded-xl border border-border bg-surface p-4 shadow-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "reset-votes",
										children: "Type RESET VOTES"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
										id: "reset-votes",
										className: "mb-2",
										value: resetConfirm,
										onChange: (e) => setResetConfirm(e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "w-full",
										disabled: resetting || resetConfirm !== "RESET VOTES",
										onClick: () => void onResetVotes(),
										children: resetting ? "Resetting…" : "Set parent 3-2-1 to 0"
									})
								]
							})] }) : null,
							tab === "parents" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentLoginsPanel, { coachPin: sessionPin || adminPin }), isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditLog, { coachPin: sessionPin || adminPin }) : null] }) : null,
							tab === "progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "flex flex-col gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformancePick, {
										players,
										history,
										awards,
										sessions,
										tests,
										appearances,
										onRefresh: () => load()
									}),
									openPlayer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerProgressCard, {
											season: computePlayerSeason(openPlayer, players, history, awards, appearances),
											note: notes[openPlayer],
											showAwards: true,
											onRefresh: () => load()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
											htmlFor: "coach-note",
											className: "mt-3",
											children: "Note for parent"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
											id: "coach-note",
											value: draftNote,
											onChange: (e) => setDraftNote(e.target.value)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											className: "mt-2 w-full",
											disabled: savingNote,
											onClick: () => void onSaveNote(openPlayer),
											children: savingNote ? "Saving…" : "Save note"
										})
									] }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
										id: "progress-lad",
										label: "Open lad",
										value: openPlayer || "",
										players,
										onChange: (name) => {
											setOpenPlayer(name);
											setDraftNote(notes[name] || "");
										}
									})
								]
							}) : null,
							tab === "train" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingPanel, {
								players,
								canSave
							}) : null,
							tab === "month" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PotmPanel, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyTables, {
										players,
										history,
										appearances,
										awards,
										sessions,
										tests,
										full: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrizeExamples, {})
							] }) : null,
							tab === "year" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YearTable, {
								players,
								history,
								appearances,
								awards,
								sessions,
								tests
							}) : null,
							tab === "tests" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FitnessPanel, {
								players,
								canSave,
								coachPin: sessionPin || adminPin
							}) : null,
							tab === "rules" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RulesCard, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaguePanel, { editable: canSave })] }) : null,
							tab === "users" && isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachUsersPanel, {
								adminPin: adminPin || sessionPin,
								onAdminPin: setAdminPin
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquadPanel, {
								players: bullsPlayers.length ? bullsPlayers : players,
								pin: sessionPin || adminPin,
								onPlayers: (list) => {
									setBullsPlayers(list);
									if (!viewingDemo && !isDemoName(coachName)) setPlayers(list);
								}
							})] }) : null
						]
					}, tab), showDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoPanel, {
						coachName,
						isAdmin,
						pin: sessionPin,
						onOpenTab: (next) => setTab(next),
						onPlayers: (list) => {
							if (isDemoName(coachName) || viewingDemo) setPlayers(list);
						},
						onViewDemo: (owner, list) => {
							setViewingDemo(true);
							setViewingDemoName(owner);
							setPlayers(list);
						}
					}) : null]
				})
			]
		})]
	});
}
var KEYS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"C",
	"0",
	"⌫"
];
function KeyPad({ onDigit, onClear, onDelete, disabled = false }) {
	const last = (0, import_react.useRef)({
		key: "",
		at: 0
	});
	function fire(key, fn) {
		if (disabled) return;
		const now = Date.now();
		if (last.current.key === key && now - last.current.at < 200) return;
		last.current = {
			key,
			at: now
		};
		fn();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-3 gap-2",
		style: { touchAction: "manipulation" },
		children: KEYS.map((k) => {
			const action = k === "C" ? onClear : k === "⌫" ? onDelete : () => onDigit(k);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled,
				className: cn("flex h-16 select-none items-center justify-center rounded-xl border border-border bg-surface", "font-display text-2xl font-bold text-fg", "active:bg-accent active:text-accent-fg", (k === "C" || k === "⌫") && "text-base tracking-wide text-muted"),
				style: {
					touchAction: "manipulation",
					WebkitUserSelect: "none"
				},
				onClick: () => fire(k, action),
				children: k === "C" ? "Clear" : k
			}, k);
		})
	});
}
function CoachLock({ opening = false }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const pinRef = (0, import_react.useRef)("");
	const [pinError, setPinError] = (0, import_react.useState)("");
	const [checking, setChecking] = (0, import_react.useState)(false);
	const [showPad, setShowPad] = (0, import_react.useState)(false);
	const unlocking = (0, import_react.useRef)(false);
	function openSeat(name, role, pinValue) {
		if (unlocking.current) return;
		unlocking.current = true;
		writeCoachSession(name, role === "admin" || isAdminName(name) ? "admin" : "coach", pinValue);
	}
	function onEmailUnlock() {
		const seat = seatForAdminEmail(email);
		if (!seat) {
			setPinError(isLikelyEmail(email) ? "That email is not a super admin. Use the Brian Lee club email." : "Type your full email, then Continue.");
			return;
		}
		setPinError("");
		rememberAdminEmail(email);
		openSeat(seat.name, seat.role, seat.pin);
	}
	function setPinFrom(raw) {
		const next = raw.replace(/\D/g, "").slice(0, 6);
		pinRef.current = next;
		setPin(next);
		setPinError("");
		if (next.length >= 4 && LOCAL_UNLOCKS[next]) window.setTimeout(() => {
			if (pinRef.current === next) onUnlock(next);
		}, 80);
	}
	async function onUnlock(raw) {
		const clean = (raw ?? pinRef.current).replace(/\D/g, "");
		if (!clean) {
			setPinError("Other coaches: tap the numbers, then Go.");
			return;
		}
		const local = LOCAL_UNLOCKS[clean];
		if (local) {
			openSeat(local.name, local.role, clean);
			return;
		}
		if (clean.length < 4) {
			setPinError("PIN is 4 to 6 digits.");
			return;
		}
		setChecking(true);
		try {
			const res = await Promise.race([checkCoachPin({ data: { pin: clean } }), new Promise((resolve) => {
				window.setTimeout(() => resolve({ ok: false }), 8e3);
			})]);
			if (res && "ok" in res && res.ok) {
				openSeat(res.name || "Coach", res.role === "admin" ? "admin" : "coach", clean);
				return;
			}
			setPinError("Wrong PIN.");
		} catch (err) {
			setPinError(err instanceof Error ? err.message : "Could not unlock.");
		} finally {
			setChecking(false);
		}
	}
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key !== "Enter" || showPad) return;
			const target = e.target;
			if (target && target.id !== "coach-email") return;
			e.preventDefault();
			onEmailUnlock();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [email, showPad]);
	const slots = Math.max(4, pin.length || 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-sm flex-col bg-bg px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/board",
				className: "text-xs font-semibold uppercase tracking-wide text-accent",
				children: "← Board"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-2xl font-bold uppercase tracking-tight",
				children: "Coach"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: opening ? "Opening desk…" : "Super admin: enter your email. No code needed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mt-6 text-xs font-semibold uppercase tracking-wide text-muted",
				htmlFor: "coach-email",
				children: "Super admin email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "coach-email",
				type: "email",
				inputMode: "email",
				autoComplete: "username",
				autoCapitalize: "none",
				autoCorrect: "off",
				spellCheck: false,
				disabled: checking || opening,
				value: email,
				placeholder: "you@email.com",
				className: "mt-2 h-14 w-full rounded-xl border border-border bg-surface px-4 text-base text-fg outline-none focus:ring-2 focus:ring-accent/50",
				onChange: (e) => {
					setEmail(e.target.value);
					setPinError("");
				},
				onKeyDown: (e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						onEmailUnlock();
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: checking || opening,
				className: "mt-3 h-14 w-full rounded-xl bg-accent font-display text-xl font-bold uppercase tracking-wide text-accent-fg disabled:opacity-70",
				onClick: onEmailUnlock,
				children: opening ? "Opening…" : "Continue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-6 text-xs font-semibold uppercase tracking-wide text-muted",
				onClick: () => setShowPad((v) => !v),
				children: showPad ? "Hide other coaches" : "Other coaches — number pad"
			}),
			showPad ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex h-14 items-center justify-center gap-3 rounded-xl border border-border bg-surface",
					children: Array.from({ length: slots }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-3.5 rounded-full", i < pin.length ? "bg-fg" : "border-2 border-muted") }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyPad, {
						disabled: checking || opening,
						onDigit: (d) => setPinFrom(pinRef.current + d),
						onClear: () => setPinFrom(""),
						onDelete: () => setPinFrom(pinRef.current.slice(0, -1))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: checking || opening || pin.length < 4,
					className: "mt-4 h-14 w-full rounded-xl border border-border bg-surface font-display text-lg font-bold uppercase tracking-wide text-fg disabled:opacity-70",
					onClick: () => void onUnlock(pinRef.current || pin),
					children: "Go"
				})
			] }) : null,
			pinError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-sm font-semibold text-accent",
				children: pinError
			}) : null
		]
	});
}
function restoreSession() {
	if (isCoachUnlocked()) return true;
	const remembered = readRememberedAdminEmail();
	const seat = remembered ? seatForAdminEmail(remembered) : null;
	if (!seat) return false;
	rememberAdminEmail(remembered);
	writeCoachSession(seat.name, seat.role, seat.pin);
	return true;
}
function CoachPage() {
	const shown = (0, import_react.useRef)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	(0, import_react.useLayoutEffect)(() => {
		const on = restoreSession();
		if (on) shown.current = true;
		setUnlocked(on);
		setReady(true);
		return subscribeCoachSession(() => {
			const next = isCoachUnlocked() || restoreSession();
			if (next) shown.current = true;
			if (shown.current && !next) return;
			setUnlocked(next || shown.current);
		});
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-dvh bg-bg" });
	if (!unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachLock, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoachDesk, {});
}
var SplitComponent = CoachPage;
//#endregion
export { SplitComponent as component };
