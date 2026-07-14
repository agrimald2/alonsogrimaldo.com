import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/posts";
import { JsonLd, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/meta";

export const metadata: Metadata = pageMetadata({
  description:
    "Founding Engineer en 021, founder de LaTech y CTO de VICI (adquirida por Tiendanube). Construyo producto con agentes autónomos y escribo sobre cómo trabajo.",
  path: "/",
});

const experience = [
  {
    role: "Founding Engineer",
    org: "021",
    logo: "/logos/021.svg",
    period: "2026 — hoy",
    desc: "Plataforma AI-native que acorta la brecha técnica para Product Managers: un motor basado en LLMs que traduce estrategia de negocio en specs, PRDs y prompts listos para asistentes de código.",
  },
  {
    role: "Founder & Director of Technology",
    org: "LaTech — Latin American Tech Solutions",
    logo: "/logos/latech.png",
    period: "2023 — hoy",
    desc: "Dirijo y construyo proyectos de software e IA para corporativos. Estuve hands-on en cada entrega: Arca Continental Lindley, Montana, Rimac Seguros, Pitts Perú, BJP, Dialogarte, Emma, P&A, y más — chatbots, portales, back-offices, agentes y servicios de datos.",
  },
  {
    role: "CTO",
    org: "VICI · adquirida por Tiendanube",
    logo: "/logos/vici.png",
    period: "2023 — hoy",
    desc: "Lideré y programé la transformación de la empresa: de una plataforma tipo Rappi a un asistente de ventas por WhatsApp con IA para restaurantes — pivote que culminó en la adquisición por Tiendanube.",
  },
  {
    role: "AI Engineer Manager",
    org: "Tiendanube / Nuvemshop",
    logo: "/logos/tiendanube.png",
    period: "2023 — 2025",
    desc: "Lideré el equipo y la ingeniería de Chat Nube, el asistente virtual con IA para las tiendas de la plataforma, desde cero hasta producción.",
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd data={[personJsonLd, websiteJsonLd]} />
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="kick">ai engineer · founder · 🇵🇪 en 🇦🇷</span>
            <h1>
              Hola, soy Alonso.
              <br />
              Construyo producto <span className="g">con agentes</span>.
            </h1>
            <p className="sub">
              Founding Engineer en <b>021</b>, founder de <b>LaTech</b> y CTO de{" "}
              <b>VICI</b> (adquirida por Tiendanube). Peruano, hace 4 años en{" "}
              <b>Argentina</b>, donde hice todo lo reciente. Más de 7 años
              digitalizando negocios con IA — hoy, diseñando workflows donde los agentes{" "}
              <b>iteran, prueban y se corrigen solos</b>. Acá escribo lo que voy
              aprendiendo.
            </p>
          </div>
          <figure className="hero-fig">
            <Image
              src="/img/alonso.webp"
              alt="Alonso Grimaldo"
              width={823}
              height={900}
              priority
            />
          </figure>
        </div>
      </header>

      <section id="sobre-mi">
        <div className="wrap">
          <div className="eye">Sobre mí</div>
          <Link className="about-link" href="/sobre-mi">
            <h2>De ERPs a agentes autónomos</h2>
            <div className="about-grid">
              <div>
                <p className="lead">
                  Llevo más de 7 años digitalizando procesos y negocios — ERPs, CRMs,
                  aplicaciones web y soluciones de IA a medida — para empresas de todos
                  los tamaños. Fundé y lideré la tecnología de varias iniciativas,
                  incluida una startup adquirida por Tiendanube.
                </p>
                <p className="lead">
                  Peruano, hace 4 años en Argentina — donde despegó todo lo reciente.
                  Antes, más de dos años entre Francia y Alemania (Computer Science en
                  la Université Paris-Sorbonne). Hoy estoy de lleno en una cosa:
                  construir soluciones con LLMs y agentes que cambien cómo se hace
                  software.
                </p>
                <span className="about-cta">Leer la versión larga →</span>
              </div>
              <figure className="about-fig">
                <Image
                  src="/img/home-about.webp"
                  alt="Ilustración en tinta: un artesano dirige tres bancos de trabajo en paralelo, cada uno con su pequeño asistente mecánico"
                  width={1000}
                  height={1000}
                />
              </figure>
            </div>
          </Link>
        </div>
      </section>

      <section id="experiencia">
        <div className="wrap">
          <div className="eye">Experiencia</div>
          <h2>Dónde estuve construyendo</h2>
          <p className="lead" style={{ marginBottom: "0.5rem" }}>
            No solo dirigí — programé. Decenas de proyectos en producción entre LaTech,
            VICI y Tiendanube; abajo, los hitos.
          </p>
          {experience.map((xp) => (
            <div key={xp.org} className="xp">
              <div className="xp-head">
                <h3>
                  {xp.logo ? (
                    <Image
                      className="xp-logo"
                      src={xp.logo}
                      alt=""
                      aria-hidden
                      width={28}
                      height={20}
                    />
                  ) : null}
                  {xp.role} · <span className="org">{xp.org}</span>
                </h3>
                <span className="period">{xp.period}</span>
              </div>
              <p>{xp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="posts">
        <div className="wrap">
          <div className="eye">Posts</div>
          <h2>Lo último</h2>
          {posts.map((post) => (
            <Link key={post.slug} className="post-card" href={`/posts/${post.slug}`}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className="meta">
                {post.dateLabel} · {post.tags.join(" · ")} · {post.readingMin} min
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
