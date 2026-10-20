import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test("stack heading stays readable and the visual explains the technologies", async ({ page }) => {
  await skipIntro(page);
  await page.goto("/#stack");
  const section = page.locator("#stack");
  const heading = section.getByRole("heading", { name: "My technical stack", exact: true });
  await expect(heading).toBeVisible();
  // A heading can be 'visible' to Playwright while its words are clipped.
  // Verify every word remains within the heading's actual painted bounds.
  const wordsInside = await heading.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    return [...element.querySelectorAll("span span")].every((word) => {
      const rect = word.getBoundingClientRect();
      return rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1;
    });
  });
  expect(wordsInside).toBe(true);
  const diagram = section.locator("figure").first();
  for (const label of ["User interface", "Application services", "Data and caching", "Cloud and delivery"]) {
    await expect(diagram).toContainText(label);
  }
  await expect(section.locator("img")).toHaveCount(0);
});
