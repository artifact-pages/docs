# DOC-24 — Entry README: outcomes and overall picture

- Status: In progress
- Assignee: Claude
- Site: `ja`, `en` ([DOC-23](DOC-23-structure-and-site-migration.md)); owns `README.md` at each site root (`sites/<ja|en>/README.md`) in each, at identical relative paths
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only

## Purpose

The entry point of each language: tell a platform owner, in the first minutes, which environment and experience the tool can offer their organization, and give the overall picture and where to go next. Chapter role (structure.md): "the first outcomes and the overall picture".

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

- Outcomes first: the environment and the experience Artifact Pages provides (publishing from each team's own repositories, PR previews, a shared find and read experience, independent updates), framed as value the platform owner can offer internally.
- A compact overall picture of how the chapters connect, with links to 体験と機能 (experience and features), 導入 (setup), 社内展開と運用 (rollout and operations), アーキテクチャ (architecture) and リファレンス (reference).
- Primary reader is the platform owner who provides Artifact Pages inside the organization; publishers and readers appear through what the platform owner can offer them.

## Out of scope

- Feature detail (DOC-25), procedures (DOC-26, DOC-27), design reasoning (DOC-29).

## Inputs carried over

- [DOC-02](DOC-02-guide-overview.md): the overview page (hero, promises, four-role story with the scroll-driven diagram, example team site and palette, the satellite remote-config note). Reuse what still holds; the reading-features revision of DOC-02 goes to DOC-25.

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
