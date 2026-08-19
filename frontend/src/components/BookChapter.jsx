import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookMarked, BookOpen, FileText, Globe } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { author } from "../data/content";

const meta = [
  { icon: Globe, label: "Langue", value: author.book.langue },
  { icon: BookMarked, label: "Édition", value: author.book.edition },
  { icon: FileText, label: "Pages", value: author.book.pages },
];

export default function BookChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [70, -50]);

  return (
    <section
      id="oeuvre"
      ref={ref}
      data-testid="book-chapter"
      className="relative py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-xl px-6 text-center">
        <SectionHeading number="03" title="Son Œuvre" />

        <div className="relative flex justify-center">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[440px] w-[440px] rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.14), transparent)" }}
          />
          <motion.div style={{ y }} data-testid="book-visual">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={author.book.image}
                alt="Les Méditations d'Ibn al-Qayyim — édition Dar At-Tawbah"
                data-testid="book-cover"
                className="w-[300px] sm:w-[360px] shadow-[0_50px_100px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </motion.div>
        </div>

        <Reveal className="mt-16">
          <h2
            className="font-display font-medium uppercase tracking-[0.06em] text-[#F2EBE5] text-4xl sm:text-5xl"
            data-testid="book-title"
          >
            {author.book.title}
          </h2>
          <p className="mt-4 font-mono-archive text-[11px] tracking-[0.35em] uppercase text-[#D4AF37]">
            Ibn al-Qayyim
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
            {author.book.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-3 gap-4" data-testid="book-meta">
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <p className="font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93]">
                  {label}
                </p>
                <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[#F2EBE5]">
                  <Icon className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#extrait"
            data-testid="discover-excerpt-button"
            className="mt-12 inline-flex items-center gap-3 border border-white/25 px-8 py-4 font-mono-archive text-[11px] tracking-[0.3em] uppercase text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
          >
            <BookOpen className="h-4 w-4" />
            Découvrir l'extrait
          </a>
        </Reveal>
      </div>
    </section>
  );
}
