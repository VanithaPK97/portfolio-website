// The header hides on downward scroll past a threshold and returns on
// upward scroll, but never while the mobile menu is open.
export function headerHidden(prevY: number, y: number, menuOpen: boolean): boolean {
  return y > 120 && y > prevY && !menuOpen;
}
