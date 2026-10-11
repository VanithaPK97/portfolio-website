"use client";

import { useEffect, useState } from "react";

// 3D scenes read their colours from the page's CSS tokens so they follow
// the theme toggle. parseSceneColors is pure (testable); useSceneColors
// wires it to the live document.

export type SceneColors = {
  surface: string;
  surface2: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  dark: boolean;
};

const FALLBACK = {
  surface: "#ffffff",
  surface2: "#eceff4",
  ink: "#0e1116",
  muted: "#576070",
  line: "#dfe3ea",
  accent: "#2448d6",
};

const TOKENS: Record<keyof typeof FALLBACK, string> = {
  surface: "--surface",
  surface2: "--surface-2",
  ink: "--ink",
  muted: "--muted",
  line: "--line",
  accent: "--accent",
};

export function parseSceneColors(read: (name: string) => string, dark: boolean): SceneColors {
  const pick = (key: keyof typeof FALLBACK) => {
    const value = read(TOKENS[key]).trim();
    return value || FALLBACK[key];
  };
  return {
    surface: pick("surface"),
    surface2: pick("surface2"),
    ink: pick("ink"),
    muted: pick("muted"),
    line: pick("line"),
    accent: pick("accent"),
    dark,
  };
}

function readFromDocument(): SceneColors {
  const style = getComputedStyle(document.documentElement);
  const dark = document.documentElement.dataset.theme === "dark";
  return parseSceneColors((name) => style.getPropertyValue(name), dark);
}

export function useSceneColors(): SceneColors {
  const [colors, setColors] = useState<SceneColors>(() => parseSceneColors(() => "", false));

  useEffect(() => {
    setColors(readFromDocument());
    const observer = new MutationObserver(() => setColors(readFromDocument()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
