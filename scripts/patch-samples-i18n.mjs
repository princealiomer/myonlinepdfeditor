import { readFileSync, writeFileSync } from "fs";

const blocks = {
  es: `  samplesPage: {
    title: "Descarga de documentos de muestra",
    intro:
      "Archivos DOC, DOCX, XLS, XLSX, PPT, PPTX, PDF, ODT, ODS, ODP y RTF gratis en tamaños habituales. Descarga uno y ábrelo en una herramienta de myonlinepdfeditor.com.",
    formatsTitle: "Elige un formato",
    downloadCta: "Descargar archivo de muestra",
    openFormat: "Ver tamaños y descargar",
    fileTitle: "Descargar {name}",
    fileIntro:
      "Esta muestra {ext} está alojada en myonlinepdfeditor.com para pruebas de carga y conversión.",
    sizeLabel: "Tamaño",
    typeLabel: "Tipo",
    relatedTools: "Pruébalo con estas herramientas",
    backToSamples: "Todos los documentos de muestra",
    backToFormat: "Todas las muestras {format}",
    note: "Las muestras se generan para pruebas. Prefiere formatos OOXML/ODF/PDF modernos.",
  },
`,
  de: `  samplesPage: {
    title: "Beispieldokumente zum Download",
    intro:
      "Kostenlose DOC-, DOCX-, XLS-, XLSX-, PPT-, PPTX-, PDF-, ODT-, ODS-, ODP- und RTF-Dateien in gängigen Größen. Laden Sie eine Datei herunter und öffnen Sie sie in einem Tool auf myonlinepdfeditor.com.",
    formatsTitle: "Format wählen",
    downloadCta: "Beispieldatei herunterladen",
    openFormat: "Größen anzeigen & herunterladen",
    fileTitle: "{name} herunterladen",
    fileIntro:
      "Diese {ext}-Beispieldatei liegt auf myonlinepdfeditor.com für Upload- und Konvertertests.",
    sizeLabel: "Größe",
    typeLabel: "Typ",
    relatedTools: "Mit diesen Tools testen",
    backToSamples: "Alle Beispieldokumente",
    backToFormat: "Alle {format}-Beispiele",
    note: "Beispiele sind zum Testen erzeugt. Moderne OOXML/ODF/PDF-Formate funktionieren am besten.",
  },
`,
  fr: `  samplesPage: {
    title: "Téléchargement de documents exemples",
    intro:
      "Fichiers DOC, DOCX, XLS, XLSX, PPT, PPTX, PDF, ODT, ODS, ODP et RTF gratuits dans des tailles courantes. Téléchargez un fichier puis ouvrez-le dans un outil myonlinepdfeditor.com.",
    formatsTitle: "Choisir un format",
    downloadCta: "Télécharger le fichier exemple",
    openFormat: "Voir les tailles et télécharger",
    fileTitle: "Télécharger {name}",
    fileIntro:
      "Cet exemple {ext} est hébergé sur myonlinepdfeditor.com pour tester les imports et conversions.",
    sizeLabel: "Taille",
    typeLabel: "Type",
    relatedTools: "Essayer avec ces outils",
    backToSamples: "Tous les documents exemples",
    backToFormat: "Tous les exemples {format}",
    note: "Exemples générés pour les tests. Préférez OOXML/ODF/PDF modernes.",
  },
`,
  "pt-BR": `  samplesPage: {
    title: "Download de documentos de exemplo",
    intro:
      "Arquivos DOC, DOCX, XLS, XLSX, PPT, PPTX, PDF, ODT, ODS, ODP e RTF gratuitos em tamanhos comuns. Baixe um arquivo e abra em uma ferramenta do myonlinepdfeditor.com.",
    formatsTitle: "Escolha um formato",
    downloadCta: "Baixar arquivo de exemplo",
    openFormat: "Ver tamanhos e baixar",
    fileTitle: "Baixar {name}",
    fileIntro:
      "Este exemplo {ext} está hospedado no myonlinepdfeditor.com para testes de upload e conversão.",
    sizeLabel: "Tamanho",
    typeLabel: "Tipo",
    relatedTools: "Experimente com estas ferramentas",
    backToSamples: "Todos os documentos de exemplo",
    backToFormat: "Todos os exemplos {format}",
    note: "Exemplos gerados para testes. Prefira formatos OOXML/ODF/PDF modernos.",
  },
`,
  ja: `  samplesPage: {
    title: "サンプル文書のダウンロード",
    intro:
      "DOC、DOCX、XLS、XLSX、PPT、PPTX、PDF、ODT、ODS、ODP、RTF の無料サンプルを一般的なサイズで用意しています。ダウンロードして myonlinepdfeditor.com のツールで試せます。",
    formatsTitle: "形式を選ぶ",
    downloadCta: "サンプルをダウンロード",
    openFormat: "サイズを見てダウンロード",
    fileTitle: "{name} をダウンロード",
    fileIntro:
      "この {ext} サンプルはアップロードと変換テスト用に myonlinepdfeditor.com で提供しています。",
    sizeLabel: "サイズ",
    typeLabel: "種類",
    relatedTools: "これらのツールで試す",
    backToSamples: "すべてのサンプル文書",
    backToFormat: "{format} のすべてのサンプル",
    note: "テスト用に生成したサンプルです。OOXML / ODF / PDF が最も安定します。",
  },
`,
};

for (const [loc, block] of Object.entries(blocks)) {
  const file = `src/lib/i18n/dictionaries/${loc}.ts`;
  let src = readFileSync(file, "utf8");
  if (src.includes("samplesPage:")) {
    console.log("skip", loc);
    continue;
  }
  // Insert after nav block closing `},` that precedes common:
  src = src.replace(
    /(\n  nav: \{[\s\S]*?\n  \},\n)(  common: \{)/,
    `$1${block}$2`,
  );
  writeFileSync(file, src);
  console.log("patched", loc);
}
