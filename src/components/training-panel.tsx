"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { matchSquadPlayer, shortName } from "@/lib/players";
import {
  ATTENDANCE_POINTS,
  summariseTraining,
  trainingTotal,
  type TrainingMark,
  type TrainingSession,
} from "@/lib/training";
import { getTraining, saveTraining } from "@/lib/training-actions";
import { mergeTraining, writeLocalTraining } from "@/lib/training-store";
import { SAVE_LOCK } from "@/lib/coach-users";
import { TRAINING_LABEL, TEAM_NAME } from "@/lib/brand";
import { TRAINING_MARKS_INTRO, TRAINING_MARKS_LOSE } from "@/lib/youth-rules";
import { formatKickoff, lastFridayStamp } from "@/lib/when";
import { trainingWhatsAppText, sendWhatsApp } from "@/lib/whatsapp";
import { SEASON_TRAINING_END, SEASON_TRAINING_START } from "@/lib/prize-window";
import { cn } from "@/lib/utils";

function blankMarks(players: string[]): TrainingMark[] {
  return players.map((player) => ({
    player,
    attended: false,
    score: null,
    effort: null,
    attitude: null,
    achievement: null,
  }));
}

function readTen(raw: string): number | null {
  const t = raw.trim();
  if (t === "") return null;
  const n = Number(t);
  if (!Number.isFinite(n)) return null;
  return Math.min(10, Math.max(0, Math.round(n)));
}

function sessionLabel(date: string, label: string) {
  const day = formatKickoff(`${date}T12:00`, "EEE d MMM yyyy") || date;
  return label ? `${day} · ${label}` : day;
}

