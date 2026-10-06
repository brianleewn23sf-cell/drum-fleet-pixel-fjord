"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput } from "@/components/ui/field";
import { issueParentLogins, listParentLogins, setParentLogin, VIEW_ALL_FAMILY, VIEW_ALL_PLAYER, type ParentLoginRow } from "@/lib/parent-login";
import { TEAM_NAME } from "@/lib/brand";
import { trainingWhatsAppText, sendWhatsApp } from "@/lib/whatsapp";
import { shortName } from "@/lib/players";
import { FALLBACK_PIN } from "@/lib/coach-users";

function storedCoachPin(fallback: string) {
  if (fallback.trim().length >= 4) return fallback.trim();
  if (typeof window === "undefined") return FALLBACK_PIN;
  return (
    window.sessionStorage.getItem("bulls-coach-pin") ||
    window.localStorage.getItem("bulls-coach-pin") ||
    FALLBACK_PIN
  );
}

export function ParentLoginsPanel({ coachPin }: { coachPin: string }) {
  const [rows, setRows] = useState<ParentLoginRow[]>([]);
  const [manager, setManager] = useState<ParentLoginRow | null>(null);
  const [busy, setBusy] = useState(false);

  async function load() {
    try {
      const data = await listParentLogins({ data: { pin: coachPin } });
      setRows(data.rows);
      setManager(data.manager ?? null);
    } catch {
      setRows([]);
      setManager(null);
    }
  }

  useEffect(() => {
    void load();
  }, [coachPin]);

  async function issue() {
    const pin = storedCoachPin(coachPin);
    setBusy(true);
    try {
      const res = await issueParentLogins({ data: { coachPin: pin } });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setRows(res.rows);
      setManager(res.manager ?? null);
      toast.success("Codes generated. Your view-all code is at the top.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not issue logins.");
    } finally {
      setBusy(false);
    }
  }

  async function save(row: ParentLoginRow) {
    const pin = storedCoachPin(coachPin);
    const res = await setParentLogin({
      data: { coachPin: pin, player: row.player, pin: row.pin, family: row.family },
    });
    if (!res.success) toast.error(res.error);
    else toast.success(`Saved ${shortName(row.player)}.`);
  }

  function share(row: ParentLoginRow) {
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    void sendWhatsApp(
      `${TEAM_NAME} training`,
      trainingWhatsAppText(row.pin, shortName(row.player)),
      `${origin}/perf`,
    );
  }

  function shareGroup() {
    const origin = typeof window === "undefined" ? "" : window.location.origin;
    void sendWhatsApp(`${TEAM_NAME} training`, trainingWhatsAppText(), `${origin}/perf`);
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Parent logins</h3>
      <p className="mb-3 mt-1 text-sm leading-7 text-muted">
        POINTS MAKE PRIZES. Generate a code, then Send training link. Parents open it, enter the code, train at home and get their points up.
      </p>
      <Button className="mb-2 w-full" disabled={busy} onClick={() => void issue()}>
        {busy ? "Generating…" : "Generate family codes"}
      </Button>
      <Button className="mb-4 w-full" variant="outline" onClick={shareGroup}>
        Send training link to the group
      </Button>
      {manager?.pin ? (
        <div className="mb-4 rounded-xl border-2 border-accent bg-accent-soft p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">Your view-all code</p>
          <p className="mt-1 text-sm font-semibold">{VIEW_ALL_FAMILY}</p>
          <p className="mt-1 font-display text-4xl font-bold tracking-widest">{manager.pin}</p>
          <p className="mt-2 text-sm text-muted">
            Enter this on Parent board or Performance to see every lad’s full marks. Keep it private.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={() =>
                void save({ ...manager, player: VIEW_ALL_PLAYER, family: VIEW_ALL_FAMILY })
              }
            >
              Save
            </Button>
            <Button
              onClick={() => {
                const origin = window.location.origin;
                void sendWhatsApp(
                  `${TEAM_NAME} manager view-all`,
                  `Your view-all family code (Brian only).\nCode: ${manager.pin}\nOpen Parent board, enter this, pick any lad to see full marks.`,
                  `${origin}/board`,
                );
              }}
            >
              Send to myself
            </Button>
          </div>
        </div>
      ) : (
        <p className="mb-4 text-sm text-muted">Generate codes to get your view-all PIN.</p>
      )}
      {rows.some((r) => r.pin) ? (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.player} className="flex flex-col gap-2 rounded-md border border-border p-3">
              <p className="text-sm font-semibold">{shortName(row.player)}</p>
              <p className="font-display text-3xl font-bold tracking-widest">{row.pin || "—"}</p>
              <FieldInput
                inputMode="numeric"
                value={row.pin}
                placeholder="4–8 numbers"
                onChange={(e) => {
                  const pin = e.target.value.replace(/\D/g, "").slice(0, 8);
                  setRows((list) => list.map((r) => (r.player === row.player ? { ...r, pin } : r)));
                }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => void save(row)}>
                  Save
                </Button>
                <Button disabled={!row.pin} onClick={() => share(row)}>
                  Send training + code
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-7 text-muted">No codes yet. Press Generate.</p>
      )}
    </section>
  );
}
