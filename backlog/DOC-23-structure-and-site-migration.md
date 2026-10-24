# DOC-23 — Structure and site migration

- Status: Open
- Site: `ja` (published 2026-10-23), `en` (planned); `guide` and `architecture` unregistered and removed 2026-10-23
- Depends on: the reader UI improvements (ISSUE-107, ISSUE-108, ISSUE-109) for final operating instructions and screenshots only; migration work has not started

## Decisions (owner, 2026-10-18)

1. Sites: one site per language. Site IDs `ja` and `en`, sources `sites/ja/` and `sites/en/` in this repository. Display names: `Artifact Pages ドキュメント` (`ja`) and `Artifact Pages Documentation` (`en`). Each site holds the whole [structure.md](structure.md) tree for its language.
2. Granularity: one page per leaf of the structure.md tree; each chapter and sub-folder has an entry page.
3. File names: English names; both sites use identical relative paths, so a page's translation is the same path in the other site. Numeric `01-` prefixes only where order is information: the chapter folders (`01-features/` to `05-reference/`), the four feature pages and the setup steps. No prefixes inside operations, architecture or reference. Reason: the reader lists folders first, then files by filename, not by title (product TD19).
4. Format: the site root is `README.md` (Markdown), because the reader's site-home Overview renders only a root `README.md` or `index.md`. Every folder below the root uses `index.html` as its entry page, and every other page is HTML. Pages must be as rich as the current HTML manuscript pages in `sites/guide` and `sites/architecture`; their content may be partly reused. Each site stays self-contained with its own `assets/`.
5. Old URLs: before the new sites launch, fix the known links to the old `/guide/…` and `/architecture/…` URLs (product repository, `artifact-pages/admin`, release notes); at launch, unregister `guide` and `architecture` (no stub pages). The product has no redirects; unknown paths are soft 404s.

Also from the owner (handoff guidance):

- Final operating instructions and screenshots are made after the reader UI improvements (ISSUE-107, ISSUE-108, ISSUE-109 in the product repository) land.
- Translation of the public material is settled last; drafts need not be translated in bulk now.
- Public migration, releases and deploys are handled separately with owner approval.

## Agreed layout

~~~text
sites/<ja|en>/
├── README.md
├── 01-features/ index.html, 01-publish-and-review.html, 02-find.html, 03-read.html, 04-provide-and-operate.html
├── 02-setup/ index.html, 01-infrastructure/{index.html, 01-cloudflare.html, 02-aws.html}, 02-admin-repository.html, 03-reader-app.html, 04-register-site.html, 05-first-site.html, 06-pr-previews.html
├── 03-operations/ index.html, 01-onboard-team.html, 02-update-shared-workflows.html, 03-upgrade.html, 04-change-or-retire-site.html, 05-troubleshooting.html
├── 04-architecture/ index.html, 01-repositories-and-updates.html, 02-publishing-and-previews.html, 03-reading-and-search.html, 04-security-and-access.html, 05-cost-and-performance.html, 06-cost-cloudflare.html, 07-cost-aws.html
└── 05-reference/ index.html, 01-reader/{index.html, 01-keyboard-shortcuts.html, 02-search.html, 03-urls.html, 04-local-storage.html}, 02-configuration.html, 03-cli.html, 04-github-actions.html, 05-terraform.html, 06-versions.html
~~~

Chapters 03–05 got number prefixes on 2026-10-24 (site review F05, owner chose numbering): the folder list and sidebar sort by file name, so the prefixes keep them in the reading order of the chapter index and pager. Their earlier unnumbered URLs no longer resolve. Follow-up the same day (owner): the reader app lists subfolders before pages, so the cost pages left their subfolder and became `04-architecture/05`–`07`; the infrastructure pages were numbered `01-cloudflare`, `02-aws` to match their index, and both lead on to the admin repository page.

DOC-27 still decides where the local-try path (`provider: local`) goes inside `02-setup/`.

## Open check

- Whether a link from a page in one site to a page in the other site navigates inside the reader app. If it does not, language-switch and cross-site links use absolute `https://artifact-pages.dev/<id>/…` URLs instead of relative ones.

## Purpose

Record the physical shape of the documentation (sites, URLs, files, format; decided 2026-10-18) and migrate the published sites to it, so that DOC-24 to DOC-30 have a place to land.

## Scope

- Keep `AGENTS.md`, the [README](README.md) site lineup and the repository `README.md` in line with the decisions above.
- Create `sites/ja/` and `sites/en/` with the agreed layout and their own `assets/`, then register the sites `ja` and `en` in the registry configuration in `artifact-pages/admin` (a separate pull request there), once the owner approves.
- Before launch, fix the known links to the old `/guide/…` and `/architecture/…` URLs (product repository, `admin`, release notes).
- At launch, unregister `guide` and `architecture`; no stub pages are left. Done 2026-10-23 at the owner's request, right after `ja` was published (docs #31, admin #26).
- Resolve the open check above.

## Gate

This ticket gates the publication of DOC-24 to DOC-30, not their drafting. Drafts proceed against [structure.md](structure.md) and the agreed layout, and are moved into place at migration.

## Out of scope

- Page content (DOC-24 to DOC-30).
- Changing public settings (registry, deploys, releases) without the owner's approval.

## Inputs carried over

- [DOC-01](DOC-01-guide-site-structure.md) (Done): the current `guide` site structure and the per-site assets rule.
- [DOC-22](DOC-22-guide-machine-readable-docs.md): machine-readable access applies to whatever sites this ticket settles.

## Acceptance criteria

- [ ] Both sites exist with identical relative paths, localized H1 and `<title>`, and an in-page language switch linking to the same path in the other site.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [x] The owner decisions are recorded in this ticket and in `AGENTS.md` and the README.
- [ ] Known links point to the new URLs, the old sites `guide` and `architecture` are unregistered, and cross-site links work (checked against the real site).
