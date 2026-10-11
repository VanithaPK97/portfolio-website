// The typed intro timeline. Pure so the overlay component and tests agree
// on exactly what shows at each moment.

export const INTRO = {
  first: "Hi, I’m Vanitha P K.",
  second: ["I build Java and React systems,", "from the database to the button."],
  firstMs: 40,
  pauseMs: 300,
  secondMs: 40,
  holdMs: 500,
  dockMs: 700,
} as const;

export type IntroPhase = "typing-1" | "pause" | "typing-2" | "hold" | "dock" | "done";

const FIRST_LEN = INTRO.first.length;
const SECOND_LEN = INTRO.second.join("").length;

const T1 = FIRST_LEN * INTRO.firstMs;
const T2 = T1 + INTRO.pauseMs;
const T3 = T2 + SECOND_LEN * INTRO.secondMs;
const T4 = T3 + INTRO.holdMs;
const T5 = T4 + INTRO.dockMs;

export const INTRO_TOTAL_MS = T5;

export function introState(elapsedMs: number): {
  phase: IntroPhase;
  first: number;
  second: number;
} {
  if (elapsedMs < T1) {
    return { phase: "typing-1", first: Math.min(FIRST_LEN, Math.floor(elapsedMs / INTRO.firstMs)), second: 0 };
  }
  if (elapsedMs < T2) {
    return { phase: "pause", first: FIRST_LEN, second: 0 };
  }
  if (elapsedMs < T3) {
    const typed = Math.floor((elapsedMs - T2) / INTRO.secondMs);
    return { phase: "typing-2", first: FIRST_LEN, second: Math.min(SECOND_LEN, typed) };
  }
  if (elapsedMs < T4) return { phase: "hold", first: FIRST_LEN, second: SECOND_LEN };
  if (elapsedMs < T5) return { phase: "dock", first: FIRST_LEN, second: SECOND_LEN };
  return { phase: "done", first: FIRST_LEN, second: SECOND_LEN };
}

export function shouldPlayIntro(o: { reducedMotion: boolean; seen: boolean }): boolean {
  return !o.reducedMotion && !o.seen;
}
