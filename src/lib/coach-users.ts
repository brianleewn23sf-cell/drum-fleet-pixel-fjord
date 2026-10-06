import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { FALLBACK_NAME, FALLBACK_PIN, seatForName } from "@/lib/pins";

export { FALLBACK_NAME, FALLBACK_PIN } from "@/lib/pins";

export type CoachRole = "admin" | "coach";

export function isAdminName(name: string): boolean {
  return name.trim().toLowerCase() === FALLBACK_NAME.toLowerCase();
}

export function canSaveName(name: string): boolean {
  const n = name.trim().toLowerCase();
  return n === FALLBACK_NAME.toLowerCase() || n === "connor lee";
}

export const SAVE_LOCK = "Look and move freely — only Brian and Connor can save.";
export const ONLINE_MS = 45_000;

function isOnline(lastSeenMs: unknown, lastSeen: unknown): boolean {
  const n = Number(lastSeenMs);
  if (Number.isFinite(n) && n > 0) return Date.now() - n < ONLINE_MS;
  if (lastSeen == null || lastSeen === "") return false;
  const t = lastSeen instanceof Date ? lastSeen.getTime() : Date.parse(String(lastSeen));
  if (!Number.isFinite(t)) return false;
  return Date.now() - t < ONLINE_MS;
}

async function touchPresence(sql: Awaited<ReturnType<typeof getSql>>, name: string) {
  const ms = Date.now();
  try {
    await sql`
      insert into coach_presence (name, last_seen, last_seen_ms)
      values (${name}, now(), ${ms})
      on conflict (name) do update set last_seen = now(), last_seen_ms = ${ms}
    `;
  } catch {
    try {
      await sql`
        insert into coach_presence (name, last_seen)
        values (${name}, now())
        on conflict (name) do update set last_seen = now()
      `;
    } catch {
      // presence lands in 0030
    }
  }
}

async function seedBrian(sql: Awaited<ReturnType<typeof getSql>>) {
  try {
    await sql`
      insert into coach_users (name, pin)
      values
        (${FALLBACK_NAME}, ${FALLBACK_PIN}),
        ('Dave Bailey', '123456'),
        ('Gavin Massey', '654321')
      on conflict (pin) do nothing
    `;
    await sql`
      update coach_users set role = 'admin' where pin = ${FALLBACK_PIN} or name = ${FALLBACK_NAME}
    `;
    await sql`
      update coach_users set role = 'coach' where pin <> ${FALLBACK_PIN} and (role is null or role = '')
    `;
  } catch {
    // table lands in migration 0026 / 0028
  }
}

async function userForPin(
  sql: Awaited<ReturnType<typeof getSql>>,
  pin: string,
): Promise<{ name: string; role: CoachRole } | null> {
  await seedBrian(sql);
  try {
    const rows = await sql<{ name: string; role: unknown }>`
      select name, role from coach_users where pin = ${pin} limit 1
    `;
    if (rows[0]?.name) {
      const name = String(rows[0].name);
      if (isAdminName(name) || pin === FALLBACK_PIN) return { name, role: "admin" };
      const role = String(rows[0].role || "") === "admin" ? "admin" : "coach";
      return { name, role };
    }
  } catch {
    try {
      const rows = await sql<{ name: string }>`
        select name from coach_users where pin = ${pin} limit 1
      `;
      if (rows[0]?.name) {
        const name = String(rows[0].name);
        return { name, role: name === FALLBACK_NAME || pin === FALLBACK_PIN ? "admin" : "coach" };
      }
    } catch {
      // fall through
    }
  }
  if (pin === FALLBACK_PIN) return { name: FALLBACK_NAME, role: "admin" };
  return null;
}

async function requireAdmin(pin: string) {
  const sql = await getSql();
  const user = await userForPin(sql, pin);
  if (!user || user.role !== "admin") {
    return { sql, admin: null as null };
  }
  return { sql, admin: user };
}

export const checkCoachPin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      pin: z.string().trim().min(1).max(40),
      seat: z.string().trim().max(40).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const pin = data.pin.replace(/\D/g, "").trim();
    if (!pin) return { ok: false as const, name: "", role: "coach" as const };
    if (pin === FALLBACK_PIN) {
      const seat = data.seat ? seatForName(data.seat) : null;
      const who = seat ?? { name: FALLBACK_NAME, role: "admin" as const };
      try {
        const sql = await getSql();
        await touchPresence(sql, who.name);
      } catch {
        // still in
      }
      return { ok: true as const, name: who.name, role: who.role };
    }
    const sql = await getSql();
    const user = await userForPin(sql, pin);
    if (!user) return { ok: false as const, name: "", role: "coach" as const };
    await touchPresence(sql, user.name);
    return { ok: true as const, name: user.name, role: user.role };
  });

