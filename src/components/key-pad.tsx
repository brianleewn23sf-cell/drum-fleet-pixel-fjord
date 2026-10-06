"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"] as const;

export function KeyPad({
  onDigit,
  onClear,
  onDelete,
  disabled = false,
}: {
  onDigit: (digit: string) => void;
  onClear: () => void;
  onDelete: () => void;
  disabled?: boolean;
}) {
  const last = useRef({ key: "", at: 0 });

  function fire(key: string, fn: () => void) {
    if (disabled) return;
    const now = Date.now();
    if (last.current.key === key && now - last.current.at < 200) return;
    last.current = { key, at: now };
    fn();
  }

  return (
    <div className="grid grid-cols-3 gap-2" style={{ touchAction: "manipulation" }}>
      {KEYS.map((k) => {
        const action =
          k === "C" ? onClear : k === "⌫" ? onDelete : () => onDigit(k);
        return (
          <button
            key={k}
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-16 select-none items-center justify-center rounded-xl border border-border bg-surface",
              "font-display text-2xl font-bold text-fg",
              "active:bg-accent active:text-accent-fg",
              (k === "C" || k === "⌫") && "text-base tracking-wide text-muted",
            )}
            style={{ touchAction: "manipulation", WebkitUserSelect: "none" }}
            onClick={() => fire(k, action)}
          >
            {k === "C" ? "Clear" : k}
          </button>
        );
      })}
    </div>
  );
}
