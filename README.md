# 0xCAFE

Landing page and archive for **0xCAFE**, a tech and science newsletter. Built
with a terminal-inspired aesthetic: typewriter hero, blinking cursors,
syntax-highlighted snippets, and a Mailchimp-backed signup flow.

Live at: https://vaspoz.github.io (also historically at https://0xcafe.news).

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, static export)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 + PostCSS
- **Animation:** Framer Motion
- **Email capture:** `react-mailchimp-subscribe`
- **Hosting:** GitHub Pages, deployed from the `source` branch via GitHub Actions
- **Node:** >= 18

## Project layout

```
src/
  app/                  Next.js App Router entrypoints
    page.tsx            Landing page
    layout.tsx          Root layout, analytics, metadata
    archive/            Newsletter archive index + [slug] detail pages
    privacy/            Privacy policy
  components/
    sections/           Hero, Features, Quote, Testimonials, Footer
    terminal/           TypeWriter, BlinkingCursor, TerminalWindow,
                        TerminalPrompt, SyntaxHighlight
    forms/              Mailchimp signup form
  lib/                  Site config, constants, helpers
  types/                Ambient TypeScript declarations
scripts/
  fetch-archive-data.js     Pulls past newsletter issues at build time
  fetch-feature-examples.js Pulls feature example data
public/                 Static assets
```

## Local development

```bash
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

To produce a production build (which also pre-fetches archive data and feature
examples):

```bash
npm run build
npm start
```

Individual data-fetch scripts are also exposed:

```bash
npm run fetch-archive    # newsletter issue list
npm run fetch-examples   # feature examples
npm run fetch-data       # both
```

## Configuration

Site-wide constants — title, tagline, social links, analytics IDs, Mailchimp
endpoint, contact email — live in `src/lib/constants.ts`. Analytics and
third-party identifiers checked into this repository are placeholders; the
production values are injected at deploy time.

## Deployment

`source` is the working branch. Pushes trigger a GitHub Actions workflow under
`.github/workflows/` that builds the Next.js static export and publishes it to
GitHub Pages, served at [vaspoz.github.io](https://vaspoz.github.io). The
custom domain `0xcafe.news` is configured via the standard GitHub Pages
`CNAME` mechanism when active.

## Sections of the site

- **Hero** — animated terminal prompt with the project tagline.
- **Features** — what subscribers get, presented as terminal output blocks.
- **Quote / Testimonials** — social proof.
- **Signup** — Mailchimp subscribe form, validated client-side.
- **Archive** — list of past issues, individual issue pages at `/archive/[slug]`.
- **Privacy** — privacy policy and data handling notes.
- **Footer** — social links and credits.

## Credits

Designed and built by Basil Pozdeev. The terminal primitives are bespoke; all
other dependencies are listed in `package.json`.

## License

No license file is published; all rights reserved by the author. Open an issue
if you would like to reuse a component.
