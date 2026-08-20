import { useEffect, useRef } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { timelineEvents } from "../data/content";

export default function TimelineChapter() {
  const trackRef = useRef(null);
  const items = [...timelineEvents, ...timelineEvents];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        track.classList.toggle("timeline-running", entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -40% 0px" }
    );
    obs.observe(track);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="histoire" data-testid="timeline-chapter" className="relative py-32 overflow-visible">
      <div className="absolute inset-x-0 top-0 -bottom-40" aria-hidden>
        <img
          src="/assets/skyline-damas.jpg"
          alt=""
          data-testid="timeline-skyline"
          className="w-full h-full object-cover object-bottom opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/35 to-[#0B0C10]" />
      </div>

      <div className="relative z-10">
        <div className="mx-auto max-w-xl px-6">
          <SectionHeading number="01" title="Son Histoire" />
        </div>

        <Reveal data-testid="timeline-track-wrapper">
          <div ref={trackRef} className="timeline-track ml-[30vw] sm:ml-[20vw]" data-testid="timeline-track">
            {items.map((event, i) => (
              <div
                key={`${event.year}-${i}`}
                className="relative w-[300px] sm:w-[340px] shrink-0 pr-16 pt-12"
                data-testid={i < timelineEvents.length ? `timeline-event-${event.year}` : undefined}
              >
                <span
                  className="absolute top-0 left-0 right-16 h-px bg-gradient-to-r from-[#D4AF37]/60 to-[#D4AF37]/10"
                  aria-hidden
                />
                <span
                  className="absolute -top-[9px] left-0 h-[19px] w-[19px] rounded-full border border-[#D4AF37]/70 bg-[#231E0E]"
                  aria-hidden
                >
                  <span className="absolute inset-[5px] rounded-full bg-[#D4AF37] shadow-[0_0_16px_5px_rgba(212,175,55,0.5)]" />
                </span>
                <p className="font-display text-4xl sm:text-5xl text-[#D4AF37]">{event.year}</p>
                <p className="mt-4 text-sm font-light leading-relaxed text-[#A39E93]">
                  {event.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
