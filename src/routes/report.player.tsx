import { createFileRoute } from "@tanstack/react-router";
import { PlayerWeekReport } from "@/components/player-week-report";

export const Route = createFileRoute("/report/player")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
  }),
  component: ReportPage,
});

function ReportPage() {
  const { name } = Route.useSearch();
  if (!name) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]">
        <p className="text-sm">Pick a player from Performance.</p>
      </main>
    );
  }
  return <PlayerWeekReport player={name} />;
}
