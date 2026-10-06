import { BENCH_SLOTS, SLOT_NAMES, formationById } from "@/lib/formations";
import { mixedStarterTalk, mixedSubTalk } from "@/lib/mix-talk";
import { youLine } from "@/lib/player-roles";
import { parsePlayer } from "@/lib/players";

export const PRESS_RULE =
  "5-second rule: as a team, win the ball back inside 5 seconds. It is a general team instruction, not an individual one — chasing it on your own can change the shape of the team.";
export const FIRST_BALLS =
  "Win the first ball. If that fails, win the second ball.";
export const COMPACT_EXPAND =
  "Without the ball we stay compact. With the ball we expand.";
export const POSSESSION_RULE =
  "3-second rule: once we are in possession, move the ball within 3 seconds — into feet, into space, or in the back of the net.";
export const CARRY_RULE =
  "The only time the 3-second rule is not in place is when someone is running in space with the ball — a winger, an attacker, or a centre-mid breaking the lines. If there is space and it is safe to do so, sprint with that ball.";

export const KEEPER_FACTS = [
  "FA law: the keeper has 5 seconds to release the ball.",
  "On goal kicks: right-back and left-back drop deep into each corner, open body, on their back foot, and show.",
  "The centre-back sets in the middle, open body, on their back foot.",
  "One centre-mid fills the hole in the middle.",
  "The keeper decides: short into a corner, more central, or long.",
  "Recycling: if the keeper is under no pressure, the passer drops into a corner, open body, on their back foot, and shows again.",
] as const;

export const KEEPER_DUTY = "Organise the box and start attacks.";

export const KEEPER_WITH =
  "FA law: 5 seconds to release. On a goal kick: full-backs in the corners (open body, back foot), centre-back open in the middle, one centre-mid filling the hole. You pick short to a corner, more central, or long. If you are under no pressure, recycle — the passer drops into a corner, open body, back foot, and shows.";

export const KEEPER_WITHOUT =
  "Own the box. Claim what you can, sweep behind the line, organise the back.";

export const BULLS_WAY = [
  "Without the ball we stay compact and drop. With the ball we expand and push forward.",
  "Win the first ball. If that fails, win the second ball.",
  "There is always a centre-forward staying on their last man so we are not compressed.",
  "Wide forwards press on their goal kicks with the centre-forward.",
  "Key tip: always watch the keeper’s eyes and body language to gauge where the ball is going.",
  "Positive attitude. No blaming. High fives all the time. We are one team — starters and subs together.",
] as const;

export const BACK_THREE_NOTE =
  "Three at the back: left-back and right-back become wing-backs and can overlap down the wing, but two players must stay at the back. The centre-back / sweeper can bring the ball forward only if it is safe, to start an attack.";

export const TWO_CM_NOTE =
  "Two centre-mids: rotate into CAM and CDM and stay in that central area. If you have space, have a shot.";

export const WIDE_PRESS_NOTE =
  "Wide forwards press their goal kicks with the centre-forward.";

export const FRONT_THREE_NOTE =
  "The two wide players up front are forwards / wingers. Stretch the pitch, press with the 9, finish. Speed up front.";

export const OVERLAP_NOTE =
  "When the left wing-back and right wing-back go up, the two wide forwards / wingers drop back and let them overlap.";

export const BRIAN_PROFILE =
  "Brian likes speed up front, power in the middle, and both speed and power at the back.";

export const SUB_ON =
  "When you go on, you become the position you go on to.";

export const SUB_BRIEF =
  "Subs are impact players. Every game, you mean as much as who starts. Stay involved on the side: warm up, stretch, keep the body ready, listen, high fives. Study the starters. Speed up front, power in the middle, speed and power at the back. When you go on, you become that position — make a difference. Change the game. Bring energy, win first balls, then second balls, and leave nothing out there. Everyone will play their part.";

export const EVERYONE_PLAYS = "Everyone will play their part.";

export const NEGATIVE_NOTE =
  "We play the Bulls way: supportive, positive, great team spirit. Negativity, swearing or poor behaviour means less game time, and a suspension if we have to — because we care how these lads grow.";

export const HOME_PRACTICE =
  "You are not with us on match day. Keep focused. Practice receiving the ball on the back foot, in an open body position, so you keep up to speed with the squad. Still one of us.";

