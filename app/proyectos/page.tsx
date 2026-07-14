import type { Metadata } from "next";
import { pageMetadata } from "@/lib/meta";

export const metadata: Metadata = pageMetadata({
  title: "Proyectos",
  description:
    "Experimentos y proyectos de Alonso Grimaldo: el workflow de agentes autónomos ship-while-sleep y una proyección electoral interactiva hecha por un agente.",
  path: "/proyectos",
});

type Project = {
  name: string;
  tagline: string;
  desc: string;
  url: string;
  tags: string[];
};

const projects: Project[] = [
  {
    name: "Ship while you sleep",
    tagline: "El patrón de agentes autónomos que usamos en 021",
    desc: "Sitio interactivo que explica, con terminales y diagramas, cómo dejar objetivos grandes corriendo y volver a algo 99% prod-ready: workspaces aislados por tarea, bloques de puertos, y un agente de E2E que se auto-corrige.",
    url: "https://ship.alonsogrimaldo.com",
    tags: ["workflow", "agentes"],
  },
  {
    name: "Proyección electoral Perú 2026",
    tagline: "Un agente vs el promedio nacional",
    desc: "Página interactiva donde podés mover los supuestos de la proyección de segunda vuelta y ver cómo cambia el resultado. Los datos los scrapeó un agente de la API oficial de la ONPE, proyectando por zona en vez de promedio nacional.",
    url: "https://elecciones.alonsogrimaldo.com",
    tags: ["agentes", "datos"],
  },
];

export default function Proyectos() {
  return (
    <main>
      <article>
        <div className="wrap">
          <div className="meta">proyectos</div>
          <h1>Cosas que construí</h1>
          <p className="lead">
            Experimentos y herramientas — casi todos salieron de una pregunta concreta
            o de un rato de curiosidad. La mayoría los construí con el mismo workflow de
            agentes del que escribo.
          </p>

          {projects.map((p) => (
            <a
              key={p.name}
              className="proj-card"
              href={p.url}
              target="_blank"
              rel="noopener"
            >
              <div className="proj-head">
                <h3>{p.name}</h3>
                <span className="proj-arrow">↗</span>
              </div>
              <p className="proj-tagline">{p.tagline}</p>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tags.map((t) => (
                  <span key={t} className="proj-tag">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </article>
    </main>
  );
}
