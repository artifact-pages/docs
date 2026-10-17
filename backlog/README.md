# Documentation backlog

Moved on 2026-10-03 from `docs/backlog/documentation/` in [artifact-pages/artifact-pages](https://github.com/artifact-pages/artifact-pages) (under its earlier owner) together with the site sources (decision TD5 there). Ticket links to the specification, technical design and verification records point to that repository. The production registry and publish workflow live in [artifact-pages/admin](https://github.com/artifact-pages/admin).

Statuses follow the [shared backlog legend](../AGENTS.md#backlog-and-issue-tracking). This track covers the public, reader-facing documentation sites published from `sites/`. Internal design notes, UI concepts, and backlog records stay in their existing tracks and are not published as these sites.

There is one ticket per chapter of the agreed [structure](structure.md) (owner-agreed 2026-10-17); page granularity within a chapter is decided in [DOC-23](DOC-23-structure-and-site-migration.md). Tickets DOC-02 to DOC-16 and DOC-18 to DOC-21 were written per page and are superseded by the chapter tickets DOC-23 to DOC-30; they are kept for history.

## Site lineup (current published state)

[structure.md](structure.md) supersedes this lineup. The table below is the current published state until [DOC-23](DOC-23-structure-and-site-migration.md) settles the final site IDs and URLs (two per-language sites is the leading option, not decided).

Sites are divided by the reader's purpose, not by language. Translations live inside one site (see [`AGENTS.md`](../AGENTS.md)).

| Site ID | Display name | Reader's purpose | Status |
| --- | --- | --- | --- |
| `guide` | Guide | Adopt, publish, and read with Git Artifact Pages. | Registered; source `sites/guide/` (DOC-01). |
| `architecture` | Architecture | Understand how it works and why. | Registered; source `sites/architecture/` (DOC-08). |
| `reference` | Reference | Look up commands, config keys, and index formats. | Not planned yet. Start inside `guide`; split out when lookup becomes the main use. |

Contributor-facing material stays in the GitHub repository and is not a site.

Registry metadata:

- `guide` (registered) — name `Guide`; description `Adopt, publish, and read with Git Artifact Pages. 導入・公開・閲覧のガイド。`
- `architecture` (registered) — name `Architecture`; description `How Git Artifact Pages works and why. 仕組みと設計の考え方。`

Names are English and descriptions carry both languages because registry `name` and `description` are single strings today.

## Page conventions

- Every page exists as `ja/<file>.html` and `en/<file>.html` with the same filename; each links to its translation through the in-page language switch.
- No numeric filename prefixes. Reading order is expressed by in-page previous/next navigation.
- Each site is self-contained: it owns its CSS and JavaScript in `sites/<site>/assets/`, edited directly, with no shared source or sync step (a site never loads another site's assets; per-site CSP blocks cross-site asset paths only over plain HTTP, such as local nginx, because over HTTPS its `https:` source matches every same-origin path). Sites may look different.
- Facts come from the linked primary sources (specification, technical design, CLI help). A page must not introduce behavior that the specification does not state.
- Illustrative teams and repositories use the `acme/…` examples (`sre`, `checkout`, `billing`) and say they are illustrative.

## Workflow and definition of Done

1. Mark the ticket `In progress` and update this index.
2. Draft both languages and make sure they hold up in light, dark, and ~400px width with no page-level horizontal scroll.
3. Have the draft reviewed independently, then open a pull request. After it is merged and published by the workflow, the owner reviews the pages on the real site. Fixes go through pull requests on a branch, not main. Revise until approved.
4. Mark `Done` only after the owner approves the page and the acceptance criteria are checked.

## Index

See [structure.md](structure.md) for the agreed chapters. Order: chapter tickets, then DOC-22, then Done and Superseded tickets.

| Order | Ticket | Title | Status |
| ---: | --- | --- | --- |
| 1 | [DOC-23](DOC-23-structure-and-site-migration.md) | Structure and site migration | Blocked |
| 2 | [DOC-24](DOC-24-entry-readme.md) | Entry README: outcomes and overall picture | Open |
| 3 | [DOC-25](DOC-25-experience-and-features.md) | 体験と機能 (Experience and features) | Open |
| 4 | [DOC-26](DOC-26-setup-infrastructure.md) | 導入: インフラを構築する (Setup: build the infrastructure, Cloudflare and AWS) | Open |
| 5 | [DOC-27](DOC-27-setup-admin-to-first-publish.md) | 導入: 管理リポジトリ準備 → 閲覧アプリのデプロイ → サイト登録 → 最初のサイト公開 → PRプレビュー (Setup: admin repository to first publish and PR preview) | Open |
| 6 | [DOC-28](DOC-28-rollout-and-operations.md) | 社内展開と運用 (Rollout and operations) | Open |
| 7 | [DOC-29](DOC-29-architecture.md) | アーキテクチャ (Architecture, including cost and performance) | Open |
| 8 | [DOC-30](DOC-30-reference.md) | リファレンス (Reference) | Open |
| 9 | [DOC-22](DOC-22-guide-machine-readable-docs.md) | Docs: machine-readable access to the sites | Open |
| 10 | [DOC-01](DOC-01-guide-site-structure.md) | Move to the `guide` site structure | Done |
| 11 | [DOC-17](DOC-17-guide-versions.md) | Guide: pinning and upgrading versions | Done |
| 12 | [DOC-02](DOC-02-guide-overview.md) | Guide: overview page | Superseded |
| 13 | [DOC-03](DOC-03-guide-getting-started.md) | Guide: getting started | Superseded |
| 14 | [DOC-04](DOC-04-guide-publishing.md) | Guide: publishing | Superseded |
| 15 | [DOC-05](DOC-05-guide-reading.md) | Guide: reading | Superseded |
| 16 | [DOC-06](DOC-06-guide-configuration.md) | Guide: configuration | Superseded |
| 17 | [DOC-07](DOC-07-guide-access-and-trust.md) | Guide: access and trust | Superseded |
| 18 | [DOC-08](DOC-08-architecture-overview.md) | Architecture: overview and site registration | Superseded |
| 19 | [DOC-09](DOC-09-architecture-storage-layout.md) | Architecture: storage layout | Superseded |
| 20 | [DOC-10](DOC-10-architecture-publishing-model.md) | Architecture: publishing model | Superseded |
| 21 | [DOC-11](DOC-11-architecture-previews.md) | Architecture: previews | Superseded |
| 22 | [DOC-12](DOC-12-architecture-trust-model.md) | Architecture: trust model | Superseded |
| 23 | [DOC-13](DOC-13-architecture-search.md) | Architecture: search and indexes | Superseded |
| 24 | [DOC-14](DOC-14-guide-provider-setup.md) | Guide: provider setup | Superseded |
| 25 | [DOC-15](DOC-15-guide-shallow-checkout-dates.md) | Guide: shallow checkouts and document dates | Superseded |
| 26 | [DOC-16](DOC-16-guide-private-config-github-app.md) | Guide: GitHub App for private configuration repositories | Superseded |
| 27 | [DOC-18](DOC-18-guide-release-catch-up.md) | Guide: catch up with the split release (command names, install, links) | Superseded |
| 28 | [DOC-19](DOC-19-architecture-command-catch-up.md) | Architecture: catch up with the current command names | Superseded |
| 29 | [DOC-20](DOC-20-guide-getting-started-links-versions.md) | Guide: getting started links and current versions | Superseded |
| 30 | [DOC-21](DOC-21-guide-publishing-single-repo-example.md) | Guide: publishing from a single repository and direct Action use | Superseded |

## Product observations from this work

These surfaced while planning the sites. They are not yet product issues; file them in [issues](https://github.com/artifact-pages/artifact-pages/blob/main/docs/backlog/issues/README.md) if the owner confirms them.

- Registry site `name` and `description` cannot be localized, so a bilingual site shows one language in the picker and palette.
- One site with `ja/` and `en/` mixes both languages in Browse, Recently updated, and page search. Language filtering is explicitly undecided in `AGENTS.md`.
- Each site owns its CSS and JavaScript. Per-site CSP blocks cross-site asset paths only over plain HTTP; over HTTPS self-containment is a convention, not something CSP enforces.
- From the 2026-10-01 beginner review of the reader (documentation-side, not product issues): the guide pages use smooth scrolling, so a Contents jump to a distant heading takes about one to two seconds and looks unresponsive at first; and the overview page's autoplay palette sample looks identical to the real palette, so a first-time reader may not tell them apart despite the "sample" note.
