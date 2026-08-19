import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { timelineEvents } from "../data/content";

export default function TimelineChapter() {
  return (
    <section id="histoire" data-testid="timeline-chapter" className="relative pt-32">
      <div className="mx-auto max-w-xl px-6">
        <SectionHeading number="01" title="Son Histoire" />
        <div className="relative">
          <div
            className="absolute left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-[#D4AF37]/70 via-[#D4AF37]/25 to-transparent"
            aria-hidden
          />
          <div className="space-y-20">
            {timelineEvents.map((event) => (
              <Reveal
                key={event.year}
                className="relative pl-14"
                data-testid={`timeline-event-${event.year}`}
              >
                <span
                  className="absolute left-0 top-2 h-[19px] w-[19px] rounded-full border border-[#D4AF37]/70 bg-[#231E0E]"
                  aria-hidden
                >
                  <span className="absolute inset-[5px] rounded-full bg-[#D4AF37] shadow-[0_0_16px_5px_rgba(212,175,55,0.5)]" />
                </span>
                <p className="font-display text-4xl sm:text-5xl text-[#D4AF37]">{event.year}</p>
                <p className="mt-4 text-sm sm:text-base font-light leading-relaxed text-[#A39E93]">
                  {event.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-28" data-testid="timeline-skyline">
        <img
          src="/assets/skyline-damas.jpg"
          alt="Silhouette de Damas au crépuscule — dômes et minarets"
          className="w-full h-[280px] sm:h-[380px] object-cover object-bottom opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/20 to-[#0B0C10]/70" />
      </div>
    </section>
  );
}
