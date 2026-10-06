import { createFileRoute } from "@tanstack/react-router";
import { PregameReport } from "@/components/pregame-report";

export const Route = createFileRoute("/report/pregame")({
  validateSearch: (search: Record<string, unknown>) => ({
    kickoff: typeof search.kickoff === "string" ? search.kickoff : "",
    opp: typeof search.opp === "string" ? search.opp : "",
  }),
  component: PregamePage,
});

function PregamePage() {
  const { kickoff, opp } = Route.useSearch();
  if (!kickoff || !opp) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]">
        <p className="text-sm">Open from Coach → Pitch after you pick a fixture.</p>
      </main>
    );
  }
  return <PregameReport kickoff={kickoff} opposition={opp} />;
}
