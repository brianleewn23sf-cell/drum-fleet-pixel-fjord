"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { CoachDesk } from "@/components/coach-desk";
import { CoachLock } from "@/components/coach-lock";
import {
  readRememberedAdminEmail,
  rememberAdminEmail,
  seatForAdminEmail,
} from "@/lib/coach-admins";
import { isCoachUnlocked, subscribeCoachSession, writeCoachSession } from "@/lib/coach-session";

function restoreSession() {
  if (isCoachUnlocked()) return true;
  const remembered = readRememberedAdminEmail();
  const seat = remembered ? seatForAdminEmail(remembered) : null;
  if (!seat) return false;
  rememberAdminEmail(remembered);
  writeCoachSession(seat.name, seat.role, seat.pin);
  return true;
}

export function CoachPage() {
  const shown = useRef(false);
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useLayoutEffect(() => {
    const on = restoreSession();
    if (on) shown.current = true;
    setUnlocked(on);
    setReady(true);
    return subscribeCoachSession(() => {
      const next = isCoachUnlocked() || restoreSession();
      if (next) shown.current = true;
      if (shown.current && !next) return;
      setUnlocked(next || shown.current);
    });
  }, []);

  if (!ready) return <div className="min-h-dvh bg-bg" />;
  if (!unlocked) return <CoachLock />;
  return <CoachDesk />;
}