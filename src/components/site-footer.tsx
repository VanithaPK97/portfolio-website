import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
        <p>
          {profile.name}, {profile.location}
        </p>
        <p>Built with Next.js, Tailwind CSS and Motion.</p>
      </div>
    </footer>
  );
}
