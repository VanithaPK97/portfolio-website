import type { CaseStudy } from "@/content/profile";

// The request path through a system, top to bottom. "compact" sits on the
// card's grid paper (and is the 3D fallback); "full" shows in the detail.
export function Flow({ steps, variant }: { steps: CaseStudy["flow"]; variant: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <ol className="flex h-full flex-col justify-center gap-2 p-5">
        {steps.map((step, i) => (
          <li key={step.layer} className="flex items-center gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[11px] text-muted">
              {i + 1}
            </span>
            <span className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-line bg-surface/85 px-3 py-1.5">
              <span className="text-sm font-semibold tracking-tight">{step.tech}</span>
              <span className="font-mono text-[10px] text-muted">{step.layer}</span>
            </span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <figure>
      <figcaption className="sr-only">System architecture, from interface to data</figcaption>
      <ol className="relative flex flex-col gap-2.5">
        <span aria-hidden className="absolute bottom-5 left-[1.15rem] top-5 w-px bg-line" />
        {steps.map((step, i) => (
          <li key={step.layer} className="relative flex items-center gap-4">
            <span className="relative z-10 grid size-[2.3rem] shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[12px] text-muted">
              {i + 1}
            </span>
            <span className="flex flex-1 items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3">
              <span className="font-semibold tracking-tight">{step.tech}</span>
              <span className="font-mono text-[12px] text-muted">{step.layer}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
