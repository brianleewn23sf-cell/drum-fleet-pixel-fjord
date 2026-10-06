"use client";

import { VOTING_RULES, VOTING_RULES_INTRO } from "@/lib/youth-rules";

export function VotingRules({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-xl border border-accent bg-accent-soft p-4 shadow-panel">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-accent">
        How to vote
      </h2>
      <p className="mt-1 text-sm text-fg">{VOTING_RULES_INTRO}</p>
      {compact ? null : (
        <ul className="mt-2 flex flex-col gap-1 text-sm text-fg">
          {VOTING_RULES.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
