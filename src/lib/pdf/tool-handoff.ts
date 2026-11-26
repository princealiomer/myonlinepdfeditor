/**
 * Same-tab handoff so "Compress this" / "Sign it" can reuse the last result
 * without a second upload. Soft navigations keep module state.
 */
let pending: File[] | null = null;

export function setHandoffFiles(files: File[]): void {
  pending = files.length ? [...files] : null;
}

export function takeHandoffFiles(): File[] | null {
  const files = pending;
  pending = null;
  return files;
}

export function peekHandoffFiles(): File[] | null {
  return pending;
}

export function fileFromBlob(blob: Blob, filename: string): File {
  return new File([blob], filename, {
    type: blob.type || "application/pdf",
    lastModified: Date.now(),
  });
}
