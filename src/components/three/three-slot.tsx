"use client";

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useInView } from "motion/react";
import { View } from "@react-three/drei";
import { detectCapability, shouldRender3D, type SceneScope } from "@/lib/three/capability";

// Scenes read this to pause their useFrame work when the slot is off-screen.
const SlotVisibleContext = createContext(true);
export const useSlotVisible = () => useContext(SlotVisibleContext);

// A slot renders its 2D fallback until the shared canvas is ready and the
// device qualifies, then swaps in a drei View that draws into that canvas,
// clipped to this box. Both states fill the same box, so nothing shifts.
export function ThreeSlot({
  name,
  scope,
  fallback,
  className,
  children,
}: {
  name: string;
  scope: SceneScope;
  fallback: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"fallback" | "3d">("fallback");
  const inView = useInView(ref, { margin: "200px" });
  const hasScene = Children.count(children) > 0;

  useEffect(() => {
    const decide = () => {
      const ready = document.documentElement.dataset.three === "on";
      setState(ready && hasScene && shouldRender3D(detectCapability(), scope) ? "3d" : "fallback");
    };
    decide();
    const observer = new MutationObserver(decide);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-three"] });
    const onResize = () => decide();
    window.addEventListener("resize", onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [scope, hasScene]);

  return (
    <div ref={ref} data-three-slot={name} data-three-state={state} className={className}>
      {state === "3d" ? (
        <SlotVisibleContext.Provider value={inView}>
          <View className="absolute inset-0" aria-hidden>
            {children}
          </View>
        </SlotVisibleContext.Provider>
      ) : (
        fallback
      )}
    </div>
  );
}
