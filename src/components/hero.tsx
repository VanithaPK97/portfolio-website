import { ArrowUpRight, DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { profile, heroStory } from "@/content/profile";
import { Magnetic } from "./magnetic";
import { Portrait } from "./portrait";
import { RichText } from "./rich-text";

const [lineOne, lineTwo] = profile.headline;

// Server shell: the narrative and headline are server-rendered HTML (SEO
// and no-JS safe). Only the portrait is a client island.
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto grid min-h-dvh max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:grid-cols-12 md:gap-8 md:px-8 md:pb-24 md:pt-24"
    >
      <div aria-hidden className="hero-glow" />

      <div className="md:col-span-7">
        <p className="font-mono text-[13px] text-muted">
          {profile.name}, {profile.role}
        </p>

        <h1
          data-hero-headline
          className="mt-5 text-balance text-[clamp(2.1rem,3.6vw,2.6rem)] font-bold leading-[1.1] tracking-[-0.03em]"
        >
          <span className="block">{lineOne}</span>
          <span className="block text-accent">{lineTwo}</span>
        </h1>

        <div className="mt-6 flex max-w-[56ch] flex-col gap-4 text-[1.05rem] leading-relaxed text-ink-2">
          {heroStory.map((line, i) => (
            <p key={i}>
              <RichText value={line} />
            </p>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-4">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-accent-ink shadow-soft transition hover:shadow-lift"
            >
              <EnvelopeSimple size={18} weight="bold" />
              Email me
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-semibold text-ink transition hover:border-ink/30"
            >
              <DownloadSimple size={18} weight="bold" />
              Download CV
            </a>
          </Magnetic>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-2 py-3.5 text-[15px] font-semibold text-ink-2 underline-offset-4 transition hover:text-ink hover:underline"
          >
            LinkedIn
            <ArrowUpRight
              size={16}
              weight="bold"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>

      <div className="md:col-span-5">
        <Portrait />
      </div>
    </section>
  );
}
