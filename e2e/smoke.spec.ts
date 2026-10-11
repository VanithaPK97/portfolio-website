import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test("page loads with no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });

  await skipIntro(page);
  await page.goto("/");

  await expect(page.locator("#top")).toBeAttached();
  await expect(page.locator("#contact")).toBeAttached();
  expect(errors).toEqual([]);
});