type UserRow = { id: number; name: string; role: CoachRole; online: boolean; lastSeen: string };

export const listCoachUsers = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40).optional() }))
  .handler(async ({ data }) => {
    const pin = (data.pin || "").replace(/\D/g, "").trim();
    const empty = { ok: false as const, users: [] as UserRow[] };
    if (!pin) return empty;
    const { sql, admin } = await requireAdmin(pin);
    if (!admin) return empty;
    await touchPresence(sql, admin.name);
    try {
      let rows: { id: number; name: string; role: unknown; last_seen?: unknown; last_seen_ms?: unknown }[] = [];
      try {
        rows = await sql`
          select u.id, u.name, u.role, p.last_seen, p.last_seen_ms
          from coach_users u
          left join coach_presence p on p.name = u.name
          order by case when u.role = 'admin' then 0 else 1 end, u.name
        `;
      } catch {
        rows = await sql`
          select u.id, u.name, u.role, p.last_seen
          from coach_users u
          left join coach_presence p on p.name = u.name
          order by u.name
        `;
      }
      return {
        ok: true as const,
        users: rows.map((r) => ({
          id: Number(r.id),
          name: String(r.name),
          role: (String(r.role || "") === "admin" ? "admin" : "coach") as CoachRole,
          online: isOnline(r.last_seen_ms, r.last_seen),
          lastSeen: r.last_seen instanceof Date ? r.last_seen.toISOString() : String(r.last_seen || ""),
        })),
      };
    } catch {
      return { ok: true as const, users: [] as UserRow[] };
    }
  });

export const addCoachUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      adminPin: z.string().trim().min(4).max(40),
      name: z.string().trim().min(1).max(60),
      pin: z.string().trim().min(4).max(8),
    }),
  )
  .handler(async ({ data }) => {
    const { sql, admin } = await requireAdmin(data.adminPin.replace(/\D/g, ""));
    if (!admin) return { success: false as const, error: "Only the manager can add users." };
    const pin = data.pin.replace(/\D/g, "");
    if (pin === FALLBACK_PIN) return { success: false as const, error: "That code is reserved." };
    try {
      await sql`
        insert into coach_users (name, pin, role)
        values (${data.name.trim()}, ${pin}, 'coach')
      `;
      return { success: true as const };
    } catch {
      try {
        await sql`
          insert into coach_users (name, pin)
          values (${data.name.trim()}, ${pin})
        `;
        return { success: true as const };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (/unique|duplicate|23505/i.test(message)) {
          return { success: false as const, error: "That code is already in use." };
        }
        return { success: false as const, error: "Could not add user." };
      }
    }
  });

export const removeCoachUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      adminPin: z.string().trim().min(4).max(40),
      id: z.number().int().positive(),
    }),
  )
  .handler(async ({ data }) => {
    const { sql, admin } = await requireAdmin(data.adminPin.replace(/\D/g, ""));
    if (!admin) return { success: false as const, error: "Only the manager can remove users." };
    try {
      await sql`
        delete from coach_users
        where id = ${data.id} and pin <> ${FALLBACK_PIN} and name <> ${FALLBACK_NAME}
      `;
      return { success: true as const };
    } catch {
      return { success: false as const, error: "Could not remove user." };
    }
  });

export const heartbeatCoach = createServerFn({ method: "POST" })
  .validator(
    z.object({
      pin: z.string().trim().min(1).max(40),
      seat: z.string().trim().max(40).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const pin = data.pin.replace(/\D/g, "");
    const sql = await getSql();
    const seat = data.seat ? seatForName(data.seat) : null;
    if (pin === FALLBACK_PIN && seat) {
      await touchPresence(sql, seat.name);
      return { ok: true as const };
    }
    const user = await userForPin(sql, pin);
    if (!user) return { ok: false as const };
    await touchPresence(sql, user.name);
    return { ok: true as const };
  });

export const leaveCoach = createServerFn({ method: "POST" })
  .validator(
    z.object({
      pin: z.string().trim().min(1).max(40),
      seat: z.string().trim().max(40).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const pin = data.pin.replace(/\D/g, "");
    const sql = await getSql();
    const seat = data.seat ? seatForName(data.seat) : null;
    const name = pin === FALLBACK_PIN && seat ? seat.name : (await userForPin(sql, pin))?.name;
    if (!name) return { ok: false as const };
    try {
      await sql`delete from coach_presence where name = ${name}`;
    } catch {
      // ignore
    }
    return { ok: true as const };
  });
