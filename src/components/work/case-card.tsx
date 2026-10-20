"use client";

import { ProjectVisual } from "./project-visual";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import type { CaseStudy } from "@/content/profile";
import { LogoPill } from "../logo-pill";

// One work card: a cover image for the system, then the outcome and a way in.
export function CaseCard({ study, onOpen }: { study: CaseStudy; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="project-card group flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft"
    >
      <ProjectVisual study={study} />

      <div className="flex items-center gap-2">
        <LogoPill brand={study.brand} size="sm" />
        <span className="font-mono text-[12px] text-muted">{study.period}</span>
      </div>

      <h3 className="text-2xl font-bold leading-tight tracking-[-0.02em]">{study.headline}</h3>
      <p className="text-[15px] leading-relaxed text-muted">
        {study.summary.split(". ")[0].replace(/\.$/, "")}.
      </p>

      <button
        type="button"
        data-read-more={study.id}
        onClick={onOpen}
        className="mt-auto inline-flex w-fit items-center gap-1.5 text-[15px] font-semibold text-accent underline-offset-4 transition hover:underline"
      >
        Read more
        <ArrowRight size={16} weight="bold" />
      </button>
    </motion.article>
  );
}
