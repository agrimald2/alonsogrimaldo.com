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
  compact = false,
}: {
  title: string;
  subtitle: string;
  thread: Bubble[];
  caption?: string;
  compact?: boolean;
}) {
  const frame = compact
    ? { ...S.frame, margin: 0, width: 300, maxWidth: 300, flex: "0 0 300px" }
    : S.frame;
  const body = (
    <div style={frame}>
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
  );
  if (compact) return body;
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      {body}
      {caption ? <figcaption style={S.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

/* Carrusel horizontal de mocks: scroll-snap, para abarcar varios ejemplos */
export function MockCarousel({
  caption,
  children,
}: {
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          padding: "8px 4px 16px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
      {caption ? (
        <figcaption style={{ ...S.caption, marginTop: 0 }}>
          {caption} · deslizá para ver más →
        </figcaption>
      ) : null}
    </figure>
  );
}

/* Ventana de terminal estilo Claude Code corriendo una tarea delegada */
export function TerminalMock({
  title,
  lines,
  caption,
}: {
  title: string;
  lines: { kind: "task" | "step" | "ok" | "out"; text: ReactNode }[];
  caption?: string;
}) {
  const color: Record<string, string> = {
    task: "#e9d5ff",
    step: "#a8a29e",
    ok: "#86efac",
    out: "#fcd34d",
  };
  const prefix: Record<string, string> = {
    task: "❯",
    step: "⏺",
    ok: "✓",
    out: "→",
  };
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div
        style={{
          maxWidth: 560,
          margin: "0 auto",
          borderRadius: 14,
          overflow: "hidden",
          background: "#1c1917",
          boxShadow: "0 16px 40px rgba(28,25,23,.3)",
          fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 12.5,
          lineHeight: 1.7,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 14px",
            background: "rgba(255,255,255,.04)",
            borderBottom: "1px solid rgba(255,255,255,.07)",
          }}
        >
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ marginLeft: 8, color: "#a8a29e", fontSize: 11.5 }}>{title}</span>
        </div>
        <div style={{ padding: "14px 16px 16px", overflowX: "auto" }}>
          {lines.map((l, i) => (
            <div key={i} style={{ color: color[l.kind], whiteSpace: "pre-wrap" }}>
              <span style={{ opacity: 0.8 }}>{prefix[l.kind]}</span> {l.text}
            </div>
          ))}
        </div>
      </div>
      {caption ? <figcaption style={S.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

/* Notificación push estilo lock-screen (ntfy) */
export function PushMock({
  title,
  body,
  caption,
}: {
  title: ReactNode;
  body: ReactNode;
  caption?: string;
}) {
  return (
    <figure style={{ margin: "2.5rem 0" }}>
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          borderRadius: 20,
          padding: "12px 14px",
          background: "rgba(28,25,23,.92)",
          color: "#fff",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          boxShadow: "0 16px 40px rgba(28,25,23,.35)",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            background: "linear-gradient(135deg,#059669,#10b981)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 19,
            flexShrink: 0,
          }}
        >
          🔔
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            <span>{title}</span>
            <span style={{ fontWeight: 400, opacity: 0.6, fontSize: 11, flexShrink: 0 }}>
              ahora
            </span>
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.4, marginTop: 2 }}>
            {body}
          </div>
          <div style={{ fontSize: 11, opacity: 0.55, marginTop: 6 }}>
            Tocar abre el chat de WhatsApp correcto
          </div>
        </div>
      </div>
      {caption ? <figcaption style={S.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
