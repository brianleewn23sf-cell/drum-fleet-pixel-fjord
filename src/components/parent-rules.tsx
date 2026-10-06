"use client";

import { Button } from "@/components/ui/button";
import { BULLS_RULES_WAY, PLAYED_POINTS_RULE, RULE_ROWS, TRAINING_MARKS_INTRO, TRAINING_MARKS_LOSE } from "@/lib/youth-rules";
import { PRIZE_LINE } from "@/lib/score-from";
import { VotingRules } from "@/components/voting-rules";
import { HOME_TEST_PARAMS } from "@/lib/home-tests";

export function ParentRules() {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight">How we play</h2>
      <p className="mb-3 text-sm text-muted">U12 9v9 · FA 2026/27 · Wigan & District Youth League</p>
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <tbody>
            {RULE_ROWS.map(([label, value], i) => (
              <tr key={label} className={i % 2 ? "bg-elevated" : "bg-bg"}>
                <th className="w-24 px-3 py-2 align-top text-xs font-semibold uppercase tracking-wide text-accent">
                  {label}
                </th>
                <td className="px-3 py-2 text-fg">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 rounded-lg border border-accent bg-accent-soft p-3 text-sm">
        <p className="font-semibold uppercase tracking-wide text-accent">The Bulls way</p>
        <p className="mt-1 text-fg">{BULLS_RULES_WAY}</p>
        <p className="mt-2 font-semibold text-fg">{PRIZE_LINE}</p>
      </div>
      <div className="mt-3 rounded-lg border border-border bg-bg p-3 text-sm">
        <p className="font-semibold uppercase tracking-wide text-accent">Games played</p>
        <p className="mt-1 text-fg">{PLAYED_POINTS_RULE}</p>
      </div>
      <div className="mt-3 rounded-lg border border-border bg-bg p-3 text-sm">
        <p className="font-semibold uppercase tracking-wide text-accent">Training marks</p>
        <p className="mt-1 text-fg">{TRAINING_MARKS_INTRO}</p>
        <ul className="mt-2 flex flex-col gap-1 text-fg">
          {TRAINING_MARKS_LOSE.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3 rounded-lg border border-border bg-bg p-3 text-sm">
        <p className="font-semibold uppercase tracking-wide text-accent">Home tests</p>
        <ul className="mt-2 flex flex-col gap-1 text-fg">
          {HOME_TEST_PARAMS.map(([label, value]) => (
            <li key={label}>
              <span className="font-semibold">{label}:</span> {value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <VotingRules />
      </div>
      <Button
        className="mt-4 w-full"
        variant="outline"
        onClick={() => {
          globalThis.location.href = "/report/rules";
        }}
      >
        One-page card / PDF
      </Button>
    </section>
  );
}
