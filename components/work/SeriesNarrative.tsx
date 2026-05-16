"use client";

import { motion } from "framer-motion";
import type { Series } from "@/types";

export default function SeriesNarrative({ series }: { series: Series }) {
  return (
    <section className="px-8 lg:px-12 bg-white flex justify-center pb-[255px]">
      <motion.div 
        className="max-w-[800px] w-full text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="text-body whitespace-pre-wrap leading-[1.6]">
          {series.narrative}
        </p>
        
        {series.processNotes && (
          <div className="mt-16">
            <p className="text-caption mb-2">NOTES</p>
            <p className="text-body whitespace-pre-wrap leading-[1.6] text-gray-500">
              {series.processNotes}
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}
