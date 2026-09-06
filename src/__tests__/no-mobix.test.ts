import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

/**
 * The Mobix client is no longer presented as a project anywhere on the site.
 * The underlying experience is kept, but described without naming the client.
 *
 * This guards the whole source tree rather than a single file, because the
 * reference used to live in twelve places at once — data, five locale files,
 * a type, the portfolio page, two AI-discovery files and three SVG assets.
 * A grep-style test is the only thing that catches a reappearance in any of them.
 */

const ROOT = resolve(__dirname, "../..");
const SCANNED_DIRS = ["src", "public"];
const SELF = resolve(__filename);

const TEXT_FILE = /\.(ts|tsx|js|jsx|css|txt|xml|json|md|svg|html)$/i;
const FORBIDDEN = /mobix/i;

function collectFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      found.push(...collectFiles(path));
    } else if (TEXT_FILE.test(entry) && resolve(path) !== SELF) {
      found.push(path);
    }
  }
  return found;
}

describe("Mobix is not referenced anywhere", () => {
  const files = SCANNED_DIRS.flatMap((dir) => collectFiles(join(ROOT, dir)));

  it("scans a meaningful number of files", () => {
    // Guards against the scan silently matching nothing and passing for free.
    expect(files.length).toBeGreaterThan(20);
  });

  it("finds no mention in any source, content or asset file", () => {
    const offenders = files
      .filter((file) => FORBIDDEN.test(readFileSync(file, "utf8")))
      .map((file) => relative(ROOT, file));

    expect(offenders).toEqual([]);
  });

  it("has no leftover Mobix asset files", () => {
    const named = files
      .filter((file) => FORBIDDEN.test(file))
      .map((file) => relative(ROOT, file));

    expect(named).toEqual([]);
  });
});
