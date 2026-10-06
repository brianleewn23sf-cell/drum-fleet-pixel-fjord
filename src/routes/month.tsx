import { createFileRoute } from "@tanstack/react-router";
import { PotmGuide } from "@/components/potm-guide";

export const Route = createFileRoute("/month")({ component: MonthPage });

function MonthPage() {
  return <PotmGuide />;
}
