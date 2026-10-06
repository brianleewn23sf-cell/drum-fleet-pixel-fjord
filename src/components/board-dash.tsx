import type { ReactNode } from "react";
import { publicName } from "@/lib/players";
import { placeAt } from "@/lib/score-categories";
import { cn } from "@/lib/utils";

export function DashSection({
  eyebrow,
  title,
  note,
  children,
}: {
  eyebrow?: string;
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex flex-col gap-1">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-2xl font-bold uppercase leading-none tracking-tight text-fg">
          {title}
        </h2>
        {note ? <p className="text-sm leading-6 text-muted">{note}</p> : null}
      </header>
      {children}
    </section>
  );
}

export function DashKpi({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold tabular-nums leading-none tracking-tight text-fg">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}

export function RankList({
  rows,
}: {
  rows: { name: string; pts: number; detail?: string }[];
}) {
  const list = rows.filter((r) => r.pts > 0);
  if (!list.length) {
    return <p className="mt-3 text-sm leading-6 text-muted">No points in this table yet.</p>;
  }
  const marks = list.map((r) => r.pts);
  return (
    <ol className="mt-3 divide-y divide-border">
      {list.map((row, i) => (
        <li key={row.name} className="flex items-center justify-between gap-3 py-2.5">
          <span className="flex min-w-0 items-center gap-3">
            <span
              className={cn(
                "w-6 shrink-0 font-display text-xl font-bold tabular-nums",
                i === 0 ? "text-accent" : "text-muted",
              )}
            >
              {placeAt(i, marks)}
            </span>
            <span className="truncate font-medium text-fg">{publicName(row.name)}</span>
          </span>
          <span className="shrink-0 text-right">
            <span className="block font-display text-xl font-bold tabular-nums text-fg">{row.pts}</span>
            {row.detail ? <span className="block text-[11px] tabular-nums text-muted">{row.detail}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}
