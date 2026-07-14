import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPost } from "@/lib/posts";
import { faqJsonLd, JsonLd, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { postLanguages } from "@/lib/meta";

const post = getPost("ship-while-sleep");
const SITE = "https://alonsogrimaldo.com";
const SHIP = "https://ship.alonsogrimaldo.com/";

const TITLE = "Ship while you sleep: the autonomous-agent workflow we use at 021";
const DESCRIPTION =
  "Leave big goals running and come back to something 99% prod-ready: isolated workspaces per task, dedicated port blocks, and an E2E agent that finds the root cause and self-corrects until 3 clean runs in a row.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `/en/posts/${post.slug}`,
    languages: postLanguages(post.slug),
  },
  openGraph: {
    type: "article",
    siteName: "Alonso Grimaldo",
    publishedTime: post.date,
    authors: ["Alonso Grimaldo"],
    tags: post.tags,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE}/en/posts/${post.slug}`,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faq = [
  {
    q: "What is the ship-while-you-sleep pattern?",
    a: "An autonomous-agent workflow in four moves: the agent iterates the goal with you and writes the spec; it splits the work into fully isolated workspaces (a real clone per sub-task, dedicated port block); an E2E agent tests in the browser, finds the root cause and self-corrects until 3 clean runs in a row; and you come back to screenshots, feedback and documented fixes — usually 99% prod-ready.",
  },
  {
    q: "How detailed does a prompt for an autonomous agent need to be?",
    a: "It's not about length: it's about giving the agent a way to verify its iterations. A good handoff is specific on the WHAT, the WHY and the acceptance criteria, and loose on the HOW: observable symptom, root cause verified with file:line, fix direction with constraints, exact files, and testable criteria.",
  },
  {
    q: "When is a task's E2E considered done?",
    a: "Only after 3 clean browser runs in a row. Any fix resets the streak: if the agent touched code, it tests again from scratch.",
  },
];

const enPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: post.date,
  dateModified: post.updated ?? post.date,
  inLanguage: "en",
  image: `${SITE}/posts/${post.slug}/opengraph-image`,
  url: `${SITE}/en/posts/${post.slug}`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/en/posts/${post.slug}` },
  articleSection: post.tags[0],
  author: { "@id": `${SITE}/#person` },
  publisher: { "@id": `${SITE}/#person` },
  isPartOf: { "@id": `${SITE}/#website` },
  keywords: post.tags.join(", "),
};

