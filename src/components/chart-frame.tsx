"use client";

import type { ReactNode } from "react";

/** Sized box for Recharts. Always mounts children so scores never wait on a 0-width iframe. */
export function ChartFrame({
  height,
  children,
}: {
  height: number;
  children: ReactNode;
}) {
  return (
    <div className="relative w-full min-w-0" style={{ height, minHeight: height, width: "100%" }}>
      {children}
    </div>
  );
}
