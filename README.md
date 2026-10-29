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
- **Deployment:** Static export (`next build` &rarr; static HTML)

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

There is no CI/CD deploy and no server — the site is a static export that is uploaded by hand to shared hosting.

1. `npm test && npm run build` (the build also runs `scripts/post-build.sh`).
2. `post-build.sh` renames `out/_next` → `out/assets` and rewrites every `/_next/` reference in the HTML, JS, CSS and TXT files, because the host blocks requests to `_next` directories (404s).
3. Upload the **contents** of `out/` into the `web/` folder on the host (FTP/SFTP or the hosting file manager), replacing the previous files.

Hosting constraints to keep in mind:

- Plain static files only: no Node runtime, no API routes, no middleware, no server components that fetch data at request time.
- `trailingSlash: true` is set so every route is a `folder/index.html`, which the host serves without rewrite rules.
- `images.unoptimized: true` — `next/image` optimisation needs a server; assets are served as-is from `public/`.
- `.github/workflows/ci.yml` lints, tests and builds on every push/PR to `main` and keeps the built `out/` as a downloadable artifact; a commented-out rsync/FTP deploy job is included as a template if automated deploys are wanted later.

## License

This project is licensed under the [MIT License](LICENSE).
