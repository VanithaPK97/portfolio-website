"use client";

import { motion } from "motion/react";

// Headings remain readable before hydration and when scroll observers miss
// an entry. Animate a small emphasis without moving text outside a clipping box.
export function RevealHeading({
  as = "h2",
  id,
  className,
  children,
}: {
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children: string;
}) {
  const Tag = as === "h1" ? "h1" : "h2";
  const words = children.split(" ");
  return (
    <Tag id={id} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={false}
            whileInView={{ opacity: [0.85, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
