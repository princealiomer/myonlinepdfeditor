import type { ToolCategory } from "@/lib/catalog/tools";

export type Dictionary = {
  meta: {
    titleHome: string;
    descriptionHome: string;
    keywordsHome: string[];
  };
  nav: {
    allTools: string;
    features: string;
    pricing: string;
    about: string;
    openEditor: string;
    menu: string;
    close: string;
    free: string;
  };
  common: {
    tools: string;
    freeForever: string;
    loadingTool: string;
    relatedTools: string;
    language: string;
    breadcrumbTools: string;
  };
  categories: Record<ToolCategory, string>;
  footer: {
    blurb: string;
    copyright: string;
    privacy: string;
    terms: string;
    esign: string;
    sitemap: string;
  };
  home: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaEdit: string;
    ctaBrowse: string;
    howTitle: string;
    howSteps: string[];
    howFoot: string;
    whatTitle: string;
    whatBody: string;
    pillars: { title: string; body: string }[];
    worldTitle: string;
    worldBody: string;
    worldUses: { where: string; detail: string }[];
    popularTitle: string;
    popularBody: string;
    viewCatalog: string;
    extensionsTitle: string;
    extensionsBody: string;
    extensionsHeaders: [string, string, string];
    extensions: { ext: string; meaning: string; use: string }[];
    extensionsFoot: string;
    easyTitle: string;
    easyBody: string;
    easyItems: { title: string; body: string }[];
    easyCta: string;
    categoriesTitle: string;
    categoriesBody: string;
    faqsTitle: string;
    faqs: { question: string; answer: string }[];
  };
  toolsIndex: {
    title: string;
    description: string;
    intro: string;
    searchLabel: string;
    searchPlaceholder: string;
    filterLabel: string;
    filterAll: string;
    resultsCount: string;
    noResults: string;
  };
  featuresPage: {
    /** Used in feature detail titles: "{name} — {howItWorks}" */
    howItWorks: string;
  };
  toolPage: {
    freeBadge: string;
    relatedTitle: string;
    whatIs: string;
    whyUse: string;
    whyBest: string;
    howToUse: string;
    howToExport: string;
    tidbits: string;
    faqs: string;
  };
  workspace: {
    options: string;
    uploadFor: string;
    run: string;
    working: string;
    done: string;
    errorGeneric: string;
    pasteContent: string;
    pageRanges: string;
    pageRangesHint: string;
    rotation: string;
    pagesDelete: string;
    pagesOrder: string;
    pagesDuplicate: string;
    pagesExtract: string;
    password: string;
    passwordUnlockHint: string;
    passwordProtectHint: string;
    watermark: string;
    cropMargin: string;
    cropHint: string;
    pagesPerSheet: string;
    targetSize: string;
    title: string;
    author: string;
    subject: string;
    keywordsLabel: string;
    recipientEmail: string;
    recipients: string;
    searchTerm: string;
    nextSteps: string;
    createBlankTitle: string;
    createBlankBody: string;
    createBlankCta: string;
    creating: string;
    statusTitle: string;
    statusBody: string;
    statusName: string;
    statusValue: string;
    statusNotes: string;
    saveStatus: string;
    localAiHint: string;
    askQuestion: string;
    runLocally: string;
    analyzing: string;
    dropHere: string;
    orBrowse: string;
    remove: string;
    pageN: string;
    organizeHint: string;
    organizeDrag: string;
    organizeDelete: string;
    organizeExport: string;
    organizeEmpty: string;
    organizeKeepOne: string;
    organizeLoading: string;
    organizeReset: string;
    organizeLarge: string;
    honestExportNote: string;
    outputTxtNote: string;
    outputCsvNote: string;
    guidanceOnly: string;
    noOptions: string;
    readyTitle: string;
    downloadAgain: string;
    /** Shown instead of readyTitle for availability:guide tools */
    guideReadyTitle: string;
    guideDownloadAgain: string;
    guideRun: string;
    guideDone: string;
  };
  synthesize: {
    whyUse: string[];
    howToUseTitles: [string, string, string, string, string];
    howToUseDetails: [string, string, string, string, string];
    howToExport: string[];
    whyBest: string[];
    tidbits: string[];
    faqs: { question: string; answer: string }[];
  };
};

export type ToolLocaleFields = {
  name: string;
  shortName: string;
  summary: string;
  description: string;
  howTo: string[];
  keywords: string[];
};

export type ToolsLocaleMap = Record<string, ToolLocaleFields>;

export type FeatureLocaleFields = {
  name: string;
  summary: string;
  description: string;
};

export type FeaturesLocaleMap = Record<string, FeatureLocaleFields>;
