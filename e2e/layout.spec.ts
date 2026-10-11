import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
  await page.goto("/");
});

test("hero tells the story with pills", async ({ page }) => {
  const hero = page.locator("#top");
  await expect(hero).toContainText("Senior Java Full Stack Developer in Bengaluru");
  for (const name of ["HSBC", "T. Rowe Price", "OpenText", "Spring Boot"]) {
    await expect(hero.getByText(name, { exact: false }).first()).toBeAttached();
  }
  await expect(hero.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/vanitha-pk-719096115",
  );
});

test("nav lists the new sections", async ({ page }) => {
  const links = page.locator("header nav ul li a");
  await expect(links).toHaveText(["Work", "Career", "Stack", "Writing"]);
});

test("phone has no horizontal scroll", async ({ page }) => {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
