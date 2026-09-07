import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve(__dirname, "../../out");
const FIRST_SCREEN_BUDGET = 1.2 * 1024 * 1024;

const describeIfBuilt = existsSync(OUT) ? describe : describe.skip;

describeIfBuilt("v2 first-screen weight", () => {
  it("keeps the first scene plus its formats inside the budget", () => {
    const scenes = join(OUT, "images/scenes");
    const firstScreen = readdirSync(scenes)
      .filter((f) => f.startsWith("01-"))
      .map((f) => statSync(join(scenes, f)).size)
      .reduce((a, b) => a + b, 0);

    expect(firstScreen).toBeLessThan(FIRST_SCREEN_BUDGET);
  });

  it("ships the v2 page as static HTML", () => {
    expect(existsSync(join(OUT, "v2/index.html"))).toBe(true);
  });
});
