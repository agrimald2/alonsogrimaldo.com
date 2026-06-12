# Brandbook — alonsogrimaldo.com

Identidad personal del blog. Independiente de 021 y de LaTech.
Dirección: **Editorial tinta** — papel, serif, terracota. Un solo modo (claro).

## 1. Concepto

Un blog de autor técnico: se lee como un ensayo, no como una landing.
La marca compite en **legibilidad y voz**, no en estética de terminal.
Las piezas de otros proyectos (ej. ship-while-sleep, que es dark/verde 021)
conviven como **artefactos embebidos/linkeados** — el contraste es deliberado:
el blog es el papel; los proyectos son las piezas que se apoyan encima.

## 2. Wordmark

- **Texto:** `Alonso Grimaldo.` — nombre completo en serif, punto final en terracota.
- El punto es el gesto de marca: afirmación, no adorno. Aparece también solo
  (".") como favicon/avatar: una "A." serif tinta sobre papel.
- Nunca en mayúsculas completas. Nunca con gradiente.

## 3. Paleta

| Token | Hex | Uso |
|---|---|---|
| `--paper` | `#FAF6EF` | Fondo de página |
| `--paper-2` | `#F3EDE2` | Superficies: cards, callouts, code inline |
| `--line` | `#E5DDCD` | Bordes y separadores (siempre finos) |
| `--ink` | `#1C1917` | Texto principal, títulos |
| `--ink-2` | `#57534E` | Texto secundario, metadata |
| `--ink-3` | `#8A8378` | Hints, fechas, captions |
| `--terra` | `#9A3412` | Acento único: links, punto del wordmark, CTAs |
| `--terra-2` | `#7C2D12` | Hover/active del acento |
| `--code-bg` | `#26211C` | Fondo de code blocks (única superficie oscura) |
| `--code-ink` | `#EDE6D9` | Texto en code blocks |

Reglas:
- **Un solo acento.** Terracota es el único color "vivo". Nada de verde 021,
  ni paletas semánticas múltiples. Si algo necesita destacar, va en terracota o en negrita.
- Los code blocks son la única superficie oscura — como una foto impresa en una revista.

## 4. Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display | **Fraunces** (Google Fonts) | H1/H2/wordmark. Soft serif con carácter. Weight 500–600, tracking apretado. |
| Texto | **Newsreader** (Google Fonts) | Cuerpo de posts y leads. 17–19px, line-height 1.7. Diseñada para lectura larga. |
| Mono | **JetBrains Mono** | Código, labels, metadata, fechas. 13–14px. |

- UI corta (nav, botones) puede usar Newsreader 500 o el mono — nunca una sans genérica.
- Títulos en sentence case (solo mayúscula inicial). Nunca Title Case ni ALL CAPS,
  salvo labels mono pequeños (`EXPERIENCIA`, `POSTS`) con letter-spacing amplio.

## 5. Componentes

- **Post card:** sin caja pesada — separador fino arriba (`--line`), título serif,
  fecha en mono `--ink-3`, hover subraya el título en terracota.
- **Links en prosa:** terracota con subrayado fino (`text-decoration-thickness: 1px`,
  `underline-offset: 3px`). Hover → `--terra-2`.
- **Quote:** borde izquierdo terracota 3px, texto Newsreader itálica `--ink-2`.
- **Callout:** fondo `--paper-2`, borde `--line`, sin sombras.
- **Code block:** `--code-bg` + `--code-ink`, radio 10px, sin barra de "terminal de mentira".
- **Botón/CTA:** fondo terracota, texto papel, radio 8px. Uno por página máximo.
- **Sombras: ninguna. Gradientes: ninguno.** La jerarquía la dan tipografía y espacio.

## 6. Layout

- Columna de lectura: **máx 680px** para prosa (72ch aprox). Home puede ir a 760px.
- Aire generoso: secciones separadas por espacio y un separador fino, no por fondos alternados.
- Nav mínima: wordmark + 2-3 links. Footer de una línea.

## 7. Voz

- Primera persona, voseo, directo — como los posts de Discord/LinkedIn.
- Específico en el QUÉ/POR QUÉ, sin humo: cada afirmación con ejemplo o número.
- Términos técnicos exactos en inglés (`handoff`, `worktree`); narrativa en español.
- Títulos que afirman algo ("El handoff importa más que la verbosidad"),
  no clickbait ni listicles.

## 8. OG / social

- Template OG: fondo `--paper`, título en Fraunces `--ink` grande,
  "Alonso Grimaldo." abajo con punto terracota. Sin fotos de stock.
- Misma pieza para todos los posts; solo cambia el título.

## 9. Qué NO hacer

- No usar el verde `#01843e` ni el logo de 021 fuera de contenido sobre 021.
- No dark mode global (los code blocks ya dan el contraste).
- No emojis en títulos ni en UI (en el cuerpo de un post, con moderación).
- No más de un acento de color por vista.
