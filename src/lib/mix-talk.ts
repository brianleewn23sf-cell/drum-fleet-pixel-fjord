import { MOTTO_EN, MOTTO_LATIN } from "@/lib/brand";
import { SLOT_NAMES } from "@/lib/formations";
import { playerRole, slotBand, subYouLine, youLine, type Band } from "@/lib/player-roles";

export type TalkBits = {
  duty: string;
  withBall: string;
  withoutBall: string;
};

function isBackThree(id: string): boolean {
  return id.startsWith("3-") || id === "1-2-1-3-1";
}

function hasFrontThree(id: string): boolean {
  return ["3-2-3", "2-3-3", "1-2-1-3-1"].includes(id);
}

function hasTwoCms(id: string): boolean {
  return ["3-2-3", "3-2-2-1", "4-2-2", "2-4-2", "3-4-1", "2-3-2-1", "2-1-4-1"].includes(id);
}

function mix(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return Math.abs(h);
}

function pick<T>(list: T[], seed: string): T {
  return list[mix(seed) % list.length];
}

const BULL = [
  "Be a Raging Bull. Make a difference.",
  "Go on like a Raging Bull and change this game.",
  "Step on as a Raging Bull — energy first, then quality.",
  "Make a difference. Be the Bull they cannot live with.",
  "When you go on, be a Raging Bull. Leave nothing out there.",
];

const MOTTO = [
  `${MOTTO_LATIN} — ${MOTTO_EN}.`,
  `Remember: ${MOTTO_EN}.`,
  `${MOTTO_EN}. That is us.`,
  `${MOTTO_LATIN}. Wear it.`,
];

function tacticsFor(bands: Band[], formationId: string, seed: string): string {
  const threeBack = isBackThree(formationId);
  const threeUp = hasFrontThree(formationId);
  const twoMids = hasTwoCms(formationId);
  const lines: string[] = [];

  if (bands.includes("gk")) {
    lines.push(
      pick(
        [
          "In goal: FA law, 5 seconds to release. Organise the box.",
          "Keeper: corners and the centre show, open body. You pick short or long.",
        ],
        seed + "gk",
      ),
    );
  }
  if (bands.includes("back") || bands.includes("wb") || bands.includes("any")) {
    if (threeBack) {
      lines.push(
        pick(
          [
            "At the back this week: wing-backs can overlap, two must stay. Speed and power.",
            "Three at the back: overlap if you are a wing-back, two stay, sweeper only comes if it is safe.",
            "Back three this week — compact without the ball, two stay when one wing-back goes.",
          ],
          seed + "back",
        ),
      );
    } else {
      lines.push(
        pick(
          [
            "At the back: stay compact, win first balls, then second balls. Speed and power.",
            "Defending: show them wide, no free shots, hunt the second ball.",
          ],
          seed + "back2",
        ),
      );
    }
  }
  if (bands.includes("mid") || bands.includes("any")) {
    lines.push(
      pick(
        [
          twoMids
            ? "In midfield: power. Rotate CAM and CDM, stay central, shoot if it is on."
            : "In midfield: power. Win first balls, then second balls, break the lines if it is safe.",
          "Middle of the park: compact without it, expand with it. If you are running in space, sprint with the ball.",
          "Centre-mid: first ball, second ball, simple if you have to, brave if you can.",
        ],
        seed + "mid",
      ),
    );
  }
  if (bands.includes("wide") || bands.includes("fwd") || bands.includes("any")) {
    if (threeBack || threeUp) {
      lines.push(
        pick(
          [
            "Wide / up front: you are a forward / winger. Speed. When the wing-back goes, drop and let them overlap.",
            "Front: stretch them, press with the 9, drop when the wing-back overlaps.",
            "Up the sides: speed. Press their kicks. If you have space, sprint with the ball.",
          ],
          seed + "wide",
        ),
      );
    } else {
      lines.push(
        pick(
          [
            "Up front and wide: speed. Press, stretch, finish. If you have space, sprint with the ball.",
            "Attacking: occupy their back, first thought is the net, press from the front.",
          ],
          seed + "fwd",
        ),
      );
    }
  }
  return lines.join(" ");
}

export function mixedSubTalk(player: string, formationId: string, salt: string): TalkBits {
  const role = playerRole(player);
  const seed = `${salt}|${player}|${formationId}|sub`;
  const tactics = tacticsFor(role.bands, formationId, seed);
  return {
    duty: `${subYouLine(player)} ${tactics} ${pick(BULL, seed + "b")} ${pick(MOTTO, seed + "m")}`,
    withBall: "",
    withoutBall: "",
  };
}

export function mixedStarterTalk(
  player: string,
  slotId: string,
  formationId: string,
  role: TalkBits,
  salt: string,
): TalkBits {
  const seed = `${salt}|${player}|${slotId}|${formationId}`;
  const label = SLOT_NAMES[slotId] || slotId;
  const band = slotBand(slotId);
  const tactics = tacticsFor([band], formationId, seed);
  const you = youLine(player, slotId, label);
  return {
    duty: `${you} ${role.duty} ${tactics}`,
    withBall: `${role.withBall} ${pick(BULL, seed + "b")}`,
    withoutBall: role.withoutBall,
  };
}

export function newTalkSalt(): string {
  return String(Date.now());
}
