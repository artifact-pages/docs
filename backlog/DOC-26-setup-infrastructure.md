# DOC-26 — 導入: インフラを構築する (Setup: build the infrastructure, Cloudflare and AWS)

- Status: Open
- Site: `ja`, `en` ([DOC-23](DOC-23-structure-and-site-migration.md)); owns `02-setup/01-infrastructure/` (`index.html`, `aws.html`, `cloudflare.html`) in each, at identical relative paths
- Depends on: [DOC-23](DOC-23-structure-and-site-migration.md) for publication only

## Purpose

Take a platform owner through building the delivery environment on Cloudflare or AWS with Terraform, as the first step of the 導入 chapter (the chapter README states the target state, the overall flow and the preparation needed; page granularity per DOC-23).

## Scope

Scope wording comes from [structure.md](structure.md) (owner-agreed 2026-10-17), which wins over older tickets where they conflict. Page granularity, filenames and manuscript format are decided in DOC-23; this ticket fixes the content of the chapter, not how many files it takes. Facts are checked against primary sources (specification, current code, CLI help) at drafting time; agreeing the structure did not verify current behavior.

- Cloudflare and AWS, each: storage, hostname, routing and cache rules, preview retention, and the credentials for the admin and team jobs. Point to the product's Terraform documentation for every input; do not restate module internals.
- Cloudflare prerequisites and recipes, carried from DOC-14 in full: (D1) R2 must be enabled in the dashboard first, Cloudflare may ask for a payment method, bucket creation fails with 403 code 10042 until then, and the S3 endpoint can fail TLS for a few minutes right after enabling; (D3) the single-token credential recipe with the permission groups and the exact R2 bucket resource scope; (D5) hostname restriction with the module's `waf_custom_rules` presets (`ip_allowlist`, `https_only`), the extra Zone WAF Edit permission, checking your own IP before applying, Cloudflare Access as the alternative, and the statement that the presets are network filters (CIDR, HTTPS-only), not identity authentication, and that the module does not configure authentication.
- New item: show both Terraform modules by their public Terraform Registry address (the `artifact-pages` namespace; both modules are published), with version pinning. The product's `docs/guides/aws-deployment.md` already uses the Registry address; `docs/guides/cloudflare-deployment.md` does not yet (consider filing that in the product repository). Take the exact addresses and current versions from the live Registry listing at drafting time. The product repository's root README still says the modules are not published and points to Git sources; that is stale and must be fixed in the product repository (file it there) before or alongside this ticket.
- Input material, not to merge as is: the unmerged draft branch `claude-doc-14-cloudflare` of this repository (2026-10-10).

## Out of scope

- The config file keys (DOC-30), the admin repository and later steps (DOC-27).

## Inputs carried over

- [DOC-14](DOC-14-guide-provider-setup.md) in full (scope, D1/D3/D5 findings, acceptance criteria).

## Acceptance criteria

- [ ] Both languages exist with matching structure, localized H1 and `<title>`, and a working language switch.
- [ ] Every command, flag, path, number and behavior matches the cited primary sources and the current CLI help; nothing is stated that the specification does not state.
- [ ] Renders in light and dark themes and at ~400 px width without page-level horizontal scrolling (checked in the markup and styles).
- [ ] The owner reviewed and approved the pages on the real site.
- [ ] (D1) The Cloudflare section states the R2 enablement prerequisite, the payment method, the 403 code 10042 symptom and the short TLS delay.
- [ ] (D3) The Cloudflare section gives the single-token recipe with the permission groups and the exact R2 bucket resource scope.
- [ ] (D5) The Cloudflare section explains the `waf_custom_rules` presets, the Zone WAF Edit permission, checking your own IP first, Cloudflare Access as the alternative, and that the presets are network filters, not identity authentication.
- [ ] Both Terraform modules are shown with their Terraform Registry address and a pinned version, matching the Registry listing.
- [ ] Every resource, input and permission matches the product's Terraform documentation.