export const INJURED_NOTE =
  "Get well. Still part of this team. You cannot train if you are injured. Keep focused. When you can, practice receiving the ball on the back foot, in an open body position.";

export function injuredNoteFor(player: string): string {
  const { name, first } = parsePlayer(player);
  if (name.includes("Harry Parr") || first === "Harry") {
    return "Get well soon Harry — our own stunt man. You cannot train if you are injured. Keep focused. When you can, practice receiving the ball on the back foot, in an open body position.";
  }
  return INJURED_NOTE;
}

export type SlotBrief = {
  duty: string;
  withBall: string;
  withoutBall: string;
};

const ROLES: Record<string, { duty: string; with: string; without: string }> = {
  GK: {
    duty: KEEPER_DUTY,
    with: KEEPER_WITH,
    without: KEEPER_WITHOUT,
  },
  CB: {
    duty: "Centre of the back line. Win first balls, step in, keep us compact.",
    with: "3 seconds: simple into the 6 or full-back, or a line-breaking pass into space. On a goal kick: open body in the centre, on your back foot, and show. If you play back to the keeper under no pressure, drop into a corner, open body, and show again.",
    without: "stop the central threat, drop or step as a unit, win the header.",
  },
  LCB: {
    duty: "Left centre-back. Cover the channel, play out, protect the inside.",
    with: "3 seconds: into the left side or midfield feet — or clip into space. On a goal kick: open body, on your back foot. If you are the widest of the two, you can drop toward the left corner.",
    without: "show them wide, win it back, no free shots.",
  },
  RCB: {
    duty: "Right centre-back. Cover the channel, play out, protect the inside.",
    with: "3 seconds: into the right side or midfield feet — or clip into space. On a goal kick: open body, on your back foot. If you are the widest of the two, you can drop toward the right corner.",
    without: "show them wide, win it back, no free shots.",
  },
  LB: {
    duty: "Left side of the back. Defend the touchline, join in when we have it.",
    with: "3 seconds: down the line into space, or inside into feet. Overlap if it’s on. On a goal kick: drop deep into the left corner, open body, on your back foot, and show. If you recycle to the keeper under no pressure, drop into the corner again and show.",
    without: "stop the winger, recover inside, hunt the second ball.",
  },
  RB: {
    duty: "Right side of the back. Defend the touchline, join in when we have it.",
    with: "3 seconds: down the line into space, or inside into feet. Overlap if it’s on. On a goal kick: drop deep into the right corner, open body, on your back foot, and show. If you recycle to the keeper under no pressure, drop into the corner again and show.",
    without: "stop the winger, recover inside, hunt the second ball.",
  },
  CDM: {
    duty: "Screen in front of the back. Break up play, take the first pass, keep us moving.",
    with: "3 seconds: bounce into feet or turn and play forward into space. Never stall. On a goal kick: fill the hole in the middle if you are the nearest six.",
    without: "nearest man, cut passing lanes, win it and give it.",
  },
  LDM: {
    duty: "Left of the double six. Protect the left half-space, recycle, press.",
    with: "3 seconds: into the 8/10 or wide man — feet or space, then move.",
    without: "jump the ball-side 8, double up, win it back.",
  },
  RDM: {
    duty: "Right of the double six. Protect the right half-space, recycle, press.",
    with: "3 seconds: into the 8/10 or wide man — feet or space, then move.",
    without: "jump the ball-side 8, double up, win it back.",
  },
  CM: {
    duty: "Middle of the park. Link defence to attack, demand the ball, set the tempo.",
    with: "3 seconds: forward into feet, around the corner into space, or a shot if it opens. On a goal kick: one of you fills the hole in the middle, open body, ready to bounce.",
    without: "press the pivot, fill the hole, win the second ball.",
  },
  LCM: {
    duty: "Left centre-mid. Half-space runner, support the left, arrive in the box.",
    with: "3 seconds: combine with the left side, or split the centre into space. On a goal kick: one of you fills the hole in the middle.",
    without: "press their right, recover through the middle.",
  },
  RCM: {
    duty: "Right centre-mid. Half-space runner, support the right, arrive in the box.",
    with: "3 seconds: combine with the right side, or split the centre into space. On a goal kick: one of you fills the hole in the middle.",
    without: "press their left, recover through the middle.",
  },
  LM: {
    duty: "Left mid. Width on the left, 1v1, service into the box.",
    with: "3 seconds: take a man on into space, cut back into feet, or a shot.",
    without: "press their right-back, track the runner, win it high.",
  },
  RM: {
    duty: "Right mid. Width on the right, 1v1, service into the box.",
    with: "3 seconds: take a man on into space, cut back into feet, or a shot.",
    without: "press their left-back, track the runner, win it high.",
  },
  LW: {
    duty: "Wide forward / left winger. Stretch the pitch, isolate the full-back, finish attacks.",
    with: "3 seconds: in behind, across the keeper, or square into feet. Shoot if you’re in.",
    without: "press from the front-left, trap them on the touchline.",
  },
  RW: {
    duty: "Wide forward / right winger. Stretch the pitch, isolate the full-back, finish attacks.",
    with: "3 seconds: in behind, across the keeper, or square into feet. Shoot if you’re in.",
    without: "press from the front-right, trap them on the touchline.",
  },
  CAM: {
    duty: "Number 10. Between their lines, the killer pass, late into the box.",
    with: "3 seconds: set, turn, play in behind or have a strike. Do not go backwards unless you have to.",
    without: "press their 6, stop the switch, win it and go again.",
  },
  LAM: {
    duty: "Left attacking mid. Inside-left, combine with the 9 and the wing.",
    with: "3 seconds: one-two into space, slip the 9, or a shot from the edge.",
    without: "press their right-centre, cut the split pass.",
  },
  RAM: {
    duty: "Right attacking mid. Inside-right, combine with the 9 and the wing.",
    with: "3 seconds: one-two into space, slip the 9, or a shot from the edge.",
    without: "press their left-centre, cut the split pass.",
  },
  ST: {
    duty: "The 9. Occupy centre-backs, finish, press first.",
    with: "3 seconds: shoot, square, or spin in behind. First thought is the net.",
    without: "you start the press. Curve their centre-backs, force the mistake.",
  },
  LS: {
    duty: "Left striker. Channel runner, finish, press from the left of the front.",
    with: "3 seconds: across the keeper, lay into feet, or in behind. Net first.",
    without: "press their right-centre and full-back. Win it high.",
  },
  RS: {
    duty: "Right striker. Channel runner, finish, press from the right of the front.",
    with: "3 seconds: across the keeper, lay into feet, or in behind. Net first.",
    without: "press their left-centre and full-back. Win it high.",
  },
};

