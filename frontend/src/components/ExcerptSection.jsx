import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import Reveal, { EASE } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { excerptPages } from "../data/content";

export default function ExcerptSection() {
  const [page, setPage] = useState(0);
  const total = excerptPages.length;
  const current = excerptPages[page];

  return (
    <section id="extrait" data-testid="excerpt-section" className="relative pt-16 pb-32">
      <div className="mx-auto max-w-xl px-6 text-center">
        <SectionHeading number="04" title="Lire un Extrait" />
        <Reveal>
          <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Feuilletez <span className="italic text-[#D4AF37]">quelques pages</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="mt-10 font-mono-archive text-xs tracking-[0.35em] text-[#A39E93]"
            data-testid="excerpt-page-indicator"
          >
            {page + 1} / {total}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative mt-8">
          <div
            className="relative overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            data-lenis-prevent
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={page}
                src={current.image}
                alt={`Page ${page + 1} du manuscrit — calligraphie ancienne`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="w-full aspect-[3/4] object-cover"
                data-testid="excerpt-image"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </div>
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            data-testid="excerpt-prev-button"
            aria-label="Page précédente"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
            disabled={page === total - 1}
            data-testid="excerpt-next-button"
            aria-label="Page suivante"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>

        <div className="mt-10 min-h-[130px] flex items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="font-display italic font-light text-lg sm:text-xl leading-relaxed text-[#F2EBE5]"
              data-testid="excerpt-quote"
            >
              « {current.quote} »
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="mt-12 border-t border-white/10 pt-8">
          <p className="flex items-center justify-center gap-2 text-sm text-[#F2EBE5]" data-testid="excerpt-lock-note">
            <Lock className="h-3.5 w-3.5 text-[#D4AF37]" />
            Accès limité à l'extrait
          </p>
          <a
            href="#commande"
            data-testid="unlock-book-link"
            className="mt-2 inline-block text-sm font-light text-[#A39E93] underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#D4AF37] transition-colors duration-300"
          >
            Débloquez le livre complet
          </a>
        </Reveal>
      </div>
    </section>
  );
}
