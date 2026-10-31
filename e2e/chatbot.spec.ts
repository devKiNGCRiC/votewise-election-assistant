import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Ask Pucho a question" }).click();
});

test("answers a typed question and links to the right page", async ({ page }) => {
  const chat = page.getByRole("dialog", { name: /Pucho/ });
  await chat.getByLabel("Your question").fill("how do i register?");
  await chat.getByRole("button", { name: "Send" }).click();
  await expect(chat.getByText(/Apply online with Form 6/)).toBeVisible();
  await chat.getByRole("link", { name: "Check if you can enrol" }).click();
  await expect(page).toHaveURL("/eligibility");
  await expect(chat).toBeHidden();
});

test("suggestion chips ask for you", async ({ page }) => {
  const chat = page.getByRole("dialog", { name: /Pucho/ });
  await chat.getByRole("button", { name: "What is NOTA?" }).click();
  await expect(chat.getByText(/None of the Above/).last()).toBeVisible();
});

test("unknown questions get a helpful fallback", async ({ page }) => {
  const chat = page.getByRole("dialog", { name: /Pucho/ });
  await chat.getByLabel("Your question").fill("best biryani in Hyderabad");
  await chat.getByLabel("Your question").press("Enter");
  await expect(chat.getByText(/call 1950/)).toBeVisible();
});

test("Escape closes the chat", async ({ page }) => {
  await expect(page.getByRole("dialog", { name: /Pucho/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Pucho/ })).toBeHidden();
});
