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
        to={`/books/${book.id}`}
        className="group block"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-paper shadow-soft">
          <img
            src={book.coverUrl}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
