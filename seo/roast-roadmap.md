# SEO Roast Roadmap: myonlinepdfeditor.com (2026-11-22)

Verdict: Google and AI crawlers can reach you — the drag was English leakage in locales plus missing comparison money pages, not a robots block.

| # | Tier | Issue | Revenue impact | Fix | Owner | Status |
|---|---|---|---|---|---|---|
| 1 | REVENUE | Static `llms.txt` drift | Wrong catalog counts in AI answers | Dynamic `app/llms.txt/route.ts` | agent | shipped |
| 2 | REVENUE | English `shortName` in locale H2/upload/breadcrumb | Soft-duplicate locales | Prefer localized `name`; guide banner + JSON-LD localized | agent | shipped |
| 3 | REVENUE | Weak EN tool/home titles | Lower CTR on money queries | `toolSerpTitle` + keyword; home H1/title aligned to “Free online PDF editor” | agent | shipped |
| 4 | REVENUE | No `/vs/` pages | Miss “ilovepdf alternative” / “vs Smallpdf” demand | `/vs`, `/vs/ilovepdf`, `/vs/smallpdf` + footer + EN sitemap | agent | shipped |
| 5 | REVENUE | Footer → `/contact` without live page | Broken company links on deploy | Contact + disclaimer routes + company content | agent | shipped |
| 6 | REVENUE | 6 locales × full catalog sitemap | Crawl dilution | Founder prune after GSC; non-EN `/vs` already `noindex` | founder | next |
| 7 | COMPOUNDING | No AI-answer tracking | Blind citations | `aiseotracker` | founder | planned |
| 8 | COMPOUNDING | Link gap unknown | Cannot size RD gap | `ahrefs-research` when API available | founder | blocked |

## Fatal checks — empty

robots allow-all, soft 404s, hreflang, free pricing in HTML, guide `noindex` — all pass (2026-11-22).
