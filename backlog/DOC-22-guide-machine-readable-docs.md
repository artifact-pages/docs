# DOC-22 — Docs: machine-readable access to the sites

- Status: Open
- Site: `guide` and `architecture`
- Page: none yet; an idea to decide with the owner, not a commitment
- Audience: Tools and agents reading the documentation
- Depends on: owner decision
- Priority: low (papercut)

Finding D7 of cold-start trial A (2026-10-14), where a fresh agent with no prior context adopted the product on Cloudflare using only public material.

## Observation

The docs site is an SPA with page content in iframes, so tools and agents struggled to read it. The raw `/_artifacts/<site>/<lang>/<page>.html` pages worked.

## Options to consider

- Publish a plain index such as `llms.txt` that lists the pages.
- Link the raw `/_artifacts/<site>/<lang>/<page>.html` pages from the guide.
- Do nothing for now.

Check first that the options match the product's behavior; if the right fix is in the reader, file it in the product repository instead.

## Acceptance criteria

- [ ] The owner decided which option to take, or to close the ticket.
- [ ] If an option is taken, it is implemented and verified from a tool that cannot run the SPA.

## Notes

- Filed 2026-10-14 from cold-start trial A finding D7.
