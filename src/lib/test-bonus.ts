import { PERF_KINDS, perfKindLabel } from "./perf-kinds.ts";
import { analyseFitness, type FitnessAnalysis, type FitnessTest } from "@/lib/fitness";
import { TEST_POINTS_FROM } from "@/lib/score-from";
import { matchSquadPlayer, PLAYERS } from "@/lib/players";
import { plausibleClock } from "@/lib/test-clock";

export const TEST_BONUS = {
  complete: 5,
  gradeMax: 5,
  gradeMin: 1,
  speedMax: 10,
  drillMax: 20,
} as const;

export function drillMetres(kind: string): number | null {
  if (kind.startsWith("s30")) return 30;
  if (kind.startsWith("zz50")) return 45.72;
  return null;
}

/** Average speed over the drill. 30m in 5.3s ≈ 12.7 mph. */
export function mphFromTime(kind: string, secs: number): number | null {
  const m = drillMetres(kind);
  if (m == null || !(secs > 0)) return null;
  return Math.round((m / secs) * 2.2369362921 * 10) / 10;
}

export function mphToKmh(mph: number): number {
  return Math.round(mph * 1.60934 * 100) / 100;
}

export function fmtMark(n: number | null | undefined): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export type TestBonusEvent = {
  player: string;
  points: number;
  at: string;
};

export type DrillMarks = {
  complete: number;
  start: number;
  finish: number;
  timeGrade: number;
  styleMark: number;
  speed: number;
  points: number;
};

function clampMark(n: number, min = 0, max = 5): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function clamp10(n: number): number {
  return Math.max(0, Math.min(10, Math.round(n)));
}

/** Age-11 speed /10. Faster = more points. Clock is GO → last cones, never video length. */
export function speedScore10(kind: string, secs: number): number {
  if (!plausibleClock(kind, secs) && kind !== "shooting") return 0;
  const bands: Array<[number, number]> =
    kind === "s30_no"
      ? [[5.0, 10], [5.2, 9], [5.4, 8], [5.6, 7], [5.8, 6], [6.1, 5], [6.4, 4], [6.8, 3], [7.3, 2], [8.0, 1]]
      : kind === "s30_ball"
        ? [[5.5, 10], [5.7, 9], [5.9, 8], [6.1, 7], [6.3, 6], [6.6, 5], [6.9, 4], [7.3, 3], [7.8, 2], [8.5, 1]]
        : kind === "zz50_no"
          ? [[15.5, 10], [16, 9], [17, 8], [18, 7], [19, 6], [20, 5], [21, 4], [22, 3], [24, 2], [26, 1]]
          : kind === "zz50_ball"
            ? [[16.7, 10], [17.2, 9], [18.2, 8], [19.2, 7], [20.2, 6], [21.2, 5], [22.2, 4], [23.2, 3], [25.2, 2], [27.2, 1]]
            : kind === "turns"
              ? [[6.5, 10], [7, 9], [7.5, 8], [8, 7], [8.5, 6], [9, 5], [9.5, 4], [10, 3], [11, 2], [12, 1]]
              : [[16, 10], [14, 9], [12, 8], [10, 7], [8, 6], [6, 5], [4, 4], [2, 3], [1, 2], [0, 1]];
  if (kind === "shooting") {
    for (const [min, score] of bands) if (secs >= min) return score;
    return 0;
  }
  for (const [max, score] of bands) if (secs <= max) return score;
  return 0;
}

/** Age 11 speed grade, 5 best → 1. Lower time is better. */
export function speedGrade(noBall: number | null, kind: "zz50" | "s30"): number | null {
  if (noBall === null) return null;
  if (kind === "s30") {
    if (noBall <= 5.2) return 5;
    if (noBall <= 5.5) return 4;
    if (noBall <= 5.8) return 3;
    if (noBall <= 6.2) return 2;
    return 1;
  }
  if (noBall <= 16) return 5;
  if (noBall <= 18) return 4;
  if (noBall <= 20) return 3;
  if (noBall <= 22) return 2;
  return 1;
}

export function efficiencyGrade(eff: number | null): number | null {
  if (eff === null) return null;
  if (eff >= 95) return 5;
  if (eff >= 90) return 4;
  if (eff >= 85) return 3;
  if (eff >= 80) return 2;
  return 1;
}

