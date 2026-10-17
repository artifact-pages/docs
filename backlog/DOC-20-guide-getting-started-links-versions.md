# DOC-20 — Guide: getting started links and current versions

- Status: Superseded
- Superseded by: DOC-27 (2026-10-17, structure v3)
- Site: `guide`
- Page: revisions to `getting-started.html` in `ja/` and `en/`
- Audience: Admins adopting the product for the first time
- Depends on: [DOC-03](DOC-03-guide-getting-started.md); step 1 link superseded by [DOC-14](DOC-14-guide-provider-setup.md) once it exists
- Severity: minor and papercut

Findings D2 and D6 of cold-start trial A (2026-10-14), where a fresh agent with no prior context adopted the product on Cloudflare using only public material.

## Scope

- (D2) Step 1 already links the [Cloudflare deployment guide](https://github.com/artifact-pages/artifact-pages/blob/main/docs/guides/cloudflare-deployment.md) (`sites/guide/{en,ja}/getting-started.html`, step 1 note), but the trial agent did not find that link in the rendered page. Add the missing link to the module repository ([terraform-cloudflare-artifact-pages](https://github.com/artifact-pages/terraform-cloudflare-artifact-pages)). Once DOC-14 exists, DOC-14 supersedes these links.
- (D6) The page still hard-codes `VERSION=0.2.0`, against the convention set by [DOC-03](DOC-03-guide-getting-started.md) and the [README](README.md) index note: an `x.y.z` placeholder plus one link to GitHub Releases, with no hard-coded versions. Apply that convention to the example.

## Acceptance criteria

- [ ] Step 1 links the module repository in both languages, next to the existing Cloudflare deployment guide link (until DOC-14 replaces them).
- [ ] The example uses an `x.y.z` placeholder instead of `0.2.0`, with one link to GitHub Releases, in both languages.
- [ ] Renders in light and dark themes and at ~400px width without page-level horizontal scrolling.
- [ ] The owner reviewed and approved the revision.

## Notes

- Filed 2026-10-14 from cold-start trial A findings D2 and D6.
