//#region node_modules/.nitro/vite/services/ssr/assets/pins-D3aXuxPO.js
var FALLBACK_PIN = "0803";
var FALLBACK_NAME = "Brian Lee";
var SHARED_SEATS = [
	{
		name: "Brian Lee",
		role: "admin"
	},
	{
		name: "Connor Lee",
		role: "admin"
	},
	{
		name: "Cullen Atkinson-Lee",
		role: "coach"
	}
];
/** Codes that must open even if the server is slow. */
var LOCAL_UNLOCKS = {
	"0803": {
		name: "Brian Lee",
		role: "admin"
	},
	"123456": {
		name: "Dave Bailey",
		role: "coach"
	},
	"654321": {
		name: "Gavin Massey",
		role: "coach"
	}
};
function seatForName(name) {
	const n = name.trim().toLowerCase();
	return SHARED_SEATS.find((s) => s.name.toLowerCase() === n) ?? null;
}
//#endregion
export { seatForName as i, FALLBACK_PIN as n, LOCAL_UNLOCKS as r, FALLBACK_NAME as t };
