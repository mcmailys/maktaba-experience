import Reveal from "./Reveal";

export default function SectionHeading({ number, title }) {
  return (
    <Reveal className="text-center mb-14" data-testid={`section-heading-${number}`}>
      <p className="font-mono-archive text-[11px] tracking-[0.4em] uppercase text-[#D4AF37]">
        {number} — {title}
      </p>
    </Reveal>
  );
}
