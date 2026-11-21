import { textToPdf } from "./text-to-pdf";

const ADVICE: Record<string, string> = {
  hwp: "HWP (Hangul) is not decoded in-browser. Open in Hancom Office or LibreOffice and export to PDF, or save as DOCX then use Word to PDF.",
  pages: "Apple Pages files are not parsed here. In Pages: File → Export To → PDF, or export Word and use Word to PDF.",
  ofd: "OFD (Open Fixed-layout Document) needs specialized converters. Use an OFD reader to export PDF before uploading.",
  pub: "Microsoft Publisher (.pub) is not supported in the browser. Export PDF from Publisher or convert via LibreOffice.",
  publisher: "Microsoft Publisher (.pub) is not supported in the browser. Export PDF from Publisher or convert via LibreOffice.",
  ps: "PostScript (.ps) conversion needs Ghostscript-class tooling. Convert to PDF on desktop, then use myonlinepdfeditor.com tools.",
  udf: "UDF document format is not supported here. Export to PDF or DOCX from the authoring app first.",
  straighten:
    "Use Straighten PDF for small skew (a few degrees). If the page is sideways or upside-down, use Rotate PDF (90°/180°/270°) first.",
  "validate-pdfa":
    "Full PDF/A validation requires veraPDF-class checkers. Use PDF to PDF/A prep, then validate with an external PDF/A tool.",
  "verify-pdf-signatures":
    "Cryptographic signature verification needs trusted certificate stores. Open the PDF in Adobe Reader or a signing suite to validate signatures.",
  "pdf-to-e-invoice":
    "Structured e-invoice export (ZUGFeRD/Factur-X/UBL) needs invoice schemas. Use XML Invoice to PDF for XML payloads, or your ERP export.",
  "validate-e-invoice":
    "E-invoice schema validation is jurisdiction-specific. Use your national validator; myonlinepdfeditor.com can render XML invoices to PDF for review.",
};

export async function advicePdf(slug: string, fileName?: string): Promise<Uint8Array> {
  const key = slug.replace(/-to-pdf$/i, "").replace(/^pdf-to-/i, "");
  const msg =
    ADVICE[slug] ||
    ADVICE[key] ||
    "This format needs a desktop converter. Export to PDF or a supported type, then continue in myonlinepdfeditor.com.";
  const body = [
    "myonlinepdfeditor.com conversion note",
    fileName ? `File: ${fileName}` : "",
    "",
    msg,
    "",
    "Supported nearby tools: Word to PDF, Excel to PDF, Images to PDF, ODT/ODS/ODP to PDF, EPUB to PDF, EML to PDF.",
  ]
    .filter(Boolean)
    .join("\n");
  return textToPdf(body, "myonlinepdfeditor.com-format-note");
}

export function adviceText(slug: string, fileName?: string): string {
  const key = slug.replace(/-to-pdf$/i, "").replace(/^pdf-to-/i, "");
  const msg =
    ADVICE[slug] ||
    ADVICE[key] ||
    "This format needs a desktop converter first.";
  return [fileName ? `File: ${fileName}` : null, msg].filter(Boolean).join("\n");
}
