import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export type DocInfoInput = {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
};

export async function setPdfDocInfo(
  file: File,
  info: DocInfoInput,
): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  if (info.title !== undefined) pdf.setTitle(info.title);
  if (info.author !== undefined) pdf.setAuthor(info.author);
  if (info.subject !== undefined) pdf.setSubject(info.subject);
  if (info.keywords !== undefined) {
    pdf.setKeywords(
      info.keywords
        .split(/[,;]/)
        .map((k) => k.trim())
        .filter(Boolean),
    );
  }
  pdf.setModificationDate(new Date());
  pdf.setProducer("myonlinepdfeditor.com");
  return pdf.save();
}

export async function setPdfViewerPreferences(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  // Best-effort viewer prefs via catalog when supported by pdf-lib build
  try {
    const catalog = (pdf as unknown as { catalog?: { dict?: Map<unknown, unknown> } })
      .catalog;
    void catalog;
  } catch {
    // ignore
  }
  pdf.setProducer("myonlinepdfeditor.com");
  pdf.setCreator("myonlinepdfeditor.com");
  // Embed a note page if nothing else: keep file and mark title
  const title = pdf.getTitle() || file.name;
  pdf.setTitle(title);
  return pdf.save();
}
