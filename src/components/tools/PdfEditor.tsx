"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import type { Tool } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";
import { FileDropzone } from "@/components/FileDropzone";
import {
  ToolResultBanner,
  type ToolDownload,
} from "@/components/tools/ToolResultBanner";
import {
  applyAnnotations,
  createBlankPdf,
  downloadBytes,
  fileToUint8Array,
  getPageCount,
  renderPdfPage,
  type Annotation,
} from "@/lib/pdf";

type EditorTool =
  | "select"
  | "text"
  | "highlight"
  | "whiteout"
  | "redact"
  | "draw"
  | "sign"
  | "initials"
  | "image"
  | "comment"
  | "field";

type PdfEditorProps = {
  tool: Tool;
  dict?: Dictionary;
};

export function PdfEditor({ tool, dict }: PdfEditorProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [activeTool, setActiveTool] = useState<EditorTool>(guessTool(tool.slug));
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [textValue, setTextValue] = useState("Sample text");
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [lastDownload, setLastDownload] = useState<ToolDownload | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const drawStart = useRef<{ x: number; y: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const loadFile = useCallback(async (file: File | null, blank = false) => {
    setError(null);
    setMessage(null);
    try {
      let bytes: Uint8Array;
      if (blank) {
        bytes = await createBlankPdf(1);
        setFiles([]);
      } else {
        if (!file) return;
        bytes = await fileToUint8Array(file);
      }
      const count = await getPageCount(bytes);
      setPdfBytes(bytes);
      setPageCount(count);
      setPage(1);
      setAnnotations([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open PDF.");
    }
  }, []);

  useEffect(() => {
    if (files[0]) void loadFile(files[0]);
  }, [files, loadFile]);

  useEffect(() => {
    if (!pdfBytes || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const result = await renderPdfPage(pdfBytes, page, 1.25);
        if (cancelled || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        canvasRef.current.width = result.width;
        canvasRef.current.height = result.height;
        ctx.clearRect(0, 0, result.width, result.height);
        ctx.drawImage(result.canvas, 0, 0);
        setCanvasSize({ width: result.width, height: result.height });
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Could not render page.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pdfBytes, page]);

  function relativePoint(clientX: number, clientY: number) {
    const el = overlayRef.current;
    if (!el) return { x: 0, y: 0 };
    const rect = el.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * canvasSize.width,
      y: ((clientY - rect.top) / rect.height) * canvasSize.height,
    };
  }

  function addAtPoint(x: number, y: number, width = 160, height = 28) {
    const pageIndex = page - 1;
    const pdfY = canvasSize.height - y;

    if (activeTool === "text" || activeTool === "comment" || activeTool === "field") {
      setAnnotations((prev) => [
        ...prev,
        {
          type: "text",
          pageIndex,
          x,
          y: pdfY - 14,
          text:
            activeTool === "comment"
              ? `Comment: ${textValue}`
              : activeTool === "field"
                ? `[Field] ${textValue}`
                : textValue,
          size: 14,
          color: "#1B1B1F",
        },
      ]);
      return;
    }

    if (activeTool === "highlight" || activeTool === "whiteout" || activeTool === "redact") {
      const color =
        activeTool === "highlight"
          ? "#facc15"
          : activeTool === "whiteout"
            ? "#ffffff"
            : "#000000";
      setAnnotations((prev) => [
        ...prev,
        {
          type: "rect",
          pageIndex,
          x,
          y: pdfY - height,
          width,
          height,
          color,
          opacity: activeTool === "highlight" ? 0.4 : 1,
        },
      ]);
      return;
    }

    if ((activeTool === "sign" || activeTool === "initials" || activeTool === "image") && signatureDataUrl) {
      const w = activeTool === "initials" ? 80 : 160;
      const h = activeTool === "initials" ? 40 : 60;
      setAnnotations((prev) => [
        ...prev,
        {
          type: "image",
          pageIndex,
          x,
          y: pdfY - h,
          width: w,
          height: h,
          dataUrl: signatureDataUrl,
        },
      ]);
      return;
    }

    if (activeTool === "sign" || activeTool === "initials") {
      setAnnotations((prev) => [
        ...prev,
        {
          type: "text",
          pageIndex,
          x,
          y: pdfY - 18,
          text: activeTool === "initials" ? textValue.slice(0, 3).toUpperCase() || "JD" : textValue || "Signature",
          size: activeTool === "initials" ? 16 : 22,
          color: "#8A1E44",
        },
      ]);
    }
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!pdfBytes) return;
    const point = relativePoint(event.clientX, event.clientY);
    if (activeTool === "draw") {
      drawStart.current = point;
      return;
    }
    addAtPoint(point.x, point.y);
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (activeTool !== "draw" || !drawStart.current || !pdfBytes) return;
    const end = relativePoint(event.clientX, event.clientY);
    const start = drawStart.current;
    drawStart.current = null;
    setAnnotations((prev) => [
      ...prev,
      {
        type: "line",
        pageIndex: page - 1,
        x1: start.x,
        y1: canvasSize.height - start.y,
        x2: end.x,
        y2: canvasSize.height - end.y,
        color: "#1B1B1F",
      },
    ]);
  }

  function exportPdf() {
    if (!pdfBytes) return;
    startTransition(async () => {
      try {
        setError(null);
        setLastDownload(null);
        const bytes = await applyAnnotations(pdfBytes, annotations);
        const download = downloadBytes(bytes, "myonlinepdfeditor-edited.pdf");
        setLastDownload(download);
        setMessage(
          dict?.workspace.done ||
            "Download started. Annotations are baked into the PDF.",
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : "Export failed.");
      }
    });
  }

  const tools: { id: EditorTool; label: string }[] = [
    { id: "text", label: "Text" },
    { id: "highlight", label: "Highlight" },
    { id: "whiteout", label: "Whiteout" },
    { id: "redact", label: "Redact" },
    { id: "draw", label: "Draw" },
    { id: "sign", label: "Sign" },
    { id: "initials", label: "Initials" },
    { id: "image", label: "Image sig" },
    { id: "comment", label: "Comment" },
    { id: "field", label: "Field" },
  ];

  return (
    <div className="grid gap-5">
      {!pdfBytes ? (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <FileDropzone
            accept=".pdf,application/pdf"
            files={files}
            onFiles={setFiles}
            label={`Open PDF — ${tool.shortName}`}
            hint="Edit, annotate, and sign entirely in your browser."
          />
          <section className="surface rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Or start blank</h2>
            <p className="mt-1 text-sm text-muted">
              Create an empty page, then add text, signatures, and fields.
            </p>
            <button
              type="button"
              className="btn btn-accent mt-4"
              onClick={() => void loadFile(null, true)}
            >
              New blank PDF
            </button>
          </section>
        </div>
      ) : (
        <>
          <div className="surface rounded-2xl p-3">
            <div
              className="toolbar-scroll"
              role="toolbar"
              aria-label="PDF editor tools"
            >
              {tools.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`btn min-h-11 px-3 py-2 text-sm ${
                    activeTool === item.id ? "btn-accent" : "btn-ghost"
                  }`}
                  onClick={() => setActiveTool(item.id)}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-ghost min-h-11 px-3 py-2 text-sm"
                onClick={() => setAnnotations((prev) => prev.slice(0, -1))}
              >
                Undo
              </button>
              <button
                type="button"
                className="btn btn-accent min-h-11 px-4 py-2 text-sm font-semibold"
                disabled={pending}
                onClick={exportPdf}
              >
                {pending ? dict?.workspace.working || "Working…" : "Download PDF"}
              </button>
            </div>
          </div>
          <ToolResultBanner
            pending={pending}
            error={error}
            message={message}
            download={lastDownload}
            labels={{
              working: dict?.workspace.working || "Working…",
              downloadAgain: dict?.workspace.downloadAgain || "Download again",
              readyTitle: dict?.workspace.readyTitle || "Download ready",
            }}
          />

          <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
            <aside className="surface rounded-2xl p-4">
              <div className="field">
                <label htmlFor="editor-text">Text / signature label</label>
                <input
                  id="editor-text"
                  name="editor-text"
                  value={textValue}
                  onChange={(event) => setTextValue(event.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="sig-image">Upload signature image</label>
                <input
                  id="sig-image"
                  name="sig-image"
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => setSignatureDataUrl(String(reader.result));
                    reader.readAsDataURL(file);
                  }}
                />
                <span className="hint">PNG or JPG with transparent background works best.</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Prev
                </button>
                <span className="text-sm font-medium">
                  Page {page} / {pageCount}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={page >= pageCount}
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                >
                  Next
                </button>
              </div>
              <p className="mt-4 text-sm text-muted">
                Click the page to place the active tool. Draw tool: press, drag, release.
              </p>
              <button
                type="button"
                className="btn btn-ghost mt-4 w-full"
                onClick={() => {
                  setPdfBytes(null);
                  setFiles([]);
                  setAnnotations([]);
                }}
              >
                Replace document
              </button>
            </aside>

            <div
              className="surface max-w-full overflow-auto rounded-2xl p-2 sm:p-4"
              role="region"
              aria-label="PDF page preview"
              tabIndex={0}
            >
              <div
                ref={overlayRef}
                className="relative mx-auto w-fit max-w-full touch-none"
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
              >
                <canvas ref={canvasRef} className="max-w-full rounded-md shadow-sm" />
                <div className="pointer-events-none absolute inset-0">
                  {annotations
                    .filter((item) => item.pageIndex === page - 1)
                    .map((item, index) => (
                      <AnnotationPreview
                        key={`${item.type}-${index}`}
                        annotation={item}
                        canvasHeight={canvasSize.height}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {(error || message) && (
        <p className={`text-sm ${error ? "text-ember" : "text-teal"}`} role="status">
          {error || message}
        </p>
      )}
    </div>
  );
}

function AnnotationPreview({
  annotation,
  canvasHeight,
}: {
  annotation: Annotation;
  canvasHeight: number;
}) {
  if (annotation.type === "text") {
    return (
      <span
        className="absolute text-sm font-medium text-ink"
        style={{
          left: annotation.x,
          top: canvasHeight - annotation.y - (annotation.size || 14),
        }}
      >
        {annotation.text}
      </span>
    );
  }
  if (annotation.type === "rect") {
    return (
      <span
        className="absolute"
        style={{
          left: annotation.x,
          top: canvasHeight - annotation.y - annotation.height,
          width: annotation.width,
          height: annotation.height,
          background: annotation.color || "#000",
          opacity: annotation.opacity ?? 1,
        }}
      />
    );
  }
  if (annotation.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt=""
        src={annotation.dataUrl}
        className="absolute"
        style={{
          left: annotation.x,
          top: canvasHeight - annotation.y - annotation.height,
          width: annotation.width,
          height: annotation.height,
        }}
      />
    );
  }
  return null;
}

function guessTool(slug: string): EditorTool {
  if (slug.includes("sign")) return "sign";
  if (slug.includes("initial")) return "initials";
  if (slug.includes("highlight")) return "highlight";
  if (slug.includes("whiteout")) return "whiteout";
  if (slug.includes("redact")) return "redact";
  if (slug.includes("draw")) return "draw";
  if (slug.includes("comment")) return "comment";
  if (slug.includes("field") || slug.includes("form") || slug.includes("template")) return "field";
  if (slug.includes("image")) return "image";
  return "text";
}
