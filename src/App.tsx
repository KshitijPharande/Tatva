import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "@/routes/index";
import AboutPage from "@/routes/about";
import BooksPage from "@/routes/books.index";
import BookDetail from "@/routes/books.$id";
import BlogPage from "@/routes/blog.index";
import ArticlePage from "@/routes/blog.$id";
import PublishPage from "@/routes/publish";
import ContactPage from "@/routes/contact";
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/publish" element={<PublishPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
