import type { TrainingSession } from "@/lib/training";

const KEY = "bulls-training-sessions-v1";

function valid(row: unknown): row is TrainingSession {
  if (!row || typeof row !== "object") return false;
  const s = row as TrainingSession;
  return typeof s.sessionDate === "string" && Array.isArray(s.marks);
}

export function readLocalTraining(): TrainingSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(valid);
  } catch {
    return [];
  }
}

export function writeLocalTraining(sessions: TrainingSession[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(sessions));
  } catch {
    // quota
  }
}

export function mergeTraining(
  server: TrainingSession[],
  local: TrainingSession[] = readLocalTraining(),
): TrainingSession[] {
  const map = new Map<string, TrainingSession>();
  const here = (s: TrainingSession) => s.marks.filter((m) => m.attended).length;
  for (const s of [...local, ...server]) {
    if (!s?.sessionDate) continue;
    const prev = map.get(s.sessionDate);
    if (!prev || here(s) >= here(prev)) map.set(s.sessionDate, s);
  }
  const out = [...map.values()].sort((a, b) => b.sessionDate.localeCompare(a.sessionDate));
  if (out.some((s) => here(s) > 0)) writeLocalTraining(out);
  return out;
}
