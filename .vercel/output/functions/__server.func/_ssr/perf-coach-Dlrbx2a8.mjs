import { a as parsePlayer } from "./players-CZr5uoUS.mjs";
import { c as plausibleClock, s as looksLikeClipLength } from "./fitness-C3S1VXBB.mjs";
import { r as perfKindLabel } from "./perf-kinds-BtI2G2yH.mjs";
import { n as drillMarks, s as speedScore10, t as TEST_BONUS } from "./test-bonus-DvKLNi3p.mjs";
import { extractClipFrames, extractClipFramesCached } from "./clip-frames-DvxCQOjr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perf-coach-Dlrbx2a8.js
var AGE = 11;
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, Math.round(n)));
}
function ageLabel(speed, kind) {
	const drill = perfKindLabel(kind);
	if (speed >= 9) return `Outstanding for age ${AGE} · ${drill}`;
	if (speed >= 7) return `Strong for age ${AGE} · ${drill}`;
	if (speed >= 5) return `On track for age ${AGE} · ${drill}`;
	if (speed >= 3) return `Good work for age ${AGE} · ${drill}`;
	return `Solid attempt for age ${AGE} · ${drill}`;
}
function styleCue(kind, speed) {
	if (kind === "s30_no") return speed >= 7 ? "Tall hips, arms driving, finish through the last cones." : "Drive the arms, stay tall, punch through the 30m gate.";
	if (kind === "s30_ball") return "Eyes up, ball out of the feet, finish when the ball goes through 30m.";
	if (kind.startsWith("zz50")) return "Low into the turns, plant and go — sharp, not round.";
	if (kind === "turns") return "Ball close, hips around the turn, explode out.";
	return "Plant, head still, strike through the far corner.";
}
function protocolLine(score) {
	return `Attempt +${score.start}. Speed ${score.speed}/10 (GO → last cones). Running style ${score.styleMark}/5.`;
}
function drillFeedback(score, secs, first, kind) {
	const t = kind === "shooting" ? `${secs.toFixed(0)} shot pts` : `${secs.toFixed(2)}s GO to last cones`;
	return `${score.speed >= 7 ? `Brilliant ${first} — that is U12 standard.` : score.speed >= 5 ? `Well done ${first} — keep pushing the last two metres.` : `Good effort ${first} — next time drive through the finish.`} ${perfKindLabel(kind)} ${t}. ${protocolLine(score)} Total ${score.points}/20. ${score.style}`;
}
function agePerfScore(kind, secs, player = "") {
	const first = parsePlayer(player).first || "Him";
	const clock = secs > 0 ? secs : 0;
	const parts = clock > 0 ? drillMarks(kind, clock) : drillMarks(kind, kind.startsWith("s30") ? 6.4 : kind.startsWith("zz") ? 20 : 9);
	const complete = TEST_BONUS.complete;
	const speed = plausibleClock(kind, clock) || kind === "shooting" ? parts.speed : 0;
	const styleMark = 0;
	const row = {
		technique: styleMark,
		grade: parts.timeGrade,
		points: complete + speed + styleMark,
		start: complete,
		finish: styleMark,
		timeGrade: parts.timeGrade,
		styleMark,
		speed,
		officialSecs: clock,
		ageLabel: ageLabel(speed, kind),
		style: styleCue(kind, speed),
		feedback: "",
		source: "age-bands"
	};
	row.feedback = clock > 0 ? drillFeedback(row, clock, first, kind) : `${first}: clip in. Waiting for the AI clock.`;
	return row;
}
function parseAi(raw, fallback, kind, clipDuration = 0) {
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) return fallback;
	try {
		const json = JSON.parse(raw.slice(start, end + 1));
		const go = Number(json.goSecs ?? json.go);
		const finish = Number(json.finishSecs ?? json.finish);
		const fromGates = Number.isFinite(go) && Number.isFinite(finish) && finish > go ? Math.round((finish - go) * 10) / 10 : 0;
		const guessed = Number(json.officialSecs ?? json.secs ?? fromGates ?? fallback.officialSecs);
		let officialSecs = Number.isFinite(guessed) && guessed > 1 && guessed < 90 ? Math.round(guessed * 10) / 10 : 0;
		if (fromGates > 0) officialSecs = fromGates;
		if (clipDuration > 9 && officialSecs > 0 && Math.abs(officialSecs - clipDuration) < 1.5 || kind !== "shooting" && !plausibleClock(kind, officialSecs)) officialSecs = fallback.officialSecs > 0 && plausibleClock(kind, fallback.officialSecs) ? fallback.officialSecs : 0;
		const finished = TEST_BONUS.complete;
		const speed = officialSecs > 0 ? speedScore10(kind, officialSecs) : 0;
		const styleMark = Number.isFinite(Number(json.technique ?? json.styleMark)) ? clamp(Number(json.technique ?? json.styleMark), 0, 5) : 0;
		const style = String(json.style || fallback.style).trim().slice(0, 180);
		const feedback = String(json.feedback || fallback.feedback).trim().slice(0, 800);
		const label = String(json.ageLabel || ageLabel(speed, kind)).trim().slice(0, 120);
		if (!feedback && officialSecs <= 0) return fallback;
		const points = finished + speed + styleMark;
		return {
			technique: styleMark,
			grade: Math.max(1, Math.round(speed / 2) || 1),
			points,
			start: finished,
			finish: styleMark,
			timeGrade: Math.max(1, Math.round(speed / 2) || 1),
			styleMark,
			speed,
			officialSecs,
			ageLabel: label || fallback.ageLabel,
			style: style || fallback.style,
			feedback: feedback || drillFeedback({
				...fallback,
				speed,
				styleMark,
				start: finished,
				officialSecs,
				points
			}, officialSecs, "Him", kind),
			source: "ai"
		};
	} catch {
		return fallback;
	}
}
function protocolPrompt(kind) {
	const clock = "Watch the stills IN ORDER. Official clock is GO (whistle / first move through the start cones) until the player — or the ball on with-ball 30m — is through the LAST two cones. Do NOT use how long the camera was on. Ignore wait at the start and the walk back.";
	const tech = "RUNNING STYLE /5 (0 none, 1 poor, 2 developing, 3 solid U12, 4 strong, 5 excellent): hips, arms, stride, posture, ball at feet, turns. Independent of the clock.";
	const complete = `ATTEMPT is always +${TEST_BONUS.complete} if they ran the drill. Total = 5 + speed/10 + style/5 (max 20). Age ${AGE} U12. Feedback must be rewarding for an 11-year-old: name them, praise the effort, one clear coaching point. Never harsh.`;
	if (kind === "s30_no") return `LINEAR SPEED NO BALL 30m. ${clock} Finish = body through the 30m cones. Age-11: ≤5.0s = 10, ≤5.2 = 9, ≤5.8 = 6, ≤6.4 = 4. A real 30m is about 5 seconds. ${tech} ${complete}`;
	if (kind === "s30_ball") return `LINEAR SPEED WITH BALL 30m. ${clock} Clock stops when the BALL goes through the 30m cones. ${tech} ${complete}`;
	if (kind === "zz50_no") return `50m ZIG-ZAG NO BALL. ${clock} GO to last cones. Age-11: ≤16s = 9–10, ≤20 = 5. ${tech} ${complete}`;
	if (kind === "zz50_ball") return `50m ZIG-ZAG WITH BALL. ${clock} Ball on the far foot. ${tech} ${complete}`;
	if (kind === "turns") return `TURNS. ${clock} GO until foot on the ball on the start line. Age-11: ≤7s = 9–10. ${tech} ${complete}`;
	return `SHOOTING. Count hits and judge plant, head, follow through. ${complete}`;
}
async function grokPerfScore(input) {
	const hintSecs = plausibleClock(input.kind, input.secs) ? input.secs : 0;
	const fallback = agePerfScore(input.kind, hintSecs, input.player);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return fallback;
	const first = parsePlayer(input.player).first || "the player";
	const drill = perfKindLabel(input.kind);
	const extracted = input.videoB64 ? input.cacheKey ? await extractClipFramesCached(input.cacheKey, input.videoB64, input.videoMime || "video/webm", 12) : await extractClipFrames(input.videoB64, input.videoMime || "video/webm", 12) : {
		duration: 0,
		frames: []
	};
	const frames = extracted.frames;
	const clipHint = looksLikeClipLength(input.kind, input.secs) || extracted.duration > 9;
	const stampList = frames.map((f, i) => `Frame ${String(i + 1).padStart(2, "0")} @ ${f.t.toFixed(2)}s`).join("\n");
	const hint = clipHint ? `The file is ${extracted.duration || input.secs}s long. That is CAMERA length, NOT the run. Ignore it. Instructions often fill the first half. Official clock starts on the word GO / first explosive step through the start cones, and stops when the body (or the ball on with-ball 30m) goes through the LAST two cones. U12 30m is typically 5.0–6.5s. Example: GO at 13.8s, through last cones at 19.1s → officialSecs 5.3. Never return 17–22s for a 30m.` : hintSecs > 0 ? `A GO-to-cones stopwatch said ${hintSecs}s. Use the film if the camera started early or stopped late.` : "No official clock. Read goSecs and finishSecs from the timestamped stills. Do not use how long the camera was on.";
	const text = `Player: ${first} (U12, age ${AGE})
Drill: ${drill} (${input.kind})
${hint}
${frames.length ? `Timestamped stills in order:\n${stampList}` : "No film stills — score from the stopwatch only."}

${protocolPrompt(input.kind)}

FASTER time = HIGHER speed /10. A 5.0s 30m beats a 6.4s 30m. Never award more points for a longer clip.

JSON only: goSecs (timestamp of GO / start cones), finishSecs (timestamp they pass the last two cones), officialSecs (finishSecs - goSecs, one decimal), complete (true), speed (0-10 from officialSecs vs age 11, faster is better), technique (0-5 running style), points (5+speed+technique), ageLabel (rewarding for U12), style (one encouraging coaching sentence), feedback (2 sentences: praise + one point to work on). Never use camera length as officialSecs.`;
	const content = [{
		type: "text",
		text
	}];
	frames.forEach((f, i) => {
		content.push({
			type: "image_url",
			image_url: {
				url: `data:image/jpeg;base64,${f.b64}`,
				detail: i === 0 || i === frames.length - 1 ? "high" : "low"
			}
		});
	});
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .15,
				max_tokens: 500,
				messages: [{
					role: "system",
					content: "You are the Cherrybrook Raging Bulls U12 performance coach. Timestamped stills. Clock is GO through the start cones until they pass the two end cones. Never use camera length. Faster run = more speed points. Technique is running style 0-5. Attempt is always +5. Feedback is rewarding for an 11-year-old. JSON only."
				}, {
					role: "user",
					content: frames.length ? content : text
				}]
			}),
			signal: AbortSignal.timeout(frames.length ? 45e3 : 14e3)
		});
		if (!res.ok) return fallback;
		return parseAi((await res.json()).choices?.[0]?.message?.content ?? "", fallback, input.kind, extracted.duration);
	} catch {
		return fallback;
	}
}
//#endregion
export { grokPerfScore };
