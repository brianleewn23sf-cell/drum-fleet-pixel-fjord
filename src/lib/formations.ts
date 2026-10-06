export type PitchSlot = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type Formation = {
  id: string;
  name: string;
  slots: PitchSlot[];
};

const gk = (y = 94): PitchSlot => ({ id: "GK", label: "GK", x: 50, y });

export const FORMATIONS: Formation[] = [
  {
    id: "3-3-2",
    name: "3-3-2",
    slots: [
      gk(),
      { id: "LB", label: "LB", x: 18, y: 73 },
      { id: "CB", label: "CB", x: 50, y: 76 },
      { id: "RB", label: "RB", x: 82, y: 73 },
      { id: "LM", label: "LM", x: 18, y: 50 },
      { id: "CM", label: "CM", x: 50, y: 52 },
      { id: "RM", label: "RM", x: 82, y: 50 },
      { id: "LS", label: "LS", x: 34, y: 22 },
      { id: "RS", label: "RS", x: 66, y: 22 },
    ],
  },
  {
    id: "3-2-3",
    name: "3-2-3",
    slots: [
      gk(),
      { id: "LB", label: "LB", x: 18, y: 73 },
      { id: "CB", label: "CB", x: 50, y: 76 },
      { id: "RB", label: "RB", x: 82, y: 73 },
      { id: "LCM", label: "LCM", x: 34, y: 52 },
      { id: "RCM", label: "RCM", x: 66, y: 52 },
      { id: "LW", label: "LW", x: 16, y: 22 },
      { id: "ST", label: "ST", x: 50, y: 20 },
      { id: "RW", label: "RW", x: 84, y: 22 },
    ],
  },
  {
    id: "2-3-3",
    name: "2-3-3",
    slots: [
      gk(),
      { id: "LCB", label: "LCB", x: 32, y: 74 },
      { id: "RCB", label: "RCB", x: 68, y: 74 },
      { id: "LM", label: "LM", x: 16, y: 50 },
      { id: "CM", label: "CM", x: 50, y: 52 },
      { id: "RM", label: "RM", x: 84, y: 50 },
      { id: "LW", label: "LW", x: 16, y: 22 },
      { id: "ST", label: "ST", x: 50, y: 20 },
      { id: "RW", label: "RW", x: 84, y: 22 },
    ],
  },
  {
    id: "2-4-2",
    name: "2-4-2",
    slots: [
      gk(),
      { id: "LCB", label: "LCB", x: 32, y: 74 },
      { id: "RCB", label: "RCB", x: 68, y: 74 },
      { id: "LM", label: "LM", x: 14, y: 50 },
      { id: "LCM", label: "LCM", x: 36, y: 54 },
      { id: "RCM", label: "RCM", x: 64, y: 54 },
      { id: "RM", label: "RM", x: 86, y: 50 },
      { id: "LS", label: "LS", x: 34, y: 22 },
      { id: "RS", label: "RS", x: 66, y: 22 },
    ],
  },
  {
    id: "3-4-1",
    name: "3-4-1",
    slots: [
      gk(),
      { id: "LB", label: "LB", x: 18, y: 73 },
      { id: "CB", label: "CB", x: 50, y: 76 },
      { id: "RB", label: "RB", x: 82, y: 73 },
      { id: "LM", label: "LM", x: 14, y: 48 },
      { id: "LCM", label: "LCM", x: 36, y: 50 },
      { id: "RCM", label: "RCM", x: 64, y: 50 },
      { id: "RM", label: "RM", x: 86, y: 48 },
      { id: "ST", label: "ST", x: 50, y: 20 },
    ],
  },
  {
    id: "4-3-1",
    name: "4-3-1",
    slots: [
      gk(),
      { id: "LB", label: "LB", x: 16, y: 72 },
      { id: "LCB", label: "LCB", x: 36, y: 76 },
      { id: "RCB", label: "RCB", x: 64, y: 76 },
      { id: "RB", label: "RB", x: 84, y: 72 },
      { id: "LM", label: "LM", x: 28, y: 48 },
      { id: "CM", label: "CM", x: 50, y: 50 },
      { id: "RM", label: "RM", x: 72, y: 48 },
      { id: "ST", label: "ST", x: 50, y: 20 },
    ],
  },
  {
    id: "4-2-2",
    name: "4-2-2",
    slots: [
      gk(),
      { id: "LB", label: "LB", x: 16, y: 72 },
      { id: "LCB", label: "LCB", x: 36, y: 76 },
      { id: "RCB", label: "RCB", x: 64, y: 76 },
      { id: "RB", label: "RB", x: 84, y: 72 },
      { id: "LCM", label: "LCM", x: 34, y: 48 },
      { id: "RCM", label: "RCM", x: 66, y: 48 },
      { id: "LS", label: "LS", x: 34, y: 22 },
      { id: "RS", label: "RS", x: 66, y: 22 },
    ],
  },
  {
    id: "3-2-2-1",
    name: "3-2-2-1",
    slots: [
      gk(),
      { id: "LB", label: "LB", x: 18, y: 74 },
      { id: "CB", label: "CB", x: 50, y: 76 },
      { id: "RB", label: "RB", x: 82, y: 74 },
      { id: "LDM", label: "LDM", x: 34, y: 56 },
      { id: "RDM", label: "RDM", x: 66, y: 56 },
      { id: "LAM", label: "LAM", x: 30, y: 34 },
      { id: "RAM", label: "RAM", x: 70, y: 34 },
      { id: "ST", label: "ST", x: 50, y: 20 },
    ],
  },
  {
    id: "2-3-2-1",
    name: "2-3-2-1",
    slots: [
      gk(),
      { id: "LCB", label: "LCB", x: 32, y: 74 },
      { id: "RCB", label: "RCB", x: 68, y: 74 },
      { id: "LM", label: "LM", x: 16, y: 52 },
      { id: "CM", label: "CM", x: 50, y: 54 },
      { id: "RM", label: "RM", x: 84, y: 52 },
      { id: "LAM", label: "LAM", x: 30, y: 32 },
      { id: "RAM", label: "RAM", x: 70, y: 32 },
      { id: "ST", label: "ST", x: 50, y: 20 },
    ],
  },
  {
    id: "2-1-4-1",
    name: "2-1-4-1",
    slots: [
      gk(),
      { id: "LCB", label: "LCB", x: 32, y: 74 },
      { id: "RCB", label: "RCB", x: 68, y: 74 },
      { id: "CDM", label: "CDM", x: 50, y: 56 },
      { id: "LM", label: "LM", x: 14, y: 42 },
      { id: "LCM", label: "LCM", x: 36, y: 44 },
      { id: "RCM", label: "RCM", x: 64, y: 44 },
      { id: "RM", label: "RM", x: 86, y: 42 },
      { id: "ST", label: "ST", x: 50, y: 20 },
    ],
  },
  {
    id: "2-1-3-2",
    name: "2-1-3-2",
    slots: [
      gk(),
      { id: "LCB", label: "LCB", x: 32, y: 74 },
      { id: "RCB", label: "RCB", x: 68, y: 74 },
      { id: "CDM", label: "CDM", x: 50, y: 56 },
      { id: "LM", label: "LM", x: 16, y: 40 },
      { id: "CM", label: "CM", x: 50, y: 42 },
      { id: "RM", label: "RM", x: 84, y: 40 },
      { id: "LS", label: "LS", x: 34, y: 20 },
      { id: "RS", label: "RS", x: 66, y: 20 },
    ],
  },
  {
    id: "1-2-1-3-1",
    name: "1-2-1-3-1",
    slots: [
      gk(),
      { id: "CB", label: "CB", x: 50, y: 78 },
      { id: "LB", label: "LB", x: 18, y: 68 },
      { id: "RB", label: "RB", x: 82, y: 68 },
      { id: "CDM", label: "CDM", x: 50, y: 54 },
      { id: "LW", label: "LW", x: 16, y: 32 },
      { id: "CAM", label: "CAM", x: 50, y: 34 },
      { id: "RW", label: "RW", x: 84, y: 32 },
      { id: "ST", label: "ST", x: 50, y: 20 },
    ],
  },
];

