/**
 * One definition of the scene plates' responsive-image contract, shared by
 * the <picture> that renders them (SceneLayer) and the preload that warms
 * the first one (PreloadFirstScene). If these two ever disagree — a width
 * in one list and not the other, or a different `sizes` — the browser
 * picks different candidates for the preload and the <img>, and the
 * "saved" round trip becomes a duplicate download instead.
 */
export const SCENE_WIDTHS = [1280, 1920, 2400] as const;

/** `sizes` for a plate: the stage is full-bleed, so a plate is always 100vw. */
export const SCENE_SIZES = "100vw";

export const SCENE_SRCSET = (src: string, ext: string) =>
  SCENE_WIDTHS.map((w) => `${src}-${w}.${ext} ${w}w`).join(", ");