export default function ShipWhileSleepEn() {
  return (
    <main>
      <article lang="en">
        <JsonLd data={[personJsonLd, websiteJsonLd, enPostJsonLd, faqJsonLd(faq)]} />
        <div className="wrap">
          <div className="meta">
            By <Link href="/sobre-mi">Alonso Grimaldo</Link> ·{" "}
            <time dateTime={post.date}>June 2026</time> · {post.tags.join(" · ")} ·{" "}
            {post.readingMin} min · <Link href={`/posts/${post.slug}`}>leer en español</Link>
          </div>
          <h1>Ship while you sleep</h1>
          <div className="tldr">
            <span className="tldr-label">Short answer</span>
            <p>
              Ship while you sleep is an autonomous-agent pattern in four moves: the
              agent writes the spec with you, splits the work into isolated
              workspaces (a real clone and a port block per sub-task), an E2E agent
              finds the root cause and self-corrects until 3 clean runs in a row, and
              you come back to something 99% prod-ready with everything documented.
            </p>
          </div>
          <p className="lead">
            Leave big goals running and come back to something <b>99% prod-ready</b>.
            This is the pattern we use at 021 to work with autonomous agents — plus
            the answers to the questions I got the most when I shared it.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-ship-while-sleep.webp"
              alt="Ink illustration: a person sleeps in a hammock while three small robots work isolated at their desks; one inspects with a magnifying glass, another stamps an approval, another carries papers"
              width={1400}
              height={933}
              priority
            />
          </figure>

          <div className="callout">
            <p>
              I built an <b>interactive site</b> that explains the full pattern, with
              terminals and diagrams:{" "}
              <a href={SHIP} target="_blank" rel="noopener">
                ship.alonsogrimaldo.com
              </a>
            </p>
          </div>

          <h2>The problem: you are the loop</h2>
          <p>
            You ask the agent for something big, it comes back half-done, you repeat
            the context. Two agents in parallel step on each other&apos;s files,
            branches and ports. You test by hand, find the bug, explain it, repeat.
            You end up babysitting every step.
          </p>
          <p>
            The way out isn&apos;t a framework: it&apos;s <b>structure</b>. Each piece
            takes one decision out of your hands and gives it to the agent, with
            guardrails so nothing breaks.
          </p>

          <h2>The pattern: four moves</h2>
          <ul>
            <li>
              <b>1 · Iterate → prompt.</b> The agent discusses the goal with you and
              writes the spec before touching code.
            </li>
            <li>
              <b>2 · Split → workspace.</b> If the task is big, it splits it and
              creates an isolated workspace per sub-task: a <b>real clone</b> of every
              repo it touches and a <b>dedicated port block</b>. Two agents in
              parallel never share files, branches or ports.
            </li>
            <li>
              <b>3 · E2E agent.</b> Tests in the browser, finds bugs, analyzes the{" "}
              <b>root cause</b> (not the symptom), applies the fix and tests again.
              The E2E is only done after <b>3 clean runs in a row</b> — any fix resets
              the streak.
            </li>
            <li>
              <b>4 · You come back ready.</b> Screenshots, feedback and fixes
              documented in a per-task reports folder.
            </li>
          </ul>

          <h2>Why clones and not worktrees?</h2>
          <p>
            The question I got the most. I started with worktrees: fine with one
            agent; with several autonomous ones running at once, corrupted files and
            branch cross-overs started. The root problem is that worktrees{" "}
            <b>share the same .git</b>:
          </p>
          <ul>
            <li>
              An agent running <code>gc --prune</code>, <code>reset --hard</code> or{" "}
              <code>branch -D</code> can affect <b>all</b> worktrees.
            </li>
            <li>
              Git won&apos;t check out the same branch in two worktrees → nasty edge
              cases when two autonomous agents cross paths.
            </li>
            <li>
              Config and hooks are inherited from the parent: one agent touching them
              affects everyone.
            </li>
          </ul>
          <p>
            With <b>real clones from a local bare mirror</b>, cloning is instant and
            each task is 100% isolated — including its own no-push hook against
            staging/main. And no heavy framework: <b>bash + git</b>, a thin helper
            layer that in one command clones, branches, renders the env, assigns
            ports and installs the hook. Full detail in{" "}
            <Link href="/en/posts/worktrees-vs-clones">worktrees vs clones</Link>.
          </p>

          <h2>The handoff matters more than verbosity</h2>
          <p>
            How detailed should the prompt be? It&apos;s not length: it&apos;s giving
            the agent <b>a way to verify its iterations</b>, and a handoff that&apos;s{" "}
            <b>specific on the WHAT / WHY / criteria, loose on the HOW</b>. What I
            hand over per front:
          </p>
          <ul>
            <li>Observable symptom.</li>
            <li>
              Root cause verified against the code, with <code>file:line</code> — the
              most important part: it removes ambiguity, no re-discovery.
            </li>
            <li>
              Fix direction + constraints (&quot;do NOT build X&quot;, &quot;reuse
              Y&quot;) — not line by line.
            </li>
            <li>Exact files: main one + which to reuse / not touch.</li>
            <li>Testable acceptance criteria.</li>
            <li>Repo conventions.</li>
          </ul>
          <pre>
            <code>{`## Symptom
checkout doubles the discount with 2 coupons

## Root cause (verified)
web/lib/cart.ts:142 — recalculates the total
without clearing the previous discount

## Fix + constraints
accumulate in a single pass.
Do NOT build a new promo system;
reuse applyDiscount()

## Acceptance criteria
- 2 coupons → 1 discount each
- test:e2e checkout green`}</code>
          </pre>

          <p>
            And I split big goals into <b>disjoint fronts</b> — files that never
            overlap — to run them in parallel, each with its own verification loop.
            Each front lives in its own session (Claude / Codex GUI) and I rotate
            between sessions like tabs: to review progress, not to babysit.
          </p>

          <h2>The result</h2>
          <div className="quote">
            &quot;I leave big goals running and when I come back I have screenshots of
            the tests it ran, feedback, how it self-corrected, and most of the time
            it&apos;s 99% prod-ready with minor tweaks.&quot;
          </div>
          <p>
            What matters isn&apos;t the exact commands — it&apos;s the structure:{" "}
            <b>isolate to scale</b>, <b>protect what&apos;s critical</b>, and make the
            agent <b>close its own quality loop</b>.
          </p>

          <h2>FAQ</h2>
          {faq.map(({ q, a }) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}

          <p>
            <a className="cta" href={SHIP} target="_blank" rel="noopener">
              See the full pattern, interactive →
            </a>
          </p>
          <aside className="author-box">
            <p>
              <b>Alonso Grimaldo</b> — AI Engineer. Founding Engineer at{" "}
              <a href="https://from021.io" target="_blank" rel="noopener">021</a>,
              founder of{" "}
              <a href="https://latech.lat" target="_blank" rel="noopener">LaTech</a>{" "}
              and former CTO of VICI (acquired by Tiendanube). Writes about building
              product with autonomous agents.{" "}
              <Link href="/sobre-mi">Full story (Spanish) →</Link>
            </p>
          </aside>
        </div>
      </article>
    </main>
  );
}
