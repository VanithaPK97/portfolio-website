import { describe, it, expect } from "vitest";
import { shouldRender3D, type Capability } from "./capability";

const base: Capability = {
  webgl2: true,
  reducedMotion: false,
  saveData: false,
  cores: 8,
  width: 1440,
};

describe("shouldRender3D", () => {
  it("allows every scope on a capable device", () => {
    expect(shouldRender3D(base, "section")).toBe(true);
    expect(shouldRender3D(base, "card")).toBe(true);
    expect(shouldRender3D(base, "contact")).toBe(true);
  });

  it("blocks all scopes without webgl2", () => {
    expect(shouldRender3D({ ...base, webgl2: false }, "section")).toBe(false);
  });

  it("blocks all scopes under reduced motion", () => {
    expect(shouldRender3D({ ...base, reducedMotion: true }, "section")).toBe(false);
  });

  it("blocks all scopes with data saver on", () => {
    expect(shouldRender3D({ ...base, saveData: true }, "section")).toBe(false);
  });

  it("blocks all scopes on 2 cores or fewer", () => {
    expect(shouldRender3D({ ...base, cores: 2 }, "section")).toBe(false);
  });

  it("blocks card scenes below 768px but keeps section and contact", () => {
    const narrow = { ...base, width: 767 };
    expect(shouldRender3D(narrow, "card")).toBe(false);
    expect(shouldRender3D(narrow, "section")).toBe(true);
    expect(shouldRender3D(narrow, "contact")).toBe(true);
  });
});
