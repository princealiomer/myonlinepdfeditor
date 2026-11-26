import { getTool } from "./tools";

export type ToolFaq = { question: string; answer: string };

export type ToolCopy = {
  slug: string;
  headline: string;
  whatItIs: string;
  whyUse: string[];
  howToUse: { title: string; detail: string }[];
  howToExport: string[];
  whyBest: string[];
  tidbits: string[];
  faqs: ToolFaq[];
};

const TOOL_COPY: ToolCopy[] = [
  {
    slug: "word-to-pdf",
    headline: "Convert Word (.docx) to PDF in your browser without sending files to a server.",
    whatItIs:
      "myonlinepdfeditor.com Word to PDF reads your .docx file on your device and builds a PDF you can preview and save. Layout and fonts are preserved where the format allows, so everyday documents, letters, and reports usually land cleanly on the page.",
    whyUse: [
      "You need a PDF copy of a Word file for email, printing, or an upload portal that only accepts PDF.",
      "You want to share a document that opens the same way on Mac, Windows, phones, and tablets.",
      "You are archiving final versions and prefer a fixed layout instead of an editable .docx.",
      "You work with sensitive drafts and want conversion that stays on your machine.",
    ],
    howToUse: [
      {
        title: "Open Word to PDF",
        detail:
          "From the myonlinepdfeditor.com catalog, choose Word to PDF. No account is required to start.",
      },
      {
        title: "Select your .docx",
        detail:
          "Use the file picker to load a single Word document. Legacy .doc files should be saved as .docx in Word first.",
      },
      {
        title: "Wait for local conversion",
        detail:
          "myonlinepdfeditor.com processes the file in the browser. A progress indicator shows while pages are rendered to PDF.",
      },
      {
        title: "Review the preview",
        detail:
          "Scroll through the preview and check headings, tables, and page breaks before you save.",
      },
      {
        title: "Save or continue editing",
        detail:
          "Download the PDF or open it in another myonlinepdfeditor.com tool if you still need signatures or page changes.",
      },
    ],
    howToExport: [
      "Click Download when the preview looks correct.",
      "Your browser saves a .pdf file, usually to your Downloads folder.",
      "Rename the file if your team uses a version naming convention.",
      "Attach the PDF to email or upload it to your records system.",
    ],
    whyBest: [
      "Conversion runs locally in the browser, so your document is not uploaded for processing.",
      "Free to use with no signup gate before you convert.",
      "Works on any modern browser without installing Microsoft Word.",
      "Pairs with other myonlinepdfeditor.com tools if you need to merge, sign, or protect the PDF next.",
    ],
    tidbits: [
      "Complex Word features such as embedded macros or unusual fonts may look different in PDF—spot-check the preview.",
      "Very large .docx files with many images take longer because rendering happens on your CPU.",
      "For court or filing systems, confirm margin and font rules against your jurisdiction’s PDF requirements.",
    ],
    faqs: [
      {
        question: "Is Word to PDF on myonlinepdfeditor.com free?",
        answer:
          "Yes. Word to PDF is free forever on myonlinepdfeditor.com. Ads support the product so you do not need an account or paid plan to convert.",
      },
      {
        question: "Does myonlinepdfeditor.com upload my Word file?",
        answer:
          "The converter reads and renders your .docx in the browser. Your file is not sent to myonlinepdfeditor.com servers for the conversion step itself.",
      },
      {
        question: "Can I convert .doc instead of .docx?",
        answer:
          "myonlinepdfeditor.com expects the modern .docx format. Open legacy .doc files in Word or LibreOffice and save as .docx, then convert again.",
      },
      {
        question: "Will my tables and images stay in place?",
        answer:
          "Most standard tables, images, and styles transfer well. Highly custom templates or text boxes sometimes need a quick visual check in the preview.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Practical limits depend on your device memory and browser. Multi-hundred-megabyte files may be slow or fail; split large assets in Word if conversion struggles.",
      },
      {
        question: "What do I get after conversion?",
        answer:
          "A standard PDF file you download with the Download button. You can open it in any PDF viewer or continue in myonlinepdfeditor.com Edit PDF or Sign PDF.",
      },
    ],
  },
  {
    slug: "txt-to-pdf",
    headline: "Turn plain text or .txt files into a clean, printable PDF page.",
    whatItIs:
      "Text to PDF wraps your content in a simple paginated layout with readable type. Paste from a note app or upload a .txt file; myonlinepdfeditor.com builds the PDF locally so logs, scripts, and readme files become easy to print or attach.",
    whyUse: [
      "You have configuration logs, code snippets, or notes that need a fixed PDF record.",
      "A portal requires PDF but your source is plain text from a terminal or editor.",
      "You want consistent margins and font size when printing long text files.",
      "You prefer not to paste sensitive text into a cloud converter.",
    ],
    howToUse: [
      {
        title: "Launch Text to PDF",
        detail: "Open the tool from myonlinepdfeditor.com Convert tools.",
      },
      {
        title: "Paste or upload",
        detail:
          "Drop a .txt file or paste text directly. Line breaks from your source are kept.",
      },
      {
        title: "Adjust layout if offered",
        detail:
          "Pick page size or font options when the UI exposes them so wide lines do not run off the page.",
      },
      {
        title: "Generate preview",
        detail:
          "myonlinepdfeditor.com paginates the text in the browser and shows how pages break.",
      },
      {
        title: "Download",
        detail: "Save the PDF when pagination looks right.",
      },
    ],
    howToExport: [
      "Use Download to save a .pdf file to your device.",
      "Share the PDF by email or store it in your document system.",
      "Open the same PDF in myonlinepdfeditor.com Print Out for a paper copy.",
    ],
    whyBest: [
      "No server upload of your raw text for basic PDF generation.",
      "Instant workflow for developers and IT staff who already work in .txt.",
      "Free browser tool—no local TeX or desktop publisher install.",
      "Output is a normal PDF compatible with merge and password tools in myonlinepdfeditor.com.",
    ],
    tidbits: [
      "UTF-8 text with common characters works best; exotic encodings may need conversion before upload.",
      "Very long single-line strings can create awkward wraps—add manual line breaks when needed.",
      "Monospace-friendly layouts help when sharing code listings.",
    ],
    faqs: [
      {
        question: "Can I paste text instead of uploading?",
        answer:
          "Yes. Paste directly into the tool when the UI provides a text area, or upload a .txt file from disk.",
      },
      {
        question: "Does Text to PDF cost money?",
        answer:
          "The converter is free to use in the browser. Paid myonlinepdfeditor.com tiers, if you use them, are separate from this conversion.",
      },
      {
        question: "Will formatting like bold work?",
        answer:
          "Plain text has no rich styling. For formatted documents, use Word to PDF or HTML to PDF instead.",
      },
      {
        question: "How many pages can I create?",
        answer:
          "myonlinepdfeditor.com paginates until the content ends. Extremely large files may slow the tab; consider splitting the source text.",
      },
      {
        question: "Is my text kept private?",
        answer:
          "Processing happens in your browser session. myonlinepdfeditor.com does not need to store your .txt on a server to build the PDF.",
      },
    ],
  },
  {
    slug: "png-to-pdf",
    headline: "Combine PNG images into one PDF with local, in-browser processing.",
    whatItIs:
      "PNG to PDF places each image on its own page (or your chosen order) inside a single PDF. Screenshots, diagrams, and transparent graphics stay sharp because conversion runs on your device without a remote image pipeline.",
    whyUse: [
      "You captured UI screenshots that stakeholders want as one attachment.",
      "You need to print PNG graphics with consistent page sizing.",
      "A submission system accepts PDF but not loose image files.",
      "You want several PNGs merged without opening a desktop editor.",
    ],
    howToUse: [
      {
        title: "Open PNG to PDF",
        detail: "Select the tool and prepare one or more .png files.",
      },
      {
        title: "Add images",
        detail:
          "Use multi-select in the file picker when you have a batch of screenshots.",
      },
      {
        title: "Order pages",
        detail:
          "Drag thumbnails so the PDF page order matches your story or checklist.",
      },
      {
        title: "Review dimensions",
        detail:
          "Check that wide images fit; rotate pages afterward in Rotate PDF if needed.",
      },
      {
        title: "Build PDF",
        detail: "Confirm generation and wait for local assembly to finish.",
      },
    ],
    howToExport: [
      "Click Download to receive a single .pdf containing all PNG pages.",
      "Use Merge PDF later if you need to append this file to another PDF.",
      "Send the downloaded PDF through Share via Email after you save it locally.",
    ],
    whyBest: [
      "Images never need to leave your machine for PNG-to-PDF assembly.",
      "Supports multiple files in one pass with reorder control.",
      "Free and immediate—useful for quick incident report packets.",
      "Transparent PNG backgrounds are preserved in the PDF page.",
    ],
    tidbits: [
      "4K screenshots produce large PDFs; crop in an image editor first if size matters.",
      "Mixed portrait and landscape images may need per-page rotation after export.",
      "For photos, JPG to PDF often yields smaller files than PNG.",
    ],
    faqs: [
      {
        question: "Can I add more than one PNG?",
        answer:
          "Yes. Multi-file mode stacks each PNG as a page. Reorder before download.",
      },
      {
        question: "Is PNG to PDF free?",
        answer:
          "Yes. myonlinepdfeditor.com does not charge per conversion for this browser tool.",
      },
      {
        question: "Will transparency show correctly?",
        answer:
          "PNG alpha channels are embedded in the PDF page. Viewers generally show transparency against a white page background.",
      },
      {
        question: "What is the maximum image size?",
        answer:
          "Limits depend on browser memory. Giant panoramas may fail; resize images above roughly 50 MB per file when possible.",
      },
      {
        question: "Do you store my screenshots?",
        answer:
          "Assembly happens locally. myonlinepdfeditor.com is not designed to archive your image upload on its servers during conversion.",
      },
      {
        question: "What file type do I download?",
        answer:
          "A standard PDF via the Download button, ready for email or myonlinepdfeditor.com Sign PDF.",
      },
    ],
  },
  {
    slug: "jpg-to-pdf",
    headline: "Convert JPEG photos into a single shareable PDF document.",
    whatItIs:
      "JPG to PDF turns camera rolls and scanned JPEGs into one ordered PDF. Pick multiple files, arrange them, and myonlinepdfeditor.com stitches pages in the browser—handy for insurance photos, receipts, or ID scans.",
    whyUse: [
      "You photographed paper forms and need one PDF for upload.",
      "Email clients handle one PDF better than a dozen JPEG attachments.",
      "You want print-friendly page sizes around variable photo dimensions.",
      "You are batching evidence images for a claim or audit folder.",
    ],
    howToUse: [
      {
        title: "Start JPG to PDF",
        detail: "Open the converter from myonlinepdfeditor.com.",
      },
      {
        title: "Upload JPEGs",
        detail: "Select .jpg or .jpeg files from your gallery or folder.",
      },
      {
        title: "Sort chronologically",
        detail:
          "Reorder thumbnails so dates or room names follow a sensible sequence.",
      },
      {
        title: "Preview pages",
        detail: "Zoom check that crops are readable before export.",
      },
      {
        title: "Create PDF",
        detail: "Run the merge and wait for local page rendering.",
      },
    ],
    howToExport: [
      "Press Download to save the combined .pdf.",
      "Optionally open Set PDF Password if the photos are sensitive.",
      "Attach the file from your downloads folder to your message or portal.",
    ],
    whyBest: [
      "Local processing keeps personal photos off third-party conversion servers.",
      "Multi-image workflows with drag reorder beat manual one-by-one printing.",
      "No account required for a quick photo packet.",
      "Works alongside Compress-oriented exports if you later optimize size in Export PDF.",
    ],
    tidbits: [
      "Phone photos may include EXIF rotation; preview before sending to clients.",
      "Scanning at 150–200 DPI is usually enough for readable text in JPEG pages.",
      "Heic images from iPhones should be exported to JPEG first.",
    ],
    faqs: [
      {
        question: "JPG vs JPEG—does it matter?",
        answer:
          "No. myonlinepdfeditor.com accepts both extensions for the same image type.",
      },
      {
        question: "How do I reduce PDF size from many photos?",
        answer:
          "Resize photos before upload or run Export PDF after merge. Extreme megapixel images inflate file size.",
      },
      {
        question: "Is this safe for ID scans?",
        answer:
          "Files are processed in-browser. Still follow your org policy on identity documents and delete local copies when done.",
      },
      {
        question: "Can I mix JPG and PNG?",
        answer:
          "Use one converter per type, then Merge PDF to combine the results.",
      },
      {
        question: "Is myonlinepdfeditor.com JPG to PDF free?",
        answer: "Yes for standard browser conversion.",
      },
    ],
  },
  {
    slug: "ppt-to-pdf",
    headline: "Export PowerPoint (.pptx) slide content to a downloadable PDF.",
    whatItIs:
      "PPT to PDF extracts text and structure from .pptx decks and lays them out in a PDF you can circulate. It suits handouts and text-heavy decks; for pixel-perfect slide graphics, export slides as images and use JPG or PNG to PDF.",
    whyUse: [
      "Recipients need a read-only PDF instead of an editable deck.",
      "You want speaker notes or slide titles archived outside PowerPoint.",
      "Your LMS or CMS only accepts PDF uploads.",
      "You need a quick text snapshot without opening desktop Office.",
    ],
    howToUse: [
      {
        title: "Save as .pptx",
        detail:
          "Legacy .ppt files should be saved to .pptx in PowerPoint before upload.",
      },
      {
        title: "Upload the deck",
        detail: "Select the presentation file in PPT to PDF.",
      },
      {
        title: "Wait for extraction",
        detail:
          "myonlinepdfeditor.com reads slide text locally and maps it into PDF pages.",
      },
      {
        title: "Review output",
        detail:
          "Confirm slide order and that key bullets appear; charts may need separate image export.",
      },
      {
        title: "Download PDF",
        detail: "Save when the text layout meets your needs.",
      },
    ],
    howToExport: [
      "Use Download for a .pdf of extracted slide content.",
      "Share via your email client after the file is on disk.",
      "Merge PDF if you are bundling the deck with an appendix.",
    ],
    whyBest: [
      "Browser-based—no PowerPoint license required on every machine.",
      "Local read of the .pptx package keeps internal decks off random cloud converters.",
      "Free path from deck to PDF for internal distribution.",
      "Honest scope: optimized for text extraction, with a clear path for visual slides.",
    ],
    tidbits: [
      "Embedded videos and animations do not play in PDF; link out or export frames.",
      "Custom fonts in slides may substitute if not embedded in the .pptx.",
      "For board books, export high-res slide PNGs when visuals must match exactly.",
    ],
    faqs: [
      {
        question: "Will my slide graphics look identical?",
        answer:
          "This tool focuses on text extraction. Visual fidelity matches PowerPoint best when you export slide images and convert those to PDF.",
      },
      {
        question: "Does myonlinepdfeditor.com support .ppt?",
        answer:
          "Upload .pptx. Convert old .ppt to .pptx first.",
      },
      {
        question: "Is conversion free?",
        answer: "Yes in the myonlinepdfeditor.com browser tool.",
      },
      {
        question: "How large can a deck be?",
        answer:
          "Hundreds of slides are possible but slow. Split decks for faster conversion on modest hardware.",
      },
      {
        question: "Where is my file processed?",
        answer:
          "The .pptx is unpacked and read in your browser, not uploaded for server-side rendering.",
      },
    ],
  },
  {
    slug: "csv-to-pdf",
    headline: "Render CSV spreadsheet rows as a readable PDF table.",
    whatItIs:
      "CSV to PDF reads comma-separated data and formats it as a fixed table inside a PDF. Share reports with colleagues who should see numbers but not edit the live spreadsheet.",
    whyUse: [
      "Finance or ops wants a frozen snapshot of exported data.",
      "You attach PDFs to tickets while keeping Excel versions internal.",
      "Printouts need grid lines without sharing the raw .csv.",
      "You document month-end numbers for auditors.",
    ],
    howToUse: [
      {
        title: "Export CSV from your sheet",
        detail: "Save UTF-8 .csv from Excel, Sheets, or your database.",
      },
      {
        title: "Upload to CSV to PDF",
        detail: "Pick the file in myonlinepdfeditor.com.",
      },
      {
        title: "Check delimiter preview",
        detail:
          "Confirm columns line up; messy quotes may need cleanup in the source CSV.",
      },
      {
        title: "Review table pages",
        detail: "Wide tables may span pages—scroll the preview.",
      },
      {
        title: "Download report PDF",
        detail: "Save when columns and headers look correct.",
      },
    ],
    howToExport: [
      "Click Download to get a .pdf table export.",
      "Store alongside the source CSV in your records folder.",
      "Email the PDF; recipients cannot sort cells without the original file.",
    ],
    whyBest: [
      "Local parsing—row data does not need a cloud spreadsheet API.",
      "Quick bridge between data teams and PDF-only stakeholders.",
      "Free browser utility for occasional exports.",
      "Output works with myonlinepdfeditor.com password and certify tools for controlled release.",
    ],
    tidbits: [
      "Thousands of rows can produce long PDFs; filter in Excel before export when possible.",
      "Dates and currency formatting follow what is literally in the CSV text.",
      "European semicolon-separated files may need conversion to comma CSV first.",
    ],
    faqs: [
      {
        question: "Will formulas calculate in the PDF?",
        answer:
          "No. The PDF shows static values from the CSV at export time.",
      },
      {
        question: "Can I upload Excel .xlsx?",
        answer:
          "Save as .csv first. myonlinepdfeditor.com CSV to PDF reads .csv files.",
      },
      {
        question: "Is customer data uploaded to myonlinepdfeditor.com?",
        answer:
          "Parsing runs in the browser for this workflow; still handle PII per your compliance rules.",
      },
      {
        question: "What if columns are misaligned?",
        answer:
          "Fix quoting or delimiters in the source file and convert again.",
      },
      {
        question: "Is this tool free?",
        answer: "Yes for standard myonlinepdfeditor.com browser use.",
      },
    ],
  },
  {
    slug: "html-to-pdf",
    headline: "Render HTML pages and snippets into a PDF snapshot.",
    whatItIs:
      "HTML to PDF takes markup you paste or upload and produces a printable PDF snapshot. Use it for archiving web receipts, internal wiki exports, or handouts when you want a fixed layout offline.",
    whyUse: [
      "You saved HTML from a dashboard and need a PDF record.",
      "Legal or compliance asked for a point-in-time web content capture.",
      "You are distributing instructions that started as HTML help text.",
      "You want printing without relying on browser print on every machine.",
    ],
    howToUse: [
      {
        title: "Open HTML to PDF",
        detail: "Choose paste or .html file upload.",
      },
      {
        title: "Include styles",
        detail:
          "Inline CSS travels with the HTML; external stylesheets may need embedding.",
      },
      {
        title: "Preview render",
        detail:
          "myonlinepdfeditor.com lays out the DOM locally—check page breaks on long pages.",
      },
      {
        title: "Adjust source if needed",
        detail: "Edit HTML and re-render until headings and tables look right.",
      },
      {
        title: "Download PDF",
        detail: "Save the snapshot when satisfied.",
      },
    ],
    howToExport: [
      "Use Download for the rendered .pdf.",
      "Archive with a date-stamped filename.",
      "Merge PDF if combining HTML exports with scanned attachments.",
    ],
    whyBest: [
      "Keeps HTML content off third-party “save webpage” services.",
      "Works from a snippet without standing up a headless server.",
      "Free myonlinepdfeditor.com path for occasional captures.",
      "Pairs with Search for PDF if you later need to find text inside the export.",
    ],
    tidbits: [
      "JavaScript that builds the page after load may not run—static HTML works best.",
      "Large background images increase PDF weight.",
      "Relative image paths need absolute URLs or embedded base64.",
    ],
    faqs: [
      {
        question: "Can I convert a live website URL?",
        answer:
          "This tool expects HTML you provide. Fetch the page yourself or save source, then paste or upload.",
      },
      {
        question: "Is HTML to PDF free?",
        answer: "Yes in myonlinepdfeditor.com.",
      },
      {
        question: "Will CSS grid look the same?",
        answer:
          "Common CSS renders in preview, but complex layouts should be checked page by page.",
      },
      {
        question: "Does myonlinepdfeditor.com store my HTML?",
        answer:
          "Rendering is browser-side; treat sensitive markup like any local file.",
      },
      {
        question: "What file do I get?",
        answer: "A standard PDF from the Download button.",
      },
    ],
  },
  {
    slug: "rtf-to-pdf",
    headline: "Convert Rich Text Format (.rtf) files into standard PDFs.",
    whatItIs:
      "RTF to PDF opens legacy rich-text documents and saves them as PDF for universal viewing. myonlinepdfeditor.com reads the file on your computer, which helps when old correspondence or government forms only arrive as .rtf.",
    whyUse: [
      "You received an .rtf attachment and the recipient portal wants PDF.",
      "Your archive policy stores final copies as PDF, not RTF.",
      "You need to print formatted letters without Word installed.",
      "You are closing out old case files still in RTF format.",
    ],
    howToUse: [
      {
        title: "Select RTF to PDF",
        detail: "Open the converter in myonlinepdfeditor.com.",
      },
      {
        title: "Choose the .rtf file",
        detail: "Pick from disk; one file per conversion is typical.",
      },
      {
        title: "Local conversion",
        detail: "Wait while the browser interprets RTF styling.",
      },
      {
        title: "Preview fonts",
        detail: "Verify bold, italics, and spacing survived the trip.",
      },
      {
        title: "Download",
        detail: "Save the PDF copy.",
      },
    ],
    howToExport: [
      "Click Download for a .pdf.",
      "Flatten fields if the RTF carried form-like regions merged into PDF elsewhere.",
      "Protect with Set PDF Password before external sharing if needed.",
    ],
    whyBest: [
      "No desktop Word required for a one-off RTF archive.",
      "Private local conversion for legacy documents.",
      "Free and browser-based for occasional migrations.",
      "Clear output type for downstream myonlinepdfeditor.com signing.",
    ],
    tidbits: [
      "RTF embeds fewer features than DOCX; exotic objects may simplify in PDF.",
      "Unicode characters usually convert; check symbols in preview.",
      "Batch migration teams often pair this with Merge PDF for combined volumes.",
    ],
    faqs: [
      {
        question: "Is RTF to PDF free on myonlinepdfeditor.com?",
        answer: "Yes.",
      },
      {
        question: "Can myonlinepdfeditor.com edit RTF directly?",
        answer:
          "Convert to PDF, then use Edit PDF for markup, or edit the RTF in a word processor first.",
      },
      {
        question: "Are images in RTF preserved?",
        answer:
          "Embedded images generally appear; verify in the preview.",
      },
      {
        question: "Is my document uploaded?",
        answer:
          "Conversion is designed to run in your browser session.",
      },
      {
        question: "What if conversion fails?",
        answer:
          "Open the RTF in Word, save as .docx, and try Word to PDF as a fallback.",
      },
    ],
  },
  {
    slug: "edit-pdf",
    headline: "Open PDFs in the browser and adjust pages, text, and markup locally.",
    whatItIs:
      "myonlinepdfeditor.com PDF Editor loads your document in the browser so you can navigate pages, add content, and export an updated file. The workflow is built for quick fixes and light assembly rather than full desktop publishing.",
    whyUse: [
      "You need to correct a typo or add a paragraph without re-exporting from Word.",
      "You want to place shapes, text boxes, or highlights before sending for signature.",
      "You are prepping a packet and want one browser tab for edits and download.",
      "You handle confidential PDFs and prefer editing that does not upload the source file.",
    ],
    howToUse: [
      {
        title: "Upload your PDF",
        detail: "Open Edit PDF and select the file from your device.",
      },
      {
        title: "Navigate pages",
        detail: "Use thumbnails or scroll to reach the page you need.",
      },
      {
        title: "Use the toolbar",
        detail:
          "Add text, drawings, or other tools your myonlinepdfeditor.com build exposes for the editor engine.",
      },
      {
        title: "Save changes incrementally",
        detail:
          "Work page by page; preview often so exports match expectations.",
      },
      {
        title: "Export the edited PDF",
        detail: "Download when the document reflects your updates.",
      },
    ],
    howToExport: [
      "Click Download in the editor to save an updated .pdf.",
      "The new file replaces your working copy in Downloads unless you rename it.",
      "Open Merge PDF or Sign PDF with the downloaded file for next steps.",
    ],
    whyBest: [
      "Edits run against the file in your session without a mandatory cloud locker.",
      "No install—works wherever myonlinepdfeditor.com runs in the browser.",
      "Free entry point for casual PDF fixes.",
      "Connects to flatten, protect, and sign tools in the same catalog.",
    ],
    tidbits: [
      "Scanned PDFs need OCR elsewhere before text becomes editable as real text.",
      "Keep a pristine original separate from edited exports for audit trails.",
      "Large architectural drawings may feel sluggish; split pages if the tab slows.",
    ],
    faqs: [
      {
        question: "Is the PDF Editor free?",
        answer:
          "Yes for standard browser editing features myonlinepdfeditor.com exposes. Paid plans may add collaboration, but basic edit and download remain available.",
      },
      {
        question: "Does myonlinepdfeditor.com upload my PDF to edit it?",
        answer:
          "The editor is built for in-browser work on the file you open. Check your myonlinepdfeditor.com deployment notes if your org uses a server-assisted editor variant.",
      },
      {
        question: "Can I edit scanned documents?",
        answer:
          "You can draw on scans. Selecting and changing underlying text usually needs a searchable text layer first.",
      },
      {
        question: "What formats can I export?",
        answer: "Download produces a standard PDF.",
      },
      {
        question: "Is there a page limit?",
        answer:
          "Very large PDFs depend on device RAM. Split PDF first if performance drops.",
      },
      {
        question: "Will edits change fonts embedded in the PDF?",
        answer:
          "Added text uses editor fonts; existing embedded fonts on the page generally stay as-is until you overlay new content.",
      },
    ],
  },
  {
    slug: "create-pdf",
    headline: "Start from a blank canvas and build a new PDF in the browser.",
    whatItIs:
      "Create PDF gives you an empty document inside myonlinepdfeditor.com so you can add pages, text, and images, then save a PDF without Word or desktop layout software. It suits quick letters, checklists, and one-page forms.",
    whyUse: [
      "You need a PDF fast and only have a browser available.",
      "You are prototyping a form layout before adding fillable fields.",
      "You want a lightweight alternative to printing-to-PDF for simple documents.",
      "You are assembling internal SOP handouts as PDF from scratch.",
    ],
    howToUse: [
      {
        title: "Open Create PDF",
        detail: "Launch the tool to start a blank document session.",
      },
      {
        title: "Add pages",
        detail: "Insert pages as your outline grows.",
      },
      {
        title: "Place content",
        detail: "Type headings, body text, and images using editor controls.",
      },
      {
        title: "Review layout",
        detail: "Check margins and page breaks before export.",
      },
      {
        title: "Save your PDF",
        detail: "Download when the draft is complete.",
      },
    ],
    howToExport: [
      "Use Download to save a .pdf you created in the session.",
      "Switch to Add Fillable Fields if the draft should become interactive.",
      "Share the downloaded file through your normal channels.",
    ],
    whyBest: [
      "Browser-native creation without installing a PDF printer driver.",
      "Free starting point for one-off documents.",
      "Same editor ecosystem as Edit PDF for consistent controls.",
      "Local session work keeps drafts on your machine until you download.",
    ],
    tidbits: [
      "Brand logos should be PNG with reasonable resolution to stay sharp.",
      "Save incremental downloads when building multi-page packs.",
      "Templates from Create Templates can speed repeat layouts.",
    ],
    faqs: [
      {
        question: "Do I need Word to create a PDF here?",
        answer: "No. Content is authored directly in myonlinepdfeditor.com Create PDF.",
      },
      {
        question: "Can I add fillable fields later?",
        answer:
          "Yes. Download the PDF or continue in Add Fillable Fields on the same project flow.",
      },
      {
        question: "Is Create PDF free?",
        answer: "Yes for standard use in the browser.",
      },
      {
        question: "What page sizes are supported?",
        answer:
          "Common sizes such as Letter and A4 depend on editor settings—check the page setup UI.",
      },
      {
        question: "Where is my draft stored?",
        answer:
          "Work lives in the browser until you download. Save PDFs to disk to avoid losing progress if you close the tab.",
      },
    ],
  },
  {
    slug: "add-fillable-fields",
    headline: "Place text, checkbox, and signature fields on any PDF form.",
    whatItIs:
      "Add Fillable Fields marks regions on a flat PDF so recipients can type answers, tick boxes, and sign digitally. You design the form once in myonlinepdfeditor.com and distribute the prepared PDF for completion.",
    whyUse: [
      "You have a paper form PDF and need an interactive version.",
      "HR or ops wants consistent field placement on every new hire packet.",
      "You are standardizing client intake without a dedicated form SaaS.",
      "You need signature spots defined before send-for-signature workflows.",
    ],
    howToUse: [
      {
        title: "Open the base PDF",
        detail: "Upload the static PDF in Add Fillable Fields or the editor.",
      },
      {
        title: "Choose field types",
        detail:
          "Add text fields, checkboxes, and signature regions where answers belong.",
      },
      {
        title: "Label fields",
        detail:
          "Set tab order and names so data entry flows top to bottom.",
      },
      {
        title: "Test fill",
        detail:
          "Type sample answers to confirm fields are sized correctly.",
      },
      {
        title: "Export fillable PDF",
        detail: "Download the interactive file for distribution.",
      },
    ],
    howToExport: [
      "Click Download to save a PDF with embedded form fields.",
      "Recipients can complete it in Create Fillable Forms or compatible viewers.",
      "Flatten Fields after completion if you need a non-editable final.",
    ],
    whyBest: [
      "Field design stays on your device in the browser editor.",
      "No per-form subscription required for basic fillable PDF creation.",
      "Integrates with sign and flatten tools in myonlinepdfeditor.com.",
      "You control distribution—email, portal, or in-person signing.",
    ],
    tidbits: [
      "Overly small text boxes frustrate mobile users—leave padding.",
      "Required fields are a convention; communicate rules in cover email.",
      "Date fields often work better as text with a format hint.",
    ],
    faqs: [
      {
        question: "Will Adobe Acrobat Reader fill these fields?",
        answer:
          "Standard PDF form fields generally work in common readers; test one copy before mass send.",
      },
      {
        question: "Can I collect responses automatically?",
        answer:
          "myonlinepdfeditor.com prepares the PDF; you collect completed files via your process unless your myonlinepdfeditor.com plan adds collection features.",
      },
      {
        question: "Is add fillable fields free?",
        answer: "Yes for browser-based field placement.",
      },
      {
        question: "Can I add a signature field?",
        answer:
          "Yes. Pair with Sign PDF or send-for-signature prep for signing workflows.",
      },
      {
        question: "Does this upload my form to myonlinepdfeditor.com servers?",
        answer:
          "Field markup is applied in your editing session locally.",
      },
      {
        question: "How do I lock answers after signing?",
        answer: "Use Flatten Fields to bake values into the page.",
      },
    ],
  },
  {
    slug: "flatten-fields",
    headline: "Merge form fields and annotations into permanent page content.",
    whatItIs:
      "Flatten Fields takes interactive annotations, form values, and markup layers and renders them into the PDF page itself. The result behaves like a flat scan—ideal for finals, archives, and print runs.",
    whyUse: [
      "Signed forms should not allow field edits afterward.",
      "Print shops want a single visual layer without hidden fields.",
      "You are closing a deal and need an immutable copy.",
      "Review comments should disappear or become fixed text before external share.",
    ],
    howToUse: [
      {
        title: "Upload filled PDF",
        detail:
          "Open a PDF that still has active fields or annotation layers.",
      },
      {
        title: "Choose flatten scope",
        detail:
          "Flatten all fields or selected pages depending on tool options.",
      },
      {
        title: "Preview",
        detail:
          "Confirm signatures and typed answers look correct on the page.",
      },
      {
        title: "Run flatten",
        detail: "myonlinepdfeditor.com merges layers locally in the browser.",
      },
      {
        title: "Download flat PDF",
        detail: "Save the non-interactive file.",
      },
    ],
    howToExport: [
      "Press Download for a flattened .pdf.",
      "Archive this copy as the system of record.",
      "Certify PDF or Set PDF Password if policy requires marking or encryption next.",
    ],
    whyBest: [
      "One-click hygiene before external distribution.",
      "Browser processing without sending filled PII to flatten services.",
      "Free utility in the myonlinepdfeditor.com edit suite.",
      "Pairs naturally after Create Fillable Forms completion.",
    ],
    tidbits: [
      "Flattening is destructive to editability—keep the interactive master if needed.",
      "Some viewers hide empty fields until flatten reveals blank boxes.",
      "Flatten before fax prep when online fax tools mishandle widgets.",
    ],
    faqs: [
      {
        question: "Can I un-flatten later?",
        answer:
          "No. Keep an unfilled or interactive copy if you may need edits.",
      },
      {
        question: "Will flatten change appearance?",
        answer:
          "Values should match preview; rare font substitution can shift text slightly.",
      },
      {
        question: "Is flattening free?",
        answer: "Yes in myonlinepdfeditor.com.",
      },
      {
        question: "Does flatten remove comments?",
        answer:
          "Depending on options, comments may merge into the page or drop—check preview.",
      },
      {
        question: "Is flattened PDF still signable?",
        answer:
          "You can draw new signatures, but old signature fields become graphics.",
      },
    ],
  },
  {
    slug: "split-pdf",
    headline: "Extract page ranges or split a PDF into separate files.",
    whatItIs:
      "Split PDF lets you pull chapters, invoices, or individual scans out of a larger file. Define ranges or split every page, then download separate PDFs or a ZIP of parts—all assembled locally.",
    whyUse: [
      "A 200-page scan only needs pages 12–18 sent to counsel.",
      "You received one closing PDF and must file exhibits separately.",
      "Email size limits require smaller attachments.",
      "You want per-page files for a RAG or indexing pipeline.",
    ],
    howToUse: [
      {
        title: "Upload the source PDF",
        detail: "Open Split PDF and load the document.",
      },
      {
        title: "Pick split mode",
        detail:
          "Choose ranges, every page, or custom rules shown in the UI.",
      },
      {
        title: "Name outputs",
        detail: "Confirm how files will be labeled in the ZIP or list.",
      },
      {
        title: "Run split",
        detail: "Wait for local page extraction.",
      },
      {
        title: "Download results",
        detail: "Save individual PDFs or a ZIP bundle.",
      },
    ],
    howToExport: [
      "Use Download for one part or Download ZIP when multiple parts are created.",
      "Each output is a standard .pdf.",
      "Merge PDF again if you regroup a subset later.",
    ],
    whyBest: [
      "Splits happen on your machine—useful for privileged bundles.",
      "No per-page fees for basic extraction.",
      "Visual page picker reduces off-by-one mistakes.",
      "Works with scans and born-digital PDFs alike.",
    ],
    tidbits: [
      "Split before password-protecting if only one section is sensitive.",
      "Bookmarked PDFs may lose outline metadata in child files.",
      "Odd page counts in duplex printing—note which side is blank.",
    ],
    faqs: [
      {
        question: "Is Split PDF free?",
        answer: "Yes.",
      },
      {
        question: "Can I split password-protected PDFs?",
        answer:
          "Open the file with the password in myonlinepdfeditor.com first, then split the unlocked working copy.",
      },
      {
        question: "Maximum pages?",
        answer:
          "Thousands of pages are possible; splitting very large files may take time locally.",
      },
      {
        question: "Do you upload my PDF to split?",
        answer:
          "Designed for in-browser page copying.",
      },
      {
        question: "What format is the download?",
        answer: "PDF files or a ZIP containing PDFs.",
      },
    ],
  },
  {
    slug: "merge-pdf",
    headline: "Combine multiple PDFs into one file in the order you choose.",
    whatItIs:
      "Merge PDFs stacks separate files—reports, scans, and appendices—into a single download. Files are joined in upload order; remove any you do not want before merging.",
    whyUse: [
      "Closing binders arrive as separate scans that should be one packet.",
      "You converted images to PDF and need one continuous document.",
      "Applicants sent multiple attachments you want unified.",
      "You are building a board book from chapter PDFs.",
    ],
    howToUse: [
      {
        title: "Add PDF files",
        detail: "Select two or more PDFs with multi-file upload.",
      },
      {
        title: "Check order",
        detail: "Files merge in the order listed. Remove extras you do not need.",
      },
      {
        title: "Review total page count",
        detail: "Confirm the combined length matches expectations.",
      },
      {
        title: "Merge",
        detail: "myonlinepdfeditor.com stitches byte streams locally.",
      },
      {
        title: "Download combined PDF",
        detail: "Save the merged output.",
      },
    ],
    howToExport: [
      "Click Download for the single merged .pdf.",
      "Rename for versioning before sharing.",
      "Use Rotate PDF if one inserted scan is sideways.",
    ],
    whyBest: [
      "Local merge avoids uploading entire deal rooms to strangers.",
      "Free combiner with multi-file support.",
      "No arbitrary brand watermark on output.",
      "Natural follow-up to Word to PDF and image converters.",
    ],
    tidbits: [
      "Mixed page sizes (Letter + A4) may look uneven—normalize sources when possible.",
      "Merged file size is roughly the sum of inputs.",
      "Run Flatten Fields on inputs first if interactive layers cause viewer warnings.",
    ],
    faqs: [
      {
        question: "How many files can I merge?",
        answer:
          "Practical limits are browser memory and patience; dozens of modest PDFs are typical.",
      },
      {
        question: "Is Merge PDF free?",
        answer: "Yes.",
      },
      {
        question: "Will bookmarks be preserved?",
        answer:
          "Simple merges may drop complex outline metadata—verify in your viewer.",
      },
      {
        question: "Can I merge PDFs with different passwords?",
        answer:
          "Unlock each PDF in myonlinepdfeditor.com before adding it to the merge list.",
      },
      {
        question: "What do I download?",
        answer: "One combined PDF file.",
      },
    ],
  },
  {
    slug: "rotate-pdf",
    headline: "Turn sideways scans upright with one whole-document rotation.",
    whatItIs:
      "Rotate Pages fixes orientation without rescanning. Choose 90°, 180°, or 270° for every page, then export an updated PDF.",
    whyUse: [
      "Duplex scans came in landscape by mistake.",
      "Mobile photo imports need 90° correction before merge.",
      "Court filings require upright orientation.",
      "You mixed scan batches with inconsistent rotation.",
    ],
    howToUse: [
      {
        title: "Open the PDF",
        detail: "Upload in Rotate PDF.",
      },
      {
        title: "Choose angle",
        detail: "Select 90°, 180°, or 270° for the whole document.",
      },
      {
        title: "Rotate",
        detail: "Run the tool to apply the same rotation to every page.",
      },
      {
        title: "Verify",
        detail: "Open the download and confirm orientation.",
      },
      {
        title: "Save",
        detail: "Keep the rotated PDF.",
      },
    ],
    howToExport: [
      "Download saves a new .pdf with changed page rotation metadata and content.",
      "Print Out for a paper check if needed.",
    ],
    whyBest: [
      "Quick fix in-browser before merge or email.",
      "Free and private for medical or legal scans.",
      "No full re-export from the scanner app.",
      "Pairs with Reorder Pages when scans are also out of sequence.",
    ],
    tidbits: [
      "Rotating does not change image resolution.",
      "Some viewers cache old rotation—reopen the downloaded file.",
      "Use 180° for upside-down pages in one step.",
    ],
    faqs: [
      {
        question: "Rotate per page or whole doc?",
        answer:
          "This tool rotates every page by the same angle. For page-level sorting, use Organize PDF.",
      },
      {
        question: "Is rotation free?",
        answer: "Yes.",
      },
      {
        question: "Will text PDFs rotate cleanly?",
        answer: "Yes; reflow text may shift margins slightly in viewers.",
      },
      {
        question: "Does myonlinepdfeditor.com upload the scan?",
        answer: "Rotation is applied locally.",
      },
      {
        question: "Output format?",
        answer: "Standard PDF via Download.",
      },
    ],
  },
  {
    slug: "reorder-pdf",
    headline: "Enter a new page order before you share.",
    whatItIs:
      "Reorder Pages lets you type a 1-based page sequence (for example 3,1,2,4) so annexes, signature pages, or shuffled scans land in the right order. Export writes that sequence into a single PDF. For drag-and-drop thumbnails, use Organize PDF.",
    whyUse: [
      "Your scanner fed pages backwards.",
      "Exhibits should appear after the agreement, not before.",
      "You merged PDFs and need fine page-level sequencing.",
      "A client emailed pages out of order.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Load the file in Reorder Pages.",
      },
      {
        title: "Enter the new order",
        detail: "Type comma-separated page numbers covering every page once.",
      },
      {
        title: "Double-check the list",
        detail: "Confirm each page appears exactly once.",
      },
      {
        title: "Run reorder",
        detail: "Apply the sequence locally in your browser.",
      },
      {
        title: "Download reordered PDF",
        detail: "Save when the sequence is final.",
      },
    ],
    howToExport: [
      "Click Download for the reordered .pdf.",
      "Use Delete Pages if stray blanks remain.",
      "Sign PDF on the corrected order.",
    ],
    whyBest: [
      "Visual reorder beats typing page numbers in split commands.",
      "Local processing for sensitive deal docs.",
      "Free page sorter in myonlinepdfeditor.com.",
      "Works on long scans when you only need order fixes.",
    ],
    tidbits: [
      "Renumber printed page footers manually if they no longer match order.",
      "Combine with Merge PDF when sources arrive as separate chapter files.",
      "Save before reordering if the tab is unstable on huge files.",
    ],
    faqs: [
      {
        question: "Is reorder destructive?",
        answer:
          "You download a new PDF; keep the original if you may need the old order.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Page limit?",
        answer: "Depends on device; very large docs may lag dragging thumbnails.",
      },
      {
        question: "Bookmarks updated?",
        answer:
          "Simple reorder may not remap outlines—verify in your PDF app.",
      },
      {
        question: "Where is processing?",
        answer: "In your browser.",
      },
    ],
  },
  {
    slug: "delete-pages",
    headline: "Remove blank, duplicate, or obsolete pages from a PDF.",
    whatItIs:
      "Delete Pages trims fat from uploads before sharing. Select thumbnails to remove, export a shorter PDF, and skip mailing pages nobody needs.",
    whyUse: [
      "Scans include accidental blank sheets.",
      "Marketing removed a product page from the catalog PDF.",
      "You only need signature page plus terms, not the full manual.",
      "File size matters and extra pages are pure noise.",
    ],
    howToUse: [
      {
        title: "Load PDF",
        detail: "Open Delete Pages with your file.",
      },
      {
        title: "Select thumbnails",
        detail: "Click pages slated for removal.",
      },
      {
        title: "Confirm selection",
        detail: "Review so you do not drop wanted content.",
      },
      {
        title: "Apply delete",
        detail: "myonlinepdfeditor.com rebuilds the page tree locally.",
      },
      {
        title: "Download trimmed PDF",
        detail: "Save the slimmer document.",
      },
    ],
    howToExport: [
      "Download the new .pdf with remaining pages only.",
      "Merge with other files if you are replacing deleted sections.",
    ],
    whyBest: [
      "Faster than re-scanning when only a few pages are wrong.",
      "Browser-side for confidential trimming.",
      "Free utility next to Split and Reorder.",
      "Immediate size reduction for email limits.",
    ],
    tidbits: [
      "Page numbers in footers may need manual edits after deletion.",
      "Undo is only as good as your kept original—archive masters.",
      "Deleting is permanent in the exported file.",
    ],
    faqs: [
      {
        question: "Can I recover deleted pages?",
        answer:
          "Not from the export; keep the source PDF.",
      },
      {
        question: "Is Delete Pages free?",
        answer: "Yes.",
      },
      {
        question: "Bulk delete ranges?",
        answer:
          "Use shift-select or range tools when the UI provides them.",
      },
      {
        question: "Password-protected inputs?",
        answer: "Unlock in myonlinepdfeditor.com first.",
      },
      {
        question: "Output type?",
        answer: "PDF download.",
      },
    ],
  },
  {
    slug: "sign-pdf",
    headline: "Sign contracts and forms on desktop with draw or type options.",
    whatItIs:
      "Sign a PDF lets you place a handwritten or typed signature on any page and export a signed copy immediately. It fits same-device signing when email back-and-forth is unnecessary.",
    whyUse: [
      "You need a countersignature on a PDF before end of day.",
      "A client is on a video call and can sign while you watch.",
      "You prefer not to print, sign, and rescan.",
      "You want a local signing option without uploading to a signature platform.",
    ],
    howToUse: [
      {
        title: "Upload the PDF",
        detail: "Open Sign PDF with the document requiring a signature.",
      },
      {
        title: "Choose signature style",
        detail: "Draw with mouse or stylus, or type a scripted name.",
      },
      {
        title: "Place and resize",
        detail: "Position the signature on the signature line or block.",
      },
      {
        title: "Add date if needed",
        detail: "Type today's date near the signature when the form requires it.",
      },
      {
        title: "Download signed PDF",
        detail: "Save the completed file.",
      },
    ],
    howToExport: [
      "Click Download for a .pdf containing your signature graphic.",
      "Flatten Fields if form widgets remain editable.",
      "Email the download using Share via Email after saving locally.",
    ],
    whyBest: [
      "Signing graphics are applied in your browser session.",
      "Free for individual same-device signatures.",
      "No forced account to place a basic signature.",
      "Connects to in-person and kiosk flows for field use.",
    ],
    tidbits: [
      "Typed signatures are legally context-dependent—follow counsel for high-stakes agreements.",
      "Save your signature PNG in the browser only if you trust the device.",
      "Use a stylus on tablets for smoother ink.",
    ],
    faqs: [
      {
        question: "Is e-signing legal with myonlinepdfeditor.com?",
        answer:
          "Many jurisdictions accept electronic signatures on contracts, but requirements vary by document type and country. Confirm with counsel for wills, real estate, and regulated filings.",
      },
      {
        question: "Does myonlinepdfeditor.com provide a certificate of completion?",
        answer:
          "Sign PDF exports a visual signature on the page. For audit logs, use PDF Audit Trail stamps and your own records.",
      },
      {
        question: "Is Sign PDF free?",
        answer: "Yes for basic placement and download.",
      },
      {
        question: "Are signatures uploaded to a server?",
        answer:
          "Session processing keeps the PDF local during signing in standard browser mode.",
      },
      {
        question: "Can multiple people sign one file?",
        answer:
          "Each signer can add a signature sequentially after download, or use Prepare for Signature fields first.",
      },
      {
        question: "File format after signing?",
        answer: "Standard PDF via Download.",
      },
    ],
  },
  {
    slug: "send-for-signature",
    headline: "Mark signature fields and export a packet others can complete.",
    whatItIs:
      "Prepare for Signature places signature, initial, and date fields on your PDF so signers know exactly where to act. myonlinepdfeditor.com handles in-browser prep; you deliver the PDF through email or your signing process.",
    whyUse: [
      "Two signers need distinct boxes on a joint venture agreement.",
      "You want a clean layout before routing to clients.",
      "Your process is email PDFs, but fields reduce signing errors.",
      "You are standardizing where initials appear on every SOW.",
    ],
    howToUse: [
      {
        title: "Open the agreement",
        detail: "Upload the PDF in Prepare for Signature.",
      },
      {
        title: "Assign field types",
        detail: "Add signature, initial, and date fields per signer.",
      },
      {
        title: "Name signers in notes",
        detail: "Optional text labels help recipients find their block.",
      },
      {
        title: "Test tab order",
        detail: "Tab through fields to mimic signer experience.",
      },
      {
        title: "Download prepared PDF",
        detail: "Save and distribute through your channel.",
      },
    ],
    howToExport: [
      "Download the .pdf with placed fields.",
      "Attach to email or upload to your e-sign vendor.",
      "Track status manually with PDF Status if helpful.",
    ],
    whyBest: [
      "Field prep stays local—useful for NDAs and HR packets.",
      "No vendor lock for the layout step.",
      "Free preparation before your chosen delivery path.",
      "Works with Flatten Fields after everyone signs.",
    ],
    tidbits: [
      "Tell signers not to move field boxes if their viewer allows it.",
      "Color-code fields in cover instructions when you have many parties.",
      "Combine with Bulk Sending checklists for uniform packets.",
    ],
    faqs: [
      {
        question: "Does myonlinepdfeditor.com email signers for me?",
        answer:
          "This tool prepares the PDF. You send it via email, portal, or another service.",
      },
      {
        question: "Is this the same as DocuSign?",
        answer:
          "myonlinepdfeditor.com focuses on field placement and download, not hosted signature routing.",
      },
      {
        question: "Free?",
        answer: "Yes for in-browser prep.",
      },
      {
        question: "Mobile signing?",
        answer:
          "Recipients can use Sign PDF or Kiosk Mode on phones after they receive your file.",
      },
      {
        question: "Legal validity?",
        answer:
          "Field placement does not by itself prove identity—follow your compliance playbook.",
      },
    ],
  },
  {
    slug: "send-envelopes",
    headline: "Bundle several PDFs into one signing envelope with a checklist.",
    whatItIs:
      "Send Envelopes groups multiple documents for a single signing round. myonlinepdfeditor.com builds a local checklist and downloadable PDF set; you handle actual delivery through email or your signature provider.",
    whyUse: [
      "Onboarding needs offer letter, handbook, and tax forms together.",
      "Loan packets include note, deed, and disclosures.",
      "You want signer names logged before files scatter.",
      "Envelope metaphor helps coordinators track multi-doc deals.",
    ],
    howToUse: [
      {
        title: "Upload PDFs",
        detail: "Add every document that belongs in the envelope.",
      },
      {
        title: "Enter signers",
        detail: "List names and emails in the checklist UI.",
      },
      {
        title: "Order documents",
        detail: "Sequence files so signers open the cover page first.",
      },
      {
        title: "Review checklist",
        detail: "Confirm all attachments are present.",
      },
      {
        title: "Download package",
        detail: "Save PDFs and checklist from the export step.",
      },
    ],
    howToExport: [
      "Download a ZIP or multiple PDFs per the envelope export.",
      "Keep the checklist text file or PDF for your tracker.",
      "Send files through your mail client—myonlinepdfeditor.com does not host the envelope.",
    ],
    whyBest: [
      "Local assembly avoids uploading entire deal stacks at prep time.",
      "Free structuring for coordinators.",
      "Honest scope: prep and download, not hosted routing.",
      "Pairs with PDF Status for manual tracking.",
    ],
    tidbits: [
      "Name files clearly in the ZIP (01-Offer, 02-NDA).",
      "Flatten each PDF after signing to avoid partial interactive leftovers.",
      "Envelope size can hit email limits—use links you control.",
    ],
    faqs: [
      {
        question: "Does myonlinepdfeditor.com send the envelope automatically?",
        answer:
          "No. You download the package and send it via your email or fax channel.",
      },
      {
        question: "How many PDFs per envelope?",
        answer:
          "Limited by browser memory; typical HR packets of a handful of files work well.",
      },
      {
        question: "Free?",
        answer: "Yes for prep and download.",
      },
      {
        question: "Signer order enforced?",
        answer:
          "Checklist is advisory unless your downstream tool enforces routing.",
      },
      {
        question: "Is checklist data stored in the cloud?",
        answer:
          "Checklist generation is local; only you distribute the result.",
      },
    ],
  },
  {
    slug: "in-person-signing",
    headline: "Capture a signature on the same device during a face-to-face meeting.",
    whatItIs:
      "In-person Signing hands the phone or laptop to the signer, collects a drawn or typed signature, and lets you download the finished PDF before they leave the room.",
    whyUse: [
      "Clinic intake forms need immediate signatures at the front desk.",
      "Field inspectors close work orders on-site.",
      "You distrust email delays for time-sensitive consents.",
      "KYC meetings require witness presence.",
    ],
    howToUse: [
      {
        title: "Load PDF on device",
        detail: "Open In-person Signing with the form.",
      },
      {
        title: "Hand device to signer",
        detail: "Use kiosk-style fullscreen when helpful.",
      },
      {
        title: "Signer draws signature",
        detail: "They complete required fields on screen.",
      },
      {
        title: "Review with signer",
        detail: "Scroll key clauses before final tap.",
      },
      {
        title: "Download on the spot",
        detail: "Save PDF before resetting for the next visitor.",
      },
    ],
    howToExport: [
      "Download signed .pdf immediately.",
      "AirDrop or USB transfer to back-office PC if policy allows.",
      "Flatten to lock values before archiving.",
    ],
    whyBest: [
      "No email round-trip for walk-in workflows.",
      "Browser-based on hardware you already own.",
      "Free mode for events and lobbies.",
      "Private session—reset browser between signers on shared tablets.",
    ],
    tidbits: [
      "Disable notifications before handing over a laptop.",
      "Sanitize screen between signers in healthcare settings.",
      "Charge tablets during long registration days.",
    ],
    faqs: [
      {
        question: "Is in-person signing legally sound?",
        answer:
          "Physical presence can strengthen consent evidence, but legal rules still depend on document type and locale.",
      },
      {
        question: "Shared kiosk hygiene?",
        answer:
          "Download, then clear the session or use private browsing per signer.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Offline?",
        answer:
          "Requires myonlinepdfeditor.com to load once; signing may work offline only if your deployment caches assets.",
      },
      {
        question: "Output?",
        answer: "PDF download with embedded signature.",
      },
    ],
  },
  {
    slug: "kiosk-mode",
    headline: "Full-screen signing layout tuned for phones and tablets.",
    whatItIs:
      "Kiosk Mode strips chrome for lobby and event signing. Load the document, capture a finger signature, and download before the next guest steps up.",
    whyUse: [
      "Trade show booths need quick NDA signatures.",
      "Hotel check-in tablets want a simple sign screen.",
      "Volunteer waivers at races must be fast on mobile.",
      "You need large touch targets for elderly signers.",
    ],
    howToUse: [
      {
        title: "Open Kiosk Mode",
        detail: "Use a tablet or phone browser.",
      },
      {
        title: "Load document",
        detail: "Upload or open the queued PDF.",
      },
      {
        title: "Presenter walks through",
        detail: "Optional verbal summary of key lines.",
      },
      {
        title: "Signer completes",
        detail: "Finger signature and required taps.",
      },
      {
        title: "Staff downloads",
        detail: "Save PDF and reset for next signer.",
      },
    ],
    howToExport: [
      "Tap Download for each completed .pdf.",
      "Sync files to your server via USB or secure upload you operate.",
      "Flatten before batch archival.",
    ],
    whyBest: [
      "Mobile-first UI without native app install.",
      "Free kiosk flow for occasional events.",
      "Local signing without faxing paper.",
      "Complements in-person signing on the same hardware.",
    ],
    tidbits: [
      "Pin the browser tab to reduce accidental exits.",
      "Brightness up for outdoor booths.",
      "Prepare a QR to the right myonlinepdfeditor.com URL for roving staff.",
    ],
    faqs: [
      {
        question: "Android and iOS?",
        answer: "Modern mobile browsers myonlinepdfeditor.com supports work; test Safari and Chrome beforehand.",
      },
      {
        question: "Can I lock the device?",
        answer:
          "Use OS guided access or kiosk software outside myonlinepdfeditor.com for true lockdown.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Stylus support?",
        answer: "Active stylus input works when the browser passes pressure events.",
      },
      {
        question: "Data residency?",
        answer: "PDFs stay local until staff downloads; you control upload afterward.",
      },
    ],
  },
  {
    slug: "bulk-sending",
    headline: "Generate per-recipient checklists from one PDF template.",
    whatItIs:
      "Bulk Sending pairs a master PDF with a recipient list to produce download-ready copies and a distribution checklist. myonlinepdfeditor.com prepares locally; you send each file via your mail or LMS.",
    whyUse: [
      "Annual policy acknowledgments go to 200 employees.",
      "Coaches need identical waiver PDFs with different names logged.",
      "You track who received which download filename.",
      "Mass contractor onboarding shares the same MSA.",
    ],
    howToUse: [
      {
        title: "Upload template PDF",
        detail: "The document every recipient signs.",
      },
      {
        title: "Paste recipient list",
        detail: "One name and email per line as the UI describes.",
      },
      {
        title: "Validate parsing",
        detail: "Fix malformed lines before generation.",
      },
      {
        title: "Generate package",
        detail: "myonlinepdfeditor.com builds checklist and file bundle locally.",
      },
      {
        title: "Download and send",
        detail: "Use your email system for actual delivery.",
      },
    ],
    howToExport: [
      "Download checklist and PDF copies from the export screen.",
      "Send each recipient their file through your mail merge or BCC process.",
      "Record returns in PDF Status or your HRIS.",
    ],
    whyBest: [
      "Avoids manually duplicating attachments in a mail client.",
      "Recipient list stays on your machine during prep.",
      "Free prep layer for nonprofit and SMB mailings.",
      "Honest handoff: you operate the send button.",
    ],
    tidbits: [
      "CSV recipient lists paste cleanly when columns are name,email.",
      "Throttle sends to avoid spam filters.",
      "Personalize cover email even when the PDF is identical.",
    ],
    faqs: [
      {
        question: "Does Bulk Sending email automatically?",
        answer:
          "No. myonlinepdfeditor.com generates files and checklist; you send via your email provider.",
      },
      {
        question: "Per-recipient unique PDF content?",
        answer:
          "Template is shared; uniqueness is mainly tracking metadata in the checklist unless you add mail-merge elsewhere.",
      },
      {
        question: "List size limits?",
        answer:
          "Thousands of lines may slow generation; split batches if the tab hangs.",
      },
      {
        question: "Free?",
        answer: "Yes for generation.",
      },
      {
        question: "Privacy?",
        answer: "Lists are processed in-browser during prep—still follow GDPR/HIPAA policy when sending.",
      },
    ],
  },
  {
    slug: "add-comments",
    headline: "Attach review comments and callouts on PDF drafts.",
    whatItIs:
      "Add Comments places sticky notes and markup on passages that need feedback. Export keeps annotations for the next reviewer or flatten when comments should disappear from externals.",
    whyUse: [
      "Legal wants line-level questions on a draft contract.",
      "Design review marks crop issues on spec PDFs.",
      "You collaborate without emailing Word redlines.",
      "Teachers annotate student PDF submissions.",
    ],
    howToUse: [
      {
        title: "Upload draft",
        detail: "Open the PDF in Add Comments.",
      },
      {
        title: "Pick comment tool",
        detail: "Place note markers on the relevant text.",
      },
      {
        title: "Write clear notes",
        detail: "Reference page and section in each comment.",
      },
      {
        title: "Resolve internally",
        detail: "Remove or update comments as issues close.",
      },
      {
        title: "Export annotated PDF",
        detail: "Download for the next reviewer.",
      },
    ],
    howToExport: [
      "Download preserves annotation layers in the .pdf.",
      "Flatten Fields when comments should become fixed or hidden.",
      "Share via Email after download.",
    ],
    whyBest: [
      "Markup stays local during review sessions.",
      "Free alternative to heavyweight review suites for small teams.",
      "Works with Edit PDF tools in one catalog.",
      "You choose whether annotations travel externally.",
    ],
    tidbits: [
      "Some viewers hide comments until hover—tell recipients how to open them.",
      "Flatten before court filing if interactive markup is discouraged.",
      "Use initials in comment text for audit clarity.",
    ],
    faqs: [
      {
        question: "Will comments show in all PDF apps?",
        answer:
          "Standard annotation support varies; test in Acrobat Reader before wide send.",
      },
      {
        question: "Can I reply to comments?",
        answer:
          "Depends on editor features—often linear notes rather than threaded chat.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Upload to cloud?",
        answer: "Annotation editing is in-browser on your file.",
      },
      {
        question: "Remove comments for finals?",
        answer: "Delete in editor or flatten to bake/hide markup.",
      },
    ],
  },
  {
    slug: "share-via-link",
    headline: "Export a clean PDF ready for the link or drive you choose.",
    whatItIs:
      "Share via Link finishes your PDF locally and downloads a file sized for attachment or cloud upload. myonlinepdfeditor.com does not host permanent public links—you upload the export to Dropbox, Drive, or your CMS.",
    whyUse: [
      "You need a flattened final before sharing a URL.",
      "Drive uploads fail on interactive PDFs with extra layers.",
      "You want one export step before password-protecting elsewhere.",
      "Marketing publishes PDFs to a CDN they control.",
    ],
    howToUse: [
      {
        title: "Finish edits",
        detail: "Complete changes in Edit PDF or signing tools.",
      },
      {
        title: "Optional flatten",
        detail: "Run Flatten Fields if widgets should not travel.",
      },
      {
        title: "Run share export",
        detail: "Open Share via Link with the working PDF.",
      },
      {
        title: "Download clean copy",
        detail: "Save the export myonlinepdfeditor.com prepares.",
      },
      {
        title: "Upload to your host",
        detail: "Create the share link in your storage provider.",
      },
    ],
    howToExport: [
      "Click Download for the share-ready .pdf.",
      "Upload to your cloud and copy the link their UI provides.",
      "myonlinepdfeditor.com does not store the link—bookmark it in your password manager.",
    ],
    whyBest: [
      "You keep custody of where files live.",
      "No mystery third-party link expiration for your core document.",
      "Free export pass in the browser.",
      "Pairs with Set PDF Password before public links.",
    ],
    tidbits: [
      "Check file size against your host's upload cap.",
      "Version filenames with dates for link rot clarity.",
      "Use read-only sharing permissions on sensitive folders.",
    ],
    faqs: [
      {
        question: "Does myonlinepdfeditor.com generate the URL?",
        answer:
          "No. You download the PDF and upload to your service to obtain a link.",
      },
      {
        question: "Free?",
        answer: "Yes for export prep.",
      },
      {
        question: "Track downloads?",
        answer: "Use your cloud provider's analytics, not myonlinepdfeditor.com.",
      },
      {
        question: "Safe for confidential PDFs?",
        answer:
          "Export is local; link security depends on your host's ACLs and passwords.",
      },
      {
        question: "File type?",
        answer: "Standard PDF download.",
      },
    ],
  },
  {
    slug: "share-via-email",
    headline: "Draft a mailto message and attach the PDF you already downloaded.",
    whatItIs:
      "Share via Email opens your default mail client with subject and body filled in. You attach the PDF from disk because myonlinepdfeditor.com never uploads the attachment bytes through its servers.",
    whyUse: [
      "You want a consistent subject line for support tickets.",
      "Mailto saves typing recipient instructions.",
      "You control which PDF version attaches.",
      "You avoid cloud relays for confidential briefs.",
    ],
    howToUse: [
      {
        title: "Prepare final PDF",
        detail: "Edit, sign, and download the file.",
      },
      {
        title: "Enter recipient",
        detail: "Type email and optional note in myonlinepdfeditor.com.",
      },
      {
        title: "Launch mailto",
        detail: "Your OS opens the default email app.",
      },
      {
        title: "Attach downloaded PDF",
        detail: "Pick the file from Downloads manually.",
      },
      {
        title: "Send from your mailbox",
        detail: "Review and hit send in your client.",
      },
    ],
    howToExport: [
      "Download the .pdf before starting mailto.",
      "Attachment happens in Outlook, Gmail app, or Apple Mail.",
      "Save sent copy from your mail server.",
    ],
    whyBest: [
      "Honest privacy: attachment path is your email provider.",
      "Free helper for small teams without shared drives.",
      "Works with corporate SMTP clients that block unknown SaaS.",
      "No forced myonlinepdfeditor.com inbox.",
    ],
    tidbits: [
      "mailto length limits may truncate very long bodies—keep notes concise.",
      "Webmail users may need to attach manually if no client opens.",
      "BCC yourself for records.",
    ],
    faqs: [
      {
        question: "Does myonlinepdfeditor.com send the email?",
        answer: "No. Your mail application sends after you attach the file.",
      },
      {
        question: "Large attachments?",
        answer: "Respect your provider's size cap or link via Share via Link workflow.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Gmail in browser?",
        answer: "May open compose tab; attach the PDF from Downloads.",
      },
      {
        question: "Is the PDF uploaded to myonlinepdfeditor.com?",
        answer: "No for the attachment step.",
      },
    ],
  },
  {
    slug: "fax",
    headline: "Download a fax-ready PDF for the online fax service you already use.",
    whatItIs:
      "Fax PDF prepares a clean, print-oriented PDF locally. myonlinepdfeditor.com does not dial fax numbers; you upload the download to eFax, HelloFax, or a multifunction device portal.",
    whyUse: [
      "County clerk still accepts faxed filings.",
      "Healthcare partners require fax for certain forms.",
      "You need high-contrast pages for mediocre fax lines.",
      "Your MFP has a web upload slot expecting PDF.",
    ],
    howToUse: [
      {
        title: "Upload source PDF",
        detail: "Open Fax PDF with the document.",
      },
      {
        title: "Optimize preview",
        detail: "Confirm text is legible at low resolution.",
      },
      {
        title: "Flatten if needed",
        detail: "Remove interactive layers that confuse fax gateways.",
      },
      {
        title: "Download fax-ready copy",
        detail: "Save the export myonlinepdfeditor.com labels for fax.",
      },
      {
        title: "Upload to fax provider",
        detail: "Complete transmission in your fax account.",
      },
    ],
    howToExport: [
      "Download the prepared .pdf.",
      "Drag into your online fax dashboard.",
      "Keep confirmation pages from the fax vendor, not myonlinepdfeditor.com.",
    ],
    whyBest: [
      "Clear boundary: myonlinepdfeditor.com preps; your vendor sends.",
      "Local prep without mandatory fax credits in myonlinepdfeditor.com.",
      "Free optimization pass.",
      "Works with Set PDF Password removed before fax (unprotect first).",
    ],
    tidbits: [
      "Cover sheets belong in your fax UI, not embedded unless required.",
      "Dark backgrounds fax poorly—prefer black text on white.",
      "International numbers need E.164 format in the fax portal.",
    ],
    faqs: [
      {
        question: "Can myonlinepdfeditor.com fax directly?",
        answer: "No. Use a third-party fax service after download.",
      },
      {
        question: "Is transmission secure?",
        answer:
          "Fax security depends on your vendor and phone path; PDF prep is local.",
      },
      {
        question: "Free?",
        answer: "myonlinepdfeditor.com prep is free; fax services bill separately.",
      },
      {
        question: "Color PDFs?",
        answer: "Most fax paths are monochrome; preview contrast before send.",
      },
      {
        question: "Confirmation?",
        answer: "Obtain delivery receipts from the fax provider.",
      },
    ],
  },
  {
    slug: "pdf-status",
    headline: "Track draft, sent, and completed notes for PDFs in this browser.",
    whatItIs:
      "PDF Status stores lightweight workflow labels and notes in local browser storage so you remember where each document stood. Status does not sync across devices unless your deployment adds sync.",
    whyUse: [
      "Freelancers juggle multiple client contracts.",
      "You mark which PDF version was emailed Friday.",
      "Signing workflows need a simple state column.",
      "You want personal tracking without a full CLM system.",
    ],
    howToUse: [
      {
        title: "Name the document",
        detail: "Match the filename you use on disk.",
      },
      {
        title: "Pick status",
        detail: "Draft, sent, waiting, completed—per UI options.",
      },
      {
        title: "Add notes",
        detail: "Who has it, due dates, or version numbers.",
      },
      {
        title: "Save",
        detail: "myonlinepdfeditor.com writes to local storage.",
      },
      {
        title: "Update as things move",
        detail: "Change status when countersignature lands.",
      },
    ],
    howToExport: [
      "Status is not a PDF export—copy notes manually if you need a spreadsheet.",
      "Download the actual PDF from Edit or Download tools separately.",
      "Back up browser profiles if statuses matter long term.",
    ],
    whyBest: [
      "No account required for personal tracking.",
      "Data stays on device—good for solo operators.",
      "Free lightweight CRM for PDFs.",
      "Honest limits: not a legal audit log.",
    ],
    tidbits: [
      "Clearing site data wipes statuses—export notes periodically.",
      "Use consistent filenames so status rows stay meaningful.",
      "Pair with Certify PDF on the authoritative final.",
    ],
    faqs: [
      {
        question: "Does status sync to my phone?",
        answer:
          "Default local storage is per browser profile; sync requires your own process.",
      },
      {
        question: "Is this an audit trail?",
        answer:
          "No. Use PDF Audit Trail stamps on the file for visible versioning.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Team visibility?",
        answer: "Personal unless you share machines—not multi-user SaaS.",
      },
      {
        question: "Can I export statuses?",
        answer: "Copy from the UI; no PDF download for status alone.",
      },
    ],
  },
  {
    slug: "create-templates",
    headline: "Design reusable PDF layouts with labels, fields, and branding.",
    whatItIs:
      "Create Templates helps you build a master PDF with consistent blocks you duplicate for each new matter. Fields and static text live in one template file you reopen in the editor.",
    whyUse: [
      "Monthly invoices should look identical.",
      "Legal uses the same exhibit cover each trial.",
      "HR refreshes offer letters with one layout change.",
      "Agencies ship client-branded form starters.",
    ],
    howToUse: [
      {
        title: "Start from PDF or blank",
        detail: "Open Create Templates in the editor.",
      },
      {
        title: "Add branding",
        detail: "Logo, header text, and footer disclaimers.",
      },
      {
        title: "Place fields",
        detail: "Text boxes for names, dates, and amounts.",
      },
      {
        title: "Save template copy",
        detail: "Download the master .pdf.",
      },
      {
        title: "Duplicate for each use",
        detail: "Reopen in Edit PDF or fillable tools.",
      },
    ],
    howToExport: [
      "Download template as .pdf.",
      "Store masters in a read-only folder.",
      "Branch copies with date suffixes before sending.",
    ],
    whyBest: [
      "Local design without template subscriptions.",
      "Free authoring in myonlinepdfeditor.com.",
      "Pairs with Bulk Sending for wide rollout.",
      "You own template files on disk.",
    ],
    tidbits: [
      "Version templates semver-style (v2.1).",
      "Document which fields are mandatory in a README.",
      "Keep editable masters separate from flattened sends.",
    ],
    faqs: [
      {
        question: "Cloud template library?",
        answer: "myonlinepdfeditor.com stores templates you download; organize folders yourself.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Import Word?",
        answer: "Convert Word to PDF first, then templatize in the editor.",
      },
      {
        question: "Share with team?",
        answer: "Share the PDF file via your drive; no built-in multi-tenant library.",
      },
      {
        question: "Editable after save?",
        answer: "Yes in Edit PDF unless flattened.",
      },
    ],
  },
  {
    slug: "create-fillable-forms",
    headline: "Complete interactive PDF forms in the browser without printing.",
    whatItIs:
      "Create Fillable Forms opens PDFs that already contain fields so you can type answers, check boxes, and save a filled copy. Typing happens locally in your session.",
    whyUse: [
      "Government PDFs insist on digital fill.",
      "You hate printing IRS-style forms.",
      "Applicants return forms faster when typing is easy.",
      "You need a filled copy before Flatten Fields.",
    ],
    howToUse: [
      {
        title: "Upload fillable PDF",
        detail: "Government or custom forms both work.",
      },
      {
        title: "Tab through fields",
        detail: "Enter data in each box.",
      },
      {
        title: "Validate required answers",
        detail: "Cross-check numbers and dates.",
      },
      {
        title: "Save progress via download",
        detail: "Download partially filled if you must pause.",
      },
      {
        title: "Finish and export",
        detail: "Download completed form.",
      },
    ],
    howToExport: [
      "Click Download for filled .pdf.",
      "Flatten if recipients should not change answers.",
      "Email via Share via Email attaching the download.",
    ],
    whyBest: [
      "No print-scan cycle.",
      "Free filler for standard PDF forms.",
      "Local typing session.",
      "Upstream from sign and flatten tools.",
    ],
    tidbits: [
      "Some forms use XFA—unsupported PDFs may need vendor software.",
      "Zoom in on small checkbox fields on mobile.",
      "Save before closing tab.",
    ],
    faqs: [
      {
        question: "Can I create fields here?",
        answer: "Use Add Fillable Fields to design; this tool fills existing forms.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Save to IRS?",
        answer: "Download and follow agency upload rules; myonlinepdfeditor.com does not e-file.",
      },
      {
        question: "Data uploaded?",
        answer: "Filling runs in-browser on your file.",
      },
      {
        question: "Signatures inside forms?",
        answer: "Use Sign PDF on signature fields after fill.",
      },
    ],
  },
  {
    slug: "document-assistant",
    headline: "Outline tasks and rewrite snippets from text you extract locally.",
    whatItIs:
      "Document Assistant pulls readable text from your PDF in the browser and helps you draft outlines, to-do lists, or reworded passages without sending the full document to myonlinepdfeditor.com servers.",
    whyUse: [
      "You need a meeting agenda from a long policy PDF.",
      "You want clearer wording for an executive summary email.",
      "You explore next steps after reading a vendor contract.",
      "You prefer AI help that starts from locally extracted text.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Open Document Assistant with your file.",
      },
      {
        title: "Extract text",
        detail: "Wait for local text extraction to finish.",
      },
      {
        title: "Ask for an outline or rewrite",
        detail: "Use assistant prompts on the extracted content only.",
      },
      {
        title: "Review output",
        detail: "Fact-check names, numbers, and dates against the PDF.",
      },
      {
        title: "Copy results",
        detail: "Paste into email or back into Edit PDF.",
      },
    ],
    howToExport: [
      "Assistant output copies to clipboard—no automatic PDF rewrite.",
      "Download the source PDF separately if you edited it elsewhere.",
      "Paste assistant text into Create PDF to save a new PDF if needed.",
    ],
    whyBest: [
      "Starts from on-device extraction described in myonlinepdfeditor.com AI tools.",
      "Useful for orientation before deep reading.",
      "Free tier friendly for occasional outlines.",
      "You stay editor-of-record for anything you publish.",
    ],
    tidbits: [
      "Scanned PDFs without text layers produce little extractable text.",
      "Never paste privileged content into external chatbots—stay in myonlinepdfeditor.com flow.",
      "Chunk long manuals section by section for better outlines.",
    ],
    faqs: [
      {
        question: "Does the assistant upload my whole PDF?",
        answer:
          "myonlinepdfeditor.com AI features are built around text you extract locally; confirm your deployment privacy notice for any optional cloud model.",
      },
      {
        question: "Is Document Assistant free?",
        answer:
          "Basic use is free in browser; org plans may meter advanced models.",
      },
      {
        question: "Can it sign documents?",
        answer: "No. Use Sign PDF after you finalize content.",
      },
      {
        question: "Hallucinations?",
        answer:
          "Always verify quotes and figures against the original PDF pages.",
      },
      {
        question: "Languages?",
        answer: "Quality depends on extraction and model support for that language.",
      },
      {
        question: "Export PDF from assistant?",
        answer:
          "Copy text manually or build a PDF in Create PDF.",
      },
    ],
  },
  {
    slug: "simplify-document",
    headline: "Rewrite dense PDF text into plainer language in the browser.",
    whatItIs:
      "Simplify Document works on text extracted from your PDF to suggest easier wording for policies, medical handouts, or technical specs. You approve changes before they influence anything official.",
    whyUse: [
      "Patients need plain-language consent summaries.",
      "Employees struggle with policy jargon.",
      "You train new hires with simplified study guides.",
      "You test readability before publishing an external FAQ.",
    ],
    howToUse: [
      {
        title: "Load PDF",
        detail: "Upload the document to simplify.",
      },
      {
        title: "Extract passages",
        detail: "Select or extract the sections to simplify.",
      },
      {
        title: "Run simplify",
        detail: "Review proposed plainer sentences.",
      },
      {
        title: "Edit suggestions",
        detail: "Keep legal terms that must stay precise.",
      },
      {
        title: "Use output",
        detail: "Paste into comms or auxiliary PDFs.",
      },
    ],
    howToExport: [
      "Copy simplified text from the results panel.",
      "Download original PDF unchanged unless you edited elsewhere.",
      "Create a companion PDF in Create PDF for patient handouts.",
    ],
    whyBest: [
      "Local extraction first aligns with privacy-minded workflows.",
      "Focused on readability, not full auto-translation.",
      "Free helper for comms teams.",
      "You control what gets published externally.",
    ],
    tidbits: [
      "Simplification is not legal advice—counsel reviews binding text.",
      "Define reading level targets for your audience.",
      "Keep a glossary for terms you intentionally preserve.",
    ],
    faqs: [
      {
        question: "Does simplify change my PDF file?",
        answer:
          "It produces text output; the source PDF download stays unless you edit separately.",
      },
      {
        question: "Medical or legal safe?",
        answer:
          "Use simplified text as supplemental; authoritative copy stays the signed PDF.",
      },
      {
        question: "Free?",
        answer: "Yes for standard in-browser helpers.",
      },
      {
        question: "Upload to AI cloud?",
        answer:
          "Follow myonlinepdfeditor.com documentation for your build; design emphasizes local extraction.",
      },
      {
        question: "Non-English?",
        answer: "Results vary by language and model.",
      },
    ],
  },
  {
    slug: "summarize-key-points",
    headline: "Produce short summaries from PDF text extracted on your device.",
    whatItIs:
      "Summarize Key Points turns long reports into bullet highlights so you can brief stakeholders quickly. It operates on extracted text, making it a orientation tool rather than a substitute for careful review.",
    whyUse: [
      "Board members need a one-page brief before the meeting.",
      "You triage a stack of RFPs.",
      "You write weekly updates citing multiple PDF sources.",
      "You teach students to identify thesis statements in papers.",
    ],
    howToUse: [
      {
        title: "Open PDF",
        detail: "Start Summarize Key Points with the file.",
      },
      {
        title: "Extract text",
        detail: "Ensure extraction covers the sections you care about.",
      },
      {
        title: "Choose summary length",
        detail: "Pick brevity if the UI offers length controls.",
      },
      {
        title: "Read bullets critically",
        detail: "Verify every claim against source pages.",
      },
      {
        title: "Copy summary",
        detail: "Paste into slides or email.",
      },
    ],
    howToExport: [
      "Summaries export via clipboard, not automatic PDF.",
      "Optional: paste into TXT to PDF for a PDF summary.",
      "Keep the original PDF download for citations.",
    ],
    whyBest: [
      "Saves time on first-pass reading.",
      "Built for browser workflows alongside myonlinepdfeditor.com viewers.",
      "Free summarization for individuals.",
      "Does not silently replace certified finals.",
    ],
    tidbits: [
      "Numbers in summaries need manual verification.",
      "Multi-column layouts may jumble extraction order.",
      "Summarize per chapter on 200+ page regs.",
    ],
    faqs: [
      {
        question: "Can I trust summaries for compliance?",
        answer:
          "No. They are drafts; read source PDF for decisions.",
      },
      {
        question: "Page references?",
        answer:
          "Copy page numbers manually from the viewer when citing.",
      },
      {
        question: "Free?",
        answer: "Yes for baseline features.",
      },
      {
        question: "Scanned PDFs?",
        answer: "Poor OCR means weak summaries—run Readable PDF first if available.",
      },
      {
        question: "Languages?",
        answer: "Model dependent.",
      },
    ],
  },
  {
    slug: "ask-document",
    headline: "Ask questions against text indexed from your PDF locally.",
    whatItIs:
      "Ask Document lets you type questions and see answers drawn from sentences extracted on your device. It helps you find definitions, dates, and obligations without cloud-uploading the entire file for Q&A.",
    whyUse: [
      "You need the termination clause page without reading everything.",
      "Support agents answer customer questions from manual PDFs.",
      "Researchers query methods sections.",
      "You study for exams from lecture PDFs.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Open Ask Document.",
      },
      {
        title: "Build text index",
        detail: "Wait for local extraction to complete.",
      },
      {
        title: "Type a question",
        detail: "Be specific: dates, parties, defined terms.",
      },
      {
        title: "Review cited excerpts",
        detail: "Open the cited page in the viewer to confirm.",
      },
      {
        title: "Iterate",
        detail: "Refine questions if the first answer misses context.",
      },
    ],
    howToExport: [
      "Copy Q&A text from the panel.",
      "Download the underlying PDF separately for records.",
      "Do not treat chat log as signed contract.",
    ],
    whyBest: [
      "Faster lookup than manual Ctrl+F on sprawling docs.",
      "Aligned with privacy-first extraction story.",
      "Free research aid.",
      "Transparent citations from local text when available.",
    ],
    tidbits: [
      "Tables and charts may not parse—read those pages visually.",
      "Defined terms must match exact spelling in the PDF.",
      "Cross-reference two answers when money is involved.",
    ],
    faqs: [
      {
        question: "Is Ask Document a lawyer?",
        answer: "No. It finds text; it does not interpret law.",
      },
      {
        question: "Upload to servers?",
        answer:
          "Designed around local extraction; verify your org's myonlinepdfeditor.com AI settings.",
      },
      {
        question: "Free?",
        answer: "Yes for standard use.",
      },
      {
        question: "Wrong answers?",
        answer:
          "Possible when extraction misses context—always read the page.",
      },
      {
        question: "Multi-file?",
        answer: "One PDF per session typically.",
      },
    ],
  },
  {
    slug: "pdf-audit-trail",
    headline: "Stamp version, date, and reviewer notes for lightweight audit trails.",
    whatItIs:
      "PDF Audit Trail adds visible stamps such as version numbers, review dates, and reviewer initials on the PDF surface. It documents which copy was approved without claiming full GxP system logging.",
    whyUse: [
      "Quality teams mark controlled document versions.",
      "You show when legal reviewed a customer contract.",
      "Engineering releases specs with REV stamps.",
      "You differentiate draft watermarks from finals.",
    ],
    howToUse: [
      {
        title: "Open controlled PDF",
        detail: "Upload the version you intend to stamp.",
      },
      {
        title: "Choose stamp fields",
        detail: "Version, date, author, document ID.",
      },
      {
        title: "Place on cover or footer",
        detail: "Follow your style guide.",
      },
      {
        title: "Preview",
        detail: "Ensure stamps do not obscure body text.",
      },
      {
        title: "Download stamped PDF",
        detail: "Distribute this as the marked copy.",
      },
    ],
    howToExport: [
      "Download stamped .pdf.",
      "Archive alongside change records in your QMS.",
      "Flatten if stamps should merge with page content only.",
    ],
    whyBest: [
      "Visible accountability without external stamp SaaS.",
      "Browser-side stamping on files you already hold.",
      "Free for simple governance.",
      "Pairs with Certify PDF for finals.",
    ],
    tidbits: [
      "Stamps are not cryptographic seals.",
      "Use UTC or local time consistently in date stamps.",
      "Reference ticket numbers in stamp text when useful.",
    ],
    faqs: [
      {
        question: "21 CFR Part 11 compliant?",
        answer:
          "myonlinepdfeditor.com stamps are visual aids, not a validated electronic records system.",
      },
      {
        question: "Tamper-evident?",
        answer:
          "Anyone can edit PDFs; use certified workflows and storage controls you trust.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Batch stamp?",
        answer: "Repeat per file or automate outside myonlinepdfeditor.com.",
      },
      {
        question: "Format?",
        answer: "PDF download with stamp graphics or text.",
      },
    ],
  },
  {
    slug: "certify-pdf",
    headline: "Mark a PDF with a visible certification banner as the authoritative copy.",
    whatItIs:
      "Certify PDF places certification language on the document so readers know this file is the final, approved version. Combine with flatten and password tools when handoff must be strict.",
    whyUse: [
      "Finance certifies audited statements PDFs.",
      "You publish an authoritative spec to vendors.",
      "You replace ambiguous drafts circulating in email.",
      "Legal signs off on customer-facing terms.",
    ],
    howToUse: [
      {
        title: "Upload final PDF",
        detail: "Only certify content that is actually final.",
      },
      {
        title: "Add certification text",
        detail: "Use your standard certification block.",
      },
      {
        title: "Position prominently",
        detail: "Cover page or header banner.",
      },
      {
        title: "Review with stakeholder",
        detail: "Confirm wording before export.",
      },
      {
        title: "Download certified PDF",
        detail: "Archive and distribute.",
      },
    ],
    howToExport: [
      "Click Download for certified .pdf.",
      "Set PDF Password if only authorized readers should open.",
      "Share via your controlled document portal.",
    ],
    whyBest: [
      "Clear visual signal without PDF certificate chains from PKI vendors.",
      "Local banner application.",
      "Free governance helper.",
      "Works after Sign PDF and Flatten Fields.",
    ],
    tidbits: [
      "Certification text should name role and date.",
      "Keep uncertified masters in a restricted folder.",
      "Certify after all edits—not before.",
    ],
    faqs: [
      {
        question: "Same as digital certificate signing?",
        answer:
          "No. This is a visible notice, not PKCS#7 document certification.",
      },
      {
        question: "Can certifying lock editing?",
        answer: "Use Set PDF Password or flatten; banner alone does not lock.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Legal effect?",
        answer: "Depends on policy; banner supports process, not automatic enforceability.",
      },
      {
        question: "Output?",
        answer: "PDF download.",
      },
    ],
  },
  {
    slug: "set-pdf-password",
    headline: "Encrypt a PDF with an open password before sharing.",
    whatItIs:
      "Set PDF Password applies passphrase protection in the browser so viewers must enter the password to open the file. Encryption happens locally; share the password through a separate secure channel.",
    whyUse: [
      "You email salary PDFs to employees.",
      "Clients receive confidential assessments.",
      "You comply with policy requiring encrypted attachments.",
      "Lost USB sticks should not expose PDFs.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Open Set PDF Password.",
      },
      {
        title: "Enter strong password",
        detail: "Use length and mix of characters.",
      },
      {
        title: "Confirm password",
        detail: "Avoid typos before encrypting.",
      },
      {
        title: "Run protect",
        detail: "myonlinepdfeditor.com encrypts locally.",
      },
      {
        title: "Download encrypted PDF",
        detail: "Send password separately.",
      },
    ],
    howToExport: [
      "Download password-protected .pdf.",
      "Test open in another viewer with the password once.",
      "Transmit password via phone or secure chat, not same email.",
    ],
    whyBest: [
      "Browser encryption without desktop Acrobat.",
      "Free basic protection.",
      "Honest scope: open password, not DRM warehouse.",
      "Pairs with Share via Link after encrypting.",
    ],
    tidbits: [
      "Password loss means data loss—store in a vault.",
      "Some viewers choke on AES variants—test recipient environment.",
      "Re-encrypt after flattening filled forms.",
    ],
    faqs: [
      {
        question: "Owner vs user password?",
        answer:
          "myonlinepdfeditor.com focuses on open passwords; printing restrictions may be limited—verify UI.",
      },
      {
        question: "Is encryption secure?",
        answer:
          "AES PDF encryption is industry standard; strength also depends on password quality.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Upload file for encryption?",
        answer: "Encryption runs in your browser on the file you selected.",
      },
      {
        question: "Forgot password?",
        answer: "Cannot recover; keep unencrypted backup securely.",
      },
    ],
  },
  {
    slug: "readable-pdf",
    headline: "Extract plain text from PDF pages for reading and reuse.",
    whatItIs:
      "Readable PDF pulls text content out of your PDF so you can copy, search offline, or feed summaries. Processing uses local extraction rather than sending the PDF to a cloud OCR farm.",
    whyUse: [
      "You need quotes for a brief.",
      "Accessibility workflows want text to reflow.",
      "You pipe content into spreadsheets manually.",
      "You check whether a scan is actually searchable.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Open Readable PDF.",
      },
      {
        title: "Extract",
        detail: "Run extraction per page or whole doc.",
      },
      {
        title: "Scan output",
        detail: "Look for missing columns or gibberish.",
      },
      {
        title: "Copy text",
        detail: "Use clipboard for downstream apps.",
      },
      {
        title: "Optional download text",
        detail: "Save .txt if the UI offers it.",
      },
    ],
    howToExport: [
      "Copy extracted text or download .txt when available.",
      "Original PDF still downloads via Download PDF tool.",
      "Convert text export to PDF again with Text to PDF if needed.",
    ],
    whyBest: [
      "Quick text access without paid OCR subscriptions for born-digital PDFs.",
      "Private extraction session.",
      "Free utility.",
      "Feeds AI tools that need clean text.",
    ],
    tidbits: [
      "Pure image scans need OCR elsewhere first.",
      "Footers and headers may duplicate in extraction.",
      "Two-column journals extract poorly—split columns manually.",
    ],
    faqs: [
      {
        question: "OCR for scans?",
        answer:
          "Readable PDF reads embedded text; scanned pages without text layers stay image-only.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Formatting kept?",
        answer: "Plain text loses bold and tables.",
      },
      {
        question: "Upload?",
        answer: "Extraction is in-browser.",
      },
      {
        question: "Languages?",
        answer: "Unicode text generally extracts when embedded.",
      },
    ],
  },
  {
    slug: "search-for-pdf",
    headline: "Find keywords inside a PDF using local text search.",
    whatItIs:
      "Search for PDF indexes extracted text and shows page snippets where your term appears. Jump to matches without uploading the document to a remote search index.",
    whyUse: [
      "You hunt a clause in a 300-page lease.",
      "Support looks up error codes in manuals.",
      "Auditors sample occurrences of account numbers.",
      "Students find citations quickly.",
    ],
    howToUse: [
      {
        title: "Load PDF",
        detail: "Open Search for PDF.",
      },
      {
        title: "Enter keyword",
        detail: "Try exact phrases in quotes mentally.",
      },
      {
        title: "Review hits",
        detail: "Scan snippet list per page.",
      },
      {
        title: "Open page",
        detail: "Navigate viewer to confirm context.",
      },
      {
        title: "Repeat terms",
        detail: "Search synonyms if first pass fails.",
      },
    ],
    howToExport: [
      "Search does not export hits—note page numbers manually.",
      "Download PDF unchanged via Download PDF.",
      "Split PDF if you isolate relevant ranges.",
    ],
    whyBest: [
      "Faster than eyeballing when text layer exists.",
      "Keeps files local.",
      "Free finder.",
      "Complements Ask Document for exploratory questions.",
    ],
    tidbits: [
      "Case sensitivity depends on UI toggle.",
      "Hyphenation across lines may split matches.",
      "Scanned docs need OCR for useful hits.",
    ],
    faqs: [
      {
        question: "Regex support?",
        answer: "Typically literal search—check tool UI.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Multiple PDFs?",
        answer: "One file per search session.",
      },
      {
        question: "Highlight export?",
        answer: "Use Add Comments to mark found passages manually.",
      },
      {
        question: "Privacy?",
        answer: "Index built locally in session.",
      },
    ],
  },
  {
    slug: "export-pdf",
    headline: "Export a clean local copy of your PDF for sharing or archival.",
    whatItIs:
      "Export re-saves your PDF in the browser, optionally applying light optimization so the file travels well between apps. Use it after edits as a deliberate save boundary.",
    whyUse: [
      "You want a fresh file hash after many edits.",
      "Downstream systems reject your working copy metadata.",
      "You archive an export snapshot monthly.",
      "You strip experimental layers before external send.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Open Export.",
      },
      {
        title: "Choose export options",
        detail: "Pick defaults the UI exposes.",
      },
      {
        title: "Preview size",
        detail: "Note file weight if email-bound.",
      },
      {
        title: "Run export",
        detail: "Local rewrite completes.",
      },
      {
        title: "Download",
        detail: "Save exported copy.",
      },
    ],
    howToExport: [
      "Click Download for exported .pdf.",
      "Compare file size to original if optimization ran.",
      "Password-protect next if sharing externally.",
    ],
    whyBest: [
      "Explicit save point in workflows.",
      "No account needed.",
      "Browser-local rewrite.",
      "Gateway to Share via Link uploads.",
    ],
    tidbits: [
      "Export is not the same as Print to PDF—this preserves PDF structure.",
      "Rename exports with ISO dates.",
      "Verify digital signatures survive if present—re-sign if broken.",
    ],
    faqs: [
      {
        question: "Compress heavily?",
        answer:
          "Light optimization only; dedicated compress tools may exist elsewhere.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Batch?",
        answer: "One file per run typically.",
      },
      {
        question: "Upload?",
        answer: "Export processes locally.",
      },
      {
        question: "Format?",
        answer: "PDF output.",
      },
    ],
  },
  {
    slug: "download-pdf",
    headline: "Save a PDF from your myonlinepdfeditor.com session to your device.",
    whatItIs:
      "Download gives you an explicit save action after editing, converting, or viewing so the file lands in your downloads folder with the state you expect.",
    whyUse: [
      "You finished edits and need a disk copy.",
      "Browser tab refresh would lose unsaved work.",
      "You want a file path for email attach.",
      "You backup before destructive flatten.",
    ],
    howToUse: [
      {
        title: "Open PDF in myonlinepdfeditor.com",
        detail: "Any tool that loads a document.",
      },
      {
        title: "Apply changes",
        detail: "Edit, sign, or convert as needed.",
      },
      {
        title: "Click Download",
        detail: "Use the Download control in the toolbar.",
      },
      {
        title: "Confirm browser save",
        detail: "Allow download if prompted.",
      },
      {
        title: "Locate file",
        detail: "Open Downloads folder or picker path.",
      },
    ],
    howToExport: [
      "Download yields .pdf on disk.",
      "Rename immediately if browsers append (1).",
      "Upload elsewhere from your file manager.",
    ],
    whyBest: [
      "Clear user control of file custody.",
      "Works across all myonlinepdfeditor.com engines.",
      "Free and instant.",
      "No forced cloud inbox.",
    ],
    tidbits: [
      "Blocked downloads happen in strict corporate browsers—allow myonlinepdfeditor.com origin.",
      "Mobile may save to Files app.",
      "Download again after each material edit.",
    ],
    faqs: [
      {
        question: "Where is the file?",
        answer:
          "Your browser's default Downloads location unless you pick another folder.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Same as Export PDF?",
        answer:
          "Download saves current state; Export may rewrite or optimize first.",
      },
      {
        question: "Auto-download?",
        answer: "You click Download; some converters trigger it after processing.",
      },
      {
        question: "Format?",
        answer: "PDF.",
      },
    ],
  },
  {
    slug: "print-out",
    headline: "Open your system print dialog to print or Save as PDF.",
    whatItIs:
      "Print Out loads your PDF and invokes the browser print dialog so you can send pages to a printer or use the OS virtual PDF printer for another copy.",
    whyUse: [
      "You need paper copies for a hearing binder.",
      "You prefer OS print scaling controls.",
      "You use Save as PDF on Mac for a quick duplicate.",
      "Kiosk stations lack download permissions but allow print.",
    ],
    howToUse: [
      {
        title: "Upload PDF",
        detail: "Open Print Out.",
      },
      {
        title: "Click Print",
        detail: "myonlinepdfeditor.com opens the browser print UI.",
      },
      {
        title: "Select printer",
        detail: "Physical printer or Save as PDF.",
      },
      {
        title: "Set range",
        detail: "All pages or custom in print dialog.",
      },
      {
        title: "Print or save",
        detail: "Complete in the OS dialog.",
      },
    ],
    howToExport: [
      "Physical output is paper; virtual printer yields a new PDF from your OS.",
      "myonlinepdfeditor.com Download still recommended for primary digital archival.",
      "Scan prints back through JPG to PDF if needed.",
    ],
    whyBest: [
      "Uses familiar OS print controls.",
      "Free print path.",
      "No extra driver beyond browser print.",
      "Works when download policies are tight but print is allowed.",
    ],
    tidbits: [
      "Browser print may rasterize—check quality on drafts.",
      "Duplex saves paper on long contracts.",
      "Margins differ by printer—preview first.",
    ],
    faqs: [
      {
        question: "Print from mobile?",
        answer:
          "Mobile browsers support AirPrint or system print when available.",
      },
      {
        question: "Free?",
        answer: "Yes.",
      },
      {
        question: "Color?",
        answer: "Depends on printer settings in the dialog.",
      },
      {
        question: "myonlinepdfeditor.com see what I print?",
        answer: "Print goes through your OS; myonlinepdfeditor.com opens the dialog only.",
      },
      {
        question: "Password PDFs?",
        answer: "Unlock in myonlinepdfeditor.com before printing.",
      },
    ],
  },
  {
    slug: "excel-to-pdf",
    headline: "Convert Excel (.xlsx) spreadsheets into PDF tables in your browser.",
    whatItIs:
      "Excel to PDF reads your workbook locally and renders sheet data into a fixed PDF layout for sharing and printing. Formulas become displayed values so recipients see the same numbers you reviewed on screen.",
    whyUse: [
      "Finance or ops teams need a frozen PDF snapshot of a live workbook.",
      "A portal accepts PDF but not spreadsheet uploads.",
      "You want print-friendly tables without mailing the editable .xlsx.",
      "Sensitive revenue numbers should stay on-device during conversion.",
    ],
    howToUse: [
      { title: "Open Excel to PDF", detail: "Choose the tool from myonlinepdfeditor.com Convert." },
      { title: "Upload .xlsx", detail: "Select a modern Excel workbook; save legacy .xls as .xlsx first." },
      { title: "Pick sheets", detail: "Confirm which worksheets appear when multiple tabs exist." },
      { title: "Preview tables", detail: "Scroll the PDF preview for wide columns and page breaks." },
      { title: "Download", detail: "Save the PDF or open Compress PDF if the file is large." },
    ],
    howToExport: [
      "Click Download for a standard .pdf file.",
      "Rename with date or version before emailing.",
      "Use Set PDF Password if the export contains confidential figures.",
    ],
    whyBest: [
      "Spreadsheet conversion runs in the browser without a cloud upload step.",
      "Free competitor-style Excel→PDF alongside Word and CSV converters.",
      "Chains into Merge PDF for multi-report packets.",
      "Works on machines that do not have Excel installed.",
    ],
    tidbits: [
      "Very wide sheets may shrink type or split across pages—spot-check the preview.",
      "Charts and images export when present; complex pivot layouts may simplify.",
      "Macros and external links are not executed during PDF export.",
    ],
    faqs: [
      { question: "Is Excel to PDF free on myonlinepdfeditor.com?", answer: "Yes. Like other converters, it is free to use in the browser." },
      { question: "Can I convert .xls files?", answer: "Save legacy .xls as .xlsx in Excel or LibreOffice, then convert here." },
      { question: "Are formulas preserved?", answer: "The PDF shows calculated values and formatting, not live Excel formulas." },
      { question: "Does myonlinepdfeditor.com upload my workbook?", answer: "Conversion is designed to run locally in your session." },
      { question: "Multiple sheets?", answer: "You can include more than one worksheet when the tool offers sheet selection." },
      { question: "What do I download?", answer: "A PDF file you save with the Download button." },
    ],
  },
  {
    slug: "webp-to-pdf",
    headline: "Turn WebP images into a PDF without uploading them to a server.",
    whatItIs:
      "WebP to PDF places modern WebP graphics on PDF pages you can email, print, or merge. Stack several WebP files in order for design assets and web exports.",
    whyUse: [
      "CDN or export pipelines deliver WebP but your client wants PDF.",
      "You saved compressed WebP screenshots and need one attachment.",
      "Archival policies prefer PDF over assorted image formats.",
      "You want local processing for branded marketing assets.",
    ],
    howToUse: [
      { title: "Open WebP to PDF", detail: "Start from Convert tools." },
      { title: "Add WebP files", detail: "Multi-select when you have a batch." },
      { title: "Reorder", detail: "Drag thumbnails into presentation order." },
      { title: "Build", detail: "Wait for local page assembly." },
      { title: "Download", detail: "Save the combined PDF." },
    ],
    howToExport: [
      "Download produces one .pdf with a page per image.",
      "Merge with other PDFs via Merge PDF if needed.",
      "Compress PDF if the packet is oversized for email.",
    ],
    whyBest: [
      "Covers a format many older converters skip.",
      "Multi-file support with reorder.",
      "Browser-local assembly.",
      "Pairs with Images to PDF for mixed-format batches.",
    ],
    tidbits: [
      "Animated WebP may export as a still frame depending on viewer support.",
      "Large WebP assets still produce large PDFs.",
      "For photos only, JPG to PDF can yield smaller files.",
    ],
    faqs: [
      { question: "Multiple WebP files?", answer: "Yes—enable multi-select and arrange order before download." },
      { question: "Free?", answer: "Yes." },
      { question: "Transparency?", answer: "WebP alpha is embedded on the PDF page where supported." },
      { question: "Uploaded to cloud?", answer: "Processing is local in the browser." },
      { question: "Output format?", answer: "Standard PDF via Download." },
      { question: "Mix with PNG?", answer: "Use Images to PDF for mixed image types in one job." },
    ],
  },
  {
    slug: "gif-to-pdf",
    headline: "Convert GIF images into a printable PDF document.",
    whatItIs:
      "GIF to PDF wraps still GIF frames or graphics into PDF pages. Useful when a site or export only gives you GIF but your process needs PDF.",
    whyUse: [
      "Legacy GIF scans need a single PDF for filing.",
      "Email policies block GIF attachments but accept PDF.",
      "You want to print GIF-based diagrams with consistent margins.",
      "You batch icon or sticker GIFs into one portfolio PDF.",
    ],
    howToUse: [
      { title: "Launch GIF to PDF", detail: "Pick the converter from the catalog." },
      { title: "Upload GIFs", detail: "Add one or more .gif files." },
      { title: "Order pages", detail: "Arrange thumbnails if you uploaded several." },
      { title: "Generate", detail: "myonlinepdfeditor.com builds pages locally." },
      { title: "Save", detail: "Download the PDF." },
    ],
    howToExport: [
      "Use Download for the finished .pdf.",
      "Run Grayscale PDF before printing long GIF-heavy packets.",
      "Watermark PDF if the GIFs are draft assets.",
    ],
    whyBest: [
      "Matches iLovePDF-style image coverage including GIF.",
      "No account required.",
      "Works alongside PNG and WebP converters.",
      "Local browser processing.",
    ],
    tidbits: [
      "Animated GIF may show as a single frame in PDF—confirm in preview.",
      "Limited palettes can look soft when blown up to full page.",
      "Prefer PNG to PDF for crisp line art when you have a choice.",
    ],
    faqs: [
      { question: "Does animation play in PDF?", answer: "PDF pages are static; animation is not preserved in most viewers." },
      { question: "Multiple GIFs?", answer: "Yes with multi-file mode and reorder." },
      { question: "Free?", answer: "Yes." },
      { question: "File size?", answer: "Large GIFs inflate PDF size; Compress PDF may help afterward." },
      { question: "Privacy?", answer: "Images are processed in your browser session." },
      { question: "What do I get?", answer: "A downloadable PDF." },
    ],
  },
  {
    slug: "bmp-to-pdf",
    headline: "Convert BMP bitmap images into PDF pages locally.",
    whatItIs:
      "BMP to PDF turns uncompressed or legacy bitmaps into a portable PDF. Combine several BMP scans into one ordered file for printing or upload.",
    whyUse: [
      "Older scanners saved BMP and you need PDF for modern portals.",
      "Windows clipboard exports landed as BMP.",
      "You inherited bitmap assets that must become one packet.",
      "You want local conversion without desktop Paint workflows.",
    ],
    howToUse: [
      { title: "Open BMP to PDF", detail: "Select from Convert tools." },
      { title: "Add BMP files", detail: "Multi-select batches from a folder." },
      { title: "Reorder", detail: "Drag pages into sequence." },
      { title: "Build PDF", detail: "Wait for local rendering." },
      { title: "Download", detail: "Save the output." },
    ],
    howToExport: [
      "Download the merged .pdf.",
      "Follow with Compress PDF—BMP sources are often huge.",
      "Crop PDF if scanner borders remain visible.",
    ],
    whyBest: [
      "Handles a format many online converters omit.",
      "Multi-image merge in one pass.",
      "Free and browser-based.",
      "Natural follow-up to Grayscale or Compress tools.",
    ],
    tidbits: [
      "BMP files are often large; expect heavy PDFs until you compress.",
      "16-bit BMP may need a quick visual check after export.",
      "Converting to JPG first can shrink output if quality allows.",
    ],
    faqs: [
      { question: "Why is my BMP PDF so big?", answer: "BMP is rarely compressed; use Compress PDF after conversion." },
      { question: "Several BMPs at once?", answer: "Yes—multi-file with reorder." },
      { question: "Free?", answer: "Yes." },
      { question: "Color depth?", answer: "Most standard BMP depths render; verify color-critical assets in preview." },
      { question: "Cloud upload?", answer: "Designed for local browser processing." },
      { question: "Output?", answer: "Standard PDF download." },
    ],
  },
  {
    slug: "images-to-pdf",
    headline: "Merge mixed image formats into one PDF in the order you choose.",
    whatItIs:
      "Images to PDF is the generic image combiner: PNG, JPG, WebP, GIF, BMP, and other supported types become pages in a single PDF. Drag to reorder before export.",
    whyUse: [
      "A scan batch arrived as mixed formats from different apps.",
      "You do not want to run five separate single-format converters.",
      "Photo evidence folders need one attachment for insurance or HR.",
      "You are matching competitor catalogs that offer a catch-all Images→PDF tool.",
    ],
    howToUse: [
      { title: "Open Images to PDF", detail: "Use multi-file upload from the catalog." },
      { title: "Add images", detail: "Select any supported image types together." },
      { title: "Reorder", detail: "Drag thumbnails to fix narrative order." },
      { title: "Preview", detail: "Check rotation—use Rotate PDF afterward if needed." },
      { title: "Download", detail: "Save the unified PDF." },
    ],
    howToExport: [
      "Click Download for one combined .pdf.",
      "Use Merge PDF to append an existing PDF report.",
      "Compress PDF when the mixed batch is email-sized.",
    ],
    whyBest: [
      "One workflow for heterogeneous image folders.",
      "Local multi-file assembly.",
      "Free with reorder control.",
      "Complements format-specific converters when you know the source type.",
    ],
    tidbits: [
      "Mixing huge BMP with small PNG yields uneven page weights—compress if needed.",
      "EXIF orientation may differ by format; rotate before sharing.",
      "For a single known format, dedicated converters may expose tighter accept filters.",
    ],
    faqs: [
      { question: "Which image types work?", answer: "Common web and scan formats such as PNG, JPEG, WebP, GIF, and BMP." },
      { question: "How many images?", answer: "Limited by browser memory; dozens of normal photos are typical." },
      { question: "Free?", answer: "Yes." },
      { question: "Order matters?", answer: "Yes—reorder thumbnails before generating." },
      { question: "Uploaded to servers?", answer: "Assembly is intended to stay in your browser." },
      { question: "What downloads?", answer: "One PDF containing each image as a page." },
    ],
  },
  {
    slug: "compress-pdf",
    headline: "Shrink PDF file size for email and portal uploads.",
    whatItIs:
      "Compress PDF reduces stream and image payload so heavy scans fit attachment limits. You choose how aggressively to trade quality for bytes—all in the browser.",
    whyUse: [
      "Gmail or Outlook rejected your 25 MB scan packet.",
      "Court e-filing caps page weight or total megabytes.",
      "You need a lighter copy for mobile reviewers.",
      "You want Smallpdf-style compression without leaving myonlinepdfeditor.com.",
    ],
    howToUse: [
      { title: "Open Compress PDF", detail: "From Edit & Annotate tools." },
      { title: "Upload PDF", detail: "Load the oversized document." },
      { title: "Choose profile", detail: "Pick balanced or high compression when offered." },
      { title: "Compare size", detail: "Note before/after megabytes in the UI." },
      { title: "Download", detail: "Save the smaller PDF." },
    ],
    howToExport: [
      "Download the compressed .pdf.",
      "Keep the original uncompressed copy for archival if quality dropped.",
      "Share via Email once size fits your provider limit.",
    ],
    whyBest: [
      "Local compression without mandatory cloud queues.",
      "Pairs with scan workflows from Images to PDF.",
      "Free tier competitive with major PDF brands.",
      "Run again with a lighter profile if still too large.",
    ],
    tidbits: [
      "Text-only PDFs may barely shrink—gains come from image-heavy pages.",
      "Double compression can look muddy—prefer one thoughtful pass.",
      "Password-protected inputs need Unlock PDF first.",
    ],
    faqs: [
      { question: "How much smaller will it get?", answer: "Depends on images; photo scans often drop dramatically, text PDFs modestly." },
      { question: "Is quality loss visible?", answer: "Higher compression can soften photos—preview before sending." },
      { question: "Free?", answer: "Yes." },
      { question: "Encrypted PDFs?", answer: "Unlock with the password in Unlock PDF, then compress." },
      { question: "Processing location?", answer: "Runs locally in your browser session." },
      { question: "Output format?", answer: "Still a standard PDF download." },
    ],
  },
  {
    slug: "page-numbers",
    headline: "Add consistent page numbers to PDF headers or footers.",
    whatItIs:
      "Add Page Numbers stamps your chosen format—Arabic numerals, start value, and position—across the document. Essential for briefs, manuals, and paginated filings.",
    whyUse: [
      "Court rules require bottom-center numbering starting at page two.",
      "Board packets merged from Word and scans lack unified numbers.",
      "Printed SOP binders need visible page indices.",
      "You merged PDFs and references must stay traceable.",
    ],
    howToUse: [
      { title: "Open Page Numbers", detail: "Select the tool under Edit & Annotate." },
      { title: "Upload PDF", detail: "Load the document to number." },
      { title: "Style placement", detail: "Pick corner or center and starting page number." },
      { title: "Preview", detail: "Scroll first and last pages to confirm sequence." },
      { title: "Apply", detail: "Export the numbered PDF." },
    ],
    howToExport: [
      "Download the updated .pdf.",
      "Print via Print Out for physical binders.",
      "Flatten if viewers show duplicate interactive layers.",
    ],
    whyBest: [
      "Dedicated numbering without a full desktop publisher.",
      "Local apply—no watermark from third-party queues.",
      "Works after Merge PDF or Organize PDF.",
      "Matches competitor footer tool coverage.",
    ],
    tidbits: [
      "Roman numerals for front matter may need a manual start offset.",
      "Landscape pages may need different margin positions—check corners.",
      "Append a cover after numbering if the cover should stay unnumbered.",
    ],
    faqs: [
      { question: "Can I start at page ii or 0?", answer: "Set the starting number in the tool options before apply." },
      { question: "Skip the first page?", answer: "Use range controls when available or add the cover after numbering." },
      { question: "Free?", answer: "Yes." },
      { question: "Overwrite existing numbers?", answer: "New stamps overlay; use Crop PDF or edit if old numbers clash." },
      { question: "Scanned PDFs?", answer: "Numbers add on top of image pages like any other PDF." },
      { question: "Download type?", answer: "Standard PDF with embedded page number marks." },
    ],
  },
  {
    slug: "watermark-pdf",
    headline: "Stamp text or image watermarks across PDF pages.",
    whatItIs:
      "Watermark PDF overlays CONFIDENTIAL, DRAFT, or your logo with adjustable opacity on every page. Control text angle, size, and repeat so reviewers know the copy is not final.",
    whyUse: [
      "Legal sends draft contracts that must not be mistaken for execution copies.",
      "Marketing shares previews before public launch.",
      "HR distributes internal policies marked SAMPLE.",
      "You need PDF24/iLovePDF-style branding without another account.",
    ],
    howToUse: [
      { title: "Open Watermark PDF", detail: "Under Edit & Annotate." },
      { title: "Upload file", detail: "Load the PDF to mark." },
      { title: "Configure watermark", detail: "Enter text or image and set opacity." },
      { title: "Preview pages", detail: "Check readability on dark and light backgrounds." },
      { title: "Export", detail: "Download the watermarked PDF." },
    ],
    howToExport: [
      "Save the watermarked .pdf locally.",
      "Combine with Set PDF Password for dual protection.",
      "Flatten if recipients should not move the watermark layer.",
    ],
    whyBest: [
      "Fast draft labeling in-browser.",
      "No per-document fee for basic text marks.",
      "Works on merged scan packets.",
      "Complements Certify PDF for final vs draft signaling.",
    ],
    tidbits: [
      "Heavy opacity can obscure fine print—keep drafts readable.",
      "Image logos need sufficient resolution or they look soft.",
      "Watermarks are not cryptographic security—pair with passwords when needed.",
    ],
    faqs: [
      { question: "Text and image watermarks?", answer: "Both are supported when the workspace offers them." },
      { question: "Every page?", answer: "Default applies across the document; check per-page overrides if available." },
      { question: "Free?", answer: "Yes for standard marking." },
      { question: "Can recipients remove it?", answer: "Motivated editors may; use flatten and legal process for true control." },
      { question: "Diagonal DRAFT?", answer: "Angle and position depend on tool settings—preview before send." },
      { question: "Output?", answer: "Downloadable PDF with visible watermark." },
    ],
  },
  {
    slug: "crop-pdf",
    headline: "Trim scanner margins and crop PDF pages to content.",
    whatItIs:
      "Crop PDF removes excess white borders or scanner bed edges so content fills the page box. Apply uniform crops or adjust per page for mixed scan batches.",
    whyUse: [
      "Flatbed scans include black borders that waste toner.",
      "Mobile captures need margin cleanup before filing.",
      "You want uniform appearance across a merged exhibit set.",
      "Competitors list crop as standard—myonlinepdfeditor.com matches the catalog.",
    ],
    howToUse: [
      { title: "Launch Crop PDF", detail: "Open from Edit tools." },
      { title: "Upload PDF", detail: "Load the scan or export." },
      { title: "Set crop box", detail: "Drag handles on thumbnails or enter margin values." },
      { title: "Apply to range", detail: "Crop all pages or only selected ones." },
      { title: "Download", detail: "Save the tighter PDF." },
    ],
    howToExport: [
      "Download cropped .pdf.",
      "Follow with Compress PDF if images remain large.",
      "Merge into a larger packet after cropping individuals.",
    ],
    whyBest: [
      "Fixes scans without rescanning hardware.",
      "Local crop preview.",
      "Free page-box adjustment.",
      "Pairs with Organize PDF for full cleanup workflows.",
    ],
    tidbits: [
      "Over-cropping can clip signatures—leave margin on legal lines.",
      "Crop changes media box, not OCR text position on image scans.",
      "Mixed page sizes after crop may need Organize PDF review.",
    ],
    faqs: [
      { question: "Crop one page only?", answer: "Select specific pages when the UI supports page ranges." },
      { question: "Undo?", answer: "Keep the original file; export creates a new download." },
      { question: "Free?", answer: "Yes." },
      { question: "Text PDFs?", answer: "Crop adjusts the page box; reflowable text layouts may clip if set too tight." },
      { question: "Rotation first?", answer: "Rotate PDF before crop when scans are sideways." },
      { question: "What downloads?", answer: "PDF with updated page dimensions." },
    ],
  },
  {
    slug: "extract-pages",
    headline: "Pull selected pages into a new PDF without rescanning.",
    whatItIs:
      "Extract Pages copies only the page numbers you highlight into a fresh PDF download. Faster than Split PDF when you need a single contiguous excerpt.",
    whyUse: [
      "You need exhibits E–G without the rest of the contract.",
      "A form was appended as pages 8–10 of a longer scan.",
      "Counsel asked for signature pages only.",
      "You want iLovePDF-style extract without emailing the full file.", 
    ],
    howToUse: [
      { title: "Open Extract Pages", detail: "Under Edit & Annotate." },
      { title: "Upload PDF", detail: "Load the source document." },
      { title: "Select pages", detail: "Click thumbnails or type ranges." },
      { title: "Extract", detail: "Build the subset locally." },
      { title: "Download", detail: "Save the new smaller PDF." },
    ],
    howToExport: [
      "Download the extracted .pdf.",
      "Merge with other exhibits via Merge PDF.",
      "Add page numbers if the excerpt must stay ordered in a binder.",
    ],
    whyBest: [
      "Source file stays intact on disk.",
      "Local selection—no server-side full upload requirement for the workflow.",
      "Distinct from Split PDF when you want one output file only.",
      "Free and quick for paralegal tasks.",
    ],
    tidbits: [
      "Non-contiguous picks may still produce one PDF with pages in selection order.",
      "Password PDFs need Unlock PDF first.",
      "Extracted image scans keep original resolution.",
    ],
    faqs: [
      { question: "Extract vs Split?", answer: "Extract emphasizes one new PDF from picks; Split also handles per-page zip exports." },
      { question: "Non-consecutive pages?", answer: "Usually supported—confirm order in preview." },
      { question: "Free?", answer: "Yes." },
      { question: "Original changes?", answer: "No—the source file on your machine is untouched." },
      { question: "Forms and fields?", answer: "Interactive fields travel with extracted pages when present." },
      { question: "Output?", answer: "A new PDF download." },
    ],
  },
  {
    slug: "organize-pdf",
    headline: "Reorder, delete, and tidy PDF pages in one organizer view.",
    whatItIs:
      "Organize PDF is the page sorter hub: drag thumbnails, drop unwanted sheets, and export a clean packet. It wraps delete and reorder flows competitors surface as Organize.",
    whyUse: [
      "Merged scans arrived out of order.",
      "Blank separator pages snuck in from the copier.",
      "You want one screen instead of hopping between delete and reorder tools.",
      "Mobile users need a simple thumb-friendly sorter.",
    ],
    howToUse: [
      { title: "Open Organize PDF", detail: "From Edit & Annotate." },
      { title: "Upload PDF", detail: "Load the packet to fix." },
      { title: "Drag pages", detail: "Move thumbnails into final order." },
      { title: "Delete junk", detail: "Remove blanks or duplicates." },
      { title: "Export", detail: "Download the organized PDF." },
    ],
    howToExport: [
      "Download the reorganized .pdf.",
      "Run Page Numbers if pagination changed.",
      "Sign PDF after order is final.",
    ],
    whyBest: [
      "Single competitor-matching Organize entry in the catalog.",
      "Uses the same local reorder engine as Reorder Pages with delete affordances.",
      "Free browser workflow.",
      "Ideal prelude to Merge PDF or Send for Signature.",
    ],
    tidbits: [
      "Large documents with hundreds of pages need patience in thumbnail view.",
      "Rotated pages can be fixed in Rotate PDF after organize.",
      "Save a backup before aggressive deletes.",
    ],
    faqs: [
      { question: "Different from Reorder Pages?", answer: "Organize PDF emphasizes combined sort-and-delete; both use local reorder logic." },
      { question: "Undo deletes?", answer: "Re-upload the original if you did not keep a copy." },
      { question: "Free?", answer: "Yes." },
      { question: "Multi-file?", answer: "Typically one PDF at a time—merge sources first if needed." },
      { question: "Bookmarks?", answer: "Heavy reorder may disturb outlines—check in your viewer." },
      { question: "Download?", answer: "One updated PDF file." },
    ],
  },
  {
    slug: "repair-pdf",
    headline: "Try to fix corrupted or broken PDF files locally.",
    whatItIs:
      "Repair PDF rewrites damaged streams and cross-references so files that fail to open may become readable again. Success depends on how severely the file is truncated.",
    whyUse: [
      "A download ended mid-transfer and Acrobat errors on open.",
      "Email scanners produced a glitched attachment.",
      "You need PDF24-style repair before court filing.",
      "You want one more attempt before re-requesting the source.",
    ],
    howToUse: [
      { title: "Open Repair PDF", detail: "Under Edit tools." },
      { title: "Upload damaged PDF", detail: "Select the file that will not open." },
      { title: "Run repair", detail: "Wait for local rebuild pass." },
      { title: "Open preview", detail: "Confirm pages render." },
      { title: "Download", detail: "Save the repaired copy." },
    ],
    howToExport: [
      "Download repaired .pdf separately from the broken original.",
      "Merge or split only after the file opens reliably.",
      "Keep the corrupt file for IT forensics if needed.",
    ],
    whyBest: [
      "No shipping damaged contracts to unknown servers.",
      "Catalog parity with major repair utilities.",
      "Free attempt before paid desktop tools.",
      "Chains into Extract Pages once readable.",
    ],
    tidbits: [
      "Repair cannot recreate missing bytes from a 0 KB file.",
      "Scanned PDFs repair differently than pure text PDFs.",
      "Try downloading the file again from the source if repair fails.",
    ],
    faqs: [
      { question: "Always works?", answer: "No—severe truncation may be irreversible without a fresh source." },
      { question: "Is content uploaded?", answer: "Repair is designed to run in your browser." },
      { question: "Free?", answer: "Yes." },
      { question: "Password files?", answer: "Unlock first if encryption blocks parsing." },
      { question: "Metadata preserved?", answer: "Repair focuses on structure; metadata may reset." },
      { question: "Output?", answer: "A new PDF download if repair succeeds." },
    ],
  },
  {
    slug: "grayscale-pdf",
    headline: "Convert color PDF pages to grayscale for print and filing.",
    whatItIs:
      "Grayscale PDF removes color information from pages—especially scans and photos—so output uses black toner only and meets rules that ban color exhibits.",
    whyUse: [
      "Court or agency filings require black-and-white copies.",
      "You want cheaper office printing on a long handbook.",
      "Color scans of pencil notes look fine in gray.",
      "You match competitor grayscale utilities in one click.",
    ],
    howToUse: [
      { title: "Open Grayscale PDF", detail: "From Edit & Annotate." },
      { title: "Upload PDF", detail: "Load the color document." },
      { title: "Apply gray", detail: "Process all pages locally." },
      { title: "Preview", detail: "Ensure charts remain legible." },
      { title: "Download", detail: "Save the grayscale PDF." },
    ],
    howToExport: [
      "Download the gray .pdf.",
      "Compress afterward if bit depth still feels heavy.",
      "Print Out for physical copies.",
    ],
    whyBest: [
      "One-step toner savings.",
      "Local processing for confidential color scans.",
      "Free.",
      "Works on image-heavy PDFs from Images to PDF.",
    ],
    tidbits: [
      "Color-coded charts may lose meaning—check legends.",
      "Grayscale is not the same as true black-and-white threshold.",
      "Re-run from the color original if contrast is too weak.",
    ],
    faqs: [
      { question: "Select pages?", answer: "Use page ranges when the workspace supports them." },
      { question: "Free?", answer: "Yes." },
      { question: "Text-only PDFs?", answer: "Already monochrome—little change expected." },
      { question: "Reversible?", answer: "Keep the color source; grayscale export is destructive." },
      { question: "Print savings?", answer: "Most color laser jobs charge more per page—gray helps on capable printers." },
      { question: "Output format?", answer: "Standard PDF download." },
    ],
  },
  {
    slug: "remove-metadata",
    headline: "Strip author, title, and hidden PDF metadata before sharing.",
    whatItIs:
      "Remove Metadata clears XMP and document info fields—author, title, creator tool, and similar properties—so published PDFs leak less identifying data.",
    whyUse: [
      "FOIA or public release requires redacted properties.",
      "You do not want client names in Author when sending externally.",
      "Competitors advertise metadata scrubbing for privacy hygiene.",
      "You sanitize before uploading to a third-party viewer.",
    ],
    howToUse: [
      { title: "Open Remove Metadata", detail: "Edit & Annotate category." },
      { title: "Upload PDF", detail: "Choose the file to sanitize." },
      { title: "Review fields", detail: "See which properties will be cleared." },
      { title: "Strip", detail: "Run the local scrub pass." },
      { title: "Download", detail: "Save the cleaned PDF." },
    ],
    howToExport: [
      "Download sanitized .pdf.",
      "Verify in a desktop inspector that fields are empty.",
      "Set PDF Password after scrub if content still needs protection.",
    ],
    whyBest: [
      "Privacy step without manual Acrobat Pro dialogs.",
      "Browser-local scrub.",
      "Free.",
      "Pairs with Watermark PDF for public drafts.",
    ],
    tidbits: [
      "Visible on-page author names are not metadata—they need editing or redaction.",
      "Some viewers re-add metadata on save—distribute the myonlinepdfeditor.com export.",
      "Embedded attachments may carry their own metadata.",
    ],
    faqs: [
      { question: "What metadata is removed?", answer: "Standard document info and common XMP fields the tool targets—confirm in preview." },
      { question: "Remove passwords?", answer: "No—metadata scrub is separate from Unlock PDF." },
      { question: "Free?", answer: "Yes." },
      { question: "Legal guarantee?", answer: "Inspect the output; highly regulated releases may need specialist review." },
      { question: "Content unchanged?", answer: "Page visuals stay; properties change." },
      { question: "Output?", answer: "Downloadable PDF." },
    ],
  },
  {
    slug: "pdf-to-jpg",
    headline: "Export PDF pages as JPEG images in your browser.",
    whatItIs:
      "PDF to JPG rasterizes each page to a .jpg file you can drop into slides, websites, or chat apps that reject PDF. Pick all pages or a subset.",
    whyUse: [
      "Social or CMS uploads need JPG not PDF.",
      "You want thumbnails of each page for a review deck.",
      "A legacy system only accepts JPEG exhibits.",
      "You need competitor coverage for PDF→image export.",
    ],
    howToUse: [
      { title: "Open PDF to JPG", detail: "Convert tools section." },
      { title: "Upload PDF", detail: "Load the source document." },
      { title: "Choose pages", detail: "Export all or specify range." },
      { title: "Set quality", detail: "Balance sharpness and size when options exist." },
      { title: "Download", detail: "Get JPG files or a ZIP bundle." },
    ],
    howToExport: [
      "Save individual .jpg files or the provided archive.",
      "Recombine later with JPG to PDF if needed.",
      "Compress images externally only if size still matters.",
    ],
    whyBest: [
      "Local rasterization without mandatory cloud OCR.",
      "Free export path.",
      "Complements PNG export for lossy-friendly photos.",
      "Unlock password PDFs first when required.",
    ],
    tidbits: [
      "Text-heavy pages may look softer than vector PDF—raise DPI if offered.",
      "JPEG is lossy; use PDF to PNG for line art.",
      "Very long PDFs produce many files—use ZIP download when available.",
    ],
    faqs: [
      { question: "One JPG per page?", answer: "Typically yes—multi-page PDFs yield multiple images." },
      { question: "Free?", answer: "Yes." },
      { question: "Scanned PDFs?", answer: "Pages export as images reflecting the scan resolution." },
      { question: "Password PDF?", answer: "Unlock in myonlinepdfeditor.com before export." },
      { question: "Transparency?", answer: "JPEG does not preserve transparency—use PDF to PNG instead." },
      { question: "What do I download?", answer: "JPG file(s) or a ZIP of pages." },
    ],
  },
  {
    slug: "pdf-to-png",
    headline: "Save PDF pages as lossless PNG images.",
    whatItIs:
      "PDF to PNG exports crisp, lossless page images—ideal for diagrams, UI mockups, and graphics where JPG artifacts are unacceptable.",
    whyUse: [
      "Design needs PNG slices from a PDF spec.",
      "You want alpha-friendly graphics for slides.",
      "Engineering drawings must stay sharp when extracted.",
      "You mirror Smallpdf PNG export in myonlinepdfeditor.com.",
    ],
    howToUse: [
      { title: "Launch PDF to PNG", detail: "From Convert." },
      { title: "Upload PDF", detail: "Select the file." },
      { title: "Page range", detail: "Export all or chosen pages." },
      { title: "Render", detail: "Wait for local rasterization." },
      { title: "Download", detail: "Save PNG or ZIP output." },
    ],
    howToExport: [
      "Collect .png files from Downloads.",
      "Rebuild a PDF with PNG to PDF if you recompile.",
      "Share individual PNGs without re-uploading the whole PDF.",
    ],
    whyBest: [
      "Lossless competitor-parity export.",
      "Browser-local rendering.",
      "Free.",
      "Better than JPG for text and line art pages.",
    ],
    tidbits: [
      "PNG files are larger than JPG for photo pages.",
      "High DPI explodes disk usage—pick sensible defaults.",
      "Color profile shifts may appear on calibrated displays—spot-check.",
    ],
    faqs: [
      { question: "PNG vs JPG export?", answer: "PNG is lossless and sharper for UI; JPG is smaller for photos." },
      { question: "Multi-page?", answer: "Each page becomes its own PNG unless combined in ZIP." },
      { question: "Free?", answer: "Yes." },
      { question: "Encrypted inputs?", answer: "Unlock first." },
      { question: "Vector text?", answer: "Export rasterizes—text becomes pixels at chosen resolution." },
      { question: "Download format?", answer: "PNG files or archive." },
    ],
  },
  {
    slug: "pdf-to-word",
    headline: "Turn PDF text into an editable Word-friendly download.",
    whatItIs:
      "PDF to Word extracts readable text and packages a .docx-style or .txt export you can open in Microsoft Word. Layout fidelity varies; text-first documents work best.",
    whyUse: [
      "You need to revise copy trapped in a PDF contract.",
      "A collaborator insists on .docx not PDF.",
      "You want iLovePDF PDF to Word catalog parity in myonlinepdfeditor.com.",
      "You will reformat manually after quick text extraction.",
    ],
    howToUse: [
      { title: "Open PDF to Word", detail: "Convert category." },
      { title: "Upload PDF", detail: "Use text-based PDFs for best results." },
      { title: "Extract", detail: "Run local text extraction." },
      { title: "Preview snippet", detail: "Skim for missing columns or headers." },
      { title: "Download", detail: "Save Word or text export." },
    ],
    howToExport: [
      "Download .docx or .txt as offered.",
      "Open in Word and apply styles to match branding.",
      "Re-export with Word to PDF when finalized.",
    ],
    whyBest: [
      "No desktop Acrobat license required for basic text recovery.",
      "Local extraction path.",
      "Free entry point for edits.",
      "Pairs with Readable PDF for verification.",
    ],
    tidbits: [
      "Scanned image PDFs need OCR; plain extraction may yield little text.",
      "Tables may arrive as tab-separated lines—touch up in Word.",
      "Complex multi-column layouts can scramble order—proofread.",
    ],
    faqs: [
      { question: "Perfect layout?", answer: "Expect text recovery, not pixel-perfect Word reconstruction." },
      { question: "Scanned PDFs?", answer: "Work only when OCR text exists or you add OCR elsewhere." },
      { question: "Free?", answer: "Yes." },
      { question: "docx or txt?", answer: "The tool downloads the editable format configured for PDF to Word." },
      { question: "Privacy?", answer: "Extraction runs in your browser session." },
      { question: "Round trip?", answer: "Edit in Word, then use Word to PDF for a new PDF." },
    ],
  },
  {
    slug: "pdf-to-excel",
    headline: "Export PDF tables to CSV for Excel and Sheets.",
    whatItIs:
      "PDF to Excel pulls tabular text from PDF pages into comma-separated values you open in Excel. Built for invoices, statements, and grid-like reports.",
    whyUse: [
      "You need to sum numbers locked in a PDF table.",
      "Data entry should not retype dozens of rows.",
      "You want PDF24-style table export in the browser.",
      "CSV imports cleanly into your existing spreadsheet models.",
    ],
    howToUse: [
      { title: "Open PDF to Excel", detail: "Under Convert." },
      { title: "Upload PDF", detail: "Choose a text-based table PDF." },
      { title: "Extract rows", detail: "Review detected columns locally." },
      { title: "Fix delimiters", detail: "Adjust if commas appear inside cells when previewed." },
      { title: "Download CSV", detail: "Save the spreadsheet export." },
    ],
    howToExport: [
      "Open the .csv in Excel or Google Sheets.",
      "Save as .xlsx if your workflow requires workbook format.",
      "Use Excel to PDF to publish a final snapshot after edits.",
    ],
    whyBest: [
      "Spreadsheet bridge without manual copy-paste.",
      "Local table sniffing.",
      "Free.",
      "Matches competitor PDF→Excel positioning with honest CSV output.",
    ],
    tidbits: [
      "Merged cells in PDFs may flatten awkwardly—validate totals.",
      "Scanned tables without OCR produce empty CSV.",
      "Decimal separators may follow locale—normalize in Excel.",
    ],
    faqs: [
      { question: "Native .xlsx download?", answer: "myonlinepdfeditor.com emphasizes CSV you open in Excel; save as xlsx inside Excel if needed." },
      { question: "Multi-page tables?", answer: "Long tables may split—merge sheets manually after import." },
      { question: "Free?", answer: "Yes." },
      { question: "Scanned invoices?", answer: "Requires extractable text, not just page images." },
      { question: "Encoding?", answer: "UTF-8 CSV is typical—watch special characters in Excel import wizard." },
      { question: "What downloads?", answer: "A .csv file." },
    ],
  },
  {
    slug: "pdf-to-text",
    headline: "Save all extractable PDF text as a plain .txt file.",
    whatItIs:
      "PDF to Text dumps body copy from each page into a single text file for grep, diff, translation, or LLM pipelines. Distinct from Readable PDF UI but aimed at export.",
    whyUse: [
      "Developers need .txt for scripts and CI checks.",
      "You will quote clauses in another system without PDF viewers.",
      "Accessibility workflows want plain text archives.",
      "You want convert-category parity beside pdf-to-word.",
    ],
    howToUse: [
      { title: "Open PDF to Text", detail: "Convert tools." },
      { title: "Upload PDF", detail: "Text PDFs outperform pure scans." },
      { title: "Extract", detail: "Run page-by-page text pull locally." },
      { title: "Review", detail: "Skim for dropped headers or footers." },
      { title: "Download", detail: "Save the .txt file." },
    ],
    howToExport: [
      "Download plain .txt.",
      "Pipe into your editor or Document Assistant.",
      "Rebuild PDF with Text to PDF after heavy edits.",
    ],
    whyBest: [
      "Machine-friendly export format.",
      "Local extraction.",
      "Free.",
      "Complements Search for PDF for human review.",
    ],
    tidbits: [
      "Line breaks may not match visual columns.",
      "Password PDFs need Unlock PDF first.",
      "Readable PDF tool still helps quick copy without download.",
    ],
    faqs: [
      { question: "PDF to Text vs Readable PDF?", answer: "PDF to Text targets a downloadable .txt export; Readable PDF focuses on in-app reading." },
      { question: "OCR?", answer: "Only text already embedded in the PDF is extracted unless OCR is added later." },
      { question: "Free?", answer: "Yes." },
      { question: "Encoding?", answer: "UTF-8 text is typical for downloads." },
      { question: "Images?", answer: "Image-only pages may yield empty sections." },
      { question: "Output?", answer: "A .txt file download." },
    ],
  },
  {
    slug: "unlock-pdf",
    headline: "Remove a PDF open password when you know the passphrase.",
    whatItIs:
      "Unlock PDF decrypts a password-protected file you are authorized to open so you can merge, print, edit, or compress it in other myonlinepdfeditor.com tools. You must supply the correct password.",
    whyUse: [
      "A vendor sent a password PDF and your merge step failed.",
      "You own the document but forgot downstream tools need an unlocked copy.",
      "You are matching iLovePDF Unlock in the Others category.",
      "Printing blocked until encryption is removed with the passphrase.",
    ],
    howToUse: [
      { title: "Open Unlock PDF", detail: "Others section of the catalog." },
      { title: "Upload locked PDF", detail: "Select the encrypted file." },
      { title: "Enter password", detail: "Type the open password exactly." },
      { title: "Decrypt", detail: "Process locally when decryption succeeds." },
      { title: "Download", detail: "Save the unlocked PDF." },
    ],
    howToExport: [
      "Download the decrypted .pdf.",
      "Re-protect with Set PDF Password if only removing encryption temporarily.",
      "Continue in Merge PDF or Compress PDF without password errors.",
    ],
    whyBest: [
      "Legitimate owner workflow—no cloud cracking service.",
      "Free unlock when you have the key.",
      "Local decrypt attempt.",
      "Essential prep step for many edit tools.",
    ],
    tidbits: [
      "myonlinepdfeditor.com cannot recover unknown passwords.",
      "Owner-password restrictions differ from user open passwords—read error messages.",
      "Keep encrypted originals for audit if policy requires.",
    ],
    faqs: [
      { question: "Brute force unknown passwords?", answer: "No—you must know the correct open password." },
      { question: "Legal?", answer: "Only unlock files you are permitted to access." },
      { question: "Free?", answer: "Yes." },
      { question: "Permissions password?", answer: "Some restriction-only PDFs behave differently—check viewer errors." },
      { question: "Upload?", answer: "Decryption runs in your browser session." },
      { question: "Output?", answer: "Unencrypted PDF download when successful." },
    ],
  },
  {
    slug: "compare-pdf",
    headline: "Compare two PDF versions and spot text or layout changes.",
    whatItIs:
      "Compare PDF loads an original and a revised file side by side to highlight differences page by page. Built for contract redlines, policy updates, and QA on regenerated exports.",
    whyUse: [
      "Legal needs to see what changed between draft 3 and draft 4.",
      "Compliance verifies regenerated PDFs match approved templates.",
      "You want Smallpdf-style compare in myonlinepdfeditor.com Others.",
      "Two-file review beats manual scrolling.",
    ],
    howToUse: [
      { title: "Open Compare PDF", detail: "Others tools—upload two files." },
      { title: "Load baseline", detail: "Add the older PDF." },
      { title: "Load revised", detail: "Add the newer PDF." },
      { title: "Run compare", detail: "Wait for local diff alignment." },
      { title: "Review", detail: "Step through highlighted changes and export summary if offered." },
    ],
    howToExport: [
      "Download comparison report or marked PDF when available.",
      "Save notes from on-screen highlights for email.",
      "Return to Edit PDF for manual fixes on the revised copy.",
    ],
    whyBest: [
      "Two-file workflow with multi-upload.",
      "Browser-local diff—contracts stay on device.",
      "Free catalog entry vs paid desktop compare.",
      "Pairs with PDF Audit Trail for version control storytelling.",
    ],
    tidbits: [
      "Image-only scans may diff visually but not textually.",
      "Minor font substitutions can register as changes.",
      "Align page sizes before compare when one export was cropped.",
    ],
    faqs: [
      { question: "How many files?", answer: "Two PDFs—before and after versions." },
      { question: "Free?", answer: "Yes." },
      { question: "Scanned PDFs?", answer: "Comparison quality depends on embedded text or visual diff support." },
      { question: "Encrypted PDFs?", answer: "Unlock each file first." },
      { question: "Merge with redlines?", answer: "Use output as review aid; official redlines may still need Word." },
      { question: "What downloads?", answer: "Diff report or annotated PDF depending on workspace implementation." },
    ],
  },
];

