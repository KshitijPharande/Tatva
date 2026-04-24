import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PageReader } from "@/components/PageReader";
import { articles } from "@/data/blog";
export default function ArticlePage() {
  const { id } = useParams();
  const a = articles.find((x) => x.id === id);
  const [reading, setReading] = useState(false);

  if (!a) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="italic-display text-5xl text-ink">Essay not found</p>
          <Link to="/blog" className="mt-8 inline-block link-line text-[12px] uppercase tracking-[0.2em]">← Back to journal</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="px-6 pb-28 pt-24 md:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <Link to="/blog" className="text-[11px] uppercase tracking-[0.3em] text-ink-soft hover:text-ink">
            ← The Journal
          </Link>
          <div className="mt-10 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.3em] text-ink-soft">
            <span>{a.date}</span><span>·</span><span>{a.readTime}</span>
          </div>
          <h1 className="mt-6 font-display text-5xl leading-tight text-ink md:text-7xl">
            <em>{a.title}</em>
          </h1>
          <p className="mt-6 text-sm text-ink-soft">By {a.author}</p>
          <div className="mx-auto my-12 h-px w-16 bg-ink" />
          <p className="reading-text text-left">{a.excerpt}</p>

          <button
            onClick={() => setReading(true)}
            className="mt-12 group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-teal"
          >
            Read essay <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </article>

      {reading && (
        <PageReader pages={a.pages} title={a.title} author={a.author} onClose={() => setReading(false)} />
      )}
    </SiteLayout>
  );
}