export function turnsGrade(secs: number | null): number | null {
  if (secs === null) return null;
  if (secs < 7) return 5;
  if (secs < 8) return 4;
  if (secs < 9) return 3;
  if (secs < 10) return 2;
  return 1;
}

export function shootingGrade(total: number | null): number | null {
  if (total === null) return null;
  if (total >= 16) return 5;
  if (total >= 12) return 4;
  if (total >= 8) return 3;
  if (total >= 4) return 2;
  return 1;
}

export function drillMarkLabels(kind: string): { start: string; finish: string; speed: string; tech: string } {
  return {
    start: "Complete",
    finish: kind === "s30_ball" ? "Ball through last cones" : "GO to last cones",
    speed: "Speed (age 11)",
    tech: "Technique",
  };
}

/** +5 complete always if they did the drill. Speed /10 from GO clock (fastest higher). Technique /5 from the film. */
export function drillMarks(kind: string, value: number): DrillMarks {
  const official = plausibleClock(kind, value) || kind === "shooting";
  const speed = official ? clamp10(speedScore10(kind, value)) : 0;
  const styleMark = 0;
  const complete = TEST_BONUS.complete;
  return {
    complete,
    start: complete,
    finish: styleMark,
    timeGrade: official ? Math.max(1, Math.min(5, Math.round(speed / 2) || 1)) : 0,
    styleMark,
    speed,
    points: complete + speed + styleMark,
  };
}

/** 30m no-ball helper kept for older call sites. */
export function linearSpeedMarks(secs: number): DrillMarks {
  return drillMarks("s30_no", secs);
}

function mergeGrade(...parts: Array<number | null>): number | null {
  const n = parts.filter((v): v is number => v !== null);
  if (!n.length) return null;
  return clampMark(n.reduce((a, b) => a + b, 0) / n.length, 1, 5);
}

export function testGrades(row: FitnessAnalysis): {
  zz: number | null;
  sprint: number | null;
  turns: number | null;
  shooting: number | null;
} {
  return {
    zz: mergeGrade(speedGrade(row.zz50NoBall, "zz50"), efficiencyGrade(row.zz50Eff)),
    sprint: mergeGrade(speedGrade(row.sprint30NoBall, "s30"), efficiencyGrade(row.sprint30Eff)),
    turns: turnsGrade(row.turns3x4),
    shooting: shootingGrade(row.shootingTotal),
  };
}

function drillsFromRow(row: FitnessAnalysis): Array<{ kind: string; value: number | null }> {
  return [
    { kind: "s30_no", value: row.sprint30NoBall },
    { kind: "s30_ball", value: row.sprint30Ball },
    { kind: "zz50_no", value: row.zz50NoBall },
    { kind: "zz50_ball", value: row.zz50Ball },
    { kind: "turns", value: row.turns3x4 },
    { kind: "shooting", value: row.shootingTotal },
  ];
}

function prizeDay(day: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(day) && day >= TEST_POINTS_FROM;
}

type DrillHit = {
  time: number | null;
  day: string;
  tech: number | null;
  speed: number | null;
  mph: number | null;
  points: number | null;
};

function latestHits(tests: FitnessTest[]): Map<string, Map<string, DrillHit>> {
  const byKind = new Map<string, Map<string, DrillHit>>();
  const rows = tests
    .slice()
    .filter((t) => prizeDay(String(t.testedOn || "").slice(0, 10)))
    .sort((a, b) => a.testedOn.localeCompare(b.testedOn));

  function put(
    kind: string,
    who: string,
    day: string,
    secs: number | null,
    tech: number | null,
    speed: number | null,
    mph: number | null,
    points: number | null,
  ) {
    let kindMap = byKind.get(kind);
    if (!kindMap) {
      kindMap = new Map();
      byKind.set(kind, kindMap);
    }
    const prev = kindMap.get(who);
    kindMap.set(who, {
      time: secs != null && secs > 0 ? secs : prev?.time ?? null,
      day,
      tech: tech ?? prev?.tech ?? null,
      speed: speed ?? prev?.speed ?? null,
      mph: mph ?? prev?.mph ?? (secs != null ? mphFromTime(kind, secs) : prev?.mph ?? null),
      points: points ?? prev?.points ?? null,
    });
  }

  for (const t of rows) {
    const who = matchSquadPlayer([...PLAYERS], t.player) || t.player;
    const day = String(t.testedOn).slice(0, 10);
    const analysed = analyseFitness(t);
    const clips = t.clipMarks ?? [];
    for (const d of drillsFromRow(analysed)) {
      const clip = clips.find((c) => c.kind === d.kind);
      if (d.value == null && !clip) continue;
      put(
        d.kind,
        who,
        day,
        clip?.secs ?? d.value,
        clip?.styleMark ?? null,
        clip?.finish ?? null,
        clip?.mph ?? null,
        clip?.points ?? null,
      );
    }
    for (const clip of clips) {
      put(clip.kind, who, day, clip.secs, clip.styleMark, clip.finish, clip.mph, clip.points);
    }
  }
  return byKind;
}

