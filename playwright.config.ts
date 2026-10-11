import { defineConfig, devices } from "@playwright/test";

const PORT = 3200;
const baseURL = `http://localhost:${PORT}`;

// All projects drive the installed Microsoft Edge, so no browser download
// is needed. The webServer builds and serves the production app once.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  retries: 0,
  use: { baseURL, channel: "msedge" },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Edge"], channel: "msedge", viewport: { width: 1440, height: 900 } },
    },
    {
      name: "phone",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "reduced",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: { width: 1440, height: 900 },
        reducedMotion: "reduce",
      },
    },
    {
      name: "no-webgl",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: { width: 1440, height: 900 },
        launchOptions: { args: ["--disable-webgl", "--disable-3d-apis"] },
      },
    },
    {
      name: "no-js",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        viewport: { width: 1440, height: 900 },
        javaScriptEnabled: false,
      },
    },
  ],
  webServer: {
    command: "npm run build && npx next start -p 3200",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 240_000,
  },
});
