import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { C as shortClub, D as voteFixture, d as bullsOpponent, t as BULLS_FIXTURES, v as fixtureRound } from "./wdyl-CJ_QwBRn.mjs";
import { s as restorePineVillaDay } from "./restore-pine-villa-CU4kvcRX.mjs";
import { n as loadActiveSquad } from "./squad-C3dFz7Mc.mjs";
import { t as loadAppearances } from "./appearance-actions-AdAmm59Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vote-actions-BVyXsHAS.js
var voteInput = object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	parentChild: string().trim().min(1),
	vote3: string().trim().min(1),
	vote2: string().trim().min(1),
	vote1: string().trim().min(1)
});
var matchInput = object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80)
});
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string") return value;
	return "";
}
async function readCurrentMatch(sql) {
	const rows = await sql`
    select game_number, opposition from current_match where id = 1 limit 1
  `;
	if (!rows[0]) return null;
	const gameNumber = String(rows[0].game_number || "").trim();
	const opposition = String(rows[0].opposition || "").trim();
	if (!gameNumber || !opposition) return null;
	return {
		gameNumber,
		opposition
	};
}
function bullsList() {
	return BULLS_FIXTURES.map((row, i) => ({
		id: i + 1,
		kickoff: row.kickoff,
		homeTeam: row.homeTeam,
		awayTeam: row.awayTeam,
		venue: row.venue,
		homeGoals: null,
		awayGoals: null,
		status: ""
	}));
}
function matchOpenForVotes(now = /* @__PURE__ */ new Date()) {
	const fixtures = bullsList();
	const fx = voteFixture(fixtures, now);
	if (!fx) return null;
	return {
		gameNumber: `Rd ${fixtureRound(fixtures, fx)}`,
		opposition: shortClub(bullsOpponent(fx))
	};
}
async function upsertCurrentMatch(sql, gameNumber, opposition) {
	await sql`
    insert into current_match (id, game_number, opposition, updated_at)
    values (1, ${gameNumber}, ${opposition}, now())
    on conflict (id) do update set
      game_number = excluded.game_number,
      opposition = excluded.opposition,
      updated_at = now()
  `;
}
var getInitialData_createServerFn_handler = createServerRpc({
	id: "01a504ddd7f7444600c7da6157dea122908369ee5c0813770d05a43555fff9dc",
	name: "getInitialData",
	filename: "src/lib/vote-actions.ts"
}, (opts) => getInitialData.__executeServer(opts));
var getInitialData = createServerFn({ method: "POST" }).handler(getInitialData_createServerFn_handler, async () => {
	const sql = await getSql();
	await restorePineVillaDay(sql);
	const { restoreVotesFromFile } = await import("./saved-votes.server-DjEz41Sl.mjs");
	await restoreVotesFromFile(sql);
	const open = matchOpenForVotes();
	if (open) await upsertCurrentMatch(sql, open.gameNumber, open.opposition);
	const rows = await sql`
      select id, game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at
      from votes
      order by created_at asc, id asc
    `;
	const notesRows = await sql`select player, note from player_notes`.catch(() => []);
	const currentMatch = await readCurrentMatch(sql);
	const appearances = await loadAppearances(sql);
	const players = await loadActiveSquad(sql);
	const history = rows.map((row) => ({
		id: Number(row.id),
		gameNumber: String(row.game_number || "").trim(),
		opposition: String(row.opposition || "").trim(),
		parentChild: String(row.voter_child || "").trim(),
		vote3: String(row.vote_3 || "").trim(),
		vote2: String(row.vote_2 || "").trim(),
		vote1: String(row.vote_1 || "").trim(),
		timestamp: asIso(row.created_at)
	}));
	const { rememberVotes } = await import("./saved-votes.server-DjEz41Sl.mjs");
	rememberVotes(history.map((row) => ({
		gameNumber: row.gameNumber,
		opposition: row.opposition,
		voter: row.parentChild,
		vote3: row.vote3,
		vote2: row.vote2,
		vote1: row.vote1,
		at: row.timestamp
	})));
	const notes = {};
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
		appearances
	};
});
var setCurrentMatch_createServerFn_handler = createServerRpc({
	id: "34ce2cbe8c9e10f3837bc75ef99cb45ba1a7ab8a3e0a1c5dd07a124dcc6ead5f",
	name: "setCurrentMatch",
	filename: "src/lib/vote-actions.ts"
}, (opts) => setCurrentMatch.__executeServer(opts));
var setCurrentMatch = createServerFn({ method: "POST" }).validator(matchInput).handler(setCurrentMatch_createServerFn_handler, async ({ data }) => {
	await upsertCurrentMatch(await getSql(), data.gameNumber, data.opposition);
	return {
		success: true,
		currentMatch: data
	};
});
var submitVotes_createServerFn_handler = createServerRpc({
	id: "57a1f951ab6683bbb6d807e2cee35f453a02c0a7d42fecb3521697442ebeddc1",
	name: "submitVotes",
	filename: "src/lib/vote-actions.ts"
}, (opts) => submitVotes.__executeServer(opts));
var submitVotes = createServerFn({ method: "POST" }).validator(voteInput).handler(submitVotes_createServerFn_handler, async ({ data }) => {
	const open = matchOpenForVotes();
	if (!open) return {
		success: false,
		error: "Voting is not open. It opens again for the next match."
	};
	const gameNumber = open.gameNumber;
	const opposition = open.opposition;
	const { parentChild, vote3, vote2, vote1 } = data;
	if (vote3 === vote2 || vote3 === vote1 || vote2 === vote1) return {
		success: false,
		error: "Each vote must go to a different player."
	};
	if (parentChild === vote3 || parentChild === vote2 || parentChild === vote1) return {
		success: false,
		error: "You cannot vote for your own child."
	};
	const sql = await getSql();
	const squad = await loadActiveSquad(sql);
	if (!squad.includes(parentChild) || !squad.includes(vote3) || !squad.includes(vote2) || !squad.includes(vote1)) return {
		success: false,
		error: "One of the selected names is not on the squad list."
	};
	try {
		const hit = await sql`
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
		} else await sql`
          insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1)
          values (${gameNumber}, ${opposition}, ${parentChild}, ${vote3}, ${vote2}, ${vote1})
        `;
	} catch (err) {
		const message = err instanceof Error ? err.message : String(err);
		if (/unique|duplicate|23505/i.test(message)) await sql`
          update votes
          set vote_3 = ${vote3}, vote_2 = ${vote2}, vote_1 = ${vote1}
          where lower(btrim(game_number)) = lower(${gameNumber})
            and lower(btrim(opposition)) = lower(${opposition})
            and lower(btrim(voter_child)) = lower(${parentChild})
        `;
		else throw err;
	}
	await upsertCurrentMatch(sql, gameNumber, opposition);
	const { writeAudit } = await import("./audit-DKcUlOE6.mjs").then((n) => n.t);
	await writeAudit({
		actor: parentChild,
		role: "parent",
		action: "vote.submit",
		player: parentChild,
		detail: `${gameNumber} vs ${opposition}`
	});
	const { rememberVotes } = await import("./saved-votes.server-DjEz41Sl.mjs");
	rememberVotes([{
		gameNumber,
		opposition,
		voter: parentChild,
		vote3,
		vote2,
		vote1,
		at: (/* @__PURE__ */ new Date()).toISOString()
	}]);
	return { success: true };
});
var saveCoachVote_createServerFn_handler = createServerRpc({
	id: "154993af67964e4f635431e28041da7bcf936eeb1dfee102dd10d93db4a90b01",
	name: "saveCoachVote",
	filename: "src/lib/vote-actions.ts"
}, (opts) => saveCoachVote.__executeServer(opts));
var saveCoachVote = createServerFn({ method: "POST" }).validator(voteInput).handler(saveCoachVote_createServerFn_handler, async ({ data }) => {
	const { gameNumber, opposition, parentChild, vote3, vote2, vote1 } = data;
	if (vote3 === vote2 || vote3 === vote1 || vote2 === vote1) return {
		success: false,
		error: "Each vote must go to a different player."
	};
	if (parentChild === vote3 || parentChild === vote2 || parentChild === vote1) return {
		success: false,
		error: "A family cannot vote for their own child."
	};
	const sql = await getSql();
	const squad = await loadActiveSquad(sql);
	if (!squad.includes(parentChild) || !squad.includes(vote3) || !squad.includes(vote2) || !squad.includes(vote1)) return {
		success: false,
		error: "One of the selected names is not on the squad list."
	};
	const hit = await sql`
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
	} else await sql`
        insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1)
        values (${gameNumber}, ${opposition}, ${parentChild}, ${vote3}, ${vote2}, ${vote1})
      `;
	return { success: true };
});
//#endregion
export { getInitialData_createServerFn_handler, saveCoachVote_createServerFn_handler, setCurrentMatch_createServerFn_handler, submitVotes_createServerFn_handler };
