import { jsPDF } from "jspdf";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const crest = readFileSync(join(root, "public/bulls-crest.jpg")).toString("base64");
const outDir = join(root, "artifacts");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "Cherrybrook-Raging-Bulls-Performance-Analysis-Protocol.pdf");

const MAROON = [139, 0, 0];
const INK = [12, 12, 13];
const MUTED = [92, 88, 80];
const RULE = [201, 194, 180];

const doc = new jsPDF({ unit: "mm", format: "a4" });
const pageW = 210;
const margin = 16;
const maxW = pageW - margin * 2;
let y = 16;

function heading(text, size = 11) {
  y += 3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(size);
  doc.setTextColor(...MAROON);
  doc.text(text.toUpperCase(), margin, y);
  y += 2;
  doc.setDrawColor(...MAROON);
  doc.setLineWidth(0.35);
  doc.line(margin, y, margin + maxW, y);
  y += 6;
  doc.setTextColor(...INK);
}

function para(text, size = 10) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(size);
  doc.setTextColor(...INK);
  const lines = doc.splitTextToSize(text, maxW);
  doc.text(lines, margin, y);
  y += lines.length * (size * 0.42) + 3;
}

function bullet(title, text) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  const titleLines = doc.splitTextToSize(title, maxW);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 4.2 + 1;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...MUTED);
  const body = doc.splitTextToSize(text, maxW);
  doc.text(body, margin, y);
  y += body.length * 4.2 + 4;
  doc.setTextColor(...INK);
}

function footer(page) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text(
    "Cherrybrook FC  ·  Raging Bulls U12s  ·  Confidential — coaching staff",
    margin,
    287,
  );
  doc.text(`Page ${page} of 2`, pageW - margin, 287, { align: "right" });
}

// Header
doc.addImage(`data:image/jpeg;base64,${crest}`, "JPEG", margin, 12, 18, 18);
doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.setTextColor(...MUTED);
doc.text("CHERRYBROOK FC", margin + 22, 16);
doc.setFontSize(16);
doc.setTextColor(...INK);
doc.text("RAGING BULLS U12s", margin + 22, 23);
doc.setFontSize(9);
doc.setTextColor(...MAROON);
doc.text("VENIMUS, VIDIMUS, VICIMUS", margin + 22, 28);
doc.setFont("helvetica", "normal");
doc.setTextColor(...MUTED);
doc.text("We came, we saw, we conquered", margin + 22, 33);

doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.setTextColor(...INK);
doc.text("PERFORMANCE ANALYSIS", pageW - margin, 18, { align: "right" });
doc.setFont("helvetica", "normal");
doc.setFontSize(8);
doc.setTextColor(...MUTED);
doc.text("Protocol  ·  2026/27", pageW - margin, 23, { align: "right" });
doc.text("Brian Lee  ·  Connor Lee  ·  Gary Owen", pageW - margin, 28, { align: "right" });

doc.setDrawColor(...MAROON);
doc.setLineWidth(1.1);
doc.line(margin, 38, pageW - margin, 38);
y = 46;

heading("Purpose");
para(
  "These tests measure change of direction, linear speed and turning with the ball. The gap between with-ball and without-ball times is the dribble deficit. Closer times show more skill. Speed still counts. Best is fast and close.",
);

heading("Where it is stored");
bullet("Video", "Stays on the coach’s phone (Photos or Files). The app uses the clip to time the run. It does not keep a copy of the film. Keep the original on the phone.");
bullet("Times and analysis", "Saved in the Raging Bulls app when Save test is tapped. They remain for the season.");
bullet("Professional PDF", "Coach desk → Perf → Dribble deficit report → Print / PDF. Club crest, squad table, gaps and coach notes.");

heading("Recording setup");
para("1. Phone on a stand. Do not hold it. Movement spoils the time.");
para("2. Side-on to the drill so the start line and the finish are both in shot.");
para("3. Use 0.5–0.6× ultra-wide zoom so the full course fits.");
para("4. Keep still. Nobody walk in front of the lens.");
para("5. One run per clip. GO or whistle at the start. Stop at the finish.");
para("6. Film in the app, or upload a clip from the phone. The clip length is the time.");

heading("Smartphone camera");
para("Rear camera. Ultra-wide 0.5×. Video 1080p at 30 fps. Turn off HDR, cinematic, night mode and slow-mo. Lock AE/AF if available. Grid on to line up start and finish.");
para("File: MP4 or MOV  ·  Codec: H.264  ·  1080p or 720p  ·  30 fps  ·  no slow-mo  ·  no HDR  ·  under 3 minutes.");
para("iPhone: Camera → Video → 1080p HD at 30. Pinch to 0.5×. If uploads fail, Settings → Camera → Formats → Most Compatible.");
para("Android: Camera → Video → 1080p 30. Choose 0.5× or Ultra-wide. Turn off HDR video and Super steady if it crops the wide shot.");

footer(1);

doc.addPage();
y = 20;
doc.setFont("helvetica", "bold");
doc.setFontSize(14);
doc.setTextColor(...INK);
doc.text("THE TESTS", margin, y);
y += 3;
doc.setDrawColor(...MAROON);
doc.setLineWidth(0.8);
doc.line(margin, y, pageW - margin, y);
y += 8;

heading("1. Change of direction  ·  50m zigzag");
para("GO or whistle. Stop when the player goes through the end cones. One run without the ball, then one with the ball.");

heading("2. Linear speed  ·  30m");
para("GO or whistle. Straight line without the ball first. With the ball they may pass from 20m. Stop when the ball crosses the 30m mark.");

heading("3. Turning with the ball  ·  3m square");
para("Start on the start line, ball at feet. Run 3m — turn. Back 3m — turn. Out 3m — last turn. Sprint back. Stop when the foot is on the ball on the start line.");

heading("Scoring");
para("Difference = with ball minus without ball (dribble deficit). Rankings use speed without the ball plus the size of the gap. Fast and close together is the best result.");
para("Bonus points through the season: +5 for taking the test, 10 / 6 / 3 for top three on zigzag, 30m and turns, +5 if they improve next time.");

heading("How to run a session");
para("Coach desk → unlock → Perf. Pick the player and the date. Film or Upload for each run. Check the time. Save test. Open Dribble deficit report and Print / PDF for parents or staff.");

y += 4;
doc.setFillColor(243, 239, 230);
doc.rect(margin, y, maxW, 28, "F");
doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.setTextColor(...MAROON);
doc.text("CONFIDENTIAL", margin + 4, y + 8);
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
doc.setTextColor(...INK);
doc.text(
  "Prepared for Cherrybrook FC Raging Bulls U12s by Brian Lee (manager),",
  margin + 4,
  y + 15,
);
doc.text("Connor Lee (head coach) and Gary Owen (assistant).", margin + 4, y + 20);

footer(2);
writeFileSync(out, Buffer.from(doc.output("arraybuffer")));
console.log(out);
