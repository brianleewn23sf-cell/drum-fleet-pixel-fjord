import type { Sql } from "@/lib/db";

const GAME = "Rd 1";
const OPP = "Pine Villa";

/** Parent 3-2-1 logged for Rd 1 vs Pine Villa (Coach → Votes). */
const PARENT_VOTES: { voter: string; vote3: string; vote2: string; vote1: string }[] = [
  {
    voter: "5) Kody Cox",
    vote3: "14) Henry Bearman",
    vote2: "30) Isa Ali",
    vote1: "4) Louie Biddiss",
  },
  {
    voter: "4) Louie Biddiss",
    vote3: "22) William Brittain",
    vote2: "11) Jacob Saxon",
    vote1: "16) Jacob Hill",
  },
  {
    voter: "22) William Brittain",
    vote3: "30) Isa Ali",
    vote2: "9) Jacob Sands",
    vote1: "5) Kody Cox",
  },
  {
    voter: "13) Zachary Read (GK)",
    vote3: "30) Isa Ali",
    vote2: "14) Henry Bearman",
    vote1: "20) Archie Almond",
  },
  {
    voter: "20) Archie Almond",
    vote3: "30) Isa Ali",
    vote2: "22) William Brittain",
    vote1: "14) Henry Bearman",
  },
  {
    voter: "10) Ben Owen",
    vote3: "30) Isa Ali",
    vote2: "5) Kody Cox",
    vote1: "13) Zachary Read (GK)",
  },
  {
    voter: "8) Caleb Connelly",
    vote3: "30) Isa Ali",
    vote2: "13) Zachary Read (GK)",
    vote1: "4) Louie Biddiss",
  },
  {
    voter: "30) Isa Ali",
    vote3: "22) William Brittain",
    vote2: "5) Kody Cox",
    vote1: "14) Henry Bearman",
  },
  {
    voter: "16) Jacob Hill",
    vote3: "30) Isa Ali",
    vote2: "8) Caleb Connelly",
    vote1: "13) Zachary Read (GK)",
  },
  {
    voter: "9) Jacob Sands",
    vote3: "14) Henry Bearman",
    vote2: "22) William Brittain",
    vote1: "30) Isa Ali",
  },
  {
    voter: "11) Jacob Saxon",
    vote3: "8) Caleb Connelly",
    vote2: "16) Jacob Hill",
    vote1: "20) Archie Almond",
  },
];

const OPP_MOM = "4) Louie Biddiss";
const MANAGER = "14) Henry Bearman";
const STAMP = "2026-09-06T19:45:00.000Z";

/** Saved Rd 1 vs Pine Villa sheet — 6-7 at Albany Academy. */
export const SAVED_PINE_VILLA_GOALS: { minute: number; scorer: string; assist: string | null }[] = [
  { minute: 14, scorer: "16) Jacob Hill", assist: "20) Archie Almond" },
  { minute: 24, scorer: "22) William Brittain", assist: "14) Henry Bearman" },
  { minute: 42, scorer: "30) Isa Ali", assist: "4) Louie Biddiss" },
  { minute: 52, scorer: "5) Kody Cox", assist: "14) Henry Bearman" },
  { minute: 54, scorer: "22) William Brittain", assist: null },
  { minute: 59, scorer: "30) Isa Ali", assist: null },
];

/** Rd 4 at Standish, 4 Oct. Six goals. Louie and William one assist each. */
export const SAVED_STANDISH_GOALS: { minute: number; scorer: string; assist: string | null }[] = [
  { minute: 8, scorer: "30) Isa Ali", assist: "4) Louie Biddiss" },
  { minute: 16, scorer: "22) William Brittain", assist: null },
  { minute: 27, scorer: "5) Kody Cox", assist: "22) William Brittain" },
  { minute: 38, scorer: "22) William Brittain", assist: null },
  { minute: 49, scorer: "4) Louie Biddiss", assist: null },
  { minute: 61, scorer: "9) Jacob Sands", assist: null },
];

