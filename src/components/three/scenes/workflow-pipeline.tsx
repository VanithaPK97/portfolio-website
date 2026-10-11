"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { type Material, type Mesh } from "three";
import { pathPoint, tokenRoute, type Vec3 } from "@/lib/three/motion-math";
import { useSceneColors } from "@/lib/three/scene-colors";
import { SceneLights, Label, accentTone, nodeTone, useClay } from "../clay";
import { useSlotVisible } from "../three-slot";

const APPLY: Vec3 = [-2.1, 0, 0];
const FRAUD: Vec3 = [-0.7, 0, 0];
const APPROVE: Vec3 = [0.7, 0, 0];
const ACCOUNT: Vec3 = [2.1, 0, 0];
const MANUAL: Vec3 = [-0.7, 1.1, 0];

const DIRECT: Vec3[] = [APPLY, FRAUD, APPROVE, ACCOUNT];
const REVIEW: Vec3[] = [APPLY, FRAUD, MANUAL, FRAUD, APPROVE, ACCOUNT];
const TOKENS = 6;
const PERIOD = 4.2;

// HSBC onboarding: applications flow Apply → Fraud review → Approve →
// Account open; every third one detours through a manual check.
export function WorkflowPipeline() {
  const colors = useSceneColors();
  const visible = useSlotVisible();
  const tokens = useRef<(Mesh | null)[]>([]);

  const nodeMat = useClay(nodeTone(colors));
  const accountMat = useClay(accentTone(colors, 0.3));
  const line = colors.muted;

  useFrame((state) => {
    if (!visible) return;
    const base = state.clock.elapsedTime / PERIOD;
    for (let i = 0; i < TOKENS; i++) {
      const mesh = tokens.current[i];
      if (!mesh) continue;
      const t = (base + i / TOKENS) % 1;
      const [x, y, z] = pathPoint(tokenRoute(i) === "review" ? REVIEW : DIRECT, t);
      mesh.position.set(x, y, z);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.7, 5.3]} fov={42} rotation={[-0.06, 0, 0]} />
      <SceneLights />

      <Line points={[APPLY, FRAUD, APPROVE, ACCOUNT]} color={line} lineWidth={2} />
      <Line points={[FRAUD, MANUAL]} color={line} lineWidth={2} />

      <Node position={APPLY} label="Apply" material={nodeMat} colors={colors} />
      <group position={FRAUD}>
        <mesh material={nodeMat} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        </mesh>
        <group position={[0, -0.7, 0]}>
          <Label text="Fraud review" size={0.14} color={colors.muted} />
        </group>
      </group>
      <Node position={APPROVE} label="Approve" material={nodeMat} colors={colors} />
      <Node position={ACCOUNT} label="Account open" material={accountMat} colors={colors} />
      <group position={MANUAL}>
        <RoundedBox args={[0.55, 0.45, 0.45]} radius={0.05} material={nodeMat} />
        <group position={[0, 0.55, 0]}>
          <Label text="Manual check" size={0.14} color={colors.muted} />
        </group>
      </group>

      {Array.from({ length: TOKENS }).map((_, i) => (
        <mesh key={i} ref={(el) => void (tokens.current[i] = el)}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={colors.accent} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
    </>
  );
}

function Node({
  position,
  label,
  material,
  colors,
}: {
  position: Vec3;
  label: string;
  material: Material;
  colors: { muted: string };
}) {
  return (
    <group position={position}>
      <RoundedBox args={[0.6, 0.55, 0.5]} radius={0.06} material={material} />
      <group position={[0, -0.6, 0]}>
        <Label text={label} size={0.14} color={colors.muted} />
      </group>
    </group>
  );
}
