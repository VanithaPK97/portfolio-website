import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test("footer offers direct contact links and hides the floating dock", async ({ page }) => {
  await skipIntro(page);
  await page.goto("/#contact");
  const footer = page.locator("footer#contact");
  await footer.scrollIntoViewIfNeeded();
  await expect.poll(() => footer.evaluate((element) => Math.round(element.getBoundingClientRect().bottom - innerHeight))).toBeLessThanOrEqual(1);
  await expect(footer.getByRole("heading", { name: "Let’s create something that matters." })).toBeVisible();
  await expect(footer.locator('a[href="mailto:vanithapkrishnamurthy@gmail.com"]')).toBeVisible();
  await expect(footer.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(footer.getByRole("link", { name: "Download CV" })).toHaveAttribute("download", "");
  await expect(page.locator("[data-dock]")).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  if (test.info().project.name === "desktop") {
    await page.screenshot({ path: "test-results/footer-preview.png" });
  }
});
