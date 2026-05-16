"use client";

import { useState, useCallback } from "react";
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";
import type { Series } from "@/types";

interface MasonryGridProps {
  works: Series[];
}

export default function MasonryGrid({ works }: MasonryGridProps) {
  const [lightboxWork, setLightboxWork] = useState<Series | null>(null);

  const openLightbox = useCallback((work: Series) => {
    setLightboxWork(work);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxWork(null);
  }, []);

  return (
    <>
      {/* Masonry-style CSS grid */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4 lg:gap-5
          auto-rows-[minmax(200px,auto)]
        "
        role="list"
        aria-label="Photography gallery"
      >
        {works.map((work, index) => (
          <div key={work.slug} role="listitem">
            <GalleryItem
              work={work}
              index={index}
              onLightboxOpen={openLightbox}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxWork && (
        <Lightbox
          works={works}
          initialWork={lightboxWork}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
