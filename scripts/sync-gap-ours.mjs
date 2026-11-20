import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("../src/lib/catalog/tools.ts", import.meta.url), "utf8");
const slugs = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(slugs)];

let script = readFileSync(new URL("./gap-sitemaps.mjs", import.meta.url), "utf8");
const oursBlock = `const ours = new Set(${JSON.stringify(unique, null, 2)});`;
script = script.replace(/const ours = new Set\([\s\S]*?\);/, oursBlock);

for (const s of ["starter-guide-to-smallpdf", "switch-to-smallpdf"]) {
  if (!script.includes(`"${s}"`)) {
    script = script.replace(
      "const ignore = new Set([",
      `const ignore = new Set([\n  "${s}",`,
    );
  }
}

// Ensure new tools map in alias for common competitor names
const extraAliases = `
  "eml-to-pdf": "eml-to-pdf",
  "heic-to-jpg": "heic-to-jpg",
  "heic-to-png": "heic-to-png",
  "webp-to-jpg": "webp-to-jpg",
  "webp-to-png": "webp-to-png",
  "svg-to-jpg": "svg-to-jpg",
  "svg-to-png": "svg-to-png",
  "compress-images": "compress-images",
  "odt-to-pdf": "odt-to-pdf",
  "ods-to-pdf": "ods-to-pdf",
  "odp-to-pdf": "odp-to-pdf",
  "odg-to-pdf": "odg-to-pdf",
  "epub-to-pdf": "epub-to-pdf",
  "pdf-to-epub": "pdf-to-epub",
  "pdf-to-html": "pdf-to-html",
  "pdf-to-markdown": "pdf-to-markdown",
  "pdf-to-svg": "pdf-to-svg",
  "pdf-to-odt": "pdf-to-odt",
  "pdf-to-ods": "pdf-to-ods",
  "pdf-to-odp": "pdf-to-odp",
  "xml-invoice-to-pdf": "xml-invoice-to-pdf",
  "analyze-pdf": "analyze-pdf",
  "pdf-statistics": "pdf-statistics",
  "change-pdf-doc-info": "change-pdf-doc-info",
  "set-pdf-viewer-preferences": "set-pdf-viewer-preferences",
  "bookmark-pdf": "bookmark-pdf",
  "print-pdf-as-poster": "print-pdf-as-poster",
  "generate-password": "generate-password",
  "embed-pdf": "embed-pdf",
  "pdf-button": "pdf-button",
  "accessible-pdf": "accessible-pdf",
  "pdf-printer": "pdf-printer",
  "straighten-pdf": "straighten-pdf",
  "validate-pdfa": "validate-pdfa",
  "verify-pdf-signatures": "verify-pdf-signatures",
  "pdf-to-e-invoice": "pdf-to-e-invoice",
  "validate-e-invoice": "validate-e-invoice",
  "hwp-to-pdf": "hwp-to-pdf",
  "pages-to-pdf": "pages-to-pdf",
  "ofd-to-pdf": "ofd-to-pdf",
  "pub-to-pdf": "pub-to-pdf",
  "publisher-to-pdf": "publisher-to-pdf",
  "ps-to-pdf": "ps-to-pdf",
  "udf-to-pdf": "udf-to-pdf",
`;

if (!script.includes('"eml-to-pdf": "eml-to-pdf"')) {
  script = script.replace(
    "const alias = {",
    `const alias = {\n${extraAliases}`,
  );
}

writeFileSync(new URL("./gap-sitemaps.mjs", import.meta.url), script);
console.log("synced ours", unique.length);
