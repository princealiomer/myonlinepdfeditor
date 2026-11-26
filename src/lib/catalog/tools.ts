export type ToolCategory =
  | "convert"
  | "edit"
  | "sign"
  | "share"
  | "ai"
  | "other";

export type ToolEngine =
  | "editor"
  | "merge"
  | "split"
  | "rotate"
  | "straighten"
  | "delete-pages"
  | "reorder"
  | "images-to-pdf"
  | "text-to-pdf"
  | "docx-to-pdf"
  | "ppt-to-pdf"
  | "protect"
  | "page-numbers"
  | "compress"
  | "create"
  | "flatten"
  | "readable"
  | "search"
  | "print"
  | "download"
  | "export"
  | "email-share"
  | "fax"
  | "status"
  | "envelope"
  | "bulk-send"
  | "kiosk"
  | "in-person"
  | "ai-assist"
  | "excel-to-pdf"
  | "watermark"
  | "crop"
  | "extract-pages"
  | "repair"
  | "grayscale"
  | "remove-metadata"
  | "pdf-to-images"
  | "pdf-to-text"
  | "pdf-to-excel"
  | "pdf-to-ods"
  | "unlock"
  | "compare"
  | "redact"
  | "invert"
  | "n-up"
  | "overlay"
  | "page-size"
  | "rasterize"
  | "reverse"
  | "zip-to-pdf"
  | "markdown-to-pdf"
  | "image-convert"
  | "compress-images"
  | "odf-to-pdf"
  | "epub-to-pdf"
  | "pdf-to-epub"
  | "eml-to-pdf"
  | "analyze"
  | "doc-info"
  | "viewer-prefs"
  | "bookmark"
  | "pdf-to-html"
  | "pdf-to-markdown"
  | "pdf-to-svg"
  | "xml-invoice"
  | "password-gen"
  | "poster"
  | "embed-snippet"
  | "accessible-checklist"
  | "format-advice"
  | "pdf-to-docx"
  | "pdf-to-odt"
  | "pdf-to-odp"
  | "verify-signatures"
  | "validate-pdfa";

/** live = real conversion; guide = desktop/external guidance only */
export type ToolAvailability = "live" | "guide";

export type Tool = {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  engine: ToolEngine;
  summary: string;
  description: string;
  howTo: string[];
  keywords: string[];
  accept?: string;
  multiFile?: boolean;
  /** Defaults to live. Guide tools must not claim a finished conversion. */
  availability?: ToolAvailability;
};

export const TOOL_CATEGORIES: { id: ToolCategory; label: string }[] = [
  { id: "convert", label: "Convert" },
  { id: "edit", label: "Edit & Annotate" },
  { id: "sign", label: "Sign & Send" },
  { id: "share", label: "Collaborate & Share" },
  { id: "ai", label: "AI Features" },
  { id: "other", label: "Others" },
];

