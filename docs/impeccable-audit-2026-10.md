# Impeccable design audit — lvtesting.eu homepage (October 2026)

**Target:** `src/app/page.tsx` (Header → Hero → About → Projects → Skills → Experience → Companies → Contact → Footer), `src/app/globals.css`, `src/components/ui/*`.
**Method:** source-level pass using the Impeccable `audit` (5 technical dimensions) and the `polish` / `typeset` / `layout` references in `.claude/skills/impeccable/reference/`. The bundled detector (`scripts/impeccable detect`) and a rendered-browser pass were **not** run, so every score below is source-based and should be confirmed against the live page before acting. Contrast ratios were computed from the hex values in `globals.css` (WCAG relative luminance).
**Mode:** Persuade (freelance landing page) with Experience elements (portfolio). On a Persuade surface the design is the product; restraint shows as precision, not as absence.
**Scope of this document:** findings only. No design code changes are part of the PR that adds this file.

## Audit health score (source-based)

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2 | No `prefers-reduced-motion` path; primary accent fails AA for small text |
| 2 | Performance | 2 | Five infinite blur-filtered motion blobs + hover-scale on backdrop-filter cards |
| 3 | Theming | 3 | Token system exists; a handful of hard-coded colours and two token syntaxes |
| 4 | Responsive design | 3 | Works on mobile; Hero social icons and footer links under WCAG target size |
| 5 | Implementation integrity | 3 | Coherent glass/dark system; self-rated skill percentages read as decorative data |
| **Total** | | **13/20** | **Acceptable — significant work needed on motion and the hero** |

**Integrity verdict: pass with reservations.** The glass-card / purple-coral-teal system is consistently applied and recognisably the same product on every section. What stops it from reading as *authored* is the hero: the generic "floating blurred circles on a dark grid" background plus seven stacked centred groups is the category default for developer portfolios, and the section headings carry more visual energy (gradient) than the H1.

## Findings (prioritised)

### [P1] No reduced-motion alternative anywhere — Accessibility / Motion
- **Location:** `src/components/Hero.tsx` (5 `motion.div` blobs with `repeat: Infinity`), `src/components/ui/ScrollReveal.tsx`, `src/components/Skills.tsx` (`ProgressBar`), `src/app/globals.css` (`.animate-marquee`, 30 s infinite), every `GlassCard` (`hover:scale-[1.02]`). `grep -rn "reduced" src` returns nothing.
- **Impact:** users with vestibular disorders or the OS "Reduce motion" setting get the full set of perpetual drifting, scaling and sliding. The marquee in Companies is the most problematic: it never stops and sits in the reading path. WCAG 2.3.3 (AAA) / 2.2.2 pause-stop-hide (A) for the marquee.
- **Recommendation:** `useReducedMotion()` from framer-motion in `Hero`, `ScrollReveal` and `ProgressBar` (reveal → opacity-only, blobs → static, bar → final width); `@media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }` plus a static wrapped logo grid. Keep hover states (colour/border) but drop the scale transforms under the media query. Do **not** use a global `0.01ms` kill: keep the state change, remove the travel.
- **Suggested command:** `/impeccable animate` (motion inventory + reduced-motion branch), then `/impeccable harden`.

### [P1] Purple accent fails AA for small text and on the primary CTA — Contrast
- **Location:** `--color-accent-purple: #6C63FF` on `--color-bg-primary: #0F0F1A` ≈ **4.4:1**; white text on `#6C63FF` (Hero primary CTA, Contact submit button, `text-sm font-semibold`) ≈ **4.3:1**. Used as 14 px text in `Experience.tsx` (company name `text-accent-purple`), `Contact.tsx` (success-state "send another" link, social hover), `Badge` purple variant (`text-sm`), `CookieConsent` "required" pill (`text-[10px]`).
- **Impact:** every instance of the brand colour as text, and the two most important buttons on the page, sit just under the 4.5:1 threshold for text below 18.66 px bold / 24 px regular. Placeholder text (`placeholder:text-text-muted/50`) ≈ **3.9:1**. The teal, coral and yellow accents all pass comfortably (6.8:1 – 12:1); only purple is the problem, and purple is the primary.
- **Recommendation:** add a text-safe purple token (e.g. `--color-accent-purple-text: #8E88FF` ≈ 6.3:1 on the background) for text/links/badges and keep `#6C63FF` for fills, borders and glows; on the filled CTA either darken the fill (`#5A52E8` → white text ≈ 5.3:1) or bump the label to `text-base`. Raise the placeholder alpha to `/65`.
- **Suggested command:** `/impeccable colorize` (token split), verify with `/impeccable audit`.

