"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATEMENT = `Photography is a practice of sustained attention — to light, to the moment before it changes, to the space between things.`;

export default function EditorialStatement() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      ref={ref}
      className="py-48 px-8 lg:px-12 bg-white flex justify-center items-center"
      aria-labelledby="statement-heading"
    >
      <motion.div 
        className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="lg:col-span-3 flex flex-col justify-end">
          <div className="text-caption flex flex-col gap-1 mb-8 lg:mb-0">
            <span>[ BIO ]</span>
            <span className="text-black">LEKHA RATHNAM</span>
            <span>NEW DELHI & PONDICHERRY</span>
            <span>INFO@LEKHARATHNAM.COM</span>
          </div>
        </div>

        <div className="lg:col-span-9">
          <h2
            id="statement-heading"
            className="font-fraunces text-black leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            {STATEMENT}
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
