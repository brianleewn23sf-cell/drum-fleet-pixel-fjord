import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { type SlotBrief } from "@/lib/brian-rules";
import { DEFAULT_FORMATION, type KitId } from "@/lib/formations";

export type MatchPlan = {
  opposition: string;
  kickoff: string;
  venue: string;
  home: boolean;
  formation: string;
  kit: KitId;
  lineup: Record<string, string>;
  brief: Record<string, SlotBrief>;
};

function asLineup(value: unknown): Record<string, string> {
  let raw = value;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return {};
    }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const next: Record<string, string> = {};
  for (const [key, item] of Object.entries(raw as Record<string, unknown>)) {
    const player = String(item || "").trim();
    if (player) next[key] = player;
  }
  return next;
}

function asBrief(value: unknown): Record<string, SlotBrief> {
  let raw = value;
  if (typeof raw === "string") {
    try {
      raw = JSON.parse(raw);
    } catch {
      return {};
    }
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const next: Record<string, SlotBrief> = {};
  for (const [key, item] of Object.entries(raw as Record<string, unknown>)) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const row = item as Record<string, unknown>;
    next[key] = {
      duty: String(row.duty || ""),
      withBall: String(row.withBall || ""),
      withoutBall: String(row.withoutBall || ""),
    };
  }
  return next;
}

function asKit(value: unknown): KitId {
  return value === "away" ? "away" : "home";
}

function rowToPlan(row: Record<string, unknown>): MatchPlan {
  return {
    opposition: String(row.opposition || ""),
    kickoff: String(row.kickoff || ""),
    venue: String(row.venue || ""),
    home: Number(row.home) === 1 || row.home === true,
    formation: String(row.formation || DEFAULT_FORMATION),
    kit: asKit(row.kit),
    lineup: asLineup(row.lineup_json ?? row.lineup),
    brief: asBrief(row.brief_json ?? row.brief),
  };
}

async function seedPhoneLineup(sql: Awaited<ReturnType<typeof getSql>>) {
  const opposition = "Pine Villa U12 s";
  const kickoff = "2026-09-06T11:00";
  const existing = await sql.query<{ n: number }>(
    `select count(*)::int as n from plan_saves where opposition = $1 and kickoff = $2`,
    [opposition, kickoff],
  );
  if (Number(existing[0]?.n) > 0) return;
  const lineup = {
    GK: "13) Zachary Read (GK)",
    LB: "16) Jacob Hill",
    CB: "5) Kody Cox",
    RB: "10) Ben Owen",
    LCM: "4) Louie Biddiss",
    RCM: "9) Jacob Sands",
    LW: "30) Isa Ali",
    ST: "22) William Brittain",
    RW: "14) Henry Bearman",
    SUB1: "3) Ruben Biddiss",
    SUB2: "8) Caleb Connelly",
    SUB3: "6) Logan Massey",
    SUB4: "20) Archie Almond",
    RES1: "23) Hayden Plumbley",
    INJ1: "1) Harry Parr",
    OUT1: "7) Cullen Atkinson-Lee",
  };
  await sql.query(
    `insert into plan_saves (opposition, kickoff, venue, home, formation, kit, lineup_json)
     values ($1,$2,$3,$4,$5,$6,$7)
     on conflict (opposition, kickoff) do nothing`,
    [opposition, kickoff, "Albany Academy", 0, "3-2-3", "away", JSON.stringify(lineup)],
  );
}

async function ensurePlanTable(sql: Awaited<ReturnType<typeof getSql>>) {
  await sql.query(`
    create table if not exists plan_saves (
      opposition   text not null,
      kickoff      text not null,
      venue        text,
      home         integer not null default 1,
      formation    text not null default '3-3-2',
      kit          text not null default 'home',
      lineup_json  text not null default '{}',
      primary key (opposition, kickoff)
    )
  `);
  try {
    await sql.query(`alter table plan_saves add column brief_json text not null default '{}'`);
  } catch {
    // already there
  }
  try {
    await seedPhoneLineup(sql);
  } catch {
    // first load
  }
}

