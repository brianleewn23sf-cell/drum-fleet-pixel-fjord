import { n as createServerFn } from "./ssr.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { C as shortClub, D as voteFixture, d as bullsOpponent, t as BULLS_FIXTURES, v as fixtureRound } from "./wdyl-CJ_QwBRn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vote-actions-CvyU8sOo.js
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
var getInitialData = createServerFn({ method: "POST" }).handler(createSsrRpc("01a504ddd7f7444600c7da6157dea122908369ee5c0813770d05a43555fff9dc"));
var setCurrentMatch = createServerFn({ method: "POST" }).validator(matchInput).handler(createSsrRpc("34ce2cbe8c9e10f3837bc75ef99cb45ba1a7ab8a3e0a1c5dd07a124dcc6ead5f"));
var submitVotes = createServerFn({ method: "POST" }).validator(voteInput).handler(createSsrRpc("57a1f951ab6683bbb6d807e2cee35f453a02c0a7d42fecb3521697442ebeddc1"));
var saveCoachVote = createServerFn({ method: "POST" }).validator(voteInput).handler(createSsrRpc("154993af67964e4f635431e28041da7bcf936eeb1dfee102dd10d93db4a90b01"));
//#endregion
export { submitVotes as a, setCurrentMatch as i, matchOpenForVotes as n, saveCoachVote as r, getInitialData as t };
