//#region node_modules/.nitro/vite/services/ssr/assets/league-Ch1nTJJB.js
function gameKey(gameNumber, opposition) {
	return `${gameNumber}|||${opposition}`;
}
function clubKey(opposition) {
	return opposition.toLowerCase().replace(/\b(junior|juniors|u12s?|fc|devils|rangers|storm|cobras|raptors|dynamos|gladiators)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}
/** This match only. Game number and opposition must both match. */
function votesForMatch(history, gameNumber, opposition) {
	const game = gameNumber.trim().toLowerCase();
	const opp = opposition.trim().toLowerCase();
	const club = clubKey(opposition);
	if (!game || !opp) return [];
	return history.filter((row) => {
		if (row.gameNumber.trim().toLowerCase() !== game) return false;
		if (row.opposition.trim().toLowerCase() === opp) return true;
		return club.length > 2 && clubKey(row.opposition) === club;
	});
}
function rowGameKey(row) {
	return gameKey(row.gameNumber, row.opposition);
}
function computeTotals(players, history, appearances) {
	const totals = /* @__PURE__ */ new Map();
	for (const p of players) totals.set(p, {
		name: p,
		pts: 0,
		n3: 0,
		n2: 0,
		n1: 0,
		gameSet: /* @__PURE__ */ new Set()
	});
	for (const row of history) {
		const key = rowGameKey(row);
		const gpFromVotes = !appearances?.[key];
		const t3 = totals.get(row.vote3);
		if (t3) {
			t3.pts += 3;
			t3.n3 += 1;
			if (gpFromVotes) t3.gameSet.add(key);
		}
		const t2 = totals.get(row.vote2);
		if (t2) {
			t2.pts += 2;
			t2.n2 += 1;
			if (gpFromVotes) t2.gameSet.add(key);
		}
		const t1 = totals.get(row.vote1);
		if (t1) {
			t1.pts += 1;
			t1.n1 += 1;
			if (gpFromVotes) t1.gameSet.add(key);
		}
		if (Number(row.gameNumber.match(/(\d+)/)?.[1] ?? 0) >= 4 && row.parentChild) {
			const voter = totals.get(row.parentChild);
			if (voter) voter.pts += 1;
		}
	}
	if (appearances) for (const [key, squad] of Object.entries(appearances)) for (const name of squad) {
		const t = totals.get(name);
		if (t) t.gameSet.add(key);
	}
	return [...totals.values()].map((t) => {
		const games = t.gameSet.size;
		return {
			name: t.name,
			pts: t.pts,
			n3: t.n3,
			n2: t.n2,
			n1: t.n1,
			games,
			ppg: games ? Math.round(t.pts / games * 10) / 10 : 0
		};
	}).sort((a, b) => b.pts - a.pts || b.n3 - a.n3 || b.n2 - a.n2 || a.name.localeCompare(b.name));
}
function groupGames(history) {
	const map = /* @__PURE__ */ new Map();
	for (const row of history) {
		const key = rowGameKey(row);
		const existing = map.get(key);
		if (existing) {
			existing.votes.push(row);
			if (row.timestamp > existing.lastTs) existing.lastTs = row.timestamp;
		} else map.set(key, {
			key,
			gameNumber: row.gameNumber,
			opposition: row.opposition,
			votes: [row],
			lastTs: row.timestamp
		});
	}
	return [...map.values()].sort((a, b) => b.lastTs.localeCompare(a.lastTs));
}
function fixtureVoteRows(history, opponent, round) {
	const opp = opponent.toLowerCase();
	const rd = String(round);
	const byOpp = history.filter((row) => {
		const o = row.opposition.toLowerCase();
		return o === opp || o.includes(opp) || opp.includes(o);
	});
	if (byOpp.length && round > 0) {
		const byRound = byOpp.filter((row) => {
			return row.gameNumber.toLowerCase().includes(rd);
		});
		if (byRound.length) return byRound;
	}
	return byOpp;
}
//#endregion
export { votesForMatch as a, groupGames as i, fixtureVoteRows as n, gameKey as r, computeTotals as t };
