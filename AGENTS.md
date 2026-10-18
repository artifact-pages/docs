# Agent guidance — Artifact Pages documentation

This repository holds the public, reader-facing documentation sites of [Git Artifact Pages](https://github.com/artifact-pages/artifact-pages): per-language sites `ja` and `en` (planned, DOC-23); until they launch, `guide` (adopt, publish, read) and `architecture` (how it works and why) are the current sites. It is a satellite repository: each site is published from here with `artifact-pages site sync`. The production registry, reader app deployment and publish workflow belong to `artifact-pages/admin`.

Facts come from the product repository. Read its [thesis](https://github.com/artifact-pages/artifact-pages/blob/main/docs/thesis.md), [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) and CLI help before writing. A page must not state behavior the specification or the CLI does not have.

## Layout

~~~text
sites/
  guide/          current registered source (sourcePath: sites/guide), unregistered at launch
    ja/  en/  assets/
  architecture/   current registered source (sourcePath: sites/architecture), unregistered at launch
    ja/  en/  assets/
  ja/  en/        planned per-language sites (DOC-23); layout in backlog/DOC-23-structure-and-site-migration.md
    README.md  01-features/ … 05-reference/  assets/
backlog/          one ticket per chapter (DOC-xx), the agreed structure and the queue README
~~~

Keep agent instruction files and anything that is not a published page outside `sites/<site-id>/`; everything inside a registered source directory is published and readable.

## Site and language boundaries

- Decided 2026-10-18 (DOC-23): language is the site boundary. There are two sites, `ja` (`Artifact Pages ドキュメント`) and `en` (`Artifact Pages Documentation`), sources `sites/ja/` and `sites/en/`, each holding the whole structure tree for its language. Register each site's directory.
- Both sites use identical relative paths, so a page's translation is the same path in the other site.
- The old site IDs `guide` and `architecture` stay registered and current until the new sites launch; their cross-site links (`/guide/<lang>/…`, `/architecture/<lang>/…` with `target="_top"`) keep working and the IDs are not renamed. At launch they are unregistered with no stub pages; the product has no redirects.
- Internal design notes, UI concepts and backlog records are not public sites.

## Site assets

- Each site is self-contained: its own `sites/<site>/assets/` files (`site.css`, `site.js`) are edited directly. There is no shared source, no build or sync step, and no package manifest. Sites may look different from one another.
- A site never loads another site's assets. Per-site CSP blocks cross-site asset paths only over plain HTTP (for example local nginx); over HTTPS its `https:` source matches every same-origin path, so CSP alone does not enforce this. Keeping each site self-contained works under both policies.
- Pages reference their site's assets relative to their own location: `../assets/site.css` from a language directory in `guide`/`architecture`, and the matching depth from a folder in `ja`/`en`.

## Translated pages

- New sites (`ja`, `en`): each language is its own site with identical relative paths. The site root is `README.md`; every folder below it has an `index.html` entry page and all other pages are HTML. File names are English, with `01-` prefixes only where order is information (chapter folders, the four feature pages, the setup steps). The in-page language switch links to the same path in the other site. Whether relative links work across sites is an open check in DOC-23; if not, use absolute `https://artifact-pages.dev/<id>/…` URLs.
- Current sites (`guide`, `architecture`, until launch): a separate HTML file per language at matching paths under `ja/` and `en/`, with a compact in-page language switch linking directly to the translation, using relative links.
- Offer only translations that exist. Preserve file extensions in links; treat `index.html` as an explicitly opened file, not a directory default.
- Set `lang`, a clear localized H1 and a descriptive `<title>`.
- Write agent instructions in English and page content in the language of its directory. Japanese: no half-width spaces around ASCII terms; use 認証情報, インデックス, 一覧, プレーン, プレフィックス, サイトの登録情報, アーキテクチャの全体像 consistently.
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

Workflow: draft both languages, have the draft reviewed independently, then open a pull request in this repository. After the PR is merged and the workflow publishes it, the owner reviews the pages on the real site. Fixes after that also go through pull requests on a branch, never directly on main. Mark `Done` only after owner approval. Keep the README index in sync with each ticket's status.

~~~sh
# Unfinished tickets
grep -H -m1 '^- Status:' backlog/DOC-*.md | grep -v -e 'Status: Done$' -e 'Status: Superseded$' | sed 's|^backlog/||; s|:- Status: | — |'
~~~
