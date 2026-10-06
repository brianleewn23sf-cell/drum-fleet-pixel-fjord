"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { RefreshCw, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { APP_BUILD, APP_BUILD_DATE, CLUB_NAME, MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { sendWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

function navClass(active: boolean) {
  return cn(
    "inline-flex h-11 shrink-0 items-center justify-center rounded-md px-3 text-center text-xs font-semibold uppercase tracking-wide sm:w-full sm:px-1",
    active ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg",
  );
}

function decodeShare(href: string): string {
  try {
    return new URL(href).searchParams.get("text") || href;
  } catch {
    return href;
  }
}

export function AppHeader({
  onRefresh,
  refreshing,
  boardLink,
  shareHref,
}: {
  onRefresh?: () => void;
  refreshing?: boolean;
  boardLink?: "board" | "vote";
  shareHref?: string;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/95 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4 sm:pb-3 sm:pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <img
            src="/bulls-crest.jpg"
            alt={`${CLUB_NAME} ${TEAM_NAME} crest`}
            width={64}
            height={64}
            decoding="async"
            className="size-10 shrink-0 rounded-lg object-cover ring-1 ring-border sm:size-16"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted sm:text-xs">
              {CLUB_NAME} · {APP_BUILD} · {APP_BUILD_DATE}
            </p>
            <h1 className="font-display text-xl font-bold uppercase leading-none tracking-tight text-fg sm:text-2xl">
              {TEAM_NAME}
            </h1>
            <p className="mt-1 hidden font-display text-sm font-bold uppercase tracking-widest text-accent sm:block">
              {MOTTO_LATIN}
            </p>
            <p className="hidden text-xs text-muted sm:block">{MOTTO_EN}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {shareHref ? (
            <Button
              type="button"
              variant="outline"
              className="h-11 shrink-0 px-3"
              onClick={() => {
                const message = decodeShare(shareHref);
                void sendWhatsApp(TEAM_NAME, message, "");
                toast.success("WhatsApp is open with the message in the box.");
              }}
            >
              <Share2 className="size-4" />
              Share
            </Button>
          ) : null}
          {onRefresh ? (
            <Button
              variant="outline"
              size="icon"
              aria-label="Refresh"
              onClick={onRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
            </Button>
          ) : null}
        </div>
      </div>
      {boardLink ? (
        <div className="mt-2 flex max-w-full flex-wrap gap-1.5 sm:grid sm:grid-cols-3 sm:gap-2">
          {(
            [
              ["/", "Vote"],
              ["/board", "Board"],
              ["/how-we-play", "Rules"],
              ["/perf", "Performance"],
              ["/month", "Month"],
              ["/coach", "Coach"],
              ["/tactics", "Tactics"],
            ] as const
          ).map(([to, label]) =>
            path === to ? (
              <span key={to} className={navClass(true)}>
                {label}
              </span>
            ) : (
              <Link key={to} to={to} preload={false} className={navClass(false)}>
                {label}
              </Link>
            ),
          )}
        </div>
      ) : null}
    </header>
  );
}
