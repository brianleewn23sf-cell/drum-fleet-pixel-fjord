"use client";

import { useEffect, useState } from "react";
import { listParentPresence, type ParentOnline } from "@/lib/parent-presence";

export function ParentsOnline({ pin }: { pin: string }) {
  const [parents, setParents] = useState<ParentOnline[]>([]);
  const [guests, setGuests] = useState(0);
  const ready = pin.trim().length > 0;

  async function load() {
    if (!pin.trim()) return;
    try {
      const res = await listParentPresence({ data: { pin: pin.trim() } });
      if (!res.ok) return;
      setParents(res.parents);
      setGuests(res.guests);
    } catch {
      // keep last
    }
  }

  useEffect(() => {
    if (!ready) return;
    void load();
    const t = setInterval(() => void load(), 8000);
    return () => clearInterval(t);
  }, [pin]);

  if (!ready) {
    return (
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">Parents online</h3>
        <p className="text-sm text-muted">Enter your admin code to see who is on the parent app.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Parents online</h3>
      <p className="mb-3 text-sm text-muted">
        Families who have the app open now. Named when they pick their lad.
      </p>
      {parents.length ? (
        <ul className="flex flex-col gap-2">
          {parents.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2 font-semibold">
                <span className="inline-block size-2.5 rounded-full bg-emerald-400" />
                {p.label}’s parent
              </span>
              <span className="text-xs uppercase tracking-wide text-muted">{p.page || "app"}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No named parents on the app right now.</p>
      )}
      {guests > 0 ? (
        <p className="mt-3 text-sm text-fg">
          {guests} more on the app who have not picked a child yet.
        </p>
      ) : null}
    </section>
  );
}
