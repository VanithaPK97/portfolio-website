import { describe, it, expect } from "vitest";
import { launchPlane, onPlaneLaunch } from "./plane-launch";

describe("plane launch bus", () => {
  it("notifies a subscriber once per launch", () => {
    let count = 0;
    const off = onPlaneLaunch(() => count++);
    launchPlane();
    launchPlane();
    off();
    expect(count).toBe(2);
  });

  it("stops notifying after unsubscribe", () => {
    let count = 0;
    const off = onPlaneLaunch(() => count++);
    off();
    launchPlane();
    expect(count).toBe(0);
  });
});
