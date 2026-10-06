"use client";

import { SUB_SLOTS, formationById } from "@/lib/formations";
import { isKeeper } from "@/lib/player-roles";
import { shortName } from "@/lib/players";
import { cn } from "@/lib/utils";

type Row = { minutes: number; started: boolean; on: boolean };

export function EqualTime({
  formation,
  lineup,
  mins,
  minute,
}: {
  formation: string;
  lineup: Record<string, string>;
  mins: Record<string, Row>;
  minute: number;
}) {
  const pitchSlots = formationById(formation).slots.filter((s) => s.id !== "GK").length;
  const names = new Set<string>();
  for (const slot of formationById(formation).slots) {
    if (lineup[slot.id]) names.add(lineup[slot.id]);
  }
  for (const id of SUB_SLOTS) {
    if (lineup[id]) names.add(lineup[id]);
  }
  for (const player of Object.keys(mins)) names.add(player);

  const keepers = [...names].filter((p) => isKeeper(p));
  const outfield = [...names].filter((p) => !isKeeper(p));
  const target =
    outfield.length && minute > 0 ? Math.round((pitchSlots * minute) / outfield.length) : 0;

  const ranked = outfield
    .map((player) => {
      const row = mins[player] ?? { minutes: 0, started: false, on: false };
      return { player, ...row, gap: row.minutes - target };
    })
    .sort((a, b) => a.minutes - b.minutes || a.player.localeCompare(b.player));

  const takeOff = ranked.filter((r) => r.on && r.gap >= 3).sort((a, b) => b.gap - a.gap)[0];
  const bringOn = ranked.filter((r) => !r.on && r.gap <= -3).sort((a, b) => a.gap - b.gap)[0];
  const maxMin = Math.max(target, ...ranked.map((r) => r.minutes), 1);

  return (
    <div className="rounded-xl border border-ok bg-elevated p-3">
      <p className="font-display text-lg font-bold uppercase tracking-tight">Fair game time</p>
      <p className="mb-2 text-xs text-muted">
        At least half a game each, where possible. Keepers play the full game. A good attitude helps us share minutes fairly.
        {target > 0 ? ` Target now ${target}′.` : " Starts when the clock runs."}
      </p>

      {keepers.length ? (
        <ul className="mb-3">
          {keepers.map((player) => {
            const row = mins[player];
            return (
              <li
                key={player}
                className="flex items-center justify-between rounded-md bg-bg px-2 py-2 text-sm"
              >
                <span className="font-semibold">
                  {shortName(player)} · keeper
                </span>
                <span className="text-xs font-bold uppercase tracking-wide text-ok">
                  Full game{row?.minutes ? ` · ${row.minutes}′` : ""}
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {takeOff || bringOn ? (
        <p className="mb-2 rounded-md border border-accent px-2 py-2 text-sm font-semibold">
          {bringOn ? `Bring on ${shortName(bringOn.player)}` : "Hold"}
          {takeOff ? ` · take off ${shortName(takeOff.player)}` : ""}
        </p>
      ) : (
        <p className="mb-2 text-sm text-muted">Times look even.</p>
      )}

      <ul className="flex flex-col gap-2">
        {ranked.map((row) => (
          <li key={row.player}>
            <div className="mb-0.5 flex items-center justify-between text-sm">
              <span>
                {shortName(row.player)}
                {row.on ? " · on" : " · off"}
              </span>
              <span className="font-semibold">
                {row.minutes}′{target ? ` / ${target}′` : ""}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-bg">
              <div
                className={cn(
                  "h-full rounded-full",
                  row.gap >= 3 ? "bg-accent" : row.gap <= -3 ? "bg-ok" : "bg-fg",
                )}
                style={{ width: `${Math.min(100, (row.minutes / maxMin) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
