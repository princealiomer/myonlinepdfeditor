import type { Tool, ToolCopy } from "@/lib/catalog";
import type { Dictionary } from "@/lib/i18n";

type ToolCopySectionsProps = {
  tool: Tool;
  copy: ToolCopy;
  labels?: Dictionary["toolPage"];
};

function fill(template: string, name: string) {
  return template.replace("{name}", name);
}

export function ToolCopySections({
  tool,
  copy,
  labels,
}: ToolCopySectionsProps) {
  const l = labels || {
    freeBadge: "free forever",
    relatedTitle: "Related tools",
    whatIs: "What is {name}?",
    whyUse: "Why use this tool",
    whyBest: "Why myonlinepdfeditor.com is a strong pick",
    howToUse: "How to use {name}",
    howToExport: "How to export your result",
    tidbits: "Tidbits & tips",
    faqs: "FAQs about {name}",
  };

  return (
    <div className="mt-14 space-y-10">
      <section className="surface rounded-2xl p-6 sm:p-8" aria-labelledby="what-heading">
        <h2 id="what-heading" className="display text-2xl font-semibold">
          {fill(l.whatIs, tool.name)}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
          {copy.whatItIs}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-2" aria-labelledby="why-use-heading">
        <div className="surface rounded-2xl p-6 sm:p-8">
          <h2 id="why-use-heading" className="display text-2xl font-semibold">
            {l.whyUse}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {copy.whyUse.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="surface rounded-2xl p-6 sm:p-8">
          <h2 className="display text-2xl font-semibold">{l.whyBest}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {copy.whyBest.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface rounded-2xl p-6 sm:p-8" aria-labelledby="howto-heading">
        <h2 id="howto-heading" className="display text-2xl font-semibold">
          {fill(l.howToUse, tool.name)}
        </h2>
        <ol className="mt-6 space-y-5">
          {copy.howToUse.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-2 sm:grid-cols-[3rem_1fr] sm:gap-4"
            >
              <span className="display text-2xl font-semibold text-teal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface rounded-2xl p-6 sm:p-8" aria-labelledby="export-heading">
          <h2 id="export-heading" className="display text-2xl font-semibold">
            {l.howToExport}
          </h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-soft">
            {copy.howToExport.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="surface rounded-2xl p-6 sm:p-8" aria-labelledby="tidbits-heading">
          <h2 id="tidbits-heading" className="display text-2xl font-semibold">
            {l.tidbits}
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft">
            {copy.tidbits.map((tip) => (
              <li key={tip} className="rounded-xl bg-paper px-3 py-3">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface rounded-2xl p-6 sm:p-8" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="display text-2xl font-semibold">
          {fill(l.faqs, tool.name)}
        </h2>
        <div className="mt-5 space-y-3">
          {copy.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-xl border border-mist bg-paper/70 px-4 py-3"
            >
              <summary className="cursor-pointer font-semibold text-ink">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
