import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { TeamShape } from "@/components/team-shape";

export const Route = createFileRoute("/shape")({
  component: ShapePage,
});

function ShapePage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg">
      <AppHeader boardLink="vote" />
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-8">
        <TeamShape />
      </main>
    </div>
  );
}
