import { r as __exportAll } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { A as toCrossJSONStream, B as invariant, C as require_jsx_runtime, D as fromJSON, F as resolveManifestAssetLink, I as resolveManifestCssLink, J as rootRouteId, K as isRedirect, L as waitForReason, N as getScriptPreloadAttrs, P as getStylesheetHref, R as _getRenderedMatches, U as isDangerousProtocol, W as isPromise, Y as isNotFound, a as disposeSsrResponse, c as replaceSsrResponse, h as RouterProvider, i as defineHandlerCallback, k as toCrossJSONAsync, l as stripSsrResponseBody, o as isSsrResponse, q as parseRedirect, r as bindSsrResponseToRequest, s as normalizeSsrResponse, t as renderRouterToStream, z as executeRewriteInput } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createServerHistory } from "../_libs/tanstack__history.mjs";
import { a as defaultSerovalDeserializerPlugins, i as createRawStreamRPCPlugin, n as attachRouterServerSsrUtils, o as makeSerovalPlugin, r as getNormalizedURL, s as createSerializationAdapter, t as mergeHeaders } from "../_libs/@tanstack/router-core+[...].mjs";
import { n as toResponse, t as H3Event } from "../_libs/h3-v2+rou3.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll({
	createServerEntry: () => createServerEntry,
	default: () => server_default,
	n: () => TSS_SERVER_FUNCTION,
	r: () => getServerFnById,
	t: () => createServerFn
});
require_react();
var import_jsx_runtime = require_jsx_runtime();
function StartServer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider, { router: props.router });
}
var defaultStreamHandler = defineHandlerCallback(({ request, router, responseHeaders }) => renderRouterToStream({
	request,
	router,
	responseHeaders,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartServer, { router })
}));
var GLOBAL_EVENT_STORAGE_KEY = Symbol.for("tanstack-start:event-storage");
var globalObj$1 = globalThis;
if (!globalObj$1[GLOBAL_EVENT_STORAGE_KEY]) globalObj$1[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj$1[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
	return (typeof value === "object" || typeof value === "function") && value !== null && typeof value.then === "function";
}
function getSetCookieValues(headers) {
	const headersWithSetCookie = headers;
	if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
	const value = headers.get("set-cookie");
	return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
	if (response.ok) return;
	const eventSetCookies = getSetCookieValues(event.res.headers);
	if (eventSetCookies.length === 0) return;
	const responseSetCookies = getSetCookieValues(response.headers);
	response.headers.delete("set-cookie");
	for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
	for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function finalizeResponse(value, event) {
	const response = ensureResponse(value);
	mergeEventResponseHeaders(response, event);
	return response;
}
function finalizeMaybeResponse(value, event) {
	if (isPromiseLike(value)) return Promise.resolve(value).then((resolved) => finalizeResponse(resolved, event), (error) => finalizeResponse(handleResponseError(error), event));
	return finalizeResponse(value, event);
}
function ensureResponse(value) {
	if (value instanceof Response) return value;
	return new Response("Internal Server Error", { status: 500 });
}
function handleResponseError(error) {
	if (error instanceof Response) return error;
	if (error instanceof Error) throw error;
	return new Response("Internal Server Error", { status: 500 });
}
function requestHandler(handler) {
	return (request, requestOpts) => {
		let h3Event;
		try {
			h3Event = new H3Event(request);
		} catch (error) {
			if (error instanceof URIError) return new Response(null, {
				status: 400,
				statusText: "Bad Request"
			});
			throw error;
		}
		let response;
		try {
			response = eventStorage.run({ h3Event }, () => handler(request, requestOpts));
		} catch (error) {
			response = handleResponseError(error);
		}
		return toResponse(finalizeMaybeResponse(response, h3Event), h3Event);
	};
}
function getH3Event() {
	const event = eventStorage.getStore();
	if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return event.h3Event;
}
function getResponse() {
	return getH3Event().res;
}
var HEADERS = { TSS_SHELL: "X-TSS_SHELL" };
/**
* @description Returns the router manifest data that should be sent to the client.
* This includes only the assets and preloads for the current route and any
* special assets that are needed for the client. It does not include relationships
* between routes or any other data that is not needed for the client.
*
* @param matchedRoutes - In dev mode, the matched routes are used to build
* the dev styles URL for route-scoped CSS collection.
*/
async function getStartManifest(matchedRoutes) {
	const { tsrStartManifest } = await import("../_tanstack-start-manifest_v-r8I1YrH0.mjs");
	const startManifest = tsrStartManifest();
	let routes = startManifest.routes;
	routes[rootRouteId];
	const manifestRoutes = {};
	for (const k in routes) {
		const v = routes[k];
		const result = {};
		if (v.preloads && v.preloads.length > 0) result.preloads = v.preloads;
		if (v.scripts && v.scripts.length > 0) result.scripts = v.scripts;
		if (v.css?.length) result.css = v.css;
		if (result.preloads || result.scripts || result.css) manifestRoutes[k] = result;
	}
	return {
		...startManifest.scriptFormat ? { scriptFormat: startManifest.scriptFormat } : {},
		...startManifest.inlineCss ? { inlineCss: startManifest.inlineCss } : {},
		routes: manifestRoutes
	};
}
var manifest = {
	"0194d38fff5bb2278d06f5bc59c37a5a6c8ca91b958431a3a91f3ba5b2b255b7": {
		functionName: "liveBench_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"01a504ddd7f7444600c7da6157dea122908369ee5c0813770d05a43555fff9dc": {
		functionName: "getInitialData_createServerFn_handler",
		importer: () => import("./vote-actions-BVyXsHAS.mjs")
	},
	"03a33c10fa0a944c9af60832b446c3df3e71a18d1b4d79073d7c6a3d1f2968b5": {
		functionName: "submitCoachPerf_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"07c6108479b017c8c0ba182af05f84239efcc885146540ca7fec07947e9060e5": {
		functionName: "heartbeatCoach_createServerFn_handler",
		importer: () => import("./coach-users-DM6JpU12.mjs")
	},
	"08f281f06fcd8d9da4722aa20767ab8d04d97b929e65863785860554fbd70f17": {
		functionName: "listParentLogins_createServerFn_handler",
		importer: () => import("./parent-login-CGiskpk9.mjs")
	},
	"09c945e6ab180cef49e746f64c48524d86f1bae92c3ef403e9973a79d417d339": {
		functionName: "listParentPerf_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"0ba188fd228e666faba702dfebe18f10fdb34eb4733cf42864382931da05ad01": {
		functionName: "startLive_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"10b78cb9f0ac920ea74ec7e5e3d336d9328e4e2952ba4799ee772f05227a9897": {
		functionName: "getLiveMatch_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"14dcf70485d0c456f529716cf82af6035e26c08fe421be797ffb18af39e98d29": {
		functionName: "getCoachData_createServerFn_handler",
		importer: () => import("./coach-actions-49pRtzAd.mjs")
	},
	"154993af67964e4f635431e28041da7bcf936eeb1dfee102dd10d93db4a90b01": {
		functionName: "saveCoachVote_createServerFn_handler",
		importer: () => import("./vote-actions-BVyXsHAS.mjs")
	},
	"1572017c3e3cd9a1b0d41d2653a6e81a8b205086f220260bec287b5fa4c16853": {
		functionName: "resetParentVotes_createServerFn_handler",
		importer: () => import("./coach-actions-49pRtzAd.mjs")
	},
	"15f7c17fbc922bbd554522b6761918a42c9610704befc5345b2ed7310558ea2e": {
		functionName: "liveMove_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"1712fb73c022ed9adc12b43eb469a73e703f010e2e72ffad3315dbec75495c3e": {
		functionName: "issueParentLogins_createServerFn_handler",
		importer: () => import("./parent-login-CGiskpk9.mjs")
	},
	"1acde48274c6653ba71bf6d988118e7fdc3b34d0330a9d1a3952675051c0bbda": {
		functionName: "heartbeatParent_createServerFn_handler",
		importer: () => import("./parent-presence-x84_pS7k.mjs")
	},
	"1bd11a6ba494e5a2e03fcef8e2bc9008846c948191d61e96a1da4fff35146259": {
		functionName: "recordLouieSprint_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"1e55fe45d0b811f24d2f388b93278d3185f13b4d8e5c0f3f4a59613c39e7a8c2": {
		functionName: "setParentLogin_createServerFn_handler",
		importer: () => import("./parent-login-CGiskpk9.mjs")
	},
	"1ea964ccb4a3d8aa8f913eb7ea55ce31e234f8bc2224bdc53e452424e223ca65": {
		functionName: "getScoreExtras_createServerFn_handler",
		importer: () => import("./score-actions-DiyMFyfW.mjs")
	},
	"2302f5096ceb089948e4027485616233e37065c570d678f30054253990b417bf": {
		functionName: "saveTraining_createServerFn_handler",
		importer: () => import("./training-actions-BeoCkPKv.mjs")
	},
	"2cf931b3d4692a47ff956fc1f5589fe4baae4c9d91be90a6e493cb9f87708d76": {
		functionName: "getMatchStats_createServerFn_handler",
		importer: () => import("./match-stats-actions-DMFbVFV5.mjs")
	},
	"33fde8af0734bb7690828be1130bb03bf6e15b02599012871d4c34cb33a26be4": {
		functionName: "recordLeagueResult_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"342b9fd2ea4833f79d71c86b985a0cb5b9540c0ac49773ada0675fbafb989e73": {
		functionName: "scoreOpenPerf_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"34ce2cbe8c9e10f3837bc75ef99cb45ba1a7ab8a3e0a1c5dd07a124dcc6ead5f": {
		functionName: "setCurrentMatch_createServerFn_handler",
		importer: () => import("./vote-actions-BVyXsHAS.mjs")
	},
	"354981b15578da426efa7ab3772bdeafa2df47aa22ecc1cad6c494592ef49e4d": {
		functionName: "listPerfInbox_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"38abcdaa98ca897ef46b5b7abafd6cfff00ad75a1f783602478fed3ccb9f4a9f": {
		functionName: "scanPerfClip_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"3a20262ca48dcc0b7beb4ffa8312427b4fee7822c125b70eec410dc538903d58": {
		functionName: "removeDemoPlayer_createServerFn_handler",
		importer: () => import("./demo-squad-DvqRPlSO.mjs")
	},
	"3d4751bcd8d7bb76fa0c54c72440a4b903582be78a162064ff74f11f088914e9": {
		functionName: "listAudit_createServerFn_handler",
		importer: () => import("./audit-BXpBrast.mjs")
	},
	"3f95b3c12979029f010c4396e0e9fb7965c47d2c91d0635a0df63cae02c3b5ab": {
		functionName: "saveMatchAwards_createServerFn_handler",
		importer: () => import("./coach-actions-49pRtzAd.mjs")
	},
	"47fa8d0d5a6b7f5a387b91048ff090dcd6a9b0fb8b6761111904f63f25d9147f": {
		functionName: "addDivisionTeam_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"4afddbfc838070104451475c9f5db8bef0d510e3c4ad690001a41697828e631f": {
		functionName: "leaveCoach_createServerFn_handler",
		importer: () => import("./coach-users-DM6JpU12.mjs")
	},
	"4f278575934ce5b88ecb7fa90497f6616067870a2cedb2e85e302c59484d0c8c": {
		functionName: "checkCoachPin_createServerFn_handler",
		importer: () => import("./coach-users-DM6JpU12.mjs")
	},
	"52ed33b9b98e66396f02128e4d957fc32dad60cf3d5f7788b585f9080161c6c7": {
		functionName: "saveFixtureAwards_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"57a1f951ab6683bbb6d807e2cee35f453a02c0a7d42fecb3521697442ebeddc1": {
		functionName: "submitVotes_createServerFn_handler",
		importer: () => import("./vote-actions-BVyXsHAS.mjs")
	},
	"58a56cd4d8e8ad191b8872589a47a9d2c94c9aef45d1717a16290f019daf255c": {
		functionName: "listCoachUsers_createServerFn_handler",
		importer: () => import("./coach-users-DM6JpU12.mjs")
	},
	"5b803ffc5de4d2734b06e88f10b5669348dae3417a5f48fe7ccc28b23fd28c7a": {
		functionName: "saveDivisionStanding_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"616b8ca9702025addd2c2dcdc3b0f4ed6beaef07f218b4ed6812b9d2eb970dbe": {
		functionName: "addDemoPlayer_createServerFn_handler",
		importer: () => import("./demo-squad-DvqRPlSO.mjs")
	},
	"73ea935c314b4652f78b467a0209d16bf1153f166e683063dd3361c8b2f0c1fc": {
		functionName: "getTrainerYear_createServerFn_handler",
		importer: () => import("./potm-actions-CiX9OYqk.mjs")
	},
	"796819d44e97fec3676e493cff23c67b44b2bb0e899aa97813e81bf746c0e768": {
		functionName: "saveMatchStats_createServerFn_handler",
		importer: () => import("./match-stats-actions-DMFbVFV5.mjs")
	},
	"79e321ffc4d1cf01345c8d4c512d8e418559231e40df16b8a0e6d69742dea5e2": {
		functionName: "peekPerfFrames_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"82f718efc2bf0885613f992fb42ad4fa1cb9145dfb8d43b3c67a6e390b2aea8e": {
		functionName: "getMatchPlans_createServerFn_handler",
		importer: () => import("./pitch-actions-DS7Jvk1S.mjs")
	},
	"8379976b0ed6dbb99fef817e4fcaca9106489933897ecff1c36b901b6463ecda": {
		functionName: "pauseLive_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"844e1804fec5a41884f5adccb7bd7f63900220b12e730e32b8d0a35ea090f8bc": {
		functionName: "getPotm_createServerFn_handler",
		importer: () => import("./potm-actions-CiX9OYqk.mjs")
	},
	"88c1c86b7c7293c47eb409e7b8a388e5c7a8b7216176c4452289d2c0730d863f": {
		functionName: "addCoachUser_createServerFn_handler",
		importer: () => import("./coach-users-DM6JpU12.mjs")
	},
	"8ee3c7014647a593769d2cfde28ee6be24d0eb74816ff32bcccfe3fd23135c1c": {
		functionName: "awardPotm_createServerFn_handler",
		importer: () => import("./potm-actions-CiX9OYqk.mjs")
	},
	"8fbb2c4d124ba06e4e8891ddc152d5b867f9a0a6bfe3324771e5fbaef4bbbf45": {
		functionName: "resetLive_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"94b5abcd60c9206addb8efcb7ddd7379e0b0c311d94a70cb951e9b2c3963510e": {
		functionName: "getBoardTotals_createServerFn_handler",
		importer: () => import("./score-actions-DiyMFyfW.mjs")
	},
	"95bad6a1b1748befc8ab5ce8934cd0dcfb25d75765a1ea7f6885809d728c767b": {
		functionName: "liveOn_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"969b7a4cf724523ef485f6e1b608bc3d96390ff1002de30f644e7cfa094b33fa": {
		functionName: "removeCoachUser_createServerFn_handler",
		importer: () => import("./coach-users-DM6JpU12.mjs")
	},
	"9b8fbfb797a0dfebbd0b8cb88e87a036d4e457c7b862d3b19d4f48063c764da0": {
		functionName: "addSquadPlayer_createServerFn_handler",
		importer: () => import("./squad-C5g_z0B2.mjs")
	},
	"9e170bc821f5c5805f6607e218b26ebbaf12fb960a2903268133115790076193": {
		functionName: "liveSub_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"9e41157d51d7e3b4492947337723b8cc83a427db7551069ba4b72c513a9b56b4": {
		functionName: "removeSquadPlayer_createServerFn_handler",
		importer: () => import("./squad-C5g_z0B2.mjs")
	},
	"a1480c73af2acc62f891480d8db979082ae2c5ab01a4fc2a676277d57c6d5f56": {
		functionName: "saveFitnessTest_createServerFn_handler",
		importer: () => import("./fitness-actions-CU8aYup8.mjs")
	},
	"a55442593ef95476683289653ec1a5b4b7a0b083dc394f9d8a7217eef34eaa75": {
		functionName: "liveFormation_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"aa9864e59c8f80674896532e4b787441db45b7b42e35845f5dc4c6ce3810baf4": {
		functionName: "listParentPresence_createServerFn_handler",
		importer: () => import("./parent-presence-x84_pS7k.mjs")
	},
	"ad82ab7b2cba2f19afac765687e790259561a06d6c68fc013d35b10847ee61bc": {
		functionName: "submitPerfClip_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"adcc72a5007caca85969249dec50ae13d05bd8f7b9627dcb1da7fe3b4ca64904": {
		functionName: "getLeagueData_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"b112f4d26fad8119e48cdc22332ecb1f927560a194d7547731cff7c8983443b2": {
		functionName: "savePlayerNote_createServerFn_handler",
		importer: () => import("./coach-actions-49pRtzAd.mjs")
	},
	"b1a8a7db31b5635ebc3c696a3b05be7101e1ea4bbaa3e42341675d1e43ceac13": {
		functionName: "getAllMinutes_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"b2af2800dced0e6db20c7eb1ce0f6341127f0b21dfb68c2cdb0e113654f576d4": {
		functionName: "assessPerf_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"b6de995d66f5557a9e6ecdda5b6ef57b0799befef65f669ca7ab0134d9e9cb47": {
		functionName: "saveMatchGoals_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"bd8c8b00f342f85301ac376aebabd2610281634b84c8e500df640845a3bbeee2": {
		functionName: "getAppearances_createServerFn_handler",
		importer: () => import("./appearance-actions-Do9uO7_k.mjs")
	},
	"c5e8f8e2b93408f7c5fa5a2531e07e5ddf320e13d3100541f5cd8e2b2f4f1a77": {
		functionName: "fullTimeLive_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"c757eea51e19890ce927dc4e379ff68e00e026f9621f9425f06e3287ba77eb3e": {
		functionName: "resumeParentSession_createServerFn_handler",
		importer: () => import("./parent-login-CGiskpk9.mjs")
	},
	"ca9b0bdd986da4568b26eb63f498e532c0c0a44524647248a6946e2f399e2824": {
		functionName: "secondHalfLive_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"cc1c2b895defc5eea7c618795cfba3826a9a1b13e573d1f5c0a6a985df2e3932": {
		functionName: "wipeYesterdayTests_createServerFn_handler",
		importer: () => import("./perf-submissions-0ZTtD31u.mjs")
	},
	"cce59645373fa4d040955c50ba69e3abcc3934cf3846a004bc4e22edd28b27d7": {
		functionName: "listPerfUsers_createServerFn_handler",
		importer: () => import("./parent-presence-x84_pS7k.mjs")
	},
	"db99e0cdc34400b501293cb0e994e428d3db716171ef6ec080667a3d3076d58d": {
		functionName: "listDemoPlayers_createServerFn_handler",
		importer: () => import("./demo-squad-DvqRPlSO.mjs")
	},
	"dc4cb165c1857d75aaaebaf06131863304292d5af5a17820e28b723e1a41ddfa": {
		functionName: "getTraining_createServerFn_handler",
		importer: () => import("./training-actions-BeoCkPKv.mjs")
	},
	"debe10449e40a1948a18dda26ac1304a2b1c8903a72bce52b286651bae96ac2e": {
		functionName: "saveMatchPlan_createServerFn_handler",
		importer: () => import("./pitch-actions-DS7Jvk1S.mjs")
	},
	"e37748175468315031130692acb336a22b18721b8bedd06d5477e92b0f6b896f": {
		functionName: "resumeLive_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"e7ea66d472e42b5d760f5bdd12481bb239cc1bbeaf590736b948d1f54a434ea9": {
		functionName: "checkParentPin_createServerFn_handler",
		importer: () => import("./parent-login-CGiskpk9.mjs")
	},
	"ea192e479e51fe740b3ed93bed63c7c9c59a48b21e867b51e75bb00a7887ed69": {
		functionName: "syncLeagueFromFa_createServerFn_handler",
		importer: () => import("./league-actions-Cekh6alg.mjs")
	},
	"ee6c5a33a6a73f9dde7deaa121d8260734dd5cef659fb5460d1f4357ccd02388": {
		functionName: "saveAppearances_createServerFn_handler",
		importer: () => import("./appearance-actions-Do9uO7_k.mjs")
	},
	"eec0cf2ae60ba71cbd665c53b8df485f2330ba42c0ef5451eef61550c3ca30f7": {
		functionName: "liveOff_createServerFn_handler",
		importer: () => import("./live-actions-VUqvWUeC.mjs")
	},
	"fc81d78944a65cc1bc0a5b854770b5a4a3028d049f4b59571519e53cd2994863": {
		functionName: "listSquad_createServerFn_handler",
		importer: () => import("./squad-C5g_z0B2.mjs")
	},
	"ff0056a50752d590da573405e2c50951e8b3970abe0d1dcbd5507e74410bb517": {
		functionName: "getFitnessTests_createServerFn_handler",
		importer: () => import("./fitness-actions-CU8aYup8.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
/** Content-Type for multiplexed framed responses (RawStream support) */
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
/** Largest payload accepted by one framed-protocol record. */
var MAX_FRAME_PAYLOAD_SIZE = 16777216;
/** Largest number of raw streams accepted in one framed response. */
var MAX_FRAMED_STREAMS = 1024;
/** Full Content-Type header value with version parameter */
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
var GLOBAL_STORAGE_KEY = Symbol.for("tanstack-start:start-storage-context");
var globalObj = globalThis;
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
	return startStorage.run(context, fn);
}
function getStartContext(opts) {
	const context = startStorage.getStore();
	if (!context && opts?.throwIfNotFound !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return context;
}
var getStartOptions = () => getStartContext().startOptions;
/** Start's serialization adapters followed by `routerPlugins`. */
function getSerovalPlugins(routerPlugins) {
	return [...(getStartOptions()?.serializationAdapters)?.map(makeSerovalPlugin) ?? [], ...routerPlugins];
}
/**
* Binary frame protocol for multiplexing JSON and raw streams over HTTP.
*
* Frame format: [type:1][streamId:4][length:4][payload:length]
* - type: 1 byte - frame type (JSON, CHUNK, END, ERROR)
* - streamId: 4 bytes big-endian uint32 - stream identifier
* - length: 4 bytes big-endian uint32 - payload length
* - payload: variable length bytes
*/
/** Cached TextEncoder for frame encoding */
var textEncoder$1 = new TextEncoder();
/** Shared empty payload for END frames - avoids allocation per call */
var EMPTY_PAYLOAD = /* @__PURE__ */ new Uint8Array(0);
var MAX_ERROR_MESSAGE_CODE_UNITS = 4096;
/**
* Encodes a single frame with header and payload.
*/
function encodeFrame(type, streamId, payload) {
	if (payload.byteLength > 16777216) throw new RangeError(`Frame payload exceeds ${MAX_FRAME_PAYLOAD_SIZE} bytes`);
	const frame = new Uint8Array(9 + payload.length);
	frame[0] = type;
	frame[1] = streamId >>> 24 & 255;
	frame[2] = streamId >>> 16 & 255;
	frame[3] = streamId >>> 8 & 255;
	frame[4] = streamId & 255;
	frame[5] = payload.length >>> 24 & 255;
	frame[6] = payload.length >>> 16 & 255;
	frame[7] = payload.length >>> 8 & 255;
	frame[8] = payload.length & 255;
	frame.set(payload, 9);
	return frame;
}
/** Encodes an error message payload, truncated to a bounded length. */
function encodeErrorPayload(error) {
	const originalMessage = error instanceof Error ? error.message : String(error ?? "Unknown error");
	const message = originalMessage.length > MAX_ERROR_MESSAGE_CODE_UNITS ? `${originalMessage.slice(0, MAX_ERROR_MESSAGE_CODE_UNITS)}…` : originalMessage;
	return textEncoder$1.encode(message);
}
/**
* Creates a multiplexed ReadableStream from serialized response records.
*
* A record's JSON frame is admitted before any raw stream referenced by that
* record starts. Raw streams from admitted records are pumped concurrently.
* The caller bounds the stream count before records reach this function.
*/
function createMultiplexedStream(recordStream, options = {}) {
	let controller;
	let stopped = false;
	let activePumps = 0;
	let wakeDemand;
	let admission;
	const readers = /* @__PURE__ */ new Set();
	const pendingRawStreams = /* @__PURE__ */ new Set();
	const abortOutput = () => errorOutput(options.signal?.reason);
	const wakeAdmission = () => {
		const wake = wakeDemand;
		wakeDemand = void 0;
		wake?.();
	};
	const cancelReader = (reader, reason) => {
		reader.cancel(reason).catch(() => {});
	};
	const cancelStream = (stream, reason) => {
		stream.cancel(reason).catch(() => {});
	};
	const stop = (reason) => {
		if (stopped) return false;
		stopped = [reason];
		options.signal?.removeEventListener("abort", abortOutput);
		wakeAdmission();
		for (const reader of readers) cancelReader(reader, reason);
		for (const stream of pendingRawStreams) cancelStream(stream, reason);
		pendingRawStreams.clear();
		return true;
	};
	const errorOutput = (error) => {
		if (!stop(error)) return;
		try {
			controller.error(error);
		} catch {}
	};
	const waitForDemand = async () => {
		while (!stopped && (controller.desiredSize ?? 0) <= 0) await new Promise((resolve) => {
			wakeDemand = resolve;
		});
		return !stopped;
	};
	const admitFrame = (type, streamId, payload) => {
		if (stopped) return false;
		if (!admission && (controller.desiredSize ?? 0) > 0) {
			controller.enqueue(encodeFrame(type, streamId, payload));
			return true;
		}
		const runAdmission = async () => {
			if (!await waitForDemand()) return false;
			controller.enqueue(encodeFrame(type, streamId, payload));
			return true;
		};
		const result = admission ? admission.then(runAdmission) : runAdmission();
		const clearAdmission = () => {
			if (admission === tail) admission = void 0;
		};
		const tail = result.then(clearAdmission, clearAdmission);
		admission = tail;
		return result;
	};
	const maybeClose = () => {
		if (activePumps !== 0 || !stop()) return;
		try {
			controller.close();
		} catch {}
	};
	const startPump = (pump) => {
		activePumps++;
		pump().then(() => {
			activePumps--;
			maybeClose();
		}, (error) => {
			activePumps--;
			errorOutput(error);
		});
	};
	async function pumpRawStream(streamId, stream) {
		const reader = stream.getReader();
		readers.add(reader);
		try {
			while (!stopped) {
				const { done, value } = await reader.read();
				if (stopped) return;
				if (done) {
					const frameAdmission = admitFrame(2, streamId, EMPTY_PAYLOAD);
					if (frameAdmission !== true) await frameAdmission;
					return;
				}
				if (!(value instanceof Uint8Array)) throw new TypeError("RawStream chunks must be Uint8Array");
				let offset = 0;
				do {
					const frameAdmission = admitFrame(1, streamId, value.byteLength <= 16777216 ? value : value.subarray(offset, offset + MAX_FRAME_PAYLOAD_SIZE));
					if (frameAdmission !== true && (frameAdmission === false || !await frameAdmission)) return;
					offset += MAX_FRAME_PAYLOAD_SIZE;
				} while (offset < value.byteLength);
			}
		} catch (error) {
			if (!stopped) {
				const frameAdmission = admitFrame(3, streamId, encodeErrorPayload(error));
				if (frameAdmission !== true) await frameAdmission;
			}
		} finally {
			readers.delete(reader);
			reader.releaseLock();
		}
	}
	async function pumpRecords() {
		const reader = recordStream.getReader();
		readers.add(reader);
		try {
			while (!stopped) {
				const { done, value } = await reader.read();
				if (stopped) {
					if (!done) for (const registration of value.rawStreams) cancelStream(registration.stream, stopped[0]);
					return;
				}
				if (done) return;
				for (const registration of value.rawStreams) pendingRawStreams.add(registration.stream);
				const frameAdmission = admitFrame(0, 0, value.json);
				if (frameAdmission !== true && (frameAdmission === false || !await frameAdmission)) return;
				for (const registration of value.rawStreams) {
					pendingRawStreams.delete(registration.stream);
					startPump(pumpRawStream.bind(void 0, registration.id, registration.stream));
				}
			}
		} catch (error) {
			if (!stopped) errorOutput(error);
		} finally {
			readers.delete(reader);
			reader.releaseLock();
		}
	}
	return new ReadableStream({
		start(ctrl) {
			controller = ctrl;
			if (options.signal?.aborted) {
				cancelStream(recordStream, options.signal.reason);
				errorOutput(options.signal.reason);
				return;
			}
			options.signal?.addEventListener("abort", abortOutput, { once: true });
			startPump(pumpRecords);
		},
		pull() {
			wakeAdmission();
		},
		cancel(reason) {
			if (stop(reason)) options.onCancel?.(reason);
		}
	});
}
function isSafeKey(key) {
	return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
/**
* Merge target and source into a new null-proto object, filtering dangerous keys.
*/
function safeObjectMerge(target, source) {
	const result = Object.create(null);
	if (target) {
		for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
	}
	if (source && typeof source === "object") {
		for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
	}
	return result;
}
/**
* Create a null-prototype object, optionally copying from source.
*/
function createNullProtoObject(source) {
	if (!source) return Object.create(null);
	const obj = Object.create(null);
	for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
	return obj;
}
var getStartContextServerOnly = getStartContext;
var createServerFn = (options, __opts) => {
	const resolvedOptions = __opts || options || {};
	if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
	const setValidator = (validator) => {
		return createServerFn(void 0, {
			...resolvedOptions,
			validator,
			inputValidator: validator
		});
	};
	const res = {
		options: resolvedOptions,
		middleware: (middleware) => {
			const newMiddleware = [...resolvedOptions.middleware || []];
			middleware.forEach((item) => {
				if (TSS_SERVER_FUNCTION_FACTORY in item) {
					if (item.options.middleware) newMiddleware.push(...item.options.middleware);
				} else newMiddleware.push(item);
			});
			const res = createServerFn(void 0, {
				...resolvedOptions,
				middleware: newMiddleware
			});
			res[TSS_SERVER_FUNCTION_FACTORY] = true;
			return res;
		},
		validator: setValidator,
		inputValidator: setValidator,
		handler: (...args) => {
			const [extractedFn, serverFn] = args;
			const newOptions = {
				...resolvedOptions,
				extractedFn,
				serverFn
			};
			const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
			extractedFn.method = resolvedOptions.method;
			return Object.assign(async (opts) => {
				const result = await executeMiddleware$1(resolvedMiddleware, "client", {
					...extractedFn,
					...newOptions,
					data: opts?.data,
					headers: opts?.headers,
					signal: opts?.signal,
					fetch: opts?.fetch,
					context: createNullProtoObject()
				});
				const redirect = parseRedirect(result.error);
				if (redirect) throw redirect;
				if (result.error) throw result.error;
				return result.result;
			}, {
				...extractedFn,
				method: resolvedOptions.method,
				__executeServer: async (opts) => {
					const startContext = getStartContextServerOnly();
					const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
					return await executeMiddleware$1(resolvedMiddleware, "server", {
						...extractedFn,
						data: opts.data,
						method: opts.method ?? resolvedOptions.method,
						serverFnMeta: extractedFn.serverFnMeta,
						context: safeObjectMerge(opts.context, serverContextAfterGlobalMiddlewares),
						request: startContext.request
					}).then((d) => ({
						result: d.result,
						error: d.error,
						context: d.sendContext
					}));
				}
			});
		}
	};
	const fun = (options) => {
		return createServerFn(void 0, {
			...resolvedOptions,
			...options
		});
	};
	return Object.assign(fun, res);
};
async function executeMiddleware$1(middlewares, env, opts) {
	let flattenedMiddlewares = flattenMiddlewares([...getStartOptions()?.functionMiddleware || [], ...middlewares]);
	if (env === "server") {
		const startContext = getStartContextServerOnly({ throwIfNotFound: false });
		if (startContext?.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
	}
	const callNextMiddleware = async (ctx) => {
		const nextMiddleware = flattenedMiddlewares.shift();
		if (!nextMiddleware) return ctx;
		try {
			let validator = "validator" in nextMiddleware.options ? nextMiddleware.options.validator : void 0;
			if (!validator && "inputValidator" in nextMiddleware.options) validator = nextMiddleware.options.inputValidator;
			if (validator && env === "server") ctx.data = await execValidator(validator, ctx.data);
			let middlewareFn = void 0;
			if (env === "client") {
				if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
			} else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
			if (middlewareFn) {
				const userNext = async (userCtx = {}) => {
					const result = await callNextMiddleware({
						...ctx,
						...userCtx,
						context: safeObjectMerge(ctx.context, userCtx.context),
						sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
						headers: mergeHeaders(ctx.headers, userCtx.headers),
						_callSiteFetch: ctx._callSiteFetch,
						fetch: ctx._callSiteFetch ?? userCtx.fetch ?? ctx.fetch,
						result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
						error: userCtx.error ?? ctx.error
					});
					if (result.error) throw result.error;
					return result;
				};
				const result = await middlewareFn({
					...ctx,
					next: userNext
				});
				if (isRedirect(result)) return {
					...ctx,
					error: result
				};
				if (result instanceof Response) return {
					...ctx,
					result
				};
				if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
				return result;
			}
			return callNextMiddleware(ctx);
		} catch (error) {
			return {
				...ctx,
				error
			};
		}
	};
	return callNextMiddleware({
		...opts,
		headers: opts.headers || {},
		sendContext: opts.sendContext || {},
		context: opts.context || createNullProtoObject(),
		_callSiteFetch: opts.fetch
	});
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
	const seen = /* @__PURE__ */ new Set();
	const flattened = [];
	const recurse = (middleware, depth) => {
		if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
		middleware.forEach((m) => {
			if (m.options.middleware) recurse(m.options.middleware, depth + 1);
			if (!seen.has(m)) {
				seen.add(m);
				flattened.push(m);
			}
		});
	};
	recurse(middlewares, 0);
	return flattened;
}
async function execValidator(validator, input) {
	if (validator == null) return {};
	if ("~standard" in validator) {
		const result = await validator["~standard"].validate(input);
		if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
		return result.value;
	}
	if ("parse" in validator) return validator.parse(input);
	if (typeof validator === "function") return validator(input);
	throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
	return {
		"~types": void 0,
		options: {
			inputValidator: options.validator ?? options.inputValidator,
			client: async ({ next, sendContext, fetch, ...ctx }) => {
				const payload = {
					...ctx,
					context: sendContext,
					fetch
				};
				return next(await options.extractedFn?.(payload));
			},
			server: async ({ next, ...ctx }) => {
				const result = await options.serverFn?.(ctx);
				return next({
					...ctx,
					result
				});
			}
		}
	};
}
var createMiddleware = (options, __opts) => {
	const resolvedOptions = {
		type: "request",
		...__opts || options
	};
	const setValidator = (validator) => {
		return createMiddleware({}, Object.assign(resolvedOptions, {
			validator,
			inputValidator: validator
		}));
	};
	return {
		options: resolvedOptions,
		middleware: (middleware) => {
			return createMiddleware({}, Object.assign(resolvedOptions, { middleware }));
		},
		validator: setValidator,
		inputValidator: setValidator,
		client: (client) => {
			return createMiddleware({}, Object.assign(resolvedOptions, { client }));
		},
		server: (server) => {
			return createMiddleware({}, Object.assign(resolvedOptions, { server }));
		}
	};
};
var innerCreateCsrfMiddleware = (opts = {}) => {
	return createMiddleware().server(async (ctx) => {
		const csrfCtx = ctx;
		if (opts.filter && !await opts.filter(csrfCtx)) return ctx.next();
		if (await isCsrfRequestAllowed(opts, csrfCtx)) return ctx.next();
		return getFailureResponse(opts, csrfCtx);
	});
};
var createCsrfMiddleware = innerCreateCsrfMiddleware;
async function isCsrfRequestAllowed(opts, ctx) {
	const result = await getCsrfRequestValidationResult(opts, ctx);
	return result === true || result === void 0 && opts.allowRequestsWithoutOriginCheck === true;
}
async function getCsrfRequestValidationResult(opts, ctx) {
	const fetchSite = ctx.request.headers.get("Sec-Fetch-Site");
	if (fetchSite !== null) return matchValue(opts.secFetchSite ?? "same-origin", fetchSite, ctx);
	const origin = ctx.request.headers.get("Origin");
	if (origin !== null) {
		if (opts.origin) return matchValue(opts.origin, origin, ctx);
		return origin === new URL(ctx.request.url).origin;
	}
	const referer = ctx.request.headers.get("Referer");
	if (referer === null || opts.referer === false) return;
	if (typeof opts.referer === "function") return opts.referer(referer, ctx);
	if (opts.origin) {
		const refererOrigin = getOriginFromUrl(referer);
		return refererOrigin !== void 0 && matchValue(opts.origin, refererOrigin, ctx);
	}
	return isRefererSameOrigin(referer, new URL(ctx.request.url).origin);
}
async function matchValue(matcher, value, ctx) {
	if (typeof matcher === "function") return matcher(value, ctx);
	if (Array.isArray(matcher)) return matcher.includes(value);
	return value === matcher;
}
function getOriginFromUrl(url) {
	try {
		return new URL(url).origin;
	} catch {
		return;
	}
}
function isRefererSameOrigin(referer, requestOrigin) {
	if (referer === requestOrigin) return true;
	if (!referer.startsWith(requestOrigin)) return false;
	if (referer.length === requestOrigin.length) return true;
	const code = referer.charCodeAt(requestOrigin.length);
	return code === 47 || code === 63 || code === 35;
}
async function getFailureResponse(opts, ctx) {
	if (typeof opts.failureResponse === "function") return opts.failureResponse(ctx);
	return opts.failureResponse?.clone() ?? new Response("Forbidden", { status: 403 });
}
var serovalPlugins = void 0;
var FORM_DATA_CONTENT_TYPES = ["multipart/form-data", "application/x-www-form-urlencoded"];
var MAX_PAYLOAD_SIZE = 1e6;
var MAX_PENDING_SERIALIZATION_RECORDS = 1024;
var MAX_PENDING_SERIALIZATION_BYTES = 33554432;
var textEncoder = new TextEncoder();
function encodeSerializationRecord(value) {
	return textEncoder.encode(JSON.stringify(value));
}
function exceedsPendingSerializationLimit(record, recordCount, pendingBytes) {
	return recordCount >= MAX_PENDING_SERIALIZATION_RECORDS || pendingBytes + record.byteLength > MAX_PENDING_SERIALIZATION_BYTES;
}
function runSerializationCleanup(dispose) {
	try {
		dispose();
	} catch {}
}
function cancelRawStream(stream, reason) {
	stream.cancel(reason).catch(() => {});
}
var handleServerAction = async ({ request, context, serverFnId }) => {
	const methodUpper = request.method.toUpperCase();
	const url = new URL(request.url);
	const action = await getServerFnById(serverFnId, { origin: "client" });
	if (action.method && methodUpper !== action.method) return new Response(`expected ${action.method} method. Got ${methodUpper}`, {
		status: 405,
		headers: { Allow: action.method }
	});
	const isServerFn = request.headers.get("x-tsr-serverFn") === "true";
	serovalPlugins ??= getSerovalPlugins(defaultSerovalDeserializerPlugins);
	const contentType = request.headers.get("Content-Type");
	try {
		let res;
		if (FORM_DATA_CONTENT_TYPES.some((type) => contentType && contentType.includes(type))) {
			if (methodUpper === "GET") invariant();
			const formData = await request.formData();
			const serializedContext = formData.get(TSS_FORMDATA_CONTEXT);
			formData.delete(TSS_FORMDATA_CONTEXT);
			const params = {
				context,
				data: formData,
				method: methodUpper
			};
			if (typeof serializedContext === "string") try {
				const deserializedContext = fromJSON(JSON.parse(serializedContext), { plugins: serovalPlugins });
				if (typeof deserializedContext === "object" && deserializedContext) params.context = safeObjectMerge(deserializedContext, context);
			} catch (e) {}
			res = await action(params);
		} else if (methodUpper === "GET") {
			const payloadParam = url.searchParams.get("payload");
			if (payloadParam && payloadParam.length > MAX_PAYLOAD_SIZE) throw new Error("Payload too large");
			const payload = payloadParam ? fromJSON(JSON.parse(payloadParam), { plugins: serovalPlugins }) : void 0;
			res = await action({
				data: payload?.data,
				context: safeObjectMerge(payload?.context, context),
				method: methodUpper
			});
		} else {
			const payload = contentType?.includes("application/json") ? fromJSON(await request.json(), { plugins: serovalPlugins }) : void 0;
			res = await action({
				data: payload?.data,
				context: safeObjectMerge(payload?.context, context),
				method: methodUpper
			});
		}
		const unwrapped = res.error !== void 0 ? res.error : res.result;
		if (isNotFound(res)) res = isNotFoundResponse(res);
		if (!isServerFn && (unwrapped instanceof Response || unwrapped === null || typeof unwrapped !== "object")) return unwrapped;
		if (unwrapped instanceof Response) {
			if (isRedirect(unwrapped)) return unwrapped;
			unwrapped.headers.set(X_TSS_RAW_RESPONSE, "true");
			return unwrapped;
		}
		return serializeResult(res, request.signal, serovalPlugins);
	} catch (error) {
		if (error instanceof Response) return error;
		if (isNotFound(error)) return isNotFoundResponse(error);
		console.error("Server Fn Error!", error);
		const serializedError = JSON.stringify(await toCrossJSONAsync(error, {
			refs: /* @__PURE__ */ new Map(),
			plugins: serovalPlugins
		}));
		const response = getResponse();
		const headers = {
			"Content-Type": "application/json",
			[X_TSS_SERIALIZED]: "true"
		};
		try {
			return new Response(serializedError, {
				status: response.status ?? 500,
				statusText: response.statusText,
				headers
			});
		} catch {
			return new Response(serializedError, {
				status: 500,
				statusText: "",
				headers
			});
		}
	}
};
/**
* Serializes a server-function result. A result that Seroval completes
* synchronously without RawStreams becomes plain JSON; everything else is a
* framed response whose records and raw streams are multiplexed in order.
*/
function serializeResult(res, signal, plugins) {
	const alsResponse = getResponse();
	const initialRecords = [];
	let initialBytes = 0;
	const pendingRawStreams = [];
	let done = false;
	let initialParsed = false;
	let serializationFailure;
	let disposeSerialization;
	let onParse = (value, initial) => {
		if (serializationFailure) return;
		initialParsed ||= initial;
		const record = encodeSerializationRecord(value);
		if (exceedsPendingSerializationLimit(record, initialRecords.length, initialBytes)) {
			serializationFailure = [/* @__PURE__ */ new Error("Server function serialization exceeded its pending output limit")];
			return;
		}
		initialRecords.push(record);
		initialBytes += record.byteLength;
	};
	let onDone = () => {
		if (initialParsed) done = true;
	};
	let onError = (error) => {
		serializationFailure ??= [error];
	};
	const rawStreamPlugin = createRawStreamRPCPlugin((id, stream) => {
		if (serializationFailure) {
			cancelRawStream(stream, serializationFailure[0]);
			return;
		}
		if (id > 1024) {
			const error = /* @__PURE__ */ new Error(`Too many raw streams in framed response (max ${MAX_FRAMED_STREAMS})`);
			cancelRawStream(stream, error);
			onError(error);
			return;
		}
		pendingRawStreams.push({
			id,
			stream
		});
	});
	const dispose = toCrossJSONStream(res, {
		refs: /* @__PURE__ */ new Map(),
		plugins: [rawStreamPlugin, ...plugins],
		onParse(value, initial) {
			onParse(value, initial);
		},
		onDone() {
			onDone();
		},
		onError: (error) => {
			onError(error);
		}
	});
	if (serializationFailure) {
		runSerializationCleanup(dispose);
		for (const registration of pendingRawStreams) cancelRawStream(registration.stream, serializationFailure[0]);
		throw serializationFailure[0];
	}
	if (!done) disposeSerialization = dispose;
	if (done && pendingRawStreams.length === 0 && initialRecords.length === 1) return new Response(initialRecords[0], {
		status: alsResponse.status,
		statusText: alsResponse.statusText,
		headers: {
			"Content-Type": "application/json",
			[X_TSS_SERIALIZED]: "true"
		}
	});
	if (done && initialRecords.length === 1) {
		const json = initialRecords[0];
		if (json.byteLength > 16777216) {
			const error = /* @__PURE__ */ new Error("Server function serialization exceeded its pending output limit");
			for (const registration of pendingRawStreams) cancelRawStream(registration.stream, error);
			throw error;
		}
		const rawStreams = pendingRawStreams.splice(0);
		initialRecords.length = 0;
		return createFramedResponse(new ReadableStream({
			start(controller) {
				controller.enqueue({
					json,
					rawStreams
				});
				controller.close();
			},
			cancel(reason) {
				for (const registration of rawStreams) cancelRawStream(registration.stream, reason);
			}
		}), { signal });
	}
	const { readable, writable } = new TransformStream();
	const writer = writable.getWriter();
	const recordAbortController = new AbortController();
	let pendingBytes = 0;
	const pendingRecords = /* @__PURE__ */ new Set();
	const abortRecordStream = (error) => {
		if (serializationFailure) return;
		serializationFailure = [error];
		const disposeCurrentSerialization = disposeSerialization;
		disposeSerialization = void 0;
		for (const registration of pendingRawStreams.splice(0)) cancelRawStream(registration.stream, error);
		for (const record of pendingRecords) for (const registration of record.rawStreams) cancelRawStream(registration.stream, error);
		pendingRecords.clear();
		recordAbortController.abort(error);
		writer.abort(error).catch(() => {});
		if (disposeCurrentSerialization) runSerializationCleanup(disposeCurrentSerialization);
	};
	const writeRecord = (json, rawStreams) => {
		if (serializationFailure) {
			for (const registration of rawStreams) cancelRawStream(registration.stream, serializationFailure[0]);
			return false;
		}
		if (json.byteLength > 16777216 || exceedsPendingSerializationLimit(json, pendingRecords.size, pendingBytes)) {
			const error = /* @__PURE__ */ new Error("Server function serialization exceeded its pending output limit");
			for (const registration of rawStreams) cancelRawStream(registration.stream, error);
			onError(error);
			return false;
		}
		pendingBytes += json.byteLength;
		const record = {
			json,
			rawStreams
		};
		pendingRecords.add(record);
		writer.write(record).then(() => {
			pendingRecords.delete(record);
			pendingBytes -= json.byteLength;
		}, (error) => {
			const stillOwned = pendingRecords.delete(record);
			pendingBytes -= json.byteLength;
			if (stillOwned) for (const registration of rawStreams) cancelRawStream(registration.stream, error);
		});
		return true;
	};
	onParse = (value) => {
		if (serializationFailure) return;
		writeRecord(encodeSerializationRecord(value), pendingRawStreams.splice(0));
	};
	onDone = () => {
		if (serializationFailure) return;
		disposeSerialization = void 0;
		writer.close().catch(() => {});
	};
	onError = (error) => {
		abortRecordStream(error);
	};
	const initialRawStreams = pendingRawStreams.splice(0);
	for (let index = 0; index < initialRecords.length; index++) {
		const isLast = index === initialRecords.length - 1;
		if (!writeRecord(initialRecords[index], isLast ? initialRawStreams : [])) {
			if (!isLast) for (const registration of initialRawStreams) cancelRawStream(registration.stream, serializationFailure[0]);
			initialRecords.length = 0;
			throw serializationFailure[0];
		}
	}
	initialRecords.length = 0;
	if (done) onDone();
	writer.closed.catch((error) => {
		abortRecordStream(error);
	});
	return createFramedResponse(readable, {
		signal: AbortSignal.any([recordAbortController.signal, signal]),
		onCancel: abortRecordStream
	});
	function createFramedResponse(records, options) {
		const multiplexedStream = createMultiplexedStream(records, options);
		try {
			return new Response(multiplexedStream, {
				status: alsResponse.status,
				statusText: alsResponse.statusText,
				headers: {
					"Content-Type": TSS_CONTENT_TYPE_FRAMED_VERSIONED,
					[X_TSS_SERIALIZED]: "true"
				}
			});
		} catch (error) {
			cancelRawStream(multiplexedStream, error);
			throw error;
		}
	}
}
function isNotFoundResponse(error) {
	const { headers, ...rest } = error;
	const response = new Response(JSON.stringify(rest), {
		status: 404,
		headers
	});
	response.headers.set("Content-Type", "application/json");
	return response;
}
var LINK_PARAM_TOKEN_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
var PRELOAD_AS_VALUES = /* @__PURE__ */ new Set([
	"fetch",
	"font",
	"image",
	"script",
	"style",
	"track"
]);
function buildLinkParam(name, value) {
	if (value === void 0) return name;
	if (LINK_PARAM_TOKEN_RE.test(value)) return `${name}=${value}`;
	return `${name}=${JSON.stringify(value)}`;
}
function serializeEarlyHint(hint) {
	const parts = [`<${hint.href}>`, buildLinkParam("rel", hint.rel)];
	if (hint.as) parts.push(buildLinkParam("as", hint.as));
	if (hint.crossOrigin !== void 0) parts.push(buildLinkParam("crossorigin", hint.crossOrigin || void 0));
	if (hint.type) parts.push(buildLinkParam("type", hint.type));
	if (hint.integrity) parts.push(buildLinkParam("integrity", hint.integrity));
	if (hint.referrerPolicy) parts.push(buildLinkParam("referrerpolicy", hint.referrerPolicy));
	if (hint.fetchPriority) parts.push(buildLinkParam("fetchpriority", hint.fetchPriority));
	return parts.join("; ");
}
function getStringAttr(attrs, name, fallbackName) {
	const value = attrs?.[name] ?? (fallbackName ? attrs?.[fallbackName] : void 0);
	return typeof value === "string" ? value : void 0;
}
function getPreloadAs(attrs) {
	const as = getStringAttr(attrs, "as");
	return as && PRELOAD_AS_VALUES.has(as) ? as : void 0;
}
function addEarlyHintFetchAttrs(hint, attrs) {
	const crossOrigin = getStringAttr(attrs, "crossOrigin", "crossorigin");
	const type = getStringAttr(attrs, "type");
	const integrity = getStringAttr(attrs, "integrity");
	const referrerPolicy = getStringAttr(attrs, "referrerPolicy", "referrerpolicy");
	const fetchPriority = getStringAttr(attrs, "fetchPriority", "fetchpriority");
	if (crossOrigin !== void 0) hint.crossOrigin = crossOrigin;
	if (type) hint.type = type;
	if (integrity) hint.integrity = integrity;
	if (referrerPolicy) hint.referrerPolicy = referrerPolicy;
	if (fetchPriority) hint.fetchPriority = fetchPriority;
}
function linkAttrsToEarlyHint(attrs) {
	const href = getStringAttr(attrs, "href");
	const rel = getStringAttr(attrs, "rel");
	if (!href || !rel) return void 0;
	const relTokens = rel.split(/\s+/);
	let hintRel;
	let hintAs;
	if (relTokens.includes("modulepreload")) {
		hintRel = "modulepreload";
		hintAs = "script";
	} else if (relTokens.includes("stylesheet")) {
		hintRel = "preload";
		hintAs = "style";
	} else if (relTokens.includes("preload")) {
		hintAs = getPreloadAs(attrs);
		if (!hintAs) return void 0;
		hintRel = "preload";
	} else if (relTokens.includes("preconnect")) {
		hintRel = "preconnect";
		hintAs = void 0;
	} else if (relTokens.includes("dns-prefetch")) {
		hintRel = "dns-prefetch";
		hintAs = void 0;
	}
	if (!hintRel) return void 0;
	const hint = {
		href,
		rel: hintRel
	};
	if (hintAs) hint.as = hintAs;
	addEarlyHintFetchAttrs(hint, attrs);
	return hint;
}
function collectStaticHintsFromManifest(manifest, matchedRoutes) {
	const hints = [];
	for (const route of matchedRoutes) {
		const routeManifest = manifest.routes[route.id];
		if (!routeManifest) continue;
		for (const link of routeManifest.preloads ?? []) {
			const attrs = getScriptPreloadAttrs(manifest, link);
			const hint = {
				href: attrs.href,
				rel: attrs.rel,
				as: "script"
			};
			if (attrs.crossOrigin !== void 0) hint.crossOrigin = attrs.crossOrigin;
			hints.push(hint);
		}
		for (const link of routeManifest.css ?? []) {
			const stylesheetHref = getStylesheetHref(link);
			if (manifest.inlineCss?.styles[stylesheetHref] !== void 0) continue;
			const resolvedLink = resolveManifestCssLink(link);
			const hint = {
				href: stylesheetHref,
				rel: "preload",
				as: "style"
			};
			if (resolvedLink.crossOrigin !== void 0) hint.crossOrigin = resolvedLink.crossOrigin;
			hints.push(hint);
		}
	}
	return hints;
}
function collectDynamicHintsFromMatches(matches) {
	const hints = [];
	for (const match of matches) {
		const links = match.links;
		if (!Array.isArray(links)) continue;
		for (const link of links) {
			const hint = linkAttrsToEarlyHint(link);
			if (hint) hints.push(hint);
		}
	}
	return hints;
}
function createEarlyHintsEvent(opts) {
	const nextHints = [];
	const nextLinks = [];
	for (const hint of opts.hints) {
		const link = serializeEarlyHint(hint);
		if (opts.sentLinks.has(link)) continue;
		opts.sentLinks.add(link);
		opts.sentHints.push(hint);
		nextHints.push(hint);
		nextLinks.push(link);
	}
	if (!nextHints.length && opts.phase !== "dynamic") return void 0;
	return {
		phase: opts.phase,
		hints: nextHints,
		links: nextLinks,
		allHints: opts.sentHints.slice(),
		allLinks: Array.from(opts.sentLinks)
	};
}
function createResponseLinkHeaderEntries(opts) {
	for (const hint of opts.hints) {
		const link = serializeEarlyHint(hint);
		if (opts.sentLinks.has(link)) continue;
		opts.sentLinks.add(link);
		opts.entries.push({
			phase: opts.phase,
			hint,
			link
		});
	}
}
function getResponseLinkHeaderEntries(opts) {
	if (!opts.filter) return opts.entries.map((entry) => entry.link);
	try {
		const links = [];
		for (const entry of opts.entries) if (opts.filter(entry)) links.push(entry.link);
		return links;
	} catch (err) {
		console.error("Error filtering response Link headers:", err);
		return [];
	}
}
function notifyEarlyHints(phase, event, onEarlyHints) {
	try {
		const result = onEarlyHints(event);
		if (result) Promise.resolve(result).catch((err) => {
			console.error(`Error sending ${phase} early hints:`, err);
		});
	} catch (err) {
		console.error(`Error sending ${phase} early hints:`, err);
	}
}
function getResponseLinkHeaderFilter(responseLinkHeader) {
	if (typeof responseLinkHeader !== "object") return;
	return responseLinkHeader.filter;
}
function appendResponseLinkHeaders(opts) {
	for (const link of getResponseLinkHeaderEntries(opts)) opts.responseHeaders.append("Link", link);
}
function collectResponseLinkHeaderEntries(opts) {
	for (let index = 0; index < opts.event.hints.length; index++) opts.entries.push({
		phase: opts.phase,
		hint: opts.event.hints[index],
		link: opts.event.links[index]
	});
}
function collectEarlyHintsPhase(opts) {
	const event = opts.onEarlyHints ? createEarlyHintsEvent({
		phase: opts.phase,
		hints: opts.hints,
		sentLinks: opts.sentLinks,
		sentHints: opts.sentHints
	}) : void 0;
	if (event) notifyEarlyHints(opts.phase, event, opts.onEarlyHints);
	if (!opts.responseLinkHeaderEntries) return;
	if (event) {
		collectResponseLinkHeaderEntries({
			phase: opts.phase,
			event,
			entries: opts.responseLinkHeaderEntries
		});
		return;
	}
	createResponseLinkHeaderEntries({
		phase: opts.phase,
		hints: opts.hints,
		sentLinks: opts.sentLinks,
		entries: opts.responseLinkHeaderEntries
	});
}
function createEarlyHintsCollector(opts) {
	if (!opts?.onEarlyHints && !opts?.responseLinkHeader) return;
	const sentLinks = /* @__PURE__ */ new Set();
	const sentHints = opts.onEarlyHints ? new Array() : void 0;
	const responseLinkHeaderEntries = opts.responseLinkHeader ? new Array() : void 0;
	const responseLinkHeaderFilter = getResponseLinkHeaderFilter(opts.responseLinkHeader);
	return {
		collectStatic: ({ manifest, matchedRoutes }) => {
			if (!matchedRoutes?.length) return;
			collectEarlyHintsPhase({
				phase: "static",
				hints: collectStaticHintsFromManifest(manifest, matchedRoutes),
				sentLinks,
				sentHints,
				onEarlyHints: opts.onEarlyHints,
				responseLinkHeaderEntries
			});
		},
		collectDynamic: (matches) => {
			collectEarlyHintsPhase({
				phase: "dynamic",
				hints: collectDynamicHintsFromMatches(matches),
				sentLinks,
				sentHints,
				onEarlyHints: opts.onEarlyHints,
				responseLinkHeaderEntries
			});
		},
		appendResponseHeaders: (headers) => {
			if (!responseLinkHeaderEntries?.length) return;
			appendResponseLinkHeaders({
				responseHeaders: headers,
				entries: responseLinkHeaderEntries,
				filter: responseLinkHeaderFilter
			});
		}
	};
}
function normalizeTransformAssetResult(result) {
	if (typeof result === "string") return { href: result };
	return result;
}
function escapeCssString(value) {
	return value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\a ").replace(/\r/g, "\\d ").replace(/\f/g, "\\c ");
}
async function transformInlineCssTemplate(options) {
	const { strings, urls } = options.template;
	if (strings.length !== urls.length + 1) throw new Error(`TanStack Start inlineCss template for ${options.stylesheetHref} is invalid`);
	let css = strings[0];
	for (let index = 0; index < urls.length; index++) {
		const transformed = normalizeTransformAssetResult(await options.transformFn({
			kind: "css-url",
			url: urls[index],
			stylesheetHref: options.stylesheetHref
		}));
		css += escapeCssString(transformed.href) + strings[index + 1];
	}
	return css;
}
async function transformInlineCssStyles(inlineCss, transformFn) {
	const transformedStyles = {};
	const transformedEntries = await Promise.all(Object.entries(inlineCss.styles).map(async ([stylesheetHref, css]) => {
		const template = inlineCss.templates?.[stylesheetHref];
		return [stylesheetHref, template ? await transformInlineCssTemplate({
			stylesheetHref,
			template,
			transformFn
		}) : css];
	}));
	for (const [stylesheetHref, css] of transformedEntries) transformedStyles[stylesheetHref] = css;
	return {
		styles: transformedStyles,
		...inlineCss.templates ? { templates: inlineCss.templates } : {}
	};
}
function resolveTransformAssetsCrossOrigin(config, kind) {
	if (!config) return void 0;
	if (typeof config === "string") return config;
	return config[kind];
}
function isObjectShorthand(transform) {
	return "prefix" in transform;
}
function resolveTransformAssetsConfig(transform) {
	if (typeof transform === "string") {
		const prefix = transform;
		return {
			type: "transform",
			transformFn: ({ url }) => ({ href: `${prefix}${url}` }),
			cache: true
		};
	}
	if (typeof transform === "function") return {
		type: "transform",
		transformFn: transform,
		cache: true
	};
	if (isObjectShorthand(transform)) {
		const { prefix, crossOrigin } = transform;
		return {
			type: "transform",
			transformFn: ({ url, kind }) => {
				const href = `${prefix}${url}`;
				if (kind === "css-url") return { href };
				const co = resolveTransformAssetsCrossOrigin(crossOrigin, kind);
				return co ? {
					href,
					crossOrigin: co
				} : { href };
			},
			cache: true
		};
	}
	if ("createTransform" in transform && transform.createTransform) return {
		type: "createTransform",
		createTransform: transform.createTransform,
		cache: transform.cache !== false
	};
	return {
		type: "transform",
		transformFn: typeof transform.transform === "string" ? (({ url }) => ({ href: `${transform.transform}${url}` })) : transform.transform,
		cache: transform.cache !== false
	};
}
function assignManifestLink(link, next) {
	if (typeof link === "string") return next.crossOrigin ? next : next.href;
	const nextLink = {
		...link,
		href: next.href
	};
	if (next.crossOrigin) nextLink.crossOrigin = next.crossOrigin;
	else delete nextLink.crossOrigin;
	return nextLink;
}
async function transformManifestAssets(source, transformFn, _opts) {
	const manifest = structuredClone(source);
	const inlineCssEnabled = _opts?.inlineCss !== false;
	const scriptTransforms = /* @__PURE__ */ new Map();
	const transformScript = (url) => {
		const cached = scriptTransforms.get(url);
		if (cached) return cached;
		const transformed = Promise.resolve(transformFn({
			url,
			kind: "script"
		})).then(normalizeTransformAssetResult);
		scriptTransforms.set(url, transformed);
		return transformed;
	};
	if (!inlineCssEnabled) delete manifest.inlineCss;
	else if (manifest.inlineCss) manifest.inlineCss = await transformInlineCssStyles(manifest.inlineCss, transformFn);
	for (const route of Object.values(manifest.routes)) {
		if (route.preloads?.length) route.preloads = await Promise.all(route.preloads.map(async (link) => {
			const result = await transformScript(resolveManifestAssetLink(link).href);
			return assignManifestLink(link, {
				href: result.href,
				crossOrigin: result.crossOrigin
			});
		}));
		if (route.css?.length && !manifest.inlineCss) route.css = await Promise.all(route.css.map(async (link) => {
			const result = normalizeTransformAssetResult(await transformFn({
				url: resolveManifestCssLink(link).href,
				kind: "stylesheet"
			}));
			return assignManifestLink(link, {
				href: result.href,
				crossOrigin: result.crossOrigin
			});
		}));
		if (route.scripts?.length) for (const script of route.scripts) {
			const src = script.attrs?.src;
			if (typeof src !== "string") continue;
			const result = await transformScript(src);
			script.attrs = {
				...script.attrs,
				src: result.href
			};
			if (result.crossOrigin) script.attrs.crossOrigin = result.crossOrigin;
			else delete script.attrs.crossOrigin;
		}
	}
	return manifest;
}
/**
* Builds a final ServerManifest without URL transforms. Used when no
* transformAssets option is provided.
*
* Returns a new manifest object so the cached base manifest is never mutated.
*/
function buildManifest(source, opts) {
	return {
		...source.scriptFormat ? { scriptFormat: source.scriptFormat } : {},
		...opts?.inlineCss !== false && source.inlineCss ? { inlineCss: structuredClone(source.inlineCss) } : {},
		routes: { ...source.routes }
	};
}
function getStaticHandlerInlineCssDefault(handlerInlineCss) {
	if (typeof handlerInlineCss === "function") return;
	return handlerInlineCss ?? true;
}
async function resolveInlineCssForRequest(opts) {
	if (opts.requestInlineCss !== void 0) return opts.requestInlineCss;
	if (typeof opts.handlerInlineCss === "function") return await opts.handlerInlineCss({ request: opts.request });
	return opts.handlerInlineCss ?? true;
}
function createCachedBaseManifestLoader(loadBaseManifest) {
	let baseManifestPromise;
	return () => {
		if (!baseManifestPromise) baseManifestPromise = loadBaseManifest().catch((error) => {
			baseManifestPromise = void 0;
			throw error;
		});
		return baseManifestPromise;
	};
}
function createFinalManifestTransformResolver(transformAssets, opts) {
	const transformConfig = transformAssets !== void 0 ? resolveTransformAssetsConfig(transformAssets) : void 0;
	const cache = transformConfig ? transformConfig.cache : true;
	const warmup = !!transformAssets && typeof transformAssets === "object" && "warmup" in transformAssets && transformAssets.warmup === true;
	let cachedCreateTransformPromise;
	const clearCachedCreateTransform = () => {
		cachedCreateTransformPromise = void 0;
	};
	return {
		cache,
		warmup,
		clearCachedCreateTransform,
		getTransformFn: async (ctx) => {
			if (!transformConfig) return void 0;
			if (transformConfig.type !== "createTransform") return transformConfig.transformFn;
			if (!cache || !opts.cacheCreateTransform) return transformConfig.createTransform(ctx);
			if (!cachedCreateTransformPromise) cachedCreateTransformPromise = Promise.resolve(transformConfig.createTransform(ctx)).catch((error) => {
				clearCachedCreateTransform();
				throw error;
			});
			return cachedCreateTransformPromise;
		}
	};
}
function createFinalManifestResolver(opts) {
	const finalManifestCache = /* @__PURE__ */ new Map();
	const transformResolver = createFinalManifestTransformResolver(opts.transformAssets, { cacheCreateTransform: opts.cacheCreateTransform });
	const handlerDefaultInlineCss = getStaticHandlerInlineCssDefault(opts.inlineCss);
	const getRequestManifestOptions = async (requestOpts) => {
		const transformFn = await transformResolver.getTransformFn({
			warmup: false,
			request: requestOpts.request
		});
		const inlineCss = await resolveInlineCssForRequest({
			request: requestOpts.request,
			handlerInlineCss: opts.inlineCss,
			requestInlineCss: requestOpts.requestInlineCss
		});
		return {
			getBaseManifest: requestOpts.getBaseManifest,
			transformFn,
			cache: transformResolver.cache,
			inlineCss
		};
	};
	const resolveRequest = async (requestOpts, cache) => {
		return resolveFinalManifest({
			...await getRequestManifestOptions(requestOpts),
			finalManifestCache: cache
		});
	};
	return {
		warmup: ({ getBaseManifest }) => warmupFinalManifest({
			enabled: transformResolver.warmup,
			handlerDefaultInlineCss,
			cache: transformResolver.cache,
			finalManifestCache,
			getBaseManifest,
			getTransformFn: () => transformResolver.getTransformFn({ warmup: true }),
			onError: transformResolver.clearCachedCreateTransform
		}),
		resolveCached: (requestOpts) => resolveRequest(requestOpts, finalManifestCache),
		resolveUncached: (requestOpts) => resolveRequest(requestOpts, void 0)
	};
}
function getFinalManifestCacheKey(inlineCss) {
	return inlineCss ? "inline-css" : "linked-css";
}
function cacheFinalManifestPromise(cachedFinalManifestPromises, cacheKey, promise) {
	const cachedFinalManifestPromise = promise.catch((error) => {
		if (cachedFinalManifestPromises.get(cacheKey) === cachedFinalManifestPromise) cachedFinalManifestPromises.delete(cacheKey);
		throw error;
	});
	cachedFinalManifestPromises.set(cacheKey, cachedFinalManifestPromise);
	return cachedFinalManifestPromise;
}
function getOrCreateCachedFinalManifestPromise(cachedFinalManifestPromises, cacheKey, computeFinalManifest) {
	const cachedFinalManifestPromise = cachedFinalManifestPromises.get(cacheKey);
	if (cachedFinalManifestPromise) return cachedFinalManifestPromise;
	return cacheFinalManifestPromise(cachedFinalManifestPromises, cacheKey, Promise.resolve().then(computeFinalManifest));
}
async function buildFinalManifest(opts) {
	return opts.transformFn ? await transformManifestAssets(opts.base, opts.transformFn, { inlineCss: opts.inlineCss }) : buildManifest(opts.base, { inlineCss: opts.inlineCss });
}
async function resolveFinalManifest(opts) {
	const computeFinalManifest = async () => {
		return buildFinalManifest({
			base: await opts.getBaseManifest(),
			transformFn: opts.transformFn,
			inlineCss: opts.inlineCss
		});
	};
	if (opts.finalManifestCache && (!opts.transformFn || opts.cache)) return getOrCreateCachedFinalManifestPromise(opts.finalManifestCache, getFinalManifestCacheKey(opts.inlineCss), computeFinalManifest);
	return computeFinalManifest();
}
function warmupFinalManifest(opts) {
	if (!opts.enabled || opts.handlerDefaultInlineCss === void 0 || !opts.cache) return;
	const inlineCss = opts.handlerDefaultInlineCss;
	const warmupPromise = getOrCreateCachedFinalManifestPromise(opts.finalManifestCache, getFinalManifestCacheKey(inlineCss), async () => {
		const [base, transformFn] = await Promise.all([opts.getBaseManifest(), opts.getTransformFn()]);
		return buildFinalManifest({
			base,
			transformFn,
			inlineCss
		});
	});
	if (opts.onError) warmupPromise.catch(opts.onError);
	return warmupPromise;
}
var ServerFunctionSerializationAdapter = createSerializationAdapter({
	key: "$TSS/serverfn",
	test: (v) => {
		if (typeof v !== "function") return false;
		if (!(TSS_SERVER_FUNCTION in v)) return false;
		return !!v[TSS_SERVER_FUNCTION];
	},
	toSerializable: ({ serverFnMeta }) => ({ functionId: serverFnMeta.id }),
	fromSerializable: ({ functionId }) => {
		const fn = async (opts, signal) => {
			const serverFn = await getServerFnById(functionId, { origin: "client" });
			const result = await serverFn({
				data: opts?.data,
				context: opts?.context,
				method: serverFn.method ?? "GET"
			}, signal);
			if (result.error !== void 0) throw result.error;
			return result.result;
		};
		return fn;
	}
});
function getStartResponseHeaders(opts) {
	return mergeHeaders({ "Content-Type": "text/html; charset=utf-8" }, ..._getRenderedMatches(opts.router.stores.matches.get()).map((match) => {
		return match.headers;
	}));
}
var entriesPromise;
var defaultCsrfMiddleware = createCsrfMiddleware({ filter: (ctx) => ctx.handlerType === "serverFn" });
var getCachedBaseManifest = createCachedBaseManifestLoader(() => getStartManifest());
var getProdBaseManifest = () => getCachedBaseManifest();
var getBaseManifest = getProdBaseManifest;
var createEarlyHintsForRequest = createEarlyHintsCollector;
async function loadEntries() {
	const [routerEntry, startEntry, pluginAdapters] = await Promise.all([
		import("./router-DBOPb28Z.mjs").then((n) => n.t),
		import("./start-5Z2QO8AU.mjs"),
		import("./empty-plugin-adapters-D9UWiqvJ.mjs")
	]);
	return {
		routerEntry,
		startEntry,
		pluginAdapters
	};
}
function getEntries() {
	if (!entriesPromise) entriesPromise = loadEntries();
	return entriesPromise;
}
var ROUTER_BASEPATH = "/";
var SERVER_FN_BASE = "/_serverFn/";
var IS_PRERENDERING = process.env.TSS_PRERENDERING === "true";
var IS_SHELL_ENV = process.env.TSS_SHELL === "true";
var IS_DEV = false;
var ERR_NO_RESPONSE = IS_DEV ? `It looks like you forgot to return a response from your server route handler. If you want to defer to the app router, make sure to have a component set in this route.` : "Internal Server Error";
var ERR_NO_DEFER = IS_DEV ? `You cannot defer to the app router if there is no component defined on this route.` : "Internal Server Error";
function throwRouteHandlerError() {
	throw new Error(ERR_NO_RESPONSE);
}
function throwIfMayNotDefer() {
	throw new Error(ERR_NO_DEFER);
}
function getResponseFromResult(result) {
	return isSsrResponse(result) || result instanceof Response ? result : result?.response;
}
var responseBodySources = /* @__PURE__ */ new WeakMap();
function disposeResponseResult(result, reason) {
	const response = getResponseFromResult(result);
	if (isSsrResponse(response) || response instanceof Response) disposeSsrResponse(response, reason);
}
function hasResponseBody(value) {
	return value instanceof Response && value.body !== null;
}
function inheritsResponseOwnership(ownership, candidate) {
	return hasResponseBody(candidate) && (candidate.body === ownership.response.body || responseBodySources.get(candidate) === ownership.response);
}
function disposeResponseOwnership(ownership, reason) {
	const { response, sourceBody, streamResponse } = ownership;
	streamResponse?.dispose(reason);
	if (!streamResponse || response.body !== sourceBody) response.body.cancel(reason).catch(() => {});
}
function getOwnedResponse(ownership) {
	const { response, sourceBody, streamResponse } = ownership;
	if (!streamResponse) return response;
	if (streamResponse.response === response && response.body === sourceBody) return streamResponse;
	if (response.body === sourceBody) return {
		...streamResponse,
		response
	};
	return {
		...streamResponse,
		response,
		dispose(reason) {
			disposeResponseOwnership(ownership, reason);
		}
	};
}
function createLateResponseDisposer(signal) {
	return (result) => disposeResponseResult(result, signal.reason);
}
/**
* Compose middleware around a terminal response handler. With no middleware
* the terminal runs directly.
*/
async function executeMiddleware(middlewares, terminal, ctx, signal, terminalNext) {
	let index = -1;
	let responseOwnership;
	let settled = false;
	const disposeAbandonedResult = createLateResponseDisposer(signal);
	const setResponse = (response) => {
		const ssrResponse = isSsrResponse(response) ? response : void 0;
		const streamResponse = ssrResponse?.serverSsrCleanup === "stream" ? ssrResponse : void 0;
		const exposed = ssrResponse ? ssrResponse.response : response;
		const current = responseOwnership;
		if (settled) {
			if (exposed !== ctx.response) disposeResponseResult(response, "late middleware response");
			return;
		}
		if (current && current.response === exposed) current.streamResponse ??= streamResponse;
		else if (current && inheritsResponseOwnership(current, exposed)) {
			current.response = exposed;
			current.streamResponse ??= streamResponse;
		} else {
			if (current) disposeResponseOwnership(current, "middleware response replaced");
			if (hasResponseBody(exposed)) responseOwnership = {
				response: exposed,
				sourceBody: exposed.body,
				streamResponse
			};
			else responseOwnership = void 0;
		}
		ctx.response = exposed;
	};
	const reconcileCtxResponse = () => {
		if (ctx.response !== responseOwnership?.response) setResponse(ctx.response);
	};
	let nextPromise;
	function next(nextCtx) {
		const result = runNext(nextCtx);
		nextPromise = result;
		return result;
	}
	async function runNext(nextCtx) {
		signal.throwIfAborted();
		if (nextCtx) {
			if (nextCtx.context) ctx.context = safeObjectMerge(ctx.context, nextCtx.context);
			for (const key of Object.keys(nextCtx)) if (key === "response") setResponse(nextCtx.response);
			else if (key !== "context") ctx[key] = nextCtx[key];
		}
		index++;
		const isTerminal = index === middlewares.length;
		const middleware = index < middlewares.length ? middlewares[index] : isTerminal ? terminal : void 0;
		const middlewareNext = isTerminal && terminalNext ? terminalNext : next;
		if (!middleware) return ctx;
		let result;
		try {
			const pending = middleware({
				...ctx,
				next: middlewareNext
			});
			if (nextPromise && pending === nextPromise) {
				nextPromise = void 0;
				await pending;
				if (signal.aborted) throw signal.reason;
				return ctx;
			} else if (!isPromise(pending)) {
				result = pending;
				signal.throwIfAborted();
			} else result = await waitForReason(pending, signal, disposeAbandonedResult, disposeAbandonedResult);
		} catch (err) {
			reconcileCtxResponse();
			if (signal.aborted) {
				if (result !== void 0) disposeAbandonedResult(result);
				if (err !== signal.reason) disposeAbandonedResult(err);
				throw signal.reason;
			}
			if (err instanceof Response) {
				setResponse(err);
				return ctx;
			}
			throw err;
		}
		if (isTerminal && terminalNext && !result) throwRouteHandlerError();
		reconcileCtxResponse();
		if (result && result !== ctx) {
			const response = getResponseFromResult(result);
			if (response !== void 0 && response !== ctx.response) setResponse(response);
			if (response !== result && result.context && result.context !== ctx.context) ctx.context = safeObjectMerge(ctx.context, result.context);
		}
		return ctx;
	}
	try {
		await runNext();
		const response = ctx.response;
		if (!response) throwRouteHandlerError();
		reconcileCtxResponse();
		if (signal.aborted) throw signal.reason;
		settled = true;
		return responseOwnership ? getOwnedResponse(responseOwnership) : response;
	} catch (err) {
		settled = true;
		if (responseOwnership) disposeResponseOwnership(responseOwnership, signal.aborted ? signal.reason : err);
		throw err;
	}
}
/**
* Creates the TanStack Start request handler.
*
* @example Backwards-compatible usage (handler callback only):
* ```ts
* export default createStartHandler(defaultStreamHandler)
* ```
*
* @example With CDN URL rewriting:
* ```ts
* export default createStartHandler({
*   handler: defaultStreamHandler,
*   transformAssets: 'https://cdn.example.com',
* })
* ```
*
* @example With per-request URL rewriting:
* ```ts
* export default createStartHandler({
*   handler: defaultStreamHandler,
*   transformAssets: {
*     transform: ({ url }) => {
*       const cdnBase = getRequest().headers.get('x-cdn-base') || ''
*       return { href: `${cdnBase}${url}` }
*     },
*     cache: false,
*   },
* })
* ```
*/
function createStartHandler(cbOrOptions) {
	const handlerOptions = typeof cbOrOptions === "function" ? {} : cbOrOptions;
	const cb = typeof cbOrOptions === "function" ? cbOrOptions : cbOrOptions.handler;
	const finalManifestResolver = createFinalManifestResolver({
		...handlerOptions,
		cacheCreateTransform: true
	});
	const resolveManifestForRequest = finalManifestResolver.resolveCached;
	finalManifestResolver.warmup({ getBaseManifest: () => getBaseManifest(void 0) });
	const startRequestResolver = async (request, requestOpts) => {
		const signal = request.signal;
		let router;
		let routerPromise;
		let responseOwnsCleanup = false;
		try {
			signal.throwIfAborted();
			const { url, handledProtocolRelativeURL } = getNormalizedURL(request.url);
			const href = url.pathname + url.search + url.hash;
			const origin = url.origin;
			if (handledProtocolRelativeURL) return Response.redirect(url, 308);
			const entries = await waitForReason(getEntries(), signal);
			const isServerFnRequest = !!SERVER_FN_BASE && url.pathname.startsWith(SERVER_FN_BASE);
			const startInstance = entries.startEntry.startInstance;
			let startOptions;
			if (startInstance) {
				const pendingStartOptions = startInstance.getOptions();
				startOptions = isPromise(pendingStartOptions) ? await waitForReason(pendingStartOptions, signal) : pendingStartOptions;
				signal.throwIfAborted();
			} else startOptions = {};
			const { hasPluginAdapters, pluginSerializationAdapters } = entries.pluginAdapters;
			const serializationAdapters = [
				...startOptions.serializationAdapters || [],
				...hasPluginAdapters ? pluginSerializationAdapters : [],
				ServerFunctionSerializationAdapter
			];
			const requestStartOptions = {
				...startOptions,
				requestMiddleware: startInstance ? startOptions.requestMiddleware : isServerFnRequest ? [defaultCsrfMiddleware] : void 0,
				serializationAdapters
			};
			const flattenedRequestMiddlewares = requestStartOptions.requestMiddleware ? flattenMiddlewares(requestStartOptions.requestMiddleware) : [];
			const executedRequestMiddlewares = new Set(flattenedRequestMiddlewares);
			const getRouter = () => {
				routerPromise ??= (async () => {
					signal.throwIfAborted();
					const requestRouter = await waitForReason(entries.routerEntry.getRouter(), signal);
					let isShell = IS_SHELL_ENV;
					if (IS_PRERENDERING && !isShell) isShell = request.headers.get(HEADERS.TSS_SHELL) === "true";
					const history = createServerHistory(href);
					requestRouter.update({
						history,
						isShell,
						isPrerendering: IS_PRERENDERING,
						origin: requestRouter.options.origin ?? origin,
						defaultSsr: requestStartOptions.defaultSsr,
						serializationAdapters: [...requestStartOptions.serializationAdapters, ...requestRouter.options.serializationAdapters || []],
						basepath: ROUTER_BASEPATH
					});
					router = requestRouter;
					return requestRouter;
				})();
				return routerPromise;
			};
			const handlerType = isServerFnRequest ? "serverFn" : "router";
			const startContext = {
				getRouter,
				startOptions: requestStartOptions,
				request,
				executedRequestMiddlewares,
				handlerType
			};
			let terminal;
			if (isServerFnRequest) {
				const serverFnId = url.pathname.slice(SERVER_FN_BASE.length).split("/")[0];
				if (!serverFnId) throw new Error("Invalid server action param for serverFnId");
				terminal = ({ context }) => runWithStartContext({
					...startContext,
					contextAfterGlobalMiddlewares: context
				}, () => handleServerAction({
					request,
					context: requestOpts?.context,
					serverFnId
				}));
			} else {
				const executeRouter = async (serverContext, matchedRoutes) => {
					if (!/(^|,)\s*(\*\/\*|text\/html)/.test(request.headers.get("Accept") || "*/*")) return normalizeSsrResponse(Response.json({ error: "Only HTML requests are supported here" }, { status: 406 }));
					const manifest = await waitForReason(resolveManifestForRequest({
						request,
						requestInlineCss: requestOpts?.inlineCss,
						getBaseManifest: () => getBaseManifest(matchedRoutes)
					}), signal);
					const earlyHints = createEarlyHintsForRequest({
						onEarlyHints: requestOpts?.onEarlyHints,
						responseLinkHeader: requestOpts?.responseLinkHeader
					});
					earlyHints?.collectStatic({
						manifest,
						matchedRoutes
					});
					const routerInstance = await getRouter();
					attachRouterServerSsrUtils({
						router: routerInstance,
						manifest,
						getRequestAssets: () => getStartContext({ throwIfNotFound: false })?.requestAssets
					});
					routerInstance.options.additionalContext = { serverContext };
					await routerInstance.load({ _signal: signal });
					signal.throwIfAborted();
					if (routerInstance._serverResult?.type === "redirect") return normalizeSsrResponse(routerInstance._serverResult.redirect);
					earlyHints?.collectDynamic(_getRenderedMatches(routerInstance.stores.matches.get()));
					const ctx = getStartContext({ throwIfNotFound: false });
					await routerInstance.serverSsr.dehydrate({
						requestAssets: ctx?.requestAssets,
						signal
					});
					signal.throwIfAborted();
					const responseHeaders = getStartResponseHeaders({ router: routerInstance });
					earlyHints?.appendResponseHeaders(responseHeaders);
					signal.throwIfAborted();
					const disposeLate = createLateResponseDisposer(signal);
					return normalizeSsrResponse(await waitForReason(cb({
						request,
						router: routerInstance,
						responseHeaders
					}), signal, disposeLate, disposeLate));
				};
				terminal = ({ context }) => runWithStartContext({
					...startContext,
					contextAfterGlobalMiddlewares: context
				}, () => handleServerRoutes({
					getRouter,
					request,
					url,
					executeRouter,
					context,
					executedRequestMiddlewares
				}));
			}
			const middlewareResponse = await executeMiddleware(flattenedRequestMiddlewares.map((d) => d.options.server), terminal, {
				request,
				pathname: url.pathname,
				handlerType,
				context: createNullProtoObject(requestOpts?.context)
			}, signal);
			let result;
			try {
				result = await handleRedirectResponse(middlewareResponse, getRouter, signal, isServerFnRequest && request.headers.get("x-tsr-serverFn") === "true");
				if (request.method === "HEAD") result = stripSsrResponseBody(result, "HEAD body stripped");
			} catch (error) {
				disposeResponseResult(middlewareResponse, signal.aborted ? signal.reason : error);
				throw error;
			}
			bindSsrResponseToRequest(router, result, signal);
			signal.throwIfAborted();
			responseOwnsCleanup = result.serverSsrCleanup === "stream";
			return result.response;
		} finally {
			if (router?.serverSsr && !responseOwnsCleanup) router.serverSsr.cleanup();
		}
	};
	return requestHandler(startRequestResolver);
}
var relativeRedirectProtocols = /* @__PURE__ */ new Set();
async function handleRedirectResponse(response, getRouter, signal, serializeRedirect) {
	signal.throwIfAborted();
	const ssrResponse = normalizeSsrResponse(response);
	const redirect = ssrResponse.response;
	if (!isRedirect(redirect)) return ssrResponse;
	const opts = redirect.options;
	const href = redirect.headers.get("Location") || opts.href;
	if (!href && opts.to && typeof opts.to === "string" && !opts.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(opts)}`);
	if (!href && [
		"params",
		"search",
		"hash"
	].some((d) => typeof opts[d] === "function")) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(opts).filter((d) => typeof opts[d] === "function").map((d) => `"${d}"`).join(", ")}`);
	signal.throwIfAborted();
	if (href && !isDangerousProtocol(href, relativeRedirectProtocols)) {
		opts.href = href;
		redirect.headers.set("Location", href);
	} else {
		const router = await getRouter();
		signal.throwIfAborted();
		router.resolveRedirect(redirect);
	}
	if (serializeRedirect) {
		const redirectOptions = { ...opts };
		delete redirectOptions.headers;
		const responseHeaders = new Headers(redirect.headers);
		responseHeaders.set("content-type", "application/json");
		return replaceSsrResponse(ssrResponse, Response.json({
			...redirectOptions,
			isSerializedRedirect: true
		}, { headers: responseHeaders }), "redirect response replaced");
	}
	return ssrResponse;
}
function withParsedParams(handler, matchedRoutes) {
	if (!matchedRoutes.some((route) => route.options.params?.parse ?? route.options.parseParams)) return handler;
	return (ctx) => {
		const params = Object.assign(Object.create(null), ctx.params);
		for (const route of matchedRoutes) {
			const parse = route.options.params?.parse ?? route.options.parseParams;
			if (parse) Object.assign(params, parse(params));
		}
		return handler({
			...ctx,
			params
		});
	};
}
async function handleServerRoutes({ getRouter, request, url, executeRouter, context, executedRequestMiddlewares }) {
	const router = await getRouter();
	const pathname = executeRewriteInput(router.rewrite, url).pathname;
	const [matchedRoutes, rawParams, foundRoute] = router.getMatchedRoutes(pathname);
	const isExactMatch = foundRoute && rawParams["**"] === void 0;
	const routeMiddlewares = [];
	let terminalHandler = (ctx) => executeRouter(ctx.context, matchedRoutes);
	let terminalNext;
	for (const route of matchedRoutes) {
		const serverMiddleware = route.options.server?.middleware;
		if (serverMiddleware) {
			const flattened = flattenMiddlewares(serverMiddleware);
			for (const m of flattened) if (!executedRequestMiddlewares.has(m)) routeMiddlewares.push(m.options.server);
		}
	}
	const server = foundRoute?.options.server;
	if (server?.handlers && isExactMatch) {
		const handlers = typeof server.handlers === "function" ? server.handlers({ createHandlers: (d) => d }) : server.handlers;
		const requestMethod = request.method.toUpperCase();
		const handler = requestMethod === "HEAD" ? handlers["HEAD"] ?? handlers["GET"] ?? handlers["ANY"] : handlers[requestMethod] ?? handlers["ANY"];
		if (handler) {
			const mayDefer = !!foundRoute.options.component;
			if (typeof handler !== "function") {
				if (handler.middleware?.length) {
					const handlerMiddlewares = flattenMiddlewares(handler.middleware);
					for (const m of handlerMiddlewares) routeMiddlewares.push(m.options.server);
				}
			}
			const routeHandler = typeof handler === "function" ? handler : handler.handler;
			if (routeHandler) {
				const parsedHandler = withParsedParams(routeHandler, matchedRoutes);
				if (!mayDefer) {
					terminalHandler = parsedHandler;
					terminalNext = throwIfMayNotDefer;
				} else routeMiddlewares.push(parsedHandler);
			}
		}
	}
	return normalizeSsrResponse(await executeMiddleware(routeMiddlewares, terminalHandler, {
		request,
		context,
		params: rawParams,
		pathname,
		handlerType: "router"
	}, request.signal, terminalNext));
}
var fetch = createStartHandler(defaultStreamHandler);
function createServerEntry(entry) {
	return { async fetch(...args) {
		return await entry.fetch(...args);
	} };
}
var server_default = createServerEntry({ fetch });
//#endregion
export { ssr_exports as i, createServerFn as n, getServerFnById as r, TSS_SERVER_FUNCTION as t };
