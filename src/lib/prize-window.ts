import { asDayStamp, localDateStamp } from "@/lib/when";

/** Season training runs the whole campaign, not one prize month. */
export const SEASON_TRAINING_START = "2026-09-01";
export const SEASON_TRAINING_END = "2027-06-30";

/** Day after September’s 3rd Monday. Runs to October’s 3rd Monday, so both Fridays count. */
export const CURRENT_POTM_START = "2026-09-22";

export type PrizeWindow = {
  month: string;
  start: string;
  awardMonday: string;
  end: string;
  label: string;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function shiftPrizeMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

export function prizeMonthTitle(month: string): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function thirdMondayStamp(year: number, monthIndex: number): string {
  const first = new Date(year, monthIndex, 1);
  const firstMon = 1 + ((1 - first.getDay() + 7) % 7);
  return localDateStamp(new Date(year, monthIndex, firstMon + 14));
}

function awardDay(month: string): string {
  const [y, m] = month.split("-").map(Number);
  return thirdMondayStamp(y, m - 1);
}

function addDays(stamp: string, days: number): string {
  const [y, m, d] = stamp.split("-").map(Number);
  return localDateStamp(new Date(y, m - 1, d + days));
}

function pretty(stamp: string): string {
  const [y, m, d] = stamp.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export function prizeWindow(month: string): PrizeWindow {
  const end = awardDay(month);
  let start = `${month}-01`;
  if (month === "2026-09") start = SEASON_TRAINING_START;
  else if (month === "2026-10") start = CURRENT_POTM_START;
  else start = addDays(awardDay(shiftPrizeMonth(month, -1)), 1);
  return {
    month,
    start,
    awardMonday: end,
    end,
    label: `${prizeMonthTitle(month)} · ${pretty(start)} – ${pretty(end)}`,
  };
}

/** Which prize month a day belongs to. Blank if it is in the closed gap. */
export function prizeMonthForDay(iso: string): string {
  const day = asDayStamp(iso);
  if (!day) return "";
  if (day >= "2026-09-01" && day <= "2026-09-21") return "2026-09";
  if (day < CURRENT_POTM_START) return "";
  let month = "2026-10";
  for (let i = 0; i < 16; i++) {
    const win = prizeWindow(month);
    if (day < win.start) return "";
    if (day <= win.end) return month;
    month = shiftPrizeMonth(month, 1);
  }
  return "";
}

export function openPrizeMonth(d = new Date()): string {
  const day = localDateStamp(d);
  return prizeMonthForDay(day) || (day < CURRENT_POTM_START ? "2026-09" : "2026-10");
}
