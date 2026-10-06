export const FALLBACK_PIN = "0803";
export const FALLBACK_NAME = "Brian Lee";

export type LocalUnlock = { name: string; role: "admin" | "coach" };

export const SHARED_SEATS: LocalUnlock[] = [
  { name: "Brian Lee", role: "admin" },
  { name: "Connor Lee", role: "admin" },
  { name: "Cullen Atkinson-Lee", role: "coach" },
];

/** Codes that must open even if the server is slow. */
export const LOCAL_UNLOCKS: Record<string, LocalUnlock> = {
  "0803": { name: "Brian Lee", role: "admin" },
  "123456": { name: "Dave Bailey", role: "coach" },
  "654321": { name: "Gavin Massey", role: "coach" },
};

export function seatForName(name: string): LocalUnlock | null {
  const n = name.trim().toLowerCase();
  return SHARED_SEATS.find((s) => s.name.toLowerCase() === n) ?? null;
}
