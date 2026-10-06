//#region node_modules/.nitro/vite/services/ssr/assets/fitness-C3S1VXBB.js
/** True official clocks for U12. Longer than this is the camera, not the run. */
function plausibleClock(kind, secs) {
	if (!Number.isFinite(secs) || secs <= 0) return false;
	if (kind === "s30_no") return secs >= 4 && secs <= 8.8;
	if (kind === "s30_ball") return secs >= 4.4 && secs <= 9.6;
	if (kind === "zz50_no") return secs >= 11 && secs <= 28;
	if (kind === "zz50_ball") return secs >= 12 && secs <= 32;
	if (kind === "turns") return secs >= 4.5 && secs <= 14;
	if (kind === "shooting") return secs >= 0 && secs <= 24;
	return false;
}
function looksLikeClipLength(kind, secs) {
	if (!Number.isFinite(secs) || secs <= 0) return false;
	if (kind === "shooting") return false;
	return !plausibleClock(kind, secs);
}
/** Extra = without the ball minus with the ball. Shows minus when the ball slows him. */
function ballManip(withBall, noBall) {
	if (withBall === null || noBall === null) return null;
	return noBall - withBall;
}
/** Ball efficiency % = without ÷ with × 100. Age 11. 100% means the ball costs nothing. */
function ballEfficiency(withBall, noBall) {
	if (withBall === null || noBall === null || withBall <= 0) return null;
	return Math.max(0, Math.min(100, noBall / withBall * 100));
}
function applyClipTimes(t) {
	const next = { ...t };
	for (const c of t.clipMarks ?? []) {
		if (c.secs == null || !Number.isFinite(c.secs) || c.secs <= 0) continue;
		if (!plausibleClock(c.kind, c.secs) && c.kind !== "shooting") continue;
		if (c.kind === "s30_no" && next.sprint30NoBall == null) next.sprint30NoBall = c.secs;
		else if (c.kind === "s30_ball" && next.sprint30Ball == null) next.sprint30Ball = c.secs;
		else if (c.kind === "zz50_no" && next.zz50NoBall == null) next.zz50NoBall = c.secs;
		else if (c.kind === "zz50_ball" && next.zz50Ball == null) next.zz50Ball = c.secs;
		else if (c.kind === "turns" && next.turns3x4 == null) next.turns3x4 = c.secs;
		else if (c.kind === "shooting" && next.shootingPts == null) next.shootingPts = c.secs;
	}
	return next;
}
function analyseFitness(t) {
	const row = applyClipTimes(t);
	const zz50Diff = ballManip(row.zz50Ball, row.zz50NoBall);
	const sprint30Diff = ballManip(row.sprint30Ball, row.sprint30NoBall);
	const zz50Eff = ballEfficiency(row.zz50Ball, row.zz50NoBall);
	const sprint30Eff = ballEfficiency(row.sprint30Ball, row.sprint30NoBall);
	const shootingTotal = row.shootingPts != null || row.shootingPower != null ? (row.shootingPts ?? 0) + (row.shootingPower ?? 0) : null;
	const effs = [zz50Eff, sprint30Eff].filter((v) => v != null);
	return {
		...row,
		zz50Diff,
		sprint30Diff,
		zz50Index: row.zz50Ball,
		sprint30Index: row.sprint30Ball,
		zz50Eff,
		sprint30Eff,
		ballEff: effs.length ? effs.reduce((a, b) => a + b, 0) / effs.length : null,
		shootingTotal
	};
}
function fmtSecs(v) {
	if (v === null) return "—";
	return v.toFixed(2);
}
function fmtDiff(v) {
	if (v === null) return "—";
	return v.toFixed(2);
}
function fmtPct(v) {
	if (v === null) return "—";
	return `${v.toFixed(0)}%`;
}
function effSkill(pct) {
	if (pct === null) return "Need both times.";
	if (pct >= 95) return "Academy ball efficiency (age 11).";
	if (pct >= 88) return "Strong ball efficiency (age 11).";
	if (pct >= 80) return "Developing ball efficiency (age 11).";
	return "Needs work on the ball (age 11).";
}
function disciplineVerdict(time, extra, kind, eff) {
	return `${kind === "s30" ? time == null ? "Need a 30m time." : time <= 5.2 ? "Academy 30m for age 11." : time <= 5.8 ? "Strong 30m for age 11." : "Developing 30m for age 11." : time == null ? "Need a zig-zag time." : time <= 16 ? "Academy zig-zag for age 11." : time <= 20 ? "Strong zig-zag for age 11." : "Developing zig-zag for age 11."} ${effSkill(eff)}`;
}
function testsToSheetCsv(rows) {
	const lines = [[
		"Player",
		"Date",
		"ZZ no",
		"ZZ ball",
		"ZZ extra",
		"ZZ eff",
		"30m no",
		"30m ball",
		"30m extra",
		"30m eff",
		"Turns",
		"Shoot pts",
		"Shoot power"
	].join(",")];
	for (const r of rows) lines.push([
		r.player,
		r.testedOn,
		r.zz50NoBall ?? "",
		r.zz50Ball ?? "",
		r.zz50Diff ?? "",
		r.zz50Eff ?? "",
		r.sprint30NoBall ?? "",
		r.sprint30Ball ?? "",
		r.sprint30Diff ?? "",
		r.sprint30Eff ?? "",
		r.turns3x4 ?? "",
		r.shootingPts ?? "",
		r.shootingPower ?? ""
	].join(","));
	return lines.join("\n");
}
//#endregion
export { fmtPct as a, plausibleClock as c, fmtDiff as i, testsToSheetCsv as l, applyClipTimes as n, fmtSecs as o, disciplineVerdict as r, looksLikeClipLength as s, analyseFitness as t };
