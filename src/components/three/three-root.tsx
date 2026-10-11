"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { detectCapability, shouldRender3D } from "@/lib/three/capability";

// Loaded only after first paint, and only when the device can handle 3D, so
// the hero text stays the largest contentful paint.
const SceneCanvas = dynamic(() => import("./scene-canvas"), { ssr: false });

export function ThreeRoot() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const run = () => {
      if (shouldRender3D(detectCapability(), "section")) setEnabled(true);
    };
    const ric = window.requestIdleCallback;
    if (ric) {
      const id = ric(run);
      return () => window.cancelIdleCallback?.(id);
    }
    const t = setTimeout(run, 200);
    return () => clearTimeout(t);
  }, []);

  return enabled ? <SceneCanvas /> : null;
}
