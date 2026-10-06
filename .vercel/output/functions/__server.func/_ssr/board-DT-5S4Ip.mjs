import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PLAYERS, u as publicName } from "./players-CZr5uoUS.mjs";
import { a as votesForMatch, i as groupGames, t as computeTotals } from "./league-Ch1nTJJB.mjs";
import { C as shortClub, D as voteFixture, S as resultFixture, b as isBullsHome, d as bullsOpponent, f as bullsRoundList, g as fixtureKickoff, m as fixtureHasScore, v as fixtureRound } from "./wdyl-CJ_QwBRn.mjs";
import { n as matchOpenForVotes } from "./vote-actions-CvyU8sOo.mjs";
import { n as PRIZE_LINE } from "./score-from-j42ACoaw.mjs";
import { a as pineVillaMatchGoals, o as pineVillaVoteRows, r as pineVillaAwards } from "./restore-pine-villa-CU4kvcRX.mjs";
import { i as isViewAllPlayer } from "./parent-login-a0219ktd.mjs";
import { t as getFitnessTests } from "./fitness-actions-B9pE30rV.mjs";
import { a as monthTitle, c as septemberPodium } from "./potm-BIYA_DOQ.mjs";
import { k as whatsAppShareUrl, m as boardShareText } from "./whatsapp-BM3bb8QP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { n as FieldLabel } from "./parent-presence-Cn_O1Rtq.mjs";
import { i as getScoreExtras, n as currentVoteMonth, r as getBoardTotals, s as votesForMonth } from "./score-actions-DgqUGgog.mjs";
import { i as topNWithTies, n as placeAt } from "./score-categories-Bc3Qq1vP.mjs";
import { a as PlayerPicker, c as getLeagueData, i as PerformancePick, r as MonthlyTables, t as LeaguePanel } from "./monthly-tables-BlaPSP1H.mjs";
import { t as ParentRules } from "./parent-rules-BPzTwJIp.mjs";
import { a as ScorersAssistsChart, c as TrainingTop3, i as ParentVoteBars, n as DashSection, o as SeasonTable, r as ParentLeaders, s as TrainingNote, t as DashKpi } from "./training-note-pDkrqwmi.mjs";
import { a as mergeTraining, i as computePlayerSeason, n as PlayerProgressCard } from "./training-store-BSIXYoSB.mjs";
import { n as useParentPresence, t as ParentGate } from "./use-parent-presence-DBSdqa6N.mjs";
import { n as getPotm } from "./potm-actions-Durmts6G.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-DT-5S4Ip.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHILD_KEY = "bulls-my-player";
function ParentBoard() {
	const [players, setPlayers] = (0, import_react.useState)([...PLAYERS]);
	const [history, setHistory] = (0, import_react.useState)(pineVillaVoteRows());
	const [currentMatch, setCurrentMatch] = (0, import_react.useState)(matchOpenForVotes());
	const [notes, setNotes] = (0, import_react.useState)({});
	const [fitness, setFitness] = (0, import_react.useState)({});
	const [myPlayer, setMyPlayer] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [appearances, setAppearances] = (0, import_react.useState)({});
	const [awards, setAwards] = (0, import_react.useState)(pineVillaAwards());
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [tests, setTests] = (0, import_react.useState)([]);
	const [potmWinner, setPotmWinner] = (0, import_react.useState)(null);
	const [potmLeader, setPotmLeader] = (0, import_react.useState)(null);
	const [potmTop3, setPotmTop3] = (0, import_react.useState)([]);
	const [potmLabel, setPotmLabel] = (0, import_react.useState)("");
	const [potmPodium, setPotmPodium] = (0, import_react.useState)(septemberPodium);
	const [goals, setGoals] = (0, import_react.useState)(pineVillaMatchGoals());
	const [fixtures, setFixtures] = (0, import_react.useState)([]);
	const [shareHref, setShareHref] = (0, import_react.useState)("https://wa.me/");
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
				const map = {};
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
	(0, import_react.useEffect)(() => {
		load();
		if (typeof window !== "undefined") setMyPlayer(window.localStorage.getItem(CHILD_KEY) || "");
		const t = setInterval(() => void load(true), 15e3);
		const onVis = () => {
			if (document.visibilityState === "visible") load(true);
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			clearInterval(t);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	const games = (0, import_react.useMemo)(() => groupGames(history), [history]);
	const openFx = (0, import_react.useMemo)(() => resultFixture(fixtures) ?? voteFixture(fixtures), [fixtures]);
	const kickedOff = openFx ? fixtureKickoff(openFx.kickoff).getTime() <= Date.now() : false;
	const posted = openFx ? {
		gameNumber: `Rd ${fixtureRound(fixtures, openFx)}`,
		opposition: shortClub(bullsOpponent(openFx))
	} : currentMatch;
	const weekScore = openFx && kickedOff && fixtureHasScore(openFx) ? {
		us: isBullsHome(openFx) ? openFx.homeGoals : openFx.awayGoals,
		them: isBullsHome(openFx) ? openFx.awayGoals : openFx.homeGoals,
		home: isBullsHome(openFx)
	} : null;
	const roundVotes = (0, import_react.useMemo)(() => {
		if (!posted) return [];
		return votesForMatch(history, posted.gameNumber, posted.opposition);
	}, [history, posted]);
	const currentFx = openFx;
	const currentRoundNo = currentFx ? fixtureRound(fixtures, currentFx) : 0;
	const currentOpp = currentFx ? shortClub(bullsOpponent(currentFx)) : "";
	const currentRoundVotes = (0, import_react.useMemo)(() => {
		if (!currentRoundNo || !currentOpp) return [];
		return votesForMatch(history, `Rd ${currentRoundNo}`, currentOpp);
	}, [
		history,
		currentRoundNo,
		currentOpp
	]);
	const earlierGames = (0, import_react.useMemo)(() => {
		return games.filter((g) => {
			if (!currentRoundNo) return true;
			const sameRound = g.gameNumber.toLowerCase().replace(/\s+/g, "") === `rd${currentRoundNo}`;
			const opp = g.opposition.toLowerCase();
			const cur = currentOpp.toLowerCase();
			const sameOpp = Boolean(cur) && (opp === cur || opp.includes(cur) || cur.includes(opp));
			return !(sameRound && sameOpp);
		}).filter((g) => {
			const rounds = bullsRoundList(fixtures);
			const n = Number(g.gameNumber.match(/(\d+)/)?.[1] ?? 0);
			const opp = g.opposition.toLowerCase();
			const round = rounds.find((item) => item.round === n) || rounds.find((item) => {
				const name = item.opposition.toLowerCase();
				return opp === name || name.includes(opp) || opp.includes(name);
			});
			if (!round) return true;
			return fixtureKickoff(round.kickoff).getTime() <= Date.now();
		}).slice().sort((a, b) => a.lastTs.localeCompare(b.lastTs));
	}, [
		games,
		currentRoundNo,
		currentOpp,
		fixtures
	]);
	function pickChild(name) {
		setMyPlayer(name);
		if (typeof window !== "undefined") {
			if (name) window.localStorage.setItem(CHILD_KEY, name);
			else window.localStorage.removeItem(CHILD_KEY);
		}
	}
	const markedIn = sessions.reduce((n, s) => n + s.marks.filter((m) => m.attended).length, 0);
	const fridayNights = sessions.filter((s) => s.marks.some((m) => m.attended)).length;
	const monthVotes = votesForMonth(history, currentVoteMonth());
	const boardShare = (0, import_react.useMemo)(() => {
		const table = computeTotals(players, currentRoundVotes.length ? currentRoundVotes : roundVotes);
		const top = topNWithTies(table, (row) => row.pts, 3);
		const marks = top.map((row) => row.pts);
		const lines = top.map((row, index) => `${placeAt(index, marks)}. ${publicName(row.name)} — ${row.pts} pts`);
		const votes = (currentRoundVotes.length ? currentRoundVotes : roundVotes).length;
		return whatsAppShareUrl(boardShareText({
			game: posted?.gameNumber || "Rd 4",
			opposition: posted?.opposition || "Standish Panthers Storm",
			votes,
			lines
		}), "");
	}, [
		players,
		currentRoundVotes,
		roundVotes,
		posted
	]);
	(0, import_react.useEffect)(() => {
		setShareHref(boardShare);
	}, [boardShare]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-5xl flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
			onRefresh: () => void load(),
			refreshing: loading,
			boardLink: "board",
			shareHref
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-5 pb-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashSection, {
					eyebrow: "Dashboard",
					title: "Parent board",
					note: "Live top 3. Tied on the same points all stay on the board. Full marks stay on your child’s card.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashKpi, {
								label: "Parent votes",
								value: monthVotes.length,
								hint: "This month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashKpi, {
								label: "This round",
								value: roundVotes.length,
								hint: "Families this game"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashKpi, {
								label: "Friday nights",
								value: fridayNights,
								hint: `${markedIn} marked in`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashKpi, {
								label: "Awards",
								value: awards.length,
								hint: "Opp MOM + manager"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "overflow-hidden rounded-2xl border border-border bg-surface shadow-panel",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-accent",
								children: "Voting"
							}), posted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-fg",
									children: posted.gameNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-muted",
									children: [
										"vs ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-fg",
											children: posted.opposition
										}),
										weekScore ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-fg",
											children: weekScore.home ? " · Home" : " · Away"
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs tabular-nums text-subtle",
									children: [
										roundVotes.length,
										" parent vote",
										roundVotes.length === 1 ? "" : "s",
										" this round"
									]
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "No match posted yet."
							})]
						}), weekScore ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-center border-t border-border bg-elevated px-5 py-5 sm:border-l sm:border-t-0 sm:px-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-muted",
								children: "Score"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-6xl font-bold tabular-nums leading-none tracking-tight text-fg",
								children: [
									weekScore.us,
									"–",
									weekScore.them
								]
							})]
						}) : null]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentVoteBars, {
					title: currentRoundNo ? `Current round · Rd ${currentRoundNo} · ${currentOpp}` : "Current round",
					note: "This round’s 3-2-1. Top 3. Anyone level with 3rd stays on. The graph moves on when the next game kicks off.",
					players,
					votes: currentRoundVotes
				}),
				earlierGames.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentVoteBars, {
					title: `${g.gameNumber} · ${g.opposition}`,
					note: `${g.votes.length} families. Parent 3-2-1 for this game.`,
					players,
					votes: g.votes
				}, g.key)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashSection, {
					eyebrow: "This week",
					title: "Top 3",
					note: "Friday training and scorers. First three only.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingTop3, {
							players,
							sessions
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorersAssistsChart, {
							goals,
							players
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashSection, {
					eyebrow: "Season",
					title: "Leaders",
					note: "Running totals. Parent 3-2-1, opp MOM, manager’s player, training and tests.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentLeaders, {
							players,
							history,
							awards,
							sessions,
							tests,
							appearances
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonTable, {
							players,
							history,
							appearances,
							awards,
							sessions,
							tests,
							loading: false,
							emptyLabel: "No points yet. Names appear here once votes or Friday training go in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthlyTables, {
								players,
								history,
								appearances,
								awards,
								sessions,
								tests
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-widest text-accent",
								children: "Player of the month"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm font-semibold leading-6 text-fg",
								children: PRIZE_LINE
							}),
							potmPodium ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg border border-accent/40 bg-accent-soft p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-accent",
										children: ["3rd Monday · ", potmPodium.label]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-sm font-semibold leading-6 text-fg",
										children: [
											"Big congratulations to ",
											publicName(potmPodium.first),
											" for 1st,",
											" ",
											publicName(potmPodium.second),
											" 2nd and ",
											publicName(potmPodium.third),
											" 3rd."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 space-y-1.5 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mr-2 font-display text-lg font-bold tabular-nums text-accent",
													children: "1"
												}),
												publicName(potmPodium.first),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-2 text-muted",
													children: "boxed medal"
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mr-2 font-display text-lg font-bold tabular-nums text-accent",
													children: "2"
												}),
												publicName(potmPodium.second),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-2 text-muted",
													children: "medal"
												})
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mr-2 font-display text-lg font-bold tabular-nums text-accent",
													children: "3"
												}),
												publicName(potmPodium.third),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "ml-2 text-muted",
													children: "medal"
												})
											] })
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm text-muted",
										children: [
											"September medals were awarded on the 3rd Monday, 21 Sep. This month runs from the next day to the 3rd Monday in October, so both Friday trainings count",
											potmLabel ? ` · ${potmLabel}` : " · 22 Sep – 19 Oct",
											"."
										]
									})
								]
							}) : potmWinner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Awarded ",
									potmLabel || monthTitle(potmWinner.month),
									":",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-fg",
										children: publicName(potmWinner.player)
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Live top 3 this month. Awarded on the 3rd Monday",
									potmLabel ? ` · ${potmLabel}` : "",
									"."
								]
							}),
							potmPodium ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs font-semibold uppercase tracking-wider text-muted",
								children: "October leaders are the top 3 in the table below."
							}) : null,
							potmTop3.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 overflow-x-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1",
											children: "Player"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-9 text-right",
											children: "3-2-1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-12 text-right",
											children: "Train"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-right",
											children: "MOM"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-right",
											children: "Mgr"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-right",
											children: "Tot"
										})
									]
								}), potmTop3.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 border-b border-border py-2 text-sm last:border-b-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1 truncate",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mr-2 font-display font-bold tabular-nums text-accent",
												children: placeAt(i, potmTop3.map((r) => r.total))
											}), publicName(row.name)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-9 text-right tabular-nums text-muted",
											children: row.parentPts || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-12 text-right tabular-nums text-muted",
											children: row.trainingPts || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-right tabular-nums text-muted",
											children: row.oppMom ? row.oppMom * 20 : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-right tabular-nums text-muted",
											children: row.playersPlayer ? row.playersPlayer * 10 : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-right font-display font-bold tabular-nums",
											children: row.total
										})
									]
								}, row.name))]
							}) : potmLeader ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-display text-2xl font-bold uppercase tracking-tight",
								children: [
									publicName(potmLeader.name),
									" · ",
									potmLeader.total,
									" pts"
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: "No points in this month yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/month",
								className: "mt-3 inline-flex h-11 items-center text-xs font-semibold uppercase tracking-wide text-accent",
								children: "How it’s picked · medals"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-accent",
							children: "Training"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingNote, {})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashSection, {
					eyebrow: "Family",
					title: "Your child’s marks",
					note: "Enter your family code for your lad only. Other families cannot see his full marks.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentGate, {
						onSession: (session) => {
							if (!session) return;
							if (session.viewAll || isViewAllPlayer(session.player)) return;
							if (session.player) pickChild(session.player);
						},
						children: (session) => {
							const all = Boolean(session.viewAll || isViewAllPlayer(session.player));
							const who = all ? myPlayer : session.player;
							const season = who && players.length ? computePlayerSeason(who, players, history, awards, appearances) : null;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								all ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
										htmlFor: "manager-child",
										children: "View lad"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
										id: "manager-child",
										label: "View lad",
										value: myPlayer,
										placeholder: "Select a player…",
										players,
										onChange: pickChild
									})]
								}) : null,
								season && who ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerProgressCard, {
									season,
									note: notes[who],
									fitness: fitness[who],
									showAwards: all,
									onRefresh: () => load(true)
								}) : all ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Pick a lad to see full marks."
								}) : null,
								who ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformancePick, {
										players,
										history,
										awards,
										sessions,
										tests,
										appearances,
										initialPlayer: who,
										lockToPlayer: !all,
										onRefresh: () => load(true)
									}, who)
								}) : null
							] });
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashSection, {
					eyebrow: "Results",
					title: "Each game",
					note: "Top 3 from the families after every match. Honest 3-2-1 only.",
					children: !games.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Rounds appear after the first votes."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
						children: games.map((g) => {
							const top3 = topNWithTies(computeTotals(players, g.votes), (t) => t.pts, 3);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-xl border border-border bg-surface px-4 py-3 shadow-panel",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-lg font-bold uppercase tracking-tight",
										children: [g.gameNumber, g.opposition ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 font-sans text-sm font-medium normal-case tracking-normal text-muted",
											children: ["vs ", g.opposition]
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-0.5 text-xs text-muted",
										children: [
											g.votes.length,
											" parent vote",
											g.votes.length === 1 ? "" : "s"
										]
									}),
									top3.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 divide-y divide-border",
										children: top3.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between py-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mr-2 font-display text-lg font-bold tabular-nums text-accent",
												children: placeAt(i, top3.map((r) => r.pts))
											}), publicName(t.name)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "tabular-nums text-fg",
												children: [t.pts, " pts"]
											})]
										}, t.name))
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: "No parent votes yet."
									})
								]
							}, g.key);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashSection, {
					eyebrow: "League",
					title: "Wigan tables",
					note: "Full U12 North, South, West and East. Our fixtures and results sit under the table.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaguePanel, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentRules, {}) })
			]
		})]
	});
}
function BoardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentBoard, {});
}
//#endregion
export { BoardPage as component };
