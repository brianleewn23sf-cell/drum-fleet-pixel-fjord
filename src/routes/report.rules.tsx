import { createFileRoute } from "@tanstack/react-router";
import { RulesCard } from "@/components/rules-card";

export const Route = createFileRoute("/report/rules")({
  component: RulesPage,
});

function RulesPage() {
  return <RulesCard />;
}
