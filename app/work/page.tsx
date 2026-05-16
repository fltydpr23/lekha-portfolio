import { getAllWorks } from "@/lib/works";
import GalleryClient from "@/components/gallery/GalleryClient";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Work",
  description: "Explore the editorial and fine art photography series by Lekha Rathnam.",
};

export default function WorkPage() {
  const works = getAllWorks();

  return (
    <main className="min-h-screen flex flex-col bg-linen">
      {/* Spacer for fixed nav */}
      <div style={{ height: "var(--nav-height)" }} />

      <div className="flex-grow py-16 lg:py-24 px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <GalleryClient works={works} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
