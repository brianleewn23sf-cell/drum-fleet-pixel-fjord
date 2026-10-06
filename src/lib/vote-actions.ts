import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { loadAppearances } from "@/lib/appearance-actions";
import { loadActiveSquad } from "@/lib/squad";
import { restorePineVillaDay } from "@/lib/restore-pine-villa";
import {
  BULLS_FIXTURES,
  bullsOpponent,
  fixtureRound,
  shortClub,
  voteFixture,
  type LeagueFixture,
} from "@/lib/wdyl";

export type VoteRow = {
  id: number;
  gameNumber: string;
  opposition: string;
  parentChild: string;
  vote3: string;
  vote2: string;
  vote1: string;
  timestamp: string;
};

export type CurrentMatch = {
  gameNumber: string;
  opposition: string;
};

const voteInput = z.object({
  gameNumber: z.string().trim().min(1).max(80),
  opposition: z.string().trim().min(1).max(80),
  parentChild: z.string().trim().min(1),
  vote3: z.string().trim().min(1),
  vote2: z.string().trim().min(1),
  vote1: z.string().trim().min(1),
});

const matchInput = z.object({
  gameNumber: z.string().trim().min(1).max(80),
  opposition: z.string().trim().min(1).max(80),
});

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return "";
}

async function readCurrentMatch(sql: Awaited<ReturnType<typeof getSql>>): Promise<CurrentMatch | null> {
  const rows = await sql<{ game_number: string; opposition: string }>`
    select game_number, opposition from current_match where id = 1 limit 1
  `;
  if (!rows[0]) return null;
  const gameNumber = String(rows[0].game_number || "").trim();
  const opposition = String(rows[0].opposition || "").trim();
  if (!gameNumber || !opposition) return null;
  return { gameNumber, opposition };
}

function bullsList(): LeagueFixture[] {
  return BULLS_FIXTURES.map((row, i) => ({
    id: i + 1,
    kickoff: row.kickoff,
    homeTeam: row.homeTeam,
    awayTeam: row.awayTeam,
    venue: row.venue,
    homeGoals: null,
    awayGoals: null,
    status: "",
  }));
}

export function matchOpenForVotes(now = new Date()): CurrentMatch | null {
  const fixtures = bullsList();
  const fx = voteFixture(fixtures, now);
  if (!fx) return null;
  return {
    gameNumber: `Rd ${fixtureRound(fixtures, fx)}`,
    opposition: shortClub(bullsOpponent(fx)),
  };
}

async function upsertCurrentMatch(
  sql: Awaited<ReturnType<typeof getSql>>,
  gameNumber: string,
  opposition: string,
) {
  await sql`
    insert into current_match (id, game_number, opposition, updated_at)
    values (1, ${gameNumber}, ${opposition}, now())
    on conflict (id) do update set
      game_number = excluded.game_number,
      opposition = excluded.opposition,
      updated_at = now()
  `;
}

export const getInitialData = createServerFn({ method: "POST" }).handler(
  async () => {
    const sql = await getSql();
    await restorePineVillaDay(sql);
    const { restoreVotesFromFile } = await import("@/lib/saved-votes.server");
    await restoreVotesFromFile(sql);
    const open = matchOpenForVotes();
    if (open) {
      await upsertCurrentMatch(sql, open.gameNumber, open.opposition);
    }
    const rows = await sql<{
      id: number;
      game_number: string;
      opposition: string;
      voter_child: string;
      vote_3: string;
      vote_2: string;
      vote_1: string;
      created_at: unknown;
    }>`
      select id, game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at
      from votes
      order by created_at asc, id asc
    `;
    const notesRows = await sql<{ player: string; note: string }>`select player, note from player_notes`.catch(
      () => [] as { player: string; note: string }[],
    );
    const currentMatch = await readCurrentMatch(sql);
    const appearances = await loadAppearances(sql);
    const players = await loadActiveSquad(sql);

    const history: VoteRow[] = rows.map((row) => ({
      id: Number(row.id),
      gameNumber: String(row.game_number || "").trim(),
      opposition: String(row.opposition || "").trim(),
      parentChild: String(row.voter_child || "").trim(),
      vote3: String(row.vote_3 || "").trim(),
      vote2: String(row.vote_2 || "").trim(),
      vote1: String(row.vote_1 || "").trim(),
      timestamp: asIso(row.created_at),
    }));
    const { rememberVotes } = await import("@/lib/saved-votes.server");
    rememberVotes(
      history.map((row) => ({
        gameNumber: row.gameNumber,
        opposition: row.opposition,
        voter: row.parentChild,
        vote3: row.vote3,
        vote2: row.vote2,
        vote1: row.vote1,
        at: row.timestamp,
      })),
    );

    const notes: Record<string, string> = {};
    for (const row of notesRows) {
      const player = String(row.player || "").trim();
      const note = String(row.note || "").trim();
      if (player && note) notes[player] = note;
    }

    return {
      players,
      history,
      currentMatch,
      notes,
      appearances,
    };
  },
);

