import { t as parseISO } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wdyl-CJ_QwBRn.js
var BULLS_TEAM = "Cherrybrook U12 Bulls";
var LEAGUE_NAME = "Wigan & District Youth League";
var SEASON_NAME = "2026/27";
var U12_DIVISIONS = [
	{
		id: "north",
		label: "U12 North",
		rank: "Div 1",
		teams: [
			"Cherrybrook U12 madrid",
			"Cherrybrook U12 warriors",
			"FS Coaching Academy U12 FS Academy",
			"Golborne Sports Junior U12 Spartans",
			"Ladybridge U12 Lions",
			"Penlake U12 Rangers {Sunday}",
			"Robin Park U12 Rangers",
			"Whittle Hall U12 Titans (Sunday)"
		]
	},
	{
		id: "south",
		label: "U12 South",
		rank: "Div 2",
		teams: [
			"Cherrybrook U12 Bulls",
			"Cherrybrook U12 cobras",
			"Daisy Hill Junior U12 Devils",
			"Golborne Sports Junior U12 Gladiators",
			"Ladybridge U12 Dynamos",
			"Matthiola U12 Atletico (Sun)",
			"Newton-Le-Willows U12 Rangers",
			"Pine Villa U12 s",
			"Robin Park U12 Raptors",
			"Standish Panthers Juniors U12 Storm"
		]
	},
	{
		id: "west",
		label: "U12 West",
		rank: "Div 3",
		teams: [
			"Appley Bridge U12",
			"Bolton Lads & Girls Club U12 BLGC Lions",
			"Cherrybrook U12 Knights",
			"Cherrybrook U12 hurricanes",
			"Cherrybrook U12 raiders",
			"F.C. Britannia (Wigan) U12 Blue",
			"F.C. Britannia (Wigan) U12 Whites",
			"F.C. Britannia (Wigan) U12 Yellow",
			"Standish Panthers Juniors U12 Lightning",
			"Winwick Spartans U12 Sharks"
		]
	},
	{
		id: "east",
		label: "U12 East",
		rank: "Div 4",
		teams: [
			"Cherrybrook U12 eagles",
			"Cherrybrook U12 hornets",
			"Daisy Hill Junior U12 Titans",
			"Golborne Sports Junior U12 Vikings",
			"Hawkley U12 Hawkley",
			"Highfield Grange U12 's Rangers",
			"Hindley Juniors U12 Falcons",
			"Shevington U12 Royals"
		]
	}
];
var DIVISION_TEAMS = U12_DIVISIONS.find((d) => d.id === "south").teams;
var BULLS_FIXTURES = [
	{
		kickoff: "2026-09-06T11:00",
		homeTeam: "Pine Villa U12 s",
		awayTeam: BULLS_TEAM,
		venue: "Albany Academy"
	},
	{
		kickoff: "2026-09-20T09:00",
		homeTeam: "Newton-Le-Willows U12 Rangers",
		awayTeam: BULLS_TEAM,
		venue: "King George V Playing Fields (Newton-le-Willows)"
	},
	{
		kickoff: "2026-09-27T11:15",
		homeTeam: BULLS_TEAM,
		awayTeam: "Daisy Hill Junior U12 Devils",
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	},
	{
		kickoff: "2026-10-04T11:15",
		homeTeam: "Standish Panthers Juniors U12 Storm",
		awayTeam: BULLS_TEAM,
		venue: "Laithwaite Park Hub P2 (2) 9v9"
	},
	{
		kickoff: "2026-10-11T10:00",
		homeTeam: BULLS_TEAM,
		awayTeam: "Cherrybrook U12 cobras",
		venue: "Laithwaite Park Hub P2 (2) 9v9"
	},
	{
		kickoff: "2026-10-18T09:00",
		homeTeam: "Robin Park U12 Raptors",
		awayTeam: BULLS_TEAM,
		venue: "William Fosters Pitch 2 (3) 9v9"
	},
	{
		kickoff: "2026-10-25T10:00",
		homeTeam: BULLS_TEAM,
		awayTeam: "Ladybridge U12 Dynamos",
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	},
	{
		kickoff: "2026-11-01T09:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: BULLS_TEAM,
		venue: "The Oaks (Risley)"
	},
	{
		kickoff: "2026-11-22T10:00",
		homeTeam: BULLS_TEAM,
		awayTeam: "Newton-Le-Willows U12 Rangers",
		venue: "Laithwaite Park Hub P2 (2) 9v9"
	},
	{
		kickoff: "2026-11-29T09:00",
		homeTeam: "Daisy Hill Junior U12 Devils",
		awayTeam: BULLS_TEAM,
		venue: "Daisy Hill Juniors FC"
	},
	{
		kickoff: "2026-12-13T08:45",
		homeTeam: "Cherrybrook U12 cobras",
		awayTeam: BULLS_TEAM,
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	},
	{
		kickoff: "2027-01-10T10:00",
		homeTeam: BULLS_TEAM,
		awayTeam: "Robin Park U12 Raptors",
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	},
	{
		kickoff: "2027-01-17T09:00",
		homeTeam: "Ladybridge U12 Dynamos",
		awayTeam: BULLS_TEAM,
		venue: "Ladybridge Lane"
	},
	{
		kickoff: "2027-01-24T08:45",
		homeTeam: BULLS_TEAM,
		awayTeam: "Matthiola U12 Atletico (Sun)",
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	},
	{
		kickoff: "2027-01-31T08:45",
		homeTeam: BULLS_TEAM,
		awayTeam: "Golborne Sports Junior U12 Gladiators",
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	},
	{
		kickoff: "2027-02-07T12:15",
		homeTeam: "Golborne Sports Junior U12 Gladiators",
		awayTeam: BULLS_TEAM,
		venue: "William Fosters Pitch 1 (3) 9v9"
	},
	{
		kickoff: "2027-02-28T08:45",
		homeTeam: BULLS_TEAM,
		awayTeam: "Standish Panthers Juniors U12 Storm",
		venue: "Laithwaite Park Hub P2 (2) 9v9"
	},
	{
		kickoff: "2027-03-21T08:45",
		homeTeam: BULLS_TEAM,
		awayTeam: "Pine Villa U12 s",
		venue: "Laithwaite Park Hub P2 (3) 9v9"
	}
];
var PINE_VILLA_OPENER = {
	homeTeam: "Pine Villa U12 s",
	awayTeam: BULLS_TEAM,
	homeGoals: 7,
	awayGoals: 6
};
var NEWTON_RANGERS_RESULT = {
	homeTeam: "Newton-Le-Willows U12 Rangers",
	awayTeam: BULLS_TEAM,
	homeGoals: 5,
	awayGoals: 1,
	kickoff: "2026-09-20T09:00"
};
/** Home. William Brittain scored the Bulls goal. */
var DAISY_HILL_RESULT = {
	homeTeam: BULLS_TEAM,
	awayTeam: "Daisy Hill Junior U12 Devils",
	homeGoals: 1,
	awayGoals: 3,
	kickoff: "2026-09-27T11:15"
};
/** Other U12 South results from FA Full-Time (not Bulls games). */
var SOUTH_OTHER_RESULTS = [
	{
		kickoff: "2026-09-06T09:00",
		homeTeam: "Daisy Hill Junior U12 Devils",
		awayTeam: "Cherrybrook U12 cobras",
		homeGoals: 3,
		awayGoals: 0
	},
	{
		kickoff: "2026-09-06T10:00",
		homeTeam: "Golborne Sports Junior U12 Gladiators",
		awayTeam: "Ladybridge U12 Dynamos",
		homeGoals: 5,
		awayGoals: 2
	},
	{
		kickoff: "2026-09-06T10:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: "Standish Panthers Juniors U12 Storm",
		homeGoals: 5,
		awayGoals: 2
	},
	{
		kickoff: "2026-09-06T10:00",
		homeTeam: "Newton-Le-Willows U12 Rangers",
		awayTeam: "Robin Park U12 Raptors",
		homeGoals: 5,
		awayGoals: 1
	}
];
var SOUTH_DIVISION_FIXTURES = [
	{
		kickoff: "2026-09-06T09:00",
		homeTeam: "Daisy Hill Junior U12 Devils",
		awayTeam: "Cherrybrook U12 cobras",
		homeGoals: 3,
		awayGoals: 0,
		venue: "Daisy Hill Juniors FC",
		status: ""
	},
	{
		kickoff: "2026-09-06T10:00",
		homeTeam: "Golborne Sports Junior U12 Gladiators",
		awayTeam: "Ladybridge U12 Dynamos",
		homeGoals: 5,
		awayGoals: 2,
		venue: "William Fosters Pitch 2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-09-06T10:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: "Standish Panthers Juniors U12 Storm",
		homeGoals: 5,
		awayGoals: 2,
		venue: "The Oaks (Risley)",
		status: ""
	},
	{
		kickoff: "2026-09-06T10:00",
		homeTeam: "Newton-Le-Willows U12 Rangers",
		awayTeam: "Robin Park U12 Raptors",
		homeGoals: 5,
		awayGoals: 1,
		venue: "King George V Playing Fields (Newton-le-Willows)",
		status: ""
	},
	{
		kickoff: "2026-09-06T11:00",
		homeTeam: "Pine Villa U12 s",
		awayTeam: BULLS_TEAM,
		homeGoals: 7,
		awayGoals: 6,
		venue: "Albany Academy",
		status: ""
	},
	{
		kickoff: "2026-09-13T09:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: "Pine Villa U12 s",
		homeGoals: null,
		awayGoals: null,
		venue: "The Oaks (Risley)",
		status: ""
	},
	{
		kickoff: "2026-09-13T09:00",
		homeTeam: "Newton-Le-Willows U12 Rangers",
		awayTeam: "Ladybridge U12 Dynamos",
		homeGoals: null,
		awayGoals: null,
		venue: "Ladybridge Lane",
		status: ""
	},
	{
		kickoff: "2026-09-13T10:00",
		homeTeam: "Cherrybrook U12 cobras",
		awayTeam: "Standish Panthers Juniors U12 Storm",
		homeGoals: null,
		awayGoals: null,
		venue: "Laithwaite Park Hub P2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-09-13T10:15",
		homeTeam: "Robin Park U12 Raptors",
		awayTeam: "Daisy Hill Junior U12 Devils",
		homeGoals: null,
		awayGoals: null,
		venue: "William Fosters Pitch 2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-09-20T09:00",
		homeTeam: "Daisy Hill Junior U12 Devils",
		awayTeam: "Ladybridge U12 Dynamos",
		homeGoals: null,
		awayGoals: null,
		venue: "Daisy Hill Juniors FC",
		status: ""
	},
	{
		kickoff: "2026-09-20T09:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: "Cherrybrook U12 cobras",
		homeGoals: null,
		awayGoals: null,
		venue: "The Oaks (Risley)",
		status: ""
	},
	{
		kickoff: "2026-09-20T09:00",
		homeTeam: "Newton-Le-Willows U12 Rangers",
		awayTeam: BULLS_TEAM,
		homeGoals: null,
		awayGoals: null,
		venue: "King George V Playing Fields (Newton-le-Willows)",
		status: ""
	},
	{
		kickoff: "2026-09-20T11:15",
		homeTeam: "Standish Panthers Juniors U12 Storm",
		awayTeam: "Robin Park U12 Raptors",
		homeGoals: null,
		awayGoals: null,
		venue: "Laithwaite Park Hub P2 (3) 9v9",
		status: "postponed"
	},
	{
		kickoff: "2026-09-20T11:30",
		homeTeam: "Golborne Sports Junior U12 Gladiators",
		awayTeam: "Pine Villa U12 s",
		homeGoals: null,
		awayGoals: null,
		venue: "William Fosters Pitch 2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-09-27T09:00",
		homeTeam: "Ladybridge U12 Dynamos",
		awayTeam: "Standish Panthers Juniors U12 Storm",
		homeGoals: null,
		awayGoals: null,
		venue: "Ladybridge Lane",
		status: ""
	},
	{
		kickoff: "2026-09-27T09:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: "Golborne Sports Junior U12 Gladiators",
		homeGoals: null,
		awayGoals: null,
		venue: "The Oaks (Risley)",
		status: ""
	},
	{
		kickoff: "2026-09-27T09:00",
		homeTeam: "Pine Villa U12 s",
		awayTeam: "Newton-Le-Willows U12 Rangers",
		homeGoals: null,
		awayGoals: null,
		venue: "Albany Academy",
		status: ""
	},
	{
		kickoff: "2026-09-27T10:15",
		homeTeam: "Robin Park U12 Raptors",
		awayTeam: "Cherrybrook U12 cobras",
		homeGoals: null,
		awayGoals: null,
		venue: "William Fosters Pitch 2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-09-27T11:15",
		homeTeam: BULLS_TEAM,
		awayTeam: "Daisy Hill Junior U12 Devils",
		homeGoals: 1,
		awayGoals: 3,
		venue: "Laithwaite Park Hub P2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-10-04T09:00",
		homeTeam: "Daisy Hill Junior U12 Devils",
		awayTeam: "Pine Villa U12 s",
		homeGoals: null,
		awayGoals: null,
		venue: "Daisy Hill Juniors FC",
		status: ""
	},
	{
		kickoff: "2026-10-04T09:00",
		homeTeam: "Newton-Le-Willows U12 Rangers",
		awayTeam: "Golborne Sports Junior U12 Gladiators",
		homeGoals: null,
		awayGoals: null,
		venue: "King George V Playing Fields (Newton-le-Willows)",
		status: ""
	},
	{
		kickoff: "2026-10-04T10:00",
		homeTeam: "Cherrybrook U12 cobras",
		awayTeam: "Ladybridge U12 Dynamos",
		homeGoals: null,
		awayGoals: null,
		venue: "Laithwaite Park Hub P2 (2) 9v9",
		status: ""
	},
	{
		kickoff: "2026-10-04T10:15",
		homeTeam: "Robin Park U12 Raptors",
		awayTeam: "Matthiola U12 Atletico (Sun)",
		homeGoals: null,
		awayGoals: null,
		venue: "William Fosters Pitch 2 (3) 9v9",
		status: ""
	},
	{
		kickoff: "2026-10-04T11:15",
		homeTeam: "Standish Panthers Juniors U12 Storm",
		awayTeam: BULLS_TEAM,
		homeGoals: null,
		awayGoals: null,
		venue: "Laithwaite Park Hub P2 (2) 9v9",
		status: ""
	},
	{
		kickoff: "2026-10-11T09:00",
		homeTeam: "Ladybridge U12 Dynamos",
		awayTeam: "Robin Park U12 Raptors",
		homeGoals: null,
		awayGoals: null,
		venue: "Ladybridge Lane",
		status: ""
	},
	{
		kickoff: "2026-10-11T09:00",
		homeTeam: "Matthiola U12 Atletico (Sun)",
		awayTeam: "Newton-Le-Willows U12 Rangers",
		homeGoals: null,
		awayGoals: null,
		venue: "The Oaks (Risley)",
		status: ""
	},
	{
		kickoff: "2026-10-11T09:00",
		homeTeam: "Pine Villa U12 s",
		awayTeam: "Standish Panthers Juniors U12 Storm",
		homeGoals: null,
		awayGoals: null,
		venue: "Albany Academy",
		status: ""
	},
	{
		kickoff: "2026-10-11T10:00",
		homeTeam: BULLS_TEAM,
		awayTeam: "Cherrybrook U12 cobras",
		homeGoals: null,
		awayGoals: null,
		venue: "Laithwaite Park Hub P2 (2) 9v9",
		status: ""
	}
];
/** FA Full-Time U12 tables after Sunday 27 Sep 2026. Daisy Hill vs Bulls was not on the sheet. */
var OPENING_WEEKEND_TABLES = {
	north: [
		{
			team: "Golborne Sports Junior U12 Spartans",
			played: 3,
			won: 3,
			drawn: 0,
			lost: 0,
			gd: 15,
			pts: 9
		},
		{
			team: "Cherrybrook U12 madrid",
			played: 2,
			won: 2,
			drawn: 0,
			lost: 0,
			gd: 9,
			pts: 6
		},
		{
			team: "Robin Park U12 Rangers",
			played: 3,
			won: 2,
			drawn: 0,
			lost: 1,
			gd: 3,
			pts: 6
		},
		{
			team: "Whittle Hall U12 Titans (Sunday)",
			played: 4,
			won: 2,
			drawn: 0,
			lost: 2,
			gd: 2,
			pts: 6
		},
		{
			team: "Cherrybrook U12 warriors",
			played: 4,
			won: 2,
			drawn: 0,
			lost: 2,
			gd: -2,
			pts: 6
		},
		{
			team: "FS Coaching Academy U12 FS Academy",
			played: 3,
			won: 1,
			drawn: 0,
			lost: 2,
			gd: -4,
			pts: 3
		},
		{
			team: "Penlake U12 Rangers {Sunday}",
			played: 3,
			won: 1,
			drawn: 0,
			lost: 2,
			gd: -7,
			pts: 3
		},
		{
			team: "Ladybridge U12 Lions",
			played: 4,
			won: 0,
			drawn: 0,
			lost: 4,
			gd: -16,
			pts: 0
		}
	],
	south: [
		{
			team: "Newton-Le-Willows U12 Rangers",
			played: 4,
			won: 3,
			drawn: 1,
			lost: 0,
			gd: 14,
			pts: 10
		},
		{
			team: "Daisy Hill Junior U12 Devils",
			played: 3,
			won: 3,
			drawn: 0,
			lost: 0,
			gd: 9,
			pts: 9
		},
		{
			team: "Golborne Sports Junior U12 Gladiators",
			played: 3,
			won: 3,
			drawn: 0,
			lost: 0,
			gd: 6,
			pts: 9
		},
		{
			team: "Cherrybrook U12 cobras",
			played: 3,
			won: 2,
			drawn: 0,
			lost: 1,
			gd: 0,
			pts: 6
		},
		{
			team: "Matthiola U12 Atletico (Sun)",
			played: 4,
			won: 2,
			drawn: 0,
			lost: 2,
			gd: 6,
			pts: 6
		},
		{
			team: "Pine Villa U12 s",
			played: 4,
			won: 1,
			drawn: 1,
			lost: 2,
			gd: -7,
			pts: 4
		},
		{
			team: "Standish Panthers Juniors U12 Storm",
			played: 2,
			won: 0,
			drawn: 0,
			lost: 2,
			gd: -4,
			pts: 0
		},
		{
			team: "Cherrybrook U12 Bulls",
			played: 2,
			won: 0,
			drawn: 0,
			lost: 2,
			gd: -5,
			pts: 0
		},
		{
			team: "Robin Park U12 Raptors",
			played: 2,
			won: 0,
			drawn: 0,
			lost: 2,
			gd: -7,
			pts: 0
		},
		{
			team: "Ladybridge U12 Dynamos",
			played: 3,
			won: 0,
			drawn: 0,
			lost: 3,
			gd: -12,
			pts: 0
		}
	],
	west: [
		{
			team: "F.C. Britannia (Wigan) U12 Blue",
			played: 4,
			won: 4,
			drawn: 0,
			lost: 0,
			gd: 14,
			pts: 12
		},
		{
			team: "Bolton Lads & Girls Club U12 BLGC Lions",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 13,
			pts: 9
		},
		{
			team: "Cherrybrook U12 Knights",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 5,
			pts: 9
		},
		{
			team: "Cherrybrook U12 raiders",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 5,
			pts: 9
		},
		{
			team: "Cherrybrook U12 hurricanes",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 4,
			pts: 9
		},
		{
			team: "Winwick Spartans U12 Sharks",
			played: 2,
			won: 1,
			drawn: 0,
			lost: 1,
			gd: -1,
			pts: 3
		},
		{
			team: "F.C. Britannia (Wigan) U12 Yellow",
			played: 3,
			won: 1,
			drawn: 0,
			lost: 2,
			gd: -4,
			pts: 3
		},
		{
			team: "F.C. Britannia (Wigan) U12 Whites",
			played: 3,
			won: 0,
			drawn: 0,
			lost: 3,
			gd: -7,
			pts: 0
		},
		{
			team: "Appley Bridge U12",
			played: 4,
			won: 0,
			drawn: 0,
			lost: 4,
			gd: -13,
			pts: 0
		},
		{
			team: "Standish Panthers Juniors U12 Lightning",
			played: 4,
			won: 0,
			drawn: 0,
			lost: 4,
			gd: -16,
			pts: 0
		}
	],
	east: [
		{
			team: "Cherrybrook U12 hornets",
			played: 4,
			won: 3,
			drawn: 1,
			lost: 0,
			gd: 16,
			pts: 10
		},
		{
			team: "Hindley Juniors U12 Falcons",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 8,
			pts: 9
		},
		{
			team: "Cherrybrook U12 eagles",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 4,
			pts: 9
		},
		{
			team: "Highfield Grange U12 's Rangers",
			played: 4,
			won: 3,
			drawn: 0,
			lost: 1,
			gd: 2,
			pts: 9
		},
		{
			team: "Hawkley U12 Hawkley",
			played: 4,
			won: 1,
			drawn: 1,
			lost: 2,
			gd: 4,
			pts: 4
		},
		{
			team: "Shevington U12 Royals",
			played: 4,
			won: 1,
			drawn: 0,
			lost: 3,
			gd: -5,
			pts: 3
		},
		{
			team: "Daisy Hill Junior U12 Titans",
			played: 4,
			won: 1,
			drawn: 0,
			lost: 3,
			gd: -7,
			pts: 3
		},
		{
			team: "Golborne Sports Junior U12 Vikings",
			played: 4,
			won: 0,
			drawn: 0,
			lost: 4,
			gd: -22,
			pts: 0
		}
	]
};
function shortClub(name) {
	return name.replace(/ U12 s$/, "").replace(/ U12$/, "").replace("Cherrybrook U12 ", "").replace(/ U12 /g, " ").replace("Junior ", "").replace("Juniors ", "").trim();
}
function emptyStanding(team) {
	return {
		team,
		played: 0,
		won: 0,
		drawn: 0,
		lost: 0,
		gf: 0,
		ga: 0,
		gd: 0,
		pts: 0
	};
}
function sortStandings(rows) {
	return rows.slice().sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.localeCompare(b.team));
}
function fixtureKickoff(iso) {
	const raw = iso.length === 16 ? `${iso}:00` : iso;
	const d = parseISO(raw);
	return Number.isNaN(d.getTime()) ? /* @__PURE__ */ new Date(0) : d;
}
function computeStandings(fixtures) {
	const byTeam = /* @__PURE__ */ new Map();
	for (const team of DIVISION_TEAMS) byTeam.set(team, emptyStanding(team));
	for (const fx of fixtures) {
		if (fx.homeGoals === null || fx.awayGoals === null) continue;
		if (fixtureKickoff(fx.kickoff) > /* @__PURE__ */ new Date()) continue;
		const home = byTeam.get(fx.homeTeam) ?? emptyStanding(fx.homeTeam);
		const away = byTeam.get(fx.awayTeam) ?? emptyStanding(fx.awayTeam);
		home.played += 1;
		away.played += 1;
		home.gf += fx.homeGoals;
		home.ga += fx.awayGoals;
		away.gf += fx.awayGoals;
		away.ga += fx.homeGoals;
		if (fx.homeGoals > fx.awayGoals) {
			home.won += 1;
			home.pts += 3;
			away.lost += 1;
		} else if (fx.homeGoals < fx.awayGoals) {
			away.won += 1;
			away.pts += 3;
			home.lost += 1;
		} else {
			home.drawn += 1;
			away.drawn += 1;
			home.pts += 1;
			away.pts += 1;
		}
		home.gd = home.gf - home.ga;
		away.gd = away.gf - away.ga;
		byTeam.set(fx.homeTeam, home);
		byTeam.set(fx.awayTeam, away);
	}
	return sortStandings([...byTeam.values()]);
}
function standingFromRow(row) {
	return {
		team: row.team,
		played: row.played,
		won: row.won,
		drawn: row.drawn,
		lost: row.lost,
		gf: 0,
		ga: 0,
		gd: row.gd,
		pts: row.pts
	};
}
function southTable(fixtures) {
	const extras = SOUTH_OTHER_RESULTS.map((r, i) => ({
		id: -100 - i,
		kickoff: r.kickoff,
		homeTeam: r.homeTeam,
		awayTeam: r.awayTeam,
		venue: "",
		homeGoals: r.homeGoals,
		awayGoals: r.awayGoals,
		status: ""
	}));
	return computeStandings([...fixtures, ...extras]);
}
function weekendSnapshotTables() {
	return {
		south: OPENING_WEEKEND_TABLES.south.map(standingFromRow),
		north: OPENING_WEEKEND_TABLES.north.map(standingFromRow),
		west: OPENING_WEEKEND_TABLES.west.map(standingFromRow),
		east: OPENING_WEEKEND_TABLES.east.map(standingFromRow)
	};
}
function isBullsHome(fx) {
	return fx.homeTeam === BULLS_TEAM;
}
function bullsOpponent(fx) {
	return fx.homeTeam === "Cherrybrook U12 Bulls" ? fx.awayTeam : fx.homeTeam;
}
function isBullsGame(fx) {
	return fx.homeTeam === "Cherrybrook U12 Bulls" || fx.awayTeam === "Cherrybrook U12 Bulls";
}
function fixtureHasScore(fx) {
	return fx.homeGoals != null && fx.awayGoals != null;
}
/** Kicked off, or a score is already in. */
function fixturePlayed(fx, now = /* @__PURE__ */ new Date()) {
	if (fx.homeGoals != null && fx.awayGoals != null) return true;
	const ko = fixtureKickoff(fx.kickoff);
	return ko.getTime() > 0 && ko.getTime() <= now.getTime();
}
function teamsMatch(a, b) {
	const na = a.toLowerCase().replace(/[{}'"]/g, "").replace(/\s+/g, " ").trim();
	const nb = b.toLowerCase().replace(/[{}'"]/g, "").replace(/\s+/g, " ").trim();
	if (!na || !nb) return false;
	return na === nb || na.includes(nb) || nb.includes(na);
}
function formatGoalLine(goal, nameOf = (s) => s) {
	const scorer = nameOf(goal.scorer);
	const body = goal.assist ? `${scorer} · ${nameOf(goal.assist)}` : scorer;
	if (!goal.minute) return body;
	return `${goal.minute}' ${body}`;
}
function fixtureKey(fx) {
	return `${fx.kickoff}|${bullsOpponent(fx)}`;
}
function bullsGames(fixtures) {
	return fixtures.filter(isBullsGame).slice().sort((a, b) => fixtureKickoff(a.kickoff).getTime() - fixtureKickoff(b.kickoff).getTime());
}
function voteFixture(fixtures, now = /* @__PURE__ */ new Date()) {
	const games = bullsGames(fixtures);
	return [...games].reverse().find((fx) => fixtureKickoff(fx.kickoff) <= now) ?? games.find((fx) => fixtureKickoff(fx.kickoff) > now) ?? games[games.length - 1] ?? null;
}
/** Last game that has kicked off. Board and vote bars stay on this until the next kickoff. */
function resultFixture(fixtures, now = /* @__PURE__ */ new Date()) {
	const games = bullsGames(fixtures);
	return [...games].reverse().find((fx) => fixtureKickoff(fx.kickoff) <= now) ?? games[0] ?? null;
}
function endOfLocalDay(d) {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}
/** Pitch tab only: stay on today's game, then open the next fixture for planning. */
function planFixture(fixtures, now = /* @__PURE__ */ new Date()) {
	const games = fixtures.slice().sort((a, b) => fixtureKickoff(a.kickoff).getTime() - fixtureKickoff(b.kickoff).getTime());
	if (!games.length) return null;
	return games.find((fx) => {
		const ko = fixtureKickoff(fx.kickoff);
		const matchDay = now.getTime() <= endOfLocalDay(ko).getTime();
		if (fx.homeGoals != null && fx.awayGoals != null && !matchDay) return false;
		return matchDay || ko.getTime() > now.getTime();
	}) ?? games[games.length - 1] ?? null;
}
function bullsRoundList(fixtures = BULLS_FIXTURES) {
	return (fixtures.length ? fixtures : [...BULLS_FIXTURES]).filter((fx) => fx.homeTeam === "Cherrybrook U12 Bulls" || fx.awayTeam === "Cherrybrook U12 Bulls").slice().sort((a, b) => fixtureKickoff(a.kickoff).getTime() - fixtureKickoff(b.kickoff).getTime()).map((fx, i) => {
		let homeGoals = typeof fx.homeGoals === "number" ? fx.homeGoals : null;
		let awayGoals = typeof fx.awayGoals === "number" ? fx.awayGoals : null;
		if (homeGoals == null && awayGoals == null && fx.homeTeam === NEWTON_RANGERS_RESULT.homeTeam && fx.awayTeam === NEWTON_RANGERS_RESULT.awayTeam) {
			homeGoals = NEWTON_RANGERS_RESULT.homeGoals;
			awayGoals = NEWTON_RANGERS_RESULT.awayGoals;
		}
		if (homeGoals == null && awayGoals == null && fx.homeTeam === DAISY_HILL_RESULT.homeTeam && fx.awayTeam === DAISY_HILL_RESULT.awayTeam && fx.kickoff.startsWith("2026-09-27")) {
			homeGoals = DAISY_HILL_RESULT.homeGoals;
			awayGoals = DAISY_HILL_RESULT.awayGoals;
		}
		const home = fx.homeTeam === BULLS_TEAM;
		return {
			key: fixtureKey(fx),
			round: i + 1,
			gameNumber: `Rd ${i + 1}`,
			opposition: shortClub(bullsOpponent(fx)),
			kickoff: fx.kickoff,
			venue: fx.venue,
			home,
			us: home ? homeGoals : awayGoals,
			them: home ? awayGoals : homeGoals
		};
	});
}
function fixtureRound(fixtures, fx) {
	const i = bullsGames(fixtures).findIndex((g) => g.kickoff === fx.kickoff && g.homeTeam === fx.homeTeam && g.awayTeam === fx.awayTeam);
	return i >= 0 ? i + 1 : 0;
}
//#endregion
export { shortClub as C, voteFixture as D, teamsMatch as E, weekendSnapshotTables as O, resultFixture as S, southTable as T, fixturePlayed as _, NEWTON_RANGERS_RESULT as a, isBullsHome as b, SOUTH_DIVISION_FIXTURES as c, bullsOpponent as d, bullsRoundList as f, fixtureKickoff as g, fixtureKey as h, LEAGUE_NAME as i, SOUTH_OTHER_RESULTS as l, fixtureHasScore as m, BULLS_TEAM as n, PINE_VILLA_OPENER as o, emptyStanding as p, DAISY_HILL_RESULT as r, SEASON_NAME as s, BULLS_FIXTURES as t, U12_DIVISIONS as u, fixtureRound as v, sortStandings as w, planFixture as x, formatGoalLine as y };