export const TOOLS: Tool[] = [
  // ——— Convert ———
  {
    slug: "word-to-pdf",
    name: "Word to PDF Converter",
    shortName: "Word → PDF",
    category: "convert",
    engine: "docx-to-pdf",
    summary: "Turn DOCX files into polished PDFs in your browser.",
    description:
      "Convert Microsoft Word documents to PDF without uploading them to a server. myonlinepdfeditor.com reads your .docx locally, preserves layout where possible, and gives you a download-ready PDF in seconds.",
    howTo: [
      "Open Word to PDF and choose your .docx file.",
      "Wait for the local conversion to finish.",
      "Preview the result and download your PDF.",
    ],
    keywords: ["word to pdf", "docx to pdf", "convert word document", "docx converter"],
    accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    slug: "txt-to-pdf",
    name: "Text to PDF",
    shortName: "TXT → PDF",
    category: "convert",
    engine: "text-to-pdf",
    summary: "Wrap plain text in a clean, printable PDF page.",
    description:
      "Paste or upload a .txt file and myonlinepdfeditor.com builds a simple PDF with readable typography. Ideal for notes, logs, and scripts you want to archive or share as PDF.",
    howTo: [
      "Upload a .txt file or paste your text.",
      "Adjust page settings if available.",
      "Download the generated PDF.",
    ],
    keywords: ["txt to pdf", "text to pdf", "plain text pdf", "notepad to pdf"],
    accept: ".txt,text/plain",
  },
  {
    slug: "png-to-pdf",
    name: "PNG to PDF",
    shortName: "PNG → PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Combine PNG images into a single PDF.",
    description:
      "Drop one or more PNG files and get a PDF that keeps your image quality. Processing happens entirely in the browser—screenshots and graphics never leave your device.",
    howTo: [
      "Select PNG image files.",
      "Arrange order if you added multiple images.",
      "Download your PDF.",
    ],
    keywords: ["png to pdf", "convert png", "image to pdf", "screenshot to pdf"],
    accept: "image/png,.png",
    multiFile: true,
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG/JPEG to PDF",
    shortName: "JPG → PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Convert JPEG photos into a PDF document.",
    description:
      "Turn JPG and JPEG photos into a shareable PDF. Merge several photos into one file for printing or emailing, with all conversion done locally.",
    howTo: [
      "Upload JPG or JPEG files.",
      "Reorder pages if needed.",
      "Save the combined PDF.",
    ],
    keywords: ["jpg to pdf", "jpeg to pdf", "photo to pdf", "image to pdf"],
    accept: "image/jpeg,.jpg,.jpeg",
    multiFile: true,
  },
  {
    slug: "ppt-to-pdf",
    name: "PPT to PDF",
    shortName: "PPT → PDF",
    category: "convert",
    engine: "ppt-to-pdf",
    summary: "Turn PowerPoint (.pptx) slide text into a downloadable PDF.",
    description:
      "Convert PPTX decks locally by extracting slide text into a clean PDF. For pixel-perfect slides, export images from PowerPoint and use JPG/PNG to PDF.",
    howTo: [
      "Upload a .pptx file (save legacy .ppt as PPTX first).",
      "Wait for local slide text extraction.",
      "Download the generated PDF.",
    ],
    keywords: ["ppt to pdf", "pptx to pdf", "powerpoint to pdf", "convert slides pdf"],
    accept:
      ".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    slug: "csv-to-pdf",
    name: "CSV to PDF",
    shortName: "CSV → PDF",
    category: "convert",
    engine: "text-to-pdf",
    summary: "Present spreadsheet data as a formatted PDF table.",
    description:
      "Upload a CSV file and convert rows into a readable PDF layout. Handy for sharing reports with people who only need a fixed, print-friendly view.",
    howTo: [
      "Upload your .csv file.",
      "Check the table preview.",
      "Download the PDF report.",
    ],
    keywords: ["csv to pdf", "spreadsheet to pdf", "export csv pdf", "data to pdf"],
    accept: ".csv,text/csv",
  },
  {
    slug: "html-to-pdf",
    name: "HTML to PDF",
    shortName: "HTML → PDF",
    category: "convert",
    engine: "text-to-pdf",
    summary: "Render HTML markup as a PDF for printing or archiving.",
    description:
      "Paste HTML or upload an .html file and myonlinepdfeditor.com produces a PDF snapshot suitable for records, handouts, or offline reading—without sending your content to the cloud.",
    howTo: [
      "Paste HTML or upload an .html file.",
      "Review the rendered preview.",
      "Download the PDF.",
    ],
    keywords: ["html to pdf", "web page to pdf", "save html as pdf", "html print pdf"],
    accept: ".html,.htm,text/html",
  },
  {
    slug: "rtf-to-pdf",
    name: "RTF to PDF",
    shortName: "RTF → PDF",
    category: "convert",
    engine: "text-to-pdf",
    summary: "Convert Rich Text Format files into standard PDFs.",
    description:
      "Open legacy .rtf documents and save them as PDF for universal viewing. myonlinepdfeditor.com processes the file on your machine so sensitive drafts stay private.",
    howTo: [
      "Choose an .rtf file from your computer.",
      "Wait for local conversion.",
      "Download the PDF.",
    ],
    keywords: ["rtf to pdf", "rich text to pdf", "convert rtf", "rtf converter"],
    accept: ".rtf,application/rtf",
  },
  {
    slug: "excel-to-pdf",
    name: "Excel to PDF",
    shortName: "Excel → PDF",
    category: "convert",
    engine: "excel-to-pdf",
    summary: "Convert XLSX spreadsheets into shareable PDF tables.",
    description:
      "Turn Excel workbooks into PDF for printing, emailing, or archiving. myonlinepdfeditor.com reads .xlsx locally and lays out sheet data in a fixed PDF view recipients cannot accidentally edit.",
    howTo: [
      "Upload your .xlsx spreadsheet (or a CSV).",
      "Convert locally — every sheet becomes a text section in the PDF.",
      "Download the generated PDF.",
    ],
    keywords: ["excel to pdf", "xlsx to pdf", "spreadsheet to pdf", "convert excel pdf"],
    accept:
      ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    slug: "webp-to-pdf",
    name: "WebP to PDF",
    shortName: "WebP → PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Combine WebP images into a single PDF.",
    description:
      "Convert modern WebP graphics into a PDF you can attach or print. Merge multiple WebP files in order without uploading them to a remote server.",
    howTo: [
      "Select one or more WebP files.",
      "Reorder images if you added several.",
      "Download your PDF.",
    ],
    keywords: ["webp to pdf", "convert webp", "webp image pdf"],
    accept: "image/webp,.webp",
    multiFile: true,
  },
  {
    slug: "gif-to-pdf",
    name: "GIF to PDF",
    shortName: "GIF → PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Turn GIF images into a printable PDF.",
    description:
      "Place GIF frames or stills into a PDF document for records and sharing. Processing runs in your browser so animated or branded GIFs stay on your device.",
    howTo: [
      "Upload GIF image files.",
      "Arrange page order when using multiple files.",
      "Save the combined PDF.",
    ],
    keywords: ["gif to pdf", "convert gif", "gif image to pdf"],
    accept: "image/gif,.gif",
    multiFile: true,
  },
  {
    slug: "bmp-to-pdf",
    name: "BMP to PDF",
    shortName: "BMP → PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Convert bitmap (BMP) images into PDF pages.",
    description:
      "Legacy BMP scans and exports become easy-to-share PDFs. Stack several bitmaps into one file for printing or submission portals.",
    howTo: [
      "Choose BMP files from your computer.",
      "Upload order becomes page order (first file = first page).",
      "Download the PDF.",
    ],
    keywords: ["bmp to pdf", "bitmap to pdf", "convert bmp pdf"],
    accept: "image/bmp,.bmp,image/x-ms-bmp",
    multiFile: true,
  },
  {
    slug: "images-to-pdf",
    name: "Images to PDF",
    shortName: "Images → PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Merge mixed image formats into one ordered PDF.",
    description:
      "Drop PNG, JPG, WebP, GIF, BMP, and other supported images and get a single PDF in upload order. Ideal for scan batches and photo packets.",
    howTo: [
      "Add multiple image files of any supported type.",
      "Upload order becomes page order (reorder by removing and re-adding if needed).",
      "Download the merged PDF.",
    ],
    keywords: ["images to pdf", "photos to pdf", "combine images pdf", "picture to pdf"],
    accept: "image/*",
    multiFile: true,
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    shortName: "PDF → JPG",
    category: "convert",
    engine: "pdf-to-images",
    summary: "Export PDF pages as high-quality JPEG images.",
    description:
      "Rasterize each PDF page to JPG for slides, social posts, or systems that reject PDF. Choose pages or the whole document; downloads stay on your device.",
    howTo: [
      "Upload the PDF to convert.",
      "Select pages or export all.",
      "Download JPG files or a ZIP of pages.",
    ],
    keywords: ["pdf to jpg", "pdf to jpeg", "convert pdf images", "pdf to image"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-png",
    name: "PDF to PNG",
    shortName: "PDF → PNG",
    category: "convert",
    engine: "pdf-to-images",
    summary: "Save PDF pages as lossless PNG images.",
    description:
      "Pull crisp PNG screenshots from PDF pages when you need transparency-friendly graphics or lossless archival frames.",
    howTo: [
      "Open your PDF in PDF to PNG.",
      "Pick resolution or page range if offered.",
      "Download PNG outputs.",
    ],
    keywords: ["pdf to png", "pdf to image png", "export pdf png"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-word",
    name: "PDF to Word",
    shortName: "PDF → Word",
    category: "convert",
    engine: "pdf-to-docx",
    summary: "Extract PDF text into an editable Word .docx download.",
    description:
      "Pull readable text from a PDF and export a real .docx you can open in Word or Google Docs. Best for text-heavy documents; scanned pages may need OCR elsewhere first.",
    howTo: [
      "Upload the PDF.",
      "Run text extraction locally.",
      "Download the .docx export.",
    ],
    keywords: ["pdf to word", "pdf to docx", "convert pdf word", "pdf to editable"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-excel",
    name: "PDF to Excel",
    shortName: "PDF → Excel",
    category: "convert",
    engine: "pdf-to-excel",
    summary: "Export PDF table data as CSV for Excel.",
    description:
      "Extract tabular text from PDFs into comma-separated values you can open in Excel or Google Sheets. Useful for invoices and statement tables when the PDF is text-based.",
    howTo: [
      "Upload a PDF with tables.",
      "Review the extracted rows.",
      "Download the CSV spreadsheet export.",
    ],
    keywords: ["pdf to excel", "pdf to csv", "pdf table export", "pdf spreadsheet"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-text",
    name: "PDF to Text",
    shortName: "PDF → Text",
    category: "convert",
    engine: "pdf-to-text",
    summary: "Save all extractable PDF text as a .txt file.",
    description:
      "Convert PDF body copy into plain text for search, diffing, or piping into other tools. myonlinepdfeditor.com extracts on your machine without cloud OCR unless you add it later.",
    howTo: [
      "Select your PDF.",
      "Extract text page by page.",
      "Download the .txt file.",
    ],
    keywords: ["pdf to text", "extract pdf text", "pdf txt export", "pdf text file"],
    accept: "application/pdf,.pdf",
  },

  // ——— Edit ———
  {
    slug: "edit-pdf",
    name: "PDF Editor",
    shortName: "Edit PDF",
    category: "edit",
    engine: "editor",
    summary: "Open any PDF and adjust pages, text, and markup in the browser.",
    description:
      "myonlinepdfeditor.com PDF Editor lets you upload a document and work on it locally: navigate pages, place content, and export when you're done. Your file stays on your device the whole time.",
    howTo: [
      "Upload the PDF you want to edit.",
      "Use the toolbar to add or change content.",
      "Download the updated PDF.",
    ],
    keywords: ["pdf editor", "edit pdf online", "free pdf editor", "modify pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "create-pdf",
    name: "Create PDF",
    shortName: "Create PDF",
    category: "edit",
    engine: "create",
    summary: "Start from a blank page and build a new PDF.",
    description:
      "Begin with an empty canvas or template and assemble a new PDF from scratch. Add pages, text, and images, then save—all without installing software.",
    howTo: [
      "Open Create PDF to start a blank document.",
      "Add pages and content as needed.",
      "Download your new PDF.",
    ],
    keywords: ["create pdf", "new pdf", "blank pdf", "make pdf online"],
  },
  {
    slug: "add-fillable-fields",
    name: "Add Fillable Fields",
    shortName: "Fillable Fields",
    category: "edit",
    engine: "editor",
    summary: "Place text, checkbox, and signature fields on any PDF.",
    description:
      "Turn a flat PDF into a fillable form by marking fields on the page. Export and reuse the prepared document for data collection.",
    howTo: [
      "Open your PDF in the editor.",
      "Add field markers where people should type or sign.",
      "Download the fillable PDF.",
    ],
    keywords: ["add fillable fields", "pdf form fields", "make pdf fillable"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "flatten-fields",
    name: "Flatten Fields",
    shortName: "Flatten Fields",
    category: "edit",
    engine: "flatten",
    summary: "Bake form fields and annotations into the page content.",
    description:
      "Flatten interactive fields and markup so they cannot be edited accidentally. Useful before archival, printing, or sending a final signed copy.",
    howTo: [
      "Upload a PDF with fields or annotations.",
      "Run flatten to merge layers into the page.",
      "Download the flattened PDF.",
    ],
    keywords: ["flatten pdf", "flatten form fields", "pdf flatten tool", "merge layers pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "split-pdf",
    name: "Split PDF",
    shortName: "Split PDF",
    category: "edit",
    engine: "split",
    summary: "Extract page ranges or split every page into separate files.",
    description:
      "Pull out chapters, invoices, or individual scans from a large PDF. Define ranges or split all pages, then download ZIP or separate files.",
    howTo: [
      "Upload the PDF to split.",
      "Choose pages or ranges to extract.",
      "Download the split result.",
    ],
    keywords: ["split pdf", "extract pdf pages", "separate pdf", "divide pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "merge-pdf",
    name: "Merge PDFs",
    shortName: "Merge PDFs",
    category: "edit",
    engine: "merge",
    summary: "Combine multiple PDFs into one file in the order you choose.",
    description:
      "Stack reports, scans, and attachments into a single PDF. Reorder files before merging; everything is stitched together locally in your browser.",
    howTo: [
      "Add two or more PDF files (merge order follows upload order).",
      "Remove any file you do not want included.",
      "Merge and download the combined PDF.",
    ],
    keywords: ["merge pdf", "combine pdf", "join pdf files", "pdf combiner"],
    accept: "application/pdf,.pdf",
    multiFile: true,
  },
  {
    slug: "rotate-pdf",
    name: "Rotate Pages",
    shortName: "Rotate Pages",
    category: "edit",
    engine: "rotate",
    summary: "Rotate every page 90°, 180°, or 270°.",
    description:
      "Apply the same rotation to all pages until orientation looks right. No re-scanning—just a quick fix before you merge or email.",
    howTo: [
      "Open your PDF.",
      "Choose 90°, 180°, or 270° for the whole document.",
      "Save the rotated PDF.",
    ],
    keywords: ["rotate pdf", "turn pdf pages", "fix sideways pdf", "pdf orientation"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "reorder-pdf",
    name: "Reorder Pages",
    shortName: "Reorder Pages",
    category: "edit",
    engine: "reorder",
    summary: "Rearrange pages by entering a new page order.",
    description:
      "Put annexes first, move signatures to the end, or fix a mixed scan order. Enter the new 1-based page sequence (for example 3,1,2,4), then export.",
    howTo: [
      "Upload your PDF.",
      "Enter the new page order as comma-separated numbers (e.g. 3,1,2,4).",
      "Download the reordered file.",
    ],
    keywords: ["reorder pdf pages", "sort pdf", "arrange pdf", "move pdf pages"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "delete-pages",
    name: "Delete Pages",
    shortName: "Delete Pages",
    category: "edit",
    engine: "delete-pages",
    summary: "Remove unwanted pages from a PDF in a few clicks.",
    description:
      "Select blank, duplicate, or obsolete pages and delete them before sharing. The remaining document exports as a slimmer PDF.",
    howTo: [
      "Load the PDF.",
      "Select pages to remove.",
      "Export the trimmed PDF.",
    ],
    keywords: ["delete pdf pages", "remove pages pdf", "trim pdf", "cut pdf pages"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "compress-pdf",
    name: "Compress PDF",
    shortName: "Compress PDF",
    category: "edit",
    engine: "compress",
    summary: "Shrink PDF file size for email and uploads.",
    description:
      "Reduce image resolution and stream overhead so large scans fit attachment limits. Compression runs locally; compare preview quality before you send.",
    howTo: [
      "Upload the PDF to compress.",
      "Pick a quality or size target.",
      "Download the smaller PDF.",
    ],
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "optimize pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "page-numbers",
    name: "Add Page Numbers",
    shortName: "Page Numbers",
    category: "edit",
    engine: "page-numbers",
    summary: "Stamp consistent page numbers on every sheet.",
    description:
      "Place page numbers in the header or footer with your chosen start value and format. Great for briefs, packets, and printed manuals.",
    howTo: [
      "Open the PDF.",
      "Choose position, style, and starting number.",
      "Apply and download the numbered PDF.",
    ],
    keywords: ["page numbers pdf", "add page numbers", "number pdf pages"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "watermark-pdf",
    name: "Watermark PDF",
    shortName: "Watermark",
    category: "edit",
    engine: "watermark",
    summary: "Add text or image watermarks across pages.",
    description:
      "Mark drafts as CONFIDENTIAL, add a logo, or brand review copies with a semi-transparent overlay. Control opacity and placement before export.",
    howTo: [
      "Upload the PDF.",
      "Enter watermark text or choose an image.",
      "Preview and download the watermarked file.",
    ],
    keywords: ["watermark pdf", "pdf watermark", "draft stamp pdf", "brand pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "crop-pdf",
    name: "Crop PDF",
    shortName: "Crop PDF",
    category: "edit",
    engine: "crop",
    summary: "Trim margins and crop page boxes to content.",
    description:
      "Remove scanner bed borders or excess white margins so every page is tight to the content. Apply per page or to the whole document.",
    howTo: [
      "Load the PDF in Crop PDF.",
      "Enter a uniform crop margin in points (default 36 ≈ half an inch).",
      "Export the cropped PDF.",
    ],
    keywords: ["crop pdf", "trim pdf margins", "cut pdf border"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "extract-pages",
    name: "Extract Pages",
    shortName: "Extract Pages",
    category: "edit",
    engine: "extract-pages",
    summary: "Pull selected pages into a new PDF file.",
    description:
      "Keep only the pages you need—exhibits, signatures, or chapters—and download them as a separate document without re-scanning.",
    howTo: [
      "Upload the source PDF.",
      "Select pages to extract.",
      "Download the new PDF with only those pages.",
    ],
    keywords: ["extract pdf pages", "save pdf pages", "pull pages pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "organize-pdf",
    name: "Organize PDF",
    shortName: "Organize PDF",
    category: "edit",
    engine: "reorder",
    summary: "Reorder, delete, and tidy pages in one workspace.",
    description:
      "A focused page sorter: drag thumbnails, remove junk pages, and export a clean packet. Combines organize, delete, and reorder flows in one tool.",
    howTo: [
      "Upload your PDF.",
      "Drag pages, delete unwanted sheets.",
      "Download the organized PDF.",
    ],
    keywords: ["organize pdf", "sort pdf pages", "arrange pdf", "pdf organizer"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "repair-pdf",
    name: "Repair PDF",
    shortName: "Repair PDF",
    category: "edit",
    engine: "repair",
    summary: "Attempt to fix corrupted or unreadable PDFs.",
    description:
      "Rebuild broken cross-references and re-save streams so damaged downloads open again. Severely corrupted files may still need the original source.",
    howTo: [
      "Upload the problem PDF.",
      "Run repair and wait for local processing.",
      "Open the repaired download in your viewer.",
    ],
    keywords: ["repair pdf", "fix pdf", "corrupt pdf", "recover pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "grayscale-pdf",
    name: "Grayscale PDF",
    shortName: "Grayscale",
    category: "edit",
    engine: "grayscale",
    summary: "Convert color pages to grayscale for print savings.",
    description:
      "Turn color scans and photos into grayscale PDFs to cut toner use and meet filing rules that require black-and-white submissions.",
    howTo: [
      "Select the color PDF.",
      "Apply grayscale to all pages.",
      "Download the gray-toned PDF.",
    ],
    keywords: ["grayscale pdf", "black and white pdf", "convert pdf gray"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "remove-metadata",
    name: "Remove Metadata",
    shortName: "Strip Metadata",
    category: "edit",
    engine: "remove-metadata",
    summary: "Strip author, title, and embedded XMP from a PDF.",
    description:
      "Scrub hidden document properties before you publish or FOIA-release a file. Export a clean PDF with reduced identifying metadata.",
    howTo: [
      "Upload the PDF.",
      "Review which metadata fields will be cleared.",
      "Download the sanitized PDF.",
    ],
    keywords: ["remove pdf metadata", "strip pdf metadata", "clean pdf properties"],
    accept: "application/pdf,.pdf",
  },

  // ——— Sign ———
  {
    slug: "sign-pdf",
    name: "Sign a PDF",
    shortName: "Sign PDF",
    category: "sign",
    engine: "editor",
    summary: "Sign contracts and forms on desktop with draw or type options.",
    description:
      "Add your signature to any PDF using mouse, stylus, or typed script. Export a signed copy immediately—ideal for in-person or same-device signing.",
    howTo: [
      "Upload the PDF to sign.",
      "Create or place your signature on the page.",
      "Download the signed document.",
    ],
    keywords: ["sign pdf", "pdf signature", "esign pdf", "sign document online"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "send-for-signature",
    name: "Prepare for Signature",
    shortName: "Send to Sign",
    category: "sign",
    engine: "editor",
    summary: "Place signature fields and export a ready-to-sign packet.",
    description:
      "Mark where signers should sign, date, or initial, then export a PDF others can complete. myonlinepdfeditor.com focuses on field prep in-browser; delivery is up to you.",
    howTo: [
      "Upload the agreement.",
      "Add signature and date fields for each signer.",
      "Download and share the prepared PDF.",
    ],
    keywords: ["send for signature", "signature fields pdf", "prepare esign", "signing workflow"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "send-envelopes",
    name: "Send Envelopes for eSignature",
    shortName: "Envelopes",
    category: "sign",
    engine: "envelope",
    summary: "Bundle multiple PDFs into one signing envelope package.",
    description:
      "Combine several documents into a single envelope checklist, then download a ZIP-ready set of PDFs and a signer checklist you can send yourself.",
    howTo: [
      "Upload one or more PDFs for the envelope.",
      "Add signer names and emails in the checklist.",
      "Download the envelope package and send it your way.",
    ],
    keywords: ["esignature envelopes", "send envelope pdf", "multi document signing"],
    accept: "application/pdf,.pdf",
    multiFile: true,
  },
  {
    slug: "in-person-signing",
    name: "In-person Signing",
    shortName: "In-person Sign",
    category: "sign",
    engine: "in-person",
    summary: "Collect a signature on the same device in person.",
    description:
      "Hand the device to a signer, capture their drawn or typed signature, and download the completed PDF immediately—no email round-trip.",
    howTo: [
      "Open the PDF on your device.",
      "Pass the device to the signer.",
      "They sign, then you download the finished copy.",
    ],
    keywords: ["in person signing", "same device signature", "counter sign pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "kiosk-mode",
    name: "Kiosk Mode (Mobile)",
    shortName: "Kiosk Mode",
    category: "sign",
    engine: "kiosk",
    summary: "Full-screen friendly signing for phones and tablets.",
    description:
      "A mobile-first signing layout for lobbies and events. Open the PDF, capture a signature with a finger, and download on the spot.",
    howTo: [
      "Open Kiosk Mode on a phone or tablet.",
      "Load the document to sign.",
      "Capture the signature and download.",
    ],
    keywords: ["kiosk mode pdf", "mobile pdf signing", "tablet signature"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "bulk-sending",
    name: "Bulk Sending",
    shortName: "Bulk Send",
    category: "sign",
    engine: "bulk-send",
    summary: "Prepare one template for many recipients at once.",
    description:
      "Upload a PDF template and a recipient list, then generate a per-recipient checklist and download copies ready to distribute.",
    howTo: [
      "Upload the PDF template.",
      "Paste recipient names and emails (one per line).",
      "Download the bulk package checklist.",
    ],
    keywords: ["bulk send pdf", "mass signature request", "batch send documents"],
    accept: "application/pdf,.pdf",
  },

  // ——— Share ———
  {
    slug: "add-comments",
    name: "Add Comments to PDF",
    shortName: "Comments",
    category: "share",
    engine: "editor",
    summary: "Attach sticky notes and callouts for reviewers.",
    description:
      "Place comment markers on passages that need feedback. Comments are embedded as annotations you can flatten or keep for the next reviewer.",
    howTo: [
      "Upload the draft PDF.",
      "Add comments on relevant pages.",
      "Export and send to collaborators.",
    ],
    keywords: ["pdf comments", "annotate pdf", "review pdf", "sticky notes pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "share-via-link",
    name: "Share via Link",
    shortName: "Share Link",
    category: "share",
    engine: "export",
    summary: "Download a share-ready PDF optimized for links and attachments.",
    description:
      "Finish edits, flatten if needed, and export a clean PDF sized for email or cloud drives. myonlinepdfeditor.com does not host your files—you keep control of where it is shared.",
    howTo: [
      "Complete edits on your PDF.",
      "Use export to generate the final file.",
      "Upload the download to your preferred sharing service.",
    ],
    keywords: ["share pdf", "export pdf", "send pdf link", "pdf download share"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "share-via-email",
    name: "Share via Email",
    shortName: "Email Share",
    category: "share",
    engine: "email-share",
    summary: "Open your mail app with a ready message about the PDF.",
    description:
      "Prepare a mailto draft with subject and body. Attach the downloaded PDF from your device—myonlinepdfeditor.com never uploads the file.",
    howTo: [
      "Upload or finish editing your PDF and download it.",
      "Enter recipient email and optional note.",
      "Open your email client and attach the downloaded file.",
    ],
    keywords: ["share pdf email", "email pdf", "send pdf by email"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "fax",
    name: "Fax PDF",
    shortName: "Fax",
    category: "share",
    engine: "fax",
    summary: "Prepare a print-ready PDF for online fax services.",
    description:
      "myonlinepdfeditor.com does not operate a fax gateway. Download a clean PDF optimized for third-party online fax tools you already use.",
    howTo: [
      "Upload your PDF.",
      "Download the fax-ready copy.",
      "Upload that file to your preferred online fax service.",
    ],
    keywords: ["fax pdf", "send pdf fax", "online fax document"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-status",
    name: "PDF Status",
    shortName: "PDF Status",
    category: "share",
    engine: "status",
    summary: "Track local document status notes in your browser.",
    description:
      "Mark documents as draft, sent, or completed and keep notes in local storage. Status stays on your device—ideal for personal workflow tracking.",
    howTo: [
      "Name your document and pick a status.",
      "Add optional notes.",
      "Save — statuses persist in this browser only.",
    ],
    keywords: ["pdf status", "document tracking", "signing status"],
  },
  {
    slug: "create-templates",
    name: "Create Templates",
    shortName: "Templates",
    category: "share",
    engine: "editor",
    summary: "Design a reusable form layout with fields and labels.",
    description:
      "Combine static text, fields, and branding into a master template you can duplicate and send again. All design work stays local in myonlinepdfeditor.com.",
    howTo: [
      "Start from a PDF or blank editor session.",
      "Add labels, fields, and layout elements.",
      "Save the template for reuse.",
    ],
    keywords: ["pdf template", "form template", "reusable pdf form", "create form pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "create-fillable-forms",
    name: "Create Fillable Forms",
    shortName: "Fillable Forms",
    category: "share",
    engine: "editor",
    summary: "Open existing forms and type answers in the browser.",
    description:
      "Complete interactive PDF forms without printing. Fill text boxes and checkboxes, then save or flatten when you're finished.",
    howTo: [
      "Upload a fillable PDF.",
      "Click fields and enter your answers.",
      "Download the completed form.",
    ],
    keywords: ["fillable pdf", "fill pdf form", "pdf form filler", "interactive pdf"],
    accept: "application/pdf,.pdf",
  },

  // ——— AI ———
  {
    slug: "document-assistant",
    name: "Document Assistant",
    shortName: "Assistant",
    category: "ai",
    engine: "ai-assist",
    summary:
      "Browser-side text helper: outline tasks and rewrite snippets extracted from your PDF.",
    description:
      "Extract text locally from your PDF and use lightweight in-browser helpers to draft summaries or next steps. No document content is sent to myonlinepdfeditor.com servers.",
    howTo: [
      "Upload a PDF and extract readable text.",
      "Ask the assistant for outlines or rewrites on that text.",
      "Copy results back into your workflow.",
    ],
    keywords: ["pdf assistant", "ai pdf help", "document helper", "local pdf ai"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "simplify-document",
    name: "Simplify Document",
    shortName: "Simplify",
    category: "ai",
    engine: "ai-assist",
    summary:
      "Browser-side text helper: rewrite dense passages into plain language locally.",
    description:
      "Make technical or legal wording easier to read by simplifying extracted text in the browser. You review every change before it goes back into a document.",
    howTo: [
      "Extract text from the PDF on your device.",
      "Choose simplify to get a plainer version.",
      "Use the output in summaries or training docs.",
    ],
    keywords: ["simplify pdf", "plain language pdf", "readable pdf text", "simplify document"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "summarize-key-points",
    name: "Summarize Key Points",
    shortName: "Summarize",
    category: "ai",
    engine: "ai-assist",
    summary:
      "Browser-side text helper: generate short summaries from text you extract from the PDF.",
    description:
      "Pull text on your device and produce bullet-point summaries for long reports or articles. Ideal for quick orientation before a deeper read.",
    howTo: [
      "Open your PDF and extract text locally.",
      "Run summarize on the extracted content.",
      "Copy the summary for notes or email.",
    ],
    keywords: ["summarize pdf", "pdf summary", "tldr pdf", "abstract pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "ask-document",
    name: "Get Answers to Document Questions",
    shortName: "Ask Document",
    category: "ai",
    engine: "ai-assist",
    summary:
      "Browser-side text helper: ask questions against text extracted from your file.",
    description:
      "Highlight a question and search extracted page text for relevant sentences—all without uploading the full PDF for cloud Q&A.",
    howTo: [
      "Load the PDF and extract its text.",
      "Type a question about the content.",
      "Review cited excerpts from the local text index.",
    ],
    keywords: ["ask pdf", "chat with pdf", "pdf q and a", "question pdf document"],
    accept: "application/pdf,.pdf",
  },

  // ——— Other ———
  {
    slug: "pdf-audit-trail",
    name: "PDF Audit Trail",
    shortName: "Audit Trail",
    category: "other",
    engine: "editor",
    summary: "Stamp version, date, and reviewer notes for simple audit trails.",
    description:
      "Add visible audit stamps such as reviewed-on dates and document IDs. While not a full compliance log, it helps teams show which copy was approved.",
    howTo: [
      "Open the controlled document.",
      "Apply audit stamp text to the footer or cover.",
      "Save and distribute the stamped version.",
    ],
    keywords: ["pdf audit trail", "document stamp audit", "version stamp pdf", "compliance mark"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "certify-pdf",
    name: "Certify PDF",
    shortName: "Certify PDF",
    category: "other",
    engine: "editor",
    summary: "Mark a PDF as certified final with a visible certification banner.",
    description:
      "Place a certification notice on the document to signal that this copy is the authoritative version. Pair with flatten and protect for stronger handoff.",
    howTo: [
      "Upload the final PDF.",
      "Add certification language or stamp.",
      "Export and archive the certified file.",
    ],
    keywords: ["certify pdf", "certified document pdf", "final pdf stamp", "authoritative copy"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "set-pdf-password",
    name: "Set PDF Password",
    shortName: "Set Password",
    category: "other",
    engine: "protect",
    summary: "Encrypt a PDF with a password before you share it.",
    description:
      "Set an open password so only people with the passphrase can view the file. Encryption is applied in the browser; choose a strong password you can share securely.",
    howTo: [
      "Upload the PDF to protect.",
      "Enter and confirm a strong password.",
      "Download the encrypted PDF.",
    ],
    keywords: ["password protect pdf", "encrypt pdf", "lock pdf", "secure pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "readable-pdf",
    name: "Readable PDF",
    shortName: "Readable PDF",
    category: "other",
    engine: "readable",
    summary: "Extract text from a PDF for easier reading and reuse.",
    description:
      "Pull plain text out of a PDF page by page so you can copy, search, or reflow content. Processing stays in your browser.",
    howTo: [
      "Upload a PDF.",
      "Extract text locally.",
      "Copy or download the readable text.",
    ],
    keywords: ["readable pdf", "extract text pdf", "pdf to text"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "search-for-pdf",
    name: "Search for PDF",
    shortName: "Search PDF",
    category: "other",
    engine: "search",
    summary: "Find keywords inside a PDF without uploading it.",
    description:
      "Search extracted PDF text for matches and jump to page snippets. Useful for contracts, manuals, and scanned text PDFs.",
    howTo: [
      "Upload a PDF.",
      "Enter a search term.",
      "Review matching page snippets.",
    ],
    keywords: ["search pdf", "find in pdf", "pdf keyword search"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "export-pdf",
    name: "Export",
    shortName: "Export",
    category: "other",
    engine: "export",
    summary: "Export a clean copy of your PDF for archival or sharing.",
    description:
      "Re-save your PDF locally as a portable export. Optional light optimization keeps the file easy to move between apps.",
    howTo: [
      "Upload the PDF to export.",
      "Choose export.",
      "Download the exported file.",
    ],
    keywords: ["export pdf", "save pdf copy", "pdf export online"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "download-pdf",
    name: "Download",
    shortName: "Download",
    category: "other",
    engine: "download",
    summary: "Download a local copy of a PDF you open in myonlinepdfeditor.com.",
    description:
      "Open a PDF in the browser toolkit and save it back to your device instantly—handy after edits or conversions.",
    howTo: [
      "Select a PDF.",
      "Click download.",
      "Find the file in your downloads folder.",
    ],
    keywords: ["download pdf", "save pdf", "get pdf file"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "print-out",
    name: "Print PDF",
    shortName: "Print PDF",
    category: "other",
    engine: "print",
    summary: "Open the system print dialog for your PDF.",
    description:
      "Load a PDF and trigger your browser’s print dialog for paper copies or “Save as PDF” printers.",
    howTo: [
      "Upload a PDF.",
      "Click Print PDF.",
      "Choose a printer or Save as PDF.",
    ],
    keywords: ["print pdf", "print out pdf", "pdf printer"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "unlock-pdf",
    name: "Unlock PDF",
    shortName: "Unlock PDF",
    category: "other",
    engine: "unlock",
    summary: "Remove open passwords when you know the passphrase.",
    description:
      "Decrypt a password-protected PDF you are allowed to access so you can merge, print, or edit it in other myonlinepdfeditor.com tools. You must supply the correct password.",
    howTo: [
      "Upload the locked PDF.",
      "Enter the known open password.",
      "Download the unlocked PDF.",
    ],
    keywords: ["unlock pdf", "remove pdf password", "decrypt pdf", "pdf unlocker"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "compare-pdf",
    name: "Compare PDF",
    shortName: "Compare PDF",
    category: "other",
    engine: "compare",
    summary: "Side-by-side diff of two PDF versions.",
    description:
      "Load an original and revised PDF to highlight text and layout changes page by page. Useful for contract redlines and compliance reviews.",
    howTo: [
      "Upload two PDF files to compare.",
      "Align versions and run comparison.",
      "Review differences and export a summary if available.",
    ],
    keywords: ["compare pdf", "pdf diff", "pdf comparison", "document compare"],
    accept: "application/pdf,.pdf",
    multiFile: true,
  },
  {
    slug: "heic-to-pdf",
    name: "HEIC to PDF",
    shortName: "HEIC to PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Convert iPhone HEIC photos to PDF in the browser.",
    description:
      "Drop HEIC/HEIF images to build a PDF. Files are decoded locally with a built-in HEIC converter—no Photos export required.",
    howTo: [
      "Upload one or more .heic files.",
      "Wait for local conversion.",
      "Download the PDF.",
    ],
    keywords: ["heic to pdf", "heif to pdf", "iphone photo pdf"],
    accept: "image/heic,image/heif,.heic,.heif",
    multiFile: true,
  },
  {
    slug: "tiff-to-pdf",
    name: "TIFF to PDF",
    shortName: "TIFF to PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Turn TIFF scans into multi-page PDFs.",
    description:
      "Convert TIFF/TIF scans to PDF pages locally, including multipage TIFFs decoded in the browser.",
    howTo: ["Upload .tiff or .tif files.", "Convert locally.", "Download the PDF."],
    keywords: ["tiff to pdf", "tif to pdf", "scan tiff pdf"],
    accept: "image/tiff,.tif,.tiff",
    multiFile: true,
  },
  {
    slug: "svg-to-pdf",
    name: "SVG to PDF",
    shortName: "SVG to PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Rasterize SVG graphics into PDF pages.",
    description:
      "Render SVG files to PDF pages in the browser. Complex filters may flatten—spot-check the preview for logos and icons.",
    howTo: ["Upload .svg files.", "Convert.", "Download PDF."],
    keywords: ["svg to pdf", "vector to pdf", "svg converter"],
    accept: "image/svg+xml,.svg",
    multiFile: true,
  },
  {
    slug: "markdown-to-pdf",
    name: "Markdown to PDF",
    shortName: "Markdown to PDF",
    category: "convert",
    engine: "markdown-to-pdf",
    summary: "Turn .md notes into a printable PDF.",
    description:
      "Strip common Markdown markers and lay text into a PDF. Ideal for README dumps and quick notes—not a full CommonMark print engine.",
    howTo: ["Upload a .md file.", "Convert to PDF.", "Download."],
    keywords: ["markdown to pdf", "md to pdf", "readme pdf"],
    accept: ".md,text/markdown,text/plain",
  },
  {
    slug: "zip-to-pdf",
    name: "ZIP to PDF",
    shortName: "ZIP to PDF",
    category: "convert",
    engine: "zip-to-pdf",
    summary: "Unpack a ZIP of images/PDFs into one PDF.",
    description:
      "Upload a .zip containing images and/or PDFs. myonlinepdfeditor.com extracts supported files and merges them into a single PDF locally.",
    howTo: ["Upload a .zip.", "Extract and merge locally.", "Download the combined PDF."],
    keywords: ["zip to pdf", "unzip to pdf", "folder to pdf"],
    accept: ".zip,application/zip,application/x-zip-compressed",
  },
  {
    slug: "scan-pdf",
    name: "Scan to PDF",
    shortName: "Scan to PDF",
    category: "convert",
    engine: "images-to-pdf",
    summary: "Build a PDF from phone or scanner images.",
    description:
      "Combine JPG/PNG/WebP (and other browser-decodable) scan images into a multi-page PDF without a desktop driver.",
    howTo: ["Upload scan images.", "Order as needed by file selection order.", "Download PDF."],
    keywords: ["scan to pdf", "scanner pdf", "camera to pdf", "image scan pdf"],
    accept: "image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.tif,.tiff",
    multiFile: true,
  },
  {
    slug: "redact-pdf",
    name: "Redact PDF",
    shortName: "Redact PDF",
    category: "edit",
    engine: "redact",
    summary: "Black out entire pages before sharing.",
    description:
      "Cover selected pages with opaque black rectangles so sensitive full pages stay hidden in shared copies. For pixel-perfect region redact, use Edit PDF annotations afterward.",
    howTo: [
      "Upload a PDF.",
      "Enter page numbers to fully redact.",
      "Download the redacted PDF.",
    ],
    keywords: ["redact pdf", "blackout pdf", "censor pdf", "pdf redaction"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "invert-pdf",
    name: "Invert PDF",
    shortName: "Invert PDF",
    category: "edit",
    engine: "invert",
    summary: "Invert page colors for night reading or print.",
    description:
      "Rasterize and invert colors on every page. Useful for dark backgrounds or accessibility contrast experiments.",
    howTo: ["Upload a PDF.", "Run invert.", "Download."],
    keywords: ["invert pdf", "negative pdf", "dark mode pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "n-up-pdf",
    name: "N-up PDF",
    shortName: "N-up",
    category: "edit",
    engine: "n-up",
    summary: "Fit 2 or 4 pages on each sheet.",
    description:
      "Impose multiple source pages onto one output sheet for handouts, proofs, and booklet drafts (2-up or 4-up).",
    howTo: ["Upload a PDF.", "Choose 2-up or 4-up.", "Download."],
    keywords: ["n-up pdf", "pages per sheet", "2-up pdf", "4-up pdf", "impose pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "overlay-pdf",
    name: "Overlay PDF",
    shortName: "Overlay PDF",
    category: "edit",
    engine: "overlay",
    summary: "Stamp one PDF page over another document.",
    description:
      "Upload a base PDF and an overlay PDF. The first page of the overlay is drawn on every base page—handy for letterheads and stamps.",
    howTo: [
      "Upload the base PDF first.",
      "Upload the overlay PDF second.",
      "Download the stamped result.",
    ],
    keywords: ["overlay pdf", "stamp pdf", "letterhead pdf", "underlay pdf"],
    accept: "application/pdf,.pdf",
    multiFile: true,
  },
  {
    slug: "reverse-pages",
    name: "Reverse Pages",
    shortName: "Reverse Pages",
    category: "edit",
    engine: "reverse",
    summary: "Flip page order last-to-first.",
    description:
      "Reverse the page sequence of a PDF—useful after scanning a stack upside-down or for duplex prep.",
    howTo: ["Upload a PDF.", "Reverse.", "Download."],
    keywords: ["reverse pdf pages", "flip page order", "reverse page order"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "change-page-size",
    name: "Change Page Size",
    shortName: "Page Size",
    category: "edit",
    engine: "page-size",
    summary: "Fit pages to Letter, A4, or Legal.",
    description:
      "Scale and center each page onto a target paper size without a desktop print dialog.",
    howTo: ["Upload a PDF.", "Pick Letter, A4, or Legal.", "Download."],
    keywords: ["change pdf page size", "a4 to letter", "letter to a4", "pdf paper size"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "rasterize-pdf",
    name: "Rasterize PDF",
    shortName: "Rasterize",
    category: "edit",
    engine: "rasterize",
    summary: "Flatten pages to images inside a new PDF.",
    description:
      "Render every page to an image layer and rebuild the PDF. Helps before print, redact, or when fonts refuse to embed.",
    howTo: ["Upload a PDF.", "Rasterize locally.", "Download."],
    keywords: ["rasterize pdf", "flatten pdf to images", "pdf to image pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-tiff",
    name: "PDF to TIFF",
    shortName: "PDF → TIFF",
    category: "convert",
    engine: "pdf-to-images",
    summary: "Export PDF pages as a multipage TIFF file.",
    description:
      "Renders each PDF page and packs them into one uncompressed multipage .tiff you can open in scan and imaging software.",
    howTo: ["Upload a PDF.", "Convert locally.", "Download the .tiff file."],
    keywords: ["pdf to tiff", "pdf to tif", "pdf page images"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-pdfa",
    name: "PDF/A prep (guide)",
    shortName: "PDF/A prep",
    category: "other",
    engine: "export",
    availability: "guide",
    summary: "Metadata-scrub prep for PDF/A workflows — not a full PDF/A converter.",
    description:
      "Full PDF/A conversion needs specialized tools (e.g. veraPDF workflows). This guide download strips metadata as a prep step; validate with a PDF/A checker if your archive requires it.",
    howTo: [
      "Upload a PDF.",
      "Download the metadata-scrubbed prep file (guidance / prep only).",
      "Validate with a PDF/A checker if required.",
    ],
    keywords: ["pdf to pdfa", "pdf/a", "archival pdf", "pdfa converter"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "translate-pdf",
    name: "Prepare PDF for Translation",
    shortName: "Prep for translation",
    category: "ai",
    engine: "ai-assist",
    summary: "Extract PDF text into a translation-ready plain-text file.",
    description:
      "Pulls extractable PDF text into a .txt you can paste into any translator. This tool does not machine-translate. Image-only scans need OCR first (Readable PDF).",
    howTo: [
      "Upload a PDF with selectable text.",
      "Run the extractor.",
      "Download the .txt and paste it into your translator.",
    ],
    keywords: ["translate pdf", "pdf translation", "pdf translate", "extract text for translation"],
    accept: "application/pdf,.pdf",
  },
  // ——— Remaining competitor-gap tools ———
  {
    slug: "heic-to-jpg",
    name: "HEIC to JPG",
    shortName: "HEIC to JPG",
    category: "convert",
    engine: "image-convert",
    summary: "Convert HEIC photos to JPEG.",
    description:
      "Decode HEIC/HEIF photos in the browser with a built-in converter and download JPG files.",
    howTo: ["Upload HEIC files.", "Convert.", "Download JPGs."],
    keywords: ["heic to jpg", "heic to jpeg", "heif to jpg"],
    accept: "image/heic,image/heif,.heic,.heif",
    multiFile: true,
  },
  {
    slug: "heic-to-png",
    name: "HEIC to PNG",
    shortName: "HEIC to PNG",
    category: "convert",
    engine: "image-convert",
    summary: "Convert HEIC photos to PNG.",
    description:
      "Decode HEIC/HEIF photos in the browser with a built-in converter and export PNG files.",
    howTo: ["Upload HEIC.", "Convert.", "Download PNG."],
    keywords: ["heic to png", "heif to png"],
    accept: "image/heic,image/heif,.heic,.heif",
    multiFile: true,
  },
  {
    slug: "webp-to-jpg",
    name: "WebP to JPG",
    shortName: "WebP to JPG",
    category: "convert",
    engine: "image-convert",
    summary: "Convert WebP images to JPEG.",
    description: "Re-encode WebP as JPG for apps that still reject WebP.",
    howTo: ["Upload WebP.", "Convert.", "Download JPG."],
    keywords: ["webp to jpg", "webp to jpeg"],
    accept: "image/webp,.webp,image/*",
    multiFile: true,
  },
  {
    slug: "webp-to-png",
    name: "WebP to PNG",
    shortName: "WebP to PNG",
    category: "convert",
    engine: "image-convert",
    summary: "Convert WebP images to PNG.",
    description: "Re-encode WebP as PNG for transparency-friendly workflows.",
    howTo: ["Upload WebP.", "Convert.", "Download PNG."],
    keywords: ["webp to png"],
    accept: "image/webp,.webp,image/*",
    multiFile: true,
  },
  {
    slug: "svg-to-jpg",
    name: "SVG to JPG",
    shortName: "SVG to JPG",
    category: "convert",
    engine: "image-convert",
    summary: "Rasterize SVG to JPEG.",
    description: "Render SVG graphics to JPG in the browser.",
    howTo: ["Upload SVG.", "Convert.", "Download JPG."],
    keywords: ["svg to jpg", "svg to jpeg"],
    accept: "image/svg+xml,.svg",
    multiFile: true,
  },
  {
    slug: "svg-to-png",
    name: "SVG to PNG",
    shortName: "SVG to PNG",
    category: "convert",
    engine: "image-convert",
    summary: "Rasterize SVG to PNG.",
    description: "Render SVG graphics to PNG with transparency support.",
    howTo: ["Upload SVG.", "Convert.", "Download PNG."],
    keywords: ["svg to png"],
    accept: "image/svg+xml,.svg",
    multiFile: true,
  },
  {
    slug: "compress-images",
    name: "Compress Images",
    shortName: "Compress Images",
    category: "convert",
    engine: "compress-images",
    summary: "Shrink image file size with JPEG recompression.",
    description: "Re-encode images as compressed JPEG locally before email or PDF packing.",
    howTo: ["Upload images.", "Compress.", "Download smaller JPGs."],
    keywords: ["compress images", "image compressor", "reduce image size"],
    accept: "image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.heic,.svg",
    multiFile: true,
  },
  {
    slug: "odt-to-pdf",
    name: "ODT to PDF",
    shortName: "ODT to PDF",
    category: "convert",
    engine: "odf-to-pdf",
    summary: "Convert LibreOffice Writer (.odt) to PDF.",
    description: "Extract OpenDocument text and build a PDF locally. Complex layouts flatten to text flow.",
    howTo: ["Upload .odt.", "Convert.", "Download PDF."],
    keywords: ["odt to pdf", "opendocument to pdf", "libreoffice writer pdf"],
    accept: ".odt,application/vnd.oasis.opendocument.text",
  },
  {
    slug: "ods-to-pdf",
    name: "ODS to PDF",
    shortName: "ODS to PDF",
    category: "convert",
    engine: "odf-to-pdf",
    summary: "Convert LibreOffice Calc (.ods) to PDF.",
    description: "Read ODS sheets as tabular text and publish a PDF snapshot.",
    howTo: ["Upload .ods.", "Convert.", "Download PDF."],
    keywords: ["ods to pdf", "opendocument spreadsheet pdf"],
    accept: ".ods,application/vnd.oasis.opendocument.spreadsheet",
  },
  {
    slug: "odp-to-pdf",
    name: "ODP to PDF",
    shortName: "ODP to PDF",
    category: "convert",
    engine: "odf-to-pdf",
    summary: "Convert LibreOffice Impress (.odp) to PDF.",
    description: "Extract slide text from ODP and lay it into a PDF.",
    howTo: ["Upload .odp.", "Convert.", "Download PDF."],
    keywords: ["odp to pdf", "opendocument presentation pdf"],
    accept: ".odp,application/vnd.oasis.opendocument.presentation",
  },
  {
    slug: "odg-to-pdf",
    name: "ODG to PDF",
    shortName: "ODG to PDF",
    category: "convert",
    engine: "odf-to-pdf",
    summary: "Convert LibreOffice Draw (.odg) to PDF.",
    description: "Extract text content from ODG drawings into a PDF notes sheet.",
    howTo: ["Upload .odg.", "Convert.", "Download PDF."],
    keywords: ["odg to pdf", "opendocument draw pdf"],
    accept: ".odg,application/vnd.oasis.opendocument.graphics",
  },
  {
    slug: "epub-to-pdf",
    name: "EPUB to PDF",
    shortName: "EPUB to PDF",
    category: "convert",
    engine: "epub-to-pdf",
    summary: "Convert EPUB ebooks to PDF.",
    description: "Unpack EPUB HTML chapters and rebuild as a printable PDF text flow.",
    howTo: ["Upload .epub.", "Convert.", "Download PDF."],
    keywords: ["epub to pdf", "ebook to pdf"],
    accept: ".epub,application/epub+zip",
  },
  {
    slug: "pdf-to-epub",
    name: "PDF to EPUB",
    shortName: "PDF to EPUB",
    category: "convert",
    engine: "pdf-to-epub",
    summary: "Export extractable PDF text as an EPUB.",
    description: "Build a minimal EPUB from PDF text for e-readers. Layout-heavy PDFs become flowing text.",
    howTo: ["Upload PDF.", "Extract text.", "Download .epub."],
    keywords: ["pdf to epub", "pdf ebook"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "eml-to-pdf",
    name: "EML to PDF",
    shortName: "EML to PDF",
    category: "convert",
    engine: "eml-to-pdf",
    summary: "Convert email (.eml) files to PDF.",
    description: "Parse message headers and body text into a PDF archive of the email.",
    howTo: ["Upload .eml.", "Convert.", "Download PDF."],
    keywords: ["eml to pdf", "email to pdf", "message to pdf"],
    accept: ".eml,message/rfc822,text/plain",
  },
  {
    slug: "pdf-to-html",
    name: "PDF to HTML",
    shortName: "PDF to HTML",
    category: "convert",
    engine: "pdf-to-html",
    summary: "Export PDF text as an HTML page.",
    description: "Extract page text into a simple HTML document for the web or further editing.",
    howTo: ["Upload PDF.", "Export.", "Download .html."],
    keywords: ["pdf to html", "pdf html export"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-markdown",
    name: "PDF to Markdown",
    shortName: "PDF to Markdown",
    category: "convert",
    engine: "pdf-to-markdown",
    summary: "Export PDF text as Markdown.",
    description: "Pull extractable text into a .md file with page headings.",
    howTo: ["Upload PDF.", "Export.", "Download .md."],
    keywords: ["pdf to markdown", "pdf to md"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-svg",
    name: "PDF to SVG",
    shortName: "PDF to SVG",
    category: "convert",
    engine: "pdf-to-svg",
    summary: "Export PDF pages as SVG wrappers.",
    description: "Render each page and wrap it in an SVG image element for web embedding.",
    howTo: ["Upload PDF.", "Export.", "Download .svg files."],
    keywords: ["pdf to svg", "pdf vector export"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-odt",
    name: "PDF to ODT",
    shortName: "PDF to ODT",
    category: "convert",
    engine: "pdf-to-odt",
    summary: "Export PDF text as an OpenDocument (.odt) file.",
    description:
      "Builds a real .odt from extractable PDF text for LibreOffice Writer. Layout will not match the original PDF.",
    howTo: ["Upload PDF.", "Extract text locally.", "Download the .odt file."],
    keywords: ["pdf to odt", "pdf to opendocument"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-ods",
    name: "PDF to ODS",
    shortName: "PDF → ODS",
    category: "convert",
    engine: "pdf-to-ods",
    summary: "Export PDF text as a LibreOffice Calc (.ods) file.",
    description:
      "Builds a real .ods spreadsheet from extractable PDF text for LibreOffice Calc. Layout will not match the original PDF.",
    howTo: ["Upload PDF.", "Extract text locally.", "Download the .ods file."],
    keywords: ["pdf to ods", "pdf to libreoffice calc"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-odp",
    name: "PDF to ODP",
    shortName: "PDF → ODP",
    category: "convert",
    engine: "pdf-to-odp",
    summary: "Export PDF pages as a LibreOffice Impress (.odp) file.",
    description:
      "Builds a real .odp with one text slide per PDF page for LibreOffice Impress. Layout will not match the original PDF.",
    howTo: ["Upload PDF.", "Extract text locally.", "Download the .odp file."],
    keywords: ["pdf to odp", "pdf to impress"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "xml-invoice-to-pdf",
    name: "XML Invoice to PDF",
    shortName: "XML Invoice",
    category: "convert",
    engine: "xml-invoice",
    summary: "Render XML / UBL invoice payloads as PDF.",
    description: "Strip XML tags and print invoice fields into a readable PDF for review.",
    howTo: ["Upload .xml.", "Convert.", "Download PDF."],
    keywords: ["xml invoice to pdf", "ubl to pdf", "e-invoice pdf"],
    accept: ".xml,application/xml,text/xml",
  },
  {
    slug: "analyze-pdf",
    name: "Analyze PDF",
    shortName: "Analyze PDF",
    category: "other",
    engine: "analyze",
    summary: "Inspect page count, sizes, and metadata.",
    description: "Report PDF structure: pages, dimensions, metadata, and extractable text stats.",
    howTo: ["Upload PDF.", "Run analysis.", "Download or copy the report."],
    keywords: ["analyze pdf", "pdf info", "pdf properties"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-statistics",
    name: "PDF Statistics",
    shortName: "PDF Stats",
    category: "other",
    engine: "analyze",
    summary: "Quick statistics for a PDF file.",
    description: "Same family as Analyze PDF—page counts, text coverage, and file size at a glance.",
    howTo: ["Upload PDF.", "View stats.", "Save the report."],
    keywords: ["pdf statistics", "pdf stats", "pdf metrics"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "change-pdf-doc-info",
    name: "Change PDF Doc Info",
    shortName: "Document info",
    category: "edit",
    engine: "doc-info",
    summary: "Edit PDF title, author, subject, and keywords.",
    description: "Update document information dictionary fields locally before sharing or archiving.",
    howTo: ["Upload PDF.", "Enter metadata fields.", "Download updated PDF."],
    keywords: ["pdf metadata", "pdf title", "change pdf properties", "doc info"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "set-pdf-viewer-preferences",
    name: "Set PDF Viewer Preferences",
    shortName: "Viewer preferences",
    category: "edit",
    engine: "viewer-prefs",
    summary: "Normalize producer/creator viewer metadata.",
    description: "Refresh viewer-oriented metadata so downloads open cleanly in common readers.",
    howTo: ["Upload PDF.", "Apply preferences.", "Download."],
    keywords: ["pdf viewer preferences", "pdf open settings"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "bookmark-pdf",
    name: "Bookmark PDF",
    shortName: "Bookmarks",
    category: "edit",
    engine: "bookmark",
    summary: "Add page bookmarks / outline entries.",
    description: "Create Page 1…N outline bookmarks when the PDF engine supports outlines.",
    howTo: ["Upload PDF.", "Add bookmarks.", "Download."],
    keywords: ["bookmark pdf", "pdf outline", "pdf bookmarks"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "print-pdf-as-poster",
    name: "Print PDF as Poster",
    shortName: "Poster",
    category: "edit",
    engine: "poster",
    summary: "Tile the first page into a poster grid.",
    description: "Split the first page across multiple sheets for large-format wall prints.",
    howTo: ["Upload PDF.", "Generate poster tiles.", "Print the downloaded pages."],
    keywords: ["pdf poster", "print poster pdf", "tile pdf"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "generate-password",
    name: "Generate Password",
    shortName: "Password",
    category: "other",
    engine: "password-gen",
    summary: "Create a strong random password for PDF protect.",
    description: "Generate a high-entropy password you can paste into Set PDF Password.",
    howTo: ["Open the tool.", "Generate.", "Copy the password."],
    keywords: ["generate password", "password generator", "pdf password"],
  },
  {
    slug: "embed-pdf",
    name: "Embed PDF",
    shortName: "Embed PDF",
    category: "share",
    engine: "embed-snippet",
    summary: "Get HTML to embed a PDF on a website.",
    description: "Download a ready HTML snippet with a button and iframe for hosting your PDF.",
    howTo: ["Upload or name your PDF.", "Download the HTML snippet.", "Host beside your file."],
    keywords: ["embed pdf", "pdf iframe", "pdf on website"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-button",
    name: "PDF Button",
    shortName: "PDF Button",
    category: "share",
    engine: "embed-snippet",
    summary: "Generate a download/open button for a PDF.",
    description: "Same embed toolkit focused on a styled link button for your PDF file.",
    howTo: ["Provide the PDF name.", "Download HTML.", "Paste into your site."],
    keywords: ["pdf button", "pdf download button"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "accessible-pdf",
    name: "Accessible PDF",
    shortName: "Accessible PDF",
    category: "other",
    engine: "accessible-checklist",
    summary: "Checklist for PDF/UA-minded accessibility prep.",
    description: "Get a practical accessibility checklist and prep steps; full PDF/UA certification needs a dedicated validator.",
    howTo: ["Upload optional PDF.", "Download the checklist.", "Apply fixes in authoring tools."],
    keywords: ["accessible pdf", "pdf ua", "pdf accessibility"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-printer",
    name: "PDF Printer",
    shortName: "PDF Printer",
    category: "other",
    engine: "print",
    summary: "Open the system print dialog for a PDF.",
    description: "Load a PDF and trigger print / Save as PDF from your browser.",
    howTo: ["Upload PDF.", "Print.", "Choose printer or Save as PDF."],
    keywords: ["pdf printer", "print pdf online"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "straighten-pdf",
    name: "Straighten PDF",
    shortName: "Straighten",
    category: "edit",
    engine: "straighten",
    summary: "Deskew slightly tilted scan pages in the browser.",
    description:
      "Detects small skew angles on each page and rebuilds an upright PDF. For pages rotated a full 90°/180°/270°, use Rotate PDF first.",
    howTo: [
      "Upload a scanned PDF.",
      "Run Straighten to deskew pages locally.",
      "Download the straightened PDF.",
    ],
    keywords: ["straighten pdf", "deskew pdf", "fix skewed scan", "rotate scan"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "validate-pdfa",
    name: "Validate PDF/A",
    shortName: "Validate PDF/A",
    category: "other",
    engine: "validate-pdfa",
    summary: "Run an archival readiness checklist on your PDF.",
    description:
      "Produces a readiness report for PDF/A workflows (forms, metadata, openability). Full ISO PDF/A conformance still needs a dedicated validator such as veraPDF.",
    howTo: [
      "Upload a PDF.",
      "Download the readiness checklist.",
      "Finish with an external PDF/A validator if required.",
    ],
    keywords: ["validate pdfa", "pdf/a validation"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "verify-pdf-signatures",
    name: "Verify PDF Signatures",
    shortName: "Verify Signatures",
    category: "sign",
    engine: "verify-signatures",
    summary: "Inspect signature fields in a PDF.",
    description:
      "Lists signature-related form fields found in the file. Cryptographic certificate trust still requires Adobe Reader or another signing suite.",
    howTo: [
      "Upload a signed PDF.",
      "Review the signature field report.",
      "Open in a signing suite for full certificate validation.",
    ],
    keywords: ["verify pdf signature", "validate digital signature"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "pdf-to-e-invoice",
    name: "PDF to E-Invoice",
    shortName: "E-Invoice",
    category: "other",
    engine: "format-advice",
    availability: "guide",
    summary: "Notes on structured e-invoice export.",
    description: "Explains ZUGFeRD/Factur-X/UBL paths; use XML Invoice to PDF for XML payloads.",
    howTo: ["Upload PDF or skip.", "Read guidance.", "Use ERP or XML tools as needed."],
    keywords: ["pdf to e-invoice", "zugferd", "factur-x"],
    accept: "application/pdf,.pdf",
  },
  {
    slug: "validate-e-invoice",
    name: "Validate E-Invoice",
    shortName: "Validate Invoice",
    category: "other",
    engine: "format-advice",
    availability: "guide",
    summary: "Point to national e-invoice validators.",
    description: "Schema validation is jurisdiction-specific; myonlinepdfeditor.com documents next steps.",
    howTo: ["Upload optional XML/PDF.", "Read guidance.", "Use your national validator."],
    keywords: ["validate e-invoice", "ubl validate"],
    accept: ".xml,application/pdf,.pdf,application/xml",
  },
  {
    slug: "hwp-to-pdf",
    name: "HWP to PDF",
    shortName: "HWP to PDF",
    category: "convert",
    engine: "format-advice",
    availability: "guide",
    summary: "How to get Hangul HWP files into PDF.",
    description: "HWP is not decoded in-browser. Guidance covers Hancom/LibreOffice export paths.",
    howTo: ["Select your .hwp.", "Read conversion steps.", "Export PDF externally then use myonlinepdfeditor.com."],
    keywords: ["hwp to pdf", "hangul to pdf"],
    accept: ".hwp,application/x-hwp",
  },
  {
    slug: "pages-to-pdf",
    name: "Pages to PDF",
    shortName: "Pages to PDF",
    category: "convert",
    engine: "format-advice",
    availability: "guide",
    summary: "Export Apple Pages documents to PDF.",
    description: "Pages files need Apple Pages or iCloud export; myonlinepdfeditor.com documents the path.",
    howTo: ["Select .pages.", "Follow export guidance.", "Upload the PDF to other tools."],
    keywords: ["pages to pdf", "apple pages pdf"],
    accept: ".pages",
  },
  {
    slug: "ofd-to-pdf",
    name: "OFD to PDF",
    shortName: "OFD to PDF",
    category: "convert",
    engine: "format-advice",
    availability: "guide",
    summary: "Convert Chinese OFD documents via external readers.",
    description: "OFD needs specialized converters; myonlinepdfeditor.com explains how to obtain a PDF first.",
    howTo: ["Select .ofd.", "Read guidance.", "Convert externally."],
    keywords: ["ofd to pdf"],
    accept: ".ofd",
  },
  {
    slug: "pub-to-pdf",
    name: "Publisher to PDF",
    shortName: "PUB to PDF",
    category: "convert",
    engine: "format-advice",
    availability: "guide",
    summary: "Export Microsoft Publisher (.pub) to PDF.",
    description:
      "Publisher files need desktop export; guidance included. /tools/publisher-to-pdf permanently redirects here.",
    howTo: ["Select .pub.", "Follow export steps.", "Continue in myonlinepdfeditor.com with the PDF."],
    keywords: ["pub to pdf", "publisher to pdf", "microsoft publisher pdf", "ms publisher to pdf"],
    accept: ".pub",
  },
  {
    slug: "ps-to-pdf",
    name: "PS to PDF",
    shortName: "PS to PDF",
    category: "convert",
    engine: "format-advice",
    availability: "guide",
    summary: "Convert PostScript with desktop Ghostscript-class tools.",
    description: "Browsers cannot run Ghostscript; myonlinepdfeditor.com documents the desktop conversion path.",
    howTo: ["Select .ps.", "Read guidance.", "Convert on desktop."],
    keywords: ["ps to pdf", "postscript to pdf"],
    accept: ".ps,application/postscript",
  },
  {
    slug: "udf-to-pdf",
    name: "UDF to PDF",
    shortName: "UDF to PDF",
    category: "convert",
    engine: "format-advice",
    availability: "guide",
    summary: "Convert UDF documents via the authoring app.",
    description: "UDF is not decoded here—export PDF or DOCX first.",
    howTo: ["Select .udf.", "Read guidance.", "Export externally."],
    keywords: ["udf to pdf"],
    accept: ".udf",
  },
];

const toolBySlug = new Map(TOOLS.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return toolBySlug.get(slug);
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function allToolSlugs(): string[] {
  return TOOLS.map((t) => t.slug);
}