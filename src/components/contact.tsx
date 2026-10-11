"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, EnvelopeSimple, LinkedinLogo } from "@phosphor-icons/react";
import { profile } from "@/content/profile";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { RevealHeading } from "./reveal-heading";

type CopyState = "idle" | "copied" | "failed";

export function Contact() {
  const [copy, setCopy] = useState<CopyState>("idle");

  useEffect(() => {
    if (copy === "idle") return;
    const t = setTimeout(() => setCopy("idle"), 2200);
    return () => clearTimeout(t);
  }, [copy]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
      <Reveal className="relative overflow-hidden rounded-4xl border border-line bg-surface px-7 py-14 shadow-soft md:px-16 md:py-20">
        <div
          aria-hidden
          className="bg-dots absolute inset-0 mask-[radial-gradient(ellipse_at_top_right,black,transparent_60%)]"
        />
        <div className="relative max-w-3xl">
          <RevealHeading
            id="contact-title"
            className="text-balance text-4xl font-bold leading-[1.05] tracking-[-0.035em] md:text-6xl"
          >
            Hiring for a senior full stack role?
          </RevealHeading>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-2">
            I would like to hear about it. Email is the quickest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink shadow-soft transition hover:shadow-lift"
              >
                <EnvelopeSimple size={18} weight="bold" />
                Email me
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface px-5 py-3 text-[15px] font-medium text-ink-2 transition-colors hover:border-ink/30 hover:text-ink active:scale-[0.98]"
            >
              <span className="grid size-4.5 place-items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copy}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {copy === "copied" ? (
                      <Check size={18} weight="bold" className="text-accent" />
                    ) : (
                      <Copy size={18} weight="bold" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="break-all">{profile.email}</span>
            </button>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 py-3 text-[15px] font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              <LinkedinLogo size={20} weight="fill" />
              LinkedIn
            </a>
          </div>

          <p aria-live="polite" className="mt-3 h-5 text-[13px] text-muted">
            {copy === "copied" && "Email address copied."}
            {copy === "failed" && "Copy did not work here. The address is shown above."}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
