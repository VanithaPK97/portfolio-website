import { describe, it, expect } from "vitest";
import { introState, shouldPlayIntro, INTRO_TOTAL_MS } from "./intro";

describe("introState", () => {
  it("starts typing the first line", () => {
    expect(introState(0)).toEqual({ phase: "typing-1", first: 0, second: 0 });
  });
  it("types the first line character by character", () => {
    expect(introState(400).first).toBe(10);
  });
  it("pauses after the first line", () => {
    expect(introState(900)).toEqual({ phase: "pause", first: 20, second: 0 });
  });
  it("types the second line after the pause", () => {
    expect(introState(1260)).toEqual({ phase: "typing-2", first: 20, second: 4 });
  });
  it("holds the full headline", () => {
    const s = introState(3700);
    expect(s.phase).toBe("hold");
    expect(s.second).toBe(63);
  });
  it("docks then finishes", () => {
    expect(introState(4200).phase).toBe("dock");
    expect(introState(5000).phase).toBe("done");
  });
  it("totals 4820ms", () => {
    expect(INTRO_TOTAL_MS).toBe(4820);
  });
});

describe("shouldPlayIntro", () => {
  it("plays only when not seen and motion is allowed", () => {
    expect(shouldPlayIntro({ reducedMotion: false, seen: false })).toBe(true);
    expect(shouldPlayIntro({ reducedMotion: true, seen: false })).toBe(false);
    expect(shouldPlayIntro({ reducedMotion: false, seen: true })).toBe(false);
  });
});
