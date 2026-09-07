// Converts the generated scene PNGs in assets-src/scenes/ into responsive
// AVIF and WebP under public/images/scenes/.
//
// Next.js runs with images.unoptimized (static export), so nothing optimises
// these at request time — what lands in public/ is what the visitor downloads.
// Run once when scenes change; the output is committed.
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "assets-src/scenes");
const OUT = join(ROOT, "public/images/scenes");
const WIDTHS = [1280, 1920, 2400];

await mkdir(OUT, { recursive: true });

const sources = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
if (sources.length === 0) {
  console.error(`No PNGs found in ${SRC}`);
  process.exit(1);
}

for (const file of sources) {
  const id = file.replace(/\.png$/, "");
  for (const width of WIDTHS) {
    const base = sharp(join(SRC, file)).resize(width);
    const avif = await base
      .clone()
      .avif({ quality: 50, effort: 6 })
      .toFile(join(OUT, `${id}-${width}.avif`));
    const webp = await base
      .clone()
      .webp({ quality: 72 })
      .toFile(join(OUT, `${id}-${width}.webp`));
    console.log(
      `${id} ${width}px  avif ${(avif.size / 1024).toFixed(0)}kB  webp ${(webp.size / 1024).toFixed(0)}kB`,
    );
  }
}
