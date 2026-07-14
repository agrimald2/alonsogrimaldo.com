import type { Metadata } from "next";
import { JsonLd, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/meta";

export const metadata: Metadata = pageMetadata({
  title: "Now",
  description:
    "En qué está trabajando Alonso Grimaldo ahora mismo: 021, LaTech, y experimentos con agentes autónomos.",
  path: "/now",
});

const UPDATED = "junio 2026";
const UPDATED_ISO = "2026-06-14";

const nowJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  url: "https://alonsogrimaldo.com/now",
  name: "Now — Alonso Grimaldo",
  inLanguage: "es",
  dateModified: UPDATED_ISO,
  about: { "@id": "https://alonsogrimaldo.com/#person" },
  isPartOf: { "@id": "https://alonsogrimaldo.com/#website" },
};

export default function Now() {
  return (
    <main>
      <article>
        <JsonLd data={[personJsonLd, websiteJsonLd, nowJsonLd]} />
        <div className="wrap">
          <div className="meta">
            now · actualizado <time dateTime={UPDATED_ISO}>{UPDATED}</time>
          </div>
          <h1>En qué ando ahora</h1>
          <p className="lead">
            Esta es una <a href="https://nownownow.com/about" target="_blank" rel="noopener">página /now</a>:
            no mi CV, sino en qué estoy enfocado este mes. Si la fecha de arriba quedó
            vieja, mandame un tirón de orejas.
          </p>

          <h2>Construyendo</h2>
          <ul>
            <li>
              <b>021</b> — como Founding Engineer, en el motor de agentes que lleva una
              idea de negocio a specs y prompts ejecutables. Mucho tiempo en cómo los
              agentes mantienen contexto y se coordinan.
            </li>
            <li>
              <b>LaTech</b> — dirigiendo proyectos de software e IA para clientes
              corporativos en LATAM.
            </li>
            <li>
              <b>Mi workflow de agentes autónomos</b> — refinando el patrón de{" "}
              workspaces aislados + loop de E2E auto-correctivo que documento en este
              blog y en{" "}
              <a href="https://ship.alonsogrimaldo.com" target="_blank" rel="noopener">
                ship.alonsogrimaldo.com
              </a>
              .
            </li>
          </ul>

          <h2>Escribiendo</h2>
          <p>
            Acabo de lanzar este blog y los primeros posts salieron de preguntas reales
            que me hizo la comunidad dev/LLM. Próximos temas en la cabeza: cómo
            estructurar el contexto entre agentes, y qué cambia cuando el agente cierra
            su propio loop de calidad.
          </p>

          <h2>Pensando</h2>
          <p>
            En cómo sacar al humano del cuello de botella sin sacar al humano del
            control. La línea entre &quot;el agente decide&quot; y &quot;el agente
            propone y espera OK&quot; es donde está casi todo lo interesante.
          </p>

          <p className="lead" style={{ marginTop: "2.5rem" }}>
            ¿Estás en algo parecido? <a
              href="https://www.linkedin.com/in/alonso-grimaldo-3a2917186/"
              target="_blank"
              rel="noopener"
            >
              Hablemos
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
