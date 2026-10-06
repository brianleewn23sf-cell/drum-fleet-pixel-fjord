import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { FALLBACK_PIN, LOCAL_UNLOCKS } from "@/lib/pins";
import { loadActiveSquad } from "@/lib/squad";

export type ParentSession = {
  token: string;
  player: string;
  family: string;
  viewAll?: boolean;
};

export type ParentLoginRow = {
  player: string;
  pin: string;
  family: string;
};

export const VIEW_ALL_PLAYER = "__manager__";
export const VIEW_ALL_FAMILY = "Brian Lee · view all";

export function isViewAllPlayer(player: string): boolean {
  return player.trim() === VIEW_ALL_PLAYER;
}

const BLOCKED = new Set(["0803", "123456", "654321", "0000", "1111", "1234", "9999"]);
const MAX_FAILS_CODE = 5;
const MAX_FAILS_GLOBAL = 40;
const LOCK_MS = 15 * 60 * 1000;
const SESSION_MS = 180 * 24 * 60 * 60 * 1000;

export function normalizeCode(raw: string): string | null {
  const pin = raw.replace(/\D/g, "").slice(0, 8);
  if (!/^\d{4,8}$/.test(pin)) return null;
  if (BLOCKED.has(pin)) return null;
  return pin;
}

