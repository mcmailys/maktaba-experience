import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-[68%]">
        <motion.img
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
          src={author.heroPortrait}
          alt="Portrait à l'huile d'Ibn al-Qayyim"
          data-testid="hero-portrait"
          className="w-full h-full object-cover object-top md:object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10]/45 via-transparent to-[#0B0C10]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C10]/50 via-transparent to-[#0B0C10]/50" />
      </div>

      <p
        aria-hidden
        className="absolute left-5 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] font-mono-archive text-[10px] tracking-[0.45em] uppercase text-[#A39E93]/80 select-none hidden sm:block"
      >
        Explorer le savoir, transmettre la lumière.
      </p>

      <div className="relative z-10 px-6 pb-12 text-center">
        <h1
          data-testid="hero-title"
          className="font-display font-medium uppercase leading-[1.04] tracking-[0.04em] text-[#F2EBE5]"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
        >
          <MaskedLine delay={0.5}>Ibn</MaskedLine>
          <MaskedLine delay={0.65}>al-Qayyim</MaskedLine>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 1, ease: EASE }}
          className="mt-7 font-mono-archive text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#A39E93]"
          data-testid="hero-fullname"
        >
          {author.fullName}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: EASE }}
          className="mt-5 font-display text-2xl sm:text-3xl text-[#F2EBE5]"
          data-testid="hero-dates"
        >
          {author.gregorian}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <motion.a
            href="#histoire"
            data-testid="hero-scroll-button"
            aria-label="Scrollez pour explorer"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.a>
          <span className="font-mono-archive text-[10px] tracking-[0.35em] uppercase text-[#A39E93]">
            Scrollez pour explorer
          </span>
        </motion.div>
      </div>
    </section>
  );
}
