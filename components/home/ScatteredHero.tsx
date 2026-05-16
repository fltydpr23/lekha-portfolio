"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import { works } from "@/lib/works";

// ─── 1. Cinematic staggered title ────────────────────────────────────────────
function AnimatedTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-block" style={{ perspective: "600px" }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.18em]">
          {word.split("").map((char, ci) => {
            const globalIndex = words
              .slice(0, wi)
              .reduce((acc, w) => acc + w.length, 0) + ci;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ opacity: 0, y: 80, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + globalIndex * 0.035, // Immediate load
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ transformOrigin: "bottom center", display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

// ─── 2. Magnetic + Cursor-Float image wrapper ────────────────────────────
function FloatingImage({
  src,
  alt,
  href,
  sizes,
  depth,
  globalMouseX,
  globalMouseY,
  scrollRotate,
}: {
  src: string;
  alt: string;
  href: string;
  sizes: string;
  depth: number;
  globalMouseX: any;
  globalMouseY: any;
  scrollRotate: any;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const magX = useMotionValue(0);
  const magY = useMotionValue(0);
  const springMagX = useSpring(magX, { stiffness: 250, damping: 22 });
  const springMagY = useSpring(magY, { stiffness: 250, damping: 22 });

  // Cursor-float: images drift gently with the global mouse position
  const cursorDriftX = useTransform(globalMouseX, (v: number) => v * depth * 30);
  const cursorDriftY = useTransform(globalMouseY, (v: number) => v * depth * 20);
  const springCursorX = useSpring(cursorDriftX, { stiffness: 60, damping: 20 });
  const springCursorY = useSpring(cursorDriftY, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = Math.max(rect.width, rect.height) * 1.4;
    if (dist < threshold) {
      const factor = (1 - dist / threshold) * 0.35;
      magX.set(dx * factor);
      magY.set(dy * factor);
    }
  }, [magX, magY]);

  const handleMouseLeave = useCallback(() => {
    magX.set(0);
    magY.set(0);
  }, [magX, magY]);

  return (
    <motion.div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springMagX,
        y: springMagY,
        translateX: springCursorX,
        translateY: springCursorY,
        rotate: scrollRotate,
      }}
      className="relative w-full h-full"
    >
      <Link href={href} data-cursor="image" className="block w-full h-full">
        <motion.div
          className="relative w-full h-full overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ScatteredHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for the 300vh sticky section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress (fast response)
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  // 1. Scroll-based tilt
  const tiltA = useTransform(smoothProgress, [0, 1], [-1, 3]);
  const tiltB = useTransform(smoothProgress, [0, 1], [1, -3]);

  // 2. Explosion Mapping (0 -> 1 progress maps perfectly to the 200vh track)
  const startScale = 0.2; // Tiny when clustered
  const endScale = 1;

  // Detect mobile for responsive layout adjustments
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Scale map for all
  const scaleAnim = useTransform(smoothProgress, [0, 1], [startScale, endScale]);
  // Opacity map (start invisible, fade in fast as you scroll)
  const opacityAnim = useTransform(smoothProgress, [0, 0.15], [0, 1]);

  // We use static top/left layout, and animate x/y offsets to pull them to center.
  // Center point is roughly X=50vw, Y=42vh.
  
  // Responsive coordinates and sizes
  const coords = isMobile ? {
    img1: { top: "8vh", left: "5vw", w: "45vw", h: "60vw", x: "40vw", y: "34vh" },
    img2: { top: "4vh", left: "55vw", w: "40vw", h: "30vw", x: "-10vw", y: "38vh" },
    img3: { top: "72vh", left: "5vw", w: "45vw", h: "67vw", x: "40vw", y: "-30vh" },
    img4: { top: "82vh", left: "55vw", w: "40vw", h: "53vw", x: "-10vw", y: "-40vh" },
    img5: { top: "22vh", left: "68vw", w: "28vw", h: "28vw", x: "-20vw", y: "20vh" },
    img6: { top: "58vh", left: "68vw", w: "28vw", h: "42vw", x: "-20vw", y: "-16vh" },
  } : {
    img1: { top: "8vh", left: "4vw", w: "17vw", h: "22.66vw", x: "46vw", y: "34vh" },
    img2: { top: "-2vh", left: "33vw", w: "22vw", h: "16.5vw", x: "17vw", y: "44vh" },
    img3: { top: "3vh", left: "76vw", w: "19vw", h: "28.5vw", x: "-26vw", y: "39vh" },
    img4: { top: "58vh", left: "39vw", w: "19vw", h: "25.33vw", x: "11vw", y: "-16vh" },
    img5: { top: "83vh", left: "2vw", w: "15vw", h: "15vw", x: "48vw", y: "-41vh" },
    img6: { top: "84vh", left: "75vw", w: "18vw", h: "27vw", x: "-25vw", y: "-42vh" },
  };

  const img1X = useTransform(smoothProgress, [0, 1], [coords.img1.x, "0vw"]);
  const img1Y = useTransform(smoothProgress, [0, 1], [coords.img1.y, "0vh"]);

  const img2X = useTransform(smoothProgress, [0, 1], [coords.img2.x, "0vw"]);
  const img2Y = useTransform(smoothProgress, [0, 1], [coords.img2.y, "0vh"]);

  const img3X = useTransform(smoothProgress, [0, 1], [coords.img3.x, "0vw"]);
  const img3Y = useTransform(smoothProgress, [0, 1], [coords.img3.y, "0vh"]);

  const img4X = useTransform(smoothProgress, [0, 1], [coords.img4.x, "0vw"]);
  const img4Y = useTransform(smoothProgress, [0, 1], [coords.img4.y, "0vh"]);

  const img5X = useTransform(smoothProgress, [0, 1], [coords.img5.x, "0vw"]);
  const img5Y = useTransform(smoothProgress, [0, 1], [coords.img5.y, "0vh"]);

  const img6X = useTransform(smoothProgress, [0, 1], [coords.img6.x, "0vw"]);
  const img6Y = useTransform(smoothProgress, [0, 1], [coords.img6.y, "0vh"]);


  // Global cursor tracking for floating
  const globalMouseX = useMotionValue(0);
  const globalMouseY = useMotionValue(0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      globalMouseX.set((e.clientX / window.innerWidth) - 0.5);
      globalMouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [globalMouseX, globalMouseY]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white"
      style={{ height: "200vh" }} // Perfect 1:1 scroll track for the explosion
      aria-label="Lekha Rathnam — Editorial & Fine Art Photography"
    >
      <div className="fixed inset-0 w-full h-screen overflow-hidden">

        {/* ── CENTRAL TITLE (z-20) ── */}
        <div
          className="absolute left-1/2 top-[42vh] -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-8"
        >
          <h1
            className="text-black leading-none pointer-events-none"
            style={{ 
              fontSize: isMobile ? "clamp(2.5rem, 15vw, 80px)" : "clamp(3rem, 11vw, 140px)", 
              letterSpacing: "-0.0180em",
              fontFamily: "var(--font-cormorant), serif"
            }}
          >
            <AnimatedTitle text="Lekha Rathnam" />
          </h1>
          <motion.p 
            className="text-caption mt-8 md:mt-12 uppercase tracking-widest opacity-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Scroll to explore
          </motion.p>
        </div>

        {/* ── IMAGES CONTAINER (z-10) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          
          {/* Image 1 */}
          <motion.div
            className="absolute pointer-events-auto"
            style={{ 
              top: coords.img1.top, 
              left: coords.img1.left, 
              x: img1X,
              y: img1Y,
              scale: scaleAnim, 
              opacity: opacityAnim, 
              width: coords.img1.w, 
              height: coords.img1.h 
            }}
          >
            <FloatingImage src={works[0].coverImage.src} alt={works[0].title} href={`/work/${works[0].slug}`} sizes={coords.img1.w} depth={0.4} globalMouseX={globalMouseX} globalMouseY={globalMouseY} scrollRotate={tiltA} />
          </motion.div>

          {/* Image 2 */}
          <motion.div
            className="absolute pointer-events-auto"
            style={{ 
              top: coords.img2.top, 
              left: coords.img2.left, 
              x: img2X,
              y: img2Y,
              scale: scaleAnim, 
              opacity: opacityAnim, 
              width: coords.img2.w, 
              height: coords.img2.h 
            }}
          >
            <FloatingImage src={works[1].coverImage.src} alt={works[1].title} href={`/work/${works[1].slug}`} sizes={coords.img2.w} depth={0.15} globalMouseX={globalMouseX} globalMouseY={globalMouseY} scrollRotate={tiltB} />
          </motion.div>

          {/* Image 3 */}
          <motion.div
            className="absolute pointer-events-auto"
            style={{ 
              top: coords.img3.top, 
              left: coords.img3.left, 
              x: img3X,
              y: img3Y,
              scale: scaleAnim, 
              opacity: opacityAnim, 
              width: coords.img3.w, 
              height: coords.img3.h 
            }}
          >
            <FloatingImage src={works[2].coverImage.src} alt={works[2].title} href={`/work/${works[2].slug}`} sizes={coords.img3.w} depth={0.35} globalMouseX={globalMouseX} globalMouseY={globalMouseY} scrollRotate={tiltA} />
          </motion.div>

          {/* Image 4 */}
          <motion.div
            className="absolute pointer-events-auto"
            style={{ 
              top: coords.img4.top, 
              left: coords.img4.left, 
              x: img4X,
              y: img4Y,
              scale: scaleAnim, 
              opacity: opacityAnim, 
              width: coords.img4.w, 
              height: coords.img4.h 
            }}
          >
            <FloatingImage src={works[3].coverImage.src} alt={works[3].title} href={`/work/${works[3].slug}`} sizes={coords.img4.w} depth={0.5} globalMouseX={globalMouseX} globalMouseY={globalMouseY} scrollRotate={tiltB} />
            <motion.p className="hidden md:block text-caption mt-4 text-center tracking-widest absolute -bottom-8 left-0 w-full" style={{ opacity: smoothProgress }}>
              {works[3].title.toUpperCase()}
            </motion.p>
          </motion.div>

          {/* Image 5 */}
          <motion.div
            className="absolute pointer-events-auto"
            style={{ 
              top: coords.img5.top, 
              left: coords.img5.left, 
              x: img5X,
              y: img5Y,
              scale: scaleAnim, 
              opacity: opacityAnim, 
              width: coords.img5.w, 
              height: coords.img5.h 
            }}
          >
            <FloatingImage src={works[4].coverImage.src} alt={works[4].title} href={`/work/${works[4].slug}`} sizes={coords.img5.w} depth={0.25} globalMouseX={globalMouseX} globalMouseY={globalMouseY} scrollRotate={tiltB} />
          </motion.div>

          {/* Image 6 */}
          <motion.div
            className="absolute pointer-events-auto"
            style={{ 
              top: coords.img6.top, 
              left: coords.img6.left, 
              x: img6X,
              y: img6Y,
              scale: scaleAnim, 
              opacity: opacityAnim, 
              width: coords.img6.w, 
              height: coords.img6.h 
            }}
          >
            <FloatingImage src={works[5].coverImage.src} alt={works[5].title} href={`/work/${works[5].slug}`} sizes={coords.img6.w} depth={0.3} globalMouseX={globalMouseX} globalMouseY={globalMouseY} scrollRotate={tiltA} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
