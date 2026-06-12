import { readFileSync, writeFileSync } from "fs";

const envFile = readFileSync("/Users/grimmy/Desktop/latech/latech/.env", "utf8");
const apiKey = envFile.match(/^OPENAI_API_KEY=(.+)$/m)?.[1]?.trim();

const INK =
  "Editorial ink illustration in vintage woodcut / etching style on warm cream paper background (#FAF6EF). " +
  "Dark warm ink linework (#1C1917), hatching for shading, generous negative space. " +
  "Exactly one accent color: terracotta (#9A3412), used sparingly. No text, no words, no letters.";

const jobs = [
  {
    out: "public/img/post-worktrees.png",
    size: "1536x1024",
    prompt:
      INK +
      " Scene: a botanical workshop. On the left, one large mother tree inside a glass bell jar on a pedestal. From it, a gardener takes small cuttings and plants them into a neat row of separate terracotta pots (the pots are the terracotta accent), each pot sitting on its own small round rug, clearly isolated. Inside each pot a tiny identical sapling grows with a tiny mechanical robot assistant pruning it. In the dim background, slightly faded: a single old tangled tree with several frustrated gardeners pulling its intertwined branches in different directions. Calm craftsmanship mood, metaphor of isolated clones versus shared worktree.",
  },
  {
    out: "/Users/grimmy/Desktop/personal/ship-while-sleep/hero-art.png",
    size: "1536x1024",
    prompt:
      "Dark editorial line-art illustration on very dark blue-black background (#0b0e14). Fine elegant line work in soft white and muted gray, with exactly one accent color: emerald green (#34d399) used on a few key elements, subtle glow allowed. No text, no words, no letters. " +
      "Scene: night scene, a person sleeps peacefully in a hammock high up among the stars and a crescent moon; below, three small glowing workbench islands float in the dark, each with a tiny friendly robot building and testing miniature web interfaces; thin dotted green lines connect the three islands to a small bell hanging from the hammock. Calm, magical, futuristic-craftsman mood.",
  },
];

for (const job of jobs) {
  console.log("generating", job.out, "...");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: "gpt-image-2", prompt: job.prompt, size: job.size, n: 1 }),
  });
  if (!res.ok) {
    console.error("FAIL", job.out, res.status, (await res.text()).slice(0, 200));
    process.exit(1);
  }
  const data = await res.json();
  writeFileSync(job.out, Buffer.from(data.data[0].b64_json, "base64"));
  console.log("ok", job.out);
}
