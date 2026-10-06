import { createFileRoute } from "@tanstack/react-router";
import { ScoresSheet } from "@/components/scores-sheet";

export const Route = createFileRoute("/report/scores")({
  component: ScoresPage,
});

function ScoresPage() {
  return <ScoresSheet />;
}
