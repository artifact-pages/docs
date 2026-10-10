# DOC-14 — Guide: provider setup

- Status: In progress
- Assignee: Claude
- Site: `guide`
- Page: one page per provider or one page with a section each (decide when drafting), for example `ja/setup-cloudflare.html`, `en/setup-cloudflare.html`
- Audience: Admins preparing a delivery target
- Depends on: the product's per-provider Terraform documentation

## Purpose

Step 1 of [getting started](DOC-03-guide-getting-started.md) ("Set up the delivery target") stays short. This page holds the detailed, provider-specific setup for AWS and Cloudflare: storage, hostname, routing and cache rules, preview retention, and the credentials for the admin and team jobs.

## Scope

- Cloudflare: R2 bucket, custom domain, delivery and retention Terraform modules, R2 keys and the API token.
- AWS: S3, CloudFront, and the IAM roles for the admin and team jobs.
- Point to the product's Terraform documentation for every input; do not restate module internals.

## Out of scope

- `artifact-pages.yaml` keys (Configuration, DOC-06).

## Primary sources

- [Cloudflare deployment](https://github.com/artifact-pages/artifact-pages/blob/main/docs/guides/cloudflare-deployment.md) and the Terraform modules under `terraform/modules/` in the product repository.
- The per-provider Terraform documentation, once the product publishes it.

## Acceptance criteria

- [ ] Both languages exist with matching structure and a working language switch.
- [ ] Every resource, input and permission matches the product's Terraform documentation.
- [ ] Getting started step 1 links here instead of the product repository's guide.
- [ ] Renders in light and dark themes and at ~400px width without page-level horizontal scrolling.
- [ ] The owner reviewed and approved the page.

## Notes

- Decision 2026-10-10: one page per provider; Cloudflare first (`setup-cloudflare.html`, both languages); AWS gets its own page with milestone M2. The Cloudflare draft says AWS setup is not yet covered.
- The Terraform module source in the draft is the git form `git::https://github.com/artifact-pages/terraform-cloudflare-artifact-pages.git?ref=v0.1.0`, marked with `<!-- DOC-14: module source pending first module release -->` in both pages. Replace it when IMP-64 publishes the first module release and again when Registry publication happens.
- Module README links point at the monorepo (`terraform/modules/cloudflare/README.md`) until the package repository is synced; each is marked `<!-- DOC-14: switch to package README after first module release -->`. Switch them after the first module release.
- The Cloudflare page is a side page under getting started step 1 and has no previous/next pager.
- Opened 2026-10-04 when getting started switched its walkthrough from the `local` provider to Cloudflare. Until this page exists, step 1 links to the product repository's Cloudflare guide.
