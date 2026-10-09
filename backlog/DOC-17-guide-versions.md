# DOC-17 — Guide: pinning and upgrading versions

- Status: In progress
- Assignee: Claude
- Site: `guide`
- Page: new `versions.html` in `ja/` and `en/` (title "Pinning and upgrading versions" / 「バージョンの固定と更新」), placed between `configuration.html` and `access-and-trust.html` in the pager chain; revisions to `getting-started.html`, `what-is-git-artifact-pages.html`, `configuration.html` and `publishing.html`
- Audience: Admins who run a deployment (the admin repository) and need to choose, check and move the CLI and reader app versions
- Depends on: product IMP-69 (config pins, version records, `config check`; merged) and IMP-70 (bootstrap CLI, `--cli-version`; product PR #58). The behavior described is not released yet, so merging this ticket's pull request publishes it before it exists in a release; the owner decides when it ships.

Product-side item: IMP-71 (operator guide part). Facts: product `docs/specification.md` §5.3 ("Version records", "Upgrading versions"), §19 ("Released CLI", "CLI selection", "Released web bundle", "Action repositories"), §22 (config keys `cli` and `web`, `config check`, `app deploy`, `--accept-breaking`, exit codes), and [TD17](https://github.com/artifact-pages/artifact-pages/blob/main/docs/backlog/technical-design/TD17-config-pinned-component-versions.md) for the design intent. The page states nothing the specification does not state.

## Goal

An operator can pin the CLI and the reader app in the admin config, understand how sites and Actions follow, upgrade normally, handle a breaking format change in the right order, run another CLI for one run, and adopt pinning on an existing deployment.

## Scope of the draft of 2026-10-09

- New page sections: what has a version (CLI, `web`, each Action and their tag series), pinning in the config (exact versions, one layer, what each key selects), how sites follow, what the Action version means now (bootstrap CLI and `cliRange`), the normal upgrade, the breaking upgrade order, the one-off override (`--cli-version`, `ARTIFACT_PAGES_CLI_VERSION`, `cli-version`), and deployments without pins.
- Existing pages revised (both languages) because they described one product version:
  - `getting-started.html`: the "ONE VERSION" callout is replaced by a pointer to the new page; `web.version` is added to both config examples and to the step 2 and step 3 text.
  - `what-is-git-artifact-pages.html`: the `app deploy` note names `web.version` instead of the CLI's version.
  - `configuration.html`: `cli`/`web` row in the key table, the at-most-one-layer rule, the closing `app deploy` note, the example Action reference, and the pager (next is the new page).
  - `publishing.html`: the Action description and pinning bullet (the Action version no longer decides the CLI; mention `cli-version`), the other-Actions bullet and the example Action references (`artifact-pages/publish-action@vX.Y.Z`).
  - `access-and-trust.html`: the previous link of the pager only.
- Placeholders follow the owner direction recorded in DOC-02/03/04/06: `x.y.z` for versions and `vX.Y.Z` for tags, with one link to GitHub Releases; no hard-coded release.
- Left out because the specification does not state it: rollback to an earlier version (TD17 says a rollback is a revert of the config, but the specification does not describe it).

## Known gaps / follow-up

Handle in a separate ticket after the first post-split release (IMP-72):

- Old command names in the other guide pages: `site publish`, `registry register`, `registry unregister`. The new page uses the specification's `site sync` and `registry sync` and says so once.
- The install section: a source build from the `tasuku43/git-artifact-pages` path and "no standalone binary to download", while the specification now has released CLI binaries.
- Old `tasuku43/...` URLs (install commands, Releases links in the install text).
- The input list of the publish Action in `publishing.html`, to be checked against the released Action.

## Acceptance criteria

- [ ] `ja` and `en` describe pinning, the normal and breaking upgrade orders, the override and the legacy flow as the specification does.
- [ ] Every statement matches the specification (§5.3, §19, §22); nothing about rollback is claimed.
- [ ] The revised pages no longer say that the CLI's version picks the reader app, or that the Action version picks the CLI.
- [ ] Holds up in light and dark themes and at about 400px width without horizontal scrolling (markup reuses existing classes; no new CSS).
- [ ] The behavior is released before this ships, or the owner accepts publishing it ahead of the release.
- [ ] The owner reviewed and approved the pages.
