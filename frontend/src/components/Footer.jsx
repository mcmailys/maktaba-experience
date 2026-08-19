export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div>
            <p className="font-arabic text-3xl text-[#D4AF37]">ميراث</p>
            <p className="mt-3 font-mono-archive text-[11px] tracking-[0.35em] text-[#F2EBE5]">
              MĪRĀTH — ARCHIVES VIVANTES
            </p>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-[#A39E93]">
              Une librairie qui raconte. Chaque ouvrage est un feuillet
              d'histoire : son auteur, sa ville, son siècle.
            </p>
          </div>
          <div className="font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#A39E93] space-y-3 md:text-right">
            <p>Collection Patrimoine — Feuillet Nº 001</p>
            <p>Extraits : traduction française libre d'Al-Fawā'id</p>
            <p>© 2026 Mīrāth</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
