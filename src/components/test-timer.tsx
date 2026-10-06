"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

async function openWideCam(): Promise<MediaStream> {
  const first = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
    audio: false,
  });
  let stream = first;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const wide = devices.find(
      (d) =>
        d.kind === "videoinput" &&
        /ultra|wide|0\.5|0,5/i.test(d.label) &&
        !/front|user|selfie/i.test(d.label),
    );
    if (wide?.deviceId) {
      const next = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: wide.deviceId }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      first.getTracks().forEach((t) => t.stop());
      stream = next;
    }
  } catch {
    // keep first stream
  }
  const track = stream.getVideoTracks()[0];
  const caps = track.getCapabilities?.() as { zoom?: { min: number; max: number; step?: number } } | undefined;
  if (caps?.zoom) {
    const min = caps.zoom.min;
    const zoom = min <= 0.5 ? 0.5 : min <= 0.6 ? 0.6 : min;
    try {
      await track.applyConstraints({ advanced: [{ zoom }] as unknown as MediaTrackConstraintSet[] });
    } catch {
      try {
        await track.applyConstraints({ zoom } as unknown as MediaTrackConstraints);
      } catch {
        // phone has no 0.5x
      }
    }
  }
  return stream;
}

function pickMime(): string {
  if (typeof MediaRecorder === "undefined") return "";
  for (const t of ["video/webm;codecs=vp8", "video/webm", "video/mp4"]) {
    if (MediaRecorder.isTypeSupported(t)) return t;
  }
  return "";
}

const CUE: Record<"zigzag" | "sprint" | "turns" | "shooting", { start: string; stop: string }> = {
  zigzag: {
    start: "Clock starts on GO. Through the 2m start gate.",
    stop: "Clock stops when they go through the last cones. Same for with and without the ball.",
  },
  sprint: {
    start: "Clock starts on GO. Through the two start cones.",
    stop: "Without ball: stop when the PLAYER passes the 30m cones. With ball: they may pass from 20m — stop when the BALL goes through the 30m cones.",
  },
  turns: {
    start: "Clock starts on GO. Ball on the start line of the 3m square.",
    stop: "There, turn, back, turn, out, last turn, sprint back. Clock stops when the foot is on the ball on the start line. Speed and technique both count.",
  },
  shooting: {
    start: "GO. Film all six shots. Left: push left with left, far right corner. Right: push right with right, far left corner. Technique is marked as well as the result.",
    stop: "Stop after the sixth shot. Into the box = 0. Far corner 3, near 2, just wide 1. +1 power if the ball reaches the 10m line. Technique: plant, head, follow through.",
  },
};

export function FilmTimer({
  label,
  value,
  onChange,
  onRecorded,
  kind,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onRecorded?: (blob: Blob, secs: string) => void;
  kind: "zigzag" | "sprint" | "turns" | "shooting";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const started = useRef(0);
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [ms, setMs] = useState(0);
  const [clip, setClip] = useState("");
  const cue = CUE[kind];

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setMs(Date.now() - started.current), 50);
    return () => clearInterval(t);
  }, [recording]);

  useEffect(() => {
    return () => stopCam();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const attach = () => {
      const el = videoRef.current;
      const stream = streamRef.current;
      if (!el || !stream) return;
      el.srcObject = stream;
      void el.play().catch(() => undefined);
    };
    attach();
    const t = requestAnimationFrame(attach);
    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function stopCam() {
    recRef.current?.stop();
    recRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setRecording(false);
  }

  async function openCam() {
    try {
      const stream = await openWideCam();
      streamRef.current = stream;
      setMs(0);
      setOpen(true);
    } catch {
      toast.error("Allow the camera, or film from the phone camera.");
    }
  }

  function startRec() {
    const stream = streamRef.current;
    if (!stream) {
      fileRef.current?.click();
      return;
    }
    const mime = pickMime();
    chunks.current = [];
    const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.current.push(e.data);
    };
    rec.onstop = () => {
      const blob = new Blob(chunks.current, { type: rec.mimeType || "video/webm" });
      if (clip) URL.revokeObjectURL(clip);
      setClip(URL.createObjectURL(blob));
      toast.message("Clip in. AI times GO to the last cones — not how long the camera was on.");
      onRecorded?.(blob, "");
    };
    rec.start();
    recRef.current = rec;
    started.current = Date.now();
    setMs(0);
    setRecording(true);
  }

  function stopRec() {
    recRef.current?.stop();
    recRef.current = null;
    setRecording(false);
  }

  function close() {
    stopCam();
    setOpen(false);
  }

  function fromFile(file: File) {
    const url = URL.createObjectURL(file);
    if (clip) URL.revokeObjectURL(clip);
    setClip(url);
    onRecorded?.(file, value);
    toast.success("Clip in. Type the time from GO to the last cones — not how long the video is.");
  }

  const secs = (ms / 1000).toFixed(1);
  const overlay =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[200] bg-black text-white">
            <video
              ref={videoRef}
              playsInline
              muted
              autoPlay
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <p className="text-center text-xs font-semibold uppercase tracking-wider">{label} · 0.5–0.6× wide</p>
              <p className="text-center font-display text-6xl font-bold tabular-nums leading-none">
                {recording ? secs : value || "0.0"}
              </p>
              <p className="mt-2 text-center text-sm">
                {cue.start}. {cue.stop}
              </p>
              <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-amber-300">
                Phone on a stand. Keep it still. Nobody walk in shot.
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-8">
              {recording ? (
                <button
                  type="button"
                  className="h-16 rounded-full bg-accent text-lg font-bold uppercase tracking-wide text-accent-fg"
                  onClick={stopRec}
                >
                  {kind === "turns" ? "Finish · foot on the ball" : "Finish · last cones"}
                </button>
              ) : (
                <button
                  type="button"
                  className="h-16 rounded-full bg-accent text-lg font-bold uppercase tracking-wide text-accent-fg"
                  onClick={startRec}
                >
                  GO / whistle
                </button>
              )}
              <button
                type="button"
                className="h-12 rounded-full border border-white/40 text-sm font-semibold uppercase tracking-wide"
                onClick={close}
              >
                Done
              </button>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="mt-2">
      <input
        ref={fileRef}
        type="file"
        accept="video/*"
        capture="environment"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) fromFile(file);
        }}
      />
      <input
        ref={uploadRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) fromFile(file);
        }}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="w-full" onClick={() => void openCam()}>
          Film
        </Button>
        <Button variant="outline" className="w-full" onClick={() => uploadRef.current?.click()}>
          Upload
        </Button>
      </div>
      <p className="mt-2 text-xs leading-5 text-muted">
        Official time is GO to the last cones. Upload the clip — the AI times it and marks technique. Type a time only if you want a check.
      </p>
      <label className="mt-1 flex items-center gap-2 text-sm">
        <span className="shrink-0 text-muted">Time</span>
        <input
          inputMode="decimal"
          value={value}
          placeholder="0.0"
          className="h-11 w-full rounded-md border border-border bg-bg px-3 font-display text-lg font-bold tabular-nums"
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        />
        <span className="shrink-0 text-muted">s</span>
      </label>
      {overlay}
      {clip && !open ? (
        <video src={clip} controls playsInline className="mt-2 w-full rounded-md bg-black" />
      ) : null}
    </div>
  );
}
