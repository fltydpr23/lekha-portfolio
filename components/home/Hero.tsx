"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="h-screen min-h-[600px] w-full flex flex-col items-center justify-center bg-white"
      aria-label="Hero — Lekha Rathnam photography"
    >
      <motion.div
        className="text-center w-full px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-playfair text-black leading-none mx-auto whitespace-nowrap"
          style={{ 
            fontSize: "158px", 
            letterSpacing: "-0.0180em" 
          }}
        >
          Lekha Rathnam
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-body mt-4"
          style={{ fontSize: "18px" }}
        >
          Editorial &amp; Fine Art Photography
        </motion.p>
      </motion.div>
    </section>
  );
}
