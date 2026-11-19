# lvtesting.eu

Personal portfolio and freelance services website of **Lubomir Volcko** — QA Automation Engineer with 5+ years of experience in test automation, full-stack web & mobile development, and UX/UI design.

**Live:** [lvtesting.eu](https://lvtesting.eu)

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Testing:** Vitest + React Testing Library
- **Captcha:** hCaptcha
- **Deployment:** Static export (`next build` &rarr; static HTML) on GitHub Pages

## Features

- Fully responsive single-page portfolio
- Multi-language support (EN, SK, CS, DE, ES)
- Smooth scroll animations with Framer Motion
- Contact form with hCaptcha protection
- AI/LLM discovery files (`llms.txt`, `llms-full.txt`)
- SEO optimized with JSON-LD structured data (Person, WebSite, ProfessionalService)
- Comprehensive `robots.txt` with AI crawler rules
- XML sitemap

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals)
├── components/       # UI components (Hero, About, Skills, Projects, ...)
│   └── ui/           # Reusable UI primitives (Badge, GlassCard, ScrollReveal)
├── data/             # Static content data
└── i18n/             # Internationalization (5 languages)
public/
├── llms.txt          # AI discovery — summary
├── llms-full.txt     # AI discovery — full content
├── robots.txt        # Crawler rules
└── sitemap.xml       # XML sitemap
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Deployment

The site is a static export served by **GitHub Pages** with the custom domain `lvtesting.eu`. Every push to `main` deploys; pull requests only verify.

1. `.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, `npm test` and `npm run build` (the build also runs `scripts/post-build.sh`).
2. On `main`, the same `out/` is uploaded as the Pages artifact and published by the `deploy` job.
3. `post-build.sh` renames `out/_next` → `out/assets` and rewrites every `/_next/` reference. Pages would serve `_next` too; the rename stays so asset URLs match the previous host and the export can still be uploaded to plain shared hosting (rollback: upload the contents of `out/` into `web/`).

Hosting constraints to keep in mind:

- Plain static files only: no Node runtime, no API routes, no middleware, no server components that fetch data at request time.
- `trailingSlash: true` is set so every route is a `folder/index.html`, which static hosts serve without rewrite rules.
- `images.unoptimized: true` — `next/image` optimisation needs a server; assets are served as-is from `public/`.
- `public/CNAME` holds the domain; the custom domain itself is set in Settings → Pages (with "Enforce HTTPS"). DNS: apex A/AAAA records point at GitHub Pages, `www` is a CNAME to `ambonum.github.io` (Pages redirects it to the apex).
- `public/.htaccess` only matters for the old Apache host (rollback); Pages ignores it.

## License

This project is licensed under the [MIT License](LICENSE).
