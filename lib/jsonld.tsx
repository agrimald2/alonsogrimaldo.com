import type { Post } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";
const LINKEDIN = "https://www.linkedin.com/in/alonso-grimaldo-3a2917186/";
const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Alonso Grimaldo",
  url: SITE,
  image: `${SITE}/img/alonso.webp`,
  jobTitle: "AI Engineer · Founding Engineer",
  description:
    "Founding Engineer en 021, founder de LaTech y ex-CTO de VICI (adquirida por Tiendanube). Construye producto con agentes autónomos y escribe sobre cómo trabaja.",
  worksFor: { "@type": "Organization", name: "021", url: "https://from021.io" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Université Paris-Sorbonne" },
  knowsAbout: [
    "Agentes autónomos de IA",
    "Claude Code",
    "Workflows de desarrollo con agentes",
    "LLMs en producción",
    "Git worktrees y paralelización de agentes",
    "E2E testing automatizado",
    "RAG y grafos de conocimiento",
    "Automatización de WhatsApp Business",
  ],
  knowsLanguage: ["es", "en", "fr"],
  nationality: { "@type": "Country", name: "Perú" },
  homeLocation: { "@type": "Place", name: "Argentina" },
  sameAs: [LINKEDIN, "https://github.com/agrimald2", "https://x.com/alonsogrimal2"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Alonso Grimaldo",
  url: SITE,
  inLanguage: "es",
  description:
    "Construyo producto con agentes autónomos. Workflows, agentes y aprendizajes.",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
};

export const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE}/sobre-mi#profilepage`,
  url: `${SITE}/sobre-mi`,
  inLanguage: "es",
  mainEntity: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
};

export function blogPostJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "es",
    image: `${SITE}/posts/${post.slug}/opengraph-image`,
    url: `${SITE}/posts/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/posts/${post.slug}` },
    articleSection: post.tags[0],
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    keywords: post.tags.join(", "),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "article .lead"],
    },
  };
}

export function breadcrumbJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE },
      { "@type": "ListItem", position: 2, name: "Posts", item: `${SITE}/#posts` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// Los @id (#person, #website) solo resuelven si el nodo referenciado está en la
// misma página: incluir personJsonLd y websiteJsonLd junto a cualquier bloque
// que los referencie.
export function postPageJsonLd(post: Post, extra: object[] = []) {
  return [personJsonLd, websiteJsonLd, blogPostJsonLd(post), breadcrumbJsonLd(post), ...extra];
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
