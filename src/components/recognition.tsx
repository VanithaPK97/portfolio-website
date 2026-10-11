import {
  ArrowUpRight,
  Certificate,
  GraduationCap,
  Trophy,
} from "@phosphor-icons/react/dist/ssr";
import { awards, certifications, education, publication } from "@/content/profile";
import { Reveal } from "./reveal";

export function Recognition() {
  return (
    <section
      id="writing"
      aria-labelledby="recognition-title"
      className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28"
    >
      <Reveal className="max-w-2xl">
        <h2 id="recognition-title" className="text-balance text-4xl font-bold tracking-[-0.03em] md:text-5xl">
          Recognition and writing
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Reveal className="flex-1">
            <a
              href={publication.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col justify-between gap-10 rounded-3xl bg-accent p-8 text-accent-ink shadow-soft transition-shadow hover:shadow-lift md:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <p className="text-[15px] font-semibold opacity-90">
                  Published on {publication.outlet}, {publication.date}
                </p>
                <ArrowUpRight
                  size={26}
                  weight="bold"
                  className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>
              <div>
                <p className="text-2xl font-bold leading-snug tracking-[-0.02em] md:text-[1.75rem]">
                  {publication.title}
                </p>
                <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed opacity-90">{publication.blurb}</p>
                <p className="mt-6 text-[15px] font-semibold">Read the article</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-7">
              <GraduationCap size={26} weight="duotone" className="shrink-0 text-accent" />
              <div>
                <p className="font-semibold">{education.degree}</p>
                <p className="mt-1 text-[15px] text-muted">
                  {education.school}, {education.period}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7">
          <Reveal delay={0.05} className="rounded-3xl border border-line bg-surface p-7 md:p-9">
            <h3 className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <Trophy size={24} weight="duotone" className="text-accent" />
              Awards
            </h3>
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {awards.map((award) => (
                <li key={award.name}>
                  <p className="font-semibold">{award.name}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">
                    {award.org}, {award.reason.toLowerCase()}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-line bg-surface-2 p-7 md:p-9">
            <h3 className="flex items-center gap-3 text-xl font-bold tracking-tight">
              <Certificate size={24} weight="duotone" className="text-accent" />
              Certifications
            </h3>
            <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="mt-1 text-[15px] text-muted">{cert.org}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
