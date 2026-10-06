import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { PLAYERS, parsePlayer } from "@/lib/players";
import { ONLINE_MS } from "@/lib/coach-users";

export type ParentOnline = {
  id: string;
  child: string;
  label: string;
  page: string;
  guest: boolean;
};

function guestId(): string {
  if (typeof window === "undefined") return "";
  const key = "bulls-parent-sid";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = `g-${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

let schemaReady = false;

async function ensurePresence(sql: Awaited<ReturnType<typeof getSql>>) {
  if (schemaReady) return;
  try {
    await sql`
      create table if not exists parent_presence (
        id text primary key,
        child text not null default '',
        page text not null default '',
        last_seen_ms bigint not null
      )
    `;
    schemaReady = true;
  } catch {
    // ignore
  }
}

export const heartbeatParent = createServerFn({ method: "POST" })
  .validator(
    z.object({
      sid: z.string().trim().min(1).max(40),
      child: z.string().trim().max(80).optional(),
      page: z.string().trim().max(24).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await getSql();
    await ensurePresence(sql);
    const child = (PLAYERS as readonly string[]).includes(data.child || "")
      ? data.child || ""
      : "";
    const id = child ? `c:${child}` : data.sid;
    const ms = Date.now();
    try {
      await sql`
        insert into parent_presence (id, child, page, last_seen_ms)
        values (${id}, ${child}, ${data.page || ""}, ${ms})
        on conflict (id) do update set
          child = excluded.child,
          page = excluded.page,
          last_seen_ms = excluded.last_seen_ms
      `;
      return { ok: true as const };
    } catch {
      return { ok: false as const };
    }
  });

export const listParentPresence = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40).optional() }))
  .handler(async ({ data }) => {
    const pin = (data.pin || "").trim();
    if (!pin) return { ok: false as const, parents: [] as ParentOnline[], guests: 0 };
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) {
      return { ok: false as const, parents: [] as ParentOnline[], guests: 0 };
    }
    const sql = await getSql();
    await ensurePresence(sql);
    const cutoff = Date.now() - ONLINE_MS;
    try {
      const rows = await sql<{ id: string; child: string; page: string; last_seen_ms: unknown }>`
        select id, child, page, last_seen_ms
        from parent_presence
        where last_seen_ms > ${cutoff}
        order by child asc, id asc
      `;
      const parents: ParentOnline[] = [];
      let guests = 0;
      for (const r of rows) {
        const child = String(r.child || "");
        const id = String(r.id || "");
        if (child) {
          parents.push({
            id,
            child,
            label: parsePlayer(child).name,
            page: String(r.page || ""),
            guest: false,
          });
        } else {
          guests += 1;
        }
      }
      return { ok: true as const, parents, guests };
    } catch {
      return { ok: true as const, parents: [] as ParentOnline[], guests: 0 };
    }
  });

export const listPerfUsers = createServerFn({ method: "POST" })
  .validator(z.object({ pin: z.string().trim().max(40).optional() }))
  .handler(async ({ data }) => {
    const pin = (data.pin || "").trim();
    const empty = { ok: false as const, live: [] as ParentOnline[], signedIn: [] as string[], clips: [] as { player: string; at: string }[] };
    if (!pin) return empty;
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) return empty;
    const sql = await getSql();
    await ensurePresence(sql);
    const cutoff = Date.now() - ONLINE_MS;
    const live: ParentOnline[] = [];
    try {
      const rows = await sql<{ id: string; child: string; page: string }>`
        select id, child, page from parent_presence
        where last_seen_ms > ${cutoff} and page = 'perf'
        order by child asc
      `;
      for (const r of rows) {
        const child = String(r.child || "");
        live.push({
          id: String(r.id),
          child,
          label: child ? parsePlayer(child).name : "Guest",
          page: "perf",
          guest: !child,
        });
      }
    } catch {
      // ignore
    }
    let signedIn: string[] = [];
    try {
      const rows = await sql<{ player: string }>`
        select distinct player from parent_sessions
        where expires > now()
        order by player
      `;
      signedIn = rows.map((r) => String(r.player));
    } catch {
      signedIn = [];
    }
    let clips: { player: string; at: string }[] = [];
    try {
      const rows = await sql<{ player: string; created_at: unknown }>`
        select player, max(created_at) as created_at
        from perf_submissions
        group by player
        order by max(created_at) desc
        limit 20
      `;
      clips = rows.map((r) => ({
        player: String(r.player),
        at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at || ""),
      }));
    } catch {
      clips = [];
    }
    return { ok: true as const, live, signedIn, clips };
  });

export function parentSessionId(): string {
  return guestId();
}
