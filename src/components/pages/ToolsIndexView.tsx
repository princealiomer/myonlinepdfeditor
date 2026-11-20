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
      <AdSlot className="my-8 rounded-xl" />
      <ToolsCatalog locale={locale} dict={dict} />
    </div>
  );
}
