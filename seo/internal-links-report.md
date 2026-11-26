# Internal links report

Run: 2026-11-26 | Focus: Ahrefs “only one dofollow incoming internal link” on `/guides/*`

## Why Ahrefs flagged these pages

Each guide lived behind a single crawlable dofollow inlink: the `/guides` index card list. Nav and footer only point at `/guides` (the hub), not at individual slugs. Guides linked **out** to tools via `relatedTools`, but tools, homepage, and `/vs` pages did not link **back**. Sibling guides also did not cross-link. Result: depth looked fine via the hub, but equity and discovery stalled at 1 inlink each.

| Target | Before (dofollow inlinks) | After (expected contextual sources) |
| --- | --- | ---: |
| `/guides/browser-pdf-privacy` | 1 (`/guides`) | `/guides`, `/`, 3 sibling guides, `/tools/{edit,merge,compress,sign}-pdf`, `/vs/ilovepdf`, `/vs/smallpdf`, body links from other guides |
| `/guides/merge-pdf-without-messing-up-order` | 1 | `/guides`, `/`, 3 siblings, `/tools/{merge,organize,rotate,compress}-pdf` |
| `/guides/esign-pdf-checklist` | 1 | `/guides`, `/`, 3 siblings, `/tools/{sign,edit,flatten}-pdf`, `/esign-compliance` |
| `/guides/free-pdf-editor-vs-paid` | 1 | `/guides`, `/`, 3 siblings, `/tools/{edit,merge,compress}-pdf`, both `/vs/*` pages, privacy guide body |

## What we changed

1. **Reverse tool → guide blocks** — `getGuidesForTool()` + “Related guides” on `ToolPageView`.
2. **Sibling “More guides”** on every `GuidePageView`.
3. **Homepage** — four direct guide URLs (not only `/guides`).
4. **`/vs/*`** — contextual links to free-vs-paid + privacy guides.
5. **`/esign-compliance`** — link to e-sign checklist (+ Sign PDF).
6. **Body anchors** — `[label](/path)` in guide copy, rendered via `LinkedText` (dofollow, descriptive anchors).

## Recrawl

Re-run the Ahrefs Site Audit (or Submit to IndexNow for the four URLs + homepage/tools touched). Expect the issue count to drop to 0 once the new HTML is crawled.

## Do not

- Rely on nav/footer alone for individual guide URLs
- Add `rel="nofollow"` on these internal links
- Dump links only into a bottom “related” block with no upper-body anchors (body links are already in place where topics match)
