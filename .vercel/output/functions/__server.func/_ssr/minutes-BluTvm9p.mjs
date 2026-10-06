//#region node_modules/.nitro/vite/services/ssr/assets/minutes-BluTvm9p.js
var HALF_MS = 18e5;
function startedAtMs(value) {
	if (value == null || value === "") return null;
	if (typeof value === "number" && Number.isFinite(value)) return value;
	if (value instanceof Date) {
		const t = value.getTime();
		return Number.isFinite(t) ? t : null;
	}
	const t = Date.parse(String(value));
	return Number.isFinite(t) ? t : null;
}
function clockElapsedMs(clock, now = Date.now()) {
	if (!clock.running) return Math.max(0, clock.elapsedMs);
	const t = startedAtMs(clock.startedAt);
	if (t == null) return Math.max(0, clock.elapsedMs);
	return Math.max(0, clock.elapsedMs + Math.max(0, now - t));
}
function gameMinute(clock, now = Date.now()) {
	return Math.floor(clockElapsedMs(clock, now) / 6e4);
}
function formatClock(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
function formatInjury(ms) {
	return `+${formatClock(ms)}`;
}
function matchFace(elapsedMs, half = 1, halfMarkMs = 0) {
	if (half === 1) {
		const extra = Math.max(0, elapsedMs - HALF_MS);
		return {
			displayMs: Math.min(elapsedMs, HALF_MS),
			extraMs: extra,
			extraLabel: "Injury",
			inExtra: extra > 0
		};
	}
	const second = Math.max(0, elapsedMs - halfMarkMs);
	const extra = Math.max(0, second - HALF_MS);
	return {
		displayMs: HALF_MS + Math.min(second, HALF_MS),
		extraMs: extra,
		extraLabel: "Overtime",
		inExtra: extra > 0
	};
}
function stintMinutes(stint, currentMinute, ended) {
	const off = stint.offMinute ?? currentMinute;
	return Math.max(0, off - stint.onMinute);
}
function playerMinutes(stints, currentMinute, ended) {
	const next = {};
	for (const stint of stints) {
		const row = next[stint.player] ?? {
			minutes: 0,
			started: false,
			on: false
		};
		row.minutes += stintMinutes(stint, currentMinute, ended);
		row.started = row.started || stint.started;
		row.on = row.on || stint.offMinute == null;
		next[stint.player] = row;
	}
	return next;
}
//#endregion
export { matchFace as a, gameMinute as i, formatClock as n, playerMinutes as o, formatInjury as r, stintMinutes as s, clockElapsedMs as t };
