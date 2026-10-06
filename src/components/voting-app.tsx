"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  CalendarDays,
  ChevronDown,
  Clock,
  LoaderCircle,
  MapPin,
  Medal,
  RefreshCw,
  Send,
  Share2,
  Shield,
  Star,
  Trophy,
  UserRound,
  Vote,
} from "lucide-react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { LeaguePanel } from "@/components/league-panel";
import { ParentRules } from "@/components/parent-rules";
import { ParentLeaders } from "@/components/parent-leaders";
import { MonthlyTables } from "@/components/monthly-tables";
import { PerformancePick } from "@/components/performance-pick";
import { ScoringKey } from "@/components/scoring-key";
import { ParentGate } from "@/components/parent-gate";
import { TrainingNote } from "@/components/training-note";
import { PlayedPicker } from "@/components/played-picker";
import { PlayerPicker } from "@/components/player-picker";
import { SeasonTable } from "@/components/season-table";
import { ParentVoteBars } from "@/components/parent-vote-bars";
import { TrainingTop3 } from "@/components/training-top3";
import { ScorersAssistsChart } from "@/components/scorers-assists-chart";
import { Button } from "@/components/ui/button";
import { TEAM_NAME } from "@/lib/brand";
import { FieldInput, FieldLabel } from "@/components/ui/field";
import { saveAppearances, type AppearanceMap } from "@/lib/appearance-actions";
import { getLeagueData, syncLeagueFromFa } from "@/lib/league-actions";
import { gameKey, groupGames, votesForMatch } from "@/lib/league";
import { shortName, PLAYERS } from "@/lib/players";
import { getInitialData, matchOpenForVotes, setCurrentMatch, submitVotes, type CurrentMatch, type VoteRow } from "@/lib/vote-actions";
import { getScoreExtras } from "@/lib/score-actions";
import { getTraining } from "@/lib/training-actions";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";
import { sendWhatsApp, voteReminderWhatsAppText, whatsAppShareUrl } from "@/lib/whatsapp";
import { PRIZE_LINE } from "@/lib/score-from";
import { formatKickoff } from "@/lib/when";
import { gameDetailsFor } from "@/lib/game-details";
import { cn } from "@/lib/utils";
import {
  bullsOpponent,
  bullsRoundList,
  fixtureHasScore,
  fixtureKickoff,
  fixturePlayed,
  fixtureRound,
  isBullsHome,
  shortClub,
  voteFixture,
  type LeagueFixture,
  type MatchGoal,
} from "@/lib/wdyl";

import { MatchSheet } from "@/components/match-sheet";
import { SafePanel } from "@/components/safe-panel";
import { useParentPresence } from "@/components/use-parent-presence";
import {
  pineVillaAwards,
  pineVillaCurrentMatch,
  pineVillaVoteRows,
} from "@/lib/restore-pine-villa";

type View = "vote" | "table" | "games" | "league" | "rules";

