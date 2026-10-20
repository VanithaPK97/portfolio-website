import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test("ambient background moves unless reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: test.info().project.name === "reduced" ? "reduce" : "no-preference" });
  await skipIntro(page);
  await page.goto("/");
  const fieldBounds = await page.locator("#top > .ambient-wave-field").boundingBox();
  expect(fieldBounds?.x).toBe(0);
  expect(fieldBounds?.width).toBe(page.viewportSize()?.width);
  const column = page.locator('#top span[style*="animation-delay"]').first();
  await expect(column).toBeAttached();
  const animation = await column.evaluate((element) => getComputedStyle(element).animationName);
  if (test.info().project.name === "reduced") {
    expect(animation).toBe("none");
  } else {
    expect(animation).not.toBe("none");
    const before = await column.evaluate((element) => getComputedStyle(element).transform);
    await expect.poll(() => column.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
});

