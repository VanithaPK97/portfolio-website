"use client";

import { Moon, Sun } from "@phosphor-icons/react";

// The inline script in layout.tsx sets data-theme before paint, so the
// icon swap is pure CSS and never mismatches during hydration.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button
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
