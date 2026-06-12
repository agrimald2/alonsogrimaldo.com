import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ship while you sleep — workflow de agentes autónomos";

export default function Image() {
  return brandOg(
    "Ship while you sleep",
    "Dejá objetivos grandes corriendo y volvé a algo 99% prod-ready. El workflow de agentes autónomos que usamos en 021."
  );
}
