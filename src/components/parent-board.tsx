"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { LeaguePanel } from "@/components/league-panel";
import { ParentRules } from "@/components/parent-rules";
import { ParentLeaders } from "@/components/parent-leaders";
import { PerformancePick } from "@/components/performance-pick";
import { PlayerProgressCard } from "@/components/player-progress";
import { SeasonTable } from "@/components/season-table";
import { MonthlyTables } from "@/components/monthly-tables";
import { ParentVoteBars } from "@/components/parent-vote-bars";
import { TrainingTop3 } from "@/components/training-top3";
import { ScorersAssistsChart } from "@/components/scorers-assists-chart";
import { ParentGate } from "@/components/parent-gate";
import { TrainingNote } from "@/components/training-note";
import { DashKpi, DashSection } from "@/components/board-dash";
import { FieldLabel } from "@/components/ui/field";
import { PlayerPicker } from "@/components/player-picker";
import { isViewAllPlayer } from "@/lib/parent-login";
import { getFitnessTests } from "@/lib/fitness-actions";
import type { FitnessAnalysis } from "@/lib/fitness";
import { computeTotals, groupGames, votesForMatch } from "@/lib/league";
import type { AppearanceMap } from "@/lib/appearance-actions";
import { computePlayerSeason } from "@/lib/progress";
import { getPotm } from "@/lib/potm-actions";
import { monthTitle, septemberPodium, type PotmPodium, type PotmRow, type PotmWinner } from "@/lib/potm";
import { publicName, PLAYERS } from "@/lib/players";
import { topNWithTies, placeAt } from "@/lib/score-categories";
import { PRIZE_LINE } from "@/lib/score-from";
import { getBoardTotals, getScoreExtras } from "@/lib/score-actions";
import { getLeagueData } from "@/lib/league-actions";
import { currentVoteMonth, votesForMonth } from "@/lib/vote-month";
import { matchOpenForVotes, type CurrentMatch, type VoteRow } from "@/lib/vote-actions";
import { boardShareText, whatsAppShareUrl } from "@/lib/whatsapp";
import {
  bullsOpponent,
  fixtureHasScore,
  fixtureKickoff,
  fixtureRound,
  isBullsHome,
  resultFixture,
  shortClub,
  bullsRoundList,
  voteFixture,
  type LeagueFixture,
  type MatchGoal,
} from "@/lib/wdyl";
import { mergeTraining } from "@/lib/training-store";
import {
  pineVillaAwards,
  pineVillaCurrentMatch,
  pineVillaMatchGoals,
  pineVillaVoteRows,
} from "@/lib/restore-pine-villa";
import type { MatchAward } from "@/lib/coach-actions";
import type { TrainingSession } from "@/lib/training";
import type { FitnessTest } from "@/lib/fitness";

import { useParentPresence } from "@/components/use-parent-presence";

const CHILD_KEY = "bulls-my-player";

