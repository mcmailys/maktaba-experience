import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import Reveal, { EASE } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { excerptPages } from "../data/content";

export default function ExcerptSection() {
  const [page, setPage] = useState(0);
  const [flipTarget, setFlipTarget] = useState(null);
  const sheetControls = useAnimationControls();
  const shadeControls = useAnimationControls();

  const total = excerptPages.length;
  const current = excerptPages[page];
  const base = flipTarget !== null ? excerptPages[flipTarget] : current;

  const turnTo = (target) => {
    if (flipTarget !== null || target === page) return;
    setFlipTarget(target);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shadeControls.set({ opacity: 0 });
        sheetControls.set({ rotateY: 0 });
        shadeControls.start({
          opacity: [0, 0.45, 0],
          transition: { duration: 0.95, times: [0, 0.5, 1], ease: "easeInOut" },
        });
        sheetControls
          .start({
            rotateY: -180,
            transition: { duration: 0.95, ease: [0.45, 0, 0.2, 1] },
          })
          .then(() => {
            setPage(target);
            setFlipTarget(null);
            sheetControls.set({ rotateY: 0 });
          });
      });
    });
  };

  return (
    <section id="extrait" data-testid="excerpt-section" className="relative pt-16 pb-32">
      <div className="mx-auto max-w-xl px-6 text-center">
        <SectionHeading number="05" title="Lire un Extrait" />
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
            className="relative border border-white/10 bg-[#F4EFE4] shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            style={{ perspective: "1800px" }}
            data-lenis-prevent
          >
            <img
              src={base.image}
              alt={base.caption}
              className="w-full aspect-[3/4] object-contain"
              data-testid="excerpt-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" aria-hidden />

            {flipTarget !== null && (
              <motion.div
                animate={sheetControls}
                initial={{ rotateY: 0 }}
                className="absolute inset-0 origin-left"
                style={{ transformStyle: "preserve-3d" }}
                data-testid="page-flip-sheet"
              >
                <div
                  className="absolute inset-0 bg-[#F4EFE4]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <img
                    src={current.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                  <motion.div
                    animate={shadeControls}
                    initial={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background:
                      "linear-gradient(to right, #EAE1C9, #DFD4B8 60%, #D2C6A6)",
                  }}
                />
              </motion.div>
            )}
          </div>

          <button
            onClick={() => turnTo(Math.max(0, page - 1))}
            disabled={page === 0 || flipTarget !== null}
            data-testid="excerpt-prev-button"
            aria-label="Page précédente"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => turnTo(Math.min(total - 1, page + 1))}
            disabled={page === total - 1 || flipTarget !== null}
            data-testid="excerpt-next-button"
            aria-label="Page suivante"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </Reveal>

        <div className="mt-10 min-h-[60px] flex items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={page}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="font-display italic font-light text-lg sm:text-xl leading-relaxed text-[#F2EBE5]"
              data-testid="excerpt-quote"
            >
              {current.caption}
            </motion.p>
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
