export type Feature = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  toolSlug: string;
  category: string;
};

export const FEATURES: Feature[] = [
  {
    slug: "create-a-new-pdf-document",
    name: "Create a New PDF Document",
    summary: "Start from scratch and save a brand-new PDF.",
    description:
      "Launch a blank canvas, add pages, and build a PDF for handouts, checklists, or internal docs without installing desktop software.",
    toolSlug: "create-pdf",
    category: "edit",
  },
  {
    slug: "upload-a-pdf-document",
    name: "Upload a PDF Document",
    summary: "Open any PDF from your computer in myonlinepdfeditor.com.",
    description:
      "Drag a file into the editor to view, annotate, and export. Uploads stay in your browser memory—they are not stored on myonlinepdfeditor.com servers.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-images-to-a-pdf",
    name: "Add Images to a PDF",
    summary: "Embed photos and graphics on any page.",
    description:
      "Insert PNG or JPG assets for logos, diagrams, or scanned signatures. Resize and position before you flatten or export.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "convert-pdf-document-into-template",
    name: "Convert a PDF Into a Template",
    summary: "Turn a static PDF into a reusable form layout.",
    description:
      "Add fields and labels on top of an existing PDF so you can send the same structure again and again.",
    toolSlug: "create-templates",
    category: "forms",
  },
  {
    slug: "add-text-to-a-pdf",
    name: "Add Text to a PDF",
    summary: "Type new wording directly on the page.",
    description:
      "Place text boxes for names, addresses, or instructions anywhere you need editable overlay content.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-checkmark-to-a-pdf",
    name: "Add a Checkmark to a PDF",
    summary: "Mark completed items with check marks.",
    description:
      "Use checkbox fields or draw tools to show completed tasks on printed or digital forms.",
    toolSlug: "add-fillable-fields",
    category: "forms",
  },
  {
    slug: "add-date-to-a-pdf",
    name: "Add a Date to a PDF",
    summary: "Stamp today’s date or a custom date string.",
    description:
      "Type a date in a text box so contracts, logs, and receipts show when they were completed.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-rectangle-to-a-pdf",
    name: "Add a Rectangle to a PDF",
    summary: "Draw boxes to frame content or highlight areas.",
    description:
      "Use shape drawing to outline tables, emphasize sections, or mask regions before sharing.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-circle-to-a-pdf",
    name: "Add a Circle to a PDF",
    summary: "Circle key figures or diagram parts.",
    description:
      "Freehand or shape tools help reviewers point to numbers, chart slices, or map locations.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-line-to-a-pdf",
    name: "Add a Line to a PDF",
    summary: "Underline connections with straight lines.",
    description:
      "Connect labels to objects or separate sections with clean vector lines on the page.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-arrow-to-a-pdf",
    name: "Add an Arrow to a PDF",
    summary: "Point readers to the next step.",
    description:
      "Arrows clarify workflows on diagrams, floor plans, and annotated screenshots.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "draw-on-a-pdf",
    name: "Draw on a PDF",
    summary: "Sketch freely with pen-style markup.",
    description:
      "Markup PDFs like paper—circle errors, doodle feedback, or sign informal approvals.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "whiteout-text-in-a-pdf",
    name: "Whiteout Text in a PDF",
    summary: "Hide outdated text under white cover.",
    description:
      "Cover old account numbers or typos before sending an updated version to clients.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "redact-pdf",
    name: "Redact a PDF",
    summary: "Black out sensitive content permanently.",
    description:
      "Apply opaque redaction blocks so private data cannot be recovered from the shared file.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "highlight-text-in-a-pdf",
    name: "Highlight Text in a PDF",
    summary: "Emphasize quotes and deadlines in color.",
    description:
      "Translucent highlights make study notes and contract clauses easy to spot later.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "underline-text-in-a-pdf",
    name: "Underline Text in a PDF",
    summary: "Underline phrases for emphasis.",
    description:
      "Draw underlines on headings or terms so reviewers know what changed in the latest draft.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "strikeout-text-in-a-pdf",
    name: "Strikeout Text in a PDF",
    summary: "Cross out superseded language.",
    description:
      "Show removed clauses or deprecated instructions without deleting the original text.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-a-stamp-to-a-pdf",
    name: "Add a Stamp to a PDF",
    summary: "Apply APPROVED, PAID, or custom stamps.",
    description:
      "Visible stamps speed up AP, HR, and legal workflows when a wet stamp is not available.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "add-text-field-in-a-pdf",
    name: "Add a Text Field in a PDF",
    summary: "Let readers type answers in a box.",
    description:
      "Single-line fields collect names, IDs, and short answers on digital forms.",
    toolSlug: "add-fillable-fields",
    category: "forms",
  },
  {
    slug: "add-paragraph-field-in-a-pdf",
    name: "Add a Paragraph Field in a PDF",
    summary: "Multi-line areas for longer responses.",
    description:
      "Larger text areas capture descriptions, feedback, and open-ended survey answers.",
    toolSlug: "add-fillable-fields",
    category: "forms",
  },
  {
    slug: "add-dropdown-field-in-a-pdf",
    name: "Add a Dropdown Field in a PDF",
    summary: "Offer fixed choices in a pick list.",
    description:
      "Dropdown-style fields reduce typos when respondents choose from predefined options.",
    toolSlug: "create-fillable-forms",
    category: "forms",
  },
  {
    slug: "add-signature-field-in-a-pdf",
    name: "Add a Signature Field in a PDF",
    summary: "Show signers exactly where to sign.",
    description:
      "Reserved signature boxes make eSign completion faster and less ambiguous.",
    toolSlug: "add-fillable-fields",
    category: "forms",
  },
  {
    slug: "add-initials-field-in-a-pdf",
    name: "Add an Initials Field in a PDF",
    summary: "Collect initials on each section.",
    description:
      "Initial fields remind signers to acknowledge individual pages or exhibits.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
  {
    slug: "add-date-field-in-a-pdf",
    name: "Add a Date Field in a PDF",
    summary: "Prompt signers for a signature date.",
    description:
      "Pair date fields with signatures for complete acknowledgment blocks on contracts.",
    toolSlug: "add-fillable-fields",
    category: "forms",
  },
  {
    slug: "add-checkbox-field-in-a-pdf",
    name: "Add a Checkbox Field in a PDF",
    summary: "Clickable yes/no boxes on forms.",
    description:
      "Structured checkboxes replace handwriting on permissions, waivers, and surveys.",
    toolSlug: "add-fillable-fields",
    category: "forms",
  },
  {
    slug: "append-blank-page-in-a-pdf",
    name: "Append a Blank Page in a PDF",
    summary: "Add empty pages at the end or middle.",
    description:
      "Insert sheets for notes, exhibits, or signatures that will be added later.",
    toolSlug: "edit-pdf",
    category: "organize",
  },
  {
    slug: "insert-and-merge-pdf",
    name: "Insert and Merge PDFs",
    summary: "Combine another file into your packet.",
    description:
      "Attach appendices, invoices, or cover letters by merging PDFs in order.",
    toolSlug: "merge-pdf",
    category: "organize",
  },
  {
    slug: "reorder-pages-in-a-pdf",
    name: "Reorder Pages in a PDF",
    summary: "Fix page sequence with drag-and-drop.",
    description:
      "Put terms before signatures or move scanned backs beside their fronts.",
    toolSlug: "reorder-pdf",
    category: "organize",
  },
  {
    slug: "rotate-pages-in-a-pdf",
    name: "Rotate Pages in a PDF",
    summary: "Turn sideways scans upright.",
    description:
      "Rotate one page or the entire document before printing or merging.",
    toolSlug: "rotate-pdf",
    category: "organize",
  },
  {
    slug: "duplicate-pages-in-a-pdf",
    name: "Duplicate Pages in a PDF",
    summary: "Copy a page inside the same file.",
    description:
      "Repeat terms sheets or W-9 copies without maintaining separate source files.",
    toolSlug: "reorder-pdf",
    category: "organize",
  },
  {
    slug: "delete-pages-from-a-pdf",
    name: "Delete Pages from a PDF",
    summary: "Remove blanks and junk scans.",
    description:
      "Trim shipping labels, failed scans, or obsolete appendices from a bundle.",
    toolSlug: "delete-pages",
    category: "organize",
  },
  {
    slug: "number-and-label-pages-on-a-pdf",
    name: "Number and Label Pages on a PDF",
    summary: "Automatic footers with page numbers.",
    description:
      "Keep lengthy filings and manuals easy to reference in meetings and court.",
    toolSlug: "edit-pdf",
    category: "organize",
  },
  {
    slug: "add-comments-on-a-pdf",
    name: "Add Comments on a PDF",
    summary: "Leave notes for collaborators.",
    description:
      "Sticky comments explain why a clause changed without altering the underlying text.",
    toolSlug: "add-comments",
    category: "share",
  },
  {
    slug: "send-pdf-via-shareable-link",
    name: "Send a PDF via Shareable Link",
    summary: "Export a final file for your cloud link.",
    description:
      "Download a clean PDF and upload it to Drive, Dropbox, or email—myonlinepdfeditor.com never hosts your document.",
    toolSlug: "share-via-link",
    category: "share",
  },
  {
    slug: "bulk-sending",
    name: "Bulk Sending of PDFs",
    summary: "Prepare multiple packets for distribution.",
    description:
      "Merge and field-tag batches of similar agreements so each recipient gets a consistent layout.",
    toolSlug: "send-for-signature",
    category: "sign",
  },
  {
    slug: "track-pdf-document-status",
    name: "Track PDF Document Status",
    summary: "Stamp versions to show review state.",
    description:
      "Use audit stamps and comments to mark drafts versus approved copies across your team.",
    toolSlug: "pdf-audit-trail",
    category: "secure",
  },
  {
    slug: "add-signature-on-desktop-to-a-pdf",
    name: "Add a Signature on Desktop to a PDF",
    summary: "Sign with mouse or trackpad on your computer.",
    description:
      "Draw a natural signature directly on the PDF page and export in one session.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
  {
    slug: "add-an-image-of-your-signature-to-a-pdf",
    name: "Add an Image of Your Signature",
    summary: "Paste a scanned signature PNG.",
    description:
      "Upload a transparent signature image and place it on every form you file.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
  {
    slug: "add-initials-to-a-pdf",
    name: "Add Initials to a PDF",
    summary: "Initial exhibits and rider pages.",
    description:
      "Small initial marks prove each section was reviewed before final signature.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
  {
    slug: "add-multiple-signers-to-a-pdf",
    name: "Add Multiple Signers to a PDF",
    summary: "Allocate fields for every party.",
    description:
      "Lay out signature blocks for clients, witnesses, and countersigners in one pass.",
    toolSlug: "send-for-signature",
    category: "sign",
  },
  {
    slug: "set-signing-order-for-a-pdf",
    name: "Set Signing Order for a PDF",
    summary: "Label who signs first and next.",
    description:
      "Number signer fields so routing matches your policy before you export the packet.",
    toolSlug: "send-for-signature",
    category: "sign",
  },
  {
    slug: "document-audit",
    name: "Document Audit Trail",
    summary: "Show when a PDF was reviewed.",
    description:
      "Visible audit stamps document reviewer and date for lightweight governance.",
    toolSlug: "pdf-audit-trail",
    category: "secure",
  },
  {
    slug: "password-protect-document",
    name: "Password Protect a Document",
    summary: "Require a passphrase to open the PDF.",
    description:
      "Encrypt files that contain financial, medical, or personal data before emailing.",
    toolSlug: "set-pdf-password",
    category: "secure",
  },
  {
    slug: "certify-document",
    name: "Certify a Document",
    summary: "Mark the authoritative final PDF.",
    description:
      "Certification banners tell recipients this copy is the approved release.",
    toolSlug: "certify-pdf",
    category: "secure",
  },
  {
    slug: "convert-word-to-pdf",
    name: "Convert Word to PDF",
    summary: "Export DOCX files as PDF.",
    description:
      "Share resumes, policies, and proposals in a format anyone can open.",
    toolSlug: "word-to-pdf",
    category: "convert",
  },
  {
    slug: "convert-txt-to-pdf",
    name: "Convert TXT to PDF",
    summary: "Turn plain text files into PDF pages.",
    description:
      "Archive logs and configs as paginated PDFs for long-term storage.",
    toolSlug: "txt-to-pdf",
    category: "convert",
  },
  {
    slug: "convert-html-to-pdf",
    name: "Convert HTML to PDF",
    summary: "Save web snippets as PDF.",
    description:
      "Capture HTML articles or receipts as portable documents.",
    toolSlug: "html-to-pdf",
    category: "convert",
  },
  {
    slug: "convert-csv-to-pdf",
    name: "Convert CSV to PDF",
    summary: "Printable tables from spreadsheet exports.",
    description:
      "Hand finance or ops stakeholders a fixed PDF instead of editable spreadsheets.",
    toolSlug: "csv-to-pdf",
    category: "convert",
  },
  {
    slug: "convert-rtf-to-pdf",
    name: "Convert RTF to PDF",
    summary: "Modernize older rich-text files.",
    description:
      "Open legacy RTF correspondence and save universal PDF copies.",
    toolSlug: "rtf-to-pdf",
    category: "convert",
  },
  {
    slug: "convert-jpgjpeg-to-pdf",
    name: "Convert JPG/JPEG to PDF",
    summary: "Photo albums as multi-page PDFs.",
    description:
      "Combine camera JPEGs into one file for insurance claims or portfolios.",
    toolSlug: "jpg-to-pdf",
    category: "convert",
  },
  {
    slug: "convert-png-to-pdf",
    name: "Convert PNG to PDF",
    summary: "Lossless screenshots in PDF form.",
    description:
      "Preserve crisp UI captures and diagrams in a single PDF attachment.",
    toolSlug: "png-to-pdf",
    category: "convert",
  },
  {
    slug: "print-out-pdf",
    name: "Print Out a PDF",
    summary: "Prepare a PDF for your printer.",
    description:
      "Fix rotation and page order in myonlinepdfeditor.com, then print from your browser or OS viewer.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "download-pdf",
    name: "Download a PDF",
    summary: "Save edited files back to your device.",
    description:
      "Every tool ends with a local download—no account vault required.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "export-pdf",
    name: "Export a PDF",
    summary: "Flatten and export a finished copy.",
    description:
      "Export merges annotations and fields into a standard PDF others can open anywhere.",
    toolSlug: "share-via-link",
    category: "share",
  },
  {
    slug: "flatten-fields-on-a-pdf",
    name: "Flatten Fields on a PDF",
    summary: "Lock form values into the page.",
    description:
      "Prevent accidental edits after a form is signed and submitted.",
    toolSlug: "flatten-fields",
    category: "edit",
  },
  {
    slug: "send-out-pdf-documents-for-signature",
    name: "Send PDF Documents for Signature",
    summary: "Prepare signature-ready agreements.",
    description:
      "Tag signature and date fields, then share the PDF through your preferred channel.",
    toolSlug: "send-for-signature",
    category: "sign",
  },
  {
    slug: "send-envelopes-for-esignature",
    name: "Send Envelopes for eSignature",
    summary: "Bundle multiple docs for signing.",
    description:
      "Merge related PDFs and add fields once so signers see one coherent envelope.",
    toolSlug: "merge-pdf",
    category: "organize",
  },
  {
    slug: "ai-document-assistant",
    name: "AI Document Assistant",
    summary: "Local text helper for PDF content.",
    description:
      "Extract text in-browser and draft outlines or rewrites without cloud document storage.",
    toolSlug: "document-assistant",
    category: "ai",
  },
  {
    slug: "simplify-pdf-documents-with-ai",
    name: "Simplify PDF Documents with AI",
    summary: "Plain-language versions of dense text.",
    description:
      "Simplify extracted wording for clients, patients, or students who need clarity.",
    toolSlug: "simplify-document",
    category: "ai",
  },
  {
    slug: "summarize-documents-with-ai",
    name: "Summarize Documents with AI",
    summary: "Quick bullet summaries from long PDFs.",
    description:
      "Orient yourself before meetings with summaries generated from local text extraction.",
    toolSlug: "summarize-key-points",
    category: "ai",
  },
  {
    slug: "get-answers-from-documents-with-ai",
    name: "Get Answers from Documents with AI",
    summary: "Ask questions against extracted text.",
    description:
      "Find relevant sentences in policies or manuals without uploading the full PDF.",
    toolSlug: "ask-document",
    category: "ai",
  },
  {
    slug: "in-person-signing",
    name: "In-Person Signing",
    summary: "Sign on the same device during meetings.",
    description:
      "Pass the laptop or tablet and capture signatures immediately on the PDF.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
  {
    slug: "edit-pdf-text-online",
    name: "Edit PDF Text Online",
    summary: "Change visible text and overlays in the browser.",
    description:
      "Add and adjust text layers for forms, labels, and quick corrections.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "visual-edit",
    name: "Visual PDF Edit",
    summary: "See changes as you place content.",
    description:
      "WYSIWYG placement for text, images, and markup on every page.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "signature-assistant",
    name: "Signature Assistant",
    summary: "Guided steps to place your signature.",
    description:
      "Create, preview, and position a signature in fewer clicks.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
  {
    slug: "create-a-pdf-form",
    name: "Create a PDF Form",
    summary: "Build interactive forms from scratch.",
    description:
      "Combine fields and static labels into a form recipients can complete digitally.",
    toolSlug: "create-fillable-forms",
    category: "forms",
  },
  {
    slug: "create-a-new-template",
    name: "Create a New Template",
    summary: "Save a master layout for repeat use.",
    description:
      "Design once—reopen the template whenever you need the same structure.",
    toolSlug: "create-templates",
    category: "forms",
  },
  {
    slug: "manage-fields-in-a-pdf",
    name: "Manage Fields in a PDF",
    summary: "Add, move, and resize form fields.",
    description:
      "Tune field placement until the form is easy to complete on desktop and mobile.",
    toolSlug: "create-fillable-forms",
    category: "forms",
  },
  {
    slug: "make-fields-required-in-a-pdf",
    name: "Make Fields Required in a PDF",
    summary: "Highlight must-complete inputs.",
    description:
      "Use labels and layout to show which fields signers cannot skip.",
    toolSlug: "create-fillable-forms",
    category: "forms",
  },
  {
    slug: "public-viewing-of-documents",
    name: "Public Viewing of Documents",
    summary: "Share read-only PDF exports.",
    description:
      "Flatten and export PDFs suitable for public handouts and website downloads.",
    toolSlug: "share-via-link",
    category: "share",
  },
  {
    slug: "share-forms-via-email",
    name: "Share Forms via Email",
    summary: "Attach completed fillable PDFs.",
    description:
      "Download the form and attach it to email from your own mailbox.",
    toolSlug: "share-via-link",
    category: "share",
  },
  {
    slug: "template-distribution-via-url",
    name: "Template Distribution via URL",
    summary: "Host templates on your site after export.",
    description:
      "Export the template PDF and link it from your portal or knowledge base.",
    toolSlug: "create-templates",
    category: "forms",
  },
  {
    slug: "set-expiration-date-for-a-pdf",
    name: "Set Expiration Date for a PDF",
    summary: "Note offer or policy end dates on the file.",
    description:
      "Add visible expiration text and protect time-sensitive offers with passwords when needed.",
    toolSlug: "set-pdf-password",
    category: "secure",
  },
  {
    slug: "set-automated-reminders-for-a-pdf",
    name: "Set Automated Reminders for a PDF",
    summary: "Prepare packets signers should return soon.",
    description:
      "Field-tag due dates on the PDF and pair with your calendar reminders outside myonlinepdfeditor.com.",
    toolSlug: "send-for-signature",
    category: "sign",
  },
  {
    slug: "esign-compliance",
    name: "eSign Compliance Helpers",
    summary: "Certify and audit finalized signatures.",
    description:
      "Combine certification stamps, flattening, and audit marks for stronger records.",
    toolSlug: "certify-pdf",
    category: "secure",
  },
  {
    slug: "readable-document",
    name: "Readable Document",
    summary: "Improve clarity of dense PDF text.",
    description:
      "Simplify extracted content and re-export summaries for accessibility-minded readers.",
    toolSlug: "simplify-document",
    category: "ai",
  },
  {
    slug: "group-documents-into-folders",
    name: "Group Documents into Folders",
    summary: "Merge related PDFs into one packet.",
    description:
      "Organize project files by merging categorized PDFs on your device before filing in cloud storage.",
    toolSlug: "merge-pdf",
    category: "organize",
  },
  {
    slug: "split-large-pdf-into-chapters",
    name: "Split Large PDF Into Chapters",
    summary: "Break books and manuals into parts.",
    description:
      "Extract page ranges so each chapter uploads faster to LMS or email.",
    toolSlug: "split-pdf",
    category: "organize",
  },
  {
    slug: "extract-single-page-from-pdf",
    name: "Extract a Single Page from a PDF",
    summary: "Pull one page into its own file.",
    description:
      "Save a certificate, invoice, or signature page without the rest of the scan.",
    toolSlug: "split-pdf",
    category: "organize",
  },
  {
    slug: "compress-pdf-for-email",
    name: "Compress PDF for Email",
    summary: "Shrink attachments under mailbox limits.",
    description:
      "Reduce scan size while keeping text legible for inbox delivery.",
    toolSlug: "edit-pdf",
    category: "organize",
  },
  {
    slug: "combine-images-into-one-pdf",
    name: "Combine Images Into One PDF",
    summary: "Mixed image formats in one export.",
    description:
      "Stack PNG and JPG scans from your phone into a single professional PDF.",
    toolSlug: "jpg-to-pdf",
    category: "convert",
  },
  {
    slug: "scan-to-pdf-workflow",
    name: "Scan to PDF Workflow",
    summary: "Rotate, merge, and compress phone scans.",
    description:
      "Fix orientation, merge multi-page scans, and compress before sending.",
    toolSlug: "merge-pdf",
    category: "organize",
  },
  {
    slug: "fill-existing-government-pdf-forms",
    name: "Fill Government PDF Forms",
    summary: "Complete official PDFs digitally.",
    description:
      "Type into IRS, immigration, or permit PDFs and download a filled copy.",
    toolSlug: "create-fillable-forms",
    category: "forms",
  },
  {
    slug: "add-watermark-style-stamp",
    name: "Add Watermark-Style Stamp",
    summary: "Mark drafts as confidential or sample.",
    description:
      "Diagonal stamps show a document is not final before wide distribution.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "prepare-real-estate-disclosures",
    name: "Prepare Real Estate Disclosures",
    summary: "Initial and sign disclosure packets.",
    description:
      "Place initials on each disclosure page and export for closing.",
    toolSlug: "send-for-signature",
    category: "sign",
  },
  {
    slug: "hr-onboarding-pdf-pack",
    name: "HR Onboarding PDF Pack",
    summary: "Merge policy PDFs for new hires.",
    description:
      "Combine handbook, tax, and policy PDFs with page numbers for day-one signing.",
    toolSlug: "merge-pdf",
    category: "organize",
  },
  {
    slug: "classroom-handout-pdf",
    name: "Classroom Handout PDF",
    summary: "Convert notes and slides to PDF.",
    description:
      "Turn Word lesson plans or image slides into printable PDF handouts.",
    toolSlug: "word-to-pdf",
    category: "convert",
  },
  {
    slug: "invoice-pdf-from-spreadsheet",
    name: "Invoice PDF from Spreadsheet",
    summary: "CSV exports as client-ready PDFs.",
    description:
      "Convert line-item CSV exports into fixed-layout PDF invoices.",
    toolSlug: "csv-to-pdf",
    category: "convert",
  },
  {
    slug: "archive-email-attachments-as-pdf",
    name: "Archive Attachments as PDF",
    summary: "Normalize mixed files into PDF.",
    description:
      "Convert text or image attachments to PDF before long-term archive.",
    toolSlug: "jpg-to-pdf",
    category: "convert",
  },
  {
    slug: "redact-phi-before-sharing",
    name: "Redact PHI Before Sharing",
    summary: "Remove identifiers from health PDFs.",
    description:
      "Black out names, MRNs, and dates before sending excerpts to specialists.",
    toolSlug: "edit-pdf",
    category: "edit",
  },
  {
    slug: "legal-exhibit-labeling",
    name: "Legal Exhibit Labeling",
    summary: "Number exhibits in court filings.",
    description:
      "Apply bates-style page numbers and stamps for exhibit organization.",
    toolSlug: "edit-pdf",
    category: "organize",
  },
  {
    slug: "compare-draft-versions-with-comments",
    name: "Compare Draft Versions with Comments",
    summary: "Annotate differences between review rounds.",
    description:
      "Layer comments on each draft PDF so stakeholders see negotiation history.",
    toolSlug: "add-comments",
    category: "share",
  },
  {
    slug: "mobile-friendly-form-filling",
    name: "Mobile-Friendly Form Filling",
    summary: "Complete PDF forms on a phone browser.",
    description:
      "Fill fields in myonlinepdfeditor.com mobile browsers—files still stay on the device.",
    toolSlug: "create-fillable-forms",
    category: "forms",
  },
  {
    slug: "batch-rotate-scanned-pages",
    name: "Batch Rotate Scanned Pages",
    summary: "Fix an entire mis-fed scan at once.",
    description:
      "Rotate all pages in a skewed batch scan before merging with other docs.",
    toolSlug: "rotate-pdf",
    category: "organize",
  },
  {
    slug: "remove-blank-pages-from-scan",
    name: "Remove Blank Pages from Scan",
    summary: "Delete separator blanks from scans.",
    description:
      "Cut empty pages duplex scanners insert between double-sided documents.",
    toolSlug: "delete-pages",
    category: "organize",
  },
  {
    slug: "duplicate-nda-for-each-vendor",
    name: "Duplicate NDA Template per Vendor",
    summary: "Clone a template before each send.",
    description:
      "Start from your NDA template PDF and customize fields per counterparty.",
    toolSlug: "create-templates",
    category: "forms",
  },
  {
    slug: "type-signature-instead-of-draw",
    name: "Type a Signature Instead of Draw",
    summary: "Typed cursive-style signature line.",
    description:
      "Use typed signature mode when a mouse signature is hard to read.",
    toolSlug: "sign-pdf",
    category: "sign",
  },
];

const featureBySlug = new Map(FEATURES.map((f) => [f.slug, f]));

export function getFeature(slug: string): Feature | undefined {
  return featureBySlug.get(slug);
}

export function allFeatureSlugs(): string[] {
  return FEATURES.map((f) => f.slug);
}