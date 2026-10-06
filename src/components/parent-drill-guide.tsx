import { U12_ACADEMY } from "@/lib/academy-u12";
import { PRIZE_LINE } from "@/lib/score-from";
import { CHALLENGES_NAME } from "@/lib/brand";
import { DrillSetupCards } from "@/components/drill-setup";
import {
  HOME_TEST_FILM,
  HOME_TEST_PARAMS,
  HOME_TEST_STEPS,
  HOME_TEST_WEEK,
  homeWeekLabel,
} from "@/lib/home-tests";

export function ParentDrillGuide() {
  const week = homeWeekLabel();
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Home tests · parameters
        </h3>
        <p className="font-display text-2xl font-bold uppercase tracking-tight text-fg">
          Points make prizes
        </p>
        <p className="text-sm font-semibold leading-7 text-fg">{PRIZE_LINE}</p>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <tbody>
              {HOME_TEST_PARAMS.map(([label, value], i) => (
                <tr key={label} className={i % 2 ? "bg-elevated" : "bg-bg"}>
                  <th className="w-20 px-3 py-2 align-top text-xs font-semibold uppercase tracking-wide text-accent">
                    {label}
                  </th>
                  <td className="px-3 py-2 text-fg">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs tabular-nums text-muted">
          This week {HOME_TEST_WEEK} · started {week.start} · next unlock {week.unlock}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          How to do it at home
        </h3>
        <ol className="flex flex-col gap-1 text-sm leading-7 text-fg">
          {HOME_TEST_STEPS.map((line, i) => (
            <li key={line}>
              {i + 1}. {line}
            </li>
          ))}
        </ol>
        <ul className="flex flex-col gap-1 text-sm leading-7 text-muted">
          {HOME_TEST_FILM.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
        <p className="text-sm leading-7 text-muted">{U12_ACADEMY.note}</p>
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Set up the tests
        </h3>
        <p className="text-sm leading-7 text-muted">
          {CHALLENGES_NAME}. Tick any drill or all six. The same drill only once this week.
        </p>
        <DrillSetupCards showClip />
        <p className="text-xs uppercase tracking-wider text-muted">U12 academy bands (without ball)</p>
        <p className="text-sm leading-7 text-muted">
          50m Zig Zag: {U12_ACADEMY.zz50.map((b) => `${b.band} ${b.time}`).join(" · ")}
        </p>
        <p className="text-sm leading-7 text-muted">
          30m: {U12_ACADEMY.s30.map((b) => `${b.band} ${b.time}`).join(" · ")}
        </p>
      </section>
    </div>
  );
}
