import {
  emptyStanding,
  PINE_VILLA_OPENER,
  sortStandings,
  type DivisionId,
  type Standing,
  U12_DIVISIONS,
  weekendSnapshotTables,
} from "./wdyl.ts";

export const FA_LEAGUE = "454046382";
export const FA_SEASON = "685261564";
export const FA_BULLS_TEAM_ID = "996254211";

/** This module only reads WDYL U12 2026/27. Other age groups are never applied. */
const OTHER_AGE_RE = /\bU(?:9|10|11|1[3-8])\b/i;
const U12_COMPASS_RE = /\bU12\s+(North|South|East|West)\b/i;
const SEASON_START_MS = Date.parse("2026-09-01T00:00:00+01:00");

export const FA_DIVISION_PAGES: Record<
  DivisionId,
  {
    division: string;
    group: string;
    heading: string;
    fingerprint: string[];
    forbidden?: string[];
  }
> = {
  north: {
    division: "983817231",
    group: "1_77366558",
    heading: "U12 North",
    fingerprint: ["Cherrybrook U12 warriors", "Cherrybrook U12 madrid"],
  },
  south: {
    division: "112552333",
    group: "1_400875720",
    heading: "U12 South",
    fingerprint: ["Cherrybrook U12 Bulls", "Cherrybrook U12 cobras"],
  },
  east: {
    division: "739844699",
    group: "1_357400182",
    heading: "U12 East",
    fingerprint: ["Cherrybrook U12 eagles", "Cherrybrook U12 hornets"],
  },
  west: {
    division: "995748455",
    group: "1_621284961",
    heading: "U12 West",
    fingerprint: ["Cherrybrook U12 Knights", "Cherrybrook U12 raiders"],
    forbidden: ["Ladybridge U12 Leopards", "Pine Villa U12 Tangerine"],
  },
};

export type FaScore = {
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
};

export type FaFixture = {
  kickoff: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  postponed: boolean;
  homeGoals: number | null;
  awayGoals: number | null;
};

function faPublicQuery(page: { division: string }): URLSearchParams {
  return new URLSearchParams({
    league: FA_LEAGUE,
    selectedSeason: FA_SEASON,
    selectedFixtureGroupAgeGroup: "0",
    selectedDivision: page.division,
    selectedCompetition: "0",
  });
}

function faQuery(page: { division: string; group: string }): URLSearchParams {
  const params = faPublicQuery(page);
  if (page.group && page.group !== "0") {
    params.set("selectedFixtureGroupKey", page.group);
  }
  return params;
}

export function faTableUrl(page: { division: string; group: string }): string {
  return `https://fulltime.thefa.com/index.html?${faQuery(page).toString()}`;
}

export function faDivisionTableUrl(id: DivisionId): string {
  return `https://fulltime.thefa.com/index.html?${faPublicQuery(FA_DIVISION_PAGES[id]).toString()}`;
}

export function faLeagueHomeUrl(): string {
  return `https://fulltime.thefa.com/index.html?league=${FA_LEAGUE}&selectedSeason=${FA_SEASON}`;
}

export function faResultsUrl(page: { division: string; group: string }): string {
  return `https://fulltime.thefa.com/results.html?${faQuery(page).toString()}`;
}

export function faFixturesUrl(page: { division: string; group: string }): string {
  return `https://fulltime.thefa.com/fixtures.html?${faQuery(page).toString()}`;
}

export function faBullsTeamUrl(): string {
  return `https://fulltime.thefa.com/displayTeam.html?id=${FA_BULLS_TEAM_ID}`;
}

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function toInt(value: string): number {
  const n = Number(String(value).replace(/^\+/, ""));
  return Number.isFinite(n) ? n : 0;
}

function looksLikeTeam(cell: string): boolean {
  if (cell.length < 4 || cell.length > 90) return false;
  if (/^\d+$/.test(cell)) return false;
  if (/^(pos|team|p|w|d|l|gd|pts|gf|ga|pld|type|home|away|venue)$/i.test(cell)) return false;
  if (/^\d{2}\/\d{2}/.test(cell)) return false;
  return /[a-z]/i.test(cell);
}

