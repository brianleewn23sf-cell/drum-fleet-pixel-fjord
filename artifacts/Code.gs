/**
 * Cherrybrook Raging Bulls U12s — 3-2-1 Voting App
 * Bound to a Google Sheet. Deploy as Web App (Execute as: Me, Who has access: Anyone).
 *
 * Sheet columns (auto-created):
 *   A Timestamp | B Game | C Opposition | D VoterChild | E Vote3 | F Vote2 | G Vote1
 *
 * Optional: create a tab named "Players" with a header in A1 and one player per row in A2:A
 * using the same format as PLAYERS below. If that tab exists and has names, it is used instead.
 */

const PLAYERS = [
  "1) Harry Parr",
  "3) Ruben Biddiss",
  "4) Louie Biddiss",
  "5) Kody Cox",
  "7) Cullen Atkinson-Lee",
  "8) Caleb Connelly",
  "9) Jacob Sands",
  "10) Ben Owen",
  "11) Jacob Saxon",
  "14) Henry Bearman",
  "16) Jacob Hill",
  "20) Archie Almond",
  "22) William Brittain",
  "23) Hayden Plumbley",
  "30) Isa Ali"
];

const HEADERS = [
  "Timestamp",
  "Game",
  "Opposition",
  "VoterChild",
  "Vote3",
  "Vote2",
  "Vote1"
];

function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Raging Bulls U12s · 3-2-1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag(
      "viewport",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
    );
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getVotesSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const named = ss.getSheetByName("Votes");
  const sheet = named || ss.getActiveSheet();
  const lastCol = Math.max(sheet.getLastColumn(), HEADERS.length);
  const existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const needsHeaders =
    !existing[0] || String(existing[0]).toLowerCase().indexOf("timestamp") === -1;
  if (needsHeaders && sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function getPlayers_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tab = ss.getSheetByName("Players");
  if (tab) {
    const values = tab.getRange("A2:A").getValues().flat().map(String).map(function (s) {
      return s.trim();
    }).filter(Boolean);
    if (values.length) return values;
  }
  return PLAYERS.slice();
}

function getInitialData() {
  const sheet = getVotesSheet_();
  const data = sheet.getDataRange().getValues();
  const rows = data.length > 1 ? data.slice(1) : [];

  const history = rows
    .filter(function (row) {
      return row[3] || row[4] || row[5] || row[6];
    })
    .map(function (row) {
      return {
        timestamp: row[0] instanceof Date ? row[0].toISOString() : String(row[0] || ""),
        gameNumber: String(row[1] || "").trim(),
        opposition: String(row[2] || "").trim(),
        parentChild: String(row[3] || "").trim(),
        vote3: String(row[4] || "").trim(),
        vote2: String(row[5] || "").trim(),
        vote1: String(row[6] || "").trim()
      };
    });

  return {
    players: getPlayers_(),
    history: history
  };
}

function normalizeKey_(game, child) {
  return String(game || "").trim().toLowerCase() + "||" + String(child || "").trim().toLowerCase();
}

function submitVotes(formData) {
  formData = formData || {};
  const gameNumber = String(formData.gameNumber || "").trim();
  const opposition = String(formData.opposition || "").trim();
  const parentChild = String(formData.parentChild || "").trim();
  const vote3 = String(formData.vote3 || "").trim();
  const vote2 = String(formData.vote2 || "").trim();
  const vote1 = String(formData.vote1 || "").trim();

  if (!gameNumber) return { success: false, error: "Add a round / game number." };
  if (!opposition) return { success: false, error: "Add the opposition." };
  if (!parentChild) return { success: false, error: "Select your child." };
  if (!vote3 || !vote2 || !vote1) return { success: false, error: "Cast all three votes." };

  if (vote3 === vote2 || vote3 === vote1 || vote2 === vote1) {
    return { success: false, error: "Each vote must go to a different player." };
  }

  if (parentChild === vote3 || parentChild === vote2 || parentChild === vote1) {
    return { success: false, error: "You cannot vote for your own child." };
  }

  const players = getPlayers_();
  const allowed = {};
  players.forEach(function (p) {
    allowed[p] = true;
  });
  if (!allowed[parentChild] || !allowed[vote3] || !allowed[vote2] || !allowed[vote1]) {
    return { success: false, error: "One of the selected names is not on the squad list." };
  }

  const sheet = getVotesSheet_();
  const data = sheet.getDataRange().getValues();
  const key = normalizeKey_(gameNumber, parentChild);
  for (var i = 1; i < data.length; i++) {
    if (normalizeKey_(data[i][1], data[i][3]) === key) {
      return {
        success: false,
        error: "Votes for this child have already been submitted for " + gameNumber + "."
      };
    }
  }

  sheet.appendRow([new Date(), gameNumber, opposition, parentChild, vote3, vote2, vote1]);
  return { success: true };
}
