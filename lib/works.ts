import type { Series } from "@/types";

export const works: Series[] = [
  {
    slug: "red-earth",
    title: "Red Earth",
    tagline: "Dust, ritual, and the geometry of forgotten fields",
    year: 2024,
    location: "Rajasthan, India",
    tags: ["documentary", "landscape", "india"],
    featured: true,
    order: 1,
    coverImage: {
      slot: "red-earth-cover",
      src: "/images/pic-2.jpg",
      alt: "Red Earth Cover",
      aspect: "landscape",
      width: 1800,
      height: 1100,
    },
    images: [
      {
        slot: "red-earth-01",
        src: "/images/pic-2.jpg",
        alt: "Red Earth 1",
        aspect: "landscape",
        width: 1800,
        height: 1100,
        caption: "Barmer, Rajasthan — dawn",
      }
    ],
    narrative: `There is a specific quality of light in the Thar — not golden in the postcard sense, but amber, almost bruised. It lands on the earth differently than anywhere else I have worked. The soil itself holds colour the way old cloth does: unevenly, stubbornly, beautifully.`,
    processNotes: `Exclusively available light. No reflectors, no fill. The camera was a Leica M11 with a 35mm Summilux.`,
    publication: "Longlist, Sony World Photography Awards 2024",
  },
  {
    slug: "interior-light",
    title: "Interior Light",
    tagline: "Windows, thresholds, and the private lives of rooms",
    year: 2023,
    location: "Pondicherry & Chettinad, India",
    tags: ["interior", "fine art", "architecture"],
    featured: true,
    order: 2,
    coverImage: {
      slot: "interior-light-cover",
      src: "/images/pic-3.jpg",
      alt: "Interior Light Cover",
      aspect: "portrait",
      width: 1100,
      height: 1600,
    },
    images: [
      {
        slot: "interior-light-01",
        src: "/images/pic-3.jpg",
        alt: "Interior Light 1",
        aspect: "portrait",
        width: 1100,
        height: 1600,
        caption: "Window study I — White Town, Pondicherry",
      }
    ],
    narrative: `I am interested in rooms that have been used for a long time. Not because of nostalgia — I am suspicious of nostalgia — but because long use leaves evidence.`,
    processNotes: `A mix of Canon R5 and a Mamiya 7II on Kodak Portra 400.`,
    publication: "Solo exhibition, Alliance Française de Pondichéry, January 2024",
  },
  {
    slug: "the-quiet-season",
    title: "The Quiet Season",
    tagline: "Monsoon portraiture — stillness inside the storm",
    year: 2023,
    location: "Kerala & Karnataka, India",
    tags: ["portrait", "editorial", "monsoon"],
    featured: true,
    order: 3,
    coverImage: {
      slot: "quiet-season-cover",
      src: "/images/pic-4.jpg",
      alt: "Quiet Season Cover",
      aspect: "portrait",
      width: 1000,
      height: 1500,
    },
    images: [
      {
        slot: "quiet-season-01",
        src: "/images/pic-4.jpg",
        alt: "Quiet Season 1",
        aspect: "portrait",
        width: 1000,
        height: 1500,
        caption: "Parvathy, Wayanad — July",
      }
    ],
    narrative: `The monsoon is not dramatic in the way photographs usually suggest. It is relentless, quiet, suffusing.`,
    publication: "Published in _Vogue India_, September 2023",
  },
  {
    slug: "surface-studies",
    title: "Surface Studies",
    tagline: "Textiles, skin, and the material memory of craft",
    year: 2022,
    location: "Varanasi & Kanchipuram, India",
    tags: ["still life", "textile", "fine art"],
    featured: false,
    order: 4,
    coverImage: {
      slot: "surface-studies-cover",
      src: "/images/pic-5.jpg",
      alt: "Surface Studies Cover",
      aspect: "square",
      width: 1200,
      height: 1200,
    },
    images: [
      {
        slot: "surface-studies-01",
        src: "/images/pic-5.jpg",
        alt: "Surface Studies 1",
        aspect: "square",
        width: 1200,
        height: 1200,
        caption: "Banarasi, detail I",
      }
    ],
    narrative: `Textile is one of the oldest forms of image-making. What a weaver encodes into cloth — pattern, color, structure — is a kind of visual language.`,
  },
  {
    slug: "liminal-hours",
    title: "Liminal Hours",
    tagline: "Between darkness and first light — cities before they wake",
    year: 2024,
    location: "Mumbai, Chennai & Kolkata, India",
    tags: ["urban", "nocturnal", "documentary"],
    featured: true,
    order: 5,
    coverImage: {
      slot: "liminal-hours-cover",
      src: "/images/pic-6.jpg",
      alt: "Liminal Hours Cover",
      aspect: "landscape",
      width: 1800,
      height: 1100,
    },
    images: [
      {
        slot: "liminal-hours-01",
        src: "/images/pic-6.jpg",
        alt: "Liminal Hours 1",
        aspect: "landscape",
        width: 1800,
        height: 1100,
        caption: "Ballard Estate, Mumbai — 4:12am",
      }
    ],
    narrative: `Cities have a specific character in the hours before they decide to be cities again. The infrastructure is visible without the noise of use.`,
    publication: "Commissioned editorial, _National Geographic Traveller India_, 2024",
  },
  {
    slug: "borrowed-light",
    title: "Borrowed Light",
    tagline: "The architecture of shadow in everyday Indian spaces",
    year: 2022,
    location: "Tamil Nadu & Andhra Pradesh, India",
    tags: ["architecture", "shadow", "fine art"],
    featured: false,
    order: 6,
    coverImage: {
      slot: "borrowed-light-cover",
      src: "/images/pic-7.jpg",
      alt: "Borrowed Light Cover",
      aspect: "portrait",
      width: 1100,
      height: 1600,
    },
    images: [
      {
        slot: "borrowed-light-01",
        src: "/images/pic-7.jpg",
        alt: "Borrowed Light 1",
        aspect: "portrait",
        width: 1100,
        height: 1600,
        caption: "Shadow lattice, Thanjavur",
      }
    ],
    narrative: `Traditional Indian architecture understood shadow as a design material. The deep verandah, the perforated jali, the compressed corridor leading to the courtyard — these are all shadow-making devices.`,
  },
];

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
