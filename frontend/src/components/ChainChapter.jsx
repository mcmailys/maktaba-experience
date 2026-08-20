import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Reveal, { EASE } from "./Reveal";
import SectionHeading from "./SectionHeading";
import { chain } from "../data/content";

const CENTER = { x: 500, y: 240, r: 95 };
const BUS_Y = 240;
const NODE_Y = 380;
const NODE_R = 42;
const mastersX = [65, 158, 251, 344];
const studentsX = [656, 749, 842];

function DrawPath({ d, delay, inView, duration = 1 }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="#D4AF37"
      strokeWidth={1.4}
      strokeOpacity={0.75}
      pathLength={1}
      strokeDasharray="1"
      initial={{ strokeDashoffset: 1 }}
      animate={inView ? { strokeDashoffset: 0 } : {}}
      transition={{ duration, delay, ease: "easeInOut" }}
    />
  );
}

function Node({ cx, clipId, name, image, delay, inView, testid }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
      data-testid={testid}
    >
      <circle
        cx={cx}
        cy={NODE_Y}
        r={NODE_R}
        fill="#13151A"
        stroke="#D4AF37"
        strokeWidth={1.4}
        style={{ filter: "drop-shadow(0 0 10px rgba(212,175,55,0.45))" }}
      />
      <image
        href={image}
        x={cx - NODE_R + 4}
        y={NODE_Y - NODE_R + 4}
        width={(NODE_R - 4) * 2}
        height={(NODE_R - 4) * 2}
        clipPath={`url(#${clipId})`}
        preserveAspectRatio="xMidYMid slice"
        opacity={0.92}
      />
      <text
        x={cx}
        y={NODE_Y + NODE_R + 24}
        textAnchor="middle"
        style={{
          fontFamily: "IBM Plex Mono, monospace",
          fontSize: 12,
          letterSpacing: "0.12em",
          fill: "#F2EBE5",
        }}
      >
        {name.map((line, i) => (
          <tspan key={i} x={cx} dy={i === 0 ? 0 : 16}>
            {line}
          </tspan>
        ))}
      </text>
    </motion.g>
  );
}

function NodeDot({ cx, delay, inView }) {
  if (!inView) return null;
  return (
    <g>
      <motion.circle
        cx={cx}
        cy={BUS_Y}
        r={4}
        fill="#D4AF37"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      />
      <motion.circle
        cx={cx}
        cy={BUS_Y}
        r={4}
        fill="none"
        stroke="#D4AF37"
        strokeWidth={0.8}
        initial={{ r: 4, opacity: 0.8 }}
        animate={{ r: 16, opacity: 0 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay }}
      />
    </g>
  );
}