export function ParentBoard() {
  const [players, setPlayers] = useState<string[]>([...PLAYERS]);
  const [history, setHistory] = useState<VoteRow[]>(pineVillaVoteRows());
  const [currentMatch, setCurrentMatch] = useState<CurrentMatch | null>(matchOpenForVotes());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [fitness, setFitness] = useState<Record<string, FitnessAnalysis>>({});
  const [myPlayer, setMyPlayer] = useState("");
  const [loading, setLoading] = useState(false);
  const [appearances, setAppearances] = useState<AppearanceMap>({});
  const [awards, setAwards] = useState<MatchAward[]>(pineVillaAwards());
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [tests, setTests] = useState<FitnessTest[]>([]);
  const [potmWinner, setPotmWinner] = useState<PotmWinner | null>(null);
  const [potmLeader, setPotmLeader] = useState<PotmRow | null>(null);
  const [potmTop3, setPotmTop3] = useState<PotmRow[]>([]);
  const [potmLabel, setPotmLabel] = useState("");
  const [potmPodium, setPotmPodium] = useState<PotmPodium | null>(septemberPodium);
  const [goals, setGoals] = useState<MatchGoal[]>(pineVillaMatchGoals());
  const [fixtures, setFixtures] = useState<LeagueFixture[]>([]);
  const [shareHref, setShareHref] = useState("https://wa.me/");
  useParentPresence(myPlayer, "board");

  async function load(quiet = false) {
    if (!quiet) setLoading(true);
    try {
      const board = await getBoardTotals();
      setPlayers(board.players.length ? board.players : [...PLAYERS]);
      if (board.history.length) setHistory(board.history);
      if (board.currentMatch) setCurrentMatch(board.currentMatch);
      setNotes(board.notes ?? {});
      setAppearances(board.appearances ?? {});
      const sessions = mergeTraining(board.sessions);
      if (board.awards.length) setAwards(board.awards);
      setSessions(sessions);
      setTests(board.tests ?? []);
      setLoading(false);
      try {
        const league = await getLeagueData();
        const nextGoals = Object.values(league.goalsByFixture ?? {}).flat();
        if (nextGoals.length) setGoals(nextGoals);
        setFixtures(league.fixtures ?? []);
      } catch {
        setGoals([]);
      }
      const extras = await getScoreExtras().catch(() => null);
      const extraSessions = extras?.sessions ?? [];
      if (extraSessions.length) {
        if (extras?.awards.length) setAwards(extras.awards);
        setSessions(mergeTraining(extraSessions, sessions));
      }
      setTests(extras?.tests ?? []);
      try {
        const fit = await getFitnessTests();
        const map: Record<string, FitnessAnalysis> = {};
        for (const row of fit.analysed) map[row.player] = row;
        setFitness(map);
        setTests(fit.tests ?? []);
      } catch {
        setFitness({});
      }
      try {
        const potm = await getPotm({ data: {} });
        setPotmWinner(potm.winner);
        setPotmLeader(potm.leader);
        setPotmTop3(topNWithTies(potm.standings || [], (s) => s.total, 3));
        setPotmLabel(potm.window.label);
        setPotmPodium(potm.lastPodium ?? septemberPodium());
      } catch {
        setPotmWinner(null);
        setPotmLeader(null);
        setPotmTop3([]);
        setPotmPodium(septemberPodium());
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load the board.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    if (typeof window !== "undefined") {
      setMyPlayer(window.localStorage.getItem(CHILD_KEY) || "");
    }
    const t = setInterval(() => void load(true), 15000);
    const onVis = () => {
      if (document.visibilityState === "visible") void load(true);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const games = useMemo(() => groupGames(history), [history]);
  const openFx = useMemo(() => resultFixture(fixtures) ?? voteFixture(fixtures), [fixtures]);
  const kickedOff = openFx ? fixtureKickoff(openFx.kickoff).getTime() <= Date.now() : false;
  const posted = openFx
    ? {
        gameNumber: `Rd ${fixtureRound(fixtures, openFx)}`,
        opposition: shortClub(bullsOpponent(openFx)),
      }
    : currentMatch;
  const weekScore =
    openFx && kickedOff && fixtureHasScore(openFx)
      ? {
          us: isBullsHome(openFx) ? openFx.homeGoals! : openFx.awayGoals!,
          them: isBullsHome(openFx) ? openFx.awayGoals! : openFx.homeGoals!,
          home: isBullsHome(openFx),
        }
      : null;

  const roundVotes = useMemo(() => {
    if (!posted) return [];
    return votesForMatch(history, posted.gameNumber, posted.opposition);
  }, [history, posted]);
  const currentFx = openFx;
  const currentRoundNo = currentFx ? fixtureRound(fixtures, currentFx) : 0;
  const currentOpp = currentFx ? shortClub(bullsOpponent(currentFx)) : "";
  const currentRoundVotes = useMemo(() => {
    if (!currentRoundNo || !currentOpp) return [];
    return votesForMatch(history, `Rd ${currentRoundNo}`, currentOpp);
  }, [history, currentRoundNo, currentOpp]);
  const earlierGames = useMemo(() => {
    return games
      .filter((g) => {
        if (!currentRoundNo) return true;
        const sameRound = g.gameNumber.toLowerCase().replace(/\s+/g, "") === `rd${currentRoundNo}`;
        const opp = g.opposition.toLowerCase();
        const cur = currentOpp.toLowerCase();
        const sameOpp = Boolean(cur) && (opp === cur || opp.includes(cur) || cur.includes(opp));
        return !(sameRound && sameOpp);
      })
      .filter((g) => {
        const rounds = bullsRoundList(fixtures);
        const n = Number(g.gameNumber.match(/(\d+)/)?.[1] ?? 0);
        const opp = g.opposition.toLowerCase();
        const round =
          rounds.find((item) => item.round === n) ||
          rounds.find((item) => {
            const name = item.opposition.toLowerCase();
            return opp === name || name.includes(opp) || opp.includes(name);
          });
        if (!round) return true;
        return fixtureKickoff(round.kickoff).getTime() <= Date.now();
      })
      .slice()
      .sort((a, b) => a.lastTs.localeCompare(b.lastTs));
  }, [games, currentRoundNo, currentOpp, fixtures]);

  function pickChild(name: string) {
    setMyPlayer(name);
    if (typeof window !== "undefined") {
      if (name) window.localStorage.setItem(CHILD_KEY, name);
      else window.localStorage.removeItem(CHILD_KEY);
    }
  }

  const markedIn = sessions.reduce((n, s) => n + s.marks.filter((m) => m.attended).length, 0);
  const fridayNights = sessions.filter((s) => s.marks.some((m) => m.attended)).length;
  const monthVotes = votesForMonth(history, currentVoteMonth());
  const boardShare = useMemo(() => {
    const table = computeTotals(players, currentRoundVotes.length ? currentRoundVotes : roundVotes);
    const top = topNWithTies(table, (row) => row.pts, 3);
    const marks = top.map((row) => row.pts);
    const lines = top.map(
      (row, index) => `${placeAt(index, marks)}. ${publicName(row.name)} — ${row.pts} pts`,
    );
    const votes = (currentRoundVotes.length ? currentRoundVotes : roundVotes).length;
    return whatsAppShareUrl(
      boardShareText({
        game: posted?.gameNumber || "Rd 4",
        opposition: posted?.opposition || "Standish Panthers Storm",
        votes,
        lines,
      }),
      "",
    );
  }, [players, currentRoundVotes, roundVotes, posted]);

  useEffect(() => {
    setShareHref(boardShare);
  }, [boardShare]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col bg-bg">
      <AppHeader onRefresh={() => void load()} refreshing={loading} boardLink="board" shareHref={shareHref} />

      <main className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-5 pb-10">
        <DashSection eyebrow="Dashboard" title="Parent board" note="Live top 3. Tied on the same points all stay on the board. Full marks stay on your child’s card.">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <DashKpi label="Parent votes" value={monthVotes.length} hint="This month" />
            <DashKpi label="This round" value={roundVotes.length} hint="Families this game" />
            <DashKpi label="Friday nights" value={fridayNights} hint={`${markedIn} marked in`} />
            <DashKpi label="Awards" value={awards.length} hint="Opp MOM + manager" />
          </div>
        </DashSection>

        <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-panel">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Voting</p>
              {posted ? (
                <>
                  <p className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-fg">
                    {posted.gameNumber}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    vs <span className="font-semibold text-fg">{posted.opposition}</span>
                    {weekScore ? (
                      <span className="text-fg">{weekScore.home ? " · Home" : " · Away"}</span>
                    ) : null}
                  </p>
                  <p className="mt-3 text-xs tabular-nums text-subtle">
                    {roundVotes.length} parent vote{roundVotes.length === 1 ? "" : "s"} this round
                  </p>
                </>
              ) : (
                <p className="mt-3 text-sm text-muted">No match posted yet.</p>
              )}
            </div>
            {weekScore ? (
              <div className="flex flex-col justify-center border-t border-border bg-elevated px-5 py-5 sm:border-l sm:border-t-0 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">Score</p>
                <p className="mt-1 font-display text-6xl font-bold tabular-nums leading-none tracking-tight text-fg">
                  {weekScore.us}–{weekScore.them}
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <ParentVoteBars
          title={currentRoundNo ? `Current round · Rd ${currentRoundNo} · ${currentOpp}` : "Current round"}
          note="This round’s 3-2-1. Top 3. Anyone level with 3rd stays on. The graph moves on when the next game kicks off."
          players={players}
          votes={currentRoundVotes}
        />

        {earlierGames.map((g) => (
          <ParentVoteBars
            key={g.key}
            title={`${g.gameNumber} · ${g.opposition}`}
            note={`${g.votes.length} families. Parent 3-2-1 for this game.`}
            players={players}
            votes={g.votes}
          />
        ))}

        <DashSection eyebrow="This week" title="Top 3" note="Friday training and scorers. First three only.">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <TrainingTop3 players={players} sessions={sessions} />
            <ScorersAssistsChart goals={goals} players={players} />
          </div>
        </DashSection>

        <DashSection
          eyebrow="Season"
          title="Leaders"
          note="Running totals. Parent 3-2-1, opp MOM, manager’s player, training and tests."
        >
          <ParentLeaders
            players={players}
            history={history}
            awards={awards}
            sessions={sessions}
            tests={tests}
            appearances={appearances}
          />
          <SeasonTable
            players={players}
            history={history}
            appearances={appearances}
            awards={awards}
            sessions={sessions}
            tests={tests}
            loading={false}
            emptyLabel="No points yet. Names appear here once votes or Friday training go in."
          />
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
        </DashSection>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Player of the month</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-fg">{PRIZE_LINE}</p>
            {potmPodium ? (
              <div className="mt-3 rounded-lg border border-accent/40 bg-accent-soft p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  3rd Monday · {potmPodium.label}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-fg">
                  Big congratulations to {publicName(potmPodium.first)} for 1st,{" "}
                  {publicName(potmPodium.second)} 2nd and {publicName(potmPodium.third)} 3rd.
                </p>
                <div className="mt-3 space-y-1.5 text-sm">
                  <p>
                    <span className="mr-2 font-display text-lg font-bold tabular-nums text-accent">1</span>
                    {publicName(potmPodium.first)}
                    <span className="ml-2 text-muted">boxed medal</span>
                  </p>
                  <p>
                    <span className="mr-2 font-display text-lg font-bold tabular-nums text-accent">2</span>
                    {publicName(potmPodium.second)}
                    <span className="ml-2 text-muted">medal</span>
                  </p>
                  <p>
                    <span className="mr-2 font-display text-lg font-bold tabular-nums text-accent">3</span>
                    {publicName(potmPodium.third)}
                    <span className="ml-2 text-muted">medal</span>
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted">
                  September medals were awarded on the 3rd Monday, 21 Sep. This month runs from the next day to the 3rd Monday in October, so both Friday trainings count
                  {potmLabel ? ` · ${potmLabel}` : " · 22 Sep – 19 Oct"}.
                </p>
              </div>
            ) : potmWinner ? (
              <p className="mt-2 text-sm text-muted">
                Awarded {potmLabel || monthTitle(potmWinner.month)}:{" "}
                <span className="font-semibold text-fg">{publicName(potmWinner.player)}</span>
              </p>
            ) : (
              <p className="mt-2 text-sm text-muted">
                Live top 3 this month. Awarded on the 3rd Monday{potmLabel ? ` · ${potmLabel}` : ""}.
              </p>
            )}
            {potmPodium ? (
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">
                October leaders are the top 3 in the table below.
              </p>
            ) : null}
            {potmTop3.length ? (
              <div className="mt-3 overflow-x-auto">
                <div className="flex gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted">
                  <span className="min-w-0 flex-1">Player</span>
                  <span className="w-9 text-right">3-2-1</span>
                  <span className="w-12 text-right">Train</span>
                  <span className="w-8 text-right">MOM</span>
                  <span className="w-8 text-right">Mgr</span>
                  <span className="w-8 text-right">Tot</span>
                </div>
                {potmTop3.map((row, i) => (
                  <div key={row.name} className="flex gap-2 border-b border-border py-2 text-sm last:border-b-0">
                    <span className="min-w-0 flex-1 truncate">
                      <span className="mr-2 font-display font-bold tabular-nums text-accent">
                        {placeAt(i, potmTop3.map((r) => r.total))}
                      </span>
                      {publicName(row.name)}
                    </span>
                    <span className="w-9 text-right tabular-nums text-muted">{row.parentPts || "—"}</span>
                    <span className="w-12 text-right tabular-nums text-muted">{row.trainingPts || "—"}</span>
                    <span className="w-8 text-right tabular-nums text-muted">{row.oppMom ? row.oppMom * 20 : "—"}</span>
                    <span className="w-8 text-right tabular-nums text-muted">
                      {row.playersPlayer ? row.playersPlayer * 10 : "—"}
                    </span>
                    <span className="w-8 text-right font-display font-bold tabular-nums">{row.total}</span>
                  </div>
                ))}
              </div>
            ) : potmLeader ? (
              <p className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
                {publicName(potmLeader.name)} · {potmLeader.total} pts
              </p>
            ) : (
              <p className="mt-3 text-sm text-muted">No points in this month yet.</p>
            )}
            <Link
              to="/month"
              className="mt-3 inline-flex h-11 items-center text-xs font-semibold uppercase tracking-wide text-accent"
            >
              How it’s picked · medals
            </Link>
          </section>
          <section className="rounded-xl border border-border bg-surface p-4 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Training</p>
            <div className="mt-2">
              <TrainingNote />
            </div>
          </section>
        </div>

        <DashSection
          eyebrow="Family"
          title="Your child’s marks"
          note="Enter your family code for your lad only. Other families cannot see his full marks."
        >
          <ParentGate
            onSession={(session) => {
              if (!session) return;
              if (session.viewAll || isViewAllPlayer(session.player)) return;
              if (session.player) pickChild(session.player);
            }}
          >
            {(session) => {
              const all = Boolean(session.viewAll || isViewAllPlayer(session.player));
              const who = all ? myPlayer : session.player;
              const season =
                who && players.length
                  ? computePlayerSeason(who, players, history, awards, appearances)
                  : null;
              return (
                <>
                  {all ? (
                    <div className="mb-3">
                      <FieldLabel htmlFor="manager-child">View lad</FieldLabel>
                      <PlayerPicker
                        id="manager-child"
                        label="View lad"
                        value={myPlayer}
                        placeholder="Select a player…"
                        players={players}
                        onChange={pickChild}
                      />
                    </div>
                  ) : null}
                  {season && who ? (
                    <PlayerProgressCard
                      season={season}
                      note={notes[who]}
                      fitness={fitness[who]}
                      showAwards={all}
                      onRefresh={() => load(true)}
                    />
                  ) : all ? (
                    <p className="text-sm text-muted">Pick a lad to see full marks.</p>
                  ) : null}
                  {who ? (
                    <div className="mt-4">
                      <PerformancePick
                        key={who}
                        players={players}
                        history={history}
                        awards={awards}
                        sessions={sessions}
                        tests={tests}
                        appearances={appearances}
                        initialPlayer={who}
                        lockToPlayer={!all}
                        onRefresh={() => load(true)}
                      />
                    </div>
                  ) : null}
                </>
              );
            }}
          </ParentGate>
        </DashSection>

        <DashSection eyebrow="Results" title="Each game" note="Top 3 from the families after every match. Honest 3-2-1 only.">
          {!games.length ? (
            <p className="text-sm text-muted">Rounds appear after the first votes.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {games.map((g) => {
                const top3 = topNWithTies(computeTotals(players, g.votes), (t) => t.pts, 3);
                return (
                  <article
                    key={g.key}
                    className="rounded-xl border border-border bg-surface px-4 py-3 shadow-panel"
                  >
                    <p className="font-display text-lg font-bold uppercase tracking-tight">
                      {g.gameNumber}
                      {g.opposition ? (
                        <span className="ml-2 font-sans text-sm font-medium normal-case tracking-normal text-muted">
                          vs {g.opposition}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {g.votes.length} parent vote{g.votes.length === 1 ? "" : "s"}
                    </p>
                    {top3.length ? (
                      <div className="mt-2 divide-y divide-border">
                        {top3.map((t, i) => (
                          <div key={t.name} className="flex justify-between py-2 text-sm">
                            <span>
                              <span className="mr-2 font-display text-lg font-bold tabular-nums text-accent">{placeAt(i, top3.map((r) => r.pts))}</span>
                              {publicName(t.name)}
                            </span>
                            <span className="tabular-nums text-fg">{t.pts} pts</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-muted">No parent votes yet.</p>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </DashSection>

        <DashSection
          eyebrow="League"
          title="Wigan tables"
          note="Full U12 North, South, West and East. Our fixtures and results sit under the table."
        >
          <LeaguePanel />
        </DashSection>

        <div>
          <ParentRules />
        </div>
      </main>
    </div>
  );
}
