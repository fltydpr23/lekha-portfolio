import type { Series } from "@/types";

export const works: Series[] = [];

export function getAllWorks(): Series[] {
  return works.sort((a, b) => a.order - b.order);
}

export function getFeaturedWorks(): Series[] {
  return works.filter((w) => w.featured).sort((a, b) => a.order - b.order);
}

export function getWorkBySlug(slug: string): Series | undefined {
  return works.find((w) => w.slug === slug);
}

export function getRelatedWorks(slug: string, count = 2): Series[] {
  return works.filter((w) => w.slug !== slug).slice(0, count);
}

export function getAllSlugs(): string[] {
  return works.map((w) => w.slug);
}

export const heroImage = {
  slot: "hero-01",
  src: "/images/pic-1.jpg",
  alt: "Atmospheric fullscreen editorial photograph",
  aspect: "landscape" as const,
  width: 2400,
  height: 1440,
};

export const aboutPortrait = {
  slot: "about-portrait",
  src: "/images/pic-8.jpg",
  alt: "Lekha Rathnam, photographer",
  aspect: "portrait" as const,
  width: 800,
  height: 1000,
};
