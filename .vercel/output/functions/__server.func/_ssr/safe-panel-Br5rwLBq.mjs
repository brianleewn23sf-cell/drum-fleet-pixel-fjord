import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as shortName } from "./players-CZr5uoUS.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safe-panel-Br5rwLBq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlayedPicker({ players, selected, onChange }) {
	const set = new Set(selected);
	function toggle(name) {
		if (set.has(name)) onChange(selected.filter((p) => p !== name));
		else onChange([...selected, name]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-2 flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-wider text-muted",
				children: [
					"Who played · ",
					selected.length,
					"/",
					players.length
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-semibold uppercase tracking-wide text-accent",
					onClick: () => onChange([...players]),
					children: "All"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-xs font-semibold uppercase tracking-wide text-muted",
					onClick: () => onChange([]),
					children: "None"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-1",
			children: players.map((p) => {
				const on = set.has(p);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => toggle(p),
					className: cn("flex h-11 items-center rounded-md border px-2 text-left text-sm", on ? "border-accent bg-accent-soft font-semibold text-fg" : "border-border bg-elevated text-muted line-through"),
					children: shortName(p)
				}, p);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs leading-snug text-muted",
			children: "Leave blank until after the game. Tick only the lads who played."
		})
	] });
}
var SafePanel = class extends import_react.Component {
	state = { err: null };
	static getDerivedStateFromError(err) {
		return { err };
	}
	componentDidCatch(err, info) {
		console.error(this.props.label || "panel", err, info);
	}
	render() {
		if (this.state.err) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-surface p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-bold uppercase",
				children: "Couldn’t load this bit"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: [this.state.err.message || "Unexpected error.", " Tap Reload, then open Pitch again."]
			})]
		});
		return this.props.children;
	}
};
//#endregion
export { SafePanel as n, PlayedPicker as t };
