"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import type { Tool } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";
import { FileDropzone } from "@/components/FileDropzone";
import {
  ToolResultBanner,
  type ToolDownload,
} from "@/components/tools/ToolResultBanner";
import {
  copyPdfBytes,
  downloadBytes,
  fileToUint8Array,
  getPageCount,
  namedFromOriginal,
  reorderPages,
  renderPdfPage,
  takeHandoffFiles,
} from "@/lib/pdf";
import { nextToolsFor } from "@/lib/catalog/next-tools";

type PageThumb = {
  id: string;
  pageNumber: number;
  dataUrl: string;
};

type OrganizePdfPanelProps = {
  tool: Tool;
  dict: Dictionary;
};

export function OrganizePdfPanel({ tool, dict }: OrganizePdfPanelProps) {
  const w = dict.workspace;
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<PageThumb[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [loadingThumbs, setLoadingThumbs] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const [lastDownload, setLastDownload] = useState<ToolDownload | null>(null);

  const loadThumbs = useCallback(async (file: File) => {
    setError(null);
    setMessage(null);
    setLoadingThumbs(true);
    try {
      // Own a stable copy — pdf.js workers must never see a shared/detached buffer.
      const bytes = copyPdfBytes(await fileToUint8Array(file));
      const count = await getPageCount(bytes);
      if (count < 1) throw new Error(w.organizeEmpty);
      const limit = Math.min(count, 60);
      const next: PageThumb[] = [];
      for (let pageNumber = 1; pageNumber <= limit; pageNumber++) {
        const rendered = await renderPdfPage(copyPdfBytes(bytes), pageNumber, 0.35);
        next.push({
          id: `p-${pageNumber}-${Math.random().toString(36).slice(2, 7)}`,
          pageNumber,
          dataUrl: rendered.canvas.toDataURL("image/jpeg", 0.72),
        });
      }
      setPages(next);
      if (count > limit) {
        setMessage(w.organizeLarge.replace("{count}", String(count)).replace("{shown}", String(limit)));
      }
    } catch (err) {
      setPages([]);
      setError(err instanceof Error ? err.message : w.errorGeneric);
    } finally {
      setLoadingThumbs(false);
    }
  }, [w]);

  useEffect(() => {
    const handoff = takeHandoffFiles();
    if (handoff?.length) setFiles(handoff);
  }, []);

  useEffect(() => {
    if (files[0]) void loadThumbs(files[0]);
    else setPages([]);
  }, [files, loadThumbs]);

  function movePage(fromId: string, toId: string) {
    setPages((prev) => {
      const from = prev.findIndex((p) => p.id === fromId);
      const to = prev.findIndex((p) => p.id === toId);
      if (from < 0 || to < 0 || from === to) return prev;
      const copy = [...prev];
      const [item] = copy.splice(from, 1);
      copy.splice(to, 0, item);
      return copy;
    });
  }

  function removePage(id: string) {
    setPages((prev) => {
      if (prev.length <= 1) {
        setError(w.organizeKeepOne);
        return prev;
      }
      return prev.filter((p) => p.id !== id);
    });
  }

  function exportOrganized() {
    if (!files[0] || pages.length === 0) {
      setError(w.organizeEmpty);
      return;
    }
    startTransition(async () => {
      try {
        setError(null);
        setLastDownload(null);
        const order = pages.map((p) => p.pageNumber);
        const bytes = await reorderPages(files[0], order, { allowSubset: true });
        const download = downloadBytes(
          bytes,
          namedFromOriginal(files[0].name, "organized"),
        );
        setLastDownload(download);
        setMessage(w.done);
      } catch (err) {
        setError(err instanceof Error ? err.message : w.errorGeneric);
      }
    });
  }

  return (
    <div className="grid gap-5">
      {!pages.length && !loadingThumbs ? (
        <FileDropzone
          accept=".pdf,application/pdf"
          files={files}
          onFiles={setFiles}
          label={w.uploadFor.replace("{name}", tool.shortName)}
          hint={w.organizeHint}
          dropLabel={w.dropHere}
          browseLabel={w.orBrowse}
          removeLabel={w.remove}
          trustLine={dict.common.trustBrowser}
        />
      ) : null}

      {loadingThumbs ? (
        <p className="text-sm text-muted" role="status">
          {w.organizeLoading}
        </p>
      ) : null}

      {pages.length > 0 ? (
        <section className="surface rounded-2xl p-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">{tool.shortName}</h2>
              <p className="mt-1 text-sm text-muted">{w.organizeDrag}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setFiles([]);
                  setPages([]);
                  setMessage(null);
                  setError(null);
                }}
              >
                {w.organizeReset}
              </button>
              <button
                type="button"
                className="btn btn-accent"
                disabled={pending || pages.length === 0}
                onClick={exportOrganized}
              >
                {pending ? w.working : w.organizeExport}
              </button>
            </div>
          </div>

          <ul
            className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            aria-label={tool.shortName}
          >
            {pages.map((page, index) => (
              <li
                key={page.id}
                draggable
                onDragStart={() => setDragId(page.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  if (dragId) movePage(dragId, page.id);
                  setDragId(null);
                }}
                onDragEnd={() => setDragId(null)}
                className={`group relative rounded-xl border border-mist bg-paper p-2 transition ${
                  dragId === page.id ? "opacity-60" : "hover:border-teal/50"
                }`}
              >
                <img
                  src={page.dataUrl}
                  alt={w.pageN.replace("{n}", String(index + 1))}
                  className="mx-auto h-36 w-auto rounded object-contain"
                  draggable={false}
                />
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-ink">
                    {w.pageN.replace("{n}", String(index + 1))}
                  </span>
                  <button
                    type="button"
                    className="btn btn-ghost min-h-10 px-3 py-2 text-xs"
                    onClick={() => removePage(page.id)}
                  >
                    {w.organizeDelete}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ToolResultBanner
        pending={pending || loadingThumbs}
        error={error}
        message={message}
        download={lastDownload}
        stats={
          lastDownload
            ? {
                filename: lastDownload.filename,
                afterBytes: lastDownload.blob.size,
                pageCount: pages.length || undefined,
              }
            : null
        }
        chain={nextToolsFor("reorder", tool.slug)}
        onProcessAnother={() => {
          setFiles([]);
          setPages([]);
          setMessage(null);
          setError(null);
          setLastDownload(null);
        }}
        labels={{
          working: loadingThumbs ? w.organizeLoading : w.working,
          downloadAgain: w.downloadAgain,
          readyTitle: w.readyTitle,
          processAnother: w.processAnother,
          downloadCta: w.downloadCta,
          nextSteps: w.nextSteps,
          pagesLabel: w.pagesLabel,
          sizeLabel: w.sizeLabel,
        }}
      />
    </div>
  );
}
