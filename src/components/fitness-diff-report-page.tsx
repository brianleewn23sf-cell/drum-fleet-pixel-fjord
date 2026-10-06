"use client";

import { useEffect, useState } from "react";
import { FitnessDiffReport } from "@/components/fitness-diff-report";
import { getFitnessTests } from "@/lib/fitness-actions";
import type { FitnessAnalysis } from "@/lib/fitness";
import { sendWhatsApp } from "@/lib/whatsapp";
import { TEAM_NAME } from "@/lib/brand";

export function FitnessDiffReportPage() {
  const [rows, setRows] = useState<FitnessAnalysis[]>([]);

  useEffect(() => {
    void getFitnessTests()
      .then((d) => setRows(d.analysed))
      .catch(() => setRows([]));
  }, []);

  const url = typeof window === "undefined" ? "/report/tests" : window.location.href;

  return (
    <div className="bg-[#f3efe6]">
      <div className="no-print mx-auto flex max-w-[210mm] gap-2 px-8 pt-4">
        <button
          type="button"
          className="h-11 rounded-md bg-[#8b0000] px-4 text-sm font-semibold text-white"
          onClick={() => window.print()}
        >
          Print / PDF
        </button>
        <a
          href="/performance-analysis-protocol.pdf"
          download="Cherrybrook-Raging-Bulls-Performance-Analysis-Protocol.pdf"
          className="inline-flex h-11 items-center rounded-md border border-[#0c0c0d] px-4 text-sm font-semibold"
        >
          Protocol PDF
        </a>
        <button
          type="button"
          className="h-11 rounded-md bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
          onClick={() =>
            void sendWhatsApp(
              `${TEAM_NAME} performance analysis`,
              `${TEAM_NAME} ball manipulation report. Extra time = with the ball minus without. Smaller extra is better.`,
              url,
            )
          }
        >
          WhatsApp
        </button>
      </div>
      <FitnessDiffReport rows={rows} />
    </div>
  );
}
