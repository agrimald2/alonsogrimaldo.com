import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Alonso Grimaldo — construyo producto con agentes";

export default function Image() {
  return brandOg(
    "Construyo producto con agentes.",
    "Workflows, agentes autónomos y lo que voy aprendiendo en el camino."
  );
}
