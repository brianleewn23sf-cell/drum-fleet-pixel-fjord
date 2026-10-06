"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EqualTime } from "@/components/equal-time";
import { FluentPitch } from "@/components/fluent-pitch";
import { StintTally } from "@/components/stint-tally";
import { formationById, SUB_SLOTS, type KitId } from "@/lib/formations";
import {
  fullTimeLive,
  getLiveMatch,
  liveBench,
  liveFormation,
  liveMove,
  liveOff,
  liveOn,
  liveSub,
  pauseLive,
  resetLive,
  resumeLive,
  startLive,
  secondHalfLive,
  type LiveState,
} from "@/lib/live-actions";
import { clockElapsedMs, formatClock, formatInjury, gameMinute, matchFace, playerMinutes, type LiveClock } from "@/lib/minutes";
import { shortName } from "@/lib/players";

export function LiveMatch({
  players,
  opposition,
  kickoff,
  formation,
  lineup,
  kit,
  onPlanFormation,
  onPlanDrop,
  onPlanPlace,
  canSave = true,
}: {
  players: string[];
  opposition: string;
  kickoff: string;
  formation: string;
  lineup: Record<string, string>;
  kit: KitId;
  onPlanFormation: (id: string) => void;
  onPlanDrop: (from: string, to: string) => void;
  onPlanPlace: (slotId: string, player: string) => void;
  canSave?: boolean;
}) {
  const [live, setLive] = useState<LiveState | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [busy, setBusy] = useState(false);

  const key = `${opposition}|${kickoff}`;

  async function load() {
    try {
      const data = await getLiveMatch({ data: { opposition, kickoff } });
      setLive(data.live);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load live game.");
    }
  }

  useEffect(() => {
    void load();
  }, [key]);

  useEffect(() => {
    if (!live?.clock.running) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [live?.clock.running, live?.clock.startedAt]);

  const clock = live?.clock ?? {
    startedAt: null,
    elapsedMs: 0,
    running: false,
    ended: false,
    half: 1 as const,
    halfMarkMs: 0,
  };
  const elapsed = clockElapsedMs(clock, now);
  const minute = gameMinute(clock, now);
  const half = clock.half === 2 ? 2 : 1;
  const shape = formationById(live?.formation ?? formation);
  const onPitchLineup = live?.lineup ?? lineup;
  const mins = useMemo(
    () => playerMinutes(live?.stints ?? [], minute, clock.ended),
    [live?.stints, minute, clock.ended],
  );
  const minuteMap = useMemo(
    () => Object.fromEntries(Object.entries(mins).map(([p, row]) => [p, row.minutes])),
    [mins],
  );
  const game = { opposition, kickoff };

  async function run(fn: () => Promise<{ live: LiveState | null }>) {
    if (!canSave) return;
    setBusy(true);
    try {
      const data = await fn();
      setLive((prev) => {
        const next = data.live;
        if (!next) return next;
        if (next.clock.running && !next.clock.startedAt && prev?.clock.startedAt) {
          return { ...next, clock: { ...next.clock, startedAt: prev.clock.startedAt } };
        }
        return next;
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update the game.");
    } finally {
      setBusy(false);
    }
  }

  function startClock() {
    const startedAt = new Date().toISOString();
    setNow(Date.now());
    setLive((cur) => ({
      opposition,
      kickoff,
      formation: cur?.formation ?? formation,
      lineup: cur?.lineup ?? lineup,
      clock: {
        startedAt,
        elapsedMs: cur?.clock.elapsedMs ?? 0,
        running: true,
        ended: false,
        half: cur?.clock.half ?? 1,
        halfMarkMs: cur?.clock.halfMarkMs ?? 0,
      },
      stints: cur?.stints ?? [],
      shapes: cur?.shapes ?? [],
    }));
    void run(() => startLive({ data: { ...game, formation, lineup } }));
  }

  function pauseClock() {
    setLive((cur) =>
      cur
        ? {
            ...cur,
            clock: {
              ...cur.clock,
              running: false,
              elapsedMs: clockElapsedMs(cur.clock, Date.now()),
              startedAt: null,
            },
          }
        : cur,
    );
    void run(() => pauseLive({ data: game }));
  }

  function resumeClock() {
    const startedAt = new Date().toISOString();
    setNow(Date.now());
    setLive((cur) =>
      cur ? { ...cur, clock: { ...cur.clock, running: true, startedAt, ended: false } } : cur,
    );
    void run(() => resumeLive({ data: game }));
  }

  function secondHalf() {
    setLive((cur) =>
      cur
        ? {
            ...cur,
            clock: {
              ...cur.clock,
              running: false,
              elapsedMs: clockElapsedMs(cur.clock, Date.now()),
              startedAt: null,
              half: 2,
              halfMarkMs: clockElapsedMs(cur.clock, Date.now()),
            },
          }
        : cur,
    );
    void run(() => secondHalfLive({ data: game }));
  }

  const pitchIds = new Set(shape.slots.map((s) => s.id));

  function onDrop(from: string, to: string) {
    const a = onPitchLineup[from];
    const b = onPitchLineup[to];
    if (!a) return;
    if (!canSave) {
      onPlanDrop(from, to);
      setLive((cur) => {
        if (!cur) return cur;
        const next = { ...cur.lineup };
        if (b) next[from] = b;
        else delete next[from];
        next[to] = a;
        return { ...cur, lineup: next };
      });
      return;
    }
    const fromPitch = pitchIds.has(from);
    const toPitch = pitchIds.has(to);
    if (fromPitch && toPitch) {
      void run(() => liveMove({ data: { ...game, player: a, toSlot: to } }));
      return;
    }
    if (fromPitch && !toPitch) {
      if (b) void run(() => liveSub({ data: { ...game, offPlayer: a, onPlayer: b } }));
      else void run(() => liveOff({ data: { ...game, player: a, toSlot: to } }));
      return;
    }
    if (!fromPitch && toPitch) {
      if (b) void run(() => liveSub({ data: { ...game, offPlayer: b, onPlayer: a } }));
      else void run(() => liveOn({ data: { ...game, player: a, toSlot: to } }));
    }
  }

  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
      <h3 className="font-display text-lg font-bold uppercase tracking-tight">Match day</h3>
      <p className="mb-3 text-sm text-muted">
        Slide a shirt onto another shirt or a sub box. Tap a shirt to pick. Tap a shape chip to change formation.
      </p>

      <div className="mb-4 rounded-xl border-2 border-accent bg-black px-4 py-6 text-center">
        <MatchClock clock={clock} />
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {!clock.running && !clock.ended && elapsed === 0 ? (
            <Button disabled={busy} onClick={startClock}>
              Start
            </Button>
          ) : null}
          {clock.running ? (
            <Button disabled={busy} variant="outline" onClick={pauseClock}>
              Pause
            </Button>
          ) : null}
          {live && !clock.running && !clock.ended && elapsed > 0 ? (
            <Button disabled={busy} onClick={resumeClock}>
              Resume
            </Button>
          ) : null}
          {live && !clock.ended && half === 1 ? (
            <Button disabled={busy} variant="outline" onClick={secondHalf}>
              2nd half
            </Button>
          ) : null}
          {live && !clock.ended ? (
            <Button disabled={busy} variant="outline" onClick={() => void run(() => fullTimeLive({ data: game }))}>
              Full time
            </Button>
          ) : null}
          {live ? (
            <Button
              disabled={busy}
              variant="ghost"
              onClick={() => {
                if (!globalThis.confirm("Reset this game clock and minutes?")) return;
                void run(() => resetLive({ data: game }));
              }}
            >
              Reset
            </Button>
          ) : null}
        </div>
        {clock.ended ? <p className="mt-2 text-sm font-semibold">Full time.</p> : null}
      </div>

      <FluentPitch
        formation={live?.formation ?? formation}
        lineup={live?.lineup ?? lineup}
        kit={kit}
        players={players}
        disabled={busy || clock.ended}
        minutes={minuteMap}
        onFormation={(id) => {
          if (!canSave) {
            onPlanFormation(id);
            setLive((cur) => (cur ? { ...cur, formation: id } : cur));
            return;
          }
          if (live) void run(() => liveFormation({ data: { ...game, formation: id } }));
          else onPlanFormation(id);
        }}
        onPlace={(slotId, player) => {
          onPlanPlace(slotId, player);
          if (!canSave || !live) {
            if (!canSave) {
              setLive((cur) =>
                cur
                  ? {
                      ...cur,
                      lineup: player
                        ? { ...cur.lineup, [slotId]: player }
                        : Object.fromEntries(
                            Object.entries(cur.lineup).filter(([k]) => k !== slotId),
                          ),
                    }
                  : cur,
              );
            }
            return;
          }
          if (pitchIds.has(slotId)) {
            const occupant = onPitchLineup[slotId];
            if (occupant && player && occupant !== player) {
              void run(() =>
                liveSub({ data: { ...game, offPlayer: occupant, onPlayer: player } }),
              );
              return;
            }
            if (player && !occupant) {
              void run(() => liveOn({ data: { ...game, player, toSlot: slotId } }));
              return;
            }
            if (occupant && !player) {
              const emptyBench =
                [...SUB_SLOTS].find((id) => !onPitchLineup[id]) ?? "SUB1";
              void run(() =>
                liveOff({ data: { ...game, player: occupant, toSlot: emptyBench } }),
              );
              return;
            }
            return;
          }
          void run(() => liveBench({ data: { ...game, slotId, player } }));
        }}
        onDrop={(from, to) => {
          onPlanDrop(from, to);
          if (live) onDrop(from, to);
        }}
      />

      <div className="mt-4">
        <EqualTime
          formation={live?.formation ?? formation}
          lineup={live?.lineup ?? lineup}
          mins={mins}
          minute={minute}
        />
      </div>

      {live ? (
        <>
          <h4 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">
            Who · where · when
          </h4>
          <p className="mb-2 text-xs text-muted">Every spell on the pitch this game.</p>
          <StintTally stints={live.stints} minute={minute} ended={clock.ended} />
          <h4 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">Minutes</h4>
          <ul className="mt-2 divide-y divide-border">
            {Object.entries(mins)
              .sort((a, b) => b[1].minutes - a[1].minutes)
              .map(([player, row]) => (
                <li key={player} className="flex items-center justify-between py-2 text-sm">
                  <span>
                    {shortName(player)}
                    {row.on ? " · on" : ""}
                    {row.started ? " · started" : ""}
                  </span>
                  <span className="font-semibold">{row.minutes} min</span>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Subs from the plan show on the bench above. Hit Start, then slide them on and off.
        </p>
      )}
    </section>
  );
}

function MatchClock({ clock }: { clock: LiveClock }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!clock.running) return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [clock.running, clock.startedAt]);
  const elapsed = clockElapsedMs(clock, now);
  const minute = gameMinute(clock, now);
  const half = clock.half === 2 ? 2 : 1;
  const face = matchFace(elapsed, half, clock.halfMarkMs);
  const shown = formatClock(face.displayMs);
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-widest text-fg">
        {half === 1 ? "1st half · 0 to 30" : "2nd half · 30 to 60"}
      </p>
      <p className="mt-2 font-display text-7xl font-bold leading-none tracking-tight text-white tabular-nums">
        {shown.slice(0, 2)}
        <span className={clock.running ? "text-accent animate-pulse" : "text-accent"}>:</span>
        {shown.slice(3)}
      </p>
      {face.inExtra ? (
        <p className="mt-2 font-display text-4xl font-bold tabular-nums text-accent">
          {face.extraLabel} {formatInjury(face.extraMs)}
        </p>
      ) : null}
      <p className="mt-2 text-sm font-semibold text-fg">Minute {minute} · 60 min plus extra</p>
      {face.inExtra && !clock.ended ? (
        <p className="mt-1 text-sm font-bold text-accent">
          {half === 1 ? "Injury time — then 2nd half" : "Overtime — then full time"}
        </p>
      ) : null}
    </>
  );
}
