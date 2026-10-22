# Artifact Pages documentation

Public documentation for [Artifact Pages](https://github.com/artifact-pages/artifact-pages), published as per-language Artifact Pages sites:

| Site | Source | Language |
| --- | --- | --- |
| `ja` | [`sites/ja/`](sites/ja/) | Japanese, published at <https://artifact-pages.dev/ja> |
| `en` | `sites/en/` (planned) | English |

Both sites hold the same structure at identical relative paths ([DOC-23](backlog/DOC-23-structure-and-site-migration.md)). The former sites `guide` and `architecture` were unregistered and removed on 2026-10-23; their pages remain in the Git history.

This repository is a satellite: it publishes its own sites with `artifact-pages site sync` through the shared workflows of `artifact-pages/admin` (every publish builds the full-text search data; there is no `--fulltext` flag). The registry, the reader app and the shared workflows are operated from `artifact-pages/admin`.

## Working on the pages

- Each site is self-contained. Edit its own `sites/<site>/assets/` files directly; there is no shared source and no build or sync step. Sites may look different from one another.
- The page queue and its conventions are in [`backlog/`](backlog/README.md).

Product behavior is defined by the [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) in the product repository; pages follow it.
