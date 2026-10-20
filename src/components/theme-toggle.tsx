"use client";

import { useRef } from "react";
import { Moon, Sun } from "@phosphor-icons/react";

// The root layout defaults to dark before paint, so the
// icon swap is pure CSS and never mismatches during hydration.
export function ThemeToggle() {
  const btn = useRef<HTMLButtonElement>(null);

  function apply(next: "light" | "dark") {
    document.documentElement.setAttribute("data-theme", next);
  }

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    const rect = btn.current?.getBoundingClientRect();
    if (rect) {
      root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
      root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);
    }

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = (document as unknown as { startViewTransition?: (cb: () => void) => void })
      .startViewTransition;
    if (start && !reduced) {
      start.call(document, () => apply(next));
    } else {
      apply(next);
    }
  }

  return (
    <button
      ref={btn}
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="grid size-10 cursor-pointer place-items-center rounded-full text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink active:scale-95"
    >
      <Sun size={19} weight="bold" className="hidden dark:block" />
      <Moon size={19} weight="bold" className="block dark:hidden" />
    </button>
  );
}
