// Decides whether a given 3D scene may render on this device. Pure, so it
// is unit-tested; detectCapability() reads the live browser.

export type Capability = {
  webgl2: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  cores: number;
  width: number;
};

export type SceneScope = "section" | "card" | "contact";

export function shouldRender3D(c: Capability, scope: SceneScope): boolean {
  if (!c.webgl2 || c.reducedMotion || c.saveData || c.cores <= 2) return false;
  if (scope === "card" && c.width < 768) return false;
  return true;
}

// Browser only. Reads WebGL2 support, motion and data preferences, core
// count and viewport width. Safe to call client-side after mount.
export function detectCapability(): Capability {
  const reducedMotion =
    typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

  let webgl2 = false;
  try {
    const canvas = document.createElement("canvas");
    webgl2 = !!canvas.getContext("webgl2");
  } catch {
    webgl2 = false;
  }

  const connection = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;

  return {
    webgl2,
    reducedMotion,
    saveData: connection?.saveData ?? false,
    cores: navigator.hardwareConcurrency ?? 4,
    width: window.innerWidth,
  };
}
