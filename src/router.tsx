import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function Pending() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg px-6 text-center text-fg">
      <p className="font-display text-lg font-bold uppercase tracking-tight">Raging Bulls</p>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultPendingComponent: Pending,
    defaultPreload: false,
  });
}