"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { FORMATIONS, formationById, type PitchSlot } from "@/lib/formations";
import { PLAYERS, pitchSurname, publicName } from "@/lib/players";
import { TACTIC_DRILLS, drillDuration, drillsFor, sampleDrill, type Drill } from "@/lib/tactic-drills";
import { cn } from "@/lib/utils";

const STORE = "bulls-tactic-v1";

const STARTING: Record<string, string> = {
  GK: "13) Zachary Read (GK)",
  LCB: "3) Ruben Biddiss",
  RCB: "66) Max Shaw",
  CDM: "4) Louie Biddiss",
  LM: "20) Archie Almond",
  CM: "14) Henry Bearman",
  RM: "5) Kody Cox",
  LS: "22) William Brittain",
  RS: "30) Isa Ali",
};

const ORDER = ["GK", "LCB", "RCB", "CDM", "LM", "CM", "RM", "LS", "RS"];

const OPP_SHAPE = [
  { x: 50, y: 8 },
  { x: 22, y: 16 },
  { x: 50, y: 14 },
  { x: 78, y: 16 },
  { x: 18, y: 26 },
  { x: 50, y: 28 },
  { x: 82, y: 26 },
  { x: 36, y: 38 },
  { x: 64, y: 38 },
];

type Piece = { id: string; team: "us" | "opp"; x: number; y: number };
type Spot = { x: number; y: number };

function fitUs(spot: Spot): Spot {
  const y = 50 + ((Math.min(94, Math.max(8, spot.y)) - 8) / 86) * 42;
  return { x: spot.x, y };
}

function defaultName(slot: PitchSlot, index: number) {
  return STARTING[slot.id] ?? STARTING[ORDER[index] ?? ""] ?? PLAYERS[index] ?? "Player";
}

function layoutOpp(): Piece[] {
  return OPP_SHAPE.map((spot, index) => ({ id: `opp-${index + 1}`, team: "opp", ...spot }));
}

function layoutUs(slots: PitchSlot[], names: string[]): Piece[] {
  return slots.map((slot, index) => ({
    id: names[index] || defaultName(slot, index),
    team: "us",
    ...fitUs(slot),
  }));
}

function spotFor(
  slot: PitchSlot,
  index: number,
  live: Record<string, Spot> | null,
  fallback: PitchSlot,
) {
  if (!live) return { x: fallback.x, y: fallback.y };
  return live[slot.id] ?? live[ORDER[index] ?? ""] ?? { x: fallback.x, y: fallback.y };
}

function along(lines: { x1: number; y1: number; x2: number; y2: number }[], t: number): Spot {
  const count = Math.max(1, lines.length);
  const scaled = Math.min(0.999, Math.max(0, t)) * count;
  const index = Math.min(count - 1, Math.floor(scaled));
  const step = scaled - index;
  const line = lines[index]!;
  return {
    x: line.x1 + (line.x2 - line.x1) * step,
    y: line.y1 + (line.y2 - line.y1) * step,
  };
}

function isGear(mark: Mark): mark is GearMark {
  return mark.kind !== "text" && mark.kind !== "pass" && mark.kind !== "run" && mark.kind !== "dribble";
}

function isPath(mark: Mark): mark is Extract<Mark, { kind: "run" | "dribble" }> {
  return mark.kind === "run" || mark.kind === "dribble";
}

function shirtNo(id: string) {
  if (id.startsWith("opp-")) return id.slice(4);
  return id.match(/^(\d+)/)?.[1] ?? "";
}

type Drag = {
  player: string;
  from: string | null;
  team: "us" | "opp";
  x: number;
  y: number;
  moved: boolean;
};

type LineKind = "pass" | "run" | "dribble";
type InkColor = "white" | "gold" | "red";

type GearKind = "cone" | "ball" | "goal" | "mannequin" | "pole" | "hurdle" | "ladder" | "hoop" | "zone";

type Mark =
  | { id: string; kind: GearKind; x: number; y: number }
  | { id: string; kind: "bib"; x: number; y: number; color: "red" | "yellow" | "blue" }
  | { id: string; kind: "text"; x: number; y: number; text: string }
  | { id: string; kind: "pass"; x1: number; y1: number; x2: number; y2: number; runner?: string; color?: InkColor }
  | { id: string; kind: "run"; x1: number; y1: number; x2: number; y2: number; runner?: string; color?: InkColor }
  | { id: string; kind: "dribble"; x1: number; y1: number; x2: number; y2: number; runner?: string; color?: InkColor };

type GearMark = Extract<Mark, { kind: GearKind | "bib" }>;

type Tool = "move" | "highlight" | GearKind | "bib" | "pass" | "run" | "dribble" | "text" | "rub";

const TOOLS: { id: Tool; label: string }[] = [
  { id: "move", label: "Move" },
  { id: "highlight", label: "Highlight" },
  { id: "cone", label: "Cone" },
  { id: "ball", label: "Ball" },
  { id: "bib", label: "Bib" },
  { id: "goal", label: "Goal" },
  { id: "mannequin", label: "Mannequin" },
  { id: "pole", label: "Pole" },
  { id: "hurdle", label: "Hurdle" },
  { id: "ladder", label: "Ladder" },
  { id: "hoop", label: "Hoop" },
  { id: "zone", label: "Zone" },
  { id: "pass", label: "Pass" },
  { id: "run", label: "Run line" },
  { id: "dribble", label: "Dribble" },
  { id: "text", label: "Text" },
  { id: "rub", label: "Rub out" },
];

