# DOC-01 — Move to the `guide` site structure

- Status: Done
- Site: `guide`
- Depends on: —

## Purpose

Replace the current top-level `en` and `ja` sites with one `guide` site that holds both languages, following [`AGENTS.md`](../AGENTS.md), and give each documentation site its own `assets/` for CSS and JavaScript.

## Scope

- Move `sites/{ja,en}/` to `sites/guide/{ja,en}/` with `git mv`, and use one `sites/guide/assets/`. Pages reference it as `../assets/…`; language-switch links stay relative.
- Each site keeps its own `site.css` and `site.js` in its `assets/`, edited directly; there is no shared source, copy script, or consistency check, and sites may look different.
- In `artifact-pages.yaml`, replace the `en` and `ja` registrations with `guide` (name and description from the [track README](README.md)); run `registry register` and `site publish --site guide` locally.
- Update `AGENTS.md`: record the site lineup, mark the migration done, and describe the per-site assets rule.
- Update the Storybook docs-site stories to the new paths.

## Out of scope

- Content changes to the overview page (DOC-02).
- Creating the `architecture` site (DOC-08).

## Acceptance criteria

- [x] `sites/guide/{ja,en,assets}` exists; the top-level `ja` and `en` directories are gone.
- [x] `sites/guide/assets/` holds the site's own `site.css` and `site.js`, and the pages reference them as `../assets/…`.
- [x] Locally, `/guide/ja/what-is-git-artifact-pages.html` and `/guide/en/what-is-git-artifact-pages.html` open in the reader, their language switches work in both directions, and `/ja/…` and `/en/…` are no longer registered.
- [x] Storybook docs-site stories load from the new paths.
- [x] The owner reviewed and approved the change.

## Verification (2026-09-30)

- `npm run test:docs-assets`: 3/3 pass, including a site copy edited in place being reported.
- `registry register` removed the local `en`/`ja` registrations and content and created `guide`; `site publish --site guide` uploaded 6 files. `/_artifacts/ja/…` now returns 404.
- In the local reader (dark theme), `/guide/ja/what-is-git-artifact-pages.html` rendered with the shared CSS; its language link moved the app to `/guide/en/what-is-git-artifact-pages.html`; the hero demo lists `Guide` and `SRE` on `@`.
- Storybook `Docs site/Guide` Page story loads `/docs-sites/guide/ja/…` with styles applied.
- The owner approved the change on 2026-09-30.

## Notes

- Unregistering `en` and `ja` deletes their published content from the local target. There is no public deployment of these sites yet, so no redirects are needed.
