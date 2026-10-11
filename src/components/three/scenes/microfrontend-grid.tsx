"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { easing } from "maath";
import { Color, type Group, type Mesh, type MeshStandardMaterial } from "three";
import { useSceneColors } from "@/lib/three/scene-colors";
import { SceneLights } from "../clay";
import { useSlotVisible } from "../three-slot";

type Tile = { pos: [number, number]; size: [number, number]; start: [number, number, number] };

// Six tiles that drift apart, then snap into a page layout when the card
// scrolls into view: React microfrontends assembling into one surface.
const TILES: Tile[] = [
  { pos: [0, 1.05], size: [3.2, 0.4], start: [-2.4, 2.2, 1.1] },
  { pos: [-1.2, 0.05], size: [0.8, 1.4], start: [-3.0, -0.4, 0.8] },
  { pos: [0.42, 0.3], size: [2.2, 0.9], start: [2.6, 1.3, 1.4] },
  { pos: [-0.1, -0.45], size: [1.05, 0.45], start: [-1.8, -2.4, 0.9] },
  { pos: [1.0, -0.45], size: [1.05, 0.45], start: [2.9, -1.7, 1.2] },
  { pos: [0, -1.05], size: [3.2, 0.3], start: [0.6, -2.8, 1.5] },
];
const ALERT = TILES[3].pos;
const ALERT_CYCLE = 3.2;
const ALERT_DUR = 1.2;

export function MicrofrontendGrid() {
  const colors = useSceneColors();
  const visible = useSlotVisible();
  const groups = useRef<(Group | null)[]>([]);
  const started = useRef(false);
  const ring = useRef<Mesh>(null);

  const accent = new Color(colors.accent);
  const tileColor = (i: number) =>
    i === 0 ? new Color(colors.surface2).lerp(accent, 0.18).getStyle() : colors.surface2;

  useFrame((_, dt) => {
    if (visible) started.current = true;
    if (started.current) {
      for (let i = 0; i < TILES.length; i++) {
        const g = groups.current[i];
        if (g) easing.damp3(g.position, [TILES[i].pos[0], TILES[i].pos[1], 0], 0.3, dt);
      }
    }
    if (ring.current && visible) {
      const t = ring.current.userData.clock = (ring.current.userData.clock ?? 0) + dt;
      const local = t % ALERT_CYCLE;
      const p = local < ALERT_DUR ? local / ALERT_DUR : -1;
      const mat = ring.current.material as MeshStandardMaterial;
      if (p < 0) {
        ring.current.scale.setScalar(0.0001);
        mat.opacity = 0;
      } else {
        ring.current.scale.setScalar(0.0001 + 1.4 * p);
        mat.opacity = 1 - p;
      }
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4.7]} fov={42} />
      <SceneLights />

      {TILES.map((tile, i) => (
        <group key={i} ref={(el) => void (groups.current[i] = el)} position={tile.start}>
          <RoundedBox args={[tile.size[0], tile.size[1], 0.08]} radius={0.04}>
            <meshStandardMaterial color={tileColor(i)} roughness={0.55} metalness={0.05} />
          </RoundedBox>
        </group>
      ))}

      <mesh ref={ring} position={[ALERT[0], ALERT[1], 0.12]}>
        <torusGeometry args={[0.3, 0.02, 16, 48]} />
        <meshStandardMaterial color={colors.accent} transparent opacity={0} roughness={0.4} />
      </mesh>
    </>
  );
}
