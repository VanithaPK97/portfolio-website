import { describe, it, expect } from "vitest";
import { brands, type BrandKey } from "./brands";

const keys: BrandKey[] = [
  "hsbc", "infosys", "troweprice", "fis", "oracle", "opentext",
  "java", "springboot", "react", "redux", "typescript", "postgresql",
  "redis", "mongodb", "aws", "docker", "gitlab", "jenkins", "git",
  "camunda", "figma", "selenium", "junit", "mocha", "chai", "dzone",
];

describe("brands", () => {
  it("defines every brand with a label and exactly one visual", () => {
    for (const key of keys) {
      const brand = brands[key];
      expect(brand, key).toBeDefined();
      expect(brand.label, key).toBeTruthy();
      const hasPath = typeof brand.path === "string";
      const hasInitials = typeof brand.initials === "string";
      expect(hasPath !== hasInitials, `${key} must have exactly one of path/initials`).toBe(true);
    }
  });

  it("stores a real SVG path for a logo brand", () => {
    expect(brands.hsbc.path).toMatch(/^[Mm]/);
  });
});
