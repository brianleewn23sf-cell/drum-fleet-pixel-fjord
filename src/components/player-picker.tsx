"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { parsePlayer, pitchSurname, PLAYERS, shortName } from "@/lib/players";
import type { KitId } from "@/lib/formations";
import { KitGraphic } from "@/components/kit-graphic";
import { cn } from "@/lib/utils";

export function PlayerPicker({
  id,
  label,
  value,
  onChange,
  players,
  exclude,
  placeholder = "Select player…",
  emptyHint = "No players to pick.",
  className,
  compact = false,
  kit,
  hideTrigger = false,
  open,
  onOpenChange,
}: {
  id?: string;
  label?: string;
  value: string;
  onChange: (next: string) => void;
  players: string[];
  exclude?: string[];
  placeholder?: string;
  emptyHint?: string;
  className?: string;
  compact?: boolean;
  kit?: KitId;
  hideTrigger?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const squad = players.length ? players : [...PLAYERS];
  const skip = new Set((exclude || []).filter(Boolean));
  const list = squad.filter((p) => !skip.has(p));
  const [innerOpen, setInnerOpen] = useState(false);
  const openedAt = useRef(0);
  const isOpen = open ?? innerOpen;
  function setIsOpen(next: boolean) {
    if (next) openedAt.current = Date.now();
    if (open === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  }
  function closeSheet() {
    if (Date.now() - openedAt.current < 500) return;
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const shown = value
    ? compact
      ? parsePlayer(value).num
        ? `#${parsePlayer(value).num}`
        : parsePlayer(value).initials
      : shortName(value)
    : placeholder;

  return (
    <>
      {hideTrigger ? null : kit ? (
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn("flex w-14 flex-col items-center gap-0.5 bg-transparent p-0", className)}
        >
          <KitGraphic kit={kit} number={value ? parsePlayer(value).num : undefined} />
          <span className="max-w-[4.6rem] text-center font-display text-[10px] font-bold uppercase leading-tight tracking-wide text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
            {value ? pitchSurname(value, squad) : placeholder}
          </span>
        </button>
      ) : (
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            "flex w-full items-center justify-between gap-1 rounded-md border border-border bg-bg text-left outline-none transition-colors duration-150 focus:border-border-strong focus:ring-2 focus:ring-accent/50",
            compact ? "h-10 min-w-14 max-w-20 px-1.5 text-xs font-semibold" : "h-11 px-3 text-sm",
            value ? "text-fg" : "text-subtle",
            className,
          )}
        >
          <span className="min-w-0 truncate">{shown}</span>
          {compact ? null : <ChevronDown className="size-4 shrink-0 text-muted" />}
        </button>
      )}
      {isOpen && typeof document !== "undefined" && document.body
        ? createPortal(
            <div className="fixed inset-0 z-50 flex flex-col justify-end bg-bg/80">
              <button
                type="button"
                className="min-h-16 flex-1"
                aria-label="Close"
                onClick={closeSheet}
              />
              <div className="max-h-[80dvh] overflow-y-auto rounded-t-xl border border-border bg-surface pb-[max(1rem,env(safe-area-inset-bottom))] shadow-panel">
                <div className="sticky top-0 flex items-center justify-between border-b border-border bg-surface px-4 py-3">
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    {label || placeholder}
                  </p>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-wide text-muted"
                    onClick={closeSheet}
                  >
                    Close
                  </button>
                </div>
                {!list.length ? (
                  <p className="px-4 py-8 text-center text-sm text-muted">{emptyHint}</p>
                ) : (
                  <ul>
                    <li>
                      <button
                        type="button"
                        className="flex h-12 w-full items-center px-4 text-left text-sm text-muted"
                        onClick={() => {
                          onChange("");
                          setIsOpen(false);
                        }}
                      >
                        {placeholder}
                      </button>
                    </li>
                    {list.map((p) => (
                      <li key={p}>
                        <button
                          type="button"
                          className={cn(
                            "flex h-12 w-full items-center border-t border-border px-4 text-left text-sm",
                            value === p ? "bg-accent-soft font-semibold text-fg" : "text-fg",
                          )}
                          onClick={() => {
                            onChange(p);
                            setIsOpen(false);
                          }}
                        >
                          {shortName(p)}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
