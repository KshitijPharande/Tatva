import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Book } from "@/data/books";

export function BookCard({ book, index = 0 }: { book: Book; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/books/${book.slug}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-paper shadow-soft transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-lg">
          <img
            src={book.coverUrl}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          {/* Synopsis overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="line-clamp-4 text-[13px] leading-relaxed text-paper/90">
              {book.description}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-paper/60">
              Read more →
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink-soft">{book.genre}</p>
          <h3 className="italic-display mt-1 text-xl leading-tight text-ink">{book.title}</h3>
          <p className="mt-1 text-sm text-ink-soft">{book.author}</p>
        </div>
      </Link>
    </motion.div>
  );
}
