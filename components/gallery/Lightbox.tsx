"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Series } from "@/types";

interface LightboxProps {
  works: Series[];
  initialWork: Series;
  onClose: () => void;
}

export default function Lightbox({ works, initialWork, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(
    works.findIndex((w) => w.slug === initialWork.slug)
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentWork = works[currentIndex];
  const currentImage = currentWork?.images[imageIndex] ?? currentWork?.coverImage;

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("scroll-locked");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("scroll-locked");
    };
  }, [currentIndex, imageIndex]);

  const goNext = useCallback(() => {
    setDirection(1);
    if (imageIndex < (currentWork?.images.length ?? 1) - 1) {
      setImageIndex((i) => i + 1);
    } else {
      setCurrentIndex((i) => (i + 1) % works.length);
      setImageIndex(0);
    }
  }, [currentIndex, imageIndex, currentWork, works.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    if (imageIndex > 0) {
      setImageIndex((i) => i - 1);
    } else {
      const prevWork = works[(currentIndex - 1 + works.length) % works.length];
      setCurrentIndex((i) => (i - 1 + works.length) % works.length);
      setImageIndex((prevWork?.images.length ?? 1) - 1);
    }
  }, [currentIndex, imageIndex, works]);

  const imageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "4%" : "-4%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-4%" : "4%",
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] lightbox-backdrop flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Lightbox: ${currentWork?.title}`}
      >
        {/* Close */}
        <button
          className="absolute top-6 right-8 text-editorial text-linen/60 hover:text-linen transition-colors duration-250 z-10"
          onClick={onClose}
          aria-label="Close lightbox (Esc)"
        >
          ✕ Close
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-8 text-caption text-linen/40 z-10">
          {imageIndex + 1} / {currentWork?.images.length ?? 1}
        </div>

        {/* Main image area */}
        <div className="flex w-full h-full items-center justify-center px-16 lg:px-32">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={`${currentWork?.slug}-${imageIndex}`}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-h-[85vh] max-w-[75vw] flex items-center justify-center"
            >
              {currentImage && (
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={currentImage.width ?? 1800}
                  height={currentImage.height ?? 1200}
                  className="max-h-[85vh] max-w-[75vw] w-auto h-auto object-contain"
                  priority
                  quality={85}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Prev / Next */}
        <button
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 text-linen/40 hover:text-linen transition-colors duration-250 p-4 text-2xl font-light"
          onClick={goPrev}
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 text-linen/40 hover:text-linen transition-colors duration-250 p-4 text-2xl font-light"
          onClick={goNext}
          aria-label="Next image"
        >
          →
        </button>

        {/* Metadata panel — bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-12 pb-8 pt-12 bg-gradient-to-t from-ink/80 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-5xl mx-auto">
            <div>
              <p className="text-caption text-linen/40 mb-1">
                {currentWork?.year} · {currentWork?.location}
              </p>
              <h2 className="font-fraunces font-light text-xl text-linen mb-1">
                {currentWork?.title}
              </h2>
              {currentImage?.caption && (
                <p className="text-caption text-linen/50">{currentImage.caption}</p>
              )}
              {currentImage?.cameraInfo && (
                <p className="text-caption text-linen/30 mt-1">{currentImage.cameraInfo}</p>
              )}
            </div>

            <Link
              href={`/work/${currentWork?.slug}`}
              onClick={onClose}
              className="nav-link text-linen/60 hover:text-linen shrink-0"
            >
              View full series →
            </Link>
          </div>
        </div>

        {/* Click backdrop to close */}
        <div
          className="absolute inset-0 -z-10"
          onClick={onClose}
          aria-hidden="true"
        />
      </motion.div>
    </AnimatePresence>
  );
}
