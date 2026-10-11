"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// A cobalt highlighter sweep behind key words, drawn left to right on scroll.
export function Marker({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden
        className="absolute inset-x-[-0.15em] bottom-[0.05em] top-[0.12em] -z-10 origin-left -skew-x-6 rounded-[2px]"
        style={{ background: "color-mix(in oklab, var(--accent) 22%, transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}
