// How far a magnetic element shifts toward the pointer: the pointer's
// distance from the element centre, scaled by strength.
export function magneticOffset(
  pointer: { x: number; y: number },
  rect: { left: number; top: number; width: number; height: number },
  strength: number,
): { x: number; y: number } {
  const centreX = rect.left + rect.width / 2;
  const centreY = rect.top + rect.height / 2;
  return {
    x: (pointer.x - centreX) * strength,
    y: (pointer.y - centreY) * strength,
  };
}
