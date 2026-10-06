import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { ParentRules } from "@/components/parent-rules";

export const Route = createFileRoute("/how-we-play")({
  component: HowWePlayPage,
});

function HowWePlayPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg">
      <AppHeader boardLink="vote" />
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-8">
        <Link
          to="/shape"
          className="mb-4 inline-flex h-11 items-center rounded-md border border-border bg-surface px-4 text-xs font-semibold uppercase tracking-wide text-fg"
        >
          Team shape pictures
        </Link>
        <ParentRules />
      </main>
    </div>
  );
}