export const DEFAULT_FORMATION = "3-3-2";

export function formationById(id: string): Formation {
  return FORMATIONS.find((f) => f.id === id) ?? FORMATIONS[0];
}

export type KitId = "home" | "away";

export const SUB_SLOTS = ["SUB1", "SUB2", "SUB3", "SUB4", "SUB5"] as const;
export const RESERVE_SLOTS = ["RES1", "RES2", "RES3", "RES4"] as const;
export const INJURED_SLOTS = ["INJ1", "INJ2", "INJ3"] as const;
export const UNAVAILABLE_SLOTS = ["OUT1", "OUT2", "OUT3", "OUT4"] as const;
export const BENCH_SLOTS = [
  ...SUB_SLOTS,
  ...RESERVE_SLOTS,
  ...INJURED_SLOTS,
  ...UNAVAILABLE_SLOTS,
] as const;

export const SLOT_NAMES: Record<string, string> = {
  GK: "goalkeeper",
  CB: "centre-back",
  LCB: "left centre-back",
  RCB: "right centre-back",
  LB: "left-back",
  RB: "right-back",
  CDM: "holding mid",
  LDM: "left holding mid",
  RDM: "right holding mid",
  CM: "centre-mid",
  LCM: "left centre-mid",
  RCM: "right centre-mid",
  LM: "left mid",
  RM: "right mid",
  CAM: "attacking mid",
  LAM: "left attacking mid",
  RAM: "right attacking mid",
  LW: "left wing",
  RW: "right wing",
  ST: "centre-forward",
  LS: "left striker",
  RS: "right striker",
};

export type PitchBoard = {
  pitchNo: number;
  formation: string;
  lineup: Record<string, string>;
  kit: KitId;
};

const ALL_PITCH_IDS = new Set(FORMATIONS.flatMap((f) => f.slots.map((s) => s.id)));

export function remapLineup(
  lineup: Record<string, string>,
  nextId: string,
  prevId?: string,
): Record<string, string> {
  const nextSlots = formationById(nextId).slots;
  const prevSlots = formationById(prevId || nextId).slots;
  const seen = new Set<string>();
  const onPitch: string[] = [];

  for (const slot of prevSlots) {
    const player = lineup[slot.id];
    if (player && !seen.has(player)) {
      onPitch.push(player);
      seen.add(player);
    }
  }
  for (const [key, player] of Object.entries(lineup)) {
    if (!player || seen.has(player) || !ALL_PITCH_IDS.has(key)) continue;
    onPitch.push(player);
    seen.add(player);
  }

  const next: Record<string, string> = {};
  const placed = new Set<string>();
  nextSlots.forEach((slot, i) => {
    const player = onPitch[i];
    if (player) {
      next[slot.id] = player;
      placed.add(player);
    }
  });

  for (const key of BENCH_SLOTS) {
    const player = lineup[key];
    if (player && !placed.has(player)) {
      next[key] = player;
      placed.add(player);
    }
  }

  for (const player of onPitch) {
    if (placed.has(player)) continue;
    const empty = BENCH_SLOTS.find((key) => !next[key]);
    if (empty) {
      next[empty] = player;
      placed.add(player);
    }
  }

  return next;
}
