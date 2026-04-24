import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteLayout } from "@/components/SiteLayout";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";
import heroImg from "@/assets/hero-water.jpg";
import h1 from "@/assets/highlight1.jpg";
import h2 from "@/assets/highlight2.jpg";
import h3 from "@/assets/highlight3.jpg";

const highlights = [
  { img: h1, kicker: "Read", title: "An unhurried reading experience", body: "Pages turn one at a time. The world outside slows to match." },
  { img: h2, kicker: "Write", title: "A home for the patient manuscript", body: "We work with authors over months, not weeks. Slow editing, deep care." },
  { img: h3, kicker: "Keep", title: "A small, considered library", body: "Eight to twelve titles a year. Each one chosen, edited, and held." },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero parallax
      if (heroRef.current) {
        gsap.to(heroRef.current.querySelector("[data-hero-img]"), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Horizontal pinned highlights
      if (slidesRef.current && trackRef.current) {
        const track = trackRef.current;
        const distance = () => track.scrollWidth - window.innerWidth;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: slidesRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const featured = books.filter((b) => b.featured);

  return (
    <SiteLayout>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[640px] overflow-hidden bg-ivory">
        <div data-hero-img className="absolute inset-0 -top-12 -bottom-12">
          <img
            src={heroImg}
            alt="Calm water surface in soft ivory and teal light"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/40 to-ivory" />
        </div>

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.4em] text-ink-soft"
          >
            Est. — A Publishing House for Slow Readers
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-4xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-ink"
          >
            Books that ask <em className="italic-display text-teal">to be read</em><br />slowly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft"
          >
            Tatva is a small publishing house and reading platform — a quiet
            place for memoirs, essays, and the kind of poetry you read by
            the window, on a Sunday, with nowhere else to be.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/books"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-teal"
            >
              Browse the library
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/publish"
              className="link-line text-[12px] uppercase tracking-[0.2em] text-ink"
            >
              Submit your manuscript
            </Link>
          </motion.div>

          <div className="absolute bottom-10 left-6 hidden text-[10px] uppercase tracking-[0.3em] text-ink-soft md:block">
            ↓ Scroll
          </div>
        </div>
      </section>

      {/* HORIZONTAL HIGHLIGHTS */}
      <section ref={slidesRef} className="relative h-screen overflow-hidden bg-paper">
        <div ref={trackRef} className="flex h-full" style={{ width: `${highlights.length * 100}vw` }}>
          {highlights.map((s, i) => (
            <div key={i} className="flex h-full w-screen items-center px-6 md:px-20">
              <div className="grid w-full max-w-6xl mx-auto gap-12 md:grid-cols-2 md:items-center">
                <div className="aspect-[4/5] overflow-hidden bg-ivory shadow-page">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-teal">0{i + 1} — {s.kicker}</p>
                  <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-6xl">
                    <em>{s.title}</em>
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="bg-ivory px-6 py-28 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">The Library</p>
              <h2 className="mt-3 font-display text-5xl text-ink md:text-6xl"><em>Featured titles</em></h2>
            </div>
            <Link to="/books" className="link-line text-[12px] uppercase tracking-[0.2em] text-ink">
              View all books →
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((b, i) => <BookCard key={b.id} book={b} index={i} />)}
          </div>
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section className="bg-ivory px-6 py-28 md:py-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink-soft">This Season</p>
          <h2 className="mt-3 font-display text-5xl text-ink md:text-6xl"><em>Campaigns</em></h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { tag: "Spring 2025", title: "The Quiet Series", body: "A four-book series on solitude, slowness, and the rooms we read in." },
              { tag: "Anthology", title: "Letters from Home", body: "Twenty-two writers, one shared question: what does home sound like?" },
              { tag: "Translation", title: "Marathi Voices", body: "An ongoing project bringing contemporary Marathi prose into English." },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group flex flex-col justify-between border border-border bg-paper p-8 transition-colors hover:border-ink"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-teal">{c.tag}</p>
                  <h3 className="italic-display mt-4 text-3xl text-ink">{c.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                </div>
                <p className="mt-10 text-[11px] uppercase tracking-[0.25em] text-ink">Learn more →</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-ink px-6 py-20 text-paper md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-paper/60">Submit your work</p>
          <h2 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
            Have a manuscript<br /><em className="text-teal">that has waited</em>?
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-paper/70">
            We read every submission, slowly. If yours feels like a Tatva book,
            we'll be in touch within four weeks.
          </p>
          <Link
            to="/publish"
            className="mt-12 inline-flex items-center gap-3 border border-paper px-8 py-4 text-[12px] uppercase tracking-[0.25em] transition-colors hover:bg-paper hover:text-ink"
          >
            Submit your manuscript →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
