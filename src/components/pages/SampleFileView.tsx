import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import {
  formatBytes,
  type SampleFile,
  type SampleFormat,
} from "@/lib/catalog/sample-documents";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedTool, localePath } from "@/lib/i18n";

export function SampleFileView({
  format,
  file,
  locale,
  dict,
}: {
  format: SampleFormat;
  file: SampleFile;
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.samplesPage;
  const title = s.fileTitle
    .replace("{name}", `${format.shortName} ${file.label}`);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-muted">
        <Link
          href={localePath(locale, "/sample-documents")}
          className="no-underline hover:text-teal"
        >
          {s.backToSamples}
        </Link>
        <span aria-hidden="true"> / </span>
        <Link
          href={localePath(locale, `/sample-documents/${format.id}`)}
          className="no-underline hover:text-teal"
        >
          {format.shortName}
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{file.label}</span>
      </nav>

      <h1 className="display text-[1.85rem] font-semibold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {s.fileIntro.replace("{ext}", format.extension.toUpperCase())}
      </p>

      <div className="surface mt-8 rounded-2xl p-6">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">{s.typeLabel}</dt>
            <dd className="mt-1 font-semibold text-ink">
              .{format.extension} · {file.mime}
            </dd>
          </div>
          <div>
            <dt className="text-muted">{s.sizeLabel}</dt>
            <dd className="mt-1 font-semibold text-ink">
              {file.label} ({formatBytes(file.bytes)})
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-muted">Filename</dt>
            <dd className="mt-1 font-semibold text-ink">{file.filename}</dd>
          </div>
        </dl>
        <a
          href={file.href}
          download={file.filename}
          className="btn btn-accent mt-6 inline-flex min-h-12"
        >
          {s.downloadCta}
        </a>
      </div>

      <AdSlot className="my-8 rounded-xl" />

      <section>
        <h2 className="display text-xl font-semibold">{s.relatedTools}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {format.relatedTools.map((slug) => {
            const tool = getLocalizedTool(slug, locale);
            if (!tool) return null;
            return (
              <li key={slug}>
                <Link
                  href={localePath(locale, `/tools/${slug}`)}
                  className="font-semibold text-teal no-underline"
                >
                  {tool.name}
                </Link>
                <span className="text-muted"> — {tool.summary}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-8 text-sm">
        <Link
          href={localePath(locale, `/sample-documents/${format.id}`)}
          className="font-semibold text-teal no-underline"
        >
          {s.backToFormat.replace("{format}", format.shortName)}
        </Link>
      </p>
    </div>
  );
}
