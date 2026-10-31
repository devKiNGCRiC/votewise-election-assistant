import { expect, type Page, test } from "@playwright/test";

async function walkToBallot(page: Page) {
  await page.getByRole("button", { name: "Aadhaar" }).click();
  await expect(page.getByText("Name found at serial no. 142")).toBeVisible();
  await page.getByRole("button", { name: "Move to the second officer" }).click();
  await expect(page.getByRole("img", { name: "An index finger, not yet inked" })).toBeVisible();
  await page.getByRole("button", { name: "Get inked" }).click();
  await expect(page.getByRole("img", { name: "An index finger marked with indelible ink" })).toBeVisible();
  await page.getByRole("button", { name: "Sign and take the slip" }).click();
  await page.getByRole("button", { name: "Hand over my slip" }).click();
  await expect(page.getByRole("heading", { name: "The green light is on" })).toBeVisible();
}

test.beforeEach(async ({ page }) => {
  await page.clock.install();
  await page.goto("/simulation");
});

test("ballot buttons stay locked until the officer enables the ballot", async ({ page }) => {
  const buttons = page.getByRole("button", { name: /^Vote for / });
  await expect(buttons).toHaveCount(5);
  for (const b of await buttons.all()) await expect(b).toBeDisabled();
  await expect(page.getByText("Buttons stay locked")).toBeVisible();
});

test("full booth flow: vote, VVPAT slip for 7 seconds, then done", async ({ page }) => {
  await walkToBallot(page);
  for (const b of await page.getByRole("button", { name: /^Vote for / }).all()) await expect(b).toBeEnabled();

  await page.getByRole("button", { name: "Vote for Zoya Qureshi, Haritha Sangam" }).click();
  await expect(page.getByRole("heading", { name: "Beep! Now check the slip" })).toBeVisible();
  await expect(page.getByText("Sl. No. 3")).toBeVisible();
  await expect(page.getByLabel("Seconds the slip stays visible")).toHaveText("7s");

  // One press only: the ballot locks once a vote is cast.
  await expect(page.getByRole("button", { name: "Vote for Meera Kulkarni, Jan Awaaz Manch" })).toBeDisabled();

  await page.clock.runFor(4_000);
  await expect(page.getByLabel("Seconds the slip stays visible")).toHaveText("4s");

  await page.clock.runFor(5_000);
  await expect(page.getByRole("heading", { name: "You just voted. Practice-wise." })).toBeVisible();
});

test("practise again resets the booth", async ({ page }) => {
  await walkToBallot(page);
  await page.getByRole("button", { name: "Vote for None of the Above, NOTA" }).click();
  await page.clock.runFor(10_000);
  await page.getByRole("button", { name: "Practise again" }).click();
  await expect(page.getByRole("heading", { name: "Which ID did you bring?" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Vote for / }).first()).toBeDisabled();
});

test("beep sound can be switched off", async ({ page }) => {
  const toggle = page.getByRole("button", { name: /Beep sound/ });
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(toggle).toHaveText(/off/);
});

test("done screen links to the quiz", async ({ page }) => {
  await walkToBallot(page);
  await page.getByRole("button", { name: "Vote for Arjun Rao, Navyug Morcha" }).click();
  await page.clock.runFor(10_000);
  await page.getByRole("link", { name: "Take the quiz" }).click();
  await expect(page).toHaveURL("/quiz");
});
