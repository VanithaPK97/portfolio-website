"use client";

import { useMemo } from "react";
import { MeshStandardMaterial } from "three";
import { Text } from "@react-three/drei";

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
  return (
    <Text
      font={mono ? undefined : "/fonts/Satoshi-Bold.otf"}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}
