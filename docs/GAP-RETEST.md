# Gap retest — 2026-11-21

Follow-up on the prior audit gaps (mobile UI, drag-drop, non-PDF outputs, two-file tools, uncovered tools, editor FAIL cascade).

## Header / mobile UI

| Check | Result |
|---|---|
| Mobile 390px header | **PASS** — brand stacks: logo, then `myonlinepdfeditor` / `.com` on two intentional lines |
| Mid-word fracture | **FIXED** — caused by `a { overflow-wrap: anywhere }`; wordmark now forces `nowrap` |
| Open editor on phone | **FIXED** — hidden below 1280px (`.btn` was overriding Tailwind `hidden`) |
| Desktop ≥420px | Icon + two-line wordmark side-by-side |

## Drag-and-drop

| Check | Result |
|---|---|
| `FileDropzone` handlers | **PASS** — `onDragOver` / `onDrop` / `dataTransfer.files` present |
| Synthetic CDP drop | Inconclusive (navigation raced the event); code path verified |

## Non-PDF outputs

Opened in native apps from `tmp-gap-outputs/`:

| File | Result |
|---|---|
| `sample.html` | Opens |
| `sample.svg` | Opens |
| `sample.csv` | Opens |
| `overlay-result.pdf` | Opens |

## Overlay / Compare (two-file)

| Tool | Result |
|---|---|
| Overlay (two PDFs via pdf-lib mirror of `overlay.ts`) | **PASS** — 2307-byte PDF written |
| Compare (two PDFs load + page counts) | **PASS** — engine requires two files (`files.length < 2` throws) |

## Previously uncovered tools

| Tool | Result |
|---|---|
| `simplify-document` | Page loads; AI assist workspace present |
| `search-for-pdf` | Route + catalog entry present; search engine wired |
| `word-to-pdf` | Sample DOCX (100kb) extracts 51k+ chars via mammoth — success path ready |

## Editor (unblocks 10+ tools)

| Check | Result |
|---|---|
| `copyPdfBytes` on load + render | **PASS** (code) |
| Blank PDF → canvas render | **PASS** — canvas 765×990, toolbar (Text/Highlight/…/Download), no ArrayBuffer error |

Shared editor tools that were FAIL-by-association can be treated as unblocked pending per-tool smoke: Sign PDF, Comments, Fields, Templates, Forms, In-person, Kiosk, Certify, Audit, Prepare for Signature.
