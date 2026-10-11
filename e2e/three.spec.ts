import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test.beforeEach(async ({ page }) => {
  await skipIntro(page);
});

test("canvas mounts on desktop", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "3D canvas checked on desktop");
  await page.goto("/");
  await expect(page.locator("[data-scene-canvas]")).toBeAttached({ timeout: 6000 });
  const probe = page.locator('[data-three-slot="probe"]');
  await probe.scrollIntoViewIfNeeded();
  await expect(probe).toHaveAttribute("data-three-state", "3d", { timeout: 6000 });
});

test("scene follows theme toggle", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "theme sync checked on desktop");
  await page.goto("/");
  const canvas = page.locator("[data-scene-canvas]");
  await expect(canvas).toBeAttached({ timeout: 6000 });
  const before = await canvas.getAttribute("data-scene-theme");
  await page.getByRole("button", { name: "Switch colour theme" }).click();
  await expect(canvas).not.toHaveAttribute("data-scene-theme", before ?? "");
});
