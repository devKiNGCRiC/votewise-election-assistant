import { expect, test } from "@playwright/test";

test("bottom tab bar navigates between sections", async ({ page }) => {
  await page.goto("/");
  const tabs = page.getByRole("navigation", { name: "Main" });
  for (const [name, path] of [
    ["Check", "/eligibility"],
    ["Learn", "/learn"],
    ["EVM", "/simulation"],
    ["Quiz", "/quiz"],
    ["Home", "/"],
  ] as const) {
    await tabs.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(path);
    await expect(tabs.getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("page never scrolls sideways", async ({ page }) => {
  for (const path of ["/", "/eligibility", "/learn", "/simulation", "/quiz", "/about"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `horizontal overflow on ${path}`).toBeLessThanOrEqual(0);
  }
});

test("EVM can be completed on a phone", async ({ page }) => {
  await page.clock.install();
  await page.goto("/simulation");
  await page.getByRole("button", { name: "EPIC (voter ID)" }).tap();
  await page.getByRole("button", { name: "Move to the second officer" }).tap();
  await page.getByRole("button", { name: "Get inked" }).tap();
  await page.getByRole("button", { name: "Sign and take the slip" }).tap();
  await page.getByRole("button", { name: "Hand over my slip" }).tap();
  await page.getByRole("button", { name: "Vote for Gurpreet Gill, Ekta Pragati Dal" }).tap();
  await expect(page.getByText("Sl. No. 4")).toBeVisible();
  await page.clock.runFor(10_000);
  await expect(page.getByRole("heading", { name: "You just voted. Practice-wise." })).toBeVisible();
});
