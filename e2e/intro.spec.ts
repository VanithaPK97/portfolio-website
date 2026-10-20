import { test, expect } from "@playwright/test";

const FIRST = "Hi, I’m Vanitha P K.";
const SECOND_LAST = /into reliable software\s*with Java and React\./;

test("intro types the note", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "intro timing checked on desktop");
  await page.goto("/");
  const overlay = page.locator(".intro-overlay");
  await expect(overlay).toBeVisible();
  const typography = await page.evaluate(() => {
    const intro = getComputedStyle(document.querySelector(".intro-overlay h2")!);
    const hero = getComputedStyle(document.querySelector("[data-hero-headline]")!);
    return { intro: [intro.fontSize, intro.lineHeight, intro.letterSpacing], hero: [hero.fontSize, hero.lineHeight, hero.letterSpacing] };
  });
  expect(typography.intro).toEqual(typography.hero);
  await expect(overlay).toContainText(FIRST, { timeout: 1200 });
  await expect(overlay).toContainText(SECOND_LAST, { timeout: 3800 });
  await expect(overlay).toBeHidden({ timeout: 5500 });
  await expect(page.locator("html")).toHaveAttribute("data-intro", "done");
});

test("skip by scroll shows the page", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "scroll skip checked on desktop");
  await page.goto("/");
  await expect(page.locator(".intro-overlay")).toBeVisible();
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, 400);
  await expect(page.locator(".intro-overlay")).toBeHidden({ timeout: 400 });
  const opacity = await page
    .locator("[data-hero-headline]")
    .evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe("1");
});

test("skip button works", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "skip button checked on desktop");
  await page.goto("/");
  await page.getByRole("button", { name: "Skip intro" }).click();
  await expect(page.locator(".intro-overlay")).toBeHidden();
});

test("intro plays once per session", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "session behaviour checked on desktop");
  await page.goto("/");
  await expect(page.locator(".intro-overlay")).toBeHidden({ timeout: 6000 });
  await page.reload();
  await page.waitForTimeout(100);
  await expect(page.locator(".intro-overlay")).toBeHidden();
});

test("intro never shows under reduced motion or without JS", async ({ page }) => {
  test.skip(
    test.info().project.name !== "reduced" && test.info().project.name !== "no-js",
    "fallback projects only",
  );
  await page.goto("/");
  await page.waitForTimeout(100);
  await expect(page.locator(".intro-overlay")).toBeHidden();
  await expect(page.locator("[data-hero-headline]")).toBeVisible();
});


test("typing cursor follows each headline line", async ({ page }) => {
  test.skip(test.info().project.name !== "desktop", "typing progression checked on desktop");
  await page.goto("/");
  for (const prefix of ["I turn", "into reliable", "with Java"]) {
    await expect.poll(async () => page.locator(".intro-overlay h2 .intro-caret").evaluate((caret) => {
      const style = getComputedStyle(caret);
      return style.display !== "none" && style.animationName === "none" ? caret.parentElement?.textContent : "";
    }), { intervals: [30], timeout: 4500 }).toMatch(new RegExp(`^${prefix}`));
  }
});
