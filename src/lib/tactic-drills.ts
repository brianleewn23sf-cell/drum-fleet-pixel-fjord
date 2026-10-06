import { FORMATIONS, type PitchSlot } from "@/lib/formations";

export type Spot = { x: number; y: number };

export type DrillFrame = {
  t: number;
  ball: Spot;
  spots: Record<string, Spot>;
  doing: string;
  expect: string;
};

export type DrillKind = "tactic" | "training";

export type Drill = {
  id: string;
  title: string;
  formation: string;
  kind: DrillKind;
  family: string;
  frames: DrillFrame[];
};

function clamp(spot: Spot): Spot {
  return {
    x: Math.min(90, Math.max(10, spot.x)),
    y: Math.min(90, Math.max(10, spot.y)),
  };
}

function split(slots: PitchSlot[]) {
  const gk = slots.find((slot) => slot.id === "GK") ?? slots[0]!;
  const out = slots.filter((slot) => slot !== gk);
  let backs = out.filter((slot) => slot.y >= 64).sort((a, b) => a.x - b.x);
  let forwards = out.filter((slot) => slot.y <= 36).sort((a, b) => a.x - b.x);
  let mids = out.filter((slot) => slot.y > 36 && slot.y < 64).sort((a, b) => a.x - b.x);
  if (!forwards.length) {
    forwards = [...out].sort((a, b) => a.y - b.y).slice(0, 2);
    const ids = new Set(forwards.map((slot) => slot.id));
    backs = backs.filter((slot) => !ids.has(slot.id));
    mids = mids.filter((slot) => !ids.has(slot.id));
  }
  if (!mids.length && backs.length > 2) mids = [backs.pop()!].sort((a, b) => a.x - b.x);
  return { gk, backs, mids, forwards };
}

function homeOf(slots: PitchSlot[]): Record<string, Spot> {
  return Object.fromEntries(slots.map((slot) => [slot.id, { x: slot.x, y: slot.y }]));
}

function nudge(home: Record<string, Spot>, shifts: Array<[PitchSlot | undefined, number, number]>): Record<string, Spot> {
  const next = { ...home };
  for (const [slot, dx, dy] of shifts) {
    if (!slot) continue;
    const from = home[slot.id];
    if (!from) continue;
    next[slot.id] = clamp({ x: from.x + dx, y: from.y + dy });
  }
  return next;
}

function at(slot: PitchSlot | undefined, dx = 0, dy = 0): Spot {
  if (!slot) return { x: 50, y: 50 };
  return clamp({ x: slot.x + dx, y: slot.y + dy });
}

function left(line: PitchSlot[]) {
  return line[0];
}
function right(line: PitchSlot[]) {
  return line[line.length - 1];
}
function middle(line: PitchSlot[]) {
  if (!line.length) return undefined;
  return line[Math.floor((line.length - 1) / 2)];
}

function step(
  t: number,
  ball: Spot,
  doing: string,
  expect: string,
  spots: Record<string, Spot>,
): DrillFrame {
  return { t, ball, doing, expect, spots };
}