export const SAVED_RD1 = {
  game: GAME,
  opposition: OPP,
  oppMom: OPP_MOM,
  managerPlayer: MANAGER,
  voteCount: PARENT_VOTES.length,
  goals: SAVED_PINE_VILLA_GOALS,
  us: 6,
  them: 7,
} as const;

export function pineVillaCurrentMatch() {
  return { gameNumber: GAME, opposition: OPP };
}

export function pineVillaVoteRows() {
  return PARENT_VOTES.map((row, i) => ({
    id: i + 1,
    gameNumber: GAME,
    opposition: OPP,
    parentChild: row.voter,
    vote3: row.vote3,
    vote2: row.vote2,
    vote1: row.vote1,
    timestamp: STAMP,
  }));
}

export function pineVillaAwards() {
  return [
    {
      id: 1,
      gameNumber: GAME,
      opposition: OPP,
      oppMom: OPP_MOM,
      playersPlayer: MANAGER,
      managerPlayer: MANAGER,
      updatedAt: STAMP,
    },
  ];
}

export function pineVillaMatchGoals() {
  return SAVED_PINE_VILLA_GOALS.map((g, i) => ({
    id: i + 1,
    fixtureId: 0,
    minute: g.minute,
    scorer: g.scorer,
    assist: g.assist,
  }));
}

let restoreLock: Promise<void> = Promise.resolve();
let restoreDone = false;

const PLAYED_GAMES: { game: string; opposition: string; players: string[] }[] = [
  {
    game: "Rd 1",
    opposition: "Pine Villa",
    players: [
      "13) Zachary Read (GK)",
      "16) Jacob Hill",
      "20) Archie Almond",
      "22) William Brittain",
      "30) Isa Ali",
      "4) Louie Biddiss",
      "5) Kody Cox",
      "8) Caleb Connelly",
      "9) Jacob Sands",
      "14) Henry Bearman",
    ],
  },
  {
    game: "Rd 2",
    opposition: "Newton-Le-Willows Rangers",
    players: [
      "13) Zachary Read (GK)",
      "20) Archie Almond",
      "22) William Brittain",
      "30) Isa Ali",
      "5) Kody Cox",
      "8) Caleb Connelly",
      "9) Jacob Sands",
      "14) Henry Bearman",
      "23) Hayden Plumbley",
      "3) Ruben Biddiss",
    ],
  },
  {
    game: "Rd 3",
    opposition: "Daisy Hill Devils",
    players: [
      "13) Zachary Read (GK)",
      "20) Archie Almond",
      "22) William Brittain",
      "4) Louie Biddiss",
      "5) Kody Cox",
      "66) Max Shaw",
      "8) Caleb Connelly",
      "9) Jacob Sands",
    ],
  },
  {
    game: "Rd 4",
    opposition: "Standish Panthers Storm",
    players: [
      "13) Zachary Read (GK)",
      "16) Jacob Hill",
      "20) Archie Almond",
      "3) Ruben Biddiss",
      "30) Isa Ali",
      "5) Kody Cox",
      "66) Max Shaw",
      "8) Caleb Connelly",
      "14) Henry Bearman",
      "22) William Brittain",
      "4) Louie Biddiss",
      "9) Jacob Sands",
    ],
  },
];

async function seedPlayedGames(sql: Sql) {
  try {
    await sql`
      delete from match_appearances
      where player = ${"30) Isa Ali"}
        and opposition ilike ${"%daisy%"}
    `;
  } catch {
    // appearances
  }
  for (const game of PLAYED_GAMES) {
    for (const player of game.players) {
      try {
        await sql`
          insert into match_appearances (game_number, opposition, player)
          values (${game.game}, ${game.opposition}, ${player})
          on conflict do nothing
        `;
      } catch {
        // appearances
      }
    }
  }
  try {
    await sql`
      update training_attendance
      set attended = 1, score = 10, effort = 10, attitude = 10, achievement = 7, label = ${"Friday 4 Sep"}
      where session_date = ${"2026-09-04"} and player = ${"14) Henry Bearman"}
    `;
  } catch {
    // henry 4 sep
  }
}

