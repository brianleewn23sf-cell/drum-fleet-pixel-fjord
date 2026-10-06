import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as TEAM_NAME, l as MOTTO_EN, n as APP_BUILD_DATE, o as CLUB_NAME, t as APP_BUILD, u as MOTTO_LATIN } from "./brand-C_wD2nfD.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { w as sendWhatsApp } from "./whatsapp-BM3bb8QP.mjs";
import { s as Share2, u as RefreshCw } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-opacity duration-150 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-accent/70", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-elevated",
			outline: "border border-border bg-surface text-fg hover:bg-elevated"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			icon: "size-11",
			lg: "h-12 px-5"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function navClass(active) {
	return cn("inline-flex h-11 shrink-0 items-center justify-center rounded-md px-3 text-center text-xs font-semibold uppercase tracking-wide sm:w-full sm:px-1", active ? "bg-accent text-accent-fg" : "border border-border bg-surface text-fg");
}
function decodeShare(href) {
	try {
		return new URL(href).searchParams.get("text") || href;
	} catch {
		return href;
	}
}
function AppHeader({ onRefresh, refreshing, boardLink, shareHref }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-10 border-b border-border bg-bg/95 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-4 sm:pb-3 sm:pt-[max(0.75rem,env(safe-area-inset-top))]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/bulls-crest.jpg",
					alt: `${CLUB_NAME} ${TEAM_NAME} crest`,
					width: 64,
					height: 64,
					decoding: "async",
					className: "size-10 shrink-0 rounded-lg object-cover ring-1 ring-border sm:size-16"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] font-semibold uppercase tracking-widest text-muted sm:text-xs",
							children: [
								CLUB_NAME,
								" · ",
								APP_BUILD,
								" · ",
								APP_BUILD_DATE
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl font-bold uppercase leading-none tracking-tight text-fg sm:text-2xl",
							children: TEAM_NAME
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 hidden font-display text-sm font-bold uppercase tracking-widest text-accent sm:block",
							children: MOTTO_LATIN
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hidden text-xs text-muted sm:block",
							children: MOTTO_EN
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [shareHref ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					className: "h-11 shrink-0 px-3",
					onClick: () => {
						const message = decodeShare(shareHref);
						sendWhatsApp(TEAM_NAME, message, "");
						toast.success("WhatsApp is open with the message in the box.");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
				}) : null, onRefresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "icon",
					"aria-label": "Refresh",
					onClick: onRefresh,
					disabled: refreshing,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", refreshing && "animate-spin") })
				}) : null]
			})]
		}), boardLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 flex max-w-full flex-wrap gap-1.5 sm:grid sm:grid-cols-3 sm:gap-2",
			children: [
				["/", "Vote"],
				["/board", "Board"],
				["/how-we-play", "Rules"],
				["/perf", "Performance"],
				["/month", "Month"],
				["/coach", "Coach"],
				["/tactics", "Tactics"]
			].map(([to, label]) => path === to ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: navClass(true),
				children: label
			}, to) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to,
				preload: false,
				className: navClass(false),
				children: label
			}, to))
		}) : null]
	});
}
//#endregion
export { Button as n, AppHeader as t };
