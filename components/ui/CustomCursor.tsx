"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Main cursor — snappy
  const mainX = useSpring(rawX, { stiffness: 600, damping: 40 });
  const mainY = useSpring(rawY, { stiffness: 600, damping: 40 });

  // Trailing ring — sluggish (the "tail")
  const tailX = useSpring(rawX, { stiffness: 80, damping: 22 });
  const tailY = useSpring(rawY, { stiffness: 80, damping: 22 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(!!el.closest("[data-cursor='image']"));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: tailX,
          y: tailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-black/40"
          animate={{
            width: isHovering ? 56 : 28,
            height: isHovering ? 56 : 28,
            opacity: isHovering ? 1 : 0.5,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mainX,
          y: mainY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-black"
          animate={{
            width: isHovering ? 6 : 7,
            height: isHovering ? 6 : 7,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
