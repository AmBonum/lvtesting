import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

describe("/v2 stays out of search engines while it is a preview", () => {
  it("declares noindex in its layout metadata", () => {
    const layout = read("src/app/v2/layout.tsx");
    expect(layout).toMatch(/robots:\s*\{[^}]*index:\s*false/);
    expect(layout).toMatch(/follow:\s*false/);
  });

  it("is disallowed in robots.txt", () => {
    expect(read("public/robots.txt")).toMatch(/^Disallow:\s*\/v2\/$/m);
  });

  it("is absent from the sitemap", () => {
    expect(read("public/sitemap.xml")).not.toContain("/v2");
  });
});
