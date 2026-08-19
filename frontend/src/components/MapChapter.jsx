import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
  Sphere,
} from "react-simple-maps";
import Reveal, { EASE } from "./Reveal";
import ChapterHeading from "./ChapterHeading";
import { author } from "../data/content";

export default function MapChapter() {
  const mapRef = useRef(null);
  const inView = useInView(mapRef, { once: true, margin: "-120px" });

  return (
    <section id="lieu" data-testid="map-chapter" className="relative py-32 lg:py-44 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <ChapterHeading number="02" title="Le Lieu" />
        <div className="grid lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <Reveal>
              <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
                Damas, <span className="italic text-[#D4AF37]">un soir de 1292</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
                Tout commence ici. Entre la mosquée des Omeyyades et les vergers
                de la Ghouta, dans une ville qui comptait alors parmi les
                phares du savoir.
              </p>
              <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
                C'est à Damas qu'il naît, qu'il enseigne, qu'il est emprisonné —
                et à Damas qu'il s'éteint. Une vie entière tient entre ces
                murs.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                className="mt-12 border-l-2 border-[#D4AF37] pl-6 space-y-2"
                data-testid="damascus-label"
              >
                <p className="font-mono-archive text-xs tracking-[0.3em] text-[#D4AF37]">
                  POINT Nº 01 — DAMAS · SYRIE
                </p>
                <p className="font-mono-archive text-[11px] tracking-[0.2em] text-[#A39E93]">
                  33.51° N — 36.27° E
                </p>
                <p className="font-mono-archive text-[11px] tracking-[0.2em] text-[#A39E93]">
                  NAISSANCE · ÉCRITURE · SÉPULTURE
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2" ref={mapRef}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 40 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: EASE }}
              className="relative border border-white/10 bg-[#0E1013] p-2 sm:p-4"
              data-testid="world-map"
            >
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ center: [18, 32], scale: 210 }}
                width={1000}
                height={520}
                style={{ width: "100%", height: "auto" }}
              >
                <Sphere stroke="#2A2A2A" strokeWidth={0.5} fill="#0B0C10" id="sphere" />
                <Graticule stroke="#D4AF37" strokeOpacity={0.07} strokeWidth={0.4} />
                <Geographies geography="/world-110m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1B1E25"
                        stroke="#33363F"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                <Marker coordinates={author.coords}>
                  {inView && (
                    <>
                      <motion.circle
                        r={5}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth={0.8}
                        initial={{ r: 5, opacity: 0.9 }}
                        animate={{ r: 30, opacity: 0 }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                      />
                      <motion.circle
                        r={5}
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth={0.8}
                        initial={{ r: 5, opacity: 0.9 }}
                        animate={{ r: 30, opacity: 0 }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.3 }}
                      />
                    </>
                  )}
                  <circle r={3.6} fill="#D4AF37" data-testid="damascus-marker" />
                  <text
                    textAnchor="middle"
                    y={-12}
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: 10,
                      letterSpacing: "0.25em",
                      fill: "#F2EBE5",
                    }}
                  >
                    DAMAS
                  </text>
                </Marker>
              </ComposableMap>
              <p className="font-mono-archive text-[10px] tracking-[0.25em] uppercase text-[#A39E93] pt-3 px-1 border-t border-white/10 mt-2">
                Fig. 02 — Carte du monde, projection de Mercator · le point d'or marque Damas
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
