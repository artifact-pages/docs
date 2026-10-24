# DOC-25 — 体験と機能 (Experience and features)

- Status: In progress
- Assignee: Claude
- Site: `ja`, `en` ([DOC-23](DOC-23-structure-and-site-migration.md)); owns `01-features/` (`index.html` and the four feature pages) in each, at identical relative paths
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only; final reader UI descriptions follow the shipped UI of ISSUE-107, ISSUE-108 and ISSUE-109 (product repository, merged as #163, #162 and #166)

## Purpose

Show what the tool can do and how it helps, and that independent publishing and a shared find-and-read experience connect. Not a feature list alone.

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

Chapter contents, as in structure.md:

- README: the feature groups and how they connect.
- Artifactを公開・レビューする (publish and review): HTML, Markdown and related assets published from a team's own repository with GitHub Actions; each site publishes without waiting for other sites or the reader app; PR changes are checked in a preview kept separate from the main publication. Setup steps belong to DOC-27.
- Artifactを探す (find): browse by structure (site list, switching, folders); search (title and path search from the palette, full-text search of body text); clues close at hand (pinned, recently read, recently updated). The palette is introduced as the UI that provides search; the experience of candidates appearing as you type is a value to explain, but no uniform latency guarantee is written without measurements. Do not introduce a separate "follow" chapter that suggests notifications or subscriptions.
- Artifactを読む (read): HTML and Markdown in one screen; table of contents and jumping to headings; sharing page and heading URLs; document information (updated date, last committer, branch); opening the source GitHub repository. Describe the GitHub link as moving to the source, without presuming a purpose such as investigating background or improving the document; call it GitHub, not generic Git; do not present the last committer as the owner of the document.
- 基盤を提供・運用する (provide and operate the platform): Terraform builds the delivery environment on AWS or Cloudflare, sites and publishing sources are registered, the reader app updates independently of content, and what admins handle versus what teams are free to do. Details go to DOC-26 to DOC-28.

## Dependencies on the reader UI

- Final screen descriptions come after ISSUE-107 (site landing: compact site information, overview / documents / previews, persistent search, Markdown-only overview), ISSUE-108 (right sidebar with Contents and Details at enough width) and ISSUE-109 (previews opened in the app, extra metadata) are shipped; check the released UI before describing it.
- Every operational detail, constraint and measurement is verified against the implementation or primary sources before it is written.

## Out of scope

- Setup procedures (DOC-26, DOC-27), rollout (DOC-28), mechanisms (DOC-29), exhaustive lookup tables such as shortcuts and URL forms (DOC-30).

## Inputs carried over

- [DOC-02](DOC-02-guide-overview.md) reading-features revision (2026-10-02).
- [DOC-05](DOC-05-guide-reading.md): URLs and sharing, palette modes and blank state, page text search and palette hand-off, theme and narrow screens. Lookup-style facts (shortcuts, URL forms, search scope) are also input to DOC-30.
- The reader-facing part of [DOC-13](DOC-13-architecture-search.md): what name search and page text search do for the reader (the mechanism goes to DOC-29).

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] Reader UI descriptions match the released UI after ISSUE-107, ISSUE-108 and ISSUE-109.
