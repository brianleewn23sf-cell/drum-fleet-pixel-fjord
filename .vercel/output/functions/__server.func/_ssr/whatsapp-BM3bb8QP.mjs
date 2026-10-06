import { a as parsePlayer, d as shortName, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { n as PRIZE_LINE } from "./score-from-j42ACoaw.mjs";
import { n as formatKickoff } from "./when-BGtZJU2t.mjs";
import { d as TEAM_NAME, l as MOTTO_EN, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { a as RESERVE_SLOTS, c as UNAVAILABLE_SLOTS, i as INJURED_SLOTS, l as formationById, o as SLOT_NAMES, s as SUB_SLOTS, t as BENCH_SLOTS } from "./formations-pQSTjnGH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-BM3bb8QP.js
var ROSTER = {
	"Zachary Read": {
		bands: ["gk"],
		plays: "goalkeeper",
		strongest: "in goal"
	},
	"Harry Parr": {
		bands: ["gk"],
		plays: "goalkeeper",
		strongest: "in goal"
	},
	"Ruben Biddiss": {
		bands: [
			"wb",
			"wide",
			"back"
		],
		plays: "left back, left wing-back and left wing",
		strongest: "down the left"
	},
	"Louie Biddiss": {
		bands: [
			"fwd",
			"mid",
			"back"
		],
		plays: "CF, CAM, CM, CDM, CB and right back",
		strongest: "through the middle"
	},
	"Kody Cox": {
		bands: ["any"],
		plays: "anywhere — CB, full-back, wing-back, CDM, CM, CAM or CF",
		strongest: "wherever we need him"
	},
	"Cullen Atkinson-Lee": {
		bands: [
			"back",
			"wb",
			"mid",
			"fwd"
		],
		plays: "sweeper, CB, right or left back, CDM, and up front",
		strongest: "at the back"
	},
	"Caleb Connelly": {
		bands: ["back", "mid"],
		plays: "right back, CB, left back and CDM",
		strongest: "in the back line"
	},
	"Jacob Sands": {
		bands: [
			"wide",
			"fwd",
			"mid"
		],
		plays: "left wing, left forward, CM and CAM",
		strongest: "on the left and in midfield"
	},
	"Logan Massey": {
		bands: ["any"],
		plays: "anywhere",
		strongest: "wherever we need him"
	},
	"Henry Bearman": {
		bands: [
			"wide",
			"wb",
			"fwd"
		],
		plays: "right wing, right wing-back, right mid and right forward",
		strongest: "down the right"
	},
	"Jacob Hill": {
		bands: [
			"wb",
			"wide",
			"fwd"
		],
		plays: "LWB, RWB, left mid, left wing, left forward and right wing",
		strongest: "as a wing-back or wide"
	},
	"Archie Almond": {
		bands: [
			"mid",
			"wide",
			"fwd"
		],
		plays: "CAM, CM, left wing, right wing and CF",
		strongest: "in attacking midfield"
	},
	"William Brittain": {
		bands: ["fwd", "wide"],
		plays: "CF, right forward, left forward, RW and LW",
		strongest: "up front"
	},
	"Hayden Plumbley": {
		bands: ["back", "mid"],
		plays: "CB and CDM",
		strongest: "in the back and as a six"
	},
	"Isa Ali": {
		bands: ["fwd", "mid"],
		plays: "CF, CAM, right forward, left forward and CM",
		strongest: "up front and in the 10"
	},
	"Max Shaw": {
		bands: ["back"],
		plays: "centre back",
		strongest: "in the middle of the back line"
	}
};
function normName(raw) {
	return parsePlayer(raw).name.replace(/\s*\(GK\)\s*/i, "").trim();
}
function isKeeper(raw) {
	const bands = playerRole(raw).bands;
	return bands.includes("gk") && !bands.includes("any");
}
function playerRole(raw) {
	const name = normName(raw);
	if (ROSTER[name]) return ROSTER[name];
	return Object.entries(ROSTER).find(([key]) => name.includes(key) || key.includes(name))?.[1] ?? {
		bands: ["any"],
		plays: "wherever we need him",
		strongest: "in the team"
	};
}
function slotBand(slotId) {
	if (slotId === "GK") return "gk";
	if ([
		"CB",
		"LCB",
		"RCB"
	].includes(slotId)) return "back";
	if (["LB", "RB"].includes(slotId)) return "wb";
	if ([
		"CDM",
		"LDM",
		"RDM",
		"CM",
		"LCM",
		"RCM",
		"CAM"
	].includes(slotId)) return "mid";
	if ([
		"LM",
		"RM",
		"LW",
		"RW",
		"LAM",
		"RAM"
	].includes(slotId)) return "wide";
	if ([
		"ST",
		"LS",
		"RS"
	].includes(slotId)) return "fwd";
	return "mid";
}
function slotFits(raw, slotId) {
	const role = playerRole(raw);
	if (role.bands.includes("any")) return true;
	const band = slotBand(slotId);
	if (role.bands.includes(band)) return true;
	if (band === "wb" && (role.bands.includes("back") || role.bands.includes("wide"))) return true;
	if (band === "wide" && (role.bands.includes("fwd") || role.bands.includes("wb"))) return true;
	if (band === "fwd" && role.bands.includes("wide")) return true;
	if (band === "back" && role.bands.includes("wb")) return true;
	return false;
}
function youLine(raw, slotId, slotLabel) {
	const role = playerRole(raw);
	const first = parsePlayer(raw).first;
	if (slotBand(slotId) === "gk" && role.bands.includes("gk")) return `${first}, this week you are in goal — your position.`;
	if (slotFits(raw, slotId)) return `${first}, this week you are ${slotLabel}. That is one of yours — you play ${role.plays}. Strongest ${role.strongest}.`;
	return `${first}, this week we need you at ${slotLabel}. You play ${role.plays}, strongest ${role.strongest}. Study this job and do it for the team.`;
}
function subYouLine(raw) {
	const role = playerRole(raw);
	return `${parsePlayer(raw).first}, you play ${role.plays}. Strongest ${role.strongest}.`;
}
function isBackThree$1(id) {
	return id.startsWith("3-") || id === "1-2-1-3-1";
}
function hasFrontThree$1(id) {
	return [
		"3-2-3",
		"2-3-3",
		"1-2-1-3-1"
	].includes(id);
}
function hasTwoCms$1(id) {
	return [
		"3-2-3",
		"3-2-2-1",
		"4-2-2",
		"2-4-2",
		"3-4-1",
		"2-3-2-1",
		"2-1-4-1"
	].includes(id);
}
function mix(seed) {
	let h = 2166136261;
	for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
	return Math.abs(h);
}
function pick(list, seed) {
	return list[mix(seed) % list.length];
}
var BULL = [
	"Be a Raging Bull. Make a difference.",
	"Go on like a Raging Bull and change this game.",
	"Step on as a Raging Bull — energy first, then quality.",
	"Make a difference. Be the Bull they cannot live with.",
	"When you go on, be a Raging Bull. Leave nothing out there."
];
var MOTTO = [
	`${MOTTO_LATIN} — ${MOTTO_EN}.`,
	`Remember: ${MOTTO_EN}.`,
	`${MOTTO_EN}. That is us.`,
	`${MOTTO_LATIN}. Wear it.`
];
function tacticsFor(bands, formationId, seed) {
	const threeBack = isBackThree$1(formationId);
	const threeUp = hasFrontThree$1(formationId);
	const twoMids = hasTwoCms$1(formationId);
	const lines = [];
	if (bands.includes("gk")) lines.push(pick(["In goal: FA law, 5 seconds to release. Organise the box.", "Keeper: corners and the centre show, open body. You pick short or long."], seed + "gk"));
	if (bands.includes("back") || bands.includes("wb") || bands.includes("any")) {
		if (threeBack) lines.push(pick([
			"At the back this week: wing-backs can overlap, two must stay. Speed and power.",
			"Three at the back: overlap if you are a wing-back, two stay, sweeper only comes if it is safe.",
			"Back three this week — compact without the ball, two stay when one wing-back goes."
		], seed + "back"));
		else lines.push(pick(["At the back: stay compact, win first balls, then second balls. Speed and power.", "Defending: show them wide, no free shots, hunt the second ball."], seed + "back2"));
	}
	if (bands.includes("mid") || bands.includes("any")) lines.push(pick([
		twoMids ? "In midfield: power. Rotate CAM and CDM, stay central, shoot if it is on." : "In midfield: power. Win first balls, then second balls, break the lines if it is safe.",
		"Middle of the park: compact without it, expand with it. If you are running in space, sprint with the ball.",
		"Centre-mid: first ball, second ball, simple if you have to, brave if you can."
	], seed + "mid"));
	if (bands.includes("wide") || bands.includes("fwd") || bands.includes("any")) {
		if (threeBack || threeUp) lines.push(pick([
			"Wide / up front: you are a forward / winger. Speed. When the wing-back goes, drop and let them overlap.",
			"Front: stretch them, press with the 9, drop when the wing-back overlaps.",
			"Up the sides: speed. Press their kicks. If you have space, sprint with the ball."
		], seed + "wide"));
		else lines.push(pick(["Up front and wide: speed. Press, stretch, finish. If you have space, sprint with the ball.", "Attacking: occupy their back, first thought is the net, press from the front."], seed + "fwd"));
	}
	return lines.join(" ");
}
function mixedSubTalk(player, formationId, salt) {
	const role = playerRole(player);
	const seed = `${salt}|${player}|${formationId}|sub`;
	const tactics = tacticsFor(role.bands, formationId, seed);
	return {
		duty: `${subYouLine(player)} ${tactics} ${pick(BULL, seed + "b")} ${pick(MOTTO, seed + "m")}`,
		withBall: "",
		withoutBall: ""
	};
}
function mixedStarterTalk(player, slotId, formationId, role, salt) {
	const seed = `${salt}|${player}|${slotId}|${formationId}`;
	const label = SLOT_NAMES[slotId] || slotId;
	const tactics = tacticsFor([slotBand(slotId)], formationId, seed);
	return {
		duty: `${youLine(player, slotId, label)} ${role.duty} ${tactics}`,
		withBall: `${role.withBall} ${pick(BULL, seed + "b")}`,
		withoutBall: role.withoutBall
	};
}
function newTalkSalt() {
	return String(Date.now());
}
var PRESS_RULE = "5-second rule: as a team, win the ball back inside 5 seconds. It is a general team instruction, not an individual one — chasing it on your own can change the shape of the team.";
var FIRST_BALLS = "Win the first ball. If that fails, win the second ball.";
var COMPACT_EXPAND = "Without the ball we stay compact. With the ball we expand.";
var POSSESSION_RULE = "3-second rule: once we are in possession, move the ball within 3 seconds — into feet, into space, or in the back of the net.";
var CARRY_RULE = "The only time the 3-second rule is not in place is when someone is running in space with the ball — a winger, an attacker, or a centre-mid breaking the lines. If there is space and it is safe to do so, sprint with that ball.";
var KEEPER_FACTS = [
	"FA law: the keeper has 5 seconds to release the ball.",
	"On goal kicks: right-back and left-back drop deep into each corner, open body, on their back foot, and show.",
	"The centre-back sets in the middle, open body, on their back foot.",
	"One centre-mid fills the hole in the middle.",
	"The keeper decides: short into a corner, more central, or long.",
	"Recycling: if the keeper is under no pressure, the passer drops into a corner, open body, on their back foot, and shows again."
];
var KEEPER_DUTY = "Organise the box and start attacks.";
var KEEPER_WITH = "FA law: 5 seconds to release. On a goal kick: full-backs in the corners (open body, back foot), centre-back open in the middle, one centre-mid filling the hole. You pick short to a corner, more central, or long. If you are under no pressure, recycle — the passer drops into a corner, open body, back foot, and shows.";
var KEEPER_WITHOUT = "Own the box. Claim what you can, sweep behind the line, organise the back.";
var BULLS_WAY = [
	"Without the ball we stay compact and drop. With the ball we expand and push forward.",
	"Win the first ball. If that fails, win the second ball.",
	"There is always a centre-forward staying on their last man so we are not compressed.",
	"Wide forwards press on their goal kicks with the centre-forward.",
	"Key tip: always watch the keeper’s eyes and body language to gauge where the ball is going.",
	"Positive attitude. No blaming. High fives all the time. We are one team — starters and subs together."
];
var BACK_THREE_NOTE = "Three at the back: left-back and right-back become wing-backs and can overlap down the wing, but two players must stay at the back. The centre-back / sweeper can bring the ball forward only if it is safe, to start an attack.";
var TWO_CM_NOTE = "Two centre-mids: rotate into CAM and CDM and stay in that central area. If you have space, have a shot.";
var WIDE_PRESS_NOTE = "Wide forwards press their goal kicks with the centre-forward.";
var FRONT_THREE_NOTE = "The two wide players up front are forwards / wingers. Stretch the pitch, press with the 9, finish. Speed up front.";
var OVERLAP_NOTE = "When the left wing-back and right wing-back go up, the two wide forwards / wingers drop back and let them overlap.";
var BRIAN_PROFILE = "Brian likes speed up front, power in the middle, and both speed and power at the back.";
var SUB_BRIEF = "Subs are impact players. Every game, you mean as much as who starts. Stay involved on the side: warm up, stretch, keep the body ready, listen, high fives. Study the starters. Speed up front, power in the middle, speed and power at the back. When you go on, you become that position — make a difference. Change the game. Bring energy, win first balls, then second balls, and leave nothing out there. Everyone will play their part.";
var NEGATIVE_NOTE = "We play the Bulls way: supportive, positive, great team spirit. Negativity, swearing or poor behaviour means less game time, and a suspension if we have to — because we care how these lads grow.";
var HOME_PRACTICE = "You are not with us on match day. Keep focused. Practice receiving the ball on the back foot, in an open body position, so you keep up to speed with the squad. Still one of us.";
var INJURED_NOTE = "Get well. Still part of this team. You cannot train if you are injured. Keep focused. When you can, practice receiving the ball on the back foot, in an open body position.";
function injuredNoteFor(player) {
	const { name, first } = parsePlayer(player);
	if (name.includes("Harry Parr") || first === "Harry") return "Get well soon Harry — our own stunt man. You cannot train if you are injured. Keep focused. When you can, practice receiving the ball on the back foot, in an open body position.";
	return INJURED_NOTE;
}
var ROLES = {
	GK: {
		duty: KEEPER_DUTY,
		with: KEEPER_WITH,
		without: KEEPER_WITHOUT
	},
	CB: {
		duty: "Centre of the back line. Win first balls, step in, keep us compact.",
		with: "3 seconds: simple into the 6 or full-back, or a line-breaking pass into space. On a goal kick: open body in the centre, on your back foot, and show. If you play back to the keeper under no pressure, drop into a corner, open body, and show again.",
		without: "stop the central threat, drop or step as a unit, win the header."
	},
	LCB: {
		duty: "Left centre-back. Cover the channel, play out, protect the inside.",
		with: "3 seconds: into the left side or midfield feet — or clip into space. On a goal kick: open body, on your back foot. If you are the widest of the two, you can drop toward the left corner.",
		without: "show them wide, win it back, no free shots."
	},
	RCB: {
		duty: "Right centre-back. Cover the channel, play out, protect the inside.",
		with: "3 seconds: into the right side or midfield feet — or clip into space. On a goal kick: open body, on your back foot. If you are the widest of the two, you can drop toward the right corner.",
		without: "show them wide, win it back, no free shots."
	},
	LB: {
		duty: "Left side of the back. Defend the touchline, join in when we have it.",
		with: "3 seconds: down the line into space, or inside into feet. Overlap if it’s on. On a goal kick: drop deep into the left corner, open body, on your back foot, and show. If you recycle to the keeper under no pressure, drop into the corner again and show.",
		without: "stop the winger, recover inside, hunt the second ball."
	},
	RB: {
		duty: "Right side of the back. Defend the touchline, join in when we have it.",
		with: "3 seconds: down the line into space, or inside into feet. Overlap if it’s on. On a goal kick: drop deep into the right corner, open body, on your back foot, and show. If you recycle to the keeper under no pressure, drop into the corner again and show.",
		without: "stop the winger, recover inside, hunt the second ball."
	},
	CDM: {
		duty: "Screen in front of the back. Break up play, take the first pass, keep us moving.",
		with: "3 seconds: bounce into feet or turn and play forward into space. Never stall. On a goal kick: fill the hole in the middle if you are the nearest six.",
		without: "nearest man, cut passing lanes, win it and give it."
	},
	LDM: {
		duty: "Left of the double six. Protect the left half-space, recycle, press.",
		with: "3 seconds: into the 8/10 or wide man — feet or space, then move.",
		without: "jump the ball-side 8, double up, win it back."
	},
	RDM: {
		duty: "Right of the double six. Protect the right half-space, recycle, press.",
		with: "3 seconds: into the 8/10 or wide man — feet or space, then move.",
		without: "jump the ball-side 8, double up, win it back."
	},
	CM: {
		duty: "Middle of the park. Link defence to attack, demand the ball, set the tempo.",
		with: "3 seconds: forward into feet, around the corner into space, or a shot if it opens. On a goal kick: one of you fills the hole in the middle, open body, ready to bounce.",
		without: "press the pivot, fill the hole, win the second ball."
	},
	LCM: {
		duty: "Left centre-mid. Half-space runner, support the left, arrive in the box.",
		with: "3 seconds: combine with the left side, or split the centre into space. On a goal kick: one of you fills the hole in the middle.",
		without: "press their right, recover through the middle."
	},
	RCM: {
		duty: "Right centre-mid. Half-space runner, support the right, arrive in the box.",
		with: "3 seconds: combine with the right side, or split the centre into space. On a goal kick: one of you fills the hole in the middle.",
		without: "press their left, recover through the middle."
	},
	LM: {
		duty: "Left mid. Width on the left, 1v1, service into the box.",
		with: "3 seconds: take a man on into space, cut back into feet, or a shot.",
		without: "press their right-back, track the runner, win it high."
	},
	RM: {
		duty: "Right mid. Width on the right, 1v1, service into the box.",
		with: "3 seconds: take a man on into space, cut back into feet, or a shot.",
		without: "press their left-back, track the runner, win it high."
	},
	LW: {
		duty: "Wide forward / left winger. Stretch the pitch, isolate the full-back, finish attacks.",
		with: "3 seconds: in behind, across the keeper, or square into feet. Shoot if you’re in.",
		without: "press from the front-left, trap them on the touchline."
	},
	RW: {
		duty: "Wide forward / right winger. Stretch the pitch, isolate the full-back, finish attacks.",
		with: "3 seconds: in behind, across the keeper, or square into feet. Shoot if you’re in.",
		without: "press from the front-right, trap them on the touchline."
	},
	CAM: {
		duty: "Number 10. Between their lines, the killer pass, late into the box.",
		with: "3 seconds: set, turn, play in behind or have a strike. Do not go backwards unless you have to.",
		without: "press their 6, stop the switch, win it and go again."
	},
	LAM: {
		duty: "Left attacking mid. Inside-left, combine with the 9 and the wing.",
		with: "3 seconds: one-two into space, slip the 9, or a shot from the edge.",
		without: "press their right-centre, cut the split pass."
	},
	RAM: {
		duty: "Right attacking mid. Inside-right, combine with the 9 and the wing.",
		with: "3 seconds: one-two into space, slip the 9, or a shot from the edge.",
		without: "press their left-centre, cut the split pass."
	},
	ST: {
		duty: "The 9. Occupy centre-backs, finish, press first.",
		with: "3 seconds: shoot, square, or spin in behind. First thought is the net.",
		without: "you start the press. Curve their centre-backs, force the mistake."
	},
	LS: {
		duty: "Left striker. Channel runner, finish, press from the left of the front.",
		with: "3 seconds: across the keeper, lay into feet, or in behind. Net first.",
		without: "press their right-centre and full-back. Win it high."
	},
	RS: {
		duty: "Right striker. Channel runner, finish, press from the right of the front.",
		with: "3 seconds: across the keeper, lay into feet, or in behind. Net first.",
		without: "press their left-centre and full-back. Win it high."
	}
};
var SHAPE = {
	"3-3-2": "This week: 3-3-2. Back three, three across, two up. Compact without it, two strikers stretch them. Wing-backs can go — two stay.",
	"3-2-3": "This week: 3-2-3. Back three, two in midfield, a front three. Wide players are forwards / wingers. Wing-backs overlap, wingers drop.",
	"2-3-3": "This week: 2-3-3. Two at the back, three in midfield, a front three. Brave. Wide players are forwards / wingers. Speed up front.",
	"2-4-2": "This week: 2-4-2. Two centre-backs, a four across, two strikers. Flood the middle. Power in midfield, speed up front.",
	"3-4-1": "This week: 3-4-1. Back three, four in midfield, one 9. Control then release. Wing-backs overlap, two stay.",
	"4-3-1": "This week: 4-3-1. Back four, three mids, one 9. Solid, then the 10 makes the difference. Speed and power at the back.",
	"4-2-2": "This week: 4-2-2. Back four, two mids, two up. Stay compact, break in pairs. Speed up front.",
	"3-2-2-1": "This week: 3-2-2-1. Back three, two sixes, two tens, one 9. Overload between the lines. Wing-backs overlap.",
	"2-3-2-1": "This week: 2-3-2-1. Two at the back, three mids, two tens, one 9. Extra man in attack. Speed up front.",
	"2-1-4-1": "This week: 2-1-4-1. Two centre-backs, one 6, a four across, one 9. The 6 screens. Flood the middle. Wide mids can go.",
	"2-1-3-2": "This week: 2-1-3-2. Two centre-backs, one 6, three across, two up. The 6 screens. Wide mids can go. Two strikers stretch them.",
	"1-2-1-3-1": "This week: 1-2-1-3-1. One centre-back, two wing-backs, a six, a front three and a 9. Aggressive. Wingers drop when wing-backs overlap."
};
function shapeNote(formationId) {
	return SHAPE[formationId] ?? "Stay in your positions. Win it. Move it.";
}
function isBackThree(formationId) {
	return formationId.startsWith("3-") || formationId === "1-2-1-3-1";
}
function hasTwoCms(formationId) {
	return [
		"3-2-3",
		"3-2-2-1",
		"4-2-2",
		"2-4-2",
		"3-4-1",
		"2-3-2-1",
		"2-1-4-1"
	].includes(formationId);
}
function hasFrontThree(formationId) {
	return [
		"3-2-3",
		"2-3-3",
		"1-2-1-3-1"
	].includes(formationId);
}
function formationExtras(formationId) {
	const extra = [];
	const threeBack = isBackThree(formationId);
	const threeUp = hasFrontThree(formationId);
	if (threeBack) extra.push(BACK_THREE_NOTE);
	if (hasTwoCms(formationId)) extra.push(TWO_CM_NOTE);
	if (threeBack || threeUp) {
		extra.push(FRONT_THREE_NOTE);
		extra.push(OVERLAP_NOTE);
	}
	extra.push(WIDE_PRESS_NOTE);
	return extra;
}
var WING_BACKS = /* @__PURE__ */ new Set(["LB", "RB"]);
var SWEEPERS = /* @__PURE__ */ new Set(["CB"]);
var PAIR_MIDS = /* @__PURE__ */ new Set([
	"LCM",
	"RCM",
	"LDM",
	"RDM",
	"CM",
	"CDM"
]);
var WIDE_WINGERS = /* @__PURE__ */ new Set([
	"LW",
	"RW",
	"LS",
	"RS",
	"LM",
	"RM",
	"LAM",
	"RAM"
]);
var WIDE_FORWARD = /* @__PURE__ */ new Set([
	"LW",
	"RW",
	"LM",
	"RM",
	"LS",
	"RS",
	"ST"
]);
var CARRY = /* @__PURE__ */ new Set([
	"LW",
	"RW",
	"LS",
	"RS",
	"ST",
	"CAM",
	"LAM",
	"RAM",
	"CM",
	"LCM",
	"RCM",
	"LM",
	"RM"
]);
function fillBrief(formationId) {
	const next = {};
	const backThree = isBackThree(formationId);
	const twoMids = hasTwoCms(formationId);
	const frontThree = hasFrontThree(formationId);
	const overlap = backThree || frontThree;
	for (const [id, role] of Object.entries(ROLES)) {
		if (id === "GK") {
			next.GK = {
				duty: role.duty,
				withBall: role.with,
				withoutBall: role.without
			};
			continue;
		}
		let withBall = role.with;
		let withoutBall = `${FIRST_BALLS} Stay compact. ${role.without}`;
		let duty = role.duty;
		if (backThree && WING_BACKS.has(id)) {
			duty = "Wing-back this week. Overlap when we have it. Two must stay at the back. Speed and power.";
			withBall += " Overlap down your wing. When you go up, the wide forward / winger drops and lets you through. Two stay at the back.";
		}
		if (backThree && SWEEPERS.has(id)) {
			duty = `${duty} Sweeper this week. Speed and power at the back.`;
			withBall += " Bring the ball forward only if it is safe, to start an attack. Two stay at the back.";
		}
		if (twoMids && PAIR_MIDS.has(id)) {
			duty = `${duty} Power in the middle this week.`;
			withBall += " Rotate into CAM and CDM. Stay central. If you have space, have a shot.";
		}
		if (WIDE_FORWARD.has(id)) withoutBall += ` Press their goal kicks with the 9. Watch the keeper’s eyes.`;
		if (overlap && WIDE_WINGERS.has(id)) {
			duty = `${duty} Wide forward / winger this week. Speed up front.`;
			withBall += " When the wing-back goes up, drop back and let them overlap.";
		}
		if (id === "ST") duty = `${duty} Speed up front this week. Stay on their last man.`;
		if (CARRY.has(id)) withBall += " If you are running in space and it is safe, sprint with the ball.";
		next[id] = {
			duty,
			withBall,
			withoutBall
		};
	}
	return next;
}
function usualSlotIds(player, plans) {
	const counts = /* @__PURE__ */ new Map();
	for (const plan of plans) for (const [slot, name] of Object.entries(plan.lineup)) {
		if (name !== player) continue;
		if (/^(SUB|RES|INJ|OUT)/.test(slot)) continue;
		counts.set(slot, (counts.get(slot) ?? 0) + 1);
	}
	return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([slot]) => slot);
}
function usualRoles(player, plans) {
	return usualSlotIds(player, plans).map((slot) => SLOT_NAMES[slot] || slot).join(" / ");
}
function benchKind(slotId) {
	if (slotId.startsWith("SUB")) return "sub";
	if (slotId.startsWith("RES")) return "reserve";
	if (slotId.startsWith("INJ")) return "injured";
	if (slotId.startsWith("OUT")) return "unavailable";
	return null;
}
function roleBriefForPlayer(kind, player, formationId, plans, salt = formationId) {
	if (kind === "injured") return {
		duty: injuredNoteFor(player),
		withBall: "",
		withoutBall: ""
	};
	if (kind === "unavailable" || kind === "reserve") return {
		duty: "",
		withBall: "",
		withoutBall: ""
	};
	return mixedSubTalk(player, formationId, salt);
}
function personaliseBrief(player, slotId, role, formationId = "", salt = "") {
	if (formationId && salt) return mixedStarterTalk(player, slotId, formationId, role, salt);
	return {
		duty: `${youLine(player, slotId, SLOT_NAMES[slotId] || slotId)} ${role.duty}`,
		withBall: role.withBall,
		withoutBall: role.withoutBall
	};
}
function fillLineupBrief(formationId, lineup, plans = [], salt = formationId) {
	const roles = fillBrief(formationId);
	const next = {};
	for (const slot of formationById(formationId).slots) {
		const role = roles[slot.id] ?? {
			duty: "",
			withBall: "",
			withoutBall: ""
		};
		const player = lineup[slot.id];
		next[slot.id] = player ? personaliseBrief(player, slot.id, role, formationId, salt) : role;
	}
	return {
		...next,
		...fillBenchBriefs(formationId, lineup, plans, salt)
	};
}
function fillBenchBriefs(formationId, lineup, plans, salt = formationId) {
	const next = {};
	for (const id of BENCH_SLOTS) {
		const player = lineup[id];
		const kind = benchKind(id);
		if (!player || !kind) continue;
		next[id] = roleBriefForPlayer(kind, player, formationId, plans, salt);
	}
	return next;
}
function benchTalk(kind, player, plans, brief, slotId) {
	const saved = slotId ? brief[slotId] : void 0;
	if (saved && (saved.duty || saved.withBall || saved.withoutBall)) return [
		saved.duty,
		saved.withBall && `With. ${saved.withBall}`,
		saved.withoutBall && `Without. ${saved.withoutBall}`
	].filter(Boolean).join(" ");
	const built = roleBriefForPlayer(kind, player, "3-3-2", plans);
	return [
		built.duty,
		built.withBall && `With. ${built.withBall}`,
		built.withoutBall && `Without. ${built.withoutBall}`
	].filter(Boolean).join(" ");
}
function voteReminderWhatsAppText() {
	return `${TEAM_NAME}

Just a nudge. Standish voting is still open. Open the app, pick your lad, then 3, 2 and 1. Not your own child. Voting gives your lad 1 point.

Cobras is Sunday 11 Oct, 10:00, Laithwaite Park Hub. No score for that game until it is played.

${MOTTO_LATIN} — ${MOTTO_EN}

Tap the link:`;
}
function pregameWhatsAppText(input) {
	const opposition = input.opposition;
	const formation = formationById(input.formation ?? "3-3-2");
	const lineup = input.lineup ?? {};
	const squadKeeper = PLAYERS.find((player) => /\(GK\)/i.test(player)) ?? "";
	const keeper = lineup.GK || squadKeeper;
	const where = [
		input.kickoff ? `${formatKickoff(input.kickoff, "EEEE d MMMM")} · ${formatKickoff(input.kickoff, "HH:mm")}` : "",
		input.home == null ? "" : input.home ? "Home" : "Away",
		input.venue ?? ""
	].filter(Boolean).join(" · ");
	const positions = formation.slots.map((slot) => {
		const name = SLOT_NAMES[slot.id] ?? slot.label;
		const picked = slot.id === "GK" ? keeper : lineup[slot.id];
		const lad = picked ? shortName(picked) : "—";
		return `${slot.label} · ${name} — ${lad}`;
	}).join("\n");
	const keeperBlock = keeper ? [
		`Keeper — ${shortName(keeper)}`,
		KEEPER_DUTY,
		`With the ball: ${KEEPER_WITH}`,
		`Without the ball: ${KEEPER_WITHOUT}`
	].join("\n") : "";
	const bench = [
		["Subs", SUB_SLOTS],
		["Reserves", RESERVE_SLOTS],
		["Injured", INJURED_SLOTS],
		["Unavailable", UNAVAILABLE_SLOTS]
	].map(([label, ids]) => {
		const names = ids.map((id) => lineup[id]).filter(Boolean).map((player) => shortName(player));
		return names.length ? `${label}\n${names.join("\n")}` : "";
	}).filter(Boolean).join("\n\n");
	return [
		`${TEAM_NAME} pre-game vs ${opposition}`,
		where,
		"",
		`Formation ${formation.name}`,
		shapeNote(formation.id),
		"",
		positions,
		"",
		keeperBlock,
		...bench ? ["", bench] : [],
		"",
		`${MOTTO_LATIN} — ${MOTTO_EN}`,
		"",
		"Have a look at the team. Look after each other, high fives, and no moaning. Start or come on, it’s the same job. Win the first ball, then the second. Go and enjoy it.",
		"",
		"Open the colour report:"
	].join("\n");
}
function trainingWhatsAppText(code, player) {
	const who = player ? ` for ${player}` : "";
	const pin = code ? `\nYour family code${who}: ${code}\n` : "\nUse the family code Brian sent you.\n";
	return `${PRIZE_LINE}

${TEAM_NAME} — train at home
${pin}
1. Open the link
2. Enter your family code
3. Watch the drills, film at home, send it in
4. Brian marks time and technique — more drills coming, so practise

Marks go on the Parent board — top 3 each month.

Friday training is still at Laithwaite Park.

Open here:`;
}
function boardShareText(input) {
	const places = input.lines.length ? input.lines.join("\n") : "Votes are on the board.";
	return `${TEAM_NAME}
v1.9 · 6 Oct 2026

${input.game} vs ${input.opposition}
${input.votes} parent vote${input.votes === 1 ? "" : "s"}

${places}

Scores are in this message. The old public link is not this board.`;
}
function whatsAppShareUrl(text, url) {
	const payload = [text.trim(), url.trim()].filter(Boolean).join("\n\n");
	return `https://wa.me/?text=${encodeURIComponent(payload)}`;
}
function stripOldLinks(text) {
	return text.replace(/https?:\/\/el-acre\.grok\.me[^\s]*/gi, "").replace(/https?:\/\/clover-hill-pixel-acre\.grok\.me[^\s]*/gi, "").replace(/https?:\/\/[a-z0-9-]+\.grok-sandbox\.com[^\s]*/gi, "").replace(/\n{3,}/g, "\n\n").trim();
}
/** Opens WhatsApp with the message already in the box, so it stays on screen. */
async function sendWhatsApp(title, text, url) {
	let message = stripOldLinks(text.trim());
	try {
		await navigator.clipboard.writeText(message);
	} catch {}
	const href = whatsAppShareUrl(message, "");
	if (/iPhone|iPad|Android/i.test(navigator.userAgent)) {
		window.location.href = href;
		return;
	}
	window.open(href, "_blank", "noopener,noreferrer");
}
//#endregion
export { roleBriefForPlayer as C, usualRoles as D, trainingWhatsAppText as E, voteReminderWhatsAppText as O, pregameWhatsAppText as S, shapeNote as T, formationExtras as _, FIRST_BALLS as a, newTalkSalt as b, NEGATIVE_NOTE as c, SUB_BRIEF as d, benchKind as f, fillLineupBrief as g, fillBrief as h, COMPACT_EXPAND as i, whatsAppShareUrl as k, POSSESSION_RULE as l, boardShareText as m, BULLS_WAY as n, HOME_PRACTICE as o, benchTalk as p, CARRY_RULE as r, KEEPER_FACTS as s, BRIAN_PROFILE as t, PRESS_RULE as u, injuredNoteFor as v, sendWhatsApp as w, personaliseBrief as x, isKeeper as y };
