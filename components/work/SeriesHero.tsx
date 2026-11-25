"use client";

import { motion } from "framer-motion";
import type { Series } from "@/types";

export default function SeriesHero({ series }: { series: Series }) {
  return (
    <section className="pt-[182px] pb-[182px] px-8 lg:px-12 bg-white text-center overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="font-cormorant font-light text-black leading-none mx-auto"
        style={{
          fontSize: "clamp(3.25rem, 10vw, 158px)",
          letterSpacing: "-0.0180em",
        }}
      >
        {series.title}
      </motion.h1>
    </section>
  );
}
