import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Impact } from "@/components/impact";
import { Recognition } from "@/components/recognition";
import { SelectedWork } from "@/components/selected-work";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <Impact />
        <SelectedWork />
        <Stack />
        <Experience />
        <Recognition />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
