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

## Live experience (owner, 2026-10-25)

These pages are read in the reader app they describe, so the chapter asks readers to try each feature on the spot, in "ここで試す" blocks next to the simplified screen samples. The samples stay, because they label the parts of the screen and serve readers outside the app; the live step lets the reader see the real thing instead of mistaking a sample for it (the 2026-10-01 finding about the autoplay palette sample).

- Artifactを探す: open the palette with ⌘ K and jump to a page of this site; run page text search with ⌘ ⇧ F; pin this page and see it under Pinned; see recently updated pages on the site home.
- Artifactを読む: jump to a heading from Contents; copy a heading link; read this page's Details (updated date, last committer, branch); open its source in `artifact-pages/docs`.
- Artifactを公開・レビューする: readers cannot publish, so the page itself is the example: Details and the source link show that it was published from `artifact-pages/docs` by GitHub Actions. Point to the site's Previews only for what is actually there; do not promise that a preview exists.
- 基盤を提供・運用する: explained only; no live step.

Rules:

- Pages only invite the reader to act; the live steps never read or drive the reader app's DOM, even though the unsandboxed same-origin frame would allow it (specification §7). That DOM is not a contract and would break with UI changes. `assets/site.js` reads only the app's route (`window.top.location`) and viewport width (`window.top.matchMedia`) to pick the step wording.
- Steps are worded for three widths that follow the reader's breakpoints (web v0.4.6): up to 620 px (search button and More menu), 621 to 1199 px (header buttons), 1200 px and wider (right column with Details and Contents).
- In a preview, a note says that Pin and production Details are absent and links to the published page.
- Keyboard steps rely on the specification's guarantee that ⌘ B, ⌘ K and ⌘ ⇧ F work while focus is inside an HTML artifact's frame.
- Each step has a narrow-screen form: up to 620 px there is no icon rail and secondary actions move to the search button and the More menu, and touch devices have no keyboard.
- When a page is not inside the reader app (`window.top === window`, for example opened under `/_artifacts/…`), it replaces the live steps with plain description and a link that opens the page in the app.
- Live steps live in the HTML pages of `01-features/`; the site root `README.md` is Markdown, which runs no script, and links to them.
- Control names and placement are written only after checking the released UI (see below).

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
- [ ] The live steps work on the real site in the reader app, at wide and narrow widths, and the pages fall back to plain description outside the app.
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] Reader UI descriptions match the released UI after ISSUE-107, ISSUE-108 and ISSUE-109.
