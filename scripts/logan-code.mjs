import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 1100 } });
page.setDefaultTimeout(20000);
await page.goto("http://127.0.0.1:8080/coach", { waitUntil: "domcontentloaded" });
await page.locator("#coach-pin").waitFor({ state: "visible" });
await page.locator("#coach-pin").evaluate((el) => {
  el.value = "0803";
});
await page.getByRole("button", { name: "Go" }).click({ force: true });
await page.waitForTimeout(1200);
if (await page.getByRole("button", { name: "Users" }).count()) {
  await page.getByRole("button", { name: "Users" }).click();
  await page.waitForTimeout(1200);
  const gen = page.getByRole("button", { name: /Generate family codes/i });
  if (await gen.count()) await gen.click();
  await page.waitForTimeout(2000);
}
const text = await page.locator("body").innerText();
const idx = text.search(/Logan/i);
const slice = idx >= 0 ? text.slice(idx, idx + 220) : text.slice(0, 400);
const match = slice.match(/(\d{6,8})/);
console.log(JSON.stringify({ logan: match?.[1] || null, slice, unlocked: /Coach desk|Users/i.test(text) }, null, 2));
await browser.close();
if (!match?.[1]) process.exit(1);
