import { saveAs } from "file-saver";

export type DownloadResult = {
  filename: string;
  blob: Blob;
};

export function downloadBytes(
  bytes: Uint8Array,
  filename: string,
  mime = "application/pdf",
): DownloadResult {
  const blob = new Blob([bytes.slice()], { type: mime });
  saveAs(blob, filename);
  return { filename, blob };
}

export function downloadBlob(blob: Blob, filename: string): DownloadResult {
  saveAs(blob, filename);
  return { filename, blob };
}