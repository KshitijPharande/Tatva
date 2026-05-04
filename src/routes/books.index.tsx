import { useEffect, useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { BookCard } from "@/components/BookCard";
import { getBooks, getGenres } from "@/data/books";

export default function BooksPage() {
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState<string | null>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const fetchedBooks = await getBooks();
      const fetchedGenres = await getGenres();
      setBooks(fetchedBooks || []);
      setGenres((fetchedGenres || []).filter(Boolean));
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const title = b.title || "";
      const author = b.author || "";
      const tags = b.tags || [];
      const matchesQ = q.trim() === "" || `${title} ${author} ${tags.join(" ")}`.toLowerCase().includes(q.toLowerCase());
      const matchesG = !genre || b.genre === genre;
      return matchesQ && matchesG;
    });
  }, [q, genre, books]);

  return (
    <SiteLayout>
      <section className="border-b border-border px-6 pb-12 pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">The Library</p>
          <h1 className="mt-4 font-display text-6xl text-ink md:text-8xl"><em>All books</em></h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
            A small, considered shelf. Search by title or author, or wander
            through by genre — there is no wrong way to find a book.
          </p>

          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="w-full max-w-md">
              <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title, author, or theme…"
                className="mt-2 w-full border-b border-ink bg-transparent py-2 font-display text-xl italic placeholder:text-ink-soft focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setGenre(null)}
                className={`border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  !genre ? "border-ink bg-ink text-paper" : "border-border text-ink-soft hover:border-ink hover:text-ink"
                }`}
              >
                All
              </button>
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={`border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    genre === g ? "border-ink bg-ink text-paper" : "border-border text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {filtered.length === 0 ? (
            <p className="italic-display py-20 text-center text-2xl text-ink-soft">
              No books found. Try a different search.
            </p>
          ) : (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((b, i) => <BookCard key={b.id} book={b} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