export default function ChainChapter() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const svgRef = useRef(null);
  const inView = useInView(svgRef, { once: true, margin: "-120px" });
  const [overflow, setOverflow] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setOverflow(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth)
        );
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -overflow]);
  const pinned = overflow > 0;

  return (
    <section
      id="chaine"
      ref={sectionRef}
      data-testid="chain-chapter"
      className="relative border-t border-white/10"
      style={pinned ? { height: `calc(100vh + ${overflow}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "py-32"
        }
      >
      <div className="mx-auto max-w-xl px-6 text-center">
        <SectionHeading number="02" title="La Chaîne du Savoir" />
        <Reveal>
          <h2 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl leading-tight text-[#F2EBE5]">
            Ses <span className="italic text-[#D4AF37]">maîtres</span>, ses{" "}
            <span className="italic text-[#D4AF37]">élèves</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-base sm:text-lg font-light leading-relaxed text-[#A39E93]">
            Le savoir ne naît pas seul : il se reçoit et se transmet. Une
            chaîne d&apos;or relie Damas aux siècles.
          </p>
        </Reveal>
      </div>

      <div className="mt-10 sm:mt-16 overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x: trackX }}
          className="min-w-[700px] max-w-5xl sm:mx-auto px-6"
          data-testid="chain-track"
        >
          <svg
            ref={svgRef}
            viewBox="0 0 1000 540"
            className="w-full h-auto"
            data-testid="chain-svg"
            role="img"
            aria-label="Chaîne de transmission : les maîtres et les élèves d'Ibn Qayyim al-Jawziyyah"
          >
            <defs>
              <radialGradient id="centerGlow">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
              </radialGradient>
              <clipPath id="cCenter">
                <circle cx={CENTER.x} cy={CENTER.y} r={CENTER.r - 7} />
              </clipPath>
              {[...mastersX, ...studentsX].map((cx, i) => (
                <clipPath key={i} id={`cn${i}`}>
                  <circle cx={cx} cy={NODE_Y} r={NODE_R - 4} />
                </clipPath>
              ))}
            </defs>

            <motion.g
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <text
                x={65}
                y={86}
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 13,
                  letterSpacing: "0.25em",
                  fill: "#D4AF37",
                }}
                data-testid="chain-masters-label"
              >
                SES MAÎTRES — 4
              </text>
              <text
                x={935}
                y={86}
                textAnchor="end"
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: 13,
                  letterSpacing: "0.25em",
                  fill: "#D4AF37",
                }}
                data-testid="chain-students-label"
              >
                SES ÉLÈVES — 3
              </text>
            </motion.g>

            <DrawPath
              d={`M ${mastersX[0]} ${BUS_Y} H ${CENTER.x - CENTER.r}`}
              delay={0.2}
              duration={1.1}
              inView={inView}
            />
            {mastersX.map((cx, i) => (
              <DrawPath
                key={`dm${i}`}
                d={`M ${cx} ${NODE_Y - NODE_R} V ${BUS_Y}`}
                delay={0.25 + i * 0.08}
                duration={0.6}
                inView={inView}
              />
            ))}
            <DrawPath
              d={`M ${CENTER.x + CENTER.r} ${BUS_Y} H ${studentsX[studentsX.length - 1]}`}
              delay={1.5}
              duration={1.1}
              inView={inView}
            />
            {studentsX.map((cx, i) => (
              <DrawPath
                key={`ds${i}`}
                d={`M ${cx} ${NODE_Y - NODE_R} V ${BUS_Y}`}
                delay={1.55 + i * 0.08}
                duration={0.6}
                inView={inView}
              />
            ))}

            {mastersX.map((cx, i) => (
              <NodeDot
                key={`ndm${i}`}
                cx={cx}
                delay={0.5 + i * 0.1}
                inView={inView}
              />
            ))}
            {studentsX.map((cx, i) => (
              <NodeDot
                key={`nds${i}`}
                cx={cx}
                delay={1.8 + i * 0.1}
                inView={inView}
              />
            ))}

            <motion.g
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              data-testid="chain-center"
            >
              <circle cx={CENTER.x} cy={CENTER.y} r={118} fill="url(#centerGlow)" />
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={CENTER.r}
                fill="#13151A"
                stroke="#D4AF37"
                strokeWidth={2}
                style={{ filter: "drop-shadow(0 0 22px rgba(212,175,55,0.5))" }}
              />
              <image
                href="/assets/face.jpg"
                x={CENTER.x - (CENTER.r - 7)}
                y={CENTER.y - (CENTER.r - 7)}
                width={(CENTER.r - 7) * 2}
                height={(CENTER.r - 7) * 2}
                clipPath="url(#cCenter)"
                preserveAspectRatio="xMidYMid slice"
              />
            </motion.g>
            {inView && (
              <motion.circle
                cx={CENTER.x}
                cy={CENTER.y}
                r={CENTER.r}
                fill="none"
                stroke="#D4AF37"
                strokeWidth={1}
                initial={{ opacity: 0.6 }}
                animate={{ r: [CENTER.r, CENTER.r + 26], opacity: [0.6, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 1.4 }}
              />
            )}
            <motion.g
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <text
                x={CENTER.x}
                y={CENTER.y + CENTER.r + 34}
                textAnchor="middle"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  fontSize: 26,
                  fill: "#F2EBE5",
                }}
              >
                Ibn Qayyim al-Jawziyyah
              </text>
              <text
                x={CENTER.x}
                y={CENTER.y + CENTER.r + 68}
                textAnchor="middle"
                style={{ fontFamily: "Amiri, serif", fontSize: 20, fill: "#D4AF37" }}
              >
                ابن قيم الجوزية
              </text>
            </motion.g>

            {mastersX.map((cx, i) => (
              <Node
                key={`m${i}`}
                cx={cx}
                clipId={`cn${i}`}
                name={chain.masters[i].name}
                image={chain.masters[i].image}
                delay={1.0 + i * 0.12}
                inView={inView}
                testid={`chain-master-${i}`}
              />
            ))}
            {studentsX.map((cx, i) => (
              <Node
                key={`s${i}`}
                cx={cx}
                clipId={`cn${mastersX.length + i}`}
                name={chain.students[i].name}
                image={chain.students[i].image}
                delay={2.0 + i * 0.12}
                inView={inView}
                testid={`chain-student-${i}`}
              />
            ))}
          </svg>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
