"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import type { CaseStudy } from "@/content/profile";
import { LogoPill } from "../logo-pill";
import { Flow } from "./flow";

// The expanded case study: a focus-trapped modal over a backdrop, closed by
// Escape, the backdrop or the close button.
export function CaseDetail({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={study.title}
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 12 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-auto rounded-3xl border border-line bg-surface p-7 shadow-lift md:p-9"
      >
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink"
        >
          <X size={18} weight="bold" />
        </button>

        <div className="flex items-center gap-2">
          <LogoPill brand={study.brand} size="sm" />
          <span className="font-mono text-[12px] text-muted">
            {study.client === study.employer ? study.period : `${study.employer} · ${study.period}`}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-[-0.02em] md:text-3xl">{study.title}</h3>
        <p className="mt-3 leading-relaxed text-ink-2">{study.summary}</p>

        <ul className="mt-6 flex flex-col gap-3">
          {study.contributions.map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
              <span aria-hidden className="mt-[0.6em] h-px w-4 shrink-0 bg-accent" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Flow steps={study.flow} variant="full" />
        </div>

        <div className="mt-8 rounded-2xl bg-accent px-6 py-5 text-accent-ink">
          <p className="text-2xl font-bold tracking-[-0.02em]">{study.outcome.value}</p>
          <p className="mt-1 text-[15px] font-medium opacity-90">{study.outcome.label}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