type Snap = {
  pieces: Piece[];
  ball: Spot;
  gear: GearMark[];
};

function loadSaved(): { formation: string; lineup: Record<string, string>; marks: Mark[]; pieces?: Piece[]; ball?: Spot } | null {
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      formation?: string;
      lineup?: Record<string, string>;
      marks?: Mark[];
      pieces?: Piece[];
      ball?: Spot;
    };
    if (!parsed.lineup && !parsed.pieces) return null;
    return {
      formation: parsed.formation || "2-1-3-2",
      lineup: parsed.lineup ?? {},
      marks: Array.isArray(parsed.marks) ? parsed.marks : [],
      pieces: Array.isArray(parsed.pieces) ? parsed.pieces : undefined,
      ball: parsed.ball,
    };
  } catch {
    return null;
  }
}

export function TacticBoard() {
  const pitchRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Drag | null>(null);
  const skipSave = useRef(true);

  const [formationId, setFormationId] = useState("2-1-3-2");
  const [pieces, setPieces] = useState<Piece[]>(() => {
    const shape = formationById("2-1-3-2");
    return [...layoutUs(shape.slots, shape.slots.map(defaultName)), ...layoutOpp()];
  });
  const [ball, setBall] = useState<Spot>({ x: 50, y: 72 });
  const [drillId, setDrillId] = useState("2-1-3-2-shape");
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [drawTime, setDrawTime] = useState(0);
  const [drawPlaying, setDrawPlaying] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [tool, setTool] = useState<Tool>("move");
  const [bibColor, setBibColor] = useState<"red" | "yellow" | "blue">("red");
  const [marks, setMarks] = useState<Mark[]>([]);
  const [ink, setInk] = useState<Extract<Mark, { kind: LineKind }> | null>(null);
  const [inkColor, setInkColor] = useState<InkColor>("white");
  const [pitchView, setPitchView] = useState<"full" | "blank" | "half">("full");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [frames, setFrames] = useState<Snap[]>([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [frameTime, setFrameTime] = useState(0);
  const [framePlaying, setFramePlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [labelAt, setLabelAt] = useState<Spot | null>(null);
  const [labelText, setLabelText] = useState("");
  const [full, setFull] = useState(false);
  const [session, setSession] = useState<"match" | "training">("match");
  const [showBall, setShowBall] = useState(true);

  const formation = formationById(formationId);
  const drill = TACTIC_DRILLS.find((item) => item.id === drillId) ?? drillsFor(formationId)[0] ?? TACTIC_DRILLS[0]!;
  const tactics = drillsFor(formationId).filter((item) => item.kind === "tactic");
  const training = drillsFor(formationId).filter((item) => item.kind === "training");
  const duration = drillDuration(drill);
  const live = useMemo(() => sampleDrill(drill, time), [drill, time]);
  const followDrill = drill.formation === formationId;
  const usOn = pieces.filter((piece) => piece.team === "us");
  const bench = PLAYERS.filter((player) => !pieces.some((piece) => piece.id === player));
  const oppOff = Array.from({ length: 9 }, (_, index) => `opp-${index + 1}`).filter(
    (id) => !pieces.some((piece) => piece.id === id),
  );
  const runLines = marks.filter((mark): mark is Extract<Mark, { kind: "run" | "dribble" }> => isPath(mark) && Boolean(mark.runner));
  const passLines = marks.filter((mark): mark is Extract<Mark, { kind: "pass" }> => mark.kind === "pass");
  const hasDraw = runLines.length + passLines.length > 0;
  const marksRef = useRef(marks);
  marksRef.current = marks;

  useEffect(() => {
    const saved = loadSaved();
    if (saved) {
      setFormationId(saved.formation);
      setMarks(saved.marks);
      if (saved.ball) setBall(saved.ball);
      if (Array.isArray(saved.pieces)) {
        const stillHere = new Set<string>(PLAYERS);
        const kept = saved.pieces.filter((piece) => piece.team === "opp" || stillHere.has(piece.id));
        setPieces(kept);
        if (!kept.length) {
          setSession("training");
          setShowBall(false);
        }
      } else {
        const shape = formationById(saved.formation);
        const names = shape.slots.map((slot, index) => saved.lineup[slot.id] || defaultName(slot, index));
        setPieces([...layoutUs(shape.slots, names), ...layoutOpp()]);
      }
      setDrillId(drillsFor(saved.formation)[0]?.id ?? "2-1-3-2-shape");
    }
  }, []);

  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    localStorage.setItem(STORE, JSON.stringify({ formation: formationId, pieces, marks, ball }));
  }, [formationId, pieces, marks, ball]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTime((current) => {
        const next = current + dt;
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, duration]);

  useEffect(() => {
    if (!drawPlaying) return;
    let frame = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setDrawTime((current) => {
        const next = current + dt / 6;
        if (next >= 1) {
          setDrawPlaying(false);
          const drawn = marksRef.current;
          setPieces((list) =>
            list.map((piece) => {
              const mine = drawn.filter((mark): mark is Extract<Mark, { kind: "run" | "dribble" }> => isPath(mark) && mark.runner === piece.id);
              const end = mine[mine.length - 1];
              return end ? { ...piece, x: end.x2, y: end.y2 } : piece;
            }),
          );
          const passes = drawn.filter((mark): mark is Extract<Mark, { kind: "pass" }> => mark.kind === "pass");
          const endPass = passes[passes.length - 1];
          if (endPass) setBall({ x: endPass.x2, y: endPass.y2 });
          return 0;
        }
        return next;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [drawPlaying]);

  useEffect(() => {
    if (!frames.length || framePlaying) return;
    setFrames((current) => {
      const snap = current[frameIndex];
      if (!snap) return current;
      const gear = marks.filter(isGear);
      const same =
        JSON.stringify(snap.pieces) === JSON.stringify(pieces) &&
        JSON.stringify(snap.ball) === JSON.stringify(ball) &&
        JSON.stringify(snap.gear) === JSON.stringify(gear);
      if (same) return current;
      return current.map((item, index) => (index === frameIndex ? { pieces, ball, gear } : item));
    });
  }, [pieces, ball, marks, frameIndex, framePlaying, frames.length]);

  useEffect(() => {
    if (!framePlaying) return;
    let frame = 0;
    let last = performance.now();
    const total = Math.max(1, frames.length - 1) * (2.4 / speed);
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setFrameTime((current) => {
        const next = current + dt / total;
        if (next >= 1) {
          setFramePlaying(false);
          const lastSnap = frames[frames.length - 1];
          if (lastSnap) {
            setFrameIndex(frames.length - 1);
            setPieces(lastSnap.pieces);
            setBall(lastSnap.ball);
            setMarks((list) => [...list.filter((mark) => !isGear(mark)), ...lastSnap.gear]);
          }
          return 0;
        }
        return next;
      });
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [framePlaying, frames, speed]);

  function chooseFormation(id: string) {
    if (id === formationId) return;
    const next = formationById(id);
    const family = drill.family;
    const same = drillsFor(id).find((item) => item.family === family) ?? drillsFor(id)[0];
    setPlaying(false);
    setDrawPlaying(false);
    setDrawTime(0);
    setTime(0);
    if (session !== "training") {
      setPieces((current) => {
        const names = current.filter((piece) => piece.team === "us").map((piece) => piece.id);
        const opp = current.filter((piece) => piece.team === "opp");
        return [...layoutUs(next.slots, names), ...(opp.length ? opp : layoutOpp())];
      });
    }
    setFormationId(id);
    if (same) setDrillId(same.id);
  }

  function goFull() {
    setFull(true);
  }

  function exitFull() {
    setFull(false);
  }

  function chooseDrill(next: Drill) {
    if (session !== "training" && next.formation !== formationId) {
      const shape = formationById(next.formation);
      setPieces((current) => {
        const names = current.filter((piece) => piece.team === "us").map((piece) => piece.id);
        const opp = current.filter((piece) => piece.team === "opp");
        return [...layoutUs(shape.slots, names), ...(opp.length ? opp : layoutOpp())];
      });
      setFormationId(next.formation);
    }
    setDrillId(next.id);
    setTime(0);
    setPlaying(false);
    setDrawPlaying(false);
    setDrawTime(0);
  }

  function nearestRunner(x: number, y: number) {
    let best: string | undefined;
    let bestDist = 14;
    for (const piece of pieces) {
      const dist = Math.hypot(piece.x - x, piece.y - y);
      if (dist < bestDist) {
        best = piece.id;
        bestDist = dist;
      }
    }
    const ballDist = Math.hypot(ball.x - x, ball.y - y);
    if (ballDist < bestDist) return "ball";
    return best;
  }

  function frameBlend() {
    const span = Math.max(1, frames.length - 1);
    const scaled = Math.min(0.999, Math.max(0, frameTime)) * span;
    const index = Math.min(span - 1, Math.floor(scaled));
    return { index, step: scaled - index };
  }

  const framing = frames.length > 1 && (framePlaying || frameTime > 0);

  function framedSpot(id: string, fallback: Spot, read: (snap: Snap) => Spot | undefined) {
    if (!framing) return fallback;
    const { index, step } = frameBlend();
    const from = read(frames[index]!);
    const to = read(frames[index + 1] ?? frames[index]!);
    if (!from || !to) return fallback;
    return { x: from.x + (to.x - from.x) * step, y: from.y + (to.y - from.y) * step };
  }

  function shown(piece: Piece): Spot {
    const mine = marks.filter((mark): mark is Extract<Mark, { kind: "run" | "dribble" }> => isPath(mark) && mark.runner === piece.id);
    if (mine.length && (drawPlaying || drawTime > 0)) return along(mine, drawTime);
    if (piece.team === "us" && followDrill && (playing || time > 0) && !drawPlaying) {
      const index = usOn.indexOf(piece);
      const slot = formation.slots[index];
      if (slot) return fitUs(spotFor(slot, index, live.spots, slot));
    }
    return piece;
  }

  const ballShown = framedSpot("ball", (() => {
    if (passLines.length && (drawPlaying || drawTime > 0)) return along(passLines, drawTime);
    if (followDrill && (playing || time > 0) && !drawPlaying && !framing) return fitUs(live.ball);
    return ball;
  })(), (snap) => snap.ball);

  function beginDrag(event: React.PointerEvent, player: string, from: string | null, team: "us" | "opp") {
    if (tool === "highlight") {
      event.preventDefault();
      event.stopPropagation();
      setHighlights((list) => (list.includes(player) ? list.filter((id) => id !== player) : [...list, player]));
      return;
    }
    if (tool !== "move" || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const next: Drag = { player, from, team, x: event.clientX, y: event.clientY, moved: false };
    dragRef.current = next;
    setDrag(next);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function beginGear(event: React.PointerEvent, id: string) {
    if (tool === "rub") {
      event.stopPropagation();
      setMarks((list) => list.filter((mark) => mark.id !== id));
      return;
    }
    if (tool !== "move" || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const next: Drag = { player: id, from: "gear", team: "us", x: event.clientX, y: event.clientY, moved: false };
    dragRef.current = next;
    setDrag(next);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: React.PointerEvent) {
    const current = dragRef.current;
    if (!current) return;
    const moved = current.moved || Math.hypot(event.clientX - current.x, event.clientY - current.y) > 6;
    const point = pitchPoint(event);
    const next = { ...current, x: event.clientX, y: event.clientY, moved };
    dragRef.current = next;
    setDrag(next);
    if (!moved || !current.from) return;
    if (current.from === "gear") {
      setMarks((list) =>
        list.map((mark) => (mark.id === current.player && mark.kind !== "pass" && mark.kind !== "run" ? { ...mark, ...point } : mark)),
      );
      return;
    }
    if (current.player === "ball") {
      setBall(point);
      return;
    }
    setPieces((list) => list.map((piece) => (piece.id === current.player ? { ...piece, ...point } : piece)));
  }

  function endDrag(event: React.PointerEvent) {
    const current = dragRef.current;
    dragRef.current = null;
    setDrag(null);
    if (!current) return;
    if (!current.moved) {
      if (current.from === "gear" || current.player === "ball") return;
      setPicked((name) => (name === current.player ? null : current.player));
      return;
    }
    const hit = document.elementFromPoint(event.clientX, event.clientY);
    const inside = Boolean(pitchRef.current?.contains(hit as Node));
    if (current.from === "gear") {
      if (!inside) setMarks((list) => list.filter((mark) => mark.id !== current.player));
      return;
    }
    if (current.player === "ball") return;
    if (current.from) {
      if (!inside) setPieces((list) => list.filter((piece) => piece.id !== current.player));
      return;
    }
    if (!inside) return;
    const point = pitchPoint(event);
    setPieces((list) => [
      ...list.filter((piece) => piece.id !== current.player),
      { id: current.player, team: current.team, ...point },
    ]);
    setPicked(null);
  }

  function pitchPoint(event: { clientX: number; clientY: number }) {
    const box = pitchRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return { x: 50, y: 50 };
    return {
      x: Math.min(98, Math.max(2, ((event.clientX - box.left) / box.width) * 100)),
      y: Math.min(98, Math.max(2, ((event.clientY - box.top) / box.height) * 100)),
    };
  }

  function rubAt(point: { x: number; y: number }) {
    setMarks((current) => {
      let best = -1;
      let bestDist = 8;
      current.forEach((mark, index) => {
        const spot = isGear(mark) ? mark : null;
        const dist = spot
          ? Math.hypot(spot.x - point.x, spot.y - point.y)
          : mark.kind === "pass" || mark.kind === "run" || mark.kind === "dribble"
            ? Math.hypot((mark.x1 + mark.x2) / 2 - point.x, (mark.y1 + mark.y2) / 2 - point.y)
            : 99;
        if (dist < bestDist) {
          best = index;
          bestDist = dist;
        }
      });
      if (best < 0) return current;
      return current.filter((_, index) => index !== best);
    });
  }

  function onPitchDown(event: React.PointerEvent) {
    const onButton = Boolean((event.target as HTMLElement).closest("button"));
    if (onButton && tool !== "run" && tool !== "pass" && tool !== "dribble") return;
    if (tool === "move") {
      if (picked) {
        const point = pitchPoint(event);
        const team = picked.startsWith("opp-") ? "opp" : "us";
        setPieces((list) => [...list.filter((piece) => piece.id !== picked), { id: picked, team, ...point }]);
        setPicked(null);
      }
      return;
    }
    const point = pitchPoint(event);
    if (tool === "cone" || tool === "ball" || tool === "goal" || tool === "mannequin" || tool === "pole" || tool === "hurdle" || tool === "ladder" || tool === "hoop" || tool === "zone") {
      setMarks((current) => [...current, { id: crypto.randomUUID(), kind: tool, ...point }]);
      return;
    }
    if (tool === "bib") {
      const color = bibColor;
      setMarks((current) => [...current, { id: crypto.randomUUID(), kind: "bib", color, ...point }]);
      setBibColor(color === "red" ? "yellow" : color === "yellow" ? "blue" : "red");
      return;
    }
    if (tool === "text") {
      setLabelAt(point);
      setLabelText("");
      return;
    }
    if (tool === "rub") {
      rubAt(point);
      return;
    }
    if (tool !== "pass" && tool !== "run" && tool !== "dribble") return;
    setInk({ id: "ink", kind: tool, x1: point.x, y1: point.y, x2: point.x, y2: point.y, color: inkColor });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPitchMove(event: React.PointerEvent) {
    if (!ink) return;
    const point = pitchPoint(event);
    setInk({ ...ink, x2: point.x, y2: point.y });
  }

  function onPitchUp() {
    if (!ink) return;
    const drawn = ink;
    setInk(null);
    if (Math.hypot(drawn.x2 - drawn.x1, drawn.y2 - drawn.y1) < 4) return;
    const runner = drawn.kind === "run" || drawn.kind === "dribble" ? nearestRunner(drawn.x1, drawn.y1) : undefined;
    setMarks((current) => [...current, { ...drawn, id: crypto.randomUUID(), runner, color: inkColor }]);
  }

  function showFrame(index: number) {
    const snap = frames[index];
    if (!snap) return;
    setFramePlaying(false);
    setFrameTime(0);
    setFrameIndex(index);
    setPieces(snap.pieces);
    setBall(snap.ball);
    setMarks((current) => [...current.filter((mark) => !isGear(mark)), ...snap.gear]);
  }

  function addFrame() {
    setPlaying(false);
    setDrawPlaying(false);
    setFramePlaying(false);
    setFrameTime(0);
    const gear = marks.filter(isGear);
    const now: Snap = { pieces, ball, gear };
    setFrames((current) => {
      const next = current.length ? [...current, structuredClone(now)] : [structuredClone(now), structuredClone(now)];
      setFrameIndex(next.length - 1);
      return next;
    });
  }

  function removeFrame() {
    setFramePlaying(false);
    setFrameTime(0);
    setFrames((current) => {
      if (current.length < 2) return [];
      const next = current.filter((_, index) => index !== frameIndex);
      const index = Math.max(0, Math.min(frameIndex, next.length - 1) - (frameIndex > 0 ? 1 : 0));
      const snap = next[index];
      setFrameIndex(index);
      if (snap) {
        setPieces(snap.pieces);
        setBall(snap.ball);
        setMarks((list) => [...list.filter((mark) => !isGear(mark)), ...snap.gear]);
      }
      return next;
    });
  }

  function gearOnPitch() {
    if (!framing) return marks.filter(isGear);
    const { index, step } = frameBlend();
    const ids = [...new Set(frames.flatMap((snap) => snap.gear.map((item) => item.id)))];
    return ids.flatMap((id) => {
      const from = frames[index]?.gear.find((item) => item.id === id);
      const to = (frames[index + 1] ?? frames[index])?.gear.find((item) => item.id === id) ?? from;
      if (!from || !to) return [];
      return [{ ...from, x: from.x + (to.x - from.x) * step, y: from.y + (to.y - from.y) * step }];
    });
  }

  function startTraining() {
    setSession("training");
    setPlaying(false);
    setDrawPlaying(false);
    setFramePlaying(false);
    setTime(0);
    setDrawTime(0);
    setFrameTime(0);
    setPieces([]);
    setMarks([]);
    setFrames([]);
    setFrameIndex(0);
    setInk(null);
    setHighlights([]);
    setShowBall(false);
    setTool("move");
  }

  function backToMatch() {
    const shape = formationById(formationId);
    setSession("match");
    setShowBall(true);
    setPlaying(false);
    setDrawPlaying(false);
    setFramePlaying(false);
    setTime(0);
    setDrawTime(0);
    setFrameTime(0);
    setMarks([]);
    setFrames([]);
    setFrameIndex(0);
    setPieces([...layoutUs(shape.slots, shape.slots.map(defaultName)), ...layoutOpp()]);
  }

  function commitLabel() {
    const text = labelText.trim().slice(0, 32);
    if (labelAt && text) {
      setMarks((current) => [...current, { id: crypto.randomUUID(), kind: "text", x: labelAt.x, y: labelAt.y, text }]);
    }
    setLabelAt(null);
    setLabelText("");
  }

  return (
    <div
      ref={stageRef}
      className={cn("flex flex-col gap-3", full && "fixed inset-0 z-50 overflow-y-auto bg-bg p-3 [&>*]:shrink-0")}
    >
      {full ? (
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-bg py-1">
          <p className="text-sm font-semibold uppercase tracking-wide">{drill.title}</p>
          <button
            type="button"
            onClick={exitFull}
            className="h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide"
          >
            Exit
          </button>
        </div>
      ) : null}
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          {session === "training" ? "Training session" : "Before training"}
        </p>
        <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
          {session === "training" ? "Blank pitch" : drill.title}
        </h2>
        <p className="mt-3 text-base leading-snug text-fg">
          {session === "training"
            ? "This is not a game. The pitch starts empty. Drag players on only if the drill needs them."
            : playing || time > 0
              ? live.doing
              : drill.frames[0]!.doing}
        </p>
        {session === "match" ? (
          <p className="mt-2 text-sm leading-snug text-muted">
            What I expect: {playing || time > 0 ? live.expect : drill.frames[0]!.expect}
          </p>
        ) : null}
      </section>

      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Tactics</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tactics.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseDrill(item)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              item.id === drill.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-muted">Training</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={startTraining}
          className={cn(
            "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
            session === "training" ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg",
          )}
        >
          Start training
        </button>
        {session === "training" ? (
          <button
            type="button"
            onClick={backToMatch}
            className="h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide"
          >
            Back to match
          </button>
        ) : null}
        {training.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseDrill(item)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              item.id === drill.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg",
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FORMATIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => chooseFormation(item.id)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              item.id === formationId ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg",
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {TOOLS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTool(item.id)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              tool === item.id ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg",
            )}
          >
            {item.label}
            {item.id === "bib" && tool === "bib" ? ` · ${bibColor}` : ""}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setMarks([])}
          className="h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide text-muted"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={() => {
            setTool("cone");
            goFull();
          }}
          className="h-11 shrink-0 rounded-md bg-accent px-3 text-sm font-semibold uppercase tracking-wide text-accent-fg"
        >
          Training screen
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(["full", "blank", "half"] as const).map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setPitchView(view)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              pitchView === view ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg",
            )}
          >
            {view === "full" ? "Full pitch" : view === "blank" ? "Blank" : "Half pitch"}
          </button>
        ))}
        {(["white", "gold", "red"] as const).map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`${color} line`}
            onClick={() => setInkColor(color)}
            className={cn(
              "size-11 shrink-0 rounded-md border-2",
              color === "white" && "bg-fg",
              color === "gold" && "bg-kit-gold",
              color === "red" && "bg-kit-red",
              inkColor === color ? "border-accent" : "border-border",
            )}
          />
        ))}
      </div>

      <div
        ref={pitchRef}
        onPointerDown={onPitchDown}
        onPointerMove={onPitchMove}
        onPointerUp={onPitchUp}
        className={cn(
          "relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl bg-pitch shadow-panel",
        )}
        style={{ touchAction: "none" }}
      >
        <div className="pointer-events-none absolute inset-0">
          {pitchView === "blank" ? (
            <div className="absolute inset-3 border-2 border-pitch-line/40" />
          ) : (
            <>
              <div className="absolute inset-x-0 top-0 h-1/2 bg-pitch-deep/35" />
              <div className="absolute inset-3 border-2 border-pitch-line" />
              {pitchView === "half" ? (
                <>
                  <div className="absolute inset-x-3 top-[12%] h-0.5 bg-pitch-line" />
                  <div className="absolute inset-x-[22%] bottom-3 h-[16%] border-2 border-b-0 border-pitch-line" />
                </>
              ) : (
                <>
                  <div className="absolute inset-x-3 top-1/2 h-0.5 -translate-y-1/2 bg-pitch-line" />
                  <div className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pitch-line" />
                  <div className="absolute inset-x-[22%] top-3 h-[16%] border-2 border-t-0 border-pitch-line" />
                  <div className="absolute inset-x-[22%] bottom-3 h-[16%] border-2 border-b-0 border-pitch-line" />
                </>
              )}
            </>
          )}
        </div>

        <BoardInk marks={ink ? [...marks, ink] : marks} />
        {gearOnPitch().map((mark) => (
            <button
              key={mark.id}
              type="button"
              aria-label={mark.kind}
              onPointerDown={(event) => beginGear(event, mark.id)}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
            >
              <GearIcon mark={mark} />
            </button>
          ))}

        {marks
          .filter((mark): mark is Extract<Mark, { kind: "text" }> => mark.kind === "text")
          .map((mark) => (
            <span
              key={mark.id}
              className="pointer-events-none absolute z-20 max-w-28 -translate-x-1/2 rounded-sm bg-bg/90 px-1.5 py-0.5 text-xs font-bold uppercase text-fg"
              style={{ left: `${mark.x}%`, top: `${mark.y}%` }}
            >
              {mark.text}
            </span>
          ))}

        {labelAt ? (
          <input
            autoFocus
            value={labelText}
            aria-label="Pitch note"
            onChange={(event) => setLabelText(event.target.value)}
            onBlur={commitLabel}
            onKeyDown={(event) => {
              if (event.key === "Enter") event.currentTarget.blur();
            }}
            onPointerDown={(event) => event.stopPropagation()}
            className="absolute z-40 h-11 w-28 -translate-x-1/2 rounded-md border border-border bg-bg px-2 text-sm text-fg"
            style={{ left: `${labelAt.x}%`, top: `${labelAt.y}%` }}
          />
        ) : null}

        {pieces.map((piece) => {
          const spot = framedSpot(piece.id, shown(piece), (snap) => snap.pieces.find((item) => item.id === piece.id));
          const active = picked === piece.id;
          return (
            <div
              key={piece.id}
              className="absolute z-10"
              style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <button
                type="button"
                onPointerDown={(event) => beginDrag(event, piece.id, piece.id, piece.team)}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className={cn("flex min-h-11 min-w-11 flex-col items-center", drag?.player === piece.id && drag.moved && "opacity-40")}
              >
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border-2 font-display text-lg font-bold leading-none",
                    piece.team === "us" ? "border-kit-black bg-kit-red text-kit-black" : "border-kit-black bg-opp text-kit-black",
                    active && "ring-2 ring-fg",
                    highlights.includes(piece.id) && "ring-4 ring-fg",
                  )}
                >
                  {shirtNo(piece.id)}
                </span>
                <span className="mt-1 max-w-20 truncate rounded-sm bg-bg/80 px-1 text-xs font-semibold uppercase text-fg">
                  {piece.team === "us" ? pitchSurname(piece.id, PLAYERS) : "Opp"}
                </span>
              </button>
            </div>
          );
        })}

        <button
          type="button"
          aria-label="Ball"
          onPointerDown={(event) => beginDrag(event, "ball", "ball", "us")}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className={cn("absolute z-20 size-5 rounded-full border-2 border-kit-black bg-fg", !showBall && "hidden")}
          style={{ left: `${ballShown.x}%`, top: `${ballShown.y}%`, transform: "translate(-50%, -50%)" }}
        />
        {full ? null : (
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={goFull}
            className="absolute right-2 top-2 z-30 h-11 rounded-md bg-bg px-3 text-xs font-semibold uppercase tracking-wide text-fg"
          >
            Full screen
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={playing || drawPlaying || framePlaying ? "Pause" : "Play"}
          onClick={() => {
            if (frames.length > 1) {
              setPlaying(false);
              setDrawPlaying(false);
              if (frameTime >= 1) setFrameTime(0);
              setFramePlaying((on) => !on);
              return;
            }
            if (hasDraw) {
              if (drawTime >= 1) setDrawTime(0);
              setPlaying(false);
              setDrawPlaying((on) => !on);
              return;
            }
            if (time >= duration) setTime(0);
            setDrawPlaying(false);
            setPlaying((on) => !on);
          }}
          className="flex size-12 shrink-0 items-center justify-center rounded-md bg-accent text-accent-fg"
        >
          {playing || drawPlaying || framePlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
        </button>
        <button
          type="button"
          aria-label="Restart"
          onClick={() => {
            setPlaying(false);
            setDrawPlaying(false);
            setFramePlaying(false);
            setTime(0);
            setDrawTime(0);
            setFrameTime(0);
            if (frames[0]) showFrame(0);
          }}
          className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-fg"
        >
          <RotateCcw className="size-5" />
        </button>
        <input
          aria-label="Drill time"
          type="range"
          min={0}
          max={frames.length > 1 || hasDraw ? 1 : duration}
          step={0.01}
          value={frames.length > 1 ? frameTime : hasDraw ? drawTime : time}
          onChange={(event) => {
            const next = Number(event.target.value);
            setPlaying(false);
            setDrawPlaying(false);
            setFramePlaying(false);
            if (frames.length > 1) setFrameTime(next);
            else if (hasDraw) setDrawTime(next);
            else setTime(next);
          }}
          className="h-11 w-full accent-accent"
          suppressHydrationWarning
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {frames.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => showFrame(index)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              index === frameIndex ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg",
            )}
          >
            Frame {index + 1}
          </button>
        ))}
        <button
          type="button"
          onClick={addFrame}
          className="h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide"
        >
          + Frame
        </button>
        {frames.length > 1 ? (
          <button
            type="button"
            onClick={removeFrame}
            className="h-11 shrink-0 rounded-md border border-border bg-surface px-3 text-sm font-semibold uppercase tracking-wide text-muted"
          >
            Remove
          </button>
        ) : null}
        {([
          ["Slow", 0.6],
          ["Normal", 1],
          ["Fast", 1.6],
        ] as const).map(([label, value]) => (
          <button
            key={label}
            type="button"
            onClick={() => setSpeed(value)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-sm font-semibold uppercase tracking-wide",
              speed === value ? "bg-kit-navy text-kit-navy-fg" : "border border-border bg-surface text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-sm text-muted">Add a frame, move the players, then press play. Lines can be straight, a run, or a dribble.</p>

      <section data-bench className="rounded-xl border border-border bg-surface p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
          {session === "training"
            ? "Players are optional. Drag a name on, or leave the pitch blank."
            : "Squad in red. Drag a name anywhere on the pitch."}
        </p>
        <div className="flex flex-wrap gap-2">
          {bench.map((player) => (
            <button
              key={player}
              type="button"
              onPointerDown={(event) => beginDrag(event, player, null, "us")}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className={cn(
                "h-11 rounded-md border border-kit-black bg-kit-red px-3 text-sm font-semibold text-kit-black",
                picked === player && "ring-2 ring-fg",
              )}
            >
              {publicName(player)}
            </button>
          ))}
          {!bench.length ? <p className="text-sm text-muted">Everyone is on the pitch.</p> : null}
        </div>
        {session === "match" ? (
          <>
        <p className="mb-2 mt-3 text-xs font-semibold uppercase tracking-widest text-muted">Opposition in yellow</p>
        <div className="flex flex-wrap gap-2">
          {oppOff.map((id) => (
            <button
              key={id}
              type="button"
              onPointerDown={(event) => beginDrag(event, id, null, "opp")}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="h-11 rounded-md border border-kit-black bg-opp px-3 text-sm font-semibold text-kit-black"
            >
              Opp {shirtNo(id)}
            </button>
          ))}
          {!oppOff.length ? <p className="text-sm text-muted">All nine are on the pitch. Drag one off to take them out.</p> : null}
        </div>
          </>
        ) : null}
      </section>

      {drag?.moved && !drag.from ? (
        <div
          className="pointer-events-none fixed z-50 flex flex-col items-center"
          style={{ left: drag.x, top: drag.y, transform: "translate(-50%, -50%)" }}
        >
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-full border-2 border-kit-black font-display text-lg font-bold text-kit-black",
              drag.team === "opp" ? "bg-opp" : "bg-kit-red",
            )}
          >
            {shirtNo(drag.player)}
          </span>
        </div>
      ) : null}
    </div>
  );
}

