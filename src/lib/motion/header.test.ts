import { describe, it, expect } from "vitest";
import { headerHidden } from "./header";

describe("headerHidden", () => {
  it("hides when scrolling down past 120px", () => {
    expect(headerHidden(100, 200, false)).toBe(true);
  });
  it("shows when scrolling up", () => {
    expect(headerHidden(200, 100, false)).toBe(false);
  });
  it("shows near the top", () => {
    expect(headerHidden(50, 100, false)).toBe(false);
  });
  it("stays visible while the menu is open", () => {
    expect(headerHidden(100, 200, true)).toBe(false);
  });
});
