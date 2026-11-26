import { Suspense } from "react";
import { AdSlot } from "@/components/AdSlot";
import { ToolsCatalog } from "@/components/tools/ToolsCatalog";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ToolsIndexView({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="display text-[1.85rem] font-semibold sm:text-4xl">
        {dict.toolsIndex.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
        {dict.toolsIndex.intro}
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
        Each tool page explains what the file format is for, when to use the
        workflow, step-by-step instructions, and FAQs. Processing for ordinary
        tools stays in your browser — you upload, run the job, and download the
        result without creating an account.
      </p>
      <Suspense
        fallback={
          <p className="text-sm text-muted" role="status">
            {dict.common.loadingTool}
          </p>
        }
      >
        <ToolsCatalog locale={locale} dict={dict} />
      </Suspense>
      <AdSlot className="my-10 rounded-xl" />
    </div>
  );
}