function inkStroke(color?: InkColor) {
  if (color === "gold") return "var(--color-kit-gold)";
  if (color === "red") return "var(--color-kit-red)";
  return "var(--color-fg)";
}

function wave(x1: number, y1: number, x2: number, y2: number) {
  const steps = 8;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  let path = "";
  for (let index = 0; index <= steps; index += 1) {
    const t = index / steps;
    const wobble = Math.sin(t * Math.PI * 4) * 1.5;
    const x = x1 + dx * t + nx * wobble;
    const y = y1 + dy * t + ny * wobble;
    path += `${index === 0 ? "M" : "L"}${x} ${y} `;
  }
  return path;
}

function arrowHead(x1: number, y1: number, x2: number, y2: number) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 2.4;
  const left = angle + 2.6;
  const right = angle - 2.6;
  return `${x2},${y2} ${x2 + Math.cos(left) * size},${y2 + Math.sin(left) * size} ${x2 + Math.cos(right) * size},${y2 + Math.sin(right) * size}`;
}

function BoardInk({ marks }: { marks: Mark[] }) {
  return (
    <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-20 h-full w-full">
        {marks.map((mark) =>
          mark.kind === "pass" || mark.kind === "run" || mark.kind === "dribble" ? (
            <g key={mark.id}>
              {mark.kind === "dribble" ? (
                <path d={wave(mark.x1, mark.y1, mark.x2, mark.y2)} fill="none" stroke={inkStroke(mark.color)} strokeWidth={0.8} strokeLinecap="round" />
              ) : (
                <line
                  x1={mark.x1}
                  y1={mark.y1}
                  x2={mark.x2}
                  y2={mark.y2}
                  stroke={inkStroke(mark.color ?? (mark.kind === "run" ? "gold" : "white"))}
                  strokeWidth={mark.kind === "run" ? 0.7 : 0.9}
                  strokeDasharray={mark.kind === "run" ? "2.2 1.4" : undefined}
                  strokeLinecap="round"
                />
              )}
              <polygon
                points={arrowHead(mark.x1, mark.y1, mark.x2, mark.y2)}
                fill={inkStroke(mark.color ?? (mark.kind === "run" ? "gold" : "white"))}
              />
            </g>
          ) : null,
        )}
      </svg>
    </>
  );
}

