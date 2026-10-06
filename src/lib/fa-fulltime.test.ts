import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractAgeHeading,
  isU12Name,
  isU12Score,
  parseFaDivisionPages,
  parseFaFixtures,
  parseFaStandings,
  u12PageReject,
} from "./fa-fulltime.ts";
import { formatGoalLine, voteFixture, planFixture, bullsRoundList, BULLS_TEAM, type LeagueFixture } from "./wdyl.ts";

describe("U12-only Full-Time guard", () => {
  it("reads a U12 South heading", () => {
    assert.equal(extractAgeHeading("<h1>U12 South</h1>"), "U12 South");
  });

  it("rejects U13 and U17 headings", () => {
    const u13 = u12PageReject(
      "<h1>U13 North</h1><table><tr><td>Cherrybrook U13 warriors</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr></table>",
      parseFaStandings(
        "<table><tr><td>Cherrybrook U13 warriors</td><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr></table>",
      ),
      "north",
    );
    assert.ok(u13 && /not U12/i.test(u13), u13 ?? "expected a reject");

    const u17 = extractAgeHeading("<h1>U17 North</h1>");
    assert.equal(u17, "U17 North");
  });

  it("rejects last-season U12 West (Leopards)", () => {
    const html = `
      <h1>U12 West</h1>
      <table>
        <tr><td>Ladybridge U12 Leopards</td><td>20</td><td>18</td><td>1</td><td>1</td><td>40</td><td>55</td></tr>
        <tr><td>Pine Villa U12 Tangerine</td><td>20</td><td>14</td><td>2</td><td>4</td><td>20</td><td>44</td></tr>
      </table>
    `;
    const reason = u12PageReject(html, parseFaStandings(html), "west");
    assert.ok(reason && /last season/i.test(reason), reason ?? "expected last-season reject");
  });

  it("accepts live U12 South with Bulls and cobras", () => {
    const html = `
      <h1>U12 South</h1>
      <table>
        <tr><td>Cherrybrook U12 Bulls</td><td>1</td><td>0</td><td>0</td><td>1</td><td>-1</td><td>0</td></tr>
        <tr><td>Cherrybrook U12 cobras</td><td>1</td><td>0</td><td>0</td><td>1</td><td>-3</td><td>0</td></tr>
      </table>
    `;
    assert.equal(u12PageReject(html, parseFaStandings(html), "south"), null);
  });

  it("reads U12 West and North IDs from a Full-Time dropdown", () => {
    const html = `
      <select name="selectedDivision">
        <option value="983817231">U12 North</option>
        <option value="112552333" selected>U12 South</option>
        <option value="555000111">U12 West</option>
        <option value="739844699">U12 East</option>
      </select>
    `;
    const found = parseFaDivisionPages(html);
    assert.equal(found.west?.division, "555000111");
    assert.equal(found.north?.division, "983817231");
  });

  it("accepts this season's U12 West (Knights / raiders)", () => {
    const html = `
      <h1>U12 West</h1>
      <table>
        <tr><td>Cherrybrook U12 Knights</td><td>1</td><td>1</td><td>0</td><td>0</td><td>4</td><td>3</td></tr>
        <tr><td>Cherrybrook U12 raiders</td><td>1</td><td>1</td><td>0</td><td>0</td><td>3</td><td>3</td></tr>
        <tr><td>F.C. Britannia (Wigan) U12 Yellow</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>3</td></tr>
      </table>
    `;
    assert.equal(u12PageReject(html, parseFaStandings(html), "west"), null);
  });

  it("accepts this season's U12 North by known teams", () => {
    const html = `
      <h1>U12 North</h1>
      <table>
        <tr><td>Robin Park U12 Rangers</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>3</td></tr>
        <tr><td>Cherrybrook U12 madrid</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>Cherrybrook U12 warriors</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>Whittle Hall U12 Titans (Sunday)</td><td>1</td><td>0</td><td>0</td><td>1</td><td>-1</td><td>0</td></tr>
      </table>
    `;
    assert.equal(u12PageReject(html, parseFaStandings(html), "north"), null);
  });

  it("drops non-U12 scores", () => {
    assert.equal(isU12Name("Cherrybrook U12 Bulls"), true);
    assert.equal(isU12Name("Cherrybrook U13 Bulls"), false);
    assert.equal(
      isU12Score({
        homeTeam: "Pine Villa U12 s",
        awayTeam: "Cherrybrook U12 Bulls",
        homeGoals: 7,
        awayGoals: 6,
      }),
      true,
    );
    assert.equal(
      isU12Score({
        homeTeam: "Some U13 side",
        awayTeam: "Cherrybrook U12 Bulls",
        homeGoals: 1,
        awayGoals: 0,
      }),
      false,
    );
  });
});

