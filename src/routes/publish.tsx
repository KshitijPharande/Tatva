import { SiteLayout } from "@/components/SiteLayout";

export default function PublishPage() {
  return (
    <SiteLayout>
      <section className="px-6 pb-28 pt-24 md:pt-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[5fr_7fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">For Authors</p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-7xl">
              <em>Submit your manuscript.</em>
            </h1>
            <p className="mt-8 reading-text">
              We are a small house. We publish eight to twelve titles a year and
              read every submission ourselves. If your work feels like a Tatva
              book, we will be in touch within four weeks.
            </p>
            <ul className="mt-10 space-y-4 text-sm text-ink-soft">
              <li>— Memoir, essays, poetry, literary fiction, translation.</li>
              <li>— Submit a synopsis and the first three chapters or twenty poems.</li>
              <li>— No agent required. No fees. No hurry.</li>
            </ul>
          </div>

          <div className="border border-border bg-paper p-8 md:p-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-teal">How to submit</p>
            <h2 className="mt-4 font-display text-4xl italic leading-tight text-ink">
              Send your manuscript by email.
            </h2>

            <ol className="mt-8 space-y-5 text-sm leading-relaxed text-ink-soft">
              <li>1. Subject line: <span className="text-ink">Submission — [Genre] — [Manuscript Title]</span></li>
              <li>2. Include in your email body: your name, short bio, and contact number.</li>
              <li>3. Attach a 1-2 page synopsis (PDF or DOCX format).</li>
              <li>4. Attach sample writing: first 3 chapters, or up to 20 poems. (Please include a .docx or .txt file in addition to any PDF to help our digital reading team).</li>
              <li>5. Optional: mention similar books/authors and your intended readership.</li>
            </ol>

            <div className="mt-10 border-t border-border pt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Submission email</p>
              <a
                href="mailto:tatvammock@gmail.com?subject=Submission%20%E2%80%94%20%5BGenre%5D%20%E2%80%94%20%5BManuscript%20Title%5D"
                className="mt-3 inline-flex items-center gap-3 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-teal"
              >
                tatvammock@gmail.com
                <span>→</span>
              </a>
              <p className="mt-5 text-sm text-ink-soft">
                We read every submission with care and usually respond within four weeks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
