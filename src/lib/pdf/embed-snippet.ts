export function pdfEmbedSnippet(fileName: string): string {
  const safe = fileName.replace(/[<>"]/g, "") || "document.pdf";
  return `<!-- myonlinepdfeditor.com PDF embed / button -->
<div class="myonlinepdfeditor.com-pdf-embed" style="max-width:720px;margin:1rem auto;font-family:system-ui,sans-serif">
  <a href="./${safe}"
     style="display:inline-block;padding:.75rem 1.25rem;background:#5A0F2E;color:#F2D7D9;text-decoration:none;border-radius:8px">
    Open PDF: ${safe}
  </a>
  <iframe src="./${safe}"
          title="${safe}"
          style="width:100%;height:70vh;border:1px solid #C76B7A;border-radius:8px;margin-top:1rem"
          loading="lazy"></iframe>
</div>
<!-- Host ${safe} next to this HTML, or replace href/src with your CDN URL. -->
`;
}

export function accessiblePdfChecklist(fileName: string): string {
  return `myonlinepdfeditor.com Accessible PDF checklist for: ${fileName}

1. Use tagged/structured PDF from Word/LibreOffice when possible (Export → PDF/UA).
2. Set document title and language in Change PDF Doc Info.
3. Ensure text is extractable (Readable PDF / OCR for scans).
4. Add bookmarks for long docs (Bookmark PDF).
5. Check color contrast; avoid text-as-image for body copy.
6. Provide alt text for figures in the authoring app before export.
7. Test with a screen reader or PDF accessibility checker.

myonlinepdfeditor.com prepares supporting exports; full PDF/UA certification needs an accessibility validator.
`;
}
