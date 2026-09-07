/**
 * The six scenes, in scroll order, tracing how software gets made.
 *
 * A scene is data, not code: swapping an image never touches the animation
 * logic. `speed` is the layer's parallax rate — 0.1 is nearly still (far
 * away), 1 moves the full amplitude (close to the viewer).
 */

export type SceneLayerSpec = {
  /** Path under public/, without the width and extension suffix. */
  src: string;
  speed: number;
};

export type Scene = {
  id: string;
  alt: string;
  plate: SceneLayerSpec;
  layers: SceneLayerSpec[];
};

export const SCENES: Scene[] = [
  {
    id: "idea",
    alt: "A notebook of hand-drawn wireframes under a desk lamp at night, city lights blurred beyond the window.",
    plate: { src: "/images/scenes/01", speed: 0.12 },
    layers: [],
  },
  {
    id: "spec",
    alt: "A whiteboard of architecture diagrams and sticky notes in a dark meeting room.",
    plate: { src: "/images/scenes/02", speed: 0.15 },
    layers: [],
  },
  {
    id: "build",
    alt: "Two monitors glowing with code and a wireframe mockup above a keyboard and the same open notebook.",
    plate: { src: "/images/scenes/03", speed: 0.18 },
    layers: [],
  },
  {
    id: "test",
    alt: "A rack of mounted phones and tablets running the same app, green status lights along the shelves.",
    plate: { src: "/images/scenes/04", speed: 0.15 },
    layers: [],
  },
  {
    id: "release",
    alt: "A server room corridor receding into darkness, amber and green status lights along the racks.",
    plate: { src: "/images/scenes/05", speed: 0.1 },
    layers: [],
  },
  {
    id: "production",
    alt: "Hands holding a phone showing the finished app, city rooftops at sunrise beyond.",
    plate: { src: "/images/scenes/06", speed: 0.14 },
    layers: [],
  },
];

/** Pixels of travel a layer at speed 1 covers across its scene window. */
export const PARALLAX_AMPLITUDE = 220;