export function TrainingPanel({ players, canSave = true }: { players: string[]; canSave?: boolean }) {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [sessionDate, setSessionDate] = useState(() => lastFridayStamp());
  const [label, setLabel] = useState(TRAINING_LABEL);
  const [marks, setMarks] = useState<TrainingMark[]>(() => blankMarks(players));
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const data = await getTraining();
      setSessions(mergeTraining(data.sessions));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load training.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const existing = sessions.find((s) => s.sessionDate === sessionDate);
    if (existing) {
      setLabel(existing.label);
      const byPlayer = new Map<string, TrainingMark>();
      for (const m of existing.marks) {
        byPlayer.set(matchSquadPlayer(players, m.player) || m.player, m);
      }
      setMarks(
        players.map(
          (player) =>
            byPlayer.get(player) ?? {
              player,
              attended: false,
              score: null,
              effort: null,
              attitude: null,
              achievement: null,
            },
        ),
      );
      return;
    }
    setLabel(TRAINING_LABEL);
    setMarks(blankMarks(players));
  }, [sessionDate, sessions, players]);

  const summary = useMemo(() => {
    const inSeason = sessions.filter(
      (s) => s.sessionDate >= SEASON_TRAINING_START && s.sessionDate <= SEASON_TRAINING_END,
    );
    return summariseTraining(players, inSeason);
  }, [players, sessions]);
  const hereCount = marks.filter((m) => m.attended).length;

  function patch(player: string, next: Partial<TrainingMark>) {
    setMarks((rows) => rows.map((m) => (m.player === player ? { ...m, ...next } : m)));
  }

  async function onSave() {
    if (!canSave) {
      toast.error(SAVE_LOCK);
      return;
    }
    setSaving(true);
    try {
      const res = await saveTraining({
        data: {
          sessionDate,
          label: label.trim(),
          marks: marks.map((m) => ({
            player: m.player,
            attended: m.attended,
            score: m.attended ? m.effort : null,
            effort: m.attended ? m.effort : null,
            attitude: m.attended ? m.attitude : null,
            achievement: m.attended ? m.achievement : null,
          })),
        },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setSessions(res.sessions);
      writeLocalTraining(res.sessions);
      toast.success("Training saved. Parent board will pick it up on reload.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save training.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          This session
        </h3>
        <p className="mb-3 text-sm text-muted">
          Fridays at Laithwaite Park. {TRAINING_MARKS_INTRO} Each Friday is saved;
          pick the next date for the following week. Season tally stays in the log.
        </p>
        <ul className="mb-3 flex flex-col gap-1 text-sm text-fg">
          {TRAINING_MARKS_LOSE.map((line) => (
            <li key={line}>• {line}</li>
          ))}
        </ul>
        <Button
          className="mb-4 w-full"
          variant="outline"
          onClick={() => {
            const origin = window.location.origin;
            void sendWhatsApp(
              `${TEAM_NAME} training`,
              trainingWhatsAppText(),
              `${origin}/perf`,
            );
          }}
        >
          Send training link on WhatsApp
        </Button>
        <FieldLabel htmlFor="train-date">Date of training</FieldLabel>
        <FieldInput
          id="train-date"
          type="date"
          className="mb-3"
          value={sessionDate}
          onChange={(e) => setSessionDate(e.target.value)}
        />
        <p className="mb-3 text-sm font-semibold text-fg">
          {sessionLabel(sessionDate, label)}
        </p>
        <FieldLabel htmlFor="train-label">Label (optional)</FieldLabel>
        <FieldInput
          id="train-label"
          className="mb-3"
          placeholder={TRAINING_LABEL}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
            {hereCount}/{players.length} in
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-wide text-accent"
              onClick={() => setMarks((rows) => rows.map((m) => ({ ...m, attended: true })))}
            >
              All in
            </button>
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-wide text-muted"
              onClick={() =>
                setMarks((rows) =>
                  rows.map((m) => ({
                    ...m,
                    attended: false,
                    score: null,
                    effort: null,
                    attitude: null,
                    achievement: null,
                  })),
                )
              }
            >
              None
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {marks.map((m) => {
            const total = m.attended ? trainingTotal(m) : null;
            return (
              <div key={m.player} className="rounded-lg border border-border bg-elevated p-3">
                <button
                  type="button"
                  onClick={() =>
                    patch(m.player, {
                      attended: !m.attended,
                      effort: !m.attended ? m.effort : null,
                      attitude: !m.attended ? m.attitude : null,
                      achievement: !m.attended ? m.achievement : null,
                      score: !m.attended ? m.effort : null,
                    })
                  }
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-md border px-3 text-left text-sm",
                    m.attended
                      ? "border-accent bg-accent-soft font-semibold text-fg"
                      : "border-border bg-bg text-muted",
                  )}
                >
                  <span>{shortName(m.player)}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {m.attended ? "In" : "Out"}
                  </span>
                </button>
                {m.attended ? (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div>
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                        Attendance · /10
                      </span>
                      <p className="flex h-11 items-center justify-center rounded-md border border-border bg-bg font-display text-lg font-bold tabular-nums">
                        {ATTENDANCE_POINTS}
                      </p>
                    </div>
                    <TenField
                      label="Effort"
                      value={m.effort}
                      onChange={(v) => patch(m.player, { effort: v, score: v })}
                    />
                    <TenField
                      label="Attitude"
                      value={m.attitude}
                      onChange={(v) => patch(m.player, { attitude: v })}
                    />
                    <TenField
                      label="Achievement"
                      value={m.achievement}
                      onChange={(v) => patch(m.player, { achievement: v })}
                    />
                  </div>
                ) : null}
                {m.attended ? (
                  <p className="mt-2 flex h-11 items-center justify-between rounded-md border border-border bg-bg px-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Total · attendance + marks
                    </span>
                    <span className="font-display text-lg font-bold tabular-nums">
                      {total === null ? "—" : `${total} / 40`}
                    </span>
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
        {canSave ? (
          <Button className="mt-4 w-full" onClick={() => void onSave()} disabled={saving}>
            {saving ? "Saving…" : "Save training"}
          </Button>
        ) : (
          <p className="mt-4 text-sm text-muted">{SAVE_LOCK}</p>
        )}
      </section>

      <section>
        <h3 className="mb-2 font-display text-lg font-bold uppercase tracking-tight">
          Logged sessions
        </h3>
        {!sessions.length ? (
          <p className="mb-4 text-sm text-muted">No sessions logged yet.</p>
        ) : (
          <ul className="mb-4 space-y-1">
            {sessions.map((s) => (
              <li key={s.sessionDate}>
                <button
                  type="button"
                  className={cn(
                    "flex h-11 w-full items-center justify-between rounded-md border px-3 text-left text-sm",
                    s.sessionDate === sessionDate
                      ? "border-accent bg-accent-soft font-semibold"
                      : "border-border bg-surface",
                  )}
                  onClick={() => setSessionDate(s.sessionDate)}
                >
                  <span>{sessionLabel(s.sessionDate, s.label)}</span>
                  <span className="text-xs text-muted">
                    {s.marks.filter((m) => m.attended).length} in
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="mb-1 font-display text-lg font-bold uppercase tracking-tight">
          Season training · overall
        </h3>
        <p className="mb-2 text-sm text-muted">
          Whole season, 1 Sep 2026 to 30 Jun 2027. Averages of every Friday so far. This does not
          reset today. The new player-of-the-month table is separate and runs from 22 Sep to the 3rd Monday.
        </p>
        {!sessions.length ? (
          <p className="text-sm text-muted">Averages appear after you save a session.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex gap-2 bg-elevated px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <span className="min-w-0 flex-1">Player</span>
              <span className="w-9 text-right">In</span>
              <span className="w-9 text-right">Eff</span>
              <span className="w-9 text-right">Att</span>
              <span className="w-9 text-right">Ach</span>
              <span className="w-9 text-right">Tot</span>
            </div>
            {summary.map((row) => (
              <div key={row.player} className="flex gap-2 border-t border-border px-3 py-2 text-sm">
                <span className="min-w-0 flex-1 truncate font-medium">{shortName(row.player)}</span>
                <span className="w-9 text-right tabular-nums text-muted">
                  {row.attended}/{row.sessions || "–"}
                </span>
                <span className="w-9 text-right tabular-nums text-muted">
                  {row.avgEffort === null ? "—" : row.avgEffort.toFixed(1)}
                </span>
                <span className="w-9 text-right tabular-nums text-muted">
                  {row.avgAttitude === null ? "—" : row.avgAttitude.toFixed(1)}
                </span>
                <span className="w-9 text-right tabular-nums text-muted">
                  {row.avgAchievement === null ? "—" : row.avgAchievement.toFixed(1)}
                </span>
                <span className="w-9 text-right tabular-nums font-semibold">
                  {row.avgTotal === null ? "—" : row.avgTotal.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function TenField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number | null;
  onChange: (next: number | null) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label} · /10
      </span>
      <FieldInput
        inputMode="numeric"
        min={0}
        max={10}
        placeholder="—"
        value={value === null ? "" : String(value)}
        onChange={(e) => onChange(readTen(e.target.value))}
      />
    </label>
  );
}
