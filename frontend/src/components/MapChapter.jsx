import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal, { EASE } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function MapChapter() {
  return (
    <section id="lieu" data-testid="map-chapter" className="relative py-32">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <SectionHeading number="02" title="Son Lieu" />
        <Reveal>
          <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Damas,
            <br />
            <span className="italic text-[#D4AF37]">au cœur des terres du Shâm</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex items-center justify-center gap-4" aria-hidden>
          <span className="h-px w-12 bg-[#D4AF37]/40" />
          <span className="h-1.5 w-1.5 rotate-45 border border-[#D4AF37]" />
          <span className="h-px w-12 bg-[#D4AF37]/40" />
        </Reveal>
        <div className="mt-14">
          <motion.div
            initial={{ opacity: 0, scale: 1.05, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <img
              src="/assets/map-damas.jpg"
              alt="Carte antique des terres du Shâm — Damas marquée d'un point de lumière d'or"
              data-testid="damascus-map"
              className="w-full shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>
        <Reveal delay={0.15} className="mt-14 flex justify-center">
          <a
            href="#oeuvre"
            data-testid="map-next-cue"
            aria-label="Vers la section son œuvre"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-[#A39E93] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
          >
            <ChevronDown className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
