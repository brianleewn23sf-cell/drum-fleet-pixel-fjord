"use client";

import { useEffect } from "react";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

async function hardReload() {
  try {
    window.sessionStorage.setItem("bulls-chunk-reload", String(Date.now()));
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((r) => r.unregister()));
    }
    if (window.caches) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {
    // still reload
  }
  window.location.replace(`${window.location.origin}/?ok=${Date.now()}#reload`);
}

function isStaleChunk(message: string) {
  return /dynamically imported module|Failed to fetch|Loading chunk|Loading CSS chunk/i.test(
    message,
  );
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  const message = error instanceof Error ? error.message : "";
  const stale = isStaleChunk(message);
  useEffect(() => {
    if (!stale) return;
    const last = Number(window.sessionStorage.getItem("bulls-chunk-reload") || 0);
    if (Date.now() - last < 20_000) return;
    void hardReload();
  }, [stale]);

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-accent" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-xl font-bold uppercase tracking-tight">
        Updating the app
      </h1>
      <p className="max-w-md text-sm leading-snug text-muted">
        {stale
          ? "Loading the latest version. If this stays, tap Reload, or open the link in Chrome (not WhatsApp)."
          : "Tap Reload. If this was in WhatsApp, open in Chrome or Safari first."}
      </p>
      <button
        type="button"
        className="mt-2 inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-semibold text-accent-fg"
        onClick={() => void hardReload()}
      >
        Reload
      </button>
    </main>
  );
}
