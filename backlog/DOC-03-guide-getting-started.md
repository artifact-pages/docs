# DOC-03 — Guide: getting started

- Status: In progress
- Site: `guide`
- Page: `ja/getting-started.html`, `en/getting-started.html`
- Audience: Admins setting up a deployment for the first time
- Depends on: DOC-02

## Purpose

Take an admin from nothing to a first readable site: choose a delivery target, deploy the app, register sites, publish once, and open it.

## Scope

- Prerequisites and the admin repository's role.
- A local-first path (provider `local`) that can be tried without a cloud account, then where the cloud paths diverge.
- `app deploy`, `registry register`, first `site publish`, and how to confirm the result in the reader.

## Out of scope

- Provider-specific account setup beyond pointing to DOC-06 and the operator guides.

## Primary sources

- [Specification §11 Registry, §13 Local reference, §22](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/specification.md)
- [Clean-room adoption](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/guides/clean-room-adoption.md), [Local registered sites](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/guides/local-registered-sites.md), [App bundle deployment](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/guides/app-bundle-deployment.md)

## Acceptance criteria

- [x] `ja/getting-started.html` and `en/getting-started.html` exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [x] Every command, flag, path, and behavior matches the linked primary sources and current CLI help.
- [x] Renders correctly in light and dark themes (including inside the reader app) and at ~400px width without horizontal scrolling.
- [x] Published locally with `site publish --dry-run` then `site publish`, and opened in the local reader.
- [ ] The owner reviewed and approved the page.

## Notes

- Decide with the owner whether the local path or a cloud path is the primary walkthrough.

## Blocker (2026-10-01)

No public release exists yet (no tags or GitHub releases), so an external reader cannot follow `app deploy --version` or a pinned CLI install. Resume after the owner decides the minimal release shape: how the CLI is obtained (commit-pinned `go install github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages@<sha>` or binaries) and whether a `v0.x` web bundle is published as a GitHub pre-release. Release-independent pages (DOC-05, DOC-07, DOC-08–12) proceed first.

### Update (2026-10-03)

