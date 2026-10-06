"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { formatDob, playerAgeYears, playerDob, shortName } from "@/lib/players";
import { addSquadPlayer, removeSquadPlayer } from "@/lib/squad";

export function SquadPanel({
  players,
  pin,
  onPlayers,
}: {
  players: string[];
  pin: string;
  onPlayers: (players: string[]) => void;
}) {
  const [shirt, setShirt] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  async function onAdd() {
    if (!name.trim()) return toast.error("Add the lad’s name.");
    if (!pin.trim()) return toast.error("Unlock again with your coach PIN.");
    setBusy("add");
    try {
      const res = await addSquadPlayer({
        data: { pin: pin.trim(), shirt: shirt.trim(), name: name.trim() },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      onPlayers(res.players);
      setShirt("");
      setName("");
      toast.success("Added to the squad.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add.");
    } finally {
      setBusy(null);
    }
  }

  async function onDelete(player: string) {
    if (!pin.trim()) return toast.error("Unlock again with your coach PIN.");
    setBusy(player);
    try {
      const res = await removeSquadPlayer({ data: { pin: pin.trim(), player } });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      onPlayers(res.players);
      toast.success(`${shortName(player)} removed from the squad.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Squad</h3>
      <p className="mb-3 text-sm text-muted">
        Manager only. Delete a lad if they leave. Add a shirt number and name for a new one. Old votes stay in the history.
      </p>
      <ul className="mb-4 flex flex-col gap-2">
        {players.map((p) => (
          <li key={p} className="flex flex-col gap-2 rounded-md border border-border p-2">
            <span className="text-sm font-semibold">{shortName(p)}</span>
            {playerDob(p) ? (
              <span className="text-xs text-muted">
                DOB {formatDob(playerDob(p)!)}
                {playerAgeYears(p) != null ? ` · age ${playerAgeYears(p)}` : ""}
              </span>
            ) : null}
            <Button
              variant="outline"
              className="w-full"
              disabled={busy === p}
              onClick={() => void onDelete(p)}
            >
              {busy === p ? "Deleting…" : "Delete from squad"}
            </Button>
          </li>
        ))}
      </ul>
      <FieldLabel htmlFor="squad-shirt">Shirt</FieldLabel>
      <FieldInput
        id="squad-shirt"
        inputMode="numeric"
        value={shirt}
        placeholder="9"
        onChange={(e) => setShirt(e.target.value.replace(/\D/g, "").slice(0, 3))}
        className="mb-2"
      />
      <FieldLabel htmlFor="squad-name">Name</FieldLabel>
      <FieldInput
        id="squad-name"
        value={name}
        placeholder="Tom Smith"
        onChange={(e) => setName(e.target.value)}
        className="mb-3"
      />
      <Button className="w-full" onClick={() => void onAdd()} disabled={busy === "add"}>
        {busy === "add" ? "Adding…" : "Add player"}
      </Button>
    </section>
  );
}