export const getMatchPlans = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  try {
    await ensurePlanTable(sql);
    let rows: Record<string, unknown>[] = [];
    try {
      rows = await sql.query<Record<string, unknown>>(
        `select opposition, kickoff, venue, home, formation, kit, lineup_json, brief_json from plan_saves order by kickoff asc`,
      );
    } catch {
      rows = await sql.query<Record<string, unknown>>(
        `select opposition, kickoff, venue, home, formation, kit, lineup_json from plan_saves order by kickoff asc`,
      );
    }
    const plans = rows.map(rowToPlan);
    try {
      const liveRows = await sql.query<Record<string, unknown>>(
        `select opposition, kickoff, formation, lineup from match_live`,
      );
      for (const live of liveRows) {
        const found = plans.find(
          (p) => p.opposition === String(live.opposition || "") && p.kickoff === String(live.kickoff || ""),
        );
        const extra = asLineup(live.lineup);
        if (found) {
          found.lineup = { ...extra, ...found.lineup };
        }
      }
    } catch {
      // live table may be empty
    }
    try {
      const oldRows = await sql.query<Record<string, unknown>>(
        `select opposition, kickoff, formation, kit, lineup from match_plans`,
      );
      for (const old of oldRows) {
        const found = plans.find(
          (p) => p.opposition === String(old.opposition || "") && p.kickoff === String(old.kickoff || ""),
        );
        const extra = asLineup(old.lineup);
        if (found) {
          for (const [k, v] of Object.entries(extra)) {
            if (v && !found.lineup[k]) found.lineup[k] = v;
          }
        } else if (Object.keys(extra).length) {
          plans.push({
            opposition: String(old.opposition || ""),
            kickoff: String(old.kickoff || ""),
            venue: "",
            home: true,
            formation: String(old.formation || DEFAULT_FORMATION),
            kit: asKit(old.kit),
            lineup: extra,
            brief: {},
          });
        }
      }
    } catch {
      // old jsonb table may be missing
    }
    return { plans };
  } catch (err) {
    console.error("getMatchPlans", err);
    return { plans: [] as MatchPlan[] };
  }
});

export const saveMatchPlan = createServerFn({ method: "POST" })
  .validator(
    z.object({
      opposition: z.string().trim().min(1).max(80),
      kickoff: z.string().trim().min(1).max(32),
      venue: z.string().trim().max(120),
      home: z.boolean(),
      formation: z.string().trim().min(1).max(20),
      kit: z.enum(["home", "away"]),
      lineup: z.record(z.string(), z.string()),
      brief: z
        .record(
          z.string(),
          z.object({
            duty: z.string().max(800).optional(),
            withBall: z.string().max(1200).optional(),
            withoutBall: z.string().max(1200).optional(),
          }),
        )
        .optional(),
    }),
  )
  .handler(async ({ data }) => {
    const lineup = asLineup(data.lineup);
    const brief = asBrief(data.brief ?? {});
    const sql = await getSql();
    await ensurePlanTable(sql);
    await sql.query(
      `insert into plan_saves (opposition, kickoff, venue, home, formation, kit, lineup_json, brief_json)
       values ($1,$2,$3,$4,$5,$6,$7,$8)
       on conflict (opposition, kickoff) do update set
         venue = excluded.venue,
         home = excluded.home,
         formation = excluded.formation,
         kit = excluded.kit,
         lineup_json = excluded.lineup_json,
         brief_json = excluded.brief_json`,
      [
        data.opposition,
        data.kickoff,
        data.venue || "",
        data.home ? 1 : 0,
        data.formation,
        data.kit,
        JSON.stringify(lineup),
        JSON.stringify(brief),
      ],
    );
    return { success: true as const };
  });
