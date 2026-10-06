import { execFile as execFileCb } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFile = promisify(execFileCb);

function extFor(mime: string): string {
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("quicktime") || mime.includes("mov")) return "mov";
  return "webm";
}

export type ClipFrame = { t: number; b64: string };

export async function probeClipDuration(input: string): Promise<number> {
  try {
    const probe = await execFile(
      "ffprobe",
      ["-v", "error", "-show_entries", "format=duration", "-of", "default=nk=1:nw=1", input],
      { timeout: 8000 },
    );
    const n = Number(String(probe.stdout || "").trim());
    return Number.isFinite(n) && n > 0.4 ? n : 0;
  } catch {
    return 0;
  }
}

/** Stills with timestamps so Grok can time GO → last cones, not file length. */
export async function extractClipFrames(
  b64: string,
  mime = "video/webm",
  max = 12,
): Promise<{ duration: number; frames: ClipFrame[] }> {
  if (!b64 || b64.length < 80) return { duration: 0, frames: [] };
  const dir = join(tmpdir(), `bulls-clip-${randomUUID()}`);
  await mkdir(dir, { recursive: true });
  const input = join(dir, `clip.${extFor(mime)}`);
  try {
    await writeFile(input, Buffer.from(b64, "base64"));
    const duration = await probeClipDuration(input);
    const span = duration > 0.4 ? duration : 8;
    // Long clips are usually talk then a ~5s 30m. Sample denser on the last 10s.
    const sprintWindow = duration > 12;
    const fps = sprintWindow ? 2 : Math.max(0.4, Math.min(2, max / span));
    const args = sprintWindow
      ? ["-y", "-ss", String(Math.max(0, duration - 10)), "-i", input, "-vf", `fps=${fps},scale=640:-2`, "-frames:v", String(max), "-q:v", "6", join(dir, "f_%02d.jpg")]
      : ["-y", "-i", input, "-vf", `fps=${fps.toFixed(2)},scale=640:-2`, "-frames:v", String(max), "-q:v", "6", join(dir, "f_%02d.jpg")];
    await execFile("ffmpeg", args, { timeout: 28000 });
    const files = (await readdir(dir)).filter((f) => f.endsWith(".jpg")).sort();
    const frames: ClipFrame[] = [];
    const t0 = sprintWindow ? Math.max(0, duration - 10) : 0;
    files.forEach((f, i) => {
      const t = Math.round((t0 + i / fps) * 100) / 100;
      frames.push({ t, b64: "" });
    });
    await Promise.all(
      files.map(async (f, i) => {
        frames[i].b64 = (await readFile(join(dir, f))).toString("base64");
      }),
    );
    return { duration, frames: frames.filter((fr) => fr.b64) };
  } catch {
    return { duration: 0, frames: [] };
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
}

const frameCache = new Map<string, { duration: number; frames: ClipFrame[]; at: number }>();

export async function extractClipFramesCached(
  key: string,
  b64: string,
  mime = "video/webm",
  max = 12,
): Promise<{ duration: number; frames: ClipFrame[] }> {
  const hit = frameCache.get(key);
  if (hit && Date.now() - hit.at < 180_000) return { duration: hit.duration, frames: hit.frames };
  const extracted = await extractClipFrames(b64, mime, max);
  frameCache.set(key, { ...extracted, at: Date.now() });
  return extracted;
}
