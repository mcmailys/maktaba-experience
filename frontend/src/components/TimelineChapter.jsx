import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Reveal from "./Reveal";
import ChapterHeading from "./ChapterHeading";
import { timelineEvents } from "../data/content";

export default function TimelineChapter() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.8", "end 0.55"],
  });

  return (
    <section
      id="chronologie"
      data-testid="timeline-chapter"
      className="relative py-32 lg:py-44 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ChapterHeading number="03" title="La Chronologie" />

        <Reveal className="mb-24 lg:mb-32">
          <p className="font-mono-archive text-[11px] tracking-[0.35em] uppercase text-[#A39E93] mb-6">
            Période de vie — cinquante-huit années
          </p>
          <h2
            className="font-display font-light leading-none text-[#F2EBE5]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
            data-testid="timeline-period"
          >
            1292 <span className="text-[#D4AF37] italic">—</span> 1350
          </h2>
        </Reveal>

        <div className="relative" ref={lineRef}>
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-white/10" aria-hidden />
          <motion.div
            className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-[#D4AF37] origin-top"
            style={{ scaleY: scrollYProgress }}
            aria-hidden
          />

          <div className="space-y-24 lg:space-y-32">
            {timelineEvents.map((event, i) => (
              <div key={event.year} className="relative md:grid md:grid-cols-2 md:gap-20">
                <span
                  className="absolute left-[7px] md:left-1/2 top-2 -translate-x-1/2 h-3.5 w-3.5 rounded-full border border-[#D4AF37] bg-[#0B0C10]"
                  aria-hidden
                />
                <Reveal
                  className={`pl-12 md:pl-0 ${
                    i % 2 === 0
                      ? "md:col-start-1 md:text-right md:pr-4"
                      : "md:col-start-2 md:pl-4"
                  }`}
                  data-testid={`timeline-event-${event.year}`}
                >
                  <p className="font-mono-archive text-[11px] tracking-[0.3em] text-[#D4AF37]">
                    {event.hijri}
                  </p>
                  <p className="font-display font-light text-5xl sm:text-6xl text-[#F2EBE5] mt-2">
                    {event.year}
                  </p>
                  <h3 className="font-display italic text-xl sm:text-2xl text-[#D4AF37] mt-4">
                    {event.title}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-[#A39E93] max-w-md md:max-w-none md:inline-block">
                    {event.text}
                  </p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
