import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TimelineChapter from "./components/TimelineChapter";
import MapChapter from "./components/MapChapter";
import BookChapter from "./components/BookChapter";
import ExcerptSection from "./components/ExcerptSection";
import OtherBooks from "./components/OtherBooks";
import OrderSection from "./components/OrderSection";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#0B0C10] text-[#F2EBE5] font-body overflow-x-clip" data-testid="app-root">
      <div className="grain-overlay" aria-hidden />
      <Header />
      <main>
        <Hero />
        <TimelineChapter />
        <MapChapter />
        <BookChapter />
        <ExcerptSection />
        <OtherBooks />
        <OrderSection />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-center" toastOptions={{
        style: { background: "#13151A", border: "1px solid rgba(212,175,55,0.4)", color: "#F2EBE5" },
      }} />
    </div>
  );
}
