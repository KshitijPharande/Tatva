import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getArticles } from "@/data/blog";

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getArticles();
      setArticles(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <SiteLayout>
      <section className="border-b border-border px-6 pb-12 pt-24 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">The Journal</p>
          <h1 className="mt-4 font-display text-6xl text-ink md:text-8xl"><em>Editorial</em></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Thoughts on slow reading, patient writing, and the spaces in between.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <p className="italic-display py-10 text-xl text-ink-soft">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="italic-display py-10 text-xl text-ink-soft">No articles found.</p>
          ) : (
            <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-16 md:grid-cols-2">
              {articles.map((a, i) => (
                <article key={a.slug || i}>
                  <Link to={`/blog/${a.slug}`} className="group block">
                    <div className="flex items-baseline gap-4 text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                      <span>{a.date}</span><span>·</span><span>{a.readTime}</span>
                    </div>
                    <h2 className="mt-4 font-display text-4xl italic leading-tight text-ink group-hover:text-teal transition-colors md:text-5xl">
                      {a.title}
                    </h2>
                    <p className="mt-5 reading-text text-lg">{a.excerpt}</p>
                    <p className="mt-6 text-sm text-ink-soft">{a.author}</p>
                    <p className="mt-6 link-line inline-block text-[11px] uppercase tracking-[0.25em] text-ink">Read essay →</p>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-border bg-paper px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-teal">The Journal</p>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ink md:text-5xl">
            <em>Read slowly, in your inbox.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            New essays, editorial letters, and quiet reading recommendations — sent a few times a year. No hurry, no noise.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full flex-1 border border-border bg-ivory px-5 py-4 text-sm text-ink placeholder:text-ink-soft focus:border-ink focus:outline-none sm:w-auto"
            />
            <button
              type="submit"
              className="group w-full flex-shrink-0 bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-teal sm:w-auto"
            >
              Subscribe →
            </button>
          </form>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-ink-soft">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
