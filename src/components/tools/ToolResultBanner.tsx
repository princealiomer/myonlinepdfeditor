"use client";

import { downloadBlob } from "@/lib/pdf";
import type { NextToolLink } from "@/lib/catalog/next-tools";
import { fileFromBlob, setHandoffFiles } from "@/lib/pdf/tool-handoff";

export type ToolDownload = {
  filename: string;
  blob: Blob;
};

export type ToolResultStats = {
  filename?: string;
  beforeBytes?: number;
  afterBytes?: number;
  pageCount?: number;
};

type ToolResultBannerProps = {
  pending: boolean;
  error: string | null;
  message: string | null;
  download: ToolDownload | null;
  stats?: ToolResultStats | null;
  chain?: NextToolLink[];
  localePathPrefix?: string;
  onProcessAnother?: () => void;
  labels: {
    working: string;
    downloadAgain: string;
    readyTitle: string;
    doneTitle?: string;
    processAnother?: string;
    nextSteps?: string;
    pagesLabel?: string;
    sizeLabel?: string;
    downloadCta?: string;
  };
};

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

export function ToolResultBanner({
  pending,
  error,
  message,
  download,
  stats,
  chain,
  localePathPrefix = "",
  onProcessAnother,
  labels,
}: ToolResultBannerProps) {
  if (!pending && !error && !message && !download) return null;

  const filename = stats?.filename || download?.filename;
  const afterBytes = stats?.afterBytes ?? download?.blob.size;
  const showSize =
    typeof stats?.beforeBytes === "number" && typeof afterBytes === "number";

  function handleChain(slug: string) {
    if (!download) return;
    setHandoffFiles([fileFromBlob(download.blob, download.filename)]);
    window.location.href = `${localePathPrefix}/tools/${slug}`;
  }

  return (
    <div className="mt-4 space-y-3" aria-live="polite">
      {pending ? (
        <div
          className="flex items-center gap-3 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm font-semibold text-ink"
          role="status"
          aria-busy="true"
        >
          <span
            className="inline-block size-4 animate-spin rounded-full border-2 border-teal border-r-transparent"
            aria-hidden="true"
          />
          {labels.working}
        </div>
      ) : null}

      {error ? (
        <div
          className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm font-medium text-ember"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {!pending && !error && (message || download) ? (
        <div className="rounded-xl border border-teal/40 bg-white px-4 py-4 shadow-sm">
          <p className="text-sm font-semibold text-teal">
            {download ? labels.readyTitle : labels.doneTitle || labels.readyTitle}
          </p>
          {filename ? (
            <p className="mt-2 truncate text-sm font-medium text-ink" title={filename}>
              {filename}
            </p>
          ) : null}
          {(showSize || typeof stats?.pageCount === "number") && (
            <dl className="mt-3 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
              {showSize ? (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    {labels.sizeLabel || "Size"}
                  </dt>
                  <dd className="font-medium text-ink">
                    {formatBytes(stats!.beforeBytes!)} → {formatBytes(afterBytes!)}
                  </dd>
                </div>
              ) : null}
              {typeof stats?.pageCount === "number" ? (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">
                    {labels.pagesLabel || "Pages"}
                  </dt>
                  <dd className="font-medium text-ink">{stats.pageCount}</dd>
                </div>
              ) : null}
            </dl>
          )}
          {message ? <p className="mt-2 text-sm text-ink-soft">{message}</p> : null}
          {download ? (
            <button
              type="button"
              className="btn btn-accent mt-4 min-h-12 w-full text-base sm:w-auto"
              onClick={() => downloadBlob(download.blob, download.filename)}
            >
              {labels.downloadCta || labels.downloadAgain}
              {filename ? `: ${filename}` : null}
            </button>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {onProcessAnother ? (
              <button
                type="button"
                className="btn btn-ghost min-h-11"
                onClick={onProcessAnother}
              >
                {labels.processAnother || "Process another file"}
              </button>
            ) : null}
          </div>
          {download && chain && chain.length > 0 ? (
            <div className="mt-4 border-t border-mist pt-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {labels.nextSteps || "Next"}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {chain.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    className="btn btn-ghost min-h-11 text-sm"
                    onClick={() => handleChain(item.slug)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
