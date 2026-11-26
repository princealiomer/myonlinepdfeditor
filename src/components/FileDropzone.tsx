"use client";

import { useState } from "react";
import Link from "next/link";
import { acceptHint, filterAcceptedFilesAsync } from "@/lib/pdf/accept";
import { suggestToolSlugForFile } from "@/lib/pdf/suggest-tool";

type FileDropzoneProps = {
  accept?: string;
  multiple?: boolean;
  files: File[];
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
  dropLabel?: string;
  browseLabel?: string;
  removeLabel?: string;
  trustLine?: string;
  /** Enable camera capture (Scan / images tools). */
  capture?: boolean;
  localePathPrefix?: string;
  openToolLabel?: string;
  cameraLabel?: string;
};

export function FileDropzone({
  accept,
  multiple = false,
  files,
  onFiles,
  label = "Select a document",
  hint = "PDF and supported files stay on your device",
  dropLabel = "Drag and drop here",
  browseLabel = "or click to browse",
  removeLabel = "Remove",
  trustLine,
  capture = false,
  localePathPrefix = "",
  openToolLabel = "Open {name}",
  cameraLabel = "Use camera",
}: FileDropzoneProps) {
  const [rejectMessage, setRejectMessage] = useState<string | null>(null);
  const [suggestSlug, setSuggestSlug] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  async function takeFiles(list: File[]) {
    if (!list.length) return;
    setChecking(true);
    try {
      const { accepted, rejected, magicRejected } = await filterAcceptedFilesAsync(
        list,
        accept,
      );
      const parts: string[] = [];
      let suggestion: string | null = null;
      if (rejected.length) {
        parts.push(
          `Wrong file type. This tool accepts ${acceptHint(accept)}. ` +
            `Rejected: ${rejected.map((f) => f.name).join(", ")}.`,
        );
        suggestion = suggestToolSlugForFile(rejected[0]);
      }
      if (magicRejected.length) {
        parts.push(magicRejected.join(" "));
        if (!suggestion && list[0]) suggestion = suggestToolSlugForFile(list[0]);
      }
      setRejectMessage(parts.length ? parts.join(" ") : null);
      setSuggestSlug(suggestion);
      if (!accepted.length) return;
      setSuggestSlug(null);
      onFiles(multiple ? [...files, ...accepted] : [accepted[0]]);
    } finally {
      setChecking(false);
    }
  }

  return (
    <form
      className="surface rounded-2xl p-5"
      aria-labelledby="upload-heading"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 id="upload-heading" className="text-lg font-semibold">
        {label}
      </h2>
      <p className="mt-1 text-sm text-muted">{hint}</p>
      {trustLine ? (
        <p className="mt-2 text-xs font-medium text-teal">{trustLine}</p>
      ) : null}

      <label
        className="dropzone-target mt-4 flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-mist bg-paper px-4 py-8 text-center transition active:border-teal sm:min-h-44 sm:py-10"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void takeFiles(Array.from(event.dataTransfer.files || []));
        }}
      >
        <span className="font-semibold text-ink">
          {checking ? "Checking file…" : dropLabel}
        </span>
        <span className="mt-1 text-sm text-muted">{browseLabel}</span>
        <input
          className="sr-only"
          type="file"
          name="document"
          accept={accept}
          multiple={multiple}
          disabled={checking}
          {...(capture ? { capture: "environment" as const } : {})}
          onChange={(event) => {
            void takeFiles(Array.from(event.target.files || []));
            event.currentTarget.value = "";
          }}
        />
      </label>

      {capture ? (
        <label className="mt-3 flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-mist bg-paper px-4 text-sm font-semibold text-ink">
          {cameraLabel}
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => {
              void takeFiles(Array.from(event.target.files || []));
              event.currentTarget.value = "";
            }}
          />
        </label>
      ) : null}

      {rejectMessage ? (
        <div className="mt-3 space-y-2" role="alert">
          <p className="text-sm text-ember">{rejectMessage}</p>
          {suggestSlug ? (
            <Link
              href={`${localePathPrefix}/tools/${suggestSlug}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-teal no-underline"
            >
              {openToolLabel.replace("{name}", suggestSlug.replace(/-/g, " "))}
            </Link>
          ) : null}
        </div>
      ) : null}

      {files.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-paper px-3 py-2.5"
            >
              <span className="min-w-0 truncate font-medium">{file.name}</span>
              <button
                type="button"
                className="btn btn-ghost min-h-11 shrink-0 px-3 py-2 text-sm"
                onClick={() => {
                  setRejectMessage(null);
                  setSuggestSlug(null);
                  onFiles(files.filter((_, fileIndex) => fileIndex !== index));
                }}
              >
                {removeLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
