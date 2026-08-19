import Reveal from "./Reveal";

export default function ChapterHeading({ number, title }) {
  return (
    <Reveal
      className="mb-14 lg:mb-20 flex items-baseline gap-5 border-b border-white/10 pb-6"
      data-testid={`chapter-heading-${number}`}
    >
      <span className="font-mono-archive text-xs sm:text-sm text-[#D4AF37] tracking-[0.3em]">
        CHAPITRE {number}
      </span>
      <span className="font-mono-archive text-xs sm:text-sm text-[#A39E93] tracking-[0.3em] uppercase">
        — {title}
      </span>
    </Reveal>
  );
}
