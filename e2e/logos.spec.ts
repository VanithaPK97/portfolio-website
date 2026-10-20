import { test, expect } from "@playwright/test";
import { skipIntro } from "./helpers";

test("real company and technology logo assets load in both themes", async ({ page }) => {
  await skipIntro(page);
  await page.goto("/");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => document.documentElement.setAttribute("data-theme", value), theme);
    for (const brand of ["aws", "java", "fis", "troweprice", "oracle"]) {
      const logo = page.locator(`#top [data-brand="${brand}"] img`);
      await expect(logo).toBeVisible();
      await expect.poll(() => logo.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
  }
});