const copyBySlug = new Map(TOOL_COPY.map((c) => [c.slug, c]));

function synthesizeCopy(slug: string): ToolCopy | undefined {
  const tool = getTool(slug);
  if (!tool) return undefined;
  return {
    slug,
    headline: tool.summary,
    whatItIs: tool.description,
    whyUse: [
      "You need this workflow without installing desktop PDF software.",
      "You want processing that stays in the browser when possible.",
      "You are matching competitor tool coverage on myonlinepdfeditor.com.",
      "You prefer a free converter without a signup wall.",
    ],
    howToUse: [
      { title: "Open the tool", detail: "Pick it from the myonlinepdfeditor.com catalog." },
      { title: "Upload files", detail: "Use the dropzone for supported formats." },
      { title: "Run locally", detail: "Wait while your browser processes the file." },
      { title: "Review", detail: "Check the result text or downloaded file." },
      { title: "Save", detail: "Download and keep a copy for your records." },
    ],
    howToExport: [
      "Click Download when processing finishes.",
      "Find the file in your browser downloads folder.",
      "Rename it to match your team naming convention.",
      "Open it in another myonlinepdfeditor.com tool if you need more edits.",
    ],
    whyBest: [
      "Browser-first workflow for everyday PDF tasks.",
      "Free to use without a mandatory account.",
      "Catalog parity with popular online PDF suites.",
      "Pairs with Merge, Protect, and Sign tools next door.",
    ],
    tidbits: [
      "Very large files take longer because work runs on your device CPU.",
      "Encrypted PDFs may need Unlock PDF before other edits.",
      "Spot-check output when fonts, scans, or exotic formats are involved.",
    ],
    faqs: [
      { question: "Is this free?", answer: "Yes. myonlinepdfeditor.com tools are free forever with no signup required." },
      { question: "Do you upload my file?", answer: "Core conversion runs in your browser session whenever the tool engine allows." },
      { question: "Account required?", answer: "No account is required to start." },
      { question: "Mobile friendly?", answer: "Modern mobile browsers are supported; large files work best on desktop." },
      { question: "What if conversion fails?", answer: "Try a smaller file, unlock passwords first, or convert exotic formats to PNG/JPEG." },
      { question: "Can I edit after?", answer: "Yes—open the download in Edit PDF or other myonlinepdfeditor.com tools." },
    ],
  };
}

export function getToolCopy(slug: string): ToolCopy | undefined {
  return copyBySlug.get(slug) ?? synthesizeCopy(slug);
}

export function allToolCopy(): ToolCopy[] {
  return [...TOOL_COPY];
}