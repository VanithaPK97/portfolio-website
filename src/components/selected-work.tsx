"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { caseStudies, type CaseStudy } from "@/content/profile";
import { Reveal } from "./reveal";

export function SelectedWork() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="max-w-2xl">
        <h2 id="work-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          Selected work
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Three platforms where I owned the work on both sides of the API.
        </p>
      </Reveal>

      <div ref={container} className="mt-14 flex flex-col gap-8 md:gap-12">
        {caseStudies.map((study, i) => (
          <StackedCard
            key={study.client}
            study={study}
            index={i}
            total={caseStudies.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function StackedCard({
  study,
  index,
  total,
  progress,
}: {
  study: CaseStudy;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  // Earlier cards shrink slightly as later ones slide over them.
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(progress, [index / total, 1], [1, reduce ? 1 : targetScale]);

  return (
    <div className="md:sticky" style={{ top: `calc(6.5rem + ${index * 1.75}rem)` }}>
      <motion.article
        style={{ scale }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="origin-top overflow-hidden rounded-3xl border border-line bg-surface shadow-lift"
      >
        <div className="grid md:grid-cols-12">
          <div className="flex flex-col p-7 md:col-span-7 md:p-10">
            <p className="font-mono text-[13px] text-muted">
              {study.client === study.employer ? study.client : `${study.client} via ${study.employer}`}
              <span className="px-2 text-line">/</span>
              {study.period}
            </p>
            <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] md:text-[2rem] md:leading-tight">
              {study.title}
            </h3>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">{study.summary}</p>

            <ul className="mt-7 flex flex-col gap-3">
              {study.contributions.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                  <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 border-t border-line bg-surface-2/60 p-7 md:col-span-5 md:border-l md:border-t-0 md:p-10">
            <Flow steps={study.flow} />
            <div className="mt-auto rounded-2xl bg-accent px-6 py-5 text-accent-ink">
              <p className="text-3xl font-bold tracking-[-0.03em]">{study.outcome.value}</p>
              <p className="mt-1 text-[15px] font-medium opacity-90">{study.outcome.label}</p>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// The request path through the system, top to bottom.
function Flow({ steps }: { steps: CaseStudy["flow"] }) {
  return (
    <figure>
      <figcaption className="sr-only">System architecture, from interface to data</figcaption>
      <ol className="relative flex flex-col gap-2.5">
        <span aria-hidden className="absolute bottom-5 left-[1.15rem] top-5 w-px bg-line" />
        {steps.map((step, i) => (
          <li key={step.layer} className="relative flex items-center gap-4">
            <span className="relative z-10 grid size-[2.3rem] shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[12px] text-muted">
              {i + 1}
            </span>
            <span className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
              <span className="font-semibold tracking-tight">{step.tech}</span>
              <span className="font-mono text-[12px] text-muted">{step.layer}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
