# DOC-18 — Guide: catch up with the split release (command names, install, links)

- Status: Blocked
- Site: `guide`
- Page: revisions to `getting-started.html`, `publishing.html`, `configuration.html` and `what-is-git-artifact-pages.html` in `ja/` and `en/`
- Audience: Everyone following the guide end to end
- Depends on: product IMP-72 (first releases of the split CLI, web and Action series). Blocked until those releases exist, because the install section depends on their shape.

Found while drafting [DOC-17](DOC-17-guide-versions.md): `versions.html` uses the current names and release shape, while the older pages do not, so the guide currently mixes both. Facts: product [specification](https://github.com/artifact-pages/artifact-pages/blob/main/docs/specification.md) §19 ("Released CLI", "Action repositories") and §22 (command tree), the released assets of IMP-72, and the published Action repositories' `action.yml`.

## Stale content to revise

- Command names: `site publish` → `site sync`; `registry register` / `registry unregister` → `registry sync` (the specification has no separate unregister command). Appears in `getting-started`, `publishing` (headings, flow labels, meta description, lead), `configuration` and `what-is-git-artifact-pages`, including diagram text and captions.
- Install section of `getting-started.html`: it says the CLI is built from source with no standalone binary and points `mise` / `go install` at `github.com/tasuku43/git-artifact-pages/cli/cmd/artifact-pages`. Releases now ship CLI binaries for linux/darwin on amd64/arm64 with checksums, and the module is `github.com/artifact-pages/artifact-pages`.
- Old repository URLs: `tasuku43/git-artifact-pages` (including the Releases link and links to product files whose paths may have moved), `tasuku43/artifact-pages-docs` (now `artifact-pages/docs`), and the `tasuku43/artifact-pages-admin` name in the error-message sample of `configuration.html` (check it against the current message).
- `publishing.html` Action inputs list: add `ref`, `checkout`, `fetch-depth`, `github-token` and `cli-version` as the published `publish-action` defines them, and confirm its current outputs.

## Acceptance criteria

- [ ] No page in `ja` or `en` uses the old command names, the source-build install or `tasuku43` URLs.
- [ ] The install section matches the released CLI assets and the version policy in `versions.html`.
- [ ] Every statement matches the specification and the released Actions.
- [ ] Holds up in light and dark themes and at about 400px width without horizontal scrolling.
- [ ] The owner reviewed and approved the pages.
