# Agent guidance — Artifact Pages documentation

This repository holds the public, reader-facing documentation sites of [Git Artifact Pages](https://github.com/artifact-pages/artifact-pages): per-language sites `ja` (published) and `en` (planned), DOC-23. The former sites `guide` and `architecture` were unregistered and removed on 2026-10-23; their pages remain in the Git history. It is a satellite repository: each site is published from here with `artifact-pages site sync`. The production registry, reader app deployment and publish workflow belong to `artifact-pages/admin`.

Facts come from the product repository. Read its [thesis](https://github.com/artifact-pages/artifact-pages/blob/main/docs/thesis.md), [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) and CLI help before writing. A page must not state behavior the specification or the CLI does not have.

## Layout

~~~text
sites/
  ja/  en/        per-language sites (DOC-23; en planned); layout in backlog/DOC-23-structure-and-site-migration.md
    README.md  01-features/ … 05-reference/  assets/
backlog/          one ticket per chapter (DOC-xx), the agreed structure and the queue README
~~~

Keep agent instruction files and anything that is not a published page outside `sites/<site-id>/`; everything inside a registered source directory is published and readable.

## Site and language boundaries

- Decided 2026-10-18 (DOC-23): language is the site boundary. There are two sites, `ja` (`Artifact Pages ドキュメント`) and `en` (`Artifact Pages Documentation`), sources `sites/ja/` and `sites/en/`, each holding the whole structure tree for its language. Register each site's directory.
- Both sites use identical relative paths, so a page's translation is the same path in the other site.
- The old site IDs `guide` and `architecture` were unregistered on 2026-10-23 with no stub pages; the product has no redirects, so their old URLs no longer resolve.
- Internal design notes, UI concepts and backlog records are not public sites.

## Site assets

- Each site is self-contained: its own `sites/<site>/assets/` files (`site.css`, `site.js`) are edited directly. There is no shared source, no build or sync step, and no package manifest. Sites may look different from one another.
- A site never loads another site's assets. Per-site CSP blocks cross-site asset paths only over plain HTTP (for example local nginx); over HTTPS its `https:` source matches every same-origin path, so CSP alone does not enforce this. Keeping each site self-contained works under both policies.
- Pages reference their site's assets relative to their own location, at the matching depth from their folder (`assets/` sits at the site root).

## Translated pages

- Each language is its own site with identical relative paths. The site root is `README.md`; every folder below it has an `index.html` entry page and all other pages are HTML. File names are English, with `01-` prefixes on chapter folders and on every page and subfolder inside a chapter, in reading order (the folder list and sidebar sort by file name, so the prefixes keep them in the order of the chapter index and pager); `index.html` carries none. The reader app lists subfolders before pages, so a subfolder inside a chapter only works where it comes first in reading order; otherwise keep its pages flat in the chapter. The in-page language switch links to the same path in the other site. Whether relative links work across sites is an open check in DOC-23; if not, use absolute `https://artifact-pages.dev/<id>/…` URLs.
- Offer only translations that exist. Preserve file extensions in links; treat `index.html` as an explicitly opened file, not a directory default.
- Set `lang`, a clear localized H1 and a descriptive `<title>`.
- Mark repeated page chrome with `data-search-ignore` so page text search and its excerpts show only page content: the skip link, the `eyebrow` above the H1, the setup step map (`nav.sm`) and the pager (`nav.pager`). Screen samples inside figures are already `aria-hidden="true"`, which the search also skips.
- Write agent instructions in English and page content in the language of its directory. Japanese: no half-width spaces around ASCII terms; use 認証情報, インデックス, 一覧, プレーン, プレフィックス, サイトの登録情報, アーキテクチャの全体像 consistently. The published HTML or Markdown file is `Artifact` (owner, 2026-10-24; not 資料), defined at its first use in `README.md` and again on the features overview `01-features/index.html`. Files a page uses (CSS, images) are not Artifacts; write 「Artifactとそれが使うファイル」 or 「公開元のファイル」 where both are meant.
- Illustrative teams and repositories use the `acme/…` examples (`sre`, `checkout`, `billing`) and say they are illustrative.

## Visual quality

Pages are not previewed locally from this repository. Author them so that they hold up in both light and dark themes and at about 400 px width with no page-level horizontal scroll, and state in the pull request that this was checked in the markup and styles. The owner confirms the result on the real site. Every publish builds the site's page text search data; `--fulltext` no longer exists (artifact-pages/artifact-pages#9), so pages never tell readers to pass it.

## Backlog and issue tracking

`backlog/` holds one ticket per chapter of the agreed [structure](backlog/structure.md); page granularity is decided in DOC-23. `backlog/README.md` is the queue: site lineup, page conventions, workflow and index. Product problems found while writing go to the product repository's issue tracker, not here.

| Status | Meaning | Completion rule |
| --- | --- | --- |
| `Open` | Not yet started. | — |
| `In progress` | Being drafted or revised. | — |
| `Blocked` | Waiting on a decision or external change. | Record the blocker in the ticket. |
| `Superseded` | Replaced by another ticket; kept for history. | The ticket names its replacement(s). Pages it produced stay published until the replacement ships. |
| `Done` | Page published and approved. | The owner approved the page and its acceptance criteria are checked. |

Authoring roles (owner, 2026-10-22): the Claude main session writes all reader-visible text; Sol (Codex, `gpt-6.1-sol`) gathers the facts before drafting and reviews the draft for accuracy against the implementation and consistency with other pages, the specification and the backlog. Every chapter is drafted and Sol-reviewed, then the owner reviews the whole Japanese set (owner, 2026-10-22, after a first single-chapter review of DOC-26). English follows after the owner approves the Japanese set. The step-by-step procedure is the workspace skill `docs-chapter` (outside this repository).

Workflow: draft the chapter, have it reviewed by Sol, show the owner a review copy, then open a pull request in this repository. After the PR is merged and the workflow publishes it, the owner reviews the pages on the real site (for a site that is not registered yet, the review copy stands in until launch). Fixes after that also go through pull requests on a branch, never directly on main. Mark `Done` only after owner approval. Keep the README index in sync with each ticket's status.

~~~sh
# Unfinished tickets
grep -H -m1 '^- Status:' backlog/DOC-*.md | grep -v -e 'Status: Done$' -e 'Status: Superseded$' | sed 's|^backlog/||; s|:- Status: | — |'
~~~
