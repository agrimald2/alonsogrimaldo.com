export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  dateLabel: string;
};

export const posts: Post[] = [
  {
    slug: "ship-while-sleep",
    title: "Ship while you sleep: el workflow de agentes autónomos que usamos en 021",
    description:
      "Dejá objetivos grandes corriendo y volvé a algo 99% prod-ready: workspaces aislados por tarea, bloques de puertos, y un agente de E2E que encuentra la causa raíz y se auto-corrige.",
    date: "2026-06-12",
    dateLabel: "junio 2026",
  },
];
