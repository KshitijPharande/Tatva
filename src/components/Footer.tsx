import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="italic-display text-3xl text-ink">Tatva</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              A quiet home for thoughtful writing. We publish books and essays
              that ask to be read slowly, in good light, with a cup of something warm.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink-soft">Read</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/books" className="link-line text-ink">Books</Link></li>
              <li><Link to="/blog" className="link-line text-ink">Journal</Link></li>
              <li><Link to="/about" className="link-line text-ink">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-ink-soft">Work With Us</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/publish" className="link-line text-ink">Publish</Link></li>
              <li><Link to="/contact" className="link-line text-ink">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-ink-soft md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Tatva. All rights reserved.</p>
          <p className="italic-display">Read slowly.</p>
        </div>
      </div>
    </footer>
  );
}
