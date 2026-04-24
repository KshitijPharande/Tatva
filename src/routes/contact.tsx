import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="px-6 pb-32 pt-24 md:pt-32">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-ink-soft">Write to us</p>
            <h1 className="mt-6 font-display text-5xl leading-tight text-ink md:text-7xl">
              <em>A letter,</em><br />kindly.
            </h1>
            <p className="mt-8 reading-text">
              For press, partnerships, or simply to say hello — write to us
              below, or send a letter to our office. We read every one,
              slowly.
            </p>
            <div className="mt-10 space-y-4 text-sm text-ink-soft">
              <p><span className="text-[10px] uppercase tracking-[0.3em]">Email</span><br /><span className="font-display italic text-ink">hello@tatva.press</span></p>
              <p><span className="text-[10px] uppercase tracking-[0.3em]">Studio</span><br /><span className="font-display italic text-ink">A quiet room, Pune.</span></p>
            </div>
          </div>

          <div>
            {sent ? (
              <div className="border border-border bg-paper p-12">
                <p className="text-[10px] uppercase tracking-[0.3em] text-teal">Sent</p>
                <p className="mt-4 font-display text-3xl italic leading-tight text-ink">Thank you for your letter.</p>
                <p className="mt-4 text-sm text-ink-soft">We will write back within a week.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-8 border border-border bg-paper p-8 md:p-12"
              >
                <Field label="Your name" />
                <Field label="Email" type="email" />
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Your letter</label>
                  <textarea rows={7} className="mt-2 w-full resize-none border-b border-ink bg-transparent py-2 font-display text-lg italic leading-relaxed focus:outline-none" />
                </div>
                <button className="group inline-flex items-center gap-3 bg-ink px-8 py-4 text-[12px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-teal">
                  Send <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">{label}</label>
      <input type={type} className="mt-2 w-full border-b border-ink bg-transparent py-2 font-display text-lg italic focus:outline-none" />
    </div>
  );
}
