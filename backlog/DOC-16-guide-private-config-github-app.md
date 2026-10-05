# DOC-16 — Guide: GitHub App for private configuration repositories

- Status: In progress
- Site: `guide`
- Page: new section "A private admin repository" in `ja/configuration.html` and `en/configuration.html` (`#remote-private`); pointer from `publishing.html`
- Audience: Adopters whose admin (config) repository is private and whose site repositories publish through `github://` config locators
- Depends on: T23 (Done); the shallow-fetch notes need v0.2.0 (`checkout` and `fetch-depth` inputs, verified); the error-message table needs v0.2.1 (released, pinned by this repository's workflows)

Mirrors [DOC-16 in the product repository](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/backlog/documentation/DOC-16-guide-private-config-github-app.md). Facts: [T23](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/backlog/verification/T23-private-repository-topology.md), [ISSUE-071](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/backlog/issues/ISSUE-071-remote-config-auth-error-unclear.md), the specification (config locator, Action checkout) and [GitHub Actions guide](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/guides/github-actions.md); the YAML mirrors `.github/workflows/publish.yml` and `preview.yml` of this repository.

## Draft of 2026-10-05

- Chosen page: `configuration.html`, as its own h2 section after "Remote config".
- Steps to create and install the App, store the App ID and key, mint a per-job token and pass it as `github-token`; the separate workflow token for the shallow fetch; the extra scope of preview jobs; why not a personal access token (the fine-grained token route is stated as unverified); GitHub Free repository secrets.
- Troubleshooting table with the remote-config error messages added by ISSUE-071 (unit-tested with a stub API there; the 404 message for a private repository was also verified on a hosted runner with v0.2.1).

## Acceptance criteria

- [ ] `ja` and `en` describe the pattern with a workflow excerpt matching this repository's workflows.
- [ ] Every statement matches T23, ISSUE-071 and the specification.
- [ ] Holds up in light and dark themes and at about 400px width without horizontal scrolling.
- [ ] The owner reviewed and approved the page.
