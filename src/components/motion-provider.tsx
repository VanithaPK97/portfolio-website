"use client";

import { MotionConfig } from "motion/react";

// "user" drops transform animations for visitors who ask for reduced motion,
// leaving opacity fades so content still appears gracefully.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
