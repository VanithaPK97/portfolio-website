"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { career } from "@/content/profile";
import { LogoPill } from "./logo-pill";
import { Reveal } from "./reveal";
import { RevealHeading } from "./reveal-heading";

export function Career() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });

  return (
    <section id="career" ref={ref} aria-labelledby="career-title" className="border-t border-line bg-surface">
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          aria-hidden
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-0 hidden h-full w-0.5 origin-top bg-accent md:block"
        />

        <Reveal className="max-w-2xl">
          <RevealHeading id="career-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
            Career
          </RevealHeading>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Banking, retirement, public sector and customer engagement, across four employers.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16">
          {career.map((emp) => (
            <Reveal
              as="article"
              key={emp.company}
              className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[16rem_1fr] md:gap-10"
            >
              <div className="lg:sticky lg:top-28 lg:self-start">
                <LogoPill brand={emp.brand} />
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{emp.company}</h3>
                <p className="font-mono text-[12px] text-muted">{emp.period}</p>
                <ul className="mt-4 flex flex-col gap-3 border-l border-line pl-5">
                  {emp.roles.map((role) => (
                    <li key={role.title} className="relative">
                      <span
                        aria-hidden
                        className="absolute left-[-1.4rem] top-1.5 size-2 rounded-full bg-accent ring-4 ring-surface"
                      />
                      <p className="text-sm font-semibold">{role.title}</p>
                      <p className="font-mono text-[11px] text-muted">{role.period}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col">
                {emp.projects.map((project, i) => (
                  <div key={project.name} className={`py-5 ${i > 0 ? "border-t border-line" : ""}`}>
                    <h4 className="text-xl font-semibold tracking-tight">{project.name}</h4>
                    <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-2">{project.context}</p>
                    <ul className="mt-5 flex max-w-[65ch] flex-col gap-3">
                      {project.contributions.map((contribution) => (
                        <li key={contribution} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                          <span>{contribution}</span>
                        </li>
                      ))}
                    </ul>
                    <ul aria-label={`${project.name} technologies`} className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <li key={technology} className="rounded-md border border-line bg-bg px-2.5 py-1 font-mono text-[10px] text-muted">{technology}</li>
                      ))}
                    </ul>
                    {project.outcome && (
                      <p className="mt-5 flex items-baseline gap-2 rounded-lg bg-accent-soft px-4 py-3 text-sm font-semibold text-ink">
                        <span aria-hidden className="h-px w-4 translate-y-[-0.3em] bg-accent" />
                        {project.outcome}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
