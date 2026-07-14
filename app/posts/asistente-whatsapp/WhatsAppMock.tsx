import type { CSSProperties, ReactNode } from "react";

/* Mockup estático de un chat de WhatsApp (técnica heredada de Comi):
   burbujas entrantes blancas, salientes verdes, notas de sistema como pill.
   Estilos inline para no tocar el CSS global del sitio. Datos ilustrativos. */

export type Bubble =
  | { from: "in" | "out"; text: ReactNode; time: string }
  | { from: "system"; text: ReactNode };

const S: Record<string, CSSProperties> = {
  frame: {
    maxWidth: 400,
    margin: "2rem auto",
    borderRadius: 24,
    overflow: "hidden",
    border: "1px solid rgba(28,25,23,.12)",
    boxShadow: "0 12px 32px rgba(28,25,23,.10)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "10px 16px",
    background: "linear-gradient(135deg,#075E54,#128C7E)",
    color: "#fff",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "rgba(255,255,255,.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 15,
    flexShrink: 0,
  },
  name: { fontSize: 14, fontWeight: 600, lineHeight: 1.2, margin: 0, color: "#fff" },
  status: {
    fontSize: 11,
    color: "rgba(209,250,229,.9)",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    display: "inline-block",
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#6ee7b7",
  },
  thread: {
    background: "linear-gradient(0deg,#ece9e1 0%,#efece4 100%)",
    padding: "16px 12px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  bubble: {
    maxWidth: "82%",
    borderRadius: 16,
    padding: "6px 10px",
    fontSize: 13,
    lineHeight: 1.45,
    color: "#1f2937",
    boxShadow: "0 1px 1px rgba(0,0,0,.06)",
    whiteSpace: "pre-line",
  },
  meta: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "right",
    marginTop: 2,
  },
  checks: { color: "#38bdf8", letterSpacing: -2 },
  system: {
    alignSelf: "center",
    background: "rgba(5,150,105,.10)",
    color: "#065f46",
    fontSize: 11,
    fontWeight: 500,
    borderRadius: 999,
    padding: "4px 12px",
    margin: "2px 0",
  },
  caption: {
    textAlign: "center",
    fontSize: 13,
    opacity: 0.7,
    marginTop: 8,
  },
};

export function WhatsAppMock({
  title,
  subtitle,
  thread,
  caption,
}: {
  title: string;
  subtitle: string;
  thread: Bubble[];
  caption?: string;
}) {
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div style={S.frame}>
        <div style={S.header}>
          <div style={S.avatar}>{title[0]}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={S.name}>{title}</p>
            <p style={S.status}>
              <span style={S.dot} />
              {subtitle}
            </p>
          </div>
        </div>
        <div style={S.thread}>
          {thread.map((b, i) =>
            b.from === "system" ? (
              <span key={i} style={S.system}>
                {b.text}
              </span>
            ) : (
              <div
                key={i}
                style={{
                  ...S.bubble,
                  alignSelf: b.from === "out" ? "flex-end" : "flex-start",
                  background: b.from === "out" ? "#dcf8c6" : "#ffffff",
                  borderTopRightRadius: b.from === "out" ? 4 : 16,
                  borderTopLeftRadius: b.from === "in" ? 4 : 16,
                }}
              >
                {b.text}
                <div style={S.meta}>
                  {b.time}{" "}
                  {b.from === "out" ? <span style={S.checks}>✓✓</span> : <span>✓</span>}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      {caption ? <figcaption style={S.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
