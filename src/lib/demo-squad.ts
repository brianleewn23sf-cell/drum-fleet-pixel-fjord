import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { DEMO_USER, demoForPin, isDemoName } from "@/lib/demo";

function label(shirt: string, name: string): string {
  const n = name.trim();
  const s = shirt.trim().replace(/\D/g, "");
  return s ? `${s}) ${n}` : n;
}

async function ownerForPin(pin: string): Promise<{ name: string; admin: boolean } | null> {
  const sql = await getSql();
  try {
    const rows = await sql<{ name: string; role: unknown }>`
      select name, role from coach_users where pin = ${pin} limit 1
    `;
    if (!rows[0]?.name) {
      if (pin === "0803") return { name: "Brian Lee", admin: true };
      const demo = demoForPin(pin);
      if (demo) return { name: demo.name, admin: false };
      return null;
    }
    const name = String(rows[0].name);
    const admin = String(rows[0].role) === "admin" || name.toLowerCase() === "brian lee";
    return { name, admin };
  } catch {
    if (pin === "0803") return { name: "Brian Lee", admin: true };
    const demo = demoForPin(pin);
    if (demo) return { name: demo.name, admin: false };
    return null;
  }
}

export const listDemoPlayers = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40).optional(), owner: z.string().trim().max(60).optional() }))
  .handler(async ({ data }) => {
    const pin = (data.pin || "").trim();
    if (!pin) return { ok: false as const, owner: "", players: [] as { id: number; label: string }[] };
    const who = await ownerForPin(pin);
    if (!who) return { ok: false as const, owner: "", players: [] as { id: number; label: string }[] };
    const owner =
      who.admin && data.owner
        ? data.owner
        : isDemoName(who.name)
          ? who.name
          : who.admin
            ? DEMO_USER
            : who.name;
    const sql = await getSql();
    try {
      const rows = await sql<{ id: number; shirt: string; name: string }>`
        select id, shirt, name from demo_players
        where owner = ${owner}
        order by shirt, name
      `;
      return {
        ok: true as const,
        owner,
        players: rows.map((r) => ({
          id: Number(r.id),
          label: label(String(r.shirt || ""), String(r.name || "")),
        })),
      };
    } catch {
      return { ok: true as const, owner, players: [] };
    }
  });

export const addDemoPlayer = createServerFn({ method: "POST" })
  .validator(
    z.object({
      pin: z.string().trim().min(1).max(40),
      shirt: z.string().trim().max(4).optional(),
      name: z.string().trim().min(2).max(60),
      owner: z.string().trim().max(60).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const who = await ownerForPin(data.pin);
    if (!who) return { success: false as const, error: "Wrong code." };
    if (!who.admin && !isDemoName(who.name)) {
      return { success: false as const, error: "Demo squad is for the demo login." };
    }
    const owner = isDemoName(who.name) ? who.name : who.admin && data.owner ? data.owner : DEMO_USER;
    const shirt = (data.shirt || "").replace(/\D/g, "").slice(0, 3);
    const sql = await getSql();
    try {
      await sql`
        insert into demo_players (owner, shirt, name)
        values (${owner}, ${shirt}, ${data.name})
      `;
      return { success: true as const };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/unique|duplicate|23505/i.test(message)) {
        return { success: false as const, error: "That player is already on the demo squad." };
      }
      return { success: false as const, error: "Could not add player." };
    }
  });

export const removeDemoPlayer = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40).optional(), id: z.coerce.number().int() }))
  .handler(async ({ data }) => {
    const pin = (data.pin || "").trim();
    if (!pin) return { success: false as const, error: "Unlock again with your code, then delete." };
    const who = await ownerForPin(pin);
    if (!who) return { success: false as const, error: "Wrong code." };
    const sql = await getSql();
    try {
      const rows = await sql<{ owner: string }>`
        select owner from demo_players where id = ${data.id} limit 1
      `;
      if (!rows[0]) return { success: false as const, error: "Not found." };
      if (!who.admin && rows[0].owner !== who.name) {
        return { success: false as const, error: "That is not your lad." };
      }
      await sql`delete from demo_players where id = ${data.id}`;
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Could not remove player." };
    }
  });
