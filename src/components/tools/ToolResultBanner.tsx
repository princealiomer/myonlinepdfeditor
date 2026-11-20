"use client";

import { downloadBlob } from "@/lib/pdf";

export type ToolDownload = {
  filename: string;
  blob: Blob;
};

type ToolResultBannerProps = {
  pending: boolean;
  error: string | null;
  message: string | null;
  download: ToolDownload | null;
  labels: {
    working: string;
    downloadAgain: string;
    readyTitle: string;
  };
};

export function ToolResultBanner({
  pending,
  error,
  message,
  download,
  labels,
}: ToolResultBannerProps) {
  if (!pending && !error && !message && !download) return null;

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
          <p className="text-sm font-semibold text-teal">{labels.readyTitle}</p>
          {message ? <p className="mt-1 text-sm text-ink-soft">{message}</p> : null}
          {download ? (
            <button
              type="button"
              className="btn btn-accent mt-3"
              onClick={() => downloadBlob(download.blob, download.filename)}
            >
              {labels.downloadAgain}: {download.filename}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
