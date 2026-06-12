import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <main>
      <header className="hero">
        <div className="wrap">
          <span className="kick">builder · agentes autónomos</span>
          <h1>
            Hola, soy Alonso.
            <br />
            Construyo producto <span className="g">con agentes</span>.
          </h1>
          <p className="sub">
            Trabajo en <b>021</b> construyendo producto con agentes autónomos, y llevo{" "}
            <b>LaTech</b>, donde armamos software para clientes en LATAM. Gran parte de
            mi día es diseñar workflows donde los agentes <b>iteran, prueban y se
            corrigen solos</b> — y acá escribo lo que voy aprendiendo.
          </p>
        </div>
      </header>

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
