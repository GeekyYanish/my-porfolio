# Yanish Rai — Portfolio

A blueprint/schematic-themed personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. The site is designed around the theme **"Trust, Data, Systems"** — every section is drawn like a sheet of an engineering drawing set.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — all design tokens live in `app/globals.css`
- **Framer Motion** — subtle line-drawing and reveal animations only, all gated behind `prefers-reduced-motion`
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

## Editing content

All copy lives in `data/` — you should rarely need to touch components:

| File | Contents |
| --- | --- |
| `data/site.ts` | Name, headlines, links, about copy, education, achievements, identity modules |
| `data/projects.ts` | Featured case studies (with per-project diagram type) and the curated GitHub repo register |
| `data/experience.ts` | Work experience entries and their diagram steps |
| `data/skills.ts` | Skill groups and the projects that evidence them |
| `data/metrics.ts` | Metric callouts with their one-line context |

To change the palette or fonts, edit the `@theme` block in `app/globals.css` and the font imports in `app/layout.tsx`.

## Replacing the resume

The "Download Resume" buttons serve `public/resume.pdf`. To update it, replace that file with your new PDF (keep the filename `resume.pdf`, or update `resumePath` in `data/site.ts`).

## Deploying on Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), import the repository, and accept the detected Next.js defaults.
3. Click **Deploy**. Every push to the main branch redeploys automatically.

### Adding a custom domain

1. In the Vercel dashboard, open the project → **Settings → Domains**.
2. Add your domain (e.g. `yanishrai.dev`).
3. At your domain registrar, either:
   - point the domain's nameservers at Vercel, or
   - add the DNS records Vercel shows you (an `A` record to `76.76.21.21` for the apex, and a `CNAME` to `cname.vercel-dns.com` for `www`).
4. Vercel provisions HTTPS automatically once DNS propagates.

## Structure

```
app/
  layout.tsx        # fonts, SEO/OG metadata
  page.tsx          # one-page assembly of all sections
  globals.css       # blueprint design tokens + utilities
components/         # one component per section + shared primitives
data/               # all editable content
public/resume.pdf   # served by the Download Resume CTA
```
