# DOC-15 — Guide: shallow checkouts and document dates

- Status: In progress
- Site: `guide`
- Page: revision of `ja/publishing.html` and `en/publishing.html` ("Dates and committers" bullet, the example workflow, and a new "Shallow checkouts and dates" subsection under CI)
- Audience: Adopters writing their publish workflow and deciding between a shallow checkout and a full clone
- Depends on: IMP-58 (released in v0.2.0, which has the `fetch-depth` and `checkout` inputs, verified); the example workflows pin `@v0.2.1`

Mirrors [DOC-15 in the product repository](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/backlog/documentation/DOC-15-guide-shallow-checkout-dates.md), which holds the scope and acceptance criteria. Facts: [specification](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/specification.md) (Git metadata, Shallow checkouts, Action checkout) and [TD13](https://github.com/tasuku43/git-artifact-pages/blob/main/docs/backlog/technical-design/TD13-shallow-clone-publish-and-preview.md).

## Draft of 2026-10-05

- Dates and committers bullet links to the new subsection.
- Example workflow: the `actions/checkout` step with `fetch-depth: 0` is removed (the Action's `checkout: auto` does a depth-1 checkout); a bullet explains the default.
- New "Shallow checkouts and dates" subsection: default behavior, carry-forward by content, the byte-identical-commit limit (revert, touch, content-preserving rewrite), the effect of changing depth, previews unaffected, and `fetch-depth: 0` as the opt-in.

## Acceptance criteria

- [ ] `ja` and `en` state the default shallow checkout, carry-forward by content, the limitation with the revert and no-op rewrite examples, and the effect of switching depth.
- [ ] The example workflow no longer implies that full history is required.
- [ ] Every statement matches the specification and TD13.
- [ ] Holds up in light and dark themes and at about 400px width without horizontal scrolling.
- [ ] The owner reviewed and approved the page.
