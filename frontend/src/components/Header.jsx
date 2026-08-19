import { motion } from "framer-motion";

const links = [
  { href: "#homme", label: "L'Homme" },
  { href: "#lieu", label: "Le Lieu" },
  { href: "#chronologie", label: "Chronologie" },
  { href: "#livre", label: "Le Livre" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#0B0C10]/70 backdrop-blur-xl"
      data-testid="site-header"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#" data-testid="brand-link" className="flex items-baseline gap-3 group">
          <span className="font-arabic text-xl text-[#D4AF37] leading-none">ميراث</span>
          <span className="font-mono-archive text-[11px] tracking-[0.35em] text-[#F2EBE5] group-hover:text-[#D4AF37] transition-colors duration-300">
            MĪRĀTH
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8" data-testid="main-nav">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase().replace(/['’]/g, "-")}`}
              className="font-mono-archive text-[11px] tracking-[0.25em] uppercase text-[#A39E93] hover:text-[#F2EBE5] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#commande"
          data-testid="header-order-button"
          className="font-mono-archive text-[11px] tracking-[0.25em] uppercase border border-[#D4AF37]/60 text-[#D4AF37] px-5 py-2.5 hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-colors duration-300"
        >
          Commander
        </a>
      </div>
    </motion.header>
  );
}
