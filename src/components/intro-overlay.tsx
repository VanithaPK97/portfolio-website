"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate } from "motion/react";
import { INTRO, introState } from "@/lib/intro";

const [LINE_A, LINE_B] = INTRO.second;

function markDone() {
  document.documentElement.setAttribute("data-intro", "done");
  try {
    sessionStorage.setItem("intro-seen", "1");
  } catch {}
}

// The typed greeting that plays once, then docks its headline onto the hero.
// Everything is server-rendered markup the pre-paint script hides unless the
// intro is set to play; the rAF timeline writes into refs, never React state.
export function IntroOverlay() {
  const [show, setShow] = useState(true);
  const bg = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const l2a = useRef<HTMLSpanElement>(null);
  const l2b = useRef<HTMLSpanElement>(null);
  const caret1 = useRef<HTMLSpanElement>(null);
  const caret2 = useRef<HTMLSpanElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "play") return;

    let raf = 0;
    let docking = false;
    let finished = false;
    const started = performance.now();

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      markDone();
      setShow(false);
    };

    const setCaret = (one: boolean, two: boolean) => {
      if (caret1.current) caret1.current.style.display = one ? "inline-block" : "none";
      if (caret2.current) caret2.current.style.display = two ? "inline-block" : "none";
    };

    const dock = () => {
      if (docking) return;
      docking = true;
      cancelAnimationFrame(raf);
      setCaret(false, false);
      const headEl = headline.current;
      const target = document.querySelector<HTMLElement>("[data-hero-headline]");
      if (!headEl || !target) return finish();

      const from = headEl.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const dx = to.left - from.left;
      const dy = to.top - from.top;
      const scale = from.width ? to.width / from.width : 1;
      const duration = INTRO.dockMs / 1000;
      const ease = [0.16, 1, 0.3, 1] as const;

      if (bg.current) animate(bg.current, { opacity: 0 }, { duration, ease });
      if (line1.current) animate(line1.current, { opacity: 0 }, { duration: duration * 0.6, ease });
      animate(headEl, { x: dx, y: dy, scale }, { duration, ease }).then(finish);
    };

    const tick = (now: number) => {
      const s = introState(now - started);
      if (line1.current) line1.current.textContent = INTRO.first.slice(0, s.first);
      if (l2a.current) l2a.current.textContent = LINE_A.slice(0, Math.min(s.second, LINE_A.length));
      if (l2b.current)
        l2b.current.textContent = s.second > LINE_A.length ? LINE_B.slice(0, s.second - LINE_A.length) : "";
      setCaret(s.phase === "typing-1" || s.phase === "pause", s.phase === "typing-2" || s.phase === "hold");

      if (s.phase === "dock") return dock();
      if (s.phase === "done") return finish();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onSkip = () => finish();
    const opts = { passive: true } as const;
    // pointerup, not pointerdown: a click finishes its full sequence before
    // the overlay unmounts, so the Skip button (and any click) stays clickable.
    window.addEventListener("keydown", onSkip);
    window.addEventListener("pointerup", onSkip);
    window.addEventListener("wheel", onSkip, opts);
    window.addEventListener("touchmove", onSkip, opts);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onSkip);
      window.removeEventListener("pointerup", onSkip);
      window.removeEventListener("wheel", onSkip);
      window.removeEventListener("touchmove", onSkip);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="intro-overlay fixed inset-0 z-70 overflow-hidden">
      <div ref={bg} aria-hidden className="absolute inset-0 bg-bg">
        <div className="hero-glow" />
      </div>

      <div
        aria-hidden
        className="relative mx-auto grid h-full max-w-6xl content-center gap-5 px-5 md:grid-cols-12 md:px-8"
      >
        <div className="md:col-span-8">
          <p className="text-xl font-medium text-muted">
            <span ref={line1} />
            <span ref={caret1} className="intro-caret h-[1.1em]" />
          </p>
          <h2
            ref={headline}
            className="mt-4 origin-top-left text-balance text-[clamp(2.1rem,3.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.03em] will-change-transform"
          >
            <span className="block">
              <span ref={l2a} />
            </span>
            <span className="block text-accent">
              <span ref={l2b} />
              <span ref={caret2} className="intro-caret h-[0.9em]" />
            </span>
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          markDone();
          setShow(false);
        }}
        className="absolute bottom-6 right-6 z-10 rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        Skip intro
      </button>
    </div>
  );
}

// True once the intro is skipped or finished. Components gate their entrance
// on this so nothing animates in while the greeting is still playing.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
  return () => observer.disconnect();
}
function getSnapshot() {
  const v = document.documentElement.dataset.intro;
  return v === "skip" || v === "done";
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
