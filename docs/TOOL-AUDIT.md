# myonlinepdfeditor.com tool audit — desired vs add

Status after Working/Download UI fix (2026-11-19).

Legend for **Status**:
- `working` — runs in browser and downloads a real result
- `partial` — runs, but output is weaker than the tool name suggests
- `guidance` — downloads advice/checklist only (not a true conversion)
- `facade` — UI exists; behavior is checklist / mailto / re-save

## Shared UX (all tools)

| Desired | Add / done |
|---|---|
| Clear **Working…** state while processing | Done — `ToolResultBanner` spinner |
| Clear **Download ready** + **Download again** | Done — banner keeps last file blob |
| Honest empty Options panel | Done — “No extra options…” copy |
| Organize = drag thumbnails | Done — `OrganizePdfPanel` |
| Catalog search / filter | Done — `ToolsCatalog` |
| Locale UI strings (EN/ES/DE/FR/pt-BR/JA) | Done — `dict.workspace` |

---

## Convert

| Tool | Desired | Status | What to add |
|---|---|---|---|
| word-to-pdf | DOCX → real PDF | working | Layout fidelity still limited |
| txt/html/csv/rtf/markdown-to-pdf | Text → PDF | working | — |
| png/jpg/webp/gif/bmp/images/heic/tiff/svg-to-pdf | Images → PDF | working / partial | HEIC depends on browser decode |
| ppt-to-pdf | Slides → PDF | partial | Text extract only, not visual slides |
| excel/csv-to-pdf | Sheets → PDF | working | — |
| pdf-to-jpg/png/tiff | PDF → images | working | TIFF is PNG-named workaround |
| pdf-to-word | PDF → Word | partial | Downloads **.txt** — need real .docx or rename |
| pdf-to-excel | PDF → Excel | partial | Downloads **.csv** — OK if labeled |
| pdf-to-text/html/md/svg/epub | PDF → format | working / partial | Layout loss expected |
| odt/ods/odp/odg-to-pdf | ODF → PDF | partial | Text-forward |
| epub/eml/xml-invoice/zip-to-pdf | → PDF | working / partial | — |
| hwp/pages/ofd/pub/ps/udf-to-pdf | Exotic → PDF | guidance | Keep as guidance or drop from Convert |
| heic/webp/svg image converters | Image convert | working | — |
| compress-images | Shrink images | working | — |

## Edit & annotate

| Tool | Desired | Status | What to add |
|---|---|---|---|
| edit-pdf / fields / comments / templates / forms | Visual editor | working | Fillable widgets still annotation-like |
| create-pdf | Blank PDF | working | — |
| merge/split/rotate/reorder/delete/extract/reverse | Page ops | working | Visual page picker for delete/reorder |
| organize-pdf | Drag sort + delete | working | Cap at 60 thumbs (shown) |
| compress/page-numbers/watermark/crop/grayscale/repair/metadata | Edit ops | working | Compress quality controls |
| redact | True redact | partial | Page blackout, not search-term redact |
| invert/n-up/overlay/page-size/rasterize/poster/bookmark/doc-info | Advanced | working | — |

## Sign & send

| Tool | Desired | Status | What to add |
|---|---|---|---|
| sign-pdf | Draw/type/upload sign | working | — |
| send-for-signature / fields | Place fields | partial | No hosted send |
| envelopes / bulk / in-person / kiosk | Send + track | facade | Checklist/editor only — rename or link real Ink |
| verify signatures | Verify crypto | guidance | — |

## Collaborate & share

| Tool | Desired | Status | What to add |
|---|---|---|---|
| share-via-link | Hosted link | facade | Re-download + honest note |
| share-via-email | Email PDF | partial | mailto + download |
| fax | Fax gateway | facade | Re-download for 3rd-party fax |
| pdf-status | Track status | working | Local-only |
| embed / pdf-button | Snippet | working | — |

## AI

| Tool | Desired | Status | What to add |
|---|---|---|---|
| assistant / summarize / simplify / ask | Local text help | partial | Not cloud AI — labeled local |
| translate-pdf | Translation | facade | Extract only for external MT |

## Other

| Tool | Desired | Status | What to add |
|---|---|---|---|
| unlock/protect/password-gen | Security | working | — |
| download/export/print | Utility | working / facade | Download/export = re-save |
| compare/analyze/statistics | Reports | working | — |
| accessible / validate-* / e-invoice | Compliance | guidance | — |

---

## Test checklist (manual)

1. `/tools/create-pdf` → Create → see Working → Download ready → Download again works  
2. `/tools/merge-pdf` → 2 PDFs → Run → download `myonlinepdfeditor.com-merged.pdf`  
3. `/tools/sign-pdf` → open PDF → Download PDF → banner shows  
4. `/tools/organize-pdf` → thumbs drag + export  
5. `/tools` → search “merge” filters catalog  
6. Language ES/DE → workspace strings switch  
