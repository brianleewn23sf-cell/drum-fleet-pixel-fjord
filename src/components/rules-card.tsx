"use client";

import { CLUB_NAME, MANAGER_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { BULLS_RULES_WAY, PLAYED_POINTS_RULE, RULE_ROWS, TRAINING_MARKS_INTRO, TRAINING_MARKS_LOSE, VOTING_RULES, VOTING_RULES_INTRO } from "@/lib/youth-rules";
import { sendWhatsApp } from "@/lib/whatsapp";

export function RulesCard() {
  return (
    <div className="report-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 portrait; margin: 10mm; }
        html, body, .report-page {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          html, body { background: #f3efe6 !important; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="no-print flex flex-col items-end gap-2 px-4 py-3">
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
            onClick={() => {
              void sendWhatsApp(
                `${TEAM_NAME} · U12 9v9 rules`,
                `${TEAM_NAME} — how we play 9v9 this season\n${MOTTO_LATIN} — ${MOTTO_EN}`,
                globalThis.location.href,
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
          One page. Save as PDF with Background graphics on, or send the colour link.
        </p>
      </div>

      <article className="mx-auto max-w-3xl px-5 pb-6">
        <header className="flex items-center gap-3 border-b-4 border-[#b42318] pb-3">
          <img src="/bulls-crest.jpg" alt="" width={56} height={56} className="size-14 rounded-md object-cover" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
              {CLUB_NAME} · {TEAM_NAME}
            </p>
            <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
              How we play · U12 9v9
            </h1>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#b42318]">{MOTTO_LATIN}</p>
            <p className="text-xs italic text-[#6b6760]">{MOTTO_EN}</p>
          </div>
        </header>

        <p className="mt-3 text-sm">
          FA youth football 2026/27. Wigan & District Youth League. From {MANAGER_NAME}.
        </p>

        <div className="mt-3 overflow-hidden rounded-md border-2 border-[#b42318]">
          <table className="w-full text-left text-sm">
            <tbody>
              {RULE_ROWS.map(([label, value], i) => (
                <tr key={label} className={i % 2 ? "bg-[#f8e4e2]" : "bg-[#f3efe6]"}>
                  <th className="w-28 px-3 py-2 align-top font-semibold uppercase tracking-wide text-[#b42318]">
                    {label}
                  </th>
                  <td className="px-3 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm">
          <p className="font-semibold uppercase tracking-wide">The Bulls way</p>
          <p className="mt-1">
            {BULLS_RULES_WAY}
          </p>
        </div>
        <div className="mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm">
          <p className="font-semibold uppercase tracking-wide">Games played</p>
          <p className="mt-1">{PLAYED_POINTS_RULE}</p>
        </div>
        <div className="mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm">
          <p className="font-semibold uppercase tracking-wide">Training marks</p>
          <p className="mt-1">{TRAINING_MARKS_INTRO}</p>
          <ul className="mt-1">
            {TRAINING_MARKS_LOSE.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </div>
        <div className="mt-3 rounded-md border-2 border-[#b42318] bg-[#f8e4e2] p-3 text-sm">
          <p className="font-semibold uppercase tracking-wide">How to vote</p>
          <p className="mt-1">{VOTING_RULES_INTRO}</p>
          <ul className="mt-1">
            {VOTING_RULES.map((line) => (
              <li key={line}>• {line}</li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-xs text-[#6b6760]">
          FA rolling subs. Written so every family knows how we look after the lads.
        </p>
      </article>
    </div>
  );
}