### [P1] Hero hierarchy: the H1 is the weakest heading on the page — Typography / Hierarchy
- **Location:** `src/components/Hero.tsx` `<motion.h1 className="text-3xl … lg:text-5xl font-bold leading-tight">` (max 48 px, plain `text-text-primary`, no tracking) vs `SectionHeading` size `md` (`text-3xl sm:text-4xl font-bold tracking-tight` **with** `gradient-text`). The EN headline is 13 words / ~80 characters inside `max-w-3xl`, so it wraps to three lines on desktop with no `text-wrap: balance`; SK/DE copy is longer still.
- **Impact:** squint test on the hero fails: the gradient section titles further down have more visual weight than the headline, and the three-line centred H1 with a ragged last line reads as body copy. Nothing in the first viewport is unmistakably "the" statement.
- **Recommendation:** make the H1 the only gradient (or the only oversized) element: `font-size: clamp(2.5rem, 6vw, 4.5rem)`, `line-height: 1.05–1.1`, `letter-spacing: -0.02em`, `text-wrap: balance`, and shorten the headline to ≤ 9 words in every locale (parity test will enforce the keys, not the length — check SK/CS/DE/ES manually). Drop the gradient from `SectionHeading` (keep `tracking-tight`, add `text-wrap: balance`) so section titles become quieter wayfinding, not competing hero moments.
- **Suggested command:** `/impeccable typeset` → `/impeccable bolder` on the hero only.

### [P2] Hero information density: seven centred groups with uniform rhythm — Layout
- **Location:** `src/components/Hero.tsx`: headline → subheadline → 5 offer bullets (2-col grid) → 4 badges → italic 12 px credibility line → 2 CTAs → 2 social icons, separated by `mb-5 / mb-8 / mb-8 / mb-6 / mb-10 / mb-12`.
- **Impact:** on a 13" laptop the CTAs sit near the fold and the first viewport asks the visitor to read ~110 words before the action. The badges repeat what `Skills` says 2 screens later, the offers repeat the `ProfessionalService` catalogue, and `text-xs italic` at 70 % opacity for the credibility line is the least readable text on the page carrying the most persuasive claim (clients/companies).
- **Recommendation:** hero = headline + one-sentence sub + CTA pair + one proof line (companies strip or "5+ years · N shipped apps") in a readable size. Move offers into `About` (where the bio card currently is a wall of three paragraphs) and delete the badges row. Replace the six different margins with two intervals (tight within a group, generous between groups), e.g. `gap-4` inside and `gap-10` between.
- **Suggested command:** `/impeccable distill` on `Hero.tsx`, then `/impeccable layout`.

### [P2] Motion cost: five infinite blur-filtered transforms + scale-on-hover over `backdrop-filter` — Performance / Motion
- **Location:** `Hero.tsx` floating circles (`blur-xl`/`blur-lg`/`blur-md`, animated `x/y` forever, 5–9 s cycles), three static `blur-[120px]/[100px]/[90px]` glows, `GlassCard` `hover:scale-[1.02]` on elements with `backdrop-filter: blur(12px)`, `Projects.tsx` card glow `blur-3xl` toggling opacity on hover. Reveal everywhere is the same `y: 40, 0.6 s, easeOut` with per-item stagger (`0.15 + i*0.1` in About, `i*0.1` in Skills).
- **Impact:** blur filters are repainted every frame while the blob moves; on mid-range Android this is the single biggest drain in the hero and it never ends. Scaling a backdrop-blurred card forces the blur to resample on every hover frame. Reveal with 40 px travel and 0.6 s on every section makes the page feel slower than it is; stagger inconsistencies (0.15 s vs 0.1 s) are noticeable when scrolling quickly.
- **Recommendation:** cut the animated blobs to two, drive them with a CSS `@keyframes` on `transform` only (no framer-motion rerender cost) and mark them `will-change: transform`; replace the card `scale` with a border/shadow transition; standardise reveal to `y: 16–24 px, 0.4–0.45 s, ease-out` and a single stagger value (`0.08 s`). Already-counted in P1: all of this disappears under `prefers-reduced-motion`.
- **Suggested command:** `/impeccable optimize`, then `/impeccable animate`.

### [P2] Touch / pointer targets under 24 × 24 px — Responsive / Accessibility
- **Location:** `Hero.tsx` LinkedIn and mail icons: 22 × 22 px `<a>` with no padding (`gap-5` between them); `Footer.tsx` "Cookie settings | Privacy" `text-xs` links with no vertical padding; `Header.tsx` desktop nav links `text-sm` with no padding (hit area = text height ≈ 20 px). `Contact.tsx` social buttons (`h-10 w-10`) and the language switcher (`px-3 py-1.5`) are fine.
- **Impact:** WCAG 2.5.8 (AA) minimum is 24 × 24 CSS px unless the spacing exception applies; the hero icons at 22 px with 20 px gaps fail it outright, and on mobile the footer links are the first thing a visitor taps to manage consent.
- **Recommendation:** give icon links `p-2.5` (→ 42 px) and nav/footer links `py-2`; keep the visible mark the same size.
- **Suggested command:** `/impeccable adapt`.

