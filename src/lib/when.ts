import { format, parseISO } from "date-fns";

export function formatKickoff(iso: string, pattern: string): string {
  try {
    const raw = iso.length === 16 ? `${iso}:00` : iso;
    const d = parseISO(raw);
    if (Number.isNaN(d.getTime())) return "";
    return format(d, pattern);
  } catch {
    return "";
  }
}

export function localDateStamp(d = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const pick = (t: string) => parts.find((p) => p.type === t)?.value || "";
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

export function asDayStamp(value: unknown): string {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return localDateStamp(value);
  }
  const s = String(value ?? "").trim();
  if (!s) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  if (Number.isFinite(d.getTime())) return localDateStamp(d);
  return "";
}

/** Monday of the current week (local). */
export function weekStartStamp(from = new Date()): string {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const back = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - back);
  return localDateStamp(d);
}

/** Next Monday (local). */
export function nextMondayStamp(from = new Date()): string {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const add = (8 - d.getDay()) % 7 || 7;
  d.setDate(d.getDate() + add);
  return localDateStamp(d);
}
/** Last Friday (today if it is Friday). Use this for logging training. */
export function lastFridayStamp(from = new Date()): string {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const back = (d.getDay() + 2) % 7;
  d.setDate(d.getDate() - back);
  return localDateStamp(d);
}

/** Upcoming Friday (today if it is Friday). */
export function nextFridayStamp(from = new Date()): string {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const add = (5 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + add);
  return localDateStamp(d);
}
