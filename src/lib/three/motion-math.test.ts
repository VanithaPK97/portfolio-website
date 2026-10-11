import { describe, it, expect } from "vitest";
import { explode, pathPoint, cacheSchedule, tokenRoute, type Vec3 } from "./motion-math";

describe("explode", () => {
  it("is closed at progress 0", () => {
    expect(explode(0)).toEqual({ gap: 0.35, rotationY: 0 });
  });
  it("is fully open at progress 1", () => {
    expect(explode(1)).toEqual({ gap: 1.1, rotationY: 0.44 });
  });
  it("clamps out-of-range progress", () => {
    expect(explode(-1)).toEqual(explode(0));
    expect(explode(2)).toEqual(explode(1));
  });
});

describe("pathPoint", () => {
  const p: Vec3[] = [
    [0, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ];
  it("interpolates by arc length", () => {
    expect(pathPoint(p, 0.75)).toEqual([1, 0.5, 0]);
  });
  it("wraps t into [0, 1)", () => {
    expect(pathPoint(p, 1)).toEqual(pathPoint(p, 0));
  });
});

describe("cacheSchedule", () => {
  it("is a miss during the first request", () => {
    expect(cacheSchedule(1.0)).toEqual({ kind: "miss", request: 0, local: 0.5 });
  });
  it("is a hit during the second request", () => {
    expect(cacheSchedule(2.4)).toEqual({ kind: "hit", request: 1, local: 0.5 });
  });
  it("repeats every cycle", () => {
    expect(cacheSchedule(5.4)).toEqual(cacheSchedule(1.0));
  });
});

describe("tokenRoute", () => {
  it("sends every third token to review", () => {
    expect(tokenRoute(0)).toBe("direct");
    expect(tokenRoute(2)).toBe("review");
    expect(tokenRoute(5)).toBe("review");
  });
});
