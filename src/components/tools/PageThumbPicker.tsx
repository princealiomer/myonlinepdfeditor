"use client";

import { useCallback, useEffect, useState } from "react";
import {
  copyPdfBytes,
  fileToUint8Array,
  getPageCount,
  renderPdfPage,
} from "@/lib/pdf";

export type PageThumb = {
  pageNumber: number;
  dataUrl: string;
};

type PageThumbPickerProps = {
  file: File | null;
  selected: number[];
  onChange: (pages: number[]) => void;
  mode?: "select" | "view";
  pageLabel: string;
  loadingLabel: string;
  maxPages?: number;
};

export function PageThumbPicker({
  file,
  selected,
  onChange,
  mode = "select",
  pageLabel,
  loadingLabel,
  maxPages = 60,
}: PageThumbPickerProps) {
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [loading, setLoading] = useState(false);
  const [truncated, setTruncated] = useState<number | null>(null);

  const load = useCallback(async (pdf: File) => {
    setLoading(true);
    try {
      const bytes = copyPdfBytes(await fileToUint8Array(pdf));
      const count = await getPageCount(bytes);
      const limit = Math.min(count, maxPages);
      const next: PageThumb[] = [];
      for (let pageNumber = 1; pageNumber <= limit; pageNumber++) {
        const rendered = await renderPdfPage(copyPdfBytes(bytes), pageNumber, 0.32);
        next.push({
          pageNumber,
          dataUrl: rendered.canvas.toDataURL("image/jpeg", 0.7),
        });
      }
      setPages(next);
      setTruncated(count > limit ? count : null);
    } catch {
      setPages([]);
      setTruncated(null);
    } finally {
      setLoading(false);
    }
  }, [maxPages]);

  useEffect(() => {
    if (file) void load(file);
    else {
      setPages([]);
      setTruncated(null);
    }
  }, [file, load]);

  function toggle(pageNumber: number) {
    if (mode !== "select") return;
    if (selected.includes(pageNumber)) {
      onChange(selected.filter((n) => n !== pageNumber));
    } else {
      onChange([...selected, pageNumber].sort((a, b) => a - b));
    }
  }

  if (!file) return null;

  if (loading) {
    return (
      <p className="mt-3 text-sm text-muted" role="status">
        {loadingLabel}
      </p>
    );
  }

  if (!pages.length) return null;

  return (
    <div className="mt-4">
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {pages.map((page) => {
          const isOn = selected.includes(page.pageNumber);
          return (
            <li key={page.pageNumber}>
              <button
                type="button"
                disabled={mode === "view"}
                onClick={() => toggle(page.pageNumber)}
                className={`w-full rounded-xl border p-2 text-left transition ${
                  isOn
                    ? "border-teal bg-teal/10 ring-2 ring-teal/40"
                    : "border-mist bg-paper hover:border-teal/40"
                } ${mode === "view" ? "cursor-default" : ""}`}
                aria-pressed={mode === "select" ? isOn : undefined}
              >
                <img
                  src={page.dataUrl}
                  alt={pageLabel.replace("{n}", String(page.pageNumber))}
                  className="mx-auto h-28 w-auto rounded object-contain"
                  draggable={false}
                />
                <span className="mt-1 block text-center text-xs font-semibold">
                  {pageLabel.replace("{n}", String(page.pageNumber))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {truncated ? (
        <p className="mt-2 text-xs text-muted">
          Showing first {pages.length} of {truncated} pages.
        </p>
      ) : null}
    </div>
  );
}

export function pagesToRangeInput(pages: number[]): string {
  if (!pages.length) return "";
  const sorted = [...pages].sort((a, b) => a - b);
  const parts: string[] = [];
  let start = sorted[0];
  let prev = sorted[0];
  for (let i = 1; i <= sorted.length; i++) {
    const n = sorted[i];
    if (n === prev + 1) {
      prev = n;
      continue;
    }
    parts.push(start === prev ? String(start) : `${start}-${prev}`);
    start = n;
    prev = n;
  }
  return parts.join(",");
}
