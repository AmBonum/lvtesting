"use client";

import { SceneStage } from "@/components/v2/SceneStage";
import { SCENES } from "@/lib/v2/scenes";

export default function V2Page() {
  return (
    <>
      <SceneStage />
      {/* `relative` (no z-index) on <main>: found two real-browser-only
          stacking bugs while verifying this, neither visible in
          jsdom/tsc/build.
          (1) SceneStage uses `z-0`, not a negative z-index. With a negative
          z-index, a `fixed` element paints behind ANY unpositioned ancestor
          background painted in the same (root) stacking context — here
          `.v2-body`'s opaque ink ground from the v2 layout — hiding every
          scene. `isolation: isolate` on an intermediate wrapper does not
          fix this: a `position: fixed` element's stacking containment
          follows its *containing block* (an ancestor with a transform,
          filter, etc.), not merely an ancestor with `isolation`/`z-index`.
          (2) Giving <main> its own explicit z-index (e.g. `z-10`) promotes
          it to its own stacking context, and in testing that made its
          entire (transparent) subtree opaque, hiding the stage completely
          even though every element's computed `background-color` was
          `transparent`. `position: relative` alone, with `z-index: auto`,
          does not create a stacking context — <main> stays at stack level
          0 and simply paints after SceneStage (also stack level 0) because
          it comes later in the DOM, which is enough to sit visually above
          the scenes without the opaque-layer bug. */}
      <main id="main-content" className="relative">
        <h1 className="sr-only">lvtesting.eu v2</h1>
        {/* Temporary scaffold: one full viewport per scene, so the stage can
            be scrolled and judged before the real sections exist.
            Replaced in Tasks 5–7. */}
        {SCENES.map((scene) => (
          <section
            key={scene.id}
            className="flex min-h-screen items-center px-8"
          >
            <p className="text-sm uppercase tracking-[0.25em] text-v2-muted">
              {scene.id}
            </p>
          </section>
        ))}
      </main>
    </>
  );
}
