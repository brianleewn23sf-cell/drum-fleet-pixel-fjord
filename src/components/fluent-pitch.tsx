"use client";

import { memo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";
import { KitGraphic } from "@/components/kit-graphic";
import { PlayerPicker } from "@/components/player-picker";
import {
  FORMATIONS,
  INJURED_SLOTS,
  RESERVE_SLOTS,
  SUB_SLOTS,
  UNAVAILABLE_SLOTS,
  formationById,
  type KitId,
} from "@/lib/formations";
import { parsePlayer, pitchSurname, PLAYERS } from "@/lib/players";
import { cn } from "@/lib/utils";

type DragState = {
  from: string;
  pointerId: number;
  startX: number;
  startY: number;
  active: boolean;
};

export const FluentPitch = memo(function FluentPitch({
  formation,
  lineup,
  kit,
  players,
  onFormation,
  onDrop,
  onPlace,
  disabled = false,
  minutes,
}: {
  formation: string;
  lineup: Record<string, string>;
  kit: KitId;
  players: string[];
  onFormation: (id: string) => void;
  onDrop: (fromSlot: string, toSlot: string) => void;
  onPlace?: (slotId: string, player: string) => void;
  disabled?: boolean;
  minutes?: Record<string, number>;
}) {
  const squad = players.length ? players : [...PLAYERS];
  const shape = formationById(formation);
  const taken = Object.values(lineup).filter(Boolean);
  const drag = useRef<DragState | null>(null);
  const [ghost, setGhost] = useState<{ player: string; x: number; y: number; from: string } | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [pickSlot, setPickSlot] = useState<string | null>(null);

  const subs = SUB_SLOTS.map((id, i) => ({ id, label: `Sub ${i + 1}` }));
  const reserves = RESERVE_SLOTS.map((id, i) => ({ id, label: `Res ${i + 1}` }));
  const injured = INJURED_SLOTS.map((id, i) => ({ id, label: `Inj ${i + 1}` }));
  const unavailable = UNAVAILABLE_SLOTS.map((id, i) => ({ id, label: `Out ${i + 1}` }));

  function slotAt(x: number, y: number) {
    const el = document.elementFromPoint(x, y);
    const zone = el?.closest?.("[data-pitch-slot]") as HTMLElement | null;
    return zone?.dataset.pitchSlot || null;
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>, slotId: string) {
    if (disabled) return;
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      from: slotId,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      active: false,
    };
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const player = lineup[d.from];
    if (!player) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.active && dx * dx + dy * dy < 64) return;
    d.active = true;
    e.preventDefault();
    setGhost({ player, x: e.clientX, y: e.clientY, from: d.from });
    const next = slotAt(e.clientX, e.clientY);
    setOver(next && next !== d.from ? next : null);
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    drag.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // already released
    }
    if (d.active) {
      const to = slotAt(e.clientX, e.clientY);
      if (to && to !== d.from) onDrop(d.from, to);
      setGhost(null);
      setOver(null);
      return;
    }
    setGhost(null);
    setOver(null);
    setPickSlot(d.from);
  }

  function shirt(slotId: string, label: string) {
    const lad = lineup[slotId] ?? "";
    const dragging = ghost?.from === slotId;
    return (
      <div
        data-pitch-slot={slotId}
        onPointerDown={(e) => onPointerDown(e, slotId)}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn(
          "flex min-h-16 min-w-14 touch-none select-none flex-col items-center justify-center",
          over === slotId ? "rounded-lg ring-2 ring-yellow-300" : "",
          dragging ? "opacity-40" : "",
          disabled ? "pointer-events-none opacity-60" : "cursor-grab",
        )}
      >
        {lad ? (
          <>
            <KitGraphic kit={kit} number={parsePlayer(lad).num || undefined} />
            <span className="max-w-[4.6rem] text-center font-display text-[10px] font-bold uppercase leading-tight tracking-wide text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              {pitchSurname(lad, squad)}
            </span>
            {minutes?.[lad] !== undefined ? (
              <span className="text-xs text-white [text-shadow:_0_1px_2px_#000]">{minutes[lad]}′</span>
            ) : null}
          </>
        ) : (
          <span className="rounded-md border border-white/50 bg-black/25 px-1.5 py-1 text-center text-[10px] font-bold uppercase tracking-wide text-white">
            {label}
          </span>
        )}
      </div>
    );
  }

  function benchRow(title: string, slots: { id: string; label: string }[]) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-fg">{title}</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className={cn(
                "flex min-h-24 flex-col items-center justify-center rounded-lg border-2 bg-elevated px-1 py-2",
                over === slot.id ? "border-yellow-300" : "border-border",
              )}
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">{slot.label}</p>
              {shirt(slot.id, slot.label)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pickLad = pickSlot ? lineup[pickSlot] ?? "" : "";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1">
        {FORMATIONS.map((f) => (
          <button
            key={f.id}
            type="button"
            disabled={disabled}
            onClick={() => onFormation(f.id)}
            className={cn(
              "h-10 shrink-0 rounded-md px-3 text-xs font-semibold uppercase tracking-wide",
              f.id === formation ? "bg-[#b42318] text-white" : "border border-border bg-bg text-muted",
            )}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="relative overflow-visible rounded-xl border-2 border-white/25 bg-ok">
        <PitchGrass />
        <div className="absolute inset-x-[5%] top-[8%] bottom-0">
          {shape.slots.map((slot) => (
            <div
              key={slot.id}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            >
              {shirt(slot.id, slot.label)}
            </div>
          ))}
        </div>
      </div>

      {benchRow("Subs", subs)}
      {benchRow("Reserves", reserves)}
      {benchRow("Injured", injured)}
      {benchRow("Unavailable", unavailable)}
      <p className="text-xs text-muted">Slide a shirt to swap. Tap a shirt to pick a player.</p>

      {pickSlot ? (
        <PlayerPicker
          hideTrigger
          open
          kit={kit}
          label={pickSlot}
          value={pickLad}
          onChange={(next) => {
            onPlace?.(pickSlot, next);
            setPickSlot(null);
          }}
          onOpenChange={(next) => {
            if (!next) setPickSlot(null);
          }}
          players={squad}
          exclude={taken.filter((p) => p !== pickLad)}
          placeholder="Select player…"
        />
      ) : null}

      {ghost && typeof document !== "undefined"
        ? createPortal(
            <div
              className="pointer-events-none fixed z-[80] -translate-x-1/2 -translate-y-1/2"
              style={{ left: ghost.x, top: ghost.y }}
            >
              <div className="flex flex-col items-center drop-shadow-lg">
                <KitGraphic kit={kit} number={parsePlayer(ghost.player).num || undefined} />
                <span className="font-display text-[10px] font-bold uppercase text-white [text-shadow:_-1px_-1px_0_#000,_1px_1px_0_#000]">
                  {pitchSurname(ghost.player, squad)}
                </span>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
});

function PitchGrass() {
  return (
    <svg viewBox="0 0 70 105" className="block w-full text-fg" aria-hidden="true">
      <rect x="0" y="0" width="70" height="105" className="fill-ok" />
      <rect x="2" y="2" width="66" height="101" fill="none" stroke="currentColor" strokeWidth="0.7" />
      <line x1="2" y1="52.5" x2="68" y2="52.5" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="35" cy="52.5" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="35" cy="52.5" r="0.7" fill="currentColor" />
      <rect x="18" y="2" width="34" height="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="18" y="89" width="34" height="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
    </svg>
  );
}
