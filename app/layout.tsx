import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const LINKEDIN = "https://www.linkedin.com/in/alonso-grimaldo-3a2917186/";

export const metadata: Metadata = {
  metadataBase: new URL("https://alonsogrimaldo.com"),
  title: {
    default: "Alonso Grimaldo",
    template: "%s · Alonso Grimaldo",
  },
  description:
    "Construyo producto con agentes autónomos. Acá escribo sobre cómo trabajo: workflows, agentes y lo que voy aprendiendo en el camino.",
  authors: [{ name: "Alonso Grimaldo", url: LINKEDIN }],
  openGraph: {
    type: "website",
    siteName: "Alonso Grimaldo",
    title: "Alonso Grimaldo",
    description:
      "Construyo producto con agentes autónomos. Workflows, agentes y aprendizajes.",
    url: "https://alonsogrimaldo.com",
  },
  twitter: {
    card: "summary",
    title: "Alonso Grimaldo",
    description:
      "Construyo producto con agentes autónomos. Workflows, agentes y aprendizajes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <nav>
          <div className="wrap">
            <Link className="brand" href="/">
              alonso<b>grimaldo</b>
            </Link>
            <Link className="link" href="/#posts">
              Posts
            </Link>
            <a className="link" href={LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </nav>
        {children}
        <footer>
          <div className="wrap">
            Alonso Grimaldo · construyendo con agentes ·{" "}
            <a href={LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
