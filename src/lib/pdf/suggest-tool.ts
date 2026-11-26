/** Map a rejected file extension to a better tool slug. */
const EXT_TO_TOOL: Record<string, string> = {
  ".pdf": "edit-pdf",
  ".doc": "word-to-pdf",
  ".docx": "word-to-pdf",
  ".xls": "excel-to-pdf",
  ".xlsx": "excel-to-pdf",
  ".csv": "excel-to-pdf",
  ".ppt": "ppt-to-pdf",
  ".pptx": "ppt-to-pdf",
  ".jpg": "jpg-to-pdf",
  ".jpeg": "jpg-to-pdf",
  ".png": "jpg-to-pdf",
  ".webp": "images-to-pdf",
  ".gif": "images-to-pdf",
  ".heic": "images-to-pdf",
  ".tif": "images-to-pdf",
  ".tiff": "images-to-pdf",
  ".txt": "text-to-pdf",
  ".md": "markdown-to-pdf",
  ".html": "html-to-pdf",
  ".htm": "html-to-pdf",
  ".odt": "odt-to-pdf",
  ".ods": "ods-to-pdf",
  ".odp": "odp-to-pdf",
  ".epub": "epub-to-pdf",
  ".eml": "eml-to-pdf",
  ".zip": "zip-to-pdf",
  ".rtf": "word-to-pdf",
};

export function suggestToolSlugForFile(file: File): string | null {
  const name = file.name.toLowerCase();
  const ext = name.includes(".") ? `.${name.split(".").pop()}` : "";
  if (ext && EXT_TO_TOOL[ext]) return EXT_TO_TOOL[ext];

  const type = (file.type || "").toLowerCase();
  if (type === "application/pdf") return "edit-pdf";
  if (type.startsWith("image/")) return "jpg-to-pdf";
  if (type.includes("word") || type.includes("msword")) return "word-to-pdf";
  if (type.includes("sheet") || type.includes("excel")) return "excel-to-pdf";
  if (type.includes("presentation") || type.includes("powerpoint")) {
    return "ppt-to-pdf";
  }
  return null;
}
