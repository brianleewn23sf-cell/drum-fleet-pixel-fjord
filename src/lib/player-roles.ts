import { parsePlayer } from "@/lib/players";

export type Band = "gk" | "back" | "wb" | "mid" | "wide" | "fwd" | "any";

export type PlayerRole = {
  bands: Band[];
  plays: string;
  strongest: string;
};

const ROSTER: Record<string, PlayerRole> = {
  "Zachary Read": {
    bands: ["gk"],
    plays: "goalkeeper",
    strongest: "in goal",
  },
  "Harry Parr": {
    bands: ["gk"],
    plays: "goalkeeper",
    strongest: "in goal",
  },
  "Ruben Biddiss": {
    bands: ["wb", "wide", "back"],
    plays: "left back, left wing-back and left wing",
    strongest: "down the left",
  },
  "Louie Biddiss": {
    bands: ["fwd", "mid", "back"],
    plays: "CF, CAM, CM, CDM, CB and right back",
    strongest: "through the middle",
  },
  "Kody Cox": {
    bands: ["any"],
    plays: "anywhere — CB, full-back, wing-back, CDM, CM, CAM or CF",
    strongest: "wherever we need him",
  },
  "Cullen Atkinson-Lee": {
    bands: ["back", "wb", "mid", "fwd"],
    plays: "sweeper, CB, right or left back, CDM, and up front",
    strongest: "at the back",
  },
  "Caleb Connelly": {
    bands: ["back", "mid"],
    plays: "right back, CB, left back and CDM",
    strongest: "in the back line",
  },
  "Jacob Sands": {
    bands: ["wide", "fwd", "mid"],
    plays: "left wing, left forward, CM and CAM",
    strongest: "on the left and in midfield",
  },
  "Logan Massey": {
    bands: ["any"],
    plays: "anywhere",
    strongest: "wherever we need him",
  },
  "Henry Bearman": {
    bands: ["wide", "wb", "fwd"],
    plays: "right wing, right wing-back, right mid and right forward",
    strongest: "down the right",
  },
  "Jacob Hill": {
    bands: ["wb", "wide", "fwd"],
    plays: "LWB, RWB, left mid, left wing, left forward and right wing",
    strongest: "as a wing-back or wide",
  },
  "Archie Almond": {
    bands: ["mid", "wide", "fwd"],
    plays: "CAM, CM, left wing, right wing and CF",
    strongest: "in attacking midfield",
  },
  "William Brittain": {
    bands: ["fwd", "wide"],
    plays: "CF, right forward, left forward, RW and LW",
    strongest: "up front",
  },
  "Hayden Plumbley": {
    bands: ["back", "mid"],
    plays: "CB and CDM",
    strongest: "in the back and as a six",
  },
  "Isa Ali": {
    bands: ["fwd", "mid"],
    plays: "CF, CAM, right forward, left forward and CM",
    strongest: "up front and in the 10",
  },
  "Max Shaw": {
    bands: ["back"],
    plays: "centre back",
    strongest: "in the middle of the back line",
  },
};

function normName(raw: string): string {
  return parsePlayer(raw).name.replace(/\s*\(GK\)\s*/i, "").trim();
}

export function isKeeper(raw: string): boolean {
  const bands = playerRole(raw).bands;
  return bands.includes("gk") && !bands.includes("any");
}

export function playerRole(raw: string): PlayerRole {
  const name = normName(raw);
  if (ROSTER[name]) return ROSTER[name];
  const hit = Object.entries(ROSTER).find(([key]) => name.includes(key) || key.includes(name));
  return hit?.[1] ?? { bands: ["any"], plays: "wherever we need him", strongest: "in the team" };
}

export function slotBand(slotId: string): Band {
  if (slotId === "GK") return "gk";
  if (["CB", "LCB", "RCB"].includes(slotId)) return "back";
  if (["LB", "RB"].includes(slotId)) return "wb";
  if (["CDM", "LDM", "RDM", "CM", "LCM", "RCM", "CAM"].includes(slotId)) return "mid";
  if (["LM", "RM", "LW", "RW", "LAM", "RAM"].includes(slotId)) return "wide";
  if (["ST", "LS", "RS"].includes(slotId)) return "fwd";
  return "mid";
}

export function slotFits(raw: string, slotId: string): boolean {
  const role = playerRole(raw);
  if (role.bands.includes("any")) return true;
  const band = slotBand(slotId);
  if (role.bands.includes(band)) return true;
  if (band === "wb" && (role.bands.includes("back") || role.bands.includes("wide"))) return true;
  if (band === "wide" && (role.bands.includes("fwd") || role.bands.includes("wb"))) return true;
  if (band === "fwd" && role.bands.includes("wide")) return true;
  if (band === "back" && role.bands.includes("wb")) return true;
  return false;
}

export function youLine(raw: string, slotId: string, slotLabel: string): string {
  const role = playerRole(raw);
  const first = parsePlayer(raw).first;
  if (slotBand(slotId) === "gk" && role.bands.includes("gk")) {
    return `${first}, this week you are in goal — your position.`;
  }
  if (slotFits(raw, slotId)) {
    return `${first}, this week you are ${slotLabel}. That is one of yours — you play ${role.plays}. Strongest ${role.strongest}.`;
  }
  return `${first}, this week we need you at ${slotLabel}. You play ${role.plays}, strongest ${role.strongest}. Study this job and do it for the team.`;
}

export function subYouLine(raw: string): string {
  const role = playerRole(raw);
  const first = parsePlayer(raw).first;
  return `${first}, you play ${role.plays}. Strongest ${role.strongest}.`;
}
