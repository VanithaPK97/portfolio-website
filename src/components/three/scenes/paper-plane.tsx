"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges, PerspectiveCamera } from "@react-three/drei";
import { BufferGeometry, Float32BufferAttribute, DoubleSide, type Group } from "three";
import { onPlaneLaunch } from "@/lib/plane-launch";
import { useSceneColors } from "@/lib/three/scene-colors";
import { SceneLights } from "../clay";
import { useSlotVisible } from "../three-slot";

// A folded paper dart: six triangles (two wings, two spine folds, two belly).
function usePlaneGeometry() {
  return useMemo(() => {
    const nose = [0.7, 0, 0];
    const tL = [-0.5, 0, 0.5];
    const tR = [-0.5, 0, -0.5];
    const back = [-0.45, 0.14, 0];
    const mid = [0.05, 0.05, 0];
    const tris = [
      nose, mid, tL,
      nose, tR, mid,
      mid, back, tL,
      mid, tR, back,
      nose, tL, back,
      nose, back, tR,
    ].flat();
    const geo = new BufferGeometry();
    geo.setAttribute("position", new Float32BufferAttribute(tris, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);
}

const GLIDE = 4;
const AMP = 0.15;
const OUT = 1.1;
const WAIT = 1.5;
const BACK = 2.5;

export function PaperPlane() {
  const colors = useSceneColors();
  const visible = useSlotVisible();
  const geometry = usePlaneGeometry();
  const plane = useRef<Group>(null);
  const launchStart = useRef<number | null>(null);
  const pending = useRef(false);

  useEffect(() => onPlaneLaunch(() => (pending.current = true)), []);

  useFrame((state) => {
    const g = plane.current;
    if (!g || !visible) return;
    const t = state.clock.elapsedTime;

    if (pending.current && launchStart.current === null) {
      launchStart.current = t;
      pending.current = false;
    }

    if (launchStart.current !== null) {
      const e = t - launchStart.current;
      if (e < OUT) {
        const k = e / OUT;
        g.position.set(k * 4.5, k * 3, 0);
        g.rotation.set(0, -0.5 * k, 0.6 * k);
        g.scale.setScalar(1 - k * 0.6);
      } else if (e < WAIT) {
        g.scale.setScalar(0);
      } else if (e < BACK) {
        const k = (e - WAIT) / (BACK - WAIT);
        g.position.set(-4.5 + k * 4.5, 1.5 - k * 1.5, 0);
        g.rotation.set(0, 0, 0);
        g.scale.setScalar(0.4 + k * 0.6);
      } else {
        launchStart.current = null;
      }
      return;
    }

    // Idle glide with a pointer-led yaw.
    g.position.set(0, Math.sin((t / GLIDE) * Math.PI * 2) * AMP, 0);
    g.scale.setScalar(1);
    g.rotation.y = state.pointer.x * 0.3;
    g.rotation.z = Math.sin((t / GLIDE) * Math.PI * 2) * 0.08;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.3, 4]} fov={40} onUpdate={(c) => c.lookAt(0, 0, 0)} />
      <SceneLights />
      <group ref={plane}>
        <mesh geometry={geometry}>
          <meshStandardMaterial color={colors.surface} side={DoubleSide} roughness={0.6} metalness={0.02} />
          <Edges geometry={geometry} color={colors.line} />
        </mesh>
      </group>
    </>
  );
}
