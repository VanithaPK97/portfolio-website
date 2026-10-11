import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
  await page.goto("/");
});

test("nav link lands below the header", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "scroll positioning checked on desktop");
  await page.locator("header nav").getByRole("link", { name: "Career" }).click();
  await page.waitForTimeout(1500);
  const heading = page.locator("#career-title");
  const box = await heading.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(40);
  expect(box!.y).toBeLessThanOrEqual(300);
});

test("reduced motion keeps native scroll", async ({ page }) => {
  test.skip(test.info().project.name !== "reduced", "reduced project only");
  const hasLenis = await page.evaluate(() => document.documentElement.classList.contains("lenis"));
  expect(hasLenis).toBe(false);
});

test("dock appears after the hero and hides at contact", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "dock checked on desktop");
  const dock = page.locator("[data-dock]");
  await expect(dock).toBeHidden();
  await page.locator("#work").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await expect(dock).toBeVisible();
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await expect(dock).toBeHidden();
});

test("headings stay readable and the snippet reveals", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "reveal checked on desktop");
  await expect(page.getByRole("heading", { name: "Selected work" })).toBeVisible();
  await page.locator("#stack pre").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  const lastLineOpacity = await page.evaluate(() => {
    const lines = document.querySelectorAll("#stack pre code > span");
    const last = lines[lines.length - 1] as HTMLElement | undefined;
    return last ? getComputedStyle(last).opacity : "missing";
  });
  expect(lastLineOpacity).toBe("1");
});
