// Pure scene math, shared by the 3D scenes and their tests.

export type Vec3 = [number, number, number];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Hero tower: how far the slabs separate and how far the tower turns as the
// hero scrolls away.
export function explode(progress: number): { gap: number; rotationY: number } {
  const p = clamp01(progress);
  return { gap: 0.35 + 0.75 * p, rotationY: 0.44 * p };
}

// Position along a polyline by fraction of total arc length; t wraps so a
// looping packet returns to its start.
export function pathPoint(points: Vec3[], t: number): Vec3 {
  const wrapped = ((t % 1) + 1) % 1;
  const segLengths = points.slice(1).map((p, i) => dist(points[i], p));
  const total = segLengths.reduce((a, b) => a + b, 0);
  if (total === 0) return [...points[0]];

  let target = wrapped * total;
  for (let i = 0; i < segLengths.length; i++) {
    if (target <= segLengths[i]) {
      const f = segLengths[i] === 0 ? 0 : target / segLengths[i];
      return lerp3(points[i], points[i + 1], f);
    }
    target -= segLengths[i];
  }
  return [...points[points.length - 1]];
}

const CACHE_CYCLE = 4.4;
const MISS_DURATION = 2.0;
const HIT_DURATION = 0.8;

// Cache scene schedule: one miss (2.0s) then three hits (0.8s each), looping.
export function cacheSchedule(seconds: number): {
  kind: "miss" | "hit";
  request: 0 | 1 | 2 | 3;
  local: number;
} {
  // Round local to shed float noise; it only drives interpolation.
  const round = (n: number) => Math.round(n * 1e6) / 1e6;
  const t = ((seconds % CACHE_CYCLE) + CACHE_CYCLE) % CACHE_CYCLE;
  if (t < MISS_DURATION) {
    return { kind: "miss", request: 0, local: round(t / MISS_DURATION) };
  }
  const afterMiss = t - MISS_DURATION;
  const index = Math.floor(afterMiss / HIT_DURATION);
  const request = (index + 1) as 1 | 2 | 3;
  return { kind: "hit", request, local: round((afterMiss - index * HIT_DURATION) / HIT_DURATION) };
}

// Workflow scene: every third token detours through manual review.
export function tokenRoute(tokenIndex: number): "direct" | "review" {
  return tokenIndex % 3 === 2 ? "review" : "direct";
}

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function lerp3(a: Vec3, b: Vec3, f: number): Vec3 {
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}
