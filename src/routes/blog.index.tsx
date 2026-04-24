import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { articles } from "@/data/blog";

export default function BlogPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border px-6 pb-16 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">The Journal</p>
          <h1 className="mt-4 font-display text-6xl text-ink md:text-8xl"><em>Essays & letters</em></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            Editorial notes from the room where the books are made. Read in
            the same way you would read one of our books — slowly, one page
            at a time.
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-16 md:grid-cols-2">
          {articles.map((a, i) => (
            <motion.article
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
            >
              <Link to={`/blog/${a.id}`} className="group block">
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
            </motion.article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
