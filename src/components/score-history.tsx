"use client";

import { groupGames } from "@/lib/league";
import { publicName, shortName } from "@/lib/players";
import { oppMomLabel } from "@/lib/scoring";
import { trainingTotal, type TrainingSession } from "@/lib/training";
import type { MatchAward } from "@/lib/coach-actions";
import type { VoteRow } from "@/lib/vote-actions";

export function ScoreHistory({
  history,
  awards,
  sessions,
}: {
  history: VoteRow[];
  awards: MatchAward[];
  sessions: TrainingSession[];
}) {
  const games = groupGames(history);
  const awardGames = new Map<string, MatchAward>();
  for (const a of awards) {
    const key = `${a.gameNumber.trim().toLowerCase()}|||${a.opposition.trim().toLowerCase()}`;
    awardGames.set(key, a);
  }
  const seen = new Set(games.map((g) => `${g.gameNumber.trim().toLowerCase()}|||${g.opposition.trim().toLowerCase()}`));
  const extraAwards = awards.filter((a) => {
    const key = `${a.gameNumber.trim().toLowerCase()}|||${a.opposition.trim().toLowerCase()}`;
    return !seen.has(key) && (a.oppMom || a.playersPlayer || a.managerPlayer);
  });

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">
          Parent votes · opp MOM · manager
        </h2>
        <p className="mt-1 text-xs text-muted">
          Every family’s 3-2-1, plus the opposition MOM (20) and manager’s player (10) for that game.
        </p>
        {!games.length && !extraAwards.length ? (
          <p className="mt-3 text-sm text-muted">No parent votes or match awards in yet.</p>
        ) : (
          <div className="mt-3 flex flex-col gap-4">
            {games.map((g) => {
              const key = `${g.gameNumber.trim().toLowerCase()}|||${g.opposition.trim().toLowerCase()}`;
              const award = awardGames.get(key);
              const manager = award?.playersPlayer || award?.managerPlayer;
              return (
                <article key={g.key} className="rounded-lg border border-border bg-bg px-3 py-3">
                  <p className="text-sm font-semibold">
                    {g.gameNumber}
                    {g.opposition ? <span className="font-medium text-muted"> vs {g.opposition}</span> : null}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    {g.votes.length} parent vote{g.votes.length === 1 ? "" : "s"}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    {g.votes.map((row) => (
                      <li key={row.id}>
                        <span className="text-muted">{shortName(row.parentChild)}’s family</span>
                        <span className="text-fg">
                          {" · "}3 {publicName(row.vote3)} · 2 {publicName(row.vote2)} · 1 {publicName(row.vote1)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <p>
                      <span className="font-semibold uppercase tracking-wide text-muted">Opp MOM</span>
                      <br />
                      {award?.oppMom ? oppMomLabel(award.oppMom) : "—"}
                    </p>
                    <p>
                      <span className="font-semibold uppercase tracking-wide text-muted">Manager’s player</span>
                      <br />
                      {manager ? publicName(manager) : "—"}
                    </p>
                  </div>
                </article>
              );
            })}
            {extraAwards.map((a) => {
              const manager = a.playersPlayer || a.managerPlayer;
              return (
                <article
                  key={`${a.gameNumber}-${a.opposition}`}
                  className="rounded-lg border border-border bg-bg px-3 py-3"
                >
                  <p className="text-sm font-semibold">
                    {a.gameNumber}
                    {a.opposition ? <span className="font-medium text-muted"> vs {a.opposition}</span> : null}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <p>
                      <span className="font-semibold uppercase tracking-wide text-muted">Opp MOM</span>
                      <br />
                      {a.oppMom ? oppMomLabel(a.oppMom) : "—"}
                    </p>
                    <p>
                      <span className="font-semibold uppercase tracking-wide text-muted">Manager’s player</span>
                      <br />
                      {manager ? publicName(manager) : "—"}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Friday training</h2>
        <p className="mt-1 text-xs text-muted">
          Attendance 10, effort 10, attitude 10, achievement 10. Max 40 a night.
        </p>
        {!sessions.some((s) => s.marks.some((m) => m.attended)) ? (
          <p className="mt-3 text-sm text-muted">No Friday marks in yet.</p>
        ) : (
          <div className="mt-3 flex flex-col gap-4">
            {sessions.map((s) => {
              const here = s.marks.filter((m) => m.attended);
              if (!here.length) return null;
              return (
                <article key={s.sessionDate} className="rounded-lg border border-border bg-bg px-3 py-3">
                  <p className="text-sm font-semibold">{s.label || s.sessionDate}</p>
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    {here.map((m) => (
                      <li key={m.player} className="flex justify-between gap-3">
                        <span>{publicName(m.player)}</span>
                        <span className="tabular-nums text-muted">
                          effort {m.effort ?? 0} · att {m.attitude ?? 0} · ach {m.achievement ?? 0} ·{" "}
                          <span className="font-semibold text-fg">{trainingTotal(m) ?? 0}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