const SHAPE: Record<string, string> = {
  "3-3-2": "This week: 3-3-2. Back three, three across, two up. Compact without it, two strikers stretch them. Wing-backs can go — two stay.",
  "3-2-3": "This week: 3-2-3. Back three, two in midfield, a front three. Wide players are forwards / wingers. Wing-backs overlap, wingers drop.",
  "2-3-3": "This week: 2-3-3. Two at the back, three in midfield, a front three. Brave. Wide players are forwards / wingers. Speed up front.",
  "2-4-2": "This week: 2-4-2. Two centre-backs, a four across, two strikers. Flood the middle. Power in midfield, speed up front.",
  "3-4-1": "This week: 3-4-1. Back three, four in midfield, one 9. Control then release. Wing-backs overlap, two stay.",
  "4-3-1": "This week: 4-3-1. Back four, three mids, one 9. Solid, then the 10 makes the difference. Speed and power at the back.",
  "4-2-2": "This week: 4-2-2. Back four, two mids, two up. Stay compact, break in pairs. Speed up front.",
  "3-2-2-1": "This week: 3-2-2-1. Back three, two sixes, two tens, one 9. Overload between the lines. Wing-backs overlap.",
  "2-3-2-1": "This week: 2-3-2-1. Two at the back, three mids, two tens, one 9. Extra man in attack. Speed up front.",
  "2-1-4-1": "This week: 2-1-4-1. Two centre-backs, one 6, a four across, one 9. The 6 screens. Flood the middle. Wide mids can go.",
  "2-1-3-2": "This week: 2-1-3-2. Two centre-backs, one 6, three across, two up. The 6 screens. Wide mids can go. Two strikers stretch them.",
  "1-2-1-3-1": "This week: 1-2-1-3-1. One centre-back, two wing-backs, a six, a front three and a 9. Aggressive. Wingers drop when wing-backs overlap.",
};

