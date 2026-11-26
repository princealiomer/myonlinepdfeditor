import Link from "next/link";
import {
  formatBytes,
  type SampleFormat,
} from "@/lib/catalog/sample-documents";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getLocalizedTool, localePath } from "@/lib/i18n";

export function SampleFormatView({
  format,
  locale,
  dict,
}: {
  format: SampleFormat;
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.samplesPage;
  const title = s.formatTitle.replace("{format}", format.shortName);
  const intro = s.formatIntro
    .replace("{format}", format.shortName)
    .replace("{ext}", format.extension.toUpperCase());

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
        <span>{format.shortName}</span>
      </nav>

      <h1 className="display text-[1.85rem] font-semibold sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted">
        {intro}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        Download a sample, then open the matching converter or editor on
        myonlinepdfeditor.com to practice the workflow before you use a real
        file. Samples are for testing uploads and layout — they are not legal
        templates.
      </p>

      <ul className="space-y-3">
        {format.files.map((file) => (
          <li
            key={file.slug}
            className="surface flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-ink">
                {format.shortName} · {file.label}
              </p>
              <p className="mt-1 text-sm text-muted">
                {file.filename} · {formatBytes(file.bytes)}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={file.href} download={file.filename} className="btn btn-accent">
                {s.downloadCta}
              </a>
              <Link
                href={localePath(
                  locale,
                  `/sample-documents/${format.id}/${file.slug}`,
                )}
                className="btn btn-ghost no-underline"
              >
                {file.label}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-10">
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
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