export function VotingApp() {
  const [view, setView] = useState<View>("vote");
  const [players, setPlayers] = useState<string[]>([...PLAYERS]);
  const [history, setHistory] = useState<VoteRow[]>(pineVillaVoteRows());
  const [postedMatch, setPostedMatch] = useState<CurrentMatch | null>(
    matchOpenForVotes() ?? pineVillaCurrentMatch(),
  );
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [posting, setPosting] = useState(false);

  const openNow = matchOpenForVotes();
  const [gameNumber, setGameNumber] = useState(openNow?.gameNumber ?? "");
  const [opposition, setOpposition] = useState(openNow?.opposition ?? "");
  const [parentChild, setParentChild] = useState("");
  const [vote3, setVote3] = useState("");
  const [vote2, setVote2] = useState("");
  const [vote1, setVote1] = useState("");
  const [openGame, setOpenGame] = useState<string | null>(null);
  const [fixtures, setFixtures] = useState<LeagueFixture[]>([]);
  const [goalsByFixture, setGoalsByFixture] = useState<Record<number, MatchGoal[]>>({});
  const [syncing, setSyncing] = useState(false);
  const [appearances, setAppearances] = useState<AppearanceMap>({});
  const [awards, setAwards] = useState<MatchAward[]>(pineVillaAwards());
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [tests, setTests] = useState<FitnessTest[]>([]);
  const [played, setPlayed] = useState<string[]>([]);
  const [savingPlayed, setSavingPlayed] = useState(false);
  const [reminderHref, setReminderHref] = useState("https://wa.me/");
  useParentPresence(parentChild, view);

  useEffect(() => {
    setReminderHref(whatsAppShareUrl(voteReminderWhatsAppText(), ""));
  }, []);

  async function load(quiet = false) {
    if (!quiet) setLoading(true);
    try {
      const votes = await getInitialData();
      const train = await getTraining().catch(() => ({ sessions: [] as TrainingSession[] }));
      setPlayers(votes.players.length ? votes.players : [...PLAYERS]);
      if (votes.history.length) setHistory(votes.history);
      if (votes.currentMatch) setPostedMatch(votes.currentMatch);
      setAppearances(votes.appearances ?? {});
      if (train.sessions.length) setSessions(train.sessions);
      const open = matchOpenForVotes();
      if (open) {
        setGameNumber(open.gameNumber);
        setOpposition(open.opposition);
      } else if (!quiet && votes.currentMatch) {
        setGameNumber(votes.currentMatch.gameNumber);
        setOpposition(votes.currentMatch.opposition);
      }
    } catch (err) {
      setPlayers((cur) => (cur.length ? cur : [...PLAYERS]));
      if (!quiet) toast.error(err instanceof Error ? err.message : "Could not load votes.");
    }
    try {
      const league = await getLeagueData();
      setFixtures(league.fixtures);
      setGoalsByFixture(league.goalsByFixture ?? {});
      if (league.awards?.length) setAwards(league.awards);
    } catch {
      // League table can fail. Standish voting stays open.
    }
    try {
      const extras = await getScoreExtras();
      if (extras.awards.length) setAwards(extras.awards);
      if (extras.sessions.length) setSessions(extras.sessions);
      setTests(extras.tests ?? []);
    } catch {
      // scores still show from the votes
    }
    if (!quiet) setLoading(false);
  }

  useEffect(() => {
    void load();
    if (typeof window !== "undefined") {
      setParentChild(window.localStorage.getItem("bulls-my-player") || "");
    }
    const timer = window.setInterval(() => void load(true), 15000);
    const onVis = () => {
      if (document.visibilityState === "visible") void load(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (view !== "games") return;
    void getLeagueData()
      .then((data) => {
        setFixtures(data.fixtures);
        setGoalsByFixture(data.goalsByFixture ?? {});
        if (data.awards?.length) setAwards(data.awards);
      })
      .catch(() => toast.error("Could not load fixtures."));
  }, [view]);

  const playedHistory = useMemo(() => {
    const rounds = bullsRoundList(fixtures);
    return history.filter((row) => {
      const opp = row.opposition.toLowerCase();
      const round = rounds.find((item) => {
        const name = item.opposition.toLowerCase();
        return opp === name || name.includes(opp) || opp.includes(name);
      });
      if (!round) return true;
      return fixtureKickoff(round.kickoff).getTime() <= Date.now();
    });
  }, [history, fixtures]);
  const playedGames = useMemo(() => groupGames(playedHistory), [playedHistory]);
  const thisGame = useMemo(() => voteFixture(fixtures), [fixtures]);
  const thisRound = thisGame ? fixtureRound(fixtures, thisGame) : 0;
  const currentFx = thisGame;
  const currentRoundNo = currentFx ? fixtureRound(fixtures, currentFx) : 0;
  const currentOpp = currentFx ? shortClub(bullsOpponent(currentFx)) : "";
  const currentRoundVotes = useMemo(() => {
    if (!currentRoundNo || !currentOpp) return [];
    const kickedOff = currentFx ? fixtureKickoff(currentFx.kickoff).getTime() <= Date.now() : false;
    if (!kickedOff) return [];
    return votesForMatch(history, `Rd ${currentRoundNo}`, currentOpp);
  }, [history, currentRoundNo, currentOpp, currentFx]);
  const votePool = players;
  const roundVotes = useMemo(() => {
    if (!gameNumber.trim() || !opposition.trim()) return [];
    return votesForMatch(history, gameNumber, opposition);
  }, [history, gameNumber, opposition]);

  const myVote = useMemo(
    () =>
      roundVotes.find((row) => row.parentChild.toLowerCase() === parentChild.toLowerCase()) ?? null,
    [roundVotes, parentChild],
  );

  useEffect(() => {
    setVote3(myVote?.vote3 ?? "");
    setVote2(myVote?.vote2 ?? "");
    setVote1(myVote?.vote1 ?? "");
  }, [gameNumber, opposition, myVote?.id, myVote?.vote3, myVote?.vote2, myVote?.vote1]);

  useEffect(() => {
    if (!gameNumber.trim() || !opposition.trim() || !players.length) return;
    const saved = appearances[gameKey(gameNumber.trim(), opposition.trim())];
    setPlayed(saved ?? []);
  }, [gameNumber, opposition, appearances, players]);
  const upcoming = useMemo(() => fixtures.filter((f) => !fixturePlayed(f)), [fixtures]);
  const results = useMemo(
    () => fixtures.filter((f) => fixturePlayed(f)).slice().reverse(),
    [fixtures],
  );

  async function updateFixtures() {
    setSyncing(true);
    try {
      const res = await syncLeagueFromFa();
      setFixtures(res.fixtures);
      setGoalsByFixture(res.goalsByFixture ?? {});
      if (res.awards?.length) setAwards(res.awards);
      toast.success("Fixtures and results updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update fixtures.");
    } finally {
      setSyncing(false);
    }
  }

  function fillMatch(game: string, opp: string) {
    setGameNumber(game);
    setOpposition(opp);
    setView("vote");
    toast.success("Match details filled. Cast your 3-2-1.");
  }

  async function persistPlayed(round: string, opp: string, squad: string[]) {
    const res = await saveAppearances({
      data: { gameNumber: round, opposition: opp, players: squad },
    });
    if (res.success) setAppearances(res.appearances);
  }

  async function onPostMatch() {
    const next = {
      gameNumber: gameNumber.trim(),
      opposition: opposition.trim(),
    };
    if (!next.gameNumber) return toast.error("Add the round / game number.");
    if (!next.opposition) return toast.error("Add the opposition.");
    setPosting(true);
    try {
      const res = await setCurrentMatch({ data: next });
      if (!res.success) return toast.error("Could not post the match.");
      setPostedMatch(res.currentMatch);
      toast.success("Match posted. Parents will see this on the board.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not post the match.");
    } finally {
      setPosting(false);
    }
  }

  async function onSavePlayed() {
    const round = gameNumber.trim();
    const opp = opposition.trim();
    if (!round || !opp) return toast.error("Add the round and opposition first.");
    setSavingPlayed(true);
    try {
      await persistPlayed(round, opp, played);
      toast.success("Playing squad saved.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save who played.");
    } finally {
      setSavingPlayed(false);
    }
  }

  async function onSubmit() {
    const payload = {
      gameNumber: gameNumber.trim(),
      opposition: opposition.trim(),
      parentChild,
      vote3,
      vote2,
      vote1,
    };
    if (!payload.gameNumber) return toast.error("Add the round / game number.");
    if (!payload.opposition) return toast.error("Add the opposition.");
    if (!payload.parentChild) return toast.error("Select your child.");
    if (!payload.vote3 || !payload.vote2 || !payload.vote1) {
      return toast.error("Cast all three votes.");
    }
    if (
      payload.vote3 === payload.vote2 ||
      payload.vote3 === payload.vote1 ||
      payload.vote2 === payload.vote1
    ) {
      return toast.error("Each vote must go to a different player.");
    }
    if (
      payload.parentChild === payload.vote3 ||
      payload.parentChild === payload.vote2 ||
      payload.parentChild === payload.vote1
    ) {
      return toast.error("You cannot vote for your own child.");
    }

    setSubmitting(true);
    try {
      const already = roundVotes.some(
        (row) => row.parentChild.toLowerCase() === payload.parentChild.toLowerCase(),
      );
      const res = await submitVotes({ data: payload });
      if (!res.success) {
        toast.error(res.error);
        return;
      }
      setVote3("");
      setVote2("");
      setVote1("");
      setPostedMatch({ gameNumber: payload.gameNumber, opposition: payload.opposition });
      toast.success(already ? "Votes updated." : "Votes in.");
      await load();
      document.getElementById("live-vote-graph")?.scrollIntoView({ block: "nearest" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex h-dvh w-full max-w-lg flex-col overflow-hidden bg-bg md:max-w-5xl">
      <AppHeader
        onRefresh={() => void load()}
        refreshing={loading}
        boardLink="board"
        shareHref={reminderHref}
      />

      <main className="min-h-0 min-w-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain px-3 py-3 sm:px-4 sm:py-4">
        <SafePanel key={view} label={view}>
        {view === "vote" && (
          <div className="flex flex-col gap-4">
            <Button
              className="h-11 w-full"
              onClick={() => {
                void sendWhatsApp(TEAM_NAME, voteReminderWhatsAppText(), "");
                toast.success("Message copied. Paste it in the parents’ chat if WhatsApp is blank.");
              }}
            >
              <Share2 className="size-4" />
              Share on WhatsApp
            </Button>
            <InAppHint />

            <section className="@container overflow-visible rounded-2xl border border-border bg-surface shadow-panel">
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1 bg-kit-navy px-3 py-2 text-kit-navy-fg sm:px-4 sm:py-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-kit-gold sm:text-xs">
                    <Vote className="size-3.5 shrink-0" />
                    Vote now · still open
                  </p>
                  <h2 className="mt-0.5 font-display text-base font-bold uppercase leading-tight tracking-tight break-words sm:text-3xl sm:leading-none">
                    {gameNumber && opposition
                      ? `${gameNumber} vs ${opposition}`
                      : thisGame
                        ? `Rd ${thisRound} vs ${shortClub(bullsOpponent(thisGame))}`
                        : "Rd 4 vs Standish Panthers Storm"}
                  </h2>
                </div>
                {thisGame ? (
                  <p className="flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-0.5 text-[11px] text-white/75 sm:text-sm">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5 text-kit-gold" />
                      {formatKickoff(thisGame.kickoff, "EEE d MMM · HH:mm")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="size-3.5 text-kit-gold" />
                      {isBullsHome(thisGame) ? "Home" : "Away"}
                    </span>
                  </p>
                ) : null}
              </div>

              <div id="live-vote-graph">
                <ParentVoteBars
                  embedded
                  title={
                    gameNumber && opposition
                      ? `Current round · ${gameNumber} · ${opposition}`
                      : "Current round"
                  }
                  note="3-2-1 for this game. Top 3. Anyone level with 3rd stays on. From Standish, each family who votes also gets 1 point for their own lad."
                  players={players}
                  votes={roundVotes}
                />
              </div>

              <div className="flex flex-col gap-2 p-2.5 [@media(min-height:760px)]:gap-3 [@media(min-height:760px)]:p-4 sm:gap-3 sm:p-4">
                <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-bg px-2.5 py-1 sm:gap-3 sm:px-3 sm:py-2">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-kit-navy text-kit-gold sm:size-12">
                    <UserRound className="size-5 sm:size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <FieldLabel htmlFor="parent-child" className="mb-0.5 hidden [@media(min-height:760px)]:block sm:mb-1.5 sm:block">Your child</FieldLabel>
                    <PlayerPicker
                      id="parent-child"
                      label={opposition ? `Your child · ${opposition}` : "Your child · Standish"}
                      value={parentChild}
                      placeholder="Select your child"
                      className="h-10 [@media(min-height:760px)]:h-11 sm:h-11"
                      players={players}
                      onChange={(next) => {
                        setParentChild(next);
                        if (typeof window !== "undefined") {
                          if (next) window.localStorage.setItem("bulls-my-player", next);
                          else window.localStorage.removeItem("bulls-my-player");
                        }
                        if (vote3 === next) setVote3("");
                        if (vote2 === next) setVote2("");
                        if (vote1 === next) setVote1("");
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 @min-[720px]:grid-cols-3 sm:gap-3">
                {(
                  [
                    { id: "vote-3", points: "3", label: "Best on ground", value: vote3, setValue: setVote3, exclude: [parentChild, vote2, vote1], Icon: Medal },
                    { id: "vote-2", points: "2", label: "Second", value: vote2, setValue: setVote2, exclude: [parentChild, vote3, vote1], Icon: Award },
                    { id: "vote-1", points: "1", label: "Third", value: vote1, setValue: setVote1, exclude: [parentChild, vote3, vote2], Icon: Star },
                  ] as const
                ).map(({ id, points, label, value, setValue, exclude, Icon }) => (
                  <div key={id} className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-bg px-2.5 py-1 sm:gap-3 sm:px-3 sm:py-2">
                    <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-accent-fg sm:size-12 sm:text-2xl">
                      {points}
                      <Icon className="absolute -right-1 -top-1 size-4 rounded-full bg-bg p-0.5 text-kit-gold" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <FieldLabel htmlFor={id} className="mb-0.5 hidden items-center gap-1.5 [@media(min-height:760px)]:flex sm:mb-1.5 sm:flex">
                        <Icon className="size-3.5 shrink-0 text-accent" />
                        <span className="truncate">{label}</span>
                      </FieldLabel>
                      <PlayerPicker
                        id={id}
                        label={`${points} points`}
                        value={value}
                        players={votePool}
                        exclude={[...exclude]}
                        className="h-10 [@media(min-height:760px)]:h-11 sm:h-11"
                        onChange={setValue}
                      />
                    </div>
                  </div>
                ))}
                </div>

                <Button
                  size="lg"
                  className="hidden h-12 w-full rounded-xl text-base uppercase tracking-wide [@media(min-height:760px)]:inline-flex md:inline-flex"
                  onClick={() => void onSubmit()}
                  disabled={submitting}
                >
                  {submitting ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
                  {submitting ? "Saving…" : myVote ? "Update votes" : "Submit votes"}
                </Button>
                <p className="hidden text-center text-xs leading-snug text-muted [@media(min-height:760px)]:block sm:block">
                  One vote per family. Standish is still open, so you can send or change your 3-2-1. You cannot pick your own child. Voting gives your lad 1 point.
                </p>
              </div>
            </section>

            <TrainingNote />
            <Button
              className="h-11 w-full"
              onClick={() => {
                void sendWhatsApp(TEAM_NAME, voteReminderWhatsAppText(), "");
                toast.success("Message copied. Paste it in the parents’ chat if WhatsApp is blank.");
              }}
            >
              <Share2 className="size-4" />
              Send vote reminder
            </Button>
            <p className="text-center text-xs leading-snug text-muted">
              Don’t send clover-hill or el-acre. Those are the old site. Share sends the scores. A new link only appears after you tap Publish.
            </p>
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-surface text-sm font-semibold uppercase tracking-wide"
              onClick={() => setView("rules")}
            >
              How we play · U12 9v9 rules
            </button>

            <details className="rounded-xl border border-border bg-surface p-4">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted">
                Coach tools
              </summary>
              <div className="mt-3 flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="game-number">Round / Game</FieldLabel>
                    <FieldInput
                      id="game-number"
                      placeholder="Round 5"
                      value={gameNumber}
                      onChange={(e) => setGameNumber(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="opposition">Opposition</FieldLabel>
                    <FieldInput
                      id="opposition"
                      placeholder="Leigh Genesis"
                      value={opposition}
                      onChange={(e) => setOpposition(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
                {thisGame ? (
                  <button
                    type="button"
                    className="text-left text-xs font-semibold uppercase tracking-wide text-accent"
                    onClick={() =>
                      fillMatch(`Rd ${thisRound}`, shortClub(bullsOpponent(thisGame)))
                    }
                  >
                    Use this fixture
                  </button>
                ) : null}
                <PlayedPicker players={players} selected={played} onChange={setPlayed} />
                <Button
                  variant="outline"
                  onClick={() => void onSavePlayed()}
                  disabled={savingPlayed}
                >
                  {savingPlayed ? "Saving…" : "Save who played"}
                </Button>
                <Button variant="outline" onClick={() => void onPostMatch()} disabled={posting}>
                  {posting ? "Posting…" : "Post match for parents"}
                </Button>
                <Button
                  onClick={() => {
                    void sendWhatsApp(TEAM_NAME, voteReminderWhatsAppText(), "");
                    toast.success("Message copied. Paste it in the parents’ chat if WhatsApp is blank.");
                  }}
                >
                  <Share2 className="size-4" />
                  Share on WhatsApp
                </Button>
              </div>
            </details>
          </div>
        )}

        {view === "table" && (
          <div>
            <ScorersAssistsChart
              goals={Object.values(goalsByFixture).flat()}
              players={players}
            />
            <div className="mt-4">
              <ParentVoteBars
                title={
                  currentRoundNo
                    ? `Current round · Rd ${currentRoundNo} · ${currentOpp}`
                    : "Current round"
                }
                note={
                  currentFx && fixtureKickoff(currentFx.kickoff).getTime() > Date.now()
                    ? "No score yet. This game hasn’t been played."
                    : "This round’s 3-2-1. Top 3. Anyone level with 3rd stays on. The graph moves on when the next game kicks off."
                }
                players={players}
                votes={currentRoundVotes}
              />
            </div>
            <div className="mt-4">
              <TrainingTop3 players={players} sessions={sessions} />
            </div>
            <div className="mt-4">
              <ParentVoteBars
                title="Top 3 · parent votes season"
                note="Games already played. From Standish, each family who voted gets 1 extra point for their own lad."
                players={players}
                votes={playedHistory}
              />
            </div>
            <div className="mb-3 mt-6 flex items-end justify-between">
              <div>
                <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                  Top 3
                </h2>
                <p className="text-xs text-muted">
                  Live top 3 totals. Full marks only for your child. {PRIZE_LINE}
                </p>
                <ScoringKey />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-subtle">
                Cumulative
              </span>
            </div>
            <SeasonTable
              players={players}
              history={history}
              appearances={appearances}
              awards={awards}
              sessions={sessions}
              tests={tests}
              loading={loading}
            />
            <div className="mt-4">
              <ParentLeaders
                players={players}
                history={history}
                awards={awards}
                sessions={sessions}
                tests={tests}
                appearances={appearances}
              />
            </div>
            <div className="mt-4">
              <MonthlyTables
                players={players}
                history={history}
                appearances={appearances}
                awards={awards}
                sessions={sessions}
                tests={tests}
              />
            </div>
            <div className="mt-4">
              <ParentGate>
                {(session) => (
                  <PerformancePick
                    players={players}
                    history={history}
                    awards={awards}
                    sessions={sessions}
                    tests={tests}
                    appearances={appearances}
                    initialPlayer={session.player}
                    lockToPlayer
                    onRefresh={() => load(true)}
                  />
                )}
              </ParentGate>
            </div>
          </div>
        )}

        {view === "games" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                Bulls fixtures
              </h2>
              <p className="mb-3 text-sm text-muted">
                Press Update for kick-off or venue changes. Each result shows
                scorers, assists, parents’ player, manager’s player and opp MOM.
              </p>
              <Button
                className="mb-3 w-full"
                onClick={() => void updateFixtures()}
                disabled={syncing}
              >
                <RefreshCw className={cn("size-4", syncing && "animate-spin")} />
                {syncing ? "Updating…" : "Update fixtures & results"}
              </Button>
              <TrainingNote className="mb-3" />
              {!fixtures.length ? (
                <div className="rounded-xl border border-border bg-surface px-4 py-10 text-center text-sm text-muted">
                  Fixtures will show here once loaded.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {upcoming.map((fx) => (
                    <FixtureRow
                      key={fx.id}
                      fx={fx}
                      fixtures={fixtures}
                      goals={goalsByFixture[fx.id] ?? []}
                      awards={awards}
                      votes={history}
                      players={players}
                      onSheet={(data) => {
                        if (data.goalsByFixture) setGoalsByFixture(data.goalsByFixture);
                        if (data.awards) setAwards(data.awards);
                      }}
                    />
                  ))}
                  {results.map((fx) => (
                    <FixtureRow
                      key={fx.id}
                      fx={fx}
                      fixtures={fixtures}
                      goals={goalsByFixture[fx.id] ?? []}
                      awards={awards}
                      votes={history}
                      players={players}
                      onSheet={(data) => {
                        if (data.goalsByFixture) setGoalsByFixture(data.goalsByFixture);
                        if (data.awards) setAwards(data.awards);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                Match votes
              </h2>
              <p className="mb-3 text-sm text-muted">
                Open a round to see that game’s 3-2-1
              </p>
              {!playedGames.length ? (
                <div className="rounded-xl border border-border bg-surface px-4 py-8 text-center text-sm text-muted">
                  No 3-2-1 votes yet. They appear here after the first game.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {playedGames.map((g) => {
                    const open = openGame === g.key;
                    return (
                      <article
                        key={g.key}
                        className="overflow-hidden rounded-xl border border-border bg-surface"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                          onClick={() => setOpenGame(open ? null : g.key)}
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {g.gameNumber}
                              {g.opposition ? (
                                <span className="font-medium text-muted"> vs {g.opposition}</span>
                              ) : null}
                            </p>
                            <p className="text-xs text-muted">
                              {g.votes.length} parent vote{g.votes.length === 1 ? "" : "s"}
                            </p>
                          </div>
                          <ChevronDown
                            className={cn(
                              "size-4 shrink-0 text-muted transition-transform duration-200",
                              open && "rotate-180",
                            )}
                          />
                        </button>
                        {open ? (
                          <div className="border-t border-border p-3">
                            <ParentVoteBars
                              title={`${g.gameNumber}${g.opposition ? ` · ${g.opposition}` : ""}`}
                              note="This game’s 3-2-1. Top 3. Anyone level with 3rd stays on."
                              players={players}
                              votes={g.votes}
                            />
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {view === "league" && <LeaguePanel />}
        {view === "rules" && <ParentRules />}
        </SafePanel>
      </main>

      {view === "vote" ? (
        <div className="shrink-0 border-t border-border bg-bg px-3 py-2 [@media(min-height:760px)]:hidden md:hidden">
          <Button
            size="lg"
            className="h-12 w-full rounded-xl text-base uppercase tracking-wide"
            onClick={() => void onSubmit()}
            disabled={submitting}
          >
            {submitting ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
            {submitting ? "Saving…" : myVote ? "Update votes" : "Submit votes"}
          </Button>
        </div>
      ) : null}

      <nav
        className="z-30 shrink-0 border-t border-border bg-surface/95 pt-1"
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
      >
        <div className="grid grid-cols-5 px-1">
          {(
            [
              ["vote", "Vote", Vote],
              ["table", "Points", Trophy],
              ["games", "Games", CalendarDays],
              ["league", "League", Shield],
              ["rules", "Rules", BookOpen],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setView(id)}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-xs font-semibold uppercase tracking-wide",
                view === id ? "bg-accent text-accent-fg" : "text-muted",
              )}
            >
              <Icon className="size-5" />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function InAppHint() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent || "";
    setShow(/WhatsApp|FBAN|FBAV|Instagram|Line\//i.test(ua));
  }, []);
  if (!show) return null;
  return (
    <div className="rounded-xl border border-accent bg-accent-soft px-4 py-3 text-sm leading-snug text-fg">
      Open in Safari or Chrome — tap the dots, then Open in browser. The app
      works there.
    </div>
  );
}

function FixtureRow({
  fx,
  fixtures,
  goals,
  awards,
  votes,
  players,
  onSheet,
}: {
  fx: LeagueFixture;
  fixtures: LeagueFixture[];
  goals: MatchGoal[];
  awards: MatchAward[];
  votes: VoteRow[];
  players: string[];
  onSheet: (data: { goalsByFixture?: Record<number, MatchGoal[]>; awards?: MatchAward[] }) => void;
}) {
  const home = isBullsHome(fx);
  const played = fixtureHasScore(fx);
  const kickedOff = fixtureKickoff(fx.kickoff).getTime() <= Date.now();
  const opponent = shortClub(bullsOpponent(fx));
  const us = home ? fx.homeGoals : fx.awayGoals;
  const them = home ? fx.awayGoals : fx.homeGoals;
  const when = [formatKickoff(fx.kickoff, "EEE d MMM"), formatKickoff(fx.kickoff, "HH:mm")]
    .filter(Boolean)
    .join(" · ");
  return (
    <article className="rounded-xl border border-border bg-surface px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {when || "TBC"}
          </p>
          <p className="mt-1 text-sm font-semibold">
            <span className="mr-2 rounded-sm bg-elevated px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted">
              {home ? "Home" : "Away"}
            </span>
            vs {opponent}
          </p>
          {fx.venue ? <p className="mt-1 text-xs text-subtle">{fx.venue}</p> : null}
          {fx.status === "postponed" ? (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">Postponed</p>
          ) : null}
          {gameDetailsFor(opponent) || gameDetailsFor(fx.homeTeam) || gameDetailsFor(fx.awayTeam) ? (
            <ul className="mt-2 list-disc pl-4 text-xs text-fg">
              {(
                gameDetailsFor(opponent) ||
                gameDetailsFor(fx.homeTeam) ||
                gameDetailsFor(fx.awayTeam)
              )!.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </div>
        {played ? (
          <div className="shrink-0 text-right">
            <p className="shrink-0 font-display text-xl font-bold tabular-nums leading-none">
              {us}–{them}
            </p>
            {fx.homeTeam === "Pine Villa U12 s" &&
            fx.awayTeam === "Cherrybrook U12 Bulls" &&
            fx.homeGoals === 7 &&
            fx.awayGoals === 6 ? (
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                HT 2–2
              </p>
            ) : null}
          </div>
        ) : kickedOff ? (
          <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">Score not in</p>
        ) : null}
      </div>
      <MatchSheet
        fx={fx}
        fixtures={fixtures}
        goals={goals}
        awards={awards}
        votes={votes}
        players={players}
        editable={false}
        onUpdated={onSheet}
      />
    </article>
  );
}
