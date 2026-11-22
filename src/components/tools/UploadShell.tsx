import type { Tool } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";

/** Server-renderable upload placeholder so tool pages are usable before hydration. */
export function UploadShell({
  tool,
  dict,
  trustLine,
}: {
  tool: Tool;
  dict: Dictionary;
  trustLine?: string;
}) {
  const w = dict.workspace;
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
      <div
        className="surface rounded-2xl p-5"
        aria-labelledby="upload-heading-ssr"
      >
        <h2 id="upload-heading-ssr" className="text-lg font-semibold">
          {w.uploadFor.replace("{name}", tool.name)}
        </h2>
        <p className="mt-1 text-sm text-muted">{tool.summary}</p>
        {trustLine ? (
          <p className="mt-2 text-xs font-medium text-teal">{trustLine}</p>
        ) : null}
        <div className="dropzone-target mt-4 flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-mist bg-paper px-4 py-8 text-center sm:min-h-44 sm:py-10">
          <span className="font-semibold text-ink">{w.dropHere}</span>
          <span className="mt-1 text-sm text-muted">{w.orBrowse}</span>
        </div>
      </div>
      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">{w.options}</h2>
        <p className="mt-2 text-sm text-muted">{dict.common.loadingTool}</p>
      </section>
    </div>
  );
}
