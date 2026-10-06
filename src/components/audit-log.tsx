"use client";

import { useEffect, useState } from "react";
import { listAudit, type AuditRow } from "@/lib/audit";
import { shortName } from "@/lib/players";

const ACTION: Record<string, string> = {
  "login.ok": "Parent signed in",
  "login.fail": "Wrong family code",
  "clip.submit": "Clip sent to coach",
  "clip.assess": "Result sent to parent",
  "parent.codes.issue": "Family codes issued",
  "parent.code.set": "Family code changed",
  "vote.submit": "Votes submitted",
  "squad.add": "Player added",
  "squad.remove": "Player removed",
  "test.save": "Test saved",
};

export function AuditLog({ coachPin }: { coachPin: string }) {
  const [rows, setRows] = useState<AuditRow[]>([]);

  useEffect(() => {
    if (!coachPin) return;
    void listAudit({ data: { coachPin } })
      .then((d) => setRows(d.rows))
      .catch(() => setRows([]));
  }, [coachPin]);

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Audit log</h3>
      <p className="mb-3 mt-1 text-sm leading-7 text-muted">
        Manager only. Who signed in, who sent a clip, who assessed it. Family codes are never stored here.
      </p>
      {!rows.length ? (
        <p className="text-sm leading-7 text-muted">Nothing logged yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.id} className="border-t border-border pt-3 text-sm leading-6">
              <p className="font-semibold">{ACTION[row.action] || row.action}</p>
              <p className="text-muted">
                {row.at.replace("T", " ").slice(0, 16)}
                {row.actor ? ` · ${shortName(row.actor)}` : ""}
                {row.player ? ` · ${shortName(row.player)}` : ""}
              </p>
              {row.detail ? <p className="text-muted">{row.detail}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
