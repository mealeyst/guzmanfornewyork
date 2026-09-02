# Daniel Guzman for New York

Campaign website for **Daniel Guzman**, candidate for **New York State Assembly, 94th District** (Westchester and Putnam Counties).

## Stack

- **Astro 4** (static site) with the **React** integration for interactive components
- **Tailwind CSS** with a custom brand palette in `tailwind.config.mjs` (`brand.navy`, `brand.red`, `brand.gold`, `brand.light`)
- **TypeScript**
- **Phosphor Icons** for social/issue iconography
- **Partytown** for offloading Google Analytics off the main thread
- **Web3Forms** for contact + volunteer form submissions
- **ActBlue** for donations (linked, not embedded)

## Pages

- `/` — hero, issues preview, quote, CTA
- `/about` — candidate bio
- `/issues` — four-pillar platform (Veterans & Public Safety, Strong Public Schools, Supporting Working Families, Accountable Leadership) — **placeholder copy, needs Daniel's real policy positions**
- `/get-involved` — volunteer form + ActBlue donate section with preset amounts
- `/contact` — contact form

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build         # production build to dist/
npm run preview       # preview the production build
```

Node 20+ recommended.

## Environment variables

Copy `.env.example` to `.env` and fill in:

- `PUBLIC_GA_MEASUREMENT_ID` — Google Analytics measurement ID (`G-XXXXXXXXXX`)
- `PUBLIC_WEB3FORMS_ACCESS_KEY` — Web3Forms access key. **Not yet created** — sign up at [web3forms.com](https://web3forms.com) with the destination inbox for the campaign (e.g. `Guzman4NewYork@gmail.com`) and paste the key here.

These should also be set in **Vercel → Settings → Environment Variables** for the deployed site. `PUBLIC_*` vars are inlined at build time, so changing them in Vercel requires a redeploy with the build cache disabled.

## Deployment

Hosted on **Vercel** via GitHub Actions (`.github/workflows/deploy.yml`), which deploys on every push to `main`. This still needs one-time setup:

1. Install the Vercel CLI and log in: `npm install -g vercel` then `vercel login`
2. From this repo, run `vercel link` to create/link the Vercel project
3. Copy the `orgId`/`projectId` from `.vercel/project.json` into `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` in `.github/workflows/deploy.yml`
4. Add a `VERCEL_TOKEN` secret to this repo: `gh secret set VERCEL_TOKEN`

## Donations

Donate buttons on `/get-involved` link directly to ActBlue (`secure.actblue.com/donate/guzman2026`) with prefilled amounts and unique `refcode` values per button (e.g. `getinvolved_25`, `getinvolved_main`). Refcodes appear in the ActBlue dashboard so we can see which placement is converting.

## Known gaps before launch

- Web3Forms access key not yet created (form fails gracefully with a console error until it's set)
- Vercel project not yet linked (deploy workflow needs `VERCEL_TOKEN` + org/project IDs)
- "Paid for by Guzman 4 New York" disclaimer was sourced from Daniel's existing printed banner — confirm it matches the exact text required on his official NYS/FEC filing
- `/issues` ships with placeholder policy positions — replace with Daniel's real platform
- Instagram handle (`@Guzman4NewYork`) was inferred from the campaign banner graphic — confirm the exact URL

## Project structure

```
src/
  components/    # Nav, Footer, forms, page sections
  layouts/       # BaseLayout (head, nav, footer wrapper)
  pages/         # Astro routes
public/
  images/        # candidate + campaign photos
```
