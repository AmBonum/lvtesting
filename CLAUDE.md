# lvtesting.eu — notes for Claude Code

- Next 16 App Router with `output: "export"` → static HTML in `out/`. No server components that fetch data, no API routes, no middleware, no image optimisation: everything must work as plain static files on shared hosting.
- Verify before every push: `npm test && npm run build` (vitest; build runs `scripts/post-build.sh`). `npm run lint` has pre-existing errors in tests/error pages — never add new ones.
- i18n: `src/i18n/en.ts` is the reference; `src/i18n/sk.ts`, `cs.ts`, `de.ts`, `es.ts` must keep exact key parity (enforced by `src/__tests__/i18n-completeness.test.ts`). Every new string goes into all five files.
- Tracking: GA4 loads only after analytics consent (`src/lib/consent.ts`, `src/lib/ConsentProvider.tsx`). Any new tracking, embed or third-party script goes behind the same consent gate.
- Contact form: the web3forms access key in `src/components/Contact.tsx` is public by design (static site). Protection = hCaptcha + honeypot + domain allow-list in the web3forms dashboard. Do not move it to env.
- Deploy is manual: `npm run build` → post-build renames `out/_next` → `out/assets` (host blocks `_next`) and rewrites references → upload the contents of `out/` into `web/` on the host. CI (`.github/workflows/ci.yml`) lints, tests and builds; it never deploys.
- `/v2` (branch `v2-cinematic`) is `robots: noindex, nofollow` and stays that way until the redesign is chosen.
- Redesign: two competing directions — Figma "Signal" vs branch `v2-cinematic`. Decision pending (Lubomír). Do not merge either into `main` before that decision.
- Design tooling: the third-party Impeccable skill (`/impeccable`) is installed per machine into `.claude/skills/impeccable` (gitignored — its launcher downloads a binary engine, so it is not vendored); findings for the current homepage are in `docs/impeccable-audit-2026-10.md`.