export function parseFaStandings(html: string): Standing[] {
  const rows: Standing[] = [];
  const trs = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
  for (const tr of trs) {
    const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((m) =>
      stripTags(m[1]),
    );
    if (cells.length < 5) continue;
    const teamIdx = cells.findIndex(looksLikeTeam);
    if (teamIdx < 0) continue;
    const nums = cells.slice(teamIdx + 1).filter((c) => /^-?\+?\d+$/.test(c));
    if (nums.length < 3) continue;
    const team = cells[teamIdx];
    const played = toInt(nums[0]);
    const pts = toInt(nums[nums.length - 1]);
    const gd = nums.length >= 2 ? toInt(nums[nums.length - 2]) : 0;
    const won = nums.length >= 6 ? toInt(nums[1]) : 0;
    const drawn = nums.length >= 6 ? toInt(nums[2]) : 0;
    const lost = nums.length >= 6 ? toInt(nums[3]) : 0;
    rows.push({
      team,
      played,
      won,
      drawn,
      lost,
      gf: 0,
      ga: 0,
      gd,
      pts,
    });
  }
  const byTeam = new Map<string, Standing>();
  for (const row of rows) {
    if (!byTeam.has(row.team)) byTeam.set(row.team, row);
  }
  return sortStandings([...byTeam.values()]);
}

const SCORE_CELL = /^(\d+)\s*[-–]\s*(\d+)(?:\s*\(.*\))?$/;

