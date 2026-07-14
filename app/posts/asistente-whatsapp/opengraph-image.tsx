import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Mi asistente ejecutivo es un chat de WhatsApp conmigo mismo";

export default function Image() {
  return brandOg(
    "Mi asistente ejecutivo es un chat de WhatsApp conmigo mismo",
    "Baileys + Whisper + gpt-4o-mini: transcribe, filtra 39 grupos, maneja 2 calendarios y me caza las promesas. Por menos de $5/mes."
  );
}
