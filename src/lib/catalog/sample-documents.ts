export type SampleFormatId =
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "ppt"
  | "pptx"
  | "odt"
  | "ods"
  | "odp"
  | "rtf";

export type SampleFile = {
  slug: string;
  label: string;
  filename: string;
  /** Public URL path under /sample-documents/... */
  href: string;
  mime: string;
  bytes: number;
};

export type SampleFormat = {
  id: SampleFormatId;
  name: string;
  shortName: string;
  extension: string;
  description: string;
  mime: string;
  relatedTools: string[];
  files: SampleFile[];
};

function file(
  format: SampleFormatId,
  ext: string,
  slug: string,
  label: string,
  mime: string,
  bytes: number,
): SampleFile {
  const filename = `sample-${format}-${slug}.${ext}`;
  return {
    slug,
    label,
    filename,
    href: `/sample-documents/${format}/${filename}`,
    mime,
    bytes,
  };
}

const SIZE_100 = { slug: "100kb", label: "100 kB" };
const SIZE_150 = { slug: "150kb", label: "150 kB" };
const SIZE_500 = { slug: "500kb", label: "500 kB" };
const SIZE_1MB = { slug: "1mb", label: "1 MB" };

export const SAMPLE_FORMATS: SampleFormat[] = [
  {
    id: "pdf",
    name: "PDF samples",
    shortName: "PDF",
    extension: "pdf",
    description:
      "Portable Document Format samples for testing edit, merge, compress, and convert tools.",
    mime: "application/pdf",
    relatedTools: ["edit-pdf", "merge-pdf", "compress-pdf", "pdf-to-word"],
    files: [
      file("pdf", "pdf", SIZE_150.slug, SIZE_150.label, "application/pdf", 153619),
      file("pdf", "pdf", SIZE_500.slug, SIZE_500.label, "application/pdf", 512019),
      file("pdf", "pdf", SIZE_1MB.slug, SIZE_1MB.label, "application/pdf", 1048595),
    ],
  },
  {
    id: "doc",
    name: "DOC samples",
    shortName: "DOC",
    extension: "doc",
    description:
      "Microsoft Word Binary (.doc) style samples for Word → PDF and upload testing.",
    mime: "application/msword",
    relatedTools: ["word-to-pdf", "edit-pdf"],
    files: [
      file("doc", "doc", SIZE_100.slug, SIZE_100.label, "application/msword", 102425),
      file("doc", "doc", SIZE_500.slug, SIZE_500.label, "application/msword", 512006),
      file("doc", "doc", SIZE_1MB.slug, SIZE_1MB.label, "application/msword", 1048576),
    ],
  },
  {
    id: "docx",
    name: "DOCX samples",
    shortName: "DOCX",
    extension: "docx",
    description:
      "Office Open XML Word documents for conversion and editor workflows.",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    relatedTools: ["word-to-pdf", "pdf-to-word"],
    files: [
      file(
        "docx",
        "docx",
        SIZE_100.slug,
        SIZE_100.label,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        102572,
      ),
      file(
        "docx",
        "docx",
        SIZE_500.slug,
        SIZE_500.label,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        512172,
      ),
      file(
        "docx",
        "docx",
        SIZE_1MB.slug,
        SIZE_1MB.label,
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        1048748,
      ),
    ],
  },
  {
    id: "xls",
    name: "XLS samples",
    shortName: "XLS",
    extension: "xls",
    description: "Legacy Excel spreadsheet samples for Excel → PDF testing.",
    mime: "application/vnd.ms-excel",
    relatedTools: ["excel-to-pdf"],
    files: [
      file("xls", "xls", SIZE_100.slug, SIZE_100.label, "application/vnd.ms-excel", 102400),
      file("xls", "xls", SIZE_500.slug, SIZE_500.label, "application/vnd.ms-excel", 512000),
      file("xls", "xls", SIZE_1MB.slug, SIZE_1MB.label, "application/vnd.ms-excel", 1048576),
    ],
  },
  {
    id: "xlsx",
    name: "XLSX samples",
    shortName: "XLSX",
    extension: "xlsx",
    description: "Modern Excel Open XML worksheets for spreadsheet → PDF flows.",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    relatedTools: ["excel-to-pdf", "pdf-to-excel"],
    files: [
      file(
        "xlsx",
        "xlsx",
        SIZE_100.slug,
        SIZE_100.label,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        102568,
      ),
      file(
        "xlsx",
        "xlsx",
        SIZE_500.slug,
        SIZE_500.label,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        512168,
      ),
      file(
        "xlsx",
        "xlsx",
        SIZE_1MB.slug,
        SIZE_1MB.label,
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        1048744,
      ),
    ],
  },
  {
    id: "ppt",
    name: "PPT samples",
    shortName: "PPT",
    extension: "ppt",
    description: "Legacy PowerPoint samples for presentation → PDF testing.",
    mime: "application/vnd.ms-powerpoint",
    relatedTools: ["ppt-to-pdf"],
    files: [
      file("ppt", "ppt", SIZE_100.slug, SIZE_100.label, "application/vnd.ms-powerpoint", 102405),
      file("ppt", "ppt", SIZE_500.slug, SIZE_500.label, "application/vnd.ms-powerpoint", 512001),
      file("ppt", "ppt", SIZE_1MB.slug, SIZE_1MB.label, "application/vnd.ms-powerpoint", 1048577),
    ],
  },
  {
    id: "pptx",
    name: "PPTX samples",
    shortName: "PPTX",
    extension: "pptx",
    description: "Office Open XML presentations for slide → PDF conversion tests.",
    mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    relatedTools: ["ppt-to-pdf"],
    files: [
      file(
        "pptx",
        "pptx",
        SIZE_100.slug,
        SIZE_100.label,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        94534,
      ),
      file(
        "pptx",
        "pptx",
        SIZE_500.slug,
        SIZE_500.label,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        542112,
      ),
      file(
        "pptx",
        "pptx",
        SIZE_1MB.slug,
        SIZE_1MB.label,
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        1128777,
      ),
    ],
  },
  {
    id: "odt",
    name: "ODT samples",
    shortName: "ODT",
    extension: "odt",
    description: "OpenDocument Text samples for LibreOffice Writer → PDF.",
    mime: "application/vnd.oasis.opendocument.text",
    relatedTools: ["odt-to-pdf", "pdf-to-odt"],
    files: [
      file("odt", "odt", SIZE_100.slug, SIZE_100.label, "application/vnd.oasis.opendocument.text", 103682),
      file("odt", "odt", SIZE_500.slug, SIZE_500.label, "application/vnd.oasis.opendocument.text", 513502),
      file("odt", "odt", SIZE_1MB.slug, SIZE_1MB.label, "application/vnd.oasis.opendocument.text", 1049788),
    ],
  },
  {
    id: "ods",
    name: "ODS samples",
    shortName: "ODS",
    extension: "ods",
    description: "OpenDocument Spreadsheet samples for Calc → PDF workflows.",
    mime: "application/vnd.oasis.opendocument.spreadsheet",
    relatedTools: ["ods-to-pdf", "pdf-to-ods"],
    files: [
      file("ods", "ods", SIZE_100.slug, SIZE_100.label, "application/vnd.oasis.opendocument.spreadsheet", 103832),
      file("ods", "ods", SIZE_500.slug, SIZE_500.label, "application/vnd.oasis.opendocument.spreadsheet", 513506),
      file("ods", "ods", SIZE_1MB.slug, SIZE_1MB.label, "application/vnd.oasis.opendocument.spreadsheet", 1050124),
    ],
  },
  {
    id: "odp",
    name: "ODP samples",
    shortName: "ODP",
    extension: "odp",
    description: "OpenDocument Presentation samples for Impress → PDF testing.",
    mime: "application/vnd.oasis.opendocument.presentation",
    relatedTools: ["odp-to-pdf", "pdf-to-odp"],
    files: [
      file("odp", "odp", SIZE_100.slug, SIZE_100.label, "application/vnd.oasis.opendocument.presentation", 54492),
      file("odp", "odp", SIZE_500.slug, SIZE_500.label, "application/vnd.oasis.opendocument.presentation", 267197),
      file("odp", "odp", SIZE_1MB.slug, SIZE_1MB.label, "application/vnd.oasis.opendocument.presentation", 545827),
    ],
  },
  {
    id: "rtf",
    name: "RTF samples",
    shortName: "RTF",
    extension: "rtf",
    description: "Rich Text Format samples for RTF → PDF conversion tests.",
    mime: "application/rtf",
    relatedTools: ["rtf-to-pdf", "word-to-pdf"],
    files: [
      file("rtf", "rtf", SIZE_100.slug, SIZE_100.label, "application/rtf", 102412),
      file("rtf", "rtf", SIZE_500.slug, SIZE_500.label, "application/rtf", 512000),
      file("rtf", "rtf", SIZE_1MB.slug, SIZE_1MB.label, "application/rtf", 1048576),
    ],
  },
];

export function getSampleFormat(id: string): SampleFormat | undefined {
  return SAMPLE_FORMATS.find((f) => f.id === id);
}

export function getSampleFile(
  formatId: string,
  fileSlug: string,
): { format: SampleFormat; file: SampleFile } | undefined {
  const format = getSampleFormat(formatId);
  if (!format) return undefined;
  const file = format.files.find((f) => f.slug === fileSlug);
  if (!file) return undefined;
  return { format, file };
}

export function allSampleFormatIds(): SampleFormatId[] {
  return SAMPLE_FORMATS.map((f) => f.id);
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} kB`;
  return `${bytes} B`;
}
