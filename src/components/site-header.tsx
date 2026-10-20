"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { DownloadSimple, List, X } from "@phosphor-icons/react";
import { nav, profile } from "@/content/profile";
import { headerHidden } from "@/lib/motion/header";
import { ThemeToggle } from "./theme-toggle";
import { easeOut } from "./reveal";

export function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
    setHidden(headerHidden(scrollY.getPrevious() ?? 0, y, open));
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-40"
    >
      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? "border-line bg-bg/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 md:h-18 md:px-8"
        >
          <a href="#top" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="text-[15px] font-bold tracking-tight">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={profile.resume}
              download
              className="hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold text-ink transition hover:border-ink/30 active:scale-[0.98] sm:inline-flex"
            >
              <DownloadSimple size={16} weight="bold" />
              Download CV
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-surface-2 lg:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3 text-lg font-semibold text-ink hover:bg-surface-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href={profile.resume}
                    download
                    className="flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-4 py-3 font-semibold"
                  >
                    <DownloadSimple size={18} weight="bold" />
                    Download CV
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-accent"
      />
    </motion.header>
  );
}

// Tracks which page section crosses the middle of the viewport. Every
// section is observed, so sections without a nav link clear the highlight.
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
