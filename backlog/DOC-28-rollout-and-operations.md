# DOC-28 — 社内展開と運用 (Rollout and operations)

- Status: In progress
- Assignee: Claude
- Site: `ja`, `en` ([DOC-23](DOC-23-structure-and-site-migration.md)); owns `03-operations/` in each, at identical relative paths
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only; builds on DOC-27

## Purpose

Hand the built platform to teams and keep it running: who does what, taking on the next team, updating the shared parts, changing and retiring sites, and investigating and recovering from problems.

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

Chapter contents, as in structure.md: README (what admins and teams each own); accepting a new team or site; updating the shared publish and preview automation; updating the reader app, CLI and Actions; changing or retiring a site; investigating problems and recovering.

- State when a change to the shared procedures reaches satellites. The behavior depends on pins and settings; do not promise automatic propagation to satellites that has not been verified against current behavior. Describe what is verified, and say what the admin must do otherwise.
- Upgrades: pinning the CLI and the reader app, the normal upgrade, the breaking-change order, the one-off override, deployments without pins, catching up older deployments.

## Out of scope

- First-time setup (DOC-26, DOC-27); version and compatibility lookup tables (DOC-30).

## Inputs carried over

- The upgrade part of [DOC-17](DOC-17-guide-versions.md) (`versions.html`, published; DOC-17 stays Done). Its known gap on rollback stands: do not claim rollback beyond what the specification states.
- The upgrade and catch-up content of [DOC-18](DOC-18-guide-release-catch-up.md).

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] Nothing promises automatic propagation to satellites beyond what was verified, and the pin/setting dependence is stated.
- [ ] The upgrade content matches the specification as [DOC-17](DOC-17-guide-versions.md) did (§5.3, §19, §22).
