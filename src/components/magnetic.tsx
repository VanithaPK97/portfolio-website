"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { magneticOffset } from "@/lib/motion/magnetic";

// Pulls its child toward the pointer. Mouse only; still under reduced motion.
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const o = magneticOffset({ x: e.clientX, y: e.clientY }, rect, strength);
    x.set(o.x);
    y.set(o.y);
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
