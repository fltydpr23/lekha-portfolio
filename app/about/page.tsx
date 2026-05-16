import Image from "next/image";
import Footer from "@/components/ui/Footer";
import { aboutPortrait } from "@/lib/works";

export const metadata = {
  title: "About",
  description: "Learn more about Lekha Rathnam, her artistic philosophy, and her approach to editorial and fine art photography.",
};

const BIOGRAPHY = [
  `Lekha Rathnam is an editorial and fine art photographer based in India. Her work explores the intersections of landscape, ritual, and human presence, with a particular focus on the quality of light and surface in everyday spaces.`,
  `She has spent over a decade documenting the changing landscapes and cultural practices of the Indian subcontinent. Her approach is characterized by a commitment to available light, a suspect attitude towards nostalgia, and a preference for sustained attention over dramatic intervention.`,
  `Her work has been published in Vogue India, National Geographic Traveller, and various independent arts publications. She divides her time between New Delhi and Pondicherry, returning frequently to the landscapes that continue to shape her practice.`,
];

const EXHIBITIONS = [
  { year: 2024, title: "Red Earth (Solo)", venue: "Alliance Française de Pondichéry" },
  { year: 2023, title: "The Quiet Season (Group)", venue: "Kochi-Muziris Biennale Collateral" },
  { year: 2022, title: "Surface Studies", venue: "Varanasi Arts Festival" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-linen">
      {/* Spacer for fixed nav */}
      <div style={{ height: "var(--nav-height)" }} />

      <div className="flex-grow py-16 lg:py-24 px-8 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Text */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <p className="text-editorial mb-4">About</p>
              <h1 className="font-fraunces font-light text-display-sm text-charcoal mb-8">
                A practice of sustained attention.
              </h1>
            </div>

            <div className="prose-editorial max-w-prose">
              {BIOGRAPHY.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-inter font-light text-charcoal text-[0.95rem] leading-editorial mb-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Exhibitions */}
            <div className="pt-8 border-t border-beige-deep/40">
              <p className="text-editorial mb-6">Exhibitions & Recognition</p>
              <ul className="space-y-4" role="list">
                {EXHIBITIONS.map((exh, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-beige-deep/20 pb-4">
                    <span className="font-fraunces font-light text-charcoal text-lg">
                      {exh.title}
                    </span>
                    <div className="flex items-center gap-4 text-caption">
                      <span>{exh.venue}</span>
                      <span className="text-fog">{exh.year}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative aspect-[3/4] bg-beige-warm/30 overflow-hidden">
              <Image
                src={aboutPortrait.src}
                alt={aboutPortrait.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover img-hover"
                priority
              />
            </div>
            <p className="text-caption mt-4 text-right">Lekha Rathnam</p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
