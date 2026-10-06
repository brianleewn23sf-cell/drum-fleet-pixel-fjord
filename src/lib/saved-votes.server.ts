import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const FILE = "/workspace/data/saved-votes.json";

type SavedVote = {
  gameNumber: string;
  opposition: string;
  voter: string;
  vote3: string;
  vote2: string;
  vote1: string;
  at: string;
};

function key(vote: Pick<SavedVote, "gameNumber" | "opposition" | "voter">): string {
  return `${vote.gameNumber}|${vote.opposition}|${vote.voter}`.trim().toLowerCase();
}

function readSavedVotes(): SavedVote[] {
  try {
    const data = JSON.parse(readFileSync(FILE, "utf8")) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (row): row is SavedVote =>
        !!row &&
        typeof row === "object" &&
        typeof (row as SavedVote).voter === "string" &&
        typeof (row as SavedVote).vote3 === "string",
    );
  } catch {
    return [];
  }
}

export function rememberVotes(votes: SavedVote[]): void {
  try {
    const merged = new Map<string, SavedVote>();
    for (const vote of readSavedVotes()) merged.set(key(vote), vote);
    for (const vote of votes) {
      if (!vote.voter || !vote.vote3) continue;
      merged.set(key(vote), vote);
    }
    mkdirSync("/workspace/data", { recursive: true });
    writeFileSync(FILE, JSON.stringify([...merged.values()], null, 2));
  } catch {
    // the database row is still the live copy
  }
}

export async function restoreVotesFromFile(sql: {
  <T = Record<string, unknown>>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]>;
}): Promise<void> {
  try {
    await sql`
      delete from votes
      where lower(btrim(game_number)) = 'rd 5'
        and lower(btrim(opposition)) like '%cobra%'
    `;
  } catch {
    // cobras has not been played
  }
  for (const vote of readSavedVotes()) {
    if (/cobra/i.test(vote.opposition)) continue;
    try {
      const hit = await sql<{ id: number }>`
        select id from votes
        where lower(btrim(game_number)) = lower(${vote.gameNumber})
          and lower(btrim(opposition)) = lower(${vote.opposition})
          and lower(btrim(voter_child)) = lower(${vote.voter})
        limit 1
      `;
      if (!hit[0]) {
        await sql`
          insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at)
          values (${vote.gameNumber}, ${vote.opposition}, ${vote.voter}, ${vote.vote3}, ${vote.vote2 || ""}, ${vote.vote1 || ""}, ${vote.at || new Date().toISOString()})
        `;
      }
    } catch {
      // vote already stored
    }
  }
}
