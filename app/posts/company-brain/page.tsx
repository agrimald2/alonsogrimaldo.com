import type { Metadata } from "next";
import Image from "next/image";
import { getPost } from "@/lib/posts";
import { JsonLd, blogPostJsonLd } from "@/lib/jsonld";

const post = getPost("company-brain");

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/posts/${post.slug}` },
  openGraph: {
    type: "article",
    publishedTime: post.date,
    authors: ["Alonso Grimaldo"],
    tags: post.tags,
    title: post.title,
    description: post.description,
    url: `https://alonsogrimaldo.com/posts/${post.slug}`,
  },
};

export default function CompanyBrain() {
  return (
    <main>
      <article>
        <JsonLd data={blogPostJsonLd(post)} />
        <div className="wrap">
          <div className="meta">
            {post.dateLabel} · {post.tags.join(" · ")} · {post.readingMin} min
          </div>
          <h1>Le di un cerebro a la empresa</h1>
          <p className="lead">
            En 021 construimos el <b>Company Brain</b>: un sistema que se traga todos
            los documentos de una organización —estrategia, producto, decisiones, docs
            técnicos— y responde preguntas sobre ellos. La parte interesante no es que
            funcione. Es <b>por qué</b> funciona — y por qué la respuesta no fue
            &quot;metele RAG&quot;.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-company-brain.jpg"
              alt="Ilustración en tinta: documentos dispersos entran a una máquina-cerebro que los conecta con hilos en una red de nodos"
              width={1400}
              height={933}
              priority
            />
          </figure>

          <h2>El problema: la empresa sabe, pero no puede recordar</h2>
          <p>
            Toda organización acumula conocimiento en miles de documentos: el PRD de
            hace ocho meses, el OKR del trimestre, la decisión técnica que alguien
            escribió en un Confluence y nadie volvió a abrir. El conocimiento{" "}
            <b>existe</b>, pero está desconectado. Nadie puede preguntar &quot;¿cómo se
            relaciona esta iniciativa con nuestros objetivos?&quot; y obtener una
            respuesta con fuentes.
          </p>
          <p>
            La tentación es obvia: <b>RAG vectorial</b>. Cortás los docs en pedazos,
            generás embeddings, y cuando alguien pregunta, traés los chunks más
            parecidos y se los pasás a un LLM. Funciona para una demo. En serio, no.
          </p>

          <h2>Por qué el RAG puro no alcanza</h2>
          <p>
            El vector search responde una sola pregunta: <b>&quot;¿qué se parece a
            esto?&quot;</b>. Eso es útil para &quot;encontrame algo sobre onboarding&quot;.
            Es inútil para las preguntas que la gente realmente hace:
          </p>
          <ul>
            <li>
              <b>&quot;¿Qué depende de qué?&quot;</b> — relaciones, no similitud. El vector
              no sabe que el OKR <i>necesita</i> la capability que <i>construye</i> el
              equipo.
            </li>
            <li>
              <b>&quot;¿Quién dijo esto y cuándo?&quot;</b> — procedencia. Un chunk
              suelto no te dice de qué doc salió ni si sigue vigente.
            </li>
            <li>
              <b>&quot;¿Esto se contradice con aquello?&quot;</b> — conflictos. Dos
              chunks parecidos pueden decir cosas opuestas, y el RAG te los entrega a
              los dos sin avisar.
            </li>
          </ul>
          <p>
            La conclusión a la que llegamos es la misma que aplicamos en todo lo que
            hacemos con agentes: <b>el conocimiento útil no sale de tirar vectores, sale
            de estructura</b>.
          </p>

          <h2>La estructura: un grafo híbrido, no una pila de chunks</h2>
          <p>
            El Company Brain guarda el conocimiento en <b>dos capas</b> sobre un grafo
            (Neo4j), no en un índice plano de vectores:
          </p>
          <ul>
            <li>
              <b>Capa documental.</b> Organización → Archivo → Versión → Chunks
              (con sus embeddings). Esto da el &quot;buscar similar&quot; clásico —
              pero anclado a su origen.
            </li>
            <li>
              <b>Capa semántica.</b> Entidades (objetivos, capabilities, equipos,
              decisiones) conectadas por relaciones reales: <code>OWNS</code>,{" "}
              <code>NEEDS</code>, <code>CONTRIBUTES_TO</code>. Esto responde el
              &quot;qué depende de qué&quot;.
            </li>
          </ul>
          <p>
            Y la pieza que lo cierra: <b>cada entidad y cada relación apunta de vuelta a
            su evidencia</b> — el archivo, el chunk, el fragmento de texto exacto y un
            score de confianza. Nada flota sin fuente. Cuando el sistema afirma algo,
            puede mostrar de dónde lo sacó. (Si leíste mi{" "}
            <a href="/posts/agente-proyeccion-electoral">post sobre la proyección
            electoral</a>, es la misma obsesión: un agente sin fuente de verdad
            alucina.)
          </p>

          <h2>Cómo entra el conocimiento: ingesta en dos tiempos</h2>
          <p>
            Subir un documento no es &quot;guardarlo&quot;. Es procesarlo. Lo partimos en
            dos fases para que la subida sea instantánea y el trabajo pesado pase
            después:
          </p>
          <ul>
            <li>
              <b>Pre-cola (sincrónico, &lt;1s).</b> Valida, deduplica por hash, convierte
              los formatos simples a <b>Markdown canónico</b>, guarda el blob y los
              metadatos, y encola el trabajo. Devuelve un <code>job_id</code> al toque.
            </li>
            <li>
              <b>Post-cola (asincrónico).</b> Un worker hace el enriquecimiento real:
              traduce PDFs/Word a Markdown, clasifica el doc, lo resume, lo chunkea,
              genera embeddings, y —lo importante— <b>extrae entidades y
              relaciones</b> y las resuelve contra el grafo existente (¿esta
              &quot;iniciativa X&quot; es la misma que ya tengo, o una nueva?).
            </li>
          </ul>
          <p>
            Un detalle que nos ahorró dolor: <b>Markdown canónico como fuente de
            verdad</b>. En vez de inventar un JSON distinto por cada tipo de archivo,
            todo se normaliza a Markdown antes de enriquecer. Un solo formato interno,
            un solo pipeline.
          </p>

          <h2>Cómo sale: Ask Mode, agentes que no son magia</h2>
          <p>
            Acá está la parte que conecta con todo lo que escribo. Cuando alguien
            pregunta algo, <b>no</b> hay un agente mágico que &quot;piensa&quot; y
            responde. Hay una <b>máquina de estados determinística</b> de cinco etapas,
            cada una trazable:
          </p>
          <pre>
            <code>{`pregunta
  ↓
[ARQUITECTO]  descompone la pregunta en tareas
  ↓
[ROUTER]      asigna cada tarea a un worker (grafo / vector / KB)
  ↓
[FAN-OUT]     ejecuta las tareas en paralelo
  ↓
[AUDITOR]     deduplica hallazgos, detecta contradicciones
  ↓
[ESTRATEGA]   sintetiza la respuesta final, con evidencia`}</code>
          </pre>
          <p>
            Cada etapa es un agente con un trabajo chico y verificable. El{" "}
            <b>auditor</b> es la pieza clave: antes de responder, busca activamente
            findings que se contradicen y los marca. Un RAG normal te junta todo y
            reza; este sistema te dice &quot;ojo, estos dos documentos no coinciden&quot;.
          </p>
          <p>
            ¿Por qué determinístico y no un agente suelto? Por lo mismo que en mi
            workflow prefiero{" "}
            <a href="/posts/ship-while-sleep">clones aislados y loops de E2E
            verificables</a>: un proceso con etapas claras se puede <b>trazar, auditar y
            arreglar</b>. Un agente que decide todo solo se puede, a lo sumo, rezar.
          </p>

          <h2>Lo que lo hace portable: puertos y adaptadores</h2>
          <p>
            Todo lo de afuera —la base de datos, el grafo, el blob storage, la cola, los
            embeddings— está detrás de <b>interfaces (puertos)</b>. En local corre con
            disco, MySQL y Neo4j en Docker; en producción, con Vercel Blob, Upstash y
            Neo4j cloud. <b>El mismo código, sin tocar una línea de lógica.</b> Eso es lo
            que hace que un agente pueda desarrollar contra una copia local sin
            depender de servicios reales.
          </p>

          <h2>La lección, otra vez</h2>
          <div className="quote">
            RAG te dice qué se parece. Un grafo te dice qué se relaciona, quién lo dijo,
            y qué se contradice. La inteligencia no estaba en el modelo — estaba en la
            estructura que le dimos alrededor.
          </div>

          <figure className="post-fig">
            <Image
              src="/img/company-brain-infografia.jpg"
              alt="Infografía 021: la inteligencia no está en juntar información, está en la estructura que la conecta. Un cajón de notas vs un cerebro-grafo con contexto, relaciones y evidencia."
              width={1024}
              height={1536}
            />
          </figure>
          <p>
            Es el mismo patrón que se repite en todo lo que construyo: <b>aislar, dar
            fuente de verdad, hacer cada paso verificable</b>. Cambia el dominio
            —workspaces, proyecciones electorales, el conocimiento de una empresa
            entera— pero la receta no.
          </p>

          <p>
            Construimos cosas así en{" "}
            <a href="https://from021.io" target="_blank" rel="noopener">
              021
            </a>
            . Si estás peleando con RAG que &quot;casi&quot; funciona, o armando algo
            parecido,{" "}
            <a
              href="https://www.linkedin.com/in/alonso-grimaldo-3a2917186/"
              target="_blank"
              rel="noopener"
            >
              escribime
            </a>{" "}
            — esas conversaciones son las mejores.
          </p>
        </div>
      </article>
    </main>
  );
}
