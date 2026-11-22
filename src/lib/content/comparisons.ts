import { site } from "@/lib/site";

export type ComparisonSlug = "ilovepdf" | "smallpdf";

export type ComparisonRow = {
  trigger: string;
  competitor: string;
  us: string;
  source: string;
};

export type ComparisonPage = {
  slug: ComparisonSlug;
  competitorName: string;
  competitorUrl: string;
  title: string;
  description: string;
  h1: string;
  verdict: string;
  checked: string;
  rows: ComparisonRow[];
  pricingNote: string;
  pricingRows: {
    scenario: string;
    competitor: string;
    us: string;
    difference: string;
  }[];
  whereTheyWin: string[];
  migrationSteps: string[];
  faqs: { question: string; answer: string }[];
  ctaHref: string;
  ctaLabel: string;
};

const CHECKED = "November 22, 2026";

export const COMPARISONS: Record<ComparisonSlug, ComparisonPage> = {
  ilovepdf: {
    slug: "ilovepdf",
    competitorName: "iLovePDF",
    competitorUrl: "https://www.ilovepdf.com/pricing",
    title: `${site.name} vs iLovePDF: Free Browser Tools vs Premium Limits`,
    description: `Compare ${site.name} and iLovePDF on free limits, file uploads, Premium pricing, and when each product is the better pick. Checked ${CHECKED}.`,
    h1: `${site.name} vs iLovePDF: local free tools vs cloud Premium`,
    verdict: `Pick iLovePDF if you want mature desktop/mobile apps, workflows, and Premium batch limits. Pick ${site.name} if you want every core tool free forever with processing that stays in your browser for ordinary jobs—no Premium upsell.`,
    checked: CHECKED,
    rows: [
      {
        trigger: "Free plan file-size walls on conversions",
        competitor:
          "Free PDF→Word/Excel/PowerPoint capped at 1 file / 15 MB per task (pricing comparison table)",
        us: "Ordinary convert/edit/merge tools run in-browser without a Premium tier or published 15 MB conversion wall",
        source: "https://www.ilovepdf.com/pricing",
      },
      {
        trigger: "Paid plan required for “unlimited” processing",
        competitor:
          "Premium from $5/mo billed annually ($60/yr) or $9/mo monthly; Business quoted for 25+ users",
        us: "All catalog tools stay free forever (AdSense-funded); pricing page is Free forever",
        source: "https://www.ilovepdf.com/pricing",
      },
      {
        trigger: "Ads on free tier",
        competitor: "Ad-free experience listed as a Premium feature",
        us: "Supported by ads; tools stay unlocked without a paid upgrade",
        source: "https://www.ilovepdf.com/pricing",
      },
      {
        trigger: "Where files are processed",
        competitor:
          "Cloud processing with regional options on Premium; documents uploaded to their service",
        us: "Core PDF flows designed to run in your browser so files need not leave your device for ordinary tools",
        source: `${site.url}/privacy`,
      },
      {
        trigger: "Desktop / mobile apps",
        competitor: "Premium includes Web, Mobile, and Desktop access",
        us: "Web-only today — no native desktop or mobile app",
        source: "https://www.ilovepdf.com/pricing",
      },
      {
        trigger: "Batch merge scale",
        competitor: "Free Merge up to 25 files / 100 MB; Premium up to 500 files / 4 GB",
        us: "Browser memory is the practical limit; no paid unlock for larger batches",
        source: "https://www.ilovepdf.com/pricing (limits also summarized in third-party checks of that table)",
      },
    ],
    pricingNote: `iLovePDF prices and free limits from https://www.ilovepdf.com/pricing (checked ${CHECKED}). ${site.name} has no paid plan.`,
    pricingRows: [
      {
        scenario: "Occasional merge / compress (light use)",
        competitor: "Free (with per-task file/size caps)",
        us: "Free forever",
        difference: "$0 vs $0 — choose on privacy and limits",
      },
      {
        scenario: "Daily heavy conversions hitting free caps",
        competitor: "Premium ≈ $60/yr ($5/mo annual) or $9/mo",
        us: "Free forever (browser limits still apply)",
        difference: "Up to ~$60–$108/yr saved if our tools cover your job",
      },
      {
        scenario: "Team of 25+ needing SSO / contracts",
        competitor: "Business — contact sales",
        us: "Not a fit — no SSO or account manager",
        difference: "iLovePDF wins for enterprise procurement",
      },
    ],
    whereTheyWin: [
      "Native desktop and mobile apps on Premium",
      "Larger published batch and file-size ceilings on Premium (up to 4 GB on many tools)",
      "Workflows that chain tools, digital signature custody features, and education Premium offers",
      "Regional processing controls and ISO27001 messaging on their security marketing",
    ],
    migrationSteps: [
      "List the iLovePDF tools you use weekly (merge, compress, PDF to Word, sign).",
      `Open the matching page under ${site.url}/tools and run one sample file in your browser.`,
      "If a job needs desktop apps, OCR at scale, or 4 GB batches, keep iLovePDF Premium for those tasks.",
      "For everyday free jobs, bookmark our /tools hub and stop uploading files you do not need in the cloud.",
    ],
    faqs: [
      {
        question: "Is myonlinepdfeditor.com really free compared to iLovePDF Premium?",
        answer:
          "Yes for the catalog we ship: there is no Premium plan. We show ads. iLovePDF’s own pricing page lists Premium for unlimited processing, apps, and ad-free use.",
      },
      {
        question: "Will my files upload to your servers like iLovePDF?",
        answer:
          "Ordinary tools are built to process in your browser. See our Privacy Policy. iLovePDF processes files in their cloud service with optional regional controls on paid plans.",
      },
      {
        question: "When should I stay on iLovePDF?",
        answer:
          "Stay if you need their desktop/mobile apps, Premium batch limits, workflows, or Business SSO. Those are areas they clearly win today.",
      },
    ],
    ctaHref: "/tools",
    ctaLabel: "Open free PDF tools",
  },
  smallpdf: {
    slug: "smallpdf",
    competitorName: "Smallpdf",
    competitorUrl: "https://smallpdf.com/pricing",
    title: `${site.name} vs Smallpdf: Unlimited Free Tools vs Pro Limits`,
    description: `Compare ${site.name} and Smallpdf on free daily limits, Pro pricing, browser privacy, and when each product wins. Checked ${CHECKED}.`,
    h1: `${site.name} vs Smallpdf: no Pro wall vs Swiss cloud suite`,
    verdict: `Pick Smallpdf if you want a polished Pro suite with desktop/mobile apps, Sign.com features, and team billing. Pick ${site.name} if you want unlimited free access to the tools we list, with in-browser processing and no Pro trial countdown.`,
    checked: CHECKED,
    rows: [
      {
        trigger: "Free daily / download limits",
        competitor:
          "Free plan: limited document downloads / daily limits on many tools; support docs also describe limited free conversions (exact daily number not always published on pricing)",
        us: "No Pro gate on catalog tools — use them without a free-trial clock",
        source: "https://smallpdf.com/pricing and https://smallpdf.com/support",
      },
      {
        trigger: "Paid unlock for full toolkit",
        competitor:
          "Pro / Team paid plans (US offer data commonly ~$9–$12/mo effective; confirm on their checkout — prices vary by region)",
        us: "Free forever catalog; no seat billing",
        source: "https://smallpdf.com/pricing",
      },
      {
        trigger: "File handling model",
        competitor: "Online tools that transfer files over TLS to Smallpdf’s service (per their help center)",
        us: "Core flows designed to stay on-device in the browser",
        source: "https://smallpdf.com/support",
      },
      {
        trigger: "eSign depth",
        competitor: "Sign.com integration with Pro unlocking higher signing limits",
        us: "Lightweight in-browser sign / prepare fields — not a full Sign.com-class custody product",
        source: "https://smallpdf.com/blog/smallpdf-free-vs-pro-plan-comparison",
      },
      {
        trigger: "Apps",
        competitor: "Desktop and mobile apps on paid plans",
        us: "Web-only",
        source: "https://smallpdf.com/pricing",
      },
    ],
    pricingNote: `Smallpdf plan structure from https://smallpdf.com/pricing and Free vs Pro article (checked ${CHECKED}). Confirm live checkout prices for your region. ${site.name} has no paid plan.`,
    pricingRows: [
      {
        scenario: "One-off merge or compress",
        competitor: "Free (subject to download / daily limits)",
        us: "Free forever",
        difference: "$0 vs $0 — choose on limits and privacy",
      },
      {
        scenario: "Daily power user (unlimited downloads)",
        competitor: "Pro — paid monthly or annual (region-specific)",
        us: "Free forever",
        difference: "Avoid Pro if our tools cover your jobs",
      },
      {
        scenario: "Team seats + centralized billing",
        competitor: "Team / Business plans",
        us: "Not offered",
        difference: "Smallpdf wins for multi-seat admin",
      },
    ],
    whereTheyWin: [
      "Mature Pro feature set (OCR, strong compression, batch) with a clear upgrade path",
      "Desktop and mobile apps",
      "Sign.com-oriented signing workflows and certificates of completion on higher tiers",
      "Team admin, centralized billing, and Swiss-branded trust marketing",
    ],
    migrationSteps: [
      "Note which Smallpdf tools hit Free limits for you (downloads, Edit Text, OCR).",
      `Try the same job on ${site.url}/tools without creating an account.`,
      "Keep Smallpdf Pro if you need apps, Sign.com depth, or team seats.",
      "Otherwise replace weekday free tasks with our matching tool URLs.",
    ],
    faqs: [
      {
        question: "Does Smallpdf Free have a hard daily number?",
        answer:
          "Their pricing UI emphasizes limited downloads on Free; help docs have described limited free conversions. They do not always publish a single global number on the pricing table—confirm in-product.",
      },
      {
        question: "Who wins on privacy?",
        answer: `${site.name} optimizes for on-device browser processing for ordinary tools. Smallpdf’s help center describes TLS uploads to their service. Pick based on whether you accept cloud processing.`,
      },
      {
        question: "Can you replace Smallpdf Pro completely?",
        answer:
          "Not for every Pro feature (apps, OCR suites, Sign.com). We aim to replace the free/limited everyday jobs without a paywall.",
      },
    ],
    ctaHref: "/tools",
    ctaLabel: "Browse free tools",
  },
};

export function getComparison(slug: string): ComparisonPage | undefined {
  if (slug === "ilovepdf" || slug === "smallpdf") return COMPARISONS[slug];
  return undefined;
}

export function allComparisonSlugs(): ComparisonSlug[] {
  return Object.keys(COMPARISONS) as ComparisonSlug[];
}
