"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldLabel, FieldSelect } from "@/components/ui/field";
import { KitGraphic } from "@/components/kit-graphic";
import { PlayerPicker } from "@/components/player-picker";
import {
  BULLS_WAY,
  CARRY_RULE,
  COMPACT_EXPAND,
  FIRST_BALLS,
  KEEPER_FACTS,
  POSSESSION_RULE,
  PRESS_RULE,
  benchKind,
  fillLineupBrief,
  personaliseBrief,
  fillBrief,
  formationExtras,
  roleBriefForPlayer,
  shapeNote,
  type SlotBrief,
} from "@/lib/brian-rules";
import {
  BENCH_SLOTS,
  DEFAULT_FORMATION,
  FORMATIONS,
  INJURED_SLOTS,
  RESERVE_SLOTS,
  SUB_SLOTS,
  UNAVAILABLE_SLOTS,
  formationById,
  remapLineup,
  type KitId,
} from "@/lib/formations";
import { getMatchPlans, saveMatchPlan, type MatchPlan } from "@/lib/pitch-actions";
import { SAVE_LOCK } from "@/lib/coach-users";
import { newTalkSalt } from "@/lib/mix-talk";
import { TEAM_NAME } from "@/lib/brand";
import { pregameWhatsAppText, sendWhatsApp } from "@/lib/whatsapp";
import { LiveMatch } from "@/components/live-match";
import { MatchStatsPanel } from "@/components/match-stats-panel";
import type { AppearanceMap } from "@/lib/appearance-actions";
import type { CurrentMatch } from "@/lib/vote-actions";
import { pitchSurname } from "@/lib/players";
import { formatKickoff } from "@/lib/when";
import { gameDetailsFor } from "@/lib/game-details";
import {
  BULLS_FIXTURES,
  BULLS_TEAM,
  bullsOpponent,
  fixtureKey,
  isBullsHome,
  planFixture,
  shortClub,
} from "@/lib/wdyl";
import { cn } from "@/lib/utils";

function emptyPlan(fx: (typeof BULLS_FIXTURES)[number]): MatchPlan {
  return {
    opposition: bullsOpponent(fx),
    kickoff: fx.kickoff,
    venue: fx.venue,
    home: isBullsHome(fx),
    formation: DEFAULT_FORMATION,
    kit: "home",
    lineup: {},
    brief: fillLineupBrief(DEFAULT_FORMATION, {}),
  };
}

