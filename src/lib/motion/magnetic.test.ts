import { describe, it, expect } from "vitest";
import { magneticOffset } from "./magnetic";

const rect = { left: 0, top: 0, width: 200, height: 100 };

describe("magneticOffset", () => {
  it("is zero at the centre", () => {
    expect(magneticOffset({ x: 100, y: 50 }, rect, 0.3)).toEqual({ x: 0, y: 0 });
  });
  it("scales the distance from centre by strength", () => {
    expect(magneticOffset({ x: 200, y: 50 }, rect, 0.3)).toEqual({ x: 30, y: 0 });
  });
});
