export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  dateLabel: string;
  tags: string[];
  readingMin: number;
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
  },
];

export function getPost(slug: string): Post {
  const post = posts.find((p) => p.slug === slug);
  if (!post) throw new Error(`post no encontrado: ${slug}`);
  return post;
}
