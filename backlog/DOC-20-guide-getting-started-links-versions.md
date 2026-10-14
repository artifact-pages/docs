# DOC-20 — Guide: getting started links and current versions

- Status: Open
- Site: `guide`
- Page: revisions to `getting-started.html` in `ja/` and `en/`
- Audience: Admins adopting the product for the first time
- Depends on: [DOC-03](DOC-03-guide-getting-started.md); step 1 link superseded by [DOC-14](DOC-14-guide-provider-setup.md) once it exists
- Severity: minor and papercut

Findings D2 and D6 of cold-start trial A (2026-10-14), where a fresh agent with no prior context adopted the product on Cloudflare using only public material.

## Scope

- (D2) Step 1 says "see Cloudflare deployment in the product repository" with no link. Link the [Cloudflare deployment guide](https://github.com/artifact-pages/artifact-pages/blob/main/docs/guides/cloudflare-deployment.md) and the module repository ([terraform-cloudflare-artifact-pages](https://github.com/artifact-pages/terraform-cloudflare-artifact-pages)). Once DOC-14 exists, DOC-14 supersedes this link.
- (D6) The example pins CLI `0.2.0`. Use a current version and say where to find the current versions (GitHub Releases).

## Acceptance criteria

- [ ] Step 1 links the Cloudflare deployment guide and the module repository in both languages (until DOC-14 replaces them).
- [ ] The CLI version in the example is current, and the page says to find current versions on GitHub Releases.
- [ ] Renders in light and dark themes and at ~400px width without page-level horizontal scrolling.
- [ ] The owner reviewed and approved the revision.

## Notes

- Filed 2026-10-14 from cold-start trial A findings D2 and D6.
