import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as getSql } from "./db-BsCi4Y91.mjs";
import { l as string, s as object } from "../_libs/zod.mjs";
import { t as getInitialData } from "./vote-actions-CvyU8sOo.mjs";
import { s as joinOppMom, u as oppMomPlayers } from "./scoring-B3T9YYfp.mjs";
import { n as loadActiveSquad } from "./squad-C3dFz7Mc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coach-actions-49pRtzAd.js
function asText(value) {
	const s = String(value ?? "").trim();
	return s.length ? s : null;
}
async function loadAwards(sql) {
	try {
		return (await sql`
      select id, game_number, opposition, opp_mom, players_player, manager_player, updated_at
      from match_awards
      order by id asc
    `).map((row) => ({
			id: Number(row.id) || 0,
			gameNumber: String(row.game_number || "").trim(),
			opposition: String(row.opposition || "").trim(),
			oppMom: asText(row.opp_mom),
			playersPlayer: asText(row.players_player),
			managerPlayer: asText(row.manager_player),
			updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || "")
		}));
	} catch {
		return (await sql`
      select id, game_number, opposition, opp_mom, players_player, updated_at
      from match_awards
      order by id asc
    `).map((row) => ({
			id: Number(row.id) || 0,
			gameNumber: String(row.game_number || "").trim(),
			opposition: String(row.opposition || "").trim(),
			oppMom: asText(row.opp_mom),
			playersPlayer: asText(row.players_player),
			managerPlayer: null,
			updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : String(row.updated_at || "")
		}));
	}
}
function squadMom(value, squad) {
	const names = oppMomPlayers(value);
	if (!names.length) return null;
	if (names.some((name) => !squad.includes(name))) return null;
	return joinOppMom(names);
}
var getCoachData_createServerFn_handler = createServerRpc({
	id: "14dcf70485d0c456f529716cf82af6035e26c08fe421be797ffb18af39e98d29",
	name: "getCoachData",
	filename: "src/lib/coach-actions.ts"
}, (opts) => getCoachData.__executeServer(opts));
var getCoachData = createServerFn({ method: "POST" }).handler(getCoachData_createServerFn_handler, async () => {
	const sql = await getSql();
	const base = await getInitialData();
	const awards = await loadAwards(sql);
	return {
		players: base.players,
		history: base.history,
		currentMatch: base.currentMatch,
		awards,
		notes: base.notes ?? {},
		appearances: base.appearances ?? {}
	};
});
var saveMatchAwards_createServerFn_handler = createServerRpc({
	id: "3f95b3c12979029f010c4396e0e9fb7965c47d2c91d0635a0df63cae02c3b5ab",
	name: "saveMatchAwards",
	filename: "src/lib/coach-actions.ts"
}, (opts) => saveMatchAwards.__executeServer(opts));
var saveMatchAwards = createServerFn({ method: "POST" }).validator(object({
	gameNumber: string().trim().min(1).max(80),
	opposition: string().trim().min(1).max(80),
	oppMom: string().trim().max(160),
	playersPlayer: string().trim().max(80),
	managerPlayer: string().trim().max(80)
})).handler(saveMatchAwards_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const squad = await loadActiveSquad(sql);
	const oppMom = data.oppMom ? squadMom(data.oppMom, squad) : null;
	const playersPlayer = data.playersPlayer && squad.includes(data.playersPlayer) ? data.playersPlayer : null;
	const managerPlayer = data.managerPlayer && squad.includes(data.managerPlayer) ? data.managerPlayer : null;
	if (data.oppMom && !oppMom) return {
		success: false,
		error: "Opposition MOM must be a squad player."
	};
	if (data.playersPlayer && !playersPlayer) return {
		success: false,
		error: "Players’ player must be a squad player."
	};
	if (data.managerPlayer && !managerPlayer) return {
		success: false,
		error: "Manager’s player must be a squad player."
	};
	try {
		await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, manager_player, updated_at)
        values (${data.gameNumber}, ${data.opposition}, ${oppMom}, ${playersPlayer}, ${managerPlayer}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          manager_player = excluded.manager_player,
          updated_at = now()
      `;
	} catch {
		await sql`
        insert into match_awards (game_number, opposition, opp_mom, players_player, updated_at)
        values (${data.gameNumber}, ${data.opposition}, ${oppMom}, ${playersPlayer}, now())
        on conflict (game_number, opposition) do update set
          opp_mom = excluded.opp_mom,
          players_player = excluded.players_player,
          updated_at = now()
      `;
	}
	return { success: true };
});
var resetParentVotes_createServerFn_handler = createServerRpc({
	id: "1572017c3e3cd9a1b0d41d2653a6e81a8b205086f220260bec287b5fa4c16853",
	name: "resetParentVotes",
	filename: "src/lib/coach-actions.ts"
}, (opts) => resetParentVotes.__executeServer(opts));
var resetParentVotes = createServerFn({ method: "POST" }).validator(object({ confirm: string().trim() })).handler(resetParentVotes_createServerFn_handler, async ({ data }) => {
	if (data.confirm !== "RESET VOTES") return {
		success: false,
		error: "Type RESET VOTES to confirm."
	};
	await (await getSql())`delete from votes`;
	return { success: true };
});
var savePlayerNote_createServerFn_handler = createServerRpc({
	id: "b112f4d26fad8119e48cdc22332ecb1f927560a194d7547731cff7c8983443b2",
	name: "savePlayerNote",
	filename: "src/lib/coach-actions.ts"
}, (opts) => savePlayerNote.__executeServer(opts));
var savePlayerNote = createServerFn({ method: "POST" }).validator(object({
	player: string().trim().min(1).max(80),
	note: string().trim().max(500)
})).handler(savePlayerNote_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	if (!(await loadActiveSquad(sql)).includes(data.player)) return {
		success: false,
		error: "Pick a squad player."
	};
	if (!data.note) {
		await sql`delete from player_notes where player = ${data.player}`;
		return { success: true };
	}
	await sql`
      insert into player_notes (player, note, updated_at)
      values (${data.player}, ${data.note}, now())
      on conflict (player) do update set
        note = excluded.note,
        updated_at = now()
    `;
	return { success: true };
});
//#endregion
export { getCoachData_createServerFn_handler, resetParentVotes_createServerFn_handler, saveMatchAwards_createServerFn_handler, savePlayerNote_createServerFn_handler };
