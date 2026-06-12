import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/lib/posts";

const post = getPost("agente-proyeccion-electoral");

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    url: `https://alonsogrimaldo.com/posts/${post.slug}`,
  },
};

export default function AgenteProyeccionElectoral() {
  return (
    <main>
      <article>
        <div className="wrap">
          <div className="meta">
            {post.dateLabel} · {post.tags.join(" · ")} · {post.readingMin} min
          </div>
          <h1>Puse a mi agente a proyectar la segunda vuelta</h1>
          <p className="lead">
            Me mataba la ansiedad electoral. Con el <b>96.4% de actas contabilizadas</b>,
            Sánchez iba arriba por ~41 mil votos y todos daban la elección por cerrada.
            Así que le pedí a un agente de AI que mirara los datos de verdad — y la
            respuesta cambió todo.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-elecciones.jpg"
              alt="Roberto Sánchez y Keiko Fujimori, candidatos de la segunda vuelta presidencial de Perú 2026"
              width={1062}
              height={700}
              priority
            />
            <figcaption>
              Roberto Sánchez (foto: Ministerio de Comercio Exterior y Turismo, CC BY
              2.0) y Keiko Fujimori (foto: La Prensa Gráfica, CC BY 3.0), vía Wikimedia
              Commons.
            </figcaption>
          </figure>

          <div className="callout">
            <p>
              La página interactiva está viva: podés mover los supuestos y ver cómo
              cambia la proyección en{" "}
              <a
                href="https://elecciones.alonsogrimaldo.com/"
                target="_blank"
                rel="noopener"
              >
                elecciones.alonsogrimaldo.com
              </a>
            </p>
          </div>

          <h2>El pedido</h2>
          <p>
            Una sola instrucción: scrapear la <b>API oficial de la ONPE</b>, región por
            región, y proyectar las actas pendientes. Nada de encuestas ni intuición —
            solo el padrón de lo que faltaba contar y cómo venía votando cada zona.
          </p>

          <h2>Lo que encontró</h2>
          <ul>
            <li>
              Al <b>extranjero</b> solo le habían contado el <b>34%</b> de sus actas — y
              ahí Fujimori arrasaba con <b>64.6%</b>.
            </li>
            <li>
              <b>Lima</b> tenía <b>915 actas pendientes</b>, y también la favorecía
              (63.5%).
            </li>
            <li>
              Es decir: la mayoría de los votos por contar venía de territorio favorable
              a la candidata que iba <b>perdiendo</b>.
            </li>
          </ul>

          <h2>El error típico (y cómo evitarlo)</h2>
          <p>
            La proyección ingenua reparte las actas pendientes con el{" "}
            <b>promedio nacional</b> — y con ese método, el resultado no se movía. El
            método correcto proyecta <b>cada zona con su propio patrón de voto</b>. Con
            eso, el resultado se daba vuelta: <b>Fujimori ganaría por ~53 mil votos</b>{" "}
            (0.29 puntos). Y en todos los escenarios que probamos — actas observadas
            anuladas parcialmente, extranjero votando distinto — el margen se mantenía
            entre <b>+31 mil y +64 mil</b> para ella.
          </p>

          <h2>Lo que me importa no es el resultado</h2>
          <p>
            Es el proceso. En <b>15 minutos</b>, un agente:
          </p>
          <ul>
            <li>extrajo los datos de la API oficial, región por región,</li>
            <li>armó el modelo de proyección por zona,</li>
            <li>lo validó por dos vías independientes (Python y Excel),</li>
            <li>
              y publicó una{" "}
              <a
                href="https://elecciones.alonsogrimaldo.com/"
                target="_blank"
                rel="noopener"
              >
                página interactiva
              </a>{" "}
              donde cualquiera puede mover los supuestos y ver cómo cambia la
              proyección.
            </li>
          </ul>
          <p>
            Eso antes era una semana de un equipo de datos. La diferencia no la hizo el
            modelo — la hizo darle al agente <b>una fuente de verdad</b> (la API
            oficial) y <b>forma de validar</b> su propio trabajo (dos implementaciones
            independientes que tienen que coincidir). Las mismas dos cosas que pido en
            cualquier handoff de código.
          </p>

          <div className="quote">
            Un agente sin fuente de verdad alucina. Un agente sin forma de validar,
            convence. Con las dos cosas, proyecta.
          </div>

          <p>
            Si te interesa el workflow detrás de esto —
            cómo estructuro agentes para que verifiquen sus propias iteraciones — está
            en{" "}
            <a href="https://ship.alonsogrimaldo.com/" target="_blank" rel="noopener">
              ship.alonsogrimaldo.com
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
