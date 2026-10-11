"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Smooth scrolling with Lenis, off under reduced motion. In-page links route
// through Lenis with an offset that clears the fixed header.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]');
      const href = link?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -88 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
