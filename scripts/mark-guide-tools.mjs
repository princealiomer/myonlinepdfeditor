import fs from "node:fs";

const path = new URL("../src/lib/catalog/tools.ts", import.meta.url);
let s = fs.readFileSync(path, "utf8");

s = s.replace(
  /engine: "format-advice",/g,
  'engine: "format-advice",\n    availability: "guide",',
);

if (!s.includes('slug: "pdf-to-pdfa"') || !s.includes('availability: "guide"')) {
  s = s.replace(
    /(slug: "pdf-to-pdfa",[\s\S]*?)(engine: "export",)/,
    '$1$2\n    availability: "guide",',
  );
}

// Honest TIFF naming — PNG output
s = s.replace(
  /slug: "pdf-to-tiff",\s*name: "PDF to TIFF",\s*shortName: "PDF to TIFF",/,
  'slug: "pdf-to-tiff",\n    name: "PDF to PNG (TIFF workflow)",\n    shortName: "PDF → PNG",',
);

fs.writeFileSync(path, s);
const count = (s.match(/availability: "guide"/g) || []).length;
console.log(`guide tools: ${count}`);
