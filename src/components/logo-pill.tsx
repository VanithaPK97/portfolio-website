import { brands, type BrandKey } from "@/content/brands";
import Image from "next/image";

// An inline brand pill: a small logo (or letter-mark) plus the brand name.
// No icon library ships to the browser; the glyph path is a plain string.
export function LogoPill({ brand, size = "md" }: { brand: BrandKey; size?: "sm" | "md" }) {
  const { label, path, initials, color, asset } = brands[brand];
  const glyph = size === "sm" ? 16 : 18;

  // OpenText's glyph is a wide wordmark; a square viewBox made it illegible.
  if (brand === "opentext") {
    return (
      <span data-brand={brand} className="mx-0.5 inline-flex items-center whitespace-nowrap rounded-full border border-line bg-white px-2.5 py-0.5 align-middle">
        <svg viewBox="0 9 24 6" width={size === "sm" ? 66 : 76} height={24} aria-hidden fill={color} className="shrink-0">
          <path d={path} />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    );
  }

  return (
    <span data-brand={brand} className="mx-0.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-2.5 py-0.5 align-middle text-[0.92em] font-medium text-ink">
      {asset ? (
        <Image src={asset} alt="" width={brand === "aws" || brand === "oracle" || brand === "troweprice" ? 32 : 20} height={20} className="h-6 w-auto max-w-10 shrink-0 rounded-sm bg-white p-0.5" />
      ) : path ? (
        <svg
          viewBox="0 0 24 24"
          width={glyph}
          height={glyph}
          aria-hidden
          fill={color}
          className="shrink-0 rounded-sm bg-white p-0.5 box-content"
        >
          <path d={path} />
        </svg>
      ) : (
        <span
          aria-hidden
          style={{ backgroundColor: color }}
          className="grid min-h-5 min-w-5 shrink-0 place-items-center rounded-[4px] px-0.5 font-mono text-[8px] font-semibold leading-none text-white"
        >
          {initials}
        </span>
      )}
      {label}
    </span>
  );
}
