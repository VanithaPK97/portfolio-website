"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";

// A soft accent glow that follows the cursor across the card. Mouse only.
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const background = useMotionTemplate`radial-gradient(280px circle at ${x}px ${y}px, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)`;

  function move(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(-999);
        y.set(-999);
      }}
      className={`relative ${className ?? ""}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{ background }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}
