"use client";

import dynamic from "next/dynamic";
import type { Tool } from "@/lib/catalog";
import type { Dictionary, Locale } from "@/lib/i18n";

function Loading({ label }: { label: string }) {
  return (
    <div
      className="flex min-h-[24rem] items-center justify-center rounded-2xl border border-dashed border-mist bg-paper px-4"
      role="status"
    >
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

const PdfEditor = dynamic(
  () =>
    import("@/components/tools/PdfEditor").then((m) => ({
      default: m.PdfEditor,
    })),
  { ssr: false, loading: () => <Loading label="Loading editor…" /> },
);

const OrganizePdfPanel = dynamic(
  () =>
    import("@/components/tools/OrganizePdfPanel").then((m) => ({
      default: m.OrganizePdfPanel,
    })),
  { ssr: false, loading: () => <Loading label="Loading organizer…" /> },
);

const AiAssistPanel = dynamic(
  () =>
    import("@/components/tools/AiAssistPanel").then((m) => ({
      default: m.AiAssistPanel,
    })),
  { ssr: false, loading: () => <Loading label="Loading assistant…" /> },
);

const HeavyToolWorkspace = dynamic(
  () =>
    import("@/components/tools/HeavyToolWorkspace").then((m) => ({
      default: m.HeavyToolWorkspace,
    })),
  // Keep SSR upload shell visible — do not flash "Loading tool…".
  { ssr: false, loading: () => null },
);

type ToolWorkspaceProps = {
  tool: Tool;
  dict: Dictionary;
  locale?: Locale;
};

/**
 * Thin router: editor / organize / AI load only their own chunks.
 * Conversion tools load the heavy PDF engine after hydration.
 * Server-rendered UploadShell above this island keeps LCP on the upload UI.
 */
export function ToolWorkspace({ tool, dict, locale }: ToolWorkspaceProps) {
  if (tool.slug === "organize-pdf") {
    return <OrganizePdfPanel tool={tool} dict={dict} />;
  }

  if (
    tool.engine === "editor" ||
    tool.engine === "kiosk" ||
    tool.engine === "in-person"
  ) {
    return <PdfEditor tool={tool} dict={dict} />;
  }

  if (tool.engine === "ai-assist") {
    return <AiAssistPanel tool={tool} dict={dict} />;
  }

  return <HeavyToolWorkspace tool={tool} dict={dict} locale={locale} />;
}

export function usesUploadShell(tool: Tool): boolean {
  if (tool.slug === "organize-pdf") return false;
  if (
    tool.engine === "editor" ||
    tool.engine === "kiosk" ||
    tool.engine === "in-person" ||
    tool.engine === "ai-assist" ||
    tool.engine === "create" ||
    tool.engine === "status" ||
    tool.engine === "password-gen"
  ) {
    return false;
  }
  return true;
}
