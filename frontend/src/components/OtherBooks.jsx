import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Reveal, { EASE } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { otherBooks } from "../data/content";

export default function OtherBooks() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(
      Math.min(otherBooks.length - 1, Math.floor(v * otherBooks.length))
    );
  });

  const book = otherBooks[active];

  return (
    <section
      id="autres-livres"
      data-testid="other-books-chapter"
      ref={ref}
      className="relative border-t border-white/10"
      style={{ height: `${otherBooks.length * 90 + 60}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <Reveal className="text-center mb-6">
          <p
            className="font-mono-archive text-[11px] tracking-[0.4em] uppercase text-[#D4AF37]"
            data-testid="section-heading-05"
          >
            05 — Autres Livres
          </p>
          <h2 className="mt-6 font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Du même <span className="italic text-[#D4AF37]">univers</span>
          </h2>
        </Reveal>

        <div className="relative h-[42vh] sm:h-[46vh] w-full flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={active}
              src={book.image}
              alt={`Couverture — ${book.title}`}
              data-testid="other-book-image"
              initial={{ opacity: 0, y: 90, rotate: -5, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, y: -90, rotate: 4, scale: 0.95 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="h-full w-auto drop-shadow-[0_40px_70px_rgba(0,0,0,0.75)]"
            />
          </AnimatePresence>
        </div>

        <div className="mt-8 min-h-[96px] text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block font-display font-light text-2xl sm:text-3xl text-[#F2EBE5] leading-tight"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
                  data-testid="other-book-title"
                >
                  {book.title}
                </motion.span>
              </span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
                className="mt-3 font-mono-archive text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#A39E93]"
                data-testid="other-book-subtitle"
              >
                {book.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center gap-3" data-testid="other-books-progress">
          {otherBooks.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rotate-45 transition-colors duration-500 ${
                i === active ? "bg-[#D4AF37]" : "bg-white/20"
              }`}
            />
          ))}
          <span className="ml-3 font-mono-archive text-[10px] tracking-[0.3em] text-[#A39E93]">
            {String(active + 1).padStart(2, "0")} / {String(otherBooks.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
