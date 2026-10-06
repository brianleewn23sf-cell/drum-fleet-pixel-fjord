"use client";

import { useEffect, useState } from "react";
import { Medal, Trophy } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { ASSISTANT_NAME, COACH_NAME, MANAGER_NAME, TRAINING_NIGHT, TRAINING_VENUE } from "@/lib/brand";
import {
  OPP_MOM_POINTS,
  PLAYERS_PLAYER_POINTS,
  septemberPodium,
  type MonthWindow,
  type PotmPodium,
  type PotmRow,
} from "@/lib/potm";
import { getPotm } from "@/lib/potm-actions";
import { publicName } from "@/lib/players";
import { placeAt, topNWithTies } from "@/lib/score-categories";
import { formatKickoff } from "@/lib/when";
import { PRIZE_LINE } from "@/lib/score-from";
import { PrizeExamples } from "@/components/prize-examples";

const PLACES = [
  {
    place: "1st",
    title: "Boxed medal",
    blurb: "Player of the month. Boxed medal, certificate, name on the board.",
  },
  {
    place: "2nd",
    title: "Medal",
    blurb: "Runner-up medal on the 3rd Monday.",
  },
  {
    place: "3rd",
    title: "Medal",
    blurb: "Third-place medal on the 3rd Monday.",
  },
] as const;

