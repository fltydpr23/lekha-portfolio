"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Series } from "@/types";

interface GalleryItemProps {
  work: Series;
  index: number;
  onLightboxOpen?: (work: Series) => void;
}

function getGridClass(index: number): string {
  const patterns = [
    "col-span-1 row-span-2", // tall portrait
    "col-span-1 row-span-1", // standard
    "col-span-2 row-span-1", // wide landscape
    "col-span-1 row-span-1", // standard
    "col-span-1 row-span-2", // tall portrait
    "col-span-1 row-span-1", // standard
    "col-span-2 row-span-1", // wide landscape
  ];
  return patterns[index % patterns.length];
}

function getAspectClass(index: number): string {
  const aspects = [
    "aspect-[2/3]", // tall
    "aspect-[4/3]", // landscape
    "aspect-[16/10]", // wide
    "aspect-square", // square
    "aspect-[3/4]", // portrait
    "aspect-[5/4]", // slightly landscape
    "aspect-[7/5]", // moderate landscape
  ];
  return aspects[index % aspects.length];
}

export default function GalleryItem({
  work,
  index,
  onLightboxOpen,
}: GalleryItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <motion.div
      ref={ref}
      data-cursor="image"
      className={`relative overflow-hidden group gallery-item ${getGridClass(index)}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Clickable: opens lightbox */}
      <button
        className="w-full h-full text-left focus-visible:ring-0 focus-visible:outline-1 focus-visible:outline-black"
        onClick={() => onLightboxOpen?.(work)}
        aria-label={`Open lightbox: ${work.title}, ${work.year}`}
        type="button"
      >
        <div
          className={`relative w-full h-full min-h-[240px] bg-black/[0.03] ${getAspectClass(index)}`}
        >
          <Image
            src={work.coverImage.src}
            alt={work.coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.018]"
            loading={index < 4 ? "eager" : "lazy"}
          />

          {/* Hover overlay */}
          <div
            className="
              absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            "
          />

          {/* Overlay content */}
          <div
            className="
              absolute inset-0 flex flex-col justify-end p-6
              opacity-0 group-hover:opacity-100
              translate-y-2 group-hover:translate-y-0
              transition-all duration-300
            "
          >
            <p className="text-caption !text-white/60 mb-1">
              {work.year} · {work.location}
            </p>
            <h3 className="font-cormorant font-light text-2xl text-white mb-2">
              {work.title}
            </h3>
            <p className="text-editorial !text-white/70">View Series</p>
          </div>
        </div>
      </button>

      {/* Direct link for accessibility / SEO */}
      <Link
        href={`/work/${work.slug}`}
        className="absolute bottom-4 right-4 text-caption !text-white/0 group-hover:!text-white/70 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto"
        tabIndex={-1}
        aria-hidden="true"
      >
        Open →
      </Link>
    </motion.div>
  );
}
