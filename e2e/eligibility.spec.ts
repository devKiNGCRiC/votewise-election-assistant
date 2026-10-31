import { expect, type Page, test } from "@playwright/test";

// Freeze "today" so qualifying-date maths is deterministic.
test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-31T10:00:00+05:30"));
  await page.goto("/eligibility");
});

async function answer(page: Page, dob: string, opts: { citizen?: string; lives?: string; registered?: string }) {
  await page.getByLabel("Your date of birth").fill(dob);
  const group = (name: string) => page.getByRole("group", { name });
  await group("Are you an Indian citizen?").getByRole("button", { name: opts.citizen ?? "Yes", exact: true }).click();
  if (opts.citizen === "No") return;
  await group("Where do you live right now?").getByRole("button", { name: opts.lives ?? "In India" }).click();
  await group("Are you already on the voter list?").getByRole("button", { name: opts.registered ?? "No / not sure" }).click();
}

test("shows a placeholder until the form is complete", async ({ page }) => {
  await expect(page.getByText("Your answer shows up here")).toBeVisible();
});

test("adult not on the roll can enrol now with Form 6", async ({ page }) => {
  await answer(page, "2000-06-15", {});
  await expect(page.getByRole("heading", { name: "Yes! You can enrol right now." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Form 6\)/ })).toHaveAttribute("href", "https://voters.eci.gov.in/");
});

test("citizen living abroad is pointed to Form 6A", async ({ page }) => {
  await answer(page, "2000-06-15", { lives: "Abroad" });
  await expect(page.getByRole("link", { name: /Form 6A/ })).toBeVisible();
});

test("17-year-old can apply in advance for the next qualifying date", async ({ page }) => {
  // Turns 18 on 15 Mar 2027 → next qualifying date is 1 Apr 2027.
  await answer(page, "2009-03-15", {});
  await expect(page.getByRole("heading", { name: "Apply now, vote from 1 April 2027" })).toBeVisible();
});

test("just turned 18 after a qualifying date waits for the next one", async ({ page }) => {
  // Turned 18 on 15 Oct 2026, after 1 Oct → enrolled from 1 Jan 2027.
  await answer(page, "2008-10-15", {});
  await expect(page.getByRole("heading", { name: "Apply now, vote from 1 January 2027" })).toBeVisible();
});

test("under 17 is told when they can apply", async ({ page }) => {
  await answer(page, "2010-05-01", {});
  await expect(page.getByRole("heading", { name: "Not yet, but soon" })).toBeVisible();
  await expect(page.getByText("1 May 2028")).toBeVisible();
  await expect(page.getByText("1 May 2027")).toBeVisible();
});

test("already registered voter is sent to check the roll and Form 8", async ({ page }) => {
  await answer(page, "1999-01-01", { registered: "Yes" });
  await expect(page.getByRole("heading", { name: /on the list/ })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Search the electoral roll" })).toHaveAttribute(
    "href",
    "https://electoralsearch.eci.gov.in/",
  );
  await expect(page.getByRole("link", { name: /Form 8/ })).toBeVisible();
});

test("non-citizen gets a clear answer", async ({ page }) => {
  await answer(page, "1999-01-01", { citizen: "No" });
  await expect(page.getByRole("heading", { name: "Only Indian citizens can vote" })).toBeVisible();
  await expect(page.getByRole("group", { name: "Where do you live right now?" })).toHaveCount(0);
});
