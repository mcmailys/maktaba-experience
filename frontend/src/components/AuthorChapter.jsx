import Reveal from "./Reveal";
import ChapterHeading from "./ChapterHeading";
import { author } from "../data/content";

const stats = [
  { value: "58", label: "années d'une vie brève et dense" },
  { value: "+60", label: "ouvrages dictés et composés" },
  { value: "16", label: "années auprès d'Ibn Taymiyya" },
];

export default function AuthorChapter() {
  return (
    <section id="homme" data-testid="author-chapter" className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ChapterHeading number="01" title="L'Homme" />
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <Reveal className="lg:col-span-5">
            <div className="relative border border-white/10 bg-[#13151A] p-3">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 rounded-full"
                style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.08), transparent)" }}
              />
              <div className="overflow-hidden">
                <img
                  src={author.portraitFull}
                  alt="Ibn Qayyim al-Jawziyya tenant un manuscrit"
                  data-testid="author-portrait"
                  className="w-full h-[520px] object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
              <p className="font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#A39E93] pt-4 pb-1 px-1">
                Fig. 01 — Reconstitution d'atelier, d'après les descriptions
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
                Le savant de la <span className="italic text-[#D4AF37]">Jawziyya</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
                {author.fullName} naît à Damas en 691 de l'Hégire — 1292 de
                l'ère commune. Son père veille sur la madrasa al-Jawziyya, « la
                petite école » dont le fils héritera le nom.
              </p>
              <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
                À vingt et un ans, il rencontre Shaykh al-Islām Ibn Taymiyya. Il
                ne le quittera presque plus : seize années de compagnonnage, de
                débats, et une prison partagée dans la citadelle de Damas.
              </p>
              <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
                De cette école naît une œuvre immense —{" "}
                <em className="text-[#F2EBE5]">Zād al-Maʿād</em>,{" "}
                <em className="text-[#F2EBE5]">Madārij al-Sālikīn</em>,{" "}
                <em className="text-[#F2EBE5]">Ighāthat al-Lahfān</em> — et ce
                recueil de lueurs que l'on feuillette ici :{" "}
                <em className="text-[#D4AF37]">al-Fawā'id</em>, les Méditations.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10" data-testid="author-stats">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display font-light text-4xl sm:text-5xl text-[#D4AF37]">{s.value}</p>
                    <p className="mt-3 font-mono-archive text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#A39E93] leading-relaxed">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
