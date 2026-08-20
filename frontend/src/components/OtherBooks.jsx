import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Reveal, { EASE } from "./Reveal";
import { otherBooks } from "../data/content";
import { useLibrary } from "../lib/library";

export default function OtherBooks() {
  const { has, toggle } = useLibrary();

  const toggleFavorite = (book) => {
    const added = toggle(book.id);
    toast.success(
      added
        ? `« ${book.title} » ajouté à votre bibliothèque`
        : `« ${book.title} » retiré de votre bibliothèque`
    );
  };

  const cardRefs = useRef([]);
  const [centers, setCenters] = useState([0]);
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);
  const activeRef = useRef(0);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);

  const n = otherBooks.length;

  useEffect(() => {
    const measure = () => {
      setCenters(
        cardRefs.current.map((el) =>
          el ? el.offsetLeft + el.offsetWidth / 2 : 0
        )
      );
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const snapX = (i) => -(centers[i] - window.innerWidth / 2);

  const snapTo = (index) => {
    const clamped = Math.max(0, Math.min(n - 1, index));
    animate(x, snapX(clamped), { type: "spring", stiffness: 220, damping: 30 });
    setActive(clamped);
    activeRef.current = clamped;
  };

  const onDragEnd = () => {
    const current = x.get();
    let best = 0;
    let bestDist = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(snapX(i) - current);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    snapTo(best);
    setTimeout(() => {
      draggingRef.current = false;
    }, 900);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (draggingRef.current || hoveringRef.current || centers.length < 2)
        return;
      snapTo((activeRef.current + 1) % n);
    }, 2000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centers, n]);

  const leftBound = centers.length > 1 ? snapX(n - 1) : 0;
  const rightBound = centers.length > 1 ? snapX(0) : 0;

  return (
    <section
      id="autres-livres"
      data-testid="other-books-chapter"
      className="relative py-28 border-t border-white/10 overflow-hidden"
    >
      <Reveal className="text-center mb-10 px-6">
        <p
          className="font-mono-archive text-[11px] tracking-[0.4em] uppercase text-[#D4AF37]"
          data-testid="section-heading-06"
        >
          06 — Autres Livres
        </p>
        <h2 className="mt-6 font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
          Du même <span className="italic text-[#D4AF37]">univers</span>
        </h2>
        <p className="mt-4 font-mono-archive text-[10px] tracking-[0.35em] uppercase text-[#A39E93]/70">
          ← Glissez pour explorer →
        </p>
      </Reveal>

      <div className="relative" data-lenis-prevent>
        <motion.div
          drag="x"
          dragConstraints={{ left: leftBound, right: rightBound }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => {
            draggingRef.current = true;
          }}
          onDragEnd={onDragEnd}
          onHoverStart={() => (hoveringRef.current = true)}
          onHoverEnd={() => (hoveringRef.current = false)}
          style={{ x }}
          className="flex w-max items-center gap-4 sm:gap-12 px-[calc(50vw_-_22vw)] sm:px-[calc(50vw_-_160px)] cursor-grab active:cursor-grabbing"
          data-testid="other-books-track"
        >
          {otherBooks.map((book, i) => {
            const isActive = i === active;
            const dist = Math.abs(i - active);
            return (
              <div
                key={book.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="relative shrink-0 w-[44vw] sm:w-[320px] text-center select-none"
                data-testid={`other-book-${i}`}
              >
                <button
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={() => toggleFavorite(book)}
                  data-testid={`favorite-toggle-${book.id}`}
                  aria-label={
                    has(book.id)
                      ? `Retirer ${book.title} de ma bibliothèque`
                      : `Ajouter ${book.title} à ma bibliothèque`
                  }
                  className="absolute top-0 right-1 sm:right-2 z-10 p-2 text-[#A39E93] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  <Bookmark
                    className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${
                      has(book.id) ? "fill-[#D4AF37] text-[#D4AF37]" : ""
                    }`}
                  />
                </button>
                <motion.div
                  animate={{
                    scale: isActive ? 1 : dist === 1 ? 0.72 : 0.58,
                    opacity: isActive ? 1 : dist === 1 ? 0.5 : 0.25,
                  }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <img
                    src={book.image}
                    alt={`Couverture — ${book.title}`}
                    draggable={false}
                    className="w-full h-auto sm:w-auto sm:h-[44vh] mx-auto pointer-events-none drop-shadow-[0_40px_70px_rgba(0,0,0,0.75)]"
                    data-testid={isActive ? "other-book-image" : undefined}
                  />
                </motion.div>
                <div className="mt-6 h-[80px]">
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
                    transition={{ duration: 0.5, delay: isActive ? 0.25 : 0, ease: EASE }}
                  >
                    <p
                      className="font-display font-light text-2xl sm:text-3xl text-[#F2EBE5] leading-tight"
                      data-testid={isActive ? "other-book-title" : undefined}
                    >
                      {book.title}
                    </p>
                    <p className="mt-2 font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93]">
                      {book.subtitle}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <button
          onClick={() => snapTo(active - 1)}
          disabled={active === 0}
          data-testid="carousel-prev-button"
          aria-label="Livre précédent"
          className="hidden sm:flex absolute left-4 sm:left-10 top-[38%] z-10 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => snapTo(active + 1)}
          disabled={active === n - 1}
          data-testid="carousel-next-button"
          aria-label="Livre suivant"
          className="hidden sm:flex absolute right-4 sm:right-10 top-[38%] z-10 h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        className="mt-10 flex items-center justify-center gap-3"
        data-testid="other-books-progress"
      >
        {otherBooks.map((_, i) => (
          <button
            key={i}
            onClick={() => snapTo(i)}
            aria-label={`Aller au livre ${i + 1}`}
            data-testid={`carousel-dot-${i}`}
            className={`h-1.5 w-1.5 rotate-45 transition-colors duration-500 ${
              i === active ? "bg-[#D4AF37]" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
        <span className="ml-3 font-mono-archive text-[10px] tracking-[0.3em] text-[#A39E93]">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
