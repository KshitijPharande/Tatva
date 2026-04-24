import { motion } from "framer-motion";
import { SiteLayout } from "@/components/SiteLayout";
import highlight from "@/assets/highlight3.jpg";

export default function AboutPage() {
  return (
    <SiteLayout>
      <section className="px-6 pt-24 pb-20 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">About</p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="mt-6 font-display text-6xl leading-[1.05] text-ink md:text-8xl"
          >
            We make books<br />for the reader<br /><em className="text-teal">who returns.</em>
          </motion.h1>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="aspect-[16/9] overflow-hidden bg-paper shadow-page">
            <img src={highlight} alt="Books" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-teal">Our Story</p>
          </div>
          <div className="space-y-6 reading-text">
            <p className="first-letter:italic-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              Tatva began in a small room in Pune, with three writers and a
              shared question: what would it mean to publish only the books
              we ourselves would read twice?
            </p>
            <p>
              We are still small. We are still asking. We publish memoir,
              poetry, essays, and the occasional quiet novel — works that ask
              to be lived with. We work with our authors over months, not
              weeks. We design every page by hand. We choose the paper.
            </p>
            <p>
              We believe a book is not a product but a passage — a small, lit
              window in a long wall. Our work is to make that window clear.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-paper px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="italic-display text-3xl leading-relaxed text-ink md:text-5xl">
            "We do not publish quickly. We publish to be returned to."
          </p>
          <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-ink-soft">— The Editors</p>
        </div>
      </section>
    </SiteLayout>
  );
}
