import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { excerptPages } from "../data/content";

export default function ReaderModal({ onClose }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const total = excerptPages.length;
  const current = excerptPages[page];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const go = (next) => {
    setDir(next > page ? 1 : -1);
    setPage(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      data-testid="reader-modal"
      data-lenis-prevent
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        data-testid="reader-backdrop"
      />
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl bg-[#13151A] border border-[#D4AF37]/25 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/10">
          <p className="font-mono-archive text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#A39E93]">
            Al-Fawā'id — Les Méditations
          </p>
          <div className="flex items-center gap-5">
            <p className="font-mono-archive text-[10px] sm:text-[11px] tracking-[0.3em] text-[#D4AF37]" data-testid="reader-page-indicator">
              FEUILLET {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <button
              onClick={onClose}
              data-testid="reader-close-button"
              aria-label="Fermer le lecteur"
              className="text-[#A39E93] hover:text-[#D4AF37] transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[380px] sm:min-h-[420px] px-6 sm:px-12 py-10 flex flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              initial={{ opacity: 0, x: dir * 90 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -90 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              data-testid="reader-page-content"
            >
              {current.type === "cover" && (
                <div className="text-center">
                  <p className="font-arabic text-6xl sm:text-7xl text-[#D4AF37]">{current.arabic}</p>
                  <p className="mt-6 font-display font-light text-3xl sm:text-4xl text-[#F2EBE5]">{current.title}</p>
                  <p className="mt-4 font-mono-archive text-[11px] tracking-[0.3em] uppercase text-[#A39E93]">
                    {current.author}
                  </p>
                  <p className="mt-8 font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#A39E93]/70">
                    {current.note}
                  </p>
                </div>
              )}
              {current.type === "quote" && (
                <figure>
                  <span aria-hidden className="font-display text-6xl leading-none text-[#D4AF37]">«</span>
                  <blockquote className="font-display font-light text-xl sm:text-2xl leading-relaxed text-[#F2EBE5] -mt-4">
                    {current.text}
                  </blockquote>
                  <figcaption className="mt-8 font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#A39E93]">
                    — {current.source}
                  </figcaption>
                </figure>
              )}
              {current.type === "end" && (
                <div className="text-center">
                  <p className="font-display italic font-light text-2xl sm:text-3xl leading-relaxed text-[#F2EBE5]">
                    « {current.quote} »
                  </p>
                  <p className="mt-8 text-sm font-light leading-relaxed text-[#A39E93] max-w-md mx-auto">
                    {current.note}
                  </p>
                  <a
                    href="#commande"
                    onClick={onClose}
                    data-testid="reader-order-button"
                    className="mt-10 inline-block bg-[#D4AF37] text-[#0B0C10] px-8 py-3.5 font-mono-archive text-[11px] tracking-[0.25em] uppercase hover:bg-[#F2EBE5] transition-colors duration-300"
                  >
                    Commander l'ouvrage
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-t border-white/10">
          <button
            onClick={() => go(Math.max(0, page - 1))}
            disabled={page === 0}
            data-testid="reader-prev-button"
            className="inline-flex items-center gap-2 font-mono-archive text-[11px] tracking-[0.25em] uppercase text-[#A39E93] hover:text-[#D4AF37] disabled:opacity-30 disabled:hover:text-[#A39E93] transition-colors duration-300"
          >
            <ChevronLeft className="h-4 w-4" /> Précédent
          </button>
          <div className="flex gap-2">
            {excerptPages.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Aller au feuillet ${i + 1}`}
                data-testid={`reader-dot-${i}`}
                className={`h-1.5 w-1.5 rotate-45 transition-colors duration-300 ${
                  i === page ? "bg-[#D4AF37]" : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(Math.min(total - 1, page + 1))}
            disabled={page === total - 1}
            data-testid="reader-next-button"
            className="inline-flex items-center gap-2 font-mono-archive text-[11px] tracking-[0.25em] uppercase text-[#A39E93] hover:text-[#D4AF37] disabled:opacity-30 disabled:hover:text-[#A39E93] transition-colors duration-300"
          >
            Suivant <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
