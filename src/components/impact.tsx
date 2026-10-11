import { impact } from "@/content/profile";
import { CountUp } from "./count-up";
import { Reveal } from "./reveal";

export function Impact() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="border-y border-line bg-surface">
      <h2 id="impact-title" className="sr-only">
        Impact at a glance
      </h2>
      <dl className="mx-auto grid max-w-6xl grid-cols-1 gap-x-8 gap-y-10 px-5 py-14 sm:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-4">
        {impact.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08} className="flex flex-col gap-3">
            <dt className="flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-[-0.04em] md:text-6xl">
                <CountUp value={item.value} />
                <span className="text-accent">{item.suffix}</span>
              </span>
              <span className="text-[15px] font-semibold text-ink-2">{item.label}</span>
            </dt>
            <dd className="max-w-[30ch] text-[15px] leading-relaxed text-muted">{item.detail}</dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
