import { expect, test } from "@playwright/test";
import { questions } from "../src/app/quiz/questions";

test.beforeEach(async ({ page }) => {
  await page.goto("/quiz");
  // Keyboard shortcuts attach on hydration; wait for it before pressing keys.
  await page.waitForLoadState("networkidle");
});

test("perfect run with the keyboard only", async ({ page }) => {
  for (const [i, q] of questions.entries()) {
    await expect(page.getByRole("heading", { level: 1, name: q.question })).toBeVisible();
    await page.keyboard.press(String(q.answer + 1));
    await expect(page.getByText(q.explanation)).toBeVisible();
    // Focus moves to the Next button, so Enter continues.
    const next = page.getByRole("button", { name: i === questions.length - 1 ? "See my score" : "Next question" });
    await expect(next).toBeFocused();
    await page.keyboard.press("Enter");
  }
  await expect(page.getByRole("heading", { name: "Loktantra legend" })).toBeVisible();
  await expect(page.getByText(`Best streak: ${questions.length}`)).toBeVisible();
  await expect(page.getByText("New personal best!")).toBeVisible();
});

test("wrong answer marks the right one and resets the streak", async ({ page }) => {
  const q = questions[0];
  await page.keyboard.press(String(q.answer + 1));
  await expect(page.getByLabel("Streak: 1")).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();

  const q2 = questions[1];
  const wrong = (q2.answer + 1) % q2.options.length;
  await page.getByRole("button", { name: new RegExp(q2.options[wrong].label) }).click();
  await expect(page.getByText("Not quite.")).toBeVisible();
  await expect(page.getByLabel("Streak: 0")).toBeVisible();
  await expect(page.getByLabel("Correct answer")).toBeVisible();
  await expect(page.getByLabel("Your answer")).toBeVisible();
});

test("answers lock after the first pick", async ({ page }) => {
  await page.keyboard.press("1");
  for (const b of await page.getByRole("main").getByRole("list").first().getByRole("button").all()) await expect(b).toBeDisabled();
});

test("best score is saved and play again restarts", async ({ page }) => {
  // Score 1/10: answer the first right, the rest wrong.
  for (const [i, q] of questions.entries()) {
    const pick = i === 0 ? q.answer : (q.answer + 1) % q.options.length;
    await page.keyboard.press(String(pick + 1));
    await page.keyboard.press("Enter");
  }
  await expect(page.getByRole("heading", { name: "Fresh start" })).toBeVisible();

  await page.getByRole("button", { name: "Play again" }).click();
  await expect(page.getByText("Question 1")).toBeVisible();
  await expect(page.getByText(`Best 1/${questions.length}`)).toBeVisible();

  await page.reload();
  await expect(page.getByText(`Best 1/${questions.length}`)).toBeVisible();
});
