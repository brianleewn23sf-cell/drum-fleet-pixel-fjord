export const PERF_KINDS = [
  { id: "zz50_no", label: "50m Zig Zag test · without the ball", kind: "zigzag" as const },
  { id: "zz50_ball", label: "50m Zig Zag test · with the ball", kind: "zigzag" as const },
  { id: "s30_no", label: "Linear speed · without ball", kind: "sprint" as const },
  { id: "s30_ball", label: "Linear speed · with ball", kind: "sprint" as const },
  { id: "turns", label: "Turning with the ball", kind: "turns" as const },
  { id: "shooting", label: "Path2Pro shooting · 6 shots", kind: "shooting" as const },
] as const;

export type PerfKindId = (typeof PERF_KINDS)[number]["id"];
export type FilmKind = (typeof PERF_KINDS)[number]["kind"];

export function perfKindLabel(id: string): string {
  return PERF_KINDS.find((k) => k.id === id)?.label ?? id;
}

export function perfKindFilm(id: string): FilmKind {
  return PERF_KINDS.find((k) => k.id === id)?.kind ?? "zigzag";
}