/** 1st fastest = 10, 2nd = 9… Same time shares the place. */
function rankFasterHigher(times: Map<string, number>, reverse = false): Map<string, number> {
  const sorted = [...times.entries()].sort((a, b) => (reverse ? b[1] - a[1] : a[1] - b[1]));
  const out = new Map<string, number>();
  let place = 0;
  let prev = Number.NaN;
  for (const [who, t] of sorted) {
    if (!Number.isFinite(prev) || Math.abs(t - prev) > 0.049) place += 1;
    out.set(who, Math.max(0, 11 - place));
    prev = t;
  }
  return out;
}

function speedForHit(kind: string, player: string, secs: number | null, ranks: Map<string, number>): number {
  if (secs == null || (kind !== "shooting" && !plausibleClock(kind, secs))) return 0;
  const age = speedScore10(kind, secs);
  const rel = ranks.get(player) ?? 0;
  return clamp10(Math.max(age, rel));
}

function pointsForHit(hit: DrillHit): number {
  if (hit.points != null && hit.points > 0) return hit.points;
  const did = hit.time != null || hit.tech != null || hit.speed != null;
  if (!did) return 0;
  return TEST_BONUS.complete + (hit.speed ?? 0) + (hit.tech ?? 0);
}

export function testBonusEvents(tests: FitnessTest[]): TestBonusEvent[] {
  const hits = latestHits(tests);
  const events: TestBonusEvent[] = [];
  for (const [, byPlayer] of hits) {
    for (const [player, hit] of byPlayer) {
      const pts = pointsForHit(hit);
      if (pts <= 0) continue;
      events.push({ player, points: pts, at: hit.day });
    }
  }
  return events;
}

export type PlayerDrillLine = {
  kind: string;
  label: string;
  time: number | null;
  mph: number | null;
  timeLabel: string;
  score: number | null;
  day: string | null;
  official: boolean;
};

function shortDrillLabel(kind: string): string {
  if (kind === "s30_no") return "30m no ball";
  if (kind === "s30_ball") return "30m with ball";
  if (kind === "zz50_no") return "Zig-zag no ball";
  if (kind === "zz50_ball") return "Zig-zag with ball";
  if (kind === "turns") return "Turns";
  if (kind === "shooting") return "Shooting";
  return perfKindLabel(kind);
}

export function playerDrillLines(tests: FitnessTest[], player: string): PlayerDrillLine[] {
  const who = matchSquadPlayer([...PLAYERS], player) || player;
  const hits = latestHits(tests);
  return PERF_KINDS.map((k) => {
    const byPlayer = hits.get(k.id);
    const hit = byPlayer?.get(who);
    if (!hit) {
      return { kind: k.id, label: shortDrillLabel(k.id), time: null, mph: null, timeLabel: "—", score: null, day: null, official: false };
    }
    const pts = pointsForHit(hit);
    const time = hit.time;
    const mph = hit.mph ?? (time != null ? mphFromTime(k.id, time) : null);
    const timeLabel = time != null
      ? `${time.toFixed(2)}s${mph != null ? ` · ${mph} mph` : ""}`
      : pts > 0
        ? "Marked"
        : "—";
    return {
      kind: k.id,
      label: shortDrillLabel(k.id),
      time,
      mph,
      timeLabel,
      score: pts > 0 ? pts : null,
      day: hit.day,
      official: pts > 0,
    };
  });
}

