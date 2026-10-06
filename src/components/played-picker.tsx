import { shortName } from "@/lib/players";
import { cn } from "@/lib/utils";

export function PlayedPicker({
  players,
  selected,
  onChange,
}: {
  players: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const set = new Set(selected);
  function toggle(name: string) {
    if (set.has(name)) onChange(selected.filter((p) => p !== name));
    else onChange([...selected, name]);
  }
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Who played · {selected.length}/{players.length}
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-accent"
            onClick={() => onChange([...players])}
          >
            All
          </button>
          <button
            type="button"
            className="text-xs font-semibold uppercase tracking-wide text-muted"
            onClick={() => onChange([])}
          >
            None
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1">
        {players.map((p) => {
          const on = set.has(p);
          return (
            <button
              key={p}
              type="button"
              onClick={() => toggle(p)}
              className={cn(
                "flex h-11 items-center rounded-md border px-2 text-left text-sm",
                on
                  ? "border-accent bg-accent-soft font-semibold text-fg"
                  : "border-border bg-elevated text-muted line-through",
              )}
            >
              {shortName(p)}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs leading-snug text-muted">
        Leave blank until after the game. Tick only the lads who played.
      </p>
    </div>
  );
}
