import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "@/routes/index";
import AboutPage from "@/routes/about";
import BooksPage from "@/routes/books.index";
import BookDetail from "@/routes/books.$id";
import BlogPage from "@/routes/blog.index";
import ArticlePage from "@/routes/blog.$id";
import PublishPage from "@/routes/publish";
import ContactPage from "@/routes/contact";
import StudioPage from "@/routes/studio";
import { SiteLayout } from "@/components/SiteLayout";

function NotFoundPage() {
  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <div>
          <p className="italic-display text-[120px] leading-none text-ink">404</p>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-ink-soft">Page not found</p>
        </div>
      </div>
    </SiteLayout>
  );
}

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: "easeInOut" },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<ArticlePage />} />
          <Route path="/publish" element={<PublishPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/studio/*" element={<StudioPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
