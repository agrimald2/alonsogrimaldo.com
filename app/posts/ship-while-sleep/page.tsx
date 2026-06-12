import type { Metadata } from "next";
import Image from "next/image";
import { posts } from "@/lib/posts";

const post = posts.find((p) => p.slug === "ship-while-sleep")!;
const SITE = "https://ship.alonsogrimaldo.com/";

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

export default function ShipWhileSleep() {
  return (
    <main>
      <article>
        <div className="wrap">
          <div className="meta">{post.dateLabel} · workflow · agentes</div>
          <h1>Ship while you sleep</h1>
          <p className="lead">
            Dejá objetivos grandes corriendo y volvé a algo <b>99% prod-ready</b>. Este
            es el patrón que usamos en 021 para trabajar con agentes autónomos — y las
            respuestas a las preguntas que más me hicieron cuando lo compartí.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-ship-while-sleep.jpg"
              alt="Ilustración en tinta: una persona duerme en una hamaca mientras tres pequeños robots trabajan aislados en sus escritorios; uno revisa con lupa, otro sella un visto bueno, otro acarrea papeles"
              width={1400}
              height={933}
              priority
            />
          </figure>

          <div className="callout">
            <p>
              Armé un <b>sitio interactivo</b> que explica el patrón completo, con
              terminales y diagramas:{" "}
              <a href={SITE} target="_blank" rel="noopener">
                ship.alonsogrimaldo.com
              </a>
            </p>
          </div>

          <h2>El problema: vos sos el loop</h2>
          <p>
            Le pedís algo grande al agente, vuelve a medias, le repetís el contexto. Dos
            agentes en paralelo se pisan archivos, ramas y puertos. Vos probás a mano,
            encontrás el bug, se lo explicás, y repetís. Te quedás de niñera mirando
            cada paso.
          </p>
          <p>
            La salida no es un framework: es <b>estructura</b>. Cada pieza saca una
            decisión de tus manos y se la da al agente, con barreras para que no rompa
            nada.
          </p>

          <h2>El patrón: cuatro movimientos</h2>
          <ul>
            <li>
              <b>1 · Iterar → prompt.</b> El agente charla el objetivo con vos y genera
              el spec antes de tocar código.
            </li>
            <li>
              <b>2 · Partir → workspace.</b> Si la tarea es grande, la divide y crea un
              workspace aislado por sub-tarea: un <b>clon real</b> de cada repo que toca
              y un <b>bloque de puertos propio</b>. Dos agentes en paralelo nunca
              comparten archivos, ramas ni puertos.
            </li>
            <li>
              <b>3 · Agente E2E.</b> Prueba en el navegador, encuentra bugs, analiza la{" "}
              <b>causa raíz</b> (no el síntoma), aplica el fix y vuelve a probar. El E2E
              está completo recién con <b>3 conversaciones limpias seguidas</b> —
              cualquier fix resetea la racha.
            </li>
            <li>
              <b>4 · Volvés listo.</b> Capturas, feedback y fixes documentados en una
              carpeta de reportes por tarea.
            </li>
          </ul>

          <h2>¿Por qué clones y no worktrees?</h2>
          <p>
            La pregunta que más me hicieron. Arranqué con worktrees: con un agente
            andan, con varios autónomos corriendo a la vez empezaron los archivos
            corruptos y los cruces de rama. El problema de fondo es que los worktrees{" "}
            <b>comparten el mismo .git</b>:
          </p>
          <ul>
            <li>
              Un agente que se manda un <code>gc --prune</code>, <code>reset --hard</code>{" "}
              o <code>branch -D</code> puede afectar a <b>todos</b> los worktrees.
            </li>
            <li>
              Git no deja checkoutear la misma rama en dos worktrees → casos borde feos
              cuando dos agentes autónomos se cruzan.
            </li>
            <li>
              Config y hooks se heredan del padre: un agente que los toca afecta a
              todos.
            </li>
          </ul>
          <p>
            Con <b>clones reales desde un mirror bare local</b>, clonar es instantáneo y
            cada tarea queda 100% aislada — incluido su propio hook anti-push a
            staging/main. Y nada de framework pesado: <b>bash + git</b>, una capa fina
            de helpers que en un comando clona, ramea, renderiza el env, asigna puertos
            e instala el hook.
          </p>

          <h2>El handoff importa más que la verbosidad</h2>
          <p>
            ¿Qué tan detallado tiene que ser el prompt? No es la longitud: es darle al
            agente <b>forma de verificar sus iteraciones</b>, y un handoff{" "}
            <b>específico en el QUÉ / POR QUÉ / criterios, suelto en el CÓMO</b>. Lo que
            le doy por frente:
          </p>
          <ul>
            <li>Síntoma observable.</li>
            <li>
              Causa raíz verificada contra el código, con <code>archivo:línea</code> —
              lo más importante: le saca la ambigüedad, no re-descubre.
            </li>
            <li>
              Dirección del fix + constraints (&quot;NO montes X&quot;, &quot;reutilizá
              Y&quot;) — no línea por línea.
            </li>
            <li>Archivos exactos: principal + cuáles reusar / no tocar.</li>
            <li>Criterios de aceptación testeables.</li>
            <li>Convenciones del repo.</li>
          </ul>
          <p>
            Y lo grande lo parto en <b>frentes disjuntos</b> — archivos que no se cruzan
            — para correrlos en paralelo, cada uno con su propio loop de verificación.
            Cada frente vive en su sesión (GUI de Claude / Codex) y roto entre sesiones
            como tabs: a revisar avances, no a hacer de niñera.
          </p>

          <h2>El resultado</h2>
          <div className="quote">
            &quot;Dejo objetivos grandes corriendo y cuando vuelvo tengo capturas con
            las pruebas que hizo, feedback, cómo se autocorrigió, y gran parte del
            tiempo está 99% prod-ready con ajustes menores.&quot;
          </div>
          <p>
            Lo importante no son los comandos exactos — es la estructura:{" "}
            <b>aislar para escalar</b>, <b>proteger lo crítico</b>, y hacer que el
            agente <b>cierre su propio loop de calidad</b>.
          </p>

          <p>
            <a className="cta" href={SITE} target="_blank" rel="noopener">
              Ver el patrón completo, interactivo →
            </a>
          </p>
        </div>
      </article>
    </main>
  );
}
