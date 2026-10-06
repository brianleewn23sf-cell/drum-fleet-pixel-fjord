"use client";

import { createPortal } from "react-dom";

export type ScanResult = {
  officialSecs: number;
  technique: number;
  speed: number;
  points: number;
  ageLabel: string;
  feedback: string;
};

export type ScanState = {
  open: boolean;
  player?: string;
  phase: "upload" | "frames" | "timing" | "style" | "done";
  log: string[];
  result?: ScanResult | null;
};

const PHASE: Record<ScanState["phase"], string> = {
  upload: "Uploading clip",
  frames: "Watching the film",
  timing: "Timing start → last cones",
  style: "Marking running style",
  done: "Scan complete",
};

export function ScanClip({ state }: { state: ScanState }) {
  if (!state.open || typeof document === "undefined") return null;
  const who = state.player ? state.player.split(")").pop()?.trim() || "the lad" : "the lad";
  const pct =
    state.phase === "upload" ? 18 : state.phase === "frames" ? 42 : state.phase === "timing" ? 68 : state.phase === "style" ? 88 : 100;

  return createPortal(
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/85 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-zinc-950 p-5 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-red-400">Bulls performance agent</p>
          <span className="size-2 animate-pulse rounded-full bg-red-500" />
        </div>
        <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight">{PHASE[state.phase]}</h3>
        <p className="mt-1 text-sm leading-6 text-white/65">
          Scanning {who}. Clock is GO through the start cones until they pass the last two cones — not how long the camera was on.
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-red-500 transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] leading-5 text-emerald-300">
          {state.log.length ? state.log.map((line, i) => <p key={`${i}-${line}`}>{`> ${line}`}</p>) : <p>{"> waiting…"}</p>}
        </div>
        {state.result ? (
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-lg border border-white/10 bg-white/5 py-2">
              <p className="text-[10px] uppercase tracking-wide text-white/45">Attempt</p>
              <p className="font-display text-lg font-bold">+5</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 py-2">
              <p className="text-[10px] uppercase tracking-wide text-white/45">Time</p>
              <p className="font-display text-lg font-bold">
                {state.result.officialSecs > 0 ? `${state.result.officialSecs.toFixed(2)}s` : "—"}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 py-2">
              <p className="text-[10px] uppercase tracking-wide text-white/45">Style</p>
              <p className="font-display text-lg font-bold">{state.result.technique}/5</p>
            </div>
          </div>
        ) : null}
        {state.result?.feedback ? (
          <p className="mt-3 text-sm leading-6 text-white/80">{state.result.feedback}</p>
        ) : (
          <p className="mt-3 text-xs text-white/40">Age 11 U12 marks. Faster through the last cones scores higher.</p>
        )}
      </div>
    </div>,
    document.body,
  );
}

export const SCAN_OFF: ScanState = { open: false, phase: "upload", log: [] };
