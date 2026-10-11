"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react";
import { profile } from "@/content/profile";
import { useIntroDone } from "./intro-overlay";
import { Magnetic } from "./magnetic";

// A persistent call-to-action that slides up once the hero is scrolled past,
// and tucks away again over the contact section (and while the intro plays).
export function FloatingDock() {
  const introDone = useIntroDone();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const top = document.getElementById("top");
    const contact = document.getElementById("contact");
    let topOut = false;
    let contactIn = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target.id === "top") topOut = !e.isIntersecting;
          if (e.target.id === "contact") contactIn = e.isIntersecting;
        }
        setShow(topOut && !contactIn);
      },
      { threshold: 0.12 },
    );
    if (top) observer.observe(top);
    if (contact) observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && introDone && (
        <motion.div
          data-dock
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-bg/85 p-1.5 shadow-lift backdrop-blur-xl"
          style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink"
            >
              <EnvelopeSimple size={16} weight="bold" />
              Email me
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-2 transition-colors hover:text-ink"
            >
              <DownloadSimple size={16} weight="bold" />
              Download CV
            </a>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
