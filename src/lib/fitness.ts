import { plausibleClock } from "@/lib/test-clock";

export const TEST_AGE = 11;

export type FitnessTest = {
  player: string;
  testedOn: string;
  zz50NoBall: number | null;
  zz50Ball: number | null;
  sprint30NoBall: number | null;
  sprint30Ball: number | null;
  turns3x4: number | null;
  shootingPts: number | null;
  shootingPower: number | null;
  clipMarks?: ClipMark[];
};

export type ClipMark = {
  kind: string;
  points: number;
  secs: number | null;
  mph: number | null;
  start: number | null;
  finish: number | null;
  timeGrade: number | null;
  styleMark: number | null;
  note?: string | null;
};

export type FitnessAnalysis = FitnessTest & {
  zz50Diff: number | null;
  sprint30Diff: number | null;
  zz50Index: number | null;
  sprint30Index: number | null;
  zz50Eff: number | null;
  sprint30Eff: number | null;
  ballEff: number | null;
  shootingTotal: number | null;
};

/** Extra = without the ball minus with the ball. Shows minus when the ball slows him. */
export function ballManip(withBall: number | null, noBall: number | null): number | null {
  if (withBall === null || noBall === null) return null;
  return noBall - withBall;
}

/** Ball efficiency % = without ÷ with × 100. Age 11. 100% means the ball costs nothing. */
export function ballEfficiency(withBall: number | null, noBall: number | null): number | null {
  if (withBall === null || noBall === null || withBall <= 0) return null;
  return Math.max(0, Math.min(100, (noBall / withBall) * 100));
}

export function applyClipTimes(t: FitnessTest): FitnessTest {
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

export function analyseFitness(t: FitnessTest): FitnessAnalysis {
  const row = applyClipTimes(t);
  const zz50Diff = ballManip(row.zz50Ball, row.zz50NoBall);
  const sprint30Diff = ballManip(row.sprint30Ball, row.sprint30NoBall);
  const zz50Eff = ballEfficiency(row.zz50Ball, row.zz50NoBall);
  const sprint30Eff = ballEfficiency(row.sprint30Ball, row.sprint30NoBall);
  const shootingTotal =
    row.shootingPts != null || row.shootingPower != null
      ? (row.shootingPts ?? 0) + (row.shootingPower ?? 0)
      : null;
  const effs = [zz50Eff, sprint30Eff].filter((v): v is number => v != null);
  return {
    ...row,
    zz50Diff,
    sprint30Diff,
    zz50Index: row.zz50Ball,
    sprint30Index: row.sprint30Ball,
    zz50Eff,
    sprint30Eff,
    ballEff: effs.length ? effs.reduce((a, b) => a + b, 0) / effs.length : null,
    shootingTotal,
  };
}

export function fmtSecs(v: number | null): string {
  if (v === null) return "—";
  return v.toFixed(2);
}

export function fmtDiff(v: number | null): string {
  if (v === null) return "—";
  return v.toFixed(2);
}

export function fmtPct(v: number | null): string {
  if (v === null) return "—";
  return `${v.toFixed(0)}%`;
}

export function gapSkill(gap: number | null): string {
  if (gap === null) return "Need both times.";
  if (gap >= -0.2) return "Excellent ball efficiency — the ball barely costs him.";
  if (gap >= -0.6) return "Good ball efficiency for age 11.";
  if (gap >= -1.2) return "Fair — the ball is slowing him.";
  if (gap >= -2.0) return "The ball is costing him time — more close control.";
  return "Big drop with the ball — ball efficiency needs work.";
}

export function effSkill(pct: number | null): string {
  if (pct === null) return "Need both times.";
  if (pct >= 95) return "Academy ball efficiency (age 11).";
  if (pct >= 88) return "Strong ball efficiency (age 11).";
  if (pct >= 80) return "Developing ball efficiency (age 11).";
  return "Needs work on the ball (age 11).";
}

export function disciplineVerdict(
  time: number | null,
  extra: number | null,
  kind: "zz50" | "s30",
  eff: number | null,
): string {
  const speed =
    kind === "s30"
      ? time == null
        ? "Need a 30m time."
        : time <= 5.2
          ? "Academy 30m for age 11."
          : time <= 5.8
            ? "Strong 30m for age 11."
            : "Developing 30m for age 11."
      : time == null
        ? "Need a zig-zag time."
        : time <= 16
          ? "Academy zig-zag for age 11."
          : time <= 20
            ? "Strong zig-zag for age 11."
            : "Developing zig-zag for age 11.";
  void extra;
  return `${speed} ${effSkill(eff)}`;
}

export function testsToSheetCsv(rows: FitnessAnalysis[]): string {
  const head = [
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
    "Shoot power",
  ];
  const lines = [head.join(",")];
  for (const r of rows) {
    lines.push(
      [
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
        r.shootingPower ?? "",
      ].join(","),
    );
  }
  return lines.join("\n");
}
