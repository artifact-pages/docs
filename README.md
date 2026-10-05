# Artifact Pages documentation

Public documentation for [Git Artifact Pages](https://github.com/tasuku43/git-artifact-pages), published as two Artifact Pages sites:

| Site | Source | For |
| --- | --- | --- |
| `guide` | [`sites/guide/`](sites/guide/) | Adopting, publishing and reading |
| `architecture` | [`sites/architecture/`](sites/architecture/) | How it works and why |

Each site has Japanese (`ja/`) and English (`en/`) pages. This repository is a satellite: it publishes its own sites with `artifact-pages site publish` (the CLI always builds the full-text search data; the former `--fulltext` flag was removed and is now an unknown-flag error). The registry, the reader app and the publish workflow are operated from `tasuku43/artifact-pages-admin`.

## Working on the pages

- Each site is self-contained. Edit its own `sites/<site>/assets/` files directly; there is no shared source and no build or sync step. Sites may look different from one another.
- The page queue and its conventions are in [`backlog/`](backlog/README.md).

Product behavior is defined by the [specification](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/specification.md) in the product repository; pages follow it.
