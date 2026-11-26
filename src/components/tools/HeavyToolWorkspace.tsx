"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { Tool } from "@/lib/catalog";
import { nextToolsFor } from "@/lib/catalog/next-tools";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { FileDropzone } from "@/components/FileDropzone";
import {
  PageThumbPicker,
  pagesToRangeInput,
} from "@/components/tools/PageThumbPicker";
import {
  ToolResultBanner,
  type ToolDownload,
  type ToolResultStats,
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
  pdfToOds,
  pdfToOdp,
  pdfToHtml,
  pdfToImages,
  pdfToMarkdown,
  pdfToSvgFiles,
  encodeTiffFromCanvases,
  pptxToPdf,
  printPdfAsPoster,
  printPdfFile,
  protectPdf,
  rasterizePdf,
  renderPdfPage,
  readTextFile,
  redactPdfPages,
  removePdfMetadata,
  reorderPages,
  repairPdf,
  reversePdfPages,
  rotatePdf,
  straightenPdf,
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
  namedFromOriginal,
  takeHandoffFiles,
  getPageCount,
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
  successMessage?: string;
  pageCount?: number;
};

export function HeavyToolWorkspace({
  tool,
  dict,
  locale = "en",
}: ToolWorkspaceProps) {
  const w = dict.workspace;
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [ranges, setRanges] = useState("");
  const [degrees, setDegrees] = useState<90 | 180 | 270>(90);
  const [pagesInput, setPagesInput] = useState("");
  const [orderInput, setOrderInput] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [recipients, setRecipients] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [watermarkText, setWatermarkText] = useState("");
  const [cropMargin, setCropMargin] = useState("");
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
  const [resultStats, setResultStats] = useState<ToolResultStats | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const accept = tool.accept || ".pdf,application/pdf";
  const skipUpload =
    tool.engine === "create" ||
    tool.engine === "status" ||
    tool.engine === "password-gen";
  const showThumbs =
    tool.engine === "rotate" ||
    tool.engine === "delete-pages" ||
    tool.engine === "extract-pages" ||
    tool.engine === "redact" ||
    tool.engine === "merge" ||
    tool.engine === "reorder" ||
    tool.engine === "split";
  const useCamera =
    tool.slug === "scan-pdf" || tool.engine === "images-to-pdf";
  const localePrefix = localePath(locale, "").replace(/\/$/, "") || "";

  useEffect(() => {
    document.querySelector("[data-tool-ssr-shell]")?.remove();
    const handoff = takeHandoffFiles();
    if (handoff?.length) setFiles(handoff);
  }, [tool.slug]);

  useEffect(() => {
    if (
      tool.engine === "delete-pages" ||
      tool.engine === "extract-pages" ||
      tool.engine === "redact"
    ) {
      setPagesInput(pagesToRangeInput(selectedPages));
    }
  }, [selectedPages, tool.engine]);

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
    doneTitle: w.doneTitle,
    processAnother: w.processAnother,
    downloadCta: w.downloadCta,
    sizeLabel: w.sizeLabel,
    pagesLabel: w.pagesLabel,
    nextSteps: w.nextSteps,
  };

  function processAnother() {
    setFiles([]);
    setMessage(null);
    setError(null);
    setLastDownload(null);
    setResultStats(null);
    setResultText(null);
    setSelectedPages([]);
    setPagesInput("");
    setOrderInput("");
    setRanges("");
  }

  function run(action: () => Promise<ToolOutput | void>, successMessage?: string) {
    setError(null);
    setMessage(null);
    setLastDownload(null);
    setResultStats(null);
    const beforeBytes = files.reduce((sum, f) => sum + f.size, 0) || undefined;
    startTransition(async () => {
      try {
        const output = await action();
        if (output?.text) setResultText(output.text);
        const download =
          output?.download ||
          (output?.downloads?.length
            ? output.downloads[output.downloads.length - 1]
            : null);
        if (download) {
          setLastDownload(download);
          let pageCount = output?.pageCount;
          if (pageCount == null && download.blob.type.includes("pdf")) {
            try {
              pageCount = await getPageCount(
                new Uint8Array(await download.blob.arrayBuffer()),
              );
            } catch {
              /* ignore */
            }
          }
          setResultStats({
            filename: download.filename,
            beforeBytes,
            afterBytes: download.blob.size,
            pageCount,
          });
        }
        setMessage(
          output?.successMessage ||
            successMessage ||
            (isGuide ? w.guideDone : w.done),
        );
      } catch (err) {
        setError(friendlyToolError(err, w.errorGeneric));
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
              download: downloadBytes(await createBlankPdf(1), namedFromOriginal('blank', 'pdf')),
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
          stats={resultStats}
          chain={nextToolsFor(tool.engine, tool.slug)}
          localePathPrefix={localePrefix}
          onProcessAnother={processAnother}
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
          stats={resultStats}
          chain={nextToolsFor(tool.engine, tool.slug)}
          localePathPrefix={localePrefix}
          onProcessAnother={processAnother}
          labels={bannerLabels}
        />
      </section>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      {!skipUpload && (
        <div>
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
            onFiles={(next) => {
              setFiles(next);
              setSelectedPages([]);
            }}
            label={w.uploadFor.replace("{name}", tool.shortName)}
            hint={tool.summary}
            dropLabel={w.dropHere}
            browseLabel={w.orBrowse}
            removeLabel={w.remove}
            trustLine={dict.common.trustBrowser}
            capture={useCamera}
            localePathPrefix={localePrefix}
            openToolLabel={w.openSuggestedTool}
            cameraLabel={w.useCamera}
          />
          {showThumbs && files[0] && accept.includes("pdf") ? (
            <div className="surface mt-4 rounded-2xl p-4">
              <p className="text-sm font-semibold text-ink">
                {tool.engine === "rotate"
                  ? w.rotation
                  : tool.engine === "merge"
                    ? w.uploadFor.replace("{name}", tool.shortName)
                    : w.pagesExtract}
              </p>
              <PageThumbPicker
                file={files[0]}
                selected={selectedPages}
                onChange={setSelectedPages}
                mode={
                  tool.engine === "rotate" || tool.engine === "merge"
                    ? "view"
                    : "select"
                }
                pageLabel={w.pageN}
                loadingLabel={w.organizeLoading}
              />
            </div>
          ) : null}
        </div>
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

        {tool.engine === "reorder" && (
          <div className="field mt-4">
            <label htmlFor="pages">
              {tool.slug === "duplicate-pages" ? w.pagesDuplicate : w.pagesOrder}
            </label>
            <input
              id="pages"
              name="pages"
              value={tool.slug === "duplicate-pages" ? pagesInput : orderInput}
              onChange={(event) => {
                if (tool.slug === "duplicate-pages") {
                  setPagesInput(event.target.value);
                } else {
                  setOrderInput(event.target.value);
                }
              }}
              placeholder={tool.slug === "duplicate-pages" ? "2,4" : "1,3,2,4"}
            />
            <span className="hint">Examples: 1,3,2,4 or 1-3,5</span>
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
              placeholder="CONFIDENTIAL"
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
              placeholder="36"
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

        {(tool.engine === "extract-pages" ||
          tool.engine === "redact" ||
          tool.engine === "delete-pages") && (
          <div className="field mt-4">
            <label htmlFor="extract-pages">
              {tool.engine === "delete-pages" ? w.pagesDelete : w.pagesExtract}
            </label>
            <input
              id="extract-pages"
              name="extract-pages"
              value={pagesInput}
              onChange={(e) => {
                setPagesInput(e.target.value);
              }}
              placeholder="1-3,5"
            />
            <span className="hint">{w.pageRangesHint} Examples: 1,3 or 1-3,5</span>
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
              : runLabelFor(tool)}
        </button>

        <ToolResultBanner
          pending={pending}
          error={error}
          message={message}
          download={lastDownload}
          stats={resultStats}
          chain={isGuide ? [] : nextToolsFor(tool.engine, tool.slug)}
          localePathPrefix={localePrefix}
          onProcessAnother={processAnother}
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
      return { download: downloadBytes(await mergePdfs(files), namedFromOriginal(files[0]?.name, 'merged')) };
    }
    case "split": {
      if (!files[0]) throw new Error("Upload a PDF to split.");
      const parts = await splitPdf(files[0], ranges.trim() || undefined);
      const downloads = parts.map((part) => downloadBytes(part.bytes, part.name));
      return { downloads, download: downloads[downloads.length - 1] };
    }
    case "rotate": {
      if (!files[0]) throw new Error("Upload a PDF to rotate.");
      return { download: downloadBytes(await rotatePdf(files[0], degrees), namedFromOriginal(files[0]?.name, 'rotated')) };
    }
    case "straighten": {
      if (!files[0]) throw new Error("Upload a PDF to straighten.");
      const { bytes, angles } = await straightenPdf(files[0]);
      const summary = angles
        .map((a, i) => `Page ${i + 1}: ${a === 0 ? "already upright" : `${a > 0 ? "+" : ""}${a.toFixed(1)}°`}`)
        .join("; ");
      return {
        download: downloadBytes(bytes, namedFromOriginal(files[0]?.name, 'straightened')),
        text: `Deskewed ${angles.length} page${angles.length === 1 ? "" : "s"} (${summary}).`,
      };
    }
    case "delete-pages": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await deletePages(files[0], parseNumberList(pagesInput)),
          namedFromOriginal(files[0]?.name, 'pages-removed'),
        ),
      };
    }
    case "reorder": {
      if (!files[0]) throw new Error("Upload a PDF.");
      if (tool.slug === "duplicate-pages") {
        return {
          download: downloadBytes(
            await duplicatePages(files[0], parseNumberList(pagesInput)),
            namedFromOriginal(files[0]?.name, 'duplicated'),
          ),
        };
      }
      return {
        download: downloadBytes(
          await reorderPages(files[0], parseNumberList(orderInput)),
          namedFromOriginal(files[0]?.name, 'reordered'),
        ),
      };
    }
    case "images-to-pdf": {
      if (!files.length) throw new Error("Upload one or more images.");
      return { download: downloadBytes(await imagesToPdf(files), namedFromOriginal(files[0]?.name || 'images', 'scan')) };
    }
    case "text-to-pdf": {
      let text = pasteText;
      if (!text && files[0]) text = await readTextFile(files[0]);
      if (!text.trim()) throw new Error("Paste text or upload a file.");
      if (tool.slug === "html-to-pdf") text = htmlishToText(text);
      if (tool.slug === "csv-to-pdf") text = csvToFormattedText(text);
      return {
        download: downloadBytes(await textToPdf(text, tool.shortName), namedFromOriginal(files[0]?.name || 'text', 'pdf')),
      };
    }
    case "docx-to-pdf": {
      if (!files[0]) throw new Error("Upload a .docx file.");
      return { download: downloadBytes(await docxToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "ppt-to-pdf": {
      if (!files[0]) throw new Error("Upload a .pptx file.");
      return { download: downloadBytes(await pptxToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "protect": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await protectPdf(files[0], password), namedFromOriginal(files[0]?.name, 'protected')),
      };
    }
    case "page-numbers": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await addPageNumbers(files[0]), namedFromOriginal(files[0]?.name, 'numbered')),
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
        download: downloadBytes(out, namedFromOriginal(files[0]?.name, 'compressed')),
        text: `Compressed ${formatBytes(before)} → ${formatBytes(after)} (${pct}% smaller). Strong mode rebuilds pages as JPEG.`,
      };
    }
    case "flatten": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await flattenPdf(files[0]), namedFromOriginal(files[0]?.name, 'flattened')) };
    }
    case "download":
    case "export":
    case "fax": {
      if (!files[0]) throw new Error("Upload a PDF.");
      if (tool.slug === "pdf-to-pdfa") {
        const cleaned = await removePdfMetadata(files[0]);
        return {
          download: downloadBytes(cleaned, namedFromOriginal(files[0]?.name, 'pdfa-prep')),
          text: "Downloaded a metadata-scrubbed PDF. Validate PDF/A conformance in a dedicated PDF/A checker if your archive requires it.",
        };
      }
      const bytes = await fileToUint8Array(files[0]);
      const suffix =
        tool.engine === "fax" ? "fax-ready" : tool.engine === "export" ? "export" : "download";
      return { download: downloadBytes(bytes, namedFromOriginal(files[0]?.name, suffix)) };
    }
    case "print": {
      if (!files[0]) throw new Error("Upload a PDF.");
      await printPdfFile(files[0]);
      return {
        text: "Print dialog opened from a same-origin preview. If nothing appeared, allow pop-ups for this site and try again.",
      };
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
        downloadBlob(new Blob([checklist], { type: "text/plain;charset=utf-8" }), namedFromOriginal(files[0]?.name || 'document', 'checklist', '.txt')),
      );
      return { downloads, download: downloads[downloads.length - 1], text: checklist };
    }
    case "excel-to-pdf": {
      if (!files[0]) throw new Error("Upload an Excel (.xlsx) or CSV file.");
      return { download: downloadBytes(await excelToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "watermark": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await watermarkPdf(files[0], watermarkText.trim() || "CONFIDENTIAL"),
          namedFromOriginal(files[0]?.name, 'watermarked'),
        ),
      };
    }
    case "crop": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const margin = cropMargin.trim() === "" ? 36 : Number(cropMargin);
      if (!Number.isFinite(margin) || margin < 0) throw new Error("Enter a valid crop margin.");
      return { download: downloadBytes(await cropPdf(files[0], margin), namedFromOriginal(files[0]?.name, 'cropped')) };
    }
    case "extract-pages": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await extractPages(files[0], parseNumberList(pagesInput)),
          namedFromOriginal(files[0]?.name, 'extracted'),
        ),
      };
    }
    case "repair": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await repairPdf(files[0]), namedFromOriginal(files[0]?.name, 'repaired')) };
    }
    case "grayscale": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await grayscalePdf(files[0]), namedFromOriginal(files[0]?.name, 'grayscale')) };
    }
    case "remove-metadata": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await removePdfMetadata(files[0]), namedFromOriginal(files[0]?.name, 'no-metadata')),
      };
    }
    case "pdf-to-images": {
      if (!files[0]) throw new Error("Upload a PDF.");
      if (tool.slug === "pdf-to-tiff") {
        const bytes = await fileToUint8Array(files[0]);
        const first = await renderPdfPage(bytes, 1, 1.5);
        const canvases = [first.canvas];
        for (let p = 2; p <= first.pageCount; p++) {
          canvases.push((await renderPdfPage(bytes, p, 1.5)).canvas);
        }
        const tiff = encodeTiffFromCanvases(canvases);
        return {
          download: downloadBytes(tiff, namedFromOriginal(files[0]?.name, 'tiff', '.tiff'), "image/tiff"),
          text: `Exported a multipage TIFF with ${canvases.length} page${canvases.length === 1 ? "" : "s"}.`,
        };
      }
      const format = tool.slug === "pdf-to-png" ? "png" : "jpeg";
      const pages = await pdfToImages(await fileToUint8Array(files[0]), format);
      const downloads = pages.map((page) => downloadBlob(page.blob, page.filename));
      return {
        downloads,
        download: downloads[downloads.length - 1],
        text: `Exported ${pages.length} image${pages.length === 1 ? "" : "s"}.`,
      };
    }
    case "redact": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await redactPdfPages(files[0], parseNumberList(pagesInput)),
          namedFromOriginal(files[0]?.name, 'redacted'),
        ),
      };
    }
    case "invert": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await invertPdf(files[0]), namedFromOriginal(files[0]?.name, 'inverted')) };
    }
    case "n-up": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await nUpPdf(files[0], nUp), namedFromOriginal(files[0]?.name, nUp + 'up')) };
    }
    case "overlay": {
      if (files.length < 2) throw new Error("Upload a base PDF and an overlay PDF.");
      return {
        download: downloadBytes(await overlayPdf(files[0], files[1]), namedFromOriginal(files[0]?.name, 'overlay')),
      };
    }
    case "page-size": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await changePdfPageSize(files[0], pageSize),
          namedFromOriginal(files[0]?.name, pageSize),
        ),
      };
    }
    case "rasterize": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await rasterizePdf(files[0]), namedFromOriginal(files[0]?.name, 'rasterized')) };
    }
    case "reverse": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await reversePdfPages(files[0]), namedFromOriginal(files[0]?.name, 'reversed')),
      };
    }
    case "zip-to-pdf": {
      if (!files[0]) throw new Error("Upload a .zip file.");
      return { download: downloadBytes(await zipToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "markdown-to-pdf": {
      if (!files[0] && !pasteText.trim()) throw new Error("Upload a .md file or paste Markdown.");
      if (files[0]) {
        return { download: downloadBytes(await markdownToPdf(files[0]), namedFromOriginal(files[0]?.name || 'markdown', 'pdf')) };
      }
      return {
        download: downloadBytes(
          await textToPdf(markdownToPlain(pasteText), "markdown"),
          namedFromOriginal("markdown", "pdf"),
        ),
      };
    }
    case "pdf-to-docx": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const docx = await pdfToDocx(files[0]);
      return {
        download: downloadBytes(
          docx,
          namedFromOriginal(files[0]?.name, 'docx', '.docx'),
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
          namedFromOriginal(files[0]?.name, 'odt', '.odt'),
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
          ? namedFromOriginal(files[0]?.name, 'text', '.txt')
          : namedFromOriginal(files[0]?.name || 'document', 'readable', '.txt');
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
          namedFromOriginal(files[0]?.name, 'signatures', '.txt'),
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
          namedFromOriginal(files[0]?.name, 'pdfa-checklist', '.txt'),
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
        download: downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), namedFromOriginal(files[0]?.name, 'csv', '.csv')),
        text: csv.slice(0, 2000),
      };
    }
    case "pdf-to-ods": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const ods = await pdfToOds(files[0]);
      return {
        download: downloadBytes(
          ods,
          namedFromOriginal(files[0]?.name, 'ods', '.ods'),
          "application/vnd.oasis.opendocument.spreadsheet",
        ),
        text: "Downloaded a .ods built from extractable PDF text.",
      };
    }
    case "pdf-to-odp": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const odp = await pdfToOdp(files[0]);
      return {
        download: downloadBytes(
          odp,
          namedFromOriginal(files[0]?.name, 'odp', '.odp'),
          "application/vnd.oasis.opendocument.presentation",
        ),
        text: "Downloaded a .odp with one slide per PDF page (text only).",
      };
    }
    case "unlock": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await unlockPdf(files[0], password), namedFromOriginal(files[0]?.name, 'unlocked')),
      };
    }
    case "compare": {
      if (files.length < 2) throw new Error("Upload two PDFs to compare.");
      const report = await comparePdfs(files[0], files[1]);
      return {
        download: downloadBlob(
          new Blob([report], { type: "text/plain;charset=utf-8" }),
          namedFromOriginal(files[0]?.name, 'compare', '.txt'),
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
      return { download: downloadBytes(await odfToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "epub-to-pdf": {
      if (!files[0]) throw new Error("Upload an EPUB.");
      return { download: downloadBytes(await epubToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "pdf-to-epub": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await pdfToEpub(files[0]), namedFromOriginal(files[0]?.name, 'epub', '.epub')) };
    }
    case "eml-to-pdf": {
      if (!files[0]) throw new Error("Upload an .eml file.");
      return { download: downloadBytes(await emlToPdf(files[0]), namedFromOriginal(files[0]?.name, 'pdf')) };
    }
    case "analyze": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const report = await analyzePdf(files[0]);
      return {
        download: downloadBlob(
          new Blob([report], { type: "text/plain;charset=utf-8" }),
          namedFromOriginal(files[0]?.name, 'analysis', '.txt'),
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
          namedFromOriginal(files[0]?.name, 'info'),
        ),
      };
    }
    case "viewer-prefs": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(
          await setPdfViewerPreferences(files[0]),
          namedFromOriginal(files[0]?.name, 'viewer-prefs'),
        ),
      };
    }
    case "bookmark": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return { download: downloadBytes(await bookmarkPdf(files[0]), namedFromOriginal(files[0]?.name, 'bookmarked')) };
    }
    case "pdf-to-html": {
      if (!files[0]) throw new Error("Upload a PDF.");
      const html = await pdfToHtml(files[0]);
      return {
        download: downloadBlob(
          new Blob([html], { type: "text/html;charset=utf-8" }),
          namedFromOriginal(files[0]?.name, 'html', '.html'),
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
          namedFromOriginal(files[0]?.name, 'md', '.md'),
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
      return { download: downloadBytes(await xmlInvoiceToPdf(files[0]), namedFromOriginal(files[0]?.name, 'invoice')) };
    }
    case "password-gen": {
      const pwd = generatePassword(20);
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(pwd);
        }
      } catch {
        // Clipboard may be blocked; still show the password in the result panel.
      }
      return {
        text: `Password copied to clipboard (when allowed):\n${pwd}\n\nPaste it into Set PDF Password.`,
        successMessage: "Password generated and copied when clipboard access is allowed.",
      };
    }
    case "poster": {
      if (!files[0]) throw new Error("Upload a PDF.");
      return {
        download: downloadBytes(await printPdfAsPoster(files[0], 2, 2), namedFromOriginal(files[0]?.name, 'poster')),
      };
    }
    case "embed-snippet": {
      const name = files[0]?.name || "document.pdf";
      const snippet = pdfEmbedSnippet(name);
      return {
        download: downloadBlob(
          new Blob([snippet], { type: "text/html;charset=utf-8" }),
          namedFromOriginal(files[0]?.name, 'embed', '.html'),
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
          namedFromOriginal(files[0]?.name || 'document', 'accessible-checklist', '.txt'),
        ),
        text: checklist,
      };
    }
    case "format-advice": {
      const text = adviceText(tool.slug, files[0]?.name);
      return {
        download: downloadBytes(
          await advicePdf(tool.slug, files[0]?.name),
          namedFromOriginal(files[0]?.name || tool.slug, 'guidance'),
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

function runLabelFor(tool: Tool): string {
  const verbs: Record<string, string> = {
    merge: "Merge PDFs",
    split: "Split PDF",
    rotate: "Rotate pages",
    straighten: "Straighten PDF",
    "delete-pages": "Delete pages",
    reorder: tool.slug === "duplicate-pages" ? "Duplicate pages" : "Reorder pages",
    "images-to-pdf": tool.slug === "scan-pdf" ? "Create PDF from scans" : "Create PDF",
    "text-to-pdf": "Create PDF",
    "docx-to-pdf": "Convert to PDF",
    "ppt-to-pdf": "Convert to PDF",
    "excel-to-pdf": "Convert to PDF",
    "odf-to-pdf": "Convert to PDF",
    "epub-to-pdf": "Convert to PDF",
    "eml-to-pdf": "Convert to PDF",
    "zip-to-pdf": "Convert to PDF",
    "markdown-to-pdf": "Convert to PDF",
    "pdf-to-images": tool.slug === "pdf-to-tiff" ? "Export TIFF" : "Export images",
    "pdf-to-excel": "Export CSV",
    "pdf-to-ods": "Export ODS",
    "pdf-to-odp": "Export ODP",
    "pdf-to-docx": "Export DOCX",
    "pdf-to-odt": "Export ODT",
    "pdf-to-text": "Export text",
    "pdf-to-html": "Export HTML",
    "pdf-to-markdown": "Export Markdown",
    "pdf-to-svg": "Export SVG",
    "pdf-to-epub": "Export EPUB",
    "image-convert": "Convert images",
    "compress-images": "Compress images",
    protect: "Set password",
    unlock: "Unlock PDF",
    compress: "Compress PDF",
    watermark: "Add watermark",
    crop: "Crop PDF",
    "n-up": "Impose pages",
    "page-numbers": "Add page numbers",
    "page-size": "Resize pages",
    "password-gen": "Generate password",
    print: "Print PDF",
    search: "Search PDF",
    "doc-info": "Update info",
    "viewer-prefs": "Save preferences",
    flatten: "Flatten PDF",
    repair: "Repair PDF",
    grayscale: "Convert to grayscale",
    redact: "Redact pages",
    invert: "Invert colors",
    compare: "Compare PDFs",
    overlay: "Overlay PDFs",
    reverse: "Reverse pages",
    rasterize: "Rasterize PDF",
    analyze: "Analyze PDF",
    bookmark: "Add bookmarks",
    "remove-metadata": "Remove metadata",
    "extract-pages": "Extract pages",
    export: "Download PDF",
    download: "Download PDF",
    "email-share": "Prepare email",
    "bulk-send": "Prepare send list",
    envelope: "Build envelope",
    fax: "Prepare for fax",
    "verify-signatures": "List signatures",
    "validate-pdfa": "Check PDF/A",
    "xml-invoice": "Convert invoice",
    poster: "Make poster",
    "embed-snippet": "Get embed code",
    "accessible-checklist": "Download checklist",
    readable: "Make readable",
  };
  return verbs[tool.engine] || verbs[tool.slug] || `Run ${tool.shortName}`;
}

function friendlyToolError(err: unknown, fallback: string): string {
  const raw = err instanceof Error ? err.message : String(err || "");
  const lower = raw.toLowerCase();
  if (!raw.trim()) return fallback;
  if (lower.includes("no pdf header") || lower.includes("invalid pdf")) {
    return "That file does not look like a valid PDF. Try another file or re-export it as PDF.";
  }
  if (lower.includes("failed to parse pdf") || lower.includes("pdf structure")) {
    return "Could not read this PDF. It may be damaged or password-protected — try Unlock PDF first.";
  }
  if (lower.includes("failed to fetch") || lower.includes("networkerror")) {
    return "A required browser resource failed to load. Refresh the page and try again.";
  }
  if (lower.includes("could not decode")) {
    return "Could not decode that image. Try another file or convert it to PNG/JPEG first.";
  }
  if (raw.length > 160) {
    return `${raw.slice(0, 157).replace(/\s+\S*$/, "")}…`;
  }
  return raw;
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

