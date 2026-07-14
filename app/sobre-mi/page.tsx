import type { Metadata } from "next";
import { JsonLd, personJsonLd, profilePageJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/meta";

export const metadata: Metadata = pageMetadata({
  title: "Sobre mí",
  description:
    "Peruano radicado en Argentina hace 4 años. De digitalizar procesos con ERPs a construir agentes autónomos en 021, pasando por Francia, Alemania y una startup adquirida por Tiendanube. La historia, las decisiones y los errores.",
  path: "/sobre-mi",
});

export default function SobreMi() {
  return (
    <main>
      <article>
        <JsonLd data={[personJsonLd, websiteJsonLd, profilePageJsonLd]} />
        <div className="wrap">
          <div className="meta">sobre mí</div>
          <h1>La versión larga</h1>
          <p className="lead">
            Mi LinkedIn dice &quot;AI Engineer&quot;. Esta es la parte que no entra en
            un perfil: cómo llegué hasta acá, qué decisiones lo torcieron, y por qué
            hoy me obsesiona que un agente pueda corregirse solo.
          </p>

          <h2>Empecé arreglando procesos, no escribiendo código bonito</h2>
          <p>
            Mis primeros años fueron de <b>digitalización</b>: ERPs, CRMs, aplicaciones
            internas para empresas que todavía corrían medio negocio en Excel. No era
            glamoroso, pero me enseñó la lección que todavía aplico todos los días — la
            tecnología solo vale si <b>resuelve un proceso real</b>. El código es el
            medio, nunca el fin.
          </p>

          <h2>Francia, Alemania y aprender a moverme afuera</h2>
          <p>
            Pasé más de dos años entre Francia y Alemania, viviendo, trabajando y
            estudiando Computer Science en la Université Paris-Sorbonne. Volví hablando
            tres idiomas (español, inglés, francés) y, más importante, con la cabeza
            abierta a trabajar con equipos y clientes de cualquier lado. Esa etapa me
            sacó de pensar &quot;en chico&quot;.
          </p>

          <h2>Argentina: donde pasó todo lo importante</h2>
          <p>
            Hace <b>cuatro años me mudé a Argentina</b>, y resultó ser el lugar donde
            despegó lo más importante de mi carrera. Acá hice <b>VICI</b>, el paso por{" "}
            <b>Tiendanube</b>, y hoy <b>021</b>. El ecosistema de startups argentino —
            la velocidad, la gente, la cultura de construir— me cambió el techo de lo
            que creía posible.
          </p>

          <h2>VICI: el pivote que terminó en una adquisición</h2>
          <p>
            Como CTO de <b>VICI</b> lideré la transformación de la empresa: de una
            plataforma tipo Rappi a un <b>asistente de ventas por WhatsApp con IA</b>{" "}
            para restaurantes. Fue mi primer gran &quot;apostar todo a la IA antes de
            que fuera obvio&quot;. Funcionó: la startup fue{" "}
            <a
              href="https://startupslatam.com/tiendanube-adquiere-vici-y-lanza-nuvem-chat-su-nueva-apuesta-en-comercio-conversacional-en-latam/"
              target="_blank"
              rel="noopener"
            >
              <b>adquirida por Tiendanube</b>
            </a>{" "}
            (
            <a
              href="https://latamlist.com/tiendanube-acquires-vici-and-launches-nuvem-chat/"
              target="_blank"
              rel="noopener"
            >
              cobertura en inglés
            </a>
            ), donde después seguí como AI Engineer Manager construyendo
            Chat Nube, el asistente para las tiendas de la plataforma.
          </p>

          <h2>LaTech: software de verdad para clientes de verdad</h2>
          <p>
            En paralelo fundé <b>LaTech (Latin American Tech Solutions)</b>, donde
            dirijo proyectos de software e IA para corporativos — Arca Continental
            Lindley, Montana, Rimac Seguros, Pitts Perú, entre otros. Acá aprendí a
            entregar bajo presión real: deadlines, presupuestos, y clientes que no
            quieren oír de &quot;la última tecnología&quot;, quieren resultados.
          </p>

          <h2>021 y la obsesión actual: agentes que se corrigen solos</h2>
          <p>
            Hoy soy <b>Founding Engineer en 021</b>, construyendo una plataforma
            AI-native que acorta la brecha técnica para Product Managers. Mi día es
            diseñar el motor de LLMs que traduce estrategia de negocio en specs, PRDs y
            prompts ejecutables.
          </p>
          <p>
            Y mi obsesión personal — la que alimenta este blog — es una sola pregunta:{" "}
            <b>
              ¿cómo estructuro un agente para que itere, pruebe y se corrija solo
            </b>
            , sin que yo tenga que ser la niñera del loop? Todo lo que escribo acá sale
            de pelearme con esa pregunta en producción.
          </p>

          <div className="quote">
            La constante en toda mi carrera: no me interesa la tecnología por la
            tecnología. Me interesa sacar al humano del cuello de botella.
          </div>

          <p>
            Si algo de esto resuena —porque estás construyendo algo parecido, o porque
            te chocaste con los mismos problemas— escribime por{" "}
            <a
              href="https://www.linkedin.com/in/alonso-grimaldo-3a2917186/"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            . Las mejores conversaciones salen de ahí.
          </p>
        </div>
      </article>
    </main>
  );
}
