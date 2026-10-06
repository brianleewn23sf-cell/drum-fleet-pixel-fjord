import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { r as isSquadPlayer, t as PLAYERS } from "./players-CZr5uoUS.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { i as localDateStamp } from "./when-BGtZJU2t.mjs";
import { n as loadFitnessTests } from "./fitness-actions-B9pE30rV.mjs";
import { a as monthTitle, c as septemberPodium, i as canAwardMonth, l as shiftMonth, o as monthWindow, r as SEPTEMBER_2026_PODIUM, s as scorePotm, u as upcomingPotmMonth } from "./potm-BIYA_DOQ.mjs";
import { i as scoreTrainerYear, n as TRAINER_YEAR_LABEL, r as TRAINER_YEAR_START, t as TRAINER_YEAR_END } from "./trainer-year-BiJeg2Qv.mjs";
import { t as getTraining } from "./training-actions-BntQL2yx.mjs";
import { t as loadAppearances } from "./appearance-actions-AdAmm59Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/potm-actions-CiX9OYqk.js
function asText(value) {
	const s = String(value ?? "").trim();
	return s.length ? s : null;
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	if (typeof value === "string") return value;
	return "";
}
async function loadWinner(sql, month) {
	try {
		const row = (await sql`
      select month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on,
             second_player, third_player
      from player_of_month
      where month = ${month}
      limit 1
    `)[0];
		if (!row) return null;
		return {
			month: String(row.month),
			player: String(row.player),
			parentPts: Number(row.parent_pts) || 0,
			trainingPts: Number(row.training_pts) || 0,
			oppMom: Number(row.opp_mom) || 0,
			playersPlayer: Number(row.players_player) || 0,
			total: Number(row.total) || 0,
			awardedOn: String(row.awarded_on || ""),
			second: asText(row.second_player),
			third: asText(row.third_player)
		};
	} catch {
		return null;
	}
}
function podiumFromWinner(row) {
	if (!row?.player) return null;
	const locked = row.month === SEPTEMBER_2026_PODIUM.month ? SEPTEMBER_2026_PODIUM : null;
	return {
		month: row.month,
		label: monthTitle(row.month),
		awardedOn: row.awardedOn || locked?.awardedOn || "",
		first: locked?.first || row.player,
		second: row.second || locked?.second || "",
		third: row.third || locked?.third || ""
	};
}
async function ensureSeptemberPodium(sql) {
	const p = SEPTEMBER_2026_PODIUM;
	try {
		await sql`alter table player_of_month add column if not exists second_player text`;
		await sql`alter table player_of_month add column if not exists third_player text`;
	} catch {}
	try {
		await sql`
      insert into player_of_month
        (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on, second_player, third_player)
      values
        (${p.month}, ${p.first}, 0, 0, 0, 0, 0, ${p.awardedOn}, ${p.second}, ${p.third})
      on conflict (month) do update set
        player = excluded.player,
        second_player = excluded.second_player,
        third_player = excluded.third_player,
        awarded_on = excluded.awarded_on
    `;
	} catch {
		try {
			await sql`
        insert into player_of_month
          (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on)
        values
          (${p.month}, ${p.first}, 0, 0, 0, 0, 0, ${p.awardedOn})
        on conflict (month) do update set
          player = excluded.player,
          awarded_on = excluded.awarded_on
      `;
		} catch {}
	}
}
async function computeMonth(month) {
	const window = monthWindow(month);
	const [votes, training] = await Promise.all([getInitialData(), getTraining()]);
	const sql = await getSql();
	await ensureSeptemberPodium(sql);
	const tests = await loadFitnessTests(sql);
	let awards = [];
	try {
		awards = (await sql`
      select game_number, opposition, opp_mom, players_player, manager_player, updated_at from match_awards
    `).map((row) => ({
			gameNumber: String(row.game_number || "").trim(),
			opposition: String(row.opposition || "").trim(),
			oppMom: asText(row.opp_mom),
			playersPlayer: asText(row.players_player),
			managerPlayer: asText(row.manager_player),
			updatedAt: asIso(row.updated_at)
		}));
	} catch {
		try {
			awards = (await sql`
        select game_number, opposition, opp_mom, players_player, updated_at from match_awards
      `).map((row) => ({
				gameNumber: String(row.game_number || "").trim(),
				opposition: String(row.opposition || "").trim(),
				oppMom: asText(row.opp_mom),
				playersPlayer: asText(row.players_player),
				managerPlayer: null,
				updatedAt: asIso(row.updated_at)
			}));
		} catch {
			awards = [];
		}
	}
	const appearances = await loadAppearances(sql);
	const standings = scorePotm([...PLAYERS], votes.history, awards, training.sessions, window, tests, appearances);
	let winner = await loadWinner(sql, month);
	const leader = standings[0] && standings[0].total > 0 ? standings[0] : null;
	if (month !== SEPTEMBER_2026_PODIUM.month && !winner && canAwardMonth(window) && leader && isSquadPlayer(leader.name)) {
		const awardedOn = localDateStamp();
		try {
			await sql`
        insert into player_of_month
          (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on)
        values
          (${month}, ${leader.name}, ${leader.parentPts}, ${leader.trainingPts}, ${leader.oppMom}, ${leader.playersPlayer}, ${leader.total}, ${awardedOn})
        on conflict (month) do nothing
      `;
			winner = await loadWinner(sql, month);
		} catch {
			winner = null;
		}
	}
	const lastPodium = podiumFromWinner(await loadWinner(sql, shiftMonth(month, -1))) || podiumFromWinner(winner) || septemberPodium();
	return {
		month,
		window,
		canAward: canAwardMonth(window),
		standings,
		winner,
		leader,
		lastPodium
	};
}
var getPotm_createServerFn_handler = createServerRpc({
	id: "844e1804fec5a41884f5adccb7bd7f63900220b12e730e32b8d0a35ea090f8bc",
	name: "getPotm",
	filename: "src/lib/potm-actions.ts"
}, (opts) => getPotm.__executeServer(opts));
var getPotm = createServerFn({ method: "POST" }).validator(object({ month: string().regex(/^\d{4}-\d{2}$/).optional() }).optional()).handler(getPotm_createServerFn_handler, async ({ data }) => {
	try {
		return await computeMonth(data?.month || upcomingPotmMonth());
	} catch {
		const month = data?.month || upcomingPotmMonth();
		const window = monthWindow(month);
		return {
			month,
			window,
			canAward: canAwardMonth(window),
			standings: [],
			winner: null,
			leader: null,
			lastPodium: septemberPodium()
		};
	}
});
var getTrainerYear_createServerFn_handler = createServerRpc({
	id: "73ea935c314b4652f78b467a0209d16bf1153f166e683063dd3361c8b2f0c1fc",
	name: "getTrainerYear",
	filename: "src/lib/potm-actions.ts"
}, (opts) => getTrainerYear.__executeServer(opts));
var getTrainerYear = createServerFn({ method: "POST" }).handler(getTrainerYear_createServerFn_handler, async () => {
	const [votes, training] = await Promise.all([getInitialData(), getTraining()]);
	const rows = scoreTrainerYear(votes.players.length ? votes.players : [...PLAYERS], training.sessions);
	return {
		label: TRAINER_YEAR_LABEL,
		start: TRAINER_YEAR_START,
		end: TRAINER_YEAR_END,
		rows
	};
});
var awardPotm_createServerFn_handler = createServerRpc({
	id: "8ee3c7014647a593769d2cfde28ee6be24d0eb74816ff32bcccfe3fd23135c1c",
	name: "awardPotm",
	filename: "src/lib/potm-actions.ts"
}, (opts) => awardPotm.__executeServer(opts));
var awardPotm = createServerFn({ method: "POST" }).validator(object({
	month: string().regex(/^\d{4}-\d{2}$/),
	player: string().trim().min(1)
})).handler(awardPotm_createServerFn_handler, async ({ data }) => {
	if (!isSquadPlayer(data.player)) return {
		success: false,
		error: "Pick a squad player."
	};
	const snapshot = await computeMonth(data.month);
	if (!snapshot.canAward) return {
		success: false,
		error: `Awarded on the 3rd Monday (${snapshot.window.awardMonday}).`
	};
	const row = snapshot.standings.find((s) => s.name === data.player);
	if (!row) return {
		success: false,
		error: "Player not in this month’s table."
	};
	const sql = await getSql();
	const awardedOn = localDateStamp();
	await sql`
      insert into player_of_month
        (month, player, parent_pts, training_pts, opp_mom, players_player, total, awarded_on)
      values
        (${data.month}, ${data.player}, ${row.parentPts}, ${row.trainingPts}, ${row.oppMom}, ${row.playersPlayer}, ${row.total}, ${awardedOn})
      on conflict (month) do update set
        player = excluded.player,
        parent_pts = excluded.parent_pts,
        training_pts = excluded.training_pts,
        opp_mom = excluded.opp_mom,
        players_player = excluded.players_player,
        total = excluded.total,
        awarded_on = excluded.awarded_on
    `;
	return {
		success: true,
		winner: await loadWinner(sql, data.month)
	};
});
//#endregion
export { awardPotm_createServerFn_handler, getPotm_createServerFn_handler, getTrainerYear_createServerFn_handler };
