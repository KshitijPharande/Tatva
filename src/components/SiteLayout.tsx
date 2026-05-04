import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { getPromotedBook } from "@/data/books";
import { motion, AnimatePresence } from "framer-motion";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const book = await getPromotedBook();
      if (book) setAd(book);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      <AnimatePresence>
        {ad && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed bottom-6 right-6 z-50 w-48 shadow-2xl md:bottom-10 md:right-10 hidden sm:block"
          >
            <Link to={`/books/${ad.slug}`} className="group block bg-paper p-3 border border-border transition-colors hover:border-ink">
              <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-teal">Featured Book</p>
              <div className="aspect-[3/4] w-full overflow-hidden mb-3">
                <img src={ad.coverUrl} alt={ad.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <p className="italic-display text-sm text-ink leading-tight">{ad.title}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-ink-soft">by {ad.author}</p>
            </Link>
            <button 
              onClick={(e) => { e.preventDefault(); setAd(null); }}
              className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-paper text-[10px] hover:bg-teal"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
