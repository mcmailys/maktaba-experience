import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { getBook, useLibrary } from "../lib/library";

function CssSpine({ title }) {
  return (
    <div className="h-28 sm:h-40 w-[34px] sm:w-[46px] rounded-[3px] bg-gradient-to-b from-[#1B1E26] via-[#13151A] to-[#0D0F13] border-x border-t border-[#D4AF37]/25 flex flex-col items-center justify-between py-2 shadow-[0_14px_28px_rgba(0,0,0,0.65)]">
      <span className="h-px w-3/4 bg-[#D4AF37]/60" />
      <span className="[writing-mode:vertical-rl] font-display text-[10px] sm:text-xs leading-none text-[#D4AF37] tracking-wide overflow-hidden max-h-[72%]">
        {title}
      </span>
      <span className="h-px w-3/4 bg-[#D4AF37]/60" />
    </div>
  );
}

export default function Bibliotheque({ open, onClose }) {
  const { ids, remove } = useLibrary();
  const [selected, setSelected] = useState(null);
  const books = ids.map(getBook).filter(Boolean);
  const selectedBook = selected ? getBook(selected) : null;

  const handleRemove = (book) => {
    remove(book.id);
    setSelected(null);
    toast.success(`« ${book.title} » retiré de votre bibliothèque`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          data-testid="library-modal"
        >
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto border border-[#D4AF37]/25 bg-[#0B0C10]/95 px-5 sm:px-10 py-8 sm:py-10"
            data-lenis-prevent
            data-testid="library-panel"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono-archive text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">
                  Vos favoris
                </p>
                <h2 className="mt-3 font-display font-light text-3xl sm:text-4xl text-[#F2EBE5]">
                  Ma <span className="italic text-[#D4AF37]">bibliothèque</span>
                </h2>
                <p className="mt-2 font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93]">
                  {books.length} ouvrage{books.length > 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={onClose}
                data-testid="library-close-button"
                aria-label="Fermer la bibliothèque"
                className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full border border-white/20 text-[#A39E93] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {books.length === 0 ? (
              <div
                className="mt-14 mb-6 flex flex-col items-center text-center"
                data-testid="library-empty"
              >
                <BookOpen className="h-8 w-8 text-[#D4AF37]/60" />
                <p className="mt-5 font-display text-xl text-[#F2EBE5]">
                  Votre étagère est vide
                </p>
                <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-[#A39E93]">
                  Ajoutez des ouvrages depuis la section « Autres Livres » en
                  touchant le marque-page.
                </p>
                <img
                  src="/assets/shelf/etagere.webp"
                  alt=""
                  className="mt-8 w-full max-w-md opacity-60"
                />
              </div>
            ) : (
              <div className="mt-12" data-testid="library-shelf">
                <div className="flex items-end justify-center gap-[3px] sm:gap-1.5 px-2">
                  {books.map((b) => (
                    <motion.button
                      key={b.id}
                      layout
                      onClick={() =>
                        setSelected(selected === b.id ? null : b.id)
                      }
                      animate={{ y: selected === b.id ? -10 : 0 }}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 320, damping: 24 }}
                      data-testid={`shelf-spine-${b.id}`}
                      aria-label={`Voir le détail de ${b.title}`}
                      className={`relative shrink-0 cursor-pointer ${
                        selected === b.id
                          ? "drop-shadow-[0_0_18px_rgba(212,175,55,0.45)]"
                          : ""
                      }`}
                    >
                      {b.spine ? (
                        <img
                          src={b.spine}
                          alt={`Tranche — ${b.title}`}
                          draggable={false}
                          className="h-28 sm:h-40 w-auto select-none shadow-[0_14px_28px_rgba(0,0,0,0.65)]"
                        />
                      ) : (
                        <CssSpine title={b.title} />
                      )}
                    </motion.button>
                  ))}
                </div>
                <img
                  src="/assets/shelf/etagere.webp"
                  alt="Étagère en bois"
                  className="w-full -mt-[4px] select-none"
                  draggable={false}
                  data-testid="library-shelf-image"
                />
              </div>
            )}

            <AnimatePresence mode="wait">
              {selectedBook && (
                <motion.div
                  key={selectedBook.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-8 flex items-center justify-between gap-5 border border-[#D4AF37]/25 bg-[#13151A]/80 px-5 py-5"
                  data-testid="library-book-detail"
                >
                  <div className="min-w-0">
                    <p
                      className="font-display text-xl sm:text-2xl text-[#F2EBE5] leading-snug"
                      data-testid="library-book-title"
                    >
                      {selectedBook.title}
                    </p>
                    <p
                      className="mt-1.5 text-sm font-light text-[#A39E93]"
                      data-testid="library-book-author"
                    >
                      {selectedBook.author}
                    </p>
                    <p className="mt-2 font-mono-archive text-[9px] tracking-[0.3em] uppercase text-[#D4AF37]/80">
                      {selectedBook.edition}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(selectedBook)}
                    data-testid="library-remove-button"
                    className="shrink-0 inline-flex items-center gap-2 border border-red-400/40 px-4 py-3 font-mono-archive text-[10px] tracking-[0.2em] uppercase text-red-300/90 hover:bg-red-400/10 hover:border-red-400 transition-colors duration-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Retirer
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {books.length > 0 && !selectedBook && (
              <p className="mt-8 text-center font-mono-archive text-[9px] tracking-[0.35em] uppercase text-[#A39E93]/60">
                Touchez une tranche pour voir le détail
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
