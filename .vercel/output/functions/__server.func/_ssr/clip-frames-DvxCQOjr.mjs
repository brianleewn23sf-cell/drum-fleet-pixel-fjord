import { randomUUID } from "node:crypto";
import { join } from "node:path";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/assets/clip-frames-DvxCQOjr.js
var execFile$1 = promisify(execFile);
function extFor(mime) {
	if (mime.includes("mp4")) return "mp4";
	if (mime.includes("quicktime") || mime.includes("mov")) return "mov";
	return "webm";
}
async function probeClipDuration(input) {
	try {
		const probe = await execFile$1("ffprobe", [
			"-v",
			"error",
			"-show_entries",
			"format=duration",
			"-of",
			"default=nk=1:nw=1",
			input
		], { timeout: 8e3 });
		const n = Number(String(probe.stdout || "").trim());
		return Number.isFinite(n) && n > .4 ? n : 0;
	} catch {
		return 0;
	}
}
/** Stills with timestamps so Grok can time GO → last cones, not file length. */
async function extractClipFrames(b64, mime = "video/webm", max = 12) {
	if (!b64 || b64.length < 80) return {
		duration: 0,
		frames: []
	};
	const dir = join(tmpdir(), `bulls-clip-${randomUUID()}`);
	await mkdir(dir, { recursive: true });
	const input = join(dir, `clip.${extFor(mime)}`);
	try {
		await writeFile(input, Buffer.from(b64, "base64"));
		const duration = await probeClipDuration(input);
		const span = duration > .4 ? duration : 8;
		const sprintWindow = duration > 12;
		const fps = sprintWindow ? 2 : Math.max(.4, Math.min(2, max / span));
		await execFile$1("ffmpeg", sprintWindow ? [
			"-y",
			"-ss",
			String(Math.max(0, duration - 10)),
			"-i",
			input,
			"-vf",
			`fps=${fps},scale=640:-2`,
			"-frames:v",
			String(max),
			"-q:v",
			"6",
			join(dir, "f_%02d.jpg")
		] : [
			"-y",
			"-i",
			input,
			"-vf",
			`fps=${fps.toFixed(2)},scale=640:-2`,
			"-frames:v",
			String(max),
			"-q:v",
			"6",
			join(dir, "f_%02d.jpg")
		], { timeout: 28e3 });
		const files = (await readdir(dir)).filter((f) => f.endsWith(".jpg")).sort();
		const frames = [];
		const t0 = sprintWindow ? Math.max(0, duration - 10) : 0;
		files.forEach((f, i) => {
			const t = Math.round((t0 + i / fps) * 100) / 100;
			frames.push({
				t,
				b64: ""
			});
		});
		await Promise.all(files.map(async (f, i) => {
			frames[i].b64 = (await readFile(join(dir, f))).toString("base64");
		}));
		return {
			duration,
			frames: frames.filter((fr) => fr.b64)
		};
	} catch {
		return {
			duration: 0,
			frames: []
		};
	} finally {
		await rm(dir, {
			recursive: true,
			force: true
		}).catch(() => void 0);
	}
}
var frameCache = /* @__PURE__ */ new Map();
async function extractClipFramesCached(key, b64, mime = "video/webm", max = 12) {
	const hit = frameCache.get(key);
	if (hit && Date.now() - hit.at < 18e4) return {
		duration: hit.duration,
		frames: hit.frames
	};
	const extracted = await extractClipFrames(b64, mime, max);
	frameCache.set(key, {
		...extracted,
		at: Date.now()
	});
	return extracted;
}
//#endregion
export { extractClipFrames, extractClipFramesCached };