export function PotmGuide() {
  const [standings, setStandings] = useState<PotmRow[]>([]);
  const [period, setPeriod] = useState<MonthWindow | null>(null);
  const [awarded, setAwarded] = useState(false);
  const [podium, setPodium] = useState<PotmPodium | null>(septemberPodium);

  useEffect(() => {
    void getPotm({ data: {} })
      .then((data) => {
        setStandings((data.standings || []).filter((row) => row.total > 0));
        setPeriod(data.window);
        setAwarded(Boolean(data.winner));
        setPodium(data.lastPodium ?? septemberPodium());
      })
      .catch(() => {
        setStandings([]);
      });
  }, []);

  const monday = period
    ? formatKickoff(`${period.awardMonday}T12:00`, "EEEE d MMMM yyyy")
    : "";
  const top = topNWithTies(standings, (row) => row.total, 3);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg">
      <AppHeader boardLink="vote" />
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Cherrybrook FC · Raging Bulls U12s
        </p>
        <h2 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight">
          Player of the month
        </h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-fg">{PRIZE_LINE}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Every lad can win it. Zigzag, 30m, turns, ball on the back foot — train at home and the grade goes up.
          This is the live table. Medals and the certificate wait until the{" "}
          <span className="font-semibold text-fg">3rd Monday</span>.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          This is the live October table, from the day after 21 September through the 3rd Monday. Both Fridays count.
          Daisy Hill is in: Jacob Sands opposition MOM +20, Louie Biddiss manager’s player +10.
          Friday training is in the same total (attendance 10 + effort, attitude and achievement, max 40).
        </p>

        <section className="mt-4 overflow-hidden rounded-xl border border-border bg-surface shadow-panel">
          <div className="px-4 pt-4">
            <h3 className="font-display text-lg font-bold uppercase tracking-tight">
              {period?.label || "October 2026"}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {awarded
                ? "Locked on the 3rd Monday."
                : "Top 3. Anyone level with 3rd stays on. Medals wait until the 3rd Monday."}
              {monday ? ` Next medals ${monday}.` : ""}
            </p>
          </div>
          <div className="mt-3 flex gap-2 bg-elevated px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
            <span className="min-w-0 flex-1">Player</span>
            <span className="w-9 text-right">3-2-1</span>
            <span className="w-12 text-right">Train</span>
            <span className="w-9 text-right">MOM</span>
            <span className="w-9 text-right">Mgr</span>
            <span className="w-9 text-right">Tot</span>
          </div>
          {!top.length ? (
            <p className="px-4 py-4 text-sm text-muted">No points in October yet.</p>
          ) : (
            top.map((row, i) => (
              <div key={row.name} className="flex gap-2 border-t border-border px-3 py-2 text-sm">
                <span className="min-w-0 flex-1 font-medium">
                  <span className="mr-2 text-muted">{placeAt(i, top.map((r) => r.total))}</span>
                  {publicName(row.name)}
                </span>
                <span className="w-9 text-right tabular-nums text-muted">{row.parentPts || "—"}</span>
                <span className="w-12 text-right tabular-nums text-muted">{row.trainingPts || "—"}</span>
                <span className="w-9 text-right tabular-nums text-muted">
                  {row.oppMom ? row.oppMom * OPP_MOM_POINTS : "—"}
                </span>
                <span className="w-9 text-right tabular-nums text-muted">
                  {row.playersPlayer ? row.playersPlayer * PLAYERS_PLAYER_POINTS : "—"}
                </span>
                <span className="w-9 text-right font-semibold tabular-nums">{row.total}</span>
              </div>
            ))
          )}
        </section>

        {podium ? (
          <section className="mt-6 rounded-xl border border-accent/40 bg-accent-soft p-4 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              Awarded · {podium.label}
            </p>
            <h3 className="mt-1 font-display text-xl font-bold uppercase tracking-tight">
              Congratulations
            </h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-fg">
              Big congratulations to {publicName(podium.first)} for 1st, {publicName(podium.second)} 2nd
              and {publicName(podium.third)} 3rd.
            </p>
            <ol className="mt-3 space-y-1 text-sm">
              <li>1st · {publicName(podium.first)} · boxed medal</li>
              <li>2nd · {publicName(podium.second)} · medal</li>
              <li>3rd · {publicName(podium.third)} · medal</li>
            </ol>
            <p className="mt-3 text-sm text-muted">
              New month is open. Next medals on the 3rd Monday{monday ? ` · ${monday}` : ""}.
            </p>
          </section>
        ) : null}

        <section className="mt-6 rounded-xl border border-border bg-surface p-4 shadow-panel">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">
            The medals
          </h3>
          <p className="mt-1 mb-4 text-sm text-muted">
            Presented by {MANAGER_NAME}, head coach {COACH_NAME} and assistant {ASSISTANT_NAME}.
          </p>
          <ol className="flex flex-col gap-3">
            {PLACES.map((row, i) => (
              <li
                key={row.place}
                className={
                  i === 0
                    ? "flex gap-3 rounded-lg border border-accent bg-accent-soft px-3 py-3"
                    : "flex gap-3 rounded-lg border border-border bg-elevated px-3 py-3"
                }
              >
                {i === 0 ? (
                  <Trophy className="mt-0.5 size-6 shrink-0 text-accent" />
                ) : (
                  <Medal className="mt-0.5 size-6 shrink-0 text-muted" />
                )}
                <div>
                  <p className="font-display text-xl font-bold uppercase tracking-tight">
                    {row.place} · {row.title}
                  </p>
                  <p className="text-sm text-muted">{row.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-6">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">
            How points are picked
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Add these up from the 1st of the month through the 3rd Monday. Highest
            total is 1st, then 2nd, then 3rd. Ties are split on parent 3-2-1, then
            name.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-border">
            <div className="flex bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <span className="min-w-0 flex-1">What we count</span>
              <span>Pts</span>
            </div>
            <ScoreRow label="Parent 3-2-1 votes" detail="3, 2 or 1 each ballot. From Standish, the family who votes also gets 1 for their own child." value="as voted" />
            <ScoreRow
              label="Training award"
              detail={`${TRAINING_NIGHT} · ${TRAINING_VENUE} · attendance 10 + effort 10 + attitude 10 + achievement 10. Achievement is a strict perfect mark. Lose marks: not turning up, booting balls when Brian is talking, messing about, swearing.`}
              value="max 40"
            />
            <ScoreRow
              label="Games played"
              detail="5 points every time he is in the squad that plays."
              value="+5"
            />
            <ScoreRow
              label="Opposition MOM"
              detail="Their manager’s man of the match"
              value={`+${OPP_MOM_POINTS}`}
            />
            <ScoreRow
              label="Players’ / manager’s player"
              detail="One game-day pick, same award"
              value={`+${PLAYERS_PLAYER_POINTS}`}
            />
            <ScoreRow
              label="Performance tests"
              detail="+5 to complete each drill. Speed /10 vs age 11 from GO to the last cones (not when the camera stops). Technique /5."
              value="+5 · /10 · /5"
            />
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border bg-surface p-4">
          <h3 className="font-display text-lg font-bold uppercase tracking-tight">
            When it is awarded
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Always the <span className="font-semibold text-fg">3rd Monday of the month</span>.
            Next presentation{monday ? `: ${monday}` : " is posted on Coach → Month"}.
            After that Monday we lock the table and the medals go out. Until then this is only the running order.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            1st also gets the Player of the month certificate — crest, motto, scores
            — awarded by {MANAGER_NAME}, head coach {COACH_NAME}, assistant {ASSISTANT_NAME}.
          </p>
        </section>

        <PrizeExamples />

        <p className="mt-8 text-center font-display text-sm font-bold uppercase tracking-widest text-accent">
          Venimus, vidimus, vicimus
        </p>
      </main>
    </div>
  );
}

function ScoreRow({
  label,
  detail,
  value,
}: {
  label: string;
  detail: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-t border-border px-3 py-3">
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted">{detail}</p>
      </div>
      <p className="shrink-0 text-right text-sm font-semibold tabular-nums text-accent">{value}</p>
    </div>
  );
}