### [P2] Theming drift: hard-coded colours and two token syntaxes side by side — Theming
- **Location:** `Contact.tsx` `<option className="bg-[#0F0F1A]">`; `Header.tsx` mobile menu `bg-[rgba(10,10,20,0.92)]`; `GlassCard.tsx` `hover:shadow-[0_0_20px_rgba(108,99,255,0.3)]` although `--color-glow-purple` exists; `.glass` in `globals.css` repeats `rgba(255,255,255,0.05)` instead of `--color-bg-card`; `Hero.tsx`/`CookieConsent.tsx` use Tailwind token classes (`text-text-muted`, `bg-accent-purple/20`) while `About.tsx`/`Skills.tsx`/`Experience.tsx`/`Contact.tsx` use arbitrary values (`text-[var(--color-text-muted)]`).
- **Impact:** a future light theme or the pending redesign cannot be done by changing tokens alone; the two syntaxes make it impossible to grep for every use of a colour. The `green` accent (Subenai brand) exists in `Badge`/`GlassCard` maps but has no glow/shadow entry, so `accent="green"` cards hover differently from the other four.
- **Recommendation:** one syntax (`text-text-muted` style — Tailwind 4 already exposes every `--color-*` from `@theme`), replace the five hard-coded values with tokens, add `--color-glow-green` to the `GlassCard` map.
- **Suggested command:** `/impeccable extract` → `/impeccable document` (write `DESIGN.md` so the Figma "Signal" vs `v2-cinematic` decision has a token baseline to compare against).

### [P2] Self-rated skill percentages read as decorative data — Content / Integrity
- **Location:** `src/components/Skills.tsx` `ProgressBar` + `{skill.level}%` label; values live in `src/data/content.ts`.
- **Impact:** "85 %" of Playwright has no referent; for a QA engineer selling rigour, an unverifiable metric undermines the exact claim the section makes. The animated bar also adds motion for no information gain. Impeccable's integrity check flags this pattern explicitly ("misleading or decorative content").
- **Recommendation:** replace level with something countable per category (years, number of projects, 2–3 named deliverables) or remove the bar and let the tool badges carry the section.
- **Suggested command:** `/impeccable clarify`.

### [P3] Icon family mismatch and focus styling — Polish
- **Location:** `Skills.tsx` uses emoji (`skill.icon`, `text-3xl`) as category icons while every other icon on the page is a 2 px stroke SVG; CTAs and nav links define `hover:` but no `focus-visible:` style (inputs use `focus:` ring, which also fires on mouse click).
- **Impact:** emoji render differently per OS (Apple vs Noto vs Segoe) and are the only element that breaks the otherwise consistent stroke-icon language; keyboard users on the dark background rely on the browser default outline, which varies per browser and is invisible on the purple CTA in Safari.
- **Recommendation:** swap emoji for 24 px stroke SVGs matching the existing set; add a shared `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary` utility and change the form inputs from `focus:` to `focus-visible:`.
- **Suggested command:** `/impeccable polish`.

## What is working

- **A real token layer.** `@theme inline` in `globals.css` defines colours, glows and the font once; most of the page already consumes it. Fixing theming is a cleanup, not a rebuild.
- **Structured, honest content.** Projects are real, dated, with anonymised client work surfaced explicitly; `no-mobix` and `projects-timeline` tests keep the content truthful. The JSON-LD (`Person`, `WebSite`, `ProfessionalService`) is unusually complete for a portfolio.
- **Consent and i18n done properly.** GA4 behind a real consent gate, `document.documentElement.lang` updated on language switch, five locales with a parity test — these are the parts most portfolios get wrong.
- **Mobile projects carousel.** `snap-x snap-mandatory` with hidden scrollbar and `focus-visible` ring on the scroller is a correct, native-feeling pattern.

## Recommended order

1. **[P1] `/impeccable animate`** — reduced-motion branch for Hero, ScrollReveal, ProgressBar, marquee.
2. **[P1] `/impeccable colorize`** — split purple into fill vs text-safe token; fix CTA and placeholder contrast.
3. **[P1] `/impeccable typeset`** — H1 scale/tracking/balance, shorter headline in all 5 locales, quieter section headings.
4. **[P2] `/impeccable distill`** then **`/impeccable layout`** — hero to four groups with a two-step spacing rhythm.
5. **[P2] `/impeccable optimize`** — two CSS-driven blobs, no scale on backdrop-filter cards, one reveal preset.
6. **[P2] `/impeccable adapt`** — 24 px+ targets on hero icons, nav and footer links.
7. **[P2] `/impeccable extract` → `/impeccable document`** — single token syntax, `DESIGN.md` as the baseline for the redesign decision.
8. **[P2] `/impeccable clarify`** — replace skill percentages.
9. **[P3] `/impeccable polish`** — icon family, focus-visible, final pass.

Re-run `/impeccable audit` (with the detector, against the rendered page) after steps 1–3 to confirm the score moves out of the Acceptable band. None of the above should be started before the Figma "Signal" vs `v2-cinematic` decision if that decision replaces the hero wholesale; items 1, 2, 6 and 7 are worth doing on `main` regardless, because they carry over to either redesign.
