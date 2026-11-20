import { fileToUint8Array } from "./read-file";
import { extractPdfText } from "./extract-text";

export async function pdfToHtml(file: File): Promise<string> {
  const extracted = await extractPdfText(await fileToUint8Array(file));
  const title = file.name.replace(/\.pdf$/i, "");
  const sections = extracted.pages
    .map(
      (p) =>
        `<section data-page="${p.page}"><h2>Page ${p.page}</h2><pre>${escapeHtml(p.text || "")}</pre></section>`,
    )
    .join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(title)}</title>
<style>body{font-family:system-ui,sans-serif;max-width:48rem;margin:2rem auto;padding:0 1rem}pre{white-space:pre-wrap}</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
${sections || "<p>(no extractable text)</p>"}
</body>
</html>`;
}

export async function pdfToMarkdown(file: File): Promise<string> {
  const extracted = await extractPdfText(await fileToUint8Array(file));
  const title = file.name.replace(/\.pdf$/i, "");
  const parts = [`# ${title}`, ""];
  for (const p of extracted.pages) {
    parts.push(`## Page ${p.page}`, "", p.text || "_(empty)_", "");
  }
  return parts.join("\n");
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
