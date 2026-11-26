import { fileToUint8Array } from "./read-file";
import { pdfToImages } from "./pdf-to-images";

async function blobToDataUrl(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return `data:${blob.type || "image/png"};base64,${btoa(binary)}`;
}

/**
 * Build a self-printing HTML document. The document calls window.print() itself
 * so the parent never reads contentWindow.print (avoids cross-origin frame errors
 * that happen with PDF plugin frames and some blob iframe contexts).
 */
function buildPrintHtml(imageDataUrls: string[]): string {
  const imagesHtml = imageDataUrls
    .map((src, i) => `<img src="${src}" alt="Page ${i + 1}" />`)
    .join("\n");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>Print</title>
<style>
  html, body { margin: 0; padding: 0; background: #fff; }
  img { display: block; width: 100%; max-width: 100%; page-break-after: always; }
  img:last-child { page-break-after: auto; }
  @page { margin: 0; }
</style>
</head>
<body>
${imagesHtml}
<script>
(function () {
  function go() {
    try { window.focus(); window.print(); } catch (e) {}
  }
  function whenReady(fn) {
    if (document.images && document.images.length) {
      var left = document.images.length;
      function done() {
        left -= 1;
        if (left <= 0) setTimeout(fn, 50);
      }
      for (var i = 0; i < document.images.length; i++) {
        var img = document.images[i];
        if (img.complete) done();
        else {
          img.onload = done;
          img.onerror = done;
        }
      }
    } else {
      setTimeout(fn, 50);
    }
  }
  whenReady(go);
})();
</script>
</body>
</html>`;
}

/**
 * Print a PDF without touching a cross-origin PDF plugin frame.
 * Renders pages to images, then prints from a same-origin srcdoc iframe
 * (self-print only — parent never calls contentWindow.print) or window.open(blobUrl).
 */
export async function printPdfFile(file: File): Promise<void> {
  const bytes = await fileToUint8Array(file);
  const pages = await pdfToImages(bytes, "png", 1.5);
  if (!pages.length) throw new Error("PDF has no pages to print.");

  const imageDataUrls = await Promise.all(pages.map((p) => blobToDataUrl(p.blob)));
  const html = buildPrintHtml(imageDataUrls);

  // Prefer srcdoc: same-origin with the parent; embedded script prints itself.
  try {
    await printViaSrcdoc(html);
    return;
  } catch {
    /* fall through */
  }

  // Fallback: open a blob: HTML document and let it print itself.
  await printViaBlobWindow(html);
}

function printViaSrcdoc(html: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "Print PDF");
    iframe.setAttribute("aria-hidden", "true");
    // Keep a tiny but non-zero box — some browsers skip print for 0×0 frames.
    iframe.style.cssText =
      "position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none;";
    // Do NOT set sandbox — it can block window.print() inside the frame.
    iframe.srcdoc = html;

    let settled = false;
    const finish = (fn: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(watchdog);
      fn();
    };

    const cleanup = () => {
      window.setTimeout(() => iframe.remove(), 60_000);
    };

    const watchdog = window.setTimeout(() => {
      finish(() => {
        cleanup();
        reject(new Error("Print preview timed out."));
      });
    }, 15_000);

    iframe.onload = () => {
      // Never call iframe.contentWindow.print() from the parent.
      // The srcdoc document's own script invokes print() — that avoids
      // "Blocked a frame … accessing a cross-origin frame" entirely.
      finish(() => {
        cleanup();
        resolve();
      });
    };

    iframe.onerror = () => {
      finish(() => {
        cleanup();
        reject(new Error("Could not load print preview."));
      });
    };

    document.body.appendChild(iframe);
  });
}

function printViaBlobWindow(html: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const docUrl = URL.createObjectURL(
      new Blob([html], { type: "text/html;charset=utf-8" }),
    );
    // Do not use noopener. We still never call popup.print(); the document prints itself.
    const popup = window.open(docUrl, "_blank");
    if (!popup) {
      URL.revokeObjectURL(docUrl);
      reject(
        new Error(
          "Could not open print preview. Allow pop-ups for this site and try again.",
        ),
      );
      return;
    }

    window.setTimeout(() => URL.revokeObjectURL(docUrl), 60_000);
    window.setTimeout(() => resolve(), 500);
  });
}
