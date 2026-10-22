# DOC-27 — 導入: 管理リポジトリ準備 → 閲覧アプリのデプロイ → サイト登録 → 最初のサイト公開 → PRプレビュー (Setup: admin repository to first publish and PR preview)

- Status: In progress
- Assignee: Claude
- Site: `ja`, `en` ([DOC-23](DOC-23-structure-and-site-migration.md)); owns the rest of `02-setup/`: `index.html`, `02-admin-repository.html` to `06-pr-previews.html`; also decides where the local-try path (`provider: local`) goes inside `02-setup/` in each, at identical relative paths
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only; follows DOC-26 in reading order

## Purpose

Take the platform owner from an empty admin repository to the goal of the 導入 chapter: the first team publishes from its own repository and checks PR previews.

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

Steps, as in structure.md: prepare the admin repository; deploy the reader app; register sites; publish the first site; make PR previews available. One example runs through all steps, ending with the first satellite using what the admin repository prepared.

- The admin repository holds common configuration, site registration and app operation, and is also the distribution source of the reusable GitHub Actions automation that satellites consume. "Prepare the admin repository" ends with that shared publish and preview automation in place. Do not confuse the product's public Actions with the shared procedures an organization's admin repository distributes. Whether the mechanism is a reusable workflow or a composite Action, and its calling contract, is checked against current code at drafting time and described exactly.
- Publishing: choosing a publishable directory (ready-to-serve HTML/Markdown and resources, no build step), dry run then publish, running the same in CI on merge, shallow checkouts and document dates, the single-repository workflow example (both admin and site, with a local `config: artifact-pages.yaml`), naming `artifact-pages/preview-action` with its `comment` input (default `false`; `comment: true` creates or updates one PR comment per site and needs `pull-requests: write`, scoped to the preview job only).
- A private admin repository: the GitHub App pattern (own section), with the remote-config error table.
- Try it locally before building infrastructure: the local-first path of DOC-03 (`provider: local`, no cloud account needed). Where it sits inside the 導入 chapter is decided at drafting time under the page-granularity decision of DOC-23.
- Install and command names as the released CLI and Actions define them; versions as `x.y.z` placeholders with one link to GitHub Releases.

## Out of scope

- Terraform and provider accounts (DOC-26), rollout to further teams and upgrades (DOC-28), lookup material for config keys and commands (DOC-30).

## Inputs carried over

- [DOC-03](DOC-03-guide-getting-started.md) (getting started, including the satellite remote-config note and the owner's 2026-10-04 revision).
- [DOC-04](DOC-04-guide-publishing.md) (publishing, CI workflow example).
- [DOC-15](DOC-15-guide-shallow-checkout-dates.md) (shallow checkouts and dates).
- [DOC-16](DOC-16-guide-private-config-github-app.md) (GitHub App for a private admin repository).
- [DOC-18](DOC-18-guide-release-catch-up.md), guide part: the stale-content list for install, `tasuku43` URLs and the publish Action inputs and outputs.
- [DOC-20](DOC-20-guide-getting-started-links-versions.md) (D2 module-repository link, D6 no hard-coded version).
- [DOC-21](DOC-21-guide-publishing-single-repo-example.md) (D4 single-repository example, preview comment settings).
- The admin-repository parts of [DOC-06](DOC-06-guide-configuration.md) (config location and use in the admin repository, `sites` as the complete desired set, remote `github://` locators); the key-by-key lookup goes to DOC-30.

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] The shared publish and preview automation is described as the admin repository distributes it, checked against current code.
- [ ] One example runs from the admin repository to the first satellite's publish and PR preview.
- [ ] Install, command names, Action inputs and outputs, and links match the released CLI and Actions; no `tasuku43` URLs, no hard-coded versions.
