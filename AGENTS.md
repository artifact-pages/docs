# Agent guidance — Artifact Pages documentation

This repository holds the public, reader-facing documentation sites of [Git Artifact Pages](https://github.com/artifact-pages/artifact-pages): `guide` (adopt, publish, read) and `architecture` (how it works and why). It is a satellite repository: each site is published from here with `artifact-pages site sync`. The production registry, reader app deployment and publish workflow belong to `artifact-pages/admin`.

Facts come from the product repository. Read its [thesis](https://github.com/artifact-pages/artifact-pages/blob/main/docs/thesis.md), [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) and CLI help before writing. A page must not state behavior the specification or the CLI does not have.

## Layout

~~~text
sites/
  guide/          registered source directory (sourcePath: sites/guide)
    ja/  en/  assets/
  architecture/   registered source directory (sourcePath: sites/architecture)
    ja/  en/  assets/
backlog/          one ticket per page (DOC-xx) and the queue README
~~~

Keep agent instruction files and anything that is not a published page outside `sites/<site-id>/`; everything inside a registered source directory is published and readable.

## Site and language boundaries

- A site is a registration and publishing unit for a coherent documentation collection. Divide sites by the reader's purpose; language alone is not a reason to create a separate site.
- Keep translations of the same documentation in one site, in `ja/` and `en/` inside that site's directory. Register the site's directory, not each language directory.
- Site IDs `guide` and `architecture` are referenced by cross-site links (`/guide/<lang>/…`, `/architecture/<lang>/…` with `target="_top"`); do not rename them.
- Internal design notes, UI concepts and backlog records are not public sites.

## Site assets

- Each site is self-contained: its own `sites/<site>/assets/` files (`site.css`, `site.js`) are edited directly. There is no shared source, no build or sync step, and no package manifest. Sites may look different from one another.
- A site never loads another site's assets. Per-site CSP blocks cross-site asset paths only over plain HTTP (for example local nginx); over HTTPS its `https:` source matches every same-origin path, so CSP alone does not enforce this. Keeping each site self-contained works under both policies.
- Pages reference their site's assets relative to their language directory, for example `../assets/site.css`.

## Translated pages

- Use a separate HTML file for each language at matching relative paths and filenames, with a compact in-page language switch linking directly to the translation. Use relative links so they work in the reader and when the file is opened directly.
- Offer only translations that exist. Preserve file extensions in links; treat `index.html` as an explicitly opened file, not a directory default.
- Set `lang`, a clear localized H1 and a descriptive `<title>`.
- Write agent instructions in English and page content in the language of its directory. Japanese: no half-width spaces around ASCII terms; use 認証情報, インデックス, 一覧, プレーン, プレフィックス, サイトの登録情報, アーキテクチャの全体像 consistently.
- Illustrative teams and repositories use the `acme/…` examples (`sre`, `checkout`, `billing`) and say they are illustrative.

## Visual quality

Pages are not previewed locally from this repository. Author them so that they hold up in both light and dark themes and at about 400 px width with no page-level horizontal scroll, and state in the pull request that this was checked in the markup and styles. The owner confirms the result on the real site. Every publish builds the site's page text search data; `--fulltext` no longer exists (artifact-pages/artifact-pages#9), so pages never tell readers to pass it.

## Backlog and issue tracking

`backlog/` holds one ticket per page. `backlog/README.md` is the queue: site lineup, page conventions, workflow and index. Product problems found while writing go to the product repository's issue tracker, not here.

| Status | Meaning | Completion rule |
| --- | --- | --- |
| `Open` | Not yet started. | — |
| `In progress` | Being drafted or revised. | — |
| `Blocked` | Waiting on a decision or external change. | Record the blocker in the ticket. |
| `Done` | Page published and approved. | The owner approved the page and its acceptance criteria are checked. |

Workflow: draft both languages, have the draft reviewed independently, then open a pull request in this repository. After the PR is merged and the workflow publishes it, the owner reviews the pages on the real site. Fixes after that also go through pull requests on a branch, never directly on main. Mark `Done` only after owner approval. Keep the README index in sync with each ticket's status.

~~~sh
# Unfinished tickets
grep -H -m1 '^- Status:' backlog/DOC-*.md | grep -v 'Status: Done$' | sed 's|^backlog/||; s|:- Status: | — |'
~~~
