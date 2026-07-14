import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Solo la home lleva lastModified derivado de los posts (su listado cambia
  // con cada publicación). Las páginas estáticas lo omiten: un lastmod
  // inventado hace que Google desconfíe del campo en todo el sitio.
  const pages = ["/sobre-mi", "/proyectos", "/uses", "/now"];
  return [
    {
      url: SITE,
      lastModified: new Date(posts[0].updated ?? posts[0].date),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((p) => ({
      url: `${SITE}${p}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE}/posts/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...ENGLISH_SLUGS.map((slug) => {
      const post = posts.find((p) => p.slug === slug)!;
      return {
        url: `${SITE}/en/posts/${slug}`,
        lastModified: new Date(post.updated ?? post.date),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }),
  ];
}

const ENGLISH_SLUGS = ["ship-while-sleep", "worktrees-vs-clones"];
