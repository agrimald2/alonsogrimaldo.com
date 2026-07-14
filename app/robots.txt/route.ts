const SITE = "https://alonsogrimaldo.com";

// Route handler en vez de app/robots.ts porque MetadataRoute.Robots no soporta
// la directiva Content-Signal (contentsignals.org).
export const dynamic = "force-static";

export function GET() {
  const body = `User-Agent: *
Allow: /

Content-Signal: search=yes, ai-train=yes, ai-input=yes

Sitemap: ${SITE}/sitemap.xml
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
