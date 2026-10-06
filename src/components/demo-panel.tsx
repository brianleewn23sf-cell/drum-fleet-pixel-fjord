"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { DEMO_LOGINS, DEMO_STEPS, demoWhatsAppText, isDemoName, type DemoLogin } from "@/lib/demo";
import { addDemoPlayer, listDemoPlayers, removeDemoPlayer } from "@/lib/demo-squad";
import { TEAM_NAME } from "@/lib/brand";
import { sendWhatsApp } from "@/lib/whatsapp";

export function DemoPanel({
  coachName,
  isAdmin,
  pin,
  onOpenTab,
  onPlayers,
  onViewDemo,
}: {
  coachName: string;
  isAdmin: boolean;
  pin: string;
  onOpenTab: (tab: (typeof DEMO_STEPS)[number]["tab"]) => void;
  onPlayers?: (players: string[]) => void;
  onViewDemo?: (owner: string, players: string[]) => void;
}) {
  const self = isDemoName(coachName);
  const link = typeof window === "undefined" ? "/coach" : `${window.location.origin}/coach`;
  const [owner, setOwner] = useState(self ? coachName : DEMO_LOGINS[0].name);
  const [squad, setSquad] = useState<{ id: number; label: string }[]>([]);
  const [shirt, setShirt] = useState("");
  const [name, setName] = useState("");
  const [removing, setRemoving] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  async function onDelete(id: number, label: string) {
    if (!pin.trim()) {
      toast.error("Unlock again, then delete.");
      return;
    }
    setRemoving(id);
    try {
      const res = await removeDemoPlayer({ data: { pin: pin.trim(), id } });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(`${label} deleted.`);
      await loadSquad();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    } finally {
      setRemoving(null);
    }
  }

  async function loadSquad(nextOwner = owner) {
    if (!pin.trim()) return;
    try {
      const res = await listDemoPlayers({ data: { pin, owner: nextOwner } });
      if (!res.ok) return;
      setSquad(res.players);
      onPlayers?.(res.players.map((p) => p.label));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load demo squad.");
    }
  }

  useEffect(() => {
    void loadSquad(owner);
  }, [pin, owner]);

  async function onAdd() {
    if (!name.trim()) return toast.error("Add the lad’s name.");
    setSaving(true);
    try {
      const res = await addDemoPlayer({
        data: { pin, shirt: shirt.trim(), name: name.trim(), owner },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setShirt("");
      setName("");
      toast.success("Added to the demo squad.");
      await loadSquad();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add player.");
    } finally {
      setSaving(false);
    }
  }

  function share(user: DemoLogin) {
    void sendWhatsApp(`${TEAM_NAME} demo`, demoWhatsAppText(user), link);
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Demo</h3>
      <p className="mt-1 text-sm leading-7 text-muted">
        Look only. Their squad never overwrites the Bulls.
      </p>

      {isAdmin ? (
        <div className="mt-3 flex flex-col gap-4">
          {DEMO_LOGINS.map((user) => (
            <div key={user.pin} className="rounded-lg border border-border bg-bg p-3">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-fg">
                Code: <span className="font-display text-2xl font-bold tracking-widest">{user.pin}</span>
              </p>
              <pre className="mt-2 whitespace-pre-wrap rounded-md border border-border p-2 text-xs text-fg">
                {demoWhatsAppText(user)}
              </pre>
              <Button className="mt-2 w-full" variant="outline" onClick={() => share(user)}>
                WhatsApp {user.name.split(" ")[0]}
              </Button>
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  setOwner(user.name);
                  void listDemoPlayers({ data: { pin, owner: user.name } }).then((res) => {
                    if (res.ok) onViewDemo?.(user.name, res.players.map((p) => p.label));
                  });
                }}
              >
                View {user.name.split(" ")[0]}’s demo
              </Button>
            </div>
          ))}
        </div>
      ) : self ? (
        <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-border bg-bg p-3 text-sm text-fg">
          {demoWhatsAppText(DEMO_LOGINS.find((d) => d.name === coachName) || DEMO_LOGINS[0])}
        </pre>
      ) : null}

      <div className="mt-4 rounded-lg border border-border bg-bg p-3">
        <h4 className="font-display text-base font-bold uppercase tracking-tight">
          {self ? "Your squad" : `${owner}’s squad`}
        </h4>
        {isAdmin && !self ? (
          <select
            className="mt-2 h-11 w-full rounded-md border border-border bg-bg px-3 text-sm text-fg"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            {DEMO_LOGINS.map((u) => (
              <option key={u.pin} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        ) : null}
        <ul className="mt-2 flex flex-col gap-2">
          {squad.length ? (
            squad.map((p) => (
              <li key={p.id} className="flex flex-col gap-2 rounded-md border border-border p-2">
                <span className="text-sm font-semibold">{p.label}</span>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={removing === p.id}
                  onClick={() => void onDelete(p.id, p.label)}
                >
                  {removing === p.id ? "Deleting…" : "Delete lad"}
                </Button>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted">No lads yet. Add a number and a name.</li>
          )}
        </ul>
        <FieldLabel htmlFor="demo-shirt" className="mt-3">
          Shirt
        </FieldLabel>
        <FieldInput
          id="demo-shirt"
          inputMode="numeric"
          value={shirt}
          placeholder="9"
          onChange={(e) => setShirt(e.target.value.replace(/\D/g, "").slice(0, 3))}
          className="mb-2"
        />
        <FieldLabel htmlFor="demo-name">Name</FieldLabel>
        <FieldInput
          id="demo-name"
          value={name}
          placeholder="Tom Smith"
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
        />
        <Button className="w-full" onClick={() => void onAdd()} disabled={saving || !pin}>
          {saving ? "Adding…" : "Add player"}
        </Button>
      </div>

      <ol className="mt-4 flex flex-col gap-3">
        {DEMO_STEPS.map((step, i) => (
          <li key={step.id} className="rounded-lg border border-border bg-bg p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {i + 1}. {step.title}
            </p>
            <p className="mt-1 text-sm text-fg">{step.try}</p>
            <button
              type="button"
              className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent"
              onClick={() => onOpenTab(step.tab)}
            >
              Open {step.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