export function shapeNote(formationId: string): string {
  return SHAPE[formationId] ?? "Stay in your positions. Win it. Move it.";
}

export function isBackThree(formationId: string): boolean {
  return formationId.startsWith("3-") || formationId === "1-2-1-3-1";
}

export function hasTwoCms(formationId: string): boolean {
  return ["3-2-3", "3-2-2-1", "4-2-2", "2-4-2", "3-4-1", "2-3-2-1", "2-1-4-1"].includes(formationId);
}

export function hasFrontThree(formationId: string): boolean {
  return ["3-2-3", "2-3-3", "1-2-1-3-1"].includes(formationId);
}

export function formationExtras(formationId: string): string[] {
  const extra: string[] = [];
  const threeBack = isBackThree(formationId);
  const threeUp = hasFrontThree(formationId);
  if (threeBack) extra.push(BACK_THREE_NOTE);
  if (hasTwoCms(formationId)) extra.push(TWO_CM_NOTE);
  if (threeBack || threeUp) {
    extra.push(FRONT_THREE_NOTE);
    extra.push(OVERLAP_NOTE);
  }
  extra.push(WIDE_PRESS_NOTE);
  return extra;
}

const WING_BACKS = new Set(["LB", "RB"]);
const SWEEPERS = new Set(["CB"]);
const PAIR_MIDS = new Set(["LCM", "RCM", "LDM", "RDM", "CM", "CDM"]);
const WIDE_WINGERS = new Set(["LW", "RW", "LS", "RS", "LM", "RM", "LAM", "RAM"]);
const WIDE_FORWARD = new Set(["LW", "RW", "LM", "RM", "LS", "RS", "ST"]);
const CARRY = new Set(["LW", "RW", "LS", "RS", "ST", "CAM", "LAM", "RAM", "CM", "LCM", "RCM", "LM", "RM"]);

export function fillBrief(formationId: string): Record<string, SlotBrief> {
  const next: Record<string, SlotBrief> = {};
  const backThree = isBackThree(formationId);
  const twoMids = hasTwoCms(formationId);
  const frontThree = hasFrontThree(formationId);
  const overlap = backThree || frontThree;
  for (const [id, role] of Object.entries(ROLES)) {
    if (id === "GK") {
      next.GK = { duty: role.duty, withBall: role.with, withoutBall: role.without };
      continue;
    }
    let withBall = role.with;
    let withoutBall = `${FIRST_BALLS} Stay compact. ${role.without}`;
    let duty = role.duty;
    if (backThree && WING_BACKS.has(id)) {
      duty = "Wing-back this week. Overlap when we have it. Two must stay at the back. Speed and power.";
      withBall +=
        " Overlap down your wing. When you go up, the wide forward / winger drops and lets you through. Two stay at the back.";
    }
    if (backThree && SWEEPERS.has(id)) {
      duty = `${duty} Sweeper this week. Speed and power at the back.`;
      withBall +=
        " Bring the ball forward only if it is safe, to start an attack. Two stay at the back.";
    }
    if (twoMids && PAIR_MIDS.has(id)) {
      duty = `${duty} Power in the middle this week.`;
      withBall +=
        " Rotate into CAM and CDM. Stay central. If you have space, have a shot.";
    }
    if (WIDE_FORWARD.has(id)) {
      withoutBall += ` Press their goal kicks with the 9. Watch the keeper’s eyes.`;
    }
    if (overlap && WIDE_WINGERS.has(id)) {
      duty = `${duty} Wide forward / winger this week. Speed up front.`;
      withBall +=
        " When the wing-back goes up, drop back and let them overlap.";
    }
    if (id === "ST") {
      duty = `${duty} Speed up front this week. Stay on their last man.`;
    }
    if (CARRY.has(id)) {
      withBall +=
        " If you are running in space and it is safe, sprint with the ball.";
    }
    next[id] = { duty, withBall, withoutBall };
  }
  return next;
}

