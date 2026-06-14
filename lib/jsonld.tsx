import type { Post } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";
const LINKEDIN = "https://www.linkedin.com/in/alonso-grimaldo-3a2917186/";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alonso Grimaldo",
  url: SITE,
  image: `${SITE}/img/alonso.jpg`,
  jobTitle: "AI Engineer · Founding Engineer",
  worksFor: { "@type": "Organization", name: "021", url: "https://from021.io" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Université Paris-Sorbonne" },
  knowsLanguage: ["es", "en", "fr"],
  nationality: { "@type": "Country", name: "Perú" },
  homeLocation: { "@type": "Place", name: "Argentina" },
  sameAs: [LINKEDIN, "https://github.com/agrimald2", "https://x.com/alonsogrimal2"],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Alonso Grimaldo",
  url: SITE,
  inLanguage: "es",
  author: { "@type": "Person", name: "Alonso Grimaldo", url: SITE },
};

export function blogPostJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es",
    image: `${SITE}/posts/${post.slug}/opengraph-image`,
    url: `${SITE}/posts/${post.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/posts/${post.slug}` },
    author: {
      "@type": "Person",
      name: "Alonso Grimaldo",
      url: SITE,
      sameAs: [LINKEDIN, "https://github.com/agrimald2", "https://x.com/alonsogrimal2"],
    },
    publisher: { "@type": "Person", name: "Alonso Grimaldo", url: SITE },
    keywords: post.tags.join(", "),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
