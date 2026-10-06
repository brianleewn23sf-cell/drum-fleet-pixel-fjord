import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kit-graphic-DfF3Ly7S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KitGraphic({ kit, number, className }) {
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const home = kit === "home";
	const hoopA = home ? "var(--color-accent)" : "var(--color-kit-navy)";
	const hoopB = home ? "var(--color-bg)" : "var(--color-fg)";
	const shorts = home ? "var(--color-bg)" : "var(--color-fg)";
	const socks = home ? "var(--color-bg)" : "var(--color-kit-navy)";
	const numFill = home ? "var(--color-fg)" : "var(--color-kit-gold)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 28 44",
		className: cn("block w-9", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pattern", {
				id: `hoop-${uid}`,
				patternUnits: "userSpaceOnUse",
				width: "28",
				height: "6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "28",
					height: "3",
					fill: hoopA
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					y: "3",
					width: "28",
					height: "3",
					fill: hoopB
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: `shirt-${uid}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 6 L12 4 L16 4 L20 6 L26 10 L23 14 L21 12 L21 24 Q14 26 7 24 L7 12 L5 14 L2 10 Z" })
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				clipPath: `url(#shirt-${uid})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "0",
					y: "2",
					width: "28",
					height: "26",
					fill: `url(#hoop-${uid})`
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 6 L12 4 L16 4 L20 6 L26 10 L23 14 L21 12 L21 24 Q14 26 7 24 L7 12 L5 14 L2 10 Z",
				fill: "none",
				stroke: home ? "var(--color-bg)" : "var(--color-kit-navy)",
				strokeWidth: "0.6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "24",
				width: "12",
				height: "8",
				rx: "1",
				fill: shorts
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "8",
				y: "32",
				width: "4.5",
				height: "9",
				rx: "1",
				fill: socks
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "15.5",
				y: "32",
				width: "4.5",
				height: "9",
				rx: "1",
				fill: socks
			}),
			number ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "14",
				y: "18",
				textAnchor: "middle",
				fill: numFill,
				fontSize: "7",
				fontWeight: "700",
				fontFamily: "Barlow Condensed, sans-serif",
				children: number
			}) : null
		]
	});
}
//#endregion
export { KitGraphic as t };
