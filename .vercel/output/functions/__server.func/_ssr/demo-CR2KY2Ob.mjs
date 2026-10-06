import { d as TEAM_NAME } from "./brand-C_wD2nfD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/demo-CR2KY2Ob.js
var DEMO_LOGINS = [{
	name: "Dave Bailey",
	pin: "123456"
}, {
	name: "Gavin Massey",
	pin: "654321"
}];
var DEMO_USER = DEMO_LOGINS[0].name;
DEMO_LOGINS[0].pin;
function isDemoName(name) {
	const n = name.trim().toLowerCase();
	return DEMO_LOGINS.some((d) => d.name.toLowerCase() === n);
}
function demoForPin(pin) {
	return DEMO_LOGINS.find((d) => d.pin === pin.trim());
}
var DEMO_STEPS = [
	{
		id: "squad",
		tab: "pitch",
		title: "Your squad",
		try: "Add your own lads (number + name). They stay on your demo — they never replace the Bulls."
	},
	{
		id: "pitch",
		tab: "pitch",
		title: "Pitch & clock",
		try: "Pick a fixture, drop 9 lads, start the clock 0→30, then 2nd half 30→60 plus extra."
	},
	{
		id: "awards",
		tab: "awards",
		title: "Match awards",
		try: "Set opposition MOM (20 pts) and players’ / manager’s player (10)."
	},
	{
		id: "train",
		tab: "train",
		title: "Friday training",
		try: "Attendance 10 + effort 10 + attitude 10 + achievement 10. Max 40."
	},
	{
		id: "tests",
		tab: "tests",
		title: "Performance tests",
		try: "Log zig-zag 50m, 30m sprint, turns 3×4. +5 to complete each test, then a 5–1 grade for what they achieved."
	},
	{
		id: "mins",
		tab: "mins",
		title: "Game time",
		try: "Fair minutes: at least half a game where possible. Keepers play the full 60."
	},
	{
		id: "month",
		tab: "month",
		title: "Player of the month",
		try: "Full points through the 3rd Monday. Medals 1st, 2nd, 3rd. One-page certificate."
	},
	{
		id: "parents",
		tab: "parents",
		title: "What parents see",
		try: "Vote 3-2-1 (one per family), Top 3, rules, pick their lad for the line graph."
	},
	{
		id: "rules",
		tab: "rules",
		title: "How we play",
		try: "9v9, 60 minutes, rolling subs, fair game time, Bulls way — positive, no blaming."
	}
];
function demoWhatsAppText(user = DEMO_LOGINS[0]) {
	return [
		`Hi ${user.name.split(" ")[0]} — Brian here.`,
		`Have a look at the ${TEAM_NAME} coach desk. Look only — you will not see other users and you cannot overwrite our team.`,
		``,
		`1. Open the link below.`,
		`2. Unlock with code ${user.pin}.`,
		`3. Open Demo.`,
		`4. Add your own lads if you want (shirt number + name). They stay yours.`,
		`5. Open Pitch — drop them into positions, change formation, start the clock.`,
		`6. Have a look at Awards, Train, Tests, Mins, Month and Rules.`,
		``,
		`Look and move freely. Saving our Bulls data is locked.`,
		`Any questions, WhatsApp me.`
	].join("\n");
}
//#endregion
export { demoWhatsAppText as a, demoForPin as i, DEMO_STEPS as n, isDemoName as o, DEMO_USER as r, DEMO_LOGINS as t };
