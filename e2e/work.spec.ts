import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
  await page.goto("/");
});

test("three cards with outcomes", async ({ page }) => {
  const work = page.locator("#work");
  await expect(work).toContainText("40% faster API responses");
  await expect(work).toContainText("Onboarding, fraud review and approvals in one flow");
  await expect(work).toContainText("Real-time behavioural alerts");
});

test("read more opens and closes", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "dialog interaction checked on desktop");
  const trigger = page.getByRole("button", { name: "Read more" }).first();
  await trigger.scrollIntoViewIfNeeded();
  await trigger.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Redis caching and JPA query optimization");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});
