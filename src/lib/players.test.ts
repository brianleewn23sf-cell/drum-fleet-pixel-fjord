import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { PLAYERS, matchSquadPlayer, shortName } from "./players.ts";

describe("matchSquadPlayer", () => {
  const squad = [...PLAYERS];

  it("maps Zac Reads onto Zachary Read", () => {
    assert.equal(matchSquadPlayer(squad, "Zac Reads"), "13) Zachary Read (GK)");
    assert.equal(matchSquadPlayer(squad, "Zac Read"), "13) Zachary Read (GK)");
    assert.equal(matchSquadPlayer(squad, "Zachary Reads"), "13) Zachary Read (GK)");
  });

  it("does not mix up the Jacobs", () => {
    assert.equal(matchSquadPlayer(squad, "Jacob Hill"), "16) Jacob Hill");
    assert.equal(matchSquadPlayer(squad, "Jacob Sands"), "9) Jacob Sands");
  });
});

describe("shortName", () => {
  it("drops the GK tag so Zac is readable on the table", () => {
    assert.equal(shortName("13) Zachary Read (GK)"), "#13 Zachary Read");
  });
});
