import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SAMPLE_FORMATS, formatBytes } from "@/lib/catalog/sample-documents";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

export function SamplesHubView({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const s = dict.samplesPage;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="display text-[1.85rem] font-semibold sm:text-4xl">
        {s.title}
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
        {s.intro}
      </p>
      <p className="mt-3 text-sm text-ink-soft">{s.note}</p>

      <AdSlot className="my-8 rounded-xl" />

      <h2 className="display text-2xl font-semibold">{s.formatsTitle}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_FORMATS.map((format) => (
          <Link
            key={format.id}
            href={localePath(locale, `/sample-documents/${format.id}`)}
            className="surface block rounded-2xl p-5 no-underline transition hover:border-teal/40"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal">
              .{format.extension}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">
              {format.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {format.description}
            </p>
            <p className="mt-3 text-sm font-semibold text-teal">
              {s.openFormat} · {format.files.length}{" "}
              {format.files.map((f) => f.label).join(", ")}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="display text-2xl font-semibold">Quick downloads</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-mist text-ink">
                <th className="py-3 pr-4 font-semibold">Format</th>
                <th className="py-3 pr-4 font-semibold">{s.sizeLabel}</th>
                <th className="py-3 pr-4 font-semibold">File</th>
                <th className="py-3 font-semibold" />
              </tr>
            </thead>
            <tbody>
              {SAMPLE_FORMATS.flatMap((format) =>
                format.files.map((file) => (
                  <tr
                    key={`${format.id}-${file.slug}`}
                    className="border-b border-mist/70"
                  >
                    <td className="py-3 pr-4 font-medium text-ink">
                      {format.shortName}
                    </td>
                    <td className="py-3 pr-4 text-muted">
                      {file.label} ({formatBytes(file.bytes)})
                    </td>
                    <td className="py-3 pr-4 text-muted">{file.filename}</td>
                    <td className="py-3 text-right">
                      <Link
                        href={localePath(
                          locale,
                          `/sample-documents/${format.id}/${file.slug}`,
                        )}
                        className="font-semibold text-teal no-underline"
                      >
                        {s.downloadCta}
                      </Link>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