export function usualSlotIds(
  player: string,
  plans: { lineup: Record<string, string> }[],
): string[] {
  const counts = new Map<string, number>();
  for (const plan of plans) {
    for (const [slot, name] of Object.entries(plan.lineup)) {
      if (name !== player) continue;
      if (/^(SUB|RES|INJ|OUT)/.test(slot)) continue;
      counts.set(slot, (counts.get(slot) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slot]) => slot);
}

export function usualRoles(
  player: string,
  plans: { lineup: Record<string, string> }[],
): string {
  return usualSlotIds(player, plans)
    .map((slot) => SLOT_NAMES[slot] || slot)
    .join(" / ");
}

export function benchKind(
  slotId: string,
): "sub" | "reserve" | "injured" | "unavailable" | null {
  if (slotId.startsWith("SUB")) return "sub";
  if (slotId.startsWith("RES")) return "reserve";
  if (slotId.startsWith("INJ")) return "injured";
  if (slotId.startsWith("OUT")) return "unavailable";
  return null;
}

export function roleBriefForPlayer(
  kind: "sub" | "reserve" | "injured" | "unavailable",
  player: string,
  formationId: string,
  plans: { lineup: Record<string, string> }[],
  salt = formationId,
): SlotBrief {
  if (kind === "injured") {
    return {
      duty: injuredNoteFor(player),
      withBall: "",
      withoutBall: "",
    };
  }
  if (kind === "unavailable" || kind === "reserve") {
    return {
      duty: "",
      withBall: "",
      withoutBall: "",
    };
  }

  return mixedSubTalk(player, formationId, salt);
}

export function personaliseBrief(
  player: string,
  slotId: string,
  role: SlotBrief,
  formationId = "",
  salt = "",
): SlotBrief {
  if (formationId && salt) {
    return mixedStarterTalk(player, slotId, formationId, role, salt);
  }
  const label = SLOT_NAMES[slotId] || slotId;
  const you = youLine(player, slotId, label);
  return {
    duty: `${you} ${role.duty}`,
    withBall: role.withBall,
    withoutBall: role.withoutBall,
  };
}

export function fillLineupBrief(
  formationId: string,
  lineup: Record<string, string>,
  plans: { lineup: Record<string, string> }[] = [],
  salt = formationId,
): Record<string, SlotBrief> {
  const roles = fillBrief(formationId);
  const next: Record<string, SlotBrief> = {};
  for (const slot of formationById(formationId).slots) {
    const role = roles[slot.id] ?? { duty: "", withBall: "", withoutBall: "" };
    const player = lineup[slot.id];
    next[slot.id] = player ? personaliseBrief(player, slot.id, role, formationId, salt) : role;
  }
  return { ...next, ...fillBenchBriefs(formationId, lineup, plans, salt) };
}

export function fillBenchBriefs(
  formationId: string,
  lineup: Record<string, string>,
  plans: { lineup: Record<string, string> }[],
  salt = formationId,
): Record<string, SlotBrief> {
  const next: Record<string, SlotBrief> = {};
  for (const id of BENCH_SLOTS) {
    const player = lineup[id];
    const kind = benchKind(id);
    if (!player || !kind) continue;
    next[id] = roleBriefForPlayer(kind, player, formationId, plans, salt);
  }
  return next;
}

export function benchTalk(
  kind: "sub" | "reserve" | "injured" | "unavailable",
  player: string,
  plans: { lineup: Record<string, string> }[],
  brief: Record<string, SlotBrief>,
  slotId?: string,
): string {
  const saved = slotId ? brief[slotId] : undefined;
  if (saved && (saved.duty || saved.withBall || saved.withoutBall)) {
    return [saved.duty, saved.withBall && `With. ${saved.withBall}`, saved.withoutBall && `Without. ${saved.withoutBall}`]
      .filter(Boolean)
      .join(" ");
  }
  const built = roleBriefForPlayer(kind, player, "3-3-2", plans);
  return [built.duty, built.withBall && `With. ${built.withBall}`, built.withoutBall && `Without. ${built.withoutBall}`]
    .filter(Boolean)
    .join(" ");
}

export function briefForSlots(
  formationId: string,
  slotIds: string[],
  existing: Record<string, SlotBrief> = {},
): Record<string, SlotBrief> {
  const filled = fillBrief(formationId);
  const next: Record<string, SlotBrief> = { ...existing };
  for (const id of slotIds) {
    if (!next[id]) next[id] = filled[id] ?? filled.CM;
  }
  return next;
}
