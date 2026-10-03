# DOC-04 — Guide: publishing

- Status: In progress
- Site: `guide`
- Page: `ja/publishing.html`, `en/publishing.html`
- Audience: Teams publishing from their own repositories
- Depends on: DOC-03

## Purpose

Explain how a team publishes its site: choosing a publishable directory, `site publish` with explicit `--site` and `--source`, running it from CI, and PR previews.

## Scope

- What belongs in `sourcePath` (ready-to-serve HTML/Markdown and resources; no build step).
- Dry-run then publish; what is created, updated, and removed; eligibility checks against the registry.
- Running the same command in CI on merge; optional GitHub Actions only once released.
- PR previews at the level a publisher needs.

## Out of scope

- Internals of reconciliation and locking (DOC-10) and preview storage (DOC-11).

## Primary sources

- [Specification §5 Publishable source directory, §6, §9, §12, §19 preview contract, §22](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/specification.md)
- [GitHub Actions](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/guides/github-actions.md), [Local preview development](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/guides/local-preview-development.md)

## Acceptance criteria

- [x] `ja/publishing.html` and `en/publishing.html` exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [x] Every command, flag, path, and behavior matches the linked primary sources and current CLI help.
- [x] Renders correctly in light and dark themes (including inside the reader app) and at ~400px width without horizontal scrolling.
- [x] Published locally with `site publish --dry-run` then `site publish`, and opened in the local reader.
- [ ] The owner reviewed and approved the page.

## Notes

- Actions are optional and not yet released; confirm with the owner how much to show.

## Dependency on the release shape

