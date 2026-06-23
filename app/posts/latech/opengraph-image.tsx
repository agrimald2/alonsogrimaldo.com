import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Latech: IA aplicada para empresas que no nacieron digitales";

export default function Image() {
  return brandOg(
    "Latech: IA aplicada para empresas",
    "Fundé Latech para llevar IA y software a medida a corporativos peruanos. No vendo modelos: resuelvo procesos."
  );
}
