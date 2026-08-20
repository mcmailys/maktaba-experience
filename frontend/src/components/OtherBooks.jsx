import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Reveal, { EASE } from "./Reveal";
import { otherBooks } from "../data/content";

export default function OtherBooks() {
  const cardRefs = useRef([]);
  const [centers, setCenters] = useState([0]);
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);

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
    animate(x, snapX(clamped), { type: "spring", stiffness: 260, damping: 32 });
    setActive(clamped);
  };

  const onDragEnd = (_, info) => {
    const projected = x.get() + info.velocity.x * 0.18;
    let best = 0;
    let bestDist = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(snapX(i) - projected);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    snapTo(best);
  };

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
          data-testid="section-heading-05"
        >
          05 — Autres Livres
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
          dragElastic={0.12}
          onDragEnd={onDragEnd}
          style={{ x }}
          className="flex w-max items-center gap-14 sm:gap-24 px-[calc(50vw_-_31vw)] sm:px-[calc(50vw_-_180px)] cursor-grab active:cursor-grabbing"
          data-testid="other-books-track"
        >
          {otherBooks.map((book, i) => {
            const isActive = i === active;
            return (
              <div
                key={book.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="shrink-0 w-[62vw] sm:w-[360px] text-center select-none"
                data-testid={`other-book-${i}`}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.35,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <img
                    src={book.image}
                    alt={`Couverture — ${book.title}`}
                    draggable={false}
                    className="h-[36vh] sm:h-[44vh] w-auto mx-auto pointer-events-none drop-shadow-[0_40px_70px_rgba(0,0,0,0.75)]"
                    data-testid={isActive ? "other-book-image" : undefined}
                  />
                </motion.div>
                <div className="mt-6 h-[80px]">
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
                    transition={{ duration: 0.5, ease: EASE }}
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
          className="absolute left-4 sm:left-10 top-[38%] z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => snapTo(active + 1)}
          disabled={active === n - 1}
          data-testid="carousel-next-button"
          aria-label="Livre suivant"
          className="absolute right-4 sm:right-10 top-[38%] z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-30 transition-colors duration-300"
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
