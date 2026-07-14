import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/lib/posts";
import { JsonLd, faqJsonLd, postPageJsonLd } from "@/lib/jsonld";
import { postMetadata } from "@/lib/meta";
import { AuthorBox, PostMeta } from "@/lib/post-ui";

const post = getPost("worktrees-vs-clones");

export const metadata: Metadata = postMetadata(post, { hasEnglish: true });

const faq = [
  {
    q: "¿Por qué los git worktrees fallan con agentes en paralelo?",
    a: "Porque todos los worktrees comparten el mismo .git: un gc --prune, reset --hard o branch -D de un agente puede afectar a todos; git no permite la misma rama checkouteada en dos worktrees; y config y hooks se heredan del padre. Con agentes autónomos nadie coordina ese estado compartido.",
  },
  {
    q: "¿No es lento clonar un repo por cada tarea?",
    a: "No si clonás desde un mirror bare local: git clone --mirror una sola vez contra el remoto, y después cada tarea clona del mirror — local, instantáneo, sin red.",
  },
  {
    q: "¿Cuándo conviene seguir usando worktrees?",
    a: "Para un fix rápido en un solo repo, con un solo agente o trabajando solo: son más livianos, más rápidos de crear, y sin concurrencia el riesgo de cruce no existe.",
  },
];

