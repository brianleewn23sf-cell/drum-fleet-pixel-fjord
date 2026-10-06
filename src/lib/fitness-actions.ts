import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { isSquadPlayer } from "@/lib/players";
import { analyseFitness, applyClipTimes, type ClipMark, type FitnessTest } from "@/lib/fitness";
import { asDayStamp } from "@/lib/when";
import { TEST_BONUS } from "@/lib/test-bonus";
import { TEST_POINTS_FROM } from "@/lib/score-from";
import { matchSquadPlayer, PLAYERS } from "@/lib/players";
import { looksLikeClipLength, plausibleClock } from "@/lib/test-clock";

function toNum(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function officialNum(value: unknown, kind: string): number | null {
  const n = toNum(value);
  if (n == null) return null;
  if (!plausibleClock(kind, n) && kind !== "shooting") return null;
  return n;
}

function mapTest(row: {
  player: string;
  tested_on: unknown;
  zz50_no_ball: unknown;
  zz50_ball: unknown;
  sprint30_no_ball: unknown;
  sprint30_ball: unknown;
  turns_3x4: unknown;
  shooting_pts?: unknown;
  shooting_power?: unknown;
}): FitnessTest {
  return {
    player: String(row.player),
    testedOn: asDayStamp(row.tested_on) || String(row.tested_on).slice(0, 10),
    zz50NoBall: officialNum(row.zz50_no_ball, "zz50_no"),
    zz50Ball: officialNum(row.zz50_ball, "zz50_ball"),
    sprint30NoBall: officialNum(row.sprint30_no_ball, "s30_no"),
    sprint30Ball: officialNum(row.sprint30_ball, "s30_ball"),
    turns3x4: officialNum(row.turns_3x4, "turns"),
    shootingPts: toNum(row.shooting_pts),
    shootingPower: toNum(row.shooting_power),
  };
}

const optionalTime = z.string().optional();

let ghostsWiped = false;
let sprintBoardSeeded = false;

const SPRINT_11_SEP: Array<{
  name: string;
  secs: number;
  mph: number;
  speed: number;
  tech: number;
  note: string;
}> = [
  { name: "Isa Ali", secs: 4.7, mph: 14.28, speed: 10, tech: 5, note: "Elite Cat 1/2 Academy Standard (< 4.75s)" },
  { name: "Kody Cox", secs: 4.8, mph: 13.98, speed: 9, tech: 4.5, note: "Category 1/2 Academy Standard (< 4.85s)" },
  { name: "Henry Bearman", secs: 4.8, mph: 13.98, speed: 9, tech: 4.5, note: "Category 1/2 Academy Standard (< 4.85s)" },
  { name: "Archie Almond", secs: 4.8, mph: 13.98, speed: 9, tech: 4.5, note: "Category 1/2 Academy Standard (< 4.85s)" },
  { name: "Hayden Plumbley", secs: 4.8, mph: 13.98, speed: 9, tech: 4.5, note: "Category 1/2 Academy Standard (< 4.85s)" },
  { name: "Jacob Hill", secs: 4.9, mph: 13.7, speed: 8, tech: 4.5, note: "Academy Development Level (carrying knee injury)" },
  { name: "William Brittain", secs: 4.9, mph: 13.7, speed: 8, tech: 4.5, note: "Academy Development Level (< 4.95s)" },
  { name: "Ruben Biddiss", secs: 5.03, mph: 13.34, speed: 7, tech: 4, note: "Above National Avg / Academy Pathway Candidate" },
  { name: "Louie Biddiss", secs: 5.1, mph: 13.16, speed: 7, tech: 4.5, note: "Above National Avg / Academy Development Candidate" },
  { name: "Caleb Connelly", secs: 5.15, mph: 13.03, speed: 6, tech: 4, note: "Above National Avg / Pathway Candidate" },
  { name: "Jacob Sands", secs: 5.2, mph: 12.91, speed: 6, tech: 4, note: "Grassroots Upper National Average" },
];

async function wipeCameraLengthTests(sql: Awaited<ReturnType<typeof getSql>>) {
  if (ghostsWiped) return;
  ghostsWiped = true;
  try {
    await sql`
      delete from perf_submissions
      where test_kind in ('s30_no', 's30_ball')
        and coalesce(coach_secs, submitted_secs, 0) > 9
    `;
  } catch {
    //
  }
}

async function seedFridaySprintBoard(sql: Awaited<ReturnType<typeof getSql>>) {
  const day = "2026-09-11";
  const stamped = `${day} 18:00:00+01`;
  try {
    await sql`alter table perf_submissions add column if not exists test_points numeric`;
    await sql`alter table perf_submissions add column if not exists start_mark integer`;
    await sql`alter table perf_submissions add column if not exists finish_mark integer`;
    await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
    await sql`alter table perf_submissions alter column technique type numeric using technique::numeric`;
    await sql`alter table perf_submissions alter column test_points type numeric using test_points::numeric`;
  } catch {
    //
  }
  const have = await sql<{ player: string }>`
    select player from perf_submissions where test_kind = 's30_no'
  `.catch(() => [] as { player: string }[]);
  const haveSet = new Set(have.map((r) => matchSquadPlayer([...PLAYERS], r.player) || r.player));
  if (sprintBoardSeeded && SPRINT_11_SEP.every((row) => {
    const who = matchSquadPlayer([...PLAYERS], row.name);
    return who ? haveSet.has(who) : true;
  })) {
    return;
  }
  sprintBoardSeeded = true;
  for (const row of SPRINT_11_SEP) {
    const player = matchSquadPlayer([...PLAYERS], row.name);
    if (!player) continue;
    const points = TEST_BONUS.complete + row.speed + row.tech;
    try {
      await sql`
        delete from perf_submissions
        where player = ${player} and test_kind = 's30_no'
      `;
      await sql`
        insert into perf_submissions (
          player, test_kind, submitted_secs, status, coach_secs, technique, coach_note,
          test_points, start_mark, finish_mark, speed_mph, created_at, assessed_at
        )
        values (
          ${player}, 's30_no', ${row.secs}, 'assessed', ${row.secs}, ${row.tech}, ${row.note},
          ${points}, ${TEST_BONUS.complete}, ${row.speed}, ${row.mph},
          ${stamped}::timestamptz, ${stamped}::timestamptz
        )
      `;
      await sql`
        insert into fitness_tests (player, tested_on)
        values (${player}, ${day}::date)
        on conflict (player, tested_on) do nothing
      `;
      await sql`
        update fitness_tests
        set sprint30_no_ball = ${row.secs}
        where player = ${player} and tested_on = ${day}::date
      `;
    } catch {
      // next load retries
      sprintBoardSeeded = false;
    }
  }
}

function parseScore(value?: string | null, max = 24): number | null {
  if (value === null || value === undefined || value.trim() === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0 || n > max) return null;
  return n;
}

export async function loadFitnessTests(
  sql: Awaited<ReturnType<typeof getSql>>,
): Promise<FitnessTest[]> {
  await wipeCameraLengthTests(sql);
  await seedFridaySprintBoard(sql);
  try {
    const rows = await sql<{
      player: string;
      tested_on: unknown;
      zz50_no_ball: unknown;
      zz50_ball: unknown;
      sprint30_no_ball: unknown;
      sprint30_ball: unknown;
      turns_3x4: unknown;
      shooting_pts: unknown;
      shooting_power: unknown;
    }>`
      select player, tested_on, zz50_no_ball, zz50_ball,
             sprint30_no_ball, sprint30_ball, turns_3x4,
             shooting_pts, shooting_power
      from fitness_tests
      order by tested_on asc, player asc
    `;
    return attachClipMarks(sql, rows.map(mapTest));
  } catch {
    try {
      const rows = await sql<{
        player: string;
        tested_on: unknown;
        zz50_no_ball: unknown;
        zz50_ball: unknown;
        sprint30_no_ball: unknown;
        sprint30_ball: unknown;
        turns_3x4: unknown;
      }>`
        select player, tested_on, zz50_no_ball, zz50_ball,
               sprint30_no_ball, sprint30_ball, turns_3x4
        from fitness_tests
        order by tested_on asc, player asc
      `;
      return attachClipMarks(sql, rows.map((row) => mapTest({ ...row, shooting_pts: null, shooting_power: null })));
    } catch {
      return [];
    }
  }
}

async function attachClipMarks(
  sql: Awaited<ReturnType<typeof getSql>>,
  tests: FitnessTest[],
): Promise<FitnessTest[]> {
  try {
    try {
      await sql`alter table perf_submissions add column if not exists test_points numeric`;
      await sql`alter table perf_submissions add column if not exists start_mark integer`;
      await sql`alter table perf_submissions add column if not exists finish_mark integer`;
    } catch {
      // 0042
    }
    type ClipRow = {
      player: string;
      test_kind: string;
      submitted_secs: unknown;
      coach_secs: unknown;
      test_points?: unknown;
      start_mark?: unknown;
      finish_mark?: unknown;
      technique: unknown;
      speed_mph?: unknown;
      coach_note?: unknown;
      created_at: unknown;
      assessed_at: unknown;
    };
    let clips: ClipRow[] = [];
    try {
      await sql`alter table perf_submissions add column if not exists speed_mph numeric`;
    } catch {
      //
    }
    try {
      clips = await sql<ClipRow>`
        select player, test_kind, submitted_secs, coach_secs, test_points, start_mark, finish_mark,
               technique, speed_mph, coach_note, created_at, assessed_at
        from perf_submissions
        where created_at >= ${TEST_POINTS_FROM}::timestamptz
           or coalesce(coach_secs, submitted_secs, test_points) is not null
      `;
    } catch {
      clips = await sql<ClipRow>`
        select player, test_kind, submitted_secs, coach_secs, test_points, start_mark, finish_mark,
               technique, created_at, assessed_at
        from perf_submissions
        where created_at >= ${TEST_POINTS_FROM}::timestamptz
           or coalesce(coach_secs, submitted_secs, test_points) is not null
      `;
    }
    const byKey = new Map<string, ClipMark[]>();
    for (const c of clips) {
      const rawSecs = Number(c.coach_secs ?? c.submitted_secs);
      const kind = String(c.test_kind);
      const day = asDayStamp(c.assessed_at) || asDayStamp(c.created_at);
      if (!day || day < TEST_POINTS_FROM) continue;
      const clock = Number.isFinite(rawSecs) && rawSecs > 0 && rawSecs < 90 ? rawSecs : 0;
      if (clock > 0 && looksLikeClipLength(kind, clock)) continue;
      const techRaw = c.technique == null ? null : Number(c.technique);
      const tech =
        techRaw != null && Number.isFinite(techRaw)
          ? Math.max(0, Math.min(5, Math.round(techRaw * 2) / 2))
          : 0;
      const speedRaw = Number(c.finish_mark);
      const speed = Number.isFinite(speedRaw) ? Math.max(0, Math.min(10, Math.round(speedRaw))) : 0;
      const storedPts = Number(c.test_points) || 0;
      const did = storedPts > 0 || tech > 0 || speed > 0 || clock > 0;
      if (!did) continue;
      const points = storedPts > 0 ? storedPts : TEST_BONUS.complete + speed + tech;
      const mphRaw = Number(c.speed_mph);
      const mph = Number.isFinite(mphRaw) && mphRaw > 0 ? mphRaw : null;
      const player = matchSquadPlayer([...PLAYERS], String(c.player)) || String(c.player);
      const key = `${player}|${day}`;
      const list = byKey.get(key) ?? [];
      list.push({
        kind,
        points,
        secs: clock > 0 ? clock : null,
        mph,
        start: TEST_BONUS.complete,
        finish: speed,
        timeGrade: null,
        styleMark: tech,
        note: c.coach_note ? String(c.coach_note) : null,
      });
      byKey.set(key, list);
    }
    const squadTests = tests.map((t) => ({
      ...t,
      player: matchSquadPlayer([...PLAYERS], t.player) || t.player,
      testedOn: asDayStamp(t.testedOn) || t.testedOn.slice(0, 10),
    }));
    const have = new Set(squadTests.map((t) => `${t.player}|${t.testedOn.slice(0, 10)}`));
    const extra: FitnessTest[] = [];
    for (const [key, marks] of byKey) {
      if (have.has(key)) continue;
      const [player, day] = key.split("|");
      extra.push(
        applyClipTimes({
          player,
          testedOn: day,
          zz50NoBall: null,
          zz50Ball: null,
          sprint30NoBall: null,
          sprint30Ball: null,
          turns3x4: null,
          shootingPts: null,
          shootingPower: null,
          clipMarks: marks,
        }),
      );
    }
    return [
      ...squadTests.map((t) =>
        applyClipTimes({
          ...t,
          clipMarks: byKey.get(`${t.player}|${t.testedOn.slice(0, 10)}`) ?? t.clipMarks ?? [],
        }),
      ),
      ...extra,
    ];
  } catch {
    return tests;
  }
}

export const getFitnessTests = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  try {
    const tests = await loadFitnessTests(sql);
    const latest = new Map<string, FitnessTest>();
    for (const t of [...tests].reverse()) {
      if (!latest.has(t.player)) latest.set(t.player, t);
    }
    return {
      tests,
      latest: Object.fromEntries(latest),
      analysed: [...latest.values()].map(analyseFitness),
    };
  } catch {
    return { tests: [], latest: {}, analysed: [] };
  }
});

