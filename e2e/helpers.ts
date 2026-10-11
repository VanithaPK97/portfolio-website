import type { Page } from "@playwright/test";

// Marks the intro as already seen so tests that are not about the intro
// land straight on the page. Call before navigating.
export async function skipIntro(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
  });
}