export async function restorePineVillaDay(sql: Sql): Promise<void> {
  await seedPlayedGames(sql);
  const { restoreKeptData } = await import("@/lib/kept-restore.server");
  await restoreKeptData(sql);
  if (restoreDone) return;
  const run = async () => {
    try {
      const existing = await sql<{ game_number: string; opposition: string }>`
        select game_number, opposition from current_match where id = 1 limit 1
      `;
      const game = String(existing[0]?.game_number || "").trim();
      const opp = String(existing[0]?.opposition || "").trim();
      if (!game || !opp) {
        await sql`
          insert into current_match (id, game_number, opposition, updated_at)
          values (1, ${GAME}, ${OPP}, now())
          on conflict (id) do update set
            game_number = excluded.game_number,
            opposition = excluded.opposition,
            updated_at = now()
        `;
      }
    } catch {
      return;
    }

    try {
      await sql`insert into squad_removed (player) values ('11) Jacob Saxon') on conflict (player) do nothing`;
      await sql`delete from training_attendance where player = ${"11) Jacob Saxon"}`;
      const plans = await sql<{ opposition: string; kickoff: string; lineup_json: string }>`
        select opposition, kickoff::text as kickoff, lineup_json from plan_saves
      `;
      for (const plan of plans) {
        const lineup = JSON.parse(String(plan.lineup_json || "{}")) as Record<string, string>;
        let changed = false;
        for (const [slot, name] of Object.entries(lineup)) {
          if (name === "11) Jacob Saxon") {
            delete lineup[slot];
            changed = true;
          }
        }
        if (!changed) continue;
        await sql`
          update plan_saves
          set lineup_json = ${JSON.stringify(lineup)}
          where opposition = ${plan.opposition} and kickoff::text = ${plan.kickoff}
        `;
      }
    } catch {
      /* squad table may not be ready on the first boot */
    }

    for (const row of PARENT_VOTES) {
      try {
        const hit = await sql<{ id: number }>`
          select id from votes
          where lower(btrim(game_number)) = lower(${GAME})
            and lower(btrim(opposition)) = lower(${OPP})
            and lower(btrim(voter_child)) = lower(${row.voter})
          limit 1
        `;
        if (hit[0]) continue;
        await sql`
          insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at)
          values (${GAME}, ${OPP}, ${row.voter}, ${row.vote3}, ${row.vote2}, ${row.vote1}, ${STAMP})
        `;
      } catch {
        // unique index may already have this family
      }
    }

    try {
      await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
        values (${GAME}, ${OPP}, ${OPP_MOM}, ${MANAGER}, ${MANAGER}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          manager_player = excluded.manager_player,
          updated_at = now()
      `;
    } catch {
      try {
        await sql`
          insert into match_awards (game_number, opposition, opp_mom, players_player, updated_at)
          values (${GAME}, ${OPP}, ${OPP_MOM}, ${MANAGER}, now())
          on conflict (game_number, opposition) do update set
            opp_mom = excluded.opp_mom,
            players_player = excluded.players_player,
            updated_at = now()
        `;
      } catch {
        // awards table
      }
    }
    await restoreSavedPoints(sql);
    restoreDone = true;
  };
  restoreLock = restoreLock.then(run, run);
  await restoreLock;
}

const DAISY = "Daisy Hill Devils";
const DAISY_GAME = "Rd 3";
const DAISY_STAMP = "2026-09-27T18:30:00.000Z";
const DAISY_VOTES: { voter: string; vote3: string; vote2: string; vote1: string }[] = [
  { voter: "20) Archie Almond", vote3: "22) William Brittain", vote2: "9) Jacob Sands", vote1: "4) Louie Biddiss" },
  { voter: "13) Zachary Read (GK)", vote3: "66) Max Shaw", vote2: "4) Louie Biddiss", vote1: "9) Jacob Sands" },
  { voter: "22) William Brittain", vote3: "5) Kody Cox", vote2: "9) Jacob Sands", vote1: "13) Zachary Read (GK)" },
  { voter: "4) Louie Biddiss", vote3: "13) Zachary Read (GK)", vote2: "8) Caleb Connelly", vote1: "22) William Brittain" },
  { voter: "66) Max Shaw", vote3: "9) Jacob Sands", vote2: "20) Archie Almond", vote1: "22) William Brittain" },
  { voter: "8) Caleb Connelly", vote3: "22) William Brittain", vote2: "20) Archie Almond", vote1: "4) Louie Biddiss" },
  { voter: "5) Kody Cox", vote3: "4) Louie Biddiss", vote2: "9) Jacob Sands", vote1: "66) Max Shaw" },
  { voter: "9) Jacob Sands", vote3: "5) Kody Cox", vote2: "22) William Brittain", vote1: "13) Zachary Read (GK)" },
];

/** Friday marks that feed the Points tab. Kept here so a reset cannot blank them. */
const SAVED_TRAINING: {
  date: string;
  player: string;
  attended: number;
  effort: number | null;
  attitude: number | null;
  achievement: number | null;
  label: string;
}[] = [
  row("2026-09-25", "16) Jacob Hill", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "20) Archie Almond", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "22) William Brittain", 1, 10, 10, 9, "Friday 25 Sep"),
  row("2026-09-25", "3) Ruben Biddiss", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "30) Isa Ali", 1, 10, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "4) Louie Biddiss", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "5) Kody Cox", 1, 9, 9, 8, "Friday 25 Sep"),
  row("2026-09-25", "66) Max Shaw", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "8) Caleb Connelly", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-09-25", "9) Jacob Sands", 1, 9, 9, 9, "Friday 25 Sep"),
  row("2026-10-02", "1) Harry Parr", 0, null, null, null, "Friday · Laithwaite Park"),
  row("2026-10-02", "13) Zachary Read (GK)", 0, null, null, null, "Friday · Laithwaite Park"),
  row("2026-10-02", "14) Henry Bearman", 1, 10, 10, 7, "Friday · Laithwaite Park"),
  row("2026-10-02", "16) Jacob Hill", 1, 10, 10, 7, "Friday · Laithwaite Park"),
  row("2026-10-02", "20) Archie Almond", 1, 10, 10, 8, "Friday · Laithwaite Park"),
  row("2026-10-02", "22) William Brittain", 1, 10, 10, 7, "Friday · Laithwaite Park"),
  row("2026-10-02", "23) Hayden Plumbley", 1, 8, 10, 6, "Friday · Laithwaite Park"),
  row("2026-10-02", "3) Ruben Biddiss", 1, 9, 10, 7, "Friday · Laithwaite Park"),
  row("2026-10-02", "30) Isa Ali", 1, 10, 10, 8, "Friday · Laithwaite Park"),
  row("2026-10-02", "4) Louie Biddiss", 1, 10, 10, 7, "Friday · Laithwaite Park"),
  row("2026-10-02", "5) Kody Cox", 1, 8, 10, 6, "Friday · Laithwaite Park"),
  row("2026-10-02", "6) Logan Massey", 0, null, null, null, "Friday · Laithwaite Park"),
  row("2026-10-02", "66) Max Shaw", 1, 10, 10, 9, "Friday · Laithwaite Park"),
  row("2026-10-02", "7) Cullen Atkinson-Lee", 0, null, null, null, "Friday · Laithwaite Park"),
  row("2026-10-02", "8) Caleb Connelly", 1, 10, 10, 7, "Friday · Laithwaite Park"),
  row("2026-10-02", "9) Jacob Sands", 1, 10, 10, 7, "Friday · Laithwaite Park"),
  row("2026-09-25", "23) Hayden Plumbley", 1, 8, 10, 7, "Friday 25 Sep"),
  row("2026-09-25", "1) Harry Parr", 0, null, null, null, "Friday 25 Sep"),
  row("2026-09-25", "13) Zachary Read (GK)", 0, null, null, null, "Friday 25 Sep"),
  row("2026-09-25", "14) Henry Bearman", 0, null, null, null, "Friday 25 Sep"),
  row("2026-09-04", "30) Isa Ali", 1, 10, 10, 9, "Friday 4 Sep"),
  row("2026-09-04", "22) William Brittain", 1, 10, 10, 8, "Friday 4 Sep"),
  row("2026-09-04", "9) Jacob Sands", 1, 10, 10, 8, "Friday 4 Sep"),
  row("2026-09-04", "20) Archie Almond", 1, 10, 10, 7, "Friday 4 Sep"),
  row("2026-09-04", "16) Jacob Hill", 1, 10, 10, 7, "Friday 4 Sep"),
  row("2026-09-04", "3) Ruben Biddiss", 1, 10, 10, 6, "Friday 4 Sep"),
  row("2026-09-04", "4) Louie Biddiss", 1, 10, 10, 6, "Friday 4 Sep"),
  row("2026-09-04", "8) Caleb Connelly", 1, 10, 10, 5, "Friday 4 Sep"),
  row("2026-09-04", "23) Hayden Plumbley", 1, 7, 10, 7, "Friday 4 Sep"),
  row("2026-09-04", "5) Kody Cox", 0, null, null, null, "Friday 4 Sep"),
  row("2026-09-04", "14) Henry Bearman", 1, 10, 10, 7, "Friday 4 Sep"),
  row("2026-09-04", "13) Zachary Read (GK)", 0, null, null, null, "Friday 4 Sep"),
  row("2026-09-04", "1) Harry Parr", 0, null, null, null, "Friday 4 Sep"),
  row("2026-09-11", "30) Isa Ali", 1, 10, 10, 8, "Friday 11 Sep"),
  row("2026-09-11", "22) William Brittain", 1, 10, 10, 8, "Friday 11 Sep"),
  row("2026-09-11", "9) Jacob Sands", 1, 10, 10, 8, "Friday 11 Sep"),
  row("2026-09-11", "20) Archie Almond", 1, 10, 10, 7, "Friday 11 Sep"),
  row("2026-09-11", "16) Jacob Hill", 1, 10, 10, 7, "Friday 11 Sep"),
  row("2026-09-11", "3) Ruben Biddiss", 1, 10, 10, 6, "Friday 11 Sep"),
  row("2026-09-11", "4) Louie Biddiss", 1, 10, 10, 6, "Friday 11 Sep"),
  row("2026-09-11", "8) Caleb Connelly", 1, 10, 10, 5, "Friday 11 Sep"),
  row("2026-09-11", "23) Hayden Plumbley", 1, 7, 10, 7, "Friday 11 Sep"),
  row("2026-09-11", "5) Kody Cox", 1, 10, 10, 8, "Friday 11 Sep"),
  row("2026-09-11", "14) Henry Bearman", 1, 10, 10, 8, "Friday 11 Sep"),
  row("2026-09-11", "13) Zachary Read (GK)", 1, null, null, null, "Friday 11 Sep"),
  row("2026-09-11", "1) Harry Parr", 0, null, null, null, "Friday 11 Sep"),
  row("2026-09-18", "30) Isa Ali", 1, 10, 10, 8, "Friday 18 Sep"),
  row("2026-09-18", "22) William Brittain", 1, 10, 10, 8, "Friday 18 Sep"),
  row("2026-09-18", "9) Jacob Sands", 1, 10, 10, 7, "Friday 18 Sep"),
  row("2026-09-18", "20) Archie Almond", 1, 10, 10, 7, "Friday 18 Sep"),
  row("2026-09-18", "16) Jacob Hill", 1, 10, 10, 7, "Friday 18 Sep"),
  row("2026-09-18", "3) Ruben Biddiss", 1, 10, 10, 6, "Friday 18 Sep"),
  row("2026-09-18", "4) Louie Biddiss", 1, 10, 10, 5, "Friday 18 Sep"),
  row("2026-09-18", "8) Caleb Connelly", 1, 10, 10, 5, "Friday 18 Sep"),
  row("2026-09-18", "23) Hayden Plumbley", 1, 7, 10, 6, "Friday 18 Sep"),
  row("2026-09-18", "5) Kody Cox", 1, 10, 10, 6, "Friday 18 Sep"),
  row("2026-09-18", "14) Henry Bearman", 1, 10, 10, 7, "Friday 18 Sep"),
  row("2026-09-18", "66) Max Shaw", 1, 10, 10, 6, "Friday 18 Sep"),
  row("2026-09-18", "13) Zachary Read (GK)", 0, null, null, null, "Friday 18 Sep"),
  row("2026-09-18", "1) Harry Parr", 0, null, null, null, "Friday 18 Sep"),
];

const NEWTON = "Newton-Le-Willows Rangers";
const NEWTON_GAME = "Rd 2";
const NEWTON_STAMP = "2026-09-20T18:30:00.000Z";
const NEWTON_VOTES: { voter: string; vote3: string; vote2: string; vote1: string }[] = [
  { voter: "20) Archie Almond", vote3: "13) Zachary Read (GK)", vote2: "9) Jacob Sands", vote1: "30) Isa Ali" },
  { voter: "8) Caleb Connelly", vote3: "13) Zachary Read (GK)", vote2: "20) Archie Almond", vote1: "30) Isa Ali" },
  { voter: "30) Isa Ali", vote3: "13) Zachary Read (GK)", vote2: "22) William Brittain", vote1: "5) Kody Cox" },
  { voter: "9) Jacob Sands", vote3: "22) William Brittain", vote2: "13) Zachary Read (GK)", vote1: "30) Isa Ali" },
  { voter: "5) Kody Cox", vote3: "13) Zachary Read (GK)", vote2: "22) William Brittain", vote1: "30) Isa Ali" },
  { voter: "22) William Brittain", vote3: "13) Zachary Read (GK)", vote2: "23) Hayden Plumbley", vote1: "3) Ruben Biddiss" },
  { voter: "13) Zachary Read (GK)", vote3: "14) Henry Bearman", vote2: "9) Jacob Sands", vote1: "5) Kody Cox" },
];

const STANDISH = "Standish Panthers Storm";
const STANDISH_GAME = "Rd 4";
const STANDISH_STAMP = "2026-10-04T19:15:00.000Z";
const STANDISH_VOTES: { voter: string; vote3: string; vote2: string; vote1: string }[] = [
  { voter: "20) Archie Almond", vote3: "4) Louie Biddiss", vote2: "8) Caleb Connelly", vote1: "22) William Brittain" },
  { voter: "8) Caleb Connelly", vote3: "20) Archie Almond", vote2: "22) William Brittain", vote1: "30) Isa Ali" },
  { voter: "30) Isa Ali", vote3: "22) William Brittain", vote2: "4) Louie Biddiss", vote1: "5) Kody Cox" },
  { voter: "16) Jacob Hill", vote3: "22) William Brittain", vote2: "30) Isa Ali", vote1: "4) Louie Biddiss" },
  { voter: "5) Kody Cox", vote3: "30) Isa Ali", vote2: "22) William Brittain", vote1: "14) Henry Bearman" },
  { voter: "66) Max Shaw", vote3: "22) William Brittain", vote2: "4) Louie Biddiss", vote1: "30) Isa Ali" },
  { voter: "13) Zachary Read (GK)", vote3: "4) Louie Biddiss", vote2: "8) Caleb Connelly", vote1: "9) Jacob Sands" },
  { voter: "3) Ruben Biddiss", vote3: "8) Caleb Connelly", vote2: "30) Isa Ali", vote1: "4) Louie Biddiss" },
];

function row(
  date: string,
  player: string,
  attended: number,
  effort: number | null,
  attitude: number | null,
  achievement: number | null,
  label: string,
) {
  return { date, player, attended, effort, attitude, achievement, label };
}

async function upsertVote(
  sql: Sql,
  game: string,
  opposition: string,
  vote: { voter: string; vote3: string; vote2: string; vote1: string },
  stamp: string,
) {
  const hit = await sql<{ id: number }>`
    select id from votes
    where lower(btrim(game_number)) = lower(${game})
      and lower(btrim(opposition)) = lower(${opposition})
      and lower(btrim(voter_child)) = lower(${vote.voter})
    limit 1
  `;
  if (hit[0]) {
    await sql`
      update votes
      set vote_3 = ${vote.vote3}, vote_2 = ${vote.vote2}, vote_1 = ${vote.vote1}
      where id = ${hit[0].id}
    `;
    return;
  }
  await sql`
    insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at)
    values (${game}, ${opposition}, ${vote.voter}, ${vote.vote3}, ${vote.vote2}, ${vote.vote1}, ${stamp})
  `;
}

async function restoreSavedPoints(sql: Sql) {
  for (const vote of DAISY_VOTES) {
    try {
      await upsertVote(sql, DAISY_GAME, DAISY, vote, DAISY_STAMP);
    } catch {
      // vote already stored
    }
  }

  for (const vote of NEWTON_VOTES) {
    try {
      await upsertVote(sql, NEWTON_GAME, NEWTON, vote, NEWTON_STAMP);
    } catch {
      // vote already stored
    }
  }

  try {
    await sql`
      delete from votes
      where voter_child like ${"Sunday parent %"}
    `;
  } catch {
    // guessed rows
  }

  try {
    await sql`
      delete from votes a
      using votes b
      where a.id > b.id
        and lower(btrim(a.game_number)) = lower(btrim(b.game_number))
        and lower(btrim(a.opposition)) = lower(btrim(b.opposition))
        and lower(btrim(a.voter_child)) = lower(btrim(b.voter_child))
    `;
  } catch {
    // one ballot per family per game
  }

  for (const vote of STANDISH_VOTES) {
    try {
      await upsertVote(sql, STANDISH_GAME, STANDISH, vote, STANDISH_STAMP);
    } catch {
      // vote already stored
    }
  }

  try {
    await sql`
      insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
      values (${DAISY_GAME}, ${DAISY}, ${"9) Jacob Sands"}, ${"4) Louie Biddiss"}, ${"4) Louie Biddiss"}, ${DAISY_STAMP})
      on conflict (game_number, opposition) do update set
        opp_mom = excluded.opp_mom,
        players_player = excluded.players_player,
        manager_player = excluded.manager_player
    `;
  } catch {
    // awards
  }

  try {
    await sql`
      insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
      values (${"Rd 2"}, ${"Newton-Le-Willows Rangers"}, ${null}, ${"22) William Brittain"}, ${"22) William Brittain"}, ${"2026-09-20T12:00:00.000Z"})
      on conflict (game_number, opposition) do update set
        players_player = excluded.players_player,
        manager_player = excluded.manager_player
    `;
  } catch {
    // awards
  }

  try {
    await sql`
      insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
      values (${"Rd 4"}, ${"Standish Panthers Storm"}, ${"4) Louie Biddiss|30) Isa Ali"}, ${null}, ${null}, now())
      on conflict (game_number, opposition) do update set
        opp_mom = excluded.opp_mom,
        updated_at = now()
    `;
  } catch {
    // awards
  }

  for (const mark of SAVED_TRAINING) {
    try {
      const hit = await sql<{ player: string }>`
        select player from training_attendance
        where session_date = ${mark.date} and player = ${mark.player}
        limit 1
      `;
      if (hit[0]) continue;
      await sql`
        insert into training_attendance
          (session_date, player, attended, score, effort, attitude, achievement, label)
        values
          (${mark.date}, ${mark.player}, ${mark.attended}, ${mark.effort}, ${mark.effort}, ${mark.attitude}, ${mark.achievement}, ${mark.label})
      `;
    } catch {
      // training row
    }
  }
}
