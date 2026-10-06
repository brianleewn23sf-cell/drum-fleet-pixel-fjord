export type Stint = {
  id: number;
  player: string;
  slotId: string;
  onMinute: number;
  offMinute: number | null;
  started: boolean;
};

export type LiveClock = {
  startedAt: string | null;
  elapsedMs: number;
  running: boolean;
  ended: boolean;
  half?: 1 | 2;
  halfMarkMs?: number;
};

export const HALF_MS = 30 * 60 * 1000;
export const GAME_MS = 60 * 60 * 1000;

export function startedAtMs(value: unknown): number | null {
  if (value == null || value === "") return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value instanceof Date) {
    const t = value.getTime();
    return Number.isFinite(t) ? t : null;
  }
  const t = Date.parse(String(value));
  return Number.isFinite(t) ? t : null;
}

export function clockElapsedMs(clock: LiveClock, now = Date.now()): number {
  if (!clock.running) return Math.max(0, clock.elapsedMs);
  const t = startedAtMs(clock.startedAt);
  if (t == null) return Math.max(0, clock.elapsedMs);
  return Math.max(0, clock.elapsedMs + Math.max(0, now - t));
}

export function gameMinute(clock: LiveClock, now = Date.now()): number {
  return Math.floor(clockElapsedMs(clock, now) / 60000);
}

export function formatClock(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function halfRemainingMs(elapsedMs: number, halfMarkMs: number): number {
  return HALF_MS - (elapsedMs - halfMarkMs);
}

export function formatInjury(ms: number): string {
  return `+${formatClock(ms)}`;
}

export function matchFace(
  elapsedMs: number,
  half: 1 | 2 = 1,
  halfMarkMs = 0,
): { displayMs: number; extraMs: number; extraLabel: string; inExtra: boolean } {
  if (half === 1) {
    const extra = Math.max(0, elapsedMs - HALF_MS);
    return {
      displayMs: Math.min(elapsedMs, HALF_MS),
      extraMs: extra,
      extraLabel: "Injury",
      inExtra: extra > 0,
    };
  }
  const second = Math.max(0, elapsedMs - halfMarkMs);
  const extra = Math.max(0, second - HALF_MS);
  return {
    displayMs: HALF_MS + Math.min(second, HALF_MS),
    extraMs: extra,
    extraLabel: "Overtime",
    inExtra: extra > 0,
  };
}

export function stintMinutes(stint: Stint, currentMinute: number, ended: boolean): number {
  const off = stint.offMinute ?? currentMinute;
  return Math.max(0, off - stint.onMinute);
}

export function playerMinutes(
  stints: Stint[],
  currentMinute: number,
  ended: boolean,
): Record<string, { minutes: number; started: boolean; on: boolean }> {
  const next: Record<string, { minutes: number; started: boolean; on: boolean }> = {};
  for (const stint of stints) {
    const row = next[stint.player] ?? { minutes: 0, started: false, on: false };
    row.minutes += stintMinutes(stint, currentMinute, ended);
    row.started = row.started || stint.started;
    row.on = row.on || stint.offMinute == null;
    next[stint.player] = row;
  }
  return next;
}