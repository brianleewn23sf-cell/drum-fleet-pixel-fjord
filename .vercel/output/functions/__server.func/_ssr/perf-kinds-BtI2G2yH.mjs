//#region node_modules/.nitro/vite/services/ssr/assets/perf-kinds-BtI2G2yH.js
var PERF_KINDS = [
	{
		id: "zz50_no",
		label: "50m Zig Zag test · without the ball",
		kind: "zigzag"
	},
	{
		id: "zz50_ball",
		label: "50m Zig Zag test · with the ball",
		kind: "zigzag"
	},
	{
		id: "s30_no",
		label: "Linear speed · without ball",
		kind: "sprint"
	},
	{
		id: "s30_ball",
		label: "Linear speed · with ball",
		kind: "sprint"
	},
	{
		id: "turns",
		label: "Turning with the ball",
		kind: "turns"
	},
	{
		id: "shooting",
		label: "Path2Pro shooting · 6 shots",
		kind: "shooting"
	}
];
function perfKindLabel(id) {
	return PERF_KINDS.find((k) => k.id === id)?.label ?? id;
}
function perfKindFilm(id) {
	return PERF_KINDS.find((k) => k.id === id)?.kind ?? "zigzag";
}
//#endregion
export { perfKindFilm as n, perfKindLabel as r, PERF_KINDS as t };
