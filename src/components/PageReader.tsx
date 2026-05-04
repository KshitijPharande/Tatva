import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  content: string;
  title: string;
  author?: string;
  onClose?: () => void;
};

export function PageReader({ content, title, author, onClose }: Props) {
  const [mode, setMode] = useState<"page" | "scroll">("page");

  // Dynamically paginate the single content string into chunks of ~650 characters.
  // Forces a new page when a chapter heading is detected.
  const pages = useMemo(() => {
    const paragraphs = (content || "").split('\n\n');
    const result: string[] = [];
    let currentPage = '';
    
    for (const p of paragraphs) {
      const plainText = p.replace(/<[^>]*>/g, '').trim();
      const isChapterHeading = plainText.toUpperCase().startsWith('CHAPTER');
      const isPageBreak = /^[-—]{2,3}$/.test(plainText) || plainText.toLowerCase() === '/pagebreak';
      
      // Force a page break if we hit a chapter heading or manual break
      if ((isChapterHeading || isPageBreak) && currentPage.trim().length > 0) {
        result.push(currentPage.trim());
        currentPage = '';
      }
      
      // Skip adding the '---' text itself to the new page
      if (isPageBreak) continue;

      if (currentPage.length + p.length > 650 && currentPage.length > 0) {
        result.push(currentPage.trim());
        currentPage = p;
      } else {
        currentPage += (currentPage ? '\n\n' : '') + p;
      }
    }
    if (currentPage.trim()) result.push(currentPage.trim());
    return result;
  }, [content]);

  // Build a linear array of single pages. The first page is the title page.
  const bookPages = useMemo(() => {
    const all: Array<{ content: string | null; isTitle: boolean; isFin: boolean; pageNum: number | null }> = [];
    // Title page
    all.push({ content: null, isTitle: true, isFin: false, pageNum: null });
    // Content pages
    for (let i = 0; i < pages.length; i++) {
      all.push({
        content: pages[i],
        isTitle: false,
        isFin: false,
        pageNum: i + 1,
      });
    }
    // Fin page
    all.push({ content: null, isTitle: false, isFin: true, pageNum: null });
    return all;
  }, [pages]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lockRef = useRef(false);
  const touchStart = useRef<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pendingScrollPageRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const maxScroll = scrollHeight - clientHeight;
    setScrollProgress(maxScroll > 0 ? scrollTop / maxScroll : 0);
  }, []);

  const turn = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      const next = currentIndex + dir;
      if (next < 0 || next >= bookPages.length) return;
      lockRef.current = true;
      setDirection(dir);
      setCurrentIndex(next);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 750);
    },
    [currentIndex, bookPages.length],
  );

  // In page mode, wheel always flips pages (no inner page scrolling).
  useEffect(() => {
    if (mode === "scroll") return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 18) return;
      turn(e.deltaY > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); turn(1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); turn(-1); }
      if (e.key === "Escape") onClose?.();
    };

    const onTouchStart = (e: TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStart.current == null) return;
      const dx = touchStart.current - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 50) turn(dx > 0 ? 1 : -1);
      touchStart.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [turn, onClose, mode]);

  // Reset scroll on page change
  useEffect(() => {
    if (mode === "page") {
      pageRef.current?.scrollTo({ top: 0 });
    }
  }, [currentIndex, mode]);

  const current = bookPages[currentIndex];
  const totalPages = pages.length;
  const progress = current.pageNum ?? 0;

  const toggleMode = useCallback(() => {
    if (mode === "page") {
      // Map current paged position to scroll mode.
      // Title/fin map to top/bottom naturally.
      pendingScrollPageRef.current = current.isTitle
        ? 1
        : current.isFin
          ? pages.length
          : current.pageNum ?? 1;
      setMode("scroll");
      return;
    }

    // Map current scroll position back to the nearest content section.
    const container = scrollContainerRef.current;
    if (container) {
      const sections = Array.from(
        container.querySelectorAll<HTMLElement>("[data-scroll-page]"),
      );
      if (sections.length > 0) {
        const containerTop = container.getBoundingClientRect().top;
        const targetY = containerTop + container.clientHeight * 0.25;
        let nearestPage = 1;
        let bestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
          const pageAttr = section.dataset.scrollPage;
          const pageNum = pageAttr ? Number(pageAttr) : NaN;
          if (!Number.isFinite(pageNum)) return;

          const distance = Math.abs(section.getBoundingClientRect().top - targetY);
          if (distance < bestDistance) {
            bestDistance = distance;
            nearestPage = pageNum;
          }
        });

        // bookPages has title at index 0, so content page N is index N.
        setCurrentIndex(Math.min(Math.max(nearestPage, 1), pages.length));
      }
    }

    setMode("page");
  }, [mode, current.isTitle, current.isFin, current.pageNum, pages.length]);

  useEffect(() => {
    if (mode !== "scroll") return;
    const container = scrollContainerRef.current;
    const targetPage = pendingScrollPageRef.current;
    if (!container || targetPage == null) return;

    const target = container.querySelector<HTMLElement>(
      `[data-scroll-page="${targetPage}"]`,
    );
    if (target) {
      const top =
        target.offsetTop - Math.max((container.clientHeight - target.clientHeight) / 6, 0);
      container.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }
    pendingScrollPageRef.current = null;
  }, [mode]);

  const variants = {
    enter: (dir: number) => ({ rotateY: dir > 0 ? 25 : -25, opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { rotateY: 0, opacity: 1, x: 0 },
    exit: (dir: number) => ({ rotateY: dir > 0 ? -25 : 25, opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-ivory">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-ivory/70 px-6 py-4 backdrop-blur md:px-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">Now reading</p>
          <p className="italic-display text-lg text-ink">{title}{author ? ` — ${author}` : ""}</p>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={toggleMode}
            className="text-[11px] uppercase tracking-[0.25em] text-ink-soft hover:text-ink"
          >
            {mode === "page" ? "Scroll View" : "Page View"}
          </button>
          <button
            onClick={onClose}
            className="text-[11px] uppercase tracking-[0.25em] text-ink-soft hover:text-ink"
          >
            Close
          </button>
        </div>
      </div>

      {mode === "page" ? (
        <>
          {/* Page Area */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-6 md:px-10 md:py-10" style={{ perspective: "2000px" }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid h-full w-auto max-w-full aspect-[1/1.414] grid-cols-1 overflow-hidden rounded-sm bg-paper shadow-page paper-grain @container"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Left spine shadow to simulate a book feel on a single page */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/5 to-transparent mix-blend-multiply" />

                {/* Page Content */}
                <div
                  ref={pageRef}
                  className="h-full overflow-hidden flex flex-col justify-between"
                  style={{ padding: "10cqi 10cqi" }}
                >
                  {current.isTitle ? (
                    // Title page
                    <div className="flex h-full flex-col justify-between">
                      <p className="text-teal" style={{ fontSize: "2.2cqi", textTransform: "uppercase", letterSpacing: "0.4em" }}>Tatva — A Reading</p>
                      <div>
                        <h2 className="font-display text-ink" style={{ fontSize: "8cqi", lineHeight: "1.1" }}>
                          <em>{title}</em>
                        </h2>
                        {author && (
                          <p className="font-display text-ink-soft mt-4" style={{ fontSize: "3.5cqi" }}>by {author}</p>
                        )}
                        <div className="bg-ink mt-8 h-px" style={{ width: "15cqi" }} />
                        <p className="text-ink-soft mt-8" style={{ fontSize: "2.5cqi" }}>
                          Turn the page to begin. The world outside slows to match.
                        </p>
                      </div>
                      <p className="text-ink-soft" style={{ fontSize: "2cqi", textTransform: "uppercase", letterSpacing: "0.3em" }}>An imprint of Tatva</p>
                    </div>
                  ) : current.isFin ? (
                    // Fin page
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <p className="italic-display text-ink" style={{ fontSize: "6cqi" }}>Fin.</p>
                      <p className="text-ink-soft mt-4" style={{ fontSize: "2.2cqi", textTransform: "uppercase", letterSpacing: "0.3em" }}>
                        End of sample
                      </p>
                    </div>
                  ) : (
                    // Content page
                    <>
                      <p 
                        className="whitespace-pre-line text-ink [&_b]:font-semibold [&_i]:italic [&_u]:underline" 
                        style={{ fontFamily: "var(--font-display)", fontSize: "3.8cqi", lineHeight: "1.85", textAlign: "justify" }}
                        dangerouslySetInnerHTML={{ __html: current.content || "" }}
                      />
                      <p className="text-right text-ink-soft mt-auto pt-4" style={{ fontSize: "2cqi", textTransform: "uppercase", letterSpacing: "0.3em" }}>
                        {current.pageNum} / {totalPages}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="h-[2px] w-full bg-border">
            <div
              className="h-full bg-teal transition-all duration-500 ease-out"
              style={{ width: `${(currentIndex / (bookPages.length - 1)) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between bg-ivory/70 px-6 py-4 backdrop-blur md:px-10">
            <button
              onClick={() => turn(-1)}
              disabled={currentIndex === 0}
              className="text-[11px] uppercase tracking-[0.25em] text-ink-soft hover:text-ink disabled:opacity-30"
            >
              ← Previous
            </button>
            <p className="hidden text-[11px] uppercase tracking-[0.25em] text-ink-soft md:block">
              {progress > 0 ? `${progress} / ${totalPages}` : 'Cover'}
            </p>
            <button
              onClick={() => turn(1)}
              disabled={currentIndex === bookPages.length - 1}
              className="text-[11px] uppercase tracking-[0.25em] text-ink-soft hover:text-ink disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </>
      ) : (
        <>
        {/* Scroll Mode Area */}
        <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-6 md:px-10 md:py-10">
          <div className="mx-auto w-full max-w-[700px] rounded-sm bg-paper px-8 py-16 shadow-page paper-grain md:px-16 md:py-24">
            {/* Title Section */}
            <div className="mb-20 text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] text-teal">Tatva — A Reading</p>
              <h2 className="mt-6 font-display text-4xl leading-tight text-ink md:text-5xl">
                <em>{title}</em>
              </h2>
              {author && <p className="mt-4 font-display text-lg text-ink-soft">by {author}</p>}
              <div className="mx-auto mt-8 h-px w-16 bg-ink" />
              <p className="mt-8 text-sm text-ink-soft">
                Scroll to begin. The world outside slows to match.
              </p>
            </div>

            {/* Pages Section */}
            {pages.map((p, i) => {
              const isChapter = p.trim().toUpperCase().startsWith('CHAPTER');
              const nextIsChapter = i < pages.length - 1 && pages[i + 1].trim().toUpperCase().startsWith('CHAPTER');
              
              return (
                <div key={i} data-scroll-page={i + 1} className={`mb-10 ${isChapter && i !== 0 ? 'mt-32 border-t border-border pt-24 md:mt-48 md:pt-32' : ''}`}>
                  <p 
                    className="reading-text whitespace-pre-line text-justify [&_b]:font-semibold [&_i]:italic [&_u]:underline"
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                  {i < pages.length - 1 && !nextIsChapter && (
                    <div className="mx-auto my-12 flex w-12 justify-center text-ink-soft">
                      <span className="text-xl leading-none">·</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Fin Section */}
            <div className="mt-20 border-t border-border pt-10 text-center">
              <p className="italic-display text-3xl text-ink">Fin.</p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-ink-soft">
                End of sample
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-[2px] w-full bg-border">
          <div
            className="h-full bg-teal transition-[width] duration-150 ease-out"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-center bg-ivory/70 px-6 py-3 backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.25em] text-ink-soft">
            {Math.round(scrollProgress * 100)}% read
          </p>
        </div>
        </>
      )}
    </div>
  );
}
