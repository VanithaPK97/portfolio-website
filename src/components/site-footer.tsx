import { profile } from "@/content/profile";
import { EnvelopeSimple, LinkedinLogo, DownloadSimple, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { AmbientWave } from "./ambient-wave";

export function SiteFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="portfolio-footer relative isolate overflow-hidden border-t border-line">
      <AmbientWave />
      <div className="relative mx-auto max-w-6xl px-5 pb-8 pt-24 md:px-8 md:pb-10 md:pt-28">
        <h2 id="contact-title" className="text-balance text-[clamp(2.75rem,5vw,4rem)] font-bold leading-[1.06] tracking-[-0.055em]">Let’s create something that matters.</h2>
        <ul aria-label="Contact links" className="mt-9 flex flex-wrap gap-3">
          <li><a className="footer-pill" href={`mailto:${profile.email}`}><EnvelopeSimple size={19} weight="duotone" /><span>{profile.email}</span></a></li>
          <li><a className="footer-pill" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinLogo size={19} weight="fill" /><span>LinkedIn</span><ArrowUpRight size={13} /></a></li>
          <li><a className="footer-pill" href={profile.resume} download><DownloadSimple size={18} /><span>Download CV</span></a></li>
        </ul>
        <div className="footer-meta mt-16 flex flex-col gap-3 border-t pt-6 text-xs font-medium md:mt-20 md:flex-row md:items-center md:justify-between">
          <p>{profile.location} · © 2026 {profile.name}</p>
          <p>Built with Next.js, Tailwind CSS and Motion.</p>
          <a href="#top" className="inline-flex w-fit items-center gap-2 underline-offset-4 hover:underline">Back to top <span aria-hidden>↑</span></a>
        </div>
      </div>
    </footer>
  );
}

