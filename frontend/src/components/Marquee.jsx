const items = [
  "Sagesse",
  "Al-Fawā'id",
  "Damas 1292 — 1350",
  "Patrimoine",
  "Ibn Qayyim al-Jawziyya",
  "Méditations",
  "Archives vivantes",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div
      className="relative border-y border-white/10 py-6 overflow-hidden"
      data-testid="editorial-marquee"
    >
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="font-display italic font-light text-2xl sm:text-3xl text-[#F2EBE5]/80 whitespace-nowrap px-8">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-[#D4AF37]/70 shrink-0" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
