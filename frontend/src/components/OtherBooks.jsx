import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import Reveal, { EASE } from "./Reveal";
import { otherBooks } from "../data/content";

export default function OtherBooks() {
  const ref = useRef(null);
  const cardRefs = useRef([]);
  const [centers, setCenters] = useState([0]);
  const [active, setActive] = useState(0);

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  const x = useTransform(smooth, (v) => {
    const n = centers.length;
    if (n < 2) return 0;
    const pos = Math.min(Math.max(v, 0), 1) * (n - 1);
    const f = Math.min(n - 2, Math.floor(pos));
    const t = pos - f;
    const center = centers[f] + t * (centers[f + 1] - centers[f]);
    return -(center - window.innerWidth / 2);
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(
      Math.min(otherBooks.length - 1, Math.floor(v * otherBooks.length))
    );
  });

  return (
    <section
      id="autres-livres"
      ref={ref}
      data-testid="other-books-chapter"
      className="relative border-t border-white/10"
      style={{ height: `${otherBooks.length * 100 + 40}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <Reveal className="text-center mb-8 px-6">
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

        <motion.div
          style={{ x }}
          className="flex w-max items-center gap-14 sm:gap-24 px-[35vw] sm:px-[38vw]"
          data-testid="other-books-track"
        >
          {otherBooks.map((book, i) => {
            const isActive = i === active;
            return (
              <div
                key={book.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="shrink-0 w-[62vw] sm:w-[360px] text-center"
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
                    className="h-[36vh] sm:h-[44vh] w-auto mx-auto drop-shadow-[0_40px_70px_rgba(0,0,0,0.75)]"
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

        <div
          className="mt-10 flex items-center justify-center gap-3"
          data-testid="other-books-progress"
        >
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
