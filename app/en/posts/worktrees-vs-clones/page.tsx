import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPost } from "@/lib/posts";
import { faqJsonLd, JsonLd, personJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { postLanguages } from "@/lib/meta";

const post = getPost("worktrees-vs-clones");
const SITE = "https://alonsogrimaldo.com";

const TITLE = "Git worktrees or real clones? What I learned running AI agents in parallel";
const DESCRIPTION =
  "I started with git worktrees and ended up with real clones from a local bare mirror. The three technical reasons worktrees break with parallel autonomous agents, the full recipe, and when worktrees still win.";

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
    q: "Why do git worktrees fail with parallel AI agents?",
    a: "Because every worktree shares the same .git: one agent running gc --prune, reset --hard or branch -D can affect all worktrees; git forbids checking out the same branch in two worktrees; and config and hooks are inherited from the parent. With autonomous agents nobody coordinates that shared state.",
  },
  {
    q: "Isn't cloning a repo per task slow?",
    a: "Not if you clone from a local bare mirror: run git clone --mirror once against the remote, then each task clones from the mirror — local, instant, no network.",
  },
  {
    q: "When are worktrees still the right tool?",
    a: "For a quick fix in a single repo, with one agent or working alone: they're lighter, faster to create, and without concurrency the cross-contamination risk doesn't exist.",
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

export default function WorktreesVsClonesEn() {
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
          <h1>Worktrees or clones?</h1>
          <div className="tldr">
            <span className="tldr-label">Short answer</span>
            <p>
              Git worktrees break with multiple autonomous agents because they share
              the same <code>.git</code>: destructive operations, the branch lock and
              inherited hooks leak state across tasks. The alternative I run in
              production: real clones from a local bare mirror — cloning is instant
              and every task is 100% isolated.
            </p>
          </div>
          <p className="lead">
            When I shared my autonomous-agent workflow, this was the question that
            kept coming back: <b>&quot;why real clones instead of git worktrees?&quot;</b>.
            Short version: with one agent, worktrees are fine. With several autonomous
            agents in parallel, they break — and they break ugly.
          </p>

          <figure className="post-fig">
            <Image
              src="/img/post-worktrees.webp"
              alt="Ink illustration: from a mother tree under a glass bell, a gardener takes cuttings and plants them in separate pots tended by small robots; in the background, several gardeners wrestle with a single tangled tree"
              width={1400}
              height={933}
              priority
            />
          </figure>

          <h2>The day I understood the problem</h2>
          <p>
            I started like everyone: <code>git worktree add</code> per task.
            Lightweight, fast, no repo duplication. Until I started running several
            agents at once and got <b>corrupted files and branch cross-overs</b> I
            couldn&apos;t explain. The root cause wasn&apos;t an exotic bug:{" "}
            <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener">
              worktrees
            </a>{" "}
            <b>share the same .git</b>. Anything one agent does to that shared state
            happens to all of them.
          </p>
          <ul>
            <li>
              An agent running <code>git gc --prune</code>, <code>reset --hard</code>,{" "}
              <code>branch -D</code> or rewriting history can affect <b>every</b>{" "}
              worktree at once.
            </li>
            <li>
              Git won&apos;t let the same branch be checked out in two worktrees.
              Sounds minor, but when two autonomous agents decide to work from the
              same base, the edge cases are nasty: one of them starts from a state it
              didn&apos;t expect.
            </li>
            <li>
              Config and hooks are <b>inherited from the parent</b>. An agent that
              touches <code>.git/config</code> or installs a hook affects everyone
              else.
            </li>
          </ul>
          <p>
            With a single agent none of this hurts: you coordinate. With autonomous
            agents, nobody coordinates — the structure has to do it.
          </p>

          <h2>The way out: real clones from a bare mirror</h2>
          <p>
            The obvious objection to clones is cost: cloning a big repo per task is
            slow. The piece that fixes it is a <b>local bare mirror</b>: clone once
            from the remote, then every task clones <b>from the mirror</b> — local,
            instant, no network.
          </p>
          <pre>
            <code>{`# once per repo: the local mirror
git clone --mirror git@github.com:org/web.git ~/.mirrors/web.git

# per task: a real clone from the mirror (instant)
git clone ~/.mirrors/web.git tasks/checkout-v2/web
cd tasks/checkout-v2/web
git checkout -b checkout-v2 origin/staging

# refresh the mirror when needed
git --git-dir ~/.mirrors/web.git fetch --prune`}</code>
          </pre>
          <p>
            Every task ends up <b>100% isolated</b>: its own files, branches, config
            and hooks. A blunder only breaks its own task. And since each clone has
            its own <code>.git</code>, I install a <b>no-push hook</b> against
            staging/main in each one without polluting the others — the agent works
            freely on its branch, what matters stays protected.
          </p>

          <h2>The thin helper layer</h2>
          <p>
            No heavy framework: <b>bash + git</b>. One command (<code>task-new</code>)
            that in one pass: clones from the mirror, branches from the base, renders
            the env, assigns a <b>dedicated port block</b> (so two agents never step on
            each other&apos;s ports), installs the hook and creates the E2E reports
            folder. Teardown (<code>task-rm</code>) aborts if there are uncommitted
            changes — you never throw work away by accident.
          </p>

          <h2>Worktrees vs clones, in one table</h2>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Worktrees</th>
                  <th>Clones from bare mirror</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><b>Isolation</b></td>
                  <td>Shared .git: gc, reset, branch -D leak across tasks</td>
                  <td>Total: each task has its own .git</td>
                </tr>
                <tr>
                  <td><b>Same branch in two tasks</b></td>
                  <td>Git forbids it → nasty edge cases between agents</td>
                  <td>No restriction: every clone is independent</td>
                </tr>
                <tr>
                  <td><b>Config &amp; hooks</b></td>
                  <td>Inherited from parent: one agent affects all</td>
                  <td>Per-clone (including the no-push hook)</td>
                </tr>
                <tr>
                  <td><b>Creation cost</b></td>
                  <td>Very cheap</td>
                  <td>Instant when cloning from the local mirror</td>
                </tr>
                <tr>
                  <td><b>Disk</b></td>
                  <td>Minimal</td>
                  <td>Higher, mitigated by the shared mirror</td>
                </tr>
                <tr>
                  <td><b>Use it when</b></td>
                  <td>Quick fix, single agent, no concurrency</td>
                  <td>Multiple autonomous agents in parallel</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>When worktrees still win</h2>
          <p>
            It&apos;s not dogma. For a <b>quick fix in a single repo</b>, with one
            agent (or just you), a worktree is still the right tool: lighter, faster
            to create, and the cross-contamination risk doesn&apos;t exist because
            there&apos;s no concurrency. I keep both: worktrees for one-off fixes,
            isolated clones for features with agents running in parallel.
          </p>

          <div className="quote">
            The rule I keep: isolation isn&apos;t for you — it&apos;s so that two
            autonomous processes never have to coordinate through shared state.
          </div>

          <h2>FAQ</h2>
          {faq.map(({ q, a }) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}

          <p>
            The full pattern — workspaces, ports, the self-correcting E2E loop — is
            explained interactively at{" "}
            <a href="https://ship.alonsogrimaldo.com/" target="_blank" rel="noopener">
              ship.alonsogrimaldo.com
            </a>
            .
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
