"use client";

import { motion } from "framer-motion";

const ALL_TAG = "all";

interface SeriesFilterProps {
  tags: string[];
  active: string;
  onChange: (tag: string) => void;
}

export default function SeriesFilter({ tags, active, onChange }: SeriesFilterProps) {
  const allTags = [ALL_TAG, ...tags];

  return (
    <div
      className="flex flex-wrap items-center gap-6 lg:gap-8"
      role="group"
      aria-label="Filter by series type"
    >
      {allTags.map((tag) => {
        const isActive = active === tag;
        return (
          <button
            key={tag}
            onClick={() => onChange(tag)}
            className={`
              relative text-editorial transition-colors duration-250
              ${isActive ? "text-charcoal" : "text-fog hover:text-ash"}
            `}
            aria-pressed={isActive}
            type="button"
          >
            {tag === ALL_TAG ? "All" : tag}

            {/* Active underline with layout animation */}
            {isActive && (
              <motion.span
                layoutId="filter-underline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-terracotta"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
