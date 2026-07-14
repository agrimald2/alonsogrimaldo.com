import Link from "next/link";
import type { Post } from "@/lib/posts";

// Meta line visible de cada post: byline + fecha machine-readable.
// El autor y la fecha también viven en JSON-LD, pero los crawlers de IA
// ponderan lo visible en el cuerpo.
export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="meta">
      Por <Link href="/sobre-mi">Alonso Grimaldo</Link> ·{" "}
      <time dateTime={post.date}>{post.dateLabel}</time>
      {post.updated ? (
        <>
          {" "}
          · actualizado <time dateTime={post.updated}>{post.updated}</time>
        </>
      ) : null}{" "}
      · {post.tags.join(" · ")} · {post.readingMin} min
    </div>
  );
}

export function AuthorBox() {
  return (
    <aside className="author-box">
      <p>
        <b>Alonso Grimaldo</b> — AI Engineer. Founding Engineer en{" "}
        <a href="https://from021.io" target="_blank" rel="noopener">
          021
        </a>
        , founder de{" "}
        <a href="https://latech.lat" target="_blank" rel="noopener">
          LaTech
        </a>{" "}
        y ex-CTO de VICI (adquirida por Tiendanube). Escribe sobre construir
        producto con agentes autónomos. <Link href="/sobre-mi">La versión larga →</Link>
      </p>
    </aside>
  );
}
