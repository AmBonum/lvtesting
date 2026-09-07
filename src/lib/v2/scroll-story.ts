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
 * A scene fades IN over the blend slice around the start of its window and
 * then stays at 1. It never fades out.
 *
 * That asymmetry is the whole point. The scenes are stacked in DOM order
 * and later ones paint over earlier ones, so scene N+1 arriving on top is
 * already enough to hide scene N — asking scene N to fade out at the same
 * time just uncovers what is behind them both. The ground there is
 * near-black (#05060B), and two neighbours ramping past each other sit near
 * 0.5 together at the midpoint, leaving (1 - 0.5) * (1 - 0.5) = 25% of it
 * showing. Measured live on the real page before this change: up to 29.3%
 * ground at the five transitions, which reads as two photographs
 * superimposed and dimmed toward black rather than as one dissolving into
 * the next.
 *
 * Holding each scene at 1 once it has arrived means at least one scene is
 * always fully opaque, so the ground is never visible at any scroll
 * position — asserted directly in the tests by compositing the whole stack
 * rather than by checking a keyframe shape.
 *
 * The first scene is simply always visible: there is nothing beneath it to
 * uncover and nothing before it to blend with.
 */
export function sceneOpacityRange(
  index: number,
  count: number,
): { input: number[]; output: number[] } {
  return sceneOpacityRangeForWindow(sceneWindow(index, count), index === 0);
}

/**
 * Same keyframe shape as {@link sceneOpacityRange}, but takes an explicit
 * window instead of deriving one from `index / count`. This is the sibling
 * `sceneOpacityRange` delegates to internally (so its own behaviour and
 * tests are untouched) and the one {@link sceneWindowsFromSections} feeds:
 * a scene's window may come from a measured section instead of an equal
 * split, but the fade-in/fade-out math over that window is identical
 * either way.
 */
export function sceneOpacityRangeForWindow(
  window: { start: number; end: number },
  isFirst: boolean,
): { input: number[]; output: number[] } {
  const { start, end } = window;
  const blend = (end - start) * BLEND_FRACTION;

  // The first scene is visible from the very top and never yields: every
  // later scene arrives on top of it. A single-scene page is just this
  // case, held for the whole document.
  if (isFirst) {
    return { input: [0, 1], output: [1, 1] };
  }

  // Every other scene fades in across its own start boundary and then holds
  // to the bottom of the page. There is deliberately no `isLast` case: since
  // nothing fades out, holding to 1 already carries the final scene to the
  // end, which is exactly what the old dedicated last-scene branch did by
  // hand.
  return { input: [start - blend, start + blend, 1], output: [0, 1, 1] };
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
  return layerRangeForWindow(sceneWindow(index, count), speed, amplitude);
}

/**
 * Same travel math as {@link layerRange}, but takes an explicit window
 * instead of deriving one from `index / count`. See
 * {@link sceneOpacityRangeForWindow} for why this sibling exists.
 */
export function layerRangeForWindow(
  window: { start: number; end: number },
  speed: number,
  amplitude: number,
): { input: [number, number]; output: [number, number] } {
  const { start, end } = window;
  const travel = (speed * amplitude) / 2;
  // `+ 0` normalises `-0` (produced by `-travel` when `travel` is 0) to `+0`,
  // since Object.is()-based equality (e.g. Vitest's toEqual) treats them as
  // distinct.
  return { input: [start, end], output: [travel, -travel + 0] };
}

/**
 * Converts measured section geometry into scene window boundaries.
 *
 * `sceneWindow` assumes every scene owns an equal 1/count slice of total
 * scroll progress. That is only true if every section is exactly the same
 * height — real ones aren't (a contact form section can run 2x the height
 * of a hero section), and one oversized section shifts every window after
 * it away from the content it is meant to sit behind. This function
 * replaces the equal-split assumption with windows measured from where the
 * sections actually sit in the document.
 *
 * Definition of "this section's window": the scroll-progress range over
 * which the section is the one dominating the viewport. The boundary
 * between two adjacent sections is the point where the reader's view
 * crosses from one into the next — the midpoint between the previous
 * section's bottom edge and the next section's top edge. For sections
 * stacked with no gap (the normal case: sibling `<section>`s in flow) the
 * previous bottom and the next top are the same pixel, so the midpoint is
 * just that shared edge; the averaging only matters as a tolerance for a
 * stray sub-pixel gap. The first section's window always starts at
 * progress 0 (the top of the page) and the last section's window always
 * ends at progress 1 (the bottom) — there is nothing before the first or
 * after the last to share a boundary with.
 *
 * Pixel positions are converted to progress with the same denominator
 * Framer Motion's `useScroll()` uses for the whole document: `docHeight -
 * viewportHeight`, the actual scrollable distance (you can never scroll
 * further than one viewport's worth short of the bottom of the page). This
 * is *why* `sceneWindow`'s pure `index / count` split is only exactly
 * recovered here when `viewportHeight` is 0 — `index / count` implicitly
 * assumes a page with no viewport-sized "overhang" left over at the
 * bottom. For any real, nonzero viewport height the windows below are
 * deliberately different from the equal split: closing that gap is the
 * entire point of this function, and the difference is largest for
 * sections deep in a tall document, which is exactly where the drift was
 * measured.
 */
export function sceneWindowsFromSections(
  sections: { top: number; height: number }[],
  docHeight: number,
  viewportHeight: number,
): { start: number; end: number }[] {
  const count = sections.length;
  if (count === 0) {
    return [];
  }

  const maxScroll = docHeight - viewportHeight;

  // No scrollable range — a document no taller than the viewport (nothing
  // has scrolled, or measurement hasn't landed yet). There is no scroll
  // position to derive a boundary from, so fall back to the equal split;
  // nothing can scroll in this state, so the fallback is never visibly
  // wrong.
  if (!(maxScroll > 0)) {
    return sections.map((_, index) => sceneWindow(index, count));
  }

  const EPSILON = 1e-9;
  const boundaries: number[] = [0];
  for (let i = 1; i < count; i++) {
    const prevBottom = sections[i - 1].top + sections[i - 1].height;
    const nextTop = sections[i].top;
    const raw = (prevBottom + nextTop) / 2 / maxScroll;
    const clamped = Math.min(1, Math.max(0, raw));
    // Guard against measurement noise — a zero-height section, or two
    // sections reporting the same position — producing a boundary that
    // repeats or regresses. Every downstream consumer (sceneOpacityRange,
    // useTransform) requires a strictly increasing input array.
    boundaries.push(Math.max(clamped, boundaries[i - 1] + EPSILON));
  }
  boundaries.push(Math.max(1, boundaries[count - 1] + EPSILON));

  return sections.map((_, index) => ({
    start: boundaries[index],
    end: boundaries[index + 1],
  }));
}

/**
 * Extends a keyframe range so it spans the whole 0 → 1 scroll progress,
 * holding the first and last output values flat over the added span.
 *
 * Semantically this is a no-op: `useTransform` clamps at its range ends by
 * default, so a value pinned flat outside the original range is exactly
 * what it already produced there. It exists for a *rendering* reason.
 *
 * Framer Motion accelerates a scroll-linked `useTransform` into a native
 * ScrollTimeline WAAPI animation whenever the browser supports one
 * (`useScroll` sets `MotionValue.accelerate`; `useTransform` copies the
 * input range into WAAPI `times`, i.e. keyframe offsets). WAAPI does not
 * clamp: when the last explicit offset is below 1, it synthesises an
 * implicit final keyframe holding the element's *underlying* style value
 * and interpolates towards it. The first scene's window ends around 0.2
 * and its underlying inline style is `opacity: 1`, so past its fade-out
 * the browser faded it straight back in over the rest of the page —
 * measured at 0.29 opacity at 44% scroll and 1.0 at the bottom, ghosting
 * scene 1's photograph through every later scene (see task-8-report.md,
 * "Defect A"). The same applies to a layer's parallax `y`.
 *
 * Pinning both ends to the full progress range removes the implicit
 * keyframes, so the accelerated path renders what the clamped JS path
 * always did.
 *
 * ASSUMPTION, stated because it is not enforced here: the incoming range is
 * expected to lie within 0..1. This only ever PREPENDS 0 / APPENDS 1 when an
 * endpoint is strictly on the short side of them, so a range that already
 * overshoots (first < 0 or last > 1) is passed through unpinned rather than
 * clamped. That cannot happen for any window this module currently
 * produces: `sceneWindowsFromSections` derives boundaries from real section
 * offsets, and every section carries `min-h-screen`, which keeps each
 * scene's blend margin (BLEND_FRACTION of its own window) well inside its
 * neighbours. It would become reachable only if one section grew extreme
 * enough relative to its neighbours (roughly >4x) to push a middle scene's
 * blend margin past the document ends — so if that constraint is ever
 * relaxed, clamp here rather than assuming.
 */
export function pinnedToFullProgress(
  input: readonly number[],
  output: readonly number[],
): { input: number[]; output: number[] } {
  const pinnedInput = [...input];
  const pinnedOutput = [...output];

  if (pinnedInput.length === 0) {
    return { input: pinnedInput, output: pinnedOutput };
  }

  if (pinnedInput[0] > 0) {
    pinnedInput.unshift(0);
    pinnedOutput.unshift(pinnedOutput[0]);
  }
  if (pinnedInput[pinnedInput.length - 1] < 1) {
    pinnedInput.push(1);
    pinnedOutput.push(pinnedOutput[pinnedOutput.length - 1]);
  }

  return { input: pinnedInput, output: pinnedOutput };
}
