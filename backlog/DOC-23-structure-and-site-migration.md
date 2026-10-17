# DOC-23 — Structure and site migration

- Status: Blocked
- Site: see [DOC-23](DOC-23-structure-and-site-migration.md) (site IDs and URLs undecided)
- Depends on: owner decisions (below)

## Blocker (2026-10-17)

Waiting on the owner for the decisions that [structure.md](structure.md) leaves open:

- Final site IDs and URLs. Two per-language sites is the leading option, consistently favored, but not decided. Public settings do not change until it is.
- Migration of the old URLs (`/guide/<lang>/…`, `/architecture/<lang>/…`, referenced by cross-site links and by the registered `guide` and `architecture` sites).
- Page granularity: structure.md is a logical tree, not one file per entry; chapter READMEs included.
- File names and numeric prefixes (today: no prefixes, reading order via pager navigation; do not assume current file-name order is the reading order).
- Manuscript format.

## Purpose

Settle the physical shape of the documentation (sites, URLs, files, format) and migrate the published sites to it, so that DOC-24 to DOC-30 have a place to land.

## Scope

- Decide and record the items above, then update `AGENTS.md` and the [README](README.md) site lineup to match.
- Register or rename sites, move the sources, and set up redirects or pointers for old URLs, once the owner approves.
- Update the registry configuration in `artifact-pages/admin` if site IDs change (a separate pull request there).
- Reconcile the in-product and cross-repository links to the old URLs (product repository, `admin`, release notes).

## Gate

This ticket gates the publication of DOC-24 to DOC-30, not their drafting. Drafts proceed against [structure.md](structure.md) and are moved into place after this ticket settles.

## Out of scope

- Page content (DOC-24 to DOC-30).
- Changing public settings before the owner decides.

## Inputs carried over

- [DOC-01](DOC-01-guide-site-structure.md) (Done): the current `guide` site structure and the per-site assets rule.
- [DOC-22](DOC-22-guide-machine-readable-docs.md): machine-readable access applies to whatever sites this ticket settles.

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] The owner decisions are recorded in this ticket and in `AGENTS.md` and the README.
- [ ] Old URLs resolve or point to their replacements, and cross-site links work (checked against the real site).
