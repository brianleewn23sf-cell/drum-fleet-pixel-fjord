import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { PLAYERS, squadExtra, squadGone } from "@/lib/players";

export function squadLabel(shirt: string, name: string): string {
  const n = name.trim();
  const s = shirt.trim().replace(/\D/g, "");
  return s ? `${s}) ${n}` : n;
}

export async function loadActiveSquad(sql: Awaited<ReturnType<typeof getSql>>): Promise<string[]> {
  let removed = new Set<string>();
  let added: string[] = [];
  const gone = await sql<{ player: string }>`select player from squad_removed`.catch(() => [] as { player: string }[]);
  const extra = await sql<{ shirt: string; name: string }>`
    select shirt, name from squad_added order by shirt, name
  `.catch(() => [] as { shirt: string; name: string }[]);
  removed = new Set(gone.map((r) => String(r.player)));
  added = extra.map((r) => squadLabel(String(r.shirt || ""), String(r.name || "")));
  const seen = new Set<string>();
  const out: string[] = [];
  squadGone.clear();
  squadExtra.clear();
  for (const p of removed) squadGone.add(p);
  for (const p of added) squadExtra.add(p);
  for (const p of [...PLAYERS, ...added]) {
    if (removed.has(p) || seen.has(p)) continue;
    seen.add(p);
    out.push(p);
  }
  return out;
}

export const listSquad = createServerFn({ method: "POST" }).handler(async () => {
  const sql = await getSql();
  return { players: await loadActiveSquad(sql) };
});

export const addSquadPlayer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      pin: z.string().trim().max(40),
      shirt: z.string().trim().max(4).optional(),
      name: z.string().trim().min(2).max(60),
    }),
  )
  .handler(async ({ data }) => {
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.pin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) {
      return { success: false as const, error: "Only the manager can change the squad." };
    }
    const sql = await getSql();
    const shirt = (data.shirt || "").replace(/\D/g, "").slice(0, 3);
    const label = squadLabel(shirt, data.name);
    try {
      await sql`delete from squad_removed where player = ${label}`;
      const already = (await loadActiveSquad(sql)).includes(label);
      if (already) return { success: true as const, players: await loadActiveSquad(sql) };
      await sql`insert into squad_added (shirt, name) values (${shirt}, ${data.name.trim()})`;
      const { writeAudit } = await import("@/lib/audit");
      await writeAudit({ actor: who.name, role: "admin", action: "squad.add", player: label });
      return { success: true as const, players: await loadActiveSquad(sql) };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/unique|duplicate|23505/i.test(message)) {
        return { success: false as const, error: "That lad is already on the squad." };
      }
      return { success: false as const, error: "Could not add player." };
    }
  });

export const removeSquadPlayer = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40), player: z.string().trim().min(1).max(80) }))
  .handler(async ({ data }) => {
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.pin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) {
      return { success: false as const, error: "Only the manager can change the squad." };
    }
    const sql = await getSql();
    try {
      await sql`insert into squad_removed (player) values (${data.player}) on conflict (player) do nothing`;
      await sql`delete from squad_added where (case when shirt = '' then name else shirt || ') ' || name end) = ${data.player}`;
      const { writeAudit } = await import("@/lib/audit");
      await writeAudit({ actor: who.name, role: "admin", action: "squad.remove", player: data.player });
      return { success: true as const, players: await loadActiveSquad(sql) };
    } catch {
      return { success: false as const, error: "Could not delete player." };
    }
  });
