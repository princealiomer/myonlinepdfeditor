import { validateFileMagic } from "./sniff";

/** Check whether a File matches an HTML accept= string (extensions / MIME). */
export function fileMatchesAccept(file: File, accept: string | undefined): boolean {
  if (!accept || accept.trim() === "*" || accept.includes("*/*")) return true;

  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  if (!tokens.length) return true;

  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();
  const ext = name.includes(".") ? `.${name.split(".").pop()}` : "";

  for (const token of tokens) {
    if (token.startsWith(".")) {
      if (ext === token) return true;
      continue;
    }
    if (token.endsWith("/*")) {
      const prefix = token.slice(0, -1); // e.g. "image/"
      if (type.startsWith(prefix)) return true;
      continue;
    }
    if (token.includes("/")) {
      if (type === token) return true;
      continue;
    }
    // bare extension without dot
    if (ext === `.${token}`) return true;
  }

  // Browsers often leave type empty for Office/ODF — fall back to extension-only tokens.
  if (!type) {
    for (const token of tokens) {
      if (token.startsWith(".") && ext === token) return true;
    }
  }

  return false;
}

export function filterAcceptedFiles(
  files: File[],
  accept: string | undefined,
): { accepted: File[]; rejected: File[] } {
  if (!accept) return { accepted: files, rejected: [] };
  const accepted: File[] = [];
  const rejected: File[] = [];
  for (const file of files) {
    if (fileMatchesAccept(file, accept)) accepted.push(file);
    else rejected.push(file);
  }
  return { accepted, rejected };
}

/** Extension/MIME filter, then magic-byte check so renamed files are rejected. */
export async function filterAcceptedFilesAsync(
  files: File[],
  accept: string | undefined,
): Promise<{ accepted: File[]; rejected: File[]; magicRejected: string[] }> {
  const { accepted: namedOk, rejected } = filterAcceptedFiles(files, accept);
  const accepted: File[] = [];
  const magicRejected: string[] = [];
  for (const file of namedOk) {
    const result = await validateFileMagic(file, accept);
    if (result.ok) accepted.push(file);
    else magicRejected.push(result.reason || file.name);
  }
  return { accepted, rejected, magicRejected };
}

export function acceptHint(accept: string | undefined): string {
  if (!accept) return "supported files";
  const exts = accept
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.startsWith("."))
    .slice(0, 8);
  if (exts.length) return exts.join(", ");
  return accept.split(",").slice(0, 4).map((t) => t.trim()).join(", ");
}