export function parseFaResults(html: string): FaScore[] {
  const out: FaScore[] = [];
  const trs = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
  for (const tr of trs) {
    const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map((m) => stripTags(m[1]))
      .filter(Boolean);
    const scoreIdx = cells.findIndex((c) => SCORE_CELL.test(c));
    if (scoreIdx < 1 || scoreIdx >= cells.length - 1) continue;
    const m = cells[scoreIdx].match(SCORE_CELL);
    if (!m) continue;
    const home = cells[scoreIdx - 1];
    const away = cells[scoreIdx + 1];
    if (!looksLikeTeam(home) || !looksLikeTeam(away)) continue;
    out.push({
      homeTeam: home,
      awayTeam: away,
      homeGoals: toInt(m[1]),
      awayGoals: toInt(m[2]),
    });
  }
  const seen = new Set<string>();
  return out.filter((row) => {
    const key = `${row.homeTeam}|${row.awayTeam}|${row.homeGoals}-${row.awayGoals}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const DATE_CELL = /(\d{2})\/(\d{2})\/(\d{2,4})/;
const TIME_CELL = /(\d{1,2}):(\d{2})/;

export function parseFaDateTime(text: string): string | null {
  const d = text.match(DATE_CELL);
  if (!d) return null;
  let year = Number(d[3]);
  if (year < 100) year += 2000;
  const t = text.match(TIME_CELL);
  const hh = t ? String(t[1]).padStart(2, "0") : "00";
  const mm = t ? t[2] : "00";
  return `${year}-${d[2]}-${d[1]}T${hh}:${mm}`;
}

function looksLikeVenue(cell: string): boolean {
  if (cell.length < 4 || cell.length > 120) return false;
  if (/^\d+$/.test(cell)) return false;
  if (SCORE_CELL.test(cell) || /^vs$/i.test(cell)) return false;
  if (DATE_CELL.test(cell) && cell.length < 18) return false;
  if (/^(home|away|type|status|venue|competition|division|league|u12 south|u12 north|u12 west|u12 east|postponed|played|void)$/i.test(cell)) {
    return false;
  }
  if (/\bU12\b/i.test(cell) && /cherrybrook|rangers|villa|gladiators|devils|cobras|storm|raptors|dynamos|matthiola|newton|hawkley|hindley|hornets|eagles|knights|raiders|hurricanes/i.test(cell)) {
    return false;
  }
  return /[a-z]/i.test(cell);
}

export function parseFaFixtures(html: string): FaFixture[] {
  const out: FaFixture[] = [];
  const trs = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? [];
  for (const tr of trs) {
    const cells = [...tr.matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map((m) => stripTags(m[1]))
      .filter(Boolean);
    const blob = cells.join(" ");
    const kickoff = parseFaDateTime(blob);
    if (!kickoff) continue;
    const postponed = /postponed/i.test(blob);
    const scoreIdx = cells.findIndex((c) => SCORE_CELL.test(c));
    let home = "";
    let away = "";
    let homeGoals: number | null = null;
    let awayGoals: number | null = null;
    if (scoreIdx > 0 && scoreIdx < cells.length - 1) {
      home = cells[scoreIdx - 1];
      away = cells[scoreIdx + 1];
      const m = cells[scoreIdx].match(SCORE_CELL);
      if (m) {
        homeGoals = toInt(m[1]);
        awayGoals = toInt(m[2]);
      }
    } else {
      const vsIdx = cells.findIndex((c) => /^vs$/i.test(c));
      const teams = cells.filter(looksLikeTeam);
      if (vsIdx > 0 && vsIdx < cells.length - 1) {
        home = cells[vsIdx - 1];
        away = cells[vsIdx + 1];
      } else if (teams.length >= 2) {
        home = teams[0];
        away = teams[1];
      }
    }
    if (!looksLikeTeam(home) || !looksLikeTeam(away)) continue;
    if (!isU12Name(home) || !isU12Name(away)) continue;
    const venue =
      cells.find((c, i) => {
        if (c === home || c === away) return false;
        if (i === scoreIdx) return false;
        return looksLikeVenue(c);
      }) ?? "";
    out.push({
      kickoff,
      homeTeam: home,
      awayTeam: away,
      venue,
      postponed,
      homeGoals,
      awayGoals,
    });
  }
  const seen = new Set<string>();
  return out.filter((row) => {
    const key = `${row.kickoff}|${row.homeTeam}|${row.awayTeam}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function hasFingerprint(rows: Standing[], fingerprints: string[]): boolean {
  const blob = rows.map((r) => r.team.toLowerCase()).join(" | ");
  return fingerprints.every((fp) => blob.includes(fp.toLowerCase()));
}

function teamKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function hasKnownTeams(rows: Standing[], known: string[], min = 3): boolean {
  if (!known.length) return false;
  let n = 0;
  for (const k of known) {
    const needle = teamKey(k);
    if (rows.some((r) => {
      const have = teamKey(r.team);
      return have === needle || have.includes(needle) || needle.includes(have);
    })) n += 1;
  }
  return n >= Math.min(min, known.length);
}

export function parseFaDivisionPages(
  html: string,
): Partial<Record<DivisionId, { division: string; group: string }>> {
  const found: Partial<Record<DivisionId, { division: string; group: string }>> = {};
  const optionRe =
    /<option[^>]*value=["'](\d+)["'][^>]*>\s*U12\s+(North|South|East|West)\b/gi;
  for (const m of html.matchAll(optionRe)) {
    const id = m[2].toLowerCase() as DivisionId;
    found[id] = { division: m[1], group: found[id]?.group || "0" };
  }
  const labeled =
    /U12\s+(North|South|East|West)[\s\S]{0,500}?selectedDivision=(\d+)[^"'<\s]*selectedFixtureGroupKey=(1_\d+)/gi;
  for (const m of html.matchAll(labeled)) {
    const id = m[1].toLowerCase() as DivisionId;
    found[id] = { division: m[2], group: m[3] };
  }
  const labeledFlip =
    /selectedDivision=(\d+)[^"'<\s]*selectedFixtureGroupKey=(1_\d+)[\s\S]{0,500}?U12\s+(North|South|East|West)/gi;
  for (const m of html.matchAll(labeledFlip)) {
    const id = m[3].toLowerCase() as DivisionId;
    if (!found[id] || found[id]?.group === "0") found[id] = { division: m[1], group: m[2] };
  }
  return found;
}

function hasForbidden(rows: Standing[], forbidden: string[]): boolean {
  const blob = rows.map((r) => r.team.toLowerCase()).join(" | ");
  return forbidden.some((name) => blob.includes(name.toLowerCase()));
}

export function extractAgeHeading(html: string): string | null {
  const chunks = [
    ...(html.match(/<h1[\s\S]*?<\/h1>/gi) ?? []),
    ...(html.match(/<h2[\s\S]*?<\/h2>/gi) ?? []),
    ...(html.match(/<title[\s\S]*?<\/title>/gi) ?? []),
    ...(html.match(/<option[^>]*selected[^>]*>[\s\S]*?<\/option>/gi) ?? []),
  ];
  for (const chunk of chunks) {
    const text = stripTags(chunk);
    const compass = text.match(U12_COMPASS_RE) ?? text.match(/\bU1[3-8]\s+(North|South|East|West)\b/i);
    if (compass) return compass[0];
    const other = text.match(/\bU(?:9|10|11|1[3-8])\b/i);
    if (other && /division|league|table|north|south|east|west/i.test(text)) return text.slice(0, 80);
  }
  const all = stripTags(html.slice(0, 12000));
  const fallback = all.match(U12_COMPASS_RE) ?? all.match(/\bU1[3-8]\s+(North|South|East|West)\b/i);
  return fallback ? fallback[0] : null;
}

function tooManyGamesForThisStage(rows: Standing[]): boolean {
  const maxPlayed = Math.max(0, ...rows.map((r) => r.played));
  const weeks = Math.max(0, (Date.now() - SEASON_START_MS) / (7 * 86400000));
  const cap = Math.max(2, Math.ceil(weeks) + 3);
  return maxPlayed > cap;
}

export function isU12Name(name: string): boolean {
  if (OTHER_AGE_RE.test(name)) return false;
  return /\bU12\b/i.test(name) || /under[-\s]?12/i.test(name);
}

export function isU12Score(row: FaScore): boolean {
  return isU12Name(row.homeTeam) && isU12Name(row.awayTeam);
}

/** Null means the page is a live U12 2026/27 table for `id`. Otherwise a skip reason. */
export function u12PageReject(html: string, rows: Standing[], id: DivisionId): string | null {
  const page = FA_DIVISION_PAGES[id];
  const heading = extractAgeHeading(html);
  if (heading) {
    if (OTHER_AGE_RE.test(heading)) {
      return `${id}: Full-Time was ${heading}, not U12`;
    }
    if (!new RegExp(`U12\\s+${id}`, "i").test(heading)) {
      return `${id}: Full-Time heading was ${heading}, not ${page.heading}`;
    }
  }
  if (rows.some((r) => OTHER_AGE_RE.test(r.team))) {
    return `${id}: table included a non-U12 team`;
  }
  const u12Count = rows.filter((r) => isU12Name(r.team)).length;
  if (rows.length && u12Count < Math.ceil(rows.length * 0.5)) {
    return `${id}: team names were not U12`;
  }
  if (page.forbidden?.length && hasForbidden(rows, page.forbidden)) {
    return `${id}: Full-Time page was last season`;
  }
  if (tooManyGamesForThisStage(rows)) {
    return `${id}: Full-Time table still looks like last season`;
  }
  if (!hasFingerprint(rows, page.fingerprint)) {
    const known = U12_DIVISIONS.find((d) => d.id === id)?.teams ?? [];
    if (!hasKnownTeams(rows, known)) {
      return `${id}: Full-Time page was the wrong U12 division`;
    }
  }
  return null;
}

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    throw new Error(`FA Full-Time returned ${res.status}`);
  }
  const html = await res.text();
  if (/attention required|cloudflare|cf-challenge/i.test(html) && html.length < 20000) {
    throw new Error("FA Full-Time blocked the request.");
  }
  return html;
}

export type FaSyncResult = {
  ok: boolean;
  error?: string;
  tables: Partial<Record<DivisionId, Standing[]>>;
};

export type FaLeaguePull = {
  ok: boolean;
  source: "fa" | "saved" | "mixed";
  tables: Record<DivisionId, Standing[]>;
  fromFa: DivisionId[];
  bullsScores: FaScore[];
  fixtures: FaFixture[];
  allScores: FaScore[];
  notes: string[];
};

export async function pullFaTables(): Promise<FaSyncResult> {
  const pulled = await pullFaLeague();
  return {
    ok: pulled.fromFa.length > 0,
    tables: Object.fromEntries(pulled.fromFa.map((id) => [id, pulled.tables[id]])) as Partial<
      Record<DivisionId, Standing[]>
    >,
    error: pulled.fromFa.length ? undefined : pulled.notes.join(" · ") || "Could not read FA Full-Time.",
  };
}

export async function pullFaLeague(): Promise<FaLeaguePull> {
  const snapshot = weekendSnapshotTables();
  const tables: Record<DivisionId, Standing[]> = {
    north: snapshot.north,
    south: snapshot.south,
    west: snapshot.west,
    east: snapshot.east,
  };
  const fromFa: DivisionId[] = [];
  const notes: string[] = [];
  const liveScores: FaScore[] = [];
  const fixtures: FaFixture[] = [];
  const pages: Record<DivisionId, { division: string; group: string; heading: string; fingerprint: string[]; forbidden?: string[] }> = {
    north: { ...FA_DIVISION_PAGES.north },
    south: { ...FA_DIVISION_PAGES.south },
    west: { ...FA_DIVISION_PAGES.west },
    east: { ...FA_DIVISION_PAGES.east },
  };

  function applyDiscovered(html: string) {
    const found = parseFaDivisionPages(html);
    for (const id of Object.keys(found) as DivisionId[]) {
      const hit = found[id];
      if (!hit) continue;
      if (hit.division && hit.division !== pages[id].division) {
        pages[id] = { ...pages[id], division: hit.division, group: hit.group || pages[id].group };
      } else if (hit.group && hit.group !== "0") {
        pages[id] = { ...pages[id], group: hit.group };
      }
    }
  }

  async function readDivision(id: DivisionId): Promise<boolean> {
    const page = pages[id];
    const html = await fetchHtml(faTableUrl(page));
    applyDiscovered(html);
    const rows = parseFaStandings(html);
    if (!rows.length) {
      notes.push(`${id}: no U12 table on Full-Time`);
      return false;
    }
    const reject = u12PageReject(html, rows, id);
    if (reject) {
      notes.push(reject);
      return false;
    }
    tables[id] = mergeKnownNames(id, rows);
    fromFa.push(id);
    liveScores.push(...parseFaResults(html).filter(isU12Score));
    try {
      const resultsHtml = await fetchHtml(faResultsUrl(page));
      liveScores.push(...parseFaResults(resultsHtml).filter(isU12Score));
    } catch {
      // table page often already includes latest scores
    }
    try {
      const fixturesHtml = await fetchHtml(faFixturesUrl(page));
      const parsed = parseFaFixtures(fixturesHtml);
      fixtures.push(...parsed);
      for (const fx of parsed) {
        if (fx.homeGoals != null && fx.awayGoals != null) {
          liveScores.push({
            homeTeam: fx.homeTeam,
            awayTeam: fx.awayTeam,
            homeGoals: fx.homeGoals,
            awayGoals: fx.awayGoals,
          });
        }
      }
    } catch {
      // fixtures page is optional — results still apply
    }
    return true;
  }

  const firstPass = ["south", "east", "north", "west"] as DivisionId[];
  await Promise.all(
    firstPass.map(async (id) => {
      try {
        const ok = await readDivision(id);
        if (!ok && (id === "west" || id === "north")) {
          const changed =
            pages[id].division !== FA_DIVISION_PAGES[id].division ||
            pages[id].group !== FA_DIVISION_PAGES[id].group;
          if (changed) await readDivision(id);
        }
      } catch (err) {
        notes.push(`${id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }),
  );

  try {
    const teamHtml = await fetchHtml(faBullsTeamUrl());
    liveScores.push(...parseFaResults(teamHtml).filter(isU12Score));
    fixtures.push(...parseFaFixtures(teamHtml));
  } catch (err) {
    notes.push(`bulls: ${err instanceof Error ? err.message : String(err)}`);
  }

  const bullsScores = uniqueScores(liveScores.filter(isBullsScore).filter(isU12Score));
  const allScores = uniqueScores(liveScores.filter(isU12Score));
  if (!bullsScores.length) {
    bullsScores.push({
      homeTeam: PINE_VILLA_OPENER.homeTeam,
      awayTeam: PINE_VILLA_OPENER.awayTeam,
      homeGoals: PINE_VILLA_OPENER.homeGoals,
      awayGoals: PINE_VILLA_OPENER.awayGoals,
    });
    notes.push("Bulls score: used the saved Pine Villa 7–6");
  }

  const source: FaLeaguePull["source"] =
    fromFa.length === 4 ? "fa" : fromFa.length === 0 ? "saved" : "mixed";

  return {
    ok: true,
    source,
    tables,
    fromFa,
    bullsScores,
    fixtures: uniqueFixtures(fixtures),
    allScores,
    notes,
  };
}

function uniqueFixtures(rows: FaFixture[]): FaFixture[] {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = `${row.kickoff}|${row.homeTeam}|${row.awayTeam}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isBullsScore(row: FaScore): boolean {
  return isBullsName(row.homeTeam) || isBullsName(row.awayTeam);
}

function isBullsName(name: string): boolean {
  const n = name.toLowerCase();
  if (OTHER_AGE_RE.test(n)) return false;
  return n.includes("cherrybrook") && n.includes("bulls") && !n.includes("cobra");
}

function uniqueScores(rows: FaScore[]): FaScore[] {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = `${row.homeTeam}|${row.awayTeam}|${row.homeGoals}-${row.awayGoals}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeKnownNames(id: DivisionId, rows: Standing[]): Standing[] {
  const known = U12_DIVISIONS.find((d) => d.id === id)?.teams ?? [];
  if (!known.length) return rows;
  const mapped = rows.map((row) => {
    const hit = known.find(
      (k) =>
        k.toLowerCase() === row.team.toLowerCase() ||
        row.team.toLowerCase().includes(k.toLowerCase()) ||
        k.toLowerCase().includes(row.team.toLowerCase()),
    );
    return hit ? { ...row, team: hit } : row;
  });
  const seen = new Set(mapped.map((r) => r.team));
  for (const team of known) {
    if (!seen.has(team)) mapped.push(emptyStanding(team));
  }
  return sortStandings(mapped);
}
