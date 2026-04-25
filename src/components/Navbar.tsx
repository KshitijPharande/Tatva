import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/books", label: "Books" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/publish", label: "Publish" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
        ? "bg-paper/85 backdrop-blur-md border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4">
        <Link to="/" className={`absolute -left-8 md:-left-10 top-1/2 -translate-y-1/2 ${open ? "hidden md:block" : ""}`}>
          <img
            src={logo}
            alt="Tatva"
            className="h-[120px] md:h-40 w-auto object-contain"
          />
        </Link>
        {/* Spacer to balance flex layout since logo is absolute */}
        <div className="w-12 md:w-32" />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `link-line text-[13px] uppercase tracking-[0.18em] hover:text-ink ${isActive ? "text-ink" : "text-ink-soft"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/publish"
          className="hidden md:inline-flex items-center gap-2 border border-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Submit Book
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-paper">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-sm uppercase tracking-[0.2em] ${isActive ? "text-ink" : "text-ink-soft"}`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/publish"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex w-fit border border-ink px-5 py-2.5 text-[12px] uppercase tracking-[0.2em]"
            >
              Submit Book
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