export const setCurrentMatch = createServerFn({ method: "POST" })
  .validator(matchInput)
  .handler(async ({ data }) => {
    const sql = await getSql();
    await upsertCurrentMatch(sql, data.gameNumber, data.opposition);
    return { success: true as const, currentMatch: data };
  });

export const submitVotes = createServerFn({ method: "POST" })
  .validator(voteInput)
  .handler(async ({ data }) => {
    const open = matchOpenForVotes();
    if (!open) {
      return {
        success: false as const,
        error: "Voting is not open. It opens again for the next match.",
      };
    }
    const gameNumber = open.gameNumber;
    const opposition = open.opposition;
    const { parentChild, vote3, vote2, vote1 } = data;

    if (vote3 === vote2 || vote3 === vote1 || vote2 === vote1) {
      return {
        success: false as const,
        error: "Each vote must go to a different player.",
      };
    }
    if (parentChild === vote3 || parentChild === vote2 || parentChild === vote1) {
      return {
        success: false as const,
        error: "You cannot vote for your own child.",
      };
    }
    const sql = await getSql();
    const squad = await loadActiveSquad(sql);
    if (
      !squad.includes(parentChild) ||
      !squad.includes(vote3) ||
      !squad.includes(vote2) ||
      !squad.includes(vote1)
    ) {
      return {
        success: false as const,
        error: "One of the selected names is not on the squad list.",
      };
    }

    try {
      const hit = await sql<{ id: number }>`
        select id from votes
        where lower(btrim(game_number)) = lower(${gameNumber})
          and lower(btrim(opposition)) = lower(${opposition})
          and lower(btrim(voter_child)) = lower(${parentChild})
        limit 1
      `;
      if (hit[0]) {
        await sql`
          update votes
          set vote_3 = ${vote3}, vote_2 = ${vote2}, vote_1 = ${vote1}
          where id = ${hit[0].id}
        `;
        await sql`
          delete from votes
          where id <> ${hit[0].id}
            and lower(btrim(game_number)) = lower(${gameNumber})
            and lower(btrim(opposition)) = lower(${opposition})
            and lower(btrim(voter_child)) = lower(${parentChild})
        `;
      } else {
        await sql`
          insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1)
          values (${gameNumber}, ${opposition}, ${parentChild}, ${vote3}, ${vote2}, ${vote1})
        `;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/unique|duplicate|23505/i.test(message)) {
        await sql`
          update votes
          set vote_3 = ${vote3}, vote_2 = ${vote2}, vote_1 = ${vote1}
          where lower(btrim(game_number)) = lower(${gameNumber})
            and lower(btrim(opposition)) = lower(${opposition})
            and lower(btrim(voter_child)) = lower(${parentChild})
        `;
      } else {
        throw err;
      }
    }

    await upsertCurrentMatch(sql, gameNumber, opposition);
    const { writeAudit } = await import("@/lib/audit");
    await writeAudit({
      actor: parentChild,
      role: "parent",
      action: "vote.submit",
      player: parentChild,
      detail: `${gameNumber} vs ${opposition}`,
    });
    const { rememberVotes } = await import("@/lib/saved-votes.server");
    rememberVotes([
      {
        gameNumber,
        opposition,
        voter: parentChild,
        vote3,
        vote2,
        vote1,
        at: new Date().toISOString(),
      },
    ]);
    return { success: true as const };
  });

export const saveCoachVote = createServerFn({ method: "POST" })
  .validator(voteInput)
  .handler(async ({ data }) => {
    const { gameNumber, opposition, parentChild, vote3, vote2, vote1 } = data;
    if (vote3 === vote2 || vote3 === vote1 || vote2 === vote1) {
      return { success: false as const, error: "Each vote must go to a different player." };
    }
    if (parentChild === vote3 || parentChild === vote2 || parentChild === vote1) {
      return { success: false as const, error: "A family cannot vote for their own child." };
    }
    const sql = await getSql();
    const squad = await loadActiveSquad(sql);
    if (
      !squad.includes(parentChild) ||
      !squad.includes(vote3) ||
      !squad.includes(vote2) ||
      !squad.includes(vote1)
    ) {
      return { success: false as const, error: "One of the selected names is not on the squad list." };
    }
    const hit = await sql<{ id: number }>`
      select id from votes
      where lower(btrim(game_number)) = lower(${gameNumber})
        and lower(btrim(opposition)) = lower(${opposition})
        and lower(btrim(voter_child)) = lower(${parentChild})
      limit 1
    `;
    if (hit[0]) {
      await sql`
        update votes
        set vote_3 = ${vote3}, vote_2 = ${vote2}, vote_1 = ${vote1}
        where id = ${hit[0].id}
      `;
      await sql`
        delete from votes
        where id <> ${hit[0].id}
          and lower(btrim(game_number)) = lower(${gameNumber})
          and lower(btrim(opposition)) = lower(${opposition})
          and lower(btrim(voter_child)) = lower(${parentChild})
      `;
    } else {
      await sql`
        insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1)
        values (${gameNumber}, ${opposition}, ${parentChild}, ${vote3}, ${vote2}, ${vote1})
      `;
    }
    return { success: true as const };
  });
