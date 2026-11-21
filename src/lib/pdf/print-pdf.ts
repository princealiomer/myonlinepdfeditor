import { fileToUint8Array } from "./read-file";
import { pdfToImages } from "./pdf-to-images";

/**
 * Print a PDF without relying on the browser's cross-origin PDF plugin frame.
 * Renders pages with pdf.js into a same-origin HTML blob, then calls print().
 */
export async function printPdfFile(file: File): Promise<void> {
  const bytes = await fileToUint8Array(file);
  const pages = await pdfToImages(bytes, "png", 1.5);
  if (!pages.length) throw new Error("PDF has no pages to print.");

  const imagesHtml = pages
    .map((page, i) => {
      const url = URL.createObjectURL(page.blob);
      return `<img src="${url}" alt="Page ${i + 1}" data-print-url="${url}" />`;
    })
    .join("\n");

  const html = `<!DOCTYPE html>
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
</body>
</html>`;

  const docUrl = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));

  await new Promise<void>((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("title", "Print PDF");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.src = docUrl;

    const revokeImageUrls = () => {
      try {
        const imgs = iframe.contentDocument?.querySelectorAll("img[data-print-url]") || [];
        imgs.forEach((img) => {
          const u = img.getAttribute("data-print-url");
          if (u) URL.revokeObjectURL(u);
        });
      } catch {
        /* ignore */
      }
      URL.revokeObjectURL(docUrl);
    };

    const cleanup = () => {
      window.setTimeout(() => {
        revokeImageUrls();
        iframe.remove();
      }, 60_000);
    };

    iframe.onload = () => {
      const win = iframe.contentWindow;
      if (!win) {
        cleanup();
        reject(new Error("Could not open print preview."));
        return;
      }

      const imgs = Array.from(iframe.contentDocument?.images || []);
      const waitForImages = Promise.all(
        imgs.map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise<void>((res) => {
                  img.onload = () => res();
                  img.onerror = () => res();
                }),
        ),
      );

      waitForImages.then(() => {
        try {
          win.focus();
          win.print();
          cleanup();
          resolve();
        } catch (err) {
          cleanup();
          reject(
            err instanceof Error
              ? err
              : new Error("Could not print PDF. Allow pop-ups and try again."),
          );
        }
      });
    };

    iframe.onerror = () => {
      cleanup();
      reject(new Error("Could not load print preview."));
    };

    document.body.appendChild(iframe);
  });
}
