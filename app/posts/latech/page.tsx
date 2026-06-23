import type { Metadata } from "next";
import { getPost } from "@/lib/posts";
import { JsonLd, blogPostJsonLd } from "@/lib/jsonld";

const post = getPost("latech");

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

export default function Latech() {
  return (
    <main>
      <article>
        <JsonLd data={blogPostJsonLd(post)} />
        <div className="wrap">
          <div className="meta">
            {post.dateLabel} · {post.tags.join(" · ")} · {post.readingMin} min
          </div>
          <h1>Latech: IA aplicada para empresas que no nacieron digitales</h1>
          <p className="lead">
            En 2023 fundé{" "}
            <a href="https://latech.lat" target="_blank" rel="noopener">
              <b>Latech</b> (Latin American Tech Solutions)
            </a>
            , una software factory en Lima que lleva inteligencia artificial y
            software a medida a empresas peruanas y de LATAM. No vendo modelos ni
            demos: resuelvo procesos que hoy alguien hace a mano. Este post es para
            qué existe Latech, qué construimos, y la única lección que se repite en
            cada proyecto.
          </p>

          <h2>El problema: IA donde no hay datos ni proceso</h2>
          <p>
            La mayoría de las empresas con las que trabajo no nacieron digitales.
            Operan con WhatsApp, Excel, un ERP viejo y conocimiento que vive en la
            cabeza de tres personas clave. Cuando llega la ola de la IA, la pregunta
            que reciben es &quot;¿qué modelo usás?&quot; — y esa es la pregunta
            equivocada. <b>La IA no se justifica por novedad, se justifica por
            impacto.</b> Un agente que contesta lindo pero no está conectado a la
            información real del negocio es una demo cara.
          </p>
          <p>
            Latech existe para cerrar esa brecha: conectar la IA a los datos, los
            sistemas y los procesos que la empresa ya tiene, y recién ahí
            automatizar.
          </p>

          <h2>Qué construimos</h2>
          <ul>
            <li>
              <b>Agentes de IA para WhatsApp Business</b> — atención, ventas,
              soporte y seguimiento, conectados al CRM/ERP del cliente.
            </li>
            <li>
              <b>Automatización de procesos</b> — sacar el trabajo repetitivo del
              Excel y del copy-paste entre sistemas.
            </li>
            <li>
              <b>Apps y plataformas a medida</b> con IA integrada, no pegada
              encima.
            </li>
            <li>
              <b>Analytics y BI</b> para decidir con datos, no con intuición.
            </li>
            <li>
              <b>Integraciones</b> entre ERP, CRM e inventario que hoy no se hablan.
            </li>
            <li>
              <b>Company Brain</b> — centralizar el conocimiento disperso de la
              empresa en una memoria consultable. (Escribí{" "}
              <a href="/posts/company-brain">por qué la clave no fue RAG</a>.)
            </li>
          </ul>

          <h2>Con quién lo hicimos</h2>
          <p>
            Estuve hands-on en cada entrega, no solo dirigiendo: <b>Arca Continental
            Lindley</b>, <b>Corporación Montana</b>, <b>Rimac Seguros</b>,{" "}
            <b>Pits</b>, BJP, Dialogarte, Emma y P&amp;A — chatbots, portales,
            back-offices, agentes y servicios de datos en producción. Dos de esos
            casos están documentados en el sitio:
          </p>
          <ul>
            <li>
              <a
                href="https://latech.lat/casos/corporacion-montana-agente-ia-whatsapp"
                target="_blank"
                rel="noopener"
              >
                Corporación Montana — agente IA para WhatsApp Business
              </a>
            </li>
            <li>
              <a
                href="https://latech.lat/casos/pits-courier-erp-mensajeria"
                target="_blank"
                rel="noopener"
              >
                Pits — de la operación manual a un ERP de mensajería conectado
              </a>
            </li>
          </ul>

          <h2>Cómo trabajamos (y cómo cobramos)</h2>
          <p>
            Tres modelos, según el momento de la empresa:
          </p>
          <ul>
            <li>
              <b>Por proyecto</b> — alcance cerrado, entrega definida.
            </li>
            <li>
              <b>Tech Partner</b> — equipo de tecnología dedicado mes a mes, desde{" "}
              <b>$5,000 USD/mes</b>. Es el modelo que más usamos: la IA aplicada no
              es un entregable único, es una capacidad que se mantiene.
            </li>
            <li>
              <b>Tu Startup</b> — del MVP al producto, para founders no técnicos.
            </li>
          </ul>

          <h2>La lección que se repite</h2>
          <div className="quote">
            La IA no arregla un proceso roto: lo acelera. El valor no está en el
            modelo, está en conectarlo a los datos, los permisos y el proceso real
            del negocio. Esa es toda la diferencia entre una demo y algo que la
            empresa usa todos los días.
          </div>
          <p>
            Es el mismo patrón que aplico en todo lo que construyo —{" "}
            <a href="/posts/ship-while-sleep">aislar, dar fuente de verdad, hacer
            cada paso verificable</a>. Cambia el cliente, no la receta.
          </p>

          <p>
            Si tu empresa tiene un proceso que duele y sospechás que la IA podría
            resolverlo,{" "}
            <a href="https://latech.lat" target="_blank" rel="noopener">
              eso es exactamente lo que hacemos en Latech
            </a>
            . O{" "}
            <a
              href="https://www.linkedin.com/in/alonso-grimaldo-3a2917186/"
              target="_blank"
              rel="noopener"
            >
              escribime
            </a>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
