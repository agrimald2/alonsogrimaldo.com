export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO — fecha de publicación
  updated?: string; // ISO — última edición real, si difiere de date
  dateLabel: string;
  tags: string[];
  readingMin: number;
  summary: string; // resumen extendido, alimenta /llms-full.txt
};

export const posts: Post[] = [
  {
    slug: "asistente-whatsapp",
    title: "Mi asistente ejecutivo es un chat de WhatsApp conmigo mismo",
    description:
      "Construí un bot local con Baileys que transcribe mis audios, vigila 39 grupos de trabajo, maneja mis 2 calendarios por lenguaje natural y me caza las promesas que hago en cualquier chat. Sin apps nuevas, por menos de $5 al mes.",
    date: "2026-07-13",
    dateLabel: "julio 2026",
    tags: ["agentes", "whatsapp", "automatización"],
    readingMin: 12,
    summary:
      "Un bot de Node + Baileys corriendo bajo pm2 en una Mac mini convierte el chat de WhatsApp con uno mismo en centro de comando: transcribe audios con Whisper, filtra 993 grupos con un pipeline de capas (regex a costo $0 descarta ~70%, gpt-4o-mini batcheado cada 5 minutos clasifica el resto), maneja dos calendarios de Google por lenguaje natural con confirmación explícita, detecta promesas hechas en cualquier chat y las vuelve to-dos, registra gastos por moneda y guarda 14 días de historial consultable. Para tareas grandes delega en Claude Code, conectado al Company Brain de 021. Costo total: menos de $5/mes. Incluye tres war stories: el \\b de JavaScript que no banca tildes en español, dos instancias peleando por la sesión de WhatsApp, y un LLM que agendó un recordatorio en el pasado por no saber el año.",
  },
  {
    slug: "latech",
    title: "Latech: IA aplicada para empresas que no nacieron digitales",
    description:
      "Fundé Latech para llevar IA y software a medida a corporativos peruanos — Arca Continental Lindley, Montana, Rimac, Pits. No vendo modelos: resuelvo procesos. Qué hacemos, cómo cobramos, y por qué la IA sin proceso no sirve.",
    date: "2026-06-23",
    dateLabel: "junio 2026",
    tags: ["latech", "ia aplicada", "empresas"],
    readingMin: 6,
    summary:
      "Latech (Latin American Tech Solutions) es la software factory que Alonso Grimaldo fundó en 2023 en Lima: IA y software a medida para empresas que no nacieron digitales — Arca Continental Lindley, Corporación Montana, Rimac Seguros, Pits, entre otras. Construye agentes de IA para WhatsApp Business conectados al CRM/ERP del cliente, automatización de procesos, apps a medida, BI e integraciones. Tres modelos de trabajo: por proyecto, Tech Partner (equipo dedicado desde $5,000 USD/mes) y Tu Startup (MVP a producto). La tesis: la IA no arregla un proceso roto, lo acelera — el valor está en conectarla a los datos y al proceso real del negocio.",
  },
  {
    slug: "company-brain",
    title: "Le di un cerebro a la empresa — y la clave no fue RAG",
    description:
      "Construí el Company Brain de 021: un sistema que ingiere los documentos de una organización y responde preguntas sobre ellos. Lo que aprendí: el conocimiento útil no sale de tirar vectores, sale de estructura.",
    date: "2026-06-16",
    dateLabel: "junio 2026",
    tags: ["agentes", "rag", "arquitectura"],
    readingMin: 9,
    summary:
      "El Company Brain de 021 ingiere los documentos de una organización y responde preguntas con fuentes. El RAG vectorial puro no alcanza: responde \"¿qué se parece a esto?\" pero no \"¿qué depende de qué?\", \"¿quién dijo esto y cuándo?\" ni \"¿esto se contradice con aquello?\". La solución es un grafo híbrido en Neo4j con dos capas — documental (organización → archivo → versión → chunks con embeddings) y semántica (entidades conectadas por relaciones reales: OWNS, NEEDS, CONTRIBUTES_TO) — donde cada entidad apunta a su evidencia exacta con score de confianza. La ingesta corre en dos tiempos (pre-cola sincrónica <1s, post-cola asincrónica con extracción de entidades) y todo se normaliza a Markdown canónico. Las respuestas salen de una máquina de estados determinística de cinco etapas (arquitecto → router → fan-out → auditor → estratega) donde el auditor detecta contradicciones antes de responder. Arquitectura de puertos y adaptadores: el mismo código corre local (Docker) y en producción (Vercel Blob, Upstash, Neo4j cloud).",
  },
  {
    slug: "ship-while-sleep",
    title: "Ship while you sleep: el workflow de agentes autónomos que usamos en 021",
    description:
      "Dejá objetivos grandes corriendo y volvé a algo 99% prod-ready: workspaces aislados por tarea, bloques de puertos, y un agente de E2E que encuentra la causa raíz y se auto-corrige.",
    date: "2026-06-12",
    dateLabel: "junio 2026",
    tags: ["workflow", "agentes"],
    readingMin: 7,
    summary:
      "Ship while you sleep es un patrón de trabajo con agentes autónomos en cuatro movimientos: (1) el agente itera el objetivo con vos y genera el spec antes de tocar código; (2) divide la tarea en workspaces aislados — un clon real de cada repo por sub-tarea y un bloque de puertos propio, de modo que dos agentes en paralelo nunca comparten archivos, ramas ni puertos; (3) un agente de E2E prueba en el navegador, encuentra la causa raíz, aplica el fix y repite hasta lograr 3 corridas limpias seguidas; (4) volvés a capturas, feedback y fixes documentados, en general 99% prod-ready. Usa clones reales desde un mirror bare local en vez de git worktrees porque los worktrees comparten el mismo .git. El handoff efectivo es específico en el QUÉ/POR QUÉ/criterios de aceptación y suelto en el CÓMO: síntoma observable, causa raíz verificada con archivo:línea, constraints, y criterios testeables. Versión interactiva en ship.alonsogrimaldo.com.",
  },
  {
    slug: "worktrees-vs-clones",
    title: "¿Worktrees o clones? Lo que aprendí corriendo agentes en paralelo",
    description:
      "Arranqué con git worktrees y terminé con clones reales desde un mirror bare. Las tres razones técnicas, la receta completa, y cuándo los worktrees siguen ganando.",
    date: "2026-06-12",
    dateLabel: "junio 2026",
    tags: ["git", "agentes"],
    readingMin: 6,
    summary:
      "Los git worktrees fallan con múltiples agentes autónomos en paralelo porque comparten el mismo .git: un gc --prune, reset --hard o branch -D de un agente puede afectar a todos los worktrees; git no permite la misma rama checkouteada dos veces; y config y hooks se heredan del padre. La alternativa: clones reales desde un mirror bare local (git clone --mirror una vez, después cada tarea clona del mirror — instantáneo, sin red). Cada tarea queda 100% aislada con su propio .git, incluido un hook anti-push a staging/main. La capa de helpers es bash + git: task-new clona, ramea, renderiza el env, asigna un bloque de puertos e instala el hook; task-rm aborta si hay cambios sin commitear. Los worktrees siguen ganando para fixes rápidos de un solo agente: más livianos y sin riesgo de cruce porque no hay concurrencia.",
  },
  {
    slug: "agente-proyeccion-electoral",
    title: "Me mataba la ansiedad, así que puse a mi agente a proyectar la segunda vuelta",
    description:
      "Con 96.4% de actas contadas, el resultado parecía claro. Un agente scrapeó la API de la ONPE región por región y la proyección se dio vuelta — en 15 minutos, con modelo validado y página interactiva.",
    date: "2026-06-10",
    dateLabel: "junio 2026",
    tags: ["agentes", "datos"],
    readingMin: 5,
    summary:
      "Con 96.4% de actas contadas en la segunda vuelta de Perú 2026, Sánchez ganaba por ~41 mil votos. Un agente scrapeó la API oficial de la ONPE región por región y encontró que al extranjero solo le habían contado el 34% de sus actas (donde Fujimori sacaba 64.6%) y Lima tenía 915 actas pendientes (63.5% para ella). La proyección ingenua con promedio nacional no movía el resultado; proyectando cada zona con su propio patrón de voto, se daba vuelta: Fujimori ganaría por ~53 mil votos, con margen entre +31 mil y +64 mil en todos los escenarios. El agente extrajo datos, armó el modelo, lo validó por dos vías independientes (Python y Excel) y publicó una página interactiva — en 15 minutos. La lección: un agente sin fuente de verdad alucina; un agente sin forma de validar, convence; con las dos cosas, proyecta.",
  },
];

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`post no encontrado: ${slug}`);
  return post;
}
