"use client";

import { useMemo, useState, useTransition } from "react";
import type { Tool } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";
import { FileDropzone } from "@/components/FileDropzone";
import {
  ToolResultBanner,
  type ToolDownload,
} from "@/components/tools/ToolResultBanner";
import {
  accessiblePdfChecklist,
  addPageNumbers,
  advicePdf,
  adviceText,
  analyzePdf,
  bookmarkPdf,
  changePdfPageSize,
  comparePdfs,
  compressImageFile,
  compressPdf,
  convertImageFile,
  createBlankPdf,
  cropPdf,
  csvToFormattedText,
  deletePages,
  docxToPdf,
  downloadBytes,
  downloadBlob,
  duplicatePages,
  emlToPdf,
  epubToPdf,
  excelToPdf,
  extractPages,
  extractPdfText,
  fileToUint8Array,
  flattenPdf,
  generatePassword,
  grayscalePdf,
  htmlishToText,
  imagesToPdf,
  inspectPdfSignatures,
  invertPdf,
  markdownToPdf,
  markdownToPlain,
  mergePdfs,
  nUpPdf,
  odfToPdf,
  overlayPdf,
  pdfEmbedSnippet,
  pdfToDocx,
  pdfToEpub,
  pdfToOdt,
  pdfToHtml,
  pdfToImages,
  pdfToMarkdown,
  pdfToSvgFiles,
  pptxToPdf,
  printPdfAsPoster,
  protectPdf,
  rasterizePdf,
  readTextFile,
  redactPdfPages,
  removePdfMetadata,
  reorderPages,
  repairPdf,
  reversePdfPages,
  rotatePdf,
  searchPdfText,
  setPdfDocInfo,
  setPdfViewerPreferences,
  splitPdf,
  textToPdf,
  unlockPdf,
  validatePdfaChecklist,
  watermarkPdf,
  xmlInvoiceToPdf,
  zipToPdf,
  type DownloadResult,
  type ImageOutFormat,
  type PageSizePreset,
} from "@/lib/pdf";

type ToolWorkspaceProps = {
  tool: Tool;
  dict: Dictionary;
  locale?: Locale;
};

type ToolOutput = {
  text?: string;
  download?: DownloadResult;
  downloads?: DownloadResult[];
};

