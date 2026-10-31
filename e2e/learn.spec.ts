import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/learn");
});

test("steps through all five steps and continues to the simulator", async ({ page }) => {
  const titles = [
    "Get your name on the electoral roll",
    "Have your EPIC, or another photo ID",
    "Find your polling booth",
    "Cast your vote on the EVM",
    "Counting and the result",
  ];
  await expect(page.getByRole("button", { name: "Back", exact: true })).toBeDisabled();
  for (const [i, title] of titles.entries()) {
    await expect(page.getByRole("heading", { level: 2, name: title })).toBeVisible();
    await expect(page.getByText(`Step ${i + 1} of 5`)).toBeVisible();
    if (i < titles.length - 1) await page.getByRole("button", { name: "Next step" }).click();
  }
  await page.getByRole("link", { name: "Try it on the EVM" }).click();
  await expect(page).toHaveURL("/simulation");
});

test("jumps straight to a step from the step list", async ({ page }) => {
  await page.getByRole("tab", { name: /Booth/ }).click();
  await expect(page.getByRole("tab", { name: /Booth/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Find your polling booth" })).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Have your EPIC, or another photo ID" })).toBeVisible();
});

test("arrow keys move between steps", async ({ page }) => {
  await page.getByRole("tab", { name: /Enrol/ }).focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("heading", { name: "Find your polling booth" })).toBeVisible();
});

test("myth cards flip to show the fact", async ({ page }) => {
  const card = page.getByRole("button", { name: /Myth: EVMs are connected to the internet/ });
  await card.click();
  const flipped = page.getByRole("button", { name: /Fact: EVMs are standalone machines/ });
  await expect(flipped).toHaveAttribute("aria-pressed", "true");
  await flipped.click();
  await expect(page.getByRole("button", { name: /Myth: EVMs are connected/ })).toHaveAttribute("aria-pressed", "false");
});

test("checklist ticks are saved across reloads", async ({ page }) => {
  const item = page.getByRole("checkbox", { name: "I've checked the polling hours" });
  await expect(item).toHaveAttribute("aria-checked", "false");
  await item.click();
  await expect(item).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("img", { name: "1 of 6 done" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("checkbox", { name: "I've checked the polling hours" })).toHaveAttribute(
    "aria-checked",
    "true",
  );

  await page.getByRole("button", { name: "Clear all ticks" }).click();
  await expect(page.getByRole("img", { name: "0 of 6 done" })).toBeVisible();
});

test("ticking everything shows the done state", async ({ page }) => {
  const boxes = page.getByRole("checkbox");
  for (let i = 0; i < 6; i++) await boxes.nth(i).click();
  await expect(page.getByText("Bag packed. Go vote!")).toBeVisible();
});
