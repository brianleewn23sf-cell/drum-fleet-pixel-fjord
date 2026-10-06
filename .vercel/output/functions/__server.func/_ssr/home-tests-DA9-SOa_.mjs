import { a as nextMondayStamp, o as weekStartStamp } from "./when-BGtZJU2t.mjs";
import { t as PERF_KINDS } from "./perf-kinds-BtI2G2yH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-tests-DA9-SOa_.js
var HOME_TEST_WEEK = "Monday to Sunday";
var HOME_TEST_PARAMS = [
	["Pick", "Any drill, several, or all six."],
	["Limit", "The same drill can only be sent once per week."],
	["Week", "Monday to Sunday. Unlocks again on Monday."],
	["Film", "Phone on a stand. 0.5–0.6×. Full course in shot."],
	["Start", "Clock starts on GO. One run per clip."],
	["Mark", "Upload the clip. The AI times GO to the last cones, marks technique /5, +5 to complete, speed /10 vs age 11."]
];
var HOME_TEST_STEPS = [
	"Enter your family code.",
	"Tick the drills for this week — any, or All remaining.",
	"Set the cones from the diagram.",
	"Phone on a stand, rear camera, 0.5–0.6× so start and finish are both in shot. 1080p · 30 fps. No slow-mo, no HDR.",
	"Clock starts on GO. One run per clip. Clock stops at the last cones — with-ball 30m when the ball goes through.",
	"Send the clip. The AI reads time and technique onto the board. That drill then locks until Monday."
];
var HOME_TEST_FILM = [
	"Rear camera. Ultra-wide 0.5–0.6×.",
	"Stand or a wall — keep the phone still. Nobody walk in front of the lens.",
	"1080p or 720p · 30 fps · MP4 or MOV · no slow-mo · no HDR · under 3 minutes.",
	"Grid on to line up start and finish."
];
function isDrillDoneThisWeek(usedThisWeek, id) {
	return usedThisWeek.includes(id);
}
function remainingHomeDrills(usedThisWeek) {
	return PERF_KINDS.filter((k) => !usedThisWeek.includes(k.id)).map((k) => k.id);
}
function homeWeekLabel(from = /* @__PURE__ */ new Date()) {
	const start = weekStartStamp(from);
	const next = nextMondayStamp(from);
	const [sy, sm, sd] = start.split("-");
	const [, nm, nd] = next.split("-");
	return {
		start: `${Number(sd)}/${Number(sm)}/${sy}`,
		unlock: `Monday ${Number(nd)}/${Number(nm)}`
	};
}
//#endregion
export { homeWeekLabel as a, HOME_TEST_WEEK as i, HOME_TEST_PARAMS as n, isDrillDoneThisWeek as o, HOME_TEST_STEPS as r, remainingHomeDrills as s, HOME_TEST_FILM as t };
