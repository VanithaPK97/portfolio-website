import { Contact } from "@/components/contact";
import { Career } from "@/components/career";
import { Hero } from "@/components/hero";
import { IntroOverlay } from "@/components/intro-overlay";
import { Impact } from "@/components/impact";
import { Writing } from "@/components/writing";
import { SelectedWork } from "@/components/work/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Stack } from "@/components/stack";
import { ThreeRoot } from "@/components/three/three-root";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <IntroOverlay />
      <div aria-hidden className="page-frame" />
      <SiteHeader />
      <main>
        <Hero />
        <Impact />
        <SelectedWork />
        <Stack />
        <Career />
        <Writing />
        <Contact />
      </main>
      <SiteFooter />
      <ThreeRoot />
    </>
  );
}
