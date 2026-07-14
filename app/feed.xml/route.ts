import { posts } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";

export const dynamic = "force-static";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/posts/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/posts/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      ${p.tags.map((t) => `<category>${esc(t)}</category>`).join("\n      ")}
    </item>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Alonso Grimaldo</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Construyo producto con agentes autónomos. Workflows, agentes y aprendizajes.</description>
    <language>es</language>
    <lastBuildDate>${new Date(`${posts[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
