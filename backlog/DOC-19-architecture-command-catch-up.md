# DOC-19 — Architecture: catch up with the current command names

- Status: In progress
- Assignee: Claude
- Site: `architecture`
- Page: revisions to `overview.html`, `storage-layout.html`, `publishing-model.html`, `previews.html`, `trust-model.html` and `search.html` in `ja/` and `en/`, and `assets/site.js`
- Audience: Readers who want to understand how it works and why
- Depends on: none (follow-up of [DOC-18](DOC-18-guide-release-catch-up.md), which did the same for the `guide` site)

The `architecture` site still uses command names and control keys from before the split release. Facts: product [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) §22 (command tree), the registry and withdrawal semantics, "Concurrent site sync and registry cleanup", and the preview sections; decision [TD16](https://github.com/artifact-pages/artifact-pages/blob/main/docs/backlog/technical-design/TD16-cli-sync-and-removal.md).

## Stale content to revise

- Command names: `site publish` → `site sync`; `registry register` → `registry sync`. They appear in headings, diagram text and aria-labels, captions, meta descriptions, example output and the page list in `assets/site.js`.
- `registry unregister` does not exist. Withdrawal is "remove the site from `sites` and run `registry sync`", with the cleanup intent journaled in `_control/registry-cleanup.json` so a later `registry sync` can finish. `publishing-model.html` has a whole section and diagram ("Concurrent publish and unregister") to rewrite: `registry sync` takes the locks of omitted sites before it changes the registry, then deletes the projection. Also in `overview`, `previews`, `trust-model` and `storage-layout`.
- Control keys: the per-site lock and cache retry record now live at `/_control/sites/<site>/lock.json` and `/_control/sites/<site>/site-cache.json` (not `/_control/locks/sites/<site>.json` and `/_control/site-cache/<site>.json`); the lock is also shared by `preview remove`.
- `trust-model.html` satellite credential list: add the read of the deployed-web record `/_control/versions/app.json` (specification, AWS satellite policy).
- `trust-model.html` satellite credentials: preview prefix includes delete (`preview remove`), and the whole control prefix `_control/sites/<site>/` is read, write, delete and list (specification AWS satellite policy; `terraform/modules/aws`).
- The per-site lock is also shared by `app deploy` when it checks formats (bundle with `reads` or a pinned config).
- Guide residuals folded in: `guide/{en,ja}/publishing.html` and `configuration.html` cited `_control/site-cache/<site>.json` and the old satellite credential list; aligned with the above.
- `previews.html`: mention `preview remove` (CLI only), which the page did not cover.

## Acceptance criteria

- [ ] No page in `ja` or `en` uses `site publish`, `registry register`, `registry unregister` or `tasuku43` URLs.
- [ ] Every statement matches the specification (§22, registry withdrawal, concurrent sync and cleanup, control keys).
- [ ] Diagrams still fit their labels and hold up in light and dark themes and at about 400px width without page-level horizontal scrolling.
- [ ] The owner reviewed and approved the pages.
