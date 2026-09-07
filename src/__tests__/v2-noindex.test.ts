import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

describe("/v2 stays out of search engines while it is a preview", () => {
  it("declares noindex in its layout metadata", () => {
    const layout = read("src/app/v2/layout.tsx");
    /* Both flags are matched inside the SAME robots block. Asserting
       /follow:\s*false/ against the whole file would pass on any stray
       occurrence of that string elsewhere in the layout, including one in
       a comment — the assertion would survive the robots block being
       deleted outright. */
    const robots = layout.match(/robots:\s*\{[^}]*\}/);
    expect(robots, "no robots block found in v2 layout metadata").not.toBeNull();
    expect(robots![0]).toMatch(/index:\s*false/);
    expect(robots![0]).toMatch(/follow:\s*false/);
  });

  /* The three source assertions above check INTENT. This one checks the
     artifact that actually ships: Next has to translate that metadata
     export into a real <meta> tag, and a source regex would happily pass
     if it ever stopped doing so. Skipped rather than failed when out/ is
     absent, so the suite still runs on a clean checkout without a build. */
  const itIfBuilt = existsSync(resolve(ROOT, "out/v2/index.html")) ? it : it.skip;
  itIfBuilt("emits a noindex robots meta tag into the built page", () => {
    const html = read("out/v2/index.html");
    expect(html).toMatch(/<meta name="robots" content="[^"]*noindex[^"]*"/);
    expect(html).toMatch(/<meta name="robots" content="[^"]*nofollow[^"]*"/);
  });

  it("is disallowed in robots.txt", () => {
    expect(read("public/robots.txt")).toMatch(/^Disallow:\s*\/v2\/$/m);
  });

  it("is absent from the sitemap", () => {
    expect(read("public/sitemap.xml")).not.toContain("/v2");
  });
});
