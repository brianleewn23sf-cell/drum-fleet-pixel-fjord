/** The chat preview address is killed after a few minutes. Never send it. */
export function isDyingPreviewHost(host: string): boolean {
  return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}

export function previewLinkDies(): boolean {
  return typeof window !== "undefined" && isDyingPreviewHost(window.location.hostname);
}
