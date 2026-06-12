import { readFileSync, writeFileSync, mkdirSync } from "fs";

const envFile = readFileSync("/Users/grimmy/Desktop/latech/latech/.env", "utf8");
const apiKey = envFile.match(/^OPENAI_API_KEY=(.+)$/m)?.[1]?.trim();
if (!apiKey) {
  console.error("OPENAI_API_KEY ausente");
  process.exit(1);
}

const STYLE =
  "Editorial ink illustration in vintage woodcut / etching style on warm cream paper background (#FAF6EF). " +
  "Dark warm ink linework (#1C1917), hatching and cross-hatching for shading, generous negative space. " +
  "Exactly one accent color: terracotta (#9A3412), used sparingly on one or two elements. " +
  "No text, no words, no letters anywhere. Flat, printable, like an illustration in a literary tech essay.";

const jobs = [
  {
    out: "public/img/post-ship-while-sleep.png",
    size: "1536x1024",
    prompt:
      STYLE +
      " Scene: a person sleeps peacefully in a hammock strung between two bookshelves at night, while below three tiny friendly robot assistants work at three separate small desks, each desk on its own little island rug, clearly isolated from each other; one robot inspects a page with a magnifying glass, another stamps a checkmark seal (the stamp ink is the terracotta accent), a third carries a neat stack of papers. A string from the hammock connects to a small bell. Calm, whimsical, craftsmanship mood.",
  },
  {
    out: "public/img/home-about.png",
    size: "1024x1024",
    prompt:
      STYLE +
      " Scene: a craftsman at a wooden drafting desk seen from behind, conducting with one raised hand like an orchestra director; in front of him three small parallel workbenches radiate outward, each with a tiny mechanical assistant building a different miniature structure. On his desk: a coffee cup (terracotta accent), rulers, and rolled blueprints. Warm, focused, atelier mood.",
  },
];

mkdirSync("public/img", { recursive: true });

for (const job of jobs) {
  console.log("generating", job.out, "...");
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-2",
      prompt: job.prompt,
      size: job.size,
      n: 1,
    }),
  });
  if (!res.ok) {
    console.error("FAIL", job.out, res.status, (await res.text()).slice(0, 300));
    process.exit(1);
  }
  const data = await res.json();
  const b64 = data.data[0].b64_json;
  writeFileSync(job.out, Buffer.from(b64, "base64"));
  console.log("ok", job.out);
}
