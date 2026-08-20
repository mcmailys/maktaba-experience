import { useState } from "react";
import { motion } from "framer-motion";
import { Library } from "lucide-react";
import Bibliotheque from "./Bibliotheque";
import { useLibrary } from "../lib/library";

export default function Header() {
  const [libOpen, setLibOpen] = useState(false);
  const { ids } = useLibrary();

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#0B0C10]/85 to-transparent"
        data-testid="site-header"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" data-testid="brand-link" className="flex items-baseline gap-3 group">
            <span className="font-arabic text-lg text-[#D4AF37] leading-none">ميراث</span>
            <span className="font-mono-archive text-[10px] tracking-[0.35em] text-[#F2EBE5] group-hover:text-[#D4AF37] transition-colors duration-300">
              MĪRĀTH
            </span>
          </a>
          <span
            className="hidden min-[420px]:inline font-arabic text-lg sm:text-xl text-[#D4AF37] leading-none"
            data-testid="header-author-arabic"
          >
            ابن قيم الجوزية
          </span>
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={() => setLibOpen(true)}
              data-testid="header-library-button"
              aria-label="Ouvrir ma bibliothèque"
              className="relative flex items-center gap-2 text-[#A39E93] hover:text-[#D4AF37] transition-colors duration-300 py-2"
            >
              <Library className="h-4 w-4" />
              <span className="hidden sm:inline font-mono-archive text-[10px] tracking-[0.25em] uppercase">
                Bibliothèque
              </span>
              {ids.length > 0 && (
                <span
                  className="absolute -top-0.5 -right-2 h-4 min-w-4 px-0.5 rounded-full bg-[#D4AF37] text-[#0B0C10] font-mono-archive text-[9px] leading-none flex items-center justify-center"
                  data-testid="header-library-count"
                >
                  {ids.length}
                </span>
              )}
            </button>
            <a
              href="#commande"
              data-testid="header-order-button"
              className="font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] border border-[#D4AF37]/50 px-3 sm:px-4 py-2 hover:bg-[#D4AF37] hover:text-[#0B0C10] transition-colors duration-300"
            >
              Commander
            </a>
          </div>
        </div>
      </motion.header>
      <Bibliotheque open={libOpen} onClose={() => setLibOpen(false)} />
    </>
  );
}