export default function WorktreesVsClones() {
  return (
    <main>
      <article>
        <JsonLd data={postPageJsonLd(post, [faqJsonLd(faq)])} />
        <div className="wrap">
          <PostMeta post={post} />
          <h1>¿Worktrees o clones?</h1>
          <p className="meta">
            <a href="/en/posts/worktrees-vs-clones">Read this post in English →</a>
          </p>
          <div className="tldr">
            <span className="tldr-label">Respuesta corta</span>
            <p>
              Los git worktrees fallan con múltiples agentes autónomos porque
              comparten el mismo <code>.git</code>: las operaciones destructivas, el
              lock de ramas y los hooks heredados cruzan estado entre tareas. La
              alternativa que uso en producción: clones reales desde un mirror bare
              local — clonar es instantáneo y cada tarea queda 100% aislada.
            </p>
          </div>
          <p className="lead">
            Cuando compartí mi workflow de agentes autónomos, esta fue la pregunta que
            más se repitió: <b>&quot;¿por qué clones reales y no git worktrees?&quot;</b>.
            Respuesta corta: con un agente, worktrees andan. Con varios agentes
            autónomos en paralelo, se rompen — y se rompen feo.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-worktrees.webp"
              alt="Ilustración en tinta: de un árbol madre bajo campana de vidrio, un jardinero toma esquejes y los planta en macetas separadas atendidas por pequeños robots; al fondo, varios jardineros forcejean con un solo árbol enredado"
              width={1400}
              height={933}
              priority
            />
          </figure>

          <h2>El día que entendí el problema</h2>
          <p>
            Arranqué como cualquiera: <code>git worktree add</code> por tarea. Liviano,
            rápido, sin duplicar el repo. Hasta que empecé a correr varios agentes a la
            vez y aparecieron <b>archivos corruptos y cruces de rama</b> que no podía
            explicar. El problema de fondo no era ningún bug exótico:{" "}
            <a
              href="https://git-scm.com/docs/git-worktree"
              target="_blank"
              rel="noopener"
            >
              los worktrees
            </a>{" "}
            <b>comparten el mismo .git</b>. Todo lo que un agente hace sobre ese estado
            compartido les pasa a todos.
          </p>
          <ul>
            <li>
              Un agente que se manda un <code>git gc --prune</code>, un{" "}
              <code>reset --hard</code>, un <code>branch -D</code> o reescribe historia
              puede afectar a <b>todos</b> los worktrees a la vez.
            </li>
            <li>
              Git no permite la misma rama checkouteada en dos worktrees. Suena menor,
              pero cuando dos agentes autónomos deciden trabajar sobre la misma base,
              los casos borde son feos: uno de los dos arranca en un estado que no
              esperaba.
            </li>
            <li>
              Config y hooks se <b>heredan del padre</b>. Un agente que toca{" "}
              <code>.git/config</code> o instala un hook afecta a todos los demás.
            </li>
          </ul>
          <p>
            Con un solo agente, nada de esto duele: vos coordinás. Con agentes
            autónomos, nadie coordina — la estructura tiene que hacerlo.
          </p>

          <h2>La salida: clones reales desde un mirror bare</h2>
          <p>
            La objeción obvia a los clones es el costo: clonar un repo grande por cada
            tarea es lento. La pieza que lo arregla es un <b>mirror bare local</b>:
            clonás una vez del remoto, y después cada tarea clona <b>del mirror</b> —
            local, instantáneo, sin red.
          </p>
          <pre>
            <code>{`# una vez por repo: el mirror local
git clone --mirror git@github.com:org/web.git ~/.mirrors/web.git

# por cada tarea: clon real desde el mirror (instantáneo)
git clone ~/.mirrors/web.git tasks/checkout-v2/web
cd tasks/checkout-v2/web
git checkout -b checkout-v2 origin/staging

# refrescar el mirror cuando haga falta
git --git-dir ~/.mirrors/web.git fetch --prune`}</code>
          </pre>
          <p>
            Cada tarea queda <b>100% aislada</b>: archivos, ramas, config y hooks
            propios. Una macana solo rompe su tarea. Y como cada clon tiene su{" "}
            <code>.git</code>, le instalo a cada uno un <b>hook anti-push</b> a
            staging/main sin ensuciar a los demás — el agente trabaja libre en su rama,
            lo importante queda protegido.
          </p>

          <h2>La capa fina de helpers</h2>
          <p>
            Nada de framework pesado: <b>bash + git</b>. Un comando (<code>task-new</code>)
            que en una pasada: clona del mirror, ramea desde la base, hace el pull/render
            del env, asigna un <b>bloque de puertos propio</b> (para que dos agentes no
            se pisen ni los puertos), instala el hook y crea la carpeta de reportes E2E.
            El teardown (<code>task-rm</code>) aborta si hay cambios sin commitear —
            nunca tirás trabajo por accidente.
          </p>

          <h2>Worktrees vs clones, en una tabla</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Worktrees</th>
                  <th>Clones desde mirror bare</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Aislamiento</b></td>
                  <td>Comparten .git: gc, reset, branch -D cruzan tareas</td>
                  <td>Total: cada tarea tiene su propio .git</td>
                </tr>
                <tr>
                  <td><b>Misma rama en dos tareas</b></td>
                  <td>Git lo prohíbe → casos borde feos entre agentes</td>
                  <td>Sin restricción: cada clon es independiente</td>
                </tr>
                <tr>
                  <td><b>Config y hooks</b></td>
                  <td>Heredados del padre: un agente afecta a todos</td>
                  <td>Propios por clon (incluido hook anti-push)</td>
                </tr>
                <tr>
                  <td><b>Costo de crear</b></td>
                  <td>Muy barato</td>
                  <td>Instantáneo si clonás del mirror local</td>
                </tr>
                <tr>
                  <td><b>Disco</b></td>
                  <td>Mínimo</td>
                  <td>Más uso, mitigado por el mirror compartido</td>
                </tr>
                <tr>
                  <td><b>Úsalo cuando</b></td>
                  <td>Fix rápido, un solo agente, sin concurrencia</td>
                  <td>Varios agentes autónomos en paralelo</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cuándo los worktrees siguen ganando</h2>
          <p>
            No es dogma. Para un <b>fix rápido en un solo repo</b>, con un solo agente
            (o vos solo), un worktree sigue siendo la herramienta correcta: más liviano,
            más rápido de crear, y el riesgo de cruce no existe porque no hay
            concurrencia. Yo mantengo las dos cosas: worktrees para fixes puntuales,
            clones aislados para features con agentes corriendo en paralelo.
          </p>

          <div className="quote">
            La regla que me quedó: el aislamiento no es para vos — es para que dos
            procesos autónomos nunca tengan que coordinar a través de estado compartido.
          </div>

          <h2>Preguntas frecuentes</h2>
          {faq.map(({ q, a }) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}

          <p>
            El patrón completo — workspaces, puertos, loop de E2E auto-correctivo —
            está explicado interactivo en{" "}
            <a href="https://ship.alonsogrimaldo.com/" target="_blank" rel="noopener">
              ship.alonsogrimaldo.com
            </a>
            .
          </p>
          <AuthorBox />
        </div>
      </article>
    </main>
  );
}
