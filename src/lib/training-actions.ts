import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { matchSquadPlayer } from "@/lib/players";
import { loadActiveSquad } from "@/lib/squad";
import type { TrainingSession } from "@/lib/training";
import { asDayStamp } from "@/lib/when";

function toInt(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

const ten = z.number().int().min(0).max(10).nullable();

const markInput = z.object({
  player: z.string().trim().min(1),
  attended: z.boolean(),
  score: ten,
  effort: ten,
  attitude: ten,
  achievement: ten,
});

type Row = {
  session_date: string;
  player: string;
  attended: unknown;
  score: unknown;
  effort?: unknown;
  attitude?: unknown;
  achievement?: unknown;
  label: string;
};

function asAttended(value: unknown): boolean {
  if (value === true || value === 1 || value === "1") return true;
  if (typeof value === "string" && value.toLowerCase() === "true") return true;
  return Number(value) === 1;
}

function groupRows(rows: Row[]): TrainingSession[] {
  const map = new Map<string, TrainingSession>();
  for (const row of rows) {
    const sessionDate = asDayStamp(row.session_date) || String(row.session_date ?? "").slice(0, 10);
    const player = String(row.player || "").trim();
    if (!player) continue;
    const day = /^\d{4}-\d{2}-\d{2}$/.test(sessionDate) ? sessionDate : asDayStamp(row.session_date);
    if (!day) continue;
    let session = map.get(day);
    if (!session) {
      session = {
        sessionDate: day,
        label: String(row.label || "").trim(),
        marks: [],
      };
      map.set(day, session);
    }
    if (!session.label && row.label) session.label = String(row.label).trim();
    const effort = toInt(row.effort) ?? toInt(row.score);
    session.marks.push({
      player,
      attended: asAttended(row.attended),
      score: toInt(row.score),
      effort,
      attitude: toInt(row.attitude),
      achievement: toInt(row.achievement),
    });
  }
  return [...map.values()];
}

export async function loadSessions(
  sql: Awaited<ReturnType<typeof getSql>>,
): Promise<TrainingSession[]> {
  let sessions: TrainingSession[] = [];
  try {
    sessions = groupRows(
      await sql<Row>`
        select session_date, player, attended, score, effort, attitude, achievement, label
        from training_attendance
        order by session_date desc, player asc
      `,
    );
  } catch {
    try {
      sessions = groupRows(
        await sql<Row>`
          select session_date, player, attended, score, attitude, label
          from training_attendance
          order by session_date desc, player asc
        `,
      );
    } catch {
      sessions = groupRows(
        await sql<Row>`
          select session_date, player, attended, score, label
          from training_attendance
          order by session_date desc, player asc
        `,
      );
    }
  }
  try {
    const squad = await loadActiveSquad(sql);
    for (const session of sessions) {
      session.marks = session.marks.map((m) => ({
        ...m,
        player: matchSquadPlayer(squad, m.player) || m.player,
      }));
    }
  } catch {
    // squad table
  }
  return sessions;
}

export const getTraining = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  try {
    return { sessions: await loadSessions(sql) };
  } catch {
    return { sessions: [] as TrainingSession[] };
  }
});

export const saveTraining = createServerFn({ method: "POST" })
  .validator(
    z.object({
      sessionDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
      label: z.string().trim().max(80),
      marks: z.array(markInput).max(30),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    const squad = await loadActiveSquad(sql);
    const marks = data.marks.map((m) => ({
      ...m,
      player: matchSquadPlayer(squad, m.player) || m.player,
    }));
    if (!marks.length) {
      return { success: false as const, error: "No players to save.", sessions: await loadSessions(sql) };
    }
    await sql`delete from training_attendance where session_date = ${data.sessionDate}`;
    for (const mark of marks) {
      const attended = mark.attended ? 1 : 0;
      const effort = mark.attended ? mark.effort : null;
      const attitude = mark.attended ? mark.attitude : null;
      const achievement = mark.attended ? mark.achievement : null;
      const score = effort;
      try {
        await sql`
          insert into training_attendance
            (session_date, player, attended, score, effort, attitude, achievement, label)
          values
            (${data.sessionDate}, ${mark.player}, ${attended}, ${score}, ${effort}, ${attitude}, ${achievement}, ${data.label})
        `;
      } catch {
        try {
          await sql`
            insert into training_attendance (session_date, player, attended, score, attitude, label)
            values (${data.sessionDate}, ${mark.player}, ${attended}, ${score}, ${attitude}, ${data.label})
          `;
        } catch {
          await sql`
            insert into training_attendance (session_date, player, attended, score, label)
            values (${data.sessionDate}, ${mark.player}, ${attended}, ${score}, ${data.label})
          `;
        }
      }
    }
    return { success: true as const, sessions: await loadSessions(sql) };
  });
