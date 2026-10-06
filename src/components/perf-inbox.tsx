"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { PlayerPicker } from "@/components/player-picker";
import { assessPerf, listPerfInbox, submitCoachPerf, type PerfSubmission } from "@/lib/perf-submissions";
import { PERF_KINDS, perfKindLabel, type PerfKindId } from "@/lib/perf-kinds";
import { parsePlayer } from "@/lib/players";
import { fmtSecs } from "@/lib/fitness";
import { SAVE_LOCK } from "@/lib/coach-users";
import { mphFromTime } from "@/lib/test-bonus";
import { cn } from "@/lib/utils";

function storedCoachPin(fallback: string) {
  if (fallback.trim().length >= 4) return fallback.trim();
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem("bulls-coach-pin") || window.localStorage.getItem("bulls-coach-pin") || "";
}

export function PerfInbox({
  canSave = true,
  players = [],
  coachPin = "",
}: {
  canSave?: boolean;
  players?: string[];
  coachPin?: string;
}) {
  const [rows, setRows] = useState<PerfSubmission[]>([]);
  const [secs, setSecs] = useState<Record<number, string>>({});
  const [note, setNote] = useState<Record<number, string>>({});
  const [tech, setTech] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState<number | null>(null);
  const [player, setPlayer] = useState(players[0] ?? "");
  const [kind, setKind] = useState<PerfKindId>("s30_no");
  const [time, setTime] = useState("");
  const [mph, setMph] = useState("");
  const [speedScore, setSpeedScore] = useState("");
  const [uploadTech, setUploadTech] = useState("");
  const [uploadNote, setUploadNote] = useState("");
  const [sending, setSending] = useState(false);
  const [speedById, setSpeedById] = useState<Record<number, string>>({});
  const [mphById, setMphById] = useState<Record<number, string>>({});

  async function load() {
    try {
      const data = await listPerfInbox();
      setRows(data.rows);
      const next: Record<number, string> = {};
      const nextMph: Record<number, string> = {};
      const nextSpeed: Record<number, string> = {};
      const nextTech: Record<number, string> = {};
      for (const r of data.rows) {
        next[r.id] = r.coachSecs != null ? String(r.coachSecs) : "";
        nextMph[r.id] = r.speedMph != null ? String(r.speedMph) : "";
        nextSpeed[r.id] = r.finishMark != null ? String(r.finishMark) : "";
        nextTech[r.id] = r.technique != null ? String(r.technique) : "";
      }
      setSecs(next);
      setMphById(nextMph);
      setSpeedById(nextSpeed);
      setTech(nextTech);
    } catch {
      setRows([]);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!player && players[0]) setPlayer(players[0]);
  }, [players, player]);

  function fillMphFromTime(secsValue: string, set: (v: string) => void) {
    const n = Number(secsValue);
    const guess = Number.isFinite(n) && n > 0 ? mphFromTime(kind, n) : null;
    if (guess != null) set(String(guess));
  }

  async function sendCoach() {
    if (!canSave) return toast.error(SAVE_LOCK);
    if (!player) return toast.error("Pick a lad.");
    if (!time && !speedScore && !uploadTech) {
      return toast.error("Enter time, test score /10 or technique /5.");
    }
    setSending(true);
    try {
      const res = await submitCoachPerf({
        data: {
          pin: storedCoachPin(coachPin),
          player,
          testKind: kind,
          secs: time,
          mph,
          speedScore,
          technique: uploadTech,
          note: uploadNote,
        },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      setTime("");
      setMph("");
      setSpeedScore("");
      setUploadTech("");
      setUploadNote("");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save the test.");
    } finally {
      setSending(false);
    }
  }

  async function sendBack(row: PerfSubmission) {
    if (!canSave) return toast.error(SAVE_LOCK);
    setBusy(row.id);
    try {
      const res = await assessPerf({
        data: {
          id: row.id,
          coachSecs: secs[row.id] || "",
          mph: mphById[row.id] || "",
          speedScore: speedById[row.id] || "",
          technique: tech[row.id] || "",
          note: note[row.id] || "",
        },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(`Sent back to ${parsePlayer(row.player).name}’s parent.`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setBusy(null);
    }
  }

  const pending = rows.filter((r) => r.status === "pending");
  const done = rows.filter((r) => r.status === "assessed");

  return (
    <section className="flex flex-col gap-4">
      {players.length ? (
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
          <div>
            <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
              Mark a test
            </h4>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-muted">
              <li>Pick the lad.</li>
              <li>Tap the drill — for 30m no ball tap <span className="font-semibold text-fg">Linear speed · without ball</span>.</li>
              <li>Time in seconds (start on GO, stop at the last cones).</li>
              <li>mph fills in from the time — change it if you want.</li>
              <li>Speed 1–10, running style 0–5. +5 for doing the drill is added for you.</li>
              <li>Save marks. Total = 5 + speed + style (max 20).</li>
            </ol>
          </div>
          <PlayerPicker
            id="coach-perf-player"
            label="Player"
            value={player}
            onChange={setPlayer}
            players={players}
          />
          <FieldLabel>Drill</FieldLabel>
          <ul className="flex flex-col gap-2">
            {PERF_KINDS.map((k) => (
              <li key={k.id}>
                <button
                  type="button"
                  onClick={() => {
                    setKind(k.id);
                    setTime("");
                    setMph("");
                  }}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
                    kind === k.id ? "border-accent bg-accent-soft text-fg" : "border-border bg-bg text-fg",
                  )}
                >
                  {k.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Time (seconds)</FieldLabel>
              <FieldInput
                inputMode="decimal"
                value={time}
                placeholder="5.3"
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9.]/g, "").slice(0, 6);
                  setTime(v);
                  fillMphFromTime(v, setMph);
                }}
              />
            </div>
            <div>
              <FieldLabel>Speed (mph)</FieldLabel>
              <FieldInput
                inputMode="decimal"
                value={mph}
                placeholder="12.7"
                onChange={(e) => setMph(e.target.value.replace(/[^0-9.]/g, "").slice(0, 6))}
              />
            </div>
            <div>
              <FieldLabel>Speed 1–10</FieldLabel>
              <FieldInput
                inputMode="numeric"
                value={speedScore}
                placeholder="1–10"
                onChange={(e) => setSpeedScore(e.target.value.replace(/\D/g, "").slice(0, 2))}
              />
            </div>
            <div>
              <FieldLabel>Running style 0–5</FieldLabel>
              <FieldInput
                inputMode="numeric"
                value={uploadTech}
                placeholder="0–5"
                onChange={(e) => setUploadTech(e.target.value.replace(/[^0-9.]/g, "").slice(0, 3))}
              />
            </div>
          </div>
          <p className="text-sm text-muted">Board points = 5 (did the test) + speed 1–10 + running style 0–5. Max 20.</p>
          <FieldLabel>Note</FieldLabel>
          <FieldInput
            value={uploadNote}
            placeholder="Optional note"
            onChange={(e) => setUploadNote(e.target.value)}
          />
          <Button className="w-full" disabled={sending} onClick={() => void sendCoach()}>
            {sending ? "Saving…" : "Save marks"}
          </Button>
        </div>
      ) : null}
      <div>
        <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Parent clips
        </h4>
        <p className="mt-1 text-sm leading-7 text-muted">
          Parents send film. You enter time, mph, test score /10 and technique /5.
        </p>
      </div>
      {!pending.length ? (
        <p className="text-sm leading-7 text-muted">No clips waiting.</p>
      ) : (
        pending.map((row) => (
          <article key={row.id} className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <p className="font-semibold">{parsePlayer(row.player).name}</p>
            <p className="text-sm text-muted">
              {perfKindLabel(row.testKind)}
              {row.submittedSecs ? ` · clip ${fmtSecs(row.submittedSecs)}` : ""}
            </p>
            {row.videoData && row.videoMime ? (
              <video
                controls
                playsInline
                className="w-full rounded-md bg-black"
                src={`data:${row.videoMime};base64,${row.videoData}`}
              />
            ) : (
              <p className="text-sm text-muted">No video attached.</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel>Time (seconds)</FieldLabel>
                <FieldInput
                  inputMode="decimal"
                  value={secs[row.id] ?? ""}
                  placeholder="5.3"
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^0-9.]/g, "").slice(0, 6);
                    setSecs((s) => ({ ...s, [row.id]: v }));
                    const n = Number(v);
                    const guess = Number.isFinite(n) ? mphFromTime(row.testKind, n) : null;
                    if (guess != null) setMphById((s) => ({ ...s, [row.id]: String(guess) }));
                  }}
                />
              </div>
              <div>
                <FieldLabel>Speed (mph)</FieldLabel>
                <FieldInput
                  inputMode="decimal"
                  value={mphById[row.id] ?? ""}
                  placeholder="12.7"
                  onChange={(e) =>
                    setMphById((s) => ({ ...s, [row.id]: e.target.value.replace(/[^0-9.]/g, "").slice(0, 6) }))
                  }
                />
              </div>
              <div>
                <FieldLabel>Test score /10</FieldLabel>
                <FieldInput
                  inputMode="numeric"
                  value={speedById[row.id] ?? ""}
                  placeholder="0–10"
                  onChange={(e) =>
                    setSpeedById((s) => ({ ...s, [row.id]: e.target.value.replace(/\D/g, "").slice(0, 2) }))
                  }
                />
              </div>
              <div>
                <FieldLabel>Technique /5</FieldLabel>
                <FieldInput
                  inputMode="numeric"
                  value={tech[row.id] ?? ""}
                  placeholder="0–5"
                  onChange={(e) =>
                    setTech((s) => ({ ...s, [row.id]: e.target.value.replace(/\D/g, "").slice(0, 1) }))
                  }
                />
              </div>
            </div>
            <FieldLabel>Note to parent</FieldLabel>
            <FieldInput
              value={note[row.id] ?? ""}
              placeholder="Drove through the last cones."
              onChange={(e) => setNote((s) => ({ ...s, [row.id]: e.target.value }))}
            />
            <Button disabled={busy === row.id} onClick={() => void sendBack(row)}>
              {busy === row.id ? "Saving…" : "Save marks"}
            </Button>
          </article>
        ))
      )}
      {done.length ? (
        <div className="flex flex-col gap-2">
          <h4 className="font-display text-sm font-bold uppercase tracking-wide">Sent back</h4>
          {done.slice(0, 12).map((row) => (
            <article key={row.id} className="rounded-xl border border-border bg-bg px-3 py-3">
              <p className="text-sm font-semibold">
                {parsePlayer(row.player).name} · {perfKindLabel(row.testKind)}
              </p>
              <p className="text-sm text-muted">
                {fmtSecs(row.coachSecs)}
                {row.speedMph != null ? ` · ${row.speedMph} mph` : ""}
                {row.testPoints != null
                  ? ` · +5 · test ${row.finishMark ?? "—"}/10 · technique ${row.technique ?? "—"}/5 · ${row.testPoints}/20`
                  : ` · technique ${row.technique ?? "—"}/5`}
              </p>
              {row.coachNote ? <p className="mt-1 text-sm leading-6 text-fg">{row.coachNote}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
