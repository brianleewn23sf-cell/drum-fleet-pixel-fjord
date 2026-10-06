import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

export type AuditRow = {
  id: number;
  at: string;
  actor: string;
  role: string;
  action: string;
  detail: string;
  player: string;
};

export async function writeAudit(input: {
  actor: string;
  role?: string;
  action: string;
  detail?: string;
  player?: string;
}): Promise<void> {
  queueMicrotask(() => {
    void (async () => {
      try {
        const sql = await getSql();
        await sql`
          insert into audit_log (actor, role, action, detail, player)
          values (
            ${input.actor.slice(0, 80)},
            ${(input.role || "").slice(0, 20)},
            ${input.action.slice(0, 60)},
            ${(input.detail || "").slice(0, 240)},
            ${input.player ? input.player.slice(0, 80) : null}
          )
        `;
      } catch {
        // never block the action
      }
    })();
  });
}

export const listAudit = createServerFn({ method: "POST" })
  .validator(z.object({ coachPin: z.string().trim().min(4).max(40) }))
  .handler(async ({ data }) => {
    const { checkCoachPin, isAdminName } = await import("@/lib/coach-users");
    const who = await checkCoachPin({ data: { pin: data.coachPin } });
    if (!who.ok || (who.role !== "admin" && !isAdminName(who.name))) {
      return { rows: [] as AuditRow[] };
    }
    const sql = await getSql();
    try {
      const rows = await sql<Record<string, unknown>>`
        select id, at, actor, role, action, detail, player
        from audit_log
        order by at desc
        limit 80
      `;
      return {
        rows: rows.map((r) => ({
          id: Number(r.id),
          at: r.at instanceof Date ? r.at.toISOString() : String(r.at || ""),
          actor: String(r.actor || ""),
          role: String(r.role || ""),
          action: String(r.action || ""),
          detail: String(r.detail || ""),
          player: String(r.player || ""),
        })),
      };
    } catch {
      return { rows: [] as AuditRow[] };
    }
  });
