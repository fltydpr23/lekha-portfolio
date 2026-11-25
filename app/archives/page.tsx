import Link from "next/link";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Archives",
  description:
    "Curated archive of editorial and fine art photography by Lekha Rathnam.",
};

export default function ArchivesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-black">
      {/* Spacer for fixed nav */}
      <div style={{ height: "var(--nav-height)" }} />

      <div className="flex-grow flex items-center justify-center px-8 lg:px-12 py-24">
        <div className="max-w-[560px] w-full text-center space-y-8">
          <p className="text-editorial">Archives</p>

          <h1 className="font-cormorant font-light italic text-display-sm text-black">
            Curating the index.
          </h1>

          <p className="font-inter font-light text-black/60 text-[0.95rem] leading-editorial max-w-md mx-auto">
            A complete chronological index of editorial commissions, monographs,
            and exhibition plates is currently being assembled.
          </p>

          <div className="pt-4 flex items-center justify-center gap-8">
            <Link
              href="/"
              className="nav-link uppercase tracking-[0.12em]"
              data-cursor="image"
            >
              ← Return to Universe
            </Link>
            <span className="text-[10px] opacity-30">•</span>
            <Link
              href="/contact"
              className="nav-link uppercase tracking-[0.12em]"
              data-cursor="image"
            >
              Request Portfolio →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
