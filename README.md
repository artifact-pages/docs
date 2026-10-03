# Artifact Pages documentation

Public documentation for [Git Artifact Pages](https://github.com/tasuku43/git-artifact-pages), published as two Artifact Pages sites:

| Site | Source | For |
| --- | --- | --- |
| `guide` | [`sites/guide/`](sites/guide/) | Adopting, publishing and reading |
| `architecture` | [`sites/architecture/`](sites/architecture/) | How it works and why |

Each site has Japanese (`ja/`) and English (`en/`) pages. This repository is a satellite: it publishes its own sites with `artifact-pages site publish` (always with `--fulltext`). The registry, the reader app and the publish workflow are operated from `tasuku43/artifact-pages-admin`.

## Working on the pages

- Shared CSS and JavaScript live in [`shared/assets/`](shared/assets/). Edit them there, then run `npm run assets:sync`; `npm run assets:check` and `npm test` verify the site copies and the sync script.
- The page queue and its conventions are in [`backlog/`](backlog/README.md).

Product behavior is defined by the [specification](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/specification.md) in the product repository; pages follow it.
