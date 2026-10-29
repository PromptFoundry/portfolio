# Embedded project apps (Savora, Orka, Arcis, …)

## How sub-apps get into the site
- Each prototype lives in a **sibling folder** of `site/` with the same name as its output
  (`../savora` → `public/projects/savora`). `npm run build:projects` loops over them and
  runs `vite build --base /projects/<name>/`. Orka's own `vite.config.ts` also builds straight
  into `../site/public/projects/orka`.
- In dev, a plugin in `vite.config.js` falls back to each project's `index.html` for
  `/projects/<name>/*`. In prod, `vercel.json` rewrites do the same.
- Savora's backend exists **twice**: as middleware in `../savora/vite.config.ts` (dev) and as
  Vercel functions in `site/api/` (prod). Prompt/model changes must be made in both.
- The site's dev server runs `site/api/*.js` locally via the `devApiRoutes` plugin in
  `vite.config.js` (small Vercel req/res adapter). Keys are read at dev time from
  `../savora/.env` (OPENAI_API_KEY, PEXELS_API_KEY), never copied into the site. Unknown
  `/api/*` paths 404 like on Vercel. `.env*` is gitignored in the site.
- `../savora` is **not a git repo**. Its `.env` (OpenAI, Pexels) and a 365 MB PSD live there —
  ignore both if it's ever put under version control.

## Tooling gotcha
- Vite 8 needs Node ≥ 22. The default `node` on this Mac is 20.11; use
  `~/.nvm/versions/node/v22.23.3/bin` (or `nvm use 22`). `.claude/launch.json` already does.

## Savora design system (decided 2026-10-29)
- Source of truth: `src/design/tokens.ts` + `tailwind.config.js` — warm-white/parchment
  surfaces, ink text ramp, **crimson `#af2c38`** accent (now a Tailwind color too, with
  `-light` / `-deep`). Type roles: Cormorant Garamond = `font-display` (headlines),
  Playfair = `font-serif` (wordmark, typed prompt, recipe titles), Inter = `font-sans`.
- The Prompt / Generating / Recipe screens used to carry an off-system slate-blue inline palette
  and Open Sans. They were moved onto the tokens; **don't reintroduce inline hex colors there.**
- Shared chrome: `src/components/ui/AppHeader.tsx` (wordmark bar, left/center/right slots,
  `fixed` mode, `HEADER_HEIGHT`). Shared text/button recipes: `src/design/styles.ts`
  (`eyebrow`, `textLink`, `primaryButton`). New screens should use these, not restyle by hand.
- Headlines are live text (`clamp()` sizes), not baked SVGs. The lottie cook stays.
- Only the `step_flow` recipe layout is ever selected (`selectLayout` in `uiEngine.ts`);
  EditorialSplit/Magazine/Minimal/Infographic are unreachable and were left untouched.
- Long-list rules (decided 2026-10-29): ingredients go two-column (filled down each column)
  above 8 items where the panel is ≥900px wide, scroll with fade edges if still too tall, and can
  be ticked off. Instructions never shrink below 16px; long steps scroll with fade edges.
  Constraints keeps Generate in a sticky bar with "N set · Clear all".
- The StepFlow card height is capped to the viewport (`CARD_VERTICAL_CHROME`, min 520px) so short
  laptop screens don't clip the CTA.
- Saved recipes persist in localStorage (`savora-cookbook`, zustand `persist`, savedRecipes only).
  StepFlow writes the resolved overview photo onto the recipe so cookbook cards have an image.
