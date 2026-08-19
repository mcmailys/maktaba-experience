import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const DAMAS_X = "60.3%";
const DAMAS_Y = "67.4%";

export default function MapChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.16, 0.3], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const scale = useTransform(scrollYProgress, [0.06, 0.78], [1, 2.9]);
  const ringOpacity = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);
  const ringScale = useTransform(scrollYProgress, [0.48, 0.72], [0.3, 1]);
  const labelOpacity = useTransform(scrollYProgress, [0.62, 0.74], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.62, 0.78], [20, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.8, 0.93], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.8, 0.95], [30, 0]);

  return (
    <section
      id="lieu"
      data-testid="map-chapter"
      ref={ref}
      className="relative"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="text-center mb-10">
          <p
            className="font-mono-archive text-[11px] tracking-[0.4em] uppercase text-[#D4AF37]"
            data-testid="section-heading-02"
          >
            02 — Son Lieu
          </p>
          <h2 className="mt-8 font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Damas,
            <br />
            <span className="italic text-[#D4AF37]">au cœur des terres du Shâm</span>
          </h2>
        </motion.div>

        <div
          className="relative w-full max-w-md sm:max-w-lg aspect-[999/1362] overflow-hidden border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          data-testid="damascus-map-frame"
        >
          <motion.img
            src="/assets/map-damas.jpg"
            alt="Carte antique des terres du Shâm — zoom progressif vers Damas"
            data-testid="damascus-map"
            style={{ scale, transformOrigin: `${DAMAS_X} ${DAMAS_Y}` }}
            className="w-full h-full object-cover"
          />
          <div className="absolute" style={{ left: DAMAS_X, top: DAMAS_Y }}>
            <div className="-translate-x-1/2 -translate-y-1/2">
              <motion.div
                style={{ opacity: ringOpacity, scale: ringScale }}
                className="relative h-16 w-16"
                data-testid="damascus-ring"
              >
                <span className="absolute inset-0 rounded-full border border-[#D4AF37]/80" />
                <span className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-ping" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_18px_6px_rgba(212,175,55,0.6)]" />
              </motion.div>
            </div>
          </div>
          <div className="absolute" style={{ left: DAMAS_X, top: DAMAS_Y }}>
            <div className="absolute bottom-12 left-0 -translate-x-1/2">
              <motion.div
                style={{ opacity: labelOpacity, y: labelY }}
                className="text-center"
                data-testid="damascus-label"
              >
                <p className="font-mono-archive text-xs tracking-[0.35em] text-[#D4AF37] whitespace-nowrap">
                  DAMAS
                </p>
                <p className="font-mono-archive text-[10px] tracking-[0.25em] text-[#F2EBE5]/80 mt-1 whitespace-nowrap">
                  SYRIE — 33.51° N, 36.27° E
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-10 max-w-xl text-center text-sm sm:text-base font-light leading-relaxed text-[#A39E93]"
          data-testid="map-caption"
        >
          C'est à Damas qu'il naît, qu'il enseigne, qu'il est emprisonné — et à
          Damas qu'il s'éteint. Une vie entière tient entre ces murs.
        </motion.p>
      </div>
    </section>
  );
}
