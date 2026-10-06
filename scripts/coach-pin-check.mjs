import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.setDefaultTimeout(20000);
await page.goto("http://127.0.0.1:8080/coach", { waitUntil: "networkidle" });
await page.locator("#coach-pin").waitFor({ state: "visible" });

async function dump(label) {
  const info = await page.evaluate(() => {
    const el = document.getElementById("coach-pin");
    return {
      value: el ? el.value : null,
      text: document.body.innerText.slice(0, 400),
    };
  });
  console.log(label, JSON.stringify(info));
}

await dump("start");
for (const d of ["0", "8", "0", "3"]) {
  await page.getByRole("button", { name: d, exact: true }).click({ force: true });
  await page.waitForTimeout(150);
}
await dump("after-pad");
if (/Type or tap/i.test(await page.locator("body").innerText())) {
  await page.getByRole("button", { name: "Go" }).click({ force: true });
  await page.waitForTimeout(800);
  await dump("after-go");
}
await page.screenshot({ path: "/workspace/screenshots/coach-pin-test.png", fullPage: true });
const text = await page.locator("body").innerText();
const unlocked = /Brian Lee|Coach desk|Awards|Pitch/i.test(text) && !/Type or tap the 4-digit/i.test(text);
console.log("unlocked", unlocked);
await browser.close();
if (!unlocked) process.exit(1);
