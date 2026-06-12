import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/posts";

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
    desc: "Dirección estratégica y ejecución de proyectos de software e IA para corporativos: Arca Continental Lindley, Montana, Rimac Seguros, Pitts Perú, entre otros.",
  },
  {
    role: "CTO",
    org: "VICI · adquirida por Tiendanube",
    logo: null,
    period: "2023 — hoy",
    desc: "Lideré la transformación de la empresa hacia un asistente de ventas por WhatsApp con IA para restaurantes — pivote que culminó en la adquisición por Tiendanube.",
  },
  {
    role: "AI Engineer Manager",
    org: "Tiendanube / Nuvemshop",
    logo: "/logos/tiendanube.png",
    period: "2023 — 2025",
    desc: "EM de Chat Nube, el asistente virtual con IA para las tiendas de la plataforma.",
  },
];

export default function Home() {
  return (
    <main>
      <header className="hero">
        <div className="wrap">
          <span className="kick">ai engineer · founder · perú</span>
          <h1>
            Hola, soy Alonso.
            <br />
            Construyo producto <span className="g">con agentes</span>.
          </h1>
          <p className="sub">
            Founding Engineer en <b>021</b>, founder de <b>LaTech</b> y ex-CTO de{" "}
            <b>VICI</b> (adquirida por Tiendanube). Más de 7 años digitalizando
            negocios con IA — hoy, diseñando workflows donde los agentes{" "}
            <b>iteran, prueban y se corrigen solos</b>. Acá escribo lo que voy
            aprendiendo.
          </p>
        </div>
      </header>

      <section id="sobre-mi">
        <div className="wrap">
          <div className="eye">Sobre mí</div>
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
                Viví, trabajé y estudié más de dos años entre Francia y Alemania
                (Computer Science en la Université Paris-Sorbonne), y manejo tres
                idiomas: español, inglés y francés. Hoy estoy de lleno en una cosa:
                construir soluciones con LLMs y agentes que cambien cómo se hace
                software.
              </p>
            </div>
            <figure className="about-fig">
              <Image
                src="/img/home-about.jpg"
                alt="Ilustración en tinta: un artesano dirige tres bancos de trabajo en paralelo, cada uno con su pequeño asistente mecánico"
                width={1000}
                height={1000}
              />
            </figure>
          </div>
        </div>
      </section>

      <section id="experiencia">
        <div className="wrap">
          <div className="eye">Experiencia</div>
          <h2>Dónde estuve construyendo</h2>
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
              <div className="meta">{post.dateLabel}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
