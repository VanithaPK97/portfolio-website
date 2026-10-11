import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

const FALLBACK_PROJECTS = new Set(["reduced", "no-webgl"]);

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
});

test("shows 2D fallbacks, never an empty 3D slot", async ({ page }) => {
  test.skip(!FALLBACK_PROJECTS.has(test.info().project.name), "fallback projects only");
  await page.goto("/");

  await expect(page.locator("[data-scene-canvas]")).toHaveCount(0);

  const slots = page.locator("[data-three-slot]");
  const count = await slots.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const slot = slots.nth(i);
    await slot.scrollIntoViewIfNeeded();
    await expect(slot).toHaveAttribute("data-three-state", "fallback");
    const box = await slot.boundingBox();
    expect(box && box.height).toBeGreaterThan(0);
  }
});
