"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import type { CaseStudy } from "@/content/profile";
import { LogoPill } from "../logo-pill";
import { Marker } from "./marker";

// One work card: a cover image for the system, then the outcome and a way in.
export function CaseCard({ study, onOpen }: { study: CaseStudy; onOpen: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-line bg-surface-2">
        <Image
          src={`/covers/${study.id}.jpg`}
          alt={`${study.client} ${study.title}`}
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent"
        />
        <span className="absolute left-4 top-4 text-sm font-semibold tracking-tight text-white drop-shadow">
          {study.paperPhrase.before}
          <Marker>{study.paperPhrase.mark}</Marker>
          {study.paperPhrase.after}
        </span>
      </div>

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
