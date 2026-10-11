"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { experience } from "@/content/profile";
import { Reveal } from "./reveal";

export function Experience() {
  const [active, setActive] = useState(experience[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id.replace("role-", ""));
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    experience.forEach((role) => {
      const el = document.getElementById(`role-${role.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="career"
      aria-labelledby="experience-title"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2 id="experience-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
                Experience
              </h2>
              <p className="mt-4 max-w-[34ch] text-lg leading-relaxed text-muted">
                Banking, retirement, public sector and customer engagement, across five roles.
              </p>
            </Reveal>

            <nav aria-label="Roles" className="mt-10 hidden lg:block">
              <ul className="flex flex-col gap-1 border-l border-line">
                {experience.map((role) => {
                  const isActive = active === role.id;
                  return (
                    <li key={role.id} className="relative">
                      {isActive && (
                        <motion.span
                          layoutId="role-active"
                          aria-hidden
                          className="absolute -left-px top-0 h-full w-0.5 bg-accent"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <a
                        href={`#role-${role.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex flex-col py-2.5 pl-5 transition-colors ${
                          isActive ? "text-ink" : "text-muted hover:text-ink-2"
                        }`}
                      >
                        <span className="font-semibold">{role.navLabel ?? role.company}</span>
                        <span className="font-mono text-[12px]">{role.period}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <ol className="flex flex-col lg:col-span-8">
          {experience.map((role, i) => (
            <Reveal
              as="li"
              key={role.id}
              className={`scroll-mt-28 py-10 first:pt-0 ${i > 0 ? "border-t border-line" : ""}`}
            >
              <article id={`role-${role.id}`} aria-labelledby={`role-${role.id}-title`}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 id={`role-${role.id}-title`} className="text-2xl font-bold tracking-[-0.02em]">
                    {role.title}
                  </h3>
                  <p className="shrink-0 font-mono text-[13px] text-muted">{role.period}</p>
                </div>
                <p className="mt-1.5 text-[15px] font-medium text-ink-2">
                  {role.company}
                  <span className="text-muted">, {role.context}</span>
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