export function HeavyToolWorkspace({ tool, dict }: ToolWorkspaceProps) {
  const w = dict.workspace;
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [ranges, setRanges] = useState("");
  const [degrees, setDegrees] = useState<90 | 180 | 270>(90);
  const [pagesInput, setPagesInput] = useState("1");
  const [orderInput, setOrderInput] = useState("1");
  const [pasteText, setPasteText] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [recipients, setRecipients] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [cropMargin, setCropMargin] = useState("36");
  const [nUp, setNUp] = useState<2 | 4>(2);
  const [pageSize, setPageSize] = useState<PageSizePreset>("letter");
  const [docTitle, setDocTitle] = useState("");
  const [docAuthor, setDocAuthor] = useState("");
  const [docSubject, setDocSubject] = useState("");
  const [docKeywords, setDocKeywords] = useState("");
  const [resultText, setResultText] = useState<string | null>(null);
  const [statusName, setStatusName] = useState("");
  const [statusValue, setStatusValue] = useState("draft");
  const [statusNote, setStatusNote] = useState("");
  const [lastDownload, setLastDownload] = useState<ToolDownload | null>(null);

  const accept = tool.accept || ".pdf,application/pdf";
  const skipUpload =
    tool.engine === "create" ||
    tool.engine === "status" ||
    tool.engine === "password-gen";

  const hasOptions = useMemo(() => {
    return (
      tool.engine === "text-to-pdf" ||
      tool.slug === "html-to-pdf" ||
      tool.slug === "csv-to-pdf" ||
      tool.engine === "split" ||
      tool.engine === "rotate" ||
      tool.engine === "delete-pages" ||
      tool.engine === "reorder" ||
      tool.engine === "protect" ||
      tool.engine === "unlock" ||
      tool.engine === "watermark" ||
      tool.engine === "crop" ||
      tool.engine === "n-up" ||
      tool.engine === "page-size" ||
      tool.engine === "doc-info" ||
      tool.engine === "extract-pages" ||
      tool.engine === "redact" ||
      tool.engine === "email-share" ||
      tool.engine === "bulk-send" ||
      tool.engine === "envelope" ||
      tool.engine === "search" ||
      tool.engine === "format-advice" ||
      tool.engine === "export" ||
      tool.engine === "fax" ||
      tool.engine === "download"
    );
  }, [tool.engine, tool.slug]);

  const isGuide = tool.availability === "guide" || tool.engine === "format-advice";
  const bannerLabels = {
    working: w.working,
    downloadAgain: isGuide ? w.guideDownloadAgain : w.downloadAgain,
    readyTitle: isGuide ? w.guideReadyTitle : w.readyTitle,
  };

  function run(action: () => Promise<ToolOutput | void>, successMessage?: string) {
    setError(null);
    setMessage(null);
    setLastDownload(null);
    startTransition(async () => {
      try {
        const output = await action();
        if (output?.text) setResultText(output.text);
        const download =
          output?.download ||
          (output?.downloads?.length
            ? output.downloads[output.downloads.length - 1]
            : null);
        if (download) setLastDownload(download);
        setMessage(
          successMessage || (isGuide ? w.guideDone : w.done),
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : w.errorGeneric);
      }
    });
  }

  if (
    tool.slug === "organize-pdf" ||
    tool.engine === "editor" ||
    tool.engine === "kiosk" ||
    tool.engine === "in-person" ||
    tool.engine === "ai-assist"
  ) {
    return (
      <p className="text-sm text-muted" role="status">
        Loading workspace…
      </p>
    );
  }

  if (tool.engine === "create") {
    return (
      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">{w.createBlankTitle}</h2>
        <p className="mt-1 text-sm text-muted">{w.createBlankBody}</p>
        <button
          type="button"
          className="btn btn-accent mt-4 min-w-[12rem]"
          disabled={pending}
          onClick={() =>
            run(async () => ({
              download: downloadBytes(await createBlankPdf(1), "myonlinepdfeditor-blank.pdf"),
            }))
          }
        >
          {pending ? w.creating : w.createBlankCta}
        </button>
        <ToolResultBanner
          pending={pending}
          error={error}
          message={message}
          download={lastDownload}
          labels={bannerLabels}
        />
      </section>
    );
  }

  if (tool.engine === "status") {
    return (
      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">{w.statusTitle}</h2>
        <p className="mt-1 text-sm text-muted">{w.statusBody}</p>
        <div className="field mt-4">
          <label htmlFor="status-name">{w.statusName}</label>
          <input
            id="status-name"
            name="status-name"
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="status-value">{w.statusValue}</label>
          <select
            id="status-value"
            name="status-value"
            value={statusValue}
            onChange={(e) => setStatusValue(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="viewed">Viewed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="status-note">{w.statusNotes}</label>
          <textarea
            id="status-note"
            name="status-note"
            value={statusNote}
            onChange={(e) => setStatusNote(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-accent"
          disabled={pending}
          onClick={() =>
            run(async () => {
              if (!statusName.trim()) throw new Error("Enter a document name.");
              const key = "myonlinepdfeditor-pdf-status";
              const existing = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
              existing.unshift({
                name: statusName.trim(),
                status: statusValue,
                note: statusNote,
                updatedAt: new Date().toISOString(),
              });
              localStorage.setItem(key, JSON.stringify(existing.slice(0, 50)));
              const text = existing
                .slice(0, 10)
                .map(
                  (row) =>
                    `${(row as { name: string }).name} — ${(row as { status: string }).status}`,
                )
                .join("\n");
              return { text };
            }, "Status saved in this browser.")
          }
        >
          {w.saveStatus}
        </button>
        {resultText ? (
          <pre className="mt-4 overflow-auto rounded-lg bg-paper p-3 text-xs">{resultText}</pre>
        ) : null}
        <ToolResultBanner
          pending={pending}
          error={error}
          message={message}
          download={lastDownload}
          labels={bannerLabels}
        />
      </section>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      {!skipUpload && (
        <FileDropzone
          accept={accept}
          multiple={
            Boolean(tool.multiFile) ||
            tool.engine === "merge" ||
            tool.engine === "images-to-pdf" ||
            tool.engine === "envelope" ||
            tool.engine === "compare" ||
            tool.engine === "overlay"
          }
          files={files}
          onFiles={setFiles}
          label={w.uploadFor.replace("{name}", tool.shortName)}
          hint={tool.summary}
          dropLabel={w.dropHere}
          browseLabel={w.orBrowse}
          removeLabel={w.remove}
        />
      )}

      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">{w.options}</h2>
        {!hasOptions ? <p className="mt-2 text-sm text-muted">{w.noOptions}</p> : null}

        {(tool.engine === "export" ||
          tool.engine === "fax" ||
          tool.engine === "download" ||
          tool.slug === "share-via-link") && (
          <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-ink-soft">
            {w.honestExportNote}
          </p>
        )}
        {tool.slug === "pdf-to-word" && (
          <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-ink-soft">
            Downloads a real .docx from extractable text. Layout and fonts will not match the original PDF.
          </p>
        )}
        {tool.slug === "pdf-to-text" && (
          <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-ink-soft">
            {w.outputTxtNote}
          </p>
        )}
        {tool.slug === "pdf-to-excel" && (
          <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-ink-soft">
            {w.outputCsvNote}
          </p>
        )}
        {isGuide && (
          <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm text-ink-soft">
            {w.guidanceOnly}
          </p>
        )}

        {(tool.engine === "text-to-pdf" ||
          tool.slug === "html-to-pdf" ||
          tool.slug === "csv-to-pdf") && (
          <div className="field mt-4">
            <label htmlFor="paste-text">{w.pasteContent}</label>
            <textarea
              id="paste-text"
              name="paste-text"
              value={pasteText}
              onChange={(event) => setPasteText(event.target.value)}
            />
          </div>
        )}

        {tool.engine === "split" && (
          <div className="field mt-4">
            <label htmlFor="ranges">{w.pageRanges}</label>
            <input
              id="ranges"
              name="ranges"
              value={ranges}
              onChange={(event) => setRanges(event.target.value)}
              placeholder="e.g. 1-3,5"
            />
            <span className="hint">
              {w.pageRangesHint} Examples: 1,3 or 1-3,5
            </span>
          </div>
        )}

        {tool.engine === "rotate" && (
          <fieldset className="mt-4">
            <legend className="mb-2 font-semibold">{w.rotation}</legend>
            <div className="flex flex-wrap gap-3">
              {([90, 180, 270] as const).map((value) => (
                <label key={value} className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="degrees"
                    checked={degrees === value}
                    onChange={() => setDegrees(value)}
                  />
                  {value}°
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {(tool.engine === "delete-pages" || tool.engine === "reorder") && (
          <div className="field mt-4">
            <label htmlFor="pages">
              {tool.slug === "duplicate-pages"
                ? w.pagesDuplicate
                : tool.engine === "delete-pages"
                  ? w.pagesDelete
                  : w.pagesOrder}
            </label>
            <input
              id="pages"
              name="pages"
              value={
                tool.engine === "reorder" && tool.slug !== "duplicate-pages"
                  ? orderInput
                  : pagesInput
              }
              onChange={(event) => {
                if (tool.engine === "reorder" && tool.slug !== "duplicate-pages") {
                  setOrderInput(event.target.value);
                } else {
                  setPagesInput(event.target.value);
                }
              }}
              placeholder={tool.engine === "reorder" ? "1,3,2,4" : "2,4"}
            />
          </div>
        )}

        {(tool.engine === "protect" || tool.engine === "unlock") && (
          <div className="field mt-4">
            <label htmlFor="password">
              {w.password} <span aria-hidden="true">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <span className="hint">
              {tool.engine === "unlock" ? w.passwordUnlockHint : w.passwordProtectHint}
            </span>
          </div>
        )}

        {tool.engine === "watermark" && (
          <div className="field mt-4">
            <label htmlFor="watermark">{w.watermark}</label>
            <input
              id="watermark"
              name="watermark"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
            />
          </div>
        )}

        {tool.engine === "crop" && (
          <div className="field mt-4">
            <label htmlFor="crop-margin">{w.cropMargin}</label>
            <input
              id="crop-margin"
              name="crop-margin"
              inputMode="numeric"
              value={cropMargin}
              onChange={(e) => setCropMargin(e.target.value)}
            />
            <span className="hint">{w.cropHint}</span>
          </div>
        )}

        {tool.engine === "n-up" && (
          <div className="field mt-4">
            <label htmlFor="n-up">{w.pagesPerSheet}</label>
            <select
              id="n-up"
              name="n-up"
              value={nUp}
              onChange={(e) => setNUp(Number(e.target.value) === 4 ? 4 : 2)}
            >
              <option value={2}>2-up</option>
              <option value={4}>4-up</option>
            </select>
          </div>
        )}

        {tool.engine === "page-size" && (
          <div className="field mt-4">
            <label htmlFor="page-size">{w.targetSize}</label>
            <select
              id="page-size"
              name="page-size"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSizePreset)}
            >
              <option value="letter">Letter</option>
              <option value="a4">A4</option>
              <option value="legal">Legal</option>
            </select>
          </div>
        )}

        {tool.engine === "doc-info" && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="field">
              <label htmlFor="doc-title">{w.title}</label>
              <input id="doc-title" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="doc-author">{w.author}</label>
              <input id="doc-author" value={docAuthor} onChange={(e) => setDocAuthor(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="doc-subject">{w.subject}</label>
              <input
                id="doc-subject"
                value={docSubject}
                onChange={(e) => setDocSubject(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="doc-keywords">{w.keywordsLabel}</label>
              <input
                id="doc-keywords"
                value={docKeywords}
                onChange={(e) => setDocKeywords(e.target.value)}
                placeholder="comma,separated"
              />
            </div>
          </div>
        )}

        {(tool.engine === "extract-pages" || tool.engine === "redact") && (
          <div className="field mt-4">
            <label htmlFor="extract-pages">{w.pagesExtract}</label>
            <input
              id="extract-pages"
              name="extract-pages"
              value={pagesInput}
              onChange={(e) => setPagesInput(e.target.value)}
              placeholder="1-3,5"
            />
            <span className="hint">Use commas and ranges, e.g. 1-3,5</span>
          </div>
        )}

        {(tool.engine === "email-share" ||
          tool.engine === "bulk-send" ||
          tool.engine === "envelope") && (
          <div className="field mt-4">
            <label htmlFor="recipients">
              {tool.engine === "email-share" ? w.recipientEmail : w.recipients}
            </label>
            {tool.engine === "email-share" ? (
              <input
                id="recipients"
                name="email"
                type="email"
                autoComplete="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
              />
            ) : (
              <textarea
                id="recipients"
                name="recipients"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
                placeholder={"Alex, alex@example.com\nSam, sam@example.com"}
              />
            )}
          </div>
        )}

        {tool.engine === "search" && (
          <div className="field mt-4">
            <label htmlFor="search-q">{w.searchTerm}</label>
            <input
              id="search-q"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <button
          type="button"
          className="btn btn-accent mt-4 min-h-12 w-full text-base"
          disabled={pending}
          onClick={() =>
            run(async () =>
              executeTool(tool, {
                files,
                pasteText,
                ranges,
                degrees,
                pagesInput,
                orderInput,
                password,
                emailTo,
                recipients,
                searchQuery,
                watermarkText,
                cropMargin,
                nUp,
                pageSize,
                docTitle,
                docAuthor,
                docSubject,
                docKeywords,
              }),
            )
          }
        >
          {pending
            ? w.working
            : isGuide
              ? w.guideRun
              : w.run.replace("{name}", tool.shortName)}
        </button>

        <ToolResultBanner
          pending={pending}
          error={error}
          message={message}
          download={lastDownload}
          labels={bannerLabels}
        />

        {resultText && (
          <pre className="mt-4 max-h-64 overflow-auto rounded-lg bg-paper p-3 text-xs whitespace-pre-wrap">
            {resultText}
          </pre>
        )}
      </section>
    </div>
  );
}

async function executeTool(
  tool: Tool,
  ctx: {
    files: File[];
    pasteText: string;
    ranges: string;
    degrees: 90 | 180 | 270;
    pagesInput: string;
    orderInput: string;
    password: string;
    emailTo: string;
    recipients: string;
    searchQuery: string;
    watermarkText: string;
    cropMargin: string;
    nUp: 2 | 4;
    pageSize: PageSizePreset;
    docTitle: string;
    docAuthor: string;
    docSubject: string;
    docKeywords: string;
  },
): Promise<ToolOutput> {
  const {
    files,
    pasteText,
    ranges,
    degrees,
    pagesInput,
    orderInput,
    password,
    emailTo,
    recipients,
    searchQuery,
    watermarkText,
    cropMargin,
    nUp,
    pageSize,
    docTitle,
    docAuthor,
    docSubject,
    docKeywords,
  } = ctx;

  switch (tool.engine) {
    case "merge": {
      if (files.length < 2) throw new Error("Upload at least two PDF files to merge.");
      return { download: downloadBytes(await mergePdfs(files), "myonlinepdfeditor-merged.pdf") };
    }
    case "split": {
      if (!files[0]) throw new Error("Upload a PDF to split.");
      const parts = await splitPdf(files[0], ranges.trim() || undefined);
      const downloads = parts.map((part) => downloadBytes(part.bytes, part.name));
      return { downloads, download: downloads[downloads.length - 1] };
    }
    case "rotate": {
      if (!files[0]) throw new Error("Upload a PDF to rotate.");
      return { download: downloadBytes(await rotatePdf(files[0], degrees), "myonlinepdfeditor-rotated.pdf") };
    }
    case "delete-pages": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await deletePages(files[0], parseNumberList(pagesInput)),
          "myonlinepdfeditor-pages-removed.pdf",
        ),
      };
    }
    case "reorder": {
      if (!files[0]) throw new Error("Upload a PDF.");
      if (tool.slug === "duplicate-pages") {
        return {
          download: downloadBytes(
            await duplicatePages(files[0], parseNumberList(pagesInput)),
            "myonlinepdfeditor-duplicated.pdf",
          ),
        };
      }
      return {
        download: downloadBytes(
          await reorderPages(files[0], parseNumberList(orderInput)),
          "myonlinepdfeditor-reordered.pdf",
        ),
      };
    }
    case "images-to-pdf": {
      if (!files.length) throw new Error("Upload one or more images.");
      return { download: downloadBytes(await imagesToPdf(files), "myonlinepdfeditor-images.pdf") };
    }
    case "text-to-pdf": {
      let text = pasteText;
      if (!text && files[0]) text = await readTextFile(files[0]);
      if (!text.trim()) throw new Error("Paste text or upload a file.");
      if (tool.slug === "html-to-pdf") text = htmlishToText(text);
      if (tool.slug === "csv-to-pdf") text = csvToFormattedText(text);
      return {
        download: downloadBytes(await textToPdf(text, tool.shortName), "myonlinepdfeditor-text.pdf"),
      };
    }
    case "docx-to-pdf": {
      if (!files[0]) throw new Error("Upload a .docx file.");
      return { download: downloadBytes(await docxToPdf(files[0]), "myonlinepdfeditor-from-word.pdf") };
    }
    case "ppt-to-pdf": {
      if (!files[0]) throw new Error("Upload a .pptx file.");
      return { download: downloadBytes(await pptxToPdf(files[0]), "myonlinepdfeditor-from-pptx.pdf") };
    }
    case "protect": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await protectPdf(files[0], password), "myonlinepdfeditor-protected.pdf"),
      };
    }
    case "page-numbers": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await addPageNumbers(files[0]), "myonlinepdfeditor-numbered.pdf"),
      };
    }
    case "compress": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const before = files[0].size;
      const out = await compressPdf(files[0], "strong");
      const after = out.byteLength;
      const saved = Math.max(0, before - after);
      const pct = before > 0 ? Math.round((saved / before) * 100) : 0;
      return {
        download: downloadBytes(out, "myonlinepdfeditor-compressed.pdf"),
        text: `Compressed ${formatBytes(before)} → ${formatBytes(after)} (${pct}% smaller). Strong mode rebuilds pages as JPEG.`,
      };
    }
    case "flatten": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await flattenPdf(files[0]), "myonlinepdfeditor-flattened.pdf") };
    }
    case "download":
    case "export":
    case "fax": {
      if (!files[0]) throw new Error("Upload a PDF.");
      if (tool.slug === "pdf-to-pdfa") {
        const cleaned = await removePdfMetadata(files[0]);
        return {
          download: downloadBytes(cleaned, "myonlinepdfeditor-pdfa-prep.pdf"),
          text: "Downloaded a metadata-scrubbed PDF. Validate PDF/A conformance in a dedicated PDF/A checker if your archive requires it.",
        };
      }
      const bytes = await fileToUint8Array(files[0]);
      const suffix =
        tool.engine === "fax" ? "fax-ready" : tool.engine === "export" ? "export" : "download";
      return { download: downloadBytes(bytes, `myonlinepdfeditor-${suffix}.pdf`) };
    }
    case "print": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const bytes = await fileToUint8Array(files[0]);
      const url = URL.createObjectURL(
        new Blob([bytes.slice()], { type: "application/pdf" }),
      );
      await printViaHiddenIframe(url);
      return { text: "Print dialog opened." };
    }
    case "search": {
      if (!files[0]) throw new Error("Upload a PDF.");
      if (!searchQuery.trim()) throw new Error("Enter a search term.");
      const extracted = await extractPdfText(await fileToUint8Array(files[0]));
      const hits = searchPdfText(extracted.pages, searchQuery);
      if (!hits.length) return { text: "No matches found." };
      return { text: hits.map((h) => `Page ${h.page}: ${h.snippet}`).join("\n\n") };
    }
    case "email-share": {
      if (!emailTo.trim()) throw new Error("Enter a recipient email.");
      let download: DownloadResult | undefined;
      if (files[0]) {
        download = downloadBytes(
          await fileToUint8Array(files[0]),
          files[0].name || "document.pdf",
        );
      }
      const subject = encodeURIComponent("Document shared via myonlinepdfeditor.com");
      const body = encodeURIComponent(
        "Please find the PDF attached from my device.\n\nShared with myonlinepdfeditor.com (browser-side tools).",
      );
      window.location.href = `mailto:${encodeURIComponent(emailTo.trim())}?subject=${subject}&body=${body}`;
      return { download, text: "Mail app opened. Attach the downloaded PDF if needed." };
    }
    case "bulk-send":
    case "envelope": {
      if (!files.length) throw new Error("Upload at least one PDF.");
      const list = recipients
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      if (!list.length) throw new Error("Add at least one recipient line.");
      const checklist = [
        tool.engine === "envelope" ? "myonlinepdfeditor.com Envelope Checklist" : "myonlinepdfeditor.com Bulk Send Checklist",
        `Files: ${files.map((f) => f.name).join(", ")}`,
        "",
        "Recipients:",
        ...list.map((line, i) => `${i + 1}. ${line}`),
        "",
        "Next steps: download each PDF, attach in your email or signing channel, and track completion yourself.",
      ].join("\n");
      const downloads: DownloadResult[] = [];
      for (const file of files) {
        downloads.push(downloadBytes(await fileToUint8Array(file), file.name));
      }
      downloads.push(
        downloadBlob(new Blob([checklist], { type: "text/plain;charset=utf-8" }), "myonlinepdfeditor-checklist.txt"),
      );
      return { downloads, download: downloads[downloads.length - 1], text: checklist };
    }
    case "excel-to-pdf": {
      if (!files[0]) throw new Error("Upload an Excel (.xlsx) or CSV file.");
      return { download: downloadBytes(await excelToPdf(files[0]), "myonlinepdfeditor-from-excel.pdf") };
    }
    case "watermark": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await watermarkPdf(files[0], watermarkText),
          "myonlinepdfeditor-watermarked.pdf",
        ),
      };
    }
    case "crop": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const margin = Number(cropMargin);
      if (!Number.isFinite(margin) || margin < 0) throw new Error("Enter a valid crop margin.");
      return { download: downloadBytes(await cropPdf(files[0], margin), "myonlinepdfeditor-cropped.pdf") };
    }
    case "extract-pages": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await extractPages(files[0], parseNumberList(pagesInput)),
          "myonlinepdfeditor-extracted.pdf",
        ),
      };
    }
    case "repair": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await repairPdf(files[0]), "myonlinepdfeditor-repaired.pdf") };
    }
    case "grayscale": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await grayscalePdf(files[0]), "myonlinepdfeditor-grayscale.pdf") };
    }
    case "remove-metadata": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await removePdfMetadata(files[0]), "myonlinepdfeditor-no-metadata.pdf"),
      };
    }
    case "pdf-to-images": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const format = tool.slug === "pdf-to-png" || tool.slug === "pdf-to-tiff" ? "png" : "jpeg";
      const pages = await pdfToImages(await fileToUint8Array(files[0]), format);
      const downloads = pages.map((page) => downloadBlob(page.blob, page.filename));
      return {
        downloads,
        download: downloads[downloads.length - 1],
        text:
          tool.slug === "pdf-to-tiff"
            ? `Exported ${pages.length} PNG page image(s) (browsers cannot write real TIFF here).`
            : `Exported ${pages.length} image${pages.length === 1 ? "" : "s"}.`,
      };
    }
    case "redact": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await redactPdfPages(files[0], parseNumberList(pagesInput)),
          "myonlinepdfeditor-redacted.pdf",
        ),
      };
    }
    case "invert": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await invertPdf(files[0]), "myonlinepdfeditor-inverted.pdf") };
    }
    case "n-up": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await nUpPdf(files[0], nUp), `myonlinepdfeditor-${nUp}up.pdf`) };
    }
    case "overlay": {
      if (files.length < 2) throw new Error("Upload a base PDF and an overlay PDF.");
      return {
        download: downloadBytes(await overlayPdf(files[0], files[1]), "myonlinepdfeditor-overlay.pdf"),
      };
    }
    case "page-size": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await changePdfPageSize(files[0], pageSize),
          `myonlinepdfeditor-${pageSize}.pdf`,
        ),
      };
    }
    case "rasterize": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await rasterizePdf(files[0]), "myonlinepdfeditor-rasterized.pdf") };
    }
    case "reverse": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await reversePdfPages(files[0]), "myonlinepdfeditor-reversed.pdf"),
      };
    }
    case "zip-to-pdf": {
      if (!files[0]) throw new Error("Upload a .zip file.");
      return { download: downloadBytes(await zipToPdf(files[0]), "myonlinepdfeditor-from-zip.pdf") };
    }
    case "markdown-to-pdf": {
      if (!files[0] && !pasteText.trim()) throw new Error("Upload a .md file or paste Markdown.");
      if (files[0]) {
        return { download: downloadBytes(await markdownToPdf(files[0]), "myonlinepdfeditor-from-markdown.pdf") };
      }
      return {
        download: downloadBytes(
          await textToPdf(markdownToPlain(pasteText), "markdown"),
          "myonlinepdfeditor-from-markdown.pdf",
        ),
      };
    }
    case "pdf-to-docx": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const docx = await pdfToDocx(files[0]);
      return {
        download: downloadBytes(
          docx,
          "myonlinepdfeditor-from-pdf.docx",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ),
        text: "Downloaded a .docx built from extractable PDF text. Scanned pages without text layers will be sparse.",
      };
    }
    case "pdf-to-odt": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const odt = await pdfToOdt(files[0]);
      return {
        download: downloadBytes(
          odt,
          "myonlinepdfeditor-from-pdf.odt",
          "application/vnd.oasis.opendocument.text",
        ),
        text: "Downloaded a .odt built from extractable PDF text.",
      };
    }
    case "pdf-to-text":
    case "readable": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const extracted = await extractPdfText(await fileToUint8Array(files[0]));
      const filename =
        tool.engine === "pdf-to-text"
          ? "myonlinepdfeditor-from-pdf.txt"
          : "myonlinepdfeditor-readable.txt";
      return {
        download: downloadBlob(
          new Blob([extracted.fullText], { type: "text/plain;charset=utf-8" }),
          filename,
        ),
        text: extracted.fullText.slice(0, 4000),
      };
    }
    case "verify-signatures": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const report = await inspectPdfSignatures(files[0]);
      return {
        download: downloadBlob(
          new Blob([report], { type: "text/plain;charset=utf-8" }),
          "myonlinepdfeditor-signature-report.txt",
        ),
        text: report,
      };
    }
    case "validate-pdfa": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const report = await validatePdfaChecklist(files[0]);
      return {
        download: downloadBlob(
          new Blob([report], { type: "text/plain;charset=utf-8" }),
          "myonlinepdfeditor-pdfa-checklist.txt",
        ),
        text: report,
      };
    }
    case "pdf-to-excel": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const extracted = await extractPdfText(await fileToUint8Array(files[0]));
      const csv = extracted.pages
        .map((p) => p.text.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .map((line) => `"${line.replace(/"/g, '""')}"`)
        .join("\n");
      return {
        download: downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), "myonlinepdfeditor-from-pdf.csv"),
        text: csv.slice(0, 2000),
      };
    }
    case "unlock": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await unlockPdf(files[0], password), "myonlinepdfeditor-unlocked.pdf"),
      };
    }
    case "compare": {
      if (files.length < 2) throw new Error("Upload two PDFs to compare.");
      const report = await comparePdfs(files[0], files[1]);
      return {
        download: downloadBlob(
          new Blob([report], { type: "text/plain;charset=utf-8" }),
          "myonlinepdfeditor-compare.txt",
        ),
        text: report.slice(0, 5000),
      };
    }
    case "image-convert": {
      if (!files.length) throw new Error("Upload at least one image.");
      const outFormat: ImageOutFormat = /to-png$/i.test(tool.slug) ? "png" : "jpeg";
      const downloads = [];
      for (const file of files) {
        const { blob, filename } = await convertImageFile(file, outFormat);
        downloads.push(downloadBlob(blob, filename));
      }
      return {
        downloads,
        download: downloads[downloads.length - 1],
        text: `Converted ${files.length} image(s).`,
      };
    }
    case "compress-images": {
      if (!files.length) throw new Error("Upload at least one image.");
      const lines: string[] = [];
      const downloads = [];
      for (const file of files) {
        const { blob, filename, before, after } = await compressImageFile(file);
        downloads.push(downloadBlob(blob, filename));
        lines.push(`${file.name}: ${before} → ${after} bytes`);
      }
      return { downloads, download: downloads[downloads.length - 1], text: lines.join("\n") };
    }
    case "odf-to-pdf": {
      if (!files[0]) throw new Error("Upload an OpenDocument file.");
      return { download: downloadBytes(await odfToPdf(files[0]), "myonlinepdfeditor-from-odf.pdf") };
    }
    case "epub-to-pdf": {
      if (!files[0]) throw new Error("Upload an EPUB.");
      return { download: downloadBytes(await epubToPdf(files[0]), "myonlinepdfeditor-from-epub.pdf") };
    }
    case "pdf-to-epub": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await pdfToEpub(files[0]), "myonlinepdfeditor-from-pdf.epub") };
    }
    case "eml-to-pdf": {
      if (!files[0]) throw new Error("Upload an .eml file.");
      return { download: downloadBytes(await emlToPdf(files[0]), "myonlinepdfeditor-from-email.pdf") };
    }
    case "analyze": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const report = await analyzePdf(files[0]);
      return {
        download: downloadBlob(
          new Blob([report], { type: "text/plain;charset=utf-8" }),
          "myonlinepdfeditor-pdf-analysis.txt",
        ),
        text: report,
      };
    }
    case "doc-info": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await setPdfDocInfo(files[0], {
            title: docTitle,
            author: docAuthor,
            subject: docSubject,
            keywords: docKeywords,
          }),
          "myonlinepdfeditor-doc-info.pdf",
        ),
      };
    }
    case "viewer-prefs": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await setPdfViewerPreferences(files[0]),
          "myonlinepdfeditor-viewer-prefs.pdf",
        ),
      };
    }
    case "bookmark": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await bookmarkPdf(files[0]), "myonlinepdfeditor-bookmarked.pdf") };
    }
    case "pdf-to-html": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const html = await pdfToHtml(files[0]);
      return {
        download: downloadBlob(
          new Blob([html], { type: "text/html;charset=utf-8" }),
          "myonlinepdfeditor-from-pdf.html",
        ),
        text: html.slice(0, 3000),
      };
    }
    case "pdf-to-markdown": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const md = await pdfToMarkdown(files[0]);
      return {
        download: downloadBlob(
          new Blob([md], { type: "text/markdown;charset=utf-8" }),
          "myonlinepdfeditor-from-pdf.md",
        ),
        text: md.slice(0, 3000),
      };
    }
    case "pdf-to-svg": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const svgs = await pdfToSvgFiles(files[0]);
      const downloads = svgs.map((s) =>
        downloadBlob(new Blob([s.text], { type: "image/svg+xml" }), s.filename),
      );
      return {
        downloads,
        download: downloads[downloads.length - 1],
        text: `Exported ${svgs.length} SVG file(s).`,
      };
    }
    case "xml-invoice": {
      if (!files[0]) throw new Error("Upload an XML invoice.");
      return { download: downloadBytes(await xmlInvoiceToPdf(files[0]), "myonlinepdfeditor-invoice.pdf") };
    }
    case "password-gen": {
      const pwd = generatePassword(20);
      return {
        download: downloadBlob(
          new Blob([pwd], { type: "text/plain;charset=utf-8" }),
          "myonlinepdfeditor-password.txt",
        ),
        text: `Generated password:\n${pwd}\n\nCopy it into Set PDF Password.`,
      };
    }
    case "poster": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await printPdfAsPoster(files[0], 2, 2), "myonlinepdfeditor-poster.pdf"),
      };
    }
    case "embed-snippet": {
      const name = files[0]?.name || "document.pdf";
      const snippet = pdfEmbedSnippet(name);
      return {
        download: downloadBlob(
          new Blob([snippet], { type: "text/html;charset=utf-8" }),
          "myonlinepdfeditor-pdf-embed.html",
        ),
        text: snippet,
      };
    }
    case "accessible-checklist": {
      const name = files[0]?.name || "document.pdf";
      const checklist = accessiblePdfChecklist(name);
      return {
        download: downloadBlob(
          new Blob([checklist], { type: "text/plain;charset=utf-8" }),
          "myonlinepdfeditor-accessible-checklist.txt",
        ),
        text: checklist,
      };
    }
    case "format-advice": {
      const text = adviceText(tool.slug, files[0]?.name);
      return {
        download: downloadBytes(
          await advicePdf(tool.slug, files[0]?.name),
          "myonlinepdfeditor-conversion-guidance.pdf",
        ),
        text: `Guide only — not a converted file.\n\n${text}`,
      };
    }
    case "in-person":
    case "kiosk":
    case "ai-assist":
    case "editor":
    case "create":
    case "status":
      throw new Error("Open this tool from its dedicated workspace.");
    default: {
      const _never: never = tool.engine;
      throw new Error(`Unsupported tool engine: ${_never}`);
    }
  }
}

