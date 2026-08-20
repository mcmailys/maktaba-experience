import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import {
  BookMarked,
  FileText,
  Globe,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { author } from "../data/content";

const FRAME_COUNT = 101;
const frameSrc = (i) =>
  `/assets/frames/f_${String(i + 1).padStart(3, "0")}.webp`;

const meta = [
  { icon: Globe, label: "Langue", value: author.book.langue },
  { icon: BookMarked, label: "Édition", value: author.book.edition },
  { icon: FileText, label: "Pages", value: author.book.pages },
];

export default function BookChapter() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetRef = useRef(0);
  const [qty, setQty] = useState(1);

  const draw = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const imgs = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === targetRef.current) draw(i);
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(smooth, "change", (v) => {
    const clamped = Math.min(Math.max(v, 0), 0.9999);
    const index = Math.floor(clamped * FRAME_COUNT);
    targetRef.current = index;
    draw(index);
  });

  const addToCart = () => {
    localStorage.setItem("mirath_qty", String(qty));
    window.dispatchEvent(new CustomEvent("mirath:cart", { detail: qty }));
    toast.success(
      `${qty} exemplaire${qty > 1 ? "s" : ""} ajouté${qty > 1 ? "s" : ""} au panier`
    );
    document.querySelector("#commande")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="oeuvre" data-testid="book-chapter" className="relative pt-20">
      <div className="mx-auto max-w-xl px-6 -mb-10">
        <SectionHeading number="04" title="Son Œuvre" />
      </div>

      <div
        ref={wrapRef}
        className="relative"
        style={{ height: "160vh" }}
        data-testid="book-video-scrollzone"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" aria-hidden data-testid="book-bg-image">
            <img
              src="/assets/library-bg.jpg"
              alt=""
              className="w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/35 to-[#0B0C10]" />
          </div>
          <canvas
            ref={canvasRef}
            width={720}
            height={1000}
            data-testid="book-video"
            className="relative z-10 max-h-[60vh] w-auto max-w-[82vw]"
          />
          <div
            className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
            aria-hidden
            data-testid="book-fog"
          >
            <div className="fog-layer fog-1" />
            <div className="fog-layer fog-2" />
            <div className="fog-layer fog-3" />
            <div className="fog-layer fog-4" />
            <div className="fog-layer fog-5" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-6 pb-24 text-center">
        <Reveal>
          <h2
            className="font-display font-medium uppercase tracking-[0.06em] text-[#F2EBE5] text-4xl sm:text-5xl"
            data-testid="book-title"
          >
            {author.book.title}
          </h2>
          <p className="mt-4 font-mono-archive text-[11px] tracking-[0.35em] uppercase text-[#D4AF37]">
            Ibn al-Qayyim
          </p>
          <p
            className="mt-3 font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#A39E93]"
            data-testid="book-written-date"
          >
            {author.book.written}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
            {author.book.description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-3 gap-4" data-testid="book-meta">
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <p className="font-mono-archive text-[10px] tracking-[0.3em] uppercase text-[#A39E93]">
                  {label}
                </p>
                <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[#F2EBE5]">
                  <Icon className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
            data-testid="product-actions"
          >
            <div className="flex items-center border border-white/25">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-testid="quantity-decrease-button"
                aria-label="Diminuer la quantité"
                className="px-4 py-3.5 text-[#A39E93] hover:text-[#D4AF37] transition-colors duration-300"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span
                className="w-10 text-center font-mono-archive text-sm text-[#F2EBE5]"
                data-testid="quantity-value"
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => Math.min(5, q + 1))}
                data-testid="quantity-increase-button"
                aria-label="Augmenter la quantité"
                className="px-4 py-3.5 text-[#A39E93] hover:text-[#D4AF37] transition-colors duration-300"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={addToCart}
              data-testid="add-to-cart-button"
              className="inline-flex items-center gap-3 bg-[#D4AF37] text-[#0B0C10] px-8 py-4 font-mono-archive text-[11px] tracking-[0.25em] uppercase hover:bg-[#F2EBE5] transition-colors duration-300"
            >
              <ShoppingBag className="h-4 w-4" />
              Ajouter au panier — {author.book.price}
            </button>
          </div>
          <a
            href="#extrait"
            data-testid="discover-excerpt-button"
            className="mt-6 inline-block text-sm font-light text-[#A39E93] underline decoration-[#D4AF37]/50 underline-offset-4 hover:text-[#D4AF37] transition-colors duration-300"
          >
            Feuilleter l'extrait
          </a>
        </Reveal>
      </div>
    </section>
  );
}
