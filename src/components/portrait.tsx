"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { MapPin } from "@phosphor-icons/react";
import { profile, career } from "@/content/profile";
import { easeOut } from "./reveal";

const current = { title: career[0].roles[0].title, company: career[0].company };

export function Portrait() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.4 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), spring);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onPointerLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: easeOut }}
      className="relative mx-auto w-full max-w-[360px] lg:ml-auto lg:mr-0"
      style={{ perspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        aria-hidden
        className="bg-dots absolute -inset-8 -z-10 rounded-[40px] mask-[radial-gradient(closest-side,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rotate-3 rounded-3xl bg-accent-soft"
      />

      <motion.figure
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: "preserve-3d" }}
        className="rounded-3xl border border-line bg-surface p-2.5 shadow-lift"
      >
        <div className="relative aspect-[288/350] overflow-hidden rounded-2xl bg-white">
          <Image
            src={profile.portrait}
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="(min-width: 768px) 340px, 90vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>
        <figcaption className="flex flex-col gap-1 px-2.5 pb-1.5 pt-3.5">
          <span className="text-[15px] font-semibold tracking-tight">
            {current.title} at {current.company}
          </span>
          <span className="flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin size={14} weight="bold" />
            {profile.location}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
