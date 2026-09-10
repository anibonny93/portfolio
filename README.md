# Aniruddha Chowdhury — engineering portfolio

A complete, backend-free Next.js App Router portfolio with six recruiter-specific tracks. TypeScript, Tailwind CSS, lucide-react and Framer Motion. All routes are statically exported.

## Run locally

Use Node.js 24 LTS and pnpm 11.19.0 (the lockfile is included).

```sh
corepack enable
corepack prepare pnpm@11.19.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Open the localhost URL printed by Next.js. For production:

```sh
pnpm typecheck
pnpm build
```

The deployable website is `out/`. `next start` does not serve static exports: preview with `pnpm dlx serve out`. Separate `.next-dev/` and `.next/` directories prevent preview/build collisions.

## Files and content editing

```text
app/
  page.tsx                 Homepage and hiring selector
  tracks/[slug]/page.tsx   One reusable template for all six role tracks
  about/page.tsx           Narrative, education and timeline
  projects/                Filtered catalog and five project detail routes
  publications/page.tsx    Topic filter, citations and peer review service
  contact/page.tsx         Direct links and email draft form
  layout.tsx               Shared shell, theme script and Person JSON-LD
  globals.css              Design tokens, responsive and print styles
  sitemap.ts, robots.ts    Static SEO endpoints
components/                Shared navigation, motion, filters and calls to action
data/portfolio.ts          ALL personal/career/project/publication content
lib/site.ts                Base-path-aware assets and SEO metadata helper
public/headshot.svg        Visible monogram placeholder
public/resumes/            Seven working placeholder PDFs
.github/workflows/         GitHub Pages build and deployment
```

**Edit `data/portfolio.ts` first.** Inline comments identify the fields to change:

- `profile.email`, `phone`, `linkedin`, `github`, `scholar`: replace empty strings. Blank fields show placeholders; they never link to fake accounts. Adding email activates the form.
- `profile.headshot`: put a real photo at `public/headshot.jpg` and change this value to `/headshot.jpg`. Set `profile.headshotAlt` to an accurate description. Use an optimized portrait around 600 × 720 pixels; keep the asset under about 150 KB when practical.
- Replace `public/resumes/general.pdf`, `hvac.pdf`, `mechanical-design.pdf`, `advanced-materials.pdf`, `pavement.pdf`, `simulation.pdf`, and `process-management.pdf`. Keep filenames, or update `profile.resume` and the matching `tracks[].resume`. Set `profile.resumeIsPlaceholder` to `false` after replacing all seven.
- `experiences`: one record per role or research experience; `variants` contains track-specific achievement bullets. `tracks[].experienceIds` chooses records without duplicating components.
- `tracks`: headlines, summaries, relevant skills/tools, education references and resume paths. Skill levels are evidence categories (Applied, Research, Developing), not numeric scores or licenses. Review these editorial labels before publishing.
- `projects`: problem, approach, tools, outcome and track tags. Changing IDs changes URLs.
- `publications`: add verified journal and conference citations using the commented example. Supply the DOI identifier only (`10.xxxx/...`); the interface creates `https://doi.org/` links. Topics automatically extend the filter. `trackIds` controls track-page relevance. No titles, authors, DOIs, dates or unprovided metrics were invented.
- `profile.bio`, `timeline`, `education`, `reviewService`: add exact institutions, employment/degree dates and verified details where marked. The LADOTD entries intentionally avoid fabricated duties and achievements. Semiconductor content explicitly describes transferable materials experience.
- `profile.siteUrl`: production origin plus optional repository subpath. `NEXT_PUBLIC_SITE_URL` overrides it at build time. Never add a trailing slash.

All career content is in this data file; components contain reusable interface labels. Assets are separate binary files by design.

## Vercel

1. Push the contents of this project directory to your GitHub repository, including `pnpm-lock.yaml`.
2. Import the repository into Vercel. If nested, set Root Directory to this project directory.
3. Select Next.js, Node.js 24, install command `pnpm install --frozen-lockfile`, build command `pnpm build`, and output directory `out`.
4. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.example`. Leave `NEXT_PUBLIC_BASE_PATH` empty for a root-domain deployment.
5. Deploy. Open a track and project URL directly to verify navigation and refresh behavior. Redeploy after content or environment changes.

No functions, API keys, database or server runtime are needed. A separately provided private Sites preview is optional and does not affect Vercel or GitHub Pages deployment. `.openai/hosting.json` is metadata for that preview and can be omitted from your independent repository.

## GitHub Pages

1. Push this project as the repository root on branch `main`.
2. In repository Settings → Pages, choose **GitHub Actions** as the source.
3. Run the included **Deploy portfolio to GitHub Pages** workflow (or push to main).
4. The workflow derives the correct origin and repository base path using `configure-pages`. It builds and uploads `out/` using the Pages artifact action, so Jekyll cannot strip `_next/` assets.
5. For a custom domain, configure it in Pages first and rerun the workflow. Its derived base path will match the Pages configuration.

For a manual repository-subpath build, set `NEXT_PUBLIC_BASE_PATH=/repository-name` and `NEXT_PUBLIC_SITE_URL=https://username.github.io/repository-name` before `pnpm build`. For an account site (`username.github.io` repository), leave the base path empty. Framework links and public assets both honor the prefix. Do not set a `/repository-name` prefix for a root-domain Vercel deployment.

## Behavior and accessibility

- Resume downloads use the current track or the last track visited in this browser tab; a new tab defaults to the general PDF. Nothing is sent to a backend.
- Theme defaults to the OS setting, follows OS changes unless overridden, and saves explicit toggles locally. Storage failures fall back safely.
- Native details navigation is keyboard accessible, supports Escape, and closes on outside clicks. The mobile drawer traps focus, supports Escape and restores focus to its trigger.
- Motion respects reduced-motion preferences. Essential content is server-rendered and visible without waiting for scroll animations.
- Semantic headings, skip link, visible focus rings, input labels and textual skill indicators are included. Font stacks use local Georgia and Segoe UI/Arial; no web-font request is needed.
- The contact form creates a `mailto:` draft. It does **not** send or store messages. The visitor must review and send in their email app. Direct email remains available if draft handling fails.
- Track print styles target one US Letter page for the supplied content. Added bullets, larger printer scaling or publications can increase page count; verify print preview after substantial edits.
- `next/image` supplies dimensions and lazy loading; static export uses `unoptimized: true` because no image optimization server exists. Precompress real photos yourself. The hero image has priority; the About photo uses default lazy loading.

## Validation and launch checks

The production build performs TypeScript validation and generates all track/project pages. `scripts/verify-export.py` uses Python 3 standard libraries to check exported internal links, assets, unique page titles, description/canonical metadata and one H1 per page:

```sh
python scripts/verify-export.py
```

For a prefixed build, pass the prefix as its argument: `python scripts/verify-export.py /repository-name`.

Lighthouse 95+ is a performance target, not a measured guarantee. Run Lighthouse against your production deployment after adding the real photo and PDFs, and check mobile keyboard navigation, dark mode, filters, resume selection and print preview. Browser-based Lighthouse and interaction testing have not been performed in this delivery. Remaining content placeholders need your input before recruiter-facing launch.

SEO includes per-route titles/descriptions/canonicals, Open Graph text metadata, Twitter summary metadata, Person JSON-LD, sitemap and robots.txt. Set the real production URL before publishing. No social image was generated; add one through metadata if desired.
