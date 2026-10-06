"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { addCoachUser, listCoachUsers, removeCoachUser } from "@/lib/coach-users";
import { sendWhatsApp } from "@/lib/whatsapp";
import { TEAM_NAME } from "@/lib/brand";
import { ParentsOnline } from "@/components/parents-online";

function deskUrl() {
  if (typeof window === "undefined") return "/coach";
  return `${window.location.origin}/coach`;
}

export function CoachUsersPanel({
  adminPin,
  onAdminPin,
}: {
  adminPin: string;
  onAdminPin?: (pin: string) => void;
}) {
  const [users, setUsers] = useState<{ id: number; name: string; role?: string; online?: boolean }[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [gatePin, setGatePin] = useState(adminPin);
  const [inviteCode, setInviteCode] = useState("");
  const [saving, setSaving] = useState(false);
  const link = deskUrl();

  async function load() {
    const p = (adminPin || gatePin).trim();
    if (!p) return;
    try {
      const res = await listCoachUsers({ data: { pin: p } });
      if (!res.ok) {
        toast.error("Only the admin can see users.");
        setUsers([]);
        return;
      }
      setUsers(res.users);
    } catch {
      toast.error("Could not load users.");
    }
  }

  useEffect(() => {
    if (adminPin) {
      setGatePin(adminPin);
      void load();
    }
    const t = setInterval(() => {
      if (adminPin || gatePin) void load();
    }, 8000);
    return () => clearInterval(t);
  }, [adminPin]);

  async function onAdd() {
    if (!name.trim()) return toast.error("Add their name.");
    if (!/^\d{4,6}$/.test(code.trim())) return toast.error("Code must be 4 to 6 digits.");
    setSaving(true);
    try {
      const res = await addCoachUser({
        data: { adminPin: adminPin || gatePin, name: name.trim(), pin: code.trim() },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(`${name.trim()} can play with the desk. They will not see other users.`);
      setInviteCode(code.trim());
      setName("");
      setCode("");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add user.");
    } finally {
      setSaving(false);
    }
  }

  function shareWithCode() {
    const pin = code.trim() || inviteCode.trim();
    if (!pin) return toast.error("Add the code to share.");
    void sendWhatsApp(
      `${TEAM_NAME} coach desk`,
      `${TEAM_NAME} coach desk.\nOpen this link, then unlock with code ${pin}`,
      link,
    );
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Admin users</h3>
      <p className="mb-3 text-sm text-muted">
        Brian — full access. You see every user. Coaches cannot see this list.
      </p>
      {!adminPin && !users.length ? (
        <div className="mb-4">
          <FieldLabel htmlFor="admin-gate">Your admin code</FieldLabel>
          <FieldInput
            id="admin-gate"
            type="password"
            inputMode="numeric"
            value={gatePin}
            onChange={(e) => setGatePin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mb-2"
          />
          <Button
            className="w-full"
            onClick={() => {
              onAdminPin?.(gatePin);
              void load();
            }}
          >
            Show all users
          </Button>
        </div>
      ) : null}
      <ul className="mb-4 flex flex-col gap-2">
        {users.map((u) => (
          <li key={u.id} className="flex items-center justify-between gap-2 text-sm">
            <span className="flex items-center gap-2 font-semibold">
              <span
                className={
                  u.online
                    ? "inline-block size-2.5 rounded-full bg-emerald-400"
                    : "inline-block size-2.5 rounded-full bg-muted"
                }
              />
              {u.name}
              {u.role === "admin" ? " · admin" : ""}
              <span className={u.online ? "text-xs font-semibold uppercase tracking-wide text-emerald-400" : "text-xs uppercase tracking-wide text-muted"}>
                {u.online ? "online" : "offline"}
              </span>
            </span>
            {u.role !== "admin" ? (
              <button
                type="button"
                className="text-xs font-semibold uppercase tracking-wide text-muted"
                onClick={() => {
                  void removeCoachUser({ data: { adminPin: adminPin || gatePin, id: u.id } }).then((res) => {
                    if (!res.success) toast.error(res.error);
                    else void load();
                  });
                }}
              >
                Remove
              </button>
            ) : (
              <span className="text-xs text-muted">You</span>
            )}
          </li>
        ))}
      </ul>
      <Button className="mb-4 w-full" variant="outline" onClick={shareWithCode}>
        WhatsApp share · with code
      </Button>
      <div className="mb-4">
        <ParentsOnline pin={adminPin || gatePin} />
      </div>
      <FieldLabel htmlFor="coach-user-name">Name</FieldLabel>
      <FieldInput
        id="coach-user-name"
        value={name}
        placeholder="Connor Lee"
        onChange={(e) => setName(e.target.value)}
        className="mb-3"
      />
      <FieldLabel htmlFor="coach-user-code">Their code</FieldLabel>
      <FieldInput
        id="coach-user-code"
        inputMode="numeric"
        autoComplete="off"
        value={code}
        placeholder="4 to 6 digits"
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        className="mb-3"
      />
      <Button className="w-full" onClick={() => void onAdd()} disabled={saving}>
        {saving ? "Saving…" : "Add user"}
      </Button>
    </section>
  );
}
