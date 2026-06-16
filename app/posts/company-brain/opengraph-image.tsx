import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Le di un cerebro a la empresa — y la clave no fue RAG";

export default function Image() {
  return brandOg(
    "Le di un cerebro a la empresa",
    "Construí el Company Brain de 021. La lección: el conocimiento útil no sale de tirar vectores, sale de estructura."
  );
}
