import { brandOg, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "¿Worktrees o clones? Lo que aprendí corriendo agentes en paralelo";

export default function Image() {
  return brandOg(
    "¿Worktrees o clones?",
    "Lo que aprendí corriendo agentes en paralelo: tres razones técnicas, la receta del mirror bare, y cuándo los worktrees siguen ganando."
  );
}
