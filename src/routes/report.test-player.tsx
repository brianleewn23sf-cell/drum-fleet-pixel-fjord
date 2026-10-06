import { createFileRoute } from "@tanstack/react-router";
import { FitnessPlayerReport } from "@/components/fitness-player-report";

export const Route = createFileRoute("/report/test-player")({
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
  }),
  component: Page,
});

function Page() {
  const { name } = Route.useSearch();
  if (!name) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#f3efe6] text-[#0c0c0d]">
        <p className="text-sm">Pick a player from Tests.</p>
      </main>
    );
  }
  return <FitnessPlayerReport player={name} />;
}
