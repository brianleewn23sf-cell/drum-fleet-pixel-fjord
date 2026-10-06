"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { checkParentPin, resumeParentSession, isViewAllPlayer, type ParentSession } from "@/lib/parent-login";
import { FALLBACK_PIN, LOCAL_UNLOCKS } from "@/lib/pins";
import { shortName } from "@/lib/players";
import { cn } from "@/lib/utils";

export const PARENT_KEY = "bulls-parent-login";

export function readParentSession(): ParentSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      window.localStorage.getItem(PARENT_KEY) || window.sessionStorage.getItem(PARENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ParentSession;
    if (!parsed?.token || !parsed?.player) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeParentSession(row: ParentSession) {
  window.localStorage.setItem(PARENT_KEY, JSON.stringify(row));
  window.sessionStorage.setItem(PARENT_KEY, JSON.stringify(row));
}

export function clearParentSession() {
  window.localStorage.removeItem(PARENT_KEY);
  window.sessionStorage.removeItem(PARENT_KEY);
}

function openCoach(code: string) {
  try {
    const hit = LOCAL_UNLOCKS[code] || (code === FALLBACK_PIN ? LOCAL_UNLOCKS[FALLBACK_PIN] : null);
    window.sessionStorage.removeItem("bulls-coach-locked");
    window.sessionStorage.setItem("bulls-coach-pin", code);
    window.localStorage.setItem("bulls-coach-pin", code);
    window.localStorage.setItem("bulls-coach-ok", "1");
    if (hit) {
      window.localStorage.setItem("bulls-coach-name", hit.name);
      window.localStorage.setItem("bulls-coach-role", hit.role);
      window.sessionStorage.setItem("bulls-coach-role", hit.role);
    }
  } catch {
    // still jump
  }
  window.location.assign("/coach");
}

export function ParentGate({
  children,
  onSession,
  hint = "Use the 6-digit family code Brian sent on WhatsApp — not the coach PIN. It unlocks your child’s marks and home tests.",
}: {
  children: (session: ParentSession) => ReactNode;
  onSession?: (session: ParentSession | null) => void;
  hint?: string;
}) {
  const [session, setSession] = useState<ParentSession | null>(null);
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const onSessionRef = useRef(onSession);
  onSessionRef.current = onSession;

  useEffect(() => {
    const saved = readParentSession();
    if (!saved) {
      setReady(true);
      return;
    }
    void resumeParentSession({ data: { token: saved.token } })
      .then((res) => {
        if (res.ok) {
          const next = {
            token: saved.token,
            player: res.player,
            family: res.family,
            viewAll: Boolean(res.viewAll),
          };
          writeParentSession(next);
          setSession(next);
          onSessionRef.current?.(next);
        } else {
          clearParentSession();
          onSessionRef.current?.(null);
        }
      })
      .catch(() => {
        setSession(saved);
        onSessionRef.current?.(saved);
      })
      .finally(() => setReady(true));
  }, []);

  function pressDigit(digit: string) {
    const next = (pin + digit).replace(/\D/g, "").slice(0, 8);
    setPin(next);
    setError("");
    if (LOCAL_UNLOCKS[next] || next === FALLBACK_PIN) openCoach(next);
  }

  async function unlockWith(raw: string) {
    const clean = raw.replace(/\D/g, "");
    setPin(clean);
    if (LOCAL_UNLOCKS[clean] || clean === FALLBACK_PIN) {
      openCoach(clean);
      return;
    }
    if (clean.length < 4) {
      setError("Enter the 6-digit family code, then Sign in.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await checkParentPin({ data: { pin: clean } });
      if ("coach" in res && res.coach) {
        openCoach(clean);
        return;
      }
      if (!res.ok) {
        setError(res.error);
        toast.error(res.error);
        return;
      }
      const next = {
        token: res.token,
        player: res.player,
        family: res.family,
        viewAll: Boolean(res.viewAll),
      };
      writeParentSession(next);
      setSession(next);
      onSessionRef.current?.(next);
      toast.success(
        next.viewAll
          ? "Signed in as manager — you can view every lad."
          : `Signed in as ${shortName(res.player)}’s parent.`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not sign in.";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  async function unlock() {
    const typed =
      (typeof document !== "undefined"
        ? (document.getElementById("family-code") as HTMLInputElement | null)?.value
        : "") || pin;
    await unlockWith(typed);
  }

  function logout() {
    clearParentSession();
    setSession(null);
    onSessionRef.current?.(null);
    setPin("");
    setError("");
  }

  if (!ready) return null;

  if (!session) {
    return (
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight">Parent login</h2>
        <p className="mt-2 text-sm leading-7 text-muted">{hint}</p>
        <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            const typed =
              (document.getElementById("family-code") as HTMLInputElement | null)?.value || pin;
            void unlockWith(typed);
          }}
        >
          <FieldLabel htmlFor="family-code">Family code</FieldLabel>
          <input
            id="family-code"
            name="pin"
            type="tel"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={pin}
            maxLength={8}
            placeholder="6 digits"
            aria-label="Family code"
            className="mt-1 h-14 w-full rounded-xl border border-border bg-bg text-center font-display text-3xl font-bold tracking-[0.35em] text-fg outline-none focus:ring-2 focus:ring-accent/50"
            onChange={(e) => {
              const next = e.target.value.replace(/\D/g, "").slice(0, 8);
              setPin(next);
              setError("");
              if (LOCAL_UNLOCKS[next] || next === FALLBACK_PIN) openCoach(next);
            }}
          />
          <Button type="submit" className="mt-3 h-12 w-full" disabled={busy || pin.length < 4}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <button
                key={d}
                type="button"
                className="h-12 rounded-md border border-border bg-bg font-display text-lg font-bold text-fg"
                onClick={() => pressDigit(d)}
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              className="h-12 rounded-md border border-border bg-bg text-xs font-semibold uppercase tracking-wide text-muted"
              onClick={() => {
                setPin("");
                setError("");
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="h-12 rounded-md border border-border bg-bg font-display text-lg font-bold text-fg"
              onClick={() => pressDigit("0")}
            >
              0
            </button>
            <button
              type="button"
              className="h-12 rounded-md border border-border bg-bg text-xs font-semibold uppercase tracking-wide text-muted"
              onClick={() => setPin((p) => p.slice(0, -1))}
            >
              Del
            </button>
          </div>
          {error ? <p className="mt-3 text-sm font-semibold text-accent">{error}</p> : null}
        </form>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
        <p className="text-sm">
          <span className="font-semibold">
            {session.viewAll || isViewAllPlayer(session.player) ? "Manager · view all" : shortName(session.player)}
          </span>
          <span className="text-muted">
            {session.viewAll || isViewAllPlayer(session.player) ? " · every lad’s marks" : " · parent signed in"}
          </span>
        </p>
        <button type="button" className="text-xs font-semibold uppercase tracking-wide text-accent" onClick={logout}>
          Sign out
        </button>
      </div>
      {children(session)}
    </div>
  );
}