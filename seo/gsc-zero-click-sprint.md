# GSC zero-click sprint (2026-11-28)

All listed queries: impressions > 0, clicks = 0. Priority = impressions × nearness to page 1.

## Cluster → page map

| Cluster | Top locales | Impr. band | Target URL |
|---|---|---|---|
| BMP → PDF | ja, pt | ~70+ | `/ja/tools/bmp-to-pdf`, `/pt-BR/tools/bmp-to-pdf` |
| Fillable / editável / 入力可能 | ja, pt, de, en | ~150+ | `add-fillable-fields`, `create-fillable-forms` |
| ZIP → PDF | pt, fr | ~40 | `/pt-BR/tools/zip-to-pdf`, `/fr/tools/zip-to-pdf` |
| Redact / 墨消し / schwärzen | ja, de | ~50 | `redact-pdf` |
| Edit PDF online | ja, pt, de, es | ~80 | `edit-pdf` |
| Images / JPG / PNG → PDF | ja | ~60 | `jpg-to-pdf`, `png-to-pdf`, `images-to-pdf` |
| Page size | ja, de | ~25 | `change-page-size` |
| Page duplicate | ja | ~20 | `reorder-pdf` + feature `duplicate-pages-in-a-pdf` |
| visual pdf (pos **8.5**) | en | 17 | `/en/tools/edit-pdf` (primary keyword) |
| HEIC / RTF / ODT / GIF / WebP | pt, fr, de | ~40 | matching converters |
| Signature / stamp | multi | ~20 | `sign-pdf`, `send-for-signature`, `watermark-pdf` |
| KI zusammenfassen | de | ~15 | `summarize-key-points` |
| Validator / チェック | pt, ja | ~15 | `validate-pdfa` |

## Shipped this pass

1. Locale-aware `toolSerpTitle` — uses `keywords[0]` for JA/PT/DE/FR (was EN-only).
2. Locale-aware `toolMetaDescription` — no more English “Free, no signup” leakage on non-EN SERPs.
3. Retargeted names / summaries / keywords for top tools in `ja`, `pt-BR`, `de`, `fr` + EN catalog keywords.
4. JA feature title for page duplication queries.

## Next 14 days (manual)

- [ ] Deploy + Request indexing in GSC for the URLs above (especially `/ja/tools/bmp-to-pdf`, fillable JA/PT, ZIP PT/FR, redact DE/JA, `/tools/edit-pdf`).
- [ ] Internal links: from high-traffic JA/PT guides → those money tools (3–5 links each).
- [ ] Watch CTR on `visual pdf` first — already pos ~8.5; title now leads with that phrase.
- [ ] Ignore vanity long-tails at pos 90–100 until page-1 movers improve.

## Expected signal

- Week 1–2: title/meta refresh → CTR lift on impressions you already get (even at pos 30–50).
- Week 2–4: query→page alignment may pull BMP / ZIP / fillable clusters toward page 2–3 if content depth holds.
