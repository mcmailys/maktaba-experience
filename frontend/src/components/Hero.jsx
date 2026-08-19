import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { EASE } from "./Reveal";
import { author } from "../data/content";

function MaskedLine({ children, delay = 0 }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.15, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const yPortrait = useTransform(scrollY, [0, 900], [0, 150]);
  const yText = useTransform(scrollY, [0, 900], [0, -70]);

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-4 font-arabic leading-none text-[#F2EBE5] opacity-[0.05] select-none"
        style={{ fontSize: "clamp(10rem, 22vw, 22rem)" }}
      >
        الفوائد
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] bottom-[6%] h-[560px] w-[560px] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.15), transparent)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
        <motion.div style={{ y: yText }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="font-mono-archive text-[11px] tracking-[0.35em] uppercase text-[#D4AF37] mb-10"
            data-testid="hero-overline"
          >
            Archives du patrimoine — Feuillet Nº 001
          </motion.p>

          <h1
            data-testid="hero-title"
            className="font-display font-light leading-[0.92] tracking-tight text-[#F2EBE5]"
            style={{ fontSize: "clamp(3rem, 8.5vw, 7.75rem)" }}
          >
            <MaskedLine delay={0.35}>Ibn Qayyim</MaskedLine>
            <MaskedLine delay={0.5}>
              <span className="italic text-[#D4AF37]">al-Jawziyya</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 1, ease: EASE }}
            className="font-arabic text-3xl sm:text-4xl text-[#D4AF37]/90 mt-8"
            data-testid="hero-arabic-name"
          >
            {author.nameArabic}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: EASE }}
            className="mt-8 max-w-xl text-base sm:text-lg font-light leading-relaxed text-[#A39E93]"
            data-testid="hero-subtitle"
          >
            « Le médecin des cœurs. » Cinquante-huit années à Damas, plus de
            soixante ouvrages, une seule quête : ramener les cœurs vers leur
            Seigneur.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <span className="font-mono-archive text-[11px] tracking-[0.3em] text-[#A39E93]" data-testid="hero-dates">
              {author.hijri} · {author.gregorian} · DAMAS
            </span>
            <a
              href="#livre"
              data-testid="hero-manuscript-cta"
              className="group inline-flex items-center gap-3 border border-[#D4AF37]/60 text-[#D4AF37] px-7 py-3.5 font-mono-archive text-[11px] tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-colors duration-300"
            >
              Feuilleter le manuscrit
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 relative">
          <motion.div style={{ y: yPortrait }}>
            <motion.div
              initial={{ opacity: 0, y: 140, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.7, duration: 1.5, ease: EASE }}
            >
              <img
                src={author.portraitCutout}
                alt="Portrait d'Ibn Qayyim al-Jawziyya"
                data-testid="hero-portrait"
                className="w-full max-w-md mx-auto drop-shadow-[0_50px_80px_rgba(0,0,0,0.75)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        data-testid="hero-scroll-hint"
      >
        <span className="font-mono-archive text-[10px] tracking-[0.35em] uppercase text-[#A39E93]">
          Faire défiler l'histoire
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
