import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/sobre-mi", "/proyectos", "/uses", "/now"];
  return [
    {
      url: SITE,
      lastModified: new Date(posts[0].date),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pages.map((p) => ({
      url: `${SITE}${p}`,
      lastModified: new Date(posts[0].date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${SITE}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
