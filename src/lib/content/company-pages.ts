import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

export type CompanyPageId =
  | "about"
  | "contact"
  | "privacy"
  | "disclaimer"
  | "terms";

export type CompanySection = {
  heading: string;
  paragraphs: string[];
};

export type CompanyPage = {
  title: string;
  description: string;
  updated: string;
  intro?: string;
  sections: CompanySection[];
};

const UPDATED_EN = "November 21, 2026";
const UPDATED_ES = "21 de noviembre de 2026";
const UPDATED_DE = "21. November 2026";
const UPDATED_FR = "21 novembre 2026";
const UPDATED_PT = "21 de novembro de 2026";
const UPDATED_JA = "2026年11月21日";

const en: Record<CompanyPageId, CompanyPage> = {
  about: {
    title: "About us",
    description: `Learn about ${site.name} — a free, browser-based PDF toolkit with no signup and local file processing.`,
    updated: UPDATED_EN,
    intro: `${site.name} is a free online PDF toolkit for everyone. Edit, sign, merge, split, compress, and convert documents in your browser without creating an account.`,
    sections: [
      {
        heading: "What we build",
        paragraphs: [
          "We offer a large catalog of focused PDF tools so you can finish everyday document work in a few clicks. Each page does one job clearly: upload a file, run the tool on your device when possible, and download the result.",
          "Every tool stays unlocked. There are no paid plans, trials, or feature paywalls for the core toolkit.",
        ],
      },
      {
        heading: "Privacy-minded processing",
        paragraphs: [
          "Core PDF editing and conversion flows are designed to run in your browser so your files do not need to be uploaded to our servers for ordinary tools. You stay in control of the documents on your device.",
          "Hosting providers may collect standard technical request logs (such as IP address and user agent). See our Privacy Policy for details.",
        ],
      },
      {
        heading: "Who we serve",
        paragraphs: [
          "Students, freelancers, small businesses, clinics, and families use myonlinepdfeditor.com to finish paperwork without buying desktop software. Our goal is simple access worldwide without subscriptions.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions or feedback: ${site.supportEmail}`],
      },
    ],
  },
  contact: {
    title: "Contact",
    description: `Contact ${site.name} for privacy questions, feedback, or support at ${site.supportEmail}.`,
    updated: UPDATED_EN,
    intro:
      "We read every message we can. For the fastest reply, email us with a clear subject line and the tool page you were using.",
    sections: [
      {
        heading: "Email",
        paragraphs: [
          `Support and general inquiries: ${site.supportEmail}`,
          "We typically respond within a few business days. We cannot provide legal advice about electronic signatures or document validity in your jurisdiction.",
        ],
      },
      {
        heading: "What to include",
        paragraphs: [
          "The tool URL you used, your browser and device, and a short description of what went wrong. Do not send passwords or sensitive personal documents unless we specifically ask.",
        ],
      },
      {
        heading: "Site feedback",
        paragraphs: [
          "For site content issues or product feedback, email us. We do not currently display third-party ads on tool pages.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: `How ${site.name} handles privacy and local file processing.`,
    updated: UPDATED_EN,
    intro: `This Privacy Policy explains how ${site.name} (“we”, “us”) handles information when you use our website and PDF tools.`,
    sections: [
      {
        heading: "Local file processing",
        paragraphs: [
          "Many tools process documents in your browser on your device. For those tools, your files are not uploaded to our application servers for conversion or editing. The finished file is downloaded to you.",
          "If a tool cannot complete a job in the browser, the page will say so. Always review the tool page for how that workflow works.",
        ],
      },
      {
        heading: "Information we may receive",
        paragraphs: [
          "Hosting providers (such as Vercel) may collect standard request logs: IP address, user agent, URL path, timestamps, and similar technical data for security, reliability, and abuse prevention.",
          "We do not require an account to use the core tools, so we do not maintain a customer profile database for ordinary use.",
        ],
      },
      {
        heading: "Cookies and third parties",
        paragraphs: [
          "Core tools do not require an account or advertising cookies. The site may still use essential cookies or similar storage needed for language preference and security.",
          "If advertising is re-enabled later, we will update this policy and describe how personalization settings work.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "Hosting and infrastructure partners may process standard technical request data under their own policies.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "The site is a general-audience toolkit. We do not knowingly collect personal information from children for accounts, because we do not require accounts.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update this policy from time to time. The “Last updated” date at the top of this page will change when we do.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Privacy questions: ${site.supportEmail}`],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    description: `Important disclaimer for ${site.name}: tools are provided as-is; verify outputs for legal and business use.`,
    updated: UPDATED_EN,
    intro: `Please read this disclaimer carefully before using ${site.name}.`,
    sections: [
      {
        heading: "No professional advice",
        paragraphs: [
          `${site.name} is not a law firm, accounting firm, or licensed professional service. Content on this site—including eSign compliance notes—is general information only and is not legal, tax, or professional advice.`,
          "Requirements for signatures, records, and document formats vary by country, industry, and document type. Consult a qualified professional when you need advice.",
        ],
      },
      {
        heading: "As-is service",
        paragraphs: [
          "The website and tools are provided free of charge and “as is” without warranties of any kind, express or implied, including fitness for a particular purpose or non-infringement.",
          "We do not guarantee that conversions, edits, OCR-like text extraction, or signatures will be complete, accurate, or accepted by any third party.",
        ],
      },
      {
        heading: "Your responsibility",
        paragraphs: [
          "You are responsible for the files you process, for verifying outputs before you rely on them, and for complying with applicable law when you share or sign documents.",
          "Always keep original copies of important files. Spot-check fonts, layouts, redactions, and encryption before filing or sending.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "External links may appear in guides or help content. We are not responsible for third-party destinations or practices.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, we are not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or business, arising from your use of the site or tools.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about this disclaimer: ${site.supportEmail}`],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    description: `Terms of Service for using ${site.name} free PDF tools.`,
    updated: UPDATED_EN,
    intro: `By accessing or using ${site.name}, you agree to these Terms of Service. If you do not agree, do not use the site.`,
    sections: [
      {
        heading: "The service",
        paragraphs: [
          `${site.name} provides free browser-based document tools. Features may change, move, or be discontinued at any time.`,
          "We do not currently require payment or display ads to unlock the core toolkit.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You agree to use the tools lawfully and responsibly. You must not use the site to process unlawful content, attempt to disrupt the service, abuse infrastructure, or violate others’ rights.",
          "You are solely responsible for the documents you upload or open and for verifying that outputs meet your legal, business, or archival needs.",
        ],
      },
      {
        heading: "Electronic signatures",
        paragraphs: [
          "Typed, drawn, or uploaded signatures created with our tools do not automatically create a binding contract. Consent, identity, and applicable law still matter. See our eSign compliance page for general background—not legal advice.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "Site branding, layout, and original copy belong to us or our licensors. You retain rights to your own documents. Do not scrape or republish the site in bulk without permission.",
        ],
      },
      {
        heading: "Disclaimer of warranties",
        paragraphs: [
          "The service is provided “as is” and “as available” without warranties of any kind. We do not warrant uninterrupted or error-free operation.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or loss of data or profits, arising from use of the site.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "We may update these terms by posting a revised version on this page. Continued use after changes means you accept the updated terms.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions: ${site.supportEmail}`],
      },
    ],
  },
};

const es: Record<CompanyPageId, CompanyPage> = {
  about: {
    title: "Sobre nosotros",
    description: `Conoce ${site.name}: kit PDF gratuito en el navegador, sin registro y con procesamiento local.`,
    updated: UPDATED_ES,
    intro: `${site.name} es un kit PDF online gratuito para todos. Edita, firma, une, divide, comprime y convierte documentos en tu navegador sin crear una cuenta.`,
    sections: [
      {
        heading: "Qué construimos",
        paragraphs: [
          "Ofrecemos un amplio catálogo de herramientas PDF enfocadas para que termines el trabajo diario en pocos clics. Cada página hace una sola tarea con claridad: sube un archivo, ejecuta la herramienta en tu dispositivo cuando sea posible y descarga el resultado.",
          "Todas las herramientas siguen desbloqueadas. No hay planes de pago, pruebas ni muros de funciones en el kit principal.",
        ],
      },
      {
        heading: "Procesamiento respetuoso con la privacidad",
        paragraphs: [
          "Los flujos principales de edición y conversión de PDF están pensados para ejecutarse en tu navegador, de modo que tus archivos no necesiten subirse a nuestros servidores en las herramientas habituales. Tú controlas los documentos en tu dispositivo.",
          "Los proveedores de alojamiento pueden recopilar registros técnicos estándar (como la IP y el agente de usuario). Consulta nuestra Política de privacidad.",
        ],
      },
      {
        heading: "A quién ayudamos",
        paragraphs: [
          "Estudiantes, freelancers, pequeños negocios, clínicas y familias usan myonlinepdfeditor.com para terminar trámites sin comprar software de escritorio. Nuestro objetivo es un acceso sencillo en todo el mundo, sin suscripciones.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [`Preguntas o comentarios: ${site.supportEmail}`],
      },
    ],
  },
  contact: {
    title: "Contacto",
    description: `Contacta con ${site.name} en ${site.supportEmail} para dudas, privacidad o ayuda.`,
    updated: UPDATED_ES,
    intro:
      "Leemos todos los mensajes que podemos. Para una respuesta más rápida, escribe con un asunto claro y la página de la herramienta que usabas.",
    sections: [
      {
        heading: "Correo electrónico",
        paragraphs: [
          `Soporte e consultas generales: ${site.supportEmail}`,
          "Suele responderse en unos días hábiles. No podemos dar asesoramiento legal sobre firmas electrónicas ni sobre la validez de documentos en tu jurisdicción.",
        ],
      },
      {
        heading: "Qué incluir",
        paragraphs: [
          "La URL de la herramienta, tu navegador y dispositivo, y una breve descripción del problema. No envíes contraseñas ni documentos personales sensibles salvo que te lo pidamos.",
        ],
      },
      {
        heading: "Comentarios del sitio",
        paragraphs: [
          "No mostramos anuncios de terceros en las páginas de herramientas en este momento. Para problemas de contenido del sitio, escríbenos.",
        ],
      },
    ],
  },
  privacy: {
    title: "Política de privacidad",
    description: `Cómo ${site.name} trata la privacidad y el procesamiento local.`,
    updated: UPDATED_ES,
    intro: `Esta Política de privacidad explica cómo ${site.name} (“nosotros”) trata la información cuando usas nuestro sitio y las herramientas PDF.`,
    sections: [
      {
        heading: "Procesamiento local de archivos",
        paragraphs: [
          "Muchas herramientas procesan documentos en tu navegador y en tu dispositivo. En esos casos, tus archivos no se suben a nuestros servidores de aplicación para convertirlos o editarlos. El archivo final se descarga en tu equipo.",
          "Si una herramienta no puede completar el trabajo en el navegador, la página lo indicará. Revisa siempre la página de la herramienta para entender el flujo.",
        ],
      },
      {
        heading: "Información que podemos recibir",
        paragraphs: [
          "Los proveedores de alojamiento (como Vercel) pueden recopilar registros de solicitud estándar: dirección IP, agente de usuario, ruta URL, marcas de tiempo y datos técnicos similares por seguridad, fiabilidad y prevención de abusos.",
          "No exigimos cuenta para las herramientas principales, así que no mantenemos una base de perfiles de clientes para el uso habitual.",
        ],
      },
      {
        heading: "Cookies y terceros",
        paragraphs: [
          "Las herramientas principales no requieren cookies publicitarias. Si volvemos a activar anuncios, actualizaremos esta política.",
          "Las preferencias esenciales del sitio (como el idioma) pueden guardarse en tu navegador. Bloquear cookies no impide descargar resultados de herramientas ya abiertas.",
        ],
      },
      {
        heading: "Servicios de terceros",
        paragraphs: [
          "El alojamiento y la infraestructura pueden procesar datos técnicos de solicitud según sus propias políticas.",
        ],
      },
      {
        heading: "Menores",
        paragraphs: [
          "El sitio es una herramienta de público general. No recopilamos a sabiendas datos personales de menores para cuentas, porque no exigimos cuentas.",
        ],
      },
      {
        heading: "Cambios",
        paragraphs: [
          "Podemos actualizar esta política. La fecha de “Última actualización” de esta página cambiará cuando lo hagamos.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [`Preguntas de privacidad: ${site.supportEmail}`],
      },
    ],
  },
  disclaimer: {
    title: "Aviso legal",
    description: `Aviso importante de ${site.name}: las herramientas se ofrecen tal cual; verifica los resultados.`,
    updated: UPDATED_ES,
    intro: `Lee este aviso con atención antes de usar ${site.name}.`,
    sections: [
      {
        heading: "Sin asesoramiento profesional",
        paragraphs: [
          `${site.name} no es un bufete, despacho contable ni servicio profesional autorizado. El contenido del sitio—incluidas las notas de cumplimiento de firma electrónica—es solo información general y no constituye asesoramiento legal, fiscal ni profesional.`,
          "Los requisitos de firmas, registros y formatos varían según el país, el sector y el tipo de documento. Consulta a un profesional cualificado cuando necesites consejo.",
        ],
      },
      {
        heading: "Servicio «tal cual»",
        paragraphs: [
          "El sitio y las herramientas se ofrecen gratis y «tal cual», sin garantías de ningún tipo, expresas o implícitas, incluida la idoneidad para un fin concreto o la no infracción.",
          "No garantizamos que las conversiones, ediciones, extracción de texto u firmas sean completas, exactas o aceptadas por terceros.",
        ],
      },
      {
        heading: "Tu responsabilidad",
        paragraphs: [
          "Eres responsable de los archivos que procesas, de verificar los resultados antes de confiar en ellos y de cumplir la ley aplicable al compartir o firmar documentos.",
          "Conserva siempre copias originales de archivos importantes. Revisa fuentes, maquetación, redacciones y cifrado antes de presentarlos o enviarlos.",
        ],
      },
      {
        heading: "Anuncios y enlaces de terceros",
        paragraphs: [
          "Los anuncios y enlaces externos los proporcionan terceros. No somos responsables de su contenido, destinos ni prácticas.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, no respondemos de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de pérdida de datos, beneficios o negocio derivados del uso del sitio o las herramientas.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [`Preguntas sobre este aviso: ${site.supportEmail}`],
      },
    ],
  },
  terms: {
    title: "Términos del servicio",
    description: `Términos del servicio para usar las herramientas PDF gratuitas de ${site.name}.`,
    updated: UPDATED_ES,
    intro: `Al acceder o usar ${site.name}, aceptas estos Términos del servicio. Si no estás de acuerdo, no uses el sitio.`,
    sections: [
      {
        heading: "El servicio",
        paragraphs: [
          `${site.name} ofrece herramientas documentales gratuitas en el navegador. Las funciones pueden cambiar, moverse o interrumpirse en cualquier momento.`,
          "Podemos mostrar anuncios de terceros. No somos responsables de su contenido ni destinos.",
        ],
      },
      {
        heading: "Uso aceptable",
        paragraphs: [
          "Te comprometes a usar las herramientas de forma legal y responsable. No debes usar el sitio para contenido ilícito, interrumpir el servicio, abusar de la infraestructura ni vulnerar derechos de terceros.",
          "Eres el único responsable de los documentos que subes o abres y de verificar que los resultados cumplan tus necesidades legales, empresariales o de archivo.",
        ],
      },
      {
        heading: "Firmas electrónicas",
        paragraphs: [
          "Las firmas escritas, dibujadas o subidas con nuestras herramientas no crean automáticamente un contrato vinculante. Siguen importando el consentimiento, la identidad y la ley aplicable. Consulta la página de cumplimiento de firma electrónica para contexto general—no es asesoramiento legal.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        paragraphs: [
          "La marca, el diseño y los textos originales del sitio nos pertenecen a nosotros o a nuestros licenciantes. Tú conservas los derechos sobre tus documentos. No raspees ni republicques el sitio de forma masiva sin permiso.",
        ],
      },
      {
        heading: "Exclusión de garantías",
        paragraphs: [
          "El servicio se ofrece «tal cual» y «según disponibilidad», sin garantías de ningún tipo. No garantizamos un funcionamiento ininterrumpido o sin errores.",
        ],
      },
      {
        heading: "Limitación de responsabilidad",
        paragraphs: [
          "En la máxima medida permitida por la ley, no respondemos de daños indirectos, incidentales, especiales, consecuentes o punitivos, ni de pérdida de datos o beneficios derivados del uso del sitio.",
        ],
      },
      {
        heading: "Cambios",
        paragraphs: [
          "Podemos actualizar estos términos publicando una versión revisada en esta página. Seguir usando el sitio tras los cambios implica aceptar los términos actualizados.",
        ],
      },
      {
        heading: "Contacto",
        paragraphs: [`Preguntas: ${site.supportEmail}`],
      },
    ],
  },
};

const de: Record<CompanyPageId, CompanyPage> = {
  about: {
    title: "Über uns",
    description: `Erfahren Sie mehr über ${site.name} — kostenloses PDF-Toolkit im Browser ohne Anmeldung.`,
    updated: UPDATED_DE,
    intro: `${site.name} ist ein kostenloses Online-PDF-Toolkit für alle. Bearbeiten, signieren, zusammenführen, teilen, komprimieren und konvertieren Sie Dokumente im Browser — ohne Konto.`,
    sections: [
      {
        heading: "Was wir anbieten",
        paragraphs: [
          "Wir bieten einen großen Katalog fokussierter PDF-Tools, damit Sie Alltagspapierkram in wenigen Klicks erledigen. Jede Seite hat eine klare Aufgabe: Datei laden, Tool möglichst lokal ausführen, Ergebnis herunterladen.",
          "Jedes Tool bleibt freigeschaltet. Es gibt keine bezahlten Pläne, Testphasen oder Funktions-Paywalls für den Kernbaukasten.",
        ],
      },
      {
        heading: "Datenschutzfreundliche Verarbeitung",
        paragraphs: [
          "Kernabläufe für PDF-Bearbeitung und -Konvertierung laufen im Browser, sodass Ihre Dateien für gewöhnliche Tools nicht auf unsere Server hochgeladen werden müssen. Die Kontrolle bleibt auf Ihrem Gerät.",
          "Hosting- und Werbepartner können technische Standarddaten erfassen (z. B. IP-Adresse oder Werbe-Cookies). Details finden Sie in der Datenschutzerklärung.",
        ],
      },
      {
        heading: "Wen wir unterstützen",
        paragraphs: [
          "Studierende, Freiberufler, kleine Betriebe, Praxen und Familien nutzen myonlinepdfeditor.com, um Formulare ohne Desktop-Software zu erledigen. Unser Ziel ist einfacher weltweiter Zugang ohne Abos.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [`Fragen oder Feedback: ${site.supportEmail}`],
      },
    ],
  },
  contact: {
    title: "Kontakt",
    description: `Kontaktieren Sie ${site.name} unter ${site.supportEmail} bei Fragen oder Support.`,
    updated: UPDATED_DE,
    intro:
      "Wir lesen so viele Nachrichten wie möglich. Für eine schnelle Antwort nennen Sie bitte einen klaren Betreff und die genutzte Tool-Seite.",
    sections: [
      {
        heading: "E-Mail",
        paragraphs: [
          `Support und allgemeine Anfragen: ${site.supportEmail}`,
          "Antworten erfolgen in der Regel innerhalb weniger Werktage. Rechtsberatung zu elektronischen Signaturen oder Dokumentengültigkeit können wir nicht geben.",
        ],
      },
      {
        heading: "Was Sie angeben sollten",
        paragraphs: [
          "Die Tool-URL, Browser und Gerät sowie eine kurze Problembeschreibung. Senden Sie keine Passwörter oder sensiblen Dokumente, außer wir fragen ausdrücklich danach.",
        ],
      },
      {
        heading: "Feedback zur Website",
        paragraphs: [
          "Wir zeigen derzeit keine Drittanzeigen auf den Tool-Seiten. Bei Inhaltsfragen zum Site schreiben Sie uns direkt.",
        ],
      },
    ],
  },
  privacy: {
    title: "Datenschutzerklärung",
    description: `Wie ${site.name} Datenschutz und lokale Verarbeitung handhabt.`,
    updated: UPDATED_DE,
    intro: `Diese Datenschutzerklärung erklärt, wie ${site.name} („wir“) Informationen verarbeitet, wenn Sie unsere Website und PDF-Tools nutzen.`,
    sections: [
      {
        heading: "Lokale Dateiverarbeitung",
        paragraphs: [
          "Viele Tools verarbeiten Dokumente im Browser auf Ihrem Gerät. Dabei werden Ihre Dateien nicht zum Konvertieren oder Bearbeiten auf unsere Anwendungsserver hochgeladen. Die fertige Datei laden Sie herunter.",
          "Kann ein Tool die Aufgabe nicht im Browser erledigen, weist die Seite darauf hin. Prüfen Sie stets die Tool-Seite zum Ablauf.",
        ],
      },
      {
        heading: "Informationen, die wir erhalten können",
        paragraphs: [
          "Hosting-Anbieter (z. B. Vercel) können Standard-Request-Logs erfassen: IP-Adresse, User-Agent, URL-Pfad, Zeitstempel und ähnliche technische Daten zu Sicherheit, Zuverlässigkeit und Missbrauchsschutz.",
          "Für die Kern-Tools ist kein Konto nötig; wir führen daher keine Kundenprofil-Datenbank für den Normalgebrauch.",
        ],
      },
      {
        heading: "Cookies und Dritte",
        paragraphs: [
          "Kern-Tools benötigen keine Werbe-Cookies. Falls Werbung später wieder aktiviert wird, aktualisieren wir diese Richtlinie.",
          "Wesentliche Einstellungen (z. B. Sprache) können im Browser gespeichert werden. Das Blockieren von Cookies verhindert nicht den Download bereits geöffneter Tool-Ergebnisse.",
        ],
      },
      {
        heading: "Drittanbieter",
        paragraphs: [
          "Die Site kann Skripte oder Assets von Werbe-, Analyse- oder CDN-Partnern laden. Diese verarbeiten Daten nach eigenen Richtlinien.",
        ],
      },
      {
        heading: "Kinder",
        paragraphs: [
          "Die Site richtet sich an ein allgemeines Publikum. Wir erheben wissentlich keine personenbezogenen Daten von Kindern für Konten — weil wir keine Konten verlangen.",
        ],
      },
      {
        heading: "Änderungen",
        paragraphs: [
          "Wir können diese Erklärung aktualisieren. Das Datum „Zuletzt aktualisiert“ oben auf der Seite ändert sich dann.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [`Datenschutzfragen: ${site.supportEmail}`],
      },
    ],
  },
  disclaimer: {
    title: "Haftungsausschluss",
    description: `Wichtiger Hinweis zu ${site.name}: Tools ohne Gewähr — Ergebnisse bitte prüfen.`,
    updated: UPDATED_DE,
    intro: `Bitte lesen Sie diesen Hinweis sorgfältig, bevor Sie ${site.name} nutzen.`,
    sections: [
      {
        heading: "Keine professionelle Beratung",
        paragraphs: [
          `${site.name} ist keine Anwaltskanzlei, Steuerberatung oder lizenzierte Fachdienstleistung. Inhalte — einschließlich eSign-Hinweise — sind nur allgemeine Informationen und keine Rechts-, Steuer- oder Fachberatung.`,
          "Anforderungen an Signaturen, Aufbewahrung und Formate unterscheiden sich nach Land, Branche und Dokumenttyp. Holen Sie bei Bedarf qualifizierten Rat ein.",
        ],
      },
      {
        heading: "Dienst „wie besehen“",
        paragraphs: [
          "Website und Tools werden kostenlos und „wie besehen“ ohne jegliche Gewähr bereitgestellt, einschließlich Eignung für einen bestimmten Zweck oder Nichtverletzung.",
          "Wir garantieren nicht, dass Konvertierungen, Bearbeitungen, Textextraktion oder Signaturen vollständig, korrekt oder von Dritten akzeptiert werden.",
        ],
      },
      {
        heading: "Ihre Verantwortung",
        paragraphs: [
          "Sie sind für die verarbeiteten Dateien, die Prüfung der Ergebnisse und die Einhaltung geltenden Rechts beim Teilen oder Signieren verantwortlich.",
          "Bewahren Sie Originale wichtiger Dateien auf. Prüfen Sie Schriften, Layout, Schwärzungen und Verschlüsselung vor Einreichung oder Versand.",
        ],
      },
      {
        heading: "Drittanzeigen und Links",
        paragraphs: [
          "Externe Links in Hilfetexten können auf Drittseiten verweisen. Für deren Inhalte oder Praktiken übernehmen wir keine Verantwortung.",
        ],
      },
      {
        heading: "Haftungsbeschränkung",
        paragraphs: [
          "Soweit gesetzlich zulässig haften wir nicht für indirekte, zufällige, besondere, Folgeschäden oder Strafschadensersatz sowie nicht für Daten-, Gewinn- oder Betriebsverluste aus der Nutzung der Site oder Tools.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [`Fragen zu diesem Hinweis: ${site.supportEmail}`],
      },
    ],
  },
  terms: {
    title: "Nutzungsbedingungen",
    description: `Nutzungsbedingungen für die kostenlosen PDF-Tools von ${site.name}.`,
    updated: UPDATED_DE,
    intro: `Mit dem Zugriff auf oder der Nutzung von ${site.name} akzeptieren Sie diese Nutzungsbedingungen. Wenn Sie nicht einverstanden sind, nutzen Sie die Site nicht.`,
    sections: [
      {
        heading: "Der Dienst",
        paragraphs: [
          `${site.name} bietet kostenlose browserbasierte Dokumenten-Tools. Funktionen können jederzeit geändert, verschoben oder eingestellt werden.`,
          "Der Kernkatalog ist ohne Zahlung und ohne Anzeigenfreischaltung nutzbar.",
        ],
      },
      {
        heading: "Zulässige Nutzung",
        paragraphs: [
          "Sie nutzen die Tools rechtmäßig und verantwortungsvoll. Sie dürfen die Site nicht für rechtswidrige Inhalte nutzen, den Dienst stören, Infrastruktur missbrauchen oder Rechte Dritter verletzen.",
          "Sie allein sind für hochgeladene oder geöffnete Dokumente und für die Prüfung der Ergebnisse verantwortlich.",
        ],
      },
      {
        heading: "Elektronische Signaturen",
        paragraphs: [
          "Getippte, gezeichnete oder hochgeladene Signaturen erzeugen nicht automatisch einen bindenden Vertrag. Einwilligung, Identität und anwendbares Recht bleiben maßgeblich. Die eSign-Seite bietet nur allgemeinen Hintergrund — keine Rechtsberatung.",
        ],
      },
      {
        heading: "Geistiges Eigentum",
        paragraphs: [
          "Marking, Layout und Originaltexte gehören uns oder unseren Lizenzgebern. Rechte an Ihren Dokumenten behalten Sie. Scraping oder Massenveröffentlichung der Site ohne Erlaubnis ist untersagt.",
        ],
      },
      {
        heading: "Gewährleistungsausschluss",
        paragraphs: [
          "Der Dienst wird „wie besehen“ und „wie verfügbar“ ohne Gewähr bereitgestellt. Wir garantieren keinen unterbrechungs- oder fehlerfreien Betrieb.",
        ],
      },
      {
        heading: "Haftungsbeschränkung",
        paragraphs: [
          "Soweit gesetzlich zulässig haften wir nicht für indirekte, zufällige, besondere oder Folgeschäden oder für Daten- bzw. Gewinnverluste aus der Nutzung der Site.",
        ],
      },
      {
        heading: "Änderungen",
        paragraphs: [
          "Wir können diese Bedingungen aktualisieren, indem wir eine überarbeitete Fassung hier veröffentlichen. Die weitere Nutzung gilt als Zustimmung.",
        ],
      },
      {
        heading: "Kontakt",
        paragraphs: [`Fragen: ${site.supportEmail}`],
      },
    ],
  },
};

const fr: Record<CompanyPageId, CompanyPage> = {
  about: {
    title: "À propos",
    description: `Découvrez ${site.name} — boîte à outils PDF gratuite dans le navigateur, sans inscription.`,
    updated: UPDATED_FR,
    intro: `${site.name} est une boîte à outils PDF en ligne gratuite pour tous. Éditez, signez, fusionnez, divisez, compressez et convertissez des documents dans le navigateur sans créer de compte.`,
    sections: [
      {
        heading: "Ce que nous proposons",
        paragraphs: [
          "Nous offrons un large catalogue d’outils PDF ciblés pour terminer le travail documentaire en quelques clics. Chaque page a un rôle clair : importer un fichier, lancer l’outil sur votre appareil lorsque c’est possible, puis télécharger le résultat.",
          "La publicité maintient tous les outils déverrouillés. Pas d’abonnements, d’essais ni de murs de fonctionnalités pour le kit principal.",
        ],
      },
      {
        heading: "Traitement respectueux de la vie privée",
        paragraphs: [
          "Les flux principaux d’édition et de conversion PDF sont conçus pour s’exécuter dans votre navigateur, afin que vos fichiers n’aient pas besoin d’être envoyés sur nos serveurs pour les outils courants. Vous gardez le contrôle sur votre appareil.",
          "Certains partenaires d’hébergement et de publicité peuvent collecter des données techniques standard (adresse IP ou cookies publicitaires). Voir la Politique de confidentialité.",
        ],
      },
      {
        heading: "À qui nous nous adressons",
        paragraphs: [
          "Étudiants, freelances, petites entreprises, cliniques et familles utilisent myonlinepdfeditor.com pour finir des dossiers sans acheter de logiciel de bureau. Notre objectif est un accès simple partout, financé par la publicité plutôt que par des abonnements.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions ou commentaires : ${site.supportEmail}`],
      },
    ],
  },
  contact: {
    title: "Contact",
    description: `Contactez ${site.name} à ${site.supportEmail} pour questions, confidentialité ou aide.`,
    updated: UPDATED_FR,
    intro:
      "Nous lisons autant de messages que possible. Pour une réponse rapide, indiquez un objet clair et la page d’outil utilisée.",
    sections: [
      {
        heading: "E-mail",
        paragraphs: [
          `Support et demandes générales : ${site.supportEmail}`,
          "Nous répondons en général sous quelques jours ouvrés. Nous ne pouvons pas fournir de conseil juridique sur les signatures électroniques ou la validité des documents dans votre juridiction.",
        ],
      },
      {
        heading: "Que préciser",
        paragraphs: [
          "L’URL de l’outil, votre navigateur et appareil, et une brève description du problème. N’envoyez pas de mots de passe ni de documents personnels sensibles sauf demande explicite.",
        ],
      },
      {
        heading: "Publicité",
        paragraphs: [
          "Nous n’affichons pas actuellement de publicités tierces sur les pages d’outils. Pour le contenu du site, écrivez-nous directement.",
        ],
      },
    ],
  },
  privacy: {
    title: "Politique de confidentialité",
    description: `Comment ${site.name} gère la confidentialité, le traitement local, les cookies et la publicité.`,
    updated: UPDATED_FR,
    intro: `Cette Politique de confidentialité explique comment ${site.name} (« nous ») traite les informations lorsque vous utilisez notre site et nos outils PDF.`,
    sections: [
      {
        heading: "Traitement local des fichiers",
        paragraphs: [
          "De nombreux outils traitent les documents dans votre navigateur sur votre appareil. Dans ce cas, vos fichiers ne sont pas téléversés sur nos serveurs d’application pour conversion ou édition. Le fichier final est téléchargé chez vous.",
          "Si un outil ne peut pas terminer le travail dans le navigateur, la page l’indique. Consultez toujours la page de l’outil pour le déroulement.",
        ],
      },
      {
        heading: "Informations que nous pouvons recevoir",
        paragraphs: [
          "Les hébergeurs (comme Vercel) peuvent collecter des journaux de requêtes standard : adresse IP, agent utilisateur, chemin d’URL, horodatages et données techniques similaires pour la sécurité, la fiabilité et la prévention des abus.",
          "Aucun compte n’est requis pour les outils principaux ; nous ne tenons pas de base de profils clients pour un usage ordinaire.",
        ],
      },
      {
        heading: "Publicité et cookies",
        paragraphs: [
          "Les outils principaux n’exigent pas de cookies publicitaires. Si la publicité est réactivée plus tard, nous mettrons à jour cette politique.",
          "Des préférences essentielles (comme la langue) peuvent être enregistrées dans le navigateur. Bloquer les cookies n’empêche pas de télécharger les résultats déjà obtenus.",
        ],
      },
      {
        heading: "Services tiers",
        paragraphs: [
          "Le site peut charger des scripts ou ressources publicitaires, analytiques ou CDN. Ces parties traitent les données selon leurs propres politiques.",
        ],
      },
      {
        heading: "Enfants",
        paragraphs: [
          "Le site s’adresse à un public général. Nous ne collectons pas sciemment de données personnelles d’enfants pour des comptes, car nous n’exigeons pas de comptes.",
        ],
      },
      {
        heading: "Modifications",
        paragraphs: [
          "Nous pouvons mettre à jour cette politique. La date de « Dernière mise à jour » en haut de page changera alors.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions de confidentialité : ${site.supportEmail}`],
      },
    ],
  },
  disclaimer: {
    title: "Avertissement",
    description: `Avertissement ${site.name} : outils fournis en l’état ; vérifiez les résultats.`,
    updated: UPDATED_FR,
    intro: `Veuillez lire attentivement cet avertissement avant d’utiliser ${site.name}.`,
    sections: [
      {
        heading: "Pas de conseil professionnel",
        paragraphs: [
          `${site.name} n’est pas un cabinet d’avocats, un cabinet comptable ni un service professionnel agréé. Le contenu du site — y compris les notes de conformité eSign — est une information générale et ne constitue pas un conseil juridique, fiscal ou professionnel.`,
          "Les exigences de signature, d’archivage et de formats varient selon le pays, le secteur et le type de document. Consultez un professionnel qualifié si besoin.",
        ],
      },
      {
        heading: "Service « en l’état »",
        paragraphs: [
          "Le site et les outils sont fournis gratuitement et « en l’état », sans garantie d’aucune sorte, expresse ou implicite, y compris d’adéquation à un usage particulier ou de non-contrefaçon.",
          "Nous ne garantissons pas que les conversions, modifications, extractions de texte ou signatures seront complètes, exactes ou acceptées par des tiers.",
        ],
      },
      {
        heading: "Votre responsabilité",
        paragraphs: [
          "Vous êtes responsable des fichiers traités, de la vérification des résultats avant de vous y fier, et du respect du droit applicable lors du partage ou de la signature.",
          "Conservez toujours des originaux des fichiers importants. Vérifiez polices, mise en page, caviardages et chiffrement avant dépôt ou envoi.",
        ],
      },
      {
        heading: "Publicités et liens tiers",
        paragraphs: [
          "Les publicités et liens externes sont fournis par des tiers. Nous ne sommes pas responsables de leur contenu, destinations ou pratiques.",
        ],
      },
      {
        heading: "Limitation de responsabilité",
        paragraphs: [
          "Dans la mesure maximale permise par la loi, nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni des pertes de données, profits ou activité liés à l’usage du site ou des outils.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions sur cet avertissement : ${site.supportEmail}`],
      },
    ],
  },
  terms: {
    title: "Conditions d’utilisation",
    description: `Conditions d’utilisation des outils PDF gratuits de ${site.name}.`,
    updated: UPDATED_FR,
    intro: `En accédant à ou en utilisant ${site.name}, vous acceptez ces Conditions d’utilisation. Sinon, n’utilisez pas le site.`,
    sections: [
      {
        heading: "Le service",
        paragraphs: [
          `${site.name} propose des outils documentaires gratuits dans le navigateur, financés par la publicité. Les fonctionnalités peuvent changer, être déplacées ou arrêtées à tout moment.`,
          "Nous pouvons afficher des publicités tierces. Nous ne sommes pas responsables de leur contenu ni de leurs destinations.",
        ],
      },
      {
        heading: "Usage acceptable",
        paragraphs: [
          "Vous vous engagez à utiliser les outils de façon légale et responsable. Vous ne devez pas traiter de contenu illicite, perturber le service, abuser de l’infrastructure ni porter atteinte aux droits d’autrui.",
          "Vous êtes seul responsable des documents que vous importez ou ouvrez et de la vérification des résultats.",
        ],
      },
      {
        heading: "Signatures électroniques",
        paragraphs: [
          "Les signatures tapées, dessinées ou importées ne créent pas automatiquement un contrat contraignant. Le consentement, l’identité et le droit applicable restent essentiels. La page de conformité eSign fournit un contexte général — pas un conseil juridique.",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        paragraphs: [
          "La marque, la mise en page et les textes originaux nous appartiennent ou appartiennent à nos concédants. Vous conservez les droits sur vos documents. Ne scrapez ni ne republiez le site en masse sans autorisation.",
        ],
      },
      {
        heading: "Exclusion de garanties",
        paragraphs: [
          "Le service est fourni « en l’état » et « selon disponibilité », sans garantie d’aucune sorte. Nous ne garantissons pas un fonctionnement ininterrompu ou sans erreur.",
        ],
      },
      {
        heading: "Limitation de responsabilité",
        paragraphs: [
          "Dans la mesure maximale permise par la loi, nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux ou consécutifs, ni des pertes de données ou de profits liés à l’usage du site.",
        ],
      },
      {
        heading: "Modifications",
        paragraphs: [
          "Nous pouvons mettre à jour ces conditions en publiant une version révisée sur cette page. La poursuite de l’utilisation vaut acceptation.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions : ${site.supportEmail}`],
      },
    ],
  },
};

const ptBR: Record<CompanyPageId, CompanyPage> = {
  about: {
    title: "Sobre nós",
    description: `Conheça o ${site.name} — kit PDF gratuito no navegador, sem cadastro.`,
    updated: UPDATED_PT,
    intro: `${site.name} é um kit PDF online gratuito para todos. Edite, assine, una, divida, compacte e converta documentos no navegador sem criar conta.`,
    sections: [
      {
        heading: "O que oferecemos",
        paragraphs: [
          "Oferecemos um amplo catálogo de ferramentas PDF focadas para você concluir o trabalho do dia a dia em poucos cliques. Cada página tem uma função clara: enviar um arquivo, executar a ferramenta no seu dispositivo quando possível e baixar o resultado.",
          "Todas as ferramentas permanecem liberadas. Não há planos pagos, testes nem paywalls de recursos no kit principal.",
        ],
      },
      {
        heading: "Processamento com foco em privacidade",
        paragraphs: [
          "Os fluxos principais de edição e conversão de PDF foram feitos para rodar no navegador, para que seus arquivos não precisem ser enviados aos nossos servidores nas ferramentas comuns. Você mantém o controle no seu dispositivo.",
          "Provedores de hospedagem podem coletar registros técnicos padrão (como IP e user agent). Veja a Política de privacidade.",
        ],
      },
      {
        heading: "Para quem é",
        paragraphs: [
          "Estudantes, freelancers, pequenos negócios, clínicas e famílias usam o myonlinepdfeditor.com para concluir papelada sem comprar software de desktop. Nosso objetivo é acesso simples em todo o mundo, sem assinaturas.",
        ],
      },
      {
        heading: "Contato",
        paragraphs: [`Dúvidas ou feedback: ${site.supportEmail}`],
      },
    ],
  },
  contact: {
    title: "Contato",
    description: `Fale com o ${site.name} em ${site.supportEmail} para dúvidas, privacidade ou suporte.`,
    updated: UPDATED_PT,
    intro:
      "Lemos todas as mensagens que podemos. Para uma resposta mais rápida, envie um assunto claro e a página da ferramenta que você usava.",
    sections: [
      {
        heading: "E-mail",
        paragraphs: [
          `Suporte e dúvidas gerais: ${site.supportEmail}`,
          "Costumamos responder em alguns dias úteis. Não podemos dar aconselhamento jurídico sobre assinaturas eletrônicas ou validade de documentos na sua jurisdição.",
        ],
      },
      {
        heading: "O que incluir",
        paragraphs: [
          "A URL da ferramenta, seu navegador e dispositivo, e uma breve descrição do problema. Não envie senhas nem documentos pessoais sensíveis, salvo se pedirmos.",
        ],
      },
      {
        heading: "Publicidade",
        paragraphs: [
          "Não exibimos anúncios de terceiros nas páginas de ferramentas no momento. Para problemas de conteúdo do site, escreva para nós.",
        ],
      },
    ],
  },
  privacy: {
    title: "Política de privacidade",
    description: `Como o ${site.name} trata privacidade e processamento local.`,
    updated: UPDATED_PT,
    intro: `Esta Política de privacidade explica como o ${site.name} (“nós”) trata informações quando você usa nosso site e ferramentas PDF.`,
    sections: [
      {
        heading: "Processamento local de arquivos",
        paragraphs: [
          "Muitas ferramentas processam documentos no navegador, no seu dispositivo. Nesses casos, seus arquivos não são enviados aos nossos servidores de aplicativo para conversão ou edição. O arquivo pronto é baixado por você.",
          "Se uma ferramenta não puder concluir o trabalho no navegador, a página informará. Sempre revise a página da ferramenta para entender o fluxo.",
        ],
      },
      {
        heading: "Informações que podemos receber",
        paragraphs: [
          "Provedores de hospedagem (como a Vercel) podem coletar logs padrão de solicitação: endereço IP, user agent, caminho da URL, carimbos de data/hora e dados técnicos semelhantes para segurança, confiabilidade e prevenção de abuso.",
          "Não exigimos conta para as ferramentas principais, então não mantemos um banco de perfis de clientes para o uso comum.",
        ],
      },
      {
        heading: "Publicidade e cookies",
        paragraphs: [
          "As ferramentas principais não exigem cookies de publicidade. Se os anúncios forem reativados depois, atualizaremos esta política.",
          "Preferências essenciais (como o idioma) podem ser salvas no navegador. Bloquear cookies não impede o download de resultados de ferramentas já abertas.",
        ],
      },
      {
        heading: "Serviços de terceiros",
        paragraphs: [
          "Hospedagem e infraestrutura podem processar dados técnicos de solicitação segundo as próprias políticas.",
        ],
      },
      {
        heading: "Crianças",
        paragraphs: [
          "O site é uma ferramenta de público geral. Não coletamos intencionalmente dados pessoais de crianças para contas, porque não exigimos contas.",
        ],
      },
      {
        heading: "Alterações",
        paragraphs: [
          "Podemos atualizar esta política. A data de “Última atualização” no topo da página mudará quando isso ocorrer.",
        ],
      },
      {
        heading: "Contato",
        paragraphs: [`Dúvidas de privacidade: ${site.supportEmail}`],
      },
    ],
  },
  disclaimer: {
    title: "Isenção de responsabilidade",
    description: `Aviso do ${site.name}: ferramentas fornecidas como estão; verifique os resultados.`,
    updated: UPDATED_PT,
    intro: `Leia este aviso com atenção antes de usar o ${site.name}.`,
    sections: [
      {
        heading: "Sem aconselhamento profissional",
        paragraphs: [
          `O ${site.name} não é um escritório de advocacia, contabilidade nem serviço profissional licenciado. O conteúdo do site — incluindo notas de conformidade de assinatura eletrônica — é apenas informação geral e não constitui aconselhamento jurídico, fiscal ou profissional.`,
          "Requisitos de assinaturas, registros e formatos variam por país, setor e tipo de documento. Consulte um profissional qualificado quando precisar de orientação.",
        ],
      },
      {
        heading: "Serviço “como está”",
        paragraphs: [
          "O site e as ferramentas são fornecidos gratuitamente e “como estão”, sem garantias de qualquer tipo, expressas ou implícitas, incluindo adequação a um fim específico ou não violação.",
          "Não garantimos que conversões, edições, extração de texto ou assinaturas sejam completas, precisas ou aceitas por terceiros.",
        ],
      },
      {
        heading: "Sua responsabilidade",
        paragraphs: [
          "Você é responsável pelos arquivos que processa, por verificar os resultados antes de confiar neles e por cumprir a lei aplicável ao compartilhar ou assinar documentos.",
          "Guarde sempre cópias originais de arquivos importantes. Confira fontes, layout, redações e criptografia antes de protocolar ou enviar.",
        ],
      },
      {
        heading: "Anúncios e links de terceiros",
        paragraphs: [
          "Anúncios e links externos são fornecidos por terceiros. Não somos responsáveis pelo conteúdo, destinos ou práticas deles.",
        ],
      },
      {
        heading: "Limitação de responsabilidade",
        paragraphs: [
          "Na máxima extensão permitida por lei, não somos responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, nem por perda de dados, lucros ou negócios decorrentes do uso do site ou das ferramentas.",
        ],
      },
      {
        heading: "Contato",
        paragraphs: [`Dúvidas sobre este aviso: ${site.supportEmail}`],
      },
    ],
  },
  terms: {
    title: "Termos de serviço",
    description: `Termos de serviço das ferramentas PDF gratuitas do ${site.name}.`,
    updated: UPDATED_PT,
    intro: `Ao acessar ou usar o ${site.name}, você concorda com estes Termos de serviço. Se não concordar, não use o site.`,
    sections: [
      {
        heading: "O serviço",
        paragraphs: [
          `O ${site.name} oferece ferramentas documentais gratuitas no navegador. Os recursos podem mudar, ser movidos ou descontinuados a qualquer momento.`,
          "Não exigimos pagamento nem anúncios para liberar o kit principal de ferramentas.",
        ],
      },
      {
        heading: "Uso aceitável",
        paragraphs: [
          "Você concorda em usar as ferramentas de forma legal e responsável. Não deve usar o site para conteúdo ilícito, interromper o serviço, abusar da infraestrutura ou violar direitos de terceiros.",
          "Você é o único responsável pelos documentos que envia ou abre e por verificar se os resultados atendem às suas necessidades legais, comerciais ou de arquivo.",
        ],
      },
      {
        heading: "Assinaturas eletrônicas",
        paragraphs: [
          "Assinaturas digitadas, desenhadas ou enviadas com nossas ferramentas não criam automaticamente um contrato vinculante. Consentimento, identidade e a lei aplicável ainda importam. Veja a página de conformidade de assinatura eletrônica para contexto geral — não é aconselhamento jurídico.",
        ],
      },
      {
        heading: "Propriedade intelectual",
        paragraphs: [
          "A marca, o layout e os textos originais do site pertencem a nós ou a nossos licenciadores. Você mantém os direitos sobre seus documentos. Não faça scraping nem republice o site em massa sem permissão.",
        ],
      },
      {
        heading: "Isenção de garantias",
        paragraphs: [
          "O serviço é fornecido “como está” e “conforme disponível”, sem garantias de qualquer tipo. Não garantimos operação ininterrupta ou livre de erros.",
        ],
      },
      {
        heading: "Limitação de responsabilidade",
        paragraphs: [
          "Na máxima extensão permitida por lei, não somos responsáveis por danos indiretos, incidentais, especiais ou consequenciais, nem por perda de dados ou lucros decorrentes do uso do site.",
        ],
      },
      {
        heading: "Alterações",
        paragraphs: [
          "Podemos atualizar estes termos publicando uma versão revisada nesta página. O uso contínuo após as mudanças significa que você aceita os termos atualizados.",
        ],
      },
      {
        heading: "Contato",
        paragraphs: [`Dúvidas: ${site.supportEmail}`],
      },
    ],
  },
};

const ja: Record<CompanyPageId, CompanyPage> = {
  about: {
    title: "私たちについて",
    description: `${site.name}について — 登録不要の無料ブラウザPDFツールキット。`,
    updated: UPDATED_JA,
    intro: `${site.name}は、だれでも使える無料のオンラインPDFツールキットです。アカウントを作らずに、ブラウザ上で編集・署名・結合・分割・圧縮・変換ができます。`,
    sections: [
      {
        heading: "提供しているもの",
        paragraphs: [
          "日常の書類作業を数クリックで終えられるよう、用途を絞ったPDFツールを多数用意しています。各ページは役割が明確で、ファイルを開いて端末上で処理し（可能な場合）、結果をダウンロードします。",
          "すべてのツールを開放しています。コア機能に有料プランやトライアル、機能制限はありません。",
        ],
      },
      {
        heading: "プライバシーを意識した処理",
        paragraphs: [
          "主要なPDF編集・変換はブラウザ内で動く設計です。通常のツールでは、当社サーバーへファイルをアップロードする必要はありません。端末上の文書を自分で管理できます。",
          "ホスティング提供者が、IPアドレスやユーザーエージェントなどの標準的な技術ログを収集する場合があります。詳細はプライバシーポリシーをご覧ください。",
        ],
      },
      {
        heading: "対象となる方",
        paragraphs: [
          "学生、フリーランス、小規模事業者、クリニック、ご家庭などが、デスクトップソフトを買わずに手続きを終えるために myonlinepdfeditor.com を利用しています。サブスクリプションなしで、世界中にシンプルなアクセスを届けることが目標です。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [`ご質問・ご意見: ${site.supportEmail}`],
      },
    ],
  },
  contact: {
    title: "お問い合わせ",
    description: `${site.name}への連絡は ${site.supportEmail} まで。`,
    updated: UPDATED_JA,
    intro:
      "可能な限りメッセージを確認しています。迅速な返信のため、件名を明確にし、利用していたツールのページを記載してください。",
    sections: [
      {
        heading: "メール",
        paragraphs: [
          `サポート・一般のお問い合わせ: ${site.supportEmail}`,
          "通常は数営業日以内に返信します。電子署名や文書の法的有効性について、法律上の助言はできません。",
        ],
      },
      {
        heading: "記載してほしい内容",
        paragraphs: [
          "利用したツールのURL、ブラウザと端末、何が起きたかの短い説明。こちらからお願いしない限り、パスワードや機微な個人文書は送らないでください。",
        ],
      },
      {
        heading: "サイトへのご意見",
        paragraphs: [
          "現在、ツールページに第三者広告は表示していません。サイト内容の問題は当社へメールしてください。",
        ],
      },
    ],
  },
  privacy: {
    title: "プライバシーポリシー",
    description: `${site.name}のプライバシーとローカル処理の取り扱い。`,
    updated: UPDATED_JA,
    intro: `本プライバシーポリシーは、${site.name}（「当社」）がウェブサイトおよびPDFツール利用時に情報をどのように扱うかを説明します。`,
    sections: [
      {
        heading: "ローカルでのファイル処理",
        paragraphs: [
          "多くのツールは、お使いの端末のブラウザ内で文書を処理します。その場合、変換や編集のために当社のアプリケーションサーバーへファイルをアップロードしません。完成したファイルはご自身でダウンロードします。",
          "ブラウザ内で完了できない場合は、ページにその旨を表示します。各ツールページで処理の流れを確認してください。",
        ],
      },
      {
        heading: "取得しうる情報",
        paragraphs: [
          "ホスティング事業者（例: Vercel）は、セキュリティ・信頼性・不正防止のため、IPアドレス、ユーザーエージェント、URLパス、タイムスタンプなどの標準的なリクエストログを収集する場合があります。",
          "コアツールにアカウントは不要なため、通常利用向けの顧客プロフィールデータベースは保持しません。",
        ],
      },
      {
        heading: "Cookie と第三者",
        paragraphs: [
          "主要ツールに広告 Cookie は不要です。今後広告を再開する場合は、本ポリシーを更新します。",
          "言語などの基本設定はブラウザに保存される場合があります。Cookie をブロックしても、すでに開いたツール結果のダウンロードは妨げません。",
        ],
      },
      {
        heading: "第三者サービス",
        paragraphs: [
          "ホスティングやインフラ事業者は、各社の方針に従って標準的なリクエスト技術データを処理する場合があります。",
        ],
      },
      {
        heading: "子どもについて",
        paragraphs: [
          "本サイトは一般向けツールキットです。アカウントを求めないため、子ども向けアカウントのために個人情報を意図的に収集することはありません。",
        ],
      },
      {
        heading: "変更",
        paragraphs: [
          "本ポリシーは随時更新される場合があります。更新時はページ上部の「最終更新」日付が変わります。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [`プライバシーに関するお問い合わせ: ${site.supportEmail}`],
      },
    ],
  },
  disclaimer: {
    title: "免責事項",
    description: `${site.name}の免責事項。ツールは現状有姿で提供され、結果の確認は利用者の責任です。`,
    updated: UPDATED_JA,
    intro: `${site.name}をご利用になる前に、本免責事項をよくお読みください。`,
    sections: [
      {
        heading: "専門的助言ではありません",
        paragraphs: [
          `${site.name}は法律事務所、会計事務所、その他の免許制専門サービスではありません。電子署名コンプライアンスの説明を含む本サイトの内容は一般情報のみであり、法律・税務・専門的助言ではありません。`,
          "署名・記録・文書形式の要件は国・業種・文書の種類により異なります。助言が必要な場合は資格のある専門家にご相談ください。",
        ],
      },
      {
        heading: "現状有姿での提供",
        paragraphs: [
          "本サイトおよびツールは無料で、明示・黙示を問わずいかなる保証もなく「現状有姿」で提供されます（特定目的適合性や非侵害を含みます）。",
          "変換・編集・テキスト抽出・署名が完全・正確であること、または第三者が受け入れることを保証しません。",
        ],
      },
      {
        heading: "利用者の責任",
        paragraphs: [
          "処理するファイル、結果を信頼する前の確認、文書の共有・署名時の法令遵守は利用者の責任です。",
          "重要なファイルの原本は必ず保管してください。提出・送信前にフォント、レイアウト、墨消し、暗号化を確認してください。",
        ],
      },
      {
        heading: "外部リンク",
        paragraphs: [
          "ガイド内の外部リンクは第三者が提供する場合があります。その内容・遷移先・慣行について当社は責任を負いません。",
        ],
      },
      {
        heading: "責任の制限",
        paragraphs: [
          "法令で認められる最大限の範囲で、サイトまたはツールの利用に起因する間接・付随・特別・結果・懲罰的損害、ならびにデータ・利益・事業の損失について責任を負いません。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [`本免責事項に関するお問い合わせ: ${site.supportEmail}`],
      },
    ],
  },
  terms: {
    title: "利用規約",
    description: `${site.name}の無料PDFツールの利用規約。`,
    updated: UPDATED_JA,
    intro: `${site.name}にアクセスまたは利用することで、本利用規約に同意したものとみなします。同意できない場合は利用しないでください。`,
    sections: [
      {
        heading: "サービスについて",
        paragraphs: [
          `${site.name}は無料のブラウザ向け文書ツールを提供します。機能はいつでも変更・移動・終了される場合があります。`,
          "コアツールの利用に課金や広告による解除は不要です。",
        ],
      },
      {
        heading: "許容される利用",
        paragraphs: [
          "ツールは適法かつ責任ある方法で利用してください。違法コンテンツの処理、サービスの妨害、インフラの濫用、他者の権利侵害は禁止します。",
          "アップロードまたは開く文書、および結果が法的・業務・保管上の要件を満たすかの確認は、すべて利用者の責任です。",
        ],
      },
      {
        heading: "電子署名",
        paragraphs: [
          "入力・手書き・画像アップロードによる署名は、自動的に拘束力のある契約を成立させません。同意・本人確認・適用法が引き続き重要です。電子署名コンプライアンスページは一般的な背景情報であり、法律助言ではありません。",
        ],
      },
      {
        heading: "知的財産",
        paragraphs: [
          "サイトのブランド、レイアウト、オリジナル文面は当社またはライセンサーに帰属します。ご自身の文書の権利は利用者に残ります。許可なく大量のスクレイピングや再公開をしないでください。",
        ],
      },
      {
        heading: "保証の否認",
        paragraphs: [
          "サービスは「現状有姿」「提供可能な範囲」で、いかなる保証もなく提供されます。中断やエラーのない動作は保証しません。",
        ],
      },
      {
        heading: "責任の制限",
        paragraphs: [
          "法令で認められる最大限の範囲で、サイト利用に起因する間接・付随・特別・結果損害、データや利益の損失について責任を負いません。",
        ],
      },
      {
        heading: "変更",
        paragraphs: [
          "本規約は、本ページに改訂版を掲載することで更新される場合があります。変更後の継続利用は、更新後の規約への同意を意味します。",
        ],
      },
      {
        heading: "お問い合わせ",
        paragraphs: [`ご質問: ${site.supportEmail}`],
      },
    ],
  },
};

const BY_LOCALE: Record<Locale, Record<CompanyPageId, CompanyPage>> = {
  en,
  es,
  de,
  fr,
  "pt-BR": ptBR,
  ja,
};

export function getCompanyPage(
  id: CompanyPageId,
  locale: Locale = "en",
): CompanyPage {
  return BY_LOCALE[locale]?.[id] ?? en[id];
}

export const COMPANY_PAGE_PATHS: Record<CompanyPageId, string> = {
  about: "/about",
  contact: "/contact",
  privacy: "/privacy",
  disclaimer: "/disclaimer",
  terms: "/terms",
};
