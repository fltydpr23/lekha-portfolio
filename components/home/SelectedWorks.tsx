"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getFeaturedWorks } from "@/lib/works";

export default function SelectedWorks() {
  const featured = getFeaturedWorks().slice(0, 3);

  return (
    <section
      className="w-full bg-white pb-[255px]"
      aria-label="Selected Works"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col" style={{ gap: '255px' }}>
        
        {featured.map((work, index) => {
          // Create asymmetrical layout logic
          const alignments = ["ml-[10%]", "ml-auto mr-[15%]", "mx-auto"];
          const widths = ["w-[60%]", "w-[45%]", "w-[75%]"];
          const alignmentClass = alignments[index % alignments.length];
          const widthClass = widths[index % widths.length];

          return (
            <motion.div 
              key={work.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`${widthClass} ${alignmentClass} group gallery-item`}
            >
              <Link href={`/work/${work.slug}`} className="block relative">
                <div className={`relative aspect-[4/3] bg-gray-50`}>
                  <Image
                    src={work.coverImage.src}
                    alt={work.coverImage.alt}
                    fill
                    sizes={`(max-width: 768px) 100vw, (max-width: 1440px) ${widths[index % widths.length].replace('w-[', '').replace('%]', 'vw')}, 1200px`}
                    className="object-cover img-hover"
                  />
                  {/* Subtle 1px black border on hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-black transition-colors duration-300" />
                </div>
                {/* 7px gap between image and caption */}
                <div className="mt-[7px]">
                  <p className="text-caption">
                    {work.title.toUpperCase()}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
        
      </div>
    </section>
  );
}
