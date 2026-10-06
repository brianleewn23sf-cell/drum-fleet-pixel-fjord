import { MOTTO_EN, MOTTO_LATIN, TEAM_NAME } from "@/lib/brand";
import { KEEPER_DUTY, KEEPER_WITH, KEEPER_WITHOUT, shapeNote } from "@/lib/brian-rules";
import {
  formationById,
  INJURED_SLOTS,
  RESERVE_SLOTS,
  SLOT_NAMES,
  SUB_SLOTS,
  UNAVAILABLE_SLOTS,
} from "@/lib/formations";
import { PLAYERS, shortName } from "@/lib/players";
import { PRIZE_LINE } from "@/lib/score-from";
import { formatKickoff } from "@/lib/when";

export function parentAppWhatsAppText(): string {
  return `${TEAM_NAME}

Vote is at the top, with the live bar graph for this game. No login.

${MOTTO_LATIN} — ${MOTTO_EN}

Tap the link:`;
}

export function voteReminderWhatsAppText(): string {
  return `${TEAM_NAME}

Just a nudge. Standish voting is still open. Open the app, pick your lad, then 3, 2 and 1. Not your own child. Voting gives your lad 1 point.

Cobras is Sunday 11 Oct, 10:00, Laithwaite Park Hub. No score for that game until it is played.

${MOTTO_LATIN} — ${MOTTO_EN}

Tap the link:`;
}

export function pregameWhatsAppText(input: {
  opposition: string;
  formation?: string;
  lineup?: Record<string, string>;
  kickoff?: string;
  home?: boolean;
  venue?: string;
}): string {
  const opposition = input.opposition;
  const formation = formationById(input.formation ?? "3-3-2");
  const lineup = input.lineup ?? {};
  const squadKeeper = PLAYERS.find((player) => /\(GK\)/i.test(player)) ?? "";
  const keeper = lineup.GK || squadKeeper;
  const when = input.kickoff
    ? `${formatKickoff(input.kickoff, "EEEE d MMMM")} · ${formatKickoff(input.kickoff, "HH:mm")}`
    : "";
  const where = [when, input.home == null ? "" : input.home ? "Home" : "Away", input.venue ?? ""]
    .filter(Boolean)
    .join(" · ");
  const positions = formation.slots
    .map((slot) => {
      const name = SLOT_NAMES[slot.id] ?? slot.label;
      const picked = slot.id === "GK" ? keeper : lineup[slot.id];
      const lad = picked ? shortName(picked) : "—";
      return `${slot.label} · ${name} — ${lad}`;
    })
    .join("\n");
  const keeperBlock = keeper
    ? [
        `Keeper — ${shortName(keeper)}`,
        KEEPER_DUTY,
        `With the ball: ${KEEPER_WITH}`,
        `Without the ball: ${KEEPER_WITHOUT}`,
      ].join("\n")
    : "";
  const groups = [
    ["Subs", SUB_SLOTS],
    ["Reserves", RESERVE_SLOTS],
    ["Injured", INJURED_SLOTS],
    ["Unavailable", UNAVAILABLE_SLOTS],
  ] as const;
  const bench = groups
    .map(([label, ids]) => {
      const names = ids.map((id) => lineup[id]).filter(Boolean).map((player) => shortName(player));
      return names.length ? `${label}\n${names.join("\n")}` : "";
    })
    .filter(Boolean)
    .join("\n\n");

  return [
    `${TEAM_NAME} pre-game vs ${opposition}`,
    where,
    "",
    `Formation ${formation.name}`,
    shapeNote(formation.id),
    "",
    positions,
    "",
    keeperBlock,
    ...(bench ? ["", bench] : []),
    "",
    `${MOTTO_LATIN} — ${MOTTO_EN}`,
    "",
    "Have a look at the team. Look after each other, high fives, and no moaning. Start or come on, it’s the same job. Win the first ball, then the second. Go and enjoy it.",
    "",
    "Open the colour report:",
  ].join("\n");
}

export function trainingWhatsAppText(code?: string, player?: string): string {
  const who = player ? ` for ${player}` : "";
  const pin = code ? `\nYour family code${who}: ${code}\n` : "\nUse the family code Brian sent you.\n";
  return `${PRIZE_LINE}

${TEAM_NAME} — train at home
${pin}
1. Open the link
2. Enter your family code
3. Watch the drills, film at home, send it in
4. Brian marks time and technique — more drills coming, so practise

Marks go on the Parent board — top 3 each month.

Friday training is still at Laithwaite Park.

Open here:`;
}

export function boardShareText(input: {
  game: string;
  opposition: string;
  votes: number;
  lines: string[];
}): string {
  const places = input.lines.length ? input.lines.join("\n") : "Votes are on the board.";
  return `${TEAM_NAME}

${input.game} vs ${input.opposition}
${input.votes} parent vote${input.votes === 1 ? "" : "s"}

${places}

Well done lads.`;
}

export function whatsAppShareUrl(text: string, url: string): string {
  const payload = [text.trim(), url.trim()].filter(Boolean).join("\n\n");
  return `https://wa.me/?text=${encodeURIComponent(payload)}`;
}

/** Last published site. Preview sessions die and show "Session terminated". */
const PUBLISHED_APP_ORIGIN = "https://clover-hill-pixel-acre.grok.me";
const PUBLISHED_HOST = "clover-hill-pixel-acre.grok.me";

function publishedOrigin(): string {
  if (typeof window !== "undefined" && window.location.hostname.toLowerCase() === PUBLISHED_HOST) {
    return window.location.origin;
  }
  return PUBLISHED_APP_ORIGIN;
}

/** Keep the path, but never hand parents a preview address. */
export function lastingUrl(input: string): string {
  const base = publishedOrigin();
  if (!input) return `${base}/`;
  try {
    const url = new URL(input, typeof window !== "undefined" ? window.location.href : `${base}/`);
    const host = url.hostname.toLowerCase();
    const path = `${url.pathname}${url.search}${url.hash}` || "/";
    if (host === PUBLISHED_HOST) return `${publishedOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
  } catch {
    return `${base}/`;
  }
}

export function parentShareUrl(path = "/"): string {
  return lastingUrl(path);
}

function stripOldLinks(text: string): string {
  return text
    .replace(/https?:\/\/el-acre\.grok\.me[^\s]*/gi, "")
    .replace(/https?:\/\/clover-hill-pixel-acre\.grok\.me[^\s]*/gi, "")
    .replace(/https?:\/\/[a-z0-9-]+\.grok-sandbox\.com[^\s]*/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Opens WhatsApp with the message already in the box, so it stays on screen. */
export async function sendWhatsApp(title: string, text: string, url: string): Promise<void> {
  const stable = "";
  let message = stripOldLinks(text.trim());
  if (stable && !message.includes(stable)) {
    message = [message, stable].filter(Boolean).join("\n\n");
  }
  try {
    await navigator.clipboard.writeText(message);
  } catch {
    // clipboard can be blocked; WhatsApp still gets the text in the link
  }
  const href = whatsAppShareUrl(message, "");
  const phone = /iPhone|iPad|Android/i.test(navigator.userAgent);
  if (phone) {
    window.location.href = href;
    return;
  }
  window.open(href, "_blank", "noopener,noreferrer");
  void title;
  void url;
}
