import { n as format, t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/when-BGtZJU2t.js
function formatKickoff(iso, pattern) {
	try {
		const raw = iso.length === 16 ? `${iso}:00` : iso;
		const d = parseISO(raw);
		if (Number.isNaN(d.getTime())) return "";
		return format(d, pattern);
	} catch {
		return "";
	}
}
function localDateStamp(d = /* @__PURE__ */ new Date()) {
	const parts = new Intl.DateTimeFormat("en-GB", {
		timeZone: "Europe/London",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(d);
	const pick = (t) => parts.find((p) => p.type === t)?.value || "";
	return `${pick("year")}-${pick("month")}-${pick("day")}`;
}
function asDayStamp(value) {
	if (value instanceof Date && Number.isFinite(value.getTime())) return localDateStamp(value);
	const s = String(value ?? "").trim();
	if (!s) return "";
	if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
	const d = new Date(s);
	if (Number.isFinite(d.getTime())) return localDateStamp(d);
	return "";
}
/** Monday of the current week (local). */
function weekStartStamp(from = /* @__PURE__ */ new Date()) {
	const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	const back = (d.getDay() + 6) % 7;
	d.setDate(d.getDate() - back);
	return localDateStamp(d);
}
/** Next Monday (local). */
function nextMondayStamp(from = /* @__PURE__ */ new Date()) {
	const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	const add = (8 - d.getDay()) % 7 || 7;
	d.setDate(d.getDate() + add);
	return localDateStamp(d);
}
/** Last Friday (today if it is Friday). Use this for logging training. */
function lastFridayStamp(from = /* @__PURE__ */ new Date()) {
	const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	const back = (d.getDay() + 2) % 7;
	d.setDate(d.getDate() - back);
	return localDateStamp(d);
}
//#endregion
export { nextMondayStamp as a, localDateStamp as i, formatKickoff as n, weekStartStamp as o, lastFridayStamp as r, asDayStamp as t };