export function PitchBoard({
  players,
  currentMatch,
  appearances,
  canSave = true,
}: {
  players: string[];
  currentMatch: CurrentMatch | null;
  appearances: AppearanceMap;
  canSave?: boolean;
}) {
  const fixtures = BULLS_FIXTURES;
  const nextPlan = planFixture(fixtures) ?? fixtures[0];
  const [key, setKey] = useState(fixtureKey(nextPlan));
  const [plans, setPlans] = useState<MatchPlan[]>([]);
  const [draft, setDraft] = useState<MatchPlan>(emptyPlan(nextPlan));
  const [saving, setSaving] = useState(false);
  const [openJob, setOpenJob] = useState<string | null>(null);

  const fx = useMemo(
    () => fixtures.find((f) => fixtureKey(f) === key) ?? fixtures[0],
    [fixtures, key],
  );

  const formation = formationById(draft.formation);
  const taken = Object.values(draft.lineup).filter(Boolean);

  async function load() {
    try {
      const data = await getMatchPlans();
      setPlans(data.plans);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load plans.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const found = plans.find(
      (p) => p.kickoff === fx.kickoff && p.opposition === bullsOpponent(fx),
    );
    setDraft(found ?? emptyPlan(fx));
    setOpenJob(null);
  }, [fx, plans]);

  function patch(next: Partial<MatchPlan>) {
    setDraft((cur) => ({ ...cur, ...next }));
  }

  function setFormation(id: string) {
    const lineup = remapLineup(draft.lineup, id, draft.formation);
    const brief = fillLineupBrief(id, lineup, [...plans, { lineup }]);
    patch({ formation: id, lineup, brief });
  }

  function historyPlans() {
    return [...plans, draft];
  }

  function setSlot(slotId: string, player: string) {
    const lineup = { ...draft.lineup };
    const brief = { ...draft.brief };
    if (player) {
      for (const [key, name] of Object.entries(lineup)) {
        if (name === player && key !== slotId) {
          delete lineup[key];
          delete brief[key];
        }
      }
      lineup[slotId] = player;
    } else {
      delete lineup[slotId];
      delete brief[slotId];
    }
    const kind = benchKind(slotId);
    if (kind && player) {
      brief[slotId] = roleBriefForPlayer(kind, player, draft.formation, [...plans, { lineup }]);
    } else if (player) {
      const roles = fillBrief(draft.formation);
      const role = roles[slotId] ?? { duty: "", withBall: "", withoutBall: "" };
      brief[slotId] = personaliseBrief(player, slotId, role);
    }
    patch({ lineup, brief });
  }

  function setBenchStatus(
    fromId: string,
    next: "sub" | "reserve" | "injured" | "unavailable" | "clear",
  ) {
    const player = draft.lineup[fromId];
    if (!player) return;
    if (next === "clear") {
      setSlot(fromId, "");
      return;
    }
    const buckets = {
      sub: SUB_SLOTS,
      reserve: RESERVE_SLOTS,
      injured: INJURED_SLOTS,
      unavailable: UNAVAILABLE_SLOTS,
    } as const;
    const target =
      buckets[next].find((id) => !draft.lineup[id] || draft.lineup[id] === player) ??
      buckets[next][0];
    setSlot(target, player);
  }

  function setJob(slotId: string, field: keyof SlotBrief, value: string) {
    patch({
      brief: {
        ...draft.brief,
        [slotId]: {
          duty: draft.brief[slotId]?.duty ?? "",
          withBall: draft.brief[slotId]?.withBall ?? "",
          withoutBall: draft.brief[slotId]?.withoutBall ?? "",
          [field]: value,
        },
      },
    });
  }

  function fillJobs() {
    patch({
      brief: fillLineupBrief(
        draft.formation,
        draft.lineup,
        historyPlans(),
        `${draft.formation}|${fx.kickoff}`,
      ),
    });
    toast.success("Jobs filled. You can still edit any of them.");
  }

  function rewriteJobs() {
    const brief = fillLineupBrief(draft.formation, draft.lineup, historyPlans(), newTalkSalt());
    patch({ brief });
    const first = formation.slots.find((s) => draft.lineup[s.id])?.id ?? formation.slots[0]?.id ?? null;
    setOpenJob(first);
    toast.success("AI rewrote the talks. Edit any box, then Save plan.");
  }

  async function onSave() {
    if (!canSave) {
      toast.error(SAVE_LOCK);
      return;
    }
    setSaving(true);
    try {
      await saveMatchPlan({
        data: {
          opposition: bullsOpponent(fx),
          kickoff: fx.kickoff,
          venue: fx.venue,
          home: isBullsHome(fx),
          formation: draft.formation,
          kit: draft.kit,
          lineup: { ...draft.lineup },
          brief: draft.brief,
        },
      });
      toast.success(`Plan vs ${shortClub(bullsOpponent(fx))} saved.`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save plan.");
    } finally {
      setSaving(false);
    }
  }

  const reportUrl = `/report/pregame?kickoff=${encodeURIComponent(fx.kickoff)}&opp=${encodeURIComponent(bullsOpponent(fx))}`;

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/tactics"
        className="flex h-12 items-center justify-center rounded-md bg-accent text-sm font-semibold uppercase tracking-wide text-accent-fg"
      >
        Open Raging Bulls Tactic
      </Link>
      <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight">
          Pre-game plan
        </h3>
        <p className="mb-3 text-sm text-muted">
          Opens on the next match after each game so you can set the starting 9,
          jobs and kit. You can still pick an earlier fixture from the list.
        </p>

        <FieldLabel htmlFor="opp">Opposition</FieldLabel>
        <FieldSelect
          id="opp"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="mb-3"
        >
          {fixtures.map((f) => {
            const planned = fixtureKey(f) === fixtureKey(nextPlan);
            return (
              <option key={fixtureKey(f)} value={fixtureKey(f)}>
                {planned ? "Next · " : ""}
                {formatKickoff(f.kickoff, "EEE d MMM")} · {shortClub(bullsOpponent(f))}{" "}
                {isBullsHome(f) ? "(H)" : "(A)"} · {formatKickoff(f.kickoff, "HH:mm")}
              </option>
            );
          })}
        </FieldSelect>
        <p className="mb-3 text-xs text-muted">
          {fixtureKey(fx) === fixtureKey(nextPlan) ? "Planning next match · " : ""}
          {isBullsHome(fx) ? "Home" : "Away"} · {fx.venue} · {BULLS_TEAM}
        </p>
        {gameDetailsFor(bullsOpponent(fx)) ? (
          <div className="mb-4 rounded-lg border border-accent bg-accent-soft p-3 text-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">
              {gameDetailsFor(bullsOpponent(fx))!.title}
            </p>
            <ul className="mt-1 list-disc pl-4 text-fg">
              {gameDetailsFor(bullsOpponent(fx))!.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted">Kit</p>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <KitChoice
            kit="home"
            label="Red / black"
            active={draft.kit === "home"}
            onClick={() => patch({ kit: "home" })}
          />
          <KitChoice
            kit="away"
            label="Navy / white"
            active={draft.kit === "away"}
            onClick={() => patch({ kit: "away" })}
          />
        </div>

        <LiveMatch
          players={players}
          opposition={bullsOpponent(fx)}
          kickoff={fx.kickoff}
          formation={draft.formation}
          lineup={draft.lineup}
          kit={draft.kit}
          canSave={canSave}
          onPlanFormation={setFormation}
          onPlanPlace={(slotId, player) => setSlot(slotId, player)}
          onPlanDrop={(from, to) => {
            const lineup = { ...draft.lineup };
            const a = lineup[from];
            const b = lineup[to];
            if (a) lineup[to] = a;
            else delete lineup[to];
            if (b) lineup[from] = b;
            else delete lineup[from];
            patch({ lineup });
          }}
        />

        <div className="mt-4 rounded-xl border border-accent bg-accent-soft p-3">
          <p className="font-display text-sm font-bold uppercase tracking-wide">
            The way the Bulls play
          </p>
          <ul className="mt-1 flex flex-col gap-1.5 text-sm">
            {BULLS_WAY.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {formationExtras(draft.formation).map((line) => (
            <p key={line} className="mt-2 text-sm">
              {line}
            </p>
          ))}
          <p className="mt-3 font-display text-sm font-bold uppercase tracking-wide">Outfield</p>
          <p className="mt-1 text-sm">{COMPACT_EXPAND}</p>
          <p className="mt-1 text-sm">{FIRST_BALLS}</p>
          <p className="mt-1 text-sm">{PRESS_RULE}</p>
          <p className="mt-1 text-sm">{POSSESSION_RULE}</p>
          <p className="mt-1 text-sm">{CARRY_RULE}</p>
          <p className="mt-3 font-display text-sm font-bold uppercase tracking-wide">Keeper</p>
          <ul className="mt-1 flex flex-col gap-1.5 text-sm">
            {KEEPER_FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h4 className="font-display text-lg font-bold uppercase tracking-tight">
              Jobs by position
            </h4>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button type="button" onClick={rewriteJobs}>
                AI rewrite talks
              </Button>
              <Button variant="outline" type="button" onClick={fillJobs}>
                Fill from Brian’s rules
              </Button>
            </div>
          </div>
          <p className="mb-3 text-xs text-muted">
            AI rewrite mixes the words for this week — same jobs, fresh talk. Then tap Edit on any
            position and change the words. Save plan keeps your edits on the report.
          </p>
          <div className="flex flex-col gap-2">
            {formation.slots.map((slot) => {
              const job = draft.brief[slot.id];
              const open = openJob === slot.id;
              const lad = draft.lineup[slot.id];
              return (
                <div key={slot.id} className="rounded-lg border border-border bg-bg">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
                    onClick={() => setOpenJob(open ? null : slot.id)}
                  >
                    <span className="text-sm font-semibold">
                      {slot.label}
                      {lad ? ` · ${pitchSurname(lad, players)}` : ""}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-muted">
                      {open ? "Hide" : "Edit"}
                    </span>
                  </button>
                  {open ? (
                    <div className="flex flex-col gap-2 border-t border-border px-3 py-3">
                      <label className="block">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                          Responsibility
                        </span>
                        <textarea
                          value={job?.duty ?? ""}
                          onChange={(e) => setJob(slot.id, "duty", e.target.value)}
                          rows={2}
                          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                          With the ball
                        </span>
                        <textarea
                          value={job?.withBall ?? ""}
                          onChange={(e) => setJob(slot.id, "withBall", e.target.value)}
                          rows={3}
                          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                          Without the ball
                        </span>
                        <textarea
                          value={job?.withoutBall ?? ""}
                          onChange={(e) => setJob(slot.id, "withoutBall", e.target.value)}
                          rows={3}
                          className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
                        />
                      </label>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <h4 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">
            Subs · stay involved
          </h4>
          <p className="mb-2 text-xs text-muted">
            Brief: front, middle, back. Study the starters. Everyone plays their part.
          </p>
          <div className="flex flex-col gap-2">
            {SUB_SLOTS.map((id, i) => (
              <BenchJob
                key={id}
                id={id}
                label={`Sub ${i + 1}`}
                lad={draft.lineup[id]}
                job={draft.brief[id]}
                open={openJob === id}
                players={players}
                onToggle={() => setOpenJob(openJob === id ? null : id)}
                onChange={(field, value) => setJob(id, field, value)}
              />
            ))}
          </div>
          <h4 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">
            Reserves · not match day
          </h4>
          <div className="mt-2 flex flex-col gap-2">
            {RESERVE_SLOTS.map((id, i) => (
              <BenchJob
                key={id}
                id={id}
                label={`Reserve ${i + 1}`}
                lad={draft.lineup[id]}
                job={draft.brief[id]}
                open={openJob === id}
                players={players}
                onToggle={() => setOpenJob(openJob === id ? null : id)}
                onChange={(field, value) => setJob(id, field, value)}
              />
            ))}
          </div>
          <h4 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">Injured</h4>
          <div className="mt-2 flex flex-col gap-2">
            {INJURED_SLOTS.map((id, i) => (
              <BenchJob
                key={id}
                id={id}
                label={`Injured ${i + 1}`}
                lad={draft.lineup[id]}
                job={draft.brief[id]}
                open={openJob === id}
                players={players}
                onToggle={() => setOpenJob(openJob === id ? null : id)}
                onChange={(field, value) => setJob(id, field, value)}
              />
            ))}
          </div>
          <h4 className="mt-5 font-display text-lg font-bold uppercase tracking-tight">
            Unavailable
          </h4>
          <div className="mt-2 flex flex-col gap-2">
            {UNAVAILABLE_SLOTS.map((id, i) => (
              <BenchJob
                key={id}
                id={id}
                label={`Unavailable ${i + 1}`}
                lad={draft.lineup[id]}
                job={draft.brief[id]}
                open={openJob === id}
                players={players}
                onToggle={() => setOpenJob(openJob === id ? null : id)}
                onChange={(field, value) => setJob(id, field, value)}
              />
            ))}
          </div>
        </div>

        {canSave ? (
          <Button className="mt-4 w-full" onClick={() => void onSave()} disabled={saving}>
            {saving ? "Saving…" : "Save plan"}
          </Button>
        ) : (
          <p className="mt-4 text-sm text-muted">{SAVE_LOCK} Move lads and change shape — it will not write.</p>
        )}
        <Button
          className="mt-2 w-full bg-[#25d366] text-[#052e16] hover:bg-[#1ebe5d]"
          disabled={saving}
          onClick={() => {
            if (!canSave) {
              toast.error(SAVE_LOCK);
              return;
            }
            void (async () => {
              setSaving(true);
              try {
                await saveMatchPlan({
                  data: {
                    opposition: bullsOpponent(fx),
                    kickoff: fx.kickoff,
                    venue: fx.venue,
                    home: isBullsHome(fx),
                    formation: draft.formation,
                    kit: draft.kit,
                    lineup: { ...draft.lineup },
                    brief: draft.brief,
                  },
                });
                const url = `${globalThis.location.origin}${reportUrl}`;
                await sendWhatsApp(
                  `${TEAM_NAME} pre-game`,
                  pregameWhatsAppText({
                    opposition: shortClub(bullsOpponent(fx)),
                    formation: draft.formation,
                    lineup: draft.lineup,
                    kickoff: fx.kickoff,
                    home: isBullsHome(fx),
                    venue: fx.venue,
                  }),
                  url,
                );
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not send.");
              } finally {
                setSaving(false);
              }
            })();
          }}
        >
          Send in WhatsApp
        </Button>
        <Button
          variant="outline"
          className="mt-2 w-full"
          disabled={saving}
          onClick={() => {
            if (!canSave) {
              globalThis.window.location.href = reportUrl;
              return;
            }
            void (async () => {
              setSaving(true);
              try {
                await saveMatchPlan({
                  data: {
                    opposition: bullsOpponent(fx),
                    kickoff: fx.kickoff,
                    venue: fx.venue,
                    home: isBullsHome(fx),
                    formation: draft.formation,
                    kit: draft.kit,
                    lineup: { ...draft.lineup },
                    brief: draft.brief,
                  },
                });
                globalThis.window.location.href = reportUrl;
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Could not save plan.");
                setSaving(false);
              }
            })();
          }}
        >
          Colour PDF
        </Button>
      </section>

      <MatchStatsPanel
        players={players}
        currentMatch={currentMatch}
        appearances={appearances}
        fixtureOpposition={bullsOpponent(fx)}
        canSave={canSave}
      />
    </div>
  );
}

function BenchPick({
  kind,
  label,
  kit,
  player,
  players,
  taken,
  onPick,
  onStatus,
}: {
  id: string;
  kind: "sub" | "reserve" | "injured" | "unavailable";
  label: string;
  kit: KitId;
  player: string;
  players: string[];
  taken: string[];
  onPick: (next: string) => void;
  onStatus: (next: "sub" | "reserve" | "injured" | "unavailable" | "clear") => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <PlayerPicker
        kit={kit}
        label={label}
        value={player}
        onChange={onPick}
        players={players}
        exclude={taken.filter((p) => p !== player)}
        placeholder={label}
      />
      {player ? (
        <select
          value={kind}
          onChange={(e) =>
            onStatus(e.target.value as "sub" | "reserve" | "injured" | "unavailable" | "clear")
          }
          className="h-9 w-full max-w-28 rounded-md border border-border bg-bg px-1 text-xs font-semibold uppercase tracking-wide text-fg"
        >
          <option value="sub">Sub</option>
          <option value="reserve">Reserve</option>
          <option value="injured">Injured</option>
          <option value="unavailable">Unavailable</option>
          <option value="clear">Remove</option>
        </select>
      ) : null}
    </div>
  );
}

function BenchJob({
  label,
  lad,
  job,
  open,
  players,
  onToggle,
  onChange,
}: {
  id: string;
  label: string;
  lad?: string;
  job?: SlotBrief;
  open: boolean;
  players: string[];
  onToggle: () => void;
  onChange: (field: keyof SlotBrief, value: string) => void;
}) {
  if (!lad) return null;
  return (
    <div className="rounded-lg border border-border bg-bg">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
        onClick={onToggle}
      >
        <span className="text-sm font-semibold">
          {label} · {pitchSurname(lad, players)}
        </span>
        <span className="text-xs uppercase tracking-wide text-muted">{open ? "Hide" : "Edit"}</span>
      </button>
      {open ? (
        <div className="flex flex-col gap-2 border-t border-border px-3 py-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Positions / talk
            </span>
            <textarea
              value={job?.duty ?? ""}
              onChange={(e) => onChange("duty", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              With the ball
            </span>
            <textarea
              value={job?.withBall ?? ""}
              onChange={(e) => onChange("withBall", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
              Without the ball
            </span>
            <textarea
              value={job?.withoutBall ?? ""}
              onChange={(e) => onChange("withoutBall", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm"
            />
          </label>
        </div>
      ) : job?.duty ? (
        <p className="border-t border-border px-3 py-2 text-xs text-muted">{job.duty}</p>
      ) : null}
    </div>
  );
}

function KitChoice({
  kit,
  label,
  active,
  onClick,
}: {
  kit: KitId;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-14 items-center gap-2 rounded-md border px-3",
        active ? "border-accent bg-accent-soft" : "border-border bg-bg",
      )}
    >
      <KitGraphic kit={kit} number="9" />
      <span className="text-left text-xs font-semibold uppercase tracking-wide">{label}</span>
    </button>
  );
}

function PitchMarkings() {
  return (
    <svg viewBox="0 0 70 105" className="block w-full text-fg" aria-hidden="true">
      <defs>
        <linearGradient id="grass-3d" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-ok)" stopOpacity="0.72" />
          <stop offset="1" stopColor="var(--color-ok)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="70" height="105" fill="url(#grass-3d)" />
      <rect x="0" y="0" width="70" height="105" className="fill-ok" opacity="0.35" />
      <rect x="2" y="2" width="66" height="101" fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.9" />
      <line x1="2" y1="52.5" x2="68" y2="52.5" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="35" cy="52.5" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="35" cy="52.5" r="0.7" fill="currentColor" />
      <rect x="18" y="2" width="34" height="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="25" y="2" width="20" height="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="18" y="89" width="34" height="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <rect x="25" y="97" width="20" height="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="35" cy="16" r="0.6" fill="currentColor" />
      <circle cx="35" cy="89" r="0.6" fill="currentColor" />
    </svg>
  );
}
