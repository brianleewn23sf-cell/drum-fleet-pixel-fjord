import { FALLBACK_NAME, FALLBACK_PIN } from "@/lib/pins";

const EMAIL_KEY = "bulls-super-admin-email";

export type SuperSeat = { name: string; role: "admin"; pin: string };

const EXACT_EMAILS: Record<string, SuperSeat> = {
  "brian.lee@gmail.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "brianlee@gmail.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "brian.lee@googlemail.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "brian.lee@outlook.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "brian.lee@hotmail.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "brian.lee@icloud.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "brian@cherrybrookfc.com": { name: "Brian Lee", role: "admin", pin: FALLBACK_PIN },
  "connor.lee@gmail.com": { name: "Connor Lee", role: "admin", pin: FALLBACK_PIN },
  "connorlee@gmail.com": { name: "Connor Lee", role: "admin", pin: FALLBACK_PIN },
};

function compactLocal(email: string): string {
  const local = email.split("@")[0] ?? "";
  return local.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isLikelyEmail(raw: string): boolean {
  const e = normalizeEmail(raw);
  return /^[^\s@]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(e);
}

export function seatForAdminEmail(raw: string): SuperSeat | null {
  const email = normalizeEmail(raw);
  if (!isLikelyEmail(email)) return null;
  if (email === "dev@example.com") return null;
  if (EXACT_EMAILS[email]) return EXACT_EMAILS[email];
  const local = compactLocal(email);
  if (local.includes("brian") && local.includes("lee")) {
    return { name: FALLBACK_NAME, role: "admin", pin: FALLBACK_PIN };
  }
  if (local.includes("connor") && local.includes("lee")) {
    return { name: "Connor Lee", role: "admin", pin: FALLBACK_PIN };
  }
  const remembered = readRememberedAdminEmail();
  if (remembered && remembered === email) {
    return { name: FALLBACK_NAME, role: "admin", pin: FALLBACK_PIN };
  }
  return null;
}

export function readRememberedAdminEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(EMAIL_KEY) || "";
  } catch {
    return "";
  }
}

export function rememberAdminEmail(email: string) {
  try {
    window.localStorage.setItem(EMAIL_KEY, normalizeEmail(email));
  } catch {
    //
  }
}

export function forgetAdminEmail() {
  try {
    window.localStorage.removeItem(EMAIL_KEY);
  } catch {
    //
  }
}
