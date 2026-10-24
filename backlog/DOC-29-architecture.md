# DOC-29 — アーキテクチャ (Architecture, including cost and performance)

- Status: In progress
- Assignee: Claude
- Site: `ja`, `en` ([DOC-23](DOC-23-structure-and-site-migration.md)); owns `04-architecture/` (including the cost pages `05-cost-and-performance.html`, `06-cost-cloudflare.html`, `07-cost-aws.html`) in each, at identical relative paths
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only

## Purpose

Explain why the system has this shape, with its boundaries and trade-offs, and connect cost to what publishing and reading actually do and why the optimizations exist.

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

Chapter contents, as in structure.md: README (overall structure and design policy); repositories and the unit of updates; how publishing and previews work; how reading and search work; security and access; cost and performance: common factors (cost, processing time, transfer volume), Cloudflare (structure and optimization), AWS (structure and optimization).

- Cost and performance figures come only from verified sources: the cost estimate in the product repository's TD20, `docs/research/web-scale-benchmark.md` and `docs/research/cli-publish-memory.md`. Each figure states what it measured. No unsourced amounts, scales or performance values. Present cost through the publish and read processing and the reasons for optimization, not as a price list.
- Current command names and control keys (`site sync`, `registry sync`, withdrawal by removing a site from `sites`, `/_control/sites/<site>/…`), as in the DOC-19 stale-content list.

## Out of scope

- Operating procedures (DOC-26 to DOC-28), lookup material (DOC-30).

## Inputs carried over

- [DOC-07](DOC-07-guide-access-and-trust.md): access and trust guidance (HTML executable, Markdown sanitized, access control at the delivery edge).
- [DOC-08](DOC-08-architecture-overview.md) to [DOC-12](DOC-12-architecture-trust-model.md): overview, storage layout, publishing model, previews, trust model.
- The non-reader parts of [DOC-13](DOC-13-architecture-search.md): static search, indexes, trade-offs and capacity measurements (record that those numbers were local, controlled-corpus results). Remember that `--fulltext` no longer exists.
- [DOC-19](DOC-19-architecture-command-catch-up.md): the command-name, withdrawal and control-key corrections and the satellite credential list.

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] Every cost, performance and capacity figure is traceable to TD20, `web-scale-benchmark.md` or `cli-publish-memory.md` (or another named verified source) and states what it measured.
- [ ] No page uses `site publish`, `registry register`, `registry unregister`, `--fulltext` or `tasuku43` URLs.
