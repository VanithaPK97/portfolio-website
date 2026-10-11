"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { easing } from "maath";
import type { MotionValue } from "motion/react";
import { type Group, type InstancedMesh, Matrix4 } from "three";
import { tower } from "@/content/profile";
import { explode } from "@/lib/three/motion-math";
import { useSceneColors } from "@/lib/three/scene-colors";
import { SceneLights, Label, nodeTone, useClay } from "../clay";
import { useSlotVisible } from "../three-slot";

const PACKETS = 10;
const TRIP = 2.4;
const SLAB_Y = 0.9; // spacing unit between slabs (scaled by explode gap)
const matrix = new Matrix4();

// "Backend depth. Frontend craft." in one object: React, Spring Boot and
// PostgreSQL slabs with requests falling and responses rising between them.
export function StackTower({ progress }: { progress: MotionValue<number> }) {
  const colors = useSceneColors();
  const visible = useSlotVisible();
  const tilt = useRef<Group>(null);
  const slabs = useRef<(Group | null)[]>([]);
  const packets = useRef<InstancedMesh>(null);
  const hovered = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const slabMat = useClay(nodeTone(colors));

  useFrame((state, dt) => {
    if (!visible) return;
    const p = explode(progress.get());

    // Pointer tilt, damped.
    pointer.current.x = state.pointer.x;
    pointer.current.y = state.pointer.y;
    if (tilt.current) {
      easing.damp(tilt.current.rotation, "y", p.rotationY + pointer.current.x * 0.18, 0.25, dt);
      easing.damp(tilt.current.rotation, "x", -pointer.current.y * 0.1, 0.25, dt);
    }

    // Explode spacing + hover lift.
    slabs.current.forEach((g, i) => {
      if (!g) return;
      const base = (1 - i) * SLAB_Y * (0.4 + p.gap);
      const lift = hovered.current === i ? 0.12 : 0;
      easing.damp3(g.position, [0, base + lift, 0], 0.2, dt);
    });

    // Packets: requests fall on the left (x -0.7), responses rise on the right.
    const mesh = packets.current;
    if (mesh) {
      const top = SLAB_Y * (0.4 + p.gap);
      for (let i = 0; i < PACKETS; i++) {
        const prog = ((state.clock.elapsedTime / TRIP + i / PACKETS) % 1);
        const down = i % 2 === 0;
        const x = down ? -0.7 : 0.7;
        const y = down ? top - prog * top * 2 : -top + prog * top * 2;
        matrix.makeTranslation(x, y, 0.1);
        mesh.setMatrixAt(i, matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[4.2, 3.2, 5.2]} fov={32} onUpdate={(c) => c.lookAt(0, 0, 0)} />
      <SceneLights />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group ref={tilt}>
          {tower.map((slab, i) => (
            <group key={slab.tech} ref={(el) => void (slabs.current[i] = el)}>
              <RoundedBox
                args={[2.4, 0.28, 2.4]}
                radius={0.08}
                material={slabMat}
                onPointerOver={() => (hovered.current = i)}
                onPointerOut={() => (hovered.current = hovered.current === i ? null : hovered.current)}
              />
              <group position={[0, 0.2, 1.05]} rotation={[-0.35, 0, 0]}>
                <Label text={slab.tech} size={0.18} color={colors.ink} />
                <group position={[0, -0.22, 0]}>
                  <Label text={slab.layer} size={0.09} color={colors.muted} mono />
                </group>
              </group>
            </group>
          ))}

          <instancedMesh ref={packets} args={[undefined, undefined, PACKETS]}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color={colors.accent} roughness={0.3} metalness={0.1} />
          </instancedMesh>
        </group>
      </Float>
    </>
  );
}