This page refers to how components are obtained and pinned. Draft it after the release-shape decision recorded in [DOC-03](DOC-03-guide-getting-started.md#blocker-2026-10-01).

## Draft (2026-10-02, awaiting owner review)

Sections: what to publish (file → URL mapping, page vs resource rules, titles, Git dates, symlinks, "every file is readable"), `site publish` (dry-run/publish, four-step flow, options table, output and exit codes), page text search (`--fulltext` on every publish, what is indexed and how to exclude text), when readers see changes (order, 60 s / 300 s cache bounds, reload, retry), CI (dry-run on PRs, publish after merge, scoped credentials, remote config), previews (`preview publish`, selection, `/_previews/` URLs, View previews / Open previews, PR grouping, no forks, retention, trust), and a troubleshooting table. Pager: Reading ← → Configuration.

Sources checked: spec §5 (publishable source directory, publish order, invalidation), §11, §16, §19 preview contract and CLI interface, §22; `artifact-pages site publish --help`, `preview publish --help`; `docs/architecture/fulltext-search.md`; `docs/guides/local-registered-sites.md` (text output, 12-path groups); `cli/internal/publisher/site_publish.go` (symlink rejection for every target, `.git` skipped, repository/sourcePath check).

### Parts that depend on the release decision (DOC-03)

- How to obtain the CLI: the NOTE callout says it will be covered in Getting started (not yet published) and does not link it. Add the link when DOC-03 exists.
- GitHub Actions: the CI section only says an optional Action exists and that pinning depends on the first release; no workflow is shown. Add a pinned workflow example once a release ref exists. (The site Action currently has no `fulltext` input.)
- Everything else (commands, flags, behavior) is release-independent.

Checked with Playwright (`guide-check.mjs`): all five guide pages in ja/en, light/dark, 400 px and 1280 px have no page-level horizontal overflow and no page or console errors; tables, code, and SVG figures scroll inside their frames. All in-site links return 200; anchors used by cross-links exist. In the reader, in-site links and the pager route to logical `/guide/...` URLs, `target="_top"` architecture links replace the app (no nested app), and page text search for `retention` finds the new Configuration and Publishing pages. `npm run assets:check` passes; published with `site publish --site guide --config artifact-pages.yaml --fulltext` (dry-run first).

## Review fixes (2026-10-02, awaiting owner review)

- CI credentials now list everything a publishing job touches: read the site registry; read and write this site's files, previews, lock, and cache-retry record `_control/site-cache/<site>.json` (key verified in `cli/internal/publisher/site_cache.go`; spec §5; T15 scoped-credential note); and request a CDN cache refresh.
- ja: 索引 → インデックス; callout labels localized (NOTE → 注意, CHECK → 確認, alongside 毎回); half-width spaces removed from aria-labels and the mapping header.
- Checked with Playwright (`guidefix/check.mjs`): all five guide pages in ja/en, light/dark, 400 px and 1280 px have no page-level horizontal overflow and no page or console errors; all 50 distinct links return 200, anchors exist, and every root-absolute cross-site link uses `target="_top"` and resolves to a published architecture page. `npm run assets:sync` and `npm run assets:check` pass; published with `site publish --site guide --config artifact-pages.yaml --fulltext` (dry-run first).

## Second review fixes (2026-10-03, awaiting owner review)

- Release wording (owner direction): one sentence says the `artifact-pages` CLI is distributed through GitHub Releases (single link); the GitHub Actions bullet only says an optional Action wraps the command. No install command, pin format, or "not released" caveat. Release details are expected to change; the "Parts that depend on the release decision" above are superseded by this.
- Dates: a file changed or added in the working tree uses its modification time when newer than its commit date; Git-ignored files take the newest modification time among files in the page's directory and its subdirectories (`latestArtifactFileModTime`) and show no committer (checked in `cli/internal/indexer/build.go`).
- Verification (second round): `npm run assets:sync` and `npm run assets:check` pass; CLI rebuilt; `site publish --site guide|architecture --config artifact-pages.yaml --fulltext` dry-run then publish, and a dry-run right after each publish reports `+ 0 create ~ 0 update - 0 remove` (no search-blob churn). Playwright (`r2/check.mjs`, served from `.local/public-site/storage` by a throwaway static server because the local nginx container on :4179 was returning 500 with a Docker I/O error): all 22 pages, ja/en, light/dark, 400/1280 px (88 runs): no page-level overflow, one H1, no heading-level skips, no duplicate ids, no SVG text outside its viewBox, every scrollable figure frame focusable, no console or page errors; all 91 distinct same-origin links return 200, anchors exist, cross-site links use `target="_top"`. The overview's reader-demo title is now a styled `div` instead of an H3 (it caused an H1→H3 skip). Scene-3 animation re-sampled (`r2/anim.mjs`): order checkout→sre→billing, publishes out of sync with ≥1.7 s between starts, no flicker returning from scene 4, staggered entry from scene 2, reduced motion static.

## CI workflow example (2026-10-03, awaiting review)

- New "With GitHub Actions" subsection (`#github-actions`) in the CI section: a workflow for the illustrative `acme/checkout` that plans on pull requests and publishes after merge to `main`, a trimmed generic version of this repository's `.github/workflows/publish.yml` publish step. Root Action `tasuku43/git-artifact-pages@vX.Y.Z` with `site`, `source`, `config` (pinned `github://acme/platform-admin/artifact-pages.yaml?ref=<full commit SHA>`), `fulltext: true`, `dry-run: ${{ github.event_name == 'pull_request' }}`; `plan` / `production` environments (illustrative) for read-only vs site-scoped credentials; `concurrency` so publishes queue for the site lock; `actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1` (SHA checked with `gh api repos/actions/checkout/git/ref/tags/v7.0.1`) with `fetch-depth: 0` and `persist-credentials: false`; Cloudflare default secret names `CF_R2_ACCESS_KEY_ID`, `CF_R2_SECRET_ACCESS_KEY`, `CF_API_TOKEN`.
- Notes: exact release tag (one GitHub Releases link), no moving tag during `0.x`, hardened full-SHA form with `# vX.Y.Z`; `fulltext` defaults to `false` and omitting it withdraws search data; AWS uses OIDC (`id-token: write`); `github-token` for a private admin repository; outputs `outcome` (`planned`/`published`/`no-op`/`failed`), `changes_json`, `result_json`; companion Actions `actions/admin`, `actions/preview-preflight`, `actions/preview-publish` at the same tag.
- Removed the stale "optional Action that wraps this command" bullet; the prerequisite callout now links Getting started (`getting-started.html#install`) instead of GitHub Releases. The release-dependent notes above are superseded.
- Sources: root `action.yml` and `actions/*/action.yml` (inputs, `fulltext` default `"false"`, outputs), `actions/shared/invoke-cli.mjs` (`true`/`false` boolean inputs), spec §22, TD4, `docs/guides/github-actions.md`.
- Verified with the DOC-03 run (48 Playwright runs, links and anchors, reader). The example workflow itself was not run on GitHub.

## Review fixes for the workflow example (2026-10-03, awaiting owner review)

- L4: "One publish at a time": the `concurrency` group runs one publish at a time (a newer push replaces a waiting one).
- L5: pull requests from forks get no secrets, so the plan fails there by design.
- L6: ja workflow YAML comments translated.
- L7: copy-button wrapping at 400 px fixed in the shared CSS (see DOC-03).
- Verified with the same Playwright pass as DOC-03 (no problems).
