import { describe, it, expect } from "vitest";
import { parseSceneColors } from "./scene-colors";

describe("parseSceneColors", () => {
  it("trims a token value", () => {
    const read = (name: string) => (name === "--accent" ? " #2448d6 " : "");
    expect(parseSceneColors(read, false).accent).toBe("#2448d6");
  });

  it("falls back to the v1 light palette when tokens are empty", () => {
    const colors = parseSceneColors(() => "", false);
    expect(colors).toMatchObject({
      surface: "#ffffff",
      surface2: "#eceff4",
      ink: "#0e1116",
      muted: "#576070",
      line: "#dfe3ea",
      accent: "#2448d6",
    });
  });

  it("passes the dark flag through", () => {
    expect(parseSceneColors(() => "", true).dark).toBe(true);
    expect(parseSceneColors(() => "", false).dark).toBe(false);
  });
});
