"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { PlayerPicker } from "@/components/player-picker";
import { analyseFitness, disciplineVerdict, fmtDiff, fmtPct, fmtSecs, TEST_AGE, testsToSheetCsv, type FitnessAnalysis, type FitnessTest } from "@/lib/fitness";
import { testGrades } from "@/lib/test-bonus";
import { getFitnessTests, saveFitnessTest } from "@/lib/fitness-actions";
import { SAVE_LOCK } from "@/lib/coach-users";
import { CHALLENGES_NAME } from "@/lib/brand";
import { parsePlayer, shortName } from "@/lib/players";
import { PerfInbox } from "@/components/perf-inbox";
import { FilmTimer } from "@/components/test-timer";
import { FitnessProgressChart } from "@/components/fitness-progress-chart";
import { DrillSetupCards } from "@/components/drill-setup";
import { SquadTestTable } from "@/components/squad-test-table";
import { SprintLeaderboard } from "@/components/sprint-leaderboard";
import { localDateStamp } from "@/lib/when";
import { cn } from "@/lib/utils";

export function FitnessPanel({
  players,
  canSave = true,
  coachPin = "",
}: {
  players: string[];
  canSave?: boolean;
  coachPin?: string;
}) {
  const [analysed, setAnalysed] = useState<FitnessAnalysis[]>([]);
  const [history, setHistory] = useState<FitnessTest[]>([]);
  const [player, setPlayer] = useState(players[0] ?? "");
  const [testedOn, setTestedOn] = useState(() => localDateStamp());
  const [zz50No, setZz50No] = useState("");
  const [zz50Ball, setZz50Ball] = useState("");
  const [s30No, setS30No] = useState("");
  const [s30Ball, setS30Ball] = useState("");
  const [turns, setTurns] = useState("");
  const [shootPts, setShootPts] = useState("");
  const [shootPower, setShootPower] = useState("");
  const [shootClip, setShootClip] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      const data = await getFitnessTests();
      setAnalysed(data.analysed);
      setHistory(data.tests);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load tests.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function fillFromLatest(name: string) {
    setPlayer(name);
    const row = analysed.find((t) => t.player === name);
    if (!row) {
      setZz50No("");
      setZz50Ball("");
      setS30No("");
      setS30Ball("");
      setTurns("");
      setShootPts("");
      setShootPower("");
      return;
    }
    setTestedOn(row.testedOn);
    setZz50No(row.zz50NoBall === null ? "" : String(row.zz50NoBall));
    setZz50Ball(row.zz50Ball === null ? "" : String(row.zz50Ball));
    setS30No(row.sprint30NoBall === null ? "" : String(row.sprint30NoBall));
    setS30Ball(row.sprint30Ball === null ? "" : String(row.sprint30Ball));
    setTurns(row.turns3x4 === null ? "" : String(row.turns3x4));
    setShootPts(row.shootingPts === null ? "" : String(row.shootingPts));
    setShootPower(row.shootingPower === null ? "" : String(row.shootingPower));
  }

  async function onSave() {
    if (!player) {
      toast.error("Pick a player.");
      return;
    }
    if (!canSave) {
      toast.error(SAVE_LOCK);
      return;
    }
    setSaving(true);
    try {
      const res = await saveFitnessTest({
        data: {
          player,
          testedOn,
          zz50NoBall: zz50No,
          zz50Ball: zz50Ball,
          sprint30NoBall: s30No,
          sprint30Ball: s30Ball,
          turns3x4: turns,
          shootingPts: shootPts,
          shootingPower: shootPower,
        },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Test saved.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save test.");
    } finally {
      setSaving(false);
    }
  }

  const zzRank = useMemo(
    () => analysed.filter((t) => t.zz50Diff !== null).sort((a, b) => (b.zz50Diff ?? -99) - (a.zz50Diff ?? -99)),
    [analysed],
  );
  const s30Rank = useMemo(
    () =>
      analysed
        .filter((t) => t.sprint30Diff !== null)
        .sort((a, b) => (b.sprint30Diff ?? -99) - (a.sprint30Diff ?? -99)),
    [analysed],
  );
  const turnRank = useMemo(
    () => analysed.filter((t) => t.turns3x4 !== null).sort((a, b) => (a.turns3x4 ?? 99) - (b.turns3x4 ?? 99)),
    [analysed],
  );
  const shootRank = useMemo(
    () =>
      analysed
        .filter((t) => t.shootingTotal !== null)
        .sort((a, b) => (b.shootingTotal ?? -1) - (a.shootingTotal ?? -1)),
    [analysed],
  );

  const playerHistory = useMemo(
    () => history.filter((t) => t.player === player).map(analyseFitness),
    [history, player],
  );

  function saveToSheets() {
    const rows = (history.length ? history.map(analyseFitness) : analysed);
    if (!rows.length) {
      toast.error("Save a test first.");
      return;
    }
    const csv = testsToSheetCsv(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Cherrybrook-Raging-Bulls-tests-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV saved. Open it in Google Sheets (File → Import, or tap Open with Sheets).");
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
          Performance analysis
        </h3>
        <p className="text-sm leading-7 text-muted">
          Age {TEST_AGE}. Extra = without the ball minus with the ball (shows a minus when the ball slows him).
          Ball efficiency % = without ÷ with × 100. Higher % is better.
          Times stay on file. Prize points only count tests from 12 Sep 2026 — older demo runs do not count.
        </p>
      </header>

      <PerfInbox canSave={canSave} players={players} coachPin={coachPin} />

      <SprintLeaderboard players={players} tests={history} />

      <SquadTestTable players={players} tests={history} />

      <section className="flex flex-col gap-5">
        <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          How we test
        </h4>
        <p className="text-sm leading-7 text-muted">{CHALLENGES_NAME}</p>
        <DrillSetupCards />
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-border bg-surface px-4 py-5 shadow-panel">
        <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Recording setup
        </h4>
        <p className="text-sm leading-7 text-muted">
          Put the phone on a stand, side-on to the drill, so the start line and the finish are both in shot. Keep it still. Nobody walk in front of the lens.
        </p>
        <p className="text-sm leading-7 text-muted">
          Use 0.5–0.6× wide zoom so the full course fits. Film in the app, or upload a clip from the phone. One run per clip. The clip length is the time.
        </p>
        <p className="text-sm leading-7 text-muted">
          MP4 or MOV · H.264 · 1080p or 720p · 30 fps · no slow-mo · no HDR · under 3 minutes.
        </p>
        <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide">Phone camera</p>
        <p className="text-sm leading-7 text-muted">
          Rear camera. Ultra-wide 0.5×. Video 1080p at 30 fps. Turn off HDR, cinematic, night mode and slow-mo. Lock AE/AF if the phone has it so the picture does not hunt. Grid on to line up start and finish.
        </p>
        <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide">Where it is stored</p>
        <p className="text-sm leading-7 text-muted">
          Video stays on the phone (Photos or Files). Times and the analysis are saved in this app when you tap Save test. Print the professional PDF from Dribble deficit report.
        </p>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Record a player
        </h4>
        <div>
          <FieldLabel htmlFor="fit-player">Player</FieldLabel>
          <PlayerPicker
            id="fit-player"
            label="Player"
            value={player}
            players={players}
            onChange={fillFromLatest}
          />
        </div>
        <div>
          <FieldLabel htmlFor="fit-date">Test date</FieldLabel>
          <FieldInput
            id="fit-date"
            type="date"
            value={testedOn}
            onChange={(e) => setTestedOn(e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <div>
          <h4 className="font-display text-base font-bold uppercase tracking-wide">50m Zig Zag test with and without the ball</h4>
          <p className="mt-1 text-sm leading-7 text-muted">50m Zig Zag test with and without the ball · GO to the finish</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <FieldLabel>Without ball</FieldLabel>
            <FieldInput inputMode="decimal" value={zz50No} onChange={(e) => setZz50No(e.target.value)} />
            <FilmTimer kind="zigzag" label="50m Zig Zag, no ball" value={zz50No} onChange={setZz50No} />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>With ball</FieldLabel>
            <FieldInput inputMode="decimal" value={zz50Ball} onChange={(e) => setZz50Ball(e.target.value)} />
            <FilmTimer kind="zigzag" label="50m Zig Zag, with ball" value={zz50Ball} onChange={setZz50Ball} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <div>
          <h4 className="font-display text-base font-bold uppercase tracking-wide">Linear speed</h4>
          <p className="mt-1 text-sm leading-7 text-muted">30m · pass from 20m allowed · stop when the ball crosses 30m</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <FieldLabel>Without ball</FieldLabel>
            <FieldInput inputMode="decimal" value={s30No} onChange={(e) => setS30No(e.target.value)} />
            <FilmTimer kind="sprint" label="30m, no ball" value={s30No} onChange={setS30No} />
          </div>
          <div className="flex flex-col gap-2">
            <FieldLabel>With ball</FieldLabel>
            <FieldInput inputMode="decimal" value={s30Ball} onChange={(e) => setS30Ball(e.target.value)} />
            <FilmTimer kind="sprint" label="30m, with ball" value={s30Ball} onChange={setS30Ball} />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <div>
          <h4 className="font-display text-base font-bold uppercase tracking-wide">Turning with the ball</h4>
          <p className="mt-1 text-sm leading-7 text-muted">3m square · three turns · foot on the ball at the start line</p>
        </div>
        <FieldLabel htmlFor="fit-turns">Time (seconds)</FieldLabel>
        <FieldInput
          id="fit-turns"
          inputMode="decimal"
          value={turns}
          onChange={(e) => setTurns(e.target.value)}
        />
        <FilmTimer kind="turns" label="turns" value={turns} onChange={setTurns} />
      </section>

      <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
        <div>
          <h4 className="font-display text-base font-bold uppercase tracking-wide">Path2Pro shooting</h4>
          <p className="mt-1 text-sm leading-7 text-muted">
            Film all 6 shots. Score 3 / 2 / 1 / 0 per shot. +1 power each time the ball reaches the 10m line behind the goal.
          </p>
        </div>
        <FilmTimer kind="shooting" label="Path2Pro shooting · 6 shots" value={shootClip} onChange={setShootClip} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <FieldLabel htmlFor="fit-shoot-pts">Shot points (0–18)</FieldLabel>
            <FieldInput
              id="fit-shoot-pts"
              inputMode="numeric"
              value={shootPts}
              onChange={(e) => setShootPts(e.target.value)}
            />
          </div>
          <div>
            <FieldLabel htmlFor="fit-shoot-power">Power 10m (+1 each, 0–6)</FieldLabel>
            <FieldInput
              id="fit-shoot-power"
              inputMode="numeric"
              value={shootPower}
              onChange={(e) => setShootPower(e.target.value)}
            />
          </div>
        </div>
        <p className="text-sm font-semibold">
          Total {(Number(shootPts) || 0) + (Number(shootPower) || 0)} pts
        </p>
      </section>

      <div className="flex flex-col gap-3">
        {canSave ? (
          <Button className="w-full" onClick={() => void onSave()} disabled={saving}>
            {saving ? "Saving…" : "Save test"}
          </Button>
        ) : (
          <p className="text-sm leading-7 text-muted">{SAVE_LOCK}</p>
        )}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            globalThis.window.location.href = "/report/tests";
          }}
        >
          Run squad report
        </Button>
        <Button
          variant="outline"
          className="w-full"
          disabled={!player}
          onClick={() => {
            if (!player) return;
            globalThis.window.location.href = `/report/test-player?name=${encodeURIComponent(player)}`;
          }}
        >
          Run this player's report
        </Button>
        <Button variant="outline" className="w-full" onClick={saveToSheets}>
          Save all tests to Google Sheets
        </Button>
        <a
          href="/performance-analysis-protocol.pdf"
          download="Cherrybrook-Raging-Bulls-Performance-Analysis-Protocol.pdf"
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-surface px-4 text-sm font-semibold text-fg"
        >
          Protocol PDF
        </a>
      </div>

      <section className="flex flex-col gap-3">
        <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Progression · {player ? parsePlayer(player).name : "pick a player"}
        </h4>
        <p className="text-sm leading-7 text-muted">
          Line graph of without-ball, with-ball and ball efficiency through the season.
        </p>
        <FitnessProgressChart rows={playerHistory} />
      </section>

      <section className="flex flex-col gap-6">
        <h4 className="font-display text-base font-bold uppercase tracking-wide text-accent">
          Rankings
        </h4>
        <RankBlock title="50m Zig Zag test with and without the ball" rows={zzRank} kind="zz50" />
        <RankBlock title="Linear speed · 30m" rows={s30Rank} kind="s30" />
        <RankBlock title="Turning with the ball" rows={turnRank} kind="turns" />
        <RankBlock title="Path2Pro shooting" rows={shootRank} kind="shooting" />
      </section>
    </div>
  );
}

function RankBlock({
  title,
  rows,
  kind,
}: {
  title: string;
  rows: FitnessAnalysis[];
  kind: "zz50" | "s30" | "turns" | "shooting";
}) {
  return (
    <section>
      <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wide">{title}</h3>
      {!rows.length ? (
        <p className="text-sm text-muted">No times yet.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          {rows.map((row, i) => {
            const noBall = kind === "zz50" ? row.zz50NoBall : kind === "s30" ? row.sprint30NoBall : null;
            const withBall = kind === "zz50" ? row.zz50Ball : kind === "s30" ? row.sprint30Ball : null;
            const extra = kind === "zz50" ? row.zz50Diff : kind === "s30" ? row.sprint30Diff : null;
            const eff = kind === "zz50" ? row.zz50Eff : kind === "s30" ? row.sprint30Eff : null;
            const grades = testGrades(row);
            const grade =
              kind === "zz50" ? grades.zz : kind === "s30" ? grades.sprint : kind === "turns" ? grades.turns : grades.shooting;
            return (
              <div
                key={row.player}
                className={cn("border-t border-border px-3 py-3 first:border-t-0", i === 0 && "bg-accent-soft")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <p className="min-w-0 truncate font-semibold">
                    <span className="mr-2 tabular-nums text-muted">{i + 1}</span>
                    {parsePlayer(row.player).name}
                  </p>
                  {kind === "turns" ? (
                    <p className="tabular-nums text-sm">{fmtSecs(row.turns3x4)}</p>
                  ) : kind === "shooting" ? (
                    <p className="tabular-nums text-sm font-bold text-accent">{row.shootingTotal ?? "—"} pts</p>
                  ) : (
                    <p className="shrink-0 text-sm font-bold tabular-nums text-accent">{fmtDiff(extra)}</p>
                  )}
                </div>
                {kind === "shooting" ? (
                  <p className="mt-1 text-xs leading-6 text-muted">
                    Shots {row.shootingPts ?? "—"} · Power {row.shootingPower ?? "—"} · grade {grade ?? "—"}/5
                  </p>
                ) : kind !== "turns" ? (
                  <p className="mt-1 text-xs leading-6 text-muted">
                    Without {fmtSecs(noBall)} − With {fmtSecs(withBall)} = {fmtDiff(extra)} · Eff {fmtPct(eff)} · grade {grade ?? "—"}/5
                  </p>
                ) : null}
                <button
                  type="button"
                  className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent"
                  onClick={() => {
                    globalThis.window.location.href = `/report/test-player?name=${encodeURIComponent(row.player)}`;
                  }}
                >
                  Player report
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function FitnessSnapshot({ test }: { test: FitnessAnalysis }) {
  return (
    <div className="mt-4 border-t border-border pt-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        Latest performance · {test.testedOn}
      </p>
      <dl className="mt-2 grid grid-cols-1 gap-1 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted">50m Zig Zag</dt>
          <dd className="tabular-nums">
            {fmtSecs(test.zz50NoBall)} − {fmtSecs(test.zz50Ball)} = {fmtDiff(test.zz50Diff)}
            <span className="ml-1 text-xs text-subtle">{fmtPct(test.zz50Eff)}</span>
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Linear speed 30m</dt>
          <dd className="tabular-nums">
            {fmtSecs(test.sprint30NoBall)} − {fmtSecs(test.sprint30Ball)} = {fmtDiff(test.sprint30Diff)}
            <span className="ml-1 text-xs text-subtle">{fmtPct(test.sprint30Eff)}</span>
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Turning with the ball</dt>
          <dd className="tabular-nums">{fmtSecs(test.turns3x4)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted">Shooting</dt>
          <dd className="tabular-nums">
            {test.shootingTotal ?? "—"} pts
            <span className="ml-1 text-xs text-subtle">
              ({test.shootingPts ?? 0} + {test.shootingPower ?? 0} power)
            </span>
          </dd>
        </div>
      </dl>
      <p className="mt-2 text-xs leading-snug text-muted">
        Zigzag: {disciplineVerdict(test.zz50NoBall, test.zz50Diff, "zz50", test.zz50Eff)}
      </p>
      <p className="text-xs leading-snug text-muted">
        30m: {disciplineVerdict(test.sprint30NoBall, test.sprint30Diff, "s30", test.sprint30Eff)}
      </p>
    </div>
  );
}
