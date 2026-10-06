import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { a as votesForMatch, i as groupGames, r as gameKey } from "./league-Ch1nTJJB.mjs";
import { C as shortClub, D as voteFixture, _ as fixturePlayed, b as isBullsHome, d as bullsOpponent, f as bullsRoundList, g as fixtureKickoff, m as fixtureHasScore, v as fixtureRound } from "./wdyl-CJ_QwBRn.mjs";
import { a as submitVotes, i as setCurrentMatch, n as matchOpenForVotes, t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { i as pineVillaCurrentMatch, o as pineVillaVoteRows, r as pineVillaAwards } from "./restore-pine-villa-CU4kvcRX.mjs";
import { n as formatKickoff } from "./when-BGtZJU2t.mjs";
import { t as SCORING } from "./scoring-B3T9YYfp.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { O as voteReminderWhatsAppText, k as whatsAppShareUrl, w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { _ as ChevronDown, a as Star, b as Award, c as Send, g as Clock, h as LoaderCircle, m as MapPin, n as UserRound, o as Shield, p as Medal, r as Trophy, s as Share2, t as Vote, u as RefreshCw, v as CalendarDays, y as BookOpen } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button, t as AppHeader } from "./app-header-COF4H8CL.mjs";
import { n as FieldLabel, t as FieldInput } from "./parent-presence-Cn_O1Rtq.mjs";
import { i as getScoreExtras } from "./score-actions-DgqUGgog.mjs";
import { a as PlayerPicker, c as getLeagueData, i as PerformancePick, l as syncLeagueFromFa, n as MatchSheet, r as MonthlyTables, t as LeaguePanel } from "./monthly-tables-BlaPSP1H.mjs";
import { t as ParentRules } from "./parent-rules-BPzTwJIp.mjs";
import { a as ScorersAssistsChart, c as TrainingTop3, i as ParentVoteBars, o as SeasonTable, r as ParentLeaders, s as TrainingNote } from "./training-note-pDkrqwmi.mjs";
import { n as useParentPresence, t as ParentGate } from "./use-parent-presence-DBSdqa6N.mjs";
import { t as getTraining } from "./training-actions-BntQL2yx.mjs";
import { n as saveAppearances } from "./appearance-actions-AdAmm59Y.mjs";
import { n as SafePanel, t as PlayedPicker } from "./safe-panel-Br5rwLBq.mjs";
import { t as gameDetailsFor } from "./game-details-k7DhdgXt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-2bI5mxSt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ScoringKey() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-2 text-xs text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Parents 3 / 2 / 1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Opp MOM ",
				SCORING.oppMom,
				" · players’ player ",
				SCORING.playersPlayer
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				"Training max ",
				SCORING.trainingMax,
				" (attendance, effort, attitude, achievement /10)"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Lose training marks: not turning up, booting balls when Brian is talking, messing about, swearing" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Achievement is a strict perfect mark — to get the best out of them" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tests: time and technique /10. More drills will be added — practise now" })
		]
	});
}
function VotingApp() {
	const [view, setView] = (0, import_react.useState)("vote");
	const [players, setPlayers] = (0, import_react.useState)([...PLAYERS]);
	const [history, setHistory] = (0, import_react.useState)(pineVillaVoteRows());
	const [postedMatch, setPostedMatch] = (0, import_react.useState)(matchOpenForVotes() ?? pineVillaCurrentMatch());
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [posting, setPosting] = (0, import_react.useState)(false);
	const openNow = matchOpenForVotes();
	const [gameNumber, setGameNumber] = (0, import_react.useState)(openNow?.gameNumber ?? "");
	const [opposition, setOpposition] = (0, import_react.useState)(openNow?.opposition ?? "");
	const [parentChild, setParentChild] = (0, import_react.useState)("");
	const [vote3, setVote3] = (0, import_react.useState)("");
	const [vote2, setVote2] = (0, import_react.useState)("");
	const [vote1, setVote1] = (0, import_react.useState)("");
	const [openGame, setOpenGame] = (0, import_react.useState)(null);
	const [fixtures, setFixtures] = (0, import_react.useState)([]);
	const [goalsByFixture, setGoalsByFixture] = (0, import_react.useState)({});
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const [appearances, setAppearances] = (0, import_react.useState)({});
	const [awards, setAwards] = (0, import_react.useState)(pineVillaAwards());
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [tests, setTests] = (0, import_react.useState)([]);
	const [played, setPlayed] = (0, import_react.useState)([]);
	const [savingPlayed, setSavingPlayed] = (0, import_react.useState)(false);
	const [reminderHref, setReminderHref] = (0, import_react.useState)("https://wa.me/");
	useParentPresence(parentChild, view);
	(0, import_react.useEffect)(() => {
		setReminderHref(whatsAppShareUrl(voteReminderWhatsAppText(), ""));
	}, []);
	async function load(quiet = false) {
		if (!quiet) setLoading(true);
		try {
			const votes = await getInitialData();
			const train = await getTraining().catch(() => ({ sessions: [] }));
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
			setPlayers((cur) => cur.length ? cur : [...PLAYERS]);
			if (!quiet) toast.error(err instanceof Error ? err.message : "Could not load votes.");
		}
		try {
			const league = await getLeagueData();
			setFixtures(league.fixtures);
			setGoalsByFixture(league.goalsByFixture ?? {});
			if (league.awards?.length) setAwards(league.awards);
		} catch {}
		try {
			const extras = await getScoreExtras();
			if (extras.awards.length) setAwards(extras.awards);
			if (extras.sessions.length) setSessions(extras.sessions);
			setTests(extras.tests ?? []);
		} catch {}
		if (!quiet) setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
		if (typeof window !== "undefined") setParentChild(window.localStorage.getItem("bulls-my-player") || "");
		const timer = window.setInterval(() => void load(true), 15e3);
		const onVis = () => {
			if (document.visibilityState === "visible") load(true);
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (view !== "games") return;
		getLeagueData().then((data) => {
			setFixtures(data.fixtures);
			setGoalsByFixture(data.goalsByFixture ?? {});
			if (data.awards?.length) setAwards(data.awards);
		}).catch(() => toast.error("Could not load fixtures."));
	}, [view]);
	const playedHistory = (0, import_react.useMemo)(() => {
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
	const playedGames = (0, import_react.useMemo)(() => groupGames(playedHistory), [playedHistory]);
	const thisGame = (0, import_react.useMemo)(() => voteFixture(fixtures), [fixtures]);
	const thisRound = thisGame ? fixtureRound(fixtures, thisGame) : 0;
	const currentFx = thisGame;
	const currentRoundNo = currentFx ? fixtureRound(fixtures, currentFx) : 0;
	const currentOpp = currentFx ? shortClub(bullsOpponent(currentFx)) : "";
	const currentRoundVotes = (0, import_react.useMemo)(() => {
		if (!currentRoundNo || !currentOpp) return [];
		if (!(currentFx ? fixtureKickoff(currentFx.kickoff).getTime() <= Date.now() : false)) return [];
		return votesForMatch(history, `Rd ${currentRoundNo}`, currentOpp);
	}, [
		history,
		currentRoundNo,
		currentOpp,
		currentFx
	]);
	const votePool = players;
	const roundVotes = (0, import_react.useMemo)(() => {
		if (!gameNumber.trim() || !opposition.trim()) return [];
		return votesForMatch(history, gameNumber, opposition);
	}, [
		history,
		gameNumber,
		opposition
	]);
	const myVote = (0, import_react.useMemo)(() => roundVotes.find((row) => row.parentChild.toLowerCase() === parentChild.toLowerCase()) ?? null, [roundVotes, parentChild]);
	(0, import_react.useEffect)(() => {
		setVote3(myVote?.vote3 ?? "");
		setVote2(myVote?.vote2 ?? "");
		setVote1(myVote?.vote1 ?? "");
	}, [
		gameNumber,
		opposition,
		myVote?.id,
		myVote?.vote3,
		myVote?.vote2,
		myVote?.vote1
	]);
	(0, import_react.useEffect)(() => {
		if (!gameNumber.trim() || !opposition.trim() || !players.length) return;
		const saved = appearances[gameKey(gameNumber.trim(), opposition.trim())];
		setPlayed(saved ?? []);
	}, [
		gameNumber,
		opposition,
		appearances,
		players
	]);
	const upcoming = (0, import_react.useMemo)(() => fixtures.filter((f) => !fixturePlayed(f)), [fixtures]);
	const results = (0, import_react.useMemo)(() => fixtures.filter((f) => fixturePlayed(f)).slice().reverse(), [fixtures]);
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
	function fillMatch(game, opp) {
		setGameNumber(game);
		setOpposition(opp);
		setView("vote");
		toast.success("Match details filled. Cast your 3-2-1.");
	}
	async function persistPlayed(round, opp, squad) {
		const res = await saveAppearances({ data: {
			gameNumber: round,
			opposition: opp,
			players: squad
		} });
		if (res.success) setAppearances(res.appearances);
	}
	async function onPostMatch() {
		const next = {
			gameNumber: gameNumber.trim(),
			opposition: opposition.trim()
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
			vote1
		};
		if (!payload.gameNumber) return toast.error("Add the round / game number.");
		if (!payload.opposition) return toast.error("Add the opposition.");
		if (!payload.parentChild) return toast.error("Select your child.");
		if (!payload.vote3 || !payload.vote2 || !payload.vote1) return toast.error("Cast all three votes.");
		if (payload.vote3 === payload.vote2 || payload.vote3 === payload.vote1 || payload.vote2 === payload.vote1) return toast.error("Each vote must go to a different player.");
		if (payload.parentChild === payload.vote3 || payload.parentChild === payload.vote2 || payload.parentChild === payload.vote1) return toast.error("You cannot vote for your own child.");
		setSubmitting(true);
		try {
			const already = roundVotes.some((row) => row.parentChild.toLowerCase() === payload.parentChild.toLowerCase());
			const res = await submitVotes({ data: payload });
			if (!res.success) {
				toast.error(res.error);
				return;
			}
			setVote3("");
			setVote2("");
			setVote1("");
			setPostedMatch({
				gameNumber: payload.gameNumber,
				opposition: payload.opposition
			});
			toast.success(already ? "Votes updated." : "Votes in.");
			await load();
			document.getElementById("live-vote-graph")?.scrollIntoView({ block: "nearest" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Submit failed.");
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-dvh w-full max-w-lg flex-col overflow-hidden bg-bg md:max-w-5xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {
				onRefresh: () => void load(),
				refreshing: loading,
				boardLink: "board",
				shareHref: reminderHref
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-0 min-w-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain px-3 py-3 sm:px-4 sm:py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SafePanel, {
					label: view,
					children: [
						view === "vote" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-11 w-full",
									onClick: () => {
										sendWhatsApp("Raging Bulls U12s", voteReminderWhatsAppText(), "");
										toast.success("Message copied. Paste it in the parents’ chat if WhatsApp is blank.");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share on WhatsApp"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InAppHint, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "@container overflow-visible rounded-2xl border border-border bg-surface shadow-panel",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-start justify-between gap-x-3 gap-y-1 bg-kit-navy px-3 py-2 text-kit-navy-fg sm:px-4 sm:py-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-kit-gold sm:text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vote, { className: "size-3.5 shrink-0" }), "Vote now · still open"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "mt-0.5 font-display text-base font-bold uppercase leading-tight tracking-tight break-words sm:text-3xl sm:leading-none",
													children: gameNumber && opposition ? `${gameNumber} vs ${opposition}` : thisGame ? `Rd ${thisRound} vs ${shortClub(bullsOpponent(thisGame))}` : "Rd 4 vs Standish Panthers Storm"
												})]
											}), thisGame ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "flex min-w-0 flex-wrap items-center justify-end gap-x-2 gap-y-0.5 text-[11px] text-white/75 sm:text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5 text-kit-gold" }), formatKickoff(thisGame.kickoff, "EEE d MMM · HH:mm")]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-kit-gold" }), isBullsHome(thisGame) ? "Home" : "Away"]
												})]
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											id: "live-vote-graph",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentVoteBars, {
												embedded: true,
												title: gameNumber && opposition ? `Current round · ${gameNumber} · ${opposition}` : "Current round",
												note: "3-2-1 for this game. Top 3. Anyone level with 3rd stays on. From Standish, each family who votes also gets 1 point for their own lad.",
												players,
												votes: roundVotes
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col gap-2 p-2.5 [@media(min-height:760px)]:gap-3 [@media(min-height:760px)]:p-4 sm:gap-3 sm:p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex min-w-0 items-center gap-2 rounded-xl border border-border bg-bg px-2.5 py-1 sm:gap-3 sm:px-3 sm:py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-kit-navy text-kit-gold sm:size-12",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-5 sm:size-6" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "min-w-0 flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
															htmlFor: "parent-child",
															className: "mb-0.5 hidden [@media(min-height:760px)]:block sm:mb-1.5 sm:block",
															children: "Your child"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
															id: "parent-child",
															label: opposition ? `Your child · ${opposition}` : "Your child · Standish",
															value: parentChild,
															placeholder: "Select your child",
															className: "h-10 [@media(min-height:760px)]:h-11 sm:h-11",
															players,
															onChange: (next) => {
																setParentChild(next);
																if (typeof window !== "undefined") {
																	if (next) window.localStorage.setItem("bulls-my-player", next);
																	else window.localStorage.removeItem("bulls-my-player");
																}
																if (vote3 === next) setVote3("");
																if (vote2 === next) setVote2("");
																if (vote1 === next) setVote1("");
															}
														})]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-1 gap-2 @min-[720px]:grid-cols-3 sm:gap-3",
													children: [
														{
															id: "vote-3",
															points: "3",
															label: "Best on ground",
															value: vote3,
															setValue: setVote3,
															exclude: [
																parentChild,
																vote2,
																vote1
															],
															Icon: Medal
														},
														{
															id: "vote-2",
															points: "2",
															label: "Second",
															value: vote2,
															setValue: setVote2,
															exclude: [
																parentChild,
																vote3,
																vote1
															],
															Icon: Award
														},
														{
															id: "vote-1",
															points: "1",
															label: "Third",
															value: vote1,
															setValue: setVote1,
															exclude: [
																parentChild,
																vote3,
																vote2
															],
															Icon: Star
														}
													].map(({ id, points, label, value, setValue, exclude, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex min-w-0 items-center gap-2 rounded-xl border border-border bg-bg px-2.5 py-1 sm:gap-3 sm:px-3 sm:py-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "relative flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-accent-fg sm:size-12 sm:text-2xl",
															children: [points, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "absolute -right-1 -top-1 size-4 rounded-full bg-bg p-0.5 text-kit-gold" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0 flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldLabel, {
																htmlFor: id,
																className: "mb-0.5 hidden items-center gap-1.5 [@media(min-height:760px)]:flex sm:mb-1.5 sm:flex",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "truncate",
																	children: label
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerPicker, {
																id,
																label: `${points} points`,
																value,
																players: votePool,
																exclude: [...exclude],
																className: "h-10 [@media(min-height:760px)]:h-11 sm:h-11",
																onChange: setValue
															})]
														})]
													}, id))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
													size: "lg",
													className: "hidden h-12 w-full rounded-xl text-base uppercase tracking-wide [@media(min-height:760px)]:inline-flex md:inline-flex",
													onClick: () => void onSubmit(),
													disabled: submitting,
													children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), submitting ? "Saving…" : myVote ? "Update votes" : "Submit votes"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "hidden text-center text-xs leading-snug text-muted [@media(min-height:760px)]:block sm:block",
													children: "One vote per family. Standish is still open, so you can send or change your 3-2-1. You cannot pick your own child. Voting gives your lad 1 point."
												})
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingNote, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "h-11 w-full",
									onClick: () => {
										sendWhatsApp("Raging Bulls U12s", voteReminderWhatsAppText(), "");
										toast.success("Message copied. Paste it in the parents’ chat if WhatsApp is blank.");
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Send vote reminder"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-center text-xs leading-snug text-muted",
									children: "Don’t send clover-hill or el-acre. Those are the old site. Share sends the scores. A new link only appears after you tap Publish."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-surface text-sm font-semibold uppercase tracking-wide",
									onClick: () => setView("rules"),
									children: "How we play · U12 9v9 rules"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
									className: "rounded-xl border border-border bg-surface p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
										className: "cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted",
										children: "Coach tools"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-col gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
													htmlFor: "game-number",
													children: "Round / Game"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
													id: "game-number",
													placeholder: "Round 5",
													value: gameNumber,
													onChange: (e) => setGameNumber(e.target.value),
													autoComplete: "off"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
													htmlFor: "opposition",
													children: "Opposition"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldInput, {
													id: "opposition",
													placeholder: "Leigh Genesis",
													value: opposition,
													onChange: (e) => setOpposition(e.target.value),
													autoComplete: "off"
												})] })]
											}),
											thisGame ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "text-left text-xs font-semibold uppercase tracking-wide text-accent",
												onClick: () => fillMatch(`Rd ${thisRound}`, shortClub(bullsOpponent(thisGame))),
												children: "Use this fixture"
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayedPicker, {
												players,
												selected: played,
												onChange: setPlayed
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												onClick: () => void onSavePlayed(),
												disabled: savingPlayed,
												children: savingPlayed ? "Saving…" : "Save who played"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "outline",
												onClick: () => void onPostMatch(),
												disabled: posting,
												children: posting ? "Posting…" : "Post match for parents"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												onClick: () => {
													sendWhatsApp("Raging Bulls U12s", voteReminderWhatsAppText(), "");
													toast.success("Message copied. Paste it in the parents’ chat if WhatsApp is blank.");
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share on WhatsApp"]
											})
										]
									})]
								})
							]
						}),
						view === "table" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScorersAssistsChart, {
								goals: Object.values(goalsByFixture).flat(),
								players
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentVoteBars, {
									title: currentRoundNo ? `Current round · Rd ${currentRoundNo} · ${currentOpp}` : "Current round",
									note: currentFx && fixtureKickoff(currentFx.kickoff).getTime() > Date.now() ? "No score yet. This game hasn’t been played." : "This round’s 3-2-1. Top 3. Anyone level with 3rd stays on. The graph moves on when the next game kicks off.",
									players,
									votes: currentRoundVotes
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingTop3, {
									players,
									sessions
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentVoteBars, {
									title: "Top 3 · parent votes season",
									note: "Games already played. From Standish, each family who voted gets 1 extra point for their own lad.",
									players,
									votes: playedHistory
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 mt-6 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl font-bold uppercase tracking-tight",
										children: "Top 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: ["Live top 3 totals. Full marks only for your child. ", "POINTS MAKE PRIZES! Train at home and get your points up."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoringKey, {})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold uppercase tracking-wider text-subtle",
									children: "Cumulative"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonTable, {
								players,
								history,
								appearances,
								awards,
								sessions,
								tests,
								loading
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentLeaders, {
									players,
									history,
									awards,
									sessions,
									tests,
									appearances
								})
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentGate, { children: (session) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformancePick, {
									players,
									history,
									awards,
									sessions,
									tests,
									appearances,
									initialPlayer: session.player,
									lockToPlayer: true,
									onRefresh: () => load(true)
								}) })
							})
						] }),
						view === "games" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-bold uppercase tracking-tight",
									children: "Bulls fixtures"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3 text-sm text-muted",
									children: "Press Update for kick-off or venue changes. Each result shows scorers, assists, parents’ player, manager’s player and opp MOM."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "mb-3 w-full",
									onClick: () => void updateFixtures(),
									disabled: syncing,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", syncing && "animate-spin") }), syncing ? "Updating…" : "Update fixtures & results"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingNote, { className: "mb-3" }),
								!fixtures.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl border border-border bg-surface px-4 py-10 text-center text-sm text-muted",
									children: "Fixtures will show here once loaded."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-2",
									children: [upcoming.map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixtureRow, {
										fx,
										fixtures,
										goals: goalsByFixture[fx.id] ?? [],
										awards,
										votes: history,
										players,
										onSheet: (data) => {
											if (data.goalsByFixture) setGoalsByFixture(data.goalsByFixture);
											if (data.awards) setAwards(data.awards);
										}
									}, fx.id)), results.map((fx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixtureRow, {
										fx,
										fixtures,
										goals: goalsByFixture[fx.id] ?? [],
										awards,
										votes: history,
										players,
										onSheet: (data) => {
											if (data.goalsByFixture) setGoalsByFixture(data.goalsByFixture);
											if (data.awards) setAwards(data.awards);
										}
									}, fx.id))]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-bold uppercase tracking-tight",
									children: "Match votes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3 text-sm text-muted",
									children: "Open a round to see that game’s 3-2-1"
								}),
								!playedGames.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-xl border border-border bg-surface px-4 py-8 text-center text-sm text-muted",
									children: "No 3-2-1 votes yet. They appear here after the first game."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-col gap-2",
									children: playedGames.map((g) => {
										const open = openGame === g.key;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "overflow-hidden rounded-xl border border-border bg-surface",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												className: "flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
												onClick: () => setOpenGame(open ? null : g.key),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "truncate text-sm font-semibold",
														children: [g.gameNumber, g.opposition ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-medium text-muted",
															children: [" vs ", g.opposition]
														}) : null]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-xs text-muted",
														children: [
															g.votes.length,
															" parent vote",
															g.votes.length === 1 ? "" : "s"
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180") })]
											}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "border-t border-border p-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentVoteBars, {
													title: `${g.gameNumber}${g.opposition ? ` · ${g.opposition}` : ""}`,
													note: "This game’s 3-2-1. Top 3. Anyone level with 3rd stays on.",
													players,
													votes: g.votes
												})
											}) : null]
										}, g.key);
									})
								})
							] })]
						}),
						view === "league" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeaguePanel, {}),
						view === "rules" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentRules, {})
					]
				}, view)
			}),
			view === "vote" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 border-t border-border bg-bg px-3 py-2 [@media(min-height:760px)]:hidden md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "h-12 w-full rounded-xl text-base uppercase tracking-wide",
					onClick: () => void onSubmit(),
					disabled: submitting,
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" }), submitting ? "Saving…" : myVote ? "Update votes" : "Submit votes"]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "z-30 shrink-0 border-t border-border bg-surface/95 pt-1",
				style: { paddingBottom: "max(8px, env(safe-area-inset-bottom))" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5 px-1",
					children: [
						[
							"vote",
							"Vote",
							Vote
						],
						[
							"table",
							"Points",
							Trophy
						],
						[
							"games",
							"Games",
							CalendarDays
						],
						[
							"league",
							"League",
							Shield
						],
						[
							"rules",
							"Rules",
							BookOpen
						]
					].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView(id),
						className: cn("flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-md px-1 text-xs font-semibold uppercase tracking-wide", view === id ? "bg-accent text-accent-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), label]
					}, id))
				})
			})
		]
	});
}
function InAppHint() {
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const ua = navigator.userAgent || "";
		setShow(/WhatsApp|FBAN|FBAV|Instagram|Line\//i.test(ua));
	}, []);
	if (!show) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-accent bg-accent-soft px-4 py-3 text-sm leading-snug text-fg",
		children: "Open in Safari or Chrome — tap the dots, then Open in browser. The app works there."
	});
}
function FixtureRow({ fx, fixtures, goals, awards, votes, players, onSheet }) {
	const home = isBullsHome(fx);
	const played = fixtureHasScore(fx);
	const kickedOff = fixtureKickoff(fx.kickoff).getTime() <= Date.now();
	const opponent = shortClub(bullsOpponent(fx));
	const us = home ? fx.homeGoals : fx.awayGoals;
	const them = home ? fx.awayGoals : fx.homeGoals;
	const when = [formatKickoff(fx.kickoff, "EEE d MMM"), formatKickoff(fx.kickoff, "HH:mm")].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted",
						children: when || "TBC"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 rounded-sm bg-elevated px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-muted",
								children: home ? "Home" : "Away"
							}),
							"vs ",
							opponent
						]
					}),
					fx.venue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: fx.venue
					}) : null,
					fx.status === "postponed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs font-semibold uppercase tracking-wide text-accent",
						children: "Postponed"
					}) : null,
					gameDetailsFor(opponent) || gameDetailsFor(fx.homeTeam) || gameDetailsFor(fx.awayTeam) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 list-disc pl-4 text-xs text-fg",
						children: (gameDetailsFor(opponent) || gameDetailsFor(fx.homeTeam) || gameDetailsFor(fx.awayTeam)).lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					}) : null
				]
			}), played ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "shrink-0 text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "shrink-0 font-display text-xl font-bold tabular-nums leading-none",
					children: [
						us,
						"–",
						them
					]
				}), fx.homeTeam === "Pine Villa U12 s" && fx.awayTeam === "Cherrybrook U12 Bulls" && fx.homeGoals === 7 && fx.awayGoals === 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs font-semibold uppercase tracking-wide text-muted",
					children: "HT 2–2"
				}) : null]
			}) : kickedOff ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "shrink-0 text-xs font-semibold uppercase tracking-wide text-muted",
				children: "Score not in"
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchSheet, {
			fx,
			fixtures,
			goals,
			awards,
			votes,
			players,
			editable: false,
			onUpdated: onSheet
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VotingApp, {});
}
//#endregion
export { Home as component };
