"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { FieldInput, FieldLabel, FieldSelect } from "@/components/ui/field";
import { PlayedPicker } from "@/components/played-picker";
import { PlayerPicker } from "@/components/player-picker";
import {
  getCoachData,
  resetParentVotes,
  saveMatchAwards,
  savePlayerNote,
  tallyAwards,
  type MatchAward,
} from "@/lib/coach-actions";
import { FALLBACK_PIN } from "@/lib/pins";
import { forgetAdminEmail, readRememberedAdminEmail } from "@/lib/coach-admins";
import { readCoachBio, registerCoachBio } from "@/lib/coach-bio";
import { clearCoachSession } from "@/lib/coach-session";
import {
  isAdminName,
  canSaveName,
  SAVE_LOCK,
  heartbeatCoach,
  leaveCoach,
} from "@/lib/coach-users";
import { listDemoPlayers } from "@/lib/demo-squad";
import { isDemoName } from "@/lib/demo";
import { CoachUsersPanel } from "@/components/coach-users-panel";
import { DemoPanel } from "@/components/demo-panel";
import { SquadPanel } from "@/components/squad-panel";
import { AuditLog } from "@/components/audit-log";
import { ParentLoginsPanel } from "@/components/parent-logins-panel";
import { TrainingPanel } from "@/components/training-panel";
import { PitchBoard } from "@/components/pitch-board";
import { PotmPanel } from "@/components/potm-panel";
import { FitnessPanel } from "@/components/fitness-panel";
import { VoteSheet } from "@/components/vote-sheet";
import { MinutesPanel } from "@/components/minutes-panel";
import { joinOppMom, oppMomPlayers } from "@/lib/scoring";
import { PlayerProgressCard } from "@/components/player-progress";
import { PerformancePick } from "@/components/performance-pick";
import { WhoOnline } from "@/components/who-online";
import { LeaguePanel } from "@/components/league-panel";
import { RulesCard } from "@/components/rules-card";
import { PrizeExamples } from "@/components/prize-examples";
import { FullScoreTable } from "@/components/full-score-table";
import { MonthlyTables } from "@/components/monthly-tables";
import { YearTable } from "@/components/year-table";
import { SafePanel } from "@/components/safe-panel";
import { saveAppearances, type AppearanceMap } from "@/lib/appearance-actions";
import { computePlayerSeason } from "@/lib/progress";
import { PLAYERS, shortName } from "@/lib/players";
import { gameKey } from "@/lib/league";
import { getScoreExtras } from "@/lib/score-actions";
import { getLeagueData } from "@/lib/league-actions";
import { formatKickoff } from "@/lib/when";
import {
  BULLS_FIXTURES,
  bullsRoundList,
  type LeagueFixture,
} from "@/lib/wdyl";
import type { CurrentMatch, VoteRow } from "@/lib/vote-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import { cn } from "@/lib/utils";

type Tab =
  | "awards"
  | "table"
  | "pitch"
  | "mins"
  | "ballots"
  | "parents"
  | "progress"
  | "train"
  | "month"
  | "year"
  | "tests"
  | "rules"
  | "users";

