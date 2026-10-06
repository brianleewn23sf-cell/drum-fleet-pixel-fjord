"use client";

import { useEffect, useState } from "react";
import { FALLBACK_PIN, listCoachUsers } from "@/lib/coach-users";
import { listParentPresence, listPerfUsers, type ParentOnline } from "@/lib/parent-presence";
import { isDemoName } from "@/lib/demo";
import { parsePlayer } from "@/lib/players";

function pinNow(given: string) {
  const p = given.trim();
  if (p.length >= 4) return p;
  if (typeof window === "undefined") return FALLBACK_PIN;
  return (
    window.sessionStorage.getItem("bulls-coach-pin") ||
    window.localStorage.getItem("bulls-coach-pin") ||
    FALLBACK_PIN
  );
}

export function WhoOnline({ pin }: { pin: string }) {
  const [open, setOpen] = useState(false);
  const [coaches, setCoaches] = useState<{ name: string; role?: string; online?: boolean }[]>([]);
  const [parents, setParents] = useState<ParentOnline[]>([]);
  const [perfLive, setPerfLive] = useState<ParentOnline[]>([]);
  const [perfSigned, setPerfSigned] = useState<string[]>([]);
  const [perfClips, setPerfClips] = useState<{ player: string; at: string }[]>([]);
  const [guests, setGuests] = useState(0);

  async function load() {
    const p = pinNow(pin);
    try {
      const users = await listCoachUsers({ data: { pin: p } });
      if (users.ok) setCoaches(users.users);
    } catch {
      // keep
    }
    try {
      const res = await listParentPresence({ data: { pin: p } });
      if (res.ok) {
        setParents(res.parents.filter((x) => x.page !== "perf"));
        setGuests(res.guests);
      }
    } catch {
      // keep
    }
    try {
      const perf = await listPerfUsers({ data: { pin: p } });
      if (perf.ok) {
        setPerfLive(perf.live);
        setPerfSigned(perf.signedIn);
        setPerfClips(perf.clips);
      }
    } catch {
      // keep
    }
  }

  useEffect(() => {
    void load();
    const t = setInterval(() => void load(), 5000);
    return () => clearInterval(t);
  }, [pin]);

  const onlineCoaches = coaches.filter((c) => c.online);
  const liveCount = onlineCoaches.length + parents.length + guests + perfLive.length;
  const names = [
    ...onlineCoaches.map((c) => c.name),
    ...parents.map((p) => `${parsePlayer(p.label).first}’s parent`),
  ]
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section className="mb-4 rounded-xl border border-accent bg-accent-soft p-3">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold uppercase tracking-tight">Who’s on</h3>
          <p className="mt-0.5 text-sm text-fg">
            {liveCount ? `${liveCount} on the app now` : "Nobody else on right now"}
            {names.length ? ` · ${names.join(" · ")}` : ""}
            {parents.length ? ` · ${parents.length} parent${parents.length === 1 ? "" : "s"}` : ""}
          </p>
        </div>
        <span className="shrink-0 pt-1 text-xs font-semibold uppercase tracking-wide text-accent">
          {open ? "Hide" : "Show"}
        </span>
      </button>

      {open ? (
        <div className="mt-3 border-t border-accent/30 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Coaches / demo</p>
          <ul className="mt-1 flex flex-col gap-1.5">
            {coaches.length ? (
              coaches.map((u) => (
                <li key={u.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span
                      className={
                        u.online
                          ? "inline-block size-2.5 rounded-full bg-emerald-400"
                          : "inline-block size-2.5 rounded-full bg-muted"
                      }
                    />
                    {u.name}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {u.online ? "online" : "offline"}
                    {isDemoName(u.name) ? " · demo" : u.role === "admin" ? " · admin" : ""}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted">Unlock with your coach PIN to see users.</li>
            )}
          </ul>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Performance analysis
          </p>
          {perfLive.length ? (
            <ul className="mt-1 flex flex-col gap-1.5">
              {perfLive.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="inline-block size-2.5 rounded-full bg-emerald-400" />
                    {p.guest ? "On Performance (not signed in)" : `${p.label}’s parent`}
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">now</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-muted">Nobody on Performance right now.</p>
          )}
          {perfSigned.length ? (
            <p className="mt-2 text-sm text-fg">
              Signed in with a family code: {perfSigned.map((n) => parsePlayer(n).name).join(", ")}
            </p>
          ) : null}
          {perfClips.length ? (
            <ul className="mt-2 flex flex-col gap-1 text-sm">
              {perfClips.map((c) => (
                <li key={c.player} className="flex items-center justify-between">
                  <span>{parsePlayer(c.player).name} sent a clip</span>
                  <span className="text-xs text-muted">{c.at.slice(0, 10)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-muted">No clips sent yet.</p>
          )}

          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Parents (vote / board)
          </p>
          {parents.length ? (
            <ul className="mt-1 flex flex-col gap-1.5">
              {parents.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-semibold">
                    <span className="inline-block size-2.5 rounded-full bg-emerald-400" />
                    {p.label}’s parent
                  </span>
                  <span className="text-xs uppercase tracking-wide text-muted">{p.page || "app"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-sm text-muted">No named parents on vote / board right now.</p>
          )}
          {guests > 0 ? (
            <p className="mt-2 text-sm font-semibold text-fg">
              {guests} more on the parent app (not picked a child yet)
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
