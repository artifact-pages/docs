# DOC-30 — リファレンス (Reference)

- Status: Open
- Site: see [DOC-23](DOC-23-structure-and-site-migration.md) (site IDs and URLs undecided)
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only; the reader app part follows the shipped UI of ISSUE-107, ISSUE-108 and ISSUE-109

## Purpose

Let readers look up exact operations, setting values, inputs and outputs, permissions, URLs, storage and version support. The reader app is covered too. How to use the admin repository's shared procedures belongs to DOC-27 and DOC-28; the specification of the underlying product Actions and the like belongs here.

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

Chapter contents, as in structure.md: README (where to look by purpose); 閲覧アプリ (reader app): 画面と操作 (screens and operations), キーボードショートカット (keyboard shortcuts), 検索の対象と範囲 (what search covers), ページ・見出し・プレビューのURL (page, heading and preview URLs), ピン留め・閲覧履歴などの保存と扱い (how pins, history and similar are stored and handled); 設定ファイル (config file); CLI; GitHub Actions; Terraform; バージョンと互換性 (versions and compatibility).

- Reader app facts follow the released UI (ISSUE-107/108/109) and are checked against the web source.
- CLI: command names as the specification's command tree defines them (`site sync`, `registry sync`; no separate unregister).
- Config file: location and precedence, `schemaVersion`, `provider` blocks (`local`, AWS, Cloudflare; credentials never in YAML), `sites`, layering, remote `github://` locators, the `cli` and `web` pin keys.
- GitHub Actions: inputs and outputs as the released `action.yml` files define them (publish: `ref`, `checkout`, `fetch-depth`, `github-token`, `cli-version`, `publish-on`, `summary`; outcomes per the released Action).

## Out of scope

- Step-by-step procedures (DOC-26 to DOC-28), reasoning (DOC-29).

## Inputs carried over

- [DOC-06](DOC-06-guide-configuration.md) (configuration), except its admin-repository parts that go to DOC-27.
- The compatibility part of [DOC-17](DOC-17-guide-versions.md) (what has a version, how Actions and sites follow, the version series).
- The command-name parts of [DOC-18](DOC-18-guide-release-catch-up.md).
- Lookup-style facts in [DOC-05](DOC-05-guide-reading.md) (shortcuts, URL forms, search scope, saved state); DOC-05 itself is superseded by DOC-25.

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] Reader app pages cover all five listed topics and match the released UI.
- [ ] CLI and Actions pages match the specification command tree and the released `action.yml` files.