function moves(formationId: string, name: string, slots: PitchSlot[]): Drill[] {
  const { gk, backs, mids, forwards } = split(slots);
  const home = homeOf(slots);
  const bL = left(backs);
  const bR = right(backs);
  const bM = middle(backs);
  const mL = left(mids);
  const mR = right(mids);
  const mM = middle(mids);
  const fL = left(forwards);
  const fR = right(forwards);
  const fM = middle(forwards);
  const pivot = mM ?? bM ?? fM;

  const make = (
    family: string,
    title: string,
    kind: DrillKind,
    frames: DrillFrame[],
  ): Drill => ({
    id: `${formationId}-${family}`,
    title,
    formation: formationId,
    kind,
    family,
    frames,
  });

  return [
    make("shape", "Our shape", "tactic", [
      step(0, at(pivot), `This is ${name}. Nine players, one picture.`, "Stay in your shirt. If you leave it, someone fills it.", home),
      step(6, at(pivot, 0, -4), "Look again. This is where we start when we have the ball.", "Head up before it arrives. First touch away from pressure.", home),
    ]),
    make("build", "Play out", "tactic", [
      step(
        0,
        at(gk, 0, -2),
        "Keeper has it. We do not boot it.",
        "Back line splits. One midfielder shows for the ball.",
        nudge(home, [
          [bL, -8, 2],
          [bR, 8, 2],
          [pivot, 0, 8],
        ]),
      ),
      step(
        3,
        at(bL, 2, 0),
        "Open body. Simple pass into the spare player.",
        "If they press you, play the way you are facing.",
        nudge(home, [
          [bL, -6, 0],
          [mL, -4, 6],
          [pivot, -6, 4],
        ]),
      ),
      step(
        6,
        at(pivot, 0, 2),
        "We are facing their goal. Now we can play.",
        "Scan before it arrives. Forward if it is on.",
        nudge(home, [
          [pivot, 0, 2],
          [mL, -2, -4],
          [fL, 0, -4],
        ]),
      ),
    ]),
    make("third", "Third man", "tactic", [
      step(0, at(mL ?? fL), "Short pass. The third player is already moving.", "Do not stand and watch the pass.", home),
      step(
        3,
        at(pivot),
        "Bounce it. The runner goes the other side of the defender.",
        "One touch if you can. Then look for the runner.",
        nudge(home, [
          [fL, 6, 4],
          [pivot, -4, 0],
        ]),
      ),
      step(
        6,
        at(fL, 8, 2),
        "Third man gets it in space.",
        "First touch forward. That is the point of the move.",
        nudge(home, [
          [fL, 10, -2],
          [fR ?? fM, -4, -4],
          [pivot, 4, -4],
        ]),
      ),
    ]),
    make("switch", "Switch it", "tactic", [
      step(
        0,
        at(mR ?? fR),
        "They have all come to this side. The other side is empty.",
        "Do not force it into the crowd.",
        nudge(home, [
          [mR, 4, 0],
          [fR, 4, 0],
        ]),
      ),
      step(3.5, at(pivot), "One pass inside. Now look across.", "The switch is one pass, not five.", home),
      step(
        7,
        at(mL ?? fL, -2, -4),
        "Far side is free. Attack that space.",
        "Stay wide until the ball is on its way. Then go.",
        nudge(home, [
          [mL, -4, -6],
          [fL, -4, -6],
          [pivot, -8, -2],
        ]),
      ),
    ]),
    make("press", "Press trigger", "tactic", [
      step(0, { x: 82, y: 28 }, "Bad touch on their right. That is the trigger.", "Nearest player goes. Nobody else dives in.", home),
      step(
        3,
        { x: 78, y: 30 },
        "We jump. The rest slide so they cannot play through us.",
        "Bend the run. Show them the line.",
        nudge(home, [
          [mR ?? fR, 8, -6],
          [fR, 6, -4],
          [pivot, 8, -2],
          [mL, 10, 0],
          [bL, 8, 0],
          [bR, 6, 0],
        ]),
      ),
      step(
        6,
        { x: 74, y: 32 },
        "We win it. The press is finished.",
        "First pass forward, then back in shape.",
        nudge(home, [
          [mR ?? fR, 4, -4],
          [pivot, 4, -2],
        ]),
      ),
    ]),
    make("counter", "Counter", "tactic", [
      step(0, at(bM ?? gk), "We win it at the back. Go now.", "One pass forward. Do not turn back.", home),
      step(
        3,
        at(fM ?? fL, 0, 6),
        "Strikers run in behind. One midfielder joins.",
        "If you are not in the attack, hold your shirt.",
        nudge(home, [
          [fL, -4, -8],
          [fR, 4, -8],
          [fM, 0, -8],
          [pivot, 0, -10],
        ]),
      ),
      step(
        6,
        at(fR ?? fM, 0, -6),
        "Finish, or set the player who is free.",
        "Then we are a team again. Get back in the picture.",
        nudge(home, [
          [fR ?? fM, 2, -8],
          [fL, -2, -4],
          [pivot, 4, -6],
        ]),
      ),
    ]),
    make("rondo", "Rondo", "training", [
      step(
        0,
        { x: 38, y: 46 },
        "Training. Four players, one in the middle. Keep the ball.",
        "Two touches. Move it before they get close.",
        nudge(home, [
          [mL ?? fL, 0, 8],
          [mR ?? fR, 0, 8],
          [pivot, 0, 6],
          [fM ?? fL, 0, 16],
        ]),
      ),
      step(
        3,
        { x: 62, y: 46 },
        "Play around the jockey. Talk.",
        "Play to the man they are not facing.",
        nudge(home, [
          [pivot, 4, 4],
        ]),
      ),
      step(
        6,
        { x: 50, y: 58 },
        "Same rondo. Stay sharp.",
        "If you give it away, you go in the middle.",
        home,
      ),
    ]),
    make("wave", "Finishing wave", "training", [
      step(0, at(mL ?? bL), "Wave. Ball starts wide. Strikers start the run now.", "Do not wait for the cross. Arrive as it arrives.", home),
      step(
        3,
        at(fL, -2, 2),
        "Wide player. Look at the box before you cross.",
        "Near post and far post. Not two on the same spot.",
        nudge(home, [
          [fL, -4, -2],
          [fM, -6, -6],
          [fR, 4, -4],
          [pivot, -8, -8],
        ]),
      ),
      step(
        6,
        at(fR ?? fM, 0, -6),
        "Finish. Then the next wave sets up.",
        "Hit the target. Then jog back in shape.",
        nudge(home, [
          [fR ?? fM, 0, -8],
          [fL, 4, -4],
          [pivot, 0, -6],
        ]),
      ),
    ]),
    make("recover", "Win it back", "training", [
      step(0, { x: 70, y: 24 }, "We just lost it. Five seconds to recover.", "Nearest player delays. The rest sprint.", home),
      step(
        3,
        { x: 66, y: 36 },
        "Two stay up. Everyone else gets goal side.",
        "Run back, do not walk. Protect the middle.",
        nudge(home, [
          [fL, 0, 8],
          [fM, 0, 6],
          [mL, 6, 8],
          [mR, -4, 6],
          [pivot, 0, 8],
          [fR, -6, 4],
        ]),
      ),
      step(
        6,
        at(bM ?? gk, 0, -4),
        "Shape is back. Now we can win it and play.",
        "This is the training habit for every game.",
        home,
      ),
    ]),
  ];
}

