import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "El stack con el que construyo: editores, agentes de IA, modelos, terminal y herramientas que uso todos los días para shippear con agentes autónomos.",
  alternates: { canonical: "/uses" },
};

type Item = { name: string; note: string };
type Group = { title: string; items: Item[] };

const groups: Group[] = [
  {
    title: "Agentes de código",
    items: [
      {
        name: "Claude Code",
        note: "Mi caballo de batalla. La GUI me deja rotar entre varias sesiones (una por frente) sin perder contexto.",
      },
      {
        name: "Codex",
        note: "Lo corro en paralelo a Claude Code para frentes disjuntos. Cada agente en su propia sesión, como tabs.",
      },
      {
        name: "Cursor / VS Code",
        note: "Editor cuando toco código a mano o reviso lo que dejaron los agentes.",
      },
    ],
  },
  {
    title: "Cómo les doy ojos",
    items: [
      {
        name: "Playwright MCP",
        note: "Lo más importante de mi loop de E2E: el agente ve el navegador de verdad — prueba, captura, encuentra el bug y se corrige.",
      },
      {
        name: "bash + git",
        note: "El sustrato de todo. Workspaces aislados, mirrors bare, hooks anti-push. Nada de framework pesado.",
      },
    ],
  },
  {
    title: "Infra y deploy",
    items: [
      {
        name: "Next.js",
        note: "Para apps y para este mismo blog.",
      },
      {
        name: "Supabase + Vercel",
        note: "El stack del producto en 021.",
      },
      {
        name: "Dokku",
        note: "Para deploys self-hosted simples — incluido este sitio.",
      },
    ],
  },
  {
    title: "Setup",
    items: [
      { name: "macOS", note: "Mi entorno diario." },
      { name: "zsh", note: "Shell, con helpers propios para los workspaces por tarea." },
    ],
  },
];

export default function Uses() {
  return (
    <main>
      <article>
        <div className="wrap">
          <div className="meta">uses</div>
          <h1>Con qué construyo</h1>
          <p className="lead">
            La pregunta que más me hacen después de ver mi workflow: &quot;¿qué usás?&quot;.
            Acá está el stack real — no el aspiracional. Si una herramienta está en esta
            lista, la abrí hoy.
          </p>

          {groups.map((g) => (
            <section key={g.title} className="uses-group">
              <h2>{g.title}</h2>
              <dl className="uses-list">
                {g.items.map((it) => (
                  <div key={it.name} className="uses-row">
                    <dt>{it.name}</dt>
                    <dd>{it.note}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <p className="lead" style={{ marginTop: "2.5rem" }}>
            Lo importante no son las herramientas exactas — es la estructura alrededor.
            De eso escribo en los{" "}
            <a href="/#posts">posts</a>.
          </p>
        </div>
      </article>
    </main>
  );
}
