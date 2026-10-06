"use client";

import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { KeyPad } from "@/components/key-pad";
import {
  isLikelyEmail,
  rememberAdminEmail,
  seatForAdminEmail,
} from "@/lib/coach-admins";
import { writeCoachSession } from "@/lib/coach-session";
import { checkCoachPin, isAdminName } from "@/lib/coach-users";
import { LOCAL_UNLOCKS } from "@/lib/pins";
import { cn } from "@/lib/utils";

export function CoachLock({ opening = false }: { opening?: boolean }) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const pinRef = useRef("");
  const [pinError, setPinError] = useState("");
  const [checking, setChecking] = useState(false);
  const [showPad, setShowPad] = useState(false);
  const unlocking = useRef(false);

  function openSeat(name: string, role: "admin" | "coach", pinValue: string) {
    if (unlocking.current) return;
    unlocking.current = true;
    const admin = role === "admin" || isAdminName(name);
    writeCoachSession(name, admin ? "admin" : "coach", pinValue);
  }

  function onEmailUnlock() {
    const seat = seatForAdminEmail(email);
    if (!seat) {
      setPinError(
        isLikelyEmail(email)
          ? "That email is not a super admin. Use the Brian Lee club email."
          : "Type your full email, then Continue.",
      );
      return;
    }
    setPinError("");
    rememberAdminEmail(email);
    openSeat(seat.name, seat.role, seat.pin);
  }

  function setPinFrom(raw: string) {
    const next = raw.replace(/\D/g, "").slice(0, 6);
    pinRef.current = next;
    setPin(next);
    setPinError("");
    if (next.length >= 4 && LOCAL_UNLOCKS[next]) {
      window.setTimeout(() => {
        if (pinRef.current === next) void onUnlock(next);
      }, 80);
    }
  }

  async function onUnlock(raw?: string) {
    const clean = (raw ?? pinRef.current).replace(/\D/g, "");
    if (!clean) {
      setPinError("Other coaches: tap the numbers, then Go.");
      return;
    }
    const local = LOCAL_UNLOCKS[clean];
    if (local) {
      openSeat(local.name, local.role, clean);
      return;
    }
    if (clean.length < 4) {
      setPinError("PIN is 4 to 6 digits.");
      return;
    }
    setChecking(true);
    try {
      const res = await Promise.race([
        checkCoachPin({ data: { pin: clean } }),
        new Promise<{ ok: false }>((resolve) => {
          window.setTimeout(() => resolve({ ok: false }), 8000);
        }),
      ]);
      if (res && "ok" in res && res.ok) {
        openSeat(res.name || "Coach", res.role === "admin" ? "admin" : "coach", clean);
        return;
      }
      setPinError("Wrong PIN.");
    } catch (err) {
      setPinError(err instanceof Error ? err.message : "Could not unlock.");
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || showPad) return;
      const target = e.target as HTMLElement | null;
      if (target && target.id !== "coach-email") return;
      e.preventDefault();
      onEmailUnlock();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [email, showPad]);

  const slots = Math.max(4, pin.length || 4);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-sm flex-col bg-bg px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
      <Link to="/board" className="text-xs font-semibold uppercase tracking-wide text-accent">
        ← Board
      </Link>
      <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">Coach</h2>
      <p className="mt-1 text-sm text-muted">
        {opening ? "Opening desk…" : "Super admin: enter your email. No code needed."}
      </p>

      <label className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted" htmlFor="coach-email">
        Super admin email
      </label>
      <input
        id="coach-email"
        type="email"
        inputMode="email"
        autoComplete="username"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        disabled={checking || opening}
        value={email}
        placeholder="you@email.com"
        className="mt-2 h-14 w-full rounded-xl border border-border bg-surface px-4 text-base text-fg outline-none focus:ring-2 focus:ring-accent/50"
        onChange={(e) => {
          setEmail(e.target.value);
          setPinError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onEmailUnlock();
          }
        }}
      />
      <button
        type="button"
        disabled={checking || opening}
        className="mt-3 h-14 w-full rounded-xl bg-accent font-display text-xl font-bold uppercase tracking-wide text-accent-fg disabled:opacity-70"
        onClick={onEmailUnlock}
      >
        {opening ? "Opening…" : "Continue"}
      </button>

      <button
        type="button"
        className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted"
        onClick={() => setShowPad((v) => !v)}
      >
        {showPad ? "Hide other coaches" : "Other coaches — number pad"}
      </button>

      {showPad ? (
        <>
          <div className="mt-4 flex h-14 items-center justify-center gap-3 rounded-xl border border-border bg-surface">
            {Array.from({ length: slots }).map((_, i) => (
              <span
                key={i}
                className={cn("size-3.5 rounded-full", i < pin.length ? "bg-fg" : "border-2 border-muted")}
              />
            ))}
          </div>
          <div className="mt-3">
            <KeyPad
              disabled={checking || opening}
              onDigit={(d) => setPinFrom(pinRef.current + d)}
              onClear={() => setPinFrom("")}
              onDelete={() => setPinFrom(pinRef.current.slice(0, -1))}
            />
          </div>
          <button
            type="button"
            disabled={checking || opening || pin.length < 4}
            className="mt-4 h-14 w-full rounded-xl border border-border bg-surface font-display text-lg font-bold uppercase tracking-wide text-fg disabled:opacity-70"
            onClick={() => void onUnlock(pinRef.current || pin)}
          >
            Go
          </button>
        </>
      ) : null}
      {pinError ? <p className="mt-3 text-center text-sm font-semibold text-accent">{pinError}</p> : null}
    </div>
  );
}
