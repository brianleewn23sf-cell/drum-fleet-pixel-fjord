"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { FilmTimer } from "@/components/test-timer";
import { ParentDrillGuide } from "@/components/parent-drill-guide";
import { ParentGate } from "@/components/parent-gate";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { PERF_KINDS, perfKindFilm, perfKindLabel, type PerfKindId } from "@/lib/perf-kinds";
import { listParentPerf, MAX_CLIP_CHARS, submitPerfClip, type PerfSubmission } from "@/lib/perf-submissions";
import { useParentPresence } from "@/components/use-parent-presence";
import { fmtSecs } from "@/lib/fitness";
import { isViewAllPlayer, type ParentSession } from "@/lib/parent-login";
import { shortName } from "@/lib/players";
import { cn } from "@/lib/utils";
import { homeWeekLabel, isDrillDoneThisWeek, remainingHomeDrills } from "@/lib/home-tests";

async function blobToBase64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function ParentPerfForm({ session }: { session: ParentSession }) {
  const [kind, setKind] = useState<PerfKindId>(PERF_KINDS[0].id);
  const [picked, setPicked] = useState<PerfKindId[]>([]);
  const [secs, setSecs] = useState("");
  const [blob, setBlob] = useState<Blob | null>(null);
  const [rows, setRows] = useState<PerfSubmission[]>([]);
  const [usedThisWeek, setUsedThisWeek] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  useParentPresence(session.player, "perf");
  const alreadyThisWeek = isDrillDoneThisWeek(usedThisWeek, kind);
  const viewAll = isViewAllPlayer(session.player);
  const leftover = useMemo(() => remainingHomeDrills(usedThisWeek), [usedThisWeek]);
  const week = homeWeekLabel();

  function focusDrill(id: PerfKindId) {
    setKind(id);
    setSecs("");
    setBlob(null);
  }

  function toggleDrill(id: PerfKindId) {
    if (isDrillDoneThisWeek(usedThisWeek, id)) {
      toast.error(`That drill is already in this week. Back ${week.unlock}.`);
      return;
    }
    setPicked((prev) => {
      const on = prev.includes(id);
      const next = on ? prev.filter((x) => x !== id) : [...prev, id];
      if (!on) focusDrill(id);
      else if (kind === id) {
        const rest = next.filter((x) => leftover.includes(x));
        if (rest[0]) focusDrill(rest[0]);
      }
      return next;
    });
  }

  function pickAllRemaining() {
    setPicked(leftover);
    if (leftover[0]) focusDrill(leftover[0]);
    else toast.message(`All six are in this week. Back ${week.unlock}.`);
  }

  async function loadRows() {
    try {
      const next = await listParentPerf({ data: { pin: session.token } });
      setRows(next.rows);
      setUsedThisWeek(next.usedThisWeek ?? []);
    } catch {
      setRows([]);
      setUsedThisWeek([]);
    }
  }

  useEffect(() => {
    void loadRows();
  }, [session.token]);

  async function send() {
    if (alreadyThisWeek) {
      toast.error("This drill is already in for this week. Try another, or wait until Monday.");
      return;
    }
    if (!secs && !blob) return toast.error("Film or upload the run.");
    setSending(true);
    try {
      let videoData: string | undefined;
      let videoMime: string | undefined;
      if (blob) {
        if (blob.size * 1.4 > MAX_CLIP_CHARS) {
          toast.message("Clip is large — sending without the video. Keep it on your phone.");
        } else {
          videoData = await blobToBase64(blob);
          videoMime = blob.type || "video/webm";
        }
      }
      const res = await submitPerfClip({
        data: { player: session.player, pin: session.token, testKind: kind, secs, videoMime, videoData },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success(res.message);
      setSecs("");
      setBlob(null);
      const sent = kind;
      setPicked((prev) => prev.filter((x) => x !== sent));
      await loadRows();
      const nextOpen = remainingHomeDrills([...usedThisWeek, sent]).find(
        (x) => picked.includes(x) && x !== sent,
      );
      if (nextOpen) focusDrill(nextOpen);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {viewAll ? null : (
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <FieldLabel>This week’s drills</FieldLabel>
        <p className="text-sm leading-7 text-muted">
          Tick any, or all remaining. Same drill once this week. Unlocks {week.unlock}.
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1" onClick={pickAllRemaining}>
            All remaining ({leftover.length})
          </Button>
          <Button type="button" variant="outline" className="flex-1" onClick={() => setPicked([])}>
            Clear
          </Button>
        </div>
        <ul className="flex flex-col gap-2">
          {PERF_KINDS.map((k) => {
            const done = isDrillDoneThisWeek(usedThisWeek, k.id);
            const on = picked.includes(k.id) || kind === k.id;
            return (
              <li key={k.id}>
                <button
                  type="button"
                  disabled={done}
                  onClick={() => toggleDrill(k.id)}
                  className={cn(
                    "flex min-h-11 w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm",
                    done
                      ? "cursor-not-allowed border-border bg-elevated text-muted"
                      : on
                        ? "border-accent bg-accent-soft text-fg"
                        : "border-border bg-bg text-fg",
                  )}
                >
                  <span className="min-w-0 pr-2">{k.label}</span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                    {done ? `Done · ${week.unlock}` : on ? "Selected" : "Tap"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {alreadyThisWeek ? (
          <p className="rounded-md border border-accent bg-accent-soft px-3 py-2 text-sm font-semibold text-fg">
            This drill is already in for this week. Pick another, or send it again from {week.unlock}.
          </p>
        ) : leftover.length === 0 ? (
          <p className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-muted">
            All six drills are in this week. Back {week.unlock}.
          </p>
        ) : (
          <p className="text-sm text-muted">
            Filming: <span className="font-semibold text-fg">{perfKindLabel(kind)}</span>
          </p>
        )}
        <FilmTimer
          kind={perfKindFilm(kind)}
          label={perfKindLabel(kind)}
          value={secs}
          onChange={setSecs}
          onRecorded={(file) => {
            setBlob(file);
            setSecs("");
          }}
        />
        <p className="text-sm leading-7 text-muted">
          Send the clip. The coach marks +5 for the drill, test score /10 and technique /5.
        </p>
        <Button className="w-full" disabled={sending || alreadyThisWeek} onClick={() => void send()}>
          {sending ? "Sending…" : alreadyThisWeek ? "Already sent this week" : "Send to coach"}
        </Button>
      </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Results from the coach
        </h3>
        {!rows.length ? (
          <p className="text-sm leading-7 text-muted">Nothing sent yet.</p>
        ) : (
          rows.map((row) => (
            <article key={row.id} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-semibold">
                {isViewAllPlayer(session.player) ? `${shortName(row.player)} · ` : ""}
                {perfKindLabel(row.testKind)}
              </p>
              <p className="text-xs text-muted">{row.createdAt.slice(0, 10)}</p>
              <p className="mt-2 text-sm">Your clip: {fmtSecs(row.submittedSecs)}</p>
              {row.status === "pending" ? (
                <p className="mt-1 text-sm text-accent">Waiting for the coach.</p>
              ) : (
                <div className="mt-2 text-sm leading-7">
                  <p>
                    <span className="font-semibold">Time: </span>
                    {fmtSecs(row.coachSecs)}
                  </p>
                  {row.testPoints != null || row.startMark != null ? (
                    <div className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                      <p>
                        Complete: <span className="font-semibold">+{row.startMark ?? 5}</span>
                      </p>
                      <p>
                        Speed (GO → cones): <span className="font-semibold">{row.finishMark ?? "—"}/10</span>
                      </p>
                      <p>
                        Running style: <span className="font-semibold">{row.technique ?? "—"}/5</span>
                      </p>
                      <p>
                        Total: <span className="font-semibold">{row.testPoints ?? "—"}/20</span>
                      </p>
                    </div>
                  ) : row.technique != null ? (
                    <p>
                      <span className="font-semibold">Technique: </span>
                      {row.technique}/5
                    </p>
                  ) : null}
                  {row.coachNote ? (
                    <p className="mt-1 rounded-md border border-border bg-bg px-3 py-2">{row.coachNote}</p>
                  ) : null}
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </>
  );
}

export function ParentPerf() {
  const [session, setSession] = useState<ParentSession | null>(null);
  useParentPresence(session?.player || "", "perf");
  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <AppHeader boardLink="board" />
      <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-6">
        <header className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Performance analysis
          </h2>
          <p className="text-sm leading-7 text-muted">
            Tick any drill or all six. Same drill once a week (Monday–Sunday). Film at home, send it in.
            The coach marks +5 for the drill, test score /10 and technique /5.
          </p>
        </header>
        <ParentDrillGuide />
        <ParentGate onSession={setSession}>
          {(s) => (
            <>
              {s.viewAll || isViewAllPlayer(s.player) ? (
                <p className="rounded-xl border border-accent bg-accent-soft px-4 py-3 text-sm font-semibold">
                  Manager view — every lad’s clips. Families only see their own.
                </p>
              ) : null}
              <ParentPerfForm session={s} />
            </>
          )}
        </ParentGate>
      </main>
    </div>
  );
}
