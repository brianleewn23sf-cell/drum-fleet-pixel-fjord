"use client";

import { useId } from "react";
import type { KitId } from "@/lib/formations";
import { cn } from "@/lib/utils";

export function KitGraphic({
  kit,
  number,
  className,
}: {
  kit: KitId;
  number?: string;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const home = kit === "home";
  const hoopA = home ? "var(--color-accent)" : "var(--color-kit-navy)";
  const hoopB = home ? "var(--color-bg)" : "var(--color-fg)";
  const shorts = home ? "var(--color-bg)" : "var(--color-fg)";
  const socks = home ? "var(--color-bg)" : "var(--color-kit-navy)";
  const numFill = home ? "var(--color-fg)" : "var(--color-kit-gold)";

  return (
    <svg
      viewBox="0 0 28 44"
      className={cn("block w-9", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id={`hoop-${uid}`} patternUnits="userSpaceOnUse" width="28" height="6">
          <rect width="28" height="3" fill={hoopA} />
          <rect y="3" width="28" height="3" fill={hoopB} />
        </pattern>
        <clipPath id={`shirt-${uid}`}>
          <path d="M8 6 L12 4 L16 4 L20 6 L26 10 L23 14 L21 12 L21 24 Q14 26 7 24 L7 12 L5 14 L2 10 Z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#shirt-${uid})`}>
        <rect x="0" y="2" width="28" height="26" fill={`url(#hoop-${uid})`} />
      </g>
      <path
        d="M8 6 L12 4 L16 4 L20 6 L26 10 L23 14 L21 12 L21 24 Q14 26 7 24 L7 12 L5 14 L2 10 Z"
        fill="none"
        stroke={home ? "var(--color-bg)" : "var(--color-kit-navy)"}
        strokeWidth="0.6"
      />
      <rect x="8" y="24" width="12" height="8" rx="1" fill={shorts} />
      <rect x="8" y="32" width="4.5" height="9" rx="1" fill={socks} />
      <rect x="15.5" y="32" width="4.5" height="9" rx="1" fill={socks} />
      {number ? (
        <text
          x="14"
          y="18"
          textAnchor="middle"
          fill={numFill}
          fontSize="7"
          fontWeight="700"
          fontFamily="Barlow Condensed, sans-serif"
        >
          {number}
        </text>
      ) : null}
    </svg>
  );
}
