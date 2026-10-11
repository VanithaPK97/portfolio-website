"use client";

import { Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { useSceneColors } from "@/lib/three/scene-colors";

function disableThree() {
  try {
    document.documentElement.setAttribute("data-three", "off");
  } catch {}
}

// Any WebGL failure drops every slot back to its 2D fallback.
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    disableThree();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// One fixed, full-viewport canvas behind the page. Every scene renders into
// it through a drei View, so the whole site uses a single WebGL context.
export default function SceneCanvas() {
  const { dark } = useSceneColors();
  return (
    <div
      data-scene-canvas
      data-scene-theme={dark ? "dark" : "light"}
      className="pointer-events-none fixed inset-0 z-0"
    >
      <CanvasBoundary>
        <Canvas
          dpr={[1, 1.75]}
          eventSource={typeof document !== "undefined" ? document.body : undefined}
          eventPrefix="client"
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => {
            try {
              document.documentElement.setAttribute("data-three", "on");
            } catch {}
            gl.domElement.addEventListener("webglcontextlost", disableThree);
          }}
        >
          <View.Port />
        </Canvas>
      </CanvasBoundary>
    </div>
  );
}
