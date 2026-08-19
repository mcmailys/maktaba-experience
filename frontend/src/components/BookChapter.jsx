import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { BookMarked, BookOpen, FileText, Globe } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { author } from "../data/content";

const meta = [
  { icon: Globe, label: "Langue", value: author.book.langue },
  { icon: BookMarked, label: "Édition", value: author.book.edition },
  { icon: FileText, label: "Pages", value: author.book.pages },
];

export default function BookChapter() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [isTouch] = useState(
    () => window.matchMedia("(pointer: coarse)").matches
  );
  const [hasAlpha] = useState(() => {
    const isSafari = /^((?!chrome|chromium|android).)*safari/i.test(
      navigator.userAgent
    );
    const probe = document.createElement("video");
    return !isSafari && probe.canPlayType('video/webm; codecs="vp9"') !== "";
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isTouch) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        },
        { threshold: 0.25 }
      );
      obs.observe(video);
      return () => obs.disconnect();
    }
    const prime = () => video.play().then(() => video.pause()).catch(() => {});
    if (video.readyState >= 1) prime();
    else video.addEventListener("loadedmetadata", prime, { once: true });
  }, [isTouch]);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  useMotionValueEvent(smooth, "change", (v) => {
    if (isTouch) return;
    const video = videoRef.current;
    if (video && video.duration) {
      const clamped = Math.min(Math.max(v, 0), 1);
      video.currentTime = clamped * (video.duration - 0.08);
    }
  });

  return (
    <section id="oeuvre" data-testid="book-chapter" className="relative pt-24">
      <div className="mx-auto max-w-xl px-6">
        <SectionHeading number="03" title="Son Œuvre" />
      </div>

      <div
        ref={wrapRef}
        className="relative"
        style={{ height: "160vh" }}
        data-testid="book-video-scrollzone"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {hasAlpha && (
            <div className="absolute inset-0" aria-hidden data-testid="book-bg-image">
              <img
                src="/assets/library-bg.jpg"
                alt=""
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10]/55 to-[#0B0C10]" />
            </div>
          )}
          <video
            ref={videoRef}
            poster="/assets/book-poster.jpg"
            muted
            playsInline
            preload="auto"
            data-testid="book-video"
            className="relative z-10 max-h-[60vh] w-auto max-w-[82vw]"
          >
            <source src="/assets/book-alpha.webm" type="video/webm" />
            <source src="/assets/book-rotate.mp4" type="video/mp4" />
            <source src="/assets/book-rotate.webm" type="video/webm" />
          </video>
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
          <a
            href="#extrait"
            data-testid="discover-excerpt-button"
            className="mt-12 inline-flex items-center gap-3 border border-white/25 px-8 py-4 font-mono-archive text-[11px] tracking-[0.3em] uppercase text-[#F2EBE5] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300"
          >
            <BookOpen className="h-4 w-4" />
            Découvrir l'extrait
          </a>
        </Reveal>
      </div>
    </section>
  );
}
