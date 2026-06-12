import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Puse a mi agente a proyectar la segunda vuelta";

export default function Image() {
  return brandOg(
    "Puse a mi agente a proyectar la segunda vuelta",
    "API oficial de la ONPE, proyección por zona en vez de promedio nacional, y un modelo validado por dos vías — en 15 minutos."
  );
}
