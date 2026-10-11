"use client";

import { useMemo } from "react";
import { Color, MeshStandardMaterial } from "three";
import { Text } from "@react-three/drei";

// A node tone that stands off the grid paper (which is the surface-2 colour)
// in both themes: nudge surface-2 toward the ink colour.
export function nodeTone(colors: { surface2: string; ink: string }) {
  return new Color(colors.surface2).lerp(new Color(colors.ink), 0.16).getStyle();
}

export function accentTone(colors: { surface2: string; ink: string; accent: string }, amount = 0.3) {
  return new Color(nodeTone(colors)).lerp(new Color(colors.accent), amount).getStyle();
}

// Shared look for every scene: soft matte "clay" surfaces, one lighting rig,
// and labels in the site's display font.

export function SceneLights() {
  return (
    <>
      <hemisphereLight intensity={0.9} />
      <directionalLight intensity={1.4} position={[4, 6, 3]} />
    </>
  );
}

export function useClay(color: string, opts?: { roughness?: number }) {
  const roughness = opts?.roughness ?? 0.55;
  return useMemo(
    () => new MeshStandardMaterial({ color, roughness, metalness: 0.05 }),
    [color, roughness],
  );
}

export function Label({
  text,
  size = 0.2,
  color,
  mono = false,
}: {
  text: string;
  size?: number;
  color: string;
  mono?: boolean;
}) {
  // Self-hosted TTF (troika cannot parse this family's OTF or decode WOFF2).
  return (
    <Text
      font="/fonts/Satoshi-Bold.ttf"
      fontSize={size}
      letterSpacing={mono ? 0.08 : 0}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}
