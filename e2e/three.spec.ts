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

test("card scenes mount on desktop without errors", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "card scenes checked on desktop");
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto("/");
  await expect(page.locator("[data-scene-canvas]")).toBeAttached({ timeout: 6000 });
  for (const id of ["case-cache", "case-workflow", "case-microfrontends"]) {
    const slot = page.locator(`[data-three-slot="${id}"]`);
    await slot.scrollIntoViewIfNeeded();
    await expect(slot).toHaveAttribute("data-three-state", "3d", { timeout: 6000 });
  }
  await page.waitForTimeout(1500);
  // A scene that fails to load its label font or geometry logs an error here.
  expect(errors).toEqual([]);
});

test("phone mounts no card scenes", async ({ page }) => {
  test.skip(test.info().project.name !== "phone", "phone gating checked on phone");
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  const threeCards = page.locator('[data-three-slot^="case-"][data-three-state="3d"]');
  await expect(threeCards).toHaveCount(0);
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
