import { PERF_KINDS, type PerfKindId } from "./perf-kinds.ts";
import { nextMondayStamp, weekStartStamp } from "./when.ts";

/** Same drill may be sent this many times in a Monday–Sunday week. */
export const HOME_TEST_MAX_PER_DRILL = 1;

export const HOME_TEST_WEEK = "Monday to Sunday";

export const HOME_TEST_PARAMS = [
  ["Pick", "Any drill, several, or all six."],
  ["Limit", "The same drill can only be sent once per week."],
  ["Week", "Monday to Sunday. Unlocks again on Monday."],
  ["Film", "Phone on a stand. 0.5–0.6×. Full course in shot."],
  ["Start", "Clock starts on GO. One run per clip."],
  ["Mark", "Upload the clip. The AI times GO to the last cones, marks technique /5, +5 to complete, speed /10 vs age 11."],
] as const;

export const HOME_TEST_STEPS = [
  "Enter your family code.",
  "Tick the drills for this week — any, or All remaining.",
  "Set the cones from the diagram.",
  "Phone on a stand, rear camera, 0.5–0.6× so start and finish are both in shot. 1080p · 30 fps. No slow-mo, no HDR.",
  "Clock starts on GO. One run per clip. Clock stops at the last cones — with-ball 30m when the ball goes through.",
  "Send the clip. The AI reads time and technique onto the board. That drill then locks until Monday.",
] as const;

export const HOME_TEST_FILM = [
  "Rear camera. Ultra-wide 0.5–0.6×.",
  "Stand or a wall — keep the phone still. Nobody walk in front of the lens.",
  "1080p or 720p · 30 fps · MP4 or MOV · no slow-mo · no HDR · under 3 minutes.",
  "Grid on to line up start and finish.",
] as const;

export function isDrillDoneThisWeek(usedThisWeek: string[], id: string): boolean {
  return usedThisWeek.includes(id);
}

export function remainingHomeDrills(usedThisWeek: string[]): PerfKindId[] {
  return PERF_KINDS.filter((k) => !usedThisWeek.includes(k.id)).map((k) => k.id);
}

export function homeWeekLabel(from = new Date()): { start: string; unlock: string } {
  const start = weekStartStamp(from);
  const next = nextMondayStamp(from);
  const [sy, sm, sd] = start.split("-");
  const [, nm, nd] = next.split("-");
  return {
    start: `${Number(sd)}/${Number(sm)}/${sy}`,
    unlock: `Monday ${Number(nd)}/${Number(nm)}`,
  };
}
