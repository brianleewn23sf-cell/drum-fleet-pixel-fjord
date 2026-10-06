"use client";

import { useEffect, useState } from "react";
import { CLUB_NAME, MANAGER_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import {
  BRIAN_PROFILE,
  BULLS_WAY,
  KEEPER_FACTS,
  POSSESSION_RULE,
  PRESS_RULE,
  FIRST_BALLS,
  COMPACT_EXPAND,
  SUB_ON,
  SUB_BRIEF,
  EVERYONE_PLAYS,
  NEGATIVE_NOTE,
  HOME_PRACTICE,
  fillLineupBrief,
  injuredNoteFor,
  CARRY_RULE,
  benchTalk,
  formationExtras,
  shapeNote,
  usualRoles,
} from "@/lib/brian-rules";
import {
  INJURED_SLOTS,
  RESERVE_SLOTS,
  SUB_SLOTS,
  UNAVAILABLE_SLOTS,
  formationById,
} from "@/lib/formations";
import { KitGraphic } from "@/components/kit-graphic";
import { getMatchPlans, type MatchPlan } from "@/lib/pitch-actions";
import { PLAYERS, pitchSurname, shortName } from "@/lib/players";
import { formatKickoff } from "@/lib/when";
import { shortClub } from "@/lib/wdyl";
import { gameDetailsFor } from "@/lib/game-details";
import { pregameWhatsAppText, sendWhatsApp } from "@/lib/whatsapp";

export function PregameReport({
  kickoff,
  opposition,
}: {
  kickoff: string;
  opposition: string;
}) {
  const [plan, setPlan] = useState<MatchPlan | null>(null);
  const [plans, setPlans] = useState<MatchPlan[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void getMatchPlans()
      .then((data) => {
        setPlans(data.plans);
        const found = data.plans.find(
          (p) => p.kickoff === kickoff && p.opposition === opposition,
        );
        setPlan(found ?? null);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [kickoff, opposition]);

  const formation = formationById(plan?.formation ?? "3-3-2");
  const kit = plan?.kit ?? "home";
  const lineup = plan?.lineup ?? {};
  const oppNotes = gameDetailsFor(plan?.opposition ?? opposition);
  const briefs = plan
    ? Object.values(plan.brief || {}).some((b) => b?.duty)
      ? plan.brief
      : fillLineupBrief(plan.formation, lineup, plans)
    : {};

  return (
    <div className="report-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 portrait; margin: 10mm; }
        html, body, .report-page {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        @media print {
          html, body { background: #f3efe6 !important; }
          .no-print { display: none !important; }
          .break { break-before: page; }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      `}</style>
      <div className="no-print flex flex-col items-end gap-2 px-4 py-3">
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
            onClick={() => {
              const url = globalThis.location.href;
              void sendWhatsApp(
                `${TEAM_NAME} pre-game`,
                pregameWhatsAppText({
                  opposition: shortClub(plan?.opposition ?? opposition),
                  formation: plan?.formation,
                  lineup,
                  kickoff: plan?.kickoff ?? kickoff,
                  home: plan?.home,
                  venue: plan?.venue,
                }),
                url,
              );
            }}
          >
            Send in WhatsApp
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-white"
            onClick={() => window.print()}
          >
            Colour PDF
          </button>
        </div>
        <p className="max-w-sm text-right text-xs text-[#6b6760]">
          Send in WhatsApp shares the colour report with parents. Or Colour PDF → Save as PDF with Background graphics on, then attach that file.
        </p>
      </div>

      {!ready ? (
        <p className="px-6 py-10 text-sm">Loading report…</p>
      ) : !plan ? (
        <p className="px-6 py-10 text-sm">No plan saved for this fixture yet. Coach → Pitch → Save plan first.</p>
      ) : (
        <article className="mx-auto max-w-3xl px-5 pb-8">
          <header className="flex items-center gap-3 border-b-4 border-[#b42318] pb-3">
            <img src="/bulls-crest.jpg" alt="" width={56} height={56} className="size-14 rounded-md object-cover" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
                {CLUB_NAME} · {TEAM_NAME}
              </p>
              <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
                Pre-game · vs {shortClub(plan.opposition)}
              </h1>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#b42318]">
                {MOTTO_LATIN}
              </p>
              <p className="text-xs italic text-[#6b6760]">{MOTTO_EN}</p>
            </div>
          </header>

          <p className="mt-3 text-sm">
            {formatKickoff(plan.kickoff, "EEEE d MMMM yyyy")} ·{" "}
            {formatKickoff(plan.kickoff, "HH:mm")} · {plan.home ? "Home" : "Away"} · {plan.venue}
          </p>
          <p className="text-sm font-semibold">
            Formation {formation.name} · {plan.home ? "Home kit" : "Away kit"}
          </p>
          <p className="mt-1 text-sm text-[#3a3834]">{shapeNote(formation.id)}</p>
          {oppNotes ? (
            <div className="mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm">
              <p className="font-semibold uppercase tracking-wide">{oppNotes.title}</p>
              <ul className="mt-1 list-disc pl-4">
                {oppNotes.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm">
            <p className="font-semibold uppercase tracking-wide">The way the Bulls play</p>
            <ul className="mt-1 list-disc pl-4">
              {BULLS_WAY.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {formationExtras(formation.id).map((line) => (
              <p key={line} className="mt-2">{line}</p>
            ))}
            <p className="mt-3 font-semibold uppercase tracking-wide">Brian’s way</p>
            <p className="mt-1">{BRIAN_PROFILE}</p>
            <p className="mt-3 font-semibold uppercase tracking-wide">With / without the ball</p>
            <p className="mt-1">{COMPACT_EXPAND}</p>
            <p className="mt-1">{FIRST_BALLS}</p>
            <p className="mt-1"><span className="font-semibold">Without.</span> {PRESS_RULE}</p>
            <p className="mt-1"><span className="font-semibold">With.</span> {POSSESSION_RULE}</p>
            <p className="mt-1">{CARRY_RULE}</p>
            <p className="mt-3 font-semibold uppercase tracking-wide">Keeper</p>
            <ul className="mt-1 list-disc pl-4">
              {KEEPER_FACTS.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto mt-4 max-w-sm overflow-hidden rounded-md bg-[#3f8a5a]">
            <svg viewBox="0 0 70 105" className="block w-full text-white" aria-hidden="true">
              <rect x="2" y="2" width="66" height="101" fill="none" stroke="currentColor" strokeWidth="0.7" />
              <line x1="2" y1="52.5" x2="68" y2="52.5" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="35" cy="52.5" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            {formation.slots.map((slot) => {
              const lad = lineup[slot.id];
              return (
                <div
                  key={slot.id}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                >
                  <KitGraphic kit={kit} number={lad ? lad.match(/^(\d+)/)?.[1] : undefined} className="w-8" />
                  <span className="max-w-16 truncate text-center font-display text-xs font-bold uppercase leading-tight text-white">
                    {lad ? pitchSurname(lad, PLAYERS) : slot.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-sm">
            <span className="font-semibold">Starting XI. </span>
            {formation.slots
              .map((slot) => lineup[slot.id])
              .filter(Boolean)
              .map((p) => shortName(p))
              .join(" · ") || "Tap the shirts on Pitch, then Save plan."}
          </p>
          <p className="mt-3 text-sm">
            <span className="font-semibold">Subs. </span>
            Impact players. Every game they mean as much as who starts.
          </p>
          <p className="mt-2 text-sm">
            <span className="font-semibold">Subs. </span>
            {SUB_SLOTS.map((id) => lineup[id])
              .filter(Boolean)
              .map((p) => {
                const usual = usualRoles(p, plans);
                return usual ? `${shortName(p)} (${usual})` : shortName(p);
              })
              .join(" · ") || "—"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Reserves · not match day. </span>
            {RESERVE_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "—"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Injured. </span>
            {INJURED_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "—"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Unavailable. </span>
            {UNAVAILABLE_SLOTS.map((id) => lineup[id]).filter(Boolean).map((p) => shortName(p)).join(" · ") || "—"}
          </p>
          <p className="mt-2 text-xs text-[#6b6760]">From {MANAGER_NAME}. One team. Share this PDF in the parents’ WhatsApp.</p>

          <section className="break mt-8">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
              Jobs · {formation.name}
            </h2>
            <p className="mt-1 mb-3 text-sm text-[#3a3834]">
              What we do with the ball, and what we do without it.
            </p>
            <div className="flex flex-col gap-3">
              {formation.slots.map((slot) => {
                const lad = lineup[slot.id];
                const job = briefs[slot.id];
                return (
                  <div key={slot.id} className="border-t border-[#0c0c0d]/20 pt-2">
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      {slot.label}
                      {lad ? ` · ${pitchSurname(lad, PLAYERS)}` : ""}
                    </p>
                    {job?.duty ? <p className="text-sm">{job.duty}</p> : null}
                    {job?.withBall ? (
                      <p className="mt-1 text-sm">
                        <span className="font-semibold">With. </span>
                        {job.withBall}
                      </p>
                    ) : null}
                    {job?.withoutBall ? (
                      <p className="mt-1 text-sm">
                        <span className="font-semibold">Without. </span>
                        {job.withoutBall}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight">
              Subs · stay involved
            </h3>
            <p className="mt-1 mb-2 text-sm">{SUB_BRIEF}</p>
            <div className="flex flex-col gap-3">
              {SUB_SLOTS.map((id, i) => {
                const lad = lineup[id];
                if (!lad) return null;
                const job = briefs[id];
                return (
                  <div key={id} className="border-t border-[#0c0c0d]/20 pt-2">
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      Sub {i + 1} · {pitchSurname(lad, PLAYERS)}
                    </p>
                    {job?.duty ? <p className="text-sm">{job.duty}</p> : <p className="text-sm">{benchTalk("sub", lad, plans, briefs, id)}</p>}
                  </div>
                );
              })}
            </div>
            <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight">
              Reserves · not match day
            </h3>
            <p className="mt-1 mb-2 text-sm">{HOME_PRACTICE}</p>
            <div className="flex flex-col gap-3">
              {RESERVE_SLOTS.map((id, i) => {
                const lad = lineup[id];
                if (!lad) return null;
                const job = briefs[id];
                return (
                  <div key={id} className="border-t border-[#0c0c0d]/20 pt-2">
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      Reserve {i + 1} · {pitchSurname(lad, PLAYERS)}
                    </p>
                    {job?.duty ? <p className="text-sm">{job.duty}</p> : null}
                  </div>
                );
              })}
            </div>
            <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight">
              Injured
            </h3>
            <p className="mt-1 mb-2 text-sm">You cannot train if you are injured.</p>
            <div className="flex flex-col gap-3">
              {INJURED_SLOTS.map((id, i) => {
                const lad = lineup[id];
                if (!lad) return null;
                return (
                  <div key={id} className="border-t border-[#0c0c0d]/20 pt-2">
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      Injured {i + 1} · {pitchSurname(lad, PLAYERS)}
                    </p>
                    <p className="text-sm">{injuredNoteFor(lad)}</p>
                  </div>
                );
              })}
            </div>
            <h3 className="mt-6 font-display text-xl font-bold uppercase tracking-tight">
              Unavailable
            </h3>
            <p className="mt-1 mb-2 text-sm">{HOME_PRACTICE}</p>
            <div className="flex flex-col gap-3">
              {UNAVAILABLE_SLOTS.map((id, i) => {
                const lad = lineup[id];
                if (!lad) return null;
                return (
                  <div key={id} className="border-t border-[#0c0c0d]/20 pt-2">
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      Unavailable {i + 1} · {pitchSurname(lad, PLAYERS)}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3">
              <p className="font-semibold uppercase tracking-wide">Standards</p>
              <p className="mt-1 text-sm">{NEGATIVE_NOTE}</p>
            </div>
          </section>
        </article>
      )}
    </div>
  );
}
