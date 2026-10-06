export const PLAYERS = [
  "1) Harry Parr",
  "3) Ruben Biddiss",
  "4) Louie Biddiss",
  "5) Kody Cox",
  "6) Logan Massey",
  "7) Cullen Atkinson-Lee",
  "8) Caleb Connelly",
  "9) Jacob Sands",
  "13) Zachary Read (GK)",
  "14) Henry Bearman",
  "16) Jacob Hill",
  "20) Archie Almond",
  "22) William Brittain",
  "23) Hayden Plumbley",
  "30) Isa Ali",
  "66) Max Shaw",
] as const;

export type PlayerName = (typeof PLAYERS)[number];

export type ParsedPlayer = {
  raw: string;
  num: string;
  name: string;
  first: string;
  initials: string;
};

export function parsePlayer(raw: string): ParsedPlayer {
  const s = String(raw || "");
  const m = s.match(/^(\d+)\)\s*(.+)$/);
  const name = m ? m[2] : s;
  const num = m ? m[1] : "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return {
    raw: s,
    num,
    name,
    first: parts[0] || name,
    initials: initials || "?",
  };
}

export function matchSquadPlayer(players: string[], raw: string): string | null {
  const entered = String(raw || "").trim();
  if (!entered) return null;
  if (players.includes(entered)) return entered;
  const clean = (s: string) =>
    parsePlayer(s).name.replace(/\s*\([^)]*\)\s*/g, "").trim().toLowerCase();
  const needle = clean(entered);
  if (!needle) return null;
  const exact = players.find((p) => clean(p) === needle);
  if (exact) return exact;
  const parts = needle.split(/\s+/).filter(Boolean);
  const last = parts[parts.length - 1] || "";
  const first = parts.length > 1 ? parts[0] : parts.length === 1 ? parts[0] : "";
  const hits = players.filter((p) => {
    const name = clean(p);
    const bits = name.split(/\s+/).filter(Boolean);
    const pLast = bits[bits.length - 1] || "";
    const pFirst = bits[0] || "";
    if (parts.length === 1) {
      return lastClose(first, pFirst) || lastClose(first, pLast);
    }
    return lastClose(last, pLast) && firstsClose(first, pFirst);
  });
  if (hits.length === 1) return hits[0];
  if (last.length >= 3) {
    const byLast = players.filter((p) => lastClose(clean(p).split(/\s+/).pop() || "", last));
    if (byLast.length === 1) return byLast[0];
  }
  return null;
}

const FIRST_NICKS: Record<string, string[]> = {
  zac: ["zachary", "zach"],
  zach: ["zachary", "zac"],
  zachary: ["zac", "zach"],
  will: ["william"],
  william: ["will"],
  louie: ["louis"],
  louis: ["louie"],
  harry: ["harold"],
  kody: ["cody"],
  cody: ["kody"],
};

function lastClose(a: string, b: string): boolean {
  if (!a || !b) return false;
  if (a === b) return true;
  const as = a.replace(/s$/, "");
  const bs = b.replace(/s$/, "");
  if (as && bs && as === bs) return true;
  if (a.length >= 4 && b.length >= 4 && (a.includes(b) || b.includes(a))) return true;
  return editDistanceAtMost1(a, b);
}

function firstsClose(a: string, b: string): boolean {
  if (!a || !b) return true;
  if (a === b) return true;
  if (a.length >= 3 && b.length >= 3 && (a.startsWith(b) || b.startsWith(a))) return true;
  return (FIRST_NICKS[a] || []).includes(b) || (FIRST_NICKS[b] || []).includes(a);
}

function editDistanceAtMost1(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  if (a.length === b.length) {
    let diff = 0;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i] && ++diff > 1) return false;
    return diff === 1;
  }
  const [short, long] = a.length < b.length ? [a, b] : [b, a];
  let i = 0;
  let j = 0;
  let skipped = false;
  while (i < short.length && j < long.length) {
    if (short[i] === long[j]) {
      i += 1;
      j += 1;
      continue;
    }
    if (skipped) return false;
    skipped = true;
    j += 1;
  }
  return true;
}

export function shortName(raw: string): string {
  const p = parsePlayer(raw);
  const cleaned = p.name.replace(/\s*\([^)]*\)\s*/g, "").trim();
  return p.num ? `#${p.num} ${cleaned}` : cleaned || p.name;
}

/** First name + surname, no shirt number — so three Jacobs stay distinct. */
export function publicName(raw: string): string {
  const p = parsePlayer(raw);
  const cleaned = p.name.replace(/\s*\([^)]*\)\s*/g, "").trim();
  return cleaned || p.name;
}

export function surname(raw: string): string {
  const cleaned = parsePlayer(raw).name.replace(/\s*\([^)]*\)\s*/g, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return (parts[parts.length - 1] || cleaned).toUpperCase();
}

export function isSquadPlayer(name: string): boolean {
  if (squadGone.has(name)) return false;
  return (PLAYERS as readonly string[]).includes(name) || squadExtra.has(name);
}

export const squadGone = new Set<string>();
export const squadExtra = new Set<string>();

export function pitchSurname(raw: string, squad: readonly string[]): string {
  const last = surname(raw);
  const first = parsePlayer(raw).first.replace(/\(.*\)/g, "").trim();
  const initial = (first.charAt(0) || "").toUpperCase();
  const same = squad.filter((p) => surname(p) === last);
  if (same.length <= 1) return last;
  return `${last} ${initial}`;
}

/** ISO dates (YYYY-MM-DD) where we have them. */
export const PLAYER_DOB: Record<string, string> = {
  "Logan Massey": "2015-07-04",
};

export function playerDob(raw: string): string | null {
  const name = parsePlayer(raw).name.replace(/\s*\([^)]*\)\s*/g, "").trim();
  return PLAYER_DOB[name] || null;
}

export function formatDob(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}

export function playerAgeYears(raw: string, on = new Date()): number | null {
  const dob = playerDob(raw);
  if (!dob) return null;
  const [y, m, d] = dob.split("-").map(Number);
  if (!y || !m || !d) return null;
  let age = on.getFullYear() - y;
  const md = on.getMonth() + 1;
  const dd = on.getDate();
  if (md < m || (md === m && dd < d)) age -= 1;
  return age;
}
