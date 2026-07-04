import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { marked } from "marked";

export const metadata = { title: "What's remaining — Nakhla" };

export default function RemainingPage() {
  const md = fs.readFileSync(path.join(process.cwd(), "REMAINING.md"), "utf8");
  const html = marked.parse(md, { async: false }) as string;
  return (
    <div className="wrap">
      <header className="hero" style={{ paddingBottom: 20 }}>
        <span className="badge">
          <span className="brand-dot">ن</span>
          Nakhla · Remaining work
        </span>
        <h1>
          What&apos;s <span className="grad">remaining</span>
        </h1>
        <p className="sub">
          Everything not yet shipped, ordered by what unblocks the most downstream work. Companion to the{" "}
          <Link href="/">session report</Link>.
        </p>
        <p className="meta">
          <a
            href="https://github.com/eng-AhmedMahmoud/nakhla-report/blob/main/REMAINING.md"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
          {" · "}
          <a
            href="https://raw.githubusercontent.com/eng-AhmedMahmoud/nakhla-report/main/REMAINING.md"
            target="_blank"
            rel="noreferrer"
          >
            Raw markdown
          </a>
        </p>
      </header>

      <article className="md" dangerouslySetInnerHTML={{ __html: html }} />

      <footer>
        <Link href="/">← Back to session report</Link>
      </footer>
    </div>
  );
}
