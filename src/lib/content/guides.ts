export type GuideSection = {
  heading: string;
  paragraphs: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: GuideSection[];
  relatedTools: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "browser-pdf-privacy",
    title: "How browser-based PDF tools keep files on your device",
    description:
      "Learn how in-browser PDF editing differs from cloud upload tools, what stays local, and how to check whether a free PDF site processes files on your device.",
    updated: "November 25, 2026",
    intro:
      "People search for free PDF editors every day, but the privacy trade-off is often unclear. Some sites upload every file to a remote server. Others, including myonlinepdfeditor.com, run ordinary editing and conversion jobs inside your browser so the document does not need to leave your device for those workflows.",
    sections: [
      {
        heading: "What “processed in your browser” means",
        paragraphs: [
          "A browser-based PDF tool loads JavaScript libraries (for example a PDF engine) into your tab. When you choose a file, the browser reads it locally, applies the edit or conversion, and lets you download a new file. The raw document is not posted to our application servers as part of that ordinary workflow.",
          "That model is different from classic SaaS converters that ask you to upload a file, wait for a server queue, then download the result from their storage. Both approaches can be legitimate; they simply answer different product requirements. If your priority is keeping a contract or medical scan off someone else’s disk for a simple merge or compress job, a local-in-browser tool is usually the better fit.",
        ],
      },
      {
        heading: "What can still leave your device",
        paragraphs: [
          "Hosting providers still see standard request logs when you load the website itself: IP address, user agent, and which URL you opened. Ads and analytics scripts (when present) may also request resources from third parties. None of that is the same as uploading your PDF for processing, but it is still worth reading the Privacy Policy.",
          "Some advanced or niche formats may be documented as guidance-only when a full in-browser converter is not available. Those pages explain desktop steps instead of pretending a conversion finished in the tab. We label them as guides so you are not surprised.",
        ],
      },
      {
        heading: "Practical checklist before you trust any free PDF site",
        paragraphs: [
          "Open the tool page and look for a clear statement about where processing happens. Prefer pages that say files stay in the browser for ordinary tools, and that spell out exceptions.",
          "Use a throwaway sample file first. Confirm the download looks correct before you open a sensitive original.",
          "Prefer HTTPS, a real About/Contact page, and published terms. Thin “tool only” pages with no operator information are a common red flag for both users and ad networks.",
          "When you finish, close the tab if you shared a computer. Local processing still means the file briefly exists in browser memory.",
        ],
      },
      {
        heading: "How myonlinepdfeditor.com fits",
        paragraphs: [
          "Our catalog focuses on everyday PDF jobs: edit, sign, merge, split, compress, convert images and office formats, and organize pages. The product promise is simple—free forever for the unlocked catalog, no signup wall for core tools, and browser-side processing for ordinary workflows.",
          "If you need enterprise SSO, desktop apps, or multi-gigabyte batch queues, a paid cloud suite may still be the right product. For students, freelancers, and small teams who just need to finish a file today without a subscription, a browser toolkit is usually enough.",
        ],
      },
    ],
    relatedTools: ["edit-pdf", "merge-pdf", "compress-pdf", "sign-pdf"],
  },
  {
    slug: "merge-pdf-without-messing-up-order",
    title: "How to merge PDFs without messing up page order",
    description:
      "A practical guide to combining PDF files in the right order, fixing rotated pages, and avoiding common merge mistakes before you email or print the result.",
    updated: "November 25, 2026",
    intro:
      "Merging PDFs sounds trivial until page 17 of a scanned appendix lands in the wrong place. This guide walks through a reliable order of operations you can use on myonlinepdfeditor.com or any serious merge tool.",
    sections: [
      {
        heading: "Start with a clear stack, not a pile",
        paragraphs: [
          "Name your source files before you open the merge tool: 01-cover.pdf, 02-body.pdf, 03-appendix.pdf. Alphabetical upload order is still the most common reason merges go wrong. If your phone camera produced IMG_2401.pdf style names, rename them on the desktop first.",
          "Open Merge PDF, add the files, then drag the list into the final reading order. Do not download yet. Scroll the preview if the tool offers one, or open each source briefly to confirm the first and last page look right.",
        ],
      },
      {
        heading: "Fix rotation and blank pages before you combine",
        paragraphs: [
          "A sideways scan will stay sideways after a merge. Rotate those pages in a dedicated rotate or organize tool first, then merge. The same rule applies to accidental blank sheets from a feeder—delete them before you create the combined file, or you will ship empty pages to a client.",
          "If one attachment is a huge image-heavy scan, compress it first. Merging five 40 MB scans into a 200 MB email attachment creates a second problem after you solve the first.",
        ],
      },
      {
        heading: "After the merge: a 60-second QA pass",
        paragraphs: [
          "Open the downloaded PDF and jump to page 1, a middle section, and the last page. Check bookmarks or outline entries if they mattered in the originals—some merges flatten outlines.",
          "Search for a unique phrase from each source document. If a search fails, you may have merged an image-only scan that needs OCR elsewhere, or you dropped a file from the stack.",
          "Only then attach the file to email or upload it to a portal. Re-merging after you already sent the wrong order wastes more time than a short preview.",
        ],
      },
      {
        heading: "When not to merge",
        paragraphs: [
          "Keep files separate when a recipient needs to sign only one packet, when portals enforce per-document uploads, or when file-size caps are tight. In those cases, compress or split instead of creating one giant PDF.",
        ],
      },
    ],
    relatedTools: ["merge-pdf", "organize-pdf", "rotate-pdf", "compress-pdf"],
  },
  {
    slug: "esign-pdf-checklist",
    title: "E-sign a PDF checklist: consent, appearance, and download",
    description:
      "Use this checklist before you type, draw, or upload a signature on a PDF—covering consent, appearance quality, and what an electronic signature does and does not prove.",
    updated: "November 25, 2026",
    intro:
      "Electronic signatures are convenient, but casual markup is not the same as a full certificate-based signing ceremony. Use this checklist so the PDF you send looks intentional and the process stays honest.",
    sections: [
      {
        heading: "Confirm the parties agree to sign electronically",
        paragraphs: [
          "US ESIGN and UETA frameworks generally allow electronic signatures when parties consent to do business electronically. If the other party expects wet ink, overnight mail, or a specific vendor (DocuSign, Adobe Sign), do not surprise them with a drawn PNG on page three.",
          "Our eSign compliance page summarizes how typed, drawn, and uploaded signatures are commonly used. It is not legal advice for your jurisdiction—regulated industries may need certificate-based or identity-verified signing.",
        ],
      },
      {
        heading: "Prepare the document before you sign",
        paragraphs: [
          "Finish edits first. Signing a draft that still needs redlines creates version chaos. Flatten or lock form fields only after the content is final if your workflow requires it.",
          "Leave clear space for the signature and date. If the PDF is a scan, make sure contrast is high enough that a black ink stroke remains readable when printed.",
        ],
      },
      {
        heading: "Choose an appearance that looks deliberate",
        paragraphs: [
          "A tiny faint scribble in the corner reads as accidental. Use the Sign PDF tool to place a sized signature, initials if needed, and a readable date. Preview at 100% zoom before download.",
          "If multiple people must sign, agree on order. Send the file to the next signer only after you verify your own signature landed on the correct line.",
        ],
      },
      {
        heading: "What self-serve e-sign does not automatically include",
        paragraphs: [
          "Browser self-sign tools typically do not issue cryptographic certificates, government ID checks, or tamper-evident audit trails comparable to enterprise signing platforms. If a bank, court, or HR system requires those controls, use the platform they specify.",
          "Keep your own records: the final PDF, the date you sent it, and any email confirmation from the other party. Good file hygiene prevents most “which version did we sign?” disputes.",
        ],
      },
    ],
    relatedTools: ["sign-pdf", "edit-pdf", "flatten-pdf"],
  },
  {
    slug: "free-pdf-editor-vs-paid",
    title: "Free PDF editor vs paid suites: when each one wins",
    description:
      "Compare free browser PDF editors with paid suites like iLovePDF Premium or Smallpdf Pro—limits, privacy, apps, and when paying is actually worth it.",
    updated: "November 25, 2026",
    intro:
      "Paid PDF suites advertise unlimited batches, desktop apps, and priority support. Free browser editors advertise no signup and local processing. Both can be correct purchases depending on the job. Here is a practical way to choose.",
    sections: [
      {
        heading: "Choose free browser tools when…",
        paragraphs: [
          "You merge, compress, rotate, or sign a few documents a week. You care that ordinary files stay in the browser. You do not want another subscription. You are fine with ads that fund the toolkit.",
          "myonlinepdfeditor.com is built for that profile: unlocked catalog tools, no account wall for core jobs, and copy on each page that explains the workflow in plain language.",
        ],
      },
      {
        heading: "Choose a paid suite when…",
        paragraphs: [
          "You hit published free-tier caps every day (for example small per-task file limits on cloud converters). You need native desktop or mobile apps. You need team SSO, centralized billing, or vendor-backed e-sign custody.",
          "Compare live pricing pages before you buy—limits and regional prices change. Our /vs/ilovepdf and /vs/smallpdf pages summarize sourced differences and where those products still win.",
        ],
      },
      {
        heading: "Avoid false economies",
        paragraphs: [
          "A “free” tool that uploads sensitive files to an unknown host can cost more than a subscription if data leaks. Likewise, paying annually for Premium when you only merge two PDFs a month is usually wasted spend.",
          "Write down your top three weekly PDF tasks. If a free browser tool covers all three cleanly, stay free. If two of the three require apps or huge batches, budget for a paid plan and keep the free site as a backup for small jobs.",
        ],
      },
    ],
    relatedTools: ["edit-pdf", "merge-pdf", "compress-pdf"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function allGuideSlugs(): string[] {
  return GUIDES.map((guide) => guide.slug);
}
