import { tower } from "@/content/profile";

// The 2D stand-in for the stack tower: three stacked, slightly skewed slabs
// with the same labels, for devices that don't render 3D.
export function TowerFallback() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 [perspective:900px]">
      {tower.map((slab, i) => (
        <div
          key={slab.tech}
          className="flex w-52 items-center justify-between rounded-xl border border-line bg-surface px-5 py-4 shadow-soft"
          style={{ transform: `rotateX(32deg) rotateZ(${(i - 1) * -2}deg)` }}
        >
          <span className="font-semibold tracking-tight">{slab.tech}</span>
          <span className="font-mono text-[11px] text-muted">{slab.layer}</span>
        </div>
      ))}
    </div>
  );
}
