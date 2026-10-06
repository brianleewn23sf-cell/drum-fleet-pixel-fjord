import { createFileRoute } from "@tanstack/react-router";
import { FitnessDiffReportPage } from "@/components/fitness-diff-report-page";

export const Route = createFileRoute("/report/tests")({
  component: FitnessDiffReportPage,
});
