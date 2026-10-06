import { createFileRoute, Link } from "@tanstack/react-router";
import { TacticBoard } from "@/components/tactic-board";

export const Route = createFileRoute("/tactics")({
  component: TacticsPage,
});

function TacticsPage() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/95 px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Cherrybrook · 9v9</p>
            <h1 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
              Tactics and training
            </h1>
          </div>
          <Link
            to="/coach"
            className="inline-flex h-11 items-center rounded-md border border-border bg-surface px-3 text-xs font-semibold uppercase tracking-wide"
          >
            Coach
          </Link>
        </div>
      </header>
      <main className="flex-1 px-4 py-4 pb-8">
        <img
          src="/raging-bull.jpg"
          alt="Raging Bulls"
          className="mb-4 h-52 w-full rounded-xl object-cover object-center shadow-panel"
        />
        <TacticBoard />
      </main>
    </div>
  );
}
