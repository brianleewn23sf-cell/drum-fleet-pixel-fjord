import { FALLBACK_PIN } from "@/lib/pins";

const CRED_KEY = "bulls-coach-bio";

export type CoachBio = {
  id: string;
  name: string;
  role: "admin" | "coach";
  pin: string;
};

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromB64url(s: string): Uint8Array<ArrayBuffer> {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function readCoachBio(): CoachBio | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CRED_KEY);
    if (!raw) return null;
    const row = JSON.parse(raw) as CoachBio;
    if (!row?.id || !row.name) return null;
    return row;
  } catch {
    return null;
  }
}

export function clearCoachBio() {
  try {
    window.localStorage.removeItem(CRED_KEY);
  } catch {
    //
  }
}

export async function bioAvailable(): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!window.PublicKeyCredential) return false;
  try {
    if (typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === "function") {
      return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    }
  } catch {
    return false;
  }
  return true;
}

export async function registerCoachBio(name: string, role: "admin" | "coach", pin: string): Promise<boolean> {
  if (!(await bioAvailable())) return false;
  const userId = crypto.getRandomValues(new Uint8Array(16));
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  try {
    const cred = (await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: "Raging Bulls Coach", id: window.location.hostname },
        user: {
          id: userId,
          name: name.replace(/\s+/g, ".").toLowerCase() || "coach",
          displayName: name || "Coach",
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
          residentKey: "preferred",
        },
        timeout: 60_000,
      },
    })) as PublicKeyCredential | null;
    if (!cred?.rawId) return false;
    const row: CoachBio = {
      id: b64url(cred.rawId),
      name,
      role,
      pin: pin || FALLBACK_PIN,
    };
    window.localStorage.setItem(CRED_KEY, JSON.stringify(row));
    return true;
  } catch {
    return false;
  }
}

export async function assertCoachBio(): Promise<CoachBio | null> {
  const saved = readCoachBio();
  if (!saved) return null;
  if (!(await bioAvailable())) return null;
  const challenge = crypto.getRandomValues(new Uint8Array(32));
  try {
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname,
        allowCredentials: [{ type: "public-key", id: fromB64url(saved.id) }],
        userVerification: "required",
        timeout: 60_000,
      },
    });
    if (!assertion) return null;
    return saved;
  } catch {
    return null;
  }
}
