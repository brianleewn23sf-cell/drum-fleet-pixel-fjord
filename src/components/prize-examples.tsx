"use client";

import { MARKS_FROM, PRIZE_LINE } from "@/lib/score-from";

const EXAMPLES = [
  { grade: 5, label: "Academy", pts: "5 + 5 = 10", how: "Fast and the ball barely costs him" },
  { grade: 4, label: "Strong", pts: "5 + 4 = 9", how: "Good speed, good on the ball" },
  { grade: 3, label: "Decent", pts: "5 + 3 = 8", how: "In the mix — keep training at home" },
  { grade: 2, label: "Developing", pts: "5 + 2 = 7", how: "The ball is still slowing him" },
  { grade: 1, label: "Needs work", pts: "5 + 1 = 6", how: "Complete the test, then practise" },
] as const;

export function PrizeExamples() {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-fg">Points make prizes</h3>
      <p className="mt-2 text-sm font-semibold leading-7 text-fg">{PRIZE_LINE}</p>
      <p className="mt-2 text-sm leading-7 text-muted">
        Marks start {MARKS_FROM.slice(8)}/{MARKS_FROM.slice(5, 7)}/{MARKS_FROM.slice(0, 4)}.
        Nothing is given out until the 3rd Monday. More points, better chance of a prize —
        boxed medal 1st, medals 2nd and 3rd, certificate for 1st.
      </p>
      <p className="mt-2 text-sm leading-7 text-muted">
        Training at home helps. Zigzag, 30m, turns, receiving on the back foot in an open body.
        Closer times with the ball lift the grade. Grade 5 is academy for age 11.
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">Example only — not this month’s prizes</p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm">
        {EXAMPLES.map((row) => (
          <li key={row.grade} className="flex items-baseline justify-between gap-2">
            <span>
              <span className="font-semibold">Grade {row.grade}</span>
              <span className="text-muted"> · {row.label} · {row.how}</span>
            </span>
            <span className="shrink-0 tabular-nums text-accent">{row.pts}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
