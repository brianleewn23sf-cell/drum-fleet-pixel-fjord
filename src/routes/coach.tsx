import { createFileRoute } from "@tanstack/react-router";
import { CoachPage } from "@/components/coach-page";

export const Route = createFileRoute("/coach")({
  component: CoachPage,
});
