"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Series } from "@/types";

export default function SeriesImageGrid({ series }: { series: Series }) {
  return (
    <section className="bg-white pb-[255px]">
      <div className="flex flex-col" style={{ gap: '255px' }}>
        {series.images.map((image, index) => {
          const isLandscape = image.aspect === "landscape";
          const widthClass = isLandscape ? "w-full lg:w-[85%]" : "w-full lg:w-[45%]";
          
          // Asymmetrical layout
          let alignClass = "mx-auto";
          if (index % 3 === 1) alignClass = "ml-[10%]";
          if (index % 3 === 2) alignClass = "ml-auto mr-[10%]";

          return (
            <motion.div
              key={image.slot}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`${widthClass} ${alignClass} px-8 lg:px-0`}
            >
              <div 
                className="relative bg-gray-50"
                style={{ 
                  aspectRatio: image.aspect === "landscape" ? "3/2" : image.aspect === "portrait" ? "2/3" : "1/1"
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={isLandscape ? "(max-width: 1024px) 100vw, 85vw" : "(max-width: 1024px) 100vw, 45vw"}
                  className="object-cover"
                />
              </div>
              <div className="mt-[7px]">
                <p className="text-caption">
                  {image.caption?.toUpperCase()}
                </p>
                {image.cameraInfo && (
                  <p className="text-caption text-gray-400 mt-1">
                    {image.cameraInfo.toUpperCase()}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