export const TACTIC_DRILLS: Drill[] = FORMATIONS.flatMap((formation) =>
  moves(formation.id, formation.name, formation.slots),
);

export function drillsFor(formationId: string): Drill[] {
  return TACTIC_DRILLS.filter((drill) => drill.formation === formationId);
}

export function drillDuration(drill: Drill): number {
  return drill.frames[drill.frames.length - 1]?.t ?? 0;
}

function mix(a: number, b: number, k: number) {
  return a + (b - a) * k;
}

export function sampleDrill(drill: Drill, time: number): DrillFrame {
  const frames = drill.frames;
  const t = Math.max(0, Math.min(time, drillDuration(drill)));
  let i = 0;
  while (i < frames.length - 1 && frames[i + 1]!.t < t) i += 1;
  const a = frames[i]!;
  const b = frames[Math.min(i + 1, frames.length - 1)]!;
  const span = b.t - a.t;
  const k = span <= 0 ? 0 : Math.min(1, Math.max(0, (t - a.t) / span));
  const spots: Record<string, Spot> = {};
  for (const id of Object.keys(a.spots)) {
    const from = a.spots[id]!;
    const to = b.spots[id] ?? from;
    spots[id] = { x: mix(from.x, to.x, k), y: mix(from.y, to.y, k) };
  }
  return {
    t,
    ball: { x: mix(a.ball.x, b.ball.x, k), y: mix(a.ball.y, b.ball.y, k) },
    spots,
    doing: k < 0.45 ? a.doing : b.doing,
    expect: k < 0.45 ? a.expect : b.expect,
  };
}
