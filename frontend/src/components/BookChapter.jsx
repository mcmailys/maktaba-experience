import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Reveal from "./Reveal";
import ChapterHeading from "./ChapterHeading";
import ReaderModal from "./ReaderModal";
import { author } from "../data/content";

export default function BookChapter() {
  const sectionRef = useRef(null);
  const [readerOpen, setReaderOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [160, -70]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 0, 7]);

  return (
    <section
      id="livre"
      ref={sectionRef}
      data-testid="book-chapter"
      className="relative py-32 lg:py-48 border-t border-white/10 overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-[10%] top-[20%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.1), transparent)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <ChapterHeading number="04" title="Le Livre" />
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 flex justify-center">
            <motion.div style={{ y, rotate }} data-testid="book-visual">
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={author.book.image}
                  alt="Les Méditations d'Ibn Al-Qayyim — Éditions Tawbah"
                  data-testid="book-cover"
                  className="w-[300px] sm:w-[380px] lg:w-[440px] drop-shadow-[0_60px_90px_rgba(0,0,0,0.8)]"
                />
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-arabic text-4xl sm:text-5xl text-[#D4AF37]" data-testid="book-title-arabic">
                {author.book.titleArabic}
              </p>
              <h2 className="mt-4 font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
                {author.book.titleLatin} —{" "}
                <span className="italic text-[#D4AF37]">{author.book.titleFrench}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
                Ni traité, ni poème : des éclairs. Des méditations dictées au
                fil des jours, ramassées comme des braises. Sept siècles plus
                tard, elles brûlent encore.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-3 font-mono-archive text-[11px] tracking-[0.2em] uppercase text-[#A39E93]" data-testid="book-meta">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]" /> Recueil spirituel — {author.book.publisher}
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]" /> Traduction française · reliure rigide
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]" /> Extraits consultables — feuilletage libre
                </li>
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <p className="font-display font-light text-4xl text-[#F2EBE5]" data-testid="book-price">
                  {author.book.price}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setReaderOpen(true)}
                    data-testid="open-reader-button"
                    className="group inline-flex items-center gap-3 bg-[#D4AF37] text-[#0B0C10] px-7 py-3.5 font-mono-archive text-[11px] tracking-[0.25em] uppercase hover:bg-[#F2EBE5] transition-colors duration-300"
                  >
                    <BookOpen className="h-4 w-4" />
                    Consulter quelques pages
                  </button>
                  <a
                    href="#commande"
                    data-testid="book-order-cta"
                    className="group inline-flex items-center gap-3 border border-white/20 text-[#F2EBE5] px-7 py-3.5 font-mono-archive text-[11px] tracking-[0.25em] uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    Commander
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {readerOpen && <ReaderModal onClose={() => setReaderOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
