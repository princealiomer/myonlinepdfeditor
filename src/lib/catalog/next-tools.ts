/** Post-result chain actions — reuse the finished file without re-uploading. */
export type NextToolLink = {
  slug: string;
  label: string;
};

const DEFAULT_CHAIN: NextToolLink[] = [
  { slug: "compress-pdf", label: "Compress this" },
  { slug: "page-numbers", label: "Add page numbers" },
  { slug: "sign-pdf", label: "Sign it" },
];

const BY_ENGINE: Partial<Record<string, NextToolLink[]>> = {
  merge: DEFAULT_CHAIN,
  split: [
    { slug: "merge-pdf", label: "Merge PDFs" },
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "edit-pdf", label: "Edit PDF" },
  ],
  rotate: DEFAULT_CHAIN,
  straighten: DEFAULT_CHAIN,
  "delete-pages": DEFAULT_CHAIN,
  reorder: DEFAULT_CHAIN,
  "extract-pages": DEFAULT_CHAIN,
  "images-to-pdf": DEFAULT_CHAIN,
  "docx-to-pdf": DEFAULT_CHAIN,
  "ppt-to-pdf": DEFAULT_CHAIN,
  "excel-to-pdf": DEFAULT_CHAIN,
  "odf-to-pdf": DEFAULT_CHAIN,
  "text-to-pdf": [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "page-numbers", label: "Add page numbers" },
    { slug: "edit-pdf", label: "Edit PDF" },
  ],
  compress: [
    { slug: "page-numbers", label: "Add page numbers" },
    { slug: "sign-pdf", label: "Sign it" },
    { slug: "set-pdf-password", label: "Protect PDF" },
  ],
  "page-numbers": [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "sign-pdf", label: "Sign it" },
    { slug: "edit-pdf", label: "Edit PDF" },
  ],
  watermark: DEFAULT_CHAIN,
  crop: DEFAULT_CHAIN,
  grayscale: DEFAULT_CHAIN,
  repair: DEFAULT_CHAIN,
  flatten: [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "set-pdf-password", label: "Protect PDF" },
    { slug: "sign-pdf", label: "Sign it" },
  ],
  protect: [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "edit-pdf", label: "Edit PDF" },
  ],
  unlock: DEFAULT_CHAIN,
  editor: [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "page-numbers", label: "Add page numbers" },
    { slug: "sign-pdf", label: "Sign it" },
  ],
};

const BY_SLUG: Partial<Record<string, NextToolLink[]>> = {
  "edit-pdf": [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "page-numbers", label: "Add page numbers" },
    { slug: "sign-pdf", label: "Sign it" },
  ],
  "sign-pdf": [
    { slug: "compress-pdf", label: "Compress this" },
    { slug: "flatten-fields", label: "Flatten PDF" },
    { slug: "set-pdf-password", label: "Protect PDF" },
  ],
  "scan-pdf": DEFAULT_CHAIN,
  "jpg-to-pdf": DEFAULT_CHAIN,
};

export function nextToolsFor(engine: string, slug: string): NextToolLink[] {
  const specific = BY_SLUG[slug] || BY_ENGINE[engine] || DEFAULT_CHAIN;
  return specific.filter((item) => item.slug !== slug).slice(0, 3);
}
