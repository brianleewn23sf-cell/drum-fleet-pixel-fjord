/** True official clocks for U12. Longer than this is the camera, not the run. */
export function plausibleClock(kind: string, secs: number): boolean {
  if (!Number.isFinite(secs) || secs <= 0) return false;
  if (kind === "s30_no") return secs >= 4.0 && secs <= 8.8;
  if (kind === "s30_ball") return secs >= 4.4 && secs <= 9.6;
  if (kind === "zz50_no") return secs >= 11 && secs <= 28;
  if (kind === "zz50_ball") return secs >= 12 && secs <= 32;
  if (kind === "turns") return secs >= 4.5 && secs <= 14;
  if (kind === "shooting") return secs >= 0 && secs <= 24;
  return false;
}

export function looksLikeClipLength(kind: string, secs: number): boolean {
  if (!Number.isFinite(secs) || secs <= 0) return false;
  if (kind === "shooting") return false;
  return !plausibleClock(kind, secs);
}

export function filmKindImplausible(kind: "zigzag" | "sprint" | "turns" | "shooting", secs: number): boolean {
  if (kind === "sprint") return secs > 9;
  if (kind === "zigzag") return secs > 32;
  if (kind === "turns") return secs > 16;
  return false;
}
