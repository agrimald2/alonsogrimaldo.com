import { posts } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";

// llms.txt generado desde lib/posts.ts (misma fuente que el sitemap) para que
// nunca vuelva a driftar cuando se publica un post.
export const dynamic = "force-static";

export function GET() {
  const body = `# Alonso Grimaldo

> AI Engineer y founder peruano radicado en Argentina hace 4 años, donde construyó lo más reciente de su carrera. Founding Engineer en 021, founder de LaTech (Latin American Tech Solutions) y ex-CTO de VICI (startup adquirida por Tiendanube). Más de 7 años construyendo producto con IA. Escribe sobre workflows de agentes autónomos, cómo estructurar agentes de código para que iteren, prueben y se corrijan solos, y lo que aprende construyendo en producción.

## Páginas

- [Sobre mí](${SITE}/sobre-mi): Su historia en primera persona — de digitalizar procesos con ERPs en Perú a construir agentes autónomos en 021, pasando por Francia/Alemania, la Université Paris-Sorbonne, VICI (adquirida por Tiendanube) y LaTech.
- [Uses](${SITE}/uses): El stack real con el que construye — Claude Code, Codex, Cursor/VS Code, Playwright MCP, bash + git, Next.js, Supabase, Vercel, Dokku.
- [Now](${SITE}/now): En qué está trabajando actualmente.
- [Proyectos](${SITE}/proyectos): Ship while you sleep y la proyección electoral interactiva.

## Posts

${posts
  .map((p) => `- [${p.title}](${SITE}/posts/${p.slug}): ${p.description}`)
  .join("\n")}

## Posts in English

- [Ship while you sleep: the autonomous-agent workflow we use at 021](${SITE}/en/posts/ship-while-sleep): Leave big goals running and come back to something 99% prod-ready — isolated workspaces, port blocks, and a self-correcting E2E agent.
- [Git worktrees or real clones? What I learned running AI agents in parallel](${SITE}/en/posts/worktrees-vs-clones): Why git worktrees break with multiple autonomous agents (shared .git) and why real clones from a local bare mirror win. Full recipe included.

## Proyectos

- [Ship while you sleep (sitio interactivo)](https://ship.alonsogrimaldo.com): Explicación visual e interactiva del patrón de agentes autónomos, con terminales y diagramas.
- [Proyección electoral Perú 2026](https://elecciones.alonsogrimaldo.com): Página interactiva donde se pueden mover los supuestos de la proyección de segunda vuelta y ver cómo cambia el resultado.

## Contenido completo

- [llms-full.txt](${SITE}/llms-full.txt): Resúmenes extendidos de todos los posts en un solo archivo.

## Temas

Agentes autónomos, LLMs, Claude Code, workflows de desarrollo con IA, aislamiento de workspaces, git, prompt engineering, handoff a agentes, E2E testing automatizado, RAG y grafos de conocimiento, automatización de WhatsApp, ingeniería de software con IA.

## Contacto

- LinkedIn: https://www.linkedin.com/in/alonso-grimaldo-3a2917186/
- GitHub: https://github.com/agrimald2
- X (Twitter): https://x.com/alonsogrimal2
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
