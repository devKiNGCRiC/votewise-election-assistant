import { expect, test } from "@playwright/test";

const pages = [
  { link: "Can I vote?", path: "/eligibility", heading: "Can I vote?" },
  { link: "Learn", path: "/learn", heading: "How voting works" },
  { link: "Try the EVM", path: "/simulation", heading: "Practise on the EVM" },
  { link: "Quiz", path: "/quiz", heading: /minimum age to vote/ },
];

test.describe("navbar", () => {
  for (const p of pages) {
    test(`goes to ${p.path}`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: p.link, exact: true }).click();
      await expect(page).toHaveURL(p.path);
      await expect(page.getByRole("heading", { level: 1, name: p.heading })).toBeVisible();
      await expect(
        page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: p.link, exact: true }),
      ).toHaveAttribute("aria-current", "page");
    });
  }

  test("is usable with the keyboard alone", async ({ page }) => {
    await page.goto("/");
    const quizLink = page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Quiz", exact: true });
    for (let i = 0; i < 15 && !(await quizLink.evaluate((el) => el === document.activeElement)); i++) {
      await page.keyboard.press("Tab");
    }
    await expect(quizLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/quiz");
  });

  test("logo returns home", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: "VoteWise home" }).first().click();
    await expect(page).toHaveURL("/");
  });

  test("register link opens the official ECI portal", async ({ page }) => {
    await page.goto("/");
    const link = page.getByRole("link", { name: "Register on ECI" });
    await expect(link).toHaveAttribute("href", "https://voters.eci.gov.in/");
    await expect(link).toHaveAttribute("target", "_blank");
  });
});

test.describe("home hero", () => {
  test("Practise on the EVM goes to the simulator", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("main").getByRole("link", { name: "Practise on the EVM", exact: true }).click();
    await expect(page).toHaveURL("/simulation");
  });

  test("Can I vote? goes to the eligibility checker", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("main").getByRole("link", { name: "Can I vote?" }).click();
    await expect(page).toHaveURL("/eligibility");
  });

  test("journey cards link to each tool", async ({ page }) => {
    await page.goto("/");
    const journey = page.getByRole("list").filter({ hasText: "Check if you can vote" });
    await journey.getByRole("link", { name: /Test yourself/ }).click();
    await expect(page).toHaveURL("/quiz");
  });

  test("checklist teaser deep-links to the checklist", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Open my checklist" }).click();
    await expect(page).toHaveURL("/learn#checklist");
    await expect(page.getByRole("heading", { name: "Election day checklist" })).toBeInViewport();
  });
});

test.describe("footer and about", () => {
  test("About is reachable from the footer", async ({ page }) => {
    await page.goto("/learn");
    await page.getByRole("contentinfo").getByRole("link", { name: "About this project" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.getByRole("heading", { name: "Not an official ECI website" })).toBeVisible();
  });

  test("About links back into the simulator and out to ECI", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("link", { name: "Open the ECI portal" })).toHaveAttribute(
      "href",
      "https://voters.eci.gov.in/",
    );
    await page.getByRole("main").getByRole("link", { name: "Practise on the EVM" }).click();
    await expect(page).toHaveURL("/simulation");
    await page.goBack();
    await expect(page).toHaveURL("/about");
  });

  test("helpline is a tap-to-call link", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Voter helpline: 1950" })).toHaveAttribute("href", "tel:1950");
  });
});