export const saveFitnessTest = createServerFn({ method: "POST" })
  .validator(
    z.object({
      player: z.string().trim().min(1),
      testedOn: z.string().trim().min(8).max(10),
      zz50NoBall: optionalTime,
      zz50Ball: optionalTime,
      sprint30NoBall: optionalTime,
      sprint30Ball: optionalTime,
      turns3x4: optionalTime,
      shootingPts: optionalTime,
      shootingPower: optionalTime,
    }),
  )
  .handler(async ({ data }) => {
    if (!isSquadPlayer(data.player)) {
      return { success: false as const, error: "Unknown player." };
    }
    const zz50NoBall = parseScore(data.zz50NoBall, 180);
    const zz50Ball = parseScore(data.zz50Ball, 180);
    const sprint30NoBall = parseScore(data.sprint30NoBall, 9);
    const sprint30Ball = parseScore(data.sprint30Ball, 10);
    const turns3x4 = parseScore(data.turns3x4, 180);
    const shootingPts = parseScore(data.shootingPts, 18);
    const shootingPower = parseScore(data.shootingPower, 6);
    const sql = await getSql();
    await sql`
      insert into fitness_tests (
        player, tested_on, zz50_no_ball, zz50_ball,
        sprint30_no_ball, sprint30_ball, turns_3x4,
        shooting_pts, shooting_power
      )
      values (
        ${data.player}, ${data.testedOn}::date,
        ${zz50NoBall}, ${zz50Ball},
        ${sprint30NoBall}, ${sprint30Ball},
        ${turns3x4},
        ${shootingPts}, ${shootingPower}
      )
      on conflict (player, tested_on) do update set
        zz50_no_ball = excluded.zz50_no_ball,
        zz50_ball = excluded.zz50_ball,
        sprint30_no_ball = excluded.sprint30_no_ball,
        sprint30_ball = excluded.sprint30_ball,
        turns_3x4 = excluded.turns_3x4,
        shooting_pts = excluded.shooting_pts,
        shooting_power = excluded.shooting_power
    `;
    const { writeAudit } = await import("@/lib/audit");
    await writeAudit({
      actor: "coach",
      role: "coach",
      action: "test.save",
      player: data.player,
      detail: data.testedOn,
    });
    return { success: true as const };
  });
