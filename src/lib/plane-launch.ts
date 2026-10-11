// A tiny event bus so the Contact "Email me" button can tell the paper
// plane scene to launch, without the two components sharing a parent.

const target = new EventTarget();
const EVENT = "plane-launch";

export function launchPlane(): void {
  target.dispatchEvent(new Event(EVENT));
}

export function onPlaneLaunch(listener: () => void): () => void {
  target.addEventListener(EVENT, listener);
  return () => target.removeEventListener(EVENT, listener);
}