/** Accepts "1,2,5" and ranges like "1-3,5". */
function parseNumberList(value: string): number[] {
  const nums: number[] = [];
  for (const raw of value.split(/[,\s]+/)) {
    const part = raw.trim();
    if (!part) continue;
    const range = part.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Math.floor(Number(range[1]));
      const end = Math.floor(Number(range[2]));
      if (!Number.isFinite(start) || !Number.isFinite(end) || start < 1 || end < 1) {
        continue;
      }
      const from = Math.min(start, end);
      const to = Math.max(start, end);
      for (let n = from; n <= to; n++) nums.push(n);
      continue;
    }
    const n = Math.floor(Number(part));
    if (Number.isFinite(n) && n > 0) nums.push(n);
  }
  if (!nums.length) {
    throw new Error('Enter page numbers like "1,2" or ranges like "1-3,5".');
  }
  return nums;
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function printViaHiddenIframe(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "Print PDF");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.src = url;
    const cleanup = () => {
      window.setTimeout(() => {
        iframe.remove();
        URL.revokeObjectURL(url);
      }, 60_000);
    };
    iframe.onload = () => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        cleanup();
        resolve();
      } catch (err) {
        cleanup();
        reject(err instanceof Error ? err : new Error("Could not print PDF."));
      }
    };
    iframe.onerror = () => {
      cleanup();
      reject(new Error("Could not load PDF for printing."));
    };
    document.body.appendChild(iframe);
  });
}
