// ─── Core Types ───────────────────────────────────────────────────────────────

export interface PlaceholderImage {
  /** Slot identifier, e.g. "hero-01" — matches filename in /public/images/ */
  slot: string;
  /** Path relative to /public — e.g. "/images/hero-01.jpg" */
  src: string;
  /** Accessible alt text */
  alt: string;
  /** Aspect ratio hint for layout — "portrait" | "landscape" | "square" */
  aspect: "portrait" | "landscape" | "square";
  /** Optional: Natural width for next/image optimization */
  width?: number;
  /** Optional: Natural height for next/image optimization */
  height?: number;
  /** Optional: blur data URL placeholder */
  blurDataURL?: string;
}

export interface WorkImage extends PlaceholderImage {
  caption?: string;
  cameraInfo?: string;
}

export interface Series {
  /** URL slug — e.g. "red-earth" → /work/red-earth */
  slug: string;
  /** Display title */
  title: string;
  /** One-line editorial tagline */
  tagline: string;
  /** Year shot */
  year: number | string;
  /** Location(s) */
  location: string;
  /** Editorial categories / tags */
  tags: string[];
  /** Cover image shown in gallery grid */
  coverImage: WorkImage;
  /** All images in the series */
  images: WorkImage[];
  /** Narrative / artist statement for this series */
  narrative: string;
  /** Process / inspiration notes */
  processNotes?: string;
  /** Publication / exhibition info */
  publication?: string;
  /** Whether this series is featured on the homepage */
  featured: boolean;
  /** Display order in gallery */
  order: number;
}

export type ContactInquiryType =
  | "editorial"
  | "commercial"
  | "exhibition"
  | "licensing"
  | "general";

export interface ContactFormData {
  name: string;
  email: string;
  inquiryType: ContactInquiryType;
  message: string;
}
