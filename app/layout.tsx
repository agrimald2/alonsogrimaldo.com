import type { Metadata } from "next";
import Link from "next/link";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-text",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-code",
});

const LINKEDIN = "https://www.linkedin.com/in/alonso-grimaldo-3a2917186/";
const X = "https://x.com/alonsogrimal2";
const GITHUB = "https://github.com/agrimald2";

export const metadata: Metadata = {
  metadataBase: new URL("https://alonsogrimaldo.com"),
  title: {
    default: "Alonso Grimaldo",
    template: "%s · Alonso Grimaldo",
  },
  description:
    "Founding Engineer en 021, founder de LaTech y CTO de VICI (adquirida por Tiendanube). Construyo producto con agentes autónomos y escribo sobre cómo trabajo.",
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
    card: "summary_large_image",
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
    <html
      lang="es"
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      <body>
        <nav>
          <div className="wrap">
            <Link className="brand" href="/">
              Alonso Grimaldo<span className="dot">.</span>
            </Link>
            <Link className="link" href="/sobre-mi">
              Sobre mí
            </Link>
            <Link className="link" href="/#posts">
              Posts
            </Link>
            <Link className="link" href="/proyectos">
              Proyectos
            </Link>
            <Link className="link" href="/uses">
              Uses
            </Link>
            <Link className="link" href="/now">
              Now
            </Link>
            <a className="link" href={LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a className="link" href={GITHUB} target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="link" href={X} target="_blank" rel="noopener">
              X
            </a>
          </div>
        </nav>
        {children}
        <footer>
          <div className="wrap">
            Alonso Grimaldo<span className="dot">.</span> · escribo sobre construir
            con agentes ·{" "}
            <a href={LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>{" "}
            ·{" "}
            <a href={GITHUB} target="_blank" rel="noopener">
              GitHub
            </a>{" "}
            ·{" "}
            <a href={X} target="_blank" rel="noopener">
              X
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
