# DOC-21 — Guide: publishing from a single repository and direct Action use

- Status: Open
- Site: `guide`
- Page: revisions to `publishing.html` in `ja/` and `en/`
- Audience: Teams publishing from a repository, including adopters who are both admin and site
- Depends on: [DOC-04](DOC-04-guide-publishing.md)
- Severity: minor

Finding D4 of cold-start trial A (2026-10-14), where a fresh agent with no prior context adopted the product on Cloudflare using only public material.

## Scope

- Add a workflow example for a single repository that is both admin and site, with a local `config: artifact-pages.yaml`.
- Name the preview Action (`artifact-pages/preview-action`) explicitly. Its `comment` input defaults to `false`; with `comment: true` it creates or updates one PR comment per site, and it needs `pull-requests: write` (verified against its `action.yml`). Scope `comment: true` and `pull-requests: write` to the preview job only. The page implies the comment is on.

## Acceptance criteria

- [ ] Both languages include the single-repository workflow example with a local `config: artifact-pages.yaml`, matching the Action's inputs.
- [ ] Both languages name `artifact-pages/preview-action` and state that its preview comment needs `comment: true` and `pull-requests: write`, scoped to the preview job only.
- [ ] Renders in light and dark themes and at ~400px width without page-level horizontal scrolling.
- [ ] The owner reviewed and approved the revision.

## Notes

- Filed 2026-10-14 from cold-start trial A finding D4.
