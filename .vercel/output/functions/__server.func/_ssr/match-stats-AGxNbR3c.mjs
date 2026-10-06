//#region node_modules/.nitro/vite/services/ssr/assets/match-stats-AGxNbR3c.js
var MATCH_STAT_FIELDS = [
	{
		key: "goals",
		label: "Goals",
		short: "Gls",
		meaning: "He put the ball in the net."
	},
	{
		key: "assists",
		label: "Assists",
		short: "Ast",
		meaning: "Last pass or cross before the goal."
	},
	{
		key: "preAssists",
		label: "Pre-assists",
		short: "Pre",
		meaning: "Pass that led to the assist — the ball before the last ball."
	},
	{
		key: "shots",
		label: "Shots",
		short: "Sht",
		meaning: "Attempts at goal, on or off target."
	},
	{
		key: "tackles",
		label: "Tackles",
		short: "Tck",
		meaning: "Won the ball off an opponent."
	},
	{
		key: "interceptions",
		label: "Interceptions",
		short: "Int",
		meaning: "Cut out a pass before it reached their man."
	},
	{
		key: "blocks",
		label: "Blocks",
		short: "Blk",
		meaning: "Stopped a shot or cross with the body."
	},
	{
		key: "recoveries",
		label: "Recoveries",
		short: "Rec",
		meaning: "Picked up a loose ball and got us going again."
	},
	{
		key: "saves",
		label: "Saves",
		short: "Sav",
		meaning: "Keeper stopped a shot on target."
	},
	{
		key: "catches",
		label: "Catches",
		short: "Cch",
		meaning: "Keeper caught a cross or shot."
	},
	{
		key: "crosses",
		label: "Crosses",
		short: "Crs",
		meaning: "Ball delivered in from wide."
	},
	{
		key: "dribbles",
		label: "Dribbles",
		short: "Drb",
		meaning: "Beat a man with the ball."
	},
	{
		key: "fouls",
		label: "Fouls",
		short: "Fls",
		meaning: "Free kick given against him."
	}
];
function emptyStats(player) {
	return {
		player,
		goals: 0,
		assists: 0,
		preAssists: 0,
		shots: 0,
		tackles: 0,
		interceptions: 0,
		blocks: 0,
		recoveries: 0,
		saves: 0,
		catches: 0,
		crosses: 0,
		dribbles: 0,
		fouls: 0
	};
}
function hasAnyStat(row) {
	return MATCH_STAT_FIELDS.some((f) => row[f.key] > 0);
}
function seasonTally(players, results) {
	return players.map((player) => {
		const row = emptyStats(player);
		for (const result of results) {
			const mark = result.stats.find((s) => s.player === player);
			if (!mark) continue;
			for (const f of MATCH_STAT_FIELDS) row[f.key] += mark[f.key];
		}
		return row;
	}).filter(hasAnyStat).sort((a, b) => b.goals - a.goals || b.assists - a.assists || a.player.localeCompare(b.player));
}
//#endregion
export { seasonTally as i, emptyStats as n, hasAnyStat as r, MATCH_STAT_FIELDS as t };
