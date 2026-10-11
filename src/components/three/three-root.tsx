"use client";

import { useEffect, useState, type ComponentType } from "react";
import { detectCapability, shouldRender3D } from "@/lib/three/capability";

// The 3D canvas is fetched with a bare dynamic import inside an idle
// callback, so its chunk stays out of the initial HTML and loads only
// after first paint, and only when the device can handle 3D.
export function ThreeRoot() {
  const [Canvas, setCanvas] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!shouldRender3D(detectCapability(), "section")) return;
      import("./scene-canvas").then((m) => {
        if (!cancelled) setCanvas(() => m.default);
      });
    };
    const ric = window.requestIdleCallback;
    if (ric) {
      const id = ric(run);
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }
    const t = setTimeout(run, 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  return Canvas ? <Canvas /> : null;
}
