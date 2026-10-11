"use client";

import { motion } from "motion/react";
import { DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react";
import { profile } from "@/content/profile";
import { Portrait } from "./portrait";
import { easeOut } from "./reveal";

const [lineOne, lineTwo] = profile.headline;

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const line = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: easeOut } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-12 px-5 pb-16 pt-24 md:grid-cols-12 md:gap-8 md:px-8 md:pb-24 md:pt-24"
    >
      <motion.div
        className="md:col-span-8"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }}
      >
        <motion.p variants={rise} className="font-mono text-[13px] text-muted">
          {profile.name}, {profile.role}
        </motion.p>

        <h1 className="mt-5 text-balance text-[clamp(2.1rem,3.65vw,2.65rem)] font-bold leading-[1.1] tracking-[-0.03em]">
          <span className="block overflow-hidden pb-1">
            <motion.span variants={line} className="block">
              {lineOne}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span variants={line} className="block text-accent">
              {lineTwo}
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink-2 sm:text-xl"
        >
          {profile.intro}
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap items-center gap-3">
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink shadow-soft transition-shadow hover:shadow-lift"
          >
            <EnvelopeSimple size={18} weight="bold" />
            Email me
          </motion.a>
          <motion.a
            href={profile.resume}
            download
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink/30"
          >
            <DownloadSimple size={18} weight="bold" />
            Download CV
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="md:col-span-4">
        <Portrait />
      </div>
    </section>
  );
}
