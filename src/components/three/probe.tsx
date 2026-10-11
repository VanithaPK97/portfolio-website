"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RoundedBox } from "@react-three/drei";
import type { Mesh } from "three";
import { ThreeSlot } from "./three-slot";
import { SceneLights } from "./clay";

// Temporary placeholder so the shared canvas has a scene to mount while the
// real scenes are built. Task 12 replaces this with the stack tower.
function ProbeScene() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.6;
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={40} />
      <SceneLights />
      <RoundedBox ref={ref} args={[1.4, 1.4, 1.4]} radius={0.12}>
        <meshStandardMaterial color="#2448d6" roughness={0.5} metalness={0.05} />
      </RoundedBox>
    </>
  );
}

export function Probe() {
  return (
    <ThreeSlot name="probe" scope="section" fallback={<div className="h-full" />} className="relative h-40">
      <ProbeScene />
    </ThreeSlot>
  );
}