Owner direction: the documentation is written as if releases are published. Pages use the placeholder version `x.y.z` and point to [GitHub Releases](https://github.com/tasuku43/git-artifact-pages/releases) once, without hard-coded versions, install commands for the CLI, or Action pin formats. Release details are expected to change while the owner finalizes the release setup, so release-dependent wording is kept to the overview step 01 note and one sentence each on Publishing and Configuration.

This page stays blocked only because a step-by-step walkthrough needs details that are still undecided: how the CLI is installed (binary assets, `go install`, or another channel) and how the optional Action is referenced. The web bundle side exists (`v0.1.0` pre-release, [release readiness](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/backlog/release-readiness.md)). Resume when the owner settles those two points.

### Blocker resolved (2026-10-03)

Owner decisions: install the CLI with mise's Go backend first (`go install …@vX.Y.Z` as the alternative; Homebrew only as planned; no standalone binary); releases are written as published, with `x.y.z` / `vX.Y.Z` and one link to GitHub Releases, no Marketplace link; Actions are referenced by exact release tag (`@vX.Y.Z`), hardened form full commit SHA with a `# vX.Y.Z` comment, no moving major tag during `0.x` (TD4); `app deploy` installs the app of the CLI's own version (no `--version`).

## Draft (2026-10-03, awaiting review)

Sections: Install the CLI (mise recommended, `go install` alternative, `artifact-pages version`, one-version callout), Two kinds of repository (admin / team panes), Try it on your machine (provider `local`, one repository in both roles: prepare a repository, write `artifact-pages.yaml`, `app deploy`, `registry register`, `site publish --fulltext`, open with `python3 -m http.server`), Moving to a real delivery target, Where to next (Reading, Publishing, Configuration, Access and trust). Primary walkthrough is the local path (resolves the Notes question; cloud set-up points to Configuration and Publishing).

Reading order: overview → **getting started** → reading → publishing → configuration → access and trust. It follows the overview because a reader who has seen "How it works" can now install and try it; it precedes Reading because the try-out ends in the reader app, which Reading then explains. Overview pager and "Where to next" cards (now six: Getting started, Reading, Publishing, Configuration, Access and trust, Architecture), overview step 01 note, Configuration's closing note, Publishing's prerequisite callout, Reading's pager and the shared `site.js` `GUIDE_PAGES` were updated.

Install wording (en): `mise use -g go:github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages@x.y.z`; "Write the version without a leading `v` (`x.y.z`), as `mise ls-remote …` lists it"; "It needs Go 1.26 or later. If you don't have Go yet, add `go@1.26` to the same `mise use` command"; alternative `go install github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages@vX.Y.Z`.

Sources checked:
- mise Go backend docs, https://mise.jdx.dev/dev-tools/backends/go.html (fetched 2026-10-03): the backend runs `go install` on the executable's import path (may include `/cmd/TOOL`); `mise use go@1.26 go:<module>` installs Go and the tool, `-g` for global config; `mise use go:<module>@VERSION` with VERSION from `mise ls-remote`. mise source `src/backend/go.rs` (main): listed versions have the `v` stripped, and a bare semver gets `v` prepended for `go install` (`go_install_versions`).
- Run in isolated mise/Go dirs under the tmp directory (mise 2026.9.1): `mise ls-remote go:github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages` lists `0.1.0` (two newer releases hidden by mise's `minimum_release_age`); `mise use go@1.26 go:github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages@0.1.2` installed Go 1.26.8 and the CLI, recorded `"0.1.2"` in `mise.toml`; `artifact-pages version` → `artifact-pages 0.1.2`, Module `v0.1.2`, `Web app v0.1.2 (pinned; deployed by app deploy)`.
- Product: spec §11, §13, §22; TD2 (no standalone binary, `go 1.26.0` floor with `toolchain go1.26.7`); TD4; `docs/guides/app-bundle-deployment.md`, `clean-room-adoption.md`, `local-registered-sites.md`; `app deploy|registry register|site publish|version --help` (CLI built from product `9a3bbff`).

Local try-out (throwaway repo `acme/checkout` with origin `git@github.com:acme/checkout.git`, one Markdown page, the page's config): `app deploy --config artifact-pages.yaml --dry-run` (101 creates) then apply (`DEPLOYED`, downloads and verifies the `v0.1.2` web release); `registry register … --dry-run` / apply (`REGISTERED`); `site publish --site checkout --source docs/artifacts --config artifact-pages.yaml --fulltext --dry-run` / apply (`PUBLISHED`, 5 files), again → `UP TO DATE`; all exit 0. `python3 -m http.server --directory .local/storage` + Playwright: `/` lists the site, site home and page open, ⌘⇧F finds the page; reloading a deep link (`/handbook/welcome.md` in a first identical run with an `acme/handbook` repository) returns 404 (stated on the page). Only console errors: the 404 of `_previews/<site>/catalog.json` (no previews) — expected.

Verification: `npm run assets:sync`, `npm run assets:check`, `npm test` (3/3) pass. Both sites published (dry-run then publish, `--fulltext`) from a committed throwaway copy of this repository (this repository has no commits yet, so `site publish` cannot read Git history here) into tmp storage with the reader app; served by a throwaway static server with SPA fallback. Playwright: all 12 guide pages × light/dark × 400/1280 px (48 runs): no page-level overflow, one H1, no heading skips, no duplicate ids, no console or page errors; 58 distinct same-origin links (including `/architecture/...` cross-site links mapped to the stored files) return 200 and anchors exist; root-absolute links use `target="_top"`. In the reader: the page loads in the iframe with the app's dark theme, overview → Next opens Getting started, Getting started → Next opens Reading, page text search for `mise` finds 2 pages.

Product observations (for the product repository, not filed): `artifact-pages registry register` and `artifact-pages app deploy` with no options print usage and exit 0 without doing anything (`cli/cmd/artifact-pages/main.go`, `len(args) < 3` treated as a help request). The overview step 01/02 and Configuration show the bare forms for the apply step; this page passes `--config artifact-pages.yaml` everywhere. Also `app deploy` apply output shows `+ 0 create` next to "Deployed 101 application files".

## Review fixes (2026-10-03, awaiting owner review)

Independent review found no high issues. Applied:
- M1: step 01 now says the checkout needs at least one commit (publishing reads Git history; pages need not be committed) and adds `git add -A && git commit -m "Add a first page"` "only if the repository has no commits yet". Re-run in a fresh tmp repo: `site publish` without a commit fails (exit 1, "does not have any commits yet"); after one commit dry-run and publish succeed (5 files); an uncommitted extra page still publishes.
- M2: team pane label → "TEAM REPOSITORIES · ANY NUMBER · ONE OR MORE SITES EACH" / "チームのリポジトリ · いくつでも · 1つ以上のサイトを公開" (a registration names one repository; one repository may publish several sites).
- L2: very recent releases may be missing from `mise ls-remote` (mise's minimum release age), but naming the version from GitHub Releases still installs it (observed: `0.1.2` installed while hidden from the listing).
- L3: mise must be active in the shell (or its shims on `PATH`) for `artifact-pages` to be found.
- L7 (shared): `.copy-btn` gets `flex: none; white-space: nowrap` in `shared/assets/site.css`; at 400 px every copy button on the ja guide pages is one line (21.6 px high).
- Verification: `assets:sync`, `assets:check`, `npm test` (3/3) pass; both sites republished (dry-run first, `--fulltext`) from a committed tmp copy; Playwright 48 runs (12 guide pages × light/dark × 400/1280) clean, 58 same-origin links and anchors resolve; reader pager and page text search re-checked. The bare `app deploy` / `registry register` forms on the overview and Configuration are left unchanged pending the owner's decision.