describe("Full-Time fixtures and goal lines", () => {
  it("parses kick-off, venue, score and postponed", () => {
    const html = `
      <table>
        <tr><td>20/09/26</td><td>09:00</td><td>Newton-Le-Willows U12 Rangers</td><td>vs</td><td>Cherrybrook U12 Bulls</td><td>King George V</td></tr>
        <tr><td>06/09/26</td><td>11:00</td><td>Pine Villa U12 s</td><td>7-6</td><td>Cherrybrook U12 Bulls</td><td>Albany Academy</td></tr>
        <tr><td>20/09/26</td><td>11:15</td><td>Standish Panthers Juniors U12 Storm</td><td>vs</td><td>Robin Park U12 Raptors</td><td>Laithwaite Park</td><td>Postponed</td></tr>
      </table>
    `;
    const rows = parseFaFixtures(html);
    assert.equal(rows.length, 3);
    assert.equal(rows[0].kickoff, "2026-09-20T09:00");
    assert.equal(rows[0].homeTeam, "Newton-Le-Willows U12 Rangers");
    assert.equal(rows[0].awayTeam, "Cherrybrook U12 Bulls");
    assert.equal(rows[0].homeGoals, null);
    assert.equal(rows[1].homeGoals, 7);
    assert.equal(rows[1].awayGoals, 6);
    assert.equal(rows[1].venue, "Albany Academy");
    assert.equal(rows[2].postponed, true);
  });

  it("drops non-U12 fixtures", () => {
    const html = `
      <table>
        <tr><td>20/09/26</td><td>09:00</td><td>Cherrybrook U13 Bulls</td><td>vs</td><td>Some U13 side</td></tr>
      </table>
    `;
    assert.equal(parseFaFixtures(html).length, 0);
  });

  it("prints scorer, assist and minute", () => {
    assert.equal(
      formatGoalLine({ minute: 12, scorer: "Jacob Sands", assist: "Connor Lee" }),
      "12' Jacob Sands · Connor Lee",
    );
    assert.equal(formatGoalLine({ minute: 40, scorer: "Cullen Atkinson-Lee" }), "40' Cullen Atkinson-Lee");
  });
});

describe("voteFixture keeps today's unscored game", () => {
  function fx(
    kickoff: string,
    homeGoals: number | null = null,
    awayGoals: number | null = null,
  ): LeagueFixture {
    return {
      id: 1,
      kickoff,
      homeTeam: "Pine Villa U12 s",
      awayTeam: BULLS_TEAM,
      venue: "Away",
      homeGoals,
      awayGoals,
      status: homeGoals == null ? "fixture" : "result",
    };
  }

  const today = fx("2026-09-06T10:00:00.000Z");
  const next = {
    ...fx("2026-09-20T08:00:00.000Z"),
    id: 2,
    homeTeam: "Newton-Le-Willows U12 Rangers",
  };

  it("stays on the kicked-off game until a score is in", () => {
    const now = new Date("2026-09-06T22:00:00+01:00");
    const picked = voteFixture([today, next], now);
    assert.equal(picked?.kickoff, today.kickoff);
  });

  it("still stays on that game after the score, so families can vote", () => {
    const now = new Date("2026-09-06T22:00:00+01:00");
    const played = fx("2026-09-06T10:00:00.000Z", 6, 7);
    const picked = voteFixture([played, next], now);
    assert.equal(picked?.kickoff, played.kickoff);
  });

  it("stays on the played game until the next one kicks off", () => {
    const now = new Date("2026-09-07T09:11:00+01:00");
    const played = fx("2026-09-06T10:00:00.000Z", 6, 7);
    const picked = voteFixture([played, next], now);
    assert.equal(picked?.kickoff, played.kickoff);
  });

  it("moves on once the next fixture has kicked off", () => {
    const now = new Date("2026-09-20T10:30:00+01:00");
    const played = fx("2026-09-06T10:00:00.000Z", 6, 7);
    const picked = voteFixture([played, next], now);
    assert.equal(picked?.kickoff, next.kickoff);
  });
});

describe("planFixture opens the next match after game day", () => {
  function fx(kickoff: string, homeGoals: number | null = null): LeagueFixture {
    return {
      id: 1,
      kickoff,
      homeTeam: "Pine Villa U12 s",
      awayTeam: BULLS_TEAM,
      venue: "Away",
      homeGoals,
      awayGoals: homeGoals == null ? null : 6,
      status: homeGoals == null ? "fixture" : "result",
    };
  }

  const played = fx("2026-09-06T11:00", 7);
  const next = { ...fx("2026-09-20T09:00"), id: 2, homeTeam: "Newton-Le-Willows U12 Rangers" };
  const after = { ...fx("2026-09-27T11:15"), id: 3, homeTeam: BULLS_TEAM, awayTeam: "Daisy Hill Junior U12 Devils" };

  it("stays on today's game so live match still works", () => {
    const picked = planFixture([played, next, after], new Date("2026-09-06T18:00"));
    assert.equal(picked?.kickoff, played.kickoff);
  });

  it("moves to the next fixture the day after", () => {
    const picked = planFixture([played, next, after], new Date("2026-09-07T12:00"));
    assert.equal(picked?.kickoff, next.kickoff);
  });

  it("opens that next match for planning until its own game day ends", () => {
    const picked = planFixture([played, next, after], new Date("2026-09-20T21:00"));
    assert.equal(picked?.kickoff, next.kickoff);
  });

  it("then rolls on to the one after", () => {
    const picked = planFixture([played, next, after], new Date("2026-09-21T09:00"));
    assert.equal(picked?.kickoff, after.kickoff);
  });
});

describe("bullsRoundList", () => {
  it("numbers rounds and shows the Pine Villa result", () => {
    const list = bullsRoundList();
    assert.equal(list[0]?.gameNumber, "Rd 1");
    assert.equal(list[0]?.opposition, "Pine Villa");
    assert.equal(list[0]?.home, false);
    assert.equal(list[0]?.us, 6);
    assert.equal(list[0]?.them, 7);
    assert.equal(list[1]?.gameNumber, "Rd 2");
    assert.match(list[1]?.opposition ?? "", /Newton/i);
  });
});
