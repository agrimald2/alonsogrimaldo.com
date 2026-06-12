import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/lib/posts";

const post = getPost("worktrees-vs-clones");

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

export default function WorktreesVsClones() {
  return (
    <main>
      <article>
        <div className="wrap">
          <div className="meta">
            {post.dateLabel} · {post.tags.join(" · ")} · {post.readingMin} min
          </div>
          <h1>¿Worktrees o clones?</h1>
          <p className="lead">
            Cuando compartí mi workflow de agentes autónomos, esta fue la pregunta que
            más se repitió: <b>&quot;¿por qué clones reales y no git worktrees?&quot;</b>.
            Respuesta corta: con un agente, worktrees andan. Con varios agentes
            autónomos en paralelo, se rompen — y se rompen feo.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-worktrees.jpg"
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
            explicar. El problema de fondo no era ningún bug exótico: los worktrees{" "}
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

          <p>
            El patrón completo — workspaces, puertos, loop de E2E auto-correctivo —
            está explicado interactivo en{" "}
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
