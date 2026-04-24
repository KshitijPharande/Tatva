import { Link, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { articles } from "@/data/blog";
export default function ArticlePage() {
  const { id } = useParams();
  const a = articles.find((x) => x.id === id);

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
        </div>
        
        <div className="mx-auto mt-20 max-w-2xl text-left">
          {a.content.split('\n\n').map((paragraph, idx) => {
            const isChapter = paragraph.trim().toUpperCase().startsWith('CHAPTER');
            if (isChapter) {
              return (
                <h2 key={idx} className="mt-20 mb-8 font-display text-3xl italic text-ink">
                  {paragraph}
                </h2>
              );
            }
            return (
              <p key={idx} className="mb-8 reading-text">
                {paragraph}
              </p>
            );
          })}
          
          <div className="mt-24 border-t border-border pt-12 text-center">
            <p className="italic-display text-2xl text-ink">Fin.</p>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