function GearIcon({ mark }: { mark: GearMark }) {
  if (mark.kind === "ball") return <span className="block size-5 rounded-full border-2 border-kit-black bg-fg" />;
  if (mark.kind === "bib") {
    return (
      <span
        className={cn(
          "block h-8 w-6 rounded-sm border-2 border-kit-black",
          mark.color === "red" && "bg-kit-red",
          mark.color === "yellow" && "bg-opp",
          mark.color === "blue" && "bg-kit-navy",
        )}
      />
    );
  }
  if (mark.kind === "goal") return <span className="block h-7 w-14 border-x-4 border-t-4 border-fg" />;
  if (mark.kind === "mannequin") {
    return (
      <span className="flex flex-col items-center">
        <span className="size-3 rounded-full bg-fg" />
        <span className="mt-0.5 h-5 w-3 rounded-sm bg-fg" />
      </span>
    );
  }
  if (mark.kind === "pole") return <span className="block h-10 w-1.5 rounded-full bg-kit-gold" />;
  if (mark.kind === "hurdle") return <span className="block h-6 w-12 border-x-4 border-t-4 border-kit-gold" />;
  if (mark.kind === "ladder") {
    return (
      <span className="flex h-4 w-16 items-center justify-between border-x-2 border-fg px-0.5">
        <span className="h-full w-0.5 bg-fg" />
        <span className="h-full w-0.5 bg-fg" />
        <span className="h-full w-0.5 bg-fg" />
        <span className="h-full w-0.5 bg-fg" />
      </span>
    );
  }
  if (mark.kind === "hoop") return <span className="block size-8 rounded-full border-4 border-kit-gold" />;
  if (mark.kind === "zone") return <span className="block h-16 w-20 rounded-md border-2 border-fg bg-fg/20" />;
  return <span className="block size-4 rounded-full border-2 border-bg bg-kit-gold" />;
}
