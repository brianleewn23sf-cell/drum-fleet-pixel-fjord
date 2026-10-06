//#region node_modules/.nitro/vite/services/ssr/assets/game-details-k7DhdgXt.js
var NOTES = [{
	match: "pine villa",
	title: "Game details · Pine Villa",
	lines: [
		"If their keeper has the ball in his hands, it is going long.",
		"Drop back straight away.",
		"Win the first ball. If that fails, win the second ball."
	]
}];
function gameDetailsFor(opposition) {
	const key = opposition.toLowerCase();
	return NOTES.find((n) => key.includes(n.match)) ?? null;
}
//#endregion
export { gameDetailsFor as t };