const TABS: { id: Tab; label: string }[] = [
  { id: "awards", label: "Awards" },
  { id: "table", label: "Table" },
  { id: "pitch", label: "Pitch" },
  { id: "mins", label: "Mins" },
  { id: "ballots", label: "Votes" },
  { id: "parents", label: "Parents" },
  { id: "progress", label: "Progress" },
  { id: "train", label: "Train" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" },
  { id: "tests", label: "Tests" },
  { id: "rules", label: "Rules" },
  { id: "users", label: "Users" },
];

export function CoachDesk() {
  const [coachName, setCoachName] = useState("");
  const [coachRole, setCoachRole] = useState<"admin" | "coach">("coach");
  const [adminPin, setAdminPin] = useState("");
  const [sessionPin, setSessionPin] = useState("");
  const [tab, setTab] = useState<Tab>("awards");
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<string[]>([...PLAYERS]);
  const [history, setHistory] = useState<VoteRow[]>([]);
  const [awards, setAwards] = useState<MatchAward[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch | null>(null);
  const [gameNumber, setGameNumber] = useState("");
  const [opposition, setOpposition] = useState("");
  const [oppMom, setOppMom] = useState("");
  const [oppMomJoint, setOppMomJoint] = useState("");
  const [playersPlayer, setPlayersPlayer] = useState("");
  const [openPlayer, setOpenPlayer] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetConfirm, setResetConfirm] = useState("");
  const [appearances, setAppearances] = useState<AppearanceMap>({});
  const [played, setPlayed] = useState<string[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [tests, setTests] = useState<FitnessTest[]>([]);
  const [leagueFixtures, setLeagueFixtures] = useState<LeagueFixture[]>([]);
  const [viewingDemo, setViewingDemo] = useState(false);
  const [viewingDemoName, setViewingDemoName] = useState("");
  const [bullsPlayers, setBullsPlayers] = useState<string[]>([]);
  const [liveOn, setLiveOn] = useState(false);
  const canSave = canSaveName(coachName) && !viewingDemo;

  async function load() {
    setLoading(true);
    try {
      const data = await getCoachData();
      setHistory(data.history);
      setAwards(data.awards);
      setNotes(data.notes ?? {});
      setCurrentMatch(data.currentMatch);
      setAppearances(data.appearances ?? {});
      const nameNow =
        coachName ||
        (typeof window !== "undefined" ? window.localStorage.getItem("bulls-coach-name") || "" : "");
      const pinNow =
        sessionPin ||
        (typeof window !== "undefined" ? window.sessionStorage.getItem("bulls-coach-pin") || "" : "");
      if (isDemoName(nameNow) && pinNow) {
        try {
          const demo = await listDemoPlayers({ data: { pin: pinNow } });
          if (demo.players?.length) {
            setBullsPlayers(data.players);
            setPlayers(demo.players.map((p) => p.label));
          } else {
            setPlayers(data.players);
          }
        } catch {
          setPlayers(data.players);
        }
      } else if (!viewingDemo) {
        setPlayers(data.players);
        setBullsPlayers(data.players);
      }
      if (data.currentMatch) {
        setGameNumber(data.currentMatch.gameNumber);
        setOpposition(data.currentMatch.opposition);
        const existing = data.awards.find(
          (a) =>
            a.gameNumber.toLowerCase() === data.currentMatch!.gameNumber.toLowerCase() &&
            a.opposition.toLowerCase() === data.currentMatch!.opposition.toLowerCase(),
        );
        if (existing) {
          const moms = oppMomPlayers(existing.oppMom);
          setOppMom(moms[0] ?? "");
          setOppMomJoint(moms[1] ?? "");
          setPlayersPlayer(existing.playersPlayer || existing.managerPlayer || "");
        }
      }
      try {
        const extras = await getScoreExtras();
        setSessions(extras.sessions);
        setTests(extras.tests ?? []);
      } catch {
        setSessions([]);
        setTests([]);
      }
      try {
        const league = await getLeagueData();
        setLeagueFixtures(league.fixtures ?? []);
      } catch {
        setLeagueFixtures([]);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load coach data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      const name = window.localStorage.getItem("bulls-coach-name") || "Brian Lee";
      const role =
        window.localStorage.getItem("bulls-coach-role") === "admin" || isAdminName(name)
          ? "admin"
          : "coach";
      setCoachName(name);
      setCoachRole(role);
      setAdminPin(role === "admin" ? window.localStorage.getItem("bulls-coach-pin") || FALLBACK_PIN : "");
      setSessionPin(
        window.sessionStorage.getItem("bulls-coach-pin") ||
          window.localStorage.getItem("bulls-coach-pin") ||
          "",
      );
    } catch {
      //
    }
  }, []);

  useEffect(() => {
    const fetchData = window.setTimeout(() => {
      void load();
    }, 400);
    return () => window.clearTimeout(fetchData);
  }, []);

  function lock() {
    const pinNow = sessionPin;
    const seat = coachName;
    forgetAdminEmail();
    clearCoachSession();
    setCoachName("");
    setCoachRole("coach");
    setAdminPin("");
    setSessionPin("");
    if (pinNow) void leaveCoach({ data: { pin: pinNow, seat } }).catch(() => undefined);
  }

  function fillFromMatch(game: string, opp: string) {
    setGameNumber(game);
    setOpposition(opp);
    const existing = awards.find(
      (a) =>
        a.gameNumber.toLowerCase() === game.toLowerCase() &&
        a.opposition.toLowerCase() === opp.toLowerCase(),
    );
    const moms = oppMomPlayers(existing?.oppMom);
    setOppMom(moms[0] ?? "");
    setOppMomJoint(moms[1] ?? "");
    setPlayersPlayer(existing?.playersPlayer || existing?.managerPlayer || "");
    setTab("awards");
  }

  useEffect(() => {
    if (!gameNumber.trim() || !opposition.trim() || !players.length) return;
    const saved = appearances[gameKey(gameNumber.trim(), opposition.trim())];
    setPlayed(saved ?? []);
  }, [gameNumber, opposition, appearances, players]);

  async function onSavePlayed() {
    if (!canSave) return toast.error(SAVE_LOCK);
    if (!gameNumber.trim() || !opposition.trim()) {
      toast.error("Pick a round first.");
      return;
    }
    setSaving(true);
    try {
      const res = await saveAppearances({
        data: {
          gameNumber: gameNumber.trim(),
          opposition: opposition.trim(),
          players: played,
        },
      });
      if (res.success) setAppearances(res.appearances);
      toast.success("Playing squad saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save who played.");
    } finally {
      setSaving(false);
    }
  }

  async function onSaveAwards() {
    if (!canSave) return toast.error(SAVE_LOCK);
    if (!gameNumber.trim() || !opposition.trim()) {
      toast.error("Pick a round first.");
      return;
    }
    setSaving(true);
    try {
      const res = await saveMatchAwards({
        data: {
          gameNumber: gameNumber.trim(),
          opposition: opposition.trim(),
          oppMom: joinOppMom([oppMom, oppMomJoint]),
          playersPlayer,
          managerPlayer: playersPlayer,
        },
      });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      toast.success("Weekly awards saved.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save awards.");
    } finally {
      setSaving(false);
    }
  }

  async function onResetVotes() {
    if (!canSave) return toast.error(SAVE_LOCK);
    if (resetConfirm !== "RESET VOTES") {
      toast.error("Type RESET VOTES in the box first.");
      return;
    }
    setResetting(true);
    try {
      const res = await resetParentVotes({ data: { confirm: resetConfirm } });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setResetConfirm("");
      toast.success("Parent 3-2-1 cleared. Training, awards and graphs are untouched.");
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not reset votes.");
    } finally {
      setResetting(false);
    }
  }

  async function onSaveNote(player: string) {
    if (!canSave) return toast.error(SAVE_LOCK);
    setSavingNote(true);
    try {
      const res = await savePlayerNote({ data: { player, note: draftNote } });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setNotes((prev) => ({ ...prev, [player]: draftNote.trim() }));
      toast.success(draftNote.trim() ? "Note saved." : "Note deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save note.");
    } finally {
      setSavingNote(false);
    }
  }

  const rounds = useMemo(
    () => bullsRoundList(leagueFixtures.length ? leagueFixtures : BULLS_FIXTURES),
    [leagueFixtures],
  );
  const selectedRound = useMemo(() => {
    const g = gameNumber.trim().toLowerCase();
    const o = opposition.trim().toLowerCase();
    return (
      rounds.find((r) => r.gameNumber.toLowerCase() === g && r.opposition.toLowerCase() === o) ??
      rounds.find((r) => r.opposition.toLowerCase() === o) ??
      null
    );
  }, [rounds, gameNumber, opposition]);

  function pickRound(key: string) {
    const row = rounds.find((r) => r.key === key);
    if (!row) return;
    fillFromMatch(row.gameNumber, row.opposition);
  }
  const awardTotals = useMemo(() => tallyAwards(players, awards), [players, awards]);

  const isAdmin = coachRole === "admin" || isAdminName(coachName);
  const showDemo = isAdmin || isDemoName(coachName);
  const visibleTabs = TABS.filter((t) => t.id !== "users" || isAdmin);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-bg">
      <AppHeader onRefresh={() => void load()} refreshing={loading} boardLink="vote" />
      <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Coach desk</p>
            <p className="font-display text-xl font-bold uppercase tracking-tight">{coachName || "Coach"}</p>
            {readRememberedAdminEmail() ? (
              <p className="text-xs text-muted">Super admin · {readRememberedAdminEmail()}</p>
            ) : viewingDemo ? (
              <p className="text-xs text-muted">Viewing demo · {viewingDemoName}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-2">
          <button type="button" className="text-xs font-semibold uppercase tracking-wide text-accent" onClick={lock}>
            Lock
          </button>
          {!readCoachBio() ? (
            <button
              type="button"
              className="text-xs font-semibold uppercase tracking-wide text-muted"
              onClick={() => {
                void (async () => {
                  const ok = await registerCoachBio(
                    coachName || "Coach",
                    coachRole,
                    sessionPin || FALLBACK_PIN,
                  );
                  toast.success(ok ? "Fingerprint saved on this phone." : "Could not save fingerprint here. Try Chrome or Safari on the phone.");
                })();
              }}
            >
              Save fingerprint
            </button>
          ) : null}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {visibleTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "h-11 rounded-md px-1 text-xs font-semibold uppercase tracking-wide",
                tab === t.id ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {liveOn && sessionPin ? <WhoOnline pin={sessionPin || adminPin} /> : null}
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <SafePanel key={tab} label={tab}>
          {tab === "awards" ? (
            <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">Match awards</h3>
              <p className="mb-3 text-sm text-muted">Opp MOM 20, or 10 each if shared · players’ / manager’s player 10.</p>
              <FieldLabel htmlFor="award-round">Round</FieldLabel>
              <FieldSelect
                id="award-round"
                className="mb-2"
                value={selectedRound?.key ?? ""}
                onChange={(e) => pickRound(e.target.value)}
              >
                <option value="" disabled>
                  Pick a fixture…
                </option>
                {rounds.map((r) => (
                  <option key={r.key} value={r.key}>
                    {r.gameNumber} · {r.opposition} ({r.home ? "H" : "A"})
                    {r.us != null && r.them != null ? ` · ${r.us}–${r.them}` : ""}
                  </option>
                ))}
              </FieldSelect>
              {selectedRound ? (
                <p className="mb-3 text-sm text-muted">
                  {formatKickoff(selectedRound.kickoff, "EEE d MMM · HH:mm")}
                  {selectedRound.home ? " · Home" : " · Away"}
                  {selectedRound.venue ? ` · ${selectedRound.venue}` : ""}
                  {selectedRound.us != null && selectedRound.them != null ? (
                    <span className="font-semibold text-fg">
                      {" "}
                      · {selectedRound.us}–{selectedRound.them}
                    </span>
                  ) : (
                    " · no result yet"
                  )}
                </p>
              ) : (
                <p className="mb-3 text-sm text-muted">Linked to our Wigan fixtures and results.</p>
              )}
              <FieldLabel htmlFor="award-mom">Opposition MOM</FieldLabel>
              <PlayerPicker
                id="award-mom"
                label="Opposition MOM"
                value={oppMom}
                players={players}
                className="mb-3"
                onChange={setOppMom}
              />
              <FieldLabel htmlFor="award-mom-joint">Joint opposition MOM</FieldLabel>
              <PlayerPicker
                id="award-mom-joint"
                label="Joint opposition MOM"
                value={oppMomJoint}
                players={players}
                exclude={oppMom ? [oppMom] : []}
                placeholder="No share"
                className="mb-3"
                onChange={setOppMomJoint}
              />
              <FieldLabel htmlFor="award-pp">Players’ / manager’s player</FieldLabel>
              <PlayerPicker
                id="award-pp"
                label="Players’ player"
                value={playersPlayer}
                players={players}
                className="mb-3"
                onChange={setPlayersPlayer}
              />
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Who played</p>
              <PlayedPicker players={players} selected={played} onChange={setPlayed} />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="outline" disabled={saving} onClick={() => void onSavePlayed()}>
                  Save squad
                </Button>
                <Button disabled={saving} onClick={() => void onSaveAwards()}>
                  {saving ? "Saving…" : "Save awards"}
                </Button>
              </div>
              <ul className="mt-4 flex flex-col gap-1 text-sm">
                {awardTotals.filter((r) => r.oppMom + r.playersPlayer > 0).map((r) => (
                  <li key={r.name} className="flex justify-between">
                    <span>{shortName(r.name)}</span>
                    <span className="tabular-nums text-muted">
                      MOM {r.oppMom} · PP {r.playersPlayer}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {tab === "table" ? (
            <>
            <FullScoreTable
              players={players}
              history={history}
              appearances={appearances}
              awards={awards}
              sessions={sessions}
              tests={tests}
            />
            <div className="mt-4">
            <YearTable
              players={players}
              history={history}
              appearances={appearances}
              awards={awards}
              sessions={sessions}
              tests={tests}
              yearOnly
            />
            </div>
            </>
          ) : null}

          {tab === "pitch" ? (
            <PitchBoard
              players={players}
              currentMatch={currentMatch}
              appearances={appearances}
              canSave={canSave}
            />
          ) : null}

          {tab === "mins" ? <MinutesPanel /> : null}

          {tab === "ballots" ? (
            <>
              <VoteSheet
                players={players}
                history={history}
                currentMatch={currentMatch}
                onSaved={() => load()}
              />
              <section className="mt-4 rounded-xl border border-border bg-surface p-4 shadow-panel">
                <FieldLabel htmlFor="reset-votes">Type RESET VOTES</FieldLabel>
                <FieldInput
                  id="reset-votes"
                  className="mb-2"
                  value={resetConfirm}
                  onChange={(e) => setResetConfirm(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={resetting || resetConfirm !== "RESET VOTES"}
                  onClick={() => void onResetVotes()}
                >
                  {resetting ? "Resetting…" : "Set parent 3-2-1 to 0"}
                </Button>
              </section>
            </>
          ) : null}

          {tab === "parents" ? (
            <>
              <ParentLoginsPanel coachPin={sessionPin || adminPin} />
              {isAdmin ? <AuditLog coachPin={sessionPin || adminPin} /> : null}
            </>
          ) : null}

          {tab === "progress" ? (
            <section className="flex flex-col gap-4">
              <PerformancePick
                players={players}
                history={history}
                awards={awards}
                sessions={sessions}
                tests={tests}
                appearances={appearances}
                onRefresh={() => load()}
              />
              {openPlayer ? (
                <div>
                  <PlayerProgressCard
                    season={computePlayerSeason(openPlayer, players, history, awards, appearances)}
                    note={notes[openPlayer]}
                    showAwards
                    onRefresh={() => load()}
                  />
                  <FieldLabel htmlFor="coach-note" className="mt-3">
                    Note for parent
                  </FieldLabel>
                  <FieldInput
                    id="coach-note"
                    value={draftNote}
                    onChange={(e) => setDraftNote(e.target.value)}
                  />
                  <Button className="mt-2 w-full" disabled={savingNote} onClick={() => void onSaveNote(openPlayer)}>
                    {savingNote ? "Saving…" : "Save note"}
                  </Button>
                </div>
              ) : null}
              <PlayerPicker
                id="progress-lad"
                label="Open lad"
                value={openPlayer || ""}
                players={players}
                onChange={(name) => {
                  setOpenPlayer(name);
                  setDraftNote(notes[name] || "");
                }}
              />
            </section>
          ) : null}

          {tab === "train" ? <TrainingPanel players={players} canSave={canSave} /> : null}

          {tab === "month" ? (
            <>
              <PotmPanel />
              <div className="mt-4">
                <MonthlyTables
                  players={players}
                  history={history}
                  appearances={appearances}
                  awards={awards}
                  sessions={sessions}
                  tests={tests}
                  full
                />
              </div>
              <PrizeExamples />
            </>
          ) : null}

          {tab === "year" ? (
            <YearTable
              players={players}
              history={history}
              appearances={appearances}
              awards={awards}
              sessions={sessions}
              tests={tests}
            />
          ) : null}

          {tab === "tests" ? (
            <FitnessPanel players={players} canSave={canSave} coachPin={sessionPin || adminPin} />
          ) : null}

          {tab === "rules" ? (
            <>
              <RulesCard />
              <LeaguePanel editable={canSave} />
            </>
          ) : null}

          {tab === "users" && isAdmin ? (
            <>
              <CoachUsersPanel adminPin={adminPin || sessionPin} onAdminPin={setAdminPin} />
              <SquadPanel
                players={bullsPlayers.length ? bullsPlayers : players}
                pin={sessionPin || adminPin}
                onPlayers={(list) => {
                  setBullsPlayers(list);
                  if (!viewingDemo && !isDemoName(coachName)) setPlayers(list);
                }}
              />
            </>
          ) : null}
          </SafePanel>

          {showDemo ? (
            <DemoPanel
              coachName={coachName}
              isAdmin={isAdmin}
              pin={sessionPin}
              onOpenTab={(next) => setTab(next)}
              onPlayers={(list) => {
                if (isDemoName(coachName) || viewingDemo) setPlayers(list);
              }}
              onViewDemo={(owner, list) => {
                setViewingDemo(true);
                setViewingDemoName(owner);
                setPlayers(list);
              }}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}
