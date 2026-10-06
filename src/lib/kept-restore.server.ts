import { keptData } from "@/lib/kept-data";

type Row = Record<string, string | number | null>;
type Sql = {
  <T = Record<string, unknown>>(strings: TemplateStringsArray, ...values: unknown[]): Promise<T[]>;
};

const votes = keptData.votes as unknown as Row[];
const awards = keptData.match_awards as unknown as Row[];
const goals = keptData.match_goals as unknown as Row[];
const appearances = keptData.match_appearances as unknown as Row[];
const training = keptData.training_attendance as unknown as Row[];
const tests = keptData.fitness_tests as unknown as Row[];
const removed = keptData.squad_removed as unknown as Row[];

let restored = false;

function text(value: string | number | null | undefined): string {
  return value == null ? "" : String(value);
}

/** Puts the saved board back if a new publish starts with an empty database. */
export async function restoreKeptData(sql: Sql): Promise<void> {
  if (restored) return;
  restored = true;
  try {
    for (const row of votes) {
      if (/cobra/i.test(text(row.opposition))) continue;
      const hit = await sql<{ id: number }>`
        select id from votes
        where lower(btrim(game_number)) = lower(${text(row.game_number)})
          and lower(btrim(opposition)) = lower(${text(row.opposition)})
          and lower(btrim(voter_child)) = lower(${text(row.voter_child)})
        limit 1
      `;
      if (hit[0]) continue;
      await sql`
        insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at)
        values (
          ${text(row.game_number)},
          ${text(row.opposition)},
          ${text(row.voter_child)},
          ${text(row.vote_3)},
          ${text(row.vote_2)},
          ${text(row.vote_1)},
          ${text(row.created_at)}
        )
      `;
    }

    for (const row of awards) {
      const hit = await sql<{ id: number }>`
        select id from match_awards
        where lower(btrim(game_number)) = lower(${text(row.game_number)})
          and lower(btrim(opposition)) = lower(${text(row.opposition)})
        limit 1
      `;
      if (hit[0]) continue;
      await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
        values (
          ${text(row.game_number)},
          ${text(row.opposition)},
          ${row.opp_mom},
          ${row.players_player},
          ${row.manager_player},
          ${text(row.updated_at)}
        )
      `;
    }

    for (const row of goals) {
      const hit = await sql<{ id: number }>`
        select id from match_goals
        where fixture_id = ${Number(row.fixture_id)}
          and minute = ${Number(row.minute)}
          and scorer = ${text(row.scorer)}
          and coalesce(assist, '') = ${text(row.assist)}
        limit 1
      `;
      if (hit[0]) continue;
      await sql`
        insert into match_goals (fixture_id, minute, scorer, assist, sort_order)
        values (${Number(row.fixture_id)}, ${Number(row.minute)}, ${text(row.scorer)}, ${row.assist}, ${Number(row.sort_order) || 0})
      `;
    }

    for (const row of appearances) {
      await sql`
        insert into match_appearances (game_number, opposition, player)
        values (${text(row.game_number)}, ${text(row.opposition)}, ${text(row.player)})
        on conflict do nothing
      `;
    }

    for (const row of training) {
      await sql`
        insert into training_attendance (session_date, player, attended, score, label, attitude, effort, achievement)
        values (
          ${text(row.session_date)},
          ${text(row.player)},
          ${Number(row.attended) || 0},
          ${row.score},
          ${text(row.label)},
          ${row.attitude},
          ${row.effort},
          ${row.achievement}
        )
        on conflict (session_date, player) do nothing
      `;
    }

    for (const row of tests) {
      const hit = await sql<{ id: number }>`
        select id from fitness_tests
        where player = ${text(row.player)} and tested_on = ${text(row.tested_on)}
        limit 1
      `;
      if (hit[0]) continue;
      await sql`
        insert into fitness_tests (
          player, tested_on, zz50_no_ball, zz50_ball, sprint30_no_ball, sprint30_ball,
          turns_3x4, shooting_pts, shooting_power, created_at
        )
        values (
          ${text(row.player)},
          ${text(row.tested_on)},
          ${row.zz50_no_ball},
          ${row.zz50_ball},
          ${row.sprint30_no_ball},
          ${row.sprint30_ball},
          ${row.turns_3x4},
          ${row.shooting_pts},
          ${row.shooting_power},
          ${text(row.created_at)}
        )
      `;
    }

    for (const row of removed) {
      await sql`
        insert into squad_removed (player) values (${text(row.player)})
        on conflict (player) do nothing
      `;
    }
  } catch {
    restored = false;
  }
}
