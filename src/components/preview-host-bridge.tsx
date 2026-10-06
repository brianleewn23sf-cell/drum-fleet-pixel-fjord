"use client";

/**
 * Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
 * (and later receive registered routes). Noops when the app is not embedded.
 */

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  collectRoutePathsFromTree,
  installPreviewHostBridge,
} from "@/lib/preview-host-bridge";

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    const onPreloadError = (event: Event) => {
      event.preventDefault?.();
    };
    window.addEventListener("vite:preloadError", onPreloadError);
    return () => window.removeEventListener("vite:preloadError", onPreloadError);
  }, []);

  useEffect(() => {
    return installPreviewHostBridge({
      navigate: (path) => {
        try {
          const url = new URL(path, window.location.origin);
          const next = `${url.pathname}${url.search}${url.hash}`;
          const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`;
          if (next === cur) return;
        } catch {
          return;
        }
        router.history.push(path);
      },
      getRoutePaths: () => collectRoutePathsFromTree(router.routeTree),
    });
  }, [router]);

  return null;
}
