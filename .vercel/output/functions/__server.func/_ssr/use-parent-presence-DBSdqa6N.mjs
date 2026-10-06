import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as shortName } from "./players-CZr5uoUS.mjs";
import { c as resumeParentSession, i as isViewAllPlayer, r as checkParentPin } from "./parent-login-a0219ktd.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Button } from "./app-header-COF4H8CL.mjs";
import { i as heartbeatParent, n as FieldLabel, s as parentSessionId } from "./parent-presence-Cn_O1Rtq.mjs";
import { r as LOCAL_UNLOCKS } from "./pins-D3aXuxPO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-parent-presence-DBSdqa6N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PARENT_KEY = "bulls-parent-login";
function readParentSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem("bulls-parent-login") || window.sessionStorage.getItem("bulls-parent-login");
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed?.token || !parsed?.player) return null;
		return parsed;
	} catch {
		return null;
	}
}
function writeParentSession(row) {
	window.localStorage.setItem(PARENT_KEY, JSON.stringify(row));
	window.sessionStorage.setItem(PARENT_KEY, JSON.stringify(row));
}
function clearParentSession() {
	window.localStorage.removeItem(PARENT_KEY);
	window.sessionStorage.removeItem(PARENT_KEY);
}
function openCoach(code) {
	try {
		const hit = LOCAL_UNLOCKS[code] || (code === "0803" ? LOCAL_UNLOCKS["0803"] : null);
		window.sessionStorage.removeItem("bulls-coach-locked");
		window.sessionStorage.setItem("bulls-coach-pin", code);
		window.localStorage.setItem("bulls-coach-pin", code);
		window.localStorage.setItem("bulls-coach-ok", "1");
		if (hit) {
			window.localStorage.setItem("bulls-coach-name", hit.name);
			window.localStorage.setItem("bulls-coach-role", hit.role);
			window.sessionStorage.setItem("bulls-coach-role", hit.role);
		}
	} catch {}
	window.location.assign("/coach");
}
function ParentGate({ children, onSession, hint = "Use the 6-digit family code Brian sent on WhatsApp — not the coach PIN. It unlocks your child’s marks and home tests." }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [pin, setPin] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const onSessionRef = (0, import_react.useRef)(onSession);
	onSessionRef.current = onSession;
	(0, import_react.useEffect)(() => {
		const saved = readParentSession();
		if (!saved) {
			setReady(true);
			return;
		}
		resumeParentSession({ data: { token: saved.token } }).then((res) => {
			if (res.ok) {
				const next = {
					token: saved.token,
					player: res.player,
					family: res.family,
					viewAll: Boolean(res.viewAll)
				};
				writeParentSession(next);
				setSession(next);
				onSessionRef.current?.(next);
			} else {
				clearParentSession();
				onSessionRef.current?.(null);
			}
		}).catch(() => {
			setSession(saved);
			onSessionRef.current?.(saved);
		}).finally(() => setReady(true));
	}, []);
	function pressDigit(digit) {
		const next = (pin + digit).replace(/\D/g, "").slice(0, 8);
		setPin(next);
		setError("");
		if (LOCAL_UNLOCKS[next] || next === "0803") openCoach(next);
	}
	async function unlockWith(raw) {
		const clean = raw.replace(/\D/g, "");
		setPin(clean);
		if (LOCAL_UNLOCKS[clean] || clean === "0803") {
			openCoach(clean);
			return;
		}
		if (clean.length < 4) {
			setError("Enter the 6-digit family code, then Sign in.");
			return;
		}
		setBusy(true);
		setError("");
		try {
			const res = await checkParentPin({ data: { pin: clean } });
			if ("coach" in res && res.coach) {
				openCoach(clean);
				return;
			}
			if (!res.ok) {
				setError(res.error);
				toast.error(res.error);
				return;
			}
			const next = {
				token: res.token,
				player: res.player,
				family: res.family,
				viewAll: Boolean(res.viewAll)
			};
			writeParentSession(next);
			setSession(next);
			onSessionRef.current?.(next);
			toast.success(next.viewAll ? "Signed in as manager — you can view every lad." : `Signed in as ${shortName(res.player)}’s parent.`);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Could not sign in.";
			setError(msg);
			toast.error(msg);
		} finally {
			setBusy(false);
		}
	}
	function logout() {
		clearParentSession();
		setSession(null);
		onSessionRef.current?.(null);
		setPin("");
		setError("");
	}
	if (!ready) return null;
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-4 shadow-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-bold uppercase tracking-tight",
				children: "Parent login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-7 text-muted",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3",
				onSubmit: (e) => {
					e.preventDefault();
					unlockWith(document.getElementById("family-code")?.value || pin);
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "family-code",
						children: "Family code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "family-code",
						name: "pin",
						type: "tel",
						inputMode: "numeric",
						autoComplete: "one-time-code",
						value: pin,
						maxLength: 8,
						placeholder: "6 digits",
						"aria-label": "Family code",
						className: "mt-1 h-14 w-full rounded-xl border border-border bg-bg text-center font-display text-3xl font-bold tracking-[0.35em] text-fg outline-none focus:ring-2 focus:ring-accent/50",
						onChange: (e) => {
							const next = e.target.value.replace(/\D/g, "").slice(0, 8);
							setPin(next);
							setError("");
							if (LOCAL_UNLOCKS[next] || next === "0803") openCoach(next);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "mt-3 h-12 w-full",
						disabled: busy || pin.length < 4,
						children: busy ? "Signing in…" : "Sign in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-3 gap-2",
						children: [
							[
								"1",
								"2",
								"3",
								"4",
								"5",
								"6",
								"7",
								"8",
								"9"
							].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-12 rounded-md border border-border bg-bg font-display text-lg font-bold text-fg",
								onClick: () => pressDigit(d),
								children: d
							}, d)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-12 rounded-md border border-border bg-bg text-xs font-semibold uppercase tracking-wide text-muted",
								onClick: () => {
									setPin("");
									setError("");
								},
								children: "Clear"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-12 rounded-md border border-border bg-bg font-display text-lg font-bold text-fg",
								onClick: () => pressDigit("0"),
								children: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "h-12 rounded-md border border-border bg-bg text-xs font-semibold uppercase tracking-wide text-muted",
								onClick: () => setPin((p) => p.slice(0, -1)),
								children: "Del"
							})
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-semibold text-accent",
						children: error
					}) : null
				]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: session.viewAll || isViewAllPlayer(session.player) ? "Manager · view all" : shortName(session.player)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: session.viewAll || isViewAllPlayer(session.player) ? " · every lad’s marks" : " · parent signed in"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-xs font-semibold uppercase tracking-wide text-accent",
				onClick: logout,
				children: "Sign out"
			})]
		}), children(session)]
	});
}
function useParentPresence(child, page) {
	(0, import_react.useEffect)(() => {
		const sid = parentSessionId();
		if (!sid) return;
		const beat = () => {
			heartbeatParent({ data: {
				sid,
				child: child || "",
				page
			} });
		};
		beat();
		const t = setInterval(beat, 8e3);
		return () => clearInterval(t);
	}, [child, page]);
}
//#endregion
export { useParentPresence as n, ParentGate as t };
