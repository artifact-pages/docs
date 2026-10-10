# DOC-18 — Guide: catch up with the split release (command names, install, links)

- Status: In progress
- Assignee: Claude
- Site: `guide`
- Page: revisions to `getting-started.html`, `publishing.html`, `configuration.html` and `what-is-git-artifact-pages.html` in `ja/` and `en/`
- Audience: Everyone following the guide end to end
- Depends on: product IMP-72 (first releases of the split CLI, web and Action series). Blocked until those releases exist, because the install section depends on their shape; unblocked when the IMP-72 CLI, `web/v0.1.0` and Action `v0.1.0` releases are published and `admin`/`docs` pin them.

Follow-up of [DOC-17](DOC-17-guide-versions.md): `versions.html` uses the current names and release shape, while the older pages do not, so the guide currently mixes both. Facts: product [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) §19 ("Released CLI", "Action repositories") and §22 (command tree), the released assets of IMP-72, and the published Action repositories' `action.yml`.

## Stale content to revise

- Command names: `site publish` → `site sync`; `registry register` / `registry unregister` → `registry sync` (the specification has no separate unregister command; removing a site from the `sites` mapping withdraws it). `configuration.html` has a whole `registry unregister` subsection to rewrite, not just rename. Appears in `getting-started`, `publishing` (headings, flow labels, meta description, lead), `configuration` and `what-is-git-artifact-pages`, including diagram text and captions.
- Install section of `getting-started.html`: it says the CLI is built from source with no standalone binary and points `mise` / `go install` at `github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages`. Releases now ship CLI binaries for linux/darwin on amd64/arm64 with checksums, and the module is `github.com/artifact-pages/artifact-pages`.
- Old repository URLs: `tasuku43/git-artifact-pages` (including the Releases link and the `getting-started` links to `docs/guides/cloudflare-deployment.md` and `docker/nginx/default.conf`, whose paths may have moved), `tasuku43/artifact-pages-docs` (now `artifact-pages/docs`), and the `tasuku43/artifact-pages-admin` name in the error-message sample of `configuration.html` (check it against the current message).
- `publishing.html` Action inputs list: name `ref`, `checkout`, `fetch-depth`, `github-token`, `cli-version`, `publish-on` and `summary` as the published `publish-action` defines them, and confirm its outputs (the page says outcome `published`; `action.yml` lists `planned`, `synced`, `no-op`, `failed`).
- Outside the published pages: this repository's `AGENTS.md` ("published with `artifact-pages site publish`") and `tasuku43` links in `backlog/README.md`.

## Acceptance criteria

- [ ] No page in `ja` or `en` uses the old command names, the source-build install or `tasuku43` URLs.
- [ ] The install section matches the released CLI assets and the version policy in `versions.html`.
- [ ] Every statement matches the specification and the released Actions (re-check the platform list against §19 and `release.yml`).
- [ ] Holds up in light and dark themes and at about 400px width without horizontal scrolling.
- [ ] The owner reviewed and approved the pages.

## Progress (2026-10-10)

The IMP-72 releases exist (CLI `v0.2.0`, `web/v0.1.0`, Actions `v0.1.0`), so the ticket is unblocked. All items under "Stale content to revise" are revised in both languages and the Action inputs and outputs were checked against the published `action.yml` files. The acceptance criteria stay open until review and owner approval. Not covered here: the `architecture` site still uses `site publish`, `registry register` and `registry unregister` in several pages; it needs its own ticket.
