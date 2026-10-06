const PIN_KEY = "bulls-coach-ok";
const SEAT_KEY = "bulls-coach-seat";
const EMAIL_KEY = "bulls-super-admin-email";

const listeners = new Set<() => void>();
let memoryOn = false;

function emit() {
  for (const fn of listeners) fn();
}

export function subscribeCoachSession(fn: () => void) {
  listeners.add(fn);
  window.addEventListener("storage", fn);
  return () => {
    listeners.delete(fn);
    window.removeEventListener("storage", fn);
  };
}

export function isCoachUnlocked(): boolean {
  if (memoryOn) return true;
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem(PIN_KEY) === "1") {
      memoryOn = true;
      return true;
    }
    if (window.localStorage.getItem(EMAIL_KEY)) {
      memoryOn = true;
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function writeCoachSession(name: string, role: "admin" | "coach", pin: string) {
  memoryOn = true;
  try {
    window.sessionStorage.removeItem("bulls-coach-locked");
    window.localStorage.setItem(PIN_KEY, "1");
    if (name) {
      window.localStorage.setItem("bulls-coach-name", name);
      window.localStorage.setItem(SEAT_KEY, name);
    }
    window.sessionStorage.setItem("bulls-coach-role", role);
    window.localStorage.setItem("bulls-coach-role", role);
    window.sessionStorage.setItem("bulls-coach-pin", pin);
    window.localStorage.setItem("bulls-coach-pin", pin);
  } catch {
    // still treat as in
  }
  emit();
}

export function clearCoachSession() {
  memoryOn = false;
  try {
    window.localStorage.removeItem(PIN_KEY);
    window.localStorage.removeItem(SEAT_KEY);
    window.localStorage.removeItem("bulls-coach-name");
    window.localStorage.removeItem("bulls-coach-role");
    window.sessionStorage.removeItem("bulls-coach-role");
    window.sessionStorage.removeItem("bulls-coach-pin");
    window.localStorage.removeItem("bulls-coach-pin");
    window.sessionStorage.removeItem("bulls-coach-locked");
  } catch {
    //
  }
  emit();
}
