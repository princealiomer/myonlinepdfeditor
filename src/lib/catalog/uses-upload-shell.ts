import type { Tool } from "@/lib/catalog/tools";

/** Pure helper — safe on server and client. Keep out of `"use client"` modules. */
export function usesUploadShell(tool: Tool): boolean {
  if (tool.slug === "organize-pdf") return false;
  if (
    tool.engine === "editor" ||
    tool.engine === "kiosk" ||
    tool.engine === "in-person" ||
    tool.engine === "ai-assist" ||
    tool.engine === "create" ||
    tool.engine === "status" ||
    tool.engine === "password-gen"
  ) {
    return false;
  }
  return true;
}
