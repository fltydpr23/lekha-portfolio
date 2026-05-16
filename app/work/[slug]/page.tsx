import { notFound } from "next/navigation";
import { getWorkBySlug, getAllSlugs } from "@/lib/works";
import SeriesHero from "@/components/work/SeriesHero";
import SeriesNarrative from "@/components/work/SeriesNarrative";
import SeriesImageGrid from "@/components/work/SeriesImageGrid";
import RelatedSeries from "@/components/work/RelatedSeries";
import Footer from "@/components/ui/Footer";

// We need to type params as a Promise for Next.js 15+
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const work = getWorkBySlug(params.slug);

  if (!work) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: work.title,
    description: work.tagline,
    openGraph: {
      title: `${work.title} · Lekha Rathnam`,
      description: work.tagline,
      images: [
        {
          url: work.coverImage.src,
          alt: work.coverImage.alt,
        },
      ],
    },
  };
}

export default async function SeriesPage(props: PageProps) {
  const params = await props.params;
  const work = getWorkBySlug(params.slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <SeriesHero series={work} />
      <SeriesNarrative series={work} />
      <SeriesImageGrid series={work} />
      <RelatedSeries currentSlug={work.slug} />
      <Footer />
    </main>
  );
}
