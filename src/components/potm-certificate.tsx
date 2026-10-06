import { ASSISTANT_NAME, CLUB_NAME, COACH_NAME, MANAGER_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { OPP_MOM_POINTS, PLAYERS_PLAYER_POINTS, monthTitle } from "@/lib/potm";
import { parsePlayer } from "@/lib/players";

export function PotmCertificate({
  month,
  player,
  parentPts,
  trainingPts,
  oppMom,
  playersPlayer,
  total,
}: {
  month: string;
  player: string;
  parentPts: number;
  trainingPts: number;
  oppMom: number;
  playersPlayer: number;
  total: number;
}) {
  const parsed = parsePlayer(player);
  const title = monthTitle(month);

  return (
    <div className="cert-page bg-[#f3efe6] text-[#0c0c0d]">
      <style>{`
        @page { size: A4 landscape; margin: 0; }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 297mm;
            height: 210mm;
            overflow: hidden !important;
            background: #f3efe6 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print { display: none !important; }
          .cert-page {
            width: 297mm;
            height: 210mm;
            overflow: hidden;
          }
          .cert-sheet {
            width: 297mm;
            height: 210mm;
            box-sizing: border-box;
            padding: 8mm;
            max-width: none;
            page-break-after: avoid;
            page-break-inside: avoid;
            break-inside: avoid;
          }
        }
      `}</style>
      <div className="no-print flex justify-end gap-2 px-4 py-3">
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-md bg-[#b42318] px-4 text-sm font-semibold text-[#f3efe6]"
          onClick={() => window.print()}
        >
          Save / print PDF
        </button>
      </div>
      <article className="cert-sheet mx-auto box-border flex max-w-5xl flex-col border-4 border-[#b42318] bg-[#f3efe6] p-4">
        <div className="flex min-h-0 flex-1 flex-col justify-between border border-[#0c0c0d]/20 px-5 py-4 text-center">
          <div>
            <img
              src="/bulls-crest.jpg"
              alt={`${CLUB_NAME} ${TEAM_NAME} crest`}
              width={64}
              height={64}
              className="mx-auto size-16 rounded-md object-cover"
            />
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#6b6760]">
              {CLUB_NAME}
            </p>
            <p className="font-display text-2xl font-bold uppercase leading-none tracking-tight">
              {TEAM_NAME}
            </p>
            <p className="mt-1 font-display text-sm font-bold uppercase tracking-[0.22em] text-[#b42318]">
              {MOTTO_LATIN}
            </p>
            <p className="text-xs italic text-[#6b6760]">{MOTTO_EN}</p>
            <div className="mx-auto my-3 h-px w-32 bg-[#b42318]" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6b6760]">
              Player of the month
            </p>
            <p className="mt-1 font-display text-xl font-bold uppercase tracking-widest text-[#b42318]">
              {title}
            </p>
            <p className="mt-3 font-display text-5xl font-bold uppercase leading-none tracking-tight">
              {parsed.name}
            </p>
            {parsed.num ? (
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
                Shirt {parsed.num}
              </p>
            ) : null}
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-snug text-[#3a3834]">
              Awarded on the third Monday of {title} for 3-2-1 parent votes, training
              (including attendance), opposition man of the match and players’ / manager’s
              player. 1st place boxed medal.
            </p>
          </div>
          <div>
            <div className="mx-auto grid max-w-xl grid-cols-4 gap-2 text-center">
              <Stat label="3-2-1" value={parentPts} />
              <Stat label="Training" value={trainingPts} />
              <Stat label={`Opp MOM ×${OPP_MOM_POINTS}`} value={oppMom * OPP_MOM_POINTS} />
              <Stat label={`P/M ×${PLAYERS_PLAYER_POINTS}`} value={playersPlayer * PLAYERS_PLAYER_POINTS} />
            </div>
            <p className="mt-2 font-display text-3xl font-bold uppercase tracking-tight">
              {total} pts
            </p>
            <div className="mt-4 flex items-end justify-between gap-4 text-left">
              <div className="min-w-0 flex-1 border-t border-[#0c0c0d]/30 pt-1">
                <p className="truncate font-display text-sm font-bold uppercase tracking-tight">{MANAGER_NAME}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
                  Awarded by
                </p>
              </div>
              <div className="min-w-0 flex-1 border-t border-[#0c0c0d]/30 pt-1 text-center">
                <p className="truncate font-display text-sm font-bold uppercase tracking-tight">{COACH_NAME}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
                  Head coach
                </p>
              </div>
              <div className="min-w-0 flex-1 border-t border-[#0c0c0d]/30 pt-1 text-right">
                <p className="truncate font-display text-sm font-bold uppercase tracking-tight">{ASSISTANT_NAME}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6760]">
                  Assistant coach
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="font-display text-xl font-bold tabular-nums">{value}</p>
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6760]">{label}</p>
    </div>
  );
}
