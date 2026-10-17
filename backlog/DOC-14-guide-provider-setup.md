# DOC-14 — Guide: provider setup

- Status: Superseded
- Superseded by: DOC-26 (2026-10-17, structure v3)
- Site: `guide`
- Page: one page per provider or one page with a section each (decide when drafting), for example `ja/setup-cloudflare.html`, `en/setup-cloudflare.html`
- Audience: Admins preparing a delivery target
- Depends on: the product's per-provider Terraform documentation

## Purpose

Step 1 of [getting started](DOC-03-guide-getting-started.md) ("Set up the delivery target") stays short. This page holds the detailed, provider-specific setup for AWS and Cloudflare: storage, hostname, routing and cache rules, preview retention, and the credentials for the admin and team jobs.

## Scope

- Cloudflare: R2 bucket, custom domain, delivery and retention Terraform modules, R2 keys and the API token.
- Cloudflare prerequisite (D1): a new Cloudflare account must enable R2 in the dashboard first, and Cloudflare may ask for a payment method. Until then bucket creation fails with 403 code 10042. Right after enabling, the S3 endpoint can fail TLS for a few minutes.
- Cloudflare single-token credential recipe (D3): which permission groups the token needs and the exact R2 bucket resource scope, written out. In cold-start trial A the agent had to guess the scope string, and the recipe existed only in the product repository's guide.
- Cloudflare hostname restriction (D5): restricting the hostname to a team with the module's `waf_custom_rules` presets (`ip_allowlist`, `https_only`) and the extra token permission they need (Zone WAF Edit); check your own IP before applying; Cloudflare Access as the alternative. The page must say that the `ip_allowlist` and `https_only` presets are network filters (CIDR, HTTPS-only), not identity authentication; team identity needs Cloudflare Access or another authentication policy, and the module does not configure authentication. In the trial the agent had to read the module's `variables.tf` to learn the schema.
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
- [ ] (D1) The Cloudflare section states the R2 enablement prerequisite, the payment method, the 403 code 10042 symptom and the short TLS delay.
- [ ] (D3) The Cloudflare section gives the single-token recipe with the permission groups and the exact R2 bucket resource scope.
- [ ] (D5) The Cloudflare section explains `waf_custom_rules` presets `ip_allowlist` and `https_only`, the Zone WAF Edit permission, checking your own IP first, Cloudflare Access as the alternative, and states that the presets are network filters (CIDR, HTTPS-only), not identity authentication, and that the module does not configure authentication.
- [ ] Getting started step 1 links here instead of the product repository's guide.
- [ ] Renders in light and dark themes and at ~400px width without page-level horizontal scrolling.
- [ ] The owner reviewed and approved the page.

## Notes

- Opened 2026-10-04 when getting started switched its walkthrough from the `local` provider to Cloudflare. Until this page exists, step 1 links to the product repository's Cloudflare guide.
- Cold-start trial A (2026-10-14) findings D1, D3, D5 added.
