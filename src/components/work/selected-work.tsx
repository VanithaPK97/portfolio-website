"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "motion/react";
import { caseStudies, type CaseStudy } from "@/content/profile";
import { Reveal } from "../reveal";
import { CaseCard } from "./case-card";
import { CaseDetail } from "./case-detail";

// Scenes are lazy so three.js stays out of the initial bundle; each loads
// only when its slot actually switches to 3D.
const CachePath = dynamic(() => import("../three/scenes/cache-path").then((m) => m.CachePath), {
  ssr: false,
});
const WorkflowPipeline = dynamic(
  () => import("../three/scenes/workflow-pipeline").then((m) => m.WorkflowPipeline),
  { ssr: false },
);
const MicrofrontendGrid = dynamic(
  () => import("../three/scenes/microfrontend-grid").then((m) => m.MicrofrontendGrid),
  { ssr: false },
);

function sceneFor(id: CaseStudy["id"]) {
  if (id === "cache") return <CachePath />;
  if (id === "workflow") return <WorkflowPipeline />;
  if (id === "microfrontends") return <MicrofrontendGrid />;
  return undefined;
}

export function SelectedWork() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = caseStudies.find((c) => c.id === openId) ?? null;

  const close = () => {
    const id = openId;
    setOpenId(null);
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-read-more="${id}"]`)?.focus();
    });
  };

  return (
    <section id="work" aria-labelledby="work-title" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="max-w-2xl">
        <h2 id="work-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          Selected work
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Three platforms where I owned the work on both sides of the API.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseCard
            key={study.id}
            study={study}
            scene={sceneFor(study.id)}
            onOpen={() => setOpenId(study.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && <CaseDetail key={open.id} study={open} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
