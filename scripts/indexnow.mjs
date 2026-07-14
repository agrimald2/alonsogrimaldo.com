// Avisa a IndexNow (Bing y motores adheridos) que las URLs cambiaron.
// Correr después de cada deploy: npm run indexnow
const SITE = "https://alonsogrimaldo.com";
const KEY = "d86e8c7855e1ba7c80fe24a23366220f"; // public/<KEY>.txt debe existir

const res = await fetch(`${SITE}/sitemap.xml`);
const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const ping = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: "alonsogrimaldo.com",
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow: ${ping.status} ${ping.statusText} — ${urls.length} URLs`);
if (!ping.ok && ping.status !== 202) process.exit(1);
