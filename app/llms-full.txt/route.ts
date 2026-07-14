import { posts } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";

export const dynamic = "force-static";

export function GET() {
  const body = `# Alonso Grimaldo — contenido completo

> AI Engineer y founder peruano radicado en Argentina. Founding Engineer en 021, founder de LaTech y ex-CTO de VICI (adquirida por Tiendanube). Este archivo contiene el resumen extendido de cada post del blog; el texto completo vive en cada URL.

${posts
  .map(
    (p) => `## ${p.title}

- URL: ${SITE}/posts/${p.slug}
- Publicado: ${p.date}${p.updated ? `\n- Actualizado: ${p.updated}` : ""}
- Tags: ${p.tags.join(", ")}

${p.summary}
`,
  )
  .join("\n")}
## Contacto

- LinkedIn: https://www.linkedin.com/in/alonso-grimaldo-3a2917186/
- GitHub: https://github.com/agrimald2
- X (Twitter): https://x.com/alonsogrimal2
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
