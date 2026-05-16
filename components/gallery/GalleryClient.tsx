"use client";

import { useState, useMemo } from "react";
import SeriesFilter from "./SeriesFilter";
import MasonryGrid from "./MasonryGrid";
import type { Series } from "@/types";

interface GalleryClientProps {
  works: Series[];
}

export default function GalleryClient({ works }: GalleryClientProps) {
  const [activeTag, setActiveTag] = useState("all");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    works.forEach((work) => {
      work.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, [works]);

  // Filter works based on active tag
  const filteredWorks = useMemo(() => {
    if (activeTag === "all") return works;
    return works.filter((work) => work.tags.includes(activeTag));
  }, [works, activeTag]);

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center flex-wrap gap-6">
        <h1 className="font-fraunces font-light text-4xl text-charcoal">
          Works
        </h1>
        <SeriesFilter
          tags={allTags}
          active={activeTag}
          onChange={setActiveTag}
        />
      </div>

      <MasonryGrid works={filteredWorks} />
    </div>
  );
}
