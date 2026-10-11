"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox, Cylinder } from "@react-three/drei";
import type { Mesh } from "three";
import { Color } from "three";
import { cacheSchedule, pathPoint, type Vec3 } from "@/lib/three/motion-math";
import { useSceneColors } from "@/lib/three/scene-colors";
import { SceneLights, Label, useClay } from "../clay";
import { useSlotVisible } from "../three-slot";

const CLIENT: Vec3 = [-1.6, 0, 0];
const REDIS: Vec3 = [0, 0, 0];
const PG: Vec3 = [1.6, 0, 0];
const MISS_PATH: Vec3[] = [CLIENT, REDIS, PG, REDIS, CLIENT];
const HIT_PATH: Vec3[] = [CLIENT, REDIS, CLIENT];

// The 40% story: the first request misses and travels all the way to
// PostgreSQL; the next three are served fast from Redis.
export function CachePath() {
  const colors = useSceneColors();
  const visible = useSlotVisible();
  const packet = useRef<Mesh>(null);
  const [kind, setKind] = useState<"miss" | "hit">("miss");

  const clientMat = useClay(colors.surface2);
  const redisMat = useClay(new Color(colors.surface2).lerp(new Color(colors.accent), 0.25).getStyle());
  const pgMat = useClay(colors.surface2);

  useFrame((state) => {
    if (!visible || !packet.current) return;
    const s = cacheSchedule(state.clock.elapsedTime);
    if (s.kind !== kind) setKind(s.kind);
    const [x, y, z] = pathPoint(s.kind === "miss" ? MISS_PATH : HIT_PATH, s.local);
    packet.current.position.set(x, y, z);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.5, 4.3]} fov={42} />
      <SceneLights />

      <group position={CLIENT}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.06} material={clientMat} />
        <group position={[0, -0.62, 0]}>
          <Label text="Client" size={0.17} color={colors.muted} />
        </group>
      </group>

      <group position={REDIS}>
        <mesh material={redisMat}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
        </mesh>
        <group position={[0, -0.68, 0]}>
          <Label text="Redis" size={0.17} color={colors.muted} />
        </group>
        <group position={[0, 0.75, 0]}>
          <Label text={kind} size={0.15} color={colors.accent} mono />
        </group>
      </group>

      <group position={PG}>
        <Cylinder args={[0.38, 0.38, 0.8, 32]} material={pgMat} />
        <group position={[0, -0.68, 0]}>
          <Label text="PostgreSQL" size={0.15} color={colors.muted} />
        </group>
      </group>

      <mesh ref={packet}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial color={colors.accent} roughness={0.3} metalness={0.1} />
      </mesh>
    </>
  );
}
