# Yanish Rai — Portfolio

A cinematic, comic-book-inspired personal portfolio built with Next.js, TypeScript, Tailwind CSS,
and Framer Motion. The theme — **"Night Shift"** — is a web-slinger's city at night: procedural
skylines, halftone comic panels, spider-web motifs, and red/cyan glow over a deep navy ground.

All artwork is original generated vector art. There are no Marvel logos, movie stills, or other
licensed assets anywhere in the project, and no raster images at all.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — all design tokens live in `app/globals.css`; there is no `tailwind.config`
- **Framer Motion** — every animation gated behind `prefers-reduced-motion`
- **Lenis** — momentum scrolling, on desktop only and switchable off
- **lucide-react** — icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build:

```bash
npm run build
npm start
```

## Sections

Hero → Origin (about) → Skills → Projects → Experience & Education → Contact → Footer.

A few pieces worth knowing about:

- **Skill web** — a spider web that is also a radar chart. Each group sits on a spoke at a radius
  set by its `level`, so the shape of the outline *is* the proficiency profile.
- **Projects** — filterable comic panels, each with bespoke generated artwork. Case studies open in
  a reader that turns like a comic page.
- **Timeline** — work, degrees, and milestones hanging off one web strand.
- **Contact** — validates in the browser, plays a web-shoot, then hands off to your mail client.

## Editing content

All copy lives in `data/` — you should rarely need to touch components:

| File | Contents |
| --- | --- |
| `data/site.ts` | Name, profession, headlines, links, about copy, origin beats, education, achievements, identity modules |
| `data/projects.ts` | Case studies, the GitHub register, and the merged `projectEntries` the grid renders |
| `data/experience.ts` | Work experience, and the merged `timeline` of work / study / milestones |
| `data/skills.ts` | Skill groups, proficiency levels, evidence, and related-skill links |

To change the palette or fonts, edit the `@theme` block in `app/globals.css` and the font imports in
`app/layout.tsx`.

### Proficiency levels

`level` in `data/skills.ts` is editorial — derived from how much shipped work backs each group,
not from anything measured. Adjust freely; it only affects how far each node sits from the centre
of the skill web.

## Accessibility and motion

- Every animation respects `prefers-reduced-motion`, and reduced-motion users get the finished state
  rather than nothing.
- The footer carries a **Motion: On/Off** toggle for anyone who wants the page still without setting
  an OS preference. It also restores the native cursor.
- Desktop-only effects (custom cursor, card tilt, magnetic buttons, drifting motes) are gated on a
  fine pointer, so touch devices get a simpler, cheaper experience automatically.
- Full keyboard support: skip link, visible focus rings, and a native `<dialog>` for the case-study
  reader so focus is trapped and restored correctly.

Lighthouse on the production build: **Performance 94 · Accessibility 100 · Best Practices 96 ·
SEO 100.**

## Replacing the resume

The "Download Résumé" buttons serve `public/resume.pdf`. To update it, replace that file (keep the
filename, or update `resumePath` in `data/site.ts`).

## Adding a photo

There's no headshot in the repo, so the About section renders a generated monogram crest instead of
a placeholder. To use a real photo, drop an `<image>` into the clipped group in
`components/ProfileCrest.tsx` — the hexagonal frame and webbing carry over unchanged.

## Deploying on Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository, and accept the detected
   Next.js defaults.
3. Click **Deploy**. Every push to the main branch redeploys automatically.

Set `metadataBase` in `app/layout.tsx` to your real domain so Open Graph URLs resolve correctly.

### Adding a custom domain

1. In the Vercel dashboard, open the project → **Settings → Domains**.
2. Add your domain (e.g. `yanishrai.dev`).
3. At your registrar, either point the nameservers at Vercel, or add the DNS records Vercel shows
   you (an `A` record to `76.76.21.21` for the apex, and a `CNAME` to `cname.vercel-dns.com` for
   `www`).
4. Vercel provisions HTTPS automatically once DNS propagates.

## Structure

```
app/
  layout.tsx           # fonts, SEO/OG metadata, analytics
  page.tsx             # one-page assembly of all sections
  globals.css          # design tokens + comic utilities
  icon.tsx             # favicon, generated at build time
  opengraph-image.tsx  # social card, generated at build time
components/
  art/                 # original generated artwork (skyline, web, slinger, panels)
  motion.ts            # shared motion primitives + the reduced-motion gate
  ...                  # one component per section + shared primitives
data/                  # all editable content
public/resume.pdf      # served by the Download Résumé CTA
```
