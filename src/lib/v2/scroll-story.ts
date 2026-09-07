/**
 * The scroll model for the v2 cinematic background.
 *
 * Everything here is a pure function of the document scroll progress (0 → 1)
 * and returns Framer Motion input/output ranges. Components feed these to
 * `useTransform`, so scrolling never triggers a React render — the values are
 * driven on the motion value graph and applied straight to `transform` and
 * `opacity`, which the browser composites off the main thread.
 */

/** How much of a scene's window is spent crossfading into the next one. */
export const BLEND_FRACTION = 0.25;

/** The slice of total scroll progress that belongs to one scene. */
export function sceneWindow(
  index: number,
  count: number,
): { start: number; end: number } {
  return { start: index / count, end: (index + 1) / count };
}

/**
 * Opacity keyframes for one scene.
 *
 * A scene fades in over the blend slice before its window and fades out over
 * the blend slice after it, so neighbours always overlap and the background
 * never flashes through. The first and last scenes are clamped to the page
 * edges instead — there is nothing before or after them to blend with.
 *
 * The clamp point (0 for the first scene, 1 for the last) sits exactly on
 * top of the adjacent fade keyframe, which is already held at the same
 * output value. Emitting both would give `useTransform` a repeated `input`
 * value, which breaks its strictly-increasing requirement, so edge scenes
 * drop the redundant point and return a 3-point (or, for a single scene,
 * 2-point) range instead of the 4-point shape middle scenes use.
 */
export function sceneOpacityRange(
  index: number,
  count: number,
): { input: number[]; output: number[] } {
  const { start, end } = sceneWindow(index, count);
  const blend = (end - start) * BLEND_FRACTION;

  const isFirst = index === 0;
  const isLast = index === count - 1;

  if (isFirst && isLast) {
    return { input: [0, 1], output: [1, 1] };
  }
  if (isFirst) {
    return { input: [0, end - blend, end + blend], output: [1, 1, 0] };
  }
  if (isLast) {
    return { input: [start - blend, start + blend, 1], output: [0, 1, 1] };
  }

  return {
    input: [start - blend, start + blend, end - blend, end + blend],
    output: [0, 1, 1, 0],
  };
}

/**
 * Vertical travel for one layer across its scene's window.
 *
 * The layer starts half an amplitude below its resting place and ends half an
 * amplitude above it, scaled by `speed`. A distant layer (speed 0.1) barely
 * moves; a foreground layer (speed 1) moves the full amplitude. That
 * difference in rate — not the number of layers — is what reads as depth.
 */
export function layerRange(
  index: number,
  count: number,
  speed: number,
  amplitude: number,
): { input: [number, number]; output: [number, number] } {
  const { start, end } = sceneWindow(index, count);
  const travel = (speed * amplitude) / 2;
  // `+ 0` normalises `-0` (produced by `-travel` when `travel` is 0) to `+0`,
  // since Object.is()-based equality (e.g. Vitest's toEqual) treats them as
  // distinct.
  return { input: [start, end], output: [travel, -travel + 0] };
}
