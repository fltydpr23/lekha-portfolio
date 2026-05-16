"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { getAllWorks } from "@/lib/works";

export default function FeaturedStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const works = getAllWorks();

  return (
    <section ref={ref} className="py-32 px-8 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-8">
          <span className="text-caption text-fog">INDEX [ {works.length} ]</span>
          <Link href="/work" className="text-editorial border-b border-black hover:opacity-50 transition-opacity">
            ALL PROJECTS
          </Link>
        </div>

        <div className="border-t border-black/20">
          {works.map((work, index) => (
            <motion.div
              key={work.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link 
                href={`/work/${work.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-black/20 hover:bg-gray-50 transition-colors px-4 -mx-4"
              >
                <h3 className="font-fraunces text-2xl text-black group-hover:italic transition-all">
                  {work.title}
                </h3>
                <div className="flex gap-8 mt-2 md:mt-0 text-caption text-fog">
                  <span className="w-24">{work.year}</span>
                  <span className="w-32">{work.location.split(',')[0]}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
