import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-votes.server-DjEz41Sl.js
var FILE = "/workspace/data/saved-votes.json";
function key(vote) {
	return `${vote.gameNumber}|${vote.opposition}|${vote.voter}`.trim().toLowerCase();
}
function readSavedVotes() {
	try {
		const data = JSON.parse(readFileSync(FILE, "utf8"));
		if (!Array.isArray(data)) return [];
		return data.filter((row) => !!row && typeof row === "object" && typeof row.voter === "string" && typeof row.vote3 === "string");
	} catch {
		return [];
	}
}
function rememberVotes(votes) {
	try {
		const merged = /* @__PURE__ */ new Map();
		for (const vote of readSavedVotes()) merged.set(key(vote), vote);
		for (const vote of votes) {
			if (!vote.voter || !vote.vote3) continue;
			merged.set(key(vote), vote);
		}
		mkdirSync("/workspace/data", { recursive: true });
		writeFileSync(FILE, JSON.stringify([...merged.values()], null, 2));
	} catch {}
}
async function restoreVotesFromFile(sql) {
	try {
		await sql`
      delete from votes
      where lower(btrim(game_number)) = 'rd 5'
        and lower(btrim(opposition)) like '%cobra%'
    `;
	} catch {}
	for (const vote of readSavedVotes()) {
		if (/cobra/i.test(vote.opposition)) continue;
		try {
			if (!(await sql`
        select id from votes
        where lower(btrim(game_number)) = lower(${vote.gameNumber})
          and lower(btrim(opposition)) = lower(${vote.opposition})
          and lower(btrim(voter_child)) = lower(${vote.voter})
        limit 1
      `)[0]) await sql`
          insert into votes (game_number, opposition, voter_child, vote_3, vote_2, vote_1, created_at)
          values (${vote.gameNumber}, ${vote.opposition}, ${vote.voter}, ${vote.vote3}, ${vote.vote2 || ""}, ${vote.vote1 || ""}, ${vote.at || (/* @__PURE__ */ new Date()).toISOString()})
        `;
		} catch {}
	}
}
//#endregion
export { rememberVotes, restoreVotesFromFile };
