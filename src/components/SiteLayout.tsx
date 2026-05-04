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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 w-full shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:bottom-6 sm:left-auto sm:right-6 sm:w-48 sm:shadow-2xl md:bottom-10 md:right-10"
          >
            <Link to={`/books/${ad.slug}`} className="group flex bg-paper border-t sm:border border-border transition-colors hover:border-ink flex-row sm:flex-col sm:p-3 p-2 items-center sm:items-start h-16 sm:h-auto">
              {/* Mobile: image left, text right. Desktop: stacked */}
              <div className="h-full w-10 sm:w-full sm:aspect-[3/4] sm:h-auto shrink-0 overflow-hidden sm:mb-3 mr-3 sm:mr-0">
                <img src={ad.coverUrl} alt={ad.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="flex-1 min-w-0 pr-6 sm:pr-0">
                <p className="hidden sm:block mb-2 text-[8px] uppercase tracking-[0.2em] text-teal">Featured</p>
                <p className="italic-display text-sm text-ink leading-tight truncate sm:whitespace-normal">{ad.title}</p>
                <p className="sm:mt-1 text-[9px] uppercase tracking-[0.1em] text-ink-soft truncate">by {ad.author}</p>
              </div>
            </Link>
            <button 
              onClick={(e) => { e.preventDefault(); setAd(null); }}
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:-translate-y-0 sm:top-[-8px] sm:right-[-8px] flex h-6 w-6 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-ink text-paper text-[10px] hover:bg-teal"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
