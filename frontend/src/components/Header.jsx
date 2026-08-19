import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#0B0C10]/85 to-transparent"
      data-testid="site-header"
    >
      <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
        <a href="#" data-testid="brand-link" className="flex items-baseline gap-3 group">
          <span className="font-arabic text-lg text-[#D4AF37] leading-none">ميراث</span>
          <span className="font-mono-archive text-[10px] tracking-[0.35em] text-[#F2EBE5] group-hover:text-[#D4AF37] transition-colors duration-300">
            MĪRĀTH
          </span>
        </a>
        <span
          className="font-arabic text-lg sm:text-xl text-[#D4AF37] leading-none"
          data-testid="header-author-arabic"
        >
          ابن قيم الجوزية
        </span>
        <a
          href="#commande"
          data-testid="header-order-button"
          className="font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] border border-[#D4AF37]/50 px-4 py-2 hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-colors duration-300"
        >
          Commander
        </a>
      </div>
    </motion.header>
  );
}
