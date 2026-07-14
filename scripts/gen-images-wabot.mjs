import { writeFileSync, mkdirSync } from "fs";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Falta OPENAI_API_KEY (export OPENAI_API_KEY=... antes de correr)");
  process.exit(1);
}

const STYLE =
  "Editorial ink illustration in vintage woodcut / etching style on warm cream paper background (#FAF6EF). " +
  "Dark warm ink linework (#1C1917), hatching and cross-hatching for shading, generous negative space. " +
  "Exactly one accent color: terracotta (#9A3412), used sparingly on one or two elements. " +
  "No text, no words, no letters anywhere. Flat, printable, like an illustration in a literary tech essay.";

const jobs = [
  {
    out: "public/img/post-wabot.png",
    size: "1536x1024",
    prompt:
      STYLE +
      " Scene: a small friendly mechanical butler robot with a bowtie (the bowtie is the terracotta accent) stands inside an enormous vintage telephone handset lying on a desk, converted into a tiny command center; an avalanche of paper speech bubbles of all sizes rains down toward the phone, and the butler calmly sorts them into three small labeled wooden trays. A steaming cup of coffee sits nearby. Whimsical, overwhelmed-but-in-control mood.",
  },
  {
    out: "public/img/wabot-pipeline.png",
    size: "1536x1024",
    prompt:
      STYLE +
      " Scene: hundreds of paper speech bubbles pour from the top into a large metal funnel with three progressively finer sieve layers visible in cutaway; discarded bubbles fall aside into a waste basket as confetti; at the bottom, exactly three pristine speech bubbles (terracotta accent) land on a velvet cushion carried by a tiny proud robot. Industrial-meets-whimsical mood, clear vertical flow.",
  },
  {
    out: "public/img/wabot-promesas.png",
    size: "1024x1024",
    prompt:
      STYLE +
      " Scene: a person types at a desk while translucent speech bubbles float up and away from their keyboard like escaping balloons; behind them a tiny mechanical butler robot catches the bubbles mid-air with a butterfly net (the net is the terracotta accent) and pins each one neatly into an open ledger book with ribbons. Gentle, vigilant, guardian mood.",
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
