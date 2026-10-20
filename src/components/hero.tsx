import { ArrowUpRight, DownloadSimple, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/content/profile";
import { Magnetic } from "./magnetic";
import { Portrait } from "./portrait";
import { AmbientWave } from "./ambient-wave";
import { LogoPill } from "./logo-pill";
import { publication } from "@/content/profile";

// Server shell: the narrative and headline are server-rendered HTML (SEO
// and no-JS safe). Only the portrait is a client island.
export function Hero() {
  return (
    <section id="top" className="relative isolate">
      <AmbientWave />
      <div
      className="portfolio-hero relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-28 lg:grid-cols-12 md:gap-12 md:px-8 md:pb-24 md:pt-36"
    >

      <div className="lg:col-span-7">
        <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          {profile.name}, {profile.role}
        </p>

        <h1
          data-hero-headline
          className="hero-headline mt-6 text-[clamp(2.25rem,3.5vw,3rem)] font-bold leading-[1.07] tracking-[-0.055em]"
        >
          <span className="hero-line block">{profile.headline[0]}</span>
          <span className="hero-line block text-accent">into reliable software</span>
          <span className="hero-line block text-accent">with Java and React.</span>
        </h1>

        <div className="mt-7 flex max-w-[56ch] flex-col gap-5 text-[1rem] leading-relaxed text-ink-2">
          <p>I’m Vanitha, a Senior Java Full Stack Developer in Bengaluru. Over seven years, I’ve built banking, retirement and public-sector applications. Today, I build React microfrontends at OpenText.</p>
          <div>
            <p className="mb-2 text-sm text-muted">Companies and clients I’ve built for</p>
            <ul aria-label="Companies and clients" className="flex flex-wrap items-center gap-2">
              {(["hsbc", "infosys", "troweprice", "fis", "oracle", "opentext"] as const).map((brand) => (
                <li key={brand}><LogoPill brand={brand} /></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted">My everyday stack</p>
            <ul aria-label="Everyday technologies" className="flex flex-wrap items-center gap-2">
              {(["java", "springboot", "react", "postgresql", "redis", "aws"] as const).map((brand) => (
                <li key={brand}><LogoPill brand={brand} /></li>
              ))}
            </ul>
          </div>
          <p>{profile.aiTools}</p>
          <p>I published a guide to Spring Boot and MongoDB on <a href={publication.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline underline-offset-4">DZone</a>.</p>
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

      <div className="lg:col-span-5">
        <Portrait />
      </div>
      <a href="#work" className="hero-scroll font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Explore selected work <span aria-hidden>&darr;</span></a>
      </div>
    </section>
  );
}

