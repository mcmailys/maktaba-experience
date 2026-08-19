import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const DAMASCUS = [36.2765, 33.5138];
const SPRING = { stiffness: 80, damping: 24, mass: 0.7 };

function lerpColor(a, b, t) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
}

export default function MapChapter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const zoomRaw = useTransform(scrollYProgress, [0.05, 0.85], [1, 8.5]);
  const lonRaw = useTransform(scrollYProgress, [0.05, 0.85], [12, DAMASCUS[0]]);
  const latRaw = useTransform(scrollYProgress, [0.05, 0.85], [32, DAMASCUS[1]]);
  const glowRaw = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const markerRaw = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);

  const zoomSpring = useSpring(zoomRaw, SPRING);
  const lonSpring = useSpring(lonRaw, SPRING);
  const latSpring = useSpring(latRaw, SPRING);

  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([12, 32]);
  const [glow, setGlow] = useState(0);
  const [markerOn, setMarkerOn] = useState(0);

  useMotionValueEvent(zoomSpring, "change", setZoom);
  useMotionValueEvent(lonSpring, "change", () =>
    setCenter([lonSpring.get(), latSpring.get()])
  );
  useMotionValueEvent(latSpring, "change", () =>
    setCenter([lonSpring.get(), latSpring.get()])
  );
  useMotionValueEvent(glowRaw, "change", setGlow);
  useMotionValueEvent(markerRaw, "change", setMarkerOn);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.16, 0.3], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const captionOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.82, 0.96], [30, 0]);

  const syriaFill = lerpColor("#16181D", "#D4AF37", glow);
  const syriaStroke = lerpColor("#2A2D34", "#F2D06B", glow);

  return (
    <section
      id="lieu"
      data-testid="map-chapter"
      ref={ref}
      className="relative"
      style={{ height: "340vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="text-center mb-8">
          <p
            className="font-mono-archive text-[11px] tracking-[0.4em] uppercase text-[#D4AF37]"
            data-testid="section-heading-02"
          >
            02 — Son Lieu
          </p>
          <h2 className="mt-8 font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Damas,
            <br />
            <span className="italic text-[#D4AF37]">au cœur des terres du Shâm</span>
          </h2>
        </motion.div>

        <div
          className="relative w-full max-w-3xl border border-white/10 bg-[#0B0C10] shadow-[0_40px_120px_rgba(0,0,0,0.8)] overflow-hidden"
          data-testid="damascus-map-frame"
        >
          <div className="pointer-events-none">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 150 }}
              width={900}
              height={560}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              <ZoomableGroup center={center} zoom={zoom} minZoom={1} maxZoom={10}>
                <Sphere stroke="#2A2A2A" strokeWidth={0.5 / zoom} fill="#0B0C10" id="sphere" />
                <Graticule stroke="#D4AF37" strokeOpacity={0.06} strokeWidth={0.4 / zoom} />
                <Geographies geography="/world-110m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const isSyria =
                        geo.properties.name === "Syria" || geo.id === "760";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={isSyria ? syriaFill : "#14161C"}
                          stroke={isSyria ? syriaStroke : "#2A2D34"}
                          strokeWidth={(isSyria ? 0.9 : 0.5) / zoom}
                          data-testid={isSyria ? "syria-shape" : undefined}
                          style={{
                            default: {
                              outline: "none",
                              filter:
                                isSyria && glow > 0.25
                                  ? `drop-shadow(0 0 ${10 * glow}px rgba(212,175,55,${0.85 * glow}))`
                                  : "none",
                            },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {markerOn > 0.02 && (
                  <Marker coordinates={DAMASCUS}>
                    <motion.circle
                      r={4 / zoom}
                      fill="none"
                      stroke="#F2EBE5"
                      strokeWidth={0.8 / zoom}
                      initial={{ r: 4 / zoom, opacity: 0.9 }}
                      animate={{ r: 30 / zoom, opacity: 0 }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.circle
                      r={4 / zoom}
                      fill="none"
                      stroke="#F2EBE5"
                      strokeWidth={0.8 / zoom}
                      initial={{ r: 4 / zoom, opacity: 0.9 }}
                      animate={{ r: 30 / zoom, opacity: 0 }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
                    />
                    <circle
                      r={3.4 / zoom}
                      fill="#0B0C10"
                      stroke="#F2EBE5"
                      strokeWidth={1 / zoom}
                      data-testid="damascus-marker"
                      style={{ filter: "drop-shadow(0 0 5px rgba(11,12,16,0.9))" }}
                    />
                    <g opacity={markerOn} data-testid="damascus-label">
                      <text
                        textAnchor="middle"
                        y={-16 / zoom}
                        style={{
                          fontFamily: "IBM Plex Mono, monospace",
                          fontSize: 11 / zoom,
                          letterSpacing: "0.3em",
                          fill: "#F2EBE5",
                          paintOrder: "stroke",
                          stroke: "#0B0C10",
                          strokeWidth: 3.5 / zoom,
                        }}
                      >
                        DAMAS
                      </text>
                      <text
                        textAnchor="middle"
                        y={-7 / zoom}
                        style={{
                          fontFamily: "IBM Plex Mono, monospace",
                          fontSize: 6.5 / zoom,
                          letterSpacing: "0.2em",
                          fill: "rgba(242,235,229,0.9)",
                          paintOrder: "stroke",
                          stroke: "#0B0C10",
                          strokeWidth: 3 / zoom,
                        }}
                      >
                        SYRIE — 33.51° N, 36.27° E
                      </text>
                    </g>
                  </Marker>
                )}
              </ZoomableGroup>
            </ComposableMap>
          </div>
          <div
            className="absolute bottom-3 left-4 font-mono-archive text-[10px] tracking-[0.25em] text-[#A39E93]/70"
            data-testid="map-zoom-readout"
          >
            ZOOM ×{zoom.toFixed(1)} — {center[1].toFixed(2)}° N, {center[0].toFixed(2)}° E
          </div>
        </div>

        <motion.p
          style={{ opacity: captionOpacity, y: captionY }}
          className="mt-10 max-w-xl text-center text-sm sm:text-base font-light leading-relaxed text-[#A39E93]"
          data-testid="map-caption"
        >
          C'est à Damas qu'il naît, qu'il enseigne, qu'il est emprisonné — et à
          Damas qu'il s'éteint. Une vie entière tient entre ces murs.
        </motion.p>
      </div>
    </section>
  );
}
