import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import { PageReader } from "@/components/PageReader";
import { books } from "@/data/books";

export default function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const [reading, setReading] = useState(false);

  if (!book) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <p className="italic-display text-5xl text-ink">Book not found</p>
          <Link to="/books" className="mt-8 inline-block link-line text-[12px] uppercase tracking-[0.2em]">← Back to library</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="px-6 pt-20 pb-28 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[5fr_6fr] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="md:sticky md:top-28"
          >
            <div className="aspect-[3/4] overflow-hidden bg-paper shadow-page">
              <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/books" className="text-[11px] uppercase tracking-[0.3em] text-ink-soft hover:text-ink">
              ← The Library
            </Link>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-teal">{book.genre}</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-7xl">
              <em>{book.title}</em>
            </h1>
            <p className="mt-4 font-display text-xl text-ink-soft">by {book.author}</p>

            <div className="my-10 h-px w-16 bg-ink" />

            <p className="reading-text">{book.description}</p>

            <p className="mt-10 reading-text">
              An invitation to sit with these pages — to let the sentences settle,
              to let the silences between them speak as well. Tatva publishes
              for the reader who returns.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {book.tags.map((t: string) => (
                <span key={t} className="border border-border px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setReading(true)}
                className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-teal"
              >
                Read sample
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => alert("This is a demo — PDF download is simulated.")}
                className="link-line text-[12px] uppercase tracking-[0.2em] text-ink"
              >
                Download PDF
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {reading && (
        <PageReader
          pages={book.pages}
          title={book.title}
          author={book.author}
          onClose={() => setReading(false)}
        />
      )}
    </SiteLayout>
  );
}
