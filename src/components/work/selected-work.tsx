"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { caseStudies } from "@/content/profile";
import { Reveal } from "../reveal";
import { RevealHeading } from "../reveal-heading";
import { CaseCard } from "./case-card";
import { CaseDetail } from "./case-detail";

export function SelectedWork() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = caseStudies.find((c) => c.id === openId) ?? null;

  const close = () => {
    const id = openId;
    setOpenId(null);
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-read-more="${id}"]`)?.focus();
    });
  };

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="max-w-2xl">
        <RevealHeading id="work-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          Selected work
        </RevealHeading>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Three platforms where I owned the work on both sides of the API.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseCard key={study.id} study={study} onOpen={() => setOpenId(study.id)} />
        ))}
      </div>

      <AnimatePresence>
        {open && <CaseDetail key={open.id} study={open} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