async function sha(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function safeEqual(a: string, b: string): boolean {
  const left = a.padEnd(8, "\0");
  const right = b.padEnd(8, "\0");
  let diff = left.length ^ right.length;
  const n = Math.max(left.length, right.length);
  for (let i = 0; i < n; i++) {
    diff |= (left.charCodeAt(i) || 0) ^ (right.charCodeAt(i) || 0);
  }
  return diff === 0;
}

function randInt(min: number, max: number): number {
  const span = max - min;
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return min + (buf[0] % span);
}

function randomToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function sixDigit(used: Set<string>): string {
  for (let i = 0; i < 120; i++) {
    const n = String(randInt(100000, 1000000));
    if (BLOCKED.has(n) || used.has(n)) continue;
    used.add(n);
    return n;
  }
  return String(randInt(100000, 1000000));
}

/** Memorable family codes for new lads when that PIN is still free. */
const PREFERRED_FAMILY_CODE: Record<string, string> = {
  "6) Logan Massey": "040715",
  "66) Max Shaw": "661166",
};

async function fillMissingParentCodes(
  sql: Awaited<ReturnType<typeof getSql>>,
  squad: string[],
): Promise<void> {
  const existing = await sql<{ pin: string; player: string }>`select pin, player from parent_logins`.catch(
    () => [] as { pin: string; player: string }[],
  );
  const used = new Set(existing.map((r) => r.pin));
  const have = new Set(existing.map((r) => r.player));
  const wanted = [...squad];
  if (!have.has(VIEW_ALL_PLAYER)) wanted.push(VIEW_ALL_PLAYER);
  for (const player of wanted) {
    if (have.has(player)) continue;
    const preferred = PREFERRED_FAMILY_CODE[player];
    const pin =
      preferred && !used.has(preferred) && !BLOCKED.has(preferred) ? preferred : sixDigit(used);
    used.add(pin);
    have.add(player);
    const family = player === VIEW_ALL_PLAYER ? VIEW_ALL_FAMILY : player;
    await sql`
      insert into parent_logins (player, pin, family)
      values (${player}, ${pin}, ${family})
      on conflict (player) do nothing
    `;
  }
  for (const [player, preferred] of Object.entries(PREFERRED_FAMILY_CODE)) {
    if (BLOCKED.has(preferred)) continue;
    const owner = existing.find((r) => r.pin === preferred);
    if (owner && owner.player !== player) continue;
    const row = existing.find((r) => r.player === player);
    if (row?.pin === preferred) continue;
    try {
      await sql`update parent_logins set pin = ${preferred} where player = ${player}`;
    } catch {
      // pin unique
    }
  }
}

async function locked(
  sql: Awaited<ReturnType<typeof getSql>>,
  id: string,
): Promise<boolean> {
  try {
    const rows = await sql<{ locked_until: unknown }>`
      select locked_until from parent_attempts where id = ${id} limit 1
    `;
    const until = rows[0]?.locked_until;
    if (!until) return false;
    const t = until instanceof Date ? until.getTime() : Date.parse(String(until));
    return Number.isFinite(t) && t > Date.now();
  } catch {
    return false;
  }
}

async function bumpFail(sql: Awaited<ReturnType<typeof getSql>>, id: string, max: number) {
  try {
    const rows = await sql<{ fails: number }>`
      insert into parent_attempts (id, fails, last_at)
      values (${id}, 1, now())
      on conflict (id) do update set
        fails = parent_attempts.fails + 1,
        last_at = now()
      returning fails
    `;
    const fails = Number(rows[0]?.fails || 1);
    if (fails >= max) {
      const until = new Date(Date.now() + LOCK_MS).toISOString();
      await sql`update parent_attempts set locked_until = ${until}::timestamptz where id = ${id}`;
    }
  } catch {
    // table lands in 0037
  }
}

async function clearFails(sql: Awaited<ReturnType<typeof getSql>>, id: string) {
  try {
    await sql`delete from parent_attempts where id = ${id}`;
  } catch {
    // ignore
  }
}

let schemaReady = false;

async function ensureParentSchema(sql: Awaited<ReturnType<typeof getSql>>) {
  if (schemaReady) return;
  try {
    await sql`
      create table if not exists parent_logins (
        player      text primary key,
        pin         text not null unique,
        family      text not null default '',
        created_at  timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists parent_attempts (
        id            text primary key,
        fails         integer not null default 0,
        locked_until  timestamptz,
        last_at       timestamptz not null default now()
      )
    `;
    await sql`
      create table if not exists parent_sessions (
        token_hash  text primary key,
        player      text not null,
        family      text not null default '',
        expires     timestamptz not null
      )
    `;
    schemaReady = true;
  } catch {
    // migrations apply these
  }
}

export async function parentFromToken(
  sql: Awaited<ReturnType<typeof getSql>>,
  token: string,
): Promise<ParentLoginRow | null> {
  if (!token || token.length < 20) return null;
  await ensureParentSchema(sql);
  try {
    const hash = await sha(token);
    const rows = await sql<ParentLoginRow & { expires: unknown }>`
      select s.player, coalesce(l.pin, '') as pin, s.family, s.expires
      from parent_sessions s
      left join parent_logins l on l.player = s.player
      where s.token_hash = ${hash}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    const exp = row.expires instanceof Date ? row.expires.getTime() : Date.parse(String(row.expires));
    if (!Number.isFinite(exp) || exp < Date.now()) return null;
    await sql`
      update parent_sessions
      set expires = ${new Date(Date.now() + SESSION_MS).toISOString()}::timestamptz
      where token_hash = ${hash}
    `.catch(() => undefined);
    return { player: row.player, pin: row.pin, family: row.family };
  } catch {
    return null;
  }
}

export async function parentForPin(
  sql: Awaited<ReturnType<typeof getSql>>,
  pin: string,
): Promise<ParentLoginRow | null> {
  const entered = normalizeCode(pin);
  if (!entered) return null;
  await ensureParentSchema(sql);
  try {
    const rows = await sql<ParentLoginRow>`select player, pin, family from parent_logins`;
    let match: ParentLoginRow | null = null;
    for (const row of rows) {
      if (safeEqual(row.pin, entered)) match = row;
    }
    return match;
  } catch {
    return null;
  }
}

export const checkParentPin = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().min(4).max(8) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensureParentSchema(sql);
    const { writeAudit } = await import("@/lib/audit");
    const fail = async (error: string, detail: string) => {
      await writeAudit({ actor: "parent", role: "parent", action: "login.fail", detail });
      return { ok: false as const, error };
    };

    if (await locked(sql, "global")) {
      try {
        await sql`delete from parent_attempts`;
      } catch {
        return fail("Too many tries. Wait 15 minutes.", "locked global");
      }
    }

    const raw = data.pin.replace(/\D/g, "");
    if (LOCAL_UNLOCKS[raw] || raw === FALLBACK_PIN) {
      return {
        ok: false as const,
        coach: true as const,
        error: "That’s the coach code. Open Coach in the menu.",
      };
    }

    const entered = normalizeCode(data.pin);
    if (!entered) {
      return fail("Wrong family code. Use the 6-digit code Brian sent, not the coach PIN.", "bad format");
    }

    try {
      const { PLAYERS } = await import("@/lib/players");
      const squad = await loadActiveSquad(sql).catch(() => [...PLAYERS]);
      await fillMissingParentCodes(sql, squad.length ? squad : [...PLAYERS]);
    } catch {
      // codes table
    }

    const codeKey = await sha(`code:${entered}`);
    if (await locked(sql, codeKey)) {
      return fail("Too many tries. Wait 15 minutes.", "locked code");
    }

    const row = await parentForPin(sql, entered);
    if (!row) {
      try {
        const n = await sql<{ n: number }>`select count(*)::int as n from parent_logins`;
        if (!Number(n[0]?.n || 0)) {
          return fail("Family codes are not ready yet. Ask Brian on WhatsApp.", "no codes");
        }
      } catch {
        // still a wrong code
      }
      await bumpFail(sql, codeKey, MAX_FAILS_CODE);
      return fail("Wrong family code.", "no match");
    }

    await clearFails(sql, codeKey);
    const token = randomToken();
    try {
      await sql`
        insert into parent_sessions (token_hash, player, family, expires)
        values (${await sha(token)}, ${row.player}, ${row.family || row.player}, ${new Date(Date.now() + SESSION_MS).toISOString()}::timestamptz)
      `;
    } catch {
      // session table lands in 0037; still allow login with token in memory
    }
    await writeAudit({
      actor: row.family || row.player,
      role: isViewAllPlayer(row.player) ? "coach" : "parent",
      action: "login.ok",
      player: isViewAllPlayer(row.player) ? "" : row.player,
      detail: isViewAllPlayer(row.player) ? "Manager view all" : "Performance analysis",
    });
    return {
      ok: true as const,
      player: row.player,
      family: row.family || row.player,
      token,
      viewAll: isViewAllPlayer(row.player),
    };
  });

export const resumeParentSession = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().min(20).max(200) }))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const row = await parentFromToken(sql, data.token);
    if (!row) return { ok: false as const };
    return {
      ok: true as const,
      player: row.player,
      family: row.family,
      viewAll: isViewAllPlayer(row.player),
    };
  });

export const listParentLogins = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40).optional() }))
  .handler(async ({ data }) => {
    const { checkCoachPin } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.pin || "" } });
    const empty = {
      rows: [] as ParentLoginRow[],
      manager: { player: VIEW_ALL_PLAYER, pin: "", family: VIEW_ALL_FAMILY },
    };
    if (!who.ok) return empty;
    const sql = await getSql();
    await ensureParentSchema(sql);
    const squad = await loadActiveSquad(sql);
    await fillMissingParentCodes(sql, squad);
    try {
      const rows = await sql<ParentLoginRow>`
        select player, pin, family from parent_logins order by player
      `;
      const map = new Map(rows.map((r) => [r.player, r]));
      return {
        rows: squad.map((player) => map.get(player) ?? { player, pin: "", family: "" }),
        manager: map.get(VIEW_ALL_PLAYER) ?? { player: VIEW_ALL_PLAYER, pin: "", family: VIEW_ALL_FAMILY },
      };
    } catch {
      return {
        rows: squad.map((player) => ({ player, pin: "", family: "" })),
        manager: { player: VIEW_ALL_PLAYER, pin: "", family: VIEW_ALL_FAMILY },
      };
    }
  });

export const issueParentLogins = createServerFn({ method: "POST" })
  .validator(z.object({ coachPin: z.string().trim().min(4).max(40) }))
  .handler(async ({ data }) => {
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.coachPin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) {
      return { success: false as const, error: "Only the manager can issue parent logins." };
    }
    const sql = await getSql();
    await ensureParentSchema(sql);
    const squad = await loadActiveSquad(sql);
    await fillMissingParentCodes(sql, squad);
    const all = await sql<ParentLoginRow>`select player, pin, family from parent_logins order by player`;
    const { writeAudit } = await import("@/lib/audit");
    await writeAudit({
      actor: who.name,
      role: "admin",
      action: "parent.codes.issue",
      detail: `${all.length} family codes`,
    });
    return {
      success: true as const,
      rows: all.filter((r) => !isViewAllPlayer(r.player)),
      manager: all.find((r) => isViewAllPlayer(r.player)) ?? null,
    };
  });

export const setParentLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      coachPin: z.string().trim().min(4).max(40),
      player: z.string().trim().min(1).max(80),
      pin: z.string().trim().min(4).max(8),
      family: z.string().trim().max(60).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.coachPin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) {
      return { success: false as const, error: "Only the manager can change parent logins." };
    }
    const pin = normalizeCode(data.pin);
    if (!pin) {
      return { success: false as const, error: "Code must be 4–8 numbers and not a coach code." };
    }
    const sql = await getSql();
    await ensureParentSchema(sql);
    try {
      await sql`
        insert into parent_logins (player, pin, family)
        values (${data.player}, ${pin}, ${data.family || data.player})
        on conflict (player) do update set pin = excluded.pin, family = excluded.family
      `;
      await sql`delete from parent_sessions where player = ${data.player}`;
      const { writeAudit } = await import("@/lib/audit");
      await writeAudit({
        actor: who.name,
        role: "admin",
        action: "parent.code.set",
        player: data.player,
        detail: "Family code updated",
      });
      return { success: true as const };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (/unique|duplicate|23505/i.test(message)) {
        return { success: false as const, error: "That code is already in use." };
      }
      return { success: false as const, error: "Could not save parent login." };
    }
  });
