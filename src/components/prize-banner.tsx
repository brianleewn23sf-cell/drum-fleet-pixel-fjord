import { PRIZE_LINE } from "@/lib/score-from";

export function PrizeBanner() {
  return (
    <section className="rounded-xl border border-accent bg-accent-soft px-4 py-4">
      <p className="font-display text-2xl font-bold uppercase tracking-tight text-fg">
        Points make prizes
      </p>
      <p className="mt-2 text-sm font-semibold leading-7 text-fg">{PRIZE_LINE}</p>
    </section>
  );
}
