import type { Metadata } from "next";
import type { Post } from "@/lib/posts";

const SITE = "https://alonsogrimaldo.com";

// alternates también se mergea shallow: cada página que define canonical debe
// re-declarar el feed para no perderlo.
const FEED_TYPES = {
  "application/rss+xml": [{ url: "/feed.xml", title: "Alonso Grimaldo — posts" }],
};

// Metadata se mergea shallow entre layout y página: si una página no define
// openGraph/twitter hereda el objeto entero del layout (con título y URL de la
// home). Estos helpers garantizan og + twitter + canonical correctos por página.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE}${path === "/" ? "" : path}`;
  const resolvedTitle = title ?? "Alonso Grimaldo";
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: FEED_TYPES },
    openGraph: {
      type: "website",
      siteName: "Alonso Grimaldo",
      title: resolvedTitle,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
    },
  };
}

export function postMetadata(post: Post): Metadata {
  const url = `${SITE}/posts/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/posts/${post.slug}`, types: FEED_TYPES },
    openGraph: {
      type: "article",
      siteName: "Alonso Grimaldo",
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: ["Alonso Grimaldo"],
      tags: post.tags,
      title: post.title,
      description: post.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}
