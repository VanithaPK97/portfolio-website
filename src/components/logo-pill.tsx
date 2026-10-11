import { brands, type BrandKey } from "@/content/brands";

// An inline brand pill: a small logo (or letter-mark) plus the brand name.
// No icon library ships to the browser; the glyph path is a plain string.
export function LogoPill({ brand, size = "md" }: { brand: BrandKey; size?: "sm" | "md" }) {
  const { label, path, initials } = brands[brand];
  const glyph = size === "sm" ? 12 : 14;

  return (
    <span className="mx-0.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-0.5 align-[0.1em] text-[0.92em] font-medium text-ink">
      {path ? (
        <svg
          viewBox="0 0 24 24"
          width={glyph}
          height={glyph}
          aria-hidden
          fill="currentColor"
          className="shrink-0 text-ink-2"
        >
          <path d={path} />
        </svg>
      ) : (
        <span
          aria-hidden
          className="grid size-[1.15em] shrink-0 place-items-center rounded-[4px] bg-ink font-mono text-[9px] font-semibold leading-none text-surface"
        >
          {initials}
        </span>
      )}
      {label}
    </span>
  );
}
